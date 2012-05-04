(function($) {
	$.widget("ui.pageLayoutManager", {
		/**
		 * 参数
		 */
		options : {},
		_create : function() {
		},
		/**
		 * Page-Layout初始化
		 */
		_init : function() {
			var self = this;
			var editor = self.element;// 模块编辑器
			$('#page-module-editor').pageModuleEditor();
			$('#page-layout-editor').pageLayoutEditor();
			$('.add-layout', editor).click(function() {
						var length = $('#content .page-edit .layout').length;
						if (LIMIT_LAYOUTS > length) {
							$('#page-layout-editor').dialog('open');
						} else {
							if (length >= 5) {
								alert('您的页面布局限额为' + LIMIT_LAYOUTS + ',无法添加新的布局');
							} else {
								PageUtils.loadVersionInfo(VERSIONNO, '更多布局');
							}
							return;
						}
					});
			$('#J_changePage').change(function() {
				document.location.href = '/router/member/page/layout/manager/'
						+ $(this).val();
			});
			$('#content .page-edit .layout').each(function() {
						$(this).pageLayout();
					});
			editor.sortable({
				iframeFix : true,
				revert : true,
				handle : ".move",
				placeholder : 'ui-state-highlight',
				forcePlaceholderSize : true,
				start : function() {
				},
				receive : function(event, ui) {
					// 容器间拖拽判断是否可放入当前容器
				},
				stop : function() {
				},
				over : function(event, ui) {
				},
				start : function(event, ui) {
				},
				update : function(event, ui) {
					var ids = [];
					$('#content .page-edit .layout').each(function() {
								ids.push($(this).attr('data-id'));
							});
					// 1秒后执行
					$.doTimeout(1000, function() {
								PageUtils.showMsg('正在保存布局顺序...');
								PageUtils.updatePageMeta(PAGEID, PageUtils
												.getPageMeta(), function() {
											PageUtils.showMsg('布局顺序保存成功');
										});
							});
				}
			}).disableSelection();
		}
	});

})(jQuery);
(function($) {
	$.widget("ui.pageLayout", {
		/**
		 * 参数
		 */
		options : {},
		_create : function() {
		},
		/**
		 * Page-Layout初始化
		 */
		_init : function() {
			var self = this;
			var layout = self.element;// 模块编辑器
			var bar = $('.layout-bar', layout);
			layout.hover(function() {
						$(this).addClass('hover');
					}, function() {
						$(this).removeClass('hover');
					});
			if (bar.length == 0) {
				layout
						.append('<div class="cl"><i class="move" title="移动布局"></i><i class="del" title="删除布局"></i></div>')
				$('.del', layout).click(function() {
							if (confirm('您确认要删除该布局吗？确认，则将删除该布局以及布局中的所有模块')) {
								var l = $(this).parents('.layout:first');
								self.deleteLayout(l);
							}
						});
			}
			$('.J_TRegion', layout).each(function() {
						$(this).pageLayoutRegion();
					});
		},
		/**
		 * 删除当前布局
		 */
		deleteLayout : function(layout) {
			PageUtils.showMsg('正在删除布局');
			layout.remove();
			PageUtils.deleteLayout(layout.attr('data-id'), function() {
						PageUtils.showMsg('删除布局成功');
					});
		}
	});

})(jQuery);
(function($) {
	$.widget("ui.pageLayoutRegion", {
				/**
				 * 参数
				 */
				options : {},
				_create : function() {
				},
				/**
				 * Page-Layout-editor初始化
				 */
				_init : function() {
					var self = this;
					var region = self.element;// 模块编辑器
					region.pageRegion();
					$('b', region).each(function() {
								$(this).pageLayoutModule();
							});
					$('i', region).click(function() {
								MODULE = $(this).parent();
								$('#page-module-editor').dialog('open');
							});
				}
			});

})(jQuery);
(function($) {
	$.widget("ui.pageLayoutModule", {
				/**
				 * 参数
				 */
				options : {},
				_create : function() {
				},
				/**
				 * Page-Layout-Module初始化
				 */
				_init : function() {
					var self = this;
					var b = self.element;// 布局管理器中，模块
					var module = b.attr('name');
					b['page' + PageModuleUtils.getModuleName(module)]();

					// 编辑
					// $('a.ui-icon-info', b).click(function() {
					// var module = $(this).parent();
					// if (module.hasClass('J_TBox')) {// 如果是模块
					// MODULE = module;
					// module['page'
					// + PageModuleUtils
					// .getModuleName(module.attr('name'))]('moduleEdit');
					//
					// } else {
					// alert('当前元素不是模块');
					// }
					// });
					// 删除
					$('a.ui-icon-circle-close', b).click(function() {
						if (confirm('确认要删除此模块吗?')) {
							b['page'
									+ PageModuleUtils.getModuleName(b
											.attr('name'))]('autoSave',
									'delete', function() {
										PageUtils.showMsg('模块删除成功');
									});
							b.remove();
						}
					});
					// 上移
					$('a.ui-icon-circle-arrow-n', b).click(function() {
						var module = $(this).parent();// 当前模块
						if (module.hasClass('J_TBox')) {
							var prevModule = module.prevAll('.J_TBox:first');
							if (prevModule.length == 0) {// 如果前边没有
								// module.parent().append(module);//
								// 追加至最后（暂时不循环移动）
							} else {
								prevModule.before(module);// 向前移动一位
								module['page'
										+ PageModuleUtils.getModuleName(module
												.attr('name'))]('autoSave',
										'sort', function() {
											PageUtils.showMsg('模块排序成功');
										}, prevModule.attr('data-id'));
							}

						}
					});
					// 下移
					$('a.ui-icon-circle-arrow-s', b).click(function() {
						var module = $(this).parent();// 当前组件
						if (module.hasClass('J_TBox')) {
							var nextModule = module.nextAll('.J_TBox:first');
							if (nextModule.length == 0) {// 如果后边没有
								// module.parent().prepend(module);//
								// 追加至最前（暂时不循环移动）
							} else {
								nextModule.after(module);// 向前移动一位
								module['page'
										+ PageModuleUtils.getModuleName(module
												.attr('name'))]('autoSave',
										'sort', function() {
											PageUtils.showMsg('模块排序成功');
										}, nextModule.attr('data-id'));
							}

						}
					});
				}
			});

})(jQuery);

