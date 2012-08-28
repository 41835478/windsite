<?php


/**************************************************
*  Created:  2010-10-28
*
*  文件说明
*
*  @Xweibo (C)1996-2099 SINA Inc.
*  @Author zhenquan <zhenquan@staff.sina.com.cn>
*
***************************************************/
include ('action.abs.php');
class admin_mod extends action {
	function admin_mod() {
		parent :: action();
	}

	function index() {
		TPL :: assign('menu', $this->_getUserMenu(USER :: aid()));
		if (XT_IS_SIMPLE == 'true') {
			$this->_display('index_360');
		} else {
			$this->_display('index');
		}
	}

	function map() {
		TPL :: assign('menu', $this->_getUserMenu(USER :: aid()));
		$this->_display('map');
	}

	function default_page() {
		$counts = array (
			'wb' => 0,
			'user' => 0,
			'comment' => 0,
			't_wb' => 0,
			't_user' => 0,
			't_comment' => 0
		);
		$counts['wb'] = DS('xweibo/weiboCopy.counts', 'g0/300');
		$counts['t_wb'] = DS('xweibo/weiboCopy.counts', 'g0/300', 'today');
		if (XT_SIDS != '' && !(XT_IS_SELLER != 'true' && XT_IS_TAOKE == 'true')) { //如果是卖家，则查询店铺营销数量和商品营销数量，否则为评论数
			$counts['item'] = DS('mgr/xintao/yingxiaoWeiboCom.getItemWeiboNum', 'g0/300');
			$sids = array ();
			$sidsStr = str_replace(array (
				'[',
				']'
			), array (
				'',
				''
			), XT_SIDS);
			if (!empty ($sidsStr)) {
				$sids = explode(',', $sidsStr);
			}
			$counts['shop'] = DS('mgr/xintao/yingxiaoWeiboCom.getShopWeiboNum', 'g0/300', $sids);
		}
		if (XT_IS_WEIBO == 'true') {
			//$counts['comment'] = DS('CommentCopy.counts', 'g0/300');	
			//$counts['t_comment'] = DS('CommentCopy.counts', 'g0/300', 'today');
			$counts['user'] = DS('mgr/userCom.counts', 'g0/300');
			$counts['t_user'] = DS('mgr/userCom.counts', 'g0/300', 'today');
		}
		TPL :: assign('counts', $counts);
		$this->_display('default');
	}
	/**
	 * 淘宝回调
	 */
	function topCallback() {
		$ret = TB('top/TopClient.validateSession');
		if ($ret === false) {
			APP :: tips(array (
				'msg' => '当前请求不正确',
				'tpl' => 'mgr/error',
				'baseskin' => false,
				'timeout' => 3,
				'location' => TB_CONTAINER
			));
		}
		if (in_array($ret['nick'], array (
				'oqoq2oqoq2',
				'星空下约定1314',
				'kqysg',
				'rain_qyx',
				'绿袖子1955',
				'jping2'
			))) {
			exit ('已退款用户，不予登录');
		}
		if (in_array($ret['nick'], array (
				'alansll2011',
				'笨耗子2010',
				'colortt',
				'果粉果嫩婴儿奶粉屋',
				'广兴',
				'nalanruoruo',
				'广州市牛仔裤',
				'wangzhonghua77',
				'yhlly70',
				'望成有限公司',
				'石喻璇',
				'暖赤乌'
			))) {
			exit ('无效用户，不予登录，详情咨询客服QQ：153647646');
		}
		$appstore = array ();
		$FREE_DATELINE = '';
		$APPSTORE_DATELINE = '';
		//第一步：临时授权（是指系统可自由赠送使用服务及时间）
		$betas = V('-:beta');
		if (in_array($ret['nick'], array_keys($betas))) { //临时授权
			$beta = $betas[$ret['nick']];
			if ((!empty ($beta['dateline']) && time() < strtotime($beta['dateline'])) || $beta['dateline'] == '') {
				$appstore = $beta['appstore'];
				$APPSTORE_DATELINE = $beta['dateline'];
			}
		}
		//第二步：真实订购（真实付费使用的）
		if (empty ($appstore)) { //真实订购
			$codes = F('top.vasSubscribeGet', -999, '登录模块', array (
				'nick' => $ret['nick'],
				'article_code' => TB_ARTICLE_CODE_1,
				'app_key' => TB_APP_KEY_1,
				'app_secret' => TB_APP_SECRET_1
			), true);
			if (!empty ($codes)) {
				foreach ($codes as $key) {
					$data = array ();
					$data[0] = $key['item_code'];
					$data[1] = $key['deadline'];
					$data[2] = $ret['userId'];
					$codesRs = DR('mgr/adminCom.saveAppstoreById', '', $data); //更新订购的服务项目
					$appstore[] = '[' . $key['item_code'] . ']';
					if ($APPSTORE_DATELINE == '') {
						if ($key['item_code'] == 'ts-14975-4') { //先卖家
							$APPSTORE_DATELINE = $key['deadline'];
						}
						elseif ($key['item_code'] == 'ts-14975-5') { //再淘客
							$APPSTORE_DATELINE = $key['deadline'];
						}
						elseif ($key['item_code'] == 'ts-14975-1') { //最后免费
							$APPSTORE_DATELINE = $key['deadline'];
						}
					}
				}
				$APPSTORE_DATELINE = F('getAppstoreDateline', $codes);
			} else {
				$this->_error('您尚未订购当前服务');
			}
		}
		//第三步：免费授权（是指为了吸引用户，提供3天的免费使用）
		if (count($appstore) == 1 && $appstore[0] == XT_APPSTORE_FREE) { //如果该用户仅订购了免费服务，提供3天的免费服务
			$free_ret = DR('xintao/free.getById', '', $ret['userId']);
			if (!$free_ret['rst']) { //还没有免费期，则新增
				if (XT_FREE_BETA == 'true') {
					///可能需要查询是否是卖家
					//设置可免费使用的服务项目（卖家用户提供卖家服务，淘客用户提供淘客服务）
					$free_data = array (
						'user_id' => $ret['userId'],
						'user_nick' => $ret['nick'],
						'dateline' => date("Y-m-d", strtotime("$d +3 day"))
					);
					//处理服务项目
					$user = F('top.userGet', -999, '淘宝用户信息同步', array (
						'session' => $ret['session']
					), true);
					if ($user) {
						if ($user['has_shop'] == 'true') {
							$free_data['appstore'] = XT_APPSTORE_SELLER_MULTI;
						} else {
							$free_data['appstore'] = XT_APPSTORE_TAOKE;
						}
					} else {
						$free_data['appstore'] = XT_APPSTORE_TAOKE;
					}
					DR('xintao/free.save', '', $free_data); //保存
					$appstore[] = $free_data['appstore'];
					$FREE_DATELINE = $free_data['dateline'];
					$APPSTORE_DATELINE = $free_data['dateline'];
				}
			} else { //已有免费期，则判断是否在免费期间
				$free = $free_ret['rst'];
				if (time() < strtotime($free['dateline'])) { //在期间
					$FREE_DATELINE = $free['dateline'];
					$APPSTORE_DATELINE = $free['dateline'];
					//设置可免费使用的服务项目（卖家用户提供卖家服务，淘客用户提供淘客服务）
					$appstore[] = $free['appstore']; //设置免费试用的服务项目
				} else { //已过期，则不处理

				}
			}
		}
		if (!in_array(XT_APPSTORE_FREE, $appstore)) {
			$appstore[] = XT_APPSTORE_FREE;
		}
		//清除TOP回调模块参数
		$QUERY_STRING = str_replace('m=mgr/admin.topCallback', '', $_SERVER['QUERY_STRING']);
		//判断数据库中是否存在管理员
		$rs = DR('mgr/adminCom.getAdminByUserId', '', $ret['userId']);
		if (!$rs['rst']) {
			//如果数据库中没有管理员数据，跳转到安装页面
			//echo '需要初始化'.$ret['nick'].'|'.$ret['userId'];
			///执行数据库初始化
			$config_array = array (
				'XT_USER_ID' => $ret['userId'],
				'XT_USER_NICK' => $ret['nick'],
				'XT_APPSTORE' => implode(',', $appstore),
				'WB_AKEY' => '',
				'WB_SKEY' => '',
				'XT_SITE_DOMAIN' => 't' . $ret['userId'] . '.xintaowang.com',
				'XT_FREE_DATELINE' => $FREE_DATELINE,
				'XT_APPSTORE_DATELINE' => $APPSTORE_DATELINE
			);
			F('xintao.init_sys', $ret['userId'], $ret['nick']);
			///执行配置文件初始化
			F('xintao.set_config_file', $ret['userId'], $config_array);
			header("Location:http://t" . $ret['userId'] . "." . XT_DOMAIN . "/admin.php?m=mgr/admin.loginTB&" . $QUERY_STRING);
		} else {
			///更新服务项目
			$config_arr = array (
				'XT_APPSTORE' => implode(',', $appstore),
				'XT_FREE_DATELINE' => $FREE_DATELINE,
				'XT_APPSTORE_DATELINE' => $APPSTORE_DATELINE
			);
			F('xintao.update_config_file', $config_arr, $ret['userId']); //更新
			if ($rs['rst']['domain']) {
				if ($rs['rst']['domain'] != 't' . $ret['userId'] . '.xintaowang.com') {
					$ip = gethostbyname(trim($rs['rst']['domain']));
					if ($ip == '199.119.138.67') {
						header("Location:http://" . $rs['rst']['domain'] . "/admin.php?m=mgr/admin.loginTB&" . $QUERY_STRING);
						exit;
					}
				}
			}
			header("Location:http://t" . $ret['userId'] . "." . XT_DOMAIN . "/admin.php?m=mgr/admin.loginTB&" . $QUERY_STRING);
			exit;
		}
	}
	/**
	* TOP用户登录
	*/
	function loginTB() {
		$ret = TB('top/TopClient.validateSession'); //校验回调
		if ($ret === false) {
			APP :: tips(array (
				'msg' => '当前请求不正确',
				'tpl' => 'mgr/error',
				'baseskin' => false,
				'timeout' => 3,
				'location' => TB_CONTAINER
			));
		}
		//判断数据库中是否存在管理员
		$rss = DR('mgr/adminCom.getAdminByUserId', '', $ret['param']['visitor_id']);
		if (!$rss['rst']) {
			//如果数据库中没有管理员数据，跳转到安装页面
			header("Location:" . TB_CALLBACK . "&" . $_SERVER['QUERY_STRING']);
			exit;
		}
		$rs = $rss['rst'];
		session_regenerate_id(); //防御Session Fixation
		USER :: set('__CLIENT_ADMIN_ROOT', $rs['group_id']); //设置管理员权限
		USER :: aid($rs['id']);
		$sina_uid = USER :: uid();
		if ($rs['sina_uid']) { //如果设置了新浪管理员
			if ($sina_uid && $sina_uid == $rs['sina_uid']) { //如果已经登录新浪，并且该用户是管理员，则空处理，否则设置为空
			} else {
				USER :: uid($rs['sina_uid']); //设置为空	
			}
		} else {
			USER :: uid(''); //设置为空
		}

		USER :: set('__CLIENT_TB_USER_ID', $ret['userId']);
		USER :: set('tb_nick', $ret['nick']); //淘宝昵称
		USER :: set('tb_session', $ret['session']); //淘宝昵称
		USER :: set('__CLIENT_DOMAIN', $rs['domain']);
		USER :: set('isAdminAccount', $rs['group_id']); //设置为管理员帐号
		///前台的淘宝SESSION
		USER :: taobaoId($ret['userId']);
		USER :: set('taobao_session', $ret['session']);
		USER :: set('taobao_nick', $ret['nick']);
		USER :: set('extra', $rs); //保存用户整体信息
		//初始化SESSION 中新浪微博相关信息
		if (!empty ($rs['v2_access_token'])) {
			USER :: setOAuthKey(array (
				'access_token' => $rs['v2_access_token'],
				'refresh_token' => $rs['v2_refresh_token']
			), true); //设置当前用户oAuthKey
			DS('xweibo/xwb.setToken');
			$uInfo = DR('xweibo/xwb.verifyCredentials');
			$uInfo = $uInfo['rst'];
			USER :: uid($uInfo['id']);
			USER :: set('sina_uid', $uInfo['id']);
			USER :: set('screen_name', $uInfo['screen_name']);
			USER :: set('description', $uInfo['description']);
			//设置已读的最新消息时间戳
			$user_info = DR('mgr/userCom.getByUid', 'p', $uInfo['id']);
			$maxNoticeTime = isset ($user_info['rst']['max_notice_time']) ? $user_info['rst']['max_notice_time'] : APP_LOCAL_TIMESTAMP;
			USER :: set('user_max_notice_time', $maxNoticeTime);

		}
		//同步数据库最新信息
		$data = array (
			'tb_session' => $ret['session']
		);
		DR('mgr/adminCom.saveAdminByIdAndUserId', '', $data, $rs['id'], $ret['userId']); //该方法可指定站长ID
		APP :: redirect(URL('mgr/admin.index'), 3);
	}
	/**
	* 用户登录
	*/
	function login() {
		if ($this->_isPost()) {
			$sina_uid = trim(V('p:sina_uid'));
			$pwd = trim(V('p:password'));
			$verify_code = strtolower(V('p:verify_code'));

			if (empty ($sina_uid) || empty ($pwd)) {
				exit ('{"state":"401", "msg":"帐号或密码错误"}');
			}

			$rs = $rss = '';
			$rss = DR('mgr/adminCom.getAdminByUid', '', $sina_uid);
			if (!isset ($rss['rst'][0])) {
				exit ('{"state":"401", "msg":"帐号或密码错误"}');
			}

			$rs = $rss['rst'][0];
			if ($rs['pwd'] != md5($pwd)) {
				exit ('{"state":"401", "msg":"帐号或密码错误"}');
			}

			//检查是否启用验证码
			if (IS_USE_CAPTCHA) {
				$autocode = APP :: N('SimpleCaptcha');
				if (!$autocode->checkAuthcode($verify_code)) {
					exit ('{"state":"402", "msg":"验证码错误"}');
				}
			}

			session_regenerate_id(); //防御Session Fixation
			USER :: set('__CLIENT_ADMIN_ROOT', $rs['group_id']); //设置管理员权限
			USER :: aid($rs['id']);

			if (V('g:ajax')) {
				exit ('{"state":"200"}');
			}

			APP :: redirect(URL('mgr/admin.index'), 3);
		}
		if ($_SERVER['SERVER_NAME'] != 'www.xintaowang.com') {
			APP :: tips(array (
				'msg' => '未登录或登录超时...',
				'tpl' => 'mgr/error',
				'baseskin' => false,
				'timeout' => 3,
				'location' => TB_CONTAINER
			));
			exit;
		}

		//判断数据库中是否存在管理员
		$rs = DR('mgr/adminCom.getAdminByUid');
		if (!$rs['rst']) {
			//如果数据库中没有管理员数据，跳转到安装页面
			$this->_display('active_href');
			exit;
		}

		if (!USER :: isUserLogin()) {
			exit ('{"state":"401", "msg":"您未登录！"}');
		}

		$sina_uid = USER :: uid();
		$name = USER :: get('screen_name');

		$user = DS('mgr/userCom.getByUid', 'p', $sina_uid);
		//第一次登录，用户信息入库
		if (empty ($user) || !isset ($user['sina_uid'])) {
			$inData = array ();
			$inData['first_login'] = APP_LOCAL_TIMESTAMP;
			$inData['sina_uid'] = $sina_uid;
			$inData['nickname'] = $name;
			$r = DR('mgr/userCom.insertUser', '', $inData);
		}

		TPL :: assign('is_admin_report', USER :: get('isAdminReport')); //获取是否上报
		TPL :: assign('sina_uid', $sina_uid);
		TPL :: assign('real_name', $name);
		$this->_display('login');
	}

