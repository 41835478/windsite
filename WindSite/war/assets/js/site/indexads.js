function initPlanManager(type) {
	$('#createPlan').click(function() {
				getHtmlCreatePlan(type);
				return false;
			});
	$('.updatePlan').click(function() {
				getHtmlUpdatePlan(type, $(this).attr('pid'));
				return false;
			});
	$('.wTable .plan .plan-ads').click(function() {
				getHtmlPlanAds($(this).attr('pid'));
				return false;
			});
	$('.wTable .plan .plan-view').click(function() {
		var parent = $(this).parents('.plan:first');
		var next = parent.next();
		if (next.length == 0 || next.hasClass('plan')) {
			$('.wTable tr.plan-items').hide();
			var id = 'plan_' + parent.attr('pid');
			var tr = $('<tr class="plan-items"><td colspan=6 id="' + id
					+ '"></td></tr>');
			parent.after(tr);
			getHtmlContent(id, '/router/member/selleradsmanager/plan/items/'
							+ parent.attr('pid'), 'GET', {}, function(data) {
						$('#' + id).empty().append(data);
					});
		} else {
			if (next.is(':hidden')) {
				$('.wTable tr.plan-items').hide();
				next.fadeIn();
			} else {
				next.fadeOut();
			}
		}
		return false;
	});
}
function initPlanWizard() {
	var api = $("#planWizard").scrollable({
				api : true
			});
	api.onBeforeSeek(function(event, i) {
				$("#status li").removeClass("active").eq(i + 1)
						.addClass("active");
			});
	$('ul.planTags li').click(function() {
		var tags = $('#planTags').val();
		if (tags == "例：减肥 数码 衬衫") {
			tags = "";
		}
		if (tags && tags != "") {
			var tag = $(this).text();
			tags = $.trim(tags.replace(/，/g, " "));
			var array = tags.split(' ');
			if ($.inArray(tag, array) != -1) {
				array = $.grep(array, function(value) {
							return value != tag;
						});
			} else {
				array.push(tag);
			}
			$('#planTags')
					.val((array.length > 0 ? (array.join(' ') + ' ') : ''));
		} else {
			$('#planTags').val($(this).text());
		}
	});
	$('#firstNext').click(function() {
				var name = $('#planName').val();
				if (!name || name == "") {
					alert('请填写广告计划名称');
					$('#planName').focus();
					return;
				}
				if (name.length > 30) {
					alert('广告计划名称长度不能超过30');
					$('#planName').focus();
					return;
				}
				var tags = $('#planTags').val();
				if (!tags || tags == "" || tags == "例：减肥 数码 衬衫") {
					alert('请填写标签');
					$('#planTags').focus();
					return;
				}
				tags = tags.replace(/，/g, " ");
				$('#planTags').val(tags);
				if (!validKeyWord(tags, 8, 16)) {
					$('#planTags').focus();
					return;
				}
				var desc = $('#planDesc').val();
				if (desc && desc != "") {
					if (desc.length > 80) {
						alert('广告描述长度不能超过80');
						$('#planDesc').focus();
						return;
					}
				}
				api.next();
				planItemSearch();
			});
	$('#planTags').blur(function() {
				if ('' == $(this).val()) {
					$(this).val('例：减肥 数码 衬衫');
				}
			}).focus(function() {
				if ('例：减肥 数码 衬衫' == $(this).val()) {
					$(this).val('');
				}
			});
	$('#finish').click(function() {
				var nids = "";
				var checkeds = $('#checkedItems li');
				if (checkeds.length == 0) {
					alert('您尚未选择要添加的推广商品');
					return;
				}
				if (checkeds.length != 5) {
					alert('当前推广计划必须添加5个推广商品');
					return;
				}
				var isFirst = true;
				checkeds.each(function() {
							if (isFirst) {
								isFirst = false;
							} else {
								nids += ",";
							}
							nids += $(this).attr('nid');
						});
				var name = $('#planName').val();
				var type = $(this).attr('ptype');
				var isDefault = $('#planIsDefault').is(':checked');
				var cid = $('#planCid').val();
				var desc = $('#planDesc').val();
				var tags = $('#planTags').val();
				var id = $('#planId').val();
				if (id && "" != id) {
					updatePlan(id, name, type, isDefault, nids, cid, desc, tags);
				} else {
					createPlan(name, type, isDefault, nids, cid, desc, tags);
				}
			});
	$('#itemSearchButton').click(function() {
				planItemSearch($('#q').val());
			});
	$('#checkedItems li .customechecked').click(function() {
		var parent = $(this).parents('li:first');
		$('#itemSearchResult .itemSearchResult li[nid="' + parent.attr('nid')
				+ '"]').removeClass('ui-selected');
		$('#itemSearchResult .itemSearchResult input[type="checkbox"][nid="'
				+ parent.attr('nid') + '"]').attr('checked', false);
		parent.remove();
	});
}
function validKeyWord(val, allnumber, wordcount) {
	var vals = val.split(" ");
	if (vals.length > allnumber) {
		alert("标签最多只能输入" + allnumber + "个");
		return false;
	}
	for (var i = 0; i < vals.length; i++) {
		if (vals[i].replace(/[^\x00-\xff]/g, "**").length > wordcount) {
			alert("关键字: '" + vals[i] + "' 已超过" + wordcount + "个字符！");
			return false;
		}
	}
	return true;
}
function planItemSearch(q, pageNo) {
	getHtmlContent('itemSearchResult',
			'/router/member/selleradsmanager/plan/items', 'POST', {
				q : q,
				pageNo : pageNo
			}, function(data) {
				$('#itemSearchResult').empty().append(data);
			});
}
function addCheckedPlanItem(li) {
	removeCheckedPlanItem(li);
	li.removeClass('ui-selected').removeClass('ui-selecting');
	$('.customechecked', li).remove();
	$('div.item', li)
			.append('<img class="customechecked" src="/assets/images/delete.gif"/>');
	$('.customechecked', li).click(function() {
		var parent = $(this).parents('li:first');
		$('#itemSearchResult .itemSearchResult li[nid="' + parent.attr('nid')
				+ '"]').removeClass('ui-selected');
		$('#itemSearchResult .itemSearchResult input[type="checkbox"][nid="'
				+ parent.attr('nid') + '"]').attr('checked', false);
		parent.remove();

	});
	$('#checkedItems ul').append(li);
}
function removeCheckedPlanItem(li) {
	$('#checkedItems li[nid="' + li.attr('nid') + '"]').remove();
}
function getHtmlPlanAds(id, isTaoke, pageNo) {
	getRightContentHtmlContent(
			'/router/member/selleradsmanager/plan/ads/' + id, "GET", {
				pageNo : pageNo,
				isTaoke : isTaoke
			}, rightContentAppend);
}
/**
 * 打开新增推广计划页面
 */
