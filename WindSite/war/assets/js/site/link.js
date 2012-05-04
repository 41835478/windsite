
/**
 * 查询推广链接(已作废)
 * 
 * @param {}
 *            pageNo
 * @param {}
 *            type
 */
function getXintaoLink(pageNo, type) {
	if (!pageNo) {
		pageNo = 1;
	}
	$('#filterType-title').empty();
	$('#filterTr').hide();
	if (type && type != '') {
		$('#filterType-title').empty().append('>>'
				+ $('#profileBody .filterType[type="' + type + '"]')
						.attr('title'));
	}
	$('#profileBody')
			.empty()
			.append("<tr id='loading'><td colspan=3><div  align='left'>正在加载数据,请稍候...</div></td></tr>");
	$.ajax({
				url : "/router/member/links/data?v=" + Math.random(),
				type : 'GET',
				data : {
					pageNo : pageNo,
					type : type
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$("#loading").remove();
					alert(textStatus);
				},
				success : function(data) {
					$("#loading").remove();
					$('#profileBody').empty().append(data);
					$('#profileBody .page-number').click(function() {
								getXintaoLink($('a', $(this)).text(), type);
								return false;
							});
					$('#profileBody .pgNext').click(function() {
								if (!$(this).hasClass('pgEmpty')) {
									getXintaoLink($(this).attr('page'), type);
								}
								return false;
							});
					$('#profileBody .filterType').click(function() {
								getXintaoLink(1, $(this).attr('type'));
							});
					$('#profileBody .getLink').click(function() {
								getHtmlXintaoLink($(this).attr('lid'));
							});
					if (type) {
						$('#filterTr').show();
					}
				}
			});
}
/**
 * 初始化商品推广
 */
