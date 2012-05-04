/**
 * 分类编辑器 可配置 isParent : true=只可选父类目，false=可添加所有类目， cids:传入已选中的类目，limit:可选择数量
 */
(function($) {
	$.widget("ui.pageCategoryEditor", {
		/**
		 * 参数
		 */
		options : {
			isParent : false,
			limit : 30,
			cats : []
		},
		_create : function() {
		},
		/**
		 * PageCategoryEditor初始化
		 */
		_init : function() {
			var self = this;
			var cats = self.options.cats;
			if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
				if (cats && cats.length > 0) {// 根据传入的类目还原已选中
					for (var i = 0; i < cats.length; i++) {
						var cname = cats[i].name;
						var cid = cats[i].cid;
						var liStr = $('<li cid="' + cid + '" cname="' + cname
								+ '"><span>' + cname + '</span></li>');
						$('#ul_selected').append(liStr);
						self.initShopCategorySelectedLi(liStr);
					}
				}
			}
			$('#module-content .catlist a.btn_left').click(function() {
						if ($(this).hasClass('btn_leftActive')) {
							var pre = $('#module-content .catlist .pre');
							var left = pre.scrollLeft() - 236;
							if (left == 0) {
								pre.scrollLeft(0);
								self.resizeLeftRightBtn();
							} else {
								pre.animate({
											scrollLeft : "-=" + left
										}, function() {
											self.resizeLeftRightBtn();
										});
							}

						}
					});
			$('#module-content .catlist a.btn_right').click(function() {
						if ($(this).hasClass('btn_rightActive')) {
							var pre = $('#module-content .catlist .pre');
							var left = pre.scrollLeft() + 236;
							pre.animate({
										scrollLeft : "+=" + left
									}, function() {
										self.resizeLeftRightBtn();
									});
						}
					});
			$('#module-content .catlist .btn_del').click(function() {
						var active = $('#ul_selected li.active');
						if (active.length == 0) {
							alert('您尚未选择要删除的分类');
							return false;
						}
						if (confirm('您确定要删除选中的分类？')) {
							active.remove();
						}
						return false;
					});
			$('#module-content .catlist .btn_up').click(function() {
						var active = $('#ul_selected li.active');
						if (active.length == 0) {
							alert('您尚未选择要上移的分类');
							return false;
						}
						var prev = active.prev();
						if (prev.length == 1) {
							prev.before(active);
						}
						return false;
					});
			$('#module-content .catlist .btn_down').click(function() {
						var active = $('#ul_selected li.active');
						if (active.length == 0) {
							alert('您尚未选择要下移的分类');
							return false;
						}
						var next = active.next();
						if (next.length == 1) {
							next.after(active);
						}
						return false;
					});
			$('#module-content .movelist li').each(function() {
						self.initShopCategoryLi($(this));
					});
		},
		/**
		 * 初始化已选中
		 */
		initShopCategorySelectedLi : function(li) {
			li.hover(function() {
				$(this).addClass('overactive').siblings()
						.removeClass('overactive');
			}, function() {
				$(this).removeClass('overactive');
			}).click(function() {
						$(this).addClass('active').siblings()
								.removeClass('active');
					});
		},
		/**
		 * 初始化左右按钮
		 */
		resizeLeftRightBtn : function() {
			var preNode = $('#module-content .catlist .pre');
			var ulList = $('ul', preNode);
			var btnleft = $('#module-content .catlist .btn_left');
			var btnright = $('#module-content .catlist .btn_right');
			if (ulList.size() > 2) {
				if (preNode.scrollLeft() == 0) {
					btnright.addClass('btn_rightActive');
					btnleft.removeClass('btn_leftActive');
				} else if (preNode.scrollLeft() + 472 < ulList.size() * 236) {
					btnright.addClass('btn_rightActive');
					btnleft.addClass('btn_leftActive');
				} else {
					btnright.removeClass('btn_rightActive');
					btnleft.addClass('btn_leftActive');
				}
			} else {
				btnright.removeClass('btn_rightActive');
				btnleft.removeClass('btn_leftActive');
			}
		},
		/**
		 * 初始化类目事件
		 */
		initShopCategoryLi : function(li) {
			var self = this;
			var limit = self.options.limit;
			var isParent = self.options.isParent;
			$('.btn_add', li).click(function(e) {
				var ul = $('#ul_selected');
				if (ul.find('li').length >= limit) {
					alert('分类最多可以选择' + limit + '个');
					e.stopPropagation();
					return false;
				}
				var cid = $(this).attr('cid');
				var cname = $(this).attr('cname');
				if (ul.find('li[cid="' + cid + '"]').length == 1) {
					alert('当前分类【' + cname + '】已经添加');
					e.stopPropagation();
					return false;
				}
				var liStr = $('<li cid="' + cid + '" cname="' + cname
						+ '"><span>' + cname + '</span></li>');
				ul.append(liStr);
				self.initShopCategorySelectedLi(liStr);
				e.stopPropagation();
			});
			li.hover(function() {
				$(this).addClass('overactive').siblings()
						.removeClass('overactive');
			}, function() {
				$(this).removeClass('overactive');
			}).click(function() {
				if ('true' == $(this).attr('isparent')) {// 如果有子
					$(this).addClass('active').siblings().removeClass('active');
					$(this).parent().nextAll('ul').remove();// 移除之后的所有子分类
					PageUtils.loadCatsByParentCid($(this).attr('cid'),
							function(cats) {
								if (cats && cats.length > 0) {
									var ul = $('<ul style="position:relative;left:0;top:0;"></ul>');
									for (var i = 0; i < cats.length; i++) {
										var cat = cats[i];
										var btn_add = (isParent
												? (cat.isParent
														? ('<a href="javascript:void(0);" class="btn_add" cid="'
																+ cat.cid
																+ '" cname="'
																+ cat.name + '">添加</a>')
														: '')
												: ('<a href="javascript:void(0);" class="btn_add" cid="'
														+ cat.cid
														+ '" cname="'
														+ cat.name + '">添加</a>'));
										var liStr = $('<li cid="'
												+ cat.cid
												+ '" isparent="'
												+ cat.isParent
												+ '">'
												+ (cat.isParent
														? '<b class="arrow-right"></b>'
														: '') + '<span>'
												+ cat.name + '</span>'
												+ btn_add + '</li>');
										ul.append(liStr);
										self.initShopCategoryLi(liStr);
									}
									li.parent().after(ul);
									var pre = $('#module-content .catlist .pre');
									var ulSize = $('ul', pre).length;
									var left = 0;
									if (ulSize > 2) {// 判断当前UL的个数是否超过2
										if (pre.scrollLeft() + 472 < ulSize
												* 236) {
											left = pre.scrollLeft() + 236;
										} else if (pre.scrollLeft() + 472 > ulSize
												* 236) {
											left = pre.scrollLeft() - 236;
										}
									}
									pre.animate({
												scrollLeft : "+=" + left
											}, function() {
												self.resizeLeftRightBtn();
											});
								}
							});
				}
			});
		}
	});

})(jQuery);
