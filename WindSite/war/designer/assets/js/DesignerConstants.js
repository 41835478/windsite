var defaultPID = 'mm_13667242_0_0';
if (!PID) {
	var PID = defaultPID;
}
/**
 * 拖拽预览图
 * 
 * @type
 */
var placeHolders = {
	'itemsLinkView' : {
		image : 'itemsLinkView',
		name : '文字链接',
		desc : '文字链接',
		type : 'group',
		html : '<div name="itemsLinkView" class="ui-designer-widget" metadata="{resizable : \'true\',data_type:\'groups\',align:\'center\'}"><div class="ui-designer-widget-header" align="left"><b class="widget-title" wname="itemsLinkView"></b><a class="ui-designer-widget-more" target="_blank">更多</a></div><dl class="widget-itemslinkview-items"></dl></div>'
	},
	'itemsThumbView' : {
		image : 'itemsThumbView',
		name : '图形相册',
		desc : '图形相册',
		type : 'group',
		html : '<div name="itemsThumbView" class="ui-designer-widget" metadata="{resizable : \'true\',data_type:\'groups\',align:\'center\'}"><div class="ui-designer-widget-header" align="left"><b class="widget-title" wname="itemsThumbView"></b><a class="ui-designer-widget-more" target="_blank">更多</a></div><ul class="widget-itemsthumbview-items"></ul></div>'
	},
	'itemsListView' : {
		image : 'itemsListView',
		name : '商品列表',
		desc : '商品列表',
		minWidth : 500,
		type : 'group',
		html : '<div name="itemsListView" class="ui-designer-widget" metadata="{resizable : \'true\',data_type:\'groups\',handles:\'s\',minWidth:560}" minWidth="560"><div class="ui-designer-widget-header" align="left"><b class="widget-title" wname="itemsListView">商品列表</b><a class="ui-designer-widget-more" target="_blank">更多</a></div><ul class="widget-itemslistview-items"></ul></div>'
	},
	'itemsScrollableView' : {
		image : 'itemsScrollableView',
		name : '横向滚动相册',
		desc : '横向滚动相册',
		minWidth : 470,
		type : 'group',
		html : '<div name="itemsScrollableView" class="ui-designer-widget" metadata="{resizable : \'false\',data_type:\'groups\',minWidth:470,handles:\'s\',align:\'center\'}" minWidth="470"><div class="ui-designer-widget-header" align="left"><b class="widget-title" wname="itemsScrollableView"></b><a class="ui-designer-widget-more" target="_blank">更多</a><div class="navi"></div></div><div class="widget-itemsscrollableview-items scrollable"><div class="items"></div></div></div>'
	},

	'flashView' : {
		image : 'flashView',
		name : '阿里妈妈广告牌',
		desc : '阿里妈妈广告牌',
		type : 'alimama',
		html : '<div name="flashView" class="ui-designer-widget" metadata="{resizable : \'false\',data_type:\'none\',align:\'center\',handles:\'s\'}"><div class="ui-designer-widget-header" align="left"><b class="widget-title" wname="flashView"></b></div><div class="widget-flashview"></div></div>'
	},
	'searchBox' : {
		image : 'searchBox',
		name : '搜索框',
		desc : '搜索框',
		minWidth : 560,
		type : 'alimama',
		html : '<div name="searchBox" class="ui-designer-widget" metadata="{resizable : \'false\',data_type:\'none\',align:\'center\',handles:\'s\',cat:\'0\',line:1}"><div class="ui-designer-widget-header" align="left"><b class="widget-title" wname="searchBox"></b></div><div class="widget-searchbox"><div class="preview_content" align="center"><ul class="p_t"><li class="t_search"><form method="get" action="/search" target="_blank"><label for="q"><input type="text" class="searchBox" name="q"><input type="hidden" name="cid" value=""><input type="button" value="" class="searchBtn" onclick="$(this).parents(\'form:first\').submit();"></label></form></li></ul></div></div></div>'
	},
	'channelView' : {
		image : 'channelView',
		name : '频道推广',
		desc : '频道推广',
		minWidth : 900,
		type : 'alimama',
		html : '<div name="channelView" class="ui-designer-widget" metadata="{resizable : \'false\',minWidth:\'900\',data_type:\'none\',handles:\'s\'}" minWidth="900"><div class="ui-designer-widget-header" align="left"><b wname="channelView" class="widget-title"></b></div><div class="widget-channelview"></div></div>'
	},
	'netLinkView' : {
		image : 'netLinkView',
		name : '友情链接',
		desc : '友情链接',
		type : 'other',
		html : '<div name="netLinkView" class="ui-designer-widget" metadata="{resizable : \'true\',data_type:\'none\'}"><div class="ui-designer-widget-header" align="left"><b wname="netLinkView" class="widget-title"></b></div><ul class="widget-netlinkview"></ul></div>'
	},
	'richEditor' : {
		image : 'richEditor',
		name : 'html高级编辑器',
		desc : 'html高级编辑器',
		type : 'other',
		html : '<div name="richEditor" class="ui-designer-widget" metadata="{data_type:\'none\'}"><div class="ui-designer-widget-header" align="left"><b class="widget-title" wname="richEditor"></b></div><div class="widget-richeditor"></div></div>'
	},
	'widgetCustomer' : {
		image : 'widgetCustomer',
		name : '自定义组件',
		desc : '自定义组件',
		type : 'custome',
		html : '<div name="widgetCustomer" class="ui-designer-widget" metadata="{resizable : \'false\',data_type:\'custome\',align:\'center\'}"><div class="ui-designer-widget-header" align="left"><b class="widget-title" wname="widgetCustomer"></b><a class="ui-designer-widget-more" target="_blank">更多</a></div><div class="widget-customer" align="center"></div></div>'
	},
	'huabaoView' : {
		image : 'huabaoView',
		name : '导购画报组件',
		desc : '导购画报组件',
		type : 'custome',
		html : '<div name="huabaoView" class="ui-designer-widget" metadata="{resizable : \'true\',data_type:\'none\'}"><div class="ui-designer-widget-header" align="left"><b wname="huabaoView" class="widget-title"></b></div><div class="widget-huabaoview"></div></div>'
	},
	'chongzhiView' : {
		image : 'chongzhiView',
		name : '虚拟充值框',
		desc : '虚拟充值框',
		type : 'other',
		html : '<div name="chongzhiView" class="ui-designer-widget" metadata="{resizable : \'true\',data_type:\'none\',align:\'center\'}"><div class="ui-designer-widget-header" align="left"><b wname="chongzhiView" class="widget-title"></b></div><div class="widget-chongzhiview"></div></div>'
	}
};

