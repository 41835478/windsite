/**
 * 商品图片浏览组件(图片大小固定)
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsListView", $.ui.designerMacroWidget, {
		options : {
			resizable : 'true',
			gid : '0',// 推广组ID
			length : null
			// 长度
		},
		_moreOptions : function() {

		},
		_initDesignerWidget : function() {
			$('.widget-itemslistview-items', this.element).show();
			// $('.widget-itemslistview-items .pic a',
			// this.element).fancybox();// fancybox
		},
		_createDesignerWidget : function() {
		},
		_widgetOver : function() {
			$('#ui-designer-widget-handle').widgetHandle('display',
					[$('#widgetRemove'), $('#itemGroups')]);// 显示工具栏

		},
		_widgetOut : function() {
		},
		_itemLi : function(item) {
			var li;
			if (item) {
				var title = convertTitle(item.title);
				li = '<li class="item" nid="'
						+ item.num_iid
						+ '" co="'
						+ item.commission
						+ '"><div class="pic" align="center"><a class="a-cell" href="'
						+ item.click_url + '" nid="' + item.num_iid
						+ '" title="' + title
						+ '" xt="i" target="_blank"><img src="'
						+ item.pic_url.replace('bao/uploaded', 'imgextra')
						+ '_100x100.jpg" alt="' + title + '" title="' + title
						+ '"/></a></div>';// 图片
				li += '<div class="title"><a target="_blank" title="' + title
						+ '" href="/router/site/item/' + item.id + '">'
						+ item.title + '</a></div>';// 标题
				li += '<div class="price-div"><span class="price-desc">价格:</span><span  class="price"><b>'
						+ item.price
						+ '元</b></span><br/><span class="volume-desc">最近成交:</span><span class="volume">'
						+ item.volume + '</span></div>';
				li += '<div class="buy-button"><a href="'
						+ item.click_url
						+ '" target="_blank"><img src="/assets/min/images/list_buy_now_sch.gif"></a></div>';
				li += "</li>";
			} else {
				li = '<li class="item"><div class="pic"  align="center"><a class="a-cell" href="#" rel="groups"><img src="'
						+ this.noPicture
						+ '" alt="商品标题" title="商品标题"/></a></div>';// 图片
				li += '<div class="title"><a target="_blank" title="商品标题">商品标题</a></div>';// 标题
				li += '<div class="price-div"><span class="price-desc">价格:</span><span  class="price"><b>0元</b></span></div>';
				li += '<div class="buy-button"><a target="_blank"><img src="/assets/min/images/list_buy_now_sch.gif"></a></div>';
				li += '</li>';
			}
			return li;
		},
		_refresh : function(type) {
			var self = this;
			var widget = self.element;
			var o = this.options;
			var itemHeight = 130;
			var height = widget.height();
			var component = widget.find(".widget-itemslistview-items");
			component.empty();
			if (isNaN(height)) {
				height = 0;
			}
			var vCount = parseInt(height / itemHeight);
			if (vCount == 0) {
				vCount = 1;
			}
			var length = this.options.length = vCount;
			var items = self._items();
			if (items != null) {
				for (var i = 0; i < length; i++) {
					if (i < items.length) {
						component.append(self._itemLi(items[i]));
					} else {
						component.append(self._itemLi());
					}
				}
			} else {
				for (var i = 0; i < length; i++) {
					component.append(self._itemLi());
				}
			}

			// $("img", component).bind("error", function() {
			// this.src = self.noPicture;
			// });
			// $('.pic a', component).fancybox();// fancybox
			component.height(vCount * 130 + 5);// 组件内部高度
			widget.height(component.height() + 30);// 组件高度
			if (isCommissionView) {// 如果是佣金查看模式
				$('li', component).each(function() {
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
			var _source = "";
			if (gid != null && gid != '0') {// 推广组
				this.storeGroups(gid);
				_source += " items=g_" + gid + "";
			}
			if (length && length != null) {// 显示数量
				_source += " length=" + length;
			}
			return _source;
		}

	});
})(jQuery);
