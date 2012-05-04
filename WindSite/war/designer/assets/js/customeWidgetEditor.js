(function($) {
	var isAuto = false;
	$.widget("ui.customeWidgetEditor", {
		/**
		 * 参数
		 */
		options : {
			mode : 'designer',
			pw : 100,
			ph : 100
		},
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
			var customeWidgetDialog = self.element;// 组件
			customeWidgetDialog.dialog({
						bgiframe : true,
						autoOpen : false,
						height : 500,
						width : 990,
						zIndex : 100000,
						modal : true,
						open : function() {
							if (editingCustomeEditor == null) {
								alert('未选中要编辑的组件');
							} else {
								var edit = editingCustomeEditor;
								if (edit.hasClass('a-s')) {
									self.options.w_type = 'a-s';
								} else if (edit.hasClass('l-a-s')) {
									self.options.w_type = 'l-a-s';
								} else if (edit.hasClass('l-a-s-p')) {
									self.options.w_type = 'l-a-s-p';
								} else if (edit.hasClass('d-a-i')) {
									self.options.w_type = 'd-a-i';
									self.options.pw = edit.attr('pw');
									self.options.ph = edit.attr('ph');
								} else if (edit.hasClass('l-d-a-i')) {
									self.options.w_type = 'l-d-a-i';
									self.options.pw = edit.attr('pw');
									self.options.ph = edit.attr('ph');
								} else if (edit.hasClass('l-d-a-i-p')) {
									self.options.w_type = 'l-d-a-i-p';
									self.options.pw = edit.attr('pw');
									self.options.ph = edit.attr('ph');
								}
								self._reInit();
							}
						}
					});
			// 保存并编辑下一个
			$('#custome_save_next').button().click(function() {
						var next = editingCustomeEditor.next();
						if (next.length == 1) {
							if (self._saveWidget()) {
								editingCustomeEditor = next;
								self._reInit();
							}
						}
					});
			// 保存并编辑上一个
			$('#custome_save_prev').button().click(function() {
						var prev = editingCustomeEditor.prev();
						if (prev.length == 1) {
							if (self._saveWidget()) {
								editingCustomeEditor = prev;
								self._reInit();
							}
						}
					});
			// 保存
			$('#custome_save').button().click(function() {
						if (self._saveWidget()) {
							customeWidgetDialog.dialog('close');
						}
					});
			// 取消
			$('#custome_cancel').button().click(function() {
						customeWidgetDialog.dialog('close');
					});
			$('#custome_clickurl').tabs();
			self._initKeyword();
			self._initGroups();
			self._initCats();
			self._loadShops();
			self._loadHomeBlog();
			self._initChannels();
			self._initActivity();
			if (this.options.mode == 'custome') {// 如果是编辑组件模式则加载推广组
				loadAllItemGroups();
				$('#pre_clickurl').attr('readonly', true);// 设置点击链接不可编辑
			}
		},
		_initHomeBlog : function() {
			var self = this;
			$('#custome_homeblog_list').pager('ul', {
						navId : 'homeblog_nav',
						navClass : 'nav_pager',
						height : 270
					});
			$('#custome_homeblog_list li input[type="radio"]').click(
					function(event) {
						var li = $(this).parents('li');
						self._saveItem({
									title : li.attr('t'),
									clickurl : li.attr('c')
								});
						event.stopPropagation();
					});
		},
		_loadHomeBlog : function() {
			var self = this;
			$('#custome_homeblog_list').empty().append('<span>正在加载...</span>')
					.load('/router/member/uc/blogs/5', function() {
								self._initHomeBlog();
							});
		},
		/**
		 * 初始化活动推广
		 */
		_initActivity : function() {
			var self = this;
			$('#custome_activity_list').pager('ul', {
						navId : 'activity_nav',
						navClass : 'nav_pager',
						height : 270
					});
			$('#custome_activity_list li').hover(function() {
				$(this).toggleClass("ui-selecting");
				$('#custome_activity_list li').not($(this))
						.removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			}).click(function() {
				$('input[type="radio"]', $(this)).attr('checked', true);
				$(this).toggleClass("ui-selected");
				$('#custome_activity_list li').not($(this))
						.removeClass("ui-selected");
				self._saveItem({
							title : $(this).attr('t'),
							clickurl : $(this).attr('c'),
							picurl : $(this).attr('pi')
						});
			});
			$('#custome_activity_list li input[type="radio"]').click(
					function(event) {
						var li = $(this).parents('li');
						li.toggleClass("ui-selected");
						$('#custome_activity_list li').not(li)
								.removeClass("ui-selected");
						self._saveItem({
									title : li.attr('t'),
									clickurl : li.attr('c'),
									picurl : li.attr('pi')
								});
						event.stopPropagation();
					});
		},
		/**
		 * 初始化频道推广
		 */
		_initChannels : function() {
			var self = this;
			$('#custome_channels_list').pager('ul', {
						navId : 'channels_nav',
						navClass : 'nav_pager',
						height : 270
					});
			$('#custome_channels_list li').hover(function() {
				$(this).toggleClass("ui-selecting");
				$('#custome_channels_list li').not($(this))
						.removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			}).click(function() {
				$('input[type="radio"]', $(this)).attr('checked', true);
				$(this).toggleClass("ui-selected");
				$('#custome_channels_list li').not($(this))
						.removeClass("ui-selected");
				self._saveItem({
							title : $(this).attr('t'),
							clickurl : $(this).attr('c'),
							picurl : $(this).attr('pi')
						});
			});
			$('#custome_channels_list li input[type="radio"]').click(
					function(event) {
						var li = $(this).parents('li');
						li.toggleClass("ui-selected");
						$('#custome_channels_list li').not(li)
								.removeClass("ui-selected");
						self._saveItem({
									title : li.attr('t'),
									clickurl : li.attr('c'),
									picurl : li.attr('pi')
								});
						event.stopPropagation();
					});
		},
		/**
		 * 加载类目
		 */
		_loadCats : function(select, pcid) {
			var self = this;
			if (!pcid || pcid.length == 0) {
				pcid = "0";
			}
			if (!select) {
				select = 1;
			}
			$('#custome_cats_select' + select).empty()
					.append('<option value=""></option>');
			var sender = new WindSender("/router/member/designer/custome/cats/"
					+ pcid);
			sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					var cats = response.body;
					if (cats.length > 0) {
						for (var i = 0; i < cats.length; i++) {
							var cat = cats[i];
							var option = '<option p="'
									+ cat.isParent
									+ '" c="'
									+ cat.clickUrl.replace('{pid}', PID)
											.replace('{pid}', PID)
									+ '" value="' + cat.cid + '">' + cat.name
									+ '</option>';
							$('#custome_cats_select' + select).append(option);
						}
						if (select < 4) {// 前三个select 触发change事件
							$('#custome_cats_select' + select).unbind('change')
									.change(function() {
										if ($(this).val() != '') {// 如果非空
											var selected = $('#custome_cats_select'
													+ select
													+ ' option:selected');
											for (var j = select + 1; j <= 4; j++) {// 清空后续类目
												$('#custome_cats_select' + j)
														.empty()
														.append('<option value=""></option>');
											}
											if ('true' == selected.attr('p')) {
												$('#custome_cats_props')
														.empty();
												self._loadCats(select + 1,
														$(this).val());
											} else {// 子类目
												self._loadProps($(this).val());
											}

										}
									});
						}
					}

				} else {
					alert(response.msg);
				}
			});
		},
		_loadProps : function(cid) {
			var self = this;
			getHtmlContent('custome_cats_props',
					'/router/member/designer/searchdesigner/cat/' + cid, 'GET',
					{
						template : 'props'
					}, function(data) {
						$('#custome_cats_props').empty().append(data);
						self._initSearchWidget();
					});
		},
		_initSearchWidget : function() {
			var widget = $('#custome_cats_props');
			$('.prop-item .more', widget).click(function() {
						if ($(this).hasClass('close')) {
							$(this).parent().find('.moreValue').show();
							$(this).text('收起').removeClass('close')
									.addClass('open');
						} else {
							$(this).parent().find('.moreValue').hide();
							$(this).text('更多').removeClass('open')
									.addClass('close');
						}
						return false;
					});
			$('.J_PropToggler', widget).click(function() {
						var a = $('a', $(this));
						if (a.hasClass('close')) {
							$('.prop-item:gt(3)', $(this).parent()).show();
							$('span', a).text('收起');
							a.removeClass('close').addClass('open');
						} else {
							$('.prop-item:gt(3)', $(this).parent()).hide();
							$('span', a).text('更多');
							a.removeClass('open').addClass('close');
						}
						return false;
					});
			$('.prop-item li a', widget).click(function(event) {
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
					$(
							'.selected-attr a[value="' + $(this).attr('value')
									+ '"]', widget).parent().remove();
					if ($('.selected-attr dd', widget).length == 0) {
						$('.selected-attr', widget).hide();
					}
				} else {
					$('.selected-attr', widget).show();
					$('a', $(this).parents('dd:first')).removeClass('selected');
					$(this).addClass('selected');
					var pid = $(this).attr('value').split(':')[0];
					$('.selected-attr a[value*="' + pid + ':"]', widget)
							.parent().remove();
					var propName = $(this).parents('.prop-item')
							.find('dt.search-prop');
					var ndd = $('<dd><a value="' + $(this).attr('value')
							+ '"><h5>' + propName.text() + '</h5>'
							+ $(this).text()
							+ '<span class="close-icon"></span></a></dd>');
					$('.selected-attr dl', widget).append(ndd);
					ndd.click(function() {
								$(this).remove();
								$(
										'.prop-item a[value="'
												+ $('a', this).attr('value')
												+ '"]', widget)
										.removeClass('selected');
								if ($('.selected-attr dd', widget).length == 0) {
									$('.selected-attr', widget).hide();
								}
							});
				}
				return false;
			});
			// $('.searchwidget-btn,.answer', widget).click(function() {
			// var widget = $(this).parents('.widget-customer:first');
			// var props = "";
			// var isFirst = true;
			// $('.selected-attr dd a', widget).each(function() {
			// props += $(this).attr('value') + ";";
			// });
			// $('.searchCustome input[name="props"]', widget)
			// .val(props);
			// $('.searchCustome', widget).submit();
			//
			// });
		},
		/**
		 * 初始化类目推广
		 */
		_initCats : function() {
			var self = this;
			self._loadCats();
			$('#custome_cats_confirm').button().click(function() {
				var s4 = $('#custome_cats_select4').val();
				var s3 = $('#custome_cats_select3').val();
				var s2 = $('#custome_cats_select2').val();
				var s1 = $('#custome_cats_select1').val();
				var s;
				if (s1 && s1.length > 0) {
					s = $('#custome_cats_select1 option:selected');
				}
				if (s2 && s2.length > 0) {
					s = $('#custome_cats_select2 option:selected');
				}
				if (s3 && s3.length > 0) {
					s = $('#custome_cats_select3 option:selected');
				}
				if (s4 && s4.length > 0) {
					s = $('#custome_cats_select4 option:selected');
				}
				var props = "", clickurl = '/search?cid=' + s.val(), title = s
						.text()
						+ "|";
				$('#custome_cats_props .selected-attr dd a').each(function() {
							props += $(this).attr('value') + ";";
							title += $(this).text() + "|";
						});
				if (props != '') {
					clickurl = clickurl + '&props=' + props;
				}
				self._saveItem({
							title : title,
							clickurl : clickurl
						});
			});
		},
		/**
		 * 加载店铺收藏
		 */
		_loadShops : function() {
			var self = this;
			$('#custome_shops_list').empty().append('<span>正在加载...</span>')
					.load(
							'/router/member/designer/favshops?v='
									+ Math.random(), function() {
								self._initShops();
							});

		},
		/**
		 * 店铺收藏推广
		 */
		_initShops : function() {
			var self = this;
			if ($('#custome_shops_list ul').length == 0) {// 如果尚未加载店铺收藏
				return;
			}
			$('#custome_shops_list').pager('ul', {
						navId : 'shops_nav',
						navClass : 'nav_pager',
						height : 300
					});
			// 单个店铺事件
			$('#custome_shops_list li').hover(function() {
				$(this).toggleClass("ui-selecting");
				$('#custome_shops_list li').not($(this))
						.removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			}).click(function() {
				$('input[type="radio"]', $(this)).attr('checked', true);
				$(this).toggleClass("ui-selected");
				$('#custome_shops_list li').not($(this))
						.removeClass("ui-selected");
				self._saveItem({
							title : $(this).attr('t'),
							clickurl : $(this).attr('c'),
							picurl : $(this).attr('pi'),
							cr : $(this).attr('cr'),
							sid : $(this).attr('sid'),
							nick : $(this).attr('nick'),
							level : "/assets/min/images/credit/"
									+ self._taobaoCredit($(this).attr('level'))
									+ ".gif"
						});
			});
			$('#custome_shops_list input[type="radio"]').click(function(event) {
				var li = $(this).parents('li');
				li.toggleClass("ui-selected");
				$('#custome_shops_list li').not(li).removeClass("ui-selected");
				self._saveItem({
							title : li.attr('t'),
							clickurl : li.attr('c'),
							picurl : li.attr('pi'),
							cr : li.attr('cr'),
							sid : li.attr('sid'),
							nick : li.attr('nick'),
							level : "/assets/min/images/credit/"
									+ self._taobaoCredit(li.attr('level'))
									+ ".gif"
						});
				event.stopPropagation();
			});
		},
		/**
		 * 推广组推广
		 */
		_initGroups : function() {
			var self = this;
			// 排序
			$('#itemsSortBy').change(function() {
						var gs = $('#customeItemGroupsSelect');
						if (gs.val() && gs.val() != "0") {
							self._sortGroupItems(self.items(gs.val()), $(this)
											.val());
						}
					});
			$('#customeItemGroupsSelect').unbind('change').change(function() {
				if ($(this).val() && $(this).val() != "0") {
					self._sortGroupItems(self.items($(this).val()),
							$('#itemsSortBy').val());
				}
			});
			$('#autoItemGroup').button().click(function() {
						if (isAuto) {
							alert('正在批量设置中');
							return;
						} else {
							isAuto = true;
							$(this).button('disable');
							self._autoItemGroup();
						}
						return false;
					});
		},
		_autoItemGroup : function() {
			var self = this;
			var selected = null;
			while (isAuto) {
				if (selected == null) {// 起始
					selected = $('#custome_groups_items li.ui-selected');
					if (selected.length != 1) {
						alert('请选中一个要开始自动配置的商品');
						isAuto = false;
						$('#autoItemGroup').button('enable');
						return;
					}
				} else {
					selected.click();
				}
				selected = selected.next();
				if (selected.length != 1) {// 当前可配置商品是否还有
					$('#custome_save').click();
					selected == null;
					isAuto = false;
					$('#autoItemGroup').button('enable');
					alert('自动配置完成');
				} else {
					var next = editingCustomeEditor.next();
					if (next.length != 1) {// 当前需要配置的区域是否还有
						$('#custome_save').click();
						isAuto = false;
						selected = null;
						$('#autoItemGroup').button('enable');
						alert('自动配置完成');
					} else {
						$('#custome_save_next').click();// preview and next
					}
				}

			}
		},
		_sortGroupItems : function(items, sort) {
			var self = this;
			if (items == null) {
				return;
			}
			var _sorts = sort.replace('_asc', ' asc').replace('_desc', ' desc')
					.split(' ');
			if ('asc' == _sorts[1]) {// 升序
				items.sort(function(a, b) {
							try {
								var e0 = a[_sorts[0]] - b[_sorts[0]];// 指定列排序
								if (e0) {
									return e0;
								} else {// 如果false则按照默认规则再次排序
									return a['sortOrder'] - b['sortOrder'];
								}
							} catch (e) {
								return false;
							}
						});// 升序
			} else {// 降序
				items.sort(function(a, b) {
							try {
								var e0 = b[_sorts[0]] - a[_sorts[0]];// 指定列排序
								if (e0) {
									return e0;
								} else {// 如果false则按照默认规则再次排序
									return a['sortOrder'] - b['sortOrder'];
								}
							} catch (e) {
								return false;
							}
						});// 降序
			}
			self._initGroupItems(items);
		},
		_initGroupItems : function(items) {
			var self = this;
			if (items != null && items.length > 0) {
				$('#custome_groups_items').empty();
				var ul;
				for (var i = 0; i < items.length; i++) {
					if (i % 15 == 0) {
						ul = $('<ul></ul>');
						$('#custome_groups_items').append(ul);
					}
					ul.append(self._itemLi(items[i]));
				}
				$('#custome_groups_items').pager('ul', {
							navId : 'groups_items_nav',
							navClass : 'nav_pager',
							height : 300
						});
				// 单个商品事件
				$('#custome_groups_items li').hover(function() {
					$(this).toggleClass("ui-selecting");
					$('#custome_groups_items li').not($(this))
							.removeClass("ui-selecting");
				}, function() {
					$(this).removeClass("ui-selecting");
				}).click(function() {
					$('input[type="radio"]', $(this)).attr('checked', true);
					$(this).toggleClass("ui-selected");
					$('#custome_groups_items li').not($(this))
							.removeClass("ui-selected");
					var picurl = $(this).attr('pi');
					var pw = self.options.pw;
					var ph = self.options.ph;
					picurl = picurl.replace('bao/uploaded', 'imgextra') + '_'
							+ (pw != ph ? '160x160' : (pw + 'x' + ph)) + '.jpg';
					self._saveItem({
								title : $(this).attr('t'),
								clickurl : '/titem/' + $(this).attr('nid')
										+ '.html',
								picurl : picurl,
								price : $(this).attr('pr'),
								tclickurl : '/titem/' + $(this).attr('nid')
										+ '.html',
								co : $(this).attr('co'),
								nid : $(this).attr('nid'),
								nick : $(this).attr('nick'),
								level : "/assets/min/images/credit/"
										+ self._taobaoCredit($(this)
												.attr('level')) + ".gif",
								volume : $(this).attr('volume')
							});
				});
				$('#custome_groups_items input[type="radio"]').click(
						function(event) {
							var li = $(this).parents('li');
							li.toggleClass("ui-selected");
							$('#custome_groups_items li').not(li)
									.removeClass("ui-selected");
							var pw = self.options.pw;
							var ph = self.options.ph;
							var picurl = li.attr('pi');
							picurl = picurl.replace('bao/uploaded', 'imgextra')
									+ '_'
									+ (pw != ph ? '160x160' : (pw + 'x' + ph))
									+ '.jpg';
							self._saveItem({
								title : li.attr('t'),
								clickurl : '/titem/' + li.attr('nid') + '.html',
								picurl : picurl,
								price : li.attr('pr'),
								tclickurl : '/titem/' + li.attr('nid')
										+ '.html',
								co : li.attr('co'),
								nid : li.attr('nid'),
								nick : li.attr('nick'),
								level : "/assets/min/images/credit/"
										+ self._taobaoCredit(li.attr('level'))
										+ ".gif",
								volume : li.attr('volume')
							});
							event.stopPropagation();
						});

			}
		},
		/**
		 * 关键词推广
		 */
		_initKeyword : function() {
			var self = this;
			$('#c_keyword_table .top_box li.key').hover(function() {
						$('.top_box li.key').not($(this)).removeClass("active");
						$(this).removeClass('active').addClass('active');
					}, function() {
						$(this).removeClass('active');
					}).click(function() {
				$(this).toggleClass("selected");
				$('#checkedImg').remove();
				$('#c_keyword_table .top_box li.key').not($(this))
						.removeClass("selected");
				if ($(this).hasClass('selected')) {
					var title = $(this).attr('title');
					$(this)
							.prepend('<img id="checkedImg" src="/assets/images/link/checked.gif" style="position:absolute;top:-5px;left:-15px;"/>');
					$('#c_keyword').val(title);
					var clickurl = '/keywords?words='
							+ encodeURIComponent(title) + '&cid='
							+ $('#c_keyword_cats').val();
					self._saveItem({
								title : title,
								clickurl : clickurl
							});
				}
			});
			$('#c_keyword_save').button().click(function() {
				var title = $('#c_keyword').val();
				if (!title || title.length == 0) {
					alert('关键词不能为空');
					return;
				}
				var clickurl = '/keywords?words=' + encodeURIComponent(title)
						+ '&cid=' + $('#c_keyword_cats').val();
				self._saveItem({
							title : title,
							clickurl : clickurl
						});
			});
		},
		/**
		 * 重新清空
		 */
		_reClear : function() {
			$('#pre_custome_editor input.tb').val('');// 清除所有属性框
			$('#pre_title').attr('title', '');// 清除title属性
			$('#custome_groups_items input[type="radio"]:checked').attr(
					'checked', false);// 清空推广组选择
			$('#custome_groups_items li.ui-selected')
					.removeClass('ui-selected');// 清除选中样式
			$('#custome_shops_list input[type="radio"]:checked').attr(
					'checked', false);// 清空店铺选择
			$('#custome_shops_list li.ui-selected').removeClass('ui-selected');// 清除选中样式
			$('#custome_channels_list input[type="radio"]:checked').attr(
					'checked', false);// 清空频道选择
			$('#custome_channels_list li.ui-selected')
					.removeClass('ui-selected');// 清除选中样式
			$('#c_keyword').val();// 清空关键词
		},
		_rePreview : function() {
			var edit;
			switch (this.options.w_type) {
				case 'a-s' :
					edit = $('#custome_preview').children(':first');
					break;
				case 'd-a-i' :
					edit = $('#custome_preview').children(':first');
					break;
				case 'l-a-s' :
					edit = $('#custome_preview')
							.children(':first')
							.find('li:eq(' + editingCustomeEditor.index() + ')');
					break;
				case 'l-a-s-p' :
					edit = $('#custome_preview')
							.children(':first')
							.find('li:eq(' + editingCustomeEditor.index() + ')');
					break;
				case 'l-d-a-i' :
					edit = $('#custome_preview')
							.children(':first')
							.find('li:eq(' + editingCustomeEditor.index() + ')');
					break;
				case 'l-d-a-i-p' :
					edit = $('#custome_preview')
							.children(':first')
							.find('li:eq(' + editingCustomeEditor.index() + ')');
					break;
			}
			this._saveWidget(edit);
		},
		/**
		 * 重新初始化
		 */
		_reInit : function() {
			this._reClear();
			var l, a, s, d, i, p, t, le, vo;
			var isShowNext = false;
			var edit = editingCustomeEditor;
			$('#pre_custome_editor input.tb').hide();
			$('#pre_custome_editor label').hide();
			// 还原佣金，佣金比率，num_iid,sid,nick
			var commission = edit.attr('co');
			var commissionrate = edit.attr('cr');
			var nid = edit.attr('nid');
			var sid = edit.attr('sid');
			var nick = edit.attr('nk');
			if (commission && commission != '') {
				$('#pre_commission').val(commission);
			} else {
				$('#pre_commission').val('');
			}
			if (commissionrate && commissionrate != '') {
				$('#pre_commissionrate').val(commissionrate);
			} else {
				$('#pre_commissionrate').val('');
			}
			if (nid && nid != '') {
				$('#pre_nid').val(nid);
			} else {
				$('#pre_nid').val('');
			}
			if (sid && sid != '') {
				$('#pre_sid').val(sid);
			} else {
				$('#pre_sid').val('');
			}
			if (nick && nick != '') {
				$('#pre_nick').val(nick);
			} else {
				$('#pre_nick').val('');
			}
			var previewContent;
			switch (this.options.w_type) {
				case 'a-s' :
					a = edit;
					s = a.find('span');
					$('#pre_title_l,#pre_clickurl_l').show();
					$('#pre_title').show().val(s.text());
					$('#pre_clickurl').show().val(a.attr('href'));
					break;
				case 'l-a-s' :
					a = edit.find('a');
					s = a.find('span');
					$('#pre_title_l,#pre_clickurl_l').show();
					$('#pre_title').show().val(s.text());
					$('#pre_clickurl').show().val(a.attr('href'));
					isShowNext = true;
					break;
				case 'l-a-s-p' :
					a = edit.find('a');
					s = a.find('span');
					p = edit.find('.price');
					$('#pre_title_l,#pre_clickurl_l,#pre_price_l').show();
					$('#pre_title').show().val(s.text());
					$('#pre_clickurl').show().val(a.attr('href'));
					$('#pre_price').show().val(p.text());
					isShowNext = true;
					break;
				case 'd-a-i' :
					a = edit.find('a');
					i = a.find('img');
					t = edit.find('.title');
					$('#pre_title_l,#pre_clickurl_l,#pre_picurl_l').show();
					$('#pre_title').show().val(i.attr('alt'));
					$('#pre_clickurl').show().val(a.attr('href'));
					$('#pre_picurl').show().val(i.attr('src'));
					if (t.length == 1) {
						$('#pre_tclickurl').val(t.attr('href'));
					} else {
						$('#pre_tclickurl').val('');
					}
					break;
				case 'l-d-a-i' :
					a = edit.find('div a');
					i = a.find('img');
					t = edit.find('.title');
					$('#pre_title_l,#pre_clickurl_l,#pre_picurl_l').show();
					$('#pre_title').show().val(i.attr('alt'));
					$('#pre_clickurl').show().val(a.attr('href'));
					$('#pre_picurl').show().val(i.attr('src'));
					if (t.length == 1) {
						$('#pre_tclickurl').val(t.attr('href'));
					} else {
						$('#pre_tclickurl').val('');
					}
					isShowNext = true;
					break;
				case 'l-d-a-i-p' :
					a = edit.find('div a');
					i = a.find('img');
					p = edit.find('.price');
					t = edit.find('.title');
					le = edit.find('.level img');
					vo = edit.find('.volume');

					$('#pre_title_l,#pre_clickurl_l,#pre_picurl_l,#pre_price_l')
							.show();
					$('#pre_title').show().val(i.attr('alt'));
					$('#pre_clickurl').show().val(a.attr('href'));
					$('#pre_picurl').show().val(i.attr('src'));
					$('#pre_price').show().val(p.text());
					if (t.length == 1) {
						$('#pre_tclickurl').val(t.attr('href'));
					} else {
						$('#pre_tclickurl').val('');
					}
					if (le.length == 1) {
						$('#pre_level').val(le.attr('src'));
					} else {
						$('#pre_level').val('');
					}
					if (vo.length == 1) {
						$('#pre_volume').val(vo.text());
					} else {
						$('#pre_volume').val('');
					}
					isShowNext = true;
					break;
			}
			if (isShowNext) {
				$('#autoItemGroup').show();
				previewContent = edit.parent().clone();
				previewContent.find('li:eq(' + edit.index() + ')').css(
						'border', '2px solid #0080C0');// 使得选中
				$('#custome_save_prev,#custome_save_next').show();
				if (edit.prev().length == 0) {
					$('#custome_save_prev').button('disable');
					$('#custome_save_prev').removeClass('ui-state-hover');
				} else {
					$('#custome_save_prev').button('enable');
				}
				if (edit.next().length == 0) {
					$('#custome_save_next').button('disable');
					$('#custome_save_next').removeClass('ui-state-hover');
				} else {
					$('#custome_save_next').button('enable');
				}
			} else {
				$('#autoItemGroup').hide();
				previewContent = edit.clone();
				$('#custome_save_prev,#custome_save_next').hide();
			}
			var customeWidget = previewContent
					.parents('.widget-customer div:first');
			$('#custome_preview').empty().attr('class',
					customeWidget.attr('class')).append(previewContent);
		},
		/**
		 * 保存组件属性
		 */
		_saveItem : function(item) {
			var title = item.title;
			var clickurl = item.clickurl;
			var picurl = item.picurl;
			var price = item.price;
			var tclickurl = item.tclickurl;
			var co = item.co;
			var cr = item.cr;
			var nid = item.nid;
			var sid = item.sid;
			var nick = item.nick;
			var level = item.level;
			var volume = item.volume;
			if (title && title != null) {
				$('#pre_title').val(title);
				$('#pre_title').attr('title', title);
			} else {
				$('#pre_title').val('');
				$('#pre_title').attr('title', '');
			}
			if (clickurl && clickurl != null) {
				$('#pre_clickurl').val(clickurl);
			} else {
				$('#pre_clickurl').val('');
			}
			if (picurl && picurl != null) {
				$('#pre_picurl').val(picurl);
			} else {
				$('#pre_picurl').val('');
			}
			if (price && price != null) {
				$('#pre_price').val(price);
			} else {
				$('#pre_price').val('');
			}
			if (!tclickurl || tclickurl == null || tclickurl.length == 0) {// 标题链接
				tclickurl = clickurl;
			}
			if (tclickurl && tclickurl != null) {
				$('#pre_tclickurl').val(tclickurl);
			} else {
				$('#pre_tclickurl').val('');
			}
			if (co && co != null) {
				$('#pre_commission').val(co);
			} else {
				$('#pre_commission').val('');
			}
			if (cr && cr != null) {
				$('#pre_commissionrate').val(cr);
			} else {
				$('#pre_commissionrate').val('');
			}
			if (nid && nid != null) {
				$('#pre_nid').val(nid);
			} else {
				$('#pre_nid').val('');
			}
			if (sid && sid != null) {
				$('#pre_sid').val(sid);
			} else {
				$('#pre_sid').val('');
			}
			if (nick && nick != null) {
				$('#pre_nick').val(nick);
			} else {
				$('#pre_nick').val('');
			}
			if (level && level != null) {
				$('#pre_level').val(level);
			}
			if (volume && volume != null) {
				$('#pre_volume').val(volume);
			}
			this._rePreview();
		},
		/**
		 * 保存
		 */
		_saveWidget : function(e) {
			var self = this;
			var edit = editingCustomeEditor;
			if (e) {
				edit = e;
			}
			if (!edit || edit == null) {
				alert('未选中要编辑内容');
				return false;
			}
			var l, a, s, d, i, p, ta, ts, le, vo, se;
			var title = $('#pre_title').val();
			var alt = $('#pre_title').attr('title');
			if (!alt || alt.length == 0) {
				alt = title;
			}
			var clickurl = $('#pre_clickurl').val();
			var picurl = $('#pre_picurl').val();
			var price = $('#pre_price').val();
			var tclickurl = $('#pre_tclickurl').val();
			var commission = $('#pre_commission').val();
			var commissionrate = $('#pre_commissionrate').val();
			var nid = $('#pre_nid').val();
			var sid = $('#pre_sid').val();
			var nick = $('#pre_nick').val();
			var level = $('#pre_level').val();
			var volume = $('#pre_volume').val();
			if (commission && commission != '') {
				edit.attr('co', commission);
			} else {
				edit.attr('co', '');
			}
			if (commissionrate && commissionrate != '') {
				edit.attr('cr', commissionrate);
			} else {
				edit.attr('cr', '');
			}
			if (nid && nid != '') {
				edit.attr('nid', nid);
			} else {
				edit.attr('nid', '');
			}
			if (sid && sid != '') {
				edit.attr('sid', sid);
			} else {
				edit.attr('sid', '');
			}
			if (nick && nick != '') {
				edit.attr('nk', nick);
			} else {
				edit.attr('nk', '');
			}
			if (!title || title.length == 0) {
				alert('文字标题不能为空，请手动填写标题');
				return false;
			}
			if (!clickurl || clickurl.length == 0) {
				alert('链接地址不能为空');
				return false;
			}
			switch (this.options.w_type) {
				case 'a-s' :
					a = edit;
					s = a.find('span');
					a.attr('href', clickurl);
					a.attr('title', alt);
					self._trackCustome(a, nid, nick, alt, sid);
					s.text(title);
					break;
				case 'l-a-s' :
					a = edit.find('a');
					s = a.find('span');
					a.attr('href', clickurl);
					a.attr('title', alt);
					self._trackCustome(a, nid, nick, alt, sid);
					s.text(title);
					break;
				case 'l-a-s-p' :
					if (!e && (!price || price.length == 0)) {
						alert('价格不能为空，请手动填写价格');
						$('#pre_price').focus();
						return false;
					}
					a = edit.find('a');
					s = a.find('span');
					p = edit.find('.price');
					a.attr('href', clickurl);
					a.attr('title', alt);
					self._trackCustome(a, nid, nick, alt, sid);
					s.text(title);
					p.text(price);
					break;
				case 'd-a-i' :
					if (!e && (!picurl || picurl.length == 0)) {
						alert('图片地址不能为空，请手动填写图片地址');
						$('#pre_picurl').focus();
						return false;
					}
					a = edit.find('a');
					i = a.find('img');
					a.attr('href', clickurl);
					a.attr('title', alt);
					self._trackCustome(a, nid, nick, alt, sid);
					i.attr('alt', alt);
					i.attr('title', alt);
					i.attr('src', picurl);
					ta = edit.find('.title');
					if (ta.length > 0) {
						ta.attr('href', tclickurl);
						ta.attr('title', alt);
						ts = ta.find('span');
						ts.text(title);
						if (sid && sid != '') {// 追踪店铺
							self._trackCustome(ta, '', '', alt, sid);
						}
					}
					break;
				case 'l-d-a-i' :
					if (!e && (!picurl || picurl.length == 0)) {
						alert('图片地址不能为空，请手动填写图片地址');
						$('#pre_picurl').focus();
						return false;
					}
					a = edit.find('div a');
					i = a.find('img');
					a.attr('href', clickurl);
					a.attr('title', alt);
					self._trackCustome(a, nid, nick, alt, sid);
					i.attr('alt', alt);
					i.attr('title', alt);
					i.attr('src', picurl);
					ta = edit.find('.title');
					if (ta.length > 0) {
						ta.attr('href', tclickurl);
						ta.attr('title', alt);
						ts = ta.find('span');
						ts.text(title);
						if (sid && sid != '') {// 追踪店铺
							self._trackCustome(ta, '', '', alt, sid);
						}
					}
					break;
				case 'l-d-a-i-p' :
					if (!e && (!picurl || picurl.length == 0)) {
						alert('图片地址不能为空，请手动填写图片地址');
						$('#pre_picurl').focus();
						return false;
					}
					if (!e && (!price || price.length == 0)) {
						alert('价格不能为空，请手动填写价格');
						$('#pre_price').focus();
						return false;
					}
					a = edit.find('div a');
					i = a.find('img');
					p = edit.find('.price');
					le = edit.find('.level img');
					vo = edit.find('.volume');
					se = edit.find('.seller');
					a.attr('href', clickurl);
					a.attr('title', alt);
					self._trackCustome(a, nid, nick, alt, sid);
					i.attr('alt', alt);
					i.attr('title', alt);
					i.attr('src', picurl);
					p.text(price);
					ta = edit.find('.title');
					if (ta.length > 0) {
						ta.attr('href', tclickurl);
						ta.attr('title', alt);
						ts = ta.find('span');
						ts.text(title);
						if (sid && sid != '') {// 追踪店铺
							self._trackCustome(ta, '', '', alt, sid);
						}
					}
					if (vo.length == 1) {// 销量
						if (volume && volume != "0") {
							$('.volume-desc', edit).show();
							vo.show().text(volume);
						} else {
							$('.volume-desc', edit).hide();
							vo.hide();
						}
					}
					if (se.length == 1) {// 卖家
						if (nick && nick != "卖家昵称") {
							$('.seller-desc', edit).show();
							se.show().text(nick);
							if (le.length == 1) {// 信用
								if (level) {
									$('.level-desc', edit).show();
									le.show().attr('src', level);
								} else {
									$('.level-desc', edit).hide();
									le.hide();
								}
							}
						} else {
							$('.seller-desc', edit).hide();
							se.hide();
						}
					}
					break;
			}
			return true;
		},
		/**
		 * 追踪
		 */
		_trackCustome : function(a, nid, nick, alt, sid) {
			if (nid && nid != '' && nick && nick != '' && alt && alt != '') {// 商品推广
				a.attr('onClick', "_gaq.push(['_trackEvent', 'xt-" + PID
								+ "', 'item-d-" + nick + "-" + nid + "', '"
								+ alt + "']);");
			} else if (sid && sid != '') {// 商品推广
				a.attr('onClick', "_gaq.push(['_trackEvent', 'xt-" + PID
								+ "', 'shop-d-" + sid + "', '" + alt + "']);");
			} else {
				a.removeAttr('onClick');
			}
		},
		_itemLi : function(item) {
			var li = "";
			if (item) {
				li += '<li nick="'
						+ item.nick
						+ '" nid="'
						+ item.num_iid
						+ '" title="30天推广量:'
						+ item.commission_num
						+ '件" co="'
						+ item.commission
						+ '" wid="'
						+ item.id
						+ '" pi="'
						+ item.pic_url
						+ '" t="'
						+ item.title
						+ '" c="'
						+ item.click_url
						+ '" pr="'
						+ item.price
						+ '" level="'
						+ item.seller_credit_score
						+ '" volume="'
						+ item.volume
						+ '"><div class="pic" align="center"><img src="'
						+ item.pic_url.replace('bao/uploaded', 'imgextra')
						+ '_60x60.jpg"/></div><div class="item"><div class="title"><a href="'
						+ item.click_url
						+ '" target="_blank">'
						+ item.title
						+ '</a></div><div><span class="k">价格:</span><span class="v">'
						+ item.price
						+ '</span>元</div><div><span class="k">佣金:</span><span class="v">'
						+ item.commission
						+ '</span>元</div><input class="customechecked" type="radio" name="checkedgroupitem"/></div></li>';
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
		},
		/**
		 * 转换信用
		 */
		_taobaoCredit : function(level) {
			level = parseInt(level);
			switch (level) {
				case 1 :
					return "s_red_1";
				case 2 :
					return "s_red_2";
				case 3 :
					return "s_red_3";
				case 4 :
					return "s_red_4";
				case 5 :
					return "s_red_5";
				case 6 :
					return "s_blue_1";
				case 7 :
					return "s_blue_2";
				case 8 :
					return "s_blue_3";
				case 9 :
					return "s_blue_4";
				case 10 :
					return "s_blue_5";
				case 11 :
					return "s_cap_1";
				case 12 :
					return "s_cap_2";
				case 13 :
					return "s_cap_3";
				case 14 :
					return "s_cap_4";
				case 15 :
					return "s_cap_5";
				case 16 :
					return "s_crown_1";
				case 17 :
					return "s_crown_2";
				case 18 :
					return "s_crown_3";
				case 19 :
					return "s_crown_4";
				case 20 :
					return "s_crown_5";
				default :
					return "s_red_1";
			}
		}

	});
})(jQuery);
