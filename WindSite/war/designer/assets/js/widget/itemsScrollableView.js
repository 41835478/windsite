/**
 * 商品图片横向滚动浏览组件(图片大小固定)
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsScrollableView", $.ui.designerMacroWidget, {
				options : {
					gid : '0',// 推广组ID
					length : 10
					// 长度
				},
				_moreOptions : function() {

				},
				_initDesignerWidget : function() {
					WidgetUtils.itemsScrollableView_init($(
							'.widget-itemsscrollableview-items', this.element
									.height(225)));
				},
				_createDesignerWidget : function() {
				},
				_widgetOver : function() {
					$('#ui-designer-widget-handle').widgetHandle('display',
							[$('#widgetRemove'), $('#itemGroups')]);// 显示工具栏

				},
				_widgetOut : function() {
				},
				_itemLi : function(count, item) {
					var li;
					if (item) {
						var title = convertTitle(item.title);
						li = '<div class="d-a-i" nid="'
								+ item.num_iid
								+ '" co="'
								+ item.commission
								+ '"'
								+ (count != 4
										? ' style="margin-right:10px;"'
										: '')
								+ '><a href="/item/'
								+ item.id
								+ '.html" title="'
								+ title
								+ '" nid="'
								+ item.num_iid
								+ '" target="_blank"><img src="'
								+ item.pic_url.replace('bao/uploaded',
										'imgextra') + '_160x160.jpg" alt="'
								+ title + '" title="' + title + '"/></a></div>';// 图片
					} else {
						li = '<div class="d-a-i"'
								+ (count != 4
										? ' style="margin-right:10px;"'
										: '')
								+ '><a href="'
								+ this.noPicture
								+ '" title="商品标题" click_url="#" price="0"><img src="'
								+ this.noPicture
								+ '" alt="商品标题" title="商品标题"/></a></div>';// 图片
					}
					return li;
				},
				_refresh : function(type) {
					var self = this;
					var widget = self.element;
					var o = this.options;
					var playout = widget.parent().designerContainer('option',
							'playout');
					var count = 3;
					switch (playout) {
						case '0' :
							count = 5;
							break;
						case '1' :
							count = 4;
							break;
						case '2' :
							count = 3;
							break;
					}
					o.count = count;
					var component = widget
							.find(".widget-itemsscrollableview-items .items");
					component.empty();
					var items = self._items();
					var length = 10;
					if (items != null) {
						var itemDiv = null;
						for (var i = 0; i < items.length; i++) {
							if (i % count == 0) {
								itemDiv = $('<div class="item"'
										+ (count != 4
												? ' style="margin-left:10px;"'
												: '') + '></div>');
							}
							itemDiv.append(self._itemLi(count, items[i]));
							if ((i % count == (count - 1))
									|| (i == items.length - 1)) {
								component.append(itemDiv);
							}
						}
					} else {
						for (var i = 0; i < length; i++) {
							if (i % count == 0) {
								itemDiv = $('<div class="item"'
										+ (count != 4
												? ' style="margin-left:10px;"'
												: '') + '></div>');
							}
							itemDiv.append(self._itemLi(count));
							if ((i % count == (count - 1)) || (i == length - 1)) {
								component.append(itemDiv);
							}
						}
					}
					WidgetUtils.itemsScrollableView_init($(
							'.widget-itemsscrollableview-items', this.element));
					if (isCommissionView) {// 如果是佣金查看模式
						$('.d-a-i', component).each(function() {
									addViewCommission($(this));
								});
					}
				},
				_toMacro : function() {
					var widget = this.element;// 组件
					var o = this.options;
					// macro
					var gid = o.gid;
					var length = o.length;
					var count = o.count;
					var _source = "";
					if (gid != null && gid != '0') {// 推广组
						this.storeGroups(gid);
						_source += " items=g_" + gid + "";
					}
					if (length && length != null) {// 显示数量
						_source += " length=" + length;
					}
					if (count && count != null) {// 每行显示数量
						_source += " count=" + count;
					}
					return _source;
				}

			});
})(jQuery);
