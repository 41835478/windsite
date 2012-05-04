function initAdvanced() {
	$.tools.dateinput.localize("zh-CN", {
				months : '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月',
				shortMonths : '1,2,3,4,5,6,7,8,9,10,11,12',
				days : '星期日,星期一,星期二,星期三,星期四,星期五,星期六',
				shortDays : '日,一,二,三,四,五,六'
			});
	$('#startDate,#endDate').dateinput({
				lang : 'zh-CN',
				format : 'yyyy-mm-dd'
			});
	$('input[type="checkbox"][name="dimensions"]').change(function() {
		switch ($(this).val()) {
			case 'category' :
				if ($(this).is(':checked')) {
					$('input[type="checkbox"][name="dimensions"][value="label"]')
							.attr('checked', true);
				}
				break;
			case 'label' :
				if (!$(this).is(':checked')) {
					$('input[type="checkbox"][name="dimensions"][value="category"]')
							.attr('checked', false);
				}
				break;
		}
	});
	$('#categoryFilterSelect').change(function() {
				$('#category-items').parent().find('select').hide();// 全部隐藏
				switch ($(this).val()) {
					case 'item' :
						$('#category-items').show();
						break;
					case 'channel' :
						$('#category-channels').show();
						break;
					case 'blog' :
						$('#category-blogs').show();
						break;
					case 'activity' :
						$('#category-activitys').show();
						break;
				}
			});
	/**
	 * 常用统计
	 */
	$('.analytics').click(function() {
		var name = $(this).attr('name');
		if ('source' == name) {
			$('input[type="checkbox"][name="dimensions"]').each(function() {
						if ('source' == $(this).val()) {
							$(this).attr('checked', true);
						} else {
							$(this).attr('checked', false);
						}
					});
			$('#categoryFilterSelect').val('0');
			advancedAnalytics(SID, NICK);
		} else if ('city' == name) {
			$('input[type="checkbox"][name="dimensions"]').each(function() {
						if ('city' == $(this).val()) {
							$(this).attr('checked', true);
						} else {
							$(this).attr('checked', false);
						}
					});
			$('#categoryFilterSelect').val('0');
			advancedAnalytics(SID, NICK);
		} else {// 非来源和城市
			$('input[type="checkbox"][name="dimensions"]')
					.attr('checked', true);
			$('#categoryFilterSelect').val(name);
			advancedAnalytics(SID, NICK, 1, '-ga:date');
		}
		return false;
	});

}
/**
 * 高级统计
 */
function advancedAnalytics(sid, nick, pageNo, sort, filter) {
	var dimensions = [];
	var categoryFilter = "";
	if (!pageNo) {
		pageNo = 1;
	}
	$('input[type="checkbox"][name="dimensions"]:checked').each(function() {
				dimensions.push($(this).val());
			});
	var category = $('#categoryFilterSelect').val();// 推广类别
	if (category != '0') {// 如果指定了类别
		if (filter) {// 如果指定了过滤器
			categoryFilter = category + ":" + filter;
		} else {
			var value = convertCategoryFilterValue(category);
			if (value) {
				categoryFilter = category + ":" + value;
			} else {
				categoryFilter = category + ":0";
			}
		}
	}
	var startDate = $('#startDate').val();
	var endDate = $('#endDate').val();
	if (!startDate || startDate.length == 0) {
		alert('未指定开始时间');
		return;
	}
	if (!endDate || endDate.length == 0) {
		alert('未指定结束时间');
		return;
	}
	getAdvancedAnalytics(sid, nick, pageNo, startDate, endDate, dimensions,
			categoryFilter, sort)
}
function getAdvancedAnalytics(sid, nick, pageNo, startDate, endDate,
		dimensions, categoryFilter, sort) {
	$('#tableProfile')
			.empty()
			.append("<tr id='loading'><td><div  align='left'>正在加载数据,请稍候...</div></td></tr>");
	$.ajax({
				url : "/router/member/ga/seller/advanced/" + sid + '?v='
						+ Math.random(),
				type : 'POST',
				data : {
					nick : nick,
					pageNo : pageNo,
					startDate : startDate,
					endDate : endDate,
					dimensions : dimensions.join(','),
					categoryFilter : categoryFilter,
					sort : (sort ? sort : '')
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
					$('#tableProfile').empty().append(data);
					$('#tableProfile .page-number').click(function() {
						getAdvancedAnalytics(pid, $('a', $(this)).text(),
								startDate, endDate, dimensions, categoryFilter,
								sort);
						return false;
					});
					$('#tableProfile .pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getAdvancedAnalytics(pid, $(this).attr('page'),
									startDate, endDate, dimensions,
									categoryFilter, sort);
						}
						return false;
					});
				}
			});
}
function convertCategoryFilterValue(action) {
	switch (action) {
		case 'item' :// 商品推广
			return $('#category-items').val();
		case 'shop' :
			return $('#category-shops').val();
	}
}
/**
 * 创建统计图形报表
 * 
 * @param {}
 *            content
 * @param {}
 *            url
 * @param {}
 *            type
 * @param {}
 *            data
 * @param {}
 *            callback
 */