	/**
	* 退出登录
	*/
	function logout() {
		USER :: aid('');
		USER :: set('isInit', ''); //清空初始化标识
		USER :: set('__CLIENT_ADMIN_ROOT', '');
		session_regenerate_id(); //防御Session Fixation
		//USER::resetInfo();
		if (XT_IS_WEIBO == 'true') {
			APP :: redirect('http://' . $_SERVER['SERVER_NAME'], 3);
		} else {
			APP :: redirect('http://www.xintaowang.com', 3);
		}

	}

	/**
	* 绘制验证码
	*/
	function authcode() {
		header("Cache-Control: no-cache, must-revalidate");
		header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
		/*
				$autocode = APP :: N('authCode');
				$autocode->setImage(array('type'=>'png','width'=>70,'height'=>25));
				$autocode->paint();
		*/
		session_start();
		$autocode = APP :: N('SimpleCaptcha');
		$autocode->CreateImage();

	}

	/*
	* 管理员列表
	*/
	function userlist() {
		//实例化微博api
		$wbApi = APP :: N('weibo');

		$page = (int) V('g:page', 1);
		$each = (int) V('g:each', 15);
		$offset = ($page -1) * $each;
		$num = ($page -1) * $each;
		$sina_uid = V('g:keyword', '');

		$rss = $rs = '';
		//获取管理员数量
		$count = DR('mgr/adminCom.getAdminNum');

		$pager = APP :: N('pager');
		$page_param = array (
			'currentPage' => $page,
			'pageSize' => $each,
			'recordCount' => $count['rst'],
			'linkNumber' => 10
		);
		$pager->setParam($page_param);
		TPL :: assign('pager', $pager->makePage());

		//获取管理员基本信息
		$rss = DR('mgr/adminCom.getAdminByUid', '', $sina_uid, $offset, $each);
		//获取当前操作者的数据
		//$p = DR('mgr/adminCom.getAdminById', '', $this->_getUid());

		//$http_url = 'http://' . V('S:HTTP_HOST') . ':' . V('S:SERVER_PORT') . '/index.php?m=ta&id=';

		foreach ($rss['rst'] as $value) {
			//调用微博个人资料接口
			$userinfo = DR('mgr/userCom.getByUid', '', $value['sina_uid']);
			$value['userinfo'] = $userinfo['rst'];
			$value['http_url'] = W_BASE_HTTP . URL('ta', 'id=' . $value['sina_uid'], 'index.php');
			;
			$rs[$value['sina_uid']] = $value;
		}

		TPL :: assign('num', $num);
		TPL :: assign('list', $rs);
		//TPL :: assign('admin', $p['rst']);
		TPL :: display('mgr/admin/adminlist', '', 0, false);
	}