function getHtmlCreatePlan(type) {
	getRightContentHtmlContent('/router/member/selleradsmanager/plan/add/'
					+ type, "GET", {}, rightContentAppend);
}
/**
 * 新增推广计划
 */
function createPlan(planName, planType, planIsDefault, planNumIids, planCid,
		planDesc, planTags) {
	var overlay = $('#operate-overlay').overlay({
				api : true,
				mask : {
					color : '#fff',
					loadSpeed : 0,
					opacity : 0.5
				},
				closeOnClick : false,
				load : true
			});
	var sender = new WindSender("/router/member/selleradsmanager/plan/add");
	sender.load("POST", {
				'planName' : planName,
				'planType' : planType,
				'planIsDefault' : planIsDefault,
				'planNumIids' : planNumIids,
				'planCid' : planCid,
				'planDesc' : planDesc,
				'planTags' : planTags
			}, function(response) {
				if (response.isSuccess()) {
					alert("增加广告计划成功");
					document.location.href = "/router/member/selleradsmanager/plan/"
							+ planType;
				} else {
					alert(response.msg);
				}
				overlay.close();
			});
}
/**
 * 打开修改推广计划页面
 */
function getHtmlUpdatePlan(type, id) {
	getRightContentHtmlContent('/router/member/selleradsmanager/plan/update/'
					+ type + '/' + id, "GET", {}, rightContentAppend);
}
/**
 * 修改推广计划
 */
function updatePlan(id, planName, planType, planIsDefault, planNumIids,
		planCid, planDesc, planTags) {
	var overlay = $('#operate-overlay').overlay({
				api : true,
				mask : {
					color : '#fff',
					loadSpeed : 0,
					opacity : 0.5
				},
				closeOnClick : false,
				load : true
			});
	var sender = new WindSender("/router/member/selleradsmanager/plan/update/"
			+ id);
	sender.load("POST", {
				'planName' : planName,
				'planType' : planType,
				'planIsDefault' : planIsDefault,
				'planNumIids' : planNumIids,
				'planCid' : planCid,
				'planDesc' : planDesc,
				'planTags' : planTags
			}, function(response) {
				if (response.isSuccess()) {
					alert("修改广告计划成功");
					document.location.href = "/router/member/selleradsmanager/plan/"
							+ planType;
				} else {
					alert(response.msg);
				}
				overlay.close();
			});
}