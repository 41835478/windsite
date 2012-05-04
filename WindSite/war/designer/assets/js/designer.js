var editing = null;// 当前高级编辑
var editingTitle = null;// 当前组件标题编辑
var editingUCBlog = null;// 当前UCHome日志组件
var editingAlimamaFlashBM = null;// 当前阿里妈妈FLash编辑
var editingCats = null;// 当前类目编辑
var editingSmartAdsFlash = null;// 当前智能广告编辑
var editingFixedSmartAdsFlash = null;// 当前固定尺寸智能广告编辑
var editingColor = null;// 当前颜色编辑
var editingNetLink = null;// 当前友情链接编辑
var editingTopicEditor = null;// 当前主题推广编辑
var editingShopsEditor = null;// 当前店铺编辑
var editingCustomeEditor = null;// 当前自定义组件编辑
var editingHuabaoEditor = null;// 当前画报编辑器
var editingGroupEditor = null;// 当前推广组编辑
var editingChannelEditor = null;// 当前频道编辑
var editingSearchBoxEditor = null;// 当前搜索框编辑
var editingWidget = null;// 当前编辑组件
var cssClasses = {};// 样式对象集合
var tempClasses = {};// 样式对象临时集合
var isDesigner = true;// 设计器模式
var isWidgetHandle = true;// 是否显示组件工具栏
var DEBUG = true;
var isF5 = false;
var isCommissionView = false;// 佣金查看模式
var isDragWidget = true;// 组件新增模式(默认拖拽)
var isCustomeEditor = true;// 自定义组件编辑(默认可编辑)
var isRemoveAddA = true;// 是否移除传统模式下的增加按钮
var HID = 0, PICID = 0, HOTTYPE = 0;
var KEDITOR;// 高级编辑器对象

