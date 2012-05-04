(function($) {
	$.widget("ui.pageHeaderEditor", {
		/**
		 * 参数
		 */
		options : {},
		_create : function() {
		},
		/**
		 * Page-Header-Editor初始化
		 */
		_init : function() {
			var self = this;
			var editor = self.element;// 内容区
			// 弹出框初始化
			editor.dialog({
						bgiframe : true,
						autoOpen : false,
						width : 800,
						zIndex : 1000,
						modal : true,
						open : function() {
							self.restoreHeaderNav();
							$(".module-steps", $(this)).scrollable().seekTo(0);
						}
					});
			// 步骤滚动初始化
			var root = $(".module-steps", editor).scrollable();
			var api = root.scrollable();
			api.onBeforeSeek(function(event, i) {
						$(".steps li", editor).removeClass("current")
								.removeClass('last-current').eq(i)
								.addClass(i == 2 ? "last-current" : "current");
					});
			$('.dialog-nav li', editor).click(function() {
				if (!$(this).hasClass('selected')) {
					$(this).addClass('selected').siblings()
							.removeClass('selected');
					$('#page-header-editor .panel').hide().eq($(this).index())
							.show();
				}
				return;
			});
			// 已有菜单的change事件
			$('input[name="header-nav"]', editor).change(function() {
						self._headerNavCheckboxChange($(this));
					});
			$('#header-image-button').hover(function() {
						$(this).addClass('btn-ok-hover');
					}, function() {
						$(this).removeClass('btn-ok-hover');
					}).click(function() {
						var image = $('#header-image').val();
						var url = $('#header-image-url').val();
						if (!image) {
							alert('图片地址不能为空');
							$('#header-image').focus();
							return;
						}
						var reg = /http:\/\/.+/;
						if (!reg.test(image)) {
							alert('图片地址不合法');
							$('#header-image').focus();
							return;
						}
						if (url && !reg.test(url)) {
							alert('图片链接地址不合法');
							$('#header-image-url').focus();
							return;
						}
						api.seekTo(1);
					});
			$('#header-flash-button').hover(function() {
						$(this).addClass('btn-ok-hover');
					}, function() {
						$(this).removeClass('btn-ok-hover');
					}).click(function() {
						var url = $('#header-flash').val();
						if (!url) {
							alert('阿里妈妈广告牌地址不能为空');
							$('#header-flash').focus();
							return;
						}
						if (!PageUtils.validateAlimamaFlashBM(url)) {
							$('#header-flash').focus();
							return;
						}
						api.seekTo(1);
					});
			$('#header-nobg-button,#header-smart-button').hover(function() {
						$(this).addClass('btn-ok-hover');
					}, function() {
						$(this).removeClass('btn-ok-hover');
					}).click(function() {
						api.seekTo(1);
					});
			/**
			 * 第二步：选择导航频道
			 */
			$('.secondStep .btn-ok', editor).hover(function() {
						$(this).addClass('btn-ok-hover');
					}, function() {
						$(this).removeClass('btn-ok-hover');
					}).click(function() {
				var navs = $('#page-header-editor input[name="header-nav"]:checked');
				if (navs.length > 10) {
					alert('您最多可以选择10个导航菜单');
					return;
				}
				$('#header-nav-edit').empty();
				navs.each(function() {
					var t = $(this).attr('t');
					var open = $(this).attr('open');
					var isCustome = ('custome' == t);
					var rowElem;
					if (isCustome) {// 自定义菜单
						rowElem = $('<div class="rowElem ks-clear" t="'
								+ t
								+ '" ><input type="text" value="'
								+ $(this).attr('title')
								+ '" style="width:130px;padding:2px;" class="header-nav-title"/><input type="text" value="'
								+ $(this).attr('value')
								+ '" style="margin-left:5px;width:300px;padding:2px;" class="header-nav-url"><input class="isOpenBlank" type="checkbox" '
								+ ('S' != open ? 'checked' : '')
								+ '>新窗口打开&nbsp;&nbsp;<a class="header-nav-del">删除</a><a class="header-nav-up">上移</a><a class="header-nav-down">下移</a></div>');
					} else {// 系统级菜单
						rowElem = $('<div class="rowElem ks-clear" t="'
								+ t
								+ '" v="'
								+ $(this).attr('v')
								+ '"><input class="header-nav-title" type="text" value="'
								+ $(this).attr('title')
								+ '" style="width:130px;padding:2px;"/><input class="header-nav-url" style="margin-left:5px;background:gray;width:300px;padding:2px;" type="text" value="'
								+ $(this).attr('value')
								+ '" readonly/><input class="isOpenBlank" type="checkbox" '
								+ ('S' != open ? 'checked' : '')
								+ '>新窗口打开&nbsp;&nbsp;<a class="header-nav-del">删除</a><a class="header-nav-up">上移</a><a class="header-nav-down">下移</a></div>');
					}
					$('#header-nav-edit').append(rowElem);
					self._initHeaderNavRow(rowElem);

					self._sortHeaderNavRow();// 排序
				});
				api.seekTo(2);
			});
			// 新增自定义菜单
			$('#add-header-nav-button').click(function() {
				if ($('#header-nav-edit .rowElem .header-nav-title').length >= 10) {
					alert('您最多可以添加10个导航菜单，移除一个之后才可以新增');
					return;
				}
				var rowElem = $('<div class="rowElem ks-clear" t="custome"><input class="header-nav-title" type="text" value="请输入链接标题"  style="width:130px;padding:2px;"/><input class="header-nav-url" type="text" value="请输入链接地址"  style="margin-left:5px;width:300px;padding:2px;"><input class="isOpenBlank" type="checkbox" checked>新窗口打开&nbsp;&nbsp;<a class="header-nav-del">删除</a><a class="header-nav-up">上移</a><a class="header-nav-down">下移</a></div>');
				$('#header-nav-edit').append(rowElem);
				self._initHeaderNavRow(rowElem, true);
			});
			/**
			 * 第三步：完成编辑
			 */
			$('.thirdStep .btn-ok', editor).hover(function() {
						$(this).addClass('btn-ok-hover');
					}, function() {
						$(this).removeClass('btn-ok-hover');
					}).click(function() {
				if ($(this).hasClass('btn-ok-disabled')) {
					return;
				}
				$(this).addClass('btn-ok-disabled');
				updateShopHeaderModuleContent(MODULE.attr('data-id'), '店标模块',
						function(data) {
							var id = data.id;
							var widget = $($('<div><div>').html(data.content)
									.text());
							MODULE.pageShopHeader('destory')
									.replaceWith(widget);// 替换当前组件内容
							widget.pageShopHeader();
							PageUtils.showMsg('店标模块编辑完成...');
							$('#page-header-editor .thirdStep .btn-ok')
									.removeClass('btn-ok-disabled');
							$('#page-header-editor').dialog('close');
						});
			});
			$('form', editor).jqTransform({
						imgPath : '/assets/js/jquery/jqtransform/img'
					});
		},
		/**
		 * 实现排序【根据已有菜单顺序重新排列，规则，已有的菜单按照顺序显示，新增的菜单添加至最后排序】
		 */
		_sortHeaderNavRow : function() {
			var temp = [];
			var edit = $('#header-nav-edit');
			// 迭代以前的导航菜单
			MODULE.find('.nav ul li').each(function() {
				var t = $(this).attr('t');
				var v = $(this).attr('v');
				var title = $(this).find('em').text();
				var url = $(this).find('a').attr('href');
				if ('custome' == t) {// 自定义
					var titleInput = $('input.header-nav-title[value="' + title
									+ '"]', edit);
					var urlInput = $('input.header-nav-url[value="' + url
									+ '"]', edit);
					if (titleInput.length == 1 && urlInput.length == 1) {
						temp.push(titleInput.parents('div.rowElem'));// 添加至临时数组
					}
				} else {// 系统
					var row = $('div.rowElem[t="' + t + '"][v="' + v + '"]',
							edit);
					if (row.length == 1) {
						temp.push(row);
					}
				}
			});
			if (temp.length > 0) {// 将临时数组中的顺序还原至编辑菜单列表
				temp.reverse();// 反转数组
				for (var i = 0; i < temp.length; i++) {
					edit.prepend(temp[i]);
				}
			}
		},
		/**
		 * 初始化菜单编辑行
		 */
		_initHeaderNavRow : function(rowElem, isNew) {
			// 删除当前选择导航
			$('a.header-nav-del', rowElem).click(function() {
						if (confirm('您确认要删除当前导航菜单项吗?')) {
							$(this).parent().remove();
						}
						return false;
					});
			// 导航排序上移
			$('a.header-nav-up', rowElem).click(function() {
						var row = $(this).parent();
						var prev = row.prevAll('.rowElem:first');
						if (prev.length == 1) {
							prev.before(row);
						}
					});
			// 导航排序下移
			$('a.header-nav-down', rowElem).click(function() {
						var row = $(this).parent();
						var next = row.nextAll('.rowElem:first');
						if (next.length == 1) {
							next.after(row);
						}
					});
			if (isNew) {
				$('.header-nav-title', rowElem).focus(function() {
							if ('请输入链接标题' == $(this).val()) {
								$(this).val('');
							}
						}).blur(function() {
							if (!$(this).val()) {
								$(this).val('请输入链接标题');
							}
						});// 格式化表单
				$('.header-nav-url', rowElem).focus(function() {
							if ('请输入链接地址' == $(this).val()) {
								$(this).val('http://');
							}
						}).blur(function() {
							if (!$(this).val() || 'http://' == $(this).val()) {
								$(this).val('请输入链接地址');
							}
						});// 格式化表单
			} else {
				// $('input', rowElem).jqTransInputText();// 格式化表单
			}
		},
		_headerNavCheckboxChange : function(checkbox) {
			if (checkbox.is(':checked')) {
				if ($('#page-header-editor input[name="header-nav"]:checked').length > 10) {
					$('#page-header-editor input[name="header-nav"]:checked')
							.siblings().attr('disable', true);
					checkbox.attr('checked', false);
					return;
				}
			}
			return;
		},
		/**
		 * 初始化自定义菜单选择框
		 */
		_initHeaderNavCustome : function(checkbox) {
			this._headerNavCheckboxChange(checkbox);// change事件
			checkbox.jqTransCheckBox();// 格式化选择框
		},
		/**
		 * 还原当前店标模块属性至编辑器
		 */
		restoreHeaderNav : function() {
			var self = this;
			if (MODULE && 'shopHeader' == MODULE.attr('name')) {// 如果当前编辑模块是店标模块
				// 还原背景
				var options = MODULE.pageShopHeader('option');
				$('#page-header-editor .dialog-nav li[t="' + options.type
						+ '"]').click();// 选中背景选项卡
				if (options.image)
					$('#header-image').val(options.image);// 图片地址
				if (options.image_url)
					$('#header-image-url').val(options.image_url);// 图片点击链接
				if (options.flash)
					$('#header-flash').val(options.flash);// 广告牌地址
				// 还原菜单
				$('#page-header-editor .secondStep input[name="header-nav"]')
						.attr('checked', false).parent()
						.find('a.jqTransformCheckbox')
						.removeClass('jqTransformChecked');// 处理jqTransform;清空所有菜单选择
				$('#header-nav-custome').empty();// 清空所有自定义菜单
				MODULE.find('.nav li').each(function() {
					var t = $(this).attr('t');// 类型
					var v = $(this).attr('v');// 链接标识
					var url = $(this).find('a').attr('href');
					var title = $(this).find('em').text();
					var open = $(this).attr('open');// 是否新窗口打开
					if ('custome' == t) {// 自定义菜单
						var li = $('<li><input name="header-nav" type="checkbox" value="'
								+ url
								+ '" t="custome" title="'
								+ title
								+ '" open="'
								+ ('S' == open ? 'S' : 'B')
								+ '"/><label>' + title + '</label></li>');
						$('#header-nav-custome').append(li);
						self._initHeaderNavCustome(li.find('input').attr(
								'checked', true));
					} else {// 系统菜单
						$('#page-header-editor .secondStep input[name="header-nav"][v="'
								+ v + '"]').attr('checked', true).attr('open',
								('S' == open ? 'S' : 'B')).parent()
								.find('a.jqTransformCheckbox')
								.addClass('jqTransformChecked');
					}
					// 还原导航条位置
					// var nav = MODULE.find('.nav');
					// if (nav.hasClass('nav-left')) {
					// $('#page-header-editor
					// input[name="header-nav-layout"][value="nav-left"]')
					// .attr('checked', true);
					// } else if (nav.hasClass('nav-right')) {
					// $('#page-header-editor
					// input[name="header-nav-layout"][value="nav-right"]')
					// .attr('checked', true);
					//					}
					$('#page-header-editor .thirdStep .btn-ok')
							.removeClass('btn-ok-disabled');
				});
			}
		}
	});

})(jQuery);
