/**
 * 容器
 */
(function($) {
	$.widget("ui.designerContainer", {
		/**
		 * 参数
		 */
		options : {},
		/**
		 * 返回当前组件源码
		 */
		toSource : function(isValidate) {
			var _container = '<div class="ui-designer-container '
					+ this.element.attr("class").split(' ')[1]
					+ '" style="margin-right:'
					+ this.element.css('margin-right') + '">';// 容器
			this.element.find('.ui-designer-widget').each(function() {
						var name = $(this).attr("name");
						var _widget = $(this)[name]('toSource', isValidate);
						_container += _widget;
					});// 查找当前容器内所有组件
			_container += "</div>";
			return _container;
		},
		/**
		 * 移入组件事件(生成组件工具栏)
		 */
		containerOver : function() {

		},

		/**
		 * 移出组件事件
		 */
		containerOut : function() {

		},

		/**
		 * 创建容器
		 */
		_create : function() {
		},

		/**
		 * 容器初始化
		 */
		_init : function() {
			var self = this;
			var container = this.element;
			// var containerHandle = $('.ui-designer-container-handle');
			var oSize = $('#ui-designer-size');
			// DesignerUtils.displaySize(containerHandle);
			// 显示容器边框
			container.css("border-style", "solid");
			container.width(container.width() - 2);
			// 为容器注册拖拽边框
			// 所有容器内部排序
			container.bind('movedown', function(event) {
						alert(1);
						event.stopPropagation();
					});
			if ($.browser.msie && $.browser.version == '6.0') {
				// TODO 暂时屏蔽IE6.0下的拖拽
			} else {
				container.sortable({
					iframeFix : true,
					revert : true,
					items : '.J_TBox',
					handle : ".ui-designer-widget-handle",
					connectWith : ['.ui-designer-container'],
					start : function() {
						isWidgetHandle = false;
					},
					receive : function(event, ui) {// 容器间拖拽判断是否可放入当前容器
						var widget = ui.item;
						if (ui.item.hasClass("ui-draggable")) {// 如果是组件树拖拽
							var wname = ui.item.attr('wname');
							var placeHolder = placeHolders[wname];
							widget = $(placeHolder['html']);
						}
						if ('widgetCustomer' == widget.attr('name')
								&& ui.sender != null) {
							if (ui.sender.hasClass('ui-designer-container')) {
								alert('该组件不支持多个容器间拖拽');
								ui.sender.sortable('cancel');
								return;
							}
						}
						var minWidth = self._getMinWidth(widget);
						if (minWidth) {
							minWidth = parseInt(minWidth);// 如果最小宽度存在并且大于当前容器宽度
							if (minWidth > $(this).width() && ui.sender != null) {// 如果是在容器中拖拽
								if (ui.sender.hasClass('ui-designer-container')) {
									alert('该组件无法放入当前容器');
									ui.sender.sortable('cancel');
								}
								return;
							}
						}
					},
					stop : function() {
						isWidgetHandle = true;
					},
					over : function(event, ui) {
					},
					start : function(event, ui) {
					},
					update : function(event, ui) {
						var targetParent = $(this);
						if (ui.item.hasClass("ui-draggable")) {// 如果是组件树拖拽
							var wname = ui.item.attr('wname');
							var placeHolder = placeHolders[wname];
							var _widget = $(placeHolder['html']);
							ui.item.replaceWith(_widget);
							var _minWidth = self._getMinWidth(_widget);
							if (_minWidth) {
								_minWidth = parseInt(_minWidth);
								if (_minWidth > $(this).width()) {
									alert('该组件无法放入当前容器');
									_widget.remove();
									return;
								}
							}
							var name = _widget.attr("name");
							if ('widgetCustomer' == name) {
								if (self.options.playout != ui.item
										.attr('layout')) {
									alert('该自定义组件与当前容器不匹配');
									_widget.remove();
									return;
								}
							}
							$('.widget-title', _widget).css('color', '')
									.text('双击编辑标题');// 如果是工具栏拖拽

							if ('widgetCustomer' == name) {// 自定义组件
								_widget[name]({
											playout : self.options.playout,
											wid : ui.item.attr('wid')
										});// 注册组件
								self.selectedWidget = _widget;// 当前选中组件
								_widget[name]('refresh', 'init');// 注册组件
							} else {// 非自定义组件
								_widget[name]({
											playout : self.options.playout
										});// 注册组件
								self.selectedWidget = _widget;// 当前选中组件
								_widget[name]('refresh', 'init');// 注册组件
								_widget[name]('widgetSet');// 弹出编辑框
							}

						} else {
							if (ui.sender == targetParent) {// 如果是源容器排序返回
								return;
							}
							if (ui.sender == null
									&& !ui.item.hasClass("ui-draggable")) {// 如果是本容器内排序返回
								return;
							}
							// 目标容器新增组件时触发宽度调整及拉伸事件注册
							$('.ui-designer-widget-helper', ui.item).remove();
							var name = ui.item.attr("name");
							ui.item[name]({
										playout : self.options.playout
									});// 注册组件
							self.selectedWidget = ui.item;// 当前选中组件
							ui.item[name]('refresh', 'init');// 注册组件
						}
					}
				}).disableSelection();
			}
			self.options.playout = self._convertLayout(container.attr('class')
					.split(' ')[1]);
			var widgets = $('.ui-designer-widget', container);
			if (widgets.length == 0) {
				if (!isDragWidget) {
					container.prepend(addWidgetA());
				}
			} else {// 注册具体组件
				widgets.each(function() {
							var name = $(this).attr("name");
							$(this)[name]({
										playout : self.options.playout
									});
						});
			}
		},
		_convertLayout : function(layoutClass) {
			switch (layoutClass) {
				case 'middle-1' :
					return '0';
				case 'right-1-3' :
					return '1';
				case 'middle-1-3-1' :
					return '2';
				case 'left-1-1' :
					return '3';
				case 'right-1-1' :
					return '3';
				case 'left-1-1-1' :
					return '4';
				case 'middle-1-1-1' :
					return '4';
				case 'right-1-1-1' :
					return '4';
				case 'left-1-3' :
					return '5';
				case 'left-1-3-1' :
					return '6';
				case 'right-1-3-1' :
					return '6';
				default :
					return '-1';
			}
		},
		/**
		 * 当前组件与当前容器是否匹配
		 */
		_getMinWidth : function(widget) {
			var minWidth = widget.attr('minWidth');
			if (!minWidth) {
				var metadata = widget.attr('metadata');
				metadata = eval('(' + metadata + ')');
				minWidth = metadata.minWidth;
			}
			return minWidth;
		},
		_placeHolder : function(event, ui) {
			// var place = $('.ui-sortable-placeholder');
			// var container = place.parents('.ui-designer-container:first')
			// .attr('class').split(' ')[1];// 获取容器标识class
			// var placeHolder = placeHolders[ui.item.attr('name')];
			// if (!placeHolder) {
			// return;
			// }
			// var background = place.css('background');
			// if ($.inArray(container, placeHolder.disable) != -1) {//
			// 如果当前容器不可放置该组件
			// place.css('background',
			// 'url(/assets/min/images/widget-disable.png) no-repeat')
			// .height(80);
			// } else if (ui.item.hasClass('ui-draggable')) { // PlaceHolder
			// // 显示预览图
			// place.css(
			// 'background',
			// 'url(/assets/min/images/widget/' + placeHolder.image
			// + '.png) no-repeat').height(placeHolder.height);
			// } else {
			// place.css('background', '');
			// }
		}
	});
})(jQuery);
