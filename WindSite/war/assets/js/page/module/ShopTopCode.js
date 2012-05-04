/**
 * 淘宝关键词模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopTopCode", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopTopCodeModuleConfig(func) {
	$('#module-content').load(
			'/assets/js/page/module/ShopTopCodeConfig.html?v=' + Math.random(),
			function() {
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var o = MODULE.pageShopTopCode('option');
					if (o.name && o.sh && o.sn && o.tn && o.bgc && o.bc && o.fc
							&& o.tc && o.trtp && o.up && o.cat_ids) {
						var iframe = '<iframe style="width:190px;height:'
								+ o.sh
								+ 'px" frameborder="0"  id="previewiframe"  scrolling="no"  src="http://top.taobao.com/interface_v2.php?name='
								+ o.name + '&st=2&sw=190&sh=' + o.sh + '&sn='
								+ o.sn + '&tn=' + o.tn + '&bgc=' + o.bgc
								+ '&bc=' + o.bc + '&fc=' + o.fc + '&tc=' + o.tc
								+ '&trtp=' + o.trtp + '&up=' + o.up
								+ '&cat_ids=' + o.cat_ids
								+ '&f=html&ie=utf8&from=taoke&pid=' + PID
								+ '" ></iframe>';
						$('#shop-topcode-textarea').val(iframe);
					}
				}
				$('#shop-topcode-textarea').click(function() {
							$(this).select();
						});
			});
	if (func) {
		func();
	}
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopTopCodeModuleConfig() {
	var iframe = $('#shop-topcode-textarea').val();
	if (!iframe) {
		alert('您尚未填写淘宝关键词风向标代码');
		return false;
	}
	var src = $(iframe).attr('src');
	if (!src) {
		alert('代码格式不正确');
		return false;
	}
	$.url.setUrl(src);
	var name = $.url.param("name");// 名称
	if (!name) {
		alert('代码格式不正确,未检测到榜单名称');
		return false;
	}
	var st = $.url.param("st");// 尺寸类型
	if (!st) {
		alert('代码格式不正确,未检测到尺寸类型');
		return false;
	}
	var sw = $.url.param("sw");// 宽度
	if (!sw) {
		alert('代码格式不正确,未检测到宽度');
		return false;
	}
	var sh = $.url.param("sh");// 高度
	if (!sh) {
		alert('代码格式不正确,未检测到高度');
		return false;
	}
	var sn = $.url.param("sn");// 条数
	if (!sn) {
		alert('代码格式不正确,未检测到条数');
		return false;
	}
	var tn = $.url.param("tn");// 类目条数
	if (!tn) {
		alert('代码格式不正确,未检测到类目条数');
		return false;
	}

	var bgc = $.url.param("bgc");// 背景
	if (!bgc) {
		alert('代码格式不正确,未检测到类目条数');
		return false;
	}
	var bc = $.url.param("bc");// 边框
	if (!bc) {
		alert('代码格式不正确,未检测到类目条数');
		return false;
	}
	var fc = $.url.param("fc");// 文字
	if (!fc) {
		alert('代码格式不正确,未检测到类目条数');
		return false;
	}
	var tc = $.url.param("tc");// 标题
	if (!tc) {
		alert('代码格式不正确,未检测到类目条数');
		return false;
	}
	var trtp = $.url.param("trtp");// 类型 1：销售；2:搜索；3：品牌
	if (!trtp) {
		alert('代码格式不正确,未检测到类目条数');
		return false;
	}
	var up = $.url.param("up");// 维度 1：上升；2：热门
	if (!up) {
		alert('代码格式不正确,未检测到类目条数');
		return false;
	}
	var cat_ids = $.url.param("cat_ids");// 类目字符串，以类目ID+","方式传递
	if (!cat_ids) {
		alert('代码格式不正确,未检测到类目条数');
		return false;
	}
	return true;
}
/**
 * 新增模块
 * 
 * @param {}
 *            name
 * @param {}
 *            title
 * @param {}
 *            region
 * @param {}
 *            next
 * @param {}
 *            func
 */
function createShopTopCodeModuleContent(name, title, region, next, func) {
	var params = {};
	params.isHd = ($('#module-ishd').attr('checked') + "");
	var iframe = $('#shop-topcode-textarea').val();
	if (!iframe) {
		alert('您尚未填写淘宝关键词风向标代码');
		return false;
	}
	var src = $(iframe).attr('src');
	if (!src) {
		alert('代码格式不正确');
		return false;
	}
	$.url.setUrl(src);
	params.name = $.url.param("name") + '';// 名称
	params.sh = $.url.param("sh") + '';// 高度
	params.sn = $.url.param("sn") + '';// 条数
	params.tn = $.url.param("tn") + '';// 类目条数
	params.bgc = $.url.param("bgc") + '';// 背景
	params.bc = $.url.param("bc") + '';// 边框
	params.fc = $.url.param("fc") + '';// 文字
	params.tc = $.url.param("tc") + '';// 标题
	params.trtp = $.url.param("trtp") + '';// 类型 1：销售；2:搜索；3：品牌
	params.up = $.url.param("up") + '';// 维度 1：上升；2：热门
	params.cat_ids = $.url.param("cat_ids") + '';// 类目字符串，以类目ID+","方式传递
	PageUtils.addModule(name, title, region, next, params, function(data) {
				if (func) {
					func(data);
				}
			});

}
/**
 * 更新模块
 * 
 * @param {}
 *            id
 * @param {}
 *            title
 * @param {}
 *            func
 */
function updateShopTopCodeModuleContent(id, title, func) {
	var params = {};
	params.isHd = ($('#module-ishd').attr('checked') + "");
	var iframe = $('#shop-topcode-textarea').val();
	if (!iframe) {
		alert('您尚未填写淘宝关键词风向标代码');
		return false;
	}
	var src = $(iframe).attr('src');
	if (!src) {
		alert('代码格式不正确');
		return false;
	}
	$.url.setUrl(src);
	params.name = $.url.param("name") + '';// 名称
	params.sh = $.url.param("sh") + '';// 高度
	params.sn = $.url.param("sn") + '';// 条数
	params.tn = $.url.param("tn") + '';// 类目条数
	params.bgc = $.url.param("bgc") + '';// 背景
	params.bc = $.url.param("bc") + '';// 边框
	params.fc = $.url.param("fc") + '';// 文字
	params.tc = $.url.param("tc") + '';// 标题
	params.trtp = $.url.param("trtp") + '';// 类型 1：销售；2:搜索；3：品牌
	params.up = $.url.param("up") + '';// 维度 1：上升；2：热门
	params.cat_ids = $.url.param("cat_ids") + '';// 类目字符串，以类目ID+","方式传递
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}