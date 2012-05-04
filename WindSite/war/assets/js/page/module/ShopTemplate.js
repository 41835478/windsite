/**
 * 自定义组件（html编辑器）
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopTemplate", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopFlashShow(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopTemplateModuleConfig(func) {
	$('#module-content')
			.empty()
			.append('<textarea id="kissyTextArea" style="width:98%;height:250px"></textarea>');
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		$('#kissyTextArea').val(MODULE.find('.custom-area').html());
		PageUtils.initKissyEditor();
		if (func) {
			func();
		}
		return true;
	} else {// 新增
		$('#module-content')
				.empty()
				.append('<form style="margin-left:25px;"><div class="help_info" align="left" style="position:relative;"><h3>新增完成后，可以点击编辑按钮配置具体内容</h3></div></form>');
		if (func) {
			func();
		}
		return true;
	}
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopTemplateModuleConfig() {
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		var html = KEDITOR.getData();
		if (!html) {
			alert('您尚未编辑内容');
			return false;
		} else {
			if (/J_TRegion|J_TBox/gi.test(html)) {
				alert('系统检测到您的源码当中含有非法样式名称【如:J_TRegion,J_TBox】，请修改');
				return false;
			}
		}
		if ($('<div></div>').append(html).children() == 0) {
			alert('自定义模块内容为空，请确保您的代码正确，不允许使用js，css');
			return false;
		}
	} else {
		if (MODULE_ADTYPE == null) {
			alert('未找到该模块模板');
			return false;
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
function createShopTemplateModuleContent(name, title, region, next, func) {
	if (MODULE_ADTYPE == null) {
		alert('未找到该模块模板');
		return false;
	}
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				template : MODULE_ADTYPE,
				bd : '',
				adType : MODULE_ADTYPE
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
function updateShopTemplateModuleContent(id, title, func) {
	var html = KEDITOR.getData();
	var div = $('<div></div>').html(html);
	var p = div.find('p:first');
	if (p.length == 1 && '&nbsp;' == p.html()) {
		p.remove();// 移除第一个空P
	}
	p = div.find('p:last');
	if (p.length == 1 && '&nbsp;' == p.html()) {
		p.remove();// 移除最后一个空P
	}
	PageUtils.updateModule(id, title, {
				isHd : $('#module-ishd').attr('checked') + "",
				bd : $('<div></div>').text(div.html()).html(),
				adType : MODULE_ADTYPE
			}, function(data) {
				if (func) {
					KEDITOR.setData('');
					func(data);
				}
			});
}