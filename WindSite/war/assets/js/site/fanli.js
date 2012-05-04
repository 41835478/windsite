function updateFanliTradeStatus(id, status) {
	var sender = new WindSender("/router/member/fl/trade/update/status/" + id
			+ "/" + status);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					if (status == 1) {
						alert('站长确认支付返利成功，该返利记录进入等待会员确认收款状态');
					} else {
						alert('站长取消确认支付返利状态成功，该返利记录进入等待站长确认支付返利状态');
					}
					// 处理当前返利记录页面显示
					$('.fanli-status-1[tid="' + id + '"]').remove();
					$('#status-' + id)
							.empty()
							.append('<span class="span-status-1">等待会员确认收款</span>');
					$('#confirmTradeStatus1').removeClass('btn-ok-disabled');
				} else {
					alert(response.msg);
					$('#confirmTradeStatus1').removeClass('btn-ok-disabled');
				}
			});
}
function checkCommissionNum(num) {
	var numRe = /^-?[0-9]*(\.[0-9]+)?$/;
	var numVal = num.val();
	if (!numRe.test(numVal)) {
		alert('请输入数字');
		num.focus();
		return false;
	}
	numVal = parseInt(numVal);
	if (numVal < 0 || numVal > 90) {
		alert('请输入大于0小于90的数字');
		num.focus();
		return false;
	}
	return true;
}
function updateFanliTradeRate(id, commissionRate, adCommissionRate) {
	var sender = new WindSender("/router/member/fl/flmember/rate/update/" + id
			+ "/" + status);
	sender.load("GET", {
				commissionRate : commissionRate,
				adsCommissionRate : adCommissionRate
			}, function(response) {
				if (response.isSuccess()) {
					alert('修改个人返利比例成功');
					$('#confirmTradeRate').removeClass('btn-ok-disabled');
				} else {
					alert(response.msg);
					$('#confirmTradeRate').removeClass('btn-ok-disabled');
				}
			});
}
function openTradeDetailDialog(id) {
	$('#trade-detail-dialog').remove();
	$('body')
			.append('<div id="trade-detail-dialog" title="返利记录详情" style="position:relative;"></div>');
	$('#trade-detail-dialog').load(
			'/router/member/fl/trade/' + id + '?v=' + Math.random(),
			function() {
				$('#trade-detail-dialog').dialog({
							autoOpen : false,
							width : 800,
							zIndex : 10000,
							modal : true
						}).dialog('open');
				$('#confirmTradeStatus1').click(function() {
							confirm('您确认已经将返利金额转账至该会员的支付宝帐号了吗？', function(r) {
										if (r) {
											if ($(this)
													.hasClass('btn-ok-disabled')) {
												e.preventDefault();
												return;
											}
											$(this).addClass('btn-ok-disabled');
											updateFanliTradeStatus(id, 1);
											$('#trade-detail-dialog')
													.dialog('close');
										}
									});

						});
			});
}
function openMemberDetailDialog(id) {
	$('#member-detail-dialog').remove();
	$('body')
			.append('<div id="member-detail-dialog" title="会员详情" style="position:relative;"></div>');
	$('#member-detail-dialog').load(
			'/router/member/fl/flmember/' + id + '?v=' + Math.random(),
			function() {
				$('#member-detail-dialog').dialog({
							autoOpen : false,
							width : 800,
							height : 550,
							zIndex : 100000,
							modal : true
						}).dialog('open');
				getHtmlContent('fanli-income-result',
						'/router/member/fl/flmember/income/' + id + '?v='
								+ Math.random(), 'GET', {}, function(data) {
							$('#fanli-income-result').empty().append(data);
						});
			});
}
function getFanliMemberSearchHtml(q, pageNo) {
	$("#membersSearchResult").empty();
	$("#membersSearchResult")
			.append("<tr><td colspan=6>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/member/fl/members/search?v=' + Math.random(),
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
								getFanliMemberSearchHtml(q, $('a', $(this))
												.text());
								return false;
							});
					$('.pgNext').click(function() {
								if (!$(this).hasClass('pgEmpty')) {
									getFanliMemberSearchHtml(q, $(this)
													.attr('page'));
								}
								return false;
							});
					$('a.detail-view').click(function() {
								openMemberDetailDialog($(this).attr('mid'));
							});
				}
			});
}
function searchFanliReport() {
	var rel = $('#J_SearchTab li.selected').attr('rel');
	var q = $('#q').val();
	var isFollow = $('#fanli-follow-a a.selected').attr('t');
	getFanliReportSearchHtml(q, rel, isFollow, 1);
}
function searchFanliTrade() {
	var rel = $('#J_SearchTab li.selected').attr('rel');
	var q = $('#q').val();
	var type = $('#fanli-type-a a.selected').attr('t');
	var status = $('#fanli-status-a a.selected').attr('t');
	getFanliTradeSearchHtml(q, rel, type, status, 1);
}
function getFanliReportSearchHtml(q, rel, isFollow, pageNo) {
	$("#reportSearchResult").empty();
	$("#reportSearchResult")
			.append("<tr><td colspan=8>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/member/fl/report/search?v=' + Math.random(),
				type : 'POST',
				data : {
					q : q,
					rel : rel,
					isFollow : isFollow,
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
						getFanliReportSearchHtml(q, rel, isFollow, $('a',
										$(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliReportSearchHtml(q, rel, isFollow, $(this)
											.attr('page'));
						}
						return false;
					});
					$('a.username-search').click(function() {
								$('#J_SearchTab li[rel="member"]').click();
								$('#q').val($(this).text());
								searchFanliReport();
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
function getFanliTradeSearchHtml(q, rel, type, status, pageNo) {
	$("#tradeSearchResult").empty();
	$("#tradeSearchResult").append("<tr><td colspan=6>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/member/fl/trade/search?v=' + Math.random(),
				type : 'POST',
				data : {
					q : q,
					rel : rel,
					type : type,
					status : status,
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
						getFanliTradeSearchHtml(q, rel, type, status, $('a',
										$(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getFanliTradeSearchHtml(q, rel, type, status,
									$(this).attr('page'));
						}
						return false;
					});
					$('.username-search').click(function() {
								$('#J_SearchTab li[rel="member"]').click();
								$('#q').val($(this).text());
								searchFanliTrade();
							});
					$('.fanli-status-1').click(function() {
								openTradeDetailDialog($(this).attr('tid'));
								return false;
							});
				}
			});
}
function initFanliTrade(q, rel, type, status) {
	getFanliTradeSearchHtml(q, rel, type, status, 1);
	$('#searchTrade').click(function() {
				searchFanliTrade();
				return false;
			});
	$('#J_SearchTab li').click(function() {
				if (!$(this).hasClass('selected')) {
					$(this).addClass('selected').siblings()
							.removeClass('selected');
				}
			});
	$('#fanli-type-a a').click(function() {
				$('#fanli-type-a a').removeClass('selected');
				$(this).addClass('selected');
				searchFanliTrade();
			});
	$('#fanli-status-a a').click(function() {
				$('#fanli-status-a a').removeClass('selected');
				$(this).addClass('selected');
				searchFanliTrade();
			});
}
function initFanliReport(q, rel) {
	getFanliReportSearchHtml(q, rel, "-1", 1);
	$('#searchReport').click(function() {
				searchFanliReport();
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
				searchFanliReport();
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
				min : '-93',
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
		if ((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000) > 30) {
			alert('时间段间隔不能超过30天');
			return;
		}
		$(this).addClass('btn-ok-disabled');
		$('#getReport-result').empty();
		$(this).parent().find('.loading-text').removeClass('fn-hide');
		getFanliReport($('#startDate').val(), $('#endDate').val());

	});
	$('#getReport').click(function() {
				$('#getReport-dialog').dialog('open');
			});

}
function getFanliReport(start, end) {
	var sender = new WindSender("/router/member/fl/report/get/");
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
function initLogin() {
	$('#fanli-site-map').dialog({
				autoOpen : false,
				width : 500,
				zIndex : 1000,
				modal : true
			});
	$('.btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			});
	$.tools.validator.localize("en", {
				'*' : '输入错误',
				':email' : '电子邮箱格式不正确',
				':number' : '请输入数字',
				':url' : 'URL地址不正确',
				'[max]' : '请输入一个小于 $1的数字',
				'[min]' : '请输入一个大于$1的数字',
				'[required]' : '必填项'
			});
	$("#fanliLoginForm").validator({
				position : 'center right'
			}).submit(function(e) {
				if ($('.btn-ok', $(this)).hasClass('btn-ok-disabled')) {
					e.preventDefault();
					return;
				}
				var form = $(this);
				// client-side validation passed
				if (!e.isDefaultPrevented()) {
					// submit the data to the server with AJAX
					$('.btn-ok', form).addClass('btn-ok-disabled');
					loginMember();
					// prevent default form submission logic
					e.preventDefault();
				} else {
					$('.btn-ok').removeClass('btn-ok-disabled');
				}
			});
}
function initClasss() {
	$('a.createClass').click(function(e) {
				openCreateClassDialog();
				return false;
			});
	$('a.delete-class').click(function() {
				deleteFanliClass($(this).attr('cid'));
				return false;
			});
	$('a.modify-class').click(function(e) {
				openUpdateClassDialog($(this).attr('cid'));
				return false;
			});
	$('#keywordsManager').click(function() {
		$('#keywords-dialog').remove();
		$('body').append('<div id="keywords-dialog" title="编辑文章内关键词链接"></div>');
		$('#keywords-dialog').load(
				'/router/member/puji/keywords?v=' + Math.random(), function() {
					$('#keywords-dialog').dialog({
						autoOpen : false,
						width : 620,
						height : 450,
						zIndex : 100000,
						position : "top",
						modal : true,
						buttons : {
							'取消' : function() {
								$(this).dialog('close');
							},
							'确认' : function() {
								var words = [];
								$('#keywords input.k').each(function() {
									var k = $(this).val();
									if (k && '' != k) {
										words.push('{"title":"'
												+ k
												+ '","url":"'
												+ $(this).parents('tr:first')
														.find('input.v').val()
												+ '"}');
									}
								});
								if (words.length == 0) {
									alert('您尚未编辑关键词');
									return;
								}
								$('.ui-dialog-buttonpane button:last',
										$(this).parent()).button('disable');
								keywordsChange(words);
							}
						}
					}).dialog('open');
				});
	});
}
function keywordsChange(words) {
	if (words && words.length > 0) {
		var sender = new WindSender("/router/member/puji/keywords/change");
		sender.load("POST", {
					words : ('[' + words.join(',') + ']')
				}, function(response) {
					if (response.isSuccess()) {
						alert('调整文章关键词成功！');
					} else {
						alert(response.msg);
					}
					$('#keywords-dialog').parent()
							.find('.ui-dialog-buttonpane button:last')
							.button('enable');
				});
	}
}
function deleteFanliClass(id) {
	var sender = new WindSender("/router/member/puji/class/delete/" + id);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert('删除文章版块成功！')
					document.location.href = "/router/member/puji/class";
				} else {
					alert(response.msg);
				}
			});
}
function updateFanliClass(id, title, sortOrder, blogClass, classTitle) {
	var sender = new WindSender("/router/member/puji/class/update/" + id);
	sender.load("POST", {
				title : title,
				sortOrder : sortOrder,
				blogClass : blogClass,
				classTitle : classTitle
			}, function(response) {
				if (response.isSuccess()) {
					alert('修改文章版块成功！')
					document.location.href = "/router/member/puji/class";
				} else {
					alert(response.msg);
					$('#createClassSubmit').parent()
							.removeClass('btn-ok-disabled');
				}
			});
}
function createFanliClass(title, sortOrder, blogClass, classTitle) {
	var sender = new WindSender("/router/member/puji/class/create");
	sender.load("POST", {
				title : title,
				sortOrder : sortOrder,
				blogClass : blogClass,
				classTitle : classTitle
			}, function(response) {
				if (response.isSuccess()) {
					alert('新增文章版块成功！')
					document.location.href = "/router/member/puji/class";
				} else {
					alert(response.msg);
					$('#createClassSubmit').parent()
							.removeClass('btn-ok-disabled');
				}
			});
}
function openUpdateClassDialog(id) {
	$('#class-create-dialog').remove();
	$('body')
			.append('<div id="class-create-dialog" style="position:relative;" title="修改文章版块"></div>');
	$('#class-create-dialog').load(
			'/router/member/puji/class/updateview/' + id + '?v='
					+ Math.random(), function() {
				$('#class-create-dialog').dialog({
							autoOpen : false,
							width : 620,
							zIndex : 100000,
							modal : true
						}).dialog('open');
				$('#class-create-dialog input[name="radio-class"]').change(
						function() {
							var a = $(this).parent().find('a');
							$('#title').val(a.text());
							$('#classTitle').val(a.text());
							$('#blogClass').val(a.attr('cid'));
						});
				$('#createClassSubmit').click(function() {
					if ($(this).parent().hasClass('btn-ok-disabled')) {
						return;
					}
					var title = $('#title').val();
					var sortOrder = $('#sortOrder').val();
					if (!title) {
						alert('标题不能为空');
						$('#title').focus();
						return;
					}
					if (!sortOrder) {
						alert('显示顺序不能为空');
						$('#sortOrder').focus();
						return;
					}
					var numReg = /[0-9]+/;
					if (!numReg.test(sortOrder)) {
						alert('顺序必须为数字');
						$('#sortOrder').focus();
						return;
					}
					var blogClass = $('#blogClass').val();
					var classTitle = $('#classTitle').val();
					if (!blogClass || !classTitle) {
						alert('请选择要关联的新淘家园日志分类');
						return;
					}
					$(this).parent().addClass('btn-ok-disabled');
					updateFanliClass(id, title, sortOrder, blogClass,
							classTitle);
				});

			});
}
function openCreateClassDialog() {
	$('#class-create-dialog').remove();
	$('body')
			.append('<div id="class-create-dialog" style="position:relative;" title="新增文章版块"></div>');
	$('#class-create-dialog').load(
			'/router/member/puji/class/create/view?v=' + Math.random(),
			function() {
				$('#class-create-dialog').dialog({
							autoOpen : false,
							width : 620,
							zIndex : 100000,
							modal : true
						}).dialog('open');
				$('#class-create-dialog input[name="radio-class"]').change(
						function() {
							var a = $(this).parent().find('a');
							$('#title').val(a.text());
							$('#classTitle').val(a.text());
							$('#blogClass').val(a.attr('cid'));
						});
				$('#createClassSubmit').click(function() {
							if ($(this).parent().hasClass('btn-ok-disabled')) {
								return;
							}
							var title = $('#title').val();
							var sortOrder = $('#sortOrder').val();
							if (!title) {
								alert('标题不能为空');
								$('#title').focus();
								return;
							}
							if (!sortOrder) {
								alert('显示顺序不能为空');
								$('#sortOrder').focus();
								return;
							}
							var numReg = /[0-9]+/;
							if (!numReg.test(sortOrder)) {
								alert('顺序必须为数字');
								$('#sortOrder').focus();
								return;
							}
							var blogClass = $('#blogClass').val();
							var classTitle = $('#classTitle').val();
							if (!blogClass || !classTitle) {
								alert('请选择要关联的新淘家园日志分类');
								return;
							}
							$(this).parent().addClass('btn-ok-disabled');
							createFanliClass(title, sortOrder, blogClass,
									classTitle);
						});

			});
}
function initLinks() {
	$('#links .links-head').click(function() {
		var icon = $('.ui-icon', $(this));
		if (icon.hasClass('ui-icon-minusthick')) {// 已显示
			$(this).parent().find('.links-body').fadeOut();
			icon.removeClass('ui-icon-minusthick')
					.addClass('ui-icon-plusthick');
		} else {
			$(this).parent().find('.links-body').fadeIn();
			icon.removeClass('ui-icon-plusthick')
					.addClass('ui-icon-minusthick');
		}
	});
	$('a.createLink').click(function(e) {
				var type = $(this).attr('t');
				var title = '新增链接';
				switch (type) {
					case 'F' :
						title = '新增全站友情链接';
						break;
					case 'N' :
						title = '新增会员中心导航';
						break;
					case 'T' :
						title = '新增站点顶部导航';
						break;
				}
				openCreateLinksDialog(type, title);
				e.preventDefault();
				return false;
			});
	$('a.delete-link').click(function() {
				deleteFanliLink($(this).attr('lid'), $(this).attr('t'));
				return false;
			});
	$('a.modify-link').click(function(e) {
				var type = $(this).attr('t');
				var title = '修改链接';
				switch (type) {
					case 'F' :
						title = '修改全站友情链接';
						break;
					case 'N' :
						title = '修改会员中心导航';
						break;
					case 'T' :
						title = '修改站点顶部导航';
						break;
				}
				openUpdateLinksDialog($(this).attr('lid'), type, title);
				e.preventDefault();
				return false;
			});
}

function initRegiste() {
	$('.btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			});
	$.tools.validator.localize("en", {
				'*' : '输入错误',
				':email' : '电子邮箱格式不正确',
				':number' : '请输入数字',
				':url' : 'URL地址不正确',
				'[max]' : '请输入一个小于 $1的数字',
				'[min]' : '请输入一个大于$1的数字',
				'[required]' : '必填项'
			});
	$.tools.validator.fn("[data-equals]", "确认密码和登录密码不一致", function(input) {
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
	$("#fanliForm").validator({
				position : 'center right'
			}).submit(function(e) {
				if ($('.btn-ok', $(this)).hasClass('btn-ok-disabled')) {
					e.preventDefault();
					return;
				}
				var form = $(this);
				// client-side validation passed
				if (!e.isDefaultPrevented()) {
					$('.btn-ok', form).addClass('btn-ok-disabled');
					// submit the data to the server with AJAX
					registeMember();
					// prevent default form submission logic
					e.preventDefault();
				} else {
					$('#fanliForm .btn-ok').removeClass('btn-ok-disabled');
				}
			});
}
function openUpdateLinksDialog(id, type, title) {
	$('#links-create-dialog').remove();
	$('body')
			.append('<div id="links-create-dialog" style="position:relative;" title="'
					+ title + '"></div>');
	$('#links-create-dialog').load(
			'/router/member/links/shortcut/update/' + id + '?v='
					+ Math.random(), function() {
				$('#links-create-dialog').dialog({
							autoOpen : false,
							width : 820,
							zIndex : 100000,
							modal : true
						}).dialog('open');
				$('#links-create-dialog input[name="radio-link"]').change(
						function() {
							var a = $(this).parent().find('a');
							$('#links-create-dialog #title').val(a.text());
							$('#links-create-dialog #url').val(a.attr('href'));
						});
				$('#createLinkSubmit').click(function() {
							if ($(this).parent().hasClass('btn-ok-disabled')) {
								return;
							}
							var url = $('#url').val();
							var title = $('#title').val();
							var sortOrder = $('#sortOrder').val();
							if (!title) {
								alert('标题不能为空');
								$('#title').focus();
								return;
							}
							if (!url) {
								alert('URL地址不能为空');
								$('#url').focus();
								return;
							}
							var urlReg = /http:\/\//i;
							if (!urlReg.test(url)) {
								url = 'http://' + url;
								$('#url').val(url);
							}
							if (!sortOrder) {
								alert('显示顺序不能为空');
								$('#sortOrder').focus();
								return;
							}
							var numReg = /[0-9]+/;
							if (!numReg.test(sortOrder)) {
								alert('顺序必须为数字');
								$('#sortOrder').focus();
								return;
							}
							$(this).parent().addClass('btn-ok-disabled');
							updateFanliLink(id, url, title, sortOrder, type);
						});

			});
}
function openCreateLinksDialog(type, title) {
	$('#links-create-dialog').remove();
	$('body')
			.append('<div id="links-create-dialog" style="position:relative;" title="'
					+ title + '"></div>');
	$('#links-create-dialog').load(
			'/router/member/links/shortcut?v=' + Math.random(), function() {
				$('#links-create-dialog').dialog({
							autoOpen : false,
							width : 820,
							zIndex : 100000,
							modal : true
						}).dialog('open');
				$('#links-create-dialog input[name="radio-link"]').change(
						function() {
							var a = $(this).parent().find('a');
							$('#links-create-dialog #title').val(a.text());
							$('#links-create-dialog #url').val(a.attr('href'));
						});
				$('#createLinkSubmit').click(function() {
							if ($(this).parent().hasClass('btn-ok-disabled')) {
								return;
							}
							var url = $('#url').val();
							var title = $('#title').val();
							var sortOrder = $('#sortOrder').val();
							if (!title) {
								alert('标题不能为空');
								$('#title').focus();
								return;
							}
							if (!url) {
								alert('URL地址不能为空');
								$('#url').focus();
								return;
							}
							var urlReg = /http:\/\//i;
							if (!urlReg.test(url)) {
								url = 'http://' + url;
								$('#url').val(url);
							}
							if (!sortOrder) {
								alert('显示顺序不能为空');
								$('#sortOrder').focus();
								return;
							}
							var numReg = /[0-9]+/;
							if (!numReg.test(sortOrder)) {
								alert('顺序必须为数字');
								$('#sortOrder').focus();
								return;
							}
							$(this).parent().addClass('btn-ok-disabled');
							createFanliLink(url, title, sortOrder, type);
						});

			});
}
function deleteFanliLink(id, type) {
	var sender = new WindSender("/router/member/puji/links/delete/" + id + "/"
			+ type);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert('删除链接成功！')
					document.location.href = "/router/member/puji/links";
				} else {
					alert(response.msg);
				}
			});
}
function updateFanliLink(id, url, title, sortOrder, type) {
	var sender = new WindSender("/router/member/puji/links/update/" + id);
	sender.load("POST", {
				url : url,
				title : title,
				sortOrder : sortOrder,
				type : type
			}, function(response) {
				if (response.isSuccess()) {
					alert('修改链接成功！')
					document.location.href = "/router/member/puji/links";
				} else {
					alert(response.msg);
					$('#createLinkSubmit').parent()
							.removeClass('btn-ok-disabled');
				}
			});
}
function createFanliLink(url, title, sortOrder, type) {
	var sender = new WindSender("/router/member/puji/links/create");
	sender.load("POST", {
				url : url,
				title : title,
				sortOrder : sortOrder,
				type : type
			}, function(response) {
				if (response.isSuccess()) {
					alert('新增链接成功！')
					document.location.href = "/router/member/puji/links";
				} else {
					alert(response.msg);
					$('#createLinkSubmit').parent()
							.removeClass('btn-ok-disabled');
				}
			});
}
function loginMember() {
	var username = $('#username').val();
	var pwd = $('#pwd').val();
	var sender = new WindSender("/router/fanli/loginfl");
	sender.load("POST", {
				username : username,
				password : pwd
			}, function(response) {
				if (response.isSuccess()) {
					var referer = $('#referer');
					var redirect = '';
					if (referer.length == 1) {
						var refererV = referer.val();
						if (refererV && refererV != '') {
							redirect = refererV;
						}
					}
					if (redirect != '') {
						document.location.href = redirect;
					} else {
						$('#fanli-site-map').dialog('open');
					}
				} else {
					alert(response.msg);
				}
				$('#fanliLoginForm .btn-ok').removeClass('btn-ok-disabled');
			});
}

function registeMember() {
	var username = $('#username').val();
	var pwd = $('#pwd').val();
	var email = $('#email').val();
	var alipay = $('#alipay').val();
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
			$('#fanliForm .btn-ok').removeClass('btn-ok-disabled');
			return false;
		} else if (/^1[3458]\d{9}$/.test(alipay)) {
		} else if (/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				.test(alipay)) {
		} else if (/^(00)?(886|853|852|82|81)-?[0-9]{7,11}$/.test(alipay)) {
		} else {
			alert("支付宝账户名格式错误，请检查是否为Email地址或手机号。");
			$('#fanliForm .btn-ok').removeClass('btn-ok-disabled');
			return false;
		}
	}
	var sender = new WindSender("/router/fanli/registe/addMember");

	sender.load("POST", {
				username : username,
				pwd : pwd,
				email : email,
				alipay : alipay,
				qq : qq,
				msn : msn,
				wangwang : wangwang,
				mobile : mobile
			}, function(response) {
				if (response.isSuccess()) {
					alert('注册成功！');
					var referer = $('#referer');
					var redirect = '';
					if (referer.length == 1) {
						var refererV = referer.val();
						if (refererV && refererV != '') {
							redirect = refererV;
						}
					}
					if (redirect != '') {
						document.location.href = redirect;
					} else {
						$('#fanli-site-map').dialog('open');
					}
				} else {
					alert(response.msg);
					$('#fanliForm .btn-ok').removeClass('btn-ok-disabled');
				}
			});
}