/**
 * 文章列表模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopBlog", $.ui.pageModule, {
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
function initShopBlogModuleConfig(func) {
	$.ajax({
		url : '/router/member/page/config/blog?v=' + Math.random(),
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
				if (options.cid) {// 还原分类
					$('#module-content #shop-blog-cids').val(options.cid);
				}
				if (options.showtype) {// 还原展现
					$('#module-content input[name="shop-blog-showtype"][value="'
							+ options.showtype + '"]').attr('checked', true);
				}
				if (options.isdate) {
					$('#module-content #shop-blog-isdate').attr('checked',
							'false' == options.isdate ? false : true);
				}
				if (options.tlength) {// 还原标题字数限制
					$('#module-content #shop-blog-tlength')
							.val(options.tlength);
				}
				if (options.count) {// 还原文章列表显示数量
					$('#module-content #shop-blog-count').val(options.count);
				}
			}
			$('#shop-blog-count').change(function() {
						var _keywords_line = $(this).val();
						var res = /^[0-9]{1,2}$/.test(_keywords_line);
						if (!res) {
							alert("输入的值必须是0-9的一位或两位数字！");
							$(this).val(5);
							return;
						} else {
							if (parseInt(_keywords_line) > 20) {
								alert("文章显示行数不能超过20");
								$(this).val(20);
								return;
							}
						}
					});
			$('#shop-blog-tlength').change(function() {
						var _keywords_line = $(this).val();
						if (_keywords_line) {
							var res = /^[0-9]{1,2}$/.test(_keywords_line);
							if (!res) {
								alert("输入的值必须是0-9的一位或两位数字或者留空！");
								$(this).val('');
								return;
							} else {
								if (parseInt(_keywords_line) < 5) {
									alert("文章显示行数不能小于5");
									$(this).val(5);
									return;
								}
							}
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
function validateShopBlogModuleConfig() {
	if (!$('#shop-blog-cids').val() || '0' == $('#shop-blog-cids').val()) {
		alert('您尚未选择要显示文章的分类');
		return false;
	}
	var res = /^[0-9]{1,2}$/.test($('#shop-blog-count').val());
	if (!res) {
		alert("输入的值必须是0-9的一位或两位数字！");
		$('#shop-blog-count').val('1');
		return false;
	} else {
		if (parseInt($('#shop-blog-count').val()) > 20) {
			alert("文章显示行数不能超过20");
			$('#shop-blog-count').val('20');
			return false;
		}
	}
	if ($('#shop-blog-tlength').val()) {
		res = /^[0-9]{1,2}$/.test($('#shop-blog-tlength').val());
		if (!res) {
			alert("输入的值必须是0-9的一位或两位数字！");
			$('#shop-blog-tlength').val('');
			return false;
		} else {
			if (parseInt($('#shop-blog-tlength').val()) < 5) {
				alert("文章显示行数不能小于5");
				$('#shop-blog-tlength').val('5');
				return false;
			}
		}
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
function createShopBlogModuleContent(name, title, region, next, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	params.showtype = $('#module-content input[name="shop-blog-showtype"]:checked')
			.val();// 显示类型
	params.cid = $('#shop-blog-cids').val();
	params.count = $('#shop-blog-count').val();
	params.tlength = $('#shop-blog-tlength').val();
	params.isdate = $('#shop-blog-isdate').attr('checked') + "";
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
function updateShopBlogModuleContent(id, title, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	params.showtype = $('#module-content input[name="shop-blog-showtype"]:checked')
			.val();// 显示类型
	params.cid = $('#shop-blog-cids').val();
	params.count = $('#shop-blog-count').val();
	params.tlength = $('#shop-blog-tlength').val();
	params.isdate = $('#shop-blog-isdate').attr('checked') + "";
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}