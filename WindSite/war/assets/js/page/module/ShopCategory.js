/**
 * 分类模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopCategory", $.ui.pageModule, {
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
function initShopCategoryModuleConfig(func) {
	$.ajax({
				url : '/router/member/page/config/category?v=' + Math.random(),
				type : 'GET',
				data : {
					layout : $('#page-module-editor').pageModuleEditor(
							'option', 'layout')
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					alert('网络错误:' + textStatus);
					return;
				},
				success : function(data) {
					$('#module-content').empty().append(data);
					var cats = [];
					if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
						MODULE.find('.cats .cat a').each(function() {
									var obj = {};
									obj.name = $(this).text();
									obj.cid = $(this).attr('href')
											.split('cid=')[1];
									cats.push(obj);
								});
					}
					$('#module-content').pageCategoryEditor({
								limit : 30,
								isParent : false,
								cats : cats
							});
					if (func && typeof(func) == 'function') {
						func();
					}
				}
			});
	return true;
}

/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopCategoryModuleConfig() {
	if ($('#ul_selected li').length == 0) {
		alert('您尚未选择要显示的类目');
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
function createShopCategoryModuleContent(name, title, region, next, func) {
	var cats = [];
	$('#ul_selected li').each(function() {
				var obj = {};
				obj.cid = $(this).attr('cid');
				obj.cname = $(this).attr('cname');
				cats.push(obj);
			});
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				list : PageUtils.json2str(cats)
			}, function(data) {
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
function updateShopCategoryModuleContent(id, title, func) {
	var cats = [];
	$('#ul_selected li').each(function() {
				var obj = {};
				obj.cid = $(this).attr('cid');
				obj.cname = $(this).attr('cname');
				cats.push(obj);
			});
	PageUtils.updateModule(id, title, {
				isHd : $('#module-ishd').attr('checked') + "",
				list : PageUtils.json2str(cats)
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}