(function($) {
	// var editor;
	$.widget("ui.designer", {
		/**
		 * 参数
		 */
		options : {
			tid : '',
			stid : '',
			skin : '',
			update : false
		},
		// editor : function() {
		// return editor;
		// },
		/**
		 * 当前选中的组件
		 */
		selectedWidget : null,
		/**
		 * 当前选中的容器
		 */
		selectedContainer : null,
		/**
		 * 清理body
		 */
		clearDesigner : function() {
			// 将大小及组件工具栏与容器拖拽边框移出body区
			$('.c-c').remove();// 自定义组件佣金显示移除
			$('body').data('customes', []);// 设置当前自定义组件集合为空
			$('#ui-designer-size').hide();
			$('#ui-designer-widget-handle').hide();
			// $('.ui-designer-container-handle').hide();
			$('#ui-designer-header-tools').hide();
			$('#tools').append($('#ui-designer-size'));
			$('#tools').append($('#ui-designer-widget-handle'));
			// $('#tools').append($('.ui-designer-container-handle'));
			$('#tools').append($('#ui-designer-header-tools'));
		},
		_create : function() {

		},
		/**
		 * 设计器初始化
		 */
		_init : function() {
			var self = this;
			var designer = self.element;// 设计区
			try {
				/**
				 * TODO 新版本设计器
				 */
				self._createDesignerWidgetsTabs();// 初始化传统模式下组件列表
				self._initHotKeys();// 初始化热键
				$('#ui-designer-widgetbar').bind("selectstart", function() {
							return false
						});
				// $('#ucBlogEditor').ucBlogEditor();// UCHome日志选择器
				// $('#itemsSelect').taokeItemsSelect();// 商品选择器
				// $('#itemCatsSelect').itemCatsSelect();// 类目选择器
				// $('#searchBoxEditor').searchBoxEditor();// 搜索框编辑器
				// $('#smartAdsFlashEditor').smartAdsFlashEditor();// 智能广告编辑器
				// $('#fixedSmartAdsFlashEditor').fixedSmartAdsFlashEditor();//
				// 固定尺寸智能广告编辑器
				$('#netLinkViewEditor').netLinkViewEditor();// 友情链接编辑器
				// $('#topicEditor').topicEditor();// 主题推广编辑器
				// $('#customeWidgetDialog').customeWidgetEditor();// 自定义组件编辑器
				$('#huabaoEditorDialog').huabaoEditor();// 画报组件编辑器
				self._createWidgetTitleDialog();// 组件标题编辑器
				self._createEditor();// 高级编辑器
				self._createAlimamaBM();// 阿里妈妈BM
				self._createColorPicker();// 颜色
				self._createGroupDialog();// 推广组组件编辑器
				self._createChannelDialog();// 频道组件编辑器
				self._createChangeCustomeWidget();// 自定义组件切换编辑器
				self._createSearchBoxDialog();// 搜索框编辑器
				$('#themeRoller').themeRoller();// 皮肤设计器
				$('#analytics').analytics();// 统计组件
				$('#ui-designer-widget-handle').widgetHandle();// 组件工具栏
				var header = $('#ui-designer-header');
				if (header.length == 0) {
					header = $('.ui-designer-header');
				}
				header.designerHeader();// 网站标题区
				self._createMain();
				$('#footer').designerFooter();// 网站页脚
				DesignerUtils.displaySize($('.ui-resizable-handle'));
				$('#ui-designer-widgetbar').draggable({
							handle : 'h3'
						});
				// 设计区下移
				if ($.browser.msie && $.browser.version == '6.0') {
					// TODO IE6
				} else {
					designer.css("margin-top", 50);
				}
				$('#wrap').hover(function() {
						}, function() {
							if (!isWidgetHandle) {
								return;
							}
							// $('#custome-bar,.custome-bar-border').remove();
							var bar = $('#ui-designer-widget-handle');
							bar.hide();
							$('body').append(bar);

						});
				// $('#designerZoom').designerZoom();// 扫视缩放区
			} catch (e) {
				alert('加载错误:' + e + ',请尝试刷新页面。');
				// 记录设计器访问出错
				var content = '错误:' + e;
				try {
					if ($.browser.msie) {// 如果是IE
						content = ("version:" + $.browser.version
								+ "<br/>name: " + e.name + "<br/>errorNumber: "
								+ (e.number & 0xFFFF) + "<br/>message: " + e.message);

					} else {// 如果是其他
						content = ("name: " + e.name + "<br/>message: "
								+ e.message + "<br/>lineNumber: "
								+ e.lineNumber + "<br/>fileName: " + e.fileName
								+ "<br/>stack: " + e.stack);
					}
				} catch (e) {
				}
				var sender = new WindSender("/router/member/designer/error");
				sender.load('POST', {
							"content" : content
						}, function(response) {
						});

			}
			DesignerUtils.initWidgetBarPermission();// 初始化组件权限
			$('#ui-designer-topbar').designerTopBar('enable');// 启用topbar
			if ($.browser.msie
					&& ($.browser.version == '6.0' || $.browser.version == '7.0')) {
				$('#designerBrowserWarn').dialog('open');
			}
		},
		_createChangeCustomeWidget : function() {
			var self = this;
			$('#widget-customes-dialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 550,
				height : 400,
				zIndex : 100000,
				resizable : false,
				modal : true,
				open : function() {
					if (editingCustomeEditor != null) {
						$('.checkedImg').remove();
						var old = editingCustomeEditor.widgetCustomer('option',
								'wid');
						var container = editingCustomeEditor.parent();
						$('#widget-customes-dialog li .checkedImg').remove();
						var layout = container.designerContainer('option',
								'playout');
						$('#widget-customes-dialog li.widget').each(function() {
							var _layout = $(this).attr('layout');
							if (_layout == layout) {
								if (old == $(this).attr('wid')) {
									$(this)
											.prepend('<img class="checkedImg" src="/assets/images/link/checked.gif" style="position:absolute;right:0px;"/>');
								}
								$(this).show();
							} else {
								$(this).hide();
							}
						});
					}
				},
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						var selected = $('.checkedImg', $(this)).parent();
						if (selected.length == 0) {
							alert('请选择要切换成的组件');
							return;
						}
						var newWid = selected.attr('wid');
						var old = editingCustomeEditor.widgetCustomer('option',
								'wid');
						if (newWid == old) {
							$(this).dialog('close');
							return;
						}

						if (editingCustomeEditor != null) {
							editingCustomeEditor.widgetCustomer(
									'customeWidgetLoad', newWid);
							$(this).dialog('close');
						} else {
							alert('未指定要改变的自定义组件');
							return;
						}

					}
				}
			});
			$('#widget-customes-dialog li.widget').hover(function() {
				$(this).toggleClass("ui-selecting").siblings()
						.removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			}).click(function() {
				$('.checkedImg').remove();
				$(this)
						.prepend('<img class="checkedImg" src="/assets/images/link/checked.gif" style="position:absolute;right:0px;"/>');
			});
		},
		_createDesignerWidgetsTabs : function() {
			var self = this;
			$("#designer-widgets-dialog-tabs").tabs()
					.addClass('ui-tabs-vertical ui-helper-clearfix');
			$("#designer-widgets-dialog-tabs li").removeClass('ui-corner-top')
					.addClass('ui-corner-left');
			$('#designer-widgets-dialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 740,
				height : 500,
				zIndex : 100000,
				resizable : false,
				modal : true,
				open : function() {
					if (editingWidget != null) {
						var container = null;
						if (editingWidget.hasClass('ui-designer-widget')) {// 组件
							container = editingWidget.parent();
						} else if (editingWidget
								.hasClass('ui-designer-container')) {// 容器
							container = editingWidget;
						}
						$('#designer-widgets-dialog li .checkedImg').remove();
						var layout = container.designerContainer('option',
								'playout');
						$('#designer-widgets-dialog li.widget').each(
								function() {
									var _layout = $(this).attr('layout');
									if (_layout.indexOf(layout) != -1
											|| _layout == layout) {
										$(this).removeClass('unactive');
										$('.unactive-img', $(this)).remove();
									} else {
										$(this)
												.attr(
														'title',
														'请添加布局容器'
																+ DesignerUtils
																		.getLayoutDesc(_layout))
												.addClass('unactive')
												.prepend('<img class="unactive-img" src="/assets/images/link/disable.gif" style="position:absolute;right:0px;"/>');
									}
								});

						$('#designer-widgets-dialog li.unactive[title]')
								.tooltip({
											position : 'center right',
											offset : [0, 15],
											delay : 0
										});
					}
				},
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						var selected = $('.checkedImg', $(this)).parent();
						if (selected.length == 0) {
							alert('请选择要添加的组件');
							return;
						}
						if (editingWidget != null) {
							var placeHolder = placeHolders[selected
									.attr('widget')];
							var widget = $(placeHolder['html']);
							if (widget) {
								if (editingWidget
										.hasClass('ui-designer-widget')) {// 组件
									editingWidget.after(widget);
									self._initWidget(widget,
											editingWidget[editingWidget
													.attr('name')]('option',
													'playout'), selected
													.attr('wid'));
								} else if (editingWidget
										.hasClass('ui-designer-container')) {// 容器
									isRemoveAddA = true;
									editingWidget.append(widget);
									self._initWidget(widget,
											editingWidget.designerContainer(
													'option', 'playout'),
											selected.attr('wid'))
									if (isRemoveAddA) {
										$('.add-widget-a', editingWidget)
												.remove();
									} else {
										return;
									}
								}
								$('#designer-widgets-dialog').dialog('close');

							} else {
								alert('抱歉！当前组件不可用');
							}
						}

					}
				}
			});
			$('#designer-widgets-dialog li.widget').hover(function() {
				if ($(this).hasClass('unactive')) {
					return;
				}
				$(this).toggleClass("ui-selecting").siblings()
						.removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			}).click(function() {
				if ($(this).hasClass('unactive')) {
					return;
				}
				$('.checkedImg').remove();
				$(this)
						.prepend('<img class="checkedImg" src="/assets/images/link/checked.gif" style="position:absolute;right:0px;"/>');
			});
		},
		toSource : function(isValidate, isTemp) {
			var self = this;
			self.clearDesigner();
			var _main = '<div id="main" class="clearfix">';// main
			$('#main .ui-designer-content').each(function() {
						_main += $(this)
								.designerContent('toSource', isValidate);// contents,containers,widgets
					});
			_main += '</div>';
			var _header = '${header}';
			// Wrap
			var _wrap = '<div id="wrap">' + _header
					+ '<div class="ui-designer-space"></div>' + _main
					+ '</div>';
			return _wrap + '<div id="footer" align="center"></div>';
		},
		_initWidget : function(widget, layout, wid) {
			$('.widget-title', widget).css('color', '').text('双击编辑标题');// 如果是工具栏拖拽
			var name = widget.attr("name");
			if ('widgetCustomer' == name) {
				widget[name]({
							playout : layout,
							wid : wid
						});// 注册组件
				widget[name]('refresh', 'init');// 注册组件
			} else {
				widget[name]({
							playout : layout

						});// 注册组件
				widget[name]('refresh', 'init');// 注册组件
				widget[name]('widgetSet');// 弹出编辑框
			}

		},
		/**
		 * 初始化热键
		 */
		_initHotKeys : function() {
		},
		_createChannelDialog : function() {
			var isEffect = false;;
			$('#widget-channels-dialog li').click(function() {
				$('#checkedImg').remove();
				$(this).toggleClass("selected");
				$('#widget-channels-dialog li').not($(this))
						.removeClass("selected");
				if ($(this).hasClass('selected')) {
					$(this)
							.prepend('<img id="checkedImg" src="/assets/images/link/checked.gif" style="position:absolute;"/>');
				} else {
					$('#checkedImg').remove();
				}
			});
			$('#widget-channels-dialog').dialog({
				show : isEffect ? 'drop' : null,
				hide : isEffect ? 'explode' : null,
				bgiframe : true,
				width : 600,
				autoOpen : false,
				zIndex : 100000,
				modal : true,
				resizable : true,
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						if (editingChannelEditor != null) {
							var name = editingChannelEditor.attr("name");
							var selected = $('li.selected', $(this));
							if (selected.length != 1) {
								alert('请选择一个频道');
								return;
							}
							var metadata = channels[selected.attr('channel')];// 获取当前频道参数
							if (metadata && metadata != null) {
								for (var p in metadata) {
									if (p == 'clickUrl') {
										editingChannelEditor
												.channelView(
														'option',
														p,
														metadata[p]
																.replace(
																		'mm_10011550_0_0',
																		PID)
																.replace(
																		'mm_13667242_0_0',
																		PID));
									} else {
										editingChannelEditor.channelView(
												'option', p, metadata[p]);
									}
								}
							}
							WidgetUtils.channelView_init(editingChannelEditor
									.find('.widget-channelview'));
						} else {
							alert('未指定要编辑的频道组件');
						}
						$(this).dialog('close');
					}
				}
			});
		},
		_createSearchBoxDialog : function() {
			var isEffect = false;;
			$('#widget-searchBox-dialog').dialog({
				show : isEffect ? 'drop' : null,
				hide : isEffect ? 'explode' : null,
				bgiframe : true,
				width : 400,
				autoOpen : false,
				zIndex : 100000,
				modal : true,
				resizable : true,
				open : function() {
					if (editingSearchBoxEditor != null) {
						var name = editingSearchBoxEditor.attr("name");
						var cat = editingSearchBoxEditor[name]('option', 'cat');
						var line = editingSearchBoxEditor[name]('option',
								'line');
						if (cat) {
							$('#searchBoxCats').val(cat);
						} else {
							$('#searchBoxCats').val(0);
						}
						if (line) {
							$('#searchBoxLines').val(line);
						} else {
							$('#searchBoxLines').val(0);
						}
					} else {
						alert('未指定要编辑的搜索框组件');
					}
				},
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						if (editingSearchBoxEditor != null) {
							var name = editingSearchBoxEditor.attr("name");
							var cat = $('#searchBoxCats').val();
							var line = $('#searchBoxLines').val();
							if (line == '') {
								line = 1;
							}
							editingSearchBoxEditor[name]('option', 'cat', cat);
							editingSearchBoxEditor[name]('option', 'line', line);
							WidgetUtils.searchBox_init(editingSearchBoxEditor
									.find('.widget-searchbox'));// 刷新
						} else {
							alert('未指定要编辑的搜索框组件');
						}
						$(this).dialog('close');
					}
				}
			});
			$('#searchBoxLines').change(function() {
						var _keywords_line = $(this).val();
						var res = /^[0-9]{1,2}$/.test(_keywords_line);
						if (!res) {
							alert("输入的值必须是0-9的一位或两位数字！");
							$(this).val(1);
							return;
						}
					});
		},
		_createGroupDialog : function() {
			var isEffect = false;;
			$('#widget-groups-dialog').dialog({
				show : isEffect ? 'drop' : null,
				hide : isEffect ? 'explode' : null,
				bgiframe : true,
				width : 600,
				autoOpen : false,
				zIndex : 100000,
				modal : true,
				resizable : true,
				open : function() {
					if (editingGroupEditor != null) {
						var name = editingGroupEditor.attr("name");
						var gid = editingGroupEditor[name]('option', 'gid');
						var sortBy = editingGroupEditor[name]('option',
								'sortBy');
						if (gid
								&& gid.length > 0
								&& ($('#itemGroups option[value="' + gid + '"]').length > 0)) {
							$('#itemGroups').val(gid);
						} else {
							$('#itemGroups').val(0);
						}
						if (sortBy) {
							$('#itemsSortBy').val(sortBy);
						} else {
							$('#itemsSortBy').val('sortOrder_asc');
						}
					} else {
						alert('未指定要编辑的推广组组件');
					}
				},
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						if (editingGroupEditor != null) {
							var name = editingGroupEditor.attr("name");
							var id = $('#itemGroups').val();
							if (id == "0") {
								alert('请选择一个商品推广组');
								return;
							}
							var sortBy = $('#itemsSortBy').val();
							// 排序
							editingGroupEditor[name]('option', 'sortBy', sortBy);
							// 存储当前推广组
							editingGroupEditor[name]('option', 'gid', id);
							editingGroupEditor[name]('refresh', 'group');// 刷新
						} else {
							alert('未指定要编辑的推广组组件');
						}
						$(this).dialog('close');
					}
				}
			});
		},
		_createMain : function() {
			$('#main .ui-designer-content').designerContent();// 内容区
		},
		_createWidgetTitleDialog : function() {
			var isEffect = false;;
			$('#widgetTitleDialog').dialog({
						show : isEffect ? 'drop' : null,
						hide : isEffect ? 'explode' : null,
						bgiframe : false,
						autoOpen : false,
						width : 300,
						zIndex : 100000,
						modal : true,
						resizable : true,
						buttons : {
							'取消' : function() {
								$(this).dialog('close');
							},
							'确定' : function() {
								var input = $('#widgetTitleInput').val();
								if (input && input.length > 30) {
									alert('组件标题长度不能超过30');
									return;
								}
								if (editingTitle != null) {
									editingTitle.empty().append(input);
								}
								$(this).dialog('close');
							}
						}
					});
		},
		_createEditor : function() {
			$('#richEditorTextAreaDialog').dialog({
				autoOpen : false,
				width : 820,
				zIndex : 100000,
				modal : true,
				open : function() {
					$('#richEditorTextArea').val(editing.html());
					DesignerUtils.initKissyEditor();
				},
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						if (editing != null) {
							editing.html(KEDITOR.getData())
							KEDITOR.setData('');
						}
						$(this).dialog('close');
					}
				},
				close : function() {
					$('#richEditorTextAreaDialog')
							.empty()
							.append('<textarea id="richEditorTextArea" style="width:98%;height:250px"></textarea>');
				}
			});
			// DesignerUtils.initKissyEditor();
		},
		_createAlimamaBM : function() {
			var isEffect = false;;
			$('#alimamaBMDialog').dialog({
				show : isEffect ? 'drop' : null,
				hide : isEffect ? 'explode' : null,
				bgiframe : true,
				autoOpen : false,
				width : 620,
				zIndex : 100000,
				modal : true,
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						if (editingAlimamaFlashBM
								&& editingAlimamaFlashBM != null) {
							var oldSrc = editingAlimamaFlashBM.attr('src');
							var newSrc = $('#alimamaBM').val();
							if (newSrc == '') {
								alert('请填写阿里妈妈广告牌地址');
								return;
							}
							if (oldSrc != newSrc) {
								editingAlimamaFlashBM.attr('src', newSrc);
								WidgetUtils
										.flashView_init(editingAlimamaFlashBM);
							}
						}
						$(this).dialog('close');
					}
				},
				close : function() {
				}
			});
			$('#modifyAlimamaBM').button().click(function() {
						var src = $('#alimamaBM').val();
						var url = DesignerUtils.validateAlimamaFlashBM(src);
						if (url && url.length > 0) {
							var win = window.open(url);
							if (!win) {
								alert('请设置浏览器允许打开当前弹出窗口');
							}
						}
					});
		},
		/**
		 * 创建颜色选择器
		 */
		_createColorPicker : function() {
			$('#colorPicker').ColorPicker({// 颜色选择器
				onBeforeShow : function() {
					if (editingColor != null) {
						$(this).ColorPickerSetColor($.fmtColor($('div',
										editingColor).css('backgroundColor'),
								'hexadecimal'));
					}
				},
				onChange : function(hsb, hex, rgb) {
					if (editingColor != null) {
						$('div', editingColor).css('background-color',
								'#' + hex);
						var id = editingColor.attr('id');
						if (!id || id == null) {
							id = '';
						}
						switch (id) {
							case '' :// 主题设计器
								$('#themeRoller').themeRoller('changeTheme',
										'color', editingColor, '#' + hex);
								break;
							case 'hc_c' :// 搜索框热词颜色
								$('.keyLabel1 a').css('color', '#' + hex);
								break;
						}

					}
				}
			}).hide();
		}
	});

})(jQuery);
