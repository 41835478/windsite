/**
 * 类目列表组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.catsListView", $.ui.designerWidget, {
				options : {
					autoSize : 'true'
				},
				_toSource : function() {
					var widget = this.element;// 当前组件
					var clone = $('.widget-catslistview-cats', widget).clone();
					this._convertHref(clone);
					var _source = $('<div></div>').append(clone).html();
					return _source;
				},
				_initDesignerWidget : function() {
					var component = this.element
							.find(".widget-catslistview-cats");
					WidgetUtils.catsListView_init(component.show());
//					component.children().each(function() {
//						$('#itemCatsSelect').itemCatsSelect('addLiHover',
//								$(this));
//					});
				},
				_convertHref : function(widget) {
					$('li a', widget).each(function() {
						var href = $(this).attr('href').replace(PID,
								'%7Bpid%7D').replace(PID, '%7Bpid%7D');
						$(this).attr('href', href);
					});
					return widget;
				},
				widgetSet : function() {
					var self = this;
					var component = this.element
							.find(".widget-catslistview-cats");
					// if (editingCats != null) {// 保存当前类目列表
					// editingCats.empty();
					// $('.add-cats-grid li').each(function() {
					// editingCats
					// .append(self.saveItemLi($(this)));
					// });
					// WidgetUtils.catsListView_init($(this));
					// }
					// 打开当前类目列表
					$('.add-cats-grid').empty();
					if ($('li', component).length > 0) {
						$('#addCatsButton').show();
						$('li', component).each(function() {
									$('.add-cats-grid').append(self
											._itemLi($(this)));
								});
					}
					$('#itemCatsSelect').dialog('open');
					editingCats = component;
				},
				/**
				 * 将选中的类目保存至组件
				 */
				saveItemLi : function(li) {
					if (li && li.length > 0) {
						return $('<li cid="' + li.attr('cid')
								+ '"><a target="_blank" href="'
								+ li.attr('url') + '" class="cat-title">'
								+ li.text() + '</a></li>');
					}
				},
				/**
				 * 将组件中的类目还原至类目选择器
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
							[$('#widgetRemove')]);// 显示工具栏

				},
				_widgetOut : function() {
				},
				_refresh : function(type) {

				}

			});
})(jQuery);
