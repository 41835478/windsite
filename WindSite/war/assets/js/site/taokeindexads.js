function openTaokeAdPlansDialog(pType) {
	$('#taokeAdPlansDialog').dialog('open');
}

/**
 * 初始化已有广告列表页面
 */
function initTaokeAdsPlan(pType, id) {
	$('#taokeAdPlansDialog').adPlansEditor({
				validNums : $('#validNums').text(),
				pType : pType,
				id : id
			});// 初始化广告计划编辑器
	$('a.plan-delete').click(function() {
				deleteTaokeAdPlan(pType, $(this).attr('tid'), $(this)
								.attr('pid'))
			});
	$('#plan-wTable .plan .plan-view').click(function() {
		$('#taokeAdPlansDialog').adPlansEditor('showAdPlanItems',
				$(this).parents('tr.plan'), 'plan-', 6);
	});
}
function addTaokeAdPlan(type, id, plans) {
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
	var sender = new WindSender("/router/member/ads/" + type + "/add/" + id);
	sender.load("POST", {
				'plans' : plans
			}, function(response) {
				if (response.isSuccess()) {
					alert("添加广告计划成功");
					if ('index' == type)
						getHtmlTaokeIndexPlan(id);
					else
						document.location.href = "/router/member/sitemanager/blogAds"
				} else {
					alert(response.msg);
				}
				overlay.close();
			});
}
function deleteTaokeAdPlan(type, id, plan) {
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
	var sender = new WindSender("/router/member/ads/" + type + "/delete/" + id);
	sender.load("POST", {
				'plan' : plan
			}, function(response) {
				if (response.isSuccess()) {
					alert("移除广告计划成功");
					if ('index' == type)
						getHtmlTaokeIndexPlan(id);
					else
						document.location.href = "/router/member/sitemanager/blogAds"
				} else {
					alert(response.msg);
				}
				overlay.close();
			});
}

/**
 * 淘客首页广告计划列表
 * 
 * @param {}
 *            type
 */
function getHtmlTaokeIndexPlan(id) {
	var dialog = $('#taokeAdPlansDialog');
	if (dialog.length > 0) {
		try {
			dialog.dialog('destroy').remove();
		} catch (e) {

		}
	}
	getRightContentHtmlContent('/router/member/sitemanager/indexAds/' + id,
			"GET", {}, rightContentAppend);
}
/**
 * 淘客文章广告计划列表
 * 
 * @param {}
 *            type
 */
function getHtmlTaokeBlogPlan(id) {
	getRightContentHtmlContent('/router/member/sitemanager/blogAds/' + id,
			"GET", {}, rightContentAppend);
}