function initAddItemLink() {
	var api = $("#addLinkWizard").scrollable();
	$('#addLinkWizard input[type="radio"][name="txtlinkRadio"]').change(
			function() {
				if ($(this).val() == 'customelink') {
					if ($(this).is(':checked')) {
						$('#txtlinkInput').attr('disabled', false);
					} else {
						$('#txtlinkInput').attr('disabled', true);
					}
				} else {
					$('#txtlinkInput').attr('disabled', true);
				}
			});
	$('#thirdPrev').click(function() {
				api.prev();
			});
	$('#thirdNext').click(function() {
		var checked = $('input[type="radio"][name="txtlinkRadio"]:checked');
		if (checked.length == 0) {
			alert('尚未选择推广样式');
			return;
		}
		switch (checked.val()) {
			case 'url' :
				$('#txt_htmlcode').val(checked.attr('title'));
				break;
			case 'txtlink' :
				$('#txt_htmlcode')
						.val('<a href="' + checked.attr('url')
								+ '" target="_blank">' + checked.attr('title')
								+ '</a>');
				break;
			case 'customelink' :
				var title = $('#txtlinkInput').val();
				if (!title || title == '') {
					alert('自定义时必须指定文字链的标题');
					return;
				}
				$('#txt_htmlcode').val('<a href="' + checked.attr('url')
						+ '" target="_blank">' + title + '</a>');
				break;
		}
		api.next();
	});
}
function initAddShopLink() {
	initAddItemLink();
}
function initAddKeyWordLink() {
	var api = $("#addLinkWizard").scrollable();
	$('#addLinkWizard input[type="radio"][name="txtlinkRadio"]').change(
			function() {
				if ($(this).val() == 'customelink') {
					if ($(this).is(':checked')) {
						$('#txtlinkInput').attr('disabled', false);
					} else {
						$('#txtlinkInput').attr('disabled', true);
					}
				} else {
					$('#txtlinkInput').attr('disabled', true);
				}
			});
	$('#thirdPrev').click(function() {
				api.prev();
			});
	$('#thirdNext').click(function() {
		var checked = $('input[type="radio"][name="txtlinkRadio"]:checked');
		if (checked.length == 0) {
			alert('尚未选择推广样式');
			return;
		}
		var params = '?words='
				+ encodeURIComponent($('#txtlinkRadio2').attr('title'));
		switch (checked.val()) {
			case 'url' :
				$('#txt_htmlcode').val(checked.attr('title') + params);
				break;
			case 'txtlink' :
				$('#txt_htmlcode').val('<a href="' + checked.attr('url')
						+ params + '" target="_blank">' + checked.attr('title')
						+ '</a>');
				break;
			case 'customelink' :
				var title = $('#txtlinkInput').val();
				if (!title || title == '') {
					alert('自定义时必须指定文字链的标题');
					return;
				}
				$('#txt_htmlcode').val('<a href="' + checked.attr('url')
						+ params + '" target="_blank">' + title + '</a>');
				break;
		}
		api.next();
	});
}
function initAddFavShopLink() {
	initAddGroupLink();
}
function initAddGroupLink() {
	var api = $("#addLinkWizard").scrollable();
	$('#addLinkWizard input[type="radio"][name="txtlinkRadio"]').change(
			function() {
				if ($(this).val() == 'customelink') {
					if ($(this).is(':checked')) {
						$('#txtlinkInput').attr('disabled', false);
					} else {
						$('#txtlinkInput').attr('disabled', true);
					}
				} else {
					$('#txtlinkInput').attr('disabled', true);
				}
			});
	$('#group_type li').click(function() {
		$(this).toggleClass("selected");
		$('#group_type li').not($(this)).removeClass("selected");
		if ($(this).hasClass('selected')) {
			$(this)
					.prepend('<img id="checkedImg" src="/assets/images/link/checked.gif" style="position:absolute;"/>');
		} else {
			$('#checkedImg').remove();
		}
	});
	$('#thirdPrev').click(function() {
				api.prev();
			});
	$('#thirdNext').click(function() {
		var tc = $('#group_type li.selected');
		if (tc.length == 0) {
			alert('未选择版式');
			return;
		}
		var sc = $('#group_skin input[type="radio"][name="group_skin"]:checked');
		if (sc.length == 0) {
			alert('未选择皮肤');
			return;
		}
		var oc = $('#group_order input[type="radio"][name="group_order"]:checked');
		if (oc.length == 0) {
			alert('未选择排序规则');
			return;
		}
		var checked = $('input[type="radio"][name="txtlinkRadio"]:checked');
		if (checked.length == 0) {
			alert('尚未选择推广样式');
			return;
		}
		var params = '?t=' + tc.attr('t') + '&s=' + sc.val() + '&o=' + oc.val();
		switch (checked.val()) {
			case 'url' :
				$('#txt_htmlcode').val(checked.attr('title') + params);
				break;
			case 'txtlink' :
				$('#txt_htmlcode').val('<a href="' + checked.attr('url')
						+ params + '" target="_blank">' + checked.attr('title')
						+ '</a>');
				break;
			case 'customelink' :
				var title = $('#txtlinkInput').val();
				if (!title || title == '') {
					alert('自定义时必须指定文字链的标题');
					return;
				}
				$('#txt_htmlcode').val('<a href="' + checked.attr('url')
						+ params + '" target="_blank">' + title + '</a>');
				break;
		}
		api.next();
	});
	$('#thirdPreview').click(function() {
		var tc = $('#group_type li.selected');
		if (tc.length == 0) {
			alert('未选择版式');
			return;
		}
		var sc = $('#group_skin input[type="radio"][name="group_skin"]:checked');
		if (sc.length == 0) {
			alert('未选择皮肤');
			return;
		}
		var oc = $('#group_order input[type="radio"][name="group_order"]:checked');
		if (oc.length == 0) {
			alert('未选择排序规则');
			return;
		}
		var checked = $('input[type="radio"][name="txtlinkRadio"]:checked');
		if (checked.length == 0) {
			alert('尚未选择推广样式');
			return;
		}
		$('#tc').val(tc.attr('t'));
		$('#sc').val(sc.val());
		$('#oc').val(oc.val());
		$('#thirdPreviewForm')
				.attr('action', $('#txtlinkRadio1').attr('title'));
		$('#thirdPreviewForm')[0].submit();
	});
}
function initAddLink() {
	loadAllItemGroups();// 加载所有推广组及商品
	var root = $("#addLinkWizard").scrollable();
	var api = root.scrollable();
	api.onBeforeSeek(function(event, i) {
				$("#status li").removeClass("active").eq(i).addClass("active");
			});
	$('#firstNext').click(function(event) {
				var checked = $('input[type="radio"][name="linkType"]:checked',
						root);
				if (checked.length > 0) {
					$('table.linkTable', root).hide();
					var linkType = checked.val();
					$('.secondStep input[type="radio"]', root).attr('checked',
							false);// 清空已选radio
					$('.secondStep select', root).val('0');// 清空已选select
					$('table.linkTable[lt="' + checked.val() + '"]').show();
					api.next();
					event.preventDefault();
				} else {
					alert('您尚未选择推广链接类型');
					return;
				}
			});
	$('#secondNext').click(function(event) {
				var checked = $('input[type="radio"][name="linkType"]:checked',
						root);
				if (checked.length > 0) {
					var linkType = checked.val();
					if (linkType == "1") {// 商品推广
						var itemChecked = $('#itemTd input[type="radio"]:checked');
						if (itemChecked.length == 0) {
							alert('您尚未选择要推广的商品');
							return;
						} else {
							getHtmlXintaoLink(1, itemChecked.attr('nid'));// 推广商品
						}
					} else if (linkType == "2") {
						var shopChecked = $('#shopTd input[type="radio"]:checked');
						if (shopChecked.length == 0) {
							alert('您尚未选择要推广的店铺');
							return;
						} else {
							getHtmlXintaoLink(2, shopChecked.attr('sid'));// 推广店铺
						}
					} else if (linkType == "3") {
						var groupSelect = $('#groupSelect option:selected');
						if (groupSelect.length == 0) {
							alert('您尚未选择要推广的推广组');
							return;
						} else {
							if (groupSelect.val() == "0") {
								alert('您尚未选择要推广的推广组');
								return;
							}
							if ("0" == groupSelect.attr('num')) {
								alert('您选择的推广组中尚未添加推广商品，请进入该推广组，为它添加推广商品.');
								return;
							}
							getHtmlXintaoLink(3, groupSelect.val());// 推广店铺
						}
					} else if (linkType == "4") {
						getHtmlXintaoLink(4, '');// 推广店铺收藏
					} else if (linkType == "5") {
						var keyword = $('#keyword').val();
						if (!keyword || keyword == '') {
							alert('未填写关键词');
							return;
						}
						getHtmlXintaoLink(5, keyword);// 推广店铺收藏
					}
					api.next();
					event.preventDefault();
				} else {
					alert('您尚未选择推广链接类型');
					return;
				}
			});
	$('#copyCode').click(function() {
				copyToClipBoard($('#txt_htmlcode'));
			});
	$('#fourIndex').click(function() {
				api.seekTo(0);
			});
	$('.linkTable').pager('ul', {
				navId : 'activity_nav',
				navClass : 'nav_pager',
				height : 270
			});
	$('#shopTd li').hover(function() {
				$(this).toggleClass("ui-selecting");
				$('#shopTd li').not($(this)).removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			}).click(function() {
				$('input[type="radio"]', $(this)).attr('checked', true);
				$(this).toggleClass("ui-selected");
				$('#shopTd li').not($(this)).removeClass("ui-selected");
			});
	$('#shopTd li input[type="radio"]').click(function(event) {
				var li = $(this).parents('li');
				li.toggleClass("ui-selected");
				$('#shopTd li').not(li).removeClass("ui-selected");
				event.stopPropagation();
			});
	// 推广组推广切换
	$('#groupSelect').unbind('change').change(function() {
				if ($(this).val() && $(this).val() != "0") {
					$('#groupTd').empty();
					var items = $('body').data('g_' + $(this).val());
					if (items != null && items.length > 0) {
						var ul;
						for (var i = 0; i < items.length; i++) {
							if (i % 15 == 0) {
								ul = $('<ul></ul>');
								$('#groupTd').append(ul);
							}
							ul.append(addLinkAddGroupItem(items[i]));
						}
						$('#groupTd').pager('ul', {
									navId : 'groups_group_nav',
									navClass : 'nav_pager',
									height : 300
								});

					}
				}
			});
	// 推广组切换
	$('#itemGroupsSelect').unbind('change').change(function() {
		if ($(this).val() && $(this).val() != "0") {
			$('#itemTd').empty();
			var items = $('body').data('g_' + $(this).val());
			if (items != null && items.length > 0) {
				var ul;
				for (var i = 0; i < items.length; i++) {
					if (i % 15 == 0) {
						ul = $('<ul></ul>');
						$('#itemTd').append(ul);
					}
					ul.append(addLinkAddItem(items[i]));
				}
				$('#itemTd').pager('ul', {
							navId : 'groups_items_nav',
							navClass : 'nav_pager',
							height : 300
						});
				// 单个商品事件
				$('#itemTd li').hover(function() {
							$(this).toggleClass("ui-selecting");
							$('#itemTd li').not($(this))
									.removeClass("ui-selecting");
						}, function() {
							$(this).removeClass("ui-selecting");
						}).click(function() {
							$('input[type="radio"]', $(this)).attr('checked',
									true);
							$(this).toggleClass("ui-selected");
							$('#itemTd li').not($(this))
									.removeClass("ui-selected");
						});
				$('#itemTd input[type="radio"]').click(function(event) {
							var li = $(this).parents('li');
							li.toggleClass("ui-selected");
							$('#itemTd li').not(li).removeClass("ui-selected");
							event.stopPropagation();
						});

			}
		}
	});
	$('.top_box li.key').hover(function() {
				$('.top_box li.key').not($(this)).removeClass("active");
				$(this).removeClass('active').addClass('active');
			}, function() {
				$(this).removeClass('active');
			}).click(function() {
		$(this).toggleClass("selected");
		$('#checkedImg').remove();
		$('.top_box li.key').not($(this)).removeClass("selected");
		if ($(this).hasClass('selected')) {
			$('#keyword').val($(this).attr('title'));
			$(this)
					.prepend('<img id="checkedImg" src="/assets/images/link/checked.gif" style="position:absolute;top:-5px;left:-15px;"/>');
		} else {
			$('#keyword').val('');
			$('#checkedImg').remove();
		}
	});
	var type = $.url.param("type");
	var value = $.url.param("value");
	if (type && type.length > 0 && value && value.length > 0) {
		api.seekTo(2);
		getHtmlXintaoLink(type, value);
	}
}
function addLinkAddItem(item) {
	var li = "";
	if (item) {
		li += '<li title="30天推广量:'
				+ item.commission_num
				+ '件"><div class="pic" align="center"><img src="'
				+ item.pic_url.replace('bao/uploaded', 'imgextra')
				+ '_60x60.jpg"/></div><div class="item"><div class="title"><a href="'
				+ item.click_url
				+ '" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'xt-'
				+ PID
				+ '\', \'item-d-'
				+ item.nick
				+ '-'
				+ item.num_iid
				+ '\', \''
				+ item.title
				+ '\']);">'
				+ item.title
				+ '</a></div><div><span class="k">价格:</span><span class="v">'
				+ item.price
				+ '</span>元</div><div><span class="k">佣金:</span><span class="v">'
				+ item.commission
				+ '</span>元</div><input class="customechecked" type="radio" name="checkedgroupitem" title="'
				+ item.title + '" nid="' + item.num_iid + '"/></div></li>';
	}
	return li;
}
function addLinkAddGroupItem(item) {
	var li = "";
	if (item) {
		li += '<li title="30天推广量:'
				+ item.commission_num
				+ '件"><div class="pic" align="center"><img src="'
				+ item.pic_url.replace('bao/uploaded', 'imgextra')
				+ '_60x60.jpg"/></div><div class="item"><div class="title"><a href="'
				+ item.click_url
				+ '" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'xt-'
				+ PID
				+ '\', \'item-d-'
				+ item.nick
				+ '-'
				+ item.num_iid
				+ '\', \''
				+ item.title
				+ '\']);">'
				+ item.title
				+ '</a></div><div><span class="k">价格:</span><span class="v">'
				+ item.price
				+ '</span>元</div><div><span class="k">佣金:</span><span class="v">'
				+ item.commission + '</span>元</div></div></li>';
	}
	return li;
}
function loadAllItemGroups(callback) {
	var sender = new WindSender("/router/member/designer/itemgroups?version="
			+ Math.random());
	sender.load('GET', {}, function(response) {
				if (response.isSuccess()) {
					if (response.body.length > 0) {
						for (var i = 0; i < response.body.length > 0; i++) {
							var group = response.body[i];
							if (group.items && group.items != null) {
								$('body').data('g_' + group.id, group.items);
							}
						}
					}
				} else {
					alert(response.msg);
				}
				if (callback && typeof callback == "function") {
					callback();
				}
			});
}