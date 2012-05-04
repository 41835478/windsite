<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class autoCron_mod extends action {
	var $AUTO_CRONS = "";

	function autoCron_mod() {
		parent :: action();
		$crons = V('-:autoCron');
		$this->AUTO_CRONS = "INSERT INTO `xwb_xt_cron` VALUES ('1', '新品上架自动发微博', null, '" . $crons['1'] . "', '0', USER_ID, '0','auto'),('2', '宝贝售出自动发微博', null, '" . $crons['2'] . "', '0', USER_ID, '0','auto'),('3', '买家好评自动发微博', null, '" . $crons['3'] . "', '0', USER_ID, '0','auto'),('100', '橱窗推荐自动发微博', null, '" . $crons['100'] . "', '0', USER_ID, '0','auto');";
	}

	function yingxiao() {
		$yingxiao = DS('mgr/xintao/cronCom.getYingxiao', '', XT_USER_ID);
		if (empty ($yingxiao)) { //不存在，则自动生成
			$xhS = V('-:xiaohua');
			$xhR = array_rand($xhS, 5);
			//5个笑话随机分类
			$xiaohua = array (
				$xhS[$xhR[0]]['id'],
				$xhS[$xhR[1]]['id'],
				$xhS[$xhR[2]]['id'],
				$xhS[$xhR[3]]['id'],
				$xhS[$xhR[4]]['id']
			);
			$poster = array ();
			$tv = array ();
			$taoke = array ();
			$crons = array (
				'xiaohua' => 2,
				'poster' => 0,
				'tv' => 0,
				'taokeItem' => 2
			);
			if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') { //正是订购用户
				$pS = V('-:poster');
				$tvS = V('-:sotv');
				$pR = array_rand($pS, 5);
				$tvR = array_rand($tvS, 5);
				//5个画报随机
				$poster = array (
					$pS[$pR[0]]['id'],
					$pS[$pR[1]]['id'],
					$pS[$pR[2]]['id'],
					$pS[$pR[3]]['id'],
					$pS[$pR[4]]['id']
				);
				//5个视频随机
				$tv = array (
					$tvS[$tvR[0]]['id'],
					$tvS[$tvR[1]]['id'],
					$tvS[$tvR[2]]['id'],
					$tvS[$tvR[3]]['id'],
					$tvS[$tvR[4]]['id']
				);
				$crons['taokeItem'] = 8;
				$crons['xiaohua'] = 8;
				$crons['poster'] = 8;
				$crons['tv'] = 8;

			}
			$taoke = array (
				'shop',
				'item'
			);
			DS('mgr/xintao/cronCom.saveYingxiao', '', array (
				'user_id' => XT_USER_ID,
				'metadata' => json_encode(array (
					'xiaohua' => $xiaohua,
					'poster' => $poster,
					'tv' => $tv,
					'taoke' => $taoke
				)),
				'crons' => json_encode($crons)
			));
			$yingxiao = DS('mgr/xintao/cronCom.getYingxiao', '', XT_USER_ID);
		}
		$yingxiao['metadata'] = json_decode($yingxiao['metadata'], true);
		$yingxiao['crons'] = json_decode($yingxiao['crons'], true);
		TPL :: assign('yingxiao', $yingxiao);
		TPL :: display('mgr/xintao/yingxiao', '', 0, false);
	}
	function yingxiaoSave() {
		$meta = (array) V('p:meta', array (
			'xiaohua' => array (),
			'poster' => array (),
			'tv' => array (),
			'taoke' => array ()
		));
		$crons = (array) V('p:crons', array (
			'xiaohua' => 2,
			'poster' => 0,
			'tv' => 0,
			'taokeItem' => 2
		));
		//print_r(V('p'));
		//exit;
		if (!empty ($meta)) {
			if (XT_IS_WEIBO == 'false') { //TODO 如果不是增值服务用户，则自动清空画报，影视
				$meta['poster'] = array ();
				$meta['tv'] = array ();
			}
			if (XT_IS_WEIBO == 'false') {
				$crons['taokeItem'] = 2;
				$crons['xiaohua'] = 2;
				$crons['poster'] = 0;
				$crons['tv'] = 0;
			}
			$crons = json_encode($crons);
			$meta = json_encode($meta);
			$db = APP :: ADP('db');
			$sql = 'UPDATE ' . $db->getTable(T_XT_YINGXIAO) . ' set `metadata`=\'' . $meta . '\',`crons`=\'' . $crons . '\' WHERE `user_id`=' . XT_USER_ID;
			$rst = $db->execute($sql);
		}
		$this->_succ('保存设置成功', URL('mgr/xintao/autoCron.yingxiao'));
	}
	function default_action() {
		if (XT_SIDS == '') {
			$this->_error('您尚未在淘宝开店');
		}
		if (XT_IS_SINGLE == 'false' && XT_IS_MULTI == 'false') {
			$this->_error('您必须订购单店铺或多店铺服务');
		}
		$crons = DS('mgr/xintao/cronCom.getAutoCron');
		if (!$crons || count($crons) == 0 && $this->AUTO_CRONS != "") { //如果未初始化，则插入
			$db = APP :: ADP('db');
			$rst = $db->execute(str_replace('USER_ID', XT_USER_ID, $this->AUTO_CRONS));
			if ($rst) {
				$crons = DS('mgr/xintao/cronCom.getAutoCron');
			}
		}
		TPL :: assign('crons', $crons);
		TPL :: display('mgr/xintao/autoCron', '', 0, false);
	}
	function updateTemplate() {
		$id = V('g:id');
		$template = V('g:template');
		$rst = DR('mgr/xintao/cronCom.save', '', array (
			'metadata' => $template
		), $id); //更新模板
		if ($rst['rst'] || $rst['errno'] == 0) {
			APP :: ajaxRst('模板修改成功');
		} else {
			APP :: ajaxRst('', 11000, '模板修改失败');
		}
	}
	function setIsValid() {
		$id = V('g:id');
		$isValid = V('g:isValid');
		$rst = DR('mgr/xintao/cronCom.save', '', array (
			'isValid' => $isValid == 1 ? '1' : '0'
		), $id); //更新状态
		if ($rst['rst'] && $rst['rst'] > 0) {
			APP :: ajaxRst($isValid == 1 ? 'start' : 'stop');
		} else {
			APP :: ajaxRst('', 11000, $isValid == 1 ? '启用失败' : '停止失败');
		}
	}
	function checkComet() {
		$count = DS('mgr/xintao/cronCom.getAutoCronNum');
		if ($count > 0) { //开启主动通知
			$ret = TB('top/TopClient.incrementCustomersGet', '', array (
				'nicks' => XT_USER_NICK
			));
			if ($ret['rst']) {
				if ($ret['rst']['total_results'] == 0) {
					$ret = TB('top/TopClient.incrementCustomerPermit', '', USER :: get('tb_session'));
					print_r($ret);
					exit ('开启主动通知');
				}
			}
		} else { //关闭主动通知
			$ret = TB('top/TopClient.incrementCustomersGet', false, array (
				'nicks' => XT_USER_NICK
			));
			if ($ret['rst']) {
				if ($ret['rst']['total_results'] == 1) {
					$ret = TB('top/TopClient.incrementCustomerStop', '', XT_USER_NICK);
					print_r($ret);
					exit ('关闭主动通知');
				}
			}
		}
	}

}