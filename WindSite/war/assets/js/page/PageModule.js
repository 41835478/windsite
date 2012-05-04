(function($) {
	$.widget("ui.pageModule", {
		/**
		 * 参数
		 */
		options : {
			isHd : 'true'
			// 是否显示标题
		},
		/**
		 * 返回当前模块源码
		 */
		toSource : function(isValidate) {

		},
		moduleEdit : function() {
			$('#page-module-editor').dialog('open');// 打开模块编辑器
		},
		/**
		 * 模块刷新
		 */
		refresh : function(type) {
			this._refresh(type);
		},
		/**
		 * 还原模块信息
		 */
		restoreModule : function() {
			var metadata = this.element.attr('metadata');
			if (metadata && '' != metadata) {
				try {
					metadata = eval('(' + metadata + ')');
					if (metadata && metadata != null) {
						for (var p in metadata) {
							this._setOption(p, metadata[p]);
						}
					}
				} catch (e) {
					alert(e);
				}
			}
		},
		/**
		 * 移入模块事件(生成模块工具栏)
		 */
		moduleOver : function() {
			// 保存旧边框，以及设置新的边框
			BORDER_STYLE = this.element.css("border-style");
			BORDER_COLOR = this.element.css("border_color");
			BORDER_WIDTH = this.element.css("border_width");
			this.element.css({
						"border-style" : "dashed",
						"border-color" : "red",
						"border-width" : "2px"
					});
			var bar = $('#module-bar');
			this.element.prepend(bar);
			bar.width(this.element.width());
			bar.find('a').show();
			if (this.element.hasClass('tb-minimize')) {
				$('#module-bar-edit,#module-bar-del').hide();
			}
			if (this.element.find('.bd').length == 0) {
				$('#module-bar-edit').hide();
			}
			if (this.element.prevAll('.J_TBox:first').length == 0) {// 如果前边没模块
				$('#module-bar-up').removeClass('no-move-up')
						.addClass('no-move-up');
			} else {
				$('#module-bar-up').removeClass('no-move-up');
			}
			if (this.element.nextAll('.J_TBox:first').length == 0) {// 如果后边没模块
				$('#module-bar-down').removeClass('no-move-down')
						.addClass('no-move-down');
			} else {
				$('#module-bar-down').removeClass('no-move-down');
			}
			bar.show();
			this._moduleOver();
		},

		/**
		 * 移出模块事件
		 */
		moduleOut : function() {
			this.element.removeAttr('style');
			$('body').append($('#module-bar').hide());
			this._moduleOut();
		},

		/**
		 * 存储推广组ID
		 */
		storeGroups : function(gid) {

		},
		/**
		 * 初始化模块标题
		 */
		initModuleTitle : function() {
			// 初始化表单样式
			$('#page-module-editor .secondStep form').jqTransform({
						imgPath : '/assets/js/jquery/jqtransform/img'
					});
		},
		/**
		 * 初始化模块内容属性
		 */
		initModuleProperty : function() {

		},
		/**
		 * 子类实现模块修改参数回调函数
		 */
		_updateModule : function(params) {

		},
		/**
		 * 子类实现模块排序参数回调函数
		 */
		_sortModule : function() {

		},
		/**
		 * 子类实现模块删除参数回调函数
		 */
		_deleteModule : function() {

		},
		/**
		 * 自动保存
		 */
		autoSave : function(type, callback, next) {
			var self = this;
			var params = {};
			var url = '';
			var id = this.element.attr('data-id');
			var msg = '正在处理,请稍候...';
			if (id) {
				if (type) {
					if (this.element)
						switch (type) {// 新增模块方法因为牵扯到当前组件尚未初始化，所以将此新增方法放入PageUtils中实现
							case 'sort' :// 排序
								params['page'] = PAGEID;
								params['meta'] = PageUtils.getPageMeta();
								url = '/router/member/page/meta/update?v='
										+ Math.random();
								this._sortModule(params);
								// 3秒延迟执行
								$.doTimeout(500, function() {
									PageUtils.showMsg(msg);
									var sender = new WindSender(url);
									sender.load("POST", params, function(
											response) {
										if (response.isSuccess()) {
											if (callback
													&& typeof(callback) == 'function') {
												callback();
											}
										} else {
											alert(response.msg);
										}
									});
								});
								break;
							case 'delete' :// 删除
								self.element.remove();// 删除元素
								params['id'] = id;
								params['page'] = PAGEID;
								params['meta'] = PageUtils.getPageMeta();
								url = '/router/member/page/module/delete/' + id
										+ '?v=' + Math.random();
								this._deleteModule(params);
								PageUtils.showMsg(msg);
								var sender = new WindSender(url);
								sender.load("POST", params, function(response) {
									if (response.isSuccess()) {
										if (callback
												&& typeof(callback) == 'function') {
											callback();
										}
									} else {
										alert(response.msg);
									}
								});
								break;
						}
				}
			} else {
				alert('当前模块标识不存在');
				return;
			}
		},
		/**
		 * 创建模块
		 */
		_create : function() {
			this._createModule();// 子类
		},

		/**
		 * 模块初始化
		 */
		_init : function() {
			var self = this;
			var o = this.options;
			module = self.element;// 模块
			var region = module.parents('.J_TRegion:first');
			if (module.hasClass('box')) {// 如果是设计器中，布局管理中没有此标识
				self.restoreModule();// 还原模块信息
				// 注册移入移出事件
				var isEdit = region.attr('data-edit');
				if ('false' == isEdit) {
					// TODO
				} else {
					module.hover(function(event) {// over
								self.moduleOver();
							}, function(event) {// out
								self.moduleOut();
							});
				}
				self._initModule();// 子类
			}
		},

		/**
		 * 子类初始化
		 */
		_initModule : function() {
		},
		/**
		 * 子类创建
		 */
		_createModule : function() {
		},
		/**
		 * 源码
		 */
		_toSource : function() {

		},
		/**
		 * 子类刷新
		 */
		_refresh : function(type) {

		},
		/**
		 * 子类移入事件
		 */
		_moduleOver : function() {
		},
		/**
		 * 子类移出事件
		 */
		_moduleOut : function() {
		}

	});
})(jQuery);
