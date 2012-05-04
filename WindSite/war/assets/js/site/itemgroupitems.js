var page = null;
var items_sort = "delistTime_desc";
$(function() {
	//defaultItemsSeach();
	$('#check-selected-items').click(function() {
				// $(this).parent().css('left', -150).css('top', 50);
				$('#items-group-items').tabs({
							selected : 1
						})
			}).scrollFollow({
				speed : 200,
				offset : 200
			});
	// 搜索按钮
	$('#search').click(function() {
				$("#searchDesc").hide();
				$("#categorySpan")
						.text($("#selectType option:selected").text());
				$("#resultSpan").text("0");
				itemsSearch(true);
				return;
			});
	$("#confirmDeleteButton").click(function() {
				if ($("#selected-items-table").children().size() == 0) {
					alert('您尚未添加任何商品，请添加商品');
					return;
				}
				window.confirm("确认删除所有被选中的商品？", function(r) {
							if (r) {
								$('body').data('items', {});
								$("#selected-items-table").empty();// 清除所有
								$("#selectCount").text("0");// 选中数量为0
								$('#add-validCount').text($('#validCount')
										.text());// 设置可增加数量
								$('input[name="items"]').attr('checked', false);// 反选所有
								$('#checkAllItems').attr('checked', false);// 反选
							}
							return;
						});
				return;
			});
	$("#confirmAddButton").click(function() {
		var items = $('body').data('items');
		if (items == null) {
			alert('您尚未添加任何商品，请添加商品后，再确认加入推广组！');
			return;
		}
		var addItems = [];
		for (var num_iid in items) {
			addItems.push(items[num_iid]);
		}
		if (addItems.length == 0) {
			alert("您尚未添加任何商品，请添加商品后，再确认加入推广组！");
			return;
		}
		addItems2ItemGroup($('#_group_id').val(), TaobaoUtils
						.json2str(addItems));
	});
		// $("img").lazyload({
		// placeholder : "/assets/images/loadingImg.gif",
		// effect : "fadeIn"
		// });
});
/**
 * 添加商品至暂存架
 */
function addSelectedItem(checkedItem) {
	if ($('#add-validCount').text() == "0") {
		alert('推广组商品数量已满');
		$('#single-info').hide();
		checkedItem.attr('checked', false);
		return false;
	}
	var items = $('body').data('items');
	if (items == null) {
		items = {};
	}
	var item = {};
	item.num_iid = checkedItem.val();
	var oldItem = items[item.num_iid];
	if (oldItem != null) {// 如果已存在
		alert('【' + oldItem.title + '】已存在!');
		return false;
	}
	item.title = checkedItem.attr("title");
	item.nick = checkedItem.attr("nick");
	item.pic_url = checkedItem.attr("pic_url");
	item.price = checkedItem.attr("price");
	item.click_url = checkedItem.attr("click_url");
	item.commission = checkedItem.attr("commission");
	item.commission_rate = checkedItem.attr("commission_rate");
	item.commission_num = checkedItem.attr("commission_num");
	item.commission_volume = checkedItem.attr("commission_volume");
	// 2010-5-22新增字段
	item.num_iid = checkedItem.attr("num_iid");
	item.item_location = checkedItem.attr("item_location");
	item.seller_credit_score = checkedItem.attr("seller_credit_score");
	item.shop_click_url = checkedItem.attr("shop_click_url");
	item.volume = checkedItem.attr("volume");
	items[item.num_iid] = item;// 存储当前
	$('body').data('items', items);
	var tr = checkedItem.parents('tr').clone().attr('id', item.num_iid);
	tr
			.find('.bb-selectbox')
			.empty()
			.append('<img src="/assets/images/delete.gif" style="cursor:pointer;" class="deleteImg"/>');
	$('#selected-items-table').prepend(tr);
	$('.deleteImg', tr).click(function() {
				$('#selected-item-warn').empty().append(item.title);
				$('#selected-item-desc').text('已从暂存架移除');
				removeSelectedItem(item.num_iid);
			});
	var selectedItemCount = parseInt($("#selectCount").text()) + 1;
	var validCount = parseInt($("#validCount").text());
	$("#selectCount").text(selectedItemCount);// 选中数量加1
	$('#add-validCount').text(validCount - selectedItemCount);
	$('#selected-item-warn').empty().append(item.title);
	$('#selected-item-desc').text('已加入暂存架');
	$('#single-info').show();
	if (validCount - selectedItemCount == 0) {
		alert('推广组商品数量已满');
		$('#selected-items-warn').css('left', -150).css('top', 50);
		$('#single-info').hide();
		$('#items-group-items').tabs({
					selected : 1
				});
		return false;
	}
	return true;
};
/**
 * 删除指定已选商品
 * 
 * @param {}
 *            num_iid
 */
