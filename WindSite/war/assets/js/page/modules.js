var MODULE_SHOP = {
	name : 'shopDetailShop',
	title : '店铺信息',
	icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
	desc : '显示当前商品所在店铺的信息，此模块目前仅在宝贝详情页侧边栏使用',
	order : 0,
	type : 0,
	adType : 'shop',
	layout : '1',
	content : 'bd',
	limit : 1,
	isHd : true,
	isNew : false,
	v : 1.5
}
var MODULE_ITEMHOT = {
	name : 'shopDetailHot',
	title : '同类热卖推荐',
	icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
	desc : '显示当前商品所属类目下销量最高的同类推广商品，此模块目前仅在宝贝详情页侧边栏使用',
	order : 0,
	type : 0,
	adType : 'item',
	layout : '1',
	content : 'bd',
	limit : 1,
	isHd : true,
	isNew : false,
	v : 1.5
}
var MODULE_SEARCHHOT = {
	name : 'shopSearchHot',
	title : '热卖推荐',
	icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
	desc : '显示当前搜索条件下的热卖推广商品，此模块目前仅在搜索列表页侧边栏使用',
	order : 0,
	type : 0,
	adType : 'item',
	layout : '1',
	content : 'bd',
	limit : 1,
	isHd : true,
	isNew : false,
	v : 1.5
}
/**
 * 模块
 * 
 * @property name 英文名
 * @property title 中文名
 * @property desc 描述
 * @property icon 图标
 * @property order 排序
 * @property type 类型(0:基础模块，1:外部模块)
 * @property adType 推广类型(item,shop,cat,blog,page,poster,other)
 * @property layout 布局(1:190,2:550,3:750,4:950)
 * @property content 适合的位置(hd:页头,bd:内容区)
 * @property limit 并存数量(0不限制)
 * @type
 */
