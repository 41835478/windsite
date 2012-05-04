/**
 * 主题推广组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.topicView", $.ui.designerWidget, {
		options : {
			resizable : 'false',
			autoSize : 'true'
		},
		_toSource : function() {
			var widget = this.element;// 当前组件
			var clone = $('.widget-topicview', widget).clone();
			this._convertHref(clone);
			var _source = $('<div></div>').append(clone).html();
			return _source;
		},
		_initDesignerWidget : function() {
			var component = this.element.find(".widget-topicview");
			WidgetUtils.topicView_init(component.show());
//			component.children().each(function() {
//						$('#topicEditor').topicEditor('addLiHover', $(this));
//					});
		},
		_convertHref : function(widget) {
			$('li a', widget).each(function() {
				var href = $(this).attr('href').replace(PID, '%7Bpid%7D')
						.replace(PID, '%7Bpid%7D');
				$(this).attr('href', href);
			});
			return widget;
		},
		widgetSet : function() {
			var self = this;
			var component = this.element.find(".widget-topicview");
			$('#topicEditor').dialog('open');
			// 打开当前主题列表
			$('#selectedTopics').empty();
			if ($('li', component).length > 0) {
				$('#addTopicsButtonDiv').show();
				$('li', component).each(function() {
							$('#selectedTopics').append(self._itemLi($(this)));
						});
			}
			$('#topicEditor').dialog('open');
			editingTopicEditor = component;
		},
		/**
		 * 将选中的主题保存至组件
		 */
		saveItemLi : function(li) {
			if (li && li.length > 0) {
				var tid = li.attr('tid');
				var image = li.attr('image');
				var tname = li.attr('tname');
				var href = li.attr('href');
				return $('<li tid="'
						+ tid
						+ '" image="'
						+ image
						+ '" tname="'
						+ tname
						+ '" href="'
						+ href
						+ '"><a class="a-cell" href="'
						+ href
						+ '" target="_blank"><img src="'
						+ image
						+ '" width="200px"/></a><div align="center" class="title"><a href="'
						+ href + '" target="_blank">' + tname
						+ '</a><i class="t_r_tms"></i></div></li>');
			}
		},
		/**
		 * 将组件中的主题还原至主题选择器
		 */
		_itemLi : function(li) {
			var result = $('<li tid="' + li.attr('tid') + '" image="'
					+ li.attr('image') + '" href="' + li.attr('href')
					+ '" tname="' + li.attr('tname') + '">' + li.attr('tname')
					+ '</li>')
			$('#topicEditor').topicEditor('addLiHover', result);
			return result;
		},
		_createDesignerWidget : function() {
		},
		_widgetOver : function() {
			$('#ui-designer-widget-handle').widgetHandle('display',
					[$('#widgetRemove')]);// 显示工具栏

		},
		_widgetOut : function() {
		},
		_refresh : function(type) {

		}

	});
})(jQuery);
