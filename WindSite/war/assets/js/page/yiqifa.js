var auditDesc = {
	'needless' : '无需审核',
	'auto' : '自动审核',
	'manual' : '人工审核'
};
function initYiqifaFanliReport(q, rel) {
	getYiqifaFanliReportSearchHtml(q, rel, "-1", "", 1);
	$('#searchReport').click(function() {
				searchYiqifaFanliReport();
				return false;
			});
	$('#J_SearchTab li.rel').click(function() {
				if (!$(this).hasClass('selected')) {
					$(this).addClass('selected').siblings()
							.removeClass('selected');
				}
			});
	$('#fanli-follow-a a').click(function() {
				$('#fanli-follow-a a').removeClass('selected');
				$(this).addClass('selected');
				if ('false' == $(this).attr('t')) {
					$('#q').val('');
				}
				searchYiqifaFanliReport();
			});
	$('#fanli-status-a a').click(function() {
				$('#fanli-status-a a').removeClass('selected');
				$(this).addClass('selected');
				searchYiqifaFanliReport();
			});
	$('#getReport-dialog').dialog({
				autoOpen : false,
				width : 620,
				height : 250,
				zIndex : 100000,
				modal : true
			});
	$.tools.dateinput.localize("en", {
				months : '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月',
				shortMonths : '1,2,3,4,5,6,7,8,9,10,11,12',
				days : '星期日,星期一,星期二,星期三,星期四,星期五,星期六',
				shortDays : '日,一,二,三,四,五,六'
			});
	var sDate = new Date();
	$("#endDate").dateinput({
				format : 'yyyy-mm-dd',
				speed : 'fast',
				firstDay : 1,
				max : 1
			}).val(sDate.format("yyyy-mm-dd"));
	sDate.addDays(-7);
	$("#startDate").dateinput({
				format : 'yyyy-mm-dd',
				speed : 'fast',
				firstDay : 1
			}).val(sDate.format("yyyy-mm-dd"));
	$('.btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			});
	$('#getReportButton').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
		if ($(this).hasClass('btn-ok-disabled')) {
			return;
		}
		var startDate = $("#startDate").data('dateinput').getValue();
		var endDate = $("#endDate").data('dateinput').getValue();
		if (!startDate || !endDate) {
			alert('请选择时间段');
			return;
		}
		if (endDate < startDate) {
			alert('结束时间不能小于开始时间');
			return;
		}
		if ((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000) > 7) {
			alert('时间段间隔不能超过7天');
			return;
		}
		$(this).addClass('btn-ok-disabled');
		$('#getReport-result').empty();
		$(this).parent().find('.loading-text').removeClass('fn-hide');
		getYiqifaFanliReport($('#startDate').val(), $('#endDate').val());

	});
	$('#getReport').click(function() {
				$('#getReport-dialog').dialog('open');
			});
}
function getYiqifaFanliReport(start, end) {
	var sender = new WindSender("/router/member/fl/mall/report/get");
	sender.load("POST", {
				startDate : start,
				endDate : end
			}, function(response) {
				if (response.isSuccess()) {
					var body = response.body;
					$('#getReport-result').empty().text('成功获取【' + body.all
							+ '】条记录，其中新增【' + body.success + '】条');
				} else {
					alert(response.msg);
				}
				$('.loading-text').addClass('fn-hide');
				$('#getReportButton').removeClass('btn-ok-disabled');
			});
}
function searchYiqifaFanliReport() {
	var rel = $('#J_SearchTab li.selected').attr('rel');
	var q = $('#q').val();
	var isFollow = $('#fanli-follow-a a.selected').attr('t');
	var status = $('#fanli-status-a a.selected').attr('t');
	getYiqifaFanliReportSearchHtml(q, rel, isFollow, status, 1);
}
function getYiqifaFanliReportSearchHtml(q, rel, isFollow, status, pageNo) {
	$("#reportSearchResult").empty();
	$("#reportSearchResult")
			.append("<tr><td colspan=8>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/member/fl/mall/report/search?v=' + Math.random(),
				type : 'POST',
				data : {
					q : q,
					rel : rel,
					isFollow : isFollow,
					status : status,
					pageNo : pageNo
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#reportSearchResult').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#reportSearchResult').empty().append(data);
					$('.page-number').click(function() {
						getYiqifaFanliReportSearchHtml(q, rel, isFollow,
								status, $('a', $(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getYiqifaFanliReportSearchHtml(q, rel, isFollow,
									status, $(this).attr('page'));
						}
						return false;
					});
					$('a.username-search').click(function() {
								$('#J_SearchTab li[rel="member"]').click();
								$('#q').val($(this).text());
								searchYiqifaFanliReport();
							});
					$('a.action-search').click(function() {
								$('#J_SearchTab li[rel="action"]').click();
								$('#q').val($(this).attr('action'));
								searchYiqifaFanliReport();
							});
					$('#reportSearchResult a.trade-view').click(function() {
						if ($(this).text() == '0') {
							return;
						}
						var parent = $(this).parents('.report-row:first');
						var next = parent.next();
						if (next.length == 0 || next.hasClass('report-row')) {
							$('#reportSearchResult tr.trade-row').hide();
							var id = 'trade_' + parent.attr('tid');
							var tr = $('<tr class="trade-row"><td colspan=8 id="'
									+ id + '"></td></tr>');
							parent.after(tr);
							getHtmlContent(id,
									'/router/member/fl/trade/report/'
											+ parent.attr('tid'), 'GET', {},
									function(data) {
										$('#' + id).empty().append(data);
									});
						} else {
							if (next.is(':hidden')) {
								$('.wTable tr.trade-row').hide();
								next.fadeIn();
							} else {
								next.fadeOut();
							}
						}
						return false;
					});
				}
			});
}
function initYiqifaMall() {
	var reg = /CPS|ROI|CPA|CPC/gi;
	$('#J_YiqifaCats a.J_YiqifaCat').click(function() {
				$('#J_YiqifaCats a.J_YiqifaCat').removeClass('selected');
				$(this).addClass('selected');
				$('#J_YiqifaCatsSelect').val($(this).attr('cat'));
				filterYiqifaMall();
			});
	$('#J_YiqifaAdType,#J_YiqifaAudit').change(function() {
				filterYiqifaMall();
			});
	$('#J_YiqifaCatsSelect').change(function() {
		$('#J_YiqifaCats a.selected').removeClass('selected');
		if ('' != $(this).val())
			$('#J_YiqifaCats a.J_YiqifaCat[cat="' + $(this).val() + '"]')
					.addClass('selected');
		filterYiqifaMall();
	});
	function filterYiqifaMall() {
		// 分类
		var cat = $('#J_YiqifaCatsSelect').val();
		// 计费类型
		var adType = $('#J_YiqifaAdType').val();
		// 审核方式
		var audit = $('#J_YiqifaAudit').val();
		if ('' != cat || '' != adType || '' != audit) {// 过滤
			var htmls = [];
			if (MALLS.length > 0) {
				$('#J_YiqifaMalls')
						.html('<tr id="J_NoResults"><td colspan="9">加载中...</td></tr>');
				var mall;
				for (var i = 0; i < MALLS.length; i++) {
					mall = MALLS[i];
					if (mall && filterCat(mall, cat)) {// 分类
						if (filterAdType(mall, adType)) {// 计费
							if (filterAudit(mall, audit)) {// 审核
								htmls.push(htmlMall(mall));
							}
						}
					}
				}
			}
			if (htmls.length > 0) {
				$('#J_YiqifaMalls').html(htmls.join(''));
			} else {
				$('#J_YiqifaMalls')
						.html('<tr id="J_NoResults"><td colspan="9">未找到符合条件的商城...</td></tr>');
			}
		} else {
			var htmls = [];
			if (MALLS.length > 0) {
				$('#J_YiqifaMalls')
						.html('<tr id="J_NoResults"><td colspan="9">加载中...</td></tr>');
				for (var i = 0; i < MALLS.length; i++) {
					var mall = MALLS[i];
					if (mall)
						htmls.push(htmlMall(mall));
				}
			}
			if (htmls.length > 0) {
				$('#J_YiqifaMalls').html(htmls.join(''));
			} else {
				$('#J_YiqifaMalls')
						.html('<tr id="J_NoResults"><td colspan="9">未找到符合条件的商城...</td></tr>');
			}
		}
		initMallOperate();
	}
	function filterCat(mall, cat) {
		if ('' == cat) {
			return true;
		}
		return (cat == (mall.cid + '')) ? true : false;
	}
	function filterAdType(mall, adType) {
		if ('' == adType) {
			return true;
		}
		return adType == mall.adType ? true : false;
	}
	function filterAudit(mall, audit) {
		if ('' == audit) {
			return true;
		}
		return audit == mall.audit ? true : false;
	}
	function htmlMall(mall) {
		var mallTr = [
				'<tr class="J_YiqifaMallTr"><td><img src="',
				mall.logo,
				'" width=120px height=60px></td><td>',
				mall.b2cId,
				'</td><td>',
				mall.title,
				'</td><td>',
				mall.adType,
				'</td><td>',
				mall.cid,
				'</td><td class="red">',
				mall.commissionRate,
				'</td><td>',
				mall.startDate.replace(' 0:00:00', ''),
				'-',
				mall.endDate.replace(' 0:00:00', ''),
				'</td><td>',
				auditDesc[mall.audit + ''],
				'</td><td><a target="_blank" href="http://www.yiqifa.com/searchCampaignView.do?campaignId=',
				mall.b2cId, '">详情</a>&nbsp;&nbsp;&nbsp;', mallOperate(mall),
				'</td></tr>'];
		var actionTr = [];
		var actions = MYMALLS[mall.b2cId];
		if (actions && actions.length > 0) {
			actionTr
					.push('<tr class="J_YiqifaActionTr"><td colspan="9" align=center style="padding-left:150px;text-align:center;"><table width=100%><thead><tr><th width=80px>操作</th><th width=220px>主营(默认访问第一个)</th><th>推广地址</th></tr></thead><tbody>');
			for (var i = 0; i < actions.length; i++) {
				var clazz = '';
				if (i == (actions.length - 1)) {// 如果最后一个
					clazz = ' class="last"';
				}
				var action = actions[i];
				actionTr.push('<tr><td' + clazz + '>');
				// TODO 暂时屏蔽主营的标题修改以及新增
				// if (action.isChange) {
				// actionTr
				// .push('&nbsp;&nbsp;<a class="J_YiqifaActionAdd">新增</a>');
				// }
				actionTr.push('</td><td' + clazz + ' width=200px>');
				// actionTr
				// .push('<input type="text" class="J_YiqifaActionTitle"
				// value="')
				if (actions.length == 1) {
					actionTr.push(mall.title);
				} else {
					actionTr.push(action.title);
				}
				// actionTr
				// .push('"/>&nbsp;&nbsp;<a
				// class="J_YiqifaActionTitleConfirm">确认修改</a>');
				actionTr
						.push('</td><td' + clazz + ' style="text-align:left;">');
				actionTr.push(action.pk.clickUrl.replace('&e=c', ''));
				actionTr.push('</td><tr>');
			}
			actionTr.push('</tbody></table></td></tr>');
		}
		return mallTr.join('') + actionTr.join('');
	}
	function mallOperate(mall) {
		// if ('needless' != mall.audit) {
		// if (MYMALLS[mall.id + '']) {
		// return '<a class="removeMyMall" mid="' + mall.id + '" b2cId="'
		// + mall.b2cId + '">取消推广</a>';
		// } else {
		// return '<a class="addMyMall" mid="' + mall.id + '" b2cId="'
		// + mall.b2cId + '">推广该商城</a>';
		// }
		// }
		return '';
	}
	function initMallOperate() {
		$('#J_YiqifaMalls a.addMyMall').each(function() {
					initMallOperateAdd($(this));
				});
		$('#J_YiqifaMalls a.removeMyMall').each(function() {
					initMallOperateRemove($(this));
				});
		$('#J_YiqifaMalls .J_YiqifaActionTitleConfirm').click(function() {
					// TODO 暂未实现新增主营
				});
	}
	function initMallOperateAdd(a) {
		a.click(function() {
					$('#J_YiqifaShenQing').attr(
							'href',
							'http://www.yiqifa.com/earner/campaignView.do?campaignId='
									+ $(this).attr('b2cId'));
					$('#J_ConfirmAddYiqifaMall').removeClass('btn-ok-disabled');
					$('#J_YiqifaAddDialog').dialog('option', 'mallid',
							$(this).attr('mid') + '').dialog('open');
				});
	}
	function initMallOperateRemove(a) {
		a.click(function() {
					$('#J_ConfirmRemoveYiqifaMall')
							.removeClass('btn-ok-disabled');
					$('#J_YiqifaRemoveDialog').dialog('option', 'mallid',
							$(this).attr('mid') + '').dialog('open');
				});
	}
	$('#J_YiqifaAddDialog,#J_YiqifaRemoveDialog,#J_YiqifaUploadDialog').dialog(
			{
				bgiframe : true,
				autoOpen : false,
				width : 450,
				height : 250,
				zIndex : 1000,
				modal : true
			});
	$('#J_ConfirmUploadYiqifaMall').click(function() {
				var self = $(this);
				if (self.hasClass('btn-ok-disabled')) {
					return false;
				}
				if (!$('#yiqifa_xls').val()) {
					alert('您尚未选择要上传的文件');
					return false;
				}
				if ($('#yiqifa_xls').val().indexOf('.xls') == -1) {
					alert('要上传的文件格式必须为XLS格式');
					return false;
				}
				self.addClass('btn-ok-disabled');
				$('#J_ConfirmUploadYiqifaMall input:first').val('上传中...稍后');
				$('#yiqifa_form').submit();
			});
	$('#J_OpenUpload').click(function() {
				$('#J_YiqifaUploadDialog').dialog('open');
			});
	$('#J_CloseUpload').click(function() {
				$('#J_YiqifaUploadDialog').dialog('close');
			});
	$('#J_CancelAdd').click(function() {
				$('#J_YiqifaAddDialog').dialog('close');
			});
	$('#J_CancelRemove').click(function() {
				$('#J_YiqifaRemoveDialog').dialog('close');
			});
	$('#J_ConfirmAddYiqifaMall').click(function() {
		var self = $(this);
		if (self.hasClass('btn-ok-disabled')) {
			return false;
		}
		if (confirm('再次确认您已经到亿起发联盟申请通过了该商城推广')) {
			self.addClass('btn-ok-disabled')
			var id = $('#J_YiqifaAddDialog').dialog('option', 'mallid');
			if (typeof(id) == 'string') {
				addMyYiqifaMall(id, function() {
							var a = $('<a class="removeMyMall" mid="' + id
									+ '">取消推广</a>');
							$('#J_YiqifaMalls a.addMyMall[mid="' + id + '"]')
									.replaceWith(a);
							initMallOperateRemove(a);
							$('#J_YiqifaAddDialog').dialog('close');
						});

			} else {
				alert('未指定要推广的商城');
			}
		}

	});
	$('#J_ConfirmRemoveYiqifaMall').click(function() {
		var self = $(this);
		if (self.hasClass('btn-ok-disabled')) {
			return false;
		}
		if (confirm('您确定取消该商城推广？')) {
			self.addClass('btn-ok-disabled')
			var id = $('#J_YiqifaRemoveDialog').dialog('option', 'mallid');
			if (typeof(id) == 'string') {
				removeMyYiqifaMall(id, function() {
					var a = $('<a class="addMyMall" mid="' + id + '">推广该商城</a>');
					$('#J_YiqifaMalls a.removeMyMall[mid="' + id + '"]')
							.replaceWith(a);
					initMallOperateAdd(a);
					$('#J_YiqifaRemoveDialog').dialog('close');
				});

			} else {
				alert('未指定要取消的商城');
			}
		}

	});

	filterYiqifaMall();
}
function addMyYiqifaMall(id, callback) {
	var sender = new WindSender('/router/member/fl/mall/yiqifa/add/' + id
			+ '?v=' + Math.random());
	sender.load("POST", {}, function(response) {
				if (response.isSuccess()) {
					alert('新增商城推广成功');
					if (callback && typeof(callback) == 'function') {
						callback();
					}
				} else {
					alert(response.msg);
					return;
				}
				$('#J_ConfirmAddYiqifaMall').removeClass('btn-ok-disabled');
			});
}
/**
 * 更新主营标题
 * 
 * @param {}
 *            userId
 * @param {}
 *            mallId
 * @param {}
 *            clickUrl
 * @param {}
 *            title
 */
function updateYiqifaActionTitle(mallId, clickUrl, title, oldTitle) {
	if (!title) {
		alert('主营标题不能为空');
		return false;
	}
	if (title == oldTitle) {// 如果未变化
		return;
	}
	var sender = new WindSender('/router/member/fl/mall/yiqifa/update/'
			+ mallId + '?v=' + Math.random());
	sender.load("POST", {
				clickUrl : clickUrl,
				title : title
			}, function(response) {
				if (response.isSuccess()) {
					alert('取消商城推广成功');
					if (callback && typeof(callback) == 'function') {
						callback();
					}
				} else {
					alert(response.msg);
					return;
				}
				$('#J_ConfirmRemoveYiqifaMall').removeClass('btn-ok-disabled');
			});
}
function removeMyYiqifaMall(id, callback) {
	var sender = new WindSender('/router/member/fl/mall/yiqifa/delete/' + id
			+ '?v=' + Math.random());
	sender.load("POST", {}, function(response) {
				if (response.isSuccess()) {
					alert('取消商城推广成功');
					if (callback && typeof(callback) == 'function') {
						callback();
					}
				} else {
					alert(response.msg);
					return;
				}
				$('#J_ConfirmRemoveYiqifaMall').removeClass('btn-ok-disabled');
			});
}
