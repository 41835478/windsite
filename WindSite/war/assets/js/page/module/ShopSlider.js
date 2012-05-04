/**
 * 店铺简易搜索模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopSlider", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopSlider(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopSliderModuleConfig(func) {
	$.ajax({
		url : '/router/member/page/config/common/ShopSlider?v=' + Math.random(),
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
			$('#module-content').empty().append(data);// 清空
			if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
				var options = MODULE.pageShopSlider('option');
				if (options.height) {// 是否显示价格筛选
					$('#module-content input[name="shop-slider-height"]')
							.val(options.height);
				}
				var switchable = MODULE.find('.ks-switchable-content');
				switchable.find('a').each(function() {
					if ($(this).parent().hasClass('cloned')) {// 屏蔽掉scrollable差生的cloned
						return;
					}
					var img = $(this).find('img');
					var href = $(this).attr('href');
					var pic = img.attr('src');
					$('#module-content .J_TagBody')
							.append('<tr class="J_TagTr"><td><input type="text" name="pic" value="'
									+ pic
									+ '" style="width:300px"></td><td><input type="text" name="href" value="'
									+ href
									+ '" style="width:180px"></td><td><a class="move-up J_TagMoveUp" href="#">上移</a> <a class="move-down J_TagMoveDown" href="#">下移</a> <a href="#" class="btn-del J_Del">删除</a></td></tr>');
				});
			}
			if ($('#module-content tr.J_TagTr').length == 0) {// 如果没有关键词，自动添加一行空白
				$('#module-content .J_TagBody')
						.append('<tr class="J_TagTr"><td><input type="text" name="pic" value="" style="width:300px"></td><td><input type="text" name="href" value="" style="width:180px"></td><td><a class="move-up J_TagMoveUp" href="#">上移</a> <a class="move-down J_TagMoveDown" href="#">下移</a> <a href="#" class="btn-del J_Del">删除</a></td></tr>');
			}
			$('#module-content  .setting-add a.J_Add').click(function() {
				var table = $('#module-content .J_SettingTable');
				if ($('tr.J_TagTr', table).length >= 6) {
					alert('最多只能添加6行');
					return false;
				}
				var tr = $('<tr class="J_TagTr"><td><input type="text" name="pic" value="" style="width:300px"></td><td><input type="text" name="href" value="" style="width:180px"></td><td><a class="move-up J_TagMoveUp" href="#">上移</a> <a class="move-down J_TagMoveDown" href="#">下移</a> <a href="#" class="btn-del J_Del">删除</a></td></tr>');
				$('tr.J_TagTr:last', table).after(tr);
				initShopSliderKeywordTr(tr);
				return false;
			});
			$('#module-content .J_SettingTable tr.J_TagTr').each(function() {
						initShopSliderKeywordTr($(this));
					});
			if (func) {
				func();
			}
		}
	});
	return true;
}
function initShopSliderKeywordTr(tr) {
	$('a.J_TagMoveUp', tr).click(function() {
				var ptr = $(this).parents('tr.J_TagTr:first');
				var prev = ptr.prevAll('tr.J_TagTr:first');
				if (prev.length == 1) {
					prev.before(ptr);
				}
				return false;
			});
	$('a.J_TagMoveDown', tr).click(function() {
				var ptr = $(this).parents('tr.J_TagTr:first');
				var next = ptr.nextAll('tr.J_TagTr:first');
				if (next.length == 1) {
					next.after(ptr);
				}
				return false;
			});
	$('a.J_Del', tr).click(function() {
				var ptr = $(this).parents('tr.J_TagTr:first');
				if ($('#module-content .J_SettingTable tr.J_TagTr').length == 1) {
					alert('最后一行无法删除');
					return false;
				}
				if (confirm('您确认要删除该关键词吗？')) {
					ptr.remove();
				}
				return false;
			});
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopSliderModuleConfig() {
	var isError = false;
	var reg = /http:\/\/.+/;
	var height = $('#module-content input[name="shop-slider-height"]');
	if (!height.val()) {
		alert('模块(图片)高度尚未设置');
		height.focus();
		return false;
	}
	$('#module-content .J_SettingTable tr.J_TagTr').each(function() {
				var pic = $('input[name="pic"]', $(this));
				var href = $('input[name="href"]', $(this));
				if (!pic.val()) {
					alert('图片地址不能为空');
					pic.focus();
					isError = true;
					return false;
				}
				if (!href.val()) {
					alert('图片链接地址不能为空');
					href.focus();
					isError = true;
					return false;
				}

				if (!reg.test(pic.val())) {
					alert('图片地址不合法');
					pic.focus();
					isError = true;
					return false;
				}
				if (!reg.test(href.val())) {
					alert('图片链接地址不合法');
					href.focus();
					isError = true;
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
function createShopSliderModuleContent(name, title, region, next, func) {
	var pics = [];
	$('#module-content .J_SettingTable tr.J_TagTr').each(function() {
				var pic = $('input[name="pic"]', $(this)).val();
				var href = $('input[name="href"]', $(this)).val();
				if (pic && href) {
					var obj = {};
					obj.pic = pic;
					obj.href = href;
					pics.push(obj);
				}
			});
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				pics : PageUtils.json2str(pics),
				slider : 'taobao',
				height : $('#module-content input[name="shop-slider-height"]')
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
function updateShopSliderModuleContent(id, title, func) {
	var pics = [];
	$('#module-content .J_SettingTable tr.J_TagTr').each(function() {
				var pic = $('input[name="pic"]', $(this)).val();
				var href = $('input[name="href"]', $(this)).val();
				if (pic && href) {
					var obj = {};
					obj.pic = pic;
					obj.href = href;
					pics.push(obj);
				}
			});
	PageUtils.updateModule(id, title, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				pics : PageUtils.json2str(pics),
				slider : 'taobao',
				height : $('#module-content input[name="shop-slider-height"]')
						.val()
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}