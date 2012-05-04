String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "")
};
function toQueryParams(a) {
	var b = a.match(/^\??(.*)$/)[1].split('&');
	var c = {};
	if (b == null || b.length == 0) {
		return c
	}
	for (var i = 0; i < b.length; i++) {
		var d = b[i].split("=");
		c[d[0]] = d[1]
	}
	return c
};
// 截取个数
function _avsStr(str, n, kh, ftype) {
	var result = "";
	var tmp = typeof(str) == "string"
			? (str.length > 0) ? str.split(";") : []
			: str;

	if (n == 1 && tmp.length > 0) {
		result = tmp[0].substr(0, 7);
		str = result;
	} else if (tmp.length >= n) {
		for (var i = 0; i < n; i++) {
			result += tmp[i].substr(0, 3).replace(".", "") + ";";
		}
		str = result.substr(0, result.length - 1);
	}
	if (str) {
		return keyHref(str, kh, ftype);
	}
	return str.substr(0, 3).replace(".", "");
}
var searchMark = parseInt(toQueryParams(document.location.search)["searchMark"]
		|| 1);
// 弹层
function popFun(rid) {
	var aEls = $("#" + rid + " .popPos"), playPop, pwd = 0;

	aEls.each(function(i) {
				var els = $(this);
				if (els.find("> a.name")[0]) {
					els.width(els.find("> a").width() + 16);
				}
				els.hover(function() {
							if (els.find("> a.name")[0]) {
								pwd = els.find("> a").width() + 16 + "px";
							} else {
								pwd = els.width() + "px";
							}
							els.css("z-index", 1000);
							playPop = setTimeout(function() {
										els.find("> div").attr("style",
												"display:block;left:" + pwd);
									}, 600)
						}, function() {
							clearTimeout(playPop);
							els.css("z-index", 1);
							els.find("> div").attr("style", "display:none");
						});
			});
}
function autoMenu(menuNum) {
	switch (menuNum) {
		case 1 :
			$('.top-ul:first li:eq(0)').click();
			break;
		case 2 :
			$('.top-ul:first li:eq(1)').click();
			break;
		case 3 :
			$('.top-ul:first li:eq(2)').click();
			break;
		case 4 :
			$('.top-ul:first li:eq(3)').click();
			break;
		default :
			$('.top-ul:first li:eq(0)').click();
			break;
	}
}
function showMenu(m, n, count) {
	for (var i = 1; i <= count; i++) {
		if (i == n) {
			$("#td_" + m + "_" + n).addClass("libg");
		} else {
			$("#td_" + m + "_" + i).removeClass("libg");
		}
	}
}
function showDiv(m, n, count) {
	for (var i = 1; i <= count; i++) {
		if (i == n) {
			$("#td_" + m + "_" + n).addClass("libg");
			// popFun("zh_mv");
			// popFun("hollywood_mv");
			// popFun("europe_mv");
		} else {
			$("#td_" + m + "_" + i).removeClass("libg");
		}
	}
}
/* 加搜索链接 */
function keyHref(str, stype, ftype, sstr) {
	try {
		var keys = typeof(str) == "string" ? ((str.length > 0)
				? str.split(";")
				: []) : str;
		var searchType = stype;
		var keyStr = "";
		var buffer = [];
		for (var i = 0; i < keys.length; i++) {
			trimStr = keys[i].trim();
			if (typeof(sstr) != 'undefined' && sstr) {
				trimStr2 = trimStr.substr(0, 3);
			} else {
				trimStr2 = trimStr;
			}
			buffer.push(trimStr2);
			// buffer.push('<a href="javascript:void(0)" onclick="searchKey(\''
			// + trimStr + '\',' + searchType + ',\'' + ftype + '\')">'
			// + trimStr2 + '</a>')
			if (i < keys.length - 1) {
				buffer.push(' ');
			}
		}
		keyStr = buffer.join('');
		return keyStr;
	} catch (e) {
	}
}
function strSub(str, n, d, dd) {
	/*
	 * str:传入string
	 * 
	 * n: length limit
	 * 
	 * d: 是否加省略号, 默认不加
	 * 
	 */
	var r = /[^\x00-\xff]/g;
	d = d || false;
	dd = dd || '...';
	if (n > 0 && str.replace(r, "mm").length > n) {
		var m = Math.floor(n / 2);
		for (var i = m; i < str.length; i++) {
			if (str.substr(0, i).replace(r, "mm").length >= n) {
				return str.substr(0, i) + (d ? dd : "");
			}
		}
	}
	return str;
};
// 观看数据
function lookRank(jsonStr, o) {
	try {
		var str = "", j, cls, clsA, trCls, jsonData, jsonLength = 0, _tv_name = "", _tv_count = "", _tv_url = "", _tv_trend_count = "", _main_actor = "", _top50_day_time = "";
		jsonData = eval("(" + jsonStr + ")").videos;
		jsonLength = jsonData.length > 50 ? 50 : jsonData.length;
		var buffer = [];
		buffer
				.push('<table width="750" border="0" cellpadding="0" cellspacing="0">');
		if (TOP_C == 'real' || TOP_C == 'education' || TOP_C == 'clip'
				|| TOP_C == 'music') {
			buffer
					.push('<col width="30" /><col/><col width="130" /><col width="60" /><col width="100" /><col width="100" />');
		} else {
			buffer
					.push('<col width="30" /><col/><col width="275" /><col width="80" /><col width="60" /><col width="100" />');
		}

		buffer.push('<tr>');
		if (TOP_C == 'real') {
			buffer
					.push('<th class="tc">排名</th><th class="tjA">名称</th><th>来源</th><th>上榜天数</th><th class="tr">热播趋势</th><th class="tr">播放数</th>');
		} else if (TOP_C == 'education' || TOP_C == 'clip' || TOP_C == 'music') {
			buffer
					.push('<th class="tc">排名</th><th class="tjA">名称</th><th>类型</th><th>上榜天数</th><th class="tr">热播趋势</th><th class="tr">播放数</th>');
		} else {
			buffer
					.push('<th class="tc">排名</th><th class="tjA">名称</th><th>主演</th><th>导演</th><th class="tr">热播趋势</th><th class="tr">播放数</th>');
		}

		buffer.push('</tr>');
		for (var i = 0; i < jsonLength; i++) {
			j = i + 1;
			cls = i <= 2 ? "sn snBG" : "sn";
			trCls = i == (jsonLength - 1) ? "noLine" : "";
			_tv_name = jsonData[i].tv_name;
			_name = _tv_name.length > 13
					? _tv_name.substr(0, 12) + ".."
					: _tv_name;
			if (TOP_C == 'teleplay' || TOP_C == 'comic' || TOP_C == 'korea') {
				_tv_url = '/video/sid-' + jsonData[i].sid;
			} else {
				_tv_url = '/video/vid-' + jsonData[i].vid;
			}

			_tv_count = jsonData[i].tv_count;
			_top50_day_time = jsonData[i].top50_day_time;
			// 趋势
			_tv_trend_count = parseInt(jsonData[i].tv_trend_count * 100);
			var _trend_count
			if (_tv_trend_count == -100000 || _tv_trend_count == 0) {
				_trend_count = "&nbsp;";
				clsA = "trend";
			} else {
				_trend_count = _tv_trend_count + "%";
				if (_tv_trend_count > 0) {
					clsA = "trend up";
				} else {
					clsA = "trend down";
				}
			}

			if (TOP_C == 'real' || TOP_C == 'education' || TOP_C == 'clip'
					|| TOP_C == 'music') {
				if (TOP_C == 'education' || TOP_C == 'clip' || TOP_C == 'music') {
					var _tv_desc = "", _tv_score = "";
					_tv_desc = jsonData[i].tv_desc;
					var _com = _tv_desc.substr(0, 49) + "…<a href=\"" + _tv_url
							+ "\" rel=\"e:xtv,na\">[详细]</a>";
					var vdCls = "tech";
					var _tv_cont_cats = jsonData[i].tv_cont_cats;
					if (jsonData[i].tv_score == '10.0') {
						_tv_score = 10;
					} else {
						_tv_score = jsonData[i].tv_score.substr(0, 3);
					}
					buffer.push('<tr class="' + trCls + '">');
					buffer.push('<td><span class="' + cls + '">' + j
							+ '</span></td>');
					buffer
							.push('<td class="tjA f14"><span class="popPos"><a href="'
									+ _tv_url
									+ '" rel="e:xtv,na" class="name">'
									+ _name + '</a>');
					buffer
							.push('<div class="popInfo" style="display:none"><div class="popBG"></div><div class="popLay">');

					buffer.push('<h4><strong><a href="' + _tv_url
							+ '" rel="e:xtv,na">' + _tv_name
							+ '</a></strong></h4>');
					buffer.push('<dl>');
					buffer.push('<dt>类型：' + _avsStr(_tv_cont_cats, 2, 7, vdCls)
							+ '</dt>');
					buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
					buffer.push('</dl>');
					buffer.push('<p>' + _com + '</p>');
					buffer.push('</div></div>');
					buffer.push('</span></td>');
					buffer.push('<td>' + _avsStr(_tv_cont_cats, 5, 7, vdCls)
							+ '</td>');
				} else {
					_tv_source = jsonData[i].tv_source.substr(0, 8);
					var _source = keyHref(_tv_source, 23, "doc");
					var _tv_cont_cats = "", _tv_desc = "", _tv_score = "";
					_tv_desc = jsonData[i].tv_desc;
					var _com = _tv_desc.substr(0, 49) + "…<a href=\"" + _tv_url
							+ "\" rel=\"e:xtv,na\">[详细]</a>";
					var vdCls = "doc";
					var _tv_cont_cats = jsonData[i].tv_cont_cats, _cont_cats = "";
					var _catsA = typeof(_tv_cont_cats) == "string"
							? (_tv_cont_cats.length > 0) ? _tv_cont_cats
									.split(",") : []
							: _tv_cont_cats;
					if (_catsA.length >= 2) {
						var _catA = _catsA[0].substr(0, 3).replace(".", "")
								+ ";";
						var _catB = _catsA[1].substr(0, 3).replace(".", "");
						_cont_cats = _catA + _catB;
					} else {
						_cont_cats = _catsA;
					}
					var _cats = keyHref(_cont_cats, 7, vdCls);
					if (jsonData[i].tv_score == '10.0') {
						_tv_score = 10;
					} else {
						_tv_score = jsonData[i].tv_score.substr(0, 3);
					}
					buffer.push('<tr class="' + trCls + '">');
					buffer.push('<td><span class="' + cls + '">' + j
							+ '</span></td>');
					buffer
							.push('<td class="tjA f14"><span class="popPos"><a href="'
									+ _tv_url
									+ '"  rel=\"e:xtv,na\" class="name">'
									+ _name
									+ '</a>');
					buffer
							.push('<div class="popInfo" style="display:none"><div class="popBG"></div><div class="popLay">');
					buffer.push('<h4><strong><a href="' + _tv_url
							+ '"  rel=\"e:xtv,na\">' + _tv_name
							+ '</a></strong></h4>');
					buffer.push('<dl>');
					buffer.push('<dt>类型：' + _cats + '</dt>');
					buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
					buffer.push('</dl>');
					buffer.push('<dl>来源：' + _source + '</dl>');
					buffer.push('<p>' + _com + '</p>');
					buffer.push('</div></div>');
					buffer.push('</span></td>');
					buffer.push('<td>' + _source + '</td>');
				}

				if (_top50_day_time <= 0) {
					buffer.push('<td class="tr imgR"></td>');
				} else {
					buffer
							.push('<td class="tr imgR"><a class="dayNum">'
									+ _top50_day_time
									+ '<img src="http://www.xintaotv.com/css/default/xintao/xintaotv/pic01.gif" width="14" height="16" alt="" /></a></td>');
				}
			} else {
				// 导演
				var tmp = jsonData[i].DIRECTOR.split(";"), result = "", resultA = "";
				if (tmp.length >= 1) {
					for (var ii = 0; ii < 1; ii++) {
						result += tmp[ii] + ";"
					}
				}
				_DIRECTOR = keyHref(result, 5, null, true);
				// 主演
				var ac = strSub(jsonData[i].MAIN_ACTOR, 45, false);
				_main_actor = ac.split(";");
				if (jsonData[i].MAIN_ACTOR.length > 23)
					_main_actor = _main_actor.splice(0, _main_actor.length - 1);
				var _actor = keyHref(_main_actor, null, null);
				var _tv_cont_cats = "", _tv_year = "", _tv_desc = "", _tv_score = "", _area = "";
				_tv_area = jsonData[i].area;
				_tv_year = jsonData[i].tv_year.toString();
				_tv_desc = jsonData[i].tv_desc;
				var _com = _tv_desc.substr(0, 49) + "…<a href=\"" + _tv_url
						+ "\"  rel=\"e:xtv,na\">[详细]</a>";
				var vdCls = "movie";
				var _tv_cont_cats = jsonData[i].tv_cont_cats, _cont_cats = "";
				var _catsA = typeof(_tv_cont_cats) == "string"
						? (_tv_cont_cats.length > 0)
								? _tv_cont_cats.split(",")
								: []
						: _tv_cont_cats;
				if (_catsA.length >= 2) {
					var _catA = _catsA[0].substr(0, 3).replace(".", "") + ";";
					var _catB = _catsA[1].substr(0, 3).replace(".", "");
					_cont_cats = _catA + _catB;
				} else {
					_cont_cats = _catsA;
				}
				var _cats = keyHref(_cont_cats, 7, vdCls);
				if (jsonData[i].tv_score == '10.0') {
					_tv_score = 10;
				} else {
					_tv_score = jsonData[i].tv_score.substr(0, 3);
				}
				buffer.push('<tr class="' + trCls + '">');
				buffer.push('<td><span class="' + cls + '">' + j
						+ '</span></td>');
				buffer
						.push('<td class="tjA f14"><span class="popPos"><a href="'
								+ _tv_url
								+ '"  rel=\"e:xtv,na\" class="name">'
								+ _name + '</a>');
				buffer
						.push('<div class="popInfo" style="display:none"><div class="popBG"></div><div class="popLay">');
				buffer
						.push('<h4><strong><a href="' + _tv_url
								+ '"  rel=\"e:xtv,na\">' + _tv_name
								+ '</a></strong></h4>');
				buffer.push('<dl>');
				buffer.push('<dt>类型：' + _cats + '</dt>');
				buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
				buffer.push('</dl>');
				buffer.push('<dl>');
				buffer.push('<dt>产地：' + keyHref(_tv_area, 4, vdCls) + '</dt>');
				buffer
						.push('<dd>年代：' + keyHref(_tv_year, 15, "year")
								+ '</dd>');
				buffer.push('</dl>');
				buffer.push('<p>' + _com + '</p>');
				buffer.push('</div></div>');
				buffer.push('</span></td>');
				buffer.push('<td>' + _actor + '</td>');
				buffer.push('<td class="tl">' + _DIRECTOR + '</td>');
				// if (_top50_day_time <= 0) {
				// buffer.push('<td class="tr imgR"></td>');
				// } else {
				// buffer
				// .push('<td class="tr imgR"><a class="dayNum">'
				// + _top50_day_time
				// + '<img
				// src="http://www.xintaotv.com/css/default/xintao/xintaotv/pic01.gif"
				// width="14" height="16" alt="" /></a></td>');
				// }
			}

			buffer.push('<td class="tr"><span class="' + clsA + '">'
					+ _trend_count + '</span></td>');
			buffer.push('<td class="tr">' + _tv_count + '</td>');
			buffer.push('</tr>');
		}
		buffer.push('</table>');
		str = buffer.join('');
		if (str) {
			$('#' + o).html(str);
		}
		buffer = null;
		popFun(o);
	} catch (e) {
	}
}
function changeDada(key, date, dataId) {
	var linkStr;
	switch (date) {
		case "day" :
			linkStr = "phb_" + key + "_day_50";
			break;
		case "week" :
			linkStr = "phb_" + key + "_week_50";
			break;
		case "month" :
			linkStr = "phb_" + key + "_month_50";
			break;
		case "total" :
			linkStr = "phb_" + key + "_total_50";
			break;
		default :
			linkStr = key
	}
	$.ajax({
				type : "GET",
				url : (((TOP_C == 'zongyi' || TOP_C == 'clip' || TOP_C == 'music')
						? "http://v.tv.sohu.com/frag/vrs_inc/"
						: "http://tv.sohu.com/frag/vrs_inc/")
						+ linkStr + ".js"),
				success : function() {
					if (TOP_C == 'zongyi') {
						lookZongyiRank(linkStr, dataId);
					} else if (TOP_C == 'mvscore' || TOP_C == 'tvscore'
							|| TOP_C == 'comicscore') {
						scoreRank(linkStr, dataId);
					} else {
						lookRank(linkStr, dataId);
					}
				},
				dataType : "script",
				cache : true,
				scriptCharset : 'gbk'
			});

}

