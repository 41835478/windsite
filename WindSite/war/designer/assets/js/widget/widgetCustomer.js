/**
 * 主题推广组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.widgetCustomer", $.ui.designerWidget, {
		options : {
			resizable : 'false',
			autoSize : 'true',
			cheight : null,
			wid : null,
			wtype : null
		},
		widgetSet : function() {
			var self = this;
			var component = this.element;
			editingCustomeEditor = component;
			$('#widget-customes-dialog').dialog('open');
		},
		_toSource : function() {
			var widget = this.element;// 当前组件
			var customes = $('body').data('customes');
			if (customes == null) {
				customes = [];
			}
			if (this.options.wid) {
				customes.push(this.options.wid);
			} else {
				throw new Error('自定义组件发生错误！');
			}
			return '<div class="widget-customer">${widgetCustomer("'
					+ this.options.wid + '","' + PID + '")}</div>';
		},
		/**
		 * 移入组件事件(生成组件工具栏)
		 */
		widgetOver : function() {
			if (!isWidgetHandle) {
				return;
			}
			var bar = $('#ui-designer-widget-handle');
			this.element.prepend(bar);
			bar.width(this.element.width());
			$('#ui-designer-widget-handle').fadeIn();
			$('#widgetSet').show();
		},
		/**
		 * 移出组件事件
		 */
		widgetOut : function() {

		},
		_initDesignerWidget : function() {
			$('.ui-designer-widget-header', this.element).remove();
			var component = $('.widget-customer', widget).show();
			if (component.children().size() == 0) {
				this.customeWidgetLoad(this.options.wid, this.options.wtype,
						this.options.cheight);// 加载最新
			} else {
				if (component.find('.prop-list').length > 0) {
					initSearchWidget(widget);
				}
			}
		},
		/**
		 * 加载指定自定义组件(如果未指定，则加载默认第一个)
		 */
		customeWidgetLoad : function(wid, wtype, cheight) {
			var self = this;
			var widget = this.element;
			if (wid == null || wid == "") {// 如果没有指定组件，则加载当前用户默认
				alert('发生错误【未指定自定义组件】');
				widget.remove();
				isRemoveAddA = false;
				return;
			}
			var component = $('.widget-customer', widget).show();
			component
					.prepend('<strong style="font-size:14px;">正在更新该组件最新内容...</strong>');
			$.ajax({
						url : '/router/member/designer/customewidget/' + wid
								+ '?v=' + Math.random(),
						type : 'GET',
						data : {},
						dataType : 'html',
						contentType : "charset=utf-8",
						beforeSend : function(xhr) {
							xhr.setRequestHeader("WindType", "AJAX");// 请求方式
							xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
						},
						error : function(request, textStatus, errorThrown) {
							component.empty();
							alert('指定组件加载失败,请重新刷新设计器');
						},
						success : function(data) {
							component.empty().append(data);
							widget.widgetCustomer('option', 'wtype', wtype);// 存储类型
							widget.widgetCustomer('option', 'wid', wid);// 存储当前组件
							// widget.widgetCustomer('option', 'cheight',
							// cheight);// 存储当前组件
							self.customeWidgetBuild();
							if (widget.find('.prop-list').length > 0) {
								initSearchWidget(widget);
							}
						}
					});
		},
		customeWidgetBuild : function() {
			$('.l-a-s,.l-a-s-p,.l-d-a-i,.l-d-a-i-p').parent().sortable();
		},
		_createDesignerWidget : function() {
		},
		_refresh : function(type) {

		}

	});
})(jQuery);
