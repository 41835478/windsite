$(function() {
			$('#search').click(function() {
						advanceShopsSearch_();

					});
		});
function advanceShopsSearch_() {
	if (!$('#q').val() && !$('#cat').val()) {
		alert('请填写搜索关键词或者选择店铺分类');
		return;
	}
	advanceShopsSearch($('#q').val(), $('#cat').val());
}
function advanceShopsSearch(q, cid, only_mall, start_credit, end_credit,
		start_commissionrate, end_commissionrate, start_totalaction,
		end_totalaction, page_no) {
	if (!q) {
		q = '';
	}
	if (!cid) {
		cid = '';
	}
	if (!only_mall) {
		only_mall = '';
	}

	if (!start_credit) {
		start_credit = '';
	}
	if (!end_credit) {
		end_credit = '';
	}
	if (!start_commissionrate) {
		start_commissionrate = '';
	}
	if (!end_commissionrate) {
		end_commissionrate = '';
	}
	if (!start_totalaction) {
		start_totalaction = '';
	}
	if (!end_totalaction) {
		end_totalaction = '';
	}
	if (!page_no) {
		page_no = 1;
	}
	getHtmlContent('items-result', '/router/member/links/shops/search', 'POST',
			{
				q : q,
				cid : cid,
				only_mall : only_mall,
				start_credit : start_credit,
				end_credit : end_credit,
				start_commissionrate : start_commissionrate,
				end_commissionrate : end_commissionrate,
				start_totalaction : start_totalaction,
				end_totalaction : end_totalaction,
				pageNo : page_no
			}, function(data) {
				$('#items-result').empty().append(data);
			}, function() {
			});
}
function openMyShopGroupByShop(uids) {
	$('#openMyShopGroupByShop').remove();
	$('body')
			.append('<div id="openMyShopGroupByShop" title="选择一个您的店铺分组加入所选店铺"></div>');
	getHtmlContent('openMyShopGroupByShop',
			'/router/member/links/shopgroupsdialog', 'GET', {
				length : uids.length
			}, function(data) {
				$("#openMyShopGroupByShop").empty();
				$("#openMyShopGroupByShop").append(data);
				$('#openMyShopGroupByShop').dialog({
					bgiframe : true,
					autoOpen : false,
					width : 600,
					zIndex : 1000,
					modal : true,
					buttons : {
						'取消' : function() {
							$(this).dialog('close');
						},
						'确认' : function() {
							var checked = $('#openMyShopGroupByShop input[type="radio"][name="shopgroup"]:checked');
							if (checked.length == 1) {
								addMyShopGroupByShop(uids.join(','), checked
												.val());
							} else {
								alert('未选择要加入的店铺分组');
								return;
							}
						}
					}
				});
				$('#openMyShopGroupByShop').dialog('open');
			});
}
function addMyShopGroupByShop(uids, gid) {
	var sender = new WindSender("/router/member/shops/favorite/add/" + gid);
	sender.load("POST", {
				"ids" : uids
			}, function(response) {
				if (response.isSuccess()) {
					try {
						$('#openMyShopGroupByShop').dialog('close');
						confirm("增加商品至推广组成功", function(r) {
							if (r) {
								document.location.href = "/router/member/sitemanager/shops";
							} else {
								$('#shopsTable input[type="checkbox"][name="items"]:checked')
										.attr('checked', false);
								$('#openMyShopGroupByShop').dialog('close');
							}
						}, "查看店铺收藏", "继续添加");
					} catch (e) {
					}
				} else {
					alert(response.msg);
				}
			});
}