function removeSelectedItem(num_iid) {
	$('#checkAllItems').attr('checked', false);// 反选
	var items = $('body').data('items');
	if (items[num_iid]) {// 如果存在
		$('#selected-item-warn').empty().append(items[num_iid]["title"]);
		$('#selected-item-desc').text('已从暂存架移除');
		$('#single-info').show();
		delete items[num_iid];
	} else {
		return;
	}
	$('#' + num_iid).remove();
	$("#selectCount").text(parseInt($("#selectCount").text()) - 1);// 选中数量减1
	$('#add-validCount').text(parseInt($('#add-validCount').text()) + 1);// 可增加数量加1
	$('input[name="items"][value="' + num_iid + '"]').attr('checked', false);// 反选checkbox

};
function defaultItemsSeach() {
	var request = {};
	request.cid = '';// 类目
	request.nick = $('#_user_nick').val();// 昵称
	request.sort = "commissionNum_desc";
	getHtmlitemsSearch(request);
}
function itemsSearch(isNew) {
	var request = {};
	var ps = $("#ps").val();
	var pe = $("#pe").val();
	var crs = $("#crs").val();
	var cre = $("#cre").val();
	var hs = $("#hs").val();
	var he = $("#he").val();
	var rs = $("#rs").val();
	var re = $("#re").val();
	if ($("#keyword").val())
		request.keyword = $("#keyword").val();// 关键字
	request.cid = $("#selectType").val();// 类目
	request.nick = $('#_user_nick').val();// 昵称
	var sort = $('#items-sort');
	if (sort.length > 0) {
		request.sort = sort.val();
	} else {
		request.sort = "delistTime_desc";
	}
	items_sort = request.sort;
	if (ps.length > 0) {// 开始价格
		if (pe.length == 0) {
			alert("尚未设置最大价格");
			return;
		}
		ps = parseFloat(ps);
		if (isNaN(ps)) {
			alert("最小价格不合法");
			return;
		}
		if (ps < 0) {
			alert("最小价格不能小于零");
			return;
		}
		request.start_price = ps;
		pe = parseFloat(pe);// 结束价格
		if (isNaN(pe)) {
			alert("最大价格不合法");
			return;
		}
		if (pe < ps) {
			alert("最大价格不能低于最小价格");
			return;
		}
		request.end_price = pe;
	} else {
		if (pe.length > 0) {
			alert("尚未设置最小价格");
			return;
		}
	}
	if (crs.length > 0) {// 最小佣金比率
		if (cre.length == 0) {
			alert("尚未设置最大佣金比率");
			return;
		}
		crs = parseFloat(crs);
		if (isNaN(crs)) {
			alert("最小佣金比率不合法");
			return;
		}
		if (crs < 0) {
			alert("最小佣金比率不能小于零");
			return;
		}
		request.start_commissionRate = crs * 100;
		cre = parseFloat(cre);// 最大佣金比率
		if (isNaN(cre)) {
			alert("最大佣金比率不合法");
			return;
		}
		if (cre < crs) {
			alert("最大佣金比率不能小于最小佣金比率");
			return;
		}
		request.end_commissionRate = cre * 100;
	} else {
		if (cre.length > 0) {
			alert("尚未设置最小佣金比率");
			return;
		}
	}

	if (hs.length > 0) {// 30天最小佣金
		if (he.length == 0) {
			alert("尚未设置30天最大推广量");
			return;
		}
		hs = parseFloat(hs);
		if (isNaN(hs)) {
			alert("30天最小推广量不合法");
			return;
		}
		if (hs < 0) {
			alert("30天最小推广量不能小于零");
			return;
		}
		request.start_commissionNum = hs;
		he = parseFloat(he);// 30天最大佣金
		if (isNaN(he)) {
			alert("30天最大推广量不合法");
			return;
		}
		if (he < hs) {
			alert("30天最大推广量不能小于30天最小推广量");
			return;
		}
		request.end_commissionNum = he;
	} else {
		if (he.length > 0) {
			alert("尚未设置30天最小推广量");
			return;
		}
	}
	if (rs.length > 0) {// 卖家最小信用
		request.start_credit = rs;
		rs = parseInt($("#rs option:selected").attr("v"));
	}
	if (re.length > 0) {// 卖家最大信用
		if (!rs) {
			request.start_credit = '1heart';// 最小信用设置为1心
		}
		request.end_credit = re;
		re = parseInt($("#re option:selected").attr("v"));
		if (rs && re < rs) {
			alert("卖家最大信用不能小于最小信用");
			return;
		}

	}
	request.area = $("#loc").val();// 地区
	if (page != null) {
		if (true == isNew) {
			page.setPageNo(1);
			request.page_no = 1;
		} else {
			request.page_no = page.getPageNo();
		}
	}
	getHtmlitemsSearch(request);
}