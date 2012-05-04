/**
 * 分类模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopLinks", $.ui.pageModule, {
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
function initShopLinksModuleConfig(func) {
	$('#module-content')
			.empty()
			.append('<form id="shop-links-editor" style="margin-left:25px;"></form>');
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		var lis = $('ul.shop-links-ul li', MODULE);
		if (lis.length > 0) {
			lis.each(function() {
				var title = $('a', $(this)).text();
				var url = $('a', $(this)).attr('href');
				var li = $('<div class="rowElem ks-clear shop-links-row"><input type="text" value="'
						+ title
						+ '" size="20" class="shop-links-title" /><input type="text" value="'
						+ url
						+ '" size="30" class="shop-links-url"><a class="shop-links-del">删除</a><a class="shop-links-up">上移</a><a class="shop-links-down">下移</a></div>');
				$('#shop-links-editor').append(li);
				initShopLinksLi(li);
			});
		}
	}
	if ($('#shop-links-editor .shop-links-row').length == 0) {// 如果没有友情链接，则添加一个空白
		var li = $('<div class="rowElem ks-clear shop-links-row"><input type="text" value="请输入链接标题" size="20" class="shop-links-title" /><input type="text" value="请输入链接地址" size="30" class="shop-links-url"><a class="shop-links-del">删除</a><a class="shop-links-up">上移</a><a class="shop-links-down">下移</a></div>');
		$('#shop-links-editor').append(li, true);
		initShopLinksLi(li);
	}
	$('#module-content')
			.append('<a id="add-shop-links-button" href="javascript:;" style="color:red;margin-left:25px;">新增友情链接</a>');
	$('#add-shop-links-button').click(function() {
		if ($('#shop-links-editor .shop-links-row').length >= 8) {
			alert('您最多可以添加8个友情链接，移除一个之后才可以新增');
			return;
		}
		var rowElem = $('<div class="rowElem ks-clear shop-links-row"><input type="text" value="请输入链接标题" size="20" class="shop-links-title" /><input type="text" value="请输入链接地址" size="30" class="shop-links-url"><a class="shop-links-del">删除</a><a class="shop-links-up">上移</a><a class="shop-links-down">下移</a></div>');
		$('#shop-links-editor').append(rowElem);
		initShopLinksLi(rowElem);
	});
	if (func) {
		func();
	}
	return true;
}
function initShopLinksLi(rowElem) {
	// 删除当前选择友情链接
	$('a.shop-links-del', rowElem).click(function() {
				if ($('#shop-links-editor .shop-links-row').length == 1) {
					alert('最后一行无法删除');
					return false;
				}
				if (confirm('您确认要删除当前导航菜单项吗?')) {
					$(this).parent().remove();
				}
				return false;
			});
	// 友情链接排序上移
	$('a.shop-links-up', rowElem).click(function() {
				var row = $(this).parent();
				var prev = row.prevAll('.shop-links-row:first');
				if (prev.length == 1) {
					prev.before(row);
				}
				return false;
			});
	// 友情链接排序下移
	$('a.shop-links-down', rowElem).click(function() {
				var row = $(this).parent();
				var next = row.nextAll('.shop-links-row:first');
				if (next.length == 1) {
					next.after(row);
				}
				return false;
			});
	$('.shop-links-title', rowElem).focus(function() {
				if ('请输入链接标题' == $(this).val()) {
					$(this).val('');
				}
			}).blur(function() {
				if (!$(this).val()) {
					$(this).val('请输入链接标题');
				}
			}).jqTransInputText();// 格式化表单
	$('.shop-links-url', rowElem).focus(function() {
				if ('请输入链接地址' == $(this).val()) {
					$(this).val('http://');
				}
			}).blur(function() {
				if (!$(this).val() || 'http://' == $(this).val()) {
					$(this).val('请输入链接地址');
				}
			}).jqTransInputText();// 格式化表单
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopLinksModuleConfig() {
	var isError = false;
	var reg = /http:\/\/.+/;
	$('#shop-links-editor .shop-links-row').each(function() {
				var titleInput = $('.shop-links-title', $(this));
				var urlInput = $('.shop-links-url', $(this));
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
				if (!reg.test(url)) {
					alert('当前链接地址不合法');
					isError = true;
					urlInput.focus();
					return false;
				}
			});
	if (isError) {
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
function createShopLinksModuleContent(name, title, region, next, func) {
	var isError = false;
	var reg = /http:\/\/.+/;
	var links = [];
	$('#shop-links-editor .shop-links-row').each(function() {
				var titleInput = $('.shop-links-title', $(this));
				var urlInput = $('.shop-links-url', $(this));
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
				if (!reg.test(url)) {
					alert('当前链接地址不合法');
					isError = true;
					urlInput.focus();
					return false;
				}
				var obj = {};
				obj.title = title;
				obj.url = url;
				links.push(obj);
			});
	if (isError) {
		return false;
	}
	var ul = $('<ul class="shop-links-ul"></ul>');
	if (links && links.length > 0) {
		for (var i = 0; i < links.length; i++) {
			ul.append('<li><a target="_blank" href="' + links[i].url + '">'
					+ links[i].title + '</a></li>')
		}
	}
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				bd : $('<div></div>').text($('<div></div>').append(ul).html())
						.html()
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
function updateShopLinksModuleContent(id, title, func) {
	var isError = false;
	var reg = /http:\/\/.+/;
	var links = [];
	$('#shop-links-editor .shop-links-row').each(function() {
				var titleInput = $('.shop-links-title', $(this));
				var urlInput = $('.shop-links-url', $(this));
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
				if (!reg.test(url)) {
					alert('当前链接地址不合法');
					isError = true;
					urlInput.focus();
					return false;
				}
				var obj = {};
				obj.title = title;
				obj.url = url;
				links.push(obj);
			});
	if (isError) {
		return false;
	}
	var ul = $('<ul class="shop-links-ul"></ul>');
	if (links && links.length > 0) {
		for (var i = 0; i < links.length; i++) {
			ul.append('<li><a target="_blank" href="' + links[i].url + '">'
					+ links[i].title + '</a></li>')
		}
	}
	PageUtils.updateModule(id, title, {
				isHd : $('#module-ishd').attr('checked') + "",
				bd : $('<div></div>').text($('<div></div>').append(ul).html())
						.html()
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}