	/*
	 * 管理员删除
	 */
	function del() {
		$id = V('g:id', 0);
		if ($this->_getUid() == $id) {
			$this->_error('不能对自己进行删除操作', array (
				'userlist'
			));
		}

		$p = DR('mgr/adminCom.getAdminById', '', $this->_getUid()); //获取当前操作者的数据
		if (!$p['rst']['group_id'] == '1') {
			$this->_error('您无权限删除', array (
				'search'
			));
		}

		$rs = DR('mgr/adminCom.delAdmin', '', $id);
		if ($rs['rst']) {
			$this->_succ('操作已成功', array (
				'userlist'
			));
		}

		$this->_error('删除失败', array (
			'userlist'
		));
	}

	function page_link() {
		$router = V('g:router', 'home/0/0');
		$router = explode('/', $router);
		//var_dump($router);
		$menu = $this->menu;
		//var_dump($menu);
		$link = array ();
		$link[0] = array (
			'title' => $menu[$router[0]]['title'],
			'url' => $menu[$router[0]]['sub'][0]['sub'][0]['url']
		);
		//$link[1]=$menu[$router[0]]['sub'][$router[1]]['title'];
		$link[2] = array (
			'title' => $menu[$router[0]]['sub'][$router[1]]['sub'][$router[2]]['title'],
			'url' => $menu[$router[0]]['sub'][$router[1]]['sub'][$router[2]]['url']
		);

		//var_dump($link);
		TPL :: module('page_link', array (
			'link' => $link
		));
	}

