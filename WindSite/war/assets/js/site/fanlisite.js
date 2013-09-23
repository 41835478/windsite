/**
 * 首页
 */
function initFanliSiteMember() {
	getFanliSiteReportSearchTaobaoLastHtml();
	getFanliSiteReportSearchMallLastHtml();
}
/**
 * 首页最新淘宝订单
 */
function getFanliSiteReportSearchTaobaoLastHtml() {
	$("#reportTaobaoSearchResult").empty();
	$("#reportTaobaoSearchResult")
			.append("<tr><td colspan=7>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/fanlimember/report/search/tao/last?v='
						+ Math.random(),
				type : 'POST',
				data : {},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#reportTaobaoSearchResult').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#reportTaobaoSearchResult').empty().append(data);
				}
			});
}
/**
 * 首页最新商城订单
 */
function getFanliSiteReportSearchMallLastHtml() {
	$("#reportMallSearchResult").empty();
	$("#reportMallSearchResult")
			.append("<tr><td colspan=7>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/fanlimember/report/search/mall/last?v='
						+ Math.random(),
				type : 'POST',
				data : {},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#reportMallSearchResult').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#reportMallSearchResult').empty().append(data);
				}
			});
}
/**
 * 编辑个人信息
 */
function initFanliSiteMemberInfo() {
	$('.btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			});
	$.tools.validator.localize("en", {
				'*' : '输入错误',
				':email' : '邮箱格式不正确',
				':number' : '请输入数字',
				':url' : 'URL地址不正确',
				'[max]' : '请输入一个小于 $1的数字',
				'[min]' : '请输入一个大于$1的数字',
				'[required]' : '必填项'
			});
	$.tools.validator.fn("[data-equals]", "与新密码不一致", function(input) {
				var name = input.attr("data-equals"), field = this.getInputs()
						.filter("[name=" + name + "]");
				return input.val() == field.val() ? true : false;
			});
	$.tools.validator.fn("[minlength]", function(input, value) {
				var min = input.attr("minlength");
				return value.length >= min ? true : {
					en : "请至少填写 " + min + "个字符"
				};
			});
	$.tools.validator.fn("[maxlength]", function(input, value) {
				var max = input.attr("maxlength");
				var temp = value.replace(/[^\x00-\xff]/g, "**");
				return temp.length <= max ? true : {
					en : "最多允许" + max + "个字符"
				};
			});
	$("#fanliUpdateForm").validator({
				position : 'center right'
			}).submit(function(e) {
				if ($('.btn-ok', $(this)).hasClass('btn-ok-disabled')) {
					e.preventDefault();
					return;
				}
				var form = $(this);
				if (!e.isDefaultPrevented()) {
					$('.btn-ok', form).addClass('btn-ok-disabled');
					updateFanliSiteMember();
					e.preventDefault();
				} else {
					$('#fanliUpdateForm .btn-ok')
							.removeClass('btn-ok-disabled');
				}
			});
}
/**
 * 修改个人信息
 */
function updateFanliSiteMember() {
	var oldpwd = $('#oldpwd').val();
	var newpwd = $('#newpwd').val();
	var email = $('#email').val();
	var alipay = $('#alipay').val();
	var alipayName = $('#alipayName').val();
	var qq = $('#qq').val();
	var msn = $('#msn').val();
	var wangwang = $('#wangwang').val();
	var mobile = $('#mobile').val();
	if (alipay) {
		if (alipay.replace(/^\s+|\s+$/g, "") != alipay) {
		}
		alipay = alipay.replace(/^\s+|\s+$/g, "");
		if (alipay.replace(/[。．]/, '.') != alipay) {
		}
		alipay = alipay.replace(/[。．]/, '.');
		if (alipay.length > 100) {
			alert("帐户名的长度不能超过100位。");
			$('#fanliUpdateForm .btn-ok').removeClass('btn-ok-disabled');
			return false;
		} else if (/^1[3458]\d{9}$/.test(alipay)) {
		} else if (/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				.test(alipay)) {
		} else if (/^(00)?(886|853|852|82|81)-?[0-9]{7,11}$/.test(alipay)) {
		} else {
			alert("支付宝账户名格式错误，请检查是否为Email地址或手机号。");
			$('#fanliUpdateForm .btn-ok').removeClass('btn-ok-disabled');
			return false;
		}
	}
	if (!qq && !msn && !wangwang && !mobile) {
		alert('请至少填写一种联系方式：QQ，MSN，旺旺，手机号');
		$('#fanliUpdateForm .btn-ok').removeClass('btn-ok-disabled');
		return;
	}
	var sender = new WindSender("/router/fanlimember/info/update?v="
			+ Math.random());
	sender.load("POST", {
				oldpwd : oldpwd,
				newpwd : newpwd,
				email : email,
				alipay : alipay,
				alipayName : alipayName,
				qq : qq,
				msn : msn,
				wangwang : wangwang,
				mobile : mobile
			}, function(response) {
				if (response.isSuccess()) {
					alert('修改用户信息成功！')
				} else {
					alert(response.msg);
				}
				$('#fanliUpdateForm .btn-ok').removeClass('btn-ok-disabled');
			});
}
/**
 * 淘宝交易
 * 
 * @param {}
 *            q
 * @param {}
 *            startDate
 * @param {}
 *            endDate
 */
function initTaobaoFanliSiteReport(q, startDate, endDate) {
	$.tools.dateinput.localize("en", {
				months : '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月',
				shortMonths : '1,2,3,4,5,6,7,8,9,10,11,12',
				days : '星期日,星期一,星期二,星期三,星期四,星期五,星期六',
				shortDays : '日,一,二,三,四,五,六'
			});
	$("#startDate,#endDate").dateinput({
		format : 'yyyy-mm-dd', // the format displayed for the user
		speed : 'fast', // calendar reveal speed
		firstDay : 1
			// which day starts a week. 0 = sunday, 1 = monday etc..
		});
	getFanliSiteReportSearchHtmlTaobao(q, startDate, endDate, 1);
	$('#searchReportButton').click(function() {
				searchFanliSiteReportTaobao();
				return false;
			});
}
/**
 * 淘宝交易搜索
 */
function searchFanliSiteReportTaobao() {
	var q = $('#q').val();
	var start = $('#startDate').val();
	var end = $('#endDate').val();
	getFanliSiteReportSearchHtmlTaobao(q, start, end, 1);
}
/**
 * 淘宝交易搜索结果返回
 * 
 * @param {}
 *            q
 * @param {}
 *            start
 * @param {}
 *            end
 * @param {}
 *            pageNo
 */
function getFanliSiteReportSearchHtmlTaobao(q, start, end, pageNo) {
	$("#reportTaobaoSearchResult").empty();
	$("#reportTaobaoSearchResult")
			.append("<tr><td colspan=7>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/fanlimember/report/search/tao?v='
						+ Math.random(),
				type : 'POST',
				data : {
					tradeId : q,
					startDate : start,
					endDate : end,
					pageNo : pageNo
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#reportTaobaoSearchResult').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#reportTaobaoSearchResult').empty().append(data);
					$('.page-number').click(function() {
						getFanliSiteReportSearchHtmlTaobao(q, start, end, $(
										'a', $(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliSiteReportSearchHtmlTaobao(q, start, end,
									$(this).attr('page'));
						}
						return false;
					});
				}
			});
}
/**
 * 商城交易
 * 
 * @param {}
 *            q
 * @param {}
 *            startDate
 * @param {}
 *            endDate
 */
function initMallFanliSiteReport(q, startDate, endDate) {
	$.tools.dateinput.localize("en", {
				months : '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月',
				shortMonths : '1,2,3,4,5,6,7,8,9,10,11,12',
				days : '星期日,星期一,星期二,星期三,星期四,星期五,星期六',
				shortDays : '日,一,二,三,四,五,六'
			});
	$("#startDate,#endDate").dateinput({
		format : 'yyyy-mm-dd', // the format displayed for the user
		speed : 'fast', // calendar reveal speed
		firstDay : 1
			// which day starts a week. 0 = sunday, 1 = monday etc..
		});
	getFanliSiteReportSearchHtmlMall(q, startDate, endDate, 1);
	$('#searchReportButton').click(function() {
				searchFanliSiteReportMall();
				return false;
			});
}
/**
 * 商城交易搜索
 */
function searchFanliSiteReportMall() {
	var q = $('#q').val();
	var start = $('#startDate').val();
	var end = $('#endDate').val();
	getFanliSiteReportSearchHtmlMall(q, start, end, 1);
}
/**
 * 商城交易搜索结果返回
 * 
 * @param {}
 *            q
 * @param {}
 *            start
 * @param {}
 *            end
 * @param {}
 *            pageNo
 */
function getFanliSiteReportSearchHtmlMall(q, start, end, pageNo) {
	$("#reportMallSearchResult").empty();
	$("#reportMallSearchResult")
			.append("<tr><td colspan=7>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/fanlimember/report/search/mall?v='
						+ Math.random(),
				type : 'POST',
				data : {
					tradeId : q,
					startDate : start,
					endDate : end,
					pageNo : pageNo
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#reportMallSearchResult').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#reportMallSearchResult').empty().append(data);
					$('.page-number').click(function() {
						getFanliSiteReportSearchHtmlMall(q, start, end, $('a',
										$(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliSiteReportSearchHtmlMall(q, start, end,
									$(this).attr('page'));
						}
						return false;
					});
				}
			});
}
/**
 * 返利记录
 * 
 * @param {}
 *            q
 * @param {}
 *            startDate
 * @param {}
 *            endDate
 * @param {}
 *            status
 * @param {}
 *            type
 */
function initFanliSiteTrade(q, startDate, endDate, status, type) {
	$.tools.dateinput.localize("en", {
				months : '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月',
				shortMonths : '1,2,3,4,5,6,7,8,9,10,11,12',
				days : '星期日,星期一,星期二,星期三,星期四,星期五,星期六',
				shortDays : '日,一,二,三,四,五,六'
			});
	$("#startDate,#endDate").dateinput({
		format : 'yyyy-mm-dd', // the format displayed for the user
		speed : 'fast', // calendar reveal speed
		firstDay : 1
			// which day starts a week. 0 = sunday, 1 = monday etc..
		});
	getFanliSiteTradeSearchHtml(q, startDate, endDate, status, type, 1);
	$('#searchTradeButton').click(function() {
				searchFanliSiteTrade();
				return false;
			});
	$('#fanli-type-a a').click(function() {
				$('#fanli-type-a a').removeClass('selected');
				$(this).addClass('selected');
				searchFanliSiteTrade();
			});
	$('#fanli-status-a a').click(function() {
				$('#fanli-status-a a').removeClass('selected');
				$(this).addClass('selected');
				searchFanliSiteTrade();
			});
}
/**
 * 返利记录搜索
 */
function searchFanliSiteTrade() {
	var q = $('#q').val();
	var start = $('#startDate').val();
	var end = $('#endDate').val();
	var type = $('#fanli-type-a a.selected').attr('t');
	var status = $('#fanli-status-a a.selected').attr('t');
	getFanliSiteTradeSearchHtml(q, start, end, status, type, 1);
}
/**
 * 返利记录搜索结果返回
 * 
 * @param {}
 *            q
 * @param {}
 *            start
 * @param {}
 *            end
 * @param {}
 *            status
 * @param {}
 *            type
 * @param {}
 *            pageNo
 */
function getFanliSiteTradeSearchHtml(q, start, end, status, type, pageNo) {
	$("#tradeSearchResult").empty();
	$("#tradeSearchResult").append("<tr><td colspan=6>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/fanlimember/trade/search?v=' + Math.random(),
				type : 'POST',
				data : {
					tradeId : q,
					startDate : start,
					endDate : end,
					status : status,
					type : type,
					pageNo : pageNo
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#tradeSearchResult').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#tradeSearchResult').empty().append(data);
					$('.page-number').click(function() {
						getFanliSiteTradeSearchHtml(q, start, end, status,
								type, $('a', $(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliSiteTradeSearchHtml(q, start, end, status,
									type, $(this).attr('page'));
						}
						return false;
					});
					$('.fanli-status-2').click(function() {
								openFanliSiteTradeDetailDialog($(this)
										.attr('tid'));
								return false;
							});
				}
			});
}
/**
 * 找回淘宝订单
 */
function initFanliSiteOrderTaobao() {
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
	sDate.addMonths(-1);
	$("#startDate").dateinput({
				format : 'yyyy-mm-dd',
				speed : 'fast',
				firstDay : 1
			}).val(sDate.format("yyyy-mm-dd"));
	$('#searchOrderButton').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
				searchFanliSiteOrderTaobao();
			});
	$('#searchOrderByTradeIdButton').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
				if (!$('#searchOrderByTradeIdInput').val()) {
					alert('请输入您的订单编号');
					return false;
				}
				if (!/^\d{4,20}$/.test($('#searchOrderByTradeIdInput').val())) {
					alert('订单编号格式不正确');
					return false;
				}
				searchFanliSiteOrderTaobao();
			});
	searchFanliSiteOrderTaobao();
}
/**
 * 找回淘宝订单搜索
 */