/**
 * CSS Class模型
 */
function CssClass(name) {
	this.name = name;
	this.toSource = function() {
		var str = name + "{";
		for (var p in this) {
			if (p && 'name' != p && this[p] && this[p].length > 0) {
				str += p + ":" + this[p] + ";";
			}
		}
		str += "}";
		return str;
	}
	this.copy = function() {
		var temp = new CssClass(this.name);
		for (var p in this) {
			temp[p] = this[p];
		}
		return temp;
	}
}
/**
 * 系统皮肤
 */
/**
 * 粉色
 * 
 */
var t_pink_body = new CssClass('.ui-designer-body');
var t_pink_header = new CssClass('.ui-designer-widget-header');
t_pink_header['background-image'] = "url(/assets/min/images/wh/cutepink.jpg)";
t_pink_header['color'] = "rgb(255, 255, 255)";
var t_pink_widget = new CssClass('.ui-designer-widget');
t_pink_widget['background-color'] = "rgb(255, 242, 255)";
var t_pink_title = new CssClass('.title,.title a');
t_pink_title['color'] = "#36C";
var t_pink_price = new CssClass('.price');
t_pink_price['color'] = "#FF6600";
var t_pink_h2_span = new CssClass('.custome-header-h2 span');
t_pink_h2_span['background-color'] = "pink";

/**
 * 绿色
 */
var t_green_body = new CssClass('.ui-designer-body');
var t_green_header = new CssClass('.ui-designer-widget-header');
t_green_header['background-image'] = "url(/assets/min/images/wh/green.jpg)";
t_green_header['color'] = "#ffffff";
var t_green_widget = new CssClass('.ui-designer-widget');
t_green_widget['background-color'] = "rgb(255, 242, 255)";
var t_green_title = new CssClass('.title,.title a');
t_green_title['color'] = "#3366cc";
var t_green_price = new CssClass('.price');
t_green_price['color'] = "#ff6600";
var t_green_h2_span = new CssClass('.custome-header-h2 span');
t_green_h2_span['background-color'] = "green";
/**
 * 银色
 */