var MODULES = [{
			name : 'shopBaidu',
			title : '百度推广',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个百度联盟推广模块。',
			order : 0,
			type : 1,
			adType : 'baidu',
			layout : '1,2,3,4,5',
			content : 'bd',
			limit : 2,
			isHd : false,
			isNew : true,
			v : 1.6
		}, {
			name : 'shopGoogle',
			title : 'Google AdSense',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个Google AdSense推广模块。',
			order : 0,
			type : 1,
			adType : 'google',
			layout : '1,2,3,4,5',
			content : 'bd',
			limit : 2,
			isHd : false,
			isNew : false,
			v : 1.6
		}, {
			name : 'shopAlimama',
			title : '淘宝联盟',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个淘宝联盟推广模块。',
			order : 0,
			type : 1,
			adType : 'alimama',
			layout : '1,2,3,4,5',
			content : 'bd',
			limit : 2,
			isHd : false,
			isNew : false,
			v : 1.6
		}, {
			name : 'shopLogo',
			title : 'LOGO搜索条',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个带有LOGO的宝贝，店铺搜索条，买家通过输入关键词来搜索淘宝推广宝贝或店铺。',
			order : 0,
			type : 0,
			adType : 'item',
			layout : '4',
			content : 'hd',
			limit : 1,
			isHd : false,
			isNew : false,
			v : 1.5
		}, {
			name : 'shopMallTabNav',
			title : '返现商城分类菜单导航条',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个支持下拉菜单的返现商城导航条，内容包括：返现商城的分类及该分类下的返现商城',
			order : 0,
			type : 0,
			adType : 'cat',
			layout : '4',
			content : 'hd',
			limit : 1,
			isHd : false,
			isNew : true,
			v : 2
		}, {
			name : 'shopTabNav',
			title : '下拉菜单导航条',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个支持下拉菜单的导航条，内容包括：您已发布的自定义页面下拉，以及系统提供的22个分类下拉',
			order : 0,
			type : 0,
			adType : 'cat',
			layout : '4',
			content : 'hd',
			limit : 1,
			isHd : false,
			isNew : true,
			v : 1.5
		}, {
			name : 'shopHeader',
			title : '导航条模块',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个导航条，可选配置背景(图片，flash)',
			order : 0,
			type : 0,
			adType : 'item',
			layout : '4',
			content : 'hd',
			limit : 1,
			isHd : false,
			isNew : false,
			v : 1.5
		}, {
			name : 'shopSearch',
			title : '页头宝贝搜索框',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个宝贝搜索条，买家通过输入关键词来搜索淘宝推广宝贝。',
			order : 0,
			type : 0,
			adType : 'item',
			layout : '4',
			content : 'hd',
			limit : 1,
			isHd : false,
			isNew : false,
			v : 1.5
		}, {
			name : 'shopCustom',
			title : '页头自定义内容区',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '您可以通过编辑器输入文字、图片，可以点击工具栏上的源代码按钮，通过输入html代码的形式编辑内容。',
			order : 0,
			type : 0,
			adType : 'other',
			layout : '4',
			content : 'hd',
			limit : 1,
			isHd : false,
			isNew : false,
			v : 1.5
		}, {
			name : 'shopDisplay',
			title : '宝贝推广(自动)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，卖家，推广组来配置相对应的宝贝自动显示在页面中。',
			order : 0,
			type : 0,
			adType : 'item',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 4,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopDisplay',
			title : '店铺推广(自动)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，店铺收藏分组来配置相对应的店铺自动显示在页面中。',
			order : 0,
			type : 0,
			adType : 'shop',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 4,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopMarketCat',
			title : '市场分类',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据您的分类选择。显示该分类下所有热卖分类',
			order : 0,
			type : 0,
			adType : 'cat',
			layout : '3',
			content : 'bd',
			limit : 20,
			isHd : false,
			isNew : true,
			v : 1
		}, {
			name : 'shopLadyCategory',
			title : '女装分类',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据您选择的女装二级分类，显示该分类下的热门分类或关键词搜索',
			order : 0,
			type : 0,
			adType : 'cat',
			layout : '1,3,4',
			content : 'bd',
			limit : 8,
			isHd : false,
			isNew : true,
			v : 1
		}, {
			name : 'shopBrand',
			title : '品牌库',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据品牌分类，列出指定数量的淘宝商城品牌旗舰店',
			order : 0,
			type : 0,
			adType : 'shop',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopComplexA',
			title : '综合类模块',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据卖家昵称，自动显示该卖家下商品及同类推荐店铺，或者根据推广组配置显示商品，店铺',
			order : 0,
			type : 0,
			adType : 'item,shop',
			layout : '4',
			content : 'bd',
			limit : 4,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopSearch',
			title : '宝贝搜索框',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个宝贝搜索条，买家通过输入关键词、价格范围来搜索淘宝推广宝贝。',
			order : 0,
			type : 0,
			adType : 'item',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 1,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopTenOrder',
			title : '商品十大排行',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，卖家，推广组来配置相对应的十个宝贝自动显示在页面中。',
			order : 0,
			type : 0,
			adType : 'item',
			layout : '4',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopItemList',
			title : '商品排名列表',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，卖家，推广组来配置相对应的十个宝贝自动排列在页面中。',
			order : 0,
			type : 0,
			adType : 'item',
			layout : '5',
			content : 'bd',
			limit : 12,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopItemList',
			title : '店铺排名列表',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，店铺收藏分组来配置相对应的十个店铺自动排列在页面中。',
			order : 0,
			type : 0,
			adType : 'shop',
			layout : '5',
			content : 'bd',
			limit : 12,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopRank',
			title : '侧边栏商品热卖',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，卖家，推广组来配置相对应的推广宝贝自动排列在页面中。',
			order : 0,
			type : 0,
			adType : 'item',
			layout : '1',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopRank',
			title : '侧边栏店铺推荐',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，店铺收藏分组来配置相对应的推广店铺自动排列在页面中。',
			order : 0,
			type : 0,
			adType : 'shop',
			layout : '1',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopKeyword',
			title : '关键词推广',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据所选择的分类，显示该分类下近期前10个热门搜索关键词',
			order : 0,
			type : 0,
			adType : 'other',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopCategoryVancl',
			title : '宝贝分类2',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据您的选择显示当前父类目的所有子类目，方便买家浏览淘宝的其它宝贝。',
			order : 0,
			type : 0,
			adType : 'cat',
			layout : '1,2,3,4,5',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopCategory',
			title : '宝贝分类1',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '显示您设定的宝贝分类，方便买家浏览淘宝的其它宝贝。',
			order : 0,
			type : 0,
			adType : 'cat',
			layout : '1',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopClass',
			title : '文章分类',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '显示您在新淘家园的日志分类，方便买家浏览您发布的日志。',
			order : 0,
			type : 0,
			adType : 'blog',
			layout : '1',
			content : 'bd',
			limit : 12,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopBlog',
			title : '文章列表',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据您在新淘家园的日志分类显示该分类下的文章列表，方便买家浏览您发布的日志。',
			order : 0,
			type : 0,
			adType : 'blog',
			layout : '1,2,3,4,5',
			content : 'bd',
			limit : 6,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopLinks',
			title : '友情链接',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '允许添加其他网站成为友情站点。',
			order : 0,
			type : 0,
			adType : 'other',
			layout : '1',
			content : 'bd',
			limit : 1,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopDisplay',
			title : '页面推广(自动)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '挑选淘宝提供的推广页面并自动显示在页面中。',
			order : 0,
			type : 0,
			adType : 'page',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 4,
			isHd : true,
			isNew : false,
			isFC : false,
			v : 1
		}, {
			name : 'shopFlashShow',
			title : 'Flash广告牌模块',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '可自由添加通过阿里妈妈广告牌生成器制作出来的FLASH广告牌',
			order : 0,
			type : 0,
			adType : 'other',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 3,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopCustom',
			title : '自定义内容区',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '您可以通过编辑器输入文字、图片，可以点击工具栏上的源代码按钮，通过输入html代码的形式编辑内容。',
			order : 0,
			type : 0,
			adType : 'other',
			layout : '1,2,3,4,5',
			content : 'bd',
			limit : 3,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'itemSearch',
			title : '综合搜索框',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '添加一个商品，店铺搜索条（可配置关键词列表），买家通过输入关键词、分类来搜索淘宝推广商品或淘宝推广店铺。',
			order : 0,
			type : 0,
			adType : 'item,shop',
			layout : '3,4',
			content : 'bd',
			limit : 1,
			isHd : false,
			isNew : false,
			v : 1
		}, {
			name : 'shopSlider',
			title : '图片轮播',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '将多张广告图片以滚动轮播的方式进行展示。',
			order : 0,
			type : 0,
			adType : 'other',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1
		}, {
			name : 'shopDisplay',
			title : '画报推广(自动)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照画报频道，热门，推荐配置相对应的画报自动显示在页面中。',
			order : 0,
			type : 2,
			adType : 'poster',
			layout : '1,2,3,4',
			content : 'bd',
			limit : 4,
			isHd : true,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopRank',
			title : '侧边栏画报推荐',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照画报频道，热门，推荐配置相对应的画报自动显示在页面中。',
			order : 0,
			type : 2,
			adType : 'poster',
			layout : '1',
			content : 'bd',
			limit : 2,
			isHd : true,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopComplexA',
			title : '画报综合类模块',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据画报频道，热门，最新配置相对应的画报自动显示在页面中。',
			order : 0,
			type : 2,
			adType : 'poster',
			layout : '4',
			content : 'bd',
			limit : 4,
			isHd : true,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopComplexB',
			title : '画报综合类模块2',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据画报频道，热门，最新配置相对应的画报自动显示在页面中。',
			order : 0,
			type : 2,
			adType : 'poster',
			layout : '4',
			content : 'bd',
			limit : 4,
			isHd : true,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopItemList',
			title : '画报排名列表',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照画报频道，热门，推荐配置相对应的画报自动显示在页面中。',
			order : 0,
			type : 2,
			adType : 'poster',
			layout : '5',
			content : 'bd',
			limit : 12,
			isHd : true,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopDianPu',
			title : '画报推广(两列)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照画报频道，热门，推荐配置相对应的画报自动显示在页面中。',
			order : 0,
			type : 2,
			adType : 'poster',
			layout : '3',
			content : 'bd',
			limit : 4,
			isHd : false,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopDianPu',
			title : '宝贝推广',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，卖家，推广组来配置相对应的宝贝自动显示在页面中。',
			order : 0,
			type : 3,
			adType : 'item',
			layout : '3',
			content : 'bd',
			limit : 4,
			isHd : false,
			isNew : false,
			v : 1.5
		}, {
			name : 'shopDianPu',
			title : '店铺推广',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照搜索条件，店铺收藏分组来配置相对应的推广店铺自动排列在页面中。',
			order : 0,
			type : 3,
			adType : 'shop',
			layout : '3',
			content : 'bd',
			limit : 4,
			isHd : false,
			isNew : false,
			v : 1.5
		}, {
			name : 'shopDianpuPaiHang',
			title : '店铺成交排行榜',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照指定分类来显示店铺成交排行榜 。',
			order : 0,
			type : 3,
			adType : 'dianpu',
			layout : '1,2,3,4,5',
			content : 'bd',
			limit : 4,
			isHd : false,
			isNew : true,
			v : 2
		}, {
			name : 'shopDianPu',
			title : '淘店铺推广',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照淘店铺分类来配置相对应的淘店铺自动显示在页面中。',
			order : 0,
			type : 3,
			adType : 'dianpu',
			layout : '3',
			content : 'bd',
			limit : 4,
			isHd : false,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopDianPuList',
			title : '淘店铺推广(横排)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照淘店铺分类来配置相对应的淘店铺自动显示在页面中。',
			order : 0,
			type : 3,
			adType : 'dianpu',
			layout : '3',
			content : 'bd',
			limit : 6,
			isHd : false,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopDianPuCat',
			title : '淘店铺分类',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '自由选择淘店铺分类自动显示在页面中',
			order : 0,
			type : 3,
			adType : 'dianpu',
			layout : '1',
			content : 'bd',
			limit : 4,
			isHd : true,
			isNew : false,
			v : 1.55
		}, {
			name : 'shopMallFloor',
			title : '淘宝商城分类品牌',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '自动同步淘宝商城首页的分类品牌',
			order : 0,
			type : 4,
			adType : 'ftl',
			layout : '1',
			content : 'bd',
			limit : 11,
			isHd : false,
			isNew : true,
			v : 1.6
		}, {
			name : 'shopMallNewFloor',
			title : '淘宝商城分类(新版)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '自动同步淘宝商城首页的不同分类品牌及活动模块',
			order : 0,
			type : 4,
			adType : 'ftl',
			layout : '4',
			content : 'bd',
			limit : 6,
			isHd : false,
			isNew : true,
			v : 1.6
		}, {
			name : 'shopMallCategory',
			title : '淘宝商城分类(浮动)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '淘宝商城首页左侧浮动分类模块',
			order : 0,
			type : 4,
			adType : 'ftl',
			layout : '1',
			content : 'bd',
			limit : 1,
			isHd : false,
			isNew : true,
			v : 1.5
		}, {
			name : 'shopSliderTemplate',
			title : '自更新图片轮播',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '自动跟踪淘宝多个热门频道轮播图片推广',
			order : 0,
			type : 4,
			adType : 'ftl',
			layout : '2,4',
			content : 'bd',
			limit : 3,
			isHd : false,
			isNew : true,
			v : 1.6
		}, {
			name : 'shopMallFooter',
			title : '淘宝商城首页底部分类及品牌',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '仿照淘宝商城首页底部分类及品牌',
			order : 0,
			type : 4,
			adType : 'ftl',
			layout : '4',
			content : 'bd',
			limit : 1,
			isHd : false,
			isNew : true,
			v : 1.5
		}, {
			name : 'shopChildCategory',
			title : '母婴分类',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '仿淘宝商城每日惊喜，效果不支持IE6',
			order : 0,
			type : 5,
			adType : 'cat',
			layout : '4',
			content : 'bd',
			limit : 1,
			isHd : false,
			isNew : true,
			v : 1.5
		}, {
			name : 'shopChildLogo',
			title : '母婴店铺',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '精选母婴下指定类型的优质店铺',
			order : 0,
			type : 5,
			adType : 'shop',
			layout : '1',
			content : 'bd',
			limit : 5,
			isHd : true,
			isNew : true,
			v : 1.5
		}, {
			name : 'shopChildFloor',
			title : '母婴综合推广',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '精选母婴下指定类型的优质店铺，可自由指定商品',
			order : 0,
			type : 5,
			adType : 'shop',
			layout : '3,4',
			content : 'bd',
			limit : 5,
			isHd : false,
			isNew : true,
			v : 1.5
		}, {
			name : 'shopB2CMall',
			title : '返现商城推广',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '根据商城分类选择显示指定的返现商城',
			order : 0,
			type : 6,
			adType : 'mall',
			layout : '1,2,3,4,5',
			content : 'bd',
			limit : 5,
			isHd : false,
			isNew : true,
			v : 2
		}, {
			name : 'shopDianPu',
			title : '返现商城推广（两列）',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照淘店铺分类来配置相对应的淘店铺自动显示在页面中。',
			order : 0,
			type : 6,
			adType : 'mall',
			layout : '3',
			content : 'bd',
			limit : 4,
			isHd : false,
			isNew : false,
			v : 2
		}, {
			name : 'shopDianPuList',
			title : '返现商城推广(横排)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '按照商城分类来配置相对应的返现商城自动显示在页面中。',
			order : 0,
			type : 6,
			adType : 'mall',
			layout : '3',
			content : 'bd',
			limit : 6,
			isHd : false,
			isNew : true,
			v : 2
		}, {
			name : 'shopMallSideNav',
			title : '返利商城侧边栏(浮动)',
			icon : 'http://img01.taobaocdn.com/tps/i1/T1obVrXXJaXXXXXXXX-50-50.gif',
			desc : '返利商城侧边栏浮动模块，显示所有分类及商城',
			order : 0,
			type : 6,
			adType : 'ftl',
			layout : '1',
			content : 'bd',
			limit : 1,
			isHd : false,
			isNew : true,
			v : 2
		}];