function searchFanliSiteOrderTaobao() {
	var start = $('#startDate').val();
	var end = $('#endDate').val();
	var tradeId = $('#searchOrderByTradeIdInput').val();
	getFanliSiteOrderSearchHtmlTaobao(tradeId, start, end, 1);
}
/**
 * 找回淘宝订单搜索结果返回
 * 
 * @param {}
 *            start
 * @param {}
 *            end
 * @param {}
 *            pageNo
 */
function getFanliSiteOrderSearchHtmlTaobao(tradeId, start, end, pageNo) {
	$("#orderTaobaoSearchResult").empty();
	$("#orderTaobaoSearchResult")
			.append("<tr><td colspan=7>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/fanlimember/order/search/tao?v=' + Math.random(),
				type : 'POST',
				data : {
					tradeId : tradeId,
					startDate : start,
					endDate : end,
					pageNo : pageNo
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#orderTaobaoSearchResult').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#orderTaobaoSearchResult').empty().append(data);
					$('.page-number').click(function() {
						getFanliSiteOrderSearchHtmlTaobao(tradeId, start, end,
								$('a', $(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliSiteOrderSearchHtmlTaobao(tradeId, start,
									end, $(this).attr('page'));
						}
						return false;
					});
					$('a.getOrder').each(function() {
						$(this).data('tid', $(this).attr('tid'));
						$(this).removeAttr('tid');
						$(this).click(function() {
									openFanliSiteGetOrderDialog($(this)
											.data('tid'));
								});
					});
				}
			});
}
/**
 * 确认淘宝订单
 * 
 * @param {}
 *            id
 */
function confirmFnaliSiteGetOrderTaobao(id) {
	var sender = new WindSender("/router/fanlimember/report/confirm/tao/" + id
			+ "?v=" + Math.random());
	sender.load("POST", {}, function(response) {
				if (response.isSuccess()) {
					alert('确认该条交易记录成功！');
					searchFanliSiteOrderTaobao();
				} else {
					alert(response.msg);
				}
				$('#trade-id-confirm').removeClass('btn-ok-disabled');
			});
}
/**
 * 打开订单找回窗口
 * 
 * @param {}
 *            id
 */
function openFanliSiteGetOrderDialog(id) {
	$('#getorder-dialog').remove();
	$('body')
			.append('<div id="getorder-dialog" title="交易记录详情" style="position:relative;"></div>');
	$('#getorder-dialog').load(
			'/router/fanlimember/report/tao/' + id + '?v=' + Math.random(),
			function() {
				$('#getorder-dialog').dialog({
							autoOpen : false,
							width : 800,
							zIndex : 10000,
							modal : true
						}).dialog('open');
				var confirm = $('#trade-id-confirm');
				confirm.data('tid', confirm.attr('tid'));
				confirm.removeAttr('tid');
				confirm.click(function() {
							if ($(this).hasClass('btn-ok-disabled')) {
								return;
							}
							var t = $('#trade-id').val();
							if (!t) {
								alert('交易号不能为空');
								return;
							}
							if (t != $(this).data('tid')) {
								alert('您输入的交易号不正确，无法确认该交易记录');
								return;
							}
							$(this).addClass('btn-ok-disabled');
							confirmFnaliSiteGetOrderTaobao(t);
							$('#getorder-dialog').dialog('close');
						});
			});
}
/**
 * 找回商城订单
 */
function initFanliSiteOrderMall() {
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
	sDate.addMonths(-1);
	$("#startDate").dateinput({
				format : 'yyyy-mm-dd',
				speed : 'fast',
				firstDay : 1
			}).val(sDate.format("yyyy-mm-dd"));
	$('#searchOrderButton').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
				searchFanliSiteOrderMall();
			});
	searchFanliSiteOrderMall();
}
/**
 * 找回淘宝订单搜索
 */