	/*
	 * 管理员修改密码
	 */
	function repassword() {
		$rs = DR('mgr/adminCom.getAdminById', '', $this->_getUid()); //获取当前操作者的数据
		if ($this->_isPost()) {
			$id = (int) V('p:id', 0);
			$new_pwd = trim(V('p:pwd'));
			$re_pwd = trim(V('p:re_pwd'));
			$old_pwd = trim(V('p:old_pwd'));

			if (!$new_pwd) {
				$this->_error('请输入新密码', URL('mgr/admin.repassword', 'id=' . $id));
			}
			if ($new_pwd !== $re_pwd) {
				$this->_error('两次输入的新密码不一致', URL('mgr/admin.repassword', 'id=' . $id));
			}

			$p = DR('mgr/adminCom.getAdminById', '', $id);
			//$rs = DR('mgr/adminCom.getAdminById', '', $this->_getUid());	//获取当前操作者的数据
			if (!$p['rst']) {
				$this->_error('不存在的用户', URL('mgr/admin.repassword', 'id=' . $id));
			}
			// 如果是本人修改密码，则一定要验证旧密码
			if ($rs['rst']['id'] == $id && md5($old_pwd) !== $p['rst']['pwd']) {
				$this->_error('输入的旧密码不正确', URL('mgr/admin.repassword', 'id=' . $id));
			}
			//判断当前操作者是否为超级管理员或本人
			if ($rs['rst']['group_id'] == '1' || $rs['rst']['id'] == $id) {
				$data = array (
					'pwd' => md5($new_pwd)
				);
				$rs = DR('mgr/adminCom.saveAdminById', '', $data, $id);
				if (!$rs['rst']) {
					$this->_error('修改密码失败, 新密码可能与旧密码相同', URL('mgr/admin.repassword', 'id=' . $id));
				}
				$this->_succ('操作已成功', array (
					'repassword'
				));
			} else {
				$this->_error('您无权限修改', URL('mgr/admin.repassword', 'id=' . $id));
			}
		}

		TPL :: assign('info', $rs['rst']);
		TPL :: assign('nick', $this->_getUserInfo('screen_name'));
		TPL :: display('mgr/admin/change_password', '', 0, false);

	}