function createAnalytics(content, url, type, data, callback) {
	$("#" + content).empty();
	$("#" + content)
			.append("<div id='loading' align='left'>正在加载数据,请稍候...</div>");
	if (url.indexOf('?') != -1) {
		url = url + '&ieversion=' + Math.random();
	} else {
		url = url + '?ieversion=' + Math.random();
	}
	var sender = new WindSender(url);
	sender.load(type, data, function(response) {
				$('#loading').remove();
				if (response.isSuccess()) {
					callback(response.body);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 卖家30天趋势
 * 
 * @param {}
 *            content
 * @param {}
 *            pid
 */
function createSellerProfile(content, sid, nick) {
	createAnalytics(content, '/router/member/ga/seller/siteprofile/' + sid,
			'POST', {
				nick : nick
			}, function(data) {
				if (data.length == 0) {
					alert('未查询到该站点最近30天推广趋势');
					return;
				}
				$("#" + content).empty();
				$.jqplot.config.enablePlugins = true;
				var l1 = [], l2 = [];
				for (var i = 0; i < data.length; i++) {
					var en = data[i];
					l1.push([en.date, en.pv]);
					l2.push([en.date, en.uv]);
				}
				$('#profileBody').empty()
						.append('<tr class="odd"><td>今天</td><td>' + data[0].pv
								+ '</td><td>' + data[0].uv + '</td></tr>');
				$('#profileBody').append('<tr><td>昨天</td><td>' + data[1].pv
						+ '</td><td>' + data[1].uv + '</td></tr>');
				$('#profileBody').append('<tr class="odd"><td>前天</td><td>'
						+ data[2].pv + '</td><td>' + data[2].uv + '</td></tr>');
				$.jqplot(content, [l1, l2], {
							title : '最近30天推广趋势',
							legend : {
								show : true,
								location : 'n'
							},
							cursor : {
								showVerticalLine : true,
								showTooltip : true,
								followMouse : true,
								showTooltipDataPosition : true,
								zoom : true,
								intersectionThreshold : 6,
								tooltipFormatString : '%s %s, %s'
							},
							series : [{
										label : '推广点击次数'
									}, {
										label : '唯一点击次数'
									}],
							axes : {
								xaxis : {
									renderer : $.jqplot.DateAxisRenderer,
									min : data[data.length - 1].date,
									max : data[0].date,
									tickInterval : '1 day',
									tickOptions : {
										formatString : ''
									},
									numberTicks : 5
								},
								highlighter : {
									sizeAdjust : 10,
									tooltipLocation : 'n',
									useAxesFormatters : false,
									formatString : 'Hello %s dayglow %d'
								},
								yaxis : {
									tickOptions : {
										formatString : '%d'
									},
									min : 0,
									numberTicks : 10
								}
							}
						});
			});
}
/**
 * 时段分析
 * 
 * @param {}
 *            content
 * @param {}
 *            pid
 * @param {}
 *            date
 */
function createHourProfile(content, sid, nick, date) {
	$('#profileBody').empty();
	createAnalytics(content, '/router/member/ga/seller/hour/' + sid, 'POST', {
				nick : nick,
				date : date
			}, function(data) {
				if (data.length == 0) {
					alert('未查询到时段分析数据');
					return;
				}
				$("#" + content).empty();
				$('#profileBody').empty();
				$.jqplot.config.enablePlugins = true;
				var l1 = [], l2 = [];
				for (var i = 0; i < data.length; i++) {
					var en = data[i];
					$('#profileBody').append('<tr class="'
							+ (i % 2 == 0 ? 'odd' : 'even') + '"><td>'
							+ convertAnalyticsHour(en.hour) + '</td><td>'
							+ en.pv + '</td><td>' + en.uv + '</td></tr>');
					l1.push([en.hour, en.pv]);
					l2.push([en.hour, en.uv]);
				}
				$.jqplot(content, [l1, l2], {
							title : date + ':时段分析',
							legend : {
								show : true,
								location : 'n'
							},
							cursor : {
								showVerticalLine : true,
								showTooltip : true,
								followMouse : true,
								showTooltipDataPosition : true,
								zoom : true,
								intersectionThreshold : 6,
								tooltipFormatString : '%s %s, %s'
							},
							series : [{
										label : '推广点击次数'
									}, {
										label : '唯一点击次数'
									}],
							axes : {
								xaxis : {
									min : 0,
									max : 23,
									tickInterval : 1,
									tickOptions : {
										formatString : '%d'
									},
									numberTicks : 24
								},
								highlighter : {
									sizeAdjust : 10,
									tooltipLocation : 'n',
									useAxesFormatters : false
								},
								yaxis : {
									tickOptions : {
										formatString : '%d'
									},
									min : 0,
									numberTicks : 10
								}
							}
						});
			});
}
/**
 * 每日分析
 * 
 * @param {}
 *            content
 * @param {}
 *            pid
 * @param {}
 *            startDate
 * @param {}
 *            endDate
 */
function createDayProfile(content, sid, nick, startDate, endDate, year, month) {
	$('#profileBody').empty();
	createAnalytics(content, '/router/member/ga/seller/day/' + sid, 'POST', {
				nick : nick,
				startDate : startDate,
				endDate : endDate,
				year : year,
				month : month
			}, function(data) {
				if (data.length == 0) {
					alert('未查询到每日分析数据');
					return;
				}
				$("#" + content).empty();
				$('#profileBody').empty();
				$.jqplot.config.enablePlugins = true;
				var l1 = [], l2 = [];
				for (var i = 0; i < data.length; i++) {
					var en = data[i];
					$('#profileBody').append('<tr class="'
							+ (i % 2 == 0 ? 'odd' : 'even') + '"><td>'
							+ en.date + '</td><td>' + en.pv + '</td><td>'
							+ en.uv + '</td></tr>');
					l1.push([en.date, en.pv]);
					l2.push([en.date, en.uv]);
				}
				$.jqplot(content, [l1, l2], {
							title : ((startDate != ''
									? (startDate + '至' + endDate)
									: (year + '-' + month)) + ':每日分析'),
							legend : {
								show : true,
								location : 'n'
							},
							cursor : {
								showVerticalLine : true,
								showTooltip : true,
								followMouse : true,
								showTooltipDataPosition : true,
								zoom : true,
								intersectionThreshold : 6,
								tooltipFormatString : '%s %s, %s'
							},
							series : [{
										label : '推广点击次数'
									}, {
										label : '唯一点击次数'
									}],
							axes : {
								xaxis : {
									renderer : $.jqplot.DateAxisRenderer,
									min : data[data.length - 1].date,
									max : data[0].date,
									tickInterval : '1 day',
									tickOptions : {
										formatString : ''
									},
									numberTicks : (data.length > 5
											? 5
											: data.length)
								},
								highlighter : {
									sizeAdjust : 10,
									tooltipLocation : 'n',
									useAxesFormatters : false
								},
								yaxis : {
									tickOptions : {
										formatString : '%d'
									},
									min : 0,
									numberTicks : 10
								}
							}
						});
			});
}
/**
 * 查询最近访客
 * 
 * @param {}
 *            pid
 */
function createLastVisitProfile(content, sid, nick) {
	$("#" + content).empty();
	$("#" + content)
			.append("<tr id='loading'><td colspan=5><div align='left'>正在加载数据,请稍候...</div></td></tr>");
	var sender = new WindSender('/router/member/ga/seller/lastvisit/' + sid
			+ '?v=' + Math.random());
	sender.load('POST', {
				nick : nick
			}, function(response) {
				$('#loading').remove();
				if (response.isSuccess()) {
					var data = response.body;
					if (data.length == 0) {
						alert('未查询到【' + nick + '】最近访客');
						return;
					}
					$("#" + content).empty();
					for (var i = 0; i < data.length; i++) {
						var en = data[i];
						$("#" + content)
								.append('<tr class="'
										+ (i % 2 == 0 ? 'odd' : 'even')
										+ '"><td>'
										+ en.date
										+ '	'
										+ en.hour
										+ '</td><td style="font-weight:bold;color:#00E;">'
										+ convertAnalyticsAction(en.action)
										+ '</td><td style="text-align:left;">'
										+ convertAnalyticsLabel(en.action,
												en.label) + '</td><td>'
										+ convertAnalyticsSource(en.source)
										+ '</td><td>' + en.city + '</td></tr>');
					}
				} else {
					alert(response.msg);
				}
			});

}
function convertAnalyticsLabel(action, label) {
	var as = action.split('-');
	if (action.indexOf('item-') != -1)
		return '<a style="color:#00e;" href="/router/member/analyticsmanager/seller/advanced?dimensions=date,category,label,city&categoryFilter=item:'
				+ as[as.length - 1] + '">' + label + '</a>';
	else if (action.indexOf('shop-') != -1)
		return '<a style="color:#00e;" href="/router/member/analyticsmanager/seller/advanced?dimensions=date,category,label,city&categoryFilter=shop:'
				+ as[as.length - 1] + '">' + label + '</a>';
	else if (action.indexOf('channel-') != -1)
		return '<a style="color:#00e;" href="/router/member/analyticsmanager/seller/advanced?dimensions=date,category,label,city&categoryFilter=channel:'
				+ as[as.length - 1] + '">' + label + '</a>';
	else if (action.indexOf('key-') != -1)
		return '<a style="color:#00e;" href="/router/member/analyticsmanager/seller/advanced?dimensions=date,category,label,city&categoryFilter=key:'
				+ as[as.length - 1] + '">' + label + '</a>';
	else if (action.indexOf('blog-') != -1)
		return '<a style="color:#00e;" href="/router/member/analyticsmanager/seller/advanced?dimensions=date,category,label,city&categoryFilter=blog:'
				+ as[as.length - 1] + '">' + label + '</a>';
	else if (action.indexOf('activity-') != -1)
		return '<a style="color:#00e;" href="/router/member/analyticsmanager/seller/advanced?dimensions=date,category,label,city&categoryFilter=activity:'
				+ as[as.length - 1] + '">' + label + '</a>';
	else
		return label;
}
function convertAnalyticsHour(hour) {
	switch (hour) {
		case '00' :
			return '0:00-1:00';
		case '01' :
			return '1:00-2:00';
		case '02' :
			return '2:00-3:00';
		case '03' :
			return '3:00-4:00';
		case '04' :
			return '4:00-5:00';
		case '05' :
			return '5:00-6:00';
		case '06' :
			return '6:00-7:00';
		case '07' :
			return '7:00-8:00';
		case '08' :
			return '8:00-9:00';
		case '09' :
			return '9:00-10:00';
		case '10' :
			return '10:00-11:00';
		case '11' :
			return '11:00-12:00';
		case '12' :
			return '12:00-13:00';
		case '13' :
			return '13:00-14:00';
		case '14' :
			return '14:00-15:00';
		case '15' :
			return '15:00-16:00';
		case '16' :
			return '16:00-17:00';
		case '17' :
			return '17:00-18:00';
		case '18' :
			return '18:00-19:00';
		case '19' :
			return '19:00-20:00';
		case '20' :
			return '20:00-21:00';
		case '21' :
			return '21:00-22:00';
		case '22' :
			return '22:00-23:00';
		case '23' :
			return '23:00-24:00';
	}
	return hour + ':00-' + (parseInt(hour) + 1) + ':00';
}
function convertAnalyticsAction(action) {
	if (action.indexOf('item-') != -1)
		return "<span style='color:#FF4500;'>商品推广</span>";
	else if (action.indexOf('shop-') != -1)
		return "<span style='color:#FF7F50;'>店铺推广</span>";
	else if (action.indexOf('channel-') != -1)
		return "<span style='color:#FFA07A;'>频道推广</span>";
	else if (action.indexOf('key-') != -1)
		return "<span style='color:#A0522D;'>关键词推广</span>";
	else if (action.indexOf('blog-') != -1)
		return "<span style='color:#8B4513;'>软文推广</span>";
	else if (action.indexOf('activity-') != -1)
		return "<span style='color:#D2691E;'>活动推广</span>";
	else
		return "未知";
}
function convertAnalyticsSource(source) {
	if (source && source.length > 0 && '(direct)' == source) {
		return '直接访问';
	} else {
		return source;
	}
}