function searchFanliSiteOrderMall() {
	var start = $('#startDate').val();
	var end = $('#endDate').val();
	getFanliSiteOrderSearchHtmlMall(start, end, 1);
}
/**
 * 找回淘宝订单搜索结果返回
 * 
 * @param {}
 *            start
 * @param {}
 *            end
 * @param {}
 *            pageNo
 */
function getFanliSiteOrderSearchHtmlMall(start, end, pageNo) {
	$("#orderMallSearchResult").empty();
	$("#orderMallSearchResult")
			.append("<tr><td colspan=7>正在加载数据,请稍候...</td></tr>");
	$.ajax({
		url : '/router/fanlimember/order/search/mall?v=' + Math.random(),
		type : 'POST',
		data : {
			startDate : start,
			endDate : end,
			pageNo : pageNo
		},
		dataType : 'html',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("WindType", "AJAX");// 请求方式
			xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
		},
		error : function(request, textStatus, errorThrown) {
			$('#orderMallSearchResult').empty();
			alert(textStatus);
		},
		success : function(data) {
			$('#orderMallSearchResult').empty().append(data);
			$('.page-number').click(function() {
				getFanliSiteOrderSearchHtmlMall(start, end, $('a', $(this))
								.text());
				return false;
			});
			$('.pgNext').click(function() {
				if (!$(this).hasClass('pgEmpty')) {
					getFanliSiteOrderSearchHtmlMall(start, end, $(this)
									.attr('page'));
				}
				return false;
			});
			$('a.getOrder').each(function() {
				$(this).click(function() {
							openFanliSiteGetOrderDialogMall($(this).attr('tid'));
						});
			});
		}
	});
}
/**
 * 确认淘宝订单
 * 
 * @param {}
 *            id
 */
