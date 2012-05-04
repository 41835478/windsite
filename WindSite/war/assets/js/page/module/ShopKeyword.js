/**
 * 关键词模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopKeyword", $.ui.pageModule, {
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
function initShopKeywordModuleConfig(func) {
	$.ajax({
		url : '/router/member/page/config/keyword?v=' + Math.random(),
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
				var options = MODULE['page'
						+ PageModuleUtils.getModuleName(MODULE.attr('name'))]('option');
				if (options.cids) {// 还原分类
					var cids = options.cids.split(',');
					for (var i = 0; i < cids.length; i++) {
						$('#page-module-editor input[name="keyword-cids-checkbox"][value="'
								+ cids[i] + '"]').attr('checked', true);
					}
				}
				if (options.sort) {
					$('#page-module-editor input[name="keyword-sort-radio"][value="'
							+ options.sort + '"]').attr('checked', true);
				}
			}
			var limit = $('#keyword-cids-limit').text();
			if (limit) {
				limit = parseInt(limit);
			} else {
				limit = 6;
			}
			$('#page-module-editor input[name="keyword-cids-checkbox"]')
					.change(function() {
						if ($('#page-module-editor input[name="keyword-cids-checkbox"]:checked').length > limit) {
							alert('您只能选择' + limit + '个关键词分类');
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
function validateShopKeywordModuleConfig() {
	var cids = $('#page-module-editor input[name="keyword-cids-checkbox"]:checked');
	if (cids.length == 0) {
		alert('您尚未选择要显示的关键词分类');
		return false;
	}
	var up = $('#page-module-editor input[name="keyword-sort-radio"]:checked');
	if (cids.length == 0) {
		alert('您尚未选择要显示的关键词排序方式');
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
function createShopKeywordModuleContent(name, title, region, next, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var cids = [];
	$('#page-module-editor input[name="keyword-cids-checkbox"]:checked').each(
			function() {
				cids.push($(this).val());
			});
	params.cids = cids.join(',');// 分类
	params.sort = $('#page-module-editor input[name="keyword-sort-radio"]:checked')
			.val();// 飙升，热搜
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
function updateShopKeywordModuleContent(id, title, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var cids = [];
	$('#page-module-editor input[name="keyword-cids-checkbox"]:checked').each(
			function() {
				cids.push($(this).val());
			});
	params.cids = cids.join(',');// 分类
	params.sort = $('#page-module-editor input[name="keyword-sort-radio"]:checked')
			.val();// 飙升，热搜
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}