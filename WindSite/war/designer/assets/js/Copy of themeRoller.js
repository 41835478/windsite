(function($) {
	$.widget("ui.themeRoller", {
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
			var themeRoller = self.element;// 皮肤设计器
			themeRoller.hide();
			var style = $('#designer style:first');
			if (style) {
				if (style.length == 0) {
					style = $('#designer style');
				}
				if ('siteStyle' != style.attr('id')) {
					style.attr('id', 'siteStyle');
				}
			}
			// 皮肤设计器Accordion
			themeRoller.tabs({
						show : function(event, ui) {
							if (ui.panel == $('#themeGallery')[0]) {// 如果是系统主题选项卡
								$('#previewTempButton').show();
							} else {
								$('#previewTempButton').hide();
							}
							// $('#designer').css('margin-top',
							// $('#ui-designer-topbar').height() + 10);
						}
					});
			$('.colorPicker', themeRoller).click(function() {
				editingColor = $(this);
				$('#colorPicker').ColorPickerShow().show();
				var left = editingColor.offset().left;
				var top = editingColor.offset().top;
				$('.colorpicker').css('left', left).css('top', top + 36).css(
						'z-Index', 100000);
			});
			$('#confirmTheme').button().click(function() {
				if (confirm('确认使用当前皮肤设计')) {
					var selected = $('#sysThemes li[class="ui-selected"]');
					if (selected.length == 0) {
						alert('尚未选择主题皮肤');
						return;
					}
					var li = selected;
					self.changeSysTheme(li.attr('systheme'), li
									.attr('navtheme'));
					self.addStyles();
					$('#ui-designer-topbar').tabs({
								selected : -1
							});
				}
			});
			$('#cancelTheme').button().click(function() {
						self.resetTempStyles();
						self.restoreTheme(false);
					});
			$('select[name=bgPic]').change(function() {
						self.changeTheme('bg', $(this), $(this).val());
					});
			$('select[name=nav]').change(function() {
						// 设置样式名称:
						if ($(this).val() == "") {
							return;
						}
						$('.ui-designer-header-tabs ul').attr('theme',
								$(this).val());
						self.changeNavTheme($(this).val());
					});
			$('#previewTempButton').button().click(function() {
						var selected = $('#sysThemes li[class="ui-selected"]');
						if (selected.length == 0) {
							alert('尚未选择主题皮肤');
							return;
						}
						var li = selected;
						self.changeSysTheme(li.attr('systheme'), li
										.attr('navtheme'));
						$('#ui-designer-topbar')
								.designerTopBar('preview', true);
					});
			if ($.browser.msie
					&& ($.browser.version == '7.0' || $.browser.version == '6.0')) {// 如果是IE7.0
				$('#themeRoller').tabs('option', 'disabled', [1]);
				$('#rollYourOwnA').attr('title',
						'当前浏览器不支持自定义皮肤,请更换浏览器.或升级浏览器版本');

			}
			$('#sysThemes li').click(function() {
				$(this).toggleClass("ui-selected").siblings()
						.removeClass("ui-selected");
				$('#previewTempButton').button('option', 'label',
						'预览【' + $(this).attr('title') + '】主题');
			}).hover(function() {
				$(this).toggleClass("ui-selecting").siblings()
						.removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			});
			self.restoreTheme(true);// 创建主题存储及还原
			themeRoller.show();
		},
		/**
		 * 还原主题
		 */
		restoreTheme : function(isNew) {
			if (!isNew) {
				isNew = false;
			}
			var self = this;
			var theme = $('#hiddenTheme');
			var body = $('.ui-designer-body', theme);
			var header = $('.ui-designer-widget-header', theme);
			var widget = $('.ui-designer-widget', theme);
			var itemTitle = $('.title', theme);
			var itemPrice = $('.price', theme);
			var cats = $('.widget-catslistview-cats .cat-title', theme);
			// 导航栏

			var clazz;// 类
			var bgColor;// 背景色
			var bg;// 背景图片
			var bgp;// 背景图片Position
			var color;// 颜色
			var navTheme = $('.ui-designer-header-tabs ul').attr('theme');// 导航栏
			if ("" != navTheme)
				$('select[name=nav]').val(navTheme);

			if (isNew && navTheme && navThemes[navTheme]) {
				for (var t in navThemes[navTheme]) {
					tempClasses[t] = navThemes[navTheme][t];
				}
			}
			// 空间 TODO 暂时屏蔽空间背景设置
			// bgColor = body.css('background-color');
			// bg = getImagePath(body.css('background-image'));
			// if (isNew) {
			// clazz = new CssClass('.ui-designer-body');// 空间类
			// clazz['background-color'] = bgColor;
			// clazz['background-image'] = bg;// 存储空间背景图片
			// tempClasses['.ui-designer-body'] = clazz;// 存储空间类
			// }
			// if (bg && bg.length > 0 && bg != "none") {
			// try {
			// var temp = bg.split('/');
			// bg = temp[temp.length - 1];
			// temp = bg.split('.');
			// bg = temp[0] + '.' + temp[1].substr(0, 3);
			// } catch (e) {
			// }
			// }
			// $('select[name=bgPic][group=.ui-designer-body]').val(bg);// 背景图片
			// $('div[name=bgColorPicker][group=.ui-designer-body] div').css(
			// 'background-color', bgColor);// 背景色

			// 标题栏
			bgColor = header.css('background-color');
			bg = getImagePath(header.css('background-image'));
			color = header.css('color');
			if (isNew) {
				clazz = new CssClass('.ui-designer-widget-header');
				clazz['background-color'] = bgColor;
				clazz['background-image'] = bg;// 存储标题景图片
				clazz['color'] = color;
				tempClasses['.ui-designer-widget-header'] = clazz;
			}
			if (bg && bg.length > 0 && bg != "none") {
				try {
					var temp = bg.split('/');
					bg = temp[temp.length - 1];
					temp = bg.split('.');
					bg = temp[0] + '.' + temp[1].substr(0, 3);
				} catch (e) {
				}
			}
			$('select[name=bgPic][group=.ui-designer-widget-header]').val(bg);// 背景图片
			$('div[name=bgColorPicker][group=.ui-designer-widget-header] div')
					.css('background-color', bgColor);// 背景色
			$('div[name=tColorPicker][group=.ui-designer-widget-header] div')
					.css('background-color', color);// 颜色
			// 内容 TODO 暂时屏蔽内容区背景色设置
			// bgColor = widget.css('background-color');
			// if (isNew) {
			// clazz = new CssClass('.ui-designer-widget');
			// clazz['background-color'] = bgColor;
			// tempClasses['.ui-designer-widget'] = clazz;
			// }
			// $('div[name=bgColorPicker][group=.ui-designer-widget] div').css(
			// 'background-color', bgColor);// 背景色
			// 商品标题
			color = itemTitle.css('color');
			if (isNew) {
				clazz = new CssClass('.title,.title a');
				clazz['color'] = color;
				tempClasses['.title,.title a'] = clazz;
			}
			$('div[name=tColorPicker][group=".title,.title a"] div').css(
					'background-color', color);// 颜色
			// 商品价格
			color = itemPrice.css('color');
			if (isNew) {
				clazz = new CssClass('.price');
				clazz['color'] = color;
				tempClasses['.price'] = clazz;
			}
			$('div[name=tColorPicker][group=".price"] div').css(
					'background-color', color);// 颜色
			// 类目颜色
			color = cats.css('color');
			if (isNew) {
				clazz = new CssClass('.widget-catslistview-cats .cat-title');
				clazz['color'] = color;
				tempClasses['.widget-catslistview-cats .cat-title'] = clazz;
			}
			$('div[name=tColorPicker][group=".widget-catslistview-cats .cat-title"] div')
					.css('background-color', color);// 颜色
			if (isNew) // 初始化最终样式
				for (var p in tempClasses) {
					cssClasses[p] = tempClasses[p].copy();// 拷贝
				}
		},
		/**
		 * 切换导航栏样式
		 */
		changeNavTheme : function(navTheme) {
			if (navTheme && navThemes[navTheme]) {
				for (var t in navThemes[navTheme]) {
					tempClasses[t] = navThemes[navTheme][t].copy();
				}
			}
			this.addTempStyles();
		},
		/**
		 * 系统主题切换
		 */
		changeSysTheme : function(sysTheme, navTheme) {
			$('.ui-designer-header-tabs ul').attr('theme', navTheme);
			var themes = sysThemes[sysTheme];
			var clazz;
			var str = "";
			// 整体
			for (var p in themes) {
				tempClasses[p] = themes[p].copy();// 拷贝
			}
			// 导航栏
			if (navTheme && navThemes[navTheme]) {
				for (var t in navThemes[navTheme]) {
					tempClasses[t] = navThemes[navTheme][t].copy();
				}
			}
			this.addTempStyles();// 启用临时皮肤
			this.restoreTheme(false);// 还原至主题设计器
		},
		/**
		 * 自定义主题切换
		 */
		changeTheme : function(type, editingColor, value) {
			var self = this;
			var group = editingColor.attr('group');
			var clazz = tempClasses[group];
			if (!clazz) {
				var clazz = new CssClass(group);
				tempClasses[group] = clazz;
			}
			switch (type) {
				case 'color' :// 颜色样式
					self.createColorClass(clazz, editingColor.attr('name'),
							value);// 创建颜色样式
					break;
				case 'bg' :// 背景图片
					self.createBgClass(clazz, editingColor, value);// 创建背景图片样式
					break;
			}
		},
		createBgClass : function(clazz, editingColor, value) {
			var path = '';
			switch (clazz.name) {
				case '.ui-designer-body' :
					path = 'bg';
					break;
				case '.ui-designer-widget-header' :
					path = 'wh';
					break;
			}
			var burl = "";
			if (value != "") {
				burl = 'url(/assets/min/images/' + path + '/' + value + ')';
			}
			clazz['background-image'] = burl;
			$('#main ' + clazz.name).css('background-image', burl);
			// var position = $('option:selected',
			// editingColor).attr('position');
			// if (position && position != "") {// background-position
			// clazz['background-position'] = position;
			// $(clazz.name).css('background-position', position);
			// }
		},
		createColorClass : function(clazz, name, value) {
			switch (name) {
				case 'bgColorPicker' :// 背景色
					clazz['background-color'] = value;
					$('#main ' + clazz.name).css('background-color', value);
					break;
				case 'bColorPicker' :// Header 边框颜色
					clazz['border'] = '1px solid ' + value;
					$('#main ' + clazz.name)
							.css('border', '1px solid ' + value);
					break;
				case 'tColorPicker' :// Header 文字颜色
					clazz['color'] = value;
					$('#main ' + clazz.name).css('color', value);
					break;
			}

		},
		/**
		 * 清除临时样式
		 */
		clearTempStyles : function() {
			$('.ui-designer-body').css({
						'background-image' : '',
						'background-color' : ''
					});
			$('.ui-designer-widget-header').css({
						'background-image' : '',
						'background-color' : '',
						'color' : ''
					});
			$('.ui-designer-widget').css({
						'background-color' : ''
					});
			$('.title,.title a').css({
						color : ''
					});
			$('.price').css({
						color : ''
					});
		},
		/**
		 * 重置
		 */
		resetTempStyles : function() {
			this.clearTempStyles();
			var theme = $('#siteStyle');
			theme.empty();
			var str = '';
			for (var p in cssClasses) {
				tempClasses[p] = cssClasses[p].copy();
				str += cssClasses[p].toSource();
			}
			this.clearTempStyles();
			if ($.browser.msie) {// IE
				document.styleSheets[1].cssText = str;
			} else {// Other
				theme.append(str);
			}
		},
		/**
		 * 启用临时样式(系统皮肤,导航栏皮肤)
		 */
		addTempStyles : function() {
			var theme = $('#siteStyle');
			theme.empty();
			var str = '';
			for (var p in tempClasses) {
				str += tempClasses[p].toSource();
			}
			this.clearTempStyles();
			if ($.browser.msie) {// IE
				document.styleSheets[1].cssText = str;
			} else {// Other
				theme.append(str);
			}
		},
		/**
		 * 确认使用当前样式
		 */
		addStyles : function() {
			// this.clearTempStyles();
			var theme = $('#siteStyle');
			theme.empty();
			var str = '';
			for (var p in tempClasses) {
				cssClasses[p] = tempClasses[p].copy();// 拷贝
				str += tempClasses[p].toSource();
			}
			if ($.browser.msie) {// IE
				document.styleSheets[1].cssText = str;
			} else {// Other
				this.clearTempStyles();
				theme.append(str);
			}
		}
	});
})(jQuery);