var t_silver_body = new CssClass('.ui-designer-body');
var t_silver_header = new CssClass('.ui-designer-widget-header');
t_silver_header['background-image'] = "url(/assets/min/images/wh/silver.jpg)";
t_silver_header['color'] = "rgb(102, 102, 102)";
var t_silver_widget = new CssClass('.ui-designer-widget');
t_silver_widget['background-color'] = "rgb(255, 242, 255)";
var t_silver_title = new CssClass('.title,.title a');
t_silver_title['color'] = "rgb(51, 102, 204)";
var t_silver_price = new CssClass('.price');
t_silver_price['color'] = "rgb(255, 102, 0)";
var t_silver_more = new CssClass('.ui-designer-widget-more');
t_silver_more['color'] = "#666666";
var t_silver_h2_span = new CssClass('.custome-header-h2 span');
t_silver_h2_span['background-color'] = "silver";
/**
 * 黑色
 */
var t_black_body = new CssClass('.ui-designer-body');
var t_black_header = new CssClass('.ui-designer-widget-header');
t_black_header['background-image'] = "url(/assets/min/images/wh/black.jpg)";
t_black_header['color'] = "#ffffff";
var t_black_widget = new CssClass('.ui-designer-widget');
t_black_widget['background-color'] = "rgb(255, 242, 255)";
var t_black_title = new CssClass('.title,.title a');
t_black_title['color'] = "#3366cc";
var t_black_price = new CssClass('.price');
t_black_price['color'] = "#ff6600";
var t_black_h2_span = new CssClass('.custome-header-h2 span');
t_black_h2_span['background-color'] = "black";
/**
 * 蓝色
 */
var t_blue_body = new CssClass('.ui-designer-body');
var t_blue_header = new CssClass('.ui-designer-widget-header');
t_blue_header['background-image'] = "url(/assets/min/images/wh/blue.jpg)";
t_blue_header['color'] = "#ffffff";
var t_blue_widget = new CssClass('.ui-designer-widget');
t_blue_widget['background-color'] = "rgb(255, 242, 255)";
var t_blue_title = new CssClass('.title,.title a');
t_blue_title['color'] = "#3366cc";
var t_blue_price = new CssClass('.price');
t_blue_price['color'] = "#ff6600";
var t_blue_h2_span = new CssClass('.custome-header-h2 span');
t_blue_h2_span['background-color'] = "blue";
/**
 * 紫色
 */
var t_purple_body = new CssClass('.ui-designer-body');
var t_purple_header = new CssClass('.ui-designer-widget-header');
t_purple_header['background-image'] = "url(/assets/min/images/wh/purple.jpg)";
t_purple_header['color'] = "#ffffff";
var t_purple_widget = new CssClass('.ui-designer-widget');
t_purple_widget['background-color'] = "rgb(255, 242, 255)";
var t_purple_title = new CssClass('.title,.title a');
t_purple_title['color'] = "#3366cc";
var t_purple_price = new CssClass('.price');
t_purple_price['color'] = "#ff6600";
var t_purple_h2_span = new CssClass('.custome-header-h2 span');
t_purple_h2_span['background-color'] = "purple";
/**
 * 橘色
 */
var t_orange_body = new CssClass('.ui-designer-body');
var t_orange_header = new CssClass('.ui-designer-widget-header');
t_orange_header['background-image'] = "url(/assets/min/images/wh/orange.jpg)";
t_orange_header['color'] = "#ffffff";
var t_orange_widget = new CssClass('.ui-designer-widget');
t_orange_widget['background-color'] = "rgb(255, 242, 255)";
var t_orange_title = new CssClass('.title,.title a');
t_orange_title['color'] = "#3366cc";
var t_orange_price = new CssClass('.price');
t_orange_price['color'] = "#ff6600";
var t_orange_h2_span = new CssClass('.custome-header-h2 span');
t_orange_h2_span['background-color'] = "orange";
/**
 * 棕色
 */