	/*
	 * 搜索用户
	 */
	function search() {
		$nickname = V('p:keyword', '');
		$page = (int) V('g:page', 1);
		$each = (int) V('g:each', 15);
		$offset = ($page -1) * $each;

		if (empty ($nickname)) {
			TPL :: display('mgr/admin/add_admin', '', 0, false);
			exit;
		}

		$rss = $rst = '';
		$rss = DR('mgr/userCom.getByName', '', $nickname, $offset, $each);
		if (empty ($rss['rst'])) {
			TPL :: display('mgr/admin/add_admin', '', 0, false);
			exit;
		}

		foreach ($rss['rst'] as $value) {
			//调用微博个人资料接口
			$rs = '';
			$userinfo = DR('xweibo/xwb.getUserShow', '', $value['sina_uid']);
			$value['userinfo'] = $userinfo['rst'];
			//搜索是否为加V用户
			$rs = DR('mgr/userCom.getVerifyById', '', $value['sina_uid']);
			if ($rs['rst']) {
				$value['is_verify'] = 1;
			}

			//搜索是否为封禁用户
			$rs = DR('mgr/userCom.getBanByUid', '', $value['sina_uid']);
			if ($rs['rst']) {
				$value['is_ban'] = 1;
			}

			$rst[$value['sina_uid']] = $value;

		}

		$count = count($rst);

		$pager = APP :: N('pager');
		$page_param = array (
			'currentPage' => $page,
			'pageSize' => $each,
			'recordCount' => $count,
			'linkNumber' => 10
		);
		$pager->setParam($page_param);

		TPL :: assign('pager', $pager->makePage());
		TPL :: assign('list', $rst);
		TPL :: display('mgr/admin/add_admin', '', 0, false);
	}

