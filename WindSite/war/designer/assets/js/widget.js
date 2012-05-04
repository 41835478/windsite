(function($) {
	$.widget("ui.designerWidget", {
		/**
		 * 参数
		 */
		options : {
			align : 'left',
			version : '1.0'
		},
		noPicture : '/assets/min/images/nopicture.gif',
		/**
		 * 返回当前组件源码
		 */
		toSource : function(isValidate) {
			var widget = this.element;// 当前组件
			var _source = '<div class="ui-designer-widget"  name="'
					+ widget.attr('name')
					+ '" style="display:block;width:100%;';
			if ('true' != this.options.autoSize) {// 如果不是自动匹配大小,则设置高度
				_source += 'height:' + widget.height() + 'px;'
			}
			_source += (this.options.position
					? ('position:' + this.options.position)
					: '')
					+ '" metadata=\''
					+ DesignerUtils.json2str(this.options)
					+ '\' align="' + this.options.align + '">';// 组件容器
			var header = widget.find('.ui-designer-widget-header');// 组件标题
			var title = header.find('.widget-title').clone()
					.removeAttr('title');
			var more = header.find('.ui-designer-widget-more').clone();
			if (this.options.gid && this.options.gid.length > 0
					&& this.options.gid != '0') {
				more.attr('href', '/group/' + this.options.gid + '.html');
			} else {
				more.attr('href', '#');
			}
			if ('双击编辑标题' == title.text()) {
				title.text('');
			}
			if (header.length > 0) {
				var shopsMore = header.find('.ui-designer-widget-shops-more');
				if (shopsMore.length > 0) {// 店铺更多
					more = shopsMore.clone().attr('href',
							'/router/site/shops/14?pid=%7Bpid%7D');
				}
				_source += '<div class="ui-designer-widget-header" align="left" style="cursor:default;">'
						+ $('<div></div>').append(title).append(more).html()
						+ '</div>';// 移除title属性
			}
			_source += this._toSource(isValidate) + "</div>";
			return _source;
		},
		/**
		 * 组件刷新
		 */
		refresh : function(type) {
			this._refresh(type);
			// if (isCommissionView) {// 如果是佣金查看模式
			// $('.item-commission', this.element).show();
			// }
		},
		/**
		 * 还原组件信息
		 */
		restoreWidget : function() {
			var metadata = this.element.attr('metadata');
			metadata = eval('(' + metadata + ')');
			if (metadata && metadata != null) {
				for (var p in metadata) {
					if (p == 'clickUrl') {
						this._setOption(p, metadata[p].replace(
										'mm_10011550_0_0', PID).replace(
										'mm_13667242_0_0', PID));
					} else {
						this._setOption(p, metadata[p]);
					}
				}
			}

		},
		/**
		 * 移入组件事件(生成组件工具栏)
		 */
		widgetOver : function() {
			if (!isWidgetHandle) {
				return;
			}
			var o = this.options;
			if ('true' == o.resizable) {// 如果可拖拽高度
				$('#custome-bar,.custome-bar-border').remove();
				var border = this.element.css('border-bottom-style');
				var bar = $('#ui-designer-widget-handle');
				this.element.prepend(bar);
				if (border != 'inset') {
					this.element.css('border-bottom', '2px inset #348feb');
				}
				bar.width(this.element.width());
			} else {
				var bar = $('#ui-designer-widget-handle');
				this.element.prepend(bar);
				bar.width(this.element.width());
			}
			this._widgetOver();
		},

		/**
		 * 移出组件事件
		 */
		widgetOut : function() {
			if (!isWidgetHandle) {
				return;
			}
			var border = this.element.css('border-bottom-style');
			if (border == 'inset') {
				// var width = this.element.width() + 6;
				this.element.css('border', '').css('margin-top', 0).css(
						'margin-left', 0);
				// $('.ui-designer-widget-header', this.element).width(width);
			}
			var bar = $('#ui-designer-widget-handle');
			bar.hide();
			$('body').append(bar);
			// $('.ui-resizable-handle', this.element).hide();
			this._widgetOut();
		},
		/**
		 * 组件名称
		 */
		widgetName : function() {
			return this.element.attr("name");
		},
		/**
		 * 存储推广组ID
		 */
		storeGroups : function(gid) {
			var gids = $('body').data('gids');
			if (gids == null) {
				gids = gid;
			} else {
				if (gids.indexOf(gid) == -1)// 如果不包含此推广组
					gids += "," + gid;
			}
			$('body').data('gids', gids);
		},
		/**
		 * 返回当前组件关联推广组商品数据
		 */
		_items : function() {
			var gid = this.options.gid;
			var sortBy = this.options.sortBy;
			var items = null;
			if (gid && gid != null && gid != '0')
				items = $('body').data('g_' + gid).slice();// 复制推广组商品
			if (items != null && items.length > 0 && sortBy) {// 排序
				if (sortBy == "sortOrder_asc") {
					return items;
				}
				var _sorts = sortBy.replace('_asc', ' asc').replace('_desc',
						' desc').split(' ');
				if ('asc' == _sorts[1]) {// 升序
					items.sort(function(a, b) {
								try {
									var e0 = a[_sorts[0]] - b[_sorts[0]];// 指定列排序
									if (e0) {
										return e0;
									} else {// 如果false则按照默认规则再次排序
										return a['sortOrder'] - b['sortOrder'];
									}
								} catch (e) {
									return false;
								}
							});// 升序
				} else {// 降序
					items.sort(function(a, b) {
								try {
									var e0 = b[_sorts[0]] - a[_sorts[0]];// 指定列排序
									if (e0) {
										return e0;
									} else {// 如果false则按照默认规则再次排序
										return a['sortOrder'] - b['sortOrder'];
									}
								} catch (e) {
									return false;
								}
							});// 降序
				}
			}

			return items;
		},
		/**
		 * 创建组件
		 */
		_create : function() {
			this._createDesignerWidget();// 子类
		},

		/**
		 * 组件初始化
		 */
		_init : function() {
			var self = this;
			var o = this.options;
			widget = self.element;// 组件
			self.restoreWidget();// 还原组件信息
			// 注册拉伸事件
			var width = widget.parent().width();
			widget.width(width);
			var minWidth = 0;
			var minHeight = 0;
			var handles = 's,e,se';
			if (o.minWidth) {
				minWidth = o.minWidth;
			}
			if (o.minHeight) {
				minHeight = o.minHeight;
			}
			if (o.handles) {
				handles = o.handles;
			}
			if (o.align) {
				widget.attr('align', o.align);
			}
			if ('true' == o.resizable) {// 如果组件可拉伸
				widget.resizable({
							autoHide : true,
							handles : 's',
							minWidth : minWidth,
							minHeight : minHeight,
							maxWidth : width,
							start : function(event, ui) {
								isWidgetHandle = false;
							},
							stop : function(event, ui) {
								isWidgetHandle = true;
								self.refresh('resizable');// 执行当前组件的拉伸回调事件
							}
						});
			}
			// 注册移入移出事件
			widget.hover(function(event) {// over
						self.widgetOver();
					}, function(event) {// out
						self.widgetOut();
					});
			DesignerUtils.displaySize($('.ui-resizable-handle', widget));
			self._initDesignerWidget();// 子类
			var header = widget.find('.ui-designer-widget-header');// 组件标题
			if (header.length > 0) {// 如果当前组件有title
				header.attr('title', '双击编辑标题');
				$('.ui-designer-widget-more', header).removeAttr('href')
						.unbind('click').click(function() {
							var gid = o.gid;
							if (gid && gid.length > 0 && gid != '0') {
								$('#itemsMoreVersion').val(Math.random());
								$('#itemsMorePid').val(PID);
								$('#itemsMore').attr('action',
										'/group/' + gid + '.html');
								$('#itemsMore').submit();
							} else {
								alert('尚未配置推广组');
							}
						}).show();
				var title = $('.widget-title', widget);
				if (title.text() == '') {
					title.text('双击编辑标题');
				}
				var editor = $('#tinymce');
				header.dblclick(function() {
							var title = header.find('.widget-title');
							$('#widgetTitleInput').val(title.text());
							$('#widgetTitleDialog').dialog('open');
							editingTitle = title;
						});
			}
			// if (isCommissionView) {// 如果是佣金查看模式
			// $('.item-commission', widget).show();
			// }
		},
		/**
		 * TODO 新版本设计器
		 */
		addWidgetSelf : function() {
			// 目标容器新增组件时触发宽度调整及拉伸事件注册
			$(this).removeClass("ui-draggable");// 移除drag样式标记(在reizable中会因为此标记将此组件设置为绝对定位)
			$('.ui-designer-widget-helper', $(this)).remove();
			var leftW = parseInt($(this).css("borderLeftWidth"));
			var rightW = parseInt($(this).css("borderRightWidth"));
			if (isNaN(leftW)) {
				leftW = 0;
			}
			if (isNaN(rightW)) {
				rightW = 0;
			}
			$(this).width($(this).parent().width() - leftW - rightW);// 计算当前组件宽度(需减去左右border宽度)
			this.refresh();// 刷新组件
		},
		/**
		 * 子类初始化
		 */
		_initDesignerWidget : function() {
		},
		/**
		 * 子类创建
		 */
		_createDesignerWidget : function() {
		},
		/**
		 * 源码
		 */
		_toSource : function() {

		},
		/**
		 * 子类刷新
		 */
		_refresh : function(type) {

		},
		/**
		 * 子类移入事件
		 */
		_widgetOver : function() {
		},
		/**
		 * 子类移出事件
		 */
		_widgetOut : function() {
		}

	});
})(jQuery);
/**
 * 宏组件
 * 
 * @author fxy
 */