(function($) {
	$.widget("ui.pageLayoutEditor", {
		/**
		 * 参数
		 */
		options : {},
		_create : function() {
		},
		/**
		 * Page-Layout-editor初始化
		 */
		_init : function() {
			var self = this;
			var editor = self.element;// 模块编辑器
			// 弹出框初始化
			editor.dialog({
						bgiframe : true,
						autoOpen : false,
						width : 620,
						zIndex : 1000,
						modal : true
					});
			$('.layout-list li a', editor).hover(function() {
				$(this).addClass('selected').siblings().removeClass('selected');
			}, function() {
				$(this).removeClass('selected');
			}).click(function() {
				var _self = $(this);
				if (_self.hasClass('add-layout-disabled')) {
					return false;
				}
				if (confirm('您确认添加此布局单元吗？')) {
					_self.addClass('add-layout-disabled');
					PageUtils.showMsg('正在添加布局...');
					PageUtils.addLayout(PAGEID, $(this).attr('layout'),
							function(data) {
								if (data.id && data.content) {
									var widget = $($('<div><div>')
											.html(data.content).text());
									$('#content .page-edit .add-layout-bar')
											.before(widget);
									widget.pageLayout();
									PageUtils.showMsg('添加布局完成');
								} else {
									PageUtils.showMsg('添加布局发生错误');
								}
								_self.removeClass('add-layout-disabled');
							});
					editor.dialog('close');// 关闭
				}
			});
		}
	});

})(jQuery);