function confirmFnaliSiteGetOrderMall(id, orderNo) {
	var sender = new WindSender("/router/fanlimember/report/confirm/mall/" + id
			+ "?v=" + Math.random());
	sender.load("POST", {
				orderNo : orderNo
			}, function(response) {
				if (response.isSuccess()) {
					alert('确认该条交易记录成功！');
					$('#getorder-dialog').dialog('close');
					searchFanliSiteOrderMall();
				} else {
					alert(response.msg);
				}
				$('#trade-id-confirm').removeClass('btn-ok-disabled');
			});
}
/**
 * 打开订单找回窗口
 * 
 * @param {}
 *            id
 */
function openFanliSiteGetOrderDialogMall(id) {
	$('#getorder-dialog').remove();
	$('body')
			.append('<div id="getorder-dialog" title="交易记录详情" style="position:relative;"></div>');
	$('#getorder-dialog').load(
			'/router/fanlimember/report/mall/' + id + '?v=' + Math.random(),
			function() {
				$('#getorder-dialog').dialog({
							autoOpen : false,
							width : 800,
							zIndex : 10000,
							modal : true
						}).dialog('open');
				var confirm = $('#trade-id-confirm');
				confirm.click(function() {
							if ($(this).hasClass('btn-ok-disabled')) {
								return;
							}
							var t = $('#trade-id').val();
							if (!t) {
								alert('订单编号不能为空');
								return;
							}
							$(this).addClass('btn-ok-disabled');
							confirmFnaliSiteGetOrderMall(id, t);
						});
			});
}
/**
 * 更新订单状态
 * 
 * @param {}
 *            id
 * @param {}
 *            status
 */