(function($) {
	var groupsWidget = ['itemsLinkView', 'itemsThumbView', 'itemsListView',
			'itemsScrollableView'];
	$.widget("ui.designerMacroWidget", $.ui.designerWidget, {
		options : {
			gid : '0',// 推广组ID
			sortBy : 'sortOrder_asc'// 排序
			// 长度
		},
		widgetSet : function() {
			var self = this;
			var component = this.element;
			editingGroupEditor = component;
			$('#widget-groups-dialog').dialog('open');
		},
		widgetOver : function() {
			if (!isWidgetHandle) {
				return;
			}
			var o = this.options;
			if ('true' == o.resizable) {// 如果可拖拽高度
				$('#custome-bar,.custome-bar-border').remove();
				var border = this.element.css('border-bottom-style');
				var bar = $('#ui-designer-widget-handle');
				this.element.prepend(bar);
				if (border != 'inset') {
					this.element.css('border-bottom', '2px inset #348feb');
				}
				bar.width(this.element.width());
			} else {
				var bar = $('#ui-designer-widget-handle');
				this.element.prepend(bar);
				bar.width(this.element.width());
			}
			var name = this.element.attr('name');
			if ($.inArray(name, groupsWidget) == -1) {
				$('#widgetSet').hide();
			} else {
				$('#widgetSet').show();
			}
			this._widgetOver();
		},
		/**
		 * 返回当前组件源码
		 */
		_toSource : function(isValidate) {
			if (true == isValidate) {// 如果校验
				var items = $('body').data('g_' + this.options.gid);
				if ((!this.options.gid || this.options.gid == null || this.options.gid == '0')
						|| !items || items.length == 0) {// 如果gid不存在或者等于0或者gid商品不存在
					this.element.expose({
								api : true,
								color : '#456'
							}).load();
					throw new Error('您的页面中还有推广组类组件没有配置推广组');
				}
			}
			var widget = this.element;// 当前组件
			var name = widget.attr("name");
			var macro = this._toMacro();
			var _source = "<@w." + name + " sortBy='" + this.options.sortBy
					+ "' ";
			// 调用真正子类生成macro参数列表
			_source += macro;
			_source += "></@w." + name + ">";
			return _source;
		},
		/**
		 * 子类返回源码
		 */
		_toMacro : function() {
		}

	});
})(jQuery);