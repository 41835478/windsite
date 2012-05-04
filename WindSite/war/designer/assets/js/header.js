(function($) {
	$.widget("ui.designerHeader", {
		/**
		 * 参数
		 */
		options : {},
		/**
		 * 返回最终源码
		 */
		toSource : function() {
			var nav = $('.ui-designer-header-tabs', this.element);
			var _source = "<div id='ui-designer-header' class='ui-designer-header ui-widget ui-widget-content' style='width:"
					+ this.element.width()
					+ "px;height:"
					+ this.element.height() + "px;";
			var flash = this.element.find('.header-flash');
			var image = this.element.find('.header-image');
			if (flash.length == 0 && flash.attr('src') == '') {
				_source += "background-image:"
						+ getImagePath(this.element.css('background-image'))
						+ ";background-repeat:no-repeat;";
			}
			_source += "'>";
			if (flash.length > 0) {
				var src = flash.attr('src');
				_source += '<div class="header-flash"';
				if (!src) {
					src = '';
				}
				_source += ' src="' + src + '" style="' + flash.attr('style')
						+ '"></div>'
			} else if (image.length > 0) {
				_source += $('<div></div>').append(image.clone()).html();
			}
			var clone = $('ul', nav).clone();
			this._convertHref(clone);
			_source += "<div class='ui-designer-header-tabs' style='left:"
					+ nav.css('left')
					+ ";top:"
					+ nav.css('top')
					+ ";'><div class='ui-designer-header-tabs-handle'></div><ul theme='"
					+ (clone.attr('theme') != null ? clone.attr('theme') : '')
					+ "'>" + clone.html() + "</ul></div></div>";
			return _source;
		},
		_convertHref : function(widget) {
			$("li a", widget).each(function() {
				var href = $(this).attr('href').replace(
						'http://' + document.domain, '').replace(PID,
						'%7Bpid%7D').replace(PID, '%7Bpid%7D');
				$(this).attr('href', href);
			});
		},
		/**
		 * 移入事件
		 */
		_headerOver : function() {
			if (ISINDEX) {
				this.element.append($('#ui-designer-header-tools'));
				this.element.css('z-Index', 10000999);
				$('.ui-designer-header-tabs-handle').attr('title','拖拽移动导航栏位置').show();
				$('#ui-designer-header-tools').show();
			}
		},
		/**
		 * 移出事件
		 */
		_headerOut : function() {
			if (ISINDEX) {
				$('#ui-designer-header-tools').hide();
				$('.ui-designer-header-tabs-handle').hide();
				this.element.css('z-Index', 0);
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
			var o = self.options;
			var header = self.element;// 组件
			if (ISINDEX) {
				var tools = $('#ui-designer-header-tools');
				var toolsDialog = $('#ui-designer-header-tools-dialog').dialog(
						{
							bgiframe : true,
							autoOpen : false,
							width : 940,
							zIndex : 100000,
							resizable : false,
							modal : true
						});
				var tabs = $('#headerTabs').tabs({
							cache : true
						});
				var nav = $('.ui-designer-header-tabs', header);
				nav.append($('.ui-designer-header-tabs-handle').show());
				var headerSet = $('#headerSet');
				header.prepend(tools);// 加入Header工具栏
				// header拉伸

				/**
				 * 暂时屏蔽掉Header的拉伸
				 */
				// header.resizable({
				// handles : 's'
				// });
				header.click(function(event) {
							event.stopPropagation();
						});
				nav.draggable({
							handle : '.ui-designer-header-tabs-handle',
							containment : '.ui-designer-header',
							cursor : 'move'
						});
				// 注册移入移出事件
				header.hover(function(event) {// over
							self._headerOver();
						}, function(event) {// out
							self._headerOut();
						});
				headerSet.button().unbind('click').click(function() {
							self._headerOut();
							toolsDialog.dialog('open');
						});
			} else {
				header
						.append('<div style="position:absolute;right:0px;top:0px;color:#FF0084;font-weight:bold;font-size:14pt;">子页面不可编辑此区域</div>')
			}
			header.css("border", "1px solid #DDD");
			var flash = this.element.find('.header-flash');
			var image = this.element.find('.header-image');
			if (flash.length > 0) {// 标题Flash
				if (flash.attr('src') != '') {
					WidgetUtils.addHeaderFlash(flash);// 自定义广告牌
				} else {
					WidgetUtils.addHeaderSmartAdsFlash(flash);// 智能广告牌
				}
			} else if (image.length > 0) {
				WidgetUtils.addHeaderImage(image);
			}
			WidgetUtils.designerHeaderTabs_init($(".ui-designer-header-tabs"));
		}
	});
})(jQuery);