var t_brown_body = new CssClass('.ui-designer-body');
var t_brown_header = new CssClass('.ui-designer-widget-header');
t_brown_header['background-image'] = "url(/assets/min/images/wh/brown.png)";
t_brown_header['color'] = "#ffffff";
var t_brown_widget = new CssClass('.ui-designer-widget');
t_brown_widget['background-color'] = "rgb(255, 242, 255)";
var t_brown_title = new CssClass('.title,.title a');
t_brown_title['color'] = "#3366cc";
var t_brown_price = new CssClass('.price');
t_brown_price['color'] = "#ff6600";
var t_brown_h2_span = new CssClass('.custome-header-h2 span');
t_brown_h2_span['background-color'] = "brown";
/**
 * 黄色
 */
var t_yellow_body = new CssClass('.ui-designer-body');
var t_yellow_header = new CssClass('.ui-designer-widget-header');
t_yellow_header['background-image'] = "url(/assets/min/images/wh/yellow.png)";
t_yellow_header['color'] = "#ffffff";
var t_yellow_widget = new CssClass('.ui-designer-widget');
t_yellow_widget['background-color'] = "rgb(255, 242, 255)";
var t_yellow_title = new CssClass('.title,.title a');
t_yellow_title['color'] = "#3366cc";
var t_yellow_price = new CssClass('.price');
t_yellow_price['color'] = "#ff6600";
var t_yellow_h2_span = new CssClass('.custome-header-h2 span');
t_yellow_h2_span['background-color'] = "yellow";
/**
 * 红色
 */
var t_red_body = new CssClass('.ui-designer-body');
var t_red_header = new CssClass('.ui-designer-widget-header');
t_red_header['background-image'] = "url(/assets/min/images/wh/red.jpg)";
t_red_header['color'] = "#ffffff";
var t_red_widget = new CssClass('.ui-designer-widget');
t_red_widget['background-color'] = "rgb(255, 242, 255)";
var t_red_title = new CssClass('.title,.title a');
t_red_title['color'] = "#3366cc";
var t_red_price = new CssClass('.price');
t_red_price['color'] = "#ff6600";
var t_red_h2_span = new CssClass('.custome-header-h2 span');
t_red_h2_span['background-color'] = "red";

var sysThemes = {
	't-pink' : {
		'.ui-designer-body' : t_pink_body,
		'.ui-designer-widget-header' : t_pink_header,
		'.ui-designer-widget' : t_pink_widget,
		'.title,.title a' : t_pink_title,
		'.price' : t_pink_price,
		'.custome-header-h2 span' : t_pink_h2_span
	},
	't-green' : {
		'.ui-designer-body' : t_green_body,
		'.ui-designer-widget-header' : t_green_header,
		'.ui-designer-widget' : t_green_widget,
		'.title,.title a' : t_green_title,
		'.price' : t_green_price,
		'.custome-header-h2 span' : t_green_h2_span
	},
	't-silver' : {
		'.ui-designer-body' : t_silver_body,
		'.ui-designer-widget-header' : t_silver_header,
		'.ui-designer-widget' : t_silver_widget,
		'.title,.title a' : t_silver_title,
		'.price' : t_silver_price,
		'..ui-designer-widget-more' : t_silver_more,
		'.custome-header-h2 span' : t_silver_h2_span
	},
	't-black' : {
		'.ui-designer-body' : t_black_body,
		'.ui-designer-widget-header' : t_black_header,
		'.ui-designer-widget' : t_black_widget,
		'.title,.title a' : t_black_title,
		'.price' : t_black_price,
		'.custome-header-h2 span' : t_black_h2_span
	},
	't-blue' : {
		'.ui-designer-body' : t_blue_body,
		'.ui-designer-widget-header' : t_blue_header,
		'.ui-designer-widget' : t_blue_widget,
		'.title,.title a' : t_blue_title,
		'.price' : t_blue_price,
		'.custome-header-h2 span' : t_blue_h2_span
	},
	't-purple' : {
		'.ui-designer-body' : t_purple_body,
		'.ui-designer-widget-header' : t_purple_header,
		'.ui-designer-widget' : t_purple_widget,
		'.title,.title a' : t_purple_title,
		'.price' : t_purple_price,
		'.custome-header-h2 span' : t_purple_h2_span
	},
	't-orange' : {
		'.ui-designer-body' : t_orange_body,
		'.ui-designer-widget-header' : t_orange_header,
		'.ui-designer-widget' : t_orange_widget,
		'.title,.title a' : t_orange_title,
		'.price' : t_orange_price,
		'.custome-header-h2 span' : t_orange_h2_span
	},
	't-brown' : {
		'.ui-designer-body' : t_brown_body,
		'.ui-designer-widget-header' : t_brown_header,
		'.ui-designer-widget' : t_brown_widget,
		'.title,.title a' : t_brown_title,
		'.price' : t_brown_price,
		'.custome-header-h2 span' : t_brown_h2_span
	},
	't-yellow' : {
		'.ui-designer-body' : t_yellow_body,
		'.ui-designer-widget-header' : t_yellow_header,
		'.ui-designer-widget' : t_yellow_widget,
		'.title,.title a' : t_yellow_title,
		'.price' : t_yellow_price,
		'.custome-header-h2 span' : t_yellow_h2_span
	},
	't-red' : {
		'.ui-designer-body' : t_red_body,
		'.ui-designer-widget-header' : t_red_header,
		'.ui-designer-widget' : t_red_widget,
		'.title,.title a' : t_red_title,
		'.price' : t_red_price,
		'.custome-header-h2 span' : t_red_h2_span
	}
}
/**
 * 银色导航栏
 */
