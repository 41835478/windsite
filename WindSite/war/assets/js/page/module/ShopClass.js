/**
 * 文章分类模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopClass", $.ui.pageModule, {
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
function initShopClassModuleConfig(func) {
	$.ajax({
		url : '/router/member/page/config/class?v=' + Math.random(),
		type : 'GET',
		data : {
			layout : $('#page-module-editor').pageModuleEditor('option',
					'layout')
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
			if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
				MODULE.find('.cats .cat a').each(function() {
					var cid = $(this).attr('href').split('.html')[0]
							.split('tblogs/')[1];
					$('#page-module-editor input[name="class-checkbox"][value="'
							+ cid + '"]').attr('checked', true);
				});
			}
			$('#page-module-editor input[name="class-checkbox"]').change(
					function() {
						if ($('#page-module-editor input[name="class-checkbox"]:checked').length > 20) {
							alert('您只能选择20个分类');
							$(this).attr('checked', false);
							return;
						}
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
function validateShopClassModuleConfig() {
	var pages = $('#page-module-editor input[name="class-checkbox"]:checked');
	if (pages.length == 0) {
		alert('您尚未选择要显示的文章分类');
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
function createShopClassModuleContent(name, title, region, next, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var list = [];
	$('#page-module-editor input[name="class-checkbox"]:checked').each(
			function() {
				var obj = {};
				obj.cid = $(this).val();
				obj.cname = $(this).attr('title');
				list.push(obj);
			});
	params.list = PageUtils.json2str(list);
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
function updateShopClassModuleContent(id, title, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var list = [];
	$('#page-module-editor input[name="class-checkbox"]:checked').each(
			function() {
				var obj = {};
				obj.cid = $(this).val();
				obj.cname = $(this).attr('title');
				list.push(obj);
			});
	params.list = PageUtils.json2str(list);
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}