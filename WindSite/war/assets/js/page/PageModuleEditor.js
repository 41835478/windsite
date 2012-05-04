(function($) {
	$.widget("ui.pageModuleEditor", {
		/**
		 * 参数
		 */
		options : {
			layout : '0',
			content : '',
			module : '',
			isNew : true
		},
		_create : function() {
		},
		/**
		 * Page-Module-editor初始化
		 */
		_init : function() {
			var self = this;
			var editor = self.element;// 模块编辑器
			if (typeof(MODE) != 'undefined' && 'detail' == MODE) {// 详情页，添加两个特有模块
				MODULES.splice(0, 0, MODULE_SHOP);
				MODULES.splice(1, 0, MODULE_ITEMHOT);
			}
			if (typeof(MODE) != 'undefined' && 'search' == MODE) {// 搜索页，添加一个特有模块
				MODULES.splice(0, 0, MODULE_SEARCHHOT);
			}
			/**
			 * 初始化模块限制(内容区)
			 */
			if (VERSIONNO >= 1.5) {
				for (var i = 0; i < MODULES.length; i++) {
					if ('bd' == MODULES[i]['content']) {
						switch (MODULES[i]['name']) {
							case 'shopDisplay' :// 常规显示组件增加至8个
								MODULES[i]['limit'] = 8;
								break;
							case 'shopFlashShow' :
								if (VERSIONNO >= 1.6)
									MODULES[i]['limit'] = 6;// flash广告牌增加至6个
								else
									MODULES[i]['limit'] = 1;
								break;
							case 'shopCustom' :
								if (VERSIONNO >= 1.6)
									MODULES[i]['limit'] = 10;// 自定义增加至6个
								else
									MODULES[i]['limit'] = 1;// 自定义增加至6个
								break;
							case 'shopCategory' :
								MODULES[i]['limit'] = 4;// 分类模块增加至4个
								break;
							case 'shopLinks' :
								MODULES[i]['limit'] = 2;// 友情链接模块增加至2个
								break;
							case 'shopKeyword' :
								MODULES[i]['limit'] = 4;// 关键词模块增加至4个
								break;
							case 'shopItemList' :
								MODULES[i]['limit'] = 15;// 商品排名列表模块增加至6个
								break;
							case 'shopBlog' :
								MODULES[i]['limit'] = 15;// 文章列表模块增加至6个
								break;
							case 'shopRank' :
								MODULES[i]['limit'] = 4;// 侧边栏列表模块增加至4个
								break;
							case 'shopBrand' :
								MODULES[i]['limit'] = 4;// 品牌库模块增加至4个
								break;
							case 'shopComplexA' :
								MODULES[i]['limit'] = 8;// 综合类模块增加至8个
								break;
						}
					}
				}
			}
			// 弹出框初始化
			editor.dialog({
				bgiframe : true,
				autoOpen : false,
				width : 800,
				zIndex : 1000,
				modal : true,
				open : function() {
					if (MODULE != null) {
						var isHdContent = MODULE.parents('#hd');
						if (isHdContent.length == 0) {
							self.options.content = 'bd';
						} else {
							self.options.content = 'hd';
						}
						if (MODULE.hasClass('J_TRegion')) {// 添加
							self.options.isNew = true;
							self.options.layout = MODULE.pageRegion('option',
									'layout');
							self.options.module = '';
							// 重新加载模块列表（目前仅在添加时重新过滤模块列表，稍后如果支持编辑时替换组件，则放置最后）
							self._showFilterModule($('.dialog-nav li.selected',
											editor).attr('t'),
									$('#module-ad-type a.selected').attr('t'));
							self.goModuleSelect();
						} else if (MODULE.hasClass('J_TBox')) {// 编辑
							self.options.isNew = false;
							self.options.layout = MODULE.parent().pageRegion(
									'option', 'layout');
							self.options.module = MODULE.attr('name');
							var isHd = MODULE['page'
									+ PageModuleUtils
											.getModuleName(self.options.module)](
									'option', 'isHd');
							// 主要是处理同一个模块因为支持不同数据源造成加载不同配置文件
							var adType = MODULE['page'
									+ PageModuleUtils
											.getModuleName(self.options.module)](
									'option', 'adType');
							if (typeof(adType) == 'string') {
								MODULE_ADTYPE = adType;
							} else {
								MODULE_ADTYPE = 'item';// 默认使用商品
							}
							self.goModuleTitle(('true' == isHd ? true : false),
									MODULE.find('.hd span').text());
						}

					} else {
						alert('未指定模块');
					}
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
			$('#module-ad-type a,#union-ad-type a').click(function() {
				if (!$(this).hasClass('selected')) {
					$(this).addClass('selected').siblings()
							.removeClass('selected');
					self._showFilterModule($('.dialog-nav li.selected', editor)
									.attr('t'), $(this).attr('t'));
				}
				return false;
			});
			$('.dialog-nav li', editor).click(function() {
				if (!$(this).hasClass('selected')) {
					$(this).addClass('selected').siblings()
							.removeClass('selected');
					$('#module-editor-content .fllbJsDl span').hide();
					if ('0' == $(this).attr('t')) {// 基础模块
						$('#module-ad-type').show();
					} else if ('1' == $(this).attr('t')) {// 广告联盟模块
						$('#union-ad-type').show();
					}
					self._showFilterModule($(this).attr('t'),
							$('#module-ad-type a.selected').attr('t'));
				}
				return;
			});
			$('.secondStep .btn-ok', editor).hover(function() {
						$(this).addClass('btn-ok-hover');
					}, function() {
						$(this).removeClass('btn-ok-hover');
					}).click(function() {
				if (!$('#module-title').val()) {
					alert('模块标题不能为空');
					$('#module-title').focus();
					return;
				}
				var temp = $('#module-title').val().replace(/[^\x00-\xff]/g,
						"**");
				if (temp.length > 30) {
					alert('最多允许30个字符,15个汉字');
					$('#module-title').focus();
					return;
				}
				self.goModuleConfig();
			});
			$('.thirdStep .btn-ok', editor).hover(function() {
						$(this).addClass('btn-ok-hover');
					}, function() {
						$(this).removeClass('btn-ok-hover');
					}).click(function() {
						if ($(this).hasClass('btn-ok-disabled')) {
							return;
						}
						if (self.executeModuleFunc('validate', 'ModuleConfig')) {// 校验模块配置信息
							$(this).addClass('btn-ok-disabled');
							PageUtils.showMsg('正在获取模块信息...');
							if (MODULE.hasClass('J_TRegion')) {// 添加
								self._addModule();
							} else if (MODULE.hasClass('J_TBox')) {// 编辑
								self._updateModule();
							}
						}

					});
		},
		isValidEditor : function() {
			var tips = '';
			if ($('#hd').length == 1 && $.contains($('#hd')[0], MODULE[0])) {// 页头添加校验
				if (VERSIONNO > 1) {// 版本号校验
					if ($('#hd .J_TBox').length >= LIMIT_HEARDS) {// 校验页头模块数量
						tips = '为确保页面打开速度，页头区域最多只能添加<b>' + LIMIT_HEARDS
								+ '</b>个模块';
					}
				} else {// 普及版提示
					tips = '请升级版本【<a href="http://forum.xintaonet.com/viewthread.php?tid=707&extra=page%3D1" style="color:red;font-weight:bold;" target="_blank">升级帮助</a>】';
					PageUtils.loadVersionInfo(VERSIONNO, '更多模块');
				}
			} else if ($('#bd').length == 1
					&& $.contains($('#bd')[0], MODULE[0])) {// 内容区添加校验
				if ($('#bd .J_TBox').length >= LIMIT_MODULES) {// 校验页头模块数量
					if (VERSIONNO > 1) {
						tips = '为确保页面打开速度，内容区域最多只能添加<b>' + LIMIT_MODULES
								+ '</b>个模块';
					} else {
						tips = '请升级版本【<a href="http://forum.xintaonet.com/viewthread.php?tid=707&extra=page%3D1" style="color:red;font-weight:bold;" target="_blank">升级帮助</a>】';
						PageUtils.loadVersionInfo(VERSIONNO, '更多模块');
					}
				}
			}
			if (tips == '') {
				$('#module-verion-tips').empty().hide();
				$('#module-editor-content').show();
			} else {
				$('#module-verion-tips').empty().append(tips).show();
				$('#module-editor-content').hide();
			}
		},
		/**
		 * 更新模块
		 */
		_updateModule : function() {
			var self = this;
			var title = $('#module-title').val();
			var isHeader = (MODULE.parents('#hd').length == 1) ? true : false;// 是否是顶部编辑
			var callback = function(data) {
				var id = data.id;
				if (data.content) {
					var widget = $($('<div><div>').html(data.content).text());
					var _module = 'page'
							+ PageModuleUtils
									.getModuleName(widget.attr('name'));
					MODULE[_module]('destory').replaceWith(widget);// 替换当前组件内容
					widget[_module]();
				}
				PageUtils.showMsg('模块编辑完成...');
				$('#page-module-editor .thirdStep .btn-ok')
						.removeClass('btn-ok-disabled');
				$('#page-module-editor').dialog('close');// 关闭模块编辑窗口
				if (isHeader)
					$('#J_ConfirmRelease').attr('isHeader', 'true');
			};
			eval('(update' + PageModuleUtils.getModuleName(MODULE.attr('name'))
					+ 'ModuleContent("' + MODULE.attr('data-id') + '","'
					+ title + '",' + callback + '))');// 执行更新方法
		},
		/**
		 * 添加模块
		 */
		_addModule : function() {
			var self = this;
			var name = self.options.module;
			var title = $('#module-title').val();
			var region = MODULE.attr('data-id');
			var next = self._getLastModule();
			var isHeader = (MODULE.parents('#hd').length == 1) ? true : false;// 是否是顶部编辑
			var callback = function(data) {
				var id = data.id;
				if (data.content) {
					var widget = $($('<div><div>').html(data.content).text());
					var _module = 'page'
							+ PageModuleUtils
									.getModuleName(widget.attr('name'));
					MODULE.find('.addmodbar').before(widget);// 添加至容器最后
					widget[_module]();
				} else {
					var b = $('<b name="'
							+ name
							+ '" class="J_TBox" data-id="'
							+ id
							+ '"><span>'
							+ title
							+ '</span><a class="ui-icon ui-icon-circle-arrow-n" title="上移">上移</a><a class="ui-icon ui-icon-circle-arrow-s" title="下移">下移</a><a class="ui-icon ui-icon-circle-close" title="删除" href="javascript:;">X</a></b>');
					MODULE.find('i').before(b);
					b.pageLayoutModule();
				}
				PageUtils.showMsg('模块添加完成...');
				$('#page-module-editor .thirdStep .btn-ok')
						.removeClass('btn-ok-disabled');
				$('#page-module-editor').dialog('close');// 关闭模块编辑窗口
				if (isHeader)
					$('#J_ConfirmRelease').attr('isHeader', 'true');

			};
			eval('(create' + PageModuleUtils.getModuleName(name)
					+ 'ModuleContent("' + name + '","' + title + '","' + region
					+ '","' + next + '",' + callback + '))');// 执行新增方法
		},
		_getLastModule : function() {
			var next = '';
			var last = MODULE.find('.J_TBox:last');
			if (last.length == 1)
				next = last.attr('data-id');
			return next;
		},
		/**
		 * 转到模块选择
		 */
		goModuleSelect : function() {
			var self = this;
			var steps = $(".module-steps", self.element).scrollable();
			self.isValidEditor();
			steps.seekTo(0);// 转到模块选择
		},
		/**
		 * 进入模块标题编辑
		 */
		goModuleTitle : function(isHd, title) {
			var self = this;
			if (self.initModuleTitle()) {
				if (isHd) {
					$('#module-ishd').attr('checked', true).parent()
							.find('a.jqTransformCheckbox')
							.addClass('jqTransformChecked');// 处理jqTransform

				} else {
					$('#module-ishd').attr('checked', false).parent()
							.find('a.jqTransformCheckbox')
							.removeClass('jqTransformChecked');// 处理jqTransform
				}
				if (title && '' != title) {
					$('#module-title').val(title);
				} else {
					$('#module-title').val('');
				}
				if (!self.options.isNew) {// 编辑模块暂时不允许回到组件选择
					$('.secondStep .prev', self.element).hide();
				} else {// 新增模块，显示上一步
					$('.secondStep .prev', self.element).show();
				}
				var steps = $(".module-steps", self.element).scrollable();
				steps.seekTo(1);// 转到编辑模块标题及样式
			}
		},
		/**
		 * 进入模块内容编辑
		 */
		goModuleConfig : function() {
			var self = this;
			$('#page-module-editor .thirdStep .btn-ok')
					.addClass('btn-ok-disabled');
			var steps = $(".module-steps", self.element).scrollable();
			steps.seekTo(2);// 转到配置页面
			$('#module-content')
					.empty()
					.append('<div align="center" class="page-loading">正在载入<span class="flash_p">0%</span>...</div>');
			if (!self.initModuleConfig()) {
				steps.seekTo(1);// 转到编辑模块标题及样式
			}

		},
		_showFilterModule : function(type, adType) {
			var self = this;
			if ('0' == type) {
				adType = $('#module-ad-type a.selected').attr('t');
			} else if ('1' == type) {
				adType = $('#union-ad-type a.selected').attr('t');
			}
			var modules = self.filterModule(type, adType);
			$('#modules').empty();
			if (modules.length == 0) {
				$('#modules')
						.append('<div style="text-align:center;">没有符合条件的模块</div>');
				return;
			}
			var ul;
			for (var i = 0; i < modules.length; i++) {
				if (i % 5 == 0) {
					ul = $('<ul></ul>');
					$('#modules').append(ul);
				}
				var module = modules[i];
				var titleDesc = module.title;
				if (module.name == 'shopDetailShop'
						|| module.name == 'shopDetailHot'
						|| module.name == 'shopSearchHot') {
					titleDesc = '【<em style="color:red;">推荐</em>】'
							+ module.title;
				}
				if (module.isNew) {
					titleDesc = '【<em style="color:red;">新</em>】' + titleDesc;
				}
				var isFC = 'true';
				if (typeof(module.isFC) != 'undefined') {
					isFC = 'false';
				}
				var li = $('<li class="ks-clear"><img src="'
						+ module.icon
						+ '"><p><strong>'
						+ titleDesc
						+ '【<em style="color:red;">可添加'
						+ module.limit
						+ '个</em>】</strong>'
						+ module.desc
						+ '</p><button type="button" class="add-module-button" module="'
						+ module.name + '" limit="' + module.limit + '" alt="'
						+ module.title + '" layout="' + module.layout
						+ '" isHd="' + module.isHd + '" adType="'
						+ module.adType + '" v="' + module.v + '" isFC="'
						+ isFC + '">添加</button></li>');
				ul.append(li);
				$('.add-module-button', li).click(function() {
							self.addModuleFilter($(this));
						});
			}
			$('#modules').pager('ul', {
						navId : 'modules_nav',
						navClass : 'nav_pager',
						height : 320
					});
		},
		addModuleFilter : function(button) {
			if (MODULE.hasClass('J_TBox')) {// 如果是编辑模式，屏蔽掉添加操作
				return;
			}
			var self = this;
			if (button.hasClass('add-module-disable')) {
				alert('当前模块无法放入此布局');
				return;
			}
			if (typeof(MODE) != 'undefined'
					&& ('detail' == MODE || 'search' == MODE)) {// 详情页，搜索列表页校验
				if ($('#bd .col-sub .J_TBox').length >= 5) {
					alert('为了确保页面打开速度，最多只能添加5个模块');
					return;
				}
			}
			var content = (MODULE.parents('#hd').length == 1) ? '#hd' : '#bd';
			var boxes = $('#bd .J_TBox');
			var channel = $('#bd .J_TBox[name="shopChannel"]');
			var count = boxes.length;
			if (channel.length == 1) {
				count = count + 5;
			}
			if ('shopChannel' == button.attr('module')) {
				count = count + 5;
			}
			if (count >= LIMIT_MODULES) {
				if (channel.length == 1
						|| 'shopChannel' == button.attr('module')) {
					alert('为了确保页面打开速度，最多只能添加' + LIMIT_MODULES
							+ '个模块,其中频道推广模块相当于6个其他模块');
				} else {
					alert('为了确保页面打开速度，最多只能添加' + LIMIT_MODULES + '个模块');
				}
				return;
			}
			var limit = button.attr('limit');
			var module = button.attr('module');
			var layout = button.attr('layout');
			var title = button.attr('alt');
			var isHd = button.attr('isHd');
			var adType = button.attr('adType');
			var v = button.attr('v');
			var isFC = button.attr('isFC');
			if (!VERSIONNO) {
				VERSIONNO = 1;
			}
			if (VERSIONNO < parseFloat(v)) {
				PageUtils.loadVersionInfo(VERSIONNO, '高级模块', parseFloat(v));
				return false;
			}
			if ((1.5 == VERSIONNO || 1.55 == VERSIONNO) && isFC
					&& 'false' == isFC) {// 如果是分成版，判断当前模块是否支持分成
				PageUtils.loadVersionInfo(VERSIONNO, '高级模块', 1.6);
				return false;
			}
			if (limit != '0') {
				if ($(content + ' .J_TBox[name="' + module + '"]').length >= limit) {// 如果已添加模块数量大于或等于限额
					alert('为了确保页面打开速度，最多只能添加' + limit + '个' + title + '模块');
					return;
				}
			}
			self.options.module = module;
			MODULE_ADTYPE = adType;
			self.goModuleTitle(('true' == isHd ? true : false), title);
		},
		/**
		 * 过滤出符合条件的模块数组【推广类型，布局，内容区】
		 */
		filterModule : function(type, adType) {
			var modules = [];
			var content = this.options.content;
			var layout = this.options.layout;
			for (var i = 0; i < MODULES.length; i++) {
				var module = MODULES[i];
				if (adType && '' != adType) {// 如果指定了推广类型
					if (module.type == type
							&& module.adType.indexOf(adType) != -1
							&& module.content.indexOf(content) != -1
							&& module.layout.indexOf(layout) != -1) {
						modules.push(module);
					}
				} else {// 显示类型全部
					if (module.type == type
							&& module.content.indexOf(content) != -1
							&& module.layout.indexOf(layout) != -1) {
						modules.push(module);
					}
				}
			}
			return modules;
		},
		/**
		 * 初始化模块标题
		 */
		initModuleTitle : function() {
			// 初始化表单样式
			$('#page-module-editor .secondStep form').jqTransform({
						imgPath : '/assets/js/jquery/jqtransform/img'
					});
			return true;
		},
		/**
		 * 初始化模块内容属性
		 */
		initModuleConfig : function() {
			$('#module-content')
					.empty('<div align="center" class="page-loading">正在载入...</div>');
			return this.executeModuleFunc('init', 'ModuleConfig', function() {// 回调初始化表单样式
						$('#page-module-editor .thirdStep form').jqTransform({
									imgPath : '/assets/js/jquery/jqtransform/img'
								});
						$('#page-module-editor .thirdStep .btn-ok')
								.removeClass('btn-ok-disabled');
					});
		},
		/**
		 * 执行模块函数
		 */
		executeModuleFunc : function(prefix, suffix, callback) {
			var self = this;
			var module = self.options.module;
			if (module && '' != module) {
				module = prefix + PageModuleUtils.getModuleName(module)
						+ suffix;
				try {
					return eval('(' + module + '(' + (callback ? callback : '')
							+ '))');
				} catch (e) {
					return true;
				}
			} else {
				alert('未指定模块');
				return false;
			}
		},

		toSource : function(isValidate, isTemp) {
			var self = this;
		}
	});

})(jQuery);