function lookZongyiRank(jsonStr, o) {
	try {
		var str = "", j, cls, clsA, trCls, jsonData, jsonLength = 0, _tv_name = "", _tv_count = "", _tv_url = "", _tv_trend_count = "", _tv_source = "", _top50_day_time = "";
		jsonData = eval('(' + jsonStr + ')').videos;
		jsonLength = jsonData.length > 50 ? 50 : jsonData.length;
		var buffer = [];
		buffer
				.push('<table width="750" border="0" cellpadding="0" cellspacing="0">');
		buffer
				.push('<col width="30" /><col/><col width="170" /><col width="60" /><col width="100" />');
		buffer.push('<tr>');
		buffer
				.push('<th class="tc">排名</th><th class="tjA">名称</th><th>栏目</th><th class="tr">热播趋势</th><th class="tr">播放数</th>');
		buffer.push('</tr>');
		for (var i = 0; i < jsonLength; i++) {
			j = i + 1;
			cls = i <= 2 ? "sn snBG" : "sn";
			trCls = i == (jsonLength - 1) ? "noLine" : "";
			_tv_name = jsonData[i].tv_name;
			_name = strSub(_tv_name, 36, true);
			_tv_url = '/video/vid-' + jsonData[i].vid;
			_tv_count = jsonData[i].tv_count;
			_top50_day_time = jsonData[i].top50_day_time;
			_tv_trend_count = parseInt(jsonData[i].tv_trend_count * 100);
			var _trend_count
			if (_tv_trend_count == -100000 || _tv_trend_count == 0) {
				_trend_count = "&nbsp;";
				clsA = "trend";
			} else {
				_trend_count = _tv_trend_count + "%";
				if (_tv_trend_count > 0) {
					clsA = "trend up";
				} else {
					clsA = "trend down";
				}
			}
			var _tv_desc = "", _tv_score = "";
			_tv_desc = jsonData[i].tv_desc;
			var _com = _tv_desc.substr(0, 49) + "…<a href=\"" + _tv_url
					+ "\"  rel=\"e:xtv,na\">[详细]</a>";
			var vdCls = "variety";
			var _tv_cont_cats = jsonData[i].tv_cont_cats;
			if (jsonData[i].tv_score == '10.0') {
				_tv_score = 10;
			} else {
				_tv_score = jsonData[i].tv_score.substr(0, 3);
			}
			var _tv_subject = jsonData[i].tv_subject;
			var _tv_presenter = jsonData[i].tv_presenter;
			buffer.push('<tr class="' + trCls + '">');
			buffer.push('<td><span class="' + cls + '">' + j + '</span></td>');
			buffer.push('<td class="tjA f14"><span class="popPos"><a href="'
					+ _tv_url + '"  rel=\"e:xtv,na\" class="name">' + _name
					+ '</a>');
			buffer
					.push('<div class="popInfo" style="display:none"><div class="popBG"></div><div class="popLay">');
			buffer.push('<h4><strong><a href="' + _tv_url + '"  rel=\"e:xtv,na\">'
					+ _tv_name + '</a></strong></h4>');
			buffer.push('<dl>');
			buffer.push('<dt>主持：' + _avsStr(_tv_presenter, 2, 7, vdCls)
					+ '</dt>');
			buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
			buffer.push('</dl>');
			buffer
					.push('<dl>栏目：' + keyHref(_tv_subject, null, vdCls)
							+ '</dl>');
			buffer.push('<p>' + _com + '</p>');
			buffer.push('</div></div>');
			buffer.push('</span></td>');
			buffer.push('<td>' + keyHref(_tv_subject, null, vdCls) + '</td>');
			// if (_top50_day_time <= 0) {
			// buffer.push('<td class="tr imgR"></td>');
			// } else {
			// buffer
			// .push('<td class="tr imgR">'
			// + _top50_day_time
			// + '<img
			// src="http://www.xintaotv.com/css/default/xintao/xintaotv/pic01.gif"
			// width="14" height="16" alt="" /></td>');
			// }
			buffer.push('<td class="tr"><span class="' + clsA + '">'
					+ _trend_count + '</span></td>');
			buffer.push('<td class="tr">' + _tv_count + '</td>');
			buffer.push('</tr>');
		}
		buffer.push('</table>');
		str = buffer.join('');
		if (str) {
			$('#' + o).html(str);
		}
		buffer = null;
		popFun(o);
	} catch (e) {
	}
}
function scoreRank(jsonStr, o) {
	try {
		var str = "", j, cls, clsA, trCls, jsonData, jsonLength = 0, _tv_name = "", _tv_count = "", _tv_url = "", _tv_score = "", _main_actor = "", _tv_voters = "";
		jsonData = eval('(' + jsonStr + ')').videos;
		jsonLength = jsonData.length > 50 ? 50 : jsonData.length;
		var buffer = [];
		buffer
				.push('<table width="750" border="0" cellpadding="0" cellspacing="0">');
		buffer
				.push('<col width="30" /><col /><col width="270" /><col width="100" /><col width="110" />');
		buffer.push('<tr>');
		buffer
				.push('<th class="tc">排名</th><th class="tjA">名称</th><th>主演</th><th>导演</th><th>评分</th>');
		buffer.push('</tr>');
		for (var i = 0; i < jsonLength; i++) {
			j = i + 1;
			cls = i == 0 ? "sn snBG" : "sn";
			trCls = i == (jsonLength - 1) ? "noLine" : "";
			_tv_name = jsonData[i].tv_name;
			_name = _tv_name.length > 16
					? _tv_name.substr(0, 15) + ".."
					: _tv_name;
			_tv_url = '/video/vid-' + jsonData[i].vid;
			_tv_voters = jsonData[i].voters;
			if (jsonData[i].tv_score == '10.0') {
				_tv_score = 10;
			} else {
				_tv_score = jsonData[i].tv_score.substr(0, 3);
			}
			var ac = strSub(jsonData[i].MAIN_ACTOR, 45, false);
			_main_actor = ac.split(";");
			if (jsonData[i].MAIN_ACTOR.length > 23)
				_main_actor = _main_actor.splice(0, _main_actor.length - 1);
			// _main_actor = jsonData[i].MAIN_ACTOR;
			var _actor = keyHref(_main_actor, null, null);
			var tmp = jsonData[i].DIRECTOR.split(";"), result = "";
			if (tmp.length >= 1) {
				for (var ii = 0; ii < 1; ii++) {
					result += tmp[ii] + ";"
				}
			}
			_DIRECTOR = keyHref(result, 5, null, true);
			var _tv_cont_cats = "", _tv_year = "", _tv_desc = "", _tv_area = "";
			_tv_area = jsonData[i].area;
			_tv_year = jsonData[i].tv_year.toString();
			_tv_desc = jsonData[i].tv_desc;
			var _com = _tv_desc.substr(0, 49) + "…<a href=\"" + _tv_url
					+ "\"  rel=\"e:xtv,na\">[详细]</a>";
			var vdCls = "movie";
			var _tv_cont_cats = jsonData[i].tv_cont_cats, _cont_cats = "";
			var _catsA = typeof(_tv_cont_cats) == "string"
					? (_tv_cont_cats.length > 0)
							? _tv_cont_cats.split(",")
							: []
					: _tv_cont_cats;
			if (_catsA.length >= 2) {
				var _catA = _catsA[0].substr(0, 3).replace(".", "") + ";";
				var _catB = _catsA[1].substr(0, 3).replace(".", "");
				_cont_cats = _catA + _catB;
			} else {
				_cont_cats = _catsA;
			}
			var _cats = keyHref(_cont_cats, 7, vdCls);
			buffer.push('<tr class="' + trCls + '">');
			buffer.push('<td><span class="' + cls + '">' + j + '</span></td>');
			buffer.push('<td class="tjA f14"><span class="popPos"><a href="'
					+ _tv_url + '"  rel=\"e:xtv,na\" class="name">' + _name
					+ '</a>');
			buffer
					.push('<div class="popInfo" style="display:none"><div class="popBG"></div><div class="popLay">');
			buffer.push('<h4><strong><a href="' + _tv_url + '" rel=\"e:xtv,na\">'
					+ _tv_name + '</a></strong></h4>');
			buffer.push('<dl>');
			buffer.push('<dt>类型：' + _cats + '</dt>');
			buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
			buffer.push('</dl>');
			buffer.push('<dl>');
			buffer.push('<dt>产地：' + keyHref(_tv_area, 4, vdCls) + '</dt>');
			buffer.push('<dd>年代：' + keyHref(_tv_year, 15, "year") + '</dd>');
			buffer.push('</dl>');
			buffer.push('<p>' + _com + '</p>');
			buffer.push('</div></div>');
			buffer.push('</span></td>');
			buffer.push('<td>' + _actor + '</td>');
			buffer.push('<td class="tl">' + _DIRECTOR + '</td>');
			buffer.push('<td><span class="red">' + _tv_score + '</span> ('
					+ _tv_voters + '人评分)</td>');
			buffer.push('</tr>');
		}
		buffer.push('</table>');
		str = buffer.join('');
		if (str) {
			$('#' + o).html(str);
		}
		buffer = null;
		popFun(o);
	} catch (e) {
	}

}

