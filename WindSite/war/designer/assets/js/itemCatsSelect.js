/**
 * 类目选择组件
 */
(function($) {
	$.widget("ui.itemCatsSelect", {
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
			var itemCatsSelect = self.element;// 组件
			itemCatsSelect.dialog({
						bgiframe : true,
						autoOpen : false,
						height : 500,
						width : 900,
						zIndex : 100000,
						modal : true
					});
			// 当前类目搜索
			$('#itemCatLocalSearch').button().click(function() {
				var name = $('#itemCatName').val();
				if (name && name.length > 0) {
					$('.cats-grid li', itemCatsSelect).fadeOut();
					$('.cats-grid li[title*=' + name + ']', itemCatsSelect)
							.fadeIn();
				} else {
					$('.cats-grid li', itemCatsSelect).fadeIn();
				}
			});
			// 显示所有类目
			$('#itemCatLocalAllSearch').button().click(function() {
						$('li', itemCatsSelect).fadeIn();
					});
			// 增加类目
			$('#confirmCatsAdd').button().click(function() {
				if (editingCats != null) {
					editingCats.empty();
					$('.add-cats-grid li', itemCatsSelect).each(function() {
						var li = editingCats.parent().catsListView(
								'saveItemLi', $(this));
						editingCats.append(li);
						self.addLiHover(li);
					});
					itemCatsSelect.dialog('close');
				}
			});
			// 删除所选类目
			$('#deleteCatsAdd').button().click(function() {
				$('.add-cats-grid').empty();
				$('.cats-grid li input[type="checkbox"]', itemCatsSelect).attr(
						'checked', false);
			});
			// 类目的全选及反选
			$('#catsCheckAll').click(function() {
				if ($(this).is(':checked')) {
					$('#addCatsButton').show();
					$('.cats-grid li:visible').each(function() {
						$('input[type="checkbox"]', $(this)).attr('checked',
								true);
						self._liChecked($(this));
					});
				} else {
					$('.cats-grid li:visible').each(function() {
						$('input[type="checkbox"]', $(this)).attr('checked',
								false);
						self._liUnChecked($(this));
					});
					if ($('.add-cats-grid li').length == 0) {
						$('#addCatsButton').hide();
					}
				}
			});
			// 根类目
			$('#rootCatsPath').click(function() {// 根类目
						$('#catsPath').empty();
						self._load("0");
					});
			// 加载根类目
			self._load("0");
		},
		// 创建类目路径
		_createCatsPath : function(li) {
			var self = this;
			if (li && li.length > 0) {
				var parentcid = li.attr('parentcid');// 当前父类目ID
				var path = $('<a class="catsPath" cid="'
						+ li.attr('id')
						+ '" isparent="'
						+ li.attr('isparent')
						+ '" parentcid="'
						+ parentcid
						+ '">'
						+ li.attr('title')
						+ '<span style="color:red;font-weight:bold;">></span></a>');// 当前新产生路径
				var p = $('#catsPath .catsPath[cid="' + parentcid + '"]');// 已有父路径
				if (parentcid == "0" || p.length == 0) {// 如果没有父路径
					$('#catsPath').empty().append(path);
				} else {
					$('#catsPath .catsPath[parentcid="' + parentcid + '"]')
							.remove();// 移除兄弟路径
					$('#catsPath').append(path);// 追加当前新路径
				}
				if (path.attr('isparent') == "true") {
					path.click(function() {
								$('#catsPath .catsPath[parentcid="'
										+ $(this).attr('cid') + '"]').remove();// 移除兄弟路径
								self._load($(this).attr('cid'));
							});
				}
			}
		},
		// 加载类目
		_load : function(parentCid) {
			var itemCatsSelect = this.element;
			var self = this;
			$('.cats-grid', itemCatsSelect).empty()
					.append('<span class="loading">加载中请稍候...</span>');
			$('.cats-grid', itemCatsSelect).load(
					'/router/member/designer/cats/' + parentCid, function() {
						$('.cats-grid .loading', itemCatsSelect).remove();
						$('.cats-grid li', itemCatsSelect).hover(function() {
							$(this).toggleClass("ui-selecting").siblings()
									.removeClass("ui-selecting");
						}, function() {
							$(this).removeClass("ui-selecting");

						});
						$('.cats-grid li[isparent="true"] strong',
								itemCatsSelect).click(function() {
									self._createCatsPath($(this).parent());
									self._load($(this).parent().attr('id'));
								});
						$('.cats-grid li input[type="checkbox"]',
								itemCatsSelect).click(function() {
									if ($(this).is(':checked')) {
										$('#addCatsButton').show();
										self._liChecked($(this).parent());
									} else {
										self._liUnChecked($(this).parent());
										$('#catsCheckAll').attr('checked',
												false);
										if ($('.add-cats-grid li').length == 0) {
											$('#addCatsButton').hide();
										}
									}
								});

					});
		},
		_liChecked : function(li) {
			var self = this;
			var id = li.attr('id');
			var itemCatsSelect = this.element;
			if ($('.add-cats-grid li[cid="' + id + '"]').length == 0) {
				var ali = $('<li cid="' + id + '" url="' + li.attr('url')
						+ '">' + li.attr('title') + '</li>');
				$('.add-cats-grid', itemCatsSelect).append(ali);
				self.addLiHover(ali);
			}
		},
		addLiHover : function(li) {
			li.hover(function() {
				var X = $(this).position().top;
				var Y = $(this).position().left;
				$(this)
						.append("<div id=\"deleteImg\" style=\"cursor: pointer;position:absolute;top:"
								+ (X - 15)
								+ "px;left:"
								+ (Y)
								+ "px;\"><img src=\"/assets/images/delete.gif\"/></div>");
				$("#deleteImg").click(function() {
					var cid = $(this).parent().attr('cid');
					var checkbox = $('.cats-grid li[id="' + cid
							+ '"] input[type="checkbox"]');
					if (checkbox.length > 0) {
						checkbox.attr('checked', false);
					}
					$(this).parent().remove();// 删除当前li
					$('#catsCheckAll').attr('checked', false);
				});
			}, function() {
				$("#deleteImg").remove();
			});
		},
		_liUnChecked : function(li) {
			var id = li.attr('id');
			if ($('.add-cats-grid li[cid="' + id + '"]').length > 0) {
				$('.add-cats-grid li[cid="' + id + '"]').remove();
			}
		}
	});
})(jQuery);
