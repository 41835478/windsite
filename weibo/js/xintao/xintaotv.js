function xtvRedirect(b, c) {
	if (document.all) {
		var e = document.createElement("a");
		e.onclick = null, e.href = b, c && (e.target = c), document.body
				.appendChild(e), e.click();
	} else if (c)
		var f = window.open(b);
	else
		location.href = b;
}
function xtvSearch(c, key, cat, area, year, cs, age, target) {
	$query = [];
	$query.push({
				'k' : 'key',
				'v' : key ? key.replace(/-/gi, ' ') : ''
			});
	$query.push({
				'k' : 'c',
				'v' : c
			});
	$query.push({
				'k' : 'tvType',
				'v' : ''
			});
	$query.push({
				'k' : 'cat',
				'v' : cat
			});
	$query.push({
				'k' : 'area',
				'v' : area
			});
	$query.push({
				'k' : 'year',
				'v' : year
			});
	$query.push({
				'k' : 'cs',
				'v' : cs
			});
	$query.push({
				'k' : 'age',
				'v' : age
			});
	$query.push({
				'k' : 'language',
				'v' : ''
			});
	// 保留10个扩展参数
	$query.push({
				'k' : 'extra_1',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_2',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_3',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_4',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_5',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_6',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_7',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_8',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_9',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_10',
				'v' : ''
			});
	// 扩展参数结束
	$query.push({
				'k' : 'fee',
				'v' : ''
			});
	$query.push({
				'k' : 'o',
				'v' : 3
			});
	$query.push({
				'k' : 'page_no',
				'v' : 1
			});
	// 显示数量
	$query.push({
				'k' : 'show_num',
				'v' : 40
			});
	var url = convertSearchUrl($query);
	xtvRedirect('/video.search' + url, target);
}
function xtvSearch_Key(c, key, target) {
	xtvSearch(c, key, '', '', '', '', '', target);
}
function xtvSearch_Cat(c, cat, target) {
	xtvSearch(c, '', cat, '', '', '', '', target);
}
function xtvSearch_Area(c, area, target) {
	xtvSearch(c, '', '', area, '', '', '', target);
}
function xtvSearch_Year(c, year, target) {
	xtvSearch(c, '', '', '', year, '', '', target);
}
function xtvSearch_Cs(c, cs, target) {
	xtvSearch(c, '', '', '', '', cs, '', target);
}
function xtvSearch_Age(c, age, target) {
	xtvSearch(c, '', '', '', '', '', age, target);
}

