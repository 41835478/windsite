/**
 * 店铺简易搜索模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopSearch", $.ui.pageModule, {
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
function initShopSearchModuleConfig(func) {
	$('#module-content').load(
			'/assets/js/page/module/ShopSearchConfig.html?v=' + Math.random(),
			function() {
				$('#module-content .J_TagBody').empty();// 清空
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE.pageShopSearch('option');
					if (options.isprice) {// 是否显示价格筛选
						$('#module-content input[type="radio"][name="showPrice"][value="'
								+ options.isprice + '"]').attr('checked', true);
					}
					if (options.words) {// 初始化关键词
						var hots = options.words.split(',');
						if (hots.length > 0) {
							for (var i = 0; i < hots.length; i++) {
								$('#module-content .J_TagBody')
										.append('<tr class="J_TagTr"><td><input type="text" name="hotword" value="'
												+ hots[i]
												+ '"></td><td><a class="move-up J_TagMoveUp" href="#">上移</a> <a class="move-down J_TagMoveDown" href="#">下移</a> <a href="#" class="btn-del J_Del">删除</a></td></tr>');
							}
						}
					}
				}
				if ($('#module-content tr.J_TagTr').length == 0) {// 如果没有关键词，自动添加一行空白
					$('#module-content .J_TagBody')
							.append('<tr class="J_TagTr"><td><input type="text" name="hotword" value=""></td><td><a class="move-up J_TagMoveUp" href="#">上移</a> <a class="move-down J_TagMoveDown" href="#">下移</a> <a href="#" class="btn-del J_Del">删除</a></td></tr>');
				}
				$('#module-content  .setting-add a.J_Add').click(function() {
					var table = $('#module-content .J_SettingTable');
					if ($('tr.J_TagTr', table).length >= 6) {
						alert('最多只能添加6行');
						return false;
					}
					var tr = $('<tr class="J_TagTr"><td><input type="text" name="hotword" value=""></td><td><a class="move-up J_TagMoveUp" href="#">上移</a> <a class="move-down J_TagMoveDown" href="#">下移</a> <a href="#" class="btn-del J_Del">删除</a></td></tr>');
					$('tr.J_TagTr:last', table).after(tr);
					initShopSearchKeywordTr(tr);
					return false;
				});
				$('#module-content .J_SettingTable tr.J_TagTr').each(
						function() {
							initShopSearchKeywordTr($(this));
						});
				if (func) {
					func();
				}
			});
	return true;
}
function initShopSearchKeywordTr(tr) {
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
function validateShopSearchModuleConfig() {
	var isError = false;
	$('#module-content .J_SettingTable tr.J_TagTr').each(function() {
		var title = $('input[name="hotword"]', $(this)).val();
		if (title) {
			if (title.indexOf(',') != -1) {
				$('input[name="hotword"]', $(this))
						.val(title.replace(/,/g, ''));
			}
			var temp = $('input[name="hotword"]', $(this)).val().replace(
					/[^\x00-\xff]/g, "**");
			if (temp.length > 10) {
				alert('最多允许10个字符,5个汉字');
				$('input[name="hotword"]', $(this)).focus();
				isError = true;
				return false;
			}
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
function createShopSearchModuleContent(name, title, region, next, func) {
	var words = [];
	$('#module-content .J_SettingTable tr.J_TagTr').each(function() {
				var title = $('input[name="hotword"]', $(this)).val();
				if (title) {
					words.push(title);
				}
			});
	PageUtils.addModule(name, title, region, next, {
		isHd : ($('#module-ishd').attr('checked') + ""),
		isprice : $('#module-content input[type="radio"][name="showPrice"]:checked')
				.val(),
		words : words.join(','),
		isHeader : ((MODULE.parents('#hd').length == 1) ? 'true' : 'false')
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
function updateShopSearchModuleContent(id, title, func) {
	var words = [];
	$('#module-content .J_SettingTable tr.J_TagTr').each(function() {
				var title = $('input[name="hotword"]', $(this)).val();
				if (title) {
					words.push(title);
				}
			});
	PageUtils.updateModule(id, title, {
		isHd : ($('#module-ishd').attr('checked') + ""),
		isprice : $('#module-content input[type="radio"][name="showPrice"]:checked')
				.val(),
		words : words.join(','),
		isHeader : ((MODULE.parents('#hd').length == 1) ? 'true' : 'false')
	}, function(data) {
		if (func) {
			func(data);
		}
	});
}