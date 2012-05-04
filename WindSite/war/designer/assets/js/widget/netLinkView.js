/**
 * 友情链接组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.netLinkView", $.ui.designerWidget, {
				options : {
					resizable : 'true'
				},
				_toSource : function() {
					var widget = this.element;// 当前组件
					var _source = $('<div></div>').append($(
							'.widget-netlinkview', widget).clone().attr(
							'title', '')).html();
					return _source;
				},
				_initDesignerWidget : function() {
					var self = this;
					var widget = this.element;
					var component = widget.find(".widget-netlinkview");
					component.show();
					// component.children().each(function() {
					// $('#netLinkViewEditor').netLinkViewEditor('addLiHover',
					// $(this));
					//					});
				},
				widgetSet : function() {
					var self = this;
					var widget = this.element;
					var component = widget.find(".widget-netlinkview");
					editingNetLink = component;
					$('#netLinkViewEditor').dialog('open');

				},
				/**
				 * 将选中的链接保存至组件
				 */
				saveItemLi : function(li) {
					if (li && li.length > 0) {
						return $('<li cid="' + li.attr('cid')
								+ '"><a target="_blank" href="'
								+ li.attr('url') + '" class="title">'
								+ li.text() + '</a></li>');
					}
				},
				/**
				 * 将组件中的链接还原至链接选择器
				 */
				_itemLi : function(li) {
					if (li && li.length > 0) {
						var a = $('a', li);
						var li = $('<li cid="' + li.attr('cid') + '" url="'
								+ a.attr('href') + '">' + a.text() + '</li>');
						$('#itemCatsSelect').itemCatsSelect('addLiHover', li);
						return li;
					}
					return null;
				},
				_createDesignerWidget : function() {
				},
				_widgetOver : function() {
					$('#ui-designer-widget-handle').widgetHandle('display',
							[$('#widgetSet'), $('#widgetRemove')]);// 显示工具栏

				},
				_widgetOut : function() {
				},
				_refresh : function(type) {

				}
			});
})(jQuery);