// A
var t_yinse_a = new CssClass('.ui-designer-header-tabs a');
t_yinse_a['background-image'] = "url(/assets/min/images/nav/h_yinse.png)";
t_yinse_a['background-position'] = "100% -25px";
// A H2
var t_yinse_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_yinse_a_h2['background-image'] = "url(/assets/min/images/nav/h_yinse.png)";
t_yinse_a_h2['background-position'] = "0px 0px";
t_yinse_a_h2['color'] = "#5E523B";
// A:Hover
var t_yinse_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_yinse_a_hover['background-image'] = "url(/assets/min/images/nav/h_yinse.png)";
t_yinse_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_yinse_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_yinse_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_yinse.png)";
t_yinse_a_hover_h2['background-position'] = "0px -50px";
// t_yinse_a_hover_h2['color'] = "#5E523B";
/**
 * 粉色导航栏
 */
// A
var t_pink_a = new CssClass('.ui-designer-header-tabs a');
t_pink_a['background-image'] = "url(/assets/min/images/nav/h_pink.gif)";
t_pink_a['background-position'] = "100% -25px";
// A H2
var t_pink_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_pink_a_h2['background-image'] = "url(/assets/min/images/nav/h_pink.gif)";
t_pink_a_h2['background-position'] = "0px 0px";
// t_pink_a_h2['color'] = "#5E523B";
// A:Hover
var t_pink_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_pink_a_hover['background-image'] = "url(/assets/min/images/nav/h_pink.gif)";
t_pink_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_pink_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_pink_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_pink.gif)";
t_pink_a_hover_h2['background-position'] = "0px -50px";
// t_pink_a_hover_h2['color'] = "#5E523B";
/**
 * 绿色导航栏
 */
// A
var t_green_a = new CssClass('.ui-designer-header-tabs a');
t_green_a['background-image'] = "url(/assets/min/images/nav/h_green.png)";
t_green_a['background-position'] = "100% -25px";
// A H2
var t_green_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_green_a_h2['background-image'] = "url(/assets/min/images/nav/h_green.png)";
t_green_a_h2['background-position'] = "0px 0px";
// t_green_a_h2['color'] = "#5E523B";
// A:Hover
var t_green_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_green_a_hover['background-image'] = "url(/assets/min/images/nav/h_green.png)";
t_green_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_green_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_green_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_green.png)";
t_green_a_hover_h2['background-position'] = "0px -50px";
// t_green_a_hover_h2['color'] = "#5E523B";
/**
 * 黑色导航栏
 */
// A
var t_black_a = new CssClass('.ui-designer-header-tabs a');
t_black_a['background-image'] = "url(/assets/min/images/nav/h_black.png)";
t_black_a['background-position'] = "100% -25px";
// A H2
var t_black_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_black_a_h2['background-image'] = "url(/assets/min/images/nav/h_black.png)";
t_black_a_h2['background-position'] = "0px 0px";
// t_black_a_h2['color'] = "#5E523B";
// A:Hover
var t_black_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_black_a_hover['background-image'] = "url(/assets/min/images/nav/h_black.png)";
t_black_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_black_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_black_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_black.png)";
t_black_a_hover_h2['background-position'] = "0px -50px";
// t_black_a_hover_h2['color'] = "#5E523B";
/**
 * 蓝色导航栏
 */