function updateFanliSiteTradeStatus(id, status) {
	var sender = new WindSender("/router/fanlimember/trade/update/status/" + id
			+ "/" + status);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					if (status == 2) {
						alert('确认收款成功，该返利流程完成。');
					} else {
						alert('会员取消确认收款状态成功，该返利记录进入等待会员确认收款状态');
					}
					// 处理当前返利记录页面显示
					$('.fanli-status-2[tid="' + id + '"]').remove();
					$('#status-' + id)
							.empty()
							.append('<span class="span-status-1">已完成返利支付</span>');
					$('#confirmTradeStatus2').removeClass('btn-ok-disabled');
				} else {
					alert(response.msg);
					$('#confirmTradeStatus2').removeClass('btn-ok-disabled');
				}
			});
}
/**
 * 打开订单详情
 * 
 * @param {}
 *            id
 */
function openFanliSiteTradeDetailDialog(id) {
	$('#trade-detail-dialog').remove();
	$('body')
			.append('<div id="trade-detail-dialog" title="返利记录详情" style="position:relative;"></div>');
	$('#trade-detail-dialog').load(
			'/router/fanlimember/trade/' + id + '?v=' + Math.random(),
			function() {
				$('#trade-detail-dialog').dialog({
							autoOpen : false,
							width : 800,
							zIndex : 10000,
							modal : true
						}).dialog('open');
				$('#confirmTradeStatus2').click(function() {
							if (confirm('您确认返利金额已经转账至您的支付宝帐号了吗？')) {
								if ($(this).hasClass('btn-ok-disabled')) {
									e.preventDefault();
									return;
								}
								$(this).addClass('btn-ok-disabled');
								updateFanliSiteTradeStatus(id, 2);
								$('#trade-detail-dialog').dialog('close');
							}
							return false;
						});
			});
}
/**
 * 初始化推广会员
 * 
 * @param {}
 *            q
 */
