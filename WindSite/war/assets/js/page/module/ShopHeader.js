/**
 * 店标模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopHeader", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					type : 'smart',// 背景类型,默认智能广告,可选项smart,image,flash,nobg
					image : '',// 背景图片地址
					image_url : '',// 背景图片点击链接
					flash : '',// 阿里妈妈广告牌地址
					nav_layout : 'left',// 菜单位置
					isHd : false
					// 默认不显示标题栏
				},
				moduleEdit : function() {
					$('#page-header-editor').dialog('open');
				},
				_initModule : function() {
					PageModuleUtils.initShopHeader(this.element);
				},
				/**
				 * 返回当前模块源码
				 */
				toSource : function(isValidate) {

				}

			});
})(jQuery);
/**
 * 初始化模块内容编辑页面(新增时用)
 */
function initShopHeaderModuleConfig(func) {
	$('#module-content')
			.empty()
			.append('<form style="margin-left:25px;"><div class="help_info" align="left" style="position:relative;"><h3>新增完成后，可以点击编辑按钮配置具体内容</h3></div></form>');
	if (func) {
		func();
	}
	return true;
}
/**
 * 校验模块配置(新增时用)
 * 
 * @return {Boolean}
 */
function validateShopHeaderModuleConfig() {
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		if ($('#header-image').val()) {
			if (!PageUtils.validateUrl($('#header-image').val())) {
				alert('自定义图片地址非法');
				return false;
			}
		}
		if ($('#header-image-url').val()) {
			if (!PageUtils.validateUrl($('#header-image-url').val())) {
				alert('自定义图片链接地址非法');
				return false;
			}
		}
		if ($('#header-flash').val()) {
			if (!PageUtils.validateUrl($('#header-flash').val())) {
				alert('阿里妈妈广告牌地址非法');
				return false;
			}
		}
	}
	if (func) {
		func();
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
function createShopHeaderModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				type : 'smart',
				image : '',
				image_url : '',
				flash : '',
				nav_layout : 'nav-left',
				list : ''
			}, function(data) {
				$('#J_HeaderPagesPopup').remove();
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
function updateShopHeaderModuleContent(id, title, func) {
	var isError = false;
	var reg = /http:\/\/.+/;
	var navs = [];
	$('#header-nav-edit .rowElem').each(function() {
				var titleInput = $('.header-nav-title', $(this));
				var urlInput = $('.header-nav-url', $(this));
				var t = $(this).attr('t');
				var v = $(this).attr('v');
				var open = $(this).find('.isOpenBlank').attr('checked');
				var title = titleInput.val();
				var url = urlInput.val();

				if (!title || '请输入链接标题' == title) {
					alert('当前链接标题不能为空');
					isError = true;
					titleInput.focus();
					return false;
				}
				if (!url || '请输入链接地址' == url) {
					alert('当前链接地址不能为空');
					isError = true;
					urlInput.focus();
					return false;
				}
				if ('custome' == t) {
					if (!reg.test(url)) {
						alert('当前链接地址不合法');
						isError = true;
						urlInput.focus();
						return false;
					}
				}
				var obj = {};
				obj.title = title;
				if ('channel' == t) {
					obj.url = '/channel/' + url + '.html';
				} else {
					obj.url = url;
				}
				if (t)
					obj.t = t;
				if (v)
					obj.v = v;
				if (true == open) {
					obj.open = 'B';
				} else {
					obj.open = 'S';
				}
				navs.push(obj);
			});
	if (isError) {
		return false;
	}
	var nav_layout = $('#page-header-editor input[name="header-nav-layout"]:checked')
			.val();
	PageUtils.updateModule(id, title, {
				type : $('#page-header-editor .dialog-nav li.selected')
						.attr('t'),
				image : $('#header-image').val(),
				image_url : $('#header-image-url').val(),
				flash : $('#header-flash').val(),
				nav_layout : nav_layout,
				list : PageUtils.json2str(navs)
			}, function(data) {
				$('#J_HeaderPagesPopup').remove();
				if (func) {
					func(data);
				}
				$('#J_ConfirmRelease').attr('isHeader', 'true');
			});
}