var isIE6 = (document.all) ? true : false;
var initFloat = function(o, op) {
	if (top != self) {// 如果是嵌入淘宝，则无法浮动跟随
		return;
	}
	var x = op.x || 0;
	var y = op.y || 0;
	var z = op.z || 0;
	if (x <= 0 || y <= 0)
		return;
	if (isIE6) {
		$(window).scroll(function() {
					var _y = $(document).scrollTop();
					if (_y >= y) {
						o.css({
									'position' : 'absolute',
									'top' : _y - z
								});
					} else {
						o.css({
									'position' : 'static'
								});
					}
				});
	} else {
		$(window).scroll(function() {
					if ($(document).scrollTop() >= y) {
						o.css({
									'position' : 'fixed',
									'top' : 0
								});
					} else {
						o.css({
									'position' : 'static'
								});
					}
				});
	}
}
function mkXtvUrl(url) {
	if (url) {
		var urls = url.split('/');
		var params = [];
		if (urls.length > 2) {
			for (var i = 2; i < urls.length; i++) {
				params.push(urls[i].replace('-', '='));
			}
		}
		var ps = '';
		if (params.length > 0) {
			ps = '&' + params.join('&');
		}
		return 'http://yingyong.taobao.com/show.htm?app_id=211001&m=' + urls[1]
				+ ps;
	}
}
$(function() {
	var historyLaters = {};
	$('#gHistoryBt').hover(function() {
				if (historyLaters['historyTimer']) {
					historyLaters['historyTimer'].cancel();
				}
				showHistory();
			}, function() {
				historyLaters['historyTimer'] = $.later(200, self, function() {
							hideHistory();
						});
			});
	$('#videoHis').hover(function() {
				if (historyLaters['historyTimer']) {
					historyLaters['historyTimer'].cancel();
				}
				if (historyLaters['historyHisTimer']) {
					historyLaters['historyHisTimer'].cancel();
				}
				showHistory();
			}, function() {
				historyLaters['historyHisTimer'] = $.later(200, self,
						function() {
							hideHistory();
						});
			});
	function showHistory() {
		$('#gHistoryBt').addClass('aHisOver');
		$('#videoHis').show();
	}
	function hideHistory() {
		$('#gHistoryBt').removeClass('aHisOver');
		$('#videoHis').hide();
	}
	$('#videoHis .record-bd li').hover(function() {
				$(this).addClass('on').siblings().removeClass('on');
			});
	$('#showClearHis').click(function() {
		var confirm = Xwb.ui.MsgBox.confirm('确认清空历史记录', '您确认清空历史记录吗？',
				function(id) {
					if (id == 'ok') {
						$('#videoHis .record-bd li').remove();
						$('#videoHis .record-bd ul')
								.append('<li class="lastnl" style="border-bottom:medium none;">您目前还没有观看过视频节目！</li>');
						$.post('/xintaotv.clearHistory', {}, function(data) {
									if (data == '200') {
									}
								});
					}
				});
	});
	$('#videoHis .record-bd a.icon-cls').click(function() {
		var self = $(this);
		self.parents('li:first').remove();
		if ($('#videoHis .record-bd li').length == 0) {
			$('#videoHis .record-bd ul')
					.append('<li class="lastnl" style="border-bottom:medium none;">您目前还没有观看过视频节目！</li>');
		}
		$.post('/xintaotv.clearHistory', {
					'id' : $(this).attr('data-id')
				}, function(data) {
					if (data == '200') {
					}
				});
	});
});
(function(X, $) {
	var FALSE = false, TRUE = true;
	var getCfg = X.getCfg, doc = document, Req = X.request, Util = X.util, T = X.ax.Tpl, Box = X.ui.MsgBox, Pagelet = X.ax.Pagelet, getText = X.lang.getText;
	var mod = X.mod;
	X.use('action')/**
					 * @class Xwb.mod.PageActions 公共action处理
					 * @static
					 */

			/**
			 * @event xtv 判断打开方式
			 * @param {String}
			 *            [m] 弹出收藏
			 */
			.reg('xtv', function(e) {
				// top.location.href="";
				// var isModule = X.getCfg('XTTV_IS_MODULE');
				if (top != self) {
					var href = $(e.src).attr('href');
					if (href && href != ''
							&& href.indexOf('yingyong.taobao.com') == -1) {
						$(e.src).attr('target', '_blank').attr('href',
								mkXtvUrl(href));
					}
				}
				e.prevented = false;
				return true;
			});
	X.use('pipeMgr').reg('xintaoTv.tvJuqings', function() {
		return new Pagelet({
					onViewReady : function(cfg) {
						var self = this.getUI();
						self.jq('#J_TvJuqingPage a').click(function() {
							if (!$(this).hasClass('current')) {
								$(this).addClass('current').siblings()
										.removeClass('current');
								self.jq('.pagecont').addClass('hidden')
										.eq($(this).index())
										.removeClass('hidden');
							}
						});
						self.jq('.listJs .bti a').hover(function() {
									$(this).attr('class', 'btns9 btns9Over');
								}, function() {
									$(this).attr('class', 'btns9 btns9Out');
								});
					}
				});
	}).reg('xintaoTv.topItem', function() {
		return new Pagelet({
			onViewReady : function(cfg) {
				var self = this.getUI();
				KISSY.use("dom,event,anim,switchable,datalazyload", function(S,
								DOM, Event, Anim, Switchable) {
							var Slide = Switchable.Slide, Easing = Anim.Easing;
							S.ready(function(S) {
										// 通过DOM元素新建Slide
										var slide = new Slide(
												self.jq('.topx')[0], {
													markupType : 1,
													contentCls : 'topx-bd',
													navCls : 'topx-hd-ol',
													activeTriggerCls : 'hover',
													effect : 'scrollx',
													easing : Easing.easeOutStrong,
													autoplay : true,
													interval : 8,
													lazyDataType : 'img'
												});
									});
						});

			}
		});
	}).reg('xintaoTv.viewsTop10', function() {
		return new Pagelet({
					onViewReady : function(cfg) {
						var self = this.getUI();
						self.jq('.menuA li').hover(function() {
							$(this).addClass('now').siblings()
									.removeClass('now');
							self.jq('.snList ul:eq(' + $(this).index() + ')')
									.removeClass('hidden').siblings()
									.addClass('hidden');
						}, function() {
						});
					}
				});
	}).reg('xintaoTv.tvSet', function() {
		return new Pagelet({
					onViewReady : function(cfg) {
						var play = $('#hisPlay');
						if (play.length == 1) {
							var href = this.getUI()
									.jq('#similarLists li:first a:first')
									.attr('href');
							play.attr('href', href).text($('#J_TvSetTip')
									.text());
							$('#picFocus a:first').attr('href', href);
						}
						KISSY.use('datalazyload', function(S, DataLazyload) {
									S.ready(function(S) {
												var dataLazyload = DataLazyload();
											});
								});
					}
				});
	}).reg('xintaoTv.playSet', function() {
		return new Pagelet({
					onViewReady : function(cfg) {
						var uls = this.getUI().jq('.ks-switchable-content ul');
						if (uls.length > 1) {
							this.getUI().jq('.ks-switchable-nav').show();
							var index = this.getUI()
									.jq('.ks-switchable-nav li.ks-active')
									.index();
							KISSY.use("switchable", function(S, Switchable) {
										// 通过DOM元素新建旋转木马
										var tiny_slide = new Switchable.Carousel(
												'#allist', {
													effect : 'scrollx',
													easing : 'easeOutStrong',
													circular : true,
													autoplay : false,
													prevBtnCls : 'fi_prev',
													nextBtnCls : 'fi_next',
													triggerType : 'click'
												});
										tiny_slide.switchTo(index);
									});
						} else {
							this.getUI().jq('.fi_btn a').css('background',
									'none');
						}
					}
				});
	}).reg('xintaoTv.focus', function() {
		return new Pagelet({
			onViewReady : function(cfg) {
				var self = this.getUI();
				KISSY.use("dom,event,anim,switchable,datalazyload", function(S,
						DOM, Event, Anim, Switchable) {
					var Slide = Switchable.Slide, Easing = Anim.Easing;
					S.ready(function(S) {
						// 获取DOM元素
						var descList = self.jq('.fi_note');
						var navList = self.jq('.fi_tab_ li');
						var pointer = self.jq('.fi_pointer');
						var play = self.jq('.fi_btnplay');
						// 通过DOM元素新建Slide
						var slide = new Slide('#mFocus1', {
									contentCls : 'fi_ct',
									navCls : 'fi_tab_',
									activeTriggerCls : 'fi_now',
									effect : 'scrollx',
									easing : Easing.easeOutStrong,
									autoplay : true,
									lazyDataType : 'img'
								});

						// 添加事件，更多事件参考API
						slide.on('beforeSwitch', function(ev) {
									var current = descList.eq(ev.toIndex);
									pointer.css('left', navList.eq(ev.toIndex)
													.position().left
													+ 5);
									descList.addClass('hidden');
									current.removeClass('hidden');
									play.attr('href', '/video/vid-'
													+ current.attr('data-vid'));
								});
					});
				});
			}
		});
	})
})(Xwb, $);