// 数据链接

var hotjsonpath = "http://tv.sohu.com/frag/vrs_inc/";

var hotjsonpathV = "http://v.tv.sohu.com/frag/vrs_inc/";

// 观看数据

var lookRankAll = function(jsonStr, o) {
	// try{
	var str = "", j, cls, clsA, jsonData, jsonLength = 0, _tv_name = "", _tv_count = "", _tv_url = "", _tv_trend_count = "";
	jsonData = eval('(' + jsonStr + ')').videos;
	jsonLength = jsonData.length > 10 ? 10 : jsonData.length;
	var buffer = [];
	buffer
			.push('<table width="233" border="0" cellpadding="0" cellspacing="0">');
	buffer
			.push('<col width="22" /><col width="97"/><col width="60"/><col width="54" />');
	for (var i = 0; i < jsonLength; i++) {
		j = i + 1;
		cls = i == 0 ? "sn snBG" : "sn";
		_tv_name = jsonData[i].tv_name;
		_name = _tv_name.length > 8 ? _tv_name.substr(0, 7) + ".." : _tv_name;
		_name_ = _tv_name.length > 21
				? _tv_name.substr(0, 20) + ".."
				: _tv_name;
		if (o == 'tv_data' || o == 'dhp_data' || o == 'hanju_data') {
			_tv_url = '/video/sid-' + jsonData[i].sid;
		} else {
			_tv_url = '/video/vid-' + jsonData[i].vid;
		}
		_tv_count = jsonData[i].tv_count;
		_tv_trend_count = parseInt(jsonData[i].tv_trend_count * 100);
		var _trend_count
		if (_tv_trend_count == -100000 || _tv_trend_count == 0) {
			_trend_count = "&nbsp;";
			clsA = "trend";
		} else {
			_trend_count = _tv_trend_count + "%";
			if (_tv_trend_count > 0) {
				clsA = "trend up";
			} else {
				clsA = "trend down";
			}
		}
		var _tv_cont_cats = "", _tv_year = "", _tv_desc = "", _area = "", vdCls = "", _tv_score = "";
		_tv_area = jsonData[i].area;
		_tv_year = jsonData[i].tv_year.toString();
		_tv_desc = jsonData[i].tv_desc;
		var _com = _tv_desc.substr(0, 49) + "…<a href=\"" + _tv_url
				+ "\"  rel=\"e:xtv,na\">[详细]</a>";
		if (jsonData[i].tv_score == '10.0') {
			_tv_score = 10;
		} else {
			_tv_score = jsonData[i].tv_score.substr(0, 3);
		}
		switch (o) {
			case "mv_data" :
				vdCls = "movie";
				break;
			case "tv_data" :
				vdCls = "tv";
				break;
			case "dhp_data" :
				vdCls = "comic";
				break;
			case "hanju_data" :
				vdCls = "tv";
				break;
			case "doc_data" :
				vdCls = "doc";
				break;
			case "zongyi_data" :
				vdCls = "variety";
				break;
			case "ph_data" :
				vdCls = "clip";
				break;
			case "music_data" :
				vdCls = "mtv";
				break;
		}
		var _tv_cont_cats = jsonData[i].tv_cont_cats, _cont_cats = "";
		var _catsA = typeof(_tv_cont_cats) == "string"
				? (_tv_cont_cats.length > 0) ? _tv_cont_cats.split(",") : []
				: _tv_cont_cats;
		if (_catsA.length >= 2) {
			var _cont_cats = _catsA[0].substr(0, 3).replace(".", "") + ";"
					+ _catsA[1].substr(0, 3).replace(".", "");
			var _cats = keyHref(_cont_cats, 7, vdCls);
		} else {
			var _cats = keyHref(_catsA, 7, vdCls);
		}
		var _tv_set_total = "", _tv_set_now = "", _set = "";
		_tv_set_total = jsonData[i].tv_set_total;
		_tv_set_now = jsonData[i].tv_set_now;
		if (o == "mv_data" || o == "doc_data" || o == "zongyi_data"
				|| o == "ph_data" || o == "music_data") {
			_set = "";
		} else if (vdCls == "comic" && _tv_set_total == 1) {
			_set = "";
		} else {
			if (_tv_set_total <= _tv_set_now) {
				_set = "(共" + _tv_set_total + "集)";
			} else {
				_set = "(共" + _tv_set_total + "集，更新至" + _tv_set_now + "集)";
			}
		}
		buffer.push('<tr>');
		buffer.push('<td><span class="' + cls + '">' + j + '</span></td>');
		buffer.push('<td><span class="popPos"><a href="' + _tv_url
				+ '"  rel=\"e:xtv,na\">' + _name + '</a>');
		buffer
				.push('<div class="popInfo" style="display:none"><div class="popBG"></div><div class="popLay">');
		buffer.push('<h4><strong><a href="' + _tv_url + '"  rel=\"e:xtv,na\">'
				+ _name_ + '</a></strong>' + _set + '</h4>');
		if (vdCls == "doc") {
			_tv_source = jsonData[i].tv_source;
			var _source = keyHref(_tv_source, 23, vdCls);
			buffer.push('<dl>');
			buffer.push('<dt>类型：' + _cats + '</dt>');
			buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
			buffer.push('</dl>');
			buffer.push('<dl>来源：' + _source + '</dl>');
		} else if (vdCls == "variety") {
			var _tv_subject = jsonData[i].tv_subject;
			var _tv_presenter = jsonData[i].tv_presenter;
			var _presenter = typeof(_tv_presenter) == "string"
					? (_tv_presenter.length > 0)
							? _tv_presenter.split(";")
							: []
					: _tv_presenter;
			if (_presenter.length >= 2) {
				var _presenter_ = _presenter[0].substr(0, 3).replace(".", "")
						+ ";" + _presenter[1].substr(0, 3).replace(".", "");
			} else {
				var _presenter_ = _tv_presenter;
			}
			buffer.push('<dl>');
			buffer
					.push('<dt>主持：' + keyHref(_presenter_, null, vdCls)
							+ '</dt>');
			buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
			buffer.push('</dl>');
			buffer
					.push('<dl>栏目：' + keyHref(_tv_subject, null, vdCls)
							+ '</dl>');
		} else if (vdCls == "movie" || vdCls == "tv" || vdCls == "comic") {
			buffer.push('<dl>');
			buffer.push('<dt>类型：' + _cats + '</dt>');
			buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
			buffer.push('</dl>');
			buffer.push('<dl>');
			buffer.push('<dt>产地：' + keyHref(_tv_area, 4, vdCls) + '</dt>');
			buffer.push('<dd>年代：' + keyHref(_tv_year, 15, "year") + '</dd>');
			buffer.push('</dl>');
		} else {
			buffer.push('<dl>');
			buffer.push('<dt>类型：' + _cats + '</dt>');
			buffer.push('<dd>评分：<b>' + _tv_score + '</b>分</dd>');
			buffer.push('</dl>');
		}
		buffer.push('<p>' + _com + '</p>');
		buffer.push('</div></div>');
		buffer.push('</span></td>');
		buffer.push('<td class="tr">' + _tv_count + '</td>');
		buffer.push('<td class="tr"><span class="' + clsA + '">' + _trend_count
				+ '</span></td>');
		buffer.push('</tr>');
	}
	buffer.push('</table>');
	str = buffer.join('');
	if (str) {
		$('#' + o).html(str);
	}
	popFun(o);
	buffer = null;
	// }catch(e){}
}
function changeDadaAll(key, date, dataId) {
	var linkStr;
	switch (date) {
		case "day" :
			linkStr = "phb_" + key + "_day_10";
			break;
		case "week" :
			linkStr = "phb_" + key + "_week_10";
			break;
		case "month" :
			linkStr = "phb_" + key + "_month_10";
			break;
		case "total" :
			linkStr = "phb_" + key + "_total_10";
			break;
		default :
			linkStr = key
	}
	$.ajax({
				type : "GET",
				url : (((date == "v")
						? "http://v.tv.sohu.com/frag/vrs_inc/"
						: "http://tv.sohu.com/frag/vrs_inc/")
						+ linkStr + ".js"),
				success : function() {
					lookRankAll(linkStr, dataId);
				},
				dataType : "script",
				cache : true,
				scriptCharset : 'gbk'
			});
}
$(function() {
			if (TOP_C == '') {
				$('.menu .top-ul li').click(function() {
							var value = $(this).attr('data-value');
							if (value) {
								value = value.split(',');
								$(this).parent().find('li').removeClass('libg');
								$(this).addClass('libg');
								changeDadaAll(value[0], value[1], value[2]);
							}
						});
				$('.menu .top-ul').each(function() {
							$(this).find('li:first').click();
						});
			} else {
				$('.menu .top-ul li').click(function() {
					var value = $(this).attr('data-value');
					if (value) {
						$('.turn .top-ul li[data-value="' + value + '"]')
								.click();
					}
				});
				$('.turn .top-ul li').click(function() {
					var value = $(this).attr('data-value');
					if (value) {
						$('.menu .top-ul li').eq($(this).parent()
								.attr('data-value')).addClass('libg')
								.siblings().removeClass('libg');
						value = value.split(',');
						$(this).parent().find('li').removeClass('libg');
						$(this).addClass('libg');
						$('.turn').hide();
						$(this).parents('.turn').show();
						changeDada(value[0], value[1], value[2]);
					}
				});
				autoMenu(searchMark);

			}
		});
