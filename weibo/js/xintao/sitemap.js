$(function() {
	var switcher1 = new Switcher({
				items : $('#sitemap-type a'),
				contents : $('#sitemap-tabs>.tab'),
				trigMode : 'click',
				selectedCS : 'current'
			});
	switcher1.select($('#sitemap-type a[data-value="' + TABS + '"]')[0]);
	if (CIDS != '') {
		loadCids(CIDS);
	}
	$('#J_SiteMap_Cats_All').change(function() {
		$('#J_SiteMap_Cats input[type="checkbox"]').attr('checked',
				$(this).attr('checked'));
	});
	Xwb.use("action").reg("openCids", function(e) {
				$('#J_SiteMap_CateContainer').toggle();
			}, {
				na : true
			});
	$('#J_SiteMap_CateContainer ul.cc-cbox-cont:first li.cc-cbox-item').each(
			function() {
				initCatLi($(this), 0);
			});
	$('#J_SiteMap_CidsConfirm').click(function() {
		if ($('#J_SiteMap_CidsSelected li').length == 0) {
			alert('您尚未选择要添加的分类');
			return false;
		}
		var array = [];
		$('#J_SiteMap_CidsSelected li').each(function() {// 已选择的
					array.push($(this).attr('data-value'));
				});
		$('#J_SiteMap_Cats input[type="checkbox"]').each(function() {// 已添加的
					array.push($(this).attr('data-value'));
				});
		if (array.length > 100) {
			alert('您最多添加100个分类，请删除' + (array.length - 100) + '分类');
			return false;
		}
		saveCids(array.join(','), function(data) {
			alert(data['rst']);
			location.href = '/admin.php?m=mgr/xintao/sitemap.default_action&amp;router=system/0/1';
		});
		return false;
	});
	$("#J_SiteMap_Cats").sortable({
				handle : '.move'
			});
	$("#J_SiteMap_Cats").disableSelection();
	$('#J_SiteMap_SelectedDel').click(function() {
				delSiteMapSelectedCids();
				return false;
			});
	$('#J_SiteMap_SaveSort').click(function() {
				delSiteMapCid(0);
				return false;
			});
	// form
	new Validator({
				form : '#J_SiteMap_ProductsForm',
				trigger : '#J_SiteMap_ProductsSubmitBtn'
			});
	new Validator({
				form : '#J_SiteMap_ItemsForm',
				trigger : '#J_SiteMap_ItemsSubmitBtn'
			});
	new Validator({
				form : '#J_SiteMap_PostersForm',
				trigger : '#J_SiteMap_PostersSubmitBtn'
			});
	new Validator({
				form : '#J_SiteMap_TvsForm',
				trigger : '#J_SiteMap_TvsSubmitBtn'
			});
	new Validator({
				form : '#J_SiteMap_KeywordsForm',
				trigger : '#J_SiteMap_KeywordsSubmitBtn'
			});
	$('.form-box form .checkbox-row input[type="checkbox"]').change(function() {
		if ($(this).is(':checked')) {
			$(this).val('1');
			$(this).parent().find('input[type="hidden"][name="'
					+ $(this).attr('name') + '"]').remove();// 移除同名隐藏域
		} else {
			$(this).val('');
			$(this).parent().find('input[type="hidden"][name="'
					+ $(this).attr('name') + '"]').remove();// 移除同名隐藏域
			$(this).parent().prepend('<input type="hidden" name="'
					+ $(this).attr('name') + '" value="">');// 增加checkbox同名隐藏域，避免checkbox未选中状态无法提交该空值参数
		}
	});
	$(".form-box form select").each(function() {
				var value = $(this).attr('data-value');
				if (value) {
					$(this).val(value);
					$(this).change();
				}
			});
	$('#J_SiteMap_KeywordsUploadBtn').click(function() {
				Xwb.use('MgrDlg', {
							modeHtml : HtmlMode,
							formMode : true,
							valcfg : {
								form : '#J_SiteMap_KeywordsUploadForm',
								trigger : '#J_SiteMap_KeywordsUploadConfirmBtn'
							},
							dlgcfg : {
								onViewReady : function(View) {
								},
								destroyOnClose : false,
								actionMgr : false,
								title : '上传关键词'
							}
						})
			});
});
function refreshCount() {
	$('#J_SiteMap_AddedCount')
			.text($('#J_SiteMap_Cats input[type="checkbox"]').length);
	$('#J_SiteMap_SelectededCount')
			.text($('#J_SiteMap_CidsSelected li').length);
}
function initCatLi(li, index) {
	li.hover(function() {
				$(this).addClass('overactive');
			}, function() {
				$(this).removeClass('overactive');
			}).click(function() {
				if (index < 2) {
					if (li.hasClass('cc-hasChild-item'))
						loadChildCids($(this).attr('data-value'), (index + 1));
				}
				$(this).addClass('cc-selected').siblings()
						.removeClass('cc-selected');
			});
	li.find('a.btn_add').click(function(e) {
		e.stopPropagation();// 停止冒泡
		var cid = $(this).attr('data-value');
		var isAdd = true;
		if ($('#J_SiteMap_CidsSelected li[data-value="' + cid + '"]').length > 0) {
			alert('该分类已选择');
			isAdd = false;
		}
		if ($('#J_SiteMap_Cats input[type="checkbox"][data-value="' + cid
				+ '"]').length > 0) {
			alert('该分类已添加');
			isAdd = false;
		}
		if ($('#J_SiteMap_Cats input[type="checkbox"]').length
				+ $('#J_SiteMap_CidsSelected li').length >= 100) {
			alert('您最多只能添加100个分类');
			isAdd = false;
		}
		if (!isAdd) {
			return;
		}
		var selected = $('<li data-value="' + cid + '" class="cc-cbox-item">'
				+ li.text().replace('添加', '')
				+ '<a href="#" class="btn_add" data-value="' + cid
				+ '">删除</a></li>');
		$('#J_SiteMap_CidsSelected').append(selected);
		selected.hover(function() {
					$(this).addClass('overactive');
				}, function() {
					$(this).removeClass('overactive');
				}).find('a.btn_add').click(function() {
					$(this).parents('li:first').remove();
					refreshCount();
					return false;
				});
		refreshCount();
		return false;
	});
}
function loadChildCids(cid, index) {
	for (var i = index; i < 3; i++) {
		$('#J_SiteMap_CateContainer ul.cc-cbox-cont[data-value="' + i + '"]')
				.html('');
	}
	var ul = $('#J_SiteMap_CateContainer ul.cc-cbox-cont[data-value="' + index
			+ '"]');
	$.ajax({
		type : 'GET',
		url : '/admin.php?m=mgr/xintao/sitemap.getChildcids&ajax=true',
		dataType : 'json',
		data : {
			'cid' : cid
		},
		success : function(data) {
			if (data['errno'] == -2) {
				window.top.location.href = "/admin.php?m=mgr/admin.login";
			} else {
				if (data['rst']) {
					data = data['rst'];
					for (var i = 0; i < data.length; i++) {
						var $cat = data[i];
						if (index < 2 && $cat['is_parent']) {
							li = $('<li data-value="'
									+ $cat['cid']
									+ '" class="cc-cbox-item cc-hasChild-item">'
									+ $cat['name']
									+ '<a href="#" class="btn_add" data-value="'
									+ $cat['cid'] + '">添加</a></li>');
						} else {
							li = $('<li data-value="'
									+ $cat['cid']
									+ '" class="cc-cbox-item">'
									+ $cat['name']
									+ '<a href="#" class="btn_add" data-value="'
									+ $cat['cid'] + '">添加</a></li>');
						}
						ul.append(li);
						initCatLi(li, index);
					}
				}
			}
		}
	});
}
function loadCids(cids) {
	if (cids == '') {
		$('#J_SiteMap_Cats').html('<tr><td colspan=4>类目地图为空...</td></tr>');
		return;
	}
	$('#J_SiteMap_Cats').html('<tr><td colspan=4>正在加载中...</td></tr>');
	$.ajax({
		type : 'POST',
		url : '/admin.php?m=mgr/xintao/sitemap.cids&ajax=true',
		dataType : 'json',
		data : {
			'cids' : cids
		},
		success : function(data) {
			if (data['errno'] == -2) {
				window.top.location.href = "/admin.php?m=mgr/admin.login";
			} else {
				$('#J_SiteMap_Cats').html('');
				if (data['rst']) {
					data = data['rst'];
					for (var i = 0; i < data.length; i++) {
						var cat = data[i];
						$('#J_SiteMap_Cats')
								.append('<tr><td><input type="checkbox" data-value="'
										+ cat['cid']
										+ '" name="sitemap_cats"/></td><td><span class="move" title="拖动我可排序"></span></td><td>'
										+ cat['name']
										+ '</td><td><a class="icon-del cid-delete" href="#" data-value="'
										+ cat['cid'] + '"> 删除</a></td></tr>');
					}
					$('#J_SiteMap_Cats a.cid-delete').click(function() {
								delSiteMapCid($(this).attr('data-value'));
								return false;
							});
				} else {
					$('#J_SiteMap_Cats')
							.html('<tr><td colspan=4>类目地图为空...</td></tr>');
				}
				refreshCount();
			}
		}
	});
}
function delSiteMapSelectedCids() {
	if ($('#J_SiteMap_Cats input[type="checkbox"]:checked').length == 0) {
		alert('您尚未选择要删除的分类');
		return false;
	}
	if (confirm('您确认删除已选分类？')) {
		var array = [], delArray = [];
		$('#J_SiteMap_Cats input[type="checkbox"]').each(function() {
					if ($(this).attr('checked')) {
						delArray.push($(this).attr('data-value'));
					} else {
						array.push($(this).attr('data-value'));
					}
				});
		saveCids(array.join(','), function(data) {
					alert(data['rst']);
					for (var i = 0; i < delArray.length; i++) {
						$('#J_SiteMap_Cats input[type="checkbox"][data-value="'
								+ delArray[i] + '"]').parents('tr:first')
								.remove();
					}
					refreshCount();
				});
	}
	return false;

}
function delSiteMapCid(cid) {
	var array = [];
	$('#J_SiteMap_Cats input[type="checkbox"][data-value!="' + cid + '"]')
			.each(function() {
						array.push($(this).attr('data-value'));
					});
	saveCids(array.join(','), function(data) {
				alert(data['rst']);
				$('#J_SiteMap_Cats input[type="checkbox"][data-value="' + cid
						+ '"]').parents('tr:first').remove();
				refreshCount();
			});
	return false;
}
function saveCids(cids, callback) {
	$.ajax({
				type : 'POST',
				url : '/admin.php?m=mgr/xintao/sitemap.saveCids&ajax=true',
				dataType : 'json',
				data : {
					'cids' : cids
				},
				success : function(data) {
					if (data['errno'] == -2) {
						window.top.location.href = "/admin.php?m=mgr/admin.login";
					} else {
						if (callback && typeof(callback) == 'function') {
							callback(data);
						}
					}
				}
			});
}