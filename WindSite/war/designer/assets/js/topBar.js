(function($) {
	var deletedContents = [], contentArrow = '<span class="w-arrow ui-icon ui-icon-arrowthick-1-w" title="向左移动"/><span class="e-arrow ui-icon ui-icon-arrowthick-1-e" title="向右移动"/>';
	var expose = null;
	$.widget("ui.designerTopBar", {
		/**
		 * 参数
		 */
		options : {},
		/**
		 * 更新用户模板
		 */
		templateInfoUpdate : function() {
			$("#designer-loading").show();
			var url = "";
			if (desigerModel == "user") {// 如果是用户模式
				url = '/router/member/designer/template/update/user/';
			} else {
				url = '/router/member/designer/template/update/system/';
			}
			var sender = new WindSender(url
					+ $('#designer').designer('option', 'tid'));
			sender.load('POST', {
						template_name : $('#template_name').val(),
						template_desc : $('#template_desc').val()
					}, function(response) {
						if (response.isSuccess()) {
							alert('模板基本信息修改成功!');
							// $('#currentTemplateA').text($('#template_name')
							// .val());// 修改名称
						} else {
							alert(response.msg);
						}
						$("#designer-loading").hide();
					}, function() {
						$("#designer-loading").hide();
					});
		},
		/**
		 * 发布此模板(静态化)
		 */
		designerDeploy : function() {
			if (confirm('您确定发布当前模板吗？')) {
				$("#designer-loading").show();
				var sender = new WindSender('/router/member/designer/template/update/user/'
						+ $('#designer').designer('option', 'tid'));
				var _source = '';
				try {
					_source = $('#designer').designer('toSource', true);// 此处会放入gids至body内
				} catch (e) {
					if ($.browser.msie) {// 如果是IE
						alert('发布模板发生错误:' + e.message);
					} else {
						alert('发布模板发生错误:' + e);
					}
					$("#designer-loading").hide();
					return;
				}
				var _gids = $('body').data('gids');
				var _customes = $('body').data('customes');
				var _skin = $('body').data('skin');
				if (_skin == null) {
					_skin = SKIN;
				}
				if (_customes == null) {
					_customes = [];
				}
				var isSave = true;
				if (!isSave) {
					return;
				}
				// Header
				var header = $('#ui-designer-header');
				if (header.length == 0) {
					header = $('.ui-designer-header');
				}
				var _header = header.designerHeader('toSource');
				sender.load('POST', {
							template_content : _source,
							template_header : _header,
							template_gids : _gids,
							template_skin : _skin,
							template_customes : _customes.join(',')
						}, function(response) {
							if (response.isSuccess()) {
								var sender = new WindSender('/router/member/designer/deploy/'
										+ $('#designer').designer('option',
												'tid'));
								sender.load('GET', {}, function(response) {
									if (response.isSuccess()) {
										alert('模板发布成功!');
										if ((document.location.href + '')
												.indexOf('stid=') != -1) {// 如果当前设计器为系统模板进入则刷新当前设计器为用户模板进入
											document.location.href = "/router/member/designer?tid="
													+ $('#designer').designer(
															'option', 'tid')
													+ '';
										}
									} else {
										alert(response.msg);
									}
								});
							} else {
								alert(response.msg);
							}
							$("#designer-loading").hide();
						}, function() {
							$("#designer-loading").hide();
						});

			}
		},
		/**
		 * 发布系统模板
		 */
		designerSysDeploy : function() {
			if (confirm('您确定发布当前系统模板吗？')) {
				$("#designer-loading").show();
				var sender = new WindSender('/router/member/designer/deploy/sys/'
						+ $('#designer').designer('option', 'tid'));
				sender.load('GET', {}, function(response) {
							if (response.isSuccess()) {
								alert('系统模板发布成功!');
							} else {
								alert(response.msg);
							}
							$("#designer-loading").hide();
						}, function() {
							$("#designer-loading").hide();
						});
			}
		},
		/**
		 * 保存系统模板
		 */
		designerSysSave : function() {
			if (window.confirm("确认要覆盖旧的系统模板设计吗?")) {
				$("#designer-loading").show();
				var sender = new WindSender('/router/member/designer/template/update/system/'
						+ $('#designer').designer('option', 'tid'));
				var _source = '';
				try {
					_source = $('#designer').designer('toSource');// 此处会放入gids至body内
				} catch (e) {
				}
				var _gids = $('body').data('gids');// 系统模板推广组
				var _customes = $('body').data('customes');// 模板
				var _skin = $('body').data('skin');
				if (_skin == null) {
					_skin = SKIN;
				}
				if (_customes == null) {
					_customes = [];
				}
				// 系统模板布局
				var isSave = true;
				if (!isSave) {
					return;
				}
				var header = $('#ui-designer-header');
				if (header.length == 0) {
					header = $('.ui-designer-header');
				}
				var _header = header.designerHeader('toSource');
				sender.load('POST', {
							template_content : _source,
							template_header : _header,
							template_gids : _gids,
							template_skin : _skin,
							template_customes : _customes.join(',')
						}, function(response) {
							if (response.isSuccess()) {
								alert('系统模板修改成功!');
							} else {
								alert(response.msg);
							}
							$("#designer-loading").hide();
						}, function() {
							$("#designer-loading").hide();
						});
			}
		},
		/**
		 * 另存系统模板
		 */
		designerSysSaveOther : function() {
			if (window.confirm("确认要另存系统模板设计吗?")) {
				$("#designer-loading").show();
				var sender = new WindSender('/router/member/designer/template/save/system');
				var _source = '';
				try {
					_source = $('#designer').designer('toSource');// 此处会放入gids至body内
				} catch (e) {
				}
				var _gids = $('body').data('gids');// 系统模板推广组
				var _skin = $('body').data('skin');
				if (_skin == null) {
					_skin = SKIN;
				}
				var _customes = $('body').data('customes');// 模板
				if (_customes == null) {
					_customes = [];
				}
				var _name = $('#s_template_name').val();
				var _skin = $('#s_template_skin').val();
				var _desc = $('#s_template_desc').val();
				var isSave = true;
				if (!isSave) {
					return;
				}
				var header = $('#ui-designer-header');
				if (header.length == 0) {
					header = $('.ui-designer-header');
				}
				var _header = header.designerHeader('toSource');
				sender.load('POST', {
							template_content : _source,
							template_header : _header,
							template_gids : _gids,
							template_name : _name,
							template_skin : _skin,
							template_desc : _desc,
							template_customes : _customes.join(',')
						}, function(response) {
							if (response.isSuccess()) {
								alert('系统模板新增成功!');
								$('#designer').designer('option', 'tid',
										response.body.id);
							} else {
								alert(response.msg);
							}
							$("#designer-loading").hide();
						}, function() {
							$("#designer-loading").hide();
						});
			};
		},
		/**
		 * 保存用户模板
		 */
		designerSave : function() {
			if (window.confirm("确认要覆盖旧的模板设计吗?")) {
				$("#designer-loading").show();
				var sender = new WindSender('/router/member/designer/template/update/user/'
						+ $('#designer').designer('option', 'tid'));
				var _source = '';
				try {
					_source = $('#designer').designer('toSource');// 此处会放入gids至body内
				} catch (e) {
				}
				var _gids = $('body').data('gids');
				var _skin = $('body').data('skin');
				if (_skin == null) {
					_skin = SKIN;
				}
				var _customes = $('body').data('customes');// 模板
				if (_customes == null) {
					_customes = [];
				}
				var isSave = true;
				if (!isSave) {
					return;
				}
				var header = $('#ui-designer-header');
				if (header.length == 0) {
					header = $('.ui-designer-header');
				}
				var _header = header.designerHeader('toSource');
				sender.load('POST', {
							template_content : _source,
							template_header : _header,
							template_gids : _gids,
							template_skin : _skin,
							template_customes : _customes.join(',')
						}, function(response) {
							if (response.isSuccess()) {
								alert('模板修改成功!');
								if ((document.location.href + '')
										.indexOf('stid=') != -1) {// 如果当前设计器为系统模板进入则刷新当前设计器为用户模板进入
									document.location.href = "/router/member/designer?tid="
											+ $('#designer').designer('option',
													'tid') + '';
								}
							} else {
								alert(response.msg);
							}
							$("#designer-loading").hide();
						}, function() {
							$("#designer-loading").hide();
						});

			};
		},

		/**
		 * 预览模板
		 */
		preview : function(isTemp) {
			$('#designerForm').attr('action',
					'/router/member/designer/preview?version=' + Math.random());
			try {
				if (true == isTemp) {
					$('#designerSource').val($('#designer').designer(
							'toSource', false, true));// 不校验,临时预览（临时样式）
				} else {
					$('#designerSource').val($('#designer')
							.designer('toSource'));
				}
			} catch (e) {
				alert(e);
				return;
			}
			var header = $('#ui-designer-header');
			if (header.length == 0) {
				header = $('.ui-designer-header');
			}
			var _header = header.designerHeader('toSource');
			$('#designerHeader').val(_header);
			var _skin = $('body').data('skin');
			if (_skin == null) {
				_skin = SKIN;
			}
			$('#designerSkin').val(_skin);
			var gids = $('body').data('gids');
			if (gids != null && gids.length > 0)
				$('#designerGids').val(gids);// 设置推广组隐藏域
			$('#designerForm').submit();// 提交预览
			$('#designerSource').val('');// 清除源码
			$('#designerHeader').val('');// 清除Header
			$('body').removeData('gids');// 移除推广组列表
			$('#designerGids').val('');// 设置推广组隐藏域为空
		},
		enable : function() {
			this.element.tabs('option', 'disabled', []);
			$('#designerDeploy').button('enable');
			$('#designerSaveOther').button('enable');
			$('#designerSave').button('enable');
			$('#preview').button('enable');
			// $('#refreshGroups').button('enable');
			$('#backSystemTemplates').button('enable');
			$('#checkoutMySite').button('enable');
			$('#changeDesignerModel').button('enable');
			$('#commissionView').button('enable');
			$('#changePageDesigner').button('enable');
			if (DesignerUtils.isShowDragWidget()) {
				$('#changeDragWidget').button('enable');
			} else {
				$('#changeDragWidget').click();
				$('#changeDragWidget').button('disable');
			}
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
			var topbar = self.element;// 顶部工具栏
			// topbar.scrollFollow({
			// container : 'designer',
			// speed : 50
			// });
			// 顶部工具栏
			topbar.tabs({
						disabled : [0, 1, 2, 3],
						cache : true,
						autoHeight : true,
						collapsible : true,
						selected : -1,
						select : function(event, ui) {
							// $('#designer').css('margin-top', 45);
						},
						show : function(event, ui) {
							if (ui.panel == $('#view-contents')[0]) {// 如果是布局选项卡
								self._layoutTab();
							}
						}
					});
			$('#ui-designer-topbar-hide').click(function() {
						if ($(this).text() == '隐藏工具栏') {
							topbar.hide();
							$(this).text('显示工具栏');
							$('#designer').css('margin-top', 10);
						} else {
							topbar.show();
							$(this).text('隐藏工具栏');
							$('#designer').css('margin-top', 50);
						}
					});
			self._layoutTabInit();
			$('#checkoutMySite').button({
						disabled : true
					}).unbind('click').click(function() {
				$('#checkoutMySiteVersion').val(Math.random());
				$('#checkoutMySiteForm').attr(
						'action',
						'http://shop' + USERID + '.xintaonet.com?version='
								+ Math.random()).submit();

			});
			// 刷新推广组
			// $('#refreshGroups').button({
			// disabled : true
			// }).unbind('click').click(function() {
			// self._refreshGroups();
			// });
			$('#commissionView').button({
						disabled : true
					}).unbind('click').click(function() {
						if ($(this).button('option', 'label') == '佣金查看模式') {
							self._viewCommission();
							$(this).button('option', 'label', '正常模式');
							isCommissionView = true;
						} else {
							$('.c-c').remove();
							$(this).button('option', 'label', '佣金查看模式');
							isCommissionView = false;
						}
					});
			// TODO 新版本设计器
			$('#changeDragWidget').button({
						disabled : true
					}).unbind('click').click(function() {
				if ($(this).button('option', 'label') == '切换为传统模式') {
					$('#main .ui-designer-container').each(function() {
								if ($('.ui-designer-widget', $(this)).length == 0) {// 寻找容器为空并追加新增按钮
									$(this).prepend(addWidgetA());
								}
							});
					$('#ui-designer-widgetbar').hide();
					isDragWidget = false;
					$(this).button('option', 'label', '切换为拖拽模式');
					$(this).parent().attr('title',
							'当前为传统模式，您可以通过点击组件工具栏上的新增按钮来添加组件设计页面');
				} else {
					$('#main .ui-designer-container').each(function() {
								$('.add-widget-a', $(this)).remove();// 寻找容器新增按钮并移除
							});
					isDragWidget = true;
					$('#ui-designer-widgetbar').show();
					$(this).button('option', 'label', '切换为传统模式');
					$(this).parent().attr('title',
							'当前为拖拽模式，您可以通过拖拽组件树上的组件来设计页面');
				}
			});
			$('#return').button().unbind('click').click(function() {
						document.location.href = '/router/member/sitemanager';
					});
			$('#templateUpdate').button().unbind('click').click(function() {
						self.templateInfoUpdate();
					});
			$('#templateUpdateClose').button().unbind('click').click(
					function() {
						topbar.tabs('option', 'selected', -1);
					});
			$('#designerDeploy').button({
						disabled : true
					}).unbind('click').click(function() {
						if (desigerModel == "user") {// 如果是用户模式
							self.designerDeploy();
						} else {// 管理员模式
							self.designerSysDeploy();
						}
					});
			$('#designerSaveOther').button({
						disabled : true
					}).unbind('click').click(function() {
						self.designerSysSaveOther();
					});
			$('#designerSave').button({
						disabled : true
					}).unbind('click').click(function() {
						if (desigerModel == "user") {
							self.designerSave();
						} else {
							self.designerSysSave();
						}
					});
			$('#preview').button({
						disabled : true
					}).unbind('click').click(function() {
						self.preview();
					});
			$('#backSystemTemplates').button({
						disabled : true
					}).unbind('click').click(function() {
				if (confirm('确认要重新设计此模板吗？')) {
					document.location.href = "/router/member/designer/systemplates/"
							+ $('#designer').designer('option', 'tid');
				}
			});
			self._pagesDialogInit();
			$('#changePageDesigner').button({
						disabled : true
					}).unbind('click').click(function() {
						$('#pageDesignerDialog').dialog('open');
					});
		},
		_viewCommission : function() {
			$('#wrap .widget-customer').each(function() {
						previewCommission($(this));
					});
			$('.widget-itemslinkview-items dt,.widget-itemsthumbview-items li,.widget-itemslistview-items li,.widget-itemsrotatorview-items li,.widget-itemszoomview-items li,.widget-itemsappleview-items td,.widget-itemscycleview-items .pic,.widget-itemsscrollableview-items .d-a-i')
					.each(function() {// 文字链接,图形相册,商品列表,右侧5图滑动相册,产品放大,仿苹果,轮换,横向滚动
								addViewCommission($(this));
							});
		},
		_pagesDialogInit : function() {
			var self = this;
			$('#pageDesignerDialog').dialog({
				bgiframe : true,
				autoOpen : false,
				height : 500,
				width : 900,
				zIndex : 100000,
				modal : true,
				open : function() {
					$('#pages-tbody')
							.empty()
							.append('<tr><td>'
									+ (('1' == $('#designerStatus').val())
											? ('<a style="color:#00E;cursor:pointer;font-weight:bold;" href="http://shop'
													+ USERID
													+ '.xintaonet.com" target="_blank">'
													+ $('#designerSiteTitle')
															.val() + '</a>')
											: $('#designerSiteTitle').val())
									+ '</td><td>http://shop'
									+ USERID
									+ '.xintaonet.com</td><td>'
									+ (('1' == $('#designerStatus').val())
											? '已发布'
											: '未发布')
									+ '</td><td><a href="/router/member/designer?siteId='
									+ $('#designerSiteId').val()
									+ '" style="color:#00E;cursor:pointer;font-weight:bold;">设计首页</a></td></tr>');
					var pages = $('body').data('pages');
					if (!pages || pages == null) {
						$('#pages-tbody')
								.append('<tr><td colspan=4>您还没有新增其他页面。请进入我的新淘网-我的淘站-页面管理-新增页面</td></tr>');
					} else {
						for (var p in pages) {
							var page = pages[p];
							$('#pages-tbody')
									.append('<tr><td>'
											+ ((1 == page.status)
													? ('<a href="http://shop'
															+ USERID
															+ '.xintaonet.com/pages/'
															+ page.created
															+ '.html" target="_blank" style="color:#00E;cursor:pointer;font-weight:bold;">'
															+ page.name + '</a>')
													: ('<span style="color:gray;">'
															+ page.name + '</span>'))
											+ '</td><td>http://shop'
											+ USERID
											+ '.xintaonet.com/pages/'
											+ page.created
											+ '.html</td><td>'
											+ (1 == page.status ? '已发布' : '未发布')
											+ '</td><td><a class="page-designer-a" style="color:#00E;cursor:pointer;font-weight:bold;" tid="'
											+ page.id + '">设计此页面</a></td></tr>');
						}
						$('.page-designer-a', $(this)).click(function() {
							if (confirm('您确定要切换页面设计吗？')) {
								document.location.href = '/router/member/designer?tid='
										+ $(this).attr('tid');
							}
						});
					}
				}
			});
		},
		_layoutTabInit : function() {
			var self = this;
			$('#view-contents ul').sortable({
						revert : true
					});
			$('#view-contents-add').button().click(function() {
						$('#content-layouts').show();
					});
			$('#content-layouts button[name="view-contents-add-layout"]')
					.button().unbind('click').click(function() {
						var layout = $(this).attr('layout');
						if (layout) {
							$('#view-contents ul').append(self
									.addViewLayoutLi(layout));

						}
						$('#content-layouts').hide();
					});

			$('#view-contents-save').button().click(function() {
						self.saveLayout();
					});
			$('#view-contents-cancel').button().click(function() {
						self.element.tabs('select', -1);// 收缩
					});

		},
		/**
		 * 保存布局
		 */
		saveLayout : function() {
			var self = this;
			if (deletedContents.length > 0) {// 删除
				for (var i = 0; i < deletedContents.length; i++) {
					$('#' + deletedContents[i]).remove();
				}
			}
			var addContents = [];
			$('#view-contents ul li').each(function() {
				var cid = $(this).attr('cid');
				var content = null;
				if (cid) {// 如果是已有
					content = $('#' + $(this).attr('cid'));
					$('div', $(this)).each(function() {
						content.append($('.' + $(this).attr('class'), content));
					});
					if (content.find('.ui-designer-container').length > 1) {
						if ($.browser.msie && $.browser.version == '6.0') {
							content.find('.ui-designer-container:last').css(
									'margin-right', 0).siblings().css(
									'margin-right', 2);
						} else {
							content.find('.ui-designer-container:last').css(
									'margin-right', 0).siblings().css(
									'margin-right', 5);
						}
					}
					$('#main').append(content);
				} else {// 如果是新增
					var _content = '<div class="ui-designer-content">';
					$('div', $(this)).each(function() {
						_content += '<div class="ui-designer-container '
								+ $(this).attr('class') + '"></div>';
					});
					_content += '</div>';
					content = $(_content);
					$('#main').append(content);
					addContents.push(content);
				}
			});
			if (addContents.length > 0) {
				for (var i = 0; i < addContents.length; i++) {
					addContents[i].designerContent();
				}
			}
			self.element.tabs('select', -1);// 收缩
			DesignerUtils.initWidgetBarPermission();// 刷新组件权限
		},
		/**
		 * 布局Tab页
		 */
		_layoutTab : function() {
			var self = this;
			deletedContents = [];// 清空
			// $('#view-contents input[name="view-contents-type"][value="0"]')
			// .attr('checked', true);// 还原排序类型
			var views = $('#view-contents ul');
			views.empty();
			$('#main .ui-designer-content').each(function() {
				var li = $('<li cid="'
						+ $(this).attr('id')
						+ '" style="opacity: 1; filter:Alpha(Opacity=100);" title="双击定位此容器">'
						+ self.createViewLayout($(this))
						+ '<span class="deleteImg ui-icon ui-icon-closethick" title="删除此布局"/></li>');
				li.dblclick(function() {
					var cid = $(this).attr('cid');
					var targetOffset = $('#' + cid).offset().top
							- $('#ui-designer-topbar').height() - 10;
					$('html,body').animate({
								scrollTop : targetOffset
							}, 500);
					$(this).toggleClass("ui-selected").siblings()
							.removeClass("ui-selected");
					if (expose != null) {
						expose.close();
					}
					expose = $('#' + cid).expose({
								api : true,
								color : '#456'
							});
					expose.load();
				}).hover(function() {
					$(this).toggleClass("ui-selecting").siblings()
							.removeClass("ui-selecting");
					$('.w-arrow,.e-arrow,.content-desc', this).show();
				}, function() {
					$(this).removeClass("ui-selecting");
					$('.w-arrow,.e-arrow,.content-desc', this).hide();
				});
				$('.deleteImg', li).unbind('click').click(function() {
							if (window.confirm('删除布局将移除该布局中所有组件,您确定要这么做吗?')) {
								var li = $(this).parents('li');
								deletedContents.push(li.attr('cid'));// 临时存储要删除的布局
								li.remove();
							}
						});
				self.bindClickArrow(li);
				views.append(li);
			});
		},
		/**
		 * 绑定箭头事件
		 */
		bindClickArrow : function(li) {
			$('.w-arrow', li).unbind('click').click(function() {
						var div = $(this).parent();
						var prevDiv = div.prevAll('div:first');
						if (prevDiv.length == 0) {// 如果左边没有
							li.append(div);// 追加至最后
						} else {
							prevDiv.before(div);// 向左移动一位
						}
					});
			$('.e-arrow', li).unbind('click').click(function() {
						var div = $(this).parent();
						var nextDiv = div.nextAll('div:first');
						if (nextDiv.length == 0) {// 如果右边没有
							li.prepend(div);// 追加至最前
						} else {
							nextDiv.after(div);// 向右移动一位
						}
					});
		},
		addViewLayoutLi : function(layout) {
			var self = this;
			var li = $('<li style="opacity: 1; filter:Alpha(Opacity=100);">'
					+ self.addViewLayout(layout)
					+ '<span class="deleteImg ui-icon ui-icon-closethick" title="删除此新增布局"/><img class="new" src="/designer/assets/images/new.gif"/></li>');
			li.hover(function() {
						$(this).toggleClass("ui-selecting").siblings()
								.removeClass("ui-selecting");
						$('.w-arrow,.e-arrow,.content-desc', this).show();
					}, function() {
						$(this).removeClass("ui-selecting");
						$('.w-arrow,.e-arrow,.content-desc', this).hide();
					});
			$('.deleteImg', li).unbind('click').click(function() {
						if (window.confirm('您确定要删除此新增布局容器吗?')) {
							$(this).parents('li').remove();
						}
					});
			self.bindClickArrow(li);
			return li;
		},

		/**
		 * 新增布局容器
		 */
		addViewLayout : function(layout) {
			var _layout = '';
			switch (layout) {
				case '1-3' :
					_layout = '<div class="left-1-3" align="center"><span class="content-desc">1</span>'
							+ contentArrow
							+ '</div><div class="right-1-3" align="center"><span class="content-desc">2</span>'
							+ contentArrow + '</div>';
					break;
				case '1-3-1' :
					_layout = '<div class="left-1-3-1" align="center"><span class="content-desc">1</span>'
							+ contentArrow
							+ '</div><div class="middle-1-3-1" align="center"><span class="content-desc">2</span>'
							+ contentArrow
							+ '</div><div class="right-1-3-1" align="center"><span class="content-desc">3</span>'
							+ contentArrow + '</div>';
					break;
				case '1' :
					_layout = '<div class="middle-1" align="center"><span class="content-desc">1</span>'
							+ contentArrow + '</div>';
					break;
				case '1-1' :
					_layout = _layout = '<div class="left-1-1" align="center"><span class="content-desc">1</span>'
							+ contentArrow
							+ '</div><div class="right-1-1" align="center"><span class="content-desc">2</span>'
							+ contentArrow + '</div>';
					break;
				case '1-1-1' :
					_layout = '<div class="left-1-1-1" align="center"><span class="content-desc">1</span>'
							+ contentArrow
							+ '</div><div class="middle-1-1-1" align="center"><span class="content-desc">2</span>'
							+ contentArrow
							+ '</div><div class="right-1-1-1" align="center"><span class="content-desc">3</span>'
							+ contentArrow + '</div>';
					break;
			}
			return _layout;
		},
		/**
		 * 创建指定layoutView
		 */
		createViewLayout : function(content) {
			var _layout = '';
			var i = 0;
			$('.ui-designer-container', content).each(function() {
				var clazz = $(this).attr('class').split(' ')[1];
				// var desc = '<span class="content-desc">';
				// if (clazz.indexOf('left') != -1) {
				// desc += '左';
				// } else if (clazz.indexOf('right') != -1) {
				// desc += '右';
				// } else if (clazz.indexOf('middle') != -1) {
				// desc += '中';
				// }
				// desc += '</span>'
				_layout += '<div class="' + clazz
						+ '"><span class="content-desc">' + (++i) + '</span>'
						+ contentArrow + '</div>';
			});
			return _layout;
		},
		_refreshGroups : function() {
			$("#designer-loading").show();
			DesignerUtils.loadItemGroups(function() {
						// 刷新所有推广组
						$('#main .ui-designer-container .ui-designer-widget')
								.each(function() {
									var widget = $(this);
									var name = widget.attr('name');
									var options = widget[name]('option');
									if (options.gid && options.gid.length > 0
											&& options.gid != '0') {
										widget[name]('refresh', 'group');// 刷新
									}
									DesignerUtils.initWidgetBarPermission();// 刷新组件权限

								});
						$("#designer-loading").hide();
					});

		}
	});
})(jQuery);
