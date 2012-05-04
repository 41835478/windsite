/**
 * 搜索框组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.searchBox", $.ui.designerWidget, {
		options : {
			line : 1,// 关键词行数
			cat : '0'
			// 默认分类类目
		},
		/**
		 * 返回当前组件源码
		 */
		_toSource : function() {
			var _source = '<div class="widget-searchbox"><div class="preview_content" align="center"><ul class="p_t"><li class="t_search"><form method="get" action="/search" target="_blank"><label for="q"><input type="text" class="searchBox" name="q"><input type="hidden" name="cid" value=""><input type="button" value="" class="searchBtn" onclick="$(this).parents(\'form:first\').submit();"></label></form></li></ul></div></div>';
			return _source;
		},
		widgetOver : function() {
			if (!isWidgetHandle) {
				return;
			}
			var bar = $('#ui-designer-widget-handle');
			this.element.prepend(bar);
			bar.width(this.element.width());
			$('#ui-designer-widget-handle').fadeIn();
			$('#widgetSet').show();
		},
		_widgetOut : function() {

		},
		_initDesignerWidget : function() {
			var self = this;
			var widget = this.element;
			var component = widget.find('.widget-searchbox').show();
			$('.ui-designer-widget-header', widget).remove();
			if ($('.preview_content', component).length == 1) {
				WidgetUtils.searchBox_init(component);
			}
		},

		widgetSet : function() {
			var self = this;
			var widget = this.element;
			var component = widget.find('.widget-searchbox');
			if ($('.preview_content', component).length == 0) {
				alert('当前搜索框版本过低，请移除后，重新添加新版本搜索框');
				return;
			}
			editingSearchBoxEditor = widget;
			$('#widget-searchBox-dialog').dialog('open');

		},
		createSearchBox : function() {
			// var o = this.options;
			return '<div id="container2" class="sk_ul" style="margin-top:15px;">'
					+ '<ul id="containerUl2">'
					+ '<li><a href="http://s.click.taobao.com/t_9?p='
					+ PID
					+ '&amp;u=12034285&amp;l=http%3A%2F%2Fmall.taobao.com%2F" target="_blank"><img border="0" src="http://img.alimama.cn/cms/images/1269407736835.png"></a></li>'
					+ '<li id="txt_mall2">'
					+ '<form name="tbk_b2c_search_form" action="/keywords" target="_blank"><input id="searchtext2" name="words" type="text" class="keyword" value=""></form>'
					+ '</li>'
					+ '<li id="search_btn"><button onclick="document.tbk_b2c_search_form.submit()"></button></li>'
					+ '</ul>' + '</div>';
			// var str = "<script type='text/javascript'>"
			// + "alimama_pid=PID;"
			// + "alimama_type='"
			// + o.type
			// + "';"
			// + "alimama_tks="
			// + o.tks
			// + ";"
			// + "alimama_tks.style_i="
			// + o.style_i
			// + ";"
			// + "alimama_tks.lg_i="
			// + o.lg_i
			// + ";"
			// + "alimama_tks.w_i="
			// + o.w_i
			// + ";"
			// + "alimama_tks.h_i="
			// + (o.hot_i == 1 ? 69 : 45)
			// + ";"
			// + "alimama_tks.btn_i="
			// + o.btn_i
			// + ";"
			// + "alimama_tks.txt_s='"
			// + o.txt_s
			// + "';"
			// + "alimama_tks.hot_i="
			// + o.hot_i
			// + ";"
			// + "alimama_tks.hc_c='"
			// + o.hc_c
			// + "';"
			// + "alimama_tks.c_i="
			// + o.c_i
			// + ";"
			// + "alimama_tks.cid_i="
			// + o.cid_i
			// + ";"
			// + "</script>"
			// + "<script title='alimamaSearchBox' type='text/javascript'
			// ${alimamaSearchBox!''}></script>";
			// return str;
		}

	});
})(jQuery);
