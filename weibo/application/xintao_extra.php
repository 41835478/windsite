<?php


//后置，增加后续各种配置
/// 系统文件缓存的数据目录
define('P_VAR_CACHE_TB', P_VAR . "/cache_xt/cache_taobao");
define('P_VAR_CACHE_TB_TV', P_VAR . "/cache_xt/cache_tv");
define('P_VAR_CACHE_TB_ITEMS', P_VAR . "/cache_xt/cache_items");
define('P_VAR_CACHE_TB_ITEM', P_VAR . "/cache_xt/cache_item");
define('P_VAR_CACHE_TB_SHOPS', P_VAR . "/cache_xt/cache_shops");
define('P_VAR_CACHE_TB_SHOP', P_VAR . "/cache_xt/cache_shop");
define('P_VAR_CACHE_TB_POSTERS', P_VAR . "/cache_xt/cache_posters");
define('P_VAR_CACHE_TB_POSTER', P_VAR . "/cache_xt/cache_poster");
define('P_VAR_CACHE_TB_VANCLS', P_VAR . "/cache_xt/cache_vancls");
define('P_VAR_CACHE_TB_VANCL', P_VAR . "/cache_xt/cache_vancl");

define('CACHE_1', '3600');
define('CACHE_2', '7200');
define('CACHE_24', '86400');
define('CACHE_24X3', '259200');
define('CACHE_24X7', '604800');
define('CACHE_24X30', '2592000');
define('CACHE_24X60', '2592000');
$tpl = & $cfg['tpl'];
$tpl['title']['_suf'] = '';
$tpl['cache_time']['pagelet_24'] = 100; //店铺搜索类缓存时间24小时
$tpl['cache_time']['pagelet_24X30'] = 2592000; //分类搜索类缓存时间30天
///BETA测试人员
$cfg['beta'] = include_once (dirname(__FILE__) . '/../xintao/betas.php'); //临时授权用户
///后台管理收费公用功能
$COMMON_FUNC = array (
	'mgr/xintao/sitemap',
	'mgr/xintao/xintao',
	'mgr/plugins\.config',
	'mgr/plugins\.save',
	'mgr/notice',
	'mgr/user_recommend\.delUserById',
	'mgr/user_recommend\.addReUser',
	'mgr/plugins\.pluginGuideView',
	'mgr/plugins\.itemgroup',
	'mgr/user_recommend\.addReSort',
	'mgr/user_recommend\.setUserRemark',
	'mgr/setting\.editUser',
	'mgr/proxy_account',
	'mgr/setting\.editIndex',
	'mgr/setting.uploadLogo',
	'mgr/ad\.ad_list',
	'mgr/ad\.edit',
	'mgr/ad\.stateChg',
	'mgr/setting\.header',
	'mgr/setting\.updateHeader',
	'mgr/page_nav\.default_action',
	'mgr/page_nav\.updatePageType',
	'mgr/page_manager',
	'mgr/skin.getAllSkin',
	'mgr/skin.setSkinDefault',
	'mgr/feedback',
	'mgr/events',
	'mgr/setting\.getlink',
	'mgr/setting\.editLink',
	'mgr/setting\.delLink',
	'mgr/users',
	'mgr/user_recommend',
	'mgr/user_verify',
	'mgr/admin\.map',
	'mgr/celeb_mgr',
	'mgr/xintao/domains\.bindDomainView',
	'mgr/xintao/domains\.save',
	'mgr/page_manager',
	'mgr/page_nav',
	'mgr/xintao/seo',
	'mgr/xintao/track'
);
///后台
$commonsStr = implode(',', $COMMON_FUNC);
$cfg['appstore']['back'] = array (
	XT_APPSTORE_FREE => 'mgr/xintao/wowMgr,mgr/xintao/yingxiaoWeibo,mgr/xintao/xintao,mgr/xintao/domains\.buchang,mgr/xintao/domains\.buchangSave,mgr/xintao/autoCron,mgr/admin\.index,mgr/admin\.default_page,mgr/xintao/active_admin',
	XT_APPSTORE_SELLER_SINGLE => $commonsStr . ',mgr/xintao/taoke_sites',
	XT_APPSTORE_SELLER_MULTI => $commonsStr . ',mgr/xintao/taoke_sites',
	XT_APPSTORE_TAOKE => $commonsStr . ',mgr/xintao/taokeGroup',
	XT_APPSTORE_VANCL => $commonsStr . ',mgr/xintao/vancl_manager'
);
///不能设置为导航菜单的页面标识
$cfg['uninclude_nav'] = array (
	'35',
	'994',
	'987',
	'988',
	'989',
	'995',
	'996',
	'7',
	'8',
	'801'
);
///TODO 不能设置为首页的页面标识
$cfg['uninclude_home'] = array (
	'2',
	'4',
	'37',
	'35',
	'994',
	'987',
	'988',
	'989',
	'995',
	'996',
	'7',
	'8',
	'801'
);
///TODO 不能设置SEO的页面标识
$cfg['uninclude_seo'] = array (
	'2',
	'4',
	'7',
	'8',
	'35',
	'37',
	'988',
	'989',
	'992',
	'993',
	'994',
	'995',
	'996',
	'997',
	'998',
	'999',
	'801',
	'700'
);
///TODO 不能设置的页面标识
$cfg['uninclude_set'] = array (
	'3',
	'4',
	'6',
	'7',
	'8',
	'35',
	'37',
	'987',
	'988',
	'989',
	'990',
	'991',
	'992',
	'993',
	'994',
	'995',
	'996',
	'1000',
	'700'
);
///视频两侧广告位随机图片
$cfg['tvAdPics'] = array (
	'T1mIGzXottXXXXXXXX-190-300.png',
	'T15qauXoJzXXXXXXXX-190-300.png',
	'T1whuwXnVwXXXXXXXX-190-300.png',
	'T1dOiyXhdQXXXXXXXX-190-300.png',
	'T1lTCxXfNhXXXXXXXX-190-300.png',
	'T1BKqzXh0CXXXXXXXX-190-300.png'
);
$cfg['autoCron'] = array (
	'1' => '亲!新品上架喽,[宝贝标题],￥[宝贝价格],详情:[宝贝链接]',
	'2' => '哇!又卖出一件,[宝贝标题],￥[宝贝价格],详情:[宝贝链接]',
	'3' => '哈哈!又收到好评啦,[宝贝标题],￥[宝贝价格],详情:[宝贝链接]',
	'100' => '给力!店主热荐,[宝贝标题],￥[宝贝价格],详情:[宝贝链接]'
);
//需要检查权限的页面
$cfg['check_pages'] = array (
	'990' => array (
		XT_APPSTORE_SELLER_SINGLE,
		XT_APPSTORE_SELLER_MULTI
	),
	'1000' => array (
		XT_APPSTORE_TAOKE,
		XT_APPSTORE_SELLER_MULTI
	),
	'999' => array (
		XT_APPSTORE_TAOKE,
		XT_APPSTORE_SELLER_MULTI
	),
	'998' => array (
		XT_APPSTORE_TAOKE,
		XT_APPSTORE_SELLER_MULTI
	),
	'997' => array (
		XT_APPSTORE_VANCL
	),
	'996' => array (
		XT_APPSTORE_VANCL
	),
	'995' => array (
		XT_APPSTORE_TAOKE,
		XT_APPSTORE_SELLER_MULTI
	),
	'994' => array (
		XT_APPSTORE_SELLER_SINGLE,
		XT_APPSTORE_SELLER_MULTI,
		XT_APPSTORE_TAOKE
	),
	'989' => array (
		XT_APPSTORE_TAOKE,
		XT_APPSTORE_SELLER_MULTI
	),
	'988' => array (
		XT_APPSTORE_TAOKE,
		XT_APPSTORE_SELLER_MULTI
	),
	'800' => array (
		XT_APPSTORE_TAOKE,
		XT_APPSTORE_SELLER_MULTI
	),
	'700' => array (
		XT_APPSTORE_TAOKE,
		XT_APPSTORE_SELLER_MULTI
	)
);
//内置页面描述
$cfg['sys_pages'] = array (
	'1' => array (
		'page_id' => '1',
		'page_name' => '微博广场',
		'url' => 'pub',
		'native' => 1,
		'desc' => '“微博广场”是用户免登录即可查看的页面，包含了今日话题、随便看看等组件。',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'2' => array (
		'page_id' => '2',
		'page_name' => '我的首页',
		'url' => 'index',
		'native' => 1,
		'desc' => '“我的首页”是登录用户操作微博的页面，包含了猜你喜欢、推荐话题等组件。',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'4' => array (
		'page_id' => '4',
		'page_name' => '我的微博',
		'url' => 'index.profile',
		'native' => 1,
		'desc' => '我的微博',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'37' => array (
		'page_id' => '37',
		'page_name' => '我的收藏',
		'url' => 'index.favorites',
		'native' => 1,
		'desc' => '我的收藏',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'3' => array (
		'page_id' => '3',
		'page_name' => '名人堂',
		'url' => 'celeb',
		'native' => 1,
		'desc' => '名人堂',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'6' => array (
		'page_id' => '6',
		'page_name' => '话题排行榜',
		'url' => 'pub.topics',
		'native' => 1,
		'desc' => '话题排行榜',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	/*'7' => array (
		'page_id' => '7',
		'page_name' => '在线直播',
		'url' => 'live',
		'native' => 1,
		'desc' => '在线直播扩展工具',
		'keyword' => '',
		'description' => '',
		'type'=>'0'
	),
	'8' => array (
		'page_id' => '8',
		'page_name' => '在线访谈',
		'url' => 'interview',
		'native' => 1,
		'desc' => '在线访谈扩展工具',
		'keyword' => '',
		'description' => '',
		'type'=>'0'
	),*/
	'35' => array (
		'page_id' => '35',
		'page_name' => '活动首页',
		'url' => 'event',
		'native' => 1,
		'desc' => '活动列表页，包括最新活动和推荐活动',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),

	'990' => array (
		'page_id' => '990',
		'page_name' => '官方店铺',
		'url' => 'products',
		'native' => 1,
		'desc' => '“官方店铺”推广自己的淘宝店铺，支持多店铺---(需订购卖家服务)',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'998' => array (
		'page_id' => '998',
		'page_name' => '商品导购',
		'url' => 'items',
		'native' => 1,
		'desc' => '“商品导购”通过推广淘宝数以亿计的淘宝客商品来赚取佣金---(需订购卖家服务)',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'994' => array (
		'page_id' => '994',
		'page_name' => '商品详情页',
		'url' => 'item',
		'native' => 1,
		'desc' => '“商品详情页”显示并推广单个淘宝商品---(需订购卖家服务)',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'700' => array (
		'page_id' => '700',
		'page_name' => '会员分享',
		'url' => 'wow',
		'native' => 1,
		'desc' => '“会员分享”提供最新，最热的女人，男人，生活，创意四大分类，26小类淘宝商品的分享记录，系统每天自动更新',
		'keyword' => '',
		'description' => '',
		'isValid' => true,
		'type' => '0'
	),
	'800' => array (
		'page_id' => '800',
		'page_name' => '影视搜索',
		'url' => 'tv.search',
		'native' => 1,
		'desc' => '“影视搜索”提供最新，最热的电影，电视剧，综艺，娱乐，新闻，动漫，音乐，纪录片，健康等视频搜索服务',
		'keyword' => '',
		'description' => '',
		'isValid' => true,
		'type' => '0'
	),
	'801' => array (
		'page_id' => '801',
		'page_name' => '视频详情页',
		'url' => 'tv.search',
		'native' => 1,
		'desc' => '“视频详情页”提供最新，最热的电影，电视剧，综艺，娱乐，新闻，动漫，音乐，纪录片，健康等视频播放服务',
		'keyword' => '',
		'description' => '',
		'isValid' => true,
		'type' => '0'
	),
	'989' => array (
		'page_id' => '989',
		'page_name' => '店铺导购',
		'url' => 'item',
		'native' => 1,
		'desc' => '“店铺导购”通过推广淘宝数以百万计的淘宝客店铺来赚取佣金---(需订购卖家服务)',
		'keyword' => '',
		'description' => '',
		'isValid' => false,
		'type' => '0'
	),
	'988' => array (
		'page_id' => '988',
		'page_name' => '店铺详情页',
		'url' => 'item',
		'native' => 1,
		'desc' => '“店铺详情页”显示并推广单个淘宝店铺---(需订购卖家服务)',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	/*'1000' => array (
		'page_id' => '1000',
		'page_name' => '试衣间',
		'url' => 'fiting',
		'native' => 1,
		'desc' => '“试衣间”通过淘宝试衣间来推广淘宝客商品赚取佣金---(需订购卖家服务)',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),*/
	'999' => array (
		'page_id' => '999',
		'page_name' => '画报导购',
		'url' => 'posters',
		'native' => 1,
		'desc' => '“导购画报”通过淘宝导购画报来推广淘宝客商品赚取佣金---(需订购卖家服务)',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	'995' => array (
		'page_id' => '995',
		'page_name' => '画报详情页',
		'url' => 'poster',
		'native' => 1,
		'desc' => '“画报详情页”显示并推广单个淘画报---(需订购卖家服务)',
		'keyword' => '',
		'description' => '',
		'type' => '0'
	),
	/*'997' => array (
		'page_id' => '997',
		'page_name' => '凡客导购',
		'url' => 'vancls',
		'native' => 1,
		'desc' => '“凡客导购”通过推广凡客诚品商品来赚取佣金---(需订购凡客服务)',
		'keyword' => '',
		'description' => '',
		'isValid' => false,
		'type' => '0'
	),
	'996' => array (
		'page_id' => '996',
		'page_name' => '凡客详情页',
		'url' => 'vancl',
		'native' => 1,
		'desc' => '“凡客详情页”显示并推广单个凡客商品---(需订购凡客服务)',
		'keyword' => '',
		'description' => '',
		'isValid' => false,
		'type' => '0'
	),
	'993' => array (
		'page_id' => '993',
		'page_name' => '商城导购',
		'url' => 'malls',
		'native' => 1,
		'desc' => '“商城导购”显示并推广国内主流B2C商城---(需订购商城服务)',
		'keyword' => '',
		'description' => '',
		'isValid' => false,
		'type' => '0'
	),
	'992' => array (
		'page_id' => '992',
		'page_name' => '商城详情页',
		'url' => 'malls',
		'native' => 1,
		'desc' => '“商城详情页”显示并推广单个B2C商城---(需订购商城服务)',
		'keyword' => '',
		'description' => '',
		'isValid' => false,
		'type' => '0'
	),
	'991' => array (
		'page_id' => '991',
		'page_name' => '网址大全',
		'url' => 'malls',
		'native' => 1,
		'desc' => '“网址大全”提供最简单便捷的网上导航服务',
		'keyword' => '',
		'description' => '',
		'isValid' => false,
		'type'=>'0'
	),*/
	'987' => array (
		'page_id' => '987',
		'page_name' => '合作商家',
		'url' => 'malls',
		'native' => 1,
		'desc' => '“合作商家”显示站内推荐淘宝店铺',
		'keyword' => '',
		'description' => '',
		'isValid' => false,
		'type' => '0'
	)
);
//新淘高清影视，商品推广
$aditem = & $cfg['aditem'];
$aditem = array (
	'TR_FS' => array (
		'name' => 'TR_FS',
		'title' => '服饰'
	),
	'TR_MY' => array (
		'name' => 'TR_MY',
		'title' => '母婴'
	),
	'TR_SP' => array (
		'name' => 'TR_SP',
		'title' => '食品'
	),
	'TR_WT' => array (
		'name' => 'TR_WT',
		'title' => '文体'
	),
	'TR_JJ' => array (
		'name' => 'TR_JJ',
		'title' => '家居'
	),
	'TR_ZH' => array (
		'name' => 'TR_ZH',
		'title' => '车|玩具|宠物'
	)
);
//画报
$poster = & $cfg['poster'];
$poster = array (
	'1' => array (
		"id" => '1',
		"title" => "数码"
	),
	'2' => array (
		"id" => '2',
		"title" => "服饰"
	),
	'3' => array (
		"id" => '3',
		"title" => "男人"
	),
	'4' => array (
		"id" => '4',
		"title" => "运动"
	),
	'5' => array (
		"id" => '5',
		"title" => "居家"
	),
	'6' => array (
		"id" => '6',
		"title" => "亲子"
	),
	'7' => array (
		"id" => '7',
		"title" => "时尚"
	),
	'8' => array (
		"id" => '8',
		"title" => "美容"
	),
	'9' => array (
		"id" => '9',
		"title" => "女人"
	),
	/*'10' => array (
		"id" => '10',
		"title" => "社区"
	),
	'11' => array (
		"id" => '11',
		"title" => "博客"
	),*/
	'13' => array (
		"id" => '13',
		"title" => "创意站"
	),
	'14' => array (
		"id" => '14',
		"title" => "汽车"
	),
	'15' => array (
		"id" => '15',
		"title" => "娱乐"
	),
	'16' => array (
		"id" => '16',
		"title" => "明星"
	),
	'17' => array (
		"id" => '17',
		"title" => "宠物"
	),
	'18' => array (
		"id" => '18',
		"title" => "旅游"
	),
	'20' => array (
		"id" => '20',
		"title" => "图实惠"
	),
	'21' => array (
		"id" => '21',
		"title" => "结婚"
	),
	'22' => array (
		"id" => '22',
		"title" => "旺铺"
	)
);
//笑话
$xiaohua = & $cfg['xiaohua'];
$xiaohua = array (
	'25' => array (
		'id' => '25',
		'title' => '综合'
	),
	'1' => array (
		'id' => '1',
		'title' => '爱情'
	),
	'2' => array (
		'id' => '2',
		'title' => '爆笑'
	),
	'3' => array (
		'id' => '3',
		'title' => '电脑'
	),
	'5' => array (
		'id' => '5',
		'title' => '儿童'
	),
	'6' => array (
		'id' => '6',
		'title' => '夫妻'
	),
	'7' => array (
		'id' => '7',
		'title' => '古代'
	),
	'9' => array (
		'id' => '9',
		'title' => '家庭'
	),
	'13' => array (
		'id' => '13',
		'title' => '军事'
	),
	'16' => array (
		'id' => '16',
		'title' => '顺口溜'
	),
	'19' => array (
		'id' => '19',
		'title' => '文化'
	),
	'20' => array (
		'id' => '20',
		'title' => '校园'
	),
	'21' => array (
		'id' => '21',
		'title' => '医疗'
	)
);
//搜狐视频
$bokes = & $cfg['bokes'];
$bokes = array (
	'1' => array (
		'id' => '1',
		'title' => '社会',
		'name' => 'society'
	),
	'2' => array (
		'id' => '2',
		'title' => '搞笑',
		'name' => 'funny'
	),
	'3' => array (
		'id' => '3',
		'title' => '综艺',
		'name' => 'zongyi'
	),
	'4' => array (
		'id' => '4',
		'title' => '影视',
		'name' => 'movie'
	),
	'5' => array (
		'id' => '5',
		'title' => '音乐',
		'name' => 'music'
	),
	'6' => array (
		'id' => '6',
		'title' => '游戏',
		'name' => 'game'
	),
	'7' => array (
		'id' => '7',
		'title' => '动漫',
		'name' => 'comic'
	),
	'8' => array (
		'id' => '8',
		'title' => '原创',
		'name' => 'original'
	),
	'9' => array (
		'id' => '9',
		'title' => '广告',
		'name' => 'ad'
	),
	'10' => array (
		'id' => '10',
		'title' => '体育',
		'name' => 'sports'
	),
	'11' => array (
		'id' => '11',
		'title' => '科教',
		'name' => 'science'
	),
	'12' => array (
		'id' => '12',
		'title' => '汽车',
		'name' => 'car'
	),
	'13' => array (
		'id' => '13',
		'title' => '宠物',
		'name' => 'pet'
	),
	'14' => array (
		'id' => '14',
		'title' => '军事',
		'name' => 'war'
	),
	'15' => array (
		'id' => '15',
		'title' => '旅游',
		'name' => 'travel'
	),
	'16' => array (
		'id' => '16',
		'title' => '其他',
		'name' => 'other'
	)
);
$wow = & $cfg['wow'];
$wow = array (
	'1' => array (
		'name' => 'lady',
		'title' => '女人',
		'sub' => array (
			102 => array (
				'title' => '上装',
				'ico' => 'wow-f-coa'
			),
			103 => array (
				'title' => '裤子',
				'ico' => 'wow-f-pan'
			),
			104 => array (
				'title' => '裙子',
				'ico' => 'wow-f-ski'
			),
			105 => array (
				'title' => '鞋子',
				'ico' => 'wow-f-sho'
			),
			106 => array (
				'title' => '内衣',
				'ico' => 'wow-f-und'
			),
			107 => array (
				'title' => '箱包',
				'ico' => 'wow-f-han'
			),
			108 => array (
				'title' => '配饰',
				'ico' => 'wow-f-acc'
			)
		)
	),
	'2' => array (
		'name' => 'man',
		'title' => '男人',
		'sub' => array (
			202 => array (
				'title' => '上装',
				'ico' => 'wow-m-coa'
			),
			203 => array (
				'title' => '下装',
				'ico' => 'wow-m-pan'
			),
			204 => array (
				'title' => '正装',
				'ico' => 'wow-m-dre'
			),
			205 => array (
				'title' => '鞋',
				'ico' => 'wow-m-sho'
			),
			206 => array (
				'title' => '箱包配饰',
				'ico' => 'wow-m-bag'
			),
			207 => array (
				'title' => '内衣',
				'ico' => 'wow-m-und'
			),
			208 => array (
				'title' => '户外',
				'ico' => 'wow-m-out'
			)
		)
	),
	'3' => array (
		'name' => 'life',
		'title' => '生活',
		'sub' => array (
			302 => array (
				'title' => '家居',
				'ico' => 'wow-l-hom'
			),
			303 => array (
				'title' => '床品布艺',
				'ico' => 'wow-l-bed'
			),
			304 => array (
				'title' => '日用百货',
				'ico' => 'wow-l-goo'
			),
			305 => array (
				'title' => '汽车用品',
				'ico' => 'wow-l-aut'
			),
			306 => array (
				'title' => '爱好娱乐',
				'ico' => 'wow-l-ins'
			),
			307 => array (
				'title' => '食品',
				'ico' => 'wow-l-foo'
			)
		)
	),
	'4' => array (
		'name' => 'idea',
		'title' => '创意',
		'sub' => array (
			402 => array (
				'title' => '趣味办公',
				'ico' => 'wow-c-off'
			),
			403 => array (
				'title' => '创意家居',
				'ico' => 'wow-c-hom'
			),
			404 => array (
				'title' => '极客酷玩',
				'ico' => 'wow-c-gee'
			),
			405 => array (
				'title' => '潮人潮物',
				'ico' => 'wow-c-pop'
			),
			406 => array (
				'title' => '笔记本平板',
				'ico' => 'wow-c-lap'
			),
			407 => array (
				'title' => 'DIY台式机',
				'ico' => 'wow-c-diy'
			)
		)
	)
);
$tvs = & $cfg['sotv'];
$tvs = array (
	'1' => array (
		'id' => '1',
		'name' => 'movie',
		'title' => '电影',
		'api' => 'movie/category'
	),
	'2' => array (
		'id' => '2',
		'name' => 'teleplay',
		'title' => '电视剧',
		'api' => 'teleplay/category'
	),
	'7' => array (
		'id' => '7',
		'name' => 'zongyi',
		'title' => '综艺',
		'api' => 'zongyi/category'
	),
	'8' => array (
		'id' => '8',
		'name' => 'real',
		'title' => '纪录片',
		'api' => 'documentary/category'
	),
	'13' => array (
		'id' => '13',
		'name' => 'yule',
		'title' => '娱乐',
		'api' => ''
	),
	'16' => array (
		'id' => '16',
		'name' => 'comic',
		'title' => '动漫',
		'api' => 'animation/category'
	),
	'21' => array (
		'id' => '21',
		'name' => 'education',
		'title' => '教育',
		'api' => 'education/category'
	),
	'24' => array (
		'id' => '24',
		'name' => 'music',
		'title' => '音乐',
		'api' => 'music/category'
	),
	'1300' => array (
		'id' => '1300',
		'name' => 'news',
		'title' => '新闻',
		'api' => ''
	),
	'1301' => array (
		'id' => '1301',
		'name' => 'health',
		'title' => '健康',
		'api' => ''
	),
	'9001' => array (
		'id' => '9001',
		'name' => 'boke',
		'title' => '播客',
		'api' => 'boke/category'
	)
);