// A
var t_blue_a = new CssClass('.ui-designer-header-tabs a');
t_blue_a['background-image'] = "url(/assets/min/images/nav/h_blue.png)";
t_blue_a['background-position'] = "100% -25px";
// A H2
var t_blue_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_blue_a_h2['background-image'] = "url(/assets/min/images/nav/h_blue.png)";
t_blue_a_h2['background-position'] = "0px 0px";
// t_blue_a_h2['color'] = "#5E523B";
// A:Hover
var t_blue_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_blue_a_hover['background-image'] = "url(/assets/min/images/nav/h_blue.png)";
t_blue_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_blue_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_blue_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_blue.png)";
t_blue_a_hover_h2['background-position'] = "0px -50px";
// t_blue_a_hover_h2['color'] = "#5E523B";
/**
 * 紫色导航栏
 */
// A
var t_purple_a = new CssClass('.ui-designer-header-tabs a');
t_purple_a['background-image'] = "url(/assets/min/images/nav/h_purple.png)";
t_purple_a['background-position'] = "100% -25px";
// A H2
var t_purple_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_purple_a_h2['background-image'] = "url(/assets/min/images/nav/h_purple.png)";
t_purple_a_h2['background-position'] = "0px 0px";
// t_purple_a_h2['color'] = "#5E523B";
// A:Hover
var t_purple_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_purple_a_hover['background-image'] = "url(/assets/min/images/nav/h_purple.png)";
t_purple_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_purple_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_purple_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_purple.png)";
t_purple_a_hover_h2['background-position'] = "0px -50px";
// t_purple_a_hover_h2['color'] = "#5E523B";
/**
 * 橘色导航栏
 */
// A
var t_orange_a = new CssClass('.ui-designer-header-tabs a');
t_orange_a['background-image'] = "url(/assets/min/images/nav/h_orange.png)";
t_orange_a['background-position'] = "100% -25px";
// A H2
var t_orange_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_orange_a_h2['background-image'] = "url(/assets/min/images/nav/h_orange.png)";
t_orange_a_h2['background-position'] = "0px 0px";
// t_orange_a_h2['color'] = "#5E523B";
// A:Hover
var t_orange_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_orange_a_hover['background-image'] = "url(/assets/min/images/nav/h_orange.png)";
t_orange_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_orange_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_orange_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_orange.png)";
t_orange_a_hover_h2['background-position'] = "0px -50px";
// t_orange_a_hover_h2['color'] = "#5E523B";
/**
 * 棕色导航栏
 */
// A
var t_brown_a = new CssClass('.ui-designer-header-tabs a');
t_brown_a['background-image'] = "url(/assets/min/images/nav/h_brown.png)";
t_brown_a['background-position'] = "100% -25px";
// A H2
var t_brown_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_brown_a_h2['background-image'] = "url(/assets/min/images/nav/h_brown.png)";
t_brown_a_h2['background-position'] = "0px 0px";
// t_brown_a_h2['color'] = "#5E523B";
// A:Hover
var t_brown_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_brown_a_hover['background-image'] = "url(/assets/min/images/nav/h_brown.png)";
t_brown_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_brown_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_brown_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_brown.png)";
t_brown_a_hover_h2['background-position'] = "0px -50px";
// t_brown_a_hover_h2['color'] = "#5E523B";
/**
 * 黄色导航栏
 */
// A
var t_yellow_a = new CssClass('.ui-designer-header-tabs a');
t_yellow_a['background-image'] = "url(/assets/min/images/nav/h_yellow.png)";
t_yellow_a['background-position'] = "100% -25px";
// A H2
var t_yellow_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_yellow_a_h2['background-image'] = "url(/assets/min/images/nav/h_yellow.png)";
t_yellow_a_h2['background-position'] = "0px 0px";
// t_yellow_a_h2['color'] = "#5E523B";
// A:Hover
var t_yellow_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_yellow_a_hover['background-image'] = "url(/assets/min/images/nav/h_yellow.png)";
t_yellow_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_yellow_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_yellow_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_yellow.png)";
t_yellow_a_hover_h2['background-position'] = "0px -50px";
// t_yellow_a_hover_h2['color'] = "#5E523B";
/**
 * 红色导航栏
 */
