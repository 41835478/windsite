(function($) {
	$.widget("ui.taokeItemsSelect", {
		/**
		 * 参数
		 */
		options : {},
		/**
		 * 创建组件
		 */
		_create : function() {

		},
		/**
		 * 组件初始化
		 */
		_init : function() {
			var self = this;
			o = self.options;
			var itemsSelect = self.element;// 组件
			itemsSelect.dialog({
				bgiframe : true,
				autoOpen : false,
				height : 400,
				width : 620,
				zIndex : 100000,
				modal : false,
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						if (editing == null) {
							return;
						}
						var checked = $('input[type="checkbox"][name="tis"]:checked');
						if (checked.length == 0) {
							alert('尚未选择商品');
							return;
						}
						var html = '<ul class="widget-tisul">';
						checked.each(function() {
									var li = $(this).parents('li');
									var title = convertTitle(li.attr('title'));
									var pic_url = li.attr('pic_url');
									var click_url = li.attr('click_url');
									html += '<li><a href="' + click_url
											+ '" target="_blank">' + title
											+ '</a></li>';
								});
						tinyMCE.get(editing).execCommand('mceInsertContent',
								false, html);
						$(this).dialog('close');
					}
				}
			});
			$('#itemGroupsSelect').show().unbind('change').change(function() {
				if ($(this).val() && $(this).val() != "0") {
					var items = self.items($(this).val());
					if (items != null && items.length > 0) {
						$('.ui-designer-items', itemsSelect).empty();
						for (var i = 0; i < items.length; i++) {
							$('.ui-designer-items', itemsSelect).append(self
									._itemLi(items[i]));
						}
					}
					$('.ui-designer-items li .pic a', itemsSelect).click(
							function() {
								var li = $(this).parent().parent();
								var size = $('input[name=imageSize][checked]',
										itemsSelect).val();
								var title = convertTitle(li.attr('title'));
								var pic_url = li.attr('pic_url');
								var click_url = li.attr('click_url');
								var html = '<a class="title" href="'
										+ click_url
										+ '" target="_blank"><img src="'
										+ pic_url.replace('bao/uploaded',
												'imgextra') + '_' + size
										+ '.jpg" alt="' + title + '" title="'
										+ title + '"/></a>';
								tinyMCE.get(editing).execCommand(
										'mceInsertContent', false, html);
								// $('#designer').designer('editor').execCommand(
								// 'inserthtml', html);
							});
					// $('.ui-designer-items li .title a', itemsSelect).click(
					// function() {
					// var li = $(this).parent().parent();
					// var title = li.attr('title');
					// var click_url = li.attr('click_url');
					// var html = '<a href="' + click_url
					// + '" target="_blank">' + title + '</a>';
					// tinyMCE.get('tinymce').execCommand(
					// 'mceInsertContent', false, html);
					// });
				}
			});
		},
		_itemLi : function(item) {
			var li = "";
			if (item) {
				li = "<li class='item' title='"
						+ item.title
						+ "' pic_url='"
						+ item.pic_url
						+ "' click_url='"
						+ item.click_url
						+ "'><input type='checkbox' class='check' name='tis'><div class='pic' align='center'><a><img src='"
						+ item.pic_url.replace('bao/uploaded', 'imgextra')
						+ "_60x60.jpg' title='点击增加此商品图片链接'/></a></div>";// 图片
				li += "<div class='title'><a title='点击增加此商品链接'>" + item.title
						+ "</a></div>";// 标题
				li += "<div class='price-div'><span class='price-desc'>价格:</span><span  class='price'><b>"
						+ item.price
						+ "元</b></span></div><div class='price-div'><span class='price-desc'>佣金:</span><span  class='price'><b>"
						+ item.commission + "元</b></span></div></li>";
			}
			return li;
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
		}
	});
})(jQuery);
