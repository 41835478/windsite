var DesignerUtils = {
	initKissyEditor : function() {
		KISSY.ready(function(S) {
			S.use('editor', function() {
				var KE = S.Editor;
				KEDITOR = KE("#richEditorTextArea", {
					attachForm : false,
					// 编辑器内弹窗z-index底线，防止互相覆盖
					baseZIndex : 300000,
					focus : true,
					pluginConfig : {
						"font-size" : {
							items : [{
								value : "14px",
								attrs : {
									style : 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
								},
								name : ""
										+ " <span style='font-size:14px'>标准</span>"
										+ "<span style='position:absolute;top:1px;right:3px;'>14px</span>"
							}, {
								value : "16px",
								attrs : {
									style : 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
								},
								name : ""
										+ " <span style='font-size:16px'>大</span>"
										+ "<span style='position:absolute;top:1px;right:3px;'>16px</span>"
							}, {
								value : "18px",
								attrs : {
									style : 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
								},
								name : ""
										+ " <span style='font-size:18px'>特大</span>"
										+ "<span style='position:absolute;top:1px;right:3px;'>18px</span>"
							}, {
								value : "20px",
								attrs : {
									style : 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
								},
								name : ""
										+ " <span style='font-size:20px'>极大</span>"
										+ "<span style='position:absolute;top:1px;right:3px;'>20px</span>"
							}],
							width : "115px"
						},
						"resize" : {
							direction : ["y"]
						}
					}
				})
						.use("elementpaths,sourcearea,preview,"
								+ "separator,"
								+ "undo,separator,removeformat,font,format,forecolor,bgcolor,separator,"
								+ "list,indent,justify,separator,link,image,flash,"
								+ "separator,table,resize,separator,maximize");
			});

		});
	},
	/**
	 * 是否显示拖拽树
	 * 
	 * @return {Boolean}
	 */
	isShowDragWidget : function() {
		var browser = $.browser;
		if (browser.msie) {
			if (browser.version == '6.0') {
				return false;
			}
		}
		return true;
	},
	/**
	 * 转换淘宝图片尺寸
	 * 
	 * @param {}
	 *            pw
	 * @return {Number}
	 */
	convertPicSize : function(pw) {
		switch (pw) {
			case pw > 310 :
				return 310;
			case pw > 160 :
				return 160;
			case pw > 100 :
				return 100;
			case pw > 60 :
				return 60;
			case pw > 40 :
				return 40;
		}
		return 100;
	},
	/**
	 * 初始化设计器(浏览器版本检测)
	 * 
	 * @param {}
	 *            callback
	 */
	initDesigner : function() {
		var browser = $.browser;
		var type = "";
		if (browser.msie) {
			if (browser.version == '6.0') {// IE 6.0
				type = "warn";
				$('#designerBrowserInfo').text('IE 6.0 或以IE 6.0为内核的浏览器');
				$('#designerBrowserList')
						.append('<li>组件拖拽功能</li><li>产品放大组件弹出效果</li>');
			} else if (browser.version == '7.0') {// IE 7.0
				type = "warn"
				$('#designerBrowserInfo').text('IE 7.0或以IE 7.0为内核的浏览器');
			}
		}
		if (type == "warn") {
			$('#designerBrowserWarn').dialog({
						bgiframe : true,
						autoOpen : false,
						height : 320,
						width : 450,
						zIndex : 100000,
						modal : true,
						closeText : '关闭',
						resizable : false,
						close : function() {
						},
						buttons : {
							'关闭提醒' : function() {
								$(this).dialog('close');
							}
						}
					});
		}
	},
	/**
	 * 初始化系统模板设计器
	 */
	initSysDesigner : function(stid) {
		var self = this;
		self.initDesigner();
		self.initDesignerBar();
		self.loadItemGroups(function() {
					self.loadSysTemplate(stid, function() {
								$('#designer').designer({
											tid : stid
										});
							});
				});
	},

	/**
	 * 初始化用户模板设计器
	 */
	initUserDesigner : function(tid, sid) {
		var self = this;
		self.initDesigner();
		self.initDesignerBar();
		self.loadPages(function() {// 加载页面
					self.loadItemGroups(function() {// 加载推广组
								self.loadUserTemplate(tid, function() {
											$('#designer').designer({// 初始化设计器
												tid : tid,
												sid : sid
											});
										});
							});
				});
	},
	/**
	 * 初始化用户指定系统模板设计器
	 */
	initUserSysDesigner : function(stid, tid, sid) {
		var self = this;
		self.initDesigner();
		self.initDesignerBar();
		self.loadPages(function() {// 加载页面
					self.loadItemGroups(function() {// 加载推广组
								self.loadSysTemplate(stid, function() {// 初始化设计器
											$('#designer').designer({
														tid : tid,
														stid : stid,
														sid : sid
													});
										}, tid);
							});
				});

	},
	/**
	 * 初始化工具栏
	 */
	initDesignerBar : function() {
		$('#ui-designer-topbar').designerTopBar().show();// 顶部工具栏
		$('#widgets-tree').treeview({
					unique : true
				});
		if (DesignerUtils.isShowDragWidget()) {
			$('#ui-designer-widgetbar').show();// 显示浮动组件树
		} else {
			$('#ui-designer-widgetbar').hide();// 隐藏浮动组件树
		}
		$('#designer')
				.prepend('<div align="left" style="margin-left:10px;margin-top:50px;font-weight:bold;">正在载入...</div>');
	},
	/**
	 * 校验阿里妈妈BM URL
	 * 
	 * @param {}
	 *            src
	 * @return {}
	 */
	validateAlimamaFlashBM : function(src) {
		if (src && src.length > 0) {
			var isValid = true;
			try {
				var split_I = src.split('/');
				var split_A = split_I[split_I.length - 1].split('.swf')[0];
				var split_H = split_A.split('_');
				if (split_H && split_H.length >= 2) {
					return 'http://banner.alimama.com/ml?adboard_id='
							+ split_H[0] + '&bannerSize=' + split_H[2];
				} else {
					alert('请确认广告牌地址是否有效');
				}
			} catch (e) {
				alert(e + '请确认广告牌地址是否有效');
			}
		} else {
			alert('您尚未填写阿里妈妈广告牌Flash动画地址');
		}
	},
	/**
	 * 加载所有页面
	 * 
	 * @param {}
	 *            callback
	 */
	loadPages : function(callback) {
		var self = this;
		var sender = new WindSender("/router/member/pages?version="
				+ Math.random());
		sender.load('GET', {}, function(response) {
					if (response.isSuccess()) {
						if (response.body.length > 0) {
							for (var i = 0; i < response.body.length > 0; i++) {
								var page = response.body[i];
								self.pages(page.id, page);
							}
						}
					} else {
						alert(response.msg);
					}
					if (callback && typeof callback == "function") {
						callback();
					}
				}, function() {
					$("#designer-loading").hide();
				});
	},
	/**
	 * 获取当前所有布局
	 */
	getCurrentContainerLayout : function() {
		var layouts = [];
		$('#main .ui-designer-container').each(function() {
					var layout = -1;
					var layoutClass = $(this).attr('class').split(' ')[1];
					switch (layoutClass) {
						case 'middle-1' :
							layout = '0';
							break;
						case 'right-1-3' :
							layout = '1';
							break;
						case 'middle-1-3-1' :
							layout = '2';
							break;
						case 'left-1-1' :
							layout = '3';
							break;
						case 'right-1-1' :
							layout = '3';
							break;
						case 'left-1-1-1' :
							layout = '4';
							break;
						case 'middle-1-1-1' :
							layout = '4';
							break;
						case 'right-1-1-1' :
							layout = '4';
							break;
						case 'left-1-3' :
							layout = '5';
							break;
						case 'left-1-3-1' :
							layout = '6';
							break;
						case 'right-1-3-1' :
							layout = '6';
							break;
						default :
							layout = '-1';
							break;
					}
					if (layout != -1) {
						if ($.inArray(layout, layouts) == -1) {
							layouts.push(layout);
						}
					}
				});
		return layouts;
	},
	getContainerClass : function(layouts) {
		var classes = '';
		for (var i = 0; i < layouts.length; i++) {
			switch (layouts[i]) {
				case '0' :
					classes += "#main .middle-1,";
					break;
				case '1' :
					classes += "#main .right-1-3,";
					break;
				case '2' :
					classes += "#main .middle-1-3-1,";
					break;
				case '3' :
					classes += "#main .left-1-1,#main .right-1-1,";
					break;
				case '4' :
					classes += "#main .left-1-1-1,#main .middle-1-1-1,#main .right-1-1-1,";
					break;
				case '5' :
					classes += "#main .left-1-3,";
					break;
				case '6' :
					classes += "#main .left-1-3-1,#main .right-1-3-1,";
					break;
			}
		}
		if (classes.length > 0) {
			classes = classes.substring(0, classes.length - 1);
		}
		return classes;
	},
	getLayoutDesc : function(layouts) {
		var str = '';
		for (var i = 0; i < layouts.length; i++) {
			switch (layouts[i]) {
				case '0' :
					str += "【单栏】";
					break;
				case '1' :
					str += "【两栏(1-3)右】";
					break;
				case '2' :
					str += "【三栏(1-3-1)中】";
					break;
				case '3' :
					str += "【两栏(1-1)左/右】";
					break;
				case '4' :
					str += "【三栏(1-1-1)左/中/右】";
					break;
				case '5' :
					str += "【两栏(1-3)左】";
					break;
				case '6' :
					str += "【三栏(1-3-1)左/右】";
					break;
			}
		}
		return str;
	},
	checkLayouts : function(lis, layouts) {
		var self = this;
		lis.each(function() {
					var isDraggle = false;
					var layout = $(this).attr('layout').split(',');
					for (var i = 0; i < layout.length; i++) {
						if ($.inArray(layout[i], layouts) != -1) {
							isDraggle = true;
						}
					}
					if (isDraggle) {// 指定可以拖拽的容器
						var containerStr = self.getContainerClass(layout);
						$(this).draggable('enable').draggable('option',
								'connectToSortable', containerStr);;
						$('span', $(this)).attr('title', '拖拽此组件至设计区中的布局容器');
					} else {
						$(this).draggable('disable');
						$('span', $(this)).attr(
								'title',
								'请添加布局容器' + self.getLayoutDesc(layout)
										+ (layout.length > 1 ? '中的一个' : ''));
					}
				});
	},
	/**
	 * 初始化组件权限
	 */
	initWidgetBarPermission : function() {
		var self = this;
		// TODO 新版本设计器
		// if (!isDragWidget) {
		// return;
		// }
		var layouts = this.getCurrentContainerLayout();
		if (layouts.length == 0) {
			$('#widgets-tree li.widget').draggable('disable');
			$('#widgets-tree li.widget span').attr('title', '请添加布局容器');
			return;
		}
		var isGroups = $('body').data('isGroups');
		// 推广组组件校验
		if (isGroups) {// 如果该会员拥有推广组
			this.checkLayouts($('#widgets-tree-group li.widget'), layouts);
		} else {
			$('#widgets-tree-group li.widget').draggable('disable');
			$('#widgets-tree-group li.widget span').attr('title',
					'您目前还没有添加推广组，无法使用此组件');
		}
		// 自定义组件校验
		$('#widgets-tree-custome li.widget[wname="widgetCustomer"]').each(
				function() {
					var layout = $(this).attr('layout');
					if ($.inArray(layout, layouts) != -1) {
						// 指定可以拖放的容器
						var containerStr = self.getContainerClass(layout
								.split(','));
						$(this).draggable('enable').draggable('option',
								'connectToSortable', containerStr);
						$('span', $(this)).attr('title', '拖拽此组件至设计区中的布局容器');
					} else {
						$(this).draggable('disable');
						$('span', $(this)).attr('title',
								'请添加布局容器' + self.getLayoutDesc(layout));
					}
				});
		// 妈妈组件，其他组件校验
		this
				.checkLayouts(
						$('#widgets-tree-mama li.widget,#widgets-tree-other li.widget'),
						layouts);
	},
	createContainerOverlay : function(containerStr) {
		var containers = $('#main .ui-designer-container:not(' + containerStr
				+ ')');
		containers.each(function() {
			var offset = $(this).offset();
			$('body')
					.append('<div class="container-overlay" style="opacity: 0.4; filter:Alpha(Opacity=40);position:absolute;background:#456;left:'
							+ offset.left
							+ 'px;top:'
							+ offset.top
							+ 'px;width:'
							+ ($(this).width() + 5)
							+ 'px;height:'
							+ ($(this).height() + 15)
							+ 'px"></div>');
		});
	},
	_initWidgetsBar : function() {
		var self = this;
		$('#widgets-tree li.widget').draggable({
			iframeFix : true,
			helper : function() {
				var wname = $(this).attr('wname');
				if ('widgetCustomer' == wname) {
					return $(this).clone().css('background', 'none');
				}
				var placeHolder = placeHolders[wname];
				if (!placeHolder) {
					return $(this).clone().css('background', 'none');
				}
				var helper = $('<div style="position:relative;z-Index:1000000;"><img src="/assets/min/images/widget/'
						+ placeHolder.image
						+ '.png" style="border:3px solid gray;"/></div>');
				return helper[0];
			},
			// cursorAt : {
			// left : 100
			// },
			revert : 'invalid',
			connectToSortable : '.ui-designer-container',
			start : function(event, ui) {
				$('.container-overlay').remove();
				var name = $(this).attr('wname');
				$('.previewWidgetImg[wname="' + name + '"]').hide();
				isWidgetHandle = false;
				var layout = $(this).attr('layout');
				var containerStr = self.getContainerClass(layout.split(','));
				$(this).draggable('option', 'connectToSortable', containerStr);
				self.createContainerOverlay(containerStr);
			},
			stop : function(event, ui) {
				isWidgetHandle = true;
				$('.container-overlay').remove();
			}
		}).draggable('disable').hover(function() {
					$('#widgets-tree li.widget').removeClass('hover');
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				});
		$('#widgets-tree li.widget[wname!="widgetCustomer"]').hover(
				function(event) {
					var name = $(this).attr('wname');
					var left = $(this).offset().left + 120;
					$('.previewWidgetImg[wname="' + name + '"]').css({
								left : left,
								top : (event.clientY - 40 + self.f_scrollTop())
							}).show();
				}, function(event) {
					var name = $(this).attr('wname');
					$('.previewWidgetImg[wname="' + name + '"]').hide();
				});
	},
	f_filterResults : function(n_win, n_docel, n_body) {
		var n_result = n_win ? n_win : 0;
		if (n_docel && (!n_result || (n_result > n_docel)))
			n_result = n_docel;
		return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
	},
	f_scrollTop : function() {
		return this.f_filterResults(
				window.pageYOffset ? window.pageYOffset : 0,
				document.documentElement
						? document.documentElement.scrollTop
						: 0, document.body ? document.body.scrollTop : 0);
	},
	_prependCustomeWidgets : function(index, widgets) {
		if (widgets.length > 0) {
			var folder0 = $('#widgets-tree-custome-' + index);
			var addCustome = $('#designer-widgets-dialog ul.designer-widgets-custome');
			var changeCustome = $('#widget-customes-dialog ul.designer-widgets-custome');
			for (var i = 0; i < widgets.length; i++) {
				var widget = widgets[i];
				folder0.prepend('<li class="widget" layout="'
						+ widget['layout'] + '" wname="widgetCustomer" wid="'
						+ widget['id'] + '"><span title="' + widget['name']
						+ '" class="file">' + widget['name'] + '</span></li>');
				var li = '<li class="widget" layout="' + widget['layout']
						+ '" widget="widgetCustomer" wid="' + widget['id']
						+ '" title="' + widget['name'] + '">' + widget['name']
						+ '</li>';
				addCustome.append(li);
				changeCustome.append(li);
			}
		}
		this._initWidgetsBar();
	},
	_initCustomeWidgetsBar : function(widgets) {
		for (var i = 0; i < 7; i++) {// 循环填充不同布局组件
			this._prependCustomeWidgets(i, widgets[i + '']);
		}
	},
	/**
	 * 第一步:加载我的设计和我的收藏 第二步:加载所有推广组及商品
	 */
	loadItemGroups : function(callback) {
		var self = this;
		var senderC = new WindSender("/router/member/designer/mycustomewidgets?version="
				+ Math.random());
		senderC.load('GET', {}, function(response) {
			if (response.isSuccess()) {// 自定义组件加载完毕
				self._initCustomeWidgetsBar(response.body);
				var sender = new WindSender("/router/member/designer/itemgroups?version="
						+ Math.random());
				sender.load('GET', {}, function(response) {
					if (response.isSuccess()) {
						if (response.body.length > 0) {
							$('body').data('isGroups', true);
							$('.ui-designer-groups').empty()
									.append('<option value="0">选择推广组</option>');
							for (var i = 0; i < response.body.length > 0; i++) {
								var group = response.body[i];
								self.items(group.id, group.items);
								$('#widget-groups-dialog .ui-designer-groups')
										.append('<option value="' + group.id
												+ '">' + group.name
												+ '</option>');
							}
						} else {
							$('body').data('isGroups', false);
						}
					} else {
						alert(response.msg);
					}
					if (callback && typeof callback == "function") {
						callback();
					}
				}, function() {
					$("#designer-loading").hide();
				});
			} else {
				alert(response.msg);
			}
		});
	},
	/**
	 * 商品存储及获取
	 * 
	 * @param {}
	 *            gid
	 * @param {}
	 *            items
	 * @return {}
	 */
	items : function(gid, items) {
		if (items && items != null) {
			$('body').data('g_' + gid, items);
		}
		return $('body').data('g_' + gid);
	},
	/**
	 * 模板页面
	 * 
	 * @param {}
	 *            tid
	 * @param {}
	 *            page
	 * @return {}
	 */
	pages : function(tid, page) {
		var _pages = $('body').data('pages');
		if (!_pages || _pages == null) {
			_pages = {};
		}
		if (page && page != null) {
			_pages[tid] = page;
		}
		$('body').data('pages', _pages);
	},
	/**
	 * 加载用户模板
	 * 
	 * @param {}
	 *            tid
	 * @param {}
	 *            callback
	 */
	loadUserTemplate : function(tid, callback) {
		this.loadTemplate("/router/member/designer/template/user/" + tid
						+ "?version=" + Math.random(), callback);
	},
	/**
	 * 加载系统模板
	 * 
	 * @param {}
	 *            tid
	 * @param {}
	 *            callback
	 */
	loadSysTemplate : function(tid, callback, utid) {
		if (utid) {
			this.loadTemplate("/router/member/designer/template/system/" + tid
							+ "?utid=" + utid + "&version=" + Math.random(),
					callback);
		} else {
			this.loadTemplate("/router/member/designer/template/system/" + tid
							+ "?version=" + Math.random(), callback);
		}

	},
	/**
	 * 加载指定模板
	 * 
	 * @param {}
	 *            tempalte
	 * @param {}
	 *            callback
	 */
	loadTemplate : function(url, callback) {
		$.ajax({
					url : url,
					type : 'GET',
					data : {},
					dataType : 'html',
					contentType : "charset=utf-8",
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
						alert('指定模板加载失败,启用空白模板');
						// 如果加载失败,则加载空模板
						$('#designer').load('/designer/default.html',
								function() {
									$('body').prepend(tools);
									if (callback
											&& typeof callback == "function") {
										callback();
									}
								});
					},
					success : function(data) {
						$('#designer').empty();

						$('#designer').append(data);

						if (callback && typeof callback == "function") {
							callback();
						}
					}
				});

	},
	/**
	 * 显示大小
	 */
	displaySize : function(handle) {
		var oSize = $('#ui-designer-size');
		handle.hover(function(event) {
					oSize.css('top', event.pageY + 10);
					oSize.css('left', event.pageX + 10);
					$('#oWidth').text($(this).parent().width());
					$('#oHeight').text($(this).parent().height());
					oSize.show();
				}, function(event) {
					oSize.hide();
				});
	},
	isURL : function(url) {
		if (url && url.indexOf('s.click') != -1) {
			return true;
		}
		var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
				+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
				+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL-
				// 199.194.52.184
				+ "|" // 允许IP和DOMAIN（域名）
				+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
				+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
				+ "[a-z]{2,6})" // first level domain- .com or .museum
				+ "(:[0-9]{1,4})?" // 端口- :80
				+ "((/?)|" // a slash isn't required if there is no file
				// name
				+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
		var re = new RegExp(strRegex);
		if (re.test(url)) {
			return (true);
		} else {
			return (false);
		}
	},
	/**
	 * Json对象转换为字符串
	 * 
	 * @param {Json}O
	 * @return {String}
	 */
	json2str : function(o) {
		var r = [];
		if (typeof o == "string")
			return "\""
					+ o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, " \\n")
							.replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t")
					+ "\"";
		if (typeof o == "object") {
			if (o == null) {
				r = r.join() + "null";// 因为null只会出现在值,属性不可能为null,所以直接加null
			} else {
				if (!o.sort) {
					for (var i in o) {
						r.push(i + ":" + DesignerUtils.json2str(o[i]));
					}
					var oString = o.toString;
					if (!!document.all
							&& !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/
									.test(oString)) {
						r.push("toString:" + oString.toString());
					}
					r = "{" + r.join() + "}"
				} else {
					var len = o.length;
					var i = 0;
					while (i < len) {
						r.push(DesignerUtils.json2str(o[i]));
						i++;
					}
					r = "[" + r.join() + "]"
				}
			}
			try {
				return r;
			} finally {
				r = null;
				delete r;
			}
		}
		try {
			return o.toString();
		} finally {
			o = null;
			delete o;
		}
	}
};
function getImagePath(url) {
	if (url && url.length > 0) {
		return url.replace('http://' + window.location.host, '');
	}
	return '';
};
function taobaoCredit(level) {
	switch (level) {
		case 1 :
			return "s_red_1";
		case 2 :
			return "s_red_2";
		case 3 :
			return "s_red_3";
		case 4 :
			return "s_red_4";
		case 5 :
			return "s_red_5";
		case 6 :
			return "s_blue_1";
		case 7 :
			return "s_blue_2";
		case 8 :
			return "s_blue_3";
		case 9 :
			return "s_blue_4";
		case 10 :
			return "s_blue_5";
		case 11 :
			return "s_cap_1";
		case 12 :
			return "s_cap_2";
		case 13 :
			return "s_cap_3";
		case 14 :
			return "s_cap_4";
		case 15 :
			return "s_cap_5";
		case 16 :
			return "s_crown_1";
		case 17 :
			return "s_crown_2";
		case 18 :
			return "s_crown_3";
		case 19 :
			return "s_crown_4";
		case 20 :
			return "s_crown_5";
		default :
			return "s_red_1";
	}
}
function convertPID() {
	return PID.replace('mm_', '').replace('_0_0', '');
}
function saveEditor(ed) {
	var id = ed.id;
	var component = $('#' + id).parent();
	var widget = component.parent();
	var html = tinyMCE.get(id).getContent() + '';
	component.empty().append(html);
	tinyMCE.execCommand('mceRemoveControl', false, id);
	$('#' + id).remove();
	editing = null;
	var width = component.width();
	widget.height(widget.height()
			- (width < 435 ? (width < 210 ? 100 : 80) : 50));
	widget.resizable('enable');
}
function loadAllItemGroups(callback) {
	var sender = new WindSender("/router/member/designer/itemgroups?version="
			+ Math.random());
	sender.load('GET', {}, function(response) {
				if (response.isSuccess()) {
					if (response.body.length > 0) {
						$('.ui-designer-groups').empty()
								.append('<option value="0">选择推广组</option>');
						for (var i = 0; i < response.body.length > 0; i++) {
							var group = response.body[i];
							if (group.items && group.items != null) {
								$('body').data('g_' + group.id, group.items);
							}
							$('.ui-designer-groups').append('<option value="'
									+ group.id + '">' + group.name
									+ '</option>');
						}
					}
				} else {
					alert(response.msg);
				}
				if (callback && typeof callback == "function") {
					callback();
				}
			});
}
function previewCommission(widget) {
	$('.a-s,.l-a-s,.l-a-s-p,.d-a-i,.l-d-a-i,.l-d-a-i-p', widget).each(
			function() {
				addViewCommission($(this));
			});
}
function addViewCommission(e) {
	var c = e.attr('co');
	var pre = '佣金:';
	var last = '元';
	if (!c) {
		c = e.attr('cr');
		pre = '佣金比例:';
		last = '%';
	}
	if (c) {
		e
				.append('<div class="c-c" title="'
						+ pre
						+ c
						+ last
						+ '" style="position: absolute;text-align: center;line-height: 14px;height: 14px;background: #F60;color: white;border: 1px solid blue;cursor: pointer;top:-2px;left:0px;">'
						+ pre + c + last + '</div>');
	}
}
