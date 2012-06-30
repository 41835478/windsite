(function(X, $) {
	var FALSE = false, TRUE = true;
	var getCfg = X.getCfg, doc = document, Req = X.request, Util = X.util, T = X.ax.Tpl, Box = X.ui.MsgBox, Pagelet = X.ax.Pagelet, getText = X.lang.getText;
	var mod = X.mod;
	// XWB 覆盖开始
	if (typeof(Req) != 'undefined') {
		if (typeof(mod) != 'undefined') {
			/**
			 * @class Xwb.mod.shortlink 短链接解析基础类{@link Xwb.ax.Shortlink}的实例化对象，用以解析本站相关的短链接。<br/>
			 *        它添加了{@link #renderWeiboShortlink}方法，以定义微博列表单条微博短链内容的解析。
			 * @singleton
			 * @extends Xwb.ax.Shortlink
			 */
			mod.shortlink = new X.ax.Shortlink({
				/**
				 * 处理单条微博内的短链接。
				 * 
				 * @param {jQuery}
				 *            jqWeiboItem
				 * @param {Object}
				 *            weiboItemData
				 * @param {Array}
				 *            shortlinks 参见{@link #from}里shortlinks格式
				 */
				renderWeiboShortlink : function(jqWb, wbData, shortlinks) {
					var links = jqWb.find('a');
					var S = this;
					var sl, uinf, fw;
					var sz = shortlinks.length;
					var jqFw = jqWb.find('div.forward');
					var jqFeed = jqWb.find('p.feed-main');
					var jqPreview;
					links.each(function() {
						sl = S.is(this.href);
						if (sl) {
							var jq = $(this);
							// 短链信息
							uinf = shortlinks[sl];
							// 有可能为无效链接
							if (uinf) {
								// 是否来自转发
								fw = uinf[1];
								// url info
								uinf = uinf[0];
								if (uinf) {
									// TODO 处理推广链接
									var oUrl = uinf.url, isHref = false;
									if (document.domain != 'www.xintaowang.com') {
										var pidEx = /mm_\d{0,24}_\d{0,24}_\d{0,24}/gi;
										var pidEx2 = /mm%5F\d{0,24}%5F\d{0,24}%5F\d{0,24}/gi;
										var tItemEx = /http:\/\/item\.taobao\.com\/item\.htm\?id=(\d{0,24})/gi;
										// 淘宝店铺var tShopEx = //gi;
										var wItemEx = /.*(\/item\/id-\d{0,24})/gi;
										var wShopEx = /.*(\/shop\/id-.*)/gi;// 不支持nick-中文分享
										var wPosterEx = /.*(\/poster\/id-\d{0,24})/gi;
										var wTvVEx = /.*(\/tv\/vid-\d{0,24})/gi;// 视频（播放）
										var wTvBEx = /.*(\/tv\/bid-\d{0,24})/gi;// 播客（播放）
										var wTvSEx = /.*(\/tv\.set\/sid-\d{0,24})/gi;// 电视剧（剧集）
										var wXiaohuaEx = /.*(\/xiaohua\/id-\d{0,24})/gi;// 笑话
										var wGoEx = /.*(\/go\/sid-\d{0,24})/gi;// 直接访问
										var wGoNidEx = /.*(\/go\/nid-\d{0,24})/gi;// 直接访问
										if (pidEx.test(oUrl)) {// 第一步替换：PID
											uinf.url = oUrl.replace(pidEx, X
															.getPid());
											isHref = true;
										} else if (pidEx2.test(oUrl)) {// 第一步替换：PID
											uinf.url = oUrl
													.replace(pidEx2,
															X.getPid().replace(
																	'_', '%5F'));
											isHref = true;
										} else if (tItemEx.test(oUrl)) {// 第二步替换：淘宝商品
											uinf.url = oUrl.replace(tItemEx,
													'/go/nid-$1');
											isHref = true;
										} else if (wItemEx.test(oUrl)) {// 第四步替换：微购商品
											uinf.url = oUrl.replace(wItemEx,
													'$1');
											isHref = true;
										} else if (wShopEx.test(oUrl)) {// 第五步替换：微购店铺
											uinf.url = oUrl.replace(wShopEx,
													'/go/sid-$1');
											isHref = true;
										} else if (wPosterEx.test(oUrl)) {// 第六步替换：微购画报
											uinf.url = oUrl.replace(wPosterEx,
													'$1');
											isHref = true;
										} else if (wTvVEx.test(oUrl)) {// 第七步替换：微购视频
											uinf.url = oUrl.replace(wTvVEx,
													'$1');
											isHref = true;
										} else if (wTvBEx.test(oUrl)) {// 第八步替换：微购播客
											uinf.url = oUrl.replace(wTvBEx,
													'$1');
											isHref = true;
										} else if (wTvSEx.test(oUrl)) {// 第九步替换：微购电视剧（剧集）
											uinf.url = oUrl.replace(wTvSEx,
													'$1');
											isHref = true;
										} else if (wXiaohuaEx.test(oUrl)) {// 第九步替换：微购笑话
											uinf.url = oUrl.replace(wXiaohuaEx,
													'$1');
											isHref = true;
										} else if (wGoEx.test(oUrl)) {// 第十步替换：微购店铺直达
											uinf.url = oUrl
													.replace(wGoEx, '$1');
											isHref = true;
										} else if (wGoNidEx.test(oUrl)) {// 第十步替换：微购商品直达
											uinf.url = oUrl.replace(wGoNidEx,
													'$1');
											isHref = true;
										}
									}

									jq.attr('title', uinf.url);
									if (isHref) {
										var text = jq.text();
										jq.attr('href', uinf.url).text(text);
									}
									switch (uinf.type) {
										case 'music' :
											jq.addClass('ico-music-url');
											break;
										case 'video' :
											jq.addClass('ico-video-url');
											// 检测是否有preview的div，没就生成
											if (fw) {
												jqPreview = jqFw
														.find('>div.preview-img');
												if (!jqPreview.length)
													jqPreview = $(T
															.parse('PreviewBox'))
															.appendTo(jqFw);
											} else {
												jqPreview = jqFeed
														.next('div.preview-img');
												if (!jqPreview.length)
													jqPreview = $(T
															.parse('PreviewBox'))
															.insertAfter(jqFeed);
											}

											// URL在转发区->添加缩略图
											// URL在非转发并且该微博是原创 -> 添加缩略图
											if (fw || (!fw && !jqFw.length)) {
												jq.attr('rel', 'e:pv,i:'
																+ uinf.id);
												$(T.parse('VideoThumbHtml', {
															img : uinf.screen,
															id : uinf.id
														}))
														.appendTo(jqWb
																.find((fw
																		? 'div.forward '
																		: '')
																		+ 'div.preview-img'));
											}
											break;
									}
								} else
									jq.attr('title', getText('无效链接'));
							} else {
								if (__debug)
									console
											.warn('未解析链接：@'
													+ sl
													+ ' From '
													+ jq.attr('href')
													+ ',请在Xwb.ax.Shortlink.from内添加解析区域');
								jq.attr('title', jq.attr('href') || '');
							}
						}
					});
				}

			});
		}
		Req.post = function(text, fn, pic, cfg, picUrl) {
			var data = {
				text : text
			};
			if (pic)
				data.pic = pic;
			if (picUrl)// fixed by fxy060608 增加图片地址微博
				data.picurl = picUrl;
			Req.act('update', data, fn, cfg);
		}
		/**
		 * @class Xwb.mod.postUrlBox 发布微博弹出框(可指定URL)
		 * @extends Xwb.ui.Box
		 * @extends Xwb.mod.PostBase
		 * @singleton
		 */
		// 这写法是调用时才实例化
		X.reg('postUrlBox', function() {

			var inst = $.extend({}, X.mod.PostBase);

			$.extend(inst, {
						title : getText('发微博'),
						closeable : true,
						autoCenter : true,
						appendTo : doc.body,
						mask : true,
						postTitle : 'dd',
						cs : 'win-post',
						contentHtml : 'PostBoxContent',
						onViewReady : function(v) {
							this.initEx();
							// fixed
							this.jqPicUrlBox = this.jq('#J_PicUrlBox');
							this.jqPicUrl = false;
						},
						onclose : function() {
							if (this.picUrlBox) {
								this.picUrlBox.close();
							}

						},
						setPostTitle : function(v) {
							this.jq('#postTitle').html(v);
						},
						onactiontrig : function(e) {
							switch (e.data.e) {
								case 'sd' :
									this.post();
									break;
								case 'ic' :
									X.use('emotion').setSelectionHolder(
											this.selectionHolder,
											this.checkText, this).showAt(e.src);
									break;
								case 'vd' :
									X.use('videoBox').showAt(
											e.src,
											Util.getBind(this,
													'onBoxTextReturn'));
									break;
								case 'ms' :
									X.use('musicBox').showAt(
											e.src,
											Util.getBind(this,
													'onBoxTextReturn'));
									break;
								case 'tp' :
									this.insertTopic();
									break;
								// 删除已上传图片
								case 'dlp' :
									this.uploadPic = false;
									// this.jqBtnImg.cssDisplay(true);
									// this.jqForm.cssDisplay(true);
									this.$uploadBtn.cssDisplay(1);
									this.jqPhotoName.cssDisplay(false);
									this.jqInputor.focus();
									break;
								case 'tb' :// 商品 fixed by fxy060608
									X.use('itemBox').display(true);
							}
						},
						onbuttonclick : function(bid) {
							if (bid == 'ok') {
								this.post();
								// 取消对话框关闭
								return false;
							}
						},

						// override

						onSendLoad : function(e) {
							mod.PostBase.onSendLoad.call(this, e, function(e) {
										if (e.isOk() || e.getCode() == '30000') {
											this.close();
											// fix bug#334,IE下光标隐藏后不消失
											this.jqInputor[0].blur();
										}
									});
						},
						reset : function() {
							this.jqUploadTip.cssDisplay(false);
							this.jqPhotoName.cssDisplay(false);
							// this.jqBtnImg.cssDisplay(true);
							// this.jqForm.cssDisplay(true);
							this.$uploadBtn.cssDisplay(1);
							this.selectionHolder.setText(this.defText);
							this.jqForm[0].reset();
							this.uploadPic = false;
							this.checkText();
							this.sending = false;
							if (this.picUrlBox) {
								this.picUrlBox.close();
							}
							$('#xwb_pic_url').removeAttr('src');
							this.jqPicUrl = false;
							return this;
						},
						setPicUrl : function(picUrl) {
							this.jqPicUrl = picUrl;
							this.picUrlBox = X.use('picUrlBox');
							this.picUrlBox.showAt(this.jq('#xwb_btn_img'));
							$('#xwb_pic_url').attr('src',
									picUrl + '_310x310.jpg');
						},
						post : function() {
							var text = this.checkText();
							if (!text) {
								this.jqInputor.focus();
								return;
							}

							if (this.getUploader().isLoading()) {
								MB.tipWarn(getText('图片正在上传，请稍候..'));
								return;
							}

							if (this.sending) {
								MB.tipWarn(getText('正在发布,请稍候..'));
								return;
							}

							var param = $.extend({}, this.getParam());

							if (this.beforeSend) {
								var ret = this.beforeSend(text, this.uploadPic,
										param);
								if (ret === false)
									return;
								text = ret || text;
							}

							this.sending = true;
							// 传递当前页面标识_route，以返回不同HTML内容
							// /fixed by fxy060608 增加图片URL参数
							Req.post(text, Util.getBind(this, 'onSendLoad'),
									this.uploadPic, {
										data : param
									}, this.jqPicUrl);
						}
					});

			inst = X.use('Box', inst);

			X.reg('postUrlBox', inst, true);

			return inst;
		});
	}

	// XWB 覆盖结束
	window.XT = {};
	window.XT.Suggest = {};
	window.XT.Suggest.RelatedSearchCallback = function(d) {
		var related = $('#J_RelatedSearch');
		if (related.length == 1 && typeof d == "object"
				&& typeof d.result != "undefined") {
			var r = d.result;
			if (r.length > 0) {
				var strs = [];
				strs.push('<dt>你是不是想找：</dt>');
				var url = '', q = '';
				for (var i = 0; i < r.length; i++) {
					q = r[i][0];
					strs.push('<dd><a href="/items/q-' + q + '">' + q
							+ '</a></dd>');
				}
				related.append(strs.join(''));
				related.show();
			}
		}
	}

	window.XT.Suggest.FilterSearchCallback = function(d) {
		var q = $('#filterSearchKeyWord');
		if (q.length == 1 && typeof d == "object"
				&& typeof d.result != "undefined") {
			var r = d.result;
			q.data('autocompleter').filterAndShowResults(r);
		}
	}
	/**
	 * 分享
	 */
	X.addTaobaoShare = function(e) {
		var numIid = e.get('i');
		var sid = e.get('s');
		var price = e.get('p');
		var nick = e.get('n');
		var title = e.get('t');
		var text = (e.get('m'));
		var posterId = e.get('h');
		var picUrl = e.get('u');
		var box = X.use('postUrlBox');
		box.checkText = function() { // 这里强制覆盖默认的checkText方法，以修改“剩余字数提醒的文字“
			var v = $.trim(this.jqInputor.val());
			var left = Xwb.util.calWbText(v);
			this.jqWarn.html(getText('<span>' + left + '</span>')); // 修改为只显示剩余字数，超出则显示为负数
			this.jqWarn.checkClass(this.exceedCS || "out140", left < 0);
			return left >= 0 && v;
		}
		// var postTitle = e.get('t');
		// if (postTitle && postTitle == 'share') {
		box.setPostTitle(getText('分享给大家'));
		// }
		$reg = new RegExp('<span class=H>', "gm");
		$reg2 = new RegExp('</span>', "gm");
		if (text) {// 如果指了微博内容
			text = decodeURIComponent(text.replace($reg, '').replace($reg2, ''));// 解码
		} else {// 如果未指定
			if (numIid) {
				text = title.replace($reg, '').replace($reg2, '') + '，￥'
						+ price + '元，详情：http://' + X.getDomain() + '/go/nid-'
						+ numIid + '。';
			} else if (posterId) {
				text = title.replace($reg, '').replace($reg2, '')
						+ '，详情：http://' + X.getDomain() + '/poster/id-'
						+ posterId + '。';
			} else {
				text = '#' + title.replace($reg, '').replace($reg2, '') + '#';
			}
		}
		box.display(TRUE).reset().selectionHolder.setText(text || '');
		if (picUrl) {// 设置图片
			box.setPicUrl($.base64.decode(picUrl));
		}
		if (text)
			box.checkText();
		return false;
	}
	/**
	 * follow掌柜说
	 */
	X.addTaobaoFollow = function(e) {
		var followId = e.get('f');
		if (followId) {
			e.lock(1);
			var alert = Xwb.ui.MsgBox.alert('关注提示',
					'<div id="xweibo_loading" class="loading"></div>');
			$.ajax({
				type : 'POST',
				url : '/taobaoUser.followAdd',
				dataType : 'json',
				data : {
					'shop_owner_id' : followId
				},
				success : function(data) {
					if (data.errno > 0) {
						if (data.errno == 27) {
							alert.setIcon('alert');
							alert
									.setContent('<a href="/account.taobaoLogin?loginCallBack='
											+ location.href
											+ '">点击登录淘宝授权：授权后可直接关注至我的淘宝</a>');
						} else {
							alert.setIcon('alert');
							alert.setContent(data.err);
						}
					} else {
						alert.setIcon('success');
						alert.setContent(data.rst);
						var el = $(e.src);
						if (el.hasClass('addfollow-btn'))
							$(e.src)
									.replaceWith('<span class="followed-btn item-faved">已关注</span>');
					}
					e.lock(0);// 解锁
				}
			});
		}
	}
	/**
	 * 加收藏
	 */
	X.addTaobaoFav = function(e) {
		var numIid = e.get('i');
		var sid = e.get('s');
		var nick = e.get('n');
		var posterId = e.get('h');
		e.lock(1);// 锁住，防止重复点击
		if (posterId) {
			Xwb.ui.MsgBox.tipOk('即将开放画报收藏');
			e.lock(0);// 解锁
			return false;
		}
		if (nick) {
			if (X.getTaobaoNick() == nick) {
				Xwb.ui.MsgBox.tipOk('您不能收藏自己的' + (numIid ? '商品' : '店铺'));
				e.lock(0);// 解锁
				return false;
			}
		}
		var alert = Xwb.ui.MsgBox.alert('收藏提示',
				'<div id="xweibo_loading" class="loading"></div>');
		$.ajax({
			type : 'POST',
			url : '/taobaoUser.favoriteAdd',
			dataType : 'json',
			data : {
				'item_numid' : numIid ? numIid : sid,
				'collect_type' : numIid ? 'ITEM' : 'SHOP'
			},
			success : function(data) {
				if (data.errno > 0) {
					if (data.errno == 27) {
						alert.setIcon('alert');
						alert
								.setContent('<a href="/account.taobaoLogin?loginCallBack='
										+ location.href
										+ '">点击登录淘宝授权：授权后可直接收藏至我的淘宝</a>');
					} else {
						alert.setIcon('alert');
						alert.setContent(data.err);
					}
				} else {
					alert.setIcon('success');
					alert.setContent(data.rst);
					var el = $(e.src);
					if (el.hasClass('addfollow-btn'))
						$(e.src)
								.replaceWith('<span class="followed-btn item-faved">已收藏</span>');
				}
				e.lock(0);// 解锁
			}
		});
	}
	/**
	 * @class Xwb.mod.picUrlBox 图片地址，目前用于发布微博功能。
	 * @extends Xwb.ui.Box
	 * @singleton
	 */
	X.reg('picUrlBox', function() {
				var inst = X.use('Box', {
							cs : ' win-insert',
							contentHtml : 'PicUrlBoxContentHtml',
							boxOutterHtml : 'ArrowBoxBottom',
							appendTo : doc.body,
							closeable : false,
							actionMgr : true,
							contextable : false,
							onViewReady : function(v) {
								this.setCloseable(false);
								this.jq('#xwb_cls').cssDisplay(false);
							},
							showAt : function(anchor, onselect) {
								this.onselect = onselect;
								var off = $(anchor).offset();
								off.left -= 140;
								off.top += 20;
								this.offset(off).display(true);
							}
						});

				X.reg('picUrlBox', inst, true);
				return inst;
			});
	// 修订AutoComplete
	if ($.Autocompleter) {// 存在自动完成的页面才需要初始化
		$.Autocompleter.prototype.fetchData = function(value) {
			var data = this.cacheRead(value);// 缓存
			if (data) {
				this.filterAndShowResults(data);
			} else {
				$.getScript(this.makeUrl(value));
			}
		};
		$.Autocompleter.prototype.activate = function() {
			var self = this;
			// var itemSearch = self.dom.$elem.parents('form:first')
			// .find('.search-tab li.selected');
			// if (itemSearch.length == 1) {
			// var rel = itemSearch.attr('rel');
			// if ('item' != rel && 'mall' != rel)
			// return;
			// }
			var activateNow = function() {
				self.activateNow();
			};
			var delay = parseInt(this.options.delay, 10);
			if (isNaN(delay) || delay <= 0) {
				delay = 250;
			}
			if (this.keyTimeout_) {
				clearTimeout(this.keyTimeout_);
			}
			this.keyTimeout_ = setTimeout(activateNow, delay);
		};
	}

	/** 新淘网定制模块开始* */
	/**
	 * 追踪分类
	 * 
	 * @param {}
	 *            A
	 */
	X.trackCid = function(A) {
		var cid = A.attr('data-cid');
		if ((X.getIsDirect() || A.hasClass('Go')) && !A.hasClass('No')) {
			if (cid) {// 如果是商品
				A.attr('href', '/go/cid-' + cid);
			}
		}
	}
	/**
	 * 追踪关键词
	 * 
	 * @param {}
	 *            A
	 */
	X.trackKeyword = function(A) {
		var q = A.attr('data-word');
		if ((X.getIsDirect() || A.hasClass('Go')) && !A.hasClass('No')) {
			if (q) {// 如果是商品
				A.attr('href', '/go/q-'
								+ encodeURIComponent(q.replace('/', '')
										.replace('-', '')));
			}
		}
	}
	/**
	 * 追踪商品
	 * 
	 * @param {}
	 *            A
	 */
	X.trackItem = function(A) {
		var numIid = A.attr('data-nid');
		if ((X.getIsDirect() || A.hasClass('Go')) && !A.hasClass('No')) {
			if (numIid) {// 如果是商品
				A.attr('href', '/go/nid-' + numIid);
			}
			// var click = A.attr('data-click');
			// if (click) {// 如果有推广链接
			// A.attr('href', $.base64.decode(click).replace(
			// /mm_\d{0,24}_\d{0,24}_\d{0,24}/gi, X.getPid()));
			// } else {
			// if (numIid) {// 如果是商品
			// A.attr('href', 'http://item.taobao.com/item.htm?id='
			// + numIid);
			// }
			// }
		}
		// if (typeof(piwikTracker) != 'undefined') {// 追踪
		// var nicks = X.getShops();
		// var nick = A.attr('data-nick');
		// if (numIid && nicks && nicks.indexOf('[' + nick + ']') != -1) {
		// piwikTracker.setEcommerceView(numIid);
		// piwikTracker.setEcommerceView(false, false, nick);
		// }
		// }
	}
	/**
	 * 追踪店铺
	 * 
	 * @param {}
	 *            A
	 */
	X.trackShop = function(A) {
		var nick = A.attr('data-nick');
		if ((X.getIsDirect() || A.hasClass('Go')) && !A.hasClass('No')) {
			var sid = A.attr('data-sid');
			if (sid) {// 如果是商品
				A.attr('href', '/go/sid-' + sid);
			} else if (nick) {
				A.attr('href', '/go/shopnick-' + encodeURIComponent(nick));
			}
			// var click = A.attr('data-click');
			// if (click) {// 如果有推广链接
			// A.attr('href', $.base64.decode(click).replace(
			// /mm_\d{0,24}_\d{0,24}_\d{0,24}/gi, X.getPid()));
			// } else {
			// var sid = A.attr('data-sid');
			// if (sid) {// 如果是商品
			// A.attr('href', 'http://shop' + sid + '.taobao.com');
			// }
			// }
		}
		// if (typeof(piwikTracker) != 'undefined') {// 仅追踪站内店铺
		// var nicks = X.getShops();
		// if (nick && nicks && nicks.indexOf('[' + nick + ']') != -1) {
		// piwikTracker.setEcommerceView(false, false, nick);
		// }
		// }
	}
	X.trackVancl = function(A) {
		if ((X.getIsDirect() || A.hasClass('Go')) && !A.hasClass('No')) {
			var vid = A.attr('data-vid');
			if (vid) {// 如果是商品
				A.attr('href', 'http://item.vancl.com/' + vid + '.html?source='
								+ X.getVanclNick());
			}
		}
	}
	X.getDomain = function() {
		var domain = X.getCfg('XT_SITE_DOMAIN');
		if (domain != '') {
			return domain;
		}
		return document.domain;
	}
	X.getVanclNick = function() {
		var nick = X.getCfg('XT_VANCL_NICK');
		return nick !== '0' && nick;
	}
	// /获取前台淘宝登录ID
	X.getTaobaoId = function() {
		var uid = X.getCfg('taobaoId');
		return uid !== '0' && uid;
	}
	X.getSids = function() {
		var sids = X.getCfg('sids');
		return sids !== '' && sids;
	}
	X.getShops = function() {
		var shops = X.getCfg('XT_SHOPS');
		return shops !== '' && shops;
	}
	X.getTaobaoNick = function() {
		var nick = X.getCfg('taobaoNick');
		return nick !== '' && nick;
	}
	X.getIsDirect = function() {
		var isDirect = X.getCfg('XT_IS_DIRECT');
		return isDirect == 'true';
	}
	X.getIsSingle = function() {
		var isSingle = X.getCfg('XT_IS_SINGLE');
		return isSingle == 'true';
	}
	X.getIsMulti = function() {
		var isMulti = X.getCfg('XT_IS_MULTI');
		return isMulti == 'true';
	}
	X.getIsTaoke = function() {
		var isTaoke = X.getCfg('XT_IS_TAOKE');
		return isTaoke == 'true';
	}
	X.getIsVancl = function() {
		var isVancl = X.getCfg('XT_IS_VANCL');
		return isVancl == 'true';
	}
	X.getIsWeibo = function() {
		var isWeibo = X.getCfg('XT_IS_WEIBO');
		return isWeibo == 'true';
	}
	X.getPid = function() {
		var pid = X.getCfg('PID');
		return pid !== '' && pid;
	}
	X.getSpid = function() {
		var pid = X.getCfg('SPID');
		return pid !== '' && pid;
	}
	// 模板
	Xwb.ax.Tpl.reg({
		ItemBoxContent : [
				'<div class="mod-search" style="padding:0px 75px;height:73px;">',
				'<div class="search-area" style="padding-top:0px;height:70px;">',
				'<div class="tab-s1" style="margin-bottom:0px;">',
				'<span class="tab-search" rel="product" style="display:none;"><span><a href="#" data-tip="搜索  本站官方店铺  商品">本店</a></span></span>',
				'<span class="tab-search" rel="item" style="display:none;"><span><a href="#" data-tip="搜索  淘宝网  商品">商品</a></span></span><span class="tab-search" rel="poster" style="display:none;"><span><a href="#" data-tip="搜索  导购画报">画报</a></span></span>',
				// '<span class="tab-search" rel="item"
				// style="display:none;"><span><a
				// href="#" data-tip="搜索 淘宝网 商品">商品</a></span></span><span
				// class="tab-search"
				// rel="shop"
				// style="display:none;"><span><a
				// href="#" data-tip="搜索 淘宝网 店铺">店铺</a></span></span><span
				// class="tab-search"
				// rel="poster"
				// style="display:none;"><span><a
				// href="#" data-tip="搜索 导购画报">画报</a></span></span>',
				// '<span class="tab-search" rel="vancl"
				// style="display:none;"><span><a
				// href="#" data-tip="搜索 凡客诚品 商品">凡客</a></span></span>',
				'</div>',
				'<div class="search-block">',
				'<div class="search-inner">',
				'<input type="text" class="input-txt" value="" name="q"  id="J_ItemSearchQ" autocomplete="off"/>',
				'</div>',
				'<a href="#" class="s-btn skin-btn" id="J_ItemSearchButton">搜索</a>',
				'</div></div></div>',
				'<div class="box" id="J_ItemSearchBox" style="height:450px;overflow:auto;position:relative;" align="center"></div>']
				.join(''),
		PicUrlBoxContentHtml : [
				'<div class="insert-box picurl-box" id="J_PicUrlBox">',
				'<p>当前微博配图</p>',
				'<div node-type="picWrap" class="laPic_Pic"><img id="xwb_pic_url"></div>',
				'</div>'].join('')
	});
	/**
	 * @class Xwb.mod.itemBox 商品弹出框
	 * @extends Xwb.ui.Box
	 * @singleton
	 */

	// 这写法是调用时才实例化
	X.reg('itemBox', function() {
		var inst = X.use('Box', {
			actionMgr : true,
			title : '购物分享',
			closeable : true,
			autoCenter : true,
			appendTo : doc.body,
			mask : true,
			cs : 'win-item',
			contentHtml : 'ItemBoxContent',
			tips : '',
			onViewReady : function(v) {
				this.initSearch();
			},
			onactiontrig : function(e) {
				switch (e.data.e) {
					case 'tbf' :// 收藏
						X.addTaobaoFav(e);
						break;
					case 'tbs' :// 分享
						X.addTaobaoShare(e);
						break;
				}
			},
			initSearch : function() {
				var self = this;
				this.jq().css('top', 100);// 调整顶部
				var tab = this.jq('.tab-s1');
				if (X.getShops() != '' && (X.getIsSingle() || X.getIsMulti())) {// 支持本站
					tab.find('span[rel=product]').show();
				}
				if (X.getIsTaoke()) {// 支持淘宝客
					tab.find('span[rel=item]').show();
					tab.find('span[rel=shop]').show();
					tab.find('span[rel=poster]').show();
				}
				if (X.getIsVancl()) {// 支持凡客
					tab.find('span[rel=vancl]').show();
				}
				tab.find('span.tab-search a').each(function() {
							self.tips += $(this).attr('data-tip');
						});
				tab.find('a').click(function() {
					$(this).parent().parent().addClass('current').siblings()
							.removeClass('current');
					// TIPS
					var tip = $(this).attr('data-tip');
					var val = $('#J_ItemSearchQ').val();
					if (!val || self.tips.indexOf(val) != -1) {
						$('#J_ItemSearchQ').val(tip);
					}
					$('#J_ItemSearchQ').unbind('focus').unbind('blur')
							.focusText(tip);
					return false;
				});
				$('#J_ItemSearchQ').keydown(function(e) {
							var kc = e.keyCode;
							if (kc === 13)
								$('#J_ItemSearchButton').click();
						});
				tab.find('span.tab-search:visible:first a').click();// 查找第一个选中
				$('#J_ItemSearchButton').click(function() {
							self.search();
							return false;
						}).click();
			},
			search : function() {
				var tab = this.jq('.tab-s1 span.current');
				if (tab) {
					var rel = tab.attr('rel');
					if (rel == 'product') {// 站内
						this.searchProducts(1, true);
					} else if (rel == 'item') {// 商品
						this.searchItems(1, true);
					} else if (rel == 'shop') {// 店铺

					} else if (rel == 'poster') {// 画报
						this.searchPosters(1, true);
					} else if (rel == 'vancl') {// 凡客

					}
				}
			},
			// 加载商品，店铺数据
			loadItem : function() {
				var self = this;
			},
			searchPosters : function(pageNo, isDefault) {
				var self = this;
				var q = $('#J_ItemSearchQ').val();
				if (self.tips.indexOf(q) != -1) {
					q = '';
				}
				q = encodeURIComponent(q);
				var channel_ids = '', page_no = 1;
				if (!isDefault) {
					page_no = pageNo ? pageNo : $('#J_ParamPageNo').val();
					var channel = $('#J_FilterChannel a.current');
					if (channel.length == 1)
						channel_ids = channel.attr('data-cid');
				}

				$('#J_ItemSearchBox')
						.html('<div id="xweibo_loading" class="loading"></div>');
				$.get('/posters.itemBox', {
							'key_word' : q,
							'channel_ids' : channel_ids,
							'page_no' : page_no
						}, function(rst) {
							if (rst['errno'] > 0) {
								alert('获取失败:' + rst['err']);
								return;
							}
							$('#J_ItemSearchBox').html(rst['rst']);
							$('#J_FilterChannel a').click(function() {
								$(this).addClass('current').siblings()
										.removeClass('current');
								self.searchPosters(1, false);
								return false;
							});
							$('#J_ItemSearchBox .page a').click(function() {
								self.searchPosters($(this).attr('data-page'),
										false);
								return false;
							});
						});
			},
			searchItems : function(pageNo, isDefault) {
				var self = this;
				var q = $('#J_ItemSearchQ').val();
				if (self.tips.indexOf(q) != -1) {
					q = '';
				}
				q = encodeURIComponent(q);
				var order_by = '', start_price = '', end_price = '', page_no = 1, cash_ondelivery = '', mall_item = '', sevendays_return = '', guarantee = '', onemonth_repair = '', real_describe = '', start_credit = '', end_credit = '';
				if (!isDefault) {
					order_by = $('#J_FilterOrderBy a.crt').attr('data-value');
					start_price = $('#J_StartPrice').val();
					end_price = $('#J_EndPrice').val();
					page_no = pageNo ? pageNo : $('#J_ParamPageNo').val();
					cash_ondelivery = $('#checkbox_cash_ondelivery')
							.is(':checked') ? 'true' : '';
					mall_item = $('#checkbox_mall_item').is(':checked')
							? 'true'
							: '';
					sevendays_return = $('#checkbox_sevendays_return')
							.is(':checked') ? 'true' : '';
					onemonth_repair = $('#checkbox_onemonth_repair')
							.is(':checked') ? 'true' : '';
					guarantee = $('#checkbox_guarantee').is(':checked')
							? 'true'
							: '';
					real_describe = $('#checkbox_real_describe').is(':checked')
							? 'true'
							: '';
					start_credit = $('#J_StartCredit').val();
					end_credit = $('#J_EndCredit').val();

				}

				$('#J_ItemSearchBox')
						.html('<div id="xweibo_loading" class="loading"></div>');
				$.get('/items.itemBox', {
							'keyword' : q,
							'sort' : order_by,
							'start_price' : start_price,
							'end_price' : end_price,
							'page_no' : page_no,
							'cash_ondelivery' : cash_ondelivery,
							'mall_item' : mall_item,
							'sevendays_return' : sevendays_return,
							'onemonth_repair' : onemonth_repair,
							'guarantee' : guarantee,
							'real_describe' : real_describe,
							'start_credit' : start_credit,
							'end_credit' : end_credit
						}, function(rst) {
							if (rst['errno'] > 0) {
								alert('获取失败:' + rst['err']);
								return;
							}
							$('#J_ItemSearchBox').html(rst['rst']);

							var startCredit = $('#J_StartCredit')
									.attr('data-value');
							if (startCredit)
								$('#J_StartCredit').val(startCredit);
							var endCredit = $('#J_EndCredit')
									.attr('data-value');
							if (endCredit)
								$('#J_EndCredit').val(endCredit);
							$('#J_FilterButton').click(function() {
										self.searchItems();
										return false;
									});
							$('#rank-priceform').hover(function() {
										$('#rank-priceform').addClass('focus');
									}, function() {
										$('#rank-priceform')
												.removeClass('focus');
									});
							$('#J_PriceButton').click(function() {
										self.searchItems();
										return false;
									});
							$('#J_FilterOrderBy li a').click(function() {
										$('#J_FilterOrderBy li a')
												.removeClass('crt');
										$(this).addClass('crt');
										self.searchItems();
										return false;
									});
							self
									.jq('.page-top .page-next,.page-top .page-prev,.page-bottom a')
									.click(function() {
										self.searchItems($(this)
												.attr('data-page'));
										return false;
									});
							$('#J_ItemSearchBox a.J_TrackItem').click(
									function() {
										X.trackItem($(this));
									});
						});
			},
			searchProducts : function(pageNo, isDefault) {
				var self = this;
				var q = $('#J_ItemSearchQ').val();
				if (self.tips.indexOf(q) != -1) {
					q = '';
				}
				q = encodeURIComponent(q);
				var order_by = '', start_price = '', end_price = '', page_no = 1;
				if (!isDefault) {
					order_by = $('#J_FilterOrderBy a.crt').attr('data-value');
					start_price = $('#J_StartPrice').val();
					end_price = $('#J_EndPrice').val();
					page_no = pageNo ? pageNo : $('#J_ParamPageNo').val();
				}
				$('#J_ItemSearchBox')
						.html('<div id="xweibo_loading" class="loading"></div>');
				$.get('/products.itemBox', {
							'q' : q,
							'order_by' : order_by,
							'start_price' : start_price,
							'end_price' : end_price,
							'page_no' : page_no
						}, function(rst) {
							if (rst['errno'] > 0) {
								alert('获取失败:' + rst['err']);
								return;
							}
							$('#J_ItemSearchBox').html(rst['rst']);
							$('#rank-priceform').hover(function() {
										$('#rank-priceform').addClass('focus');
									}, function() {
										$('#rank-priceform')
												.removeClass('focus');
									});
							$('#J_PriceButton').click(function() {
										self.searchProducts();
										return false;
									});
							$('#J_FilterOrderBy li a').click(function() {
										$('#J_FilterOrderBy li a')
												.removeClass('crt');
										$(this).addClass('crt');
										self.searchProducts();
										return false;
									});
							self
									.jq('.page-top .page-next,.page-top .page-prev,.page-bottom a')
									.click(function() {
										self.searchProducts($(this)
												.attr('data-page'));
										return false;
									});
							$('#J_ItemSearchBox a.J_TrackItem').click(
									function() {
										X.trackItem($(this));
									});
						});
			},
			initItem : function() {

			}
		});

		X.reg('itemBox', inst, true);
		return inst;
	});
	Xwb.ax.Tpl.reg({
		TaokeItemBoxContent : [
				'<div class="mod-search" style="padding:0px 55px;height:53px;">',
				'<div class="search-area" style="padding-top:0px;height:50px;background: none;">',
				'<div class="search-block">',
				'<div class="search-inner">',
				'<input type="text" class="input-txt" value="" name="q"  id="J_ItemSearchQ" autocomplete="off"/>',
				'</div>',
				'<a href="#" class="s-btn skin-btn" id="J_ItemSearchButton">搜索</a>',
				'</div></div></div>',
				'<div class="box" id="J_ItemSearchBox" style="height:450px;overflow:auto;position:relative;" align="center"></div>']
				.join('')
	});
	/**
	 * @class Xwb.mod.taokeItemBox 商品弹出框
	 * @extends Xwb.ui.Box
	 * @singleton
	 */

	// 这写法是调用时才实例化
	X.reg('taokeItemBox', function() {
		var inst = X.use('Box', {
			actionMgr : true,
			title : '添加淘宝客商品',
			closeable : true,
			autoCenter : true,
			appendTo : doc.body,
			mask : true,
			cs : 'win-item',
			contentHtml : 'TaokeItemBoxContent',
			tips : '',
			onViewReady : function(v) {
				this.initSearch();
			},
			onactiontrig : function(e) {
				switch (e.data.e) {
					case 'addtbk' :// 添加
						if (typeof(XT_IS_WOW) != 'undefined') {
							if (XT_IS_WEIBO) {
								X.addWowTaobaokeItem(e);
							} else {
								Xwb.ui.MsgBox
										.alert('升级提示',
												'您需要<a href="#" rel="e:openAppstore">订购淘客/卖家服务</a>后，才能手动添加商品');
							}
						} else {
							X.addTaobaokeItem(e);
						}
						break;
				}
			},
			initSearch : function() {
				var self = this;
				this.jq().css('top', 100);// 调整顶部
				$('#J_ItemSearchQ').focusText("搜索  淘宝网  商品");
				$('#J_ItemSearchQ').keydown(function(e) {
							var kc = e.keyCode;
							if (kc === 13)
								$('#J_ItemSearchButton').click();
						});
				$('#J_ItemSearchButton').click(function() {
							self.searchItems(1, true);
							return false;
						}).click();
			},
			searchItems : function(pageNo, isDefault) {
				var self = this;
				var q = $('#J_ItemSearchQ').val();
				if (q == '搜索  淘宝网  商品') {
					q = '';
				}
				q = encodeURIComponent(q);
				var order_by = '', start_price = '', end_price = '', page_no = 1, cash_ondelivery = '', mall_item = '', sevendays_return = '', guarantee = '', onemonth_repair = '', real_describe = '', start_credit = '', end_credit = '';
				if (!isDefault) {
					order_by = $('#J_FilterOrderBy a.crt').attr('data-value');
					start_price = $('#J_StartPrice').val();
					end_price = $('#J_EndPrice').val();
					page_no = pageNo ? pageNo : $('#J_ParamPageNo').val();
					cash_ondelivery = $('#checkbox_cash_ondelivery')
							.is(':checked') ? 'true' : '';
					mall_item = $('#checkbox_mall_item').is(':checked')
							? 'true'
							: '';
					sevendays_return = $('#checkbox_sevendays_return')
							.is(':checked') ? 'true' : '';
					onemonth_repair = $('#checkbox_onemonth_repair')
							.is(':checked') ? 'true' : '';
					guarantee = $('#checkbox_guarantee').is(':checked')
							? 'true'
							: '';
					real_describe = $('#checkbox_real_describe').is(':checked')
							? 'true'
							: '';
					start_credit = $('#J_StartCredit').val();
					end_credit = $('#J_EndCredit').val();

				}

				$('#J_ItemSearchBox')
						.html('<div id="xweibo_loading" class="loading"></div>');
				$url = '/admin.php?m=mgr/xintao/yingxiaoWeibo.taokeItemBox';
				if (typeof(XT_IS_WOW) != 'undefined') {
					$url = '/admin.php?m=mgr/xintao/wowMgr.taokeItemBox';
				}
				$.get($url, {
							'keyword' : q,
							'sort' : order_by,
							'start_price' : start_price,
							'end_price' : end_price,
							'page_no' : page_no,
							'cash_ondelivery' : cash_ondelivery,
							'mall_item' : mall_item,
							'sevendays_return' : sevendays_return,
							'onemonth_repair' : onemonth_repair,
							'guarantee' : guarantee,
							'real_describe' : real_describe,
							'start_credit' : start_credit,
							'end_credit' : end_credit
						}, function(rst) {
							if (rst['errno'] > 0) {
								alert('获取失败:' + rst['err']);
								return;
							}
							$('#J_ItemSearchBox').html(rst['rst']);

							var startCredit = $('#J_StartCredit')
									.attr('data-value');
							if (startCredit)
								$('#J_StartCredit').val(startCredit);
							var endCredit = $('#J_EndCredit')
									.attr('data-value');
							if (endCredit)
								$('#J_EndCredit').val(endCredit);
							$('#J_FilterButton').click(function() {
										self.searchItems();
										return false;
									});
							$('#rank-priceform').hover(function() {
										$('#rank-priceform').addClass('focus');
									}, function() {
										$('#rank-priceform')
												.removeClass('focus');
									});
							$('#J_PriceButton').click(function() {
										self.searchItems();
										return false;
									});
							$('#J_FilterOrderBy li a').click(function() {
										$('#J_FilterOrderBy li a')
												.removeClass('crt');
										$(this).addClass('crt');
										self.searchItems();
										return false;
									});
							self
									.jq('.page-top .page-next,.page-top .page-prev,.page-bottom a')
									.click(function() {
										self.searchItems($(this)
												.attr('data-page'));
										return false;
									});
							$('#J_ItemSearchBox a.J_TrackItem').click(
									function() {
										X.trackItem($(this));
									});
						});
			}
		});

		X.reg('taokeItemBox', inst, true);
		return inst;
	});
	// 全局动作
	X.use('action')// 增加全局action拦截器，
			// 对于要求登录的action转至登录页面
			.addFilter(function(e, act) {
				// 目前只有收藏宝贝，店铺需要在操作前要求用户登录淘宝
				if (e.get('e') == 'tbf' || e.get('e') == 'tbfan') {
					var uid = X.getTaobaoId();
					if (!uid) {
						// 登录淘宝
						Xwb.ui.MsgBox.alert('该功能需要淘宝授权',
								'<a href="/account.taobaoLogin?loginCallBack='
										+ location.href + '">点击登录淘宝授权</a>');
						return FALSE;
					}
					return TRUE;
				}
			}, TRUE)/**
					 * @class Xwb.mod.PageActions 公共action处理
					 * @static
					 */

			/**
			 * @event tbf 淘宝收藏
			 * @param {String}
			 *            [m] 弹出收藏
			 */
			.reg('tbf', function(e) {
						X.addTaobaoFav(e);
					})/**
						 * @event tbs 淘宝分享
						 * @param {String}
						 *            [m] 弹出分享
						 */
			.reg('tbs', function(e) {
						X.addTaobaoShare(e);
					})/**
						 * @event tbfan 关注掌柜说
						 * @param {String}
						 *            [m] 弹出关注
						 */
			.reg('tbfan', function(e) {
						X.addTaobaoFollow(e);
					}).reg('isSimple', function(e) {
				$isSimple = $(e.src).attr('data-value');
				var mkUrl = Xwb.util.getBind(Xwb.request, 'mkUrl');
				Xwb.ui.MsgBox.confirm('您确认要切换为：'
								+ ($isSimple == 'true' ? '简洁版' : '专业版'),
						'简洁版：营销类功能<br/>专业版：营销类,建站推广类功能', function(id) {
							if (id == 'ok') {
								Xwb.request.postReq(mkUrl('mgr/xintao/xintao',
												'setIsSimple'), {
											isSimple : $isSimple
										}, function(r) {
											if (r.isOk()) {
												Xwb.ui.MsgBox.success('提示',
														'切换成功', function(id) {
															if (id == 'ok') {
																top.location
																		.reload();
															}
														});
											} else {
												Xwb.ui.MsgBox.alert('提示', r
																.getMsg());
											}
										});
							}

						});

			}).reg("openAppstore", function(e) {
				Xwb.use('MgrDlg', {
					dlgcfg : {
						cs : 'win-appstore win-fixed',
						title : '需要订购增值服务【<strong style="color:red;">鼠标滚动至底部可看到订购方式！</strong>】',
						onViewReady : function(view) {
							$(view)
									.find('#J_Appstore_Seller input[type="radio"]')
									.change(function() {
										$(view)
												.find('#J_Appstore_Seller_Buy')
												.attr(
														'href',
														'http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-4:'
																+ $(this).val());
									});
							$(view)
									.find('#J_Appstore_Taoke input[type="radio"]')
									.change(function() {
										$(view)
												.find('#J_Appstore_Taoke_Buy')
												.attr(
														'href',
														'http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-5:'
																+ $(this).val());
									});
						}
					},
					afterDisplay : function() {
					},
					modeUrl : "/admin.php?m=mgr/xintao/xintao.openAppstore"
				});
			});
	// 表单验证
	Xwb.ax.ValidationMgr.prototype.reg('domain', function(elem, v, data, next) {
		if (v) {
			var result = /^[\u4E00-\u9FA5a-zA-Z\.\/0-9]{3,}[\u4E00-\u9FA5a-zA-Z\/0-9]{2,}$/
					.test(v);
			if (!data.m && data.m !== 0)
				data.m = getText('请输入正确的独立域名');
			this.report(result, data);
		} else
			this.report(true, data);
		next();
	}).reg('file', function(elem, v, data, next) {
				if (v) {
					var result = /.*\.xls$/.test(v);
					if (!data.m && data.m !== 0)
						data.m = getText('只允许关键词xls文件');
					this.report(result, data);
				} else
					this.report(true, data);
				next();
			})
			/**
			 * @event url 检查URL地址
			 */
			.reg('url', function(elem, v, data, next) {
				if (v) {
					if (!data.m) {
						data.m = getText('URL地址不正确');
					}
					this
							.report(
									/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
											.test(v), data);
				} else {
					this.report(true, data);
				}
				next();
			})
			/**
			 * @event pic 检查PIC地址
			 */
			.reg('pic', function(elem, v, data, next) {
				if (v) {
					if (!data.m) {
						data.m = getText('图片地址不正确');
					}
					this
							.report(
									/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
											.test(v), data);
				} else {
					this.report(true, data);
				}
				next();
			})
			/**
			 * @event pid 检查PID地址
			 */
			.reg('pid', function(elem, v, data, next) {
				if (v) {
					if (!data.m) {
						data.m = getText('PID格式不正确');
					}
					this.report(/mm_\d{0,24}_\d{0,24}_\d{0,24}/i.test(v), data);
				} else {
					this.report(true, data);
				}
				next();
			})/**
				 * @event nicks 检查nicks地址
				 */
			.reg('nicks', function(elem, v, data, next) {
						if (v) {
							if (!data.m) {
								data.m = getText('卖家昵称格式不正确');
							}
							var vv = v.split(',');
							if (vv.length > 5) {
								data.m = getText('逗号隔开，不能超过5个');
								this.report(false, data);
							}
						} else {
							this.report(true, data);
						}
						next();
					})
			/**
			 * @event vancl 检查vancl地址
			 */
			.reg('vancl', function(elem, v, data, next) {
						if (v) {
							if (!data.m) {
								data.m = getText('凡客联盟帐号格式不正确');
							}
							this.report(/^[a-zA-Z]\w{4,15}$/.test(v), data);
						} else {
							this.report(true, data);
						}
						next();
					});
	if (X.use('pipeMgr') != null) {// 后台不需要初始化
		/**
		 * @class Xwb.mod.pagelet.XintaoTrack 带追踪的模块
		 * @extends Xwb.ax.Pagelet
		 */
		var Track = X.mod.pagelet.XintaoTrack = Util.create(Pagelet, {
					onViewReady : function(cfg) {
						var self = this;
						this.getUI().jq('a.J_TrackItem').click(function() {
									X.trackItem($(this));
								});
						this.getUI().jq('a.J_TrackShop').click(function() {
									X.trackShop($(this));
								});
						this.getUI().jq('a.J_TrackVancl').click(function() {
									X.trackVancl($(this));
								});
					}
				});
		// 商品搜索 注册
		X.use('pipeMgr').reg('xintao.headerSearch', function() {
			return new Track({
						onViewReady : function(cfg) {
							Track.prototype.onViewReady.apply(this, arguments);
							$('#J_HeaderSearchQ').focusText('想找什么宝贝？');
							$('#J_HeaderSearchInTaobao').click(function() {
								var q = $('#J_HeaderSearchQ').val();
								if (q == '想找什么宝贝？') {
									q = '';
								}
								document.location.href = '/items'
										+ (q != ''
												? ('?q=' + encodeURIComponent(q))
												: '');
							});
							$('#J_HeaderSearchInStore').click(function() {
								var q = $('#J_HeaderSearchQ').val();
								if (q == '想找什么宝贝？') {
									q = '';
								}
								document.location.href = '/products'
										+ (q != ''
												? ('?q=' + encodeURIComponent(q))
												: '');
							});
							$('#J_HeaderSearchInPoster').click(function() {
								var q = $('#J_HeaderSearchQ').val();
								if (q == '想找什么宝贝？') {
									q = '';
								}
								document.location.href = '/posters'
										+ (q != ''
												? ('?q=' + encodeURIComponent(q))
												: '');
							});
							$('#shop-info').hover(function() {
										$(this).addClass('hover');
									}, function() {
										$(this).removeClass('hover');
									});
						}
					});
		}).reg('xintao.convertItemDetail', function() {
			return new Pagelet({
				onViewReady : function(cfg) {
					this.getUI().jq('img').each(function() {
						var self = $(this);
						if (self.attr('data-original')) {// 解码
							self
									.attr(
											'original',
											$.base64.decode(self
													.attr('data-original')))
									.removeAttr('data-original');
						}
						self.lazyload({
							failurelimit : 1,
							placeholder : "http://static.xintaowang.com/css/default/xintao/lazy.gif",
							effect : "fadeIn"
						});
					});
					this.getUI().jq('a[href*="item.taobao.com"]').click(
							function() {
								var href = $(this).attr('href');
								if (href.indexOf('?id=') != -1
										|| href.indexOf('?item_num_id=') != -1) {
									if (href.indexOf('&') != -1) {
										$(this).attr(
												'href',
												'/item/id-'
														+ href.split('&')[0]
																.split('=')[1]);
									} else {
										$(this).attr(
												'href',
												'/item/id-'
														+ href.split('=')[1]);
									}
								}
							});
				}
			});
				// 商城分类
		}).reg('xintao.tmallCats', function() {
			return new Pagelet({
						onViewReady : function(cfg) {
							$('#J_CategoryTab a').click(function() {
								var href = $(this).attr('href');
								if (href && href != '' && href != '#') {// 转换为推广
									href = 'http://s.click.taobao.com/t_9?p='
											+ X.getPid() + '&l='
											+ encodeURIComponent(href);
								}
								$(this).attr('href', href);
							});
							$('#J_CategoryTab .tsCategory-nav li').hover(
									function() {
										$(this).addClass('selected').siblings()
												.removeClass('selected');
										$('#J_CategoryTab .tsCategory-con .mallCategory')
												.each(function() {
															$(this).parent()
																	.hide();
														});
										$('#' + $(this).attr('data-id'))
												.parent().show();
									});
						}
					});
		}).reg('xintao.posterMarkerData', function() {
			return new Pagelet({
				onViewReady : function(cfg) {
					var PosterMarkerData = eval('('
							+ $('#J_PosterMarkerData').val() + ')');
					var PosterImageData = eval('('
							+ $('#J_PosterImageData').val() + ')');
					var PosterData = eval('(' + $('#J_PosterData').val() + ')');
					// 画报组件初始化
					$('#J_Poster').posters({
								data : PosterMarkerData,
								image : PosterImageData,
								poster : PosterData
							});
				}
			});
		}).reg('component/component_96.run', function() {
			return new Pagelet({
				onViewReady : function() {
					$('#J_SearchCats').prepend($('#J_SelectedArea'));// 将选中的区域置前
					if ($('#J_SearchCats').hasClass('selectarea-props')) {
						var a = 0;
						var i = document;
						this.getUI().jq('.selectarea-props .selectareali')
								.each(	// 动态计算左侧属性宽度,如果当前是隐藏，则显示计算宽度后重新隐藏
										function() {
									var isShow = true;
									if ($(this).is(':hidden')) {
										$(this).show();
										isShow = false;
									}
									p = $(this).find('.selectareaLeft')[0];
									p.style.width = "auto";
									a = Math.max(a, p.offsetWidth);
									p.style.cssText = "";
									if (!isShow) {
										$(this).hide();
									}
								});
						var e = [
								".selectarea-props .selectareali{padding-left:{0}px;}",
								".selectarea-props .selectareaLeft{width:{0}px;margin-left:-{0}px;}",
								".selectarea-props .selectareaRight{width:{1}px}"]
								.join("");
						var f = 690 - a;
						var j = [a + 10, f];
						var b = e.replace(/\{([\w-]+)?\}/g, function(l, n) {
									return j[n]
								});
						var g = i.createElement("style");
						g.type = "text/css";
						i.getElementsByTagName("head")[0].appendChild(g);
						if (g.styleSheet) {
							g.styleSheet.cssText = b
						} else {
							g.appendChild(i.createTextNode(b))
						}
					}

					this.getUI().jq('a.more').click(function() {
						if ($(this).hasClass('close')) {
							$(this).parent().find('.more-props').show();
							$(this).addClass('open').removeClass('close')
									.text('收起');
						} else {
							$(this).parent().find('.more-props').hide();
							$(this).addClass('close').removeClass('open')
									.text('更多');
						}
					});
					$('#itoggle').click(function() {
						var src = $(this).attr('src');
						if (src.indexOf('down') != -1) {
							$('#J_SearchCats .selectareali:gt(2)').fadeIn();
							$(this)
									.attr('src',
											'/css/default/xintao/upbar.jpg');
						} else {
							$('#J_SearchCats .selectareali:gt(2)').fadeOut();
							$(this).attr('src',
									'/css/default/xintao/downbar.jpg');
						}
					});
				}
			});
		}).reg('common.xtSearchMod', function() {
			return new Pagelet({
				onViewReady : function(cfg) {
					var span = this.getUI().jq('.tab-s1 span.current');
					if (span.length == 1 && span.attr('rel') == 'items') {// 如果是商品搜索
						// 搜索框搜索提示
						$('#filterSearchKeyWord').autocomplete({
							url : "http://suggest.taobao.com/sug?code=utf-8&extras=1&callback=XT.Suggest.FilterSearchCallback",
							filterResults : false,
							sortResults : false,
							showResult : function(value, data) {
								return '<span class="ks-suggest-key">'
										+ value
										+ '</span><span class="ks-suggest-result">约'
										+ data + '个宝贝</span>';
							}
						});
					}
					$('#searchBtn').click(function() {
								$('#searchForm').submit();
								return false;
							});
				}
			});
		}).reg('xintao.tvPlayAd', function() {
					return new Track({
								onViewReady : function(cfg) {
									Track.prototype.onViewReady.apply(this,
											arguments);
									lazyload(this.getUI().jq('.pic img'));
								}
							});
				}).reg('component/component_105.run', function() {
					return new Track({
								onViewReady : function(cfg) {
									Track.prototype.onViewReady.apply(this,
											arguments);
									lazyload(this.getUI().jq('.pic img'));
								}
							});
				}).reg('component/component_100.run', function() {
					return new Track({
								onViewReady : function(cfg) {
									Track.prototype.onViewReady.apply(this,
											arguments);
									// lazyload(this.getUI().jq('.pic img'));
								}
							});
				}).reg('component/component_93.run', function() {
			return new Pagelet({
						onViewReady : function(cfg) {
							this.getUI().jq('#J_Poster .J_ThumbItems img')
									.each(function() {
										var src = $.base64.decode($(this)
												.attr('data-original'));
										$(this).attr('src', src + '_60x60.jpg')
												.attr('data-original-src', src)
												.removeAttr('data-original');
									});
						}
					});
		}).reg('component/component_94.run', function() {
			return new Pagelet({
						onViewReady : function(cfg) {
							$('#btnSearch').click(function() {
										$query = [];
										$query.push({
													'k' : 'q',
													'v' : $('#q').val()
												});
										var url = convertSearchUrl($query);
										document.location.href = '/vancl' + url;
									});
						}
					});
		}).reg('xintao.itemList', function() {
					return new Track({
								onViewReady : function(cfg) {
									Track.prototype.onViewReady.apply(this,
											arguments);
									lazyload(this.getUI().jq('.pic img'));
								}
							});
				}).reg('xintao.shopList', function() {
					return new Track({
								onViewReady : function(cfg) {
									Track.prototype.onViewReady.apply(this,
											arguments);
								}
							});
				}).reg('component/component_95.run', function() {
			return new Track({
						onViewReady : function(cfg) {
							Track.prototype.onViewReady.apply(this, arguments);
							lazyload(this.getUI().jq('.pic img'), 'vancl');
							$('#J_VanclPrice').click(function() {
										vanclItemSearch();
									});
							$('#J_VanclSpecial input[type="radio"]').change(
									function() {
										$('#J_VanclPageNo').val(1);// 页码设置为1
										vanclItemSearch();
									});
							var w = $(window);
							var right = w.width() + w.scrollLeft();
							this.getUI().jq(".vancl li").each(function() {
										productDetail($(this), right);
									})
						}
					});
		}).reg('component/component_99.run', function() {
					return new Pagelet({
								onViewReady : function(cfg) {
									lazyload(this.getUI().jq('.pic img'));
								}
							});
				}).reg('component/component_110.run', function() {
					return new Track();
				}).reg('component/component_106.run', function() {
					return new Track();
				}).reg('component/component_107.run', function() {
			return new Track({
						onViewReady : function(cfg) {
							Track.prototype.onViewReady.apply(this, arguments);
							// 延迟加载模块内图片
							lazyload(this.getUI().jq('.pic img'));
							// 价格
							$('#rank-priceform').hover(function() {
										$('#rank-priceform').addClass('focus');
									}, function() {
										$('#rank-priceform')
												.removeClass('focus');
									});
							$('#J_PriceButton').click(function() {
										taobaoProductSearch();
									});
							if (this.getUI().jq('.grid').hasClass('small')) {
								var w = $(window);
								var right = w.width() + w.scrollLeft();
								this.getUI().jq(".grid li").each(function() {
											productDetail($(this), right);
										})
							}
						}
					});
		}).reg('component/component_108.run', function() {
					return new Track({
								onViewReady : function(cfg) {
									Track.prototype.onViewReady.apply(this,
											arguments);
									// 延迟加载模块内图片
									lazyload(this.getUI().jq('.pic img'));

								}
							});
				}).reg('component/component_97.run', function() {
			return new Track({
				onViewReady : function(cfg) {
					Track.prototype.onViewReady.apply(this, arguments);
					// 延迟加载模块内图片
					lazyload(this.getUI().jq('.pic img'));
					var q = $('#filterSearchKeyWord').val();
					if (q) {
						$
								.getScript('http://suggest.taobao.com/sug?code=utf-8&extras=1&callback=XT.Suggest.RelatedSearchCallback&q='
										+ encodeURIComponent(q));
					}
					// 搜索
					$('#J_SubmitBtn').click(function() {
								taobaoItemSearch();
							});
					var status = $('#J_StuffStatus .item-list');
					// 新旧
					$('#J_StuffStatus').hover(function() {
								$(this).addClass('hover');
								status.fadeIn(100);
							}, function() {
								$(this).removeClass('hover');
								status.fadeOut(100);
							});

					$('#J_StuffStatus li').click(function() {
						$('#J_StuffStatusSelected').attr('data-value',
								$(this).attr('data-value'));
						$('#J_StuffStatusSelected').find('span').text($(this)
								.attr('data-label'));// 设置新旧显示
						$(this).addClass('selected').siblings()
								.removeClass('selected');// 选中新旧状态
						$('#J_StuffStatus').removeClass('hover');// 移除hover
						status.fadeOut(100);// 隐藏新旧状态下拉
					});
					// 正品保障
					$('#filterProtectionQuality').change(function() {
						if ($(this).is(':checked')) {
							$('#filterProtectionTruth,#J_PromotedService4')
									.attr('checked', true);
						}
					});
					// 价格
					$('#rank-priceform').hover(function() {
								$('#rank-priceform').addClass('focus');
							}, function() {
								$('#rank-priceform').removeClass('focus');
							});
					$('#J_PriceButton').click(function() {
								taobaoItemSearch();
							});
					// 地区
					var locSelected = $('#sel-loc .selected a');
					// 初始化选中
					if (locSelected.attr('data-state')) {// 省份
						$('#sel-loc .loc4 a:contains('
								+ locSelected.attr('data-state') + ')')
								.parent().addClass('checked');
					} else if (locSelected.attr('data-city')) {// 城市
						var citySelected = $('#sel-loc .loc2 a:contains('
								+ locSelected.attr('data-city') + ')');
						if (citySelected.length == 0) {
							citySelected = $('#sel-loc .loc3 a:contains('
									+ locSelected.attr('data-city') + ')');
						}
						if (citySelected.length == 1)
							citySelected.parent().addClass('checked');
					} else {// 所有地区
						$('#sel-loc .loc1 a').parent().addClass('checked');
					}
					// /地区事件
					$('#sel-loc').hover(function() {
								$(this).addClass('hover');
							}, function() {
								$(this).removeClass('hover');
							});
					$('#sel-loc .loc1 a').click(function() {// 所有地区
								locSelected.attr('data-state', '').attr(
										'data-city', '').text('所有地区');
								taobaoItemSearch();
							});
					$('#sel-loc .loc2 a,#sel-loc .loc3 a').click(function() {// 城市
								var city = $(this).text();
								locSelected.attr('data-state', '').attr(
										'data-city', city).text(city);
								taobaoItemSearch();
							});
					$('#sel-loc .loc4 a').click(function() {// 省份
								var state = $(this).text();
								locSelected.attr('data-state', state).attr(
										'data-city', '').text(state);
								taobaoItemSearch();
							});
					if (this.getUI().jq('.grid').hasClass('small')) {
						var w = $(window);
						var right = w.width() + w.scrollLeft();
						this.getUI().jq(".grid li").each(function() {
									productDetail($(this), right);
								})
					}
				}
			});
		});
	}
})(Xwb, $);
function productDetail(self, right) {
	var code = self.attr('data-value');
	var left = 20;
	var position = 'top right';
	var tip = $('#productInfo_' + code);
	if (right <= (self.offset().left + self.width()
			+ parseInt(self.css('margin-right')) + self.width() + tip.width())) {
		// 移动到左侧
		position = 'top left';
		left = -20;
	}
	var top = parseInt((200 + self.height() / 2));
	self.tooltip({
				tip : tip,
				offset : [top, left],
				position : position,
				relative : true,
				onBeforeShow : function(event, offset) {
					var tip = this.getTip();
					var img = tip.find('.jJ img');
					if (img.attr('data-original')) {
						var src = $.base64.decode(img.attr('data-original'));
						img.attr('src', src).removeAttr('data-original');
					}
				}
			}).hover(function() {
			}, function() {
				$(this).data('tooltip').hide();
			});
}

function lazyload(imgs, type) {
	imgs.each(function() {
		var self = $(this);
		if ('false' != self.attr('data-lazy')) {// 如果未指定不延迟加载
			if (self.attr('data-original')) {// 解码
				self.attr('original',
						$.base64.decode(self.attr('data-original')))
						.removeAttr('data-original');
			}
			self.lazyload({
				failurelimit : 1,
				placeholder : "http://static.xintaowang.com/css/default/xintao/lazy.gif",
				effect : "fadeIn"
			});
		}
		if ('vancl' == type) {
			var pic = self.attr('original').replace('.jpg', '-1.jpg');
			self.error(function() {// 如果图片不存在，则启用-1图片
						var img = $('<img src="' + pic + '"/>');
						$("<img />").bind("load", function() {
									self.attr('src', pic);
								}).error(function() {// 如果-1图片不存在，则售罄
									self
											.attr('src',
													'http://i.vanclimg.com/Others/2010/8/20/buhuo.gif');
								}).attr("src", pic);
					});
		}
	})
}