// A
var t_red_a = new CssClass('.ui-designer-header-tabs a');
t_red_a['background-image'] = "url(/assets/min/images/nav/h_red.png)";
t_red_a['background-position'] = "100% -25px";
// A H2
var t_red_a_h2 = new CssClass('.ui-designer-header-tabs a h2');
t_red_a_h2['background-image'] = "url(/assets/min/images/nav/h_red.png)";
t_red_a_h2['background-position'] = "0px 0px";
// t_red_a_h2['color'] = "#5E523B";
// A:Hover
var t_red_a_hover = new CssClass('.ui-designer-header-tabs a:hover');
t_red_a_hover['background-image'] = "url(/assets/min/images/nav/h_red.png)";
t_red_a_hover['background-position'] = "100% -75px";
// A:Hover H2
var t_red_a_hover_h2 = new CssClass('.ui-designer-header-tabs a:hover h2');
t_red_a_hover_h2['background-image'] = "url(/assets/min/images/nav/h_red.png)";
t_red_a_hover_h2['background-position'] = "0px -50px";
// t_red_a_hover_h2['color'] = "#5E523B";

/**
 * 导航栏样式
 * 
 * @type
 */
var navThemes = {
	/**
	 * 银色
	 * 
	 * @type
	 */
	't_yinse' : {
		'.ui-designer-header-tabs a' : t_yinse_a,
		'.ui-designer-header-tabs a h2' : t_yinse_a_h2,
		'.ui-designer-header-tabs a:hover' : t_yinse_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_yinse_a_hover_h2
	},
	't_pink' : {
		'.ui-designer-header-tabs a' : t_pink_a,
		'.ui-designer-header-tabs a h2' : t_pink_a_h2,
		'.ui-designer-header-tabs a:hover' : t_pink_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_pink_a_hover_h2
	},
	't_green' : {
		'.ui-designer-header-tabs a' : t_green_a,
		'.ui-designer-header-tabs a h2' : t_green_a_h2,
		'.ui-designer-header-tabs a:hover' : t_green_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_green_a_hover_h2
	},
	't_black' : {
		'.ui-designer-header-tabs a' : t_black_a,
		'.ui-designer-header-tabs a h2' : t_black_a_h2,
		'.ui-designer-header-tabs a:hover' : t_black_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_black_a_hover_h2
	},
	't_blue' : {
		'.ui-designer-header-tabs a' : t_blue_a,
		'.ui-designer-header-tabs a h2' : t_blue_a_h2,
		'.ui-designer-header-tabs a:hover' : t_blue_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_blue_a_hover_h2
	},
	't_purple' : {
		'.ui-designer-header-tabs a' : t_purple_a,
		'.ui-designer-header-tabs a h2' : t_purple_a_h2,
		'.ui-designer-header-tabs a:hover' : t_purple_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_purple_a_hover_h2
	},
	't_orange' : {
		'.ui-designer-header-tabs a' : t_orange_a,
		'.ui-designer-header-tabs a h2' : t_orange_a_h2,
		'.ui-designer-header-tabs a:hover' : t_orange_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_orange_a_hover_h2
	},
	't_brown' : {
		'.ui-designer-header-tabs a' : t_brown_a,
		'.ui-designer-header-tabs a h2' : t_brown_a_h2,
		'.ui-designer-header-tabs a:hover' : t_brown_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_brown_a_hover_h2
	},
	't_yellow' : {
		'.ui-designer-header-tabs a' : t_yellow_a,
		'.ui-designer-header-tabs a h2' : t_yellow_a_h2,
		'.ui-designer-header-tabs a:hover' : t_yellow_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_yellow_a_hover_h2
	},
	't_red' : {
		'.ui-designer-header-tabs a' : t_red_a,
		'.ui-designer-header-tabs a h2' : t_red_a_h2,
		'.ui-designer-header-tabs a:hover' : t_red_a_hover,
		'.ui-designer-header-tabs a:hover h2' : t_red_a_hover_h2
	}
}