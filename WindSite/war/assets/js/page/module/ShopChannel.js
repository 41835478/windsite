/**
 * 店铺简易搜索模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopChannel", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopChannel(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopChannelModuleConfig(func) {
	$.ajax({
		url : '/router/member/page/config/channel?v=' + Math.random(),
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
				if (options.channel) {
					$('#module-content input[name="shop-channel-radio"][value="'
							+ options.channel + '"]').attr('checked', true);
				}

			}
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
function validateShopChannelModuleConfig() {
	var checked = $('#module-content input[name="shop-channel-radio"]:checked');
	if (checked.length == 0) {
		alert('您尚未选择频道');
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
function createShopChannelModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				channel : $('#module-content input[name="shop-channel-radio"]:checked')
						.val()
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
function updateShopChannelModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				channel : $('#module-content input[name="shop-channel-radio"]:checked')
						.val()
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}