function initFanliSiteAds(q) {
	getFanliSiteMemberSearchHtml(q, 1);
}
/**
 * 推广会员搜索
 */
function searchFanliSiteMembers() {
	var q = $('#q').val();
	getFanliSiteMemberSearchHtml(q, 1);
}
/**
 * 推广会员搜索结果
 * 
 * @param {}
 *            q
 * @param {}
 *            pageNo
 */
function getFanliSiteMemberSearchHtml(q, pageNo) {
	$("#membersSearchResult").empty();
	$("#membersSearchResult")
			.append("<tr><td colspan=6>正在加载数据,请稍候...</td></tr>");
	$.ajax({
		url : '/router/fanlimember/ads/search?v=' + Math.random(),
		type : 'POST',
		data : {
			q : q,
			pageNo : pageNo
		},
		dataType : 'html',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("WindType", "AJAX");// 请求方式
			xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
		},
		error : function(request, textStatus, errorThrown) {
			$('#membersSearchResult').empty();
			alert(textStatus);
		},
		success : function(data) {
			$('#membersSearchResult').empty().append(data);
			$('.page-number').click(function() {
						getFanliSiteMemberSearchHtml(q, $('a', $(this)).text());
						return false;
					});
			$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliSiteMemberSearchHtml(q, $(this)
											.attr('page'));
						}
						return false;
					});
		}
	});
}
/**
 * 淘宝推广
 * 
 * @param {}
 *            q
 */
function initFanliSiteAdsReportTaobao(q) {
	getFanliSiteAdsReportHtmlTaobao(q, 1);
}
/**
 * 淘宝推广搜索
 */
function searchFanliSiteAdsReportTaobao() {
	getFanliSiteAdsReportHtmlTaobao($('#q').val(), 1);
}
/**
 * 淘宝推广搜索结果
 * 
 * @param {}
 *            id
 * @param {}
 *            pageNo
 */
function getFanliSiteAdsReportHtmlTaobao(q, pageNo) {
	$("#reportTaobaoSearchResult").empty();
	$("#reportTaobaoSearchResult")
			.append("<tr><td colspan=7>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/fanlimember/ads/report/search/tao?v='
						+ Math.random(),
				type : 'POST',
				data : {
					pageNo : pageNo,
					nick : q
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#reportTaobaoSearchResult').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#reportTaobaoSearchResult').empty().append(data);
					$('.page-number').click(function() {
						getFanliSiteAdsReportHtmlTaobao(q, $('a', $(this))
										.text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliSiteAdsReportHtmlTaobao(q, $(this)
											.attr('page'));
						}
						return false;
					});
				}
			});
}
/**
 * 淘宝推广
 * 
 * @param {}
 *            q
 */
function initFanliSiteAdsReportMall(q) {
	getFanliSiteAdsReportHtmlMall(q, 1);
}
/**
 * 商城推广搜索
 */
function searchFanliSiteAdsReportMall() {
	getFanliSiteAdsReportHtmlMall($('#q').val(), 1);
}
/**
 * 商城推广搜索结果
 * 
 * @param {}
 *            id
 * @param {}
 *            pageNo
 */
function getFanliSiteAdsReportHtmlMall(q, pageNo) {
	$("#reportMallSearchResult").empty();
	$("#reportMallSearchResult")
			.append("<tr><td colspan=7>正在加载数据,请稍候...</td></tr>");
	$.ajax({
		url : '/router/fanlimember/ads/report/search/mall?v=' + Math.random(),
		type : 'POST',
		data : {
			pageNo : pageNo,
			nick : q
		},
		dataType : 'html',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("WindType", "AJAX");// 请求方式
			xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
		},
		error : function(request, textStatus, errorThrown) {
			$('#reportMallSearchResult').empty();
			alert(textStatus);
		},
		success : function(data) {
			$('#reportMallSearchResult').empty().append(data);
			$('.page-number').click(function() {
						getFanliSiteAdsReportHtmlMall(q, $('a', $(this)).text());
						return false;
					});
			$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliSiteAdsReportHtmlMall(q, $(this)
											.attr('page'));
						}
						return false;
					});
		}
	});
}