	/*
	 * 管理员添加
	 */
	function add() {
		$sina_uid = trim(V('p:uid'));
		$pwd = trim(V('p:pwd'));

		if (empty ($sina_uid)) {
			$this->_error('用户id不能为空', array (
				'search'
			));
		}

		$rst = DR('mgr/userCom.getByUid', '', $sina_uid);
		if (!$rst['rst']) {
			$this->_error('该用户不存在', array (
				'search'
			));
		}

		$p = DR('mgr/adminCom.getAdminById', '', $this->_getUid()); //获取当前操作者的数据
		if (!$p['rst']['group_id'] == '1') {
			$this->_error('您无权限添加', array (
				'search'
			));
		}

		$rs = DR('mgr/adminCom.getAdminByUid', '', $sina_uid);
		if ($rs['rst']) {
			$this->_error('该用户已是管理员', array (
				'search'
			));
		}

		$data = array (
			'sina_uid' => $sina_uid,
			'pwd' => md5($pwd),
			'group_id' => V('p:group_id'),
			'add_time' => APP_LOCAL_TIMESTAMP
		);
		$rs = DR('mgr/adminCom.saveAdminById', '', $data);
		if ($rs['rst']) {
			$this->_succ('操作已成功', array (
				'userlist'
			));
		}
		$this->_error('添加失败', array (
			'search'
		));
	}
}