/**
 * 组件工具栏
 * 
 * @author fxy
 */
(function($) {
	var self, yuiEditor;
	$.widget("ui.widgetHandle", {
		/**
		 * 参数
		 */
		options : {},
		/**
		 * 显示工具栏中指定按钮
		 */
		display : function(array) {
			$('#widgetSet').show();
			$('#ui-designer-widget-handle').fadeIn();
			if (!isDragWidget) {
				$('#add-widget').fadeIn();
			} else {
				$('#add-widget').hide();
			}
		},
		/**
		 * 还原频道
		 */
		_restoreChannel : function() {
			var widget = $('#ui-designer-widget-handle').parent();
			var name = widget.attr("name");
			$('#channelsSelect').val(widget[name]('option', 'value'));
		},
		/**
		 * 还原自定义组件
		 */
		_restoreCustomeWidget : function() {

		},
		/**
		 * 推广组还原
		 */
		_restoreGroups : function() {
			var widget = $('#ui-designer-widget-handle').parent();
			var name = widget.attr("name");
			var gid = widget[name]('option', 'gid');
			var sortBy = widget[name]('option', 'sortBy');
			if (gid
					&& gid.length > 0
					&& ($('#itemGroups option[value="' + gid + '"]').length > 0)) {
				$('#itemGroups').val(gid);
			} else {
				$('#itemGroups').val(0);
			}
			if (sortBy) {
				$('#itemsSortBy').val(sortBy).show();
			}
		},
		/**
		 * 创建组件工具栏
		 */
		_create : function() {

		},
		/**
		 * 组件工具栏初始化
		 */
		_init : function() {
			self = this;
			o = self.options;
			if ($.browser.msie && $.browser.version == '6.0') {
				$('#ui-designer-widget-handle').attr('title', '').css('cursor',
						'auto');
			}
			// 新增
			$('#add-widget').click(function() {
						try {
							editingWidget = $('#ui-designer-widget-handle')
									.parent();// 当前组件
							$('#designer-widgets-dialog').dialog('open');
						} catch (e) {
						};
						return false;
					});
			// 上移
			$('#moveUp').click(function() {
						var widget = $('#ui-designer-widget-handle').parent();// 当前组件
						var prevWidget = widget
								.prevAll('.ui-designer-widget:first');
						if (prevWidget.length == 0) {// 如果前边没有
							widget.parent().append(widget);// 追加至最后
						} else {
							prevWidget.before(widget);// 向前移动一位
						}
					});
			// 下移
			$('#moveDown').click(function() {
						var widget = $('#ui-designer-widget-handle').parent();// 当前组件
						var nextWidget = widget
								.nextAll('.ui-designer-widget:first');
						if (nextWidget.length == 0) {// 如果后边没有
							widget.parent().prepend(widget);// 追加至最前
						} else {
							nextWidget.after(widget);// 向前移动一位
						}
					});
			// 编辑组件
			$('#widgetSet', $('#ui-designer-widget-handle')).unbind('click')
					.click(function() {
								var widget = $('#ui-designer-widget-handle')
										.parent();// 当前组件
								var name = widget.attr("name");
								widget[name]('widgetSet');
							});
			// 移除组件
			$("#widgetRemove", $('#ui-designer-widget-handle')).unbind("click")
					.click(function() {
								var widget = $('#ui-designer-widget-handle')
										.parent();
								if (confirm('您确定要删除此组件吗？')) {
									self._removeWidget(widget);
								}
							});
		},
		/**
		 * 移除指定组件
		 */
		_removeWidget : function(widget) {
			$('#ui-designer-widget-handle').hide();// 隐藏工具栏
			$('body').prepend($('#ui-designer-widget-handle'));// 工具栏移入内容区
			if (widget == null || !widget) {
				return;
			}
			if (!widget.hasClass("ui-designer-widget")) {
				return;
			}
			var others = widget.siblings().length;
			var container = widget.parents('.ui-designer-container');
			widget.remove();// 移除当前组件
			// TODO 新版本设计器
			if (isDragWidget == false && others == 0 && container) {
				container.prepend(addWidgetA());
			}
		},
		/**
		 * 加载动画
		 */
		_loading : $('<div class="ui-designer-loading">正在加载数据,请稍候...<img src="/designer/assets/images/loading.gif"/></div>'),
		/**
		 * 为当前组件显示加载动画
		 * 
		 * @param {}
		 *            widget
		 */
		loading : function() {
			var widget = $('#ui-designer-widget-handle').parent();
			widget.prepend(self._loading);
			self._loading.show();
		},
		/**
		 * 移除当前组件的加载动画
		 * 
		 * @param {}
		 *            widget
		 */
		complete : function(widget) {
			self._loading.hide();
			self._loading.remove();
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
		 * 加载推广组
		 * 
		 * @param {}
		 *            widget
		 */
		loadItems : function() {
			var widget = $('#ui-designer-widget-handle').parent();
			var name = widget.attr("name");
			var id = widget[name]('option', 'gid');
			self.loading();// 加载动画
			var sender = new WindSender("/router/member/designer/itemgroup/"
					+ id);
			sender.load('GET', {}, function(response) {
						if (response.isSuccess()) {
							if (response.body.length > 0) {
								self.items(id, response.body);
								self.complete();
								widget[name]('refresh', 'group');// 刷新
							} else {
								self.complete();
								widget[name]('refresh', 'group');// 刷新
							}
						} else {
							alert(response.msg);
							self.complete();
						}
					});
		},

		/**
		 * 推广组
		 * 
		 * @param {}
		 *            widget
		 */
		groups : function(widget) {
			var widget = $('#ui-designer-widget-handle').parent();
			var name = widget.attr("name");
			$('#itemGroups').show().unbind('change').change(function() {
						var id = $(this).val();
						if (id == "") {
							alert("未选中推广组");
							return;
						}
						if (self.items(id) == null) {// 如果尚未获取此推广组数据
							widget[name]('option', 'gid', id);
							self.loadItems();
						} else {
							widget[name]('refresh', 'group');// 刷新
						}
					});
			widget[name]('refresh', 'group');// 刷新
		}
	});
})(jQuery);
