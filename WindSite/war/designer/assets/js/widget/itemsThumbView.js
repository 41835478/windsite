/**
 * 商品图片浏览组件(图片大小固定)
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsThumbView", $.ui.designerMacroWidget, {
		options : {
			resizable : 'true',
			gid : '0',// 推广组ID
			m_left : '10',// 宽度
			length : null
			// 长度
		},
		_moreOptions : function() {

		},
		_initDesignerWidget : function() {
			var widget = this.element;
			WidgetUtils.itemsThumbView_init($('.widget-itemsthumbview-items',
					widget));
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
				li = '<li nid="'
						+ item.num_iid
						+ '" co="'
						+ item.commission
						+ '"><div class="item"><div class="pic" align="center"><a class="a-cell" href="'
						+ item.click_url + '" title="' + title
						+ '" xt="i" nid="' + item.num_iid
						+ '" target="_blank"><img src="'
						+ item.pic_url.replace('bao/uploaded', 'imgextra')
						+ '_160x160.jpg" alt="' + title + '" title="' + title
						+ '"/></a></div>';// 图片
				li += '<div class="title"><a target="_blank" title="' + title
						+ '" href="/router/site/item/' + item.id + '">'
						+ item.title + '</a></div>';// 标题
				li += '<div><span class="price-desc">价格:</span><span  class="price"><b>'
						+ item.price + '元</b></span></div></div>';
				li += '</li>';
			} else {
				li = '<li><div class="item"><div class="pic"  align="center"><a class="a-cell" href="#" rel="groups"><img src="'
						+ this.noPicture
						+ '" alt="商品标题" title="商品标题"/></a></div>';// 图片
				li += '<div class="title"><a target="_blank" title="商品标题">商品标题</a></div>';// 标题
				li += '<div><span class="price-desc">价格:</span><span  class="price"><b>0元</b></span></div></div>';
				li += '</li>';
			}
			return li;
		},
		_refresh : function(type) {
			var self = this;
			var widget = self.element;
			var o = this.options;
			var itemWidth = 160;
			var itemHeight = 240;
			var height = widget.height();
			var width = widget.width();
			var component = widget.find(".widget-itemsthumbview-items");
			component.empty();
			if (isNaN(height)) {
				height = 0;
			}
			if (isNaN(width)) {
				width = 0;
			}
			var vCount = parseInt(height / itemHeight);
			if (vCount == 0) {
				vCount = 1;
			}
			var hCount = Math.floor(width / itemWidth);
			var length = this.options.length = hCount * vCount;
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

			$("img", component).bind("error", function() {
						this.src = self.noPicture;
					});

			// var rHeight;// 内部元素真实高度
			var rWidth;// 内部元素真实宽度
			// if (vCount == 1) {// 如果只有一行
			// rHeight = itemHeight + 2 + 20 + 23 + 2;//
			// 单个高度+边框高度+上下间隔+标题高度+组件边框
			// } else {// 如果是多行
			// rHeight = vCount * (itemHeight + 2 + 10) + 20 + 23 + 2;//
			// 行数*(单个宽度+边框宽度+间隔)+上下间隔+标题高度+组件边框
			// }
			if (hCount == 1) {// 如果只有单列
				rWidth = itemWidth + 2 + 20 + 2;// 单个宽度+边框宽度+容器宽度+组件边框
			} else {
				rWidth = hCount * (itemWidth + 10) + 20 + 2;// 列数*(单个高度+边框高度+间隔)+左右间隔+组件边框
			}
			component.height(vCount * 250 + 5);// 图形内部组件高度
			widget.height(component.height() + 30)// 组件高度
			// o.m_left = component.css('margin-left');
			WidgetUtils.itemsThumbView_init($('.widget-itemsthumbview-items',
					widget));
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
			var component = $('.widget-itemsthumbview-items', widget)
			var li = $('li:last', component);
			var hCount = Math.floor(component.width() / li.width());// 计算横排可以放置的数量
			if (li.length == 1) {
				_source += " hCount=" + hCount + " marginleft=\""
						+ li.css('margin-left') + "\" marginright=\""
						+ li.css('margin-right') + "\"";
			}
			_source += " m_left='" + o.m_left + "'";
			return _source;
		}

	});
})(jQuery);
