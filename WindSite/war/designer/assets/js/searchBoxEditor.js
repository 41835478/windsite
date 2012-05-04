/**
 * 搜索框编辑器
 */
(function($) {
	$.widget("ui.searchBoxEditor", {
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
			var searchBox = self.element;// 组件
			searchBox.dialog({
						bgiframe : true,
						autoOpen : false,
						resizable : false,
						width : 550,
						zIndex : 100000,
						modal : true,
						open:function(){
							
						},
						buttons : {
							'确定' : function() {
								searchBox.dialog('close');
							}
							
						}
					});
		},
		/**
		 * 存储
		 */
		storeEditor : function(widget) {
//			var o = widget.searchBox('option');
//			var logo = $('.searchBoxLogo', widget);// 预览LOGO
//			var speSelector = $('.searchBoxSpeSelector', widget);// 预览类目选择区域
//			var keyul = $('.searchBoxKeyul', widget);// 预览热词区域
//			var searchtext = $('.searchBoxSearchText', widget);// 预览搜索文本
//			var sbtn = $('.searchBoxSbtn', widget);// 预览搜索按钮
//			var container = $('.searchBoxContainerUl', widget);// 预览容器
//			var hc_c = $('.keyLabel1 a', widget);// 热词
//			// 容器
//			widget.searchBox('option', 'lg_i', logo.is(':hidden') ? 0 : 1);// LOGO
//			widget.searchBox('option', 'w_i', container.width());// 宽度
//			widget.searchBox('option', 'h_i', keyul.is(':hidden') ? 45 : 69);// 高度
//			widget.searchBox('option', 'txt_s', searchtext.val());// 搜索文本
//			widget.searchBox('option', 'hot_i', keyul.is(':hidden') ? 0 : 1);// 热词
//			widget
//					.searchBox('option', 'c_i', speSelector.is(':hidden')
//									? 0
//									: 1);// 类目选择
//			widget.searchBox('option', 'cid_i', $('select', speSelector).val());// 当前类目
//			widget.searchBox('option', 'hc_c', $.fmtColor(hc_c.css('color'),
//							'hexadecimal'));// 热词

		},
		/**
		 * 还原
		 */
		restoreEditor : function(o) {
//			if (o) {
//				if (o.lg_i == 1 || o.lg_i == '1') {// 是否显示淘宝LOGO
//					$('#lg_i').attr('checked', true);
//				} else {
//					$('#lg_i').attr('checked', false);
//				}
//				if (o.c_i == 1 || o.c_i == '1') {// 是否显示分类搜索
//					$('#c_i').attr('checked', true);
//				} else {
//					$('#c_i').attr('checked', false);
//				}
//				if (o.hot_i == 1 || o.hot_i == '1') {// 是否显示热词
//					$('#hot_i').attr('checked', true);
//				} else {
//					$('#hot_i').attr('checked', false);
//				}
//				$('#txt_s').val(o.txt_s);
//				$('#w_i').val(o.w_i);
//				$('#cid_i').val(o.cid_i);
//				$('#hc_c div').css('background-color', o.hc_c);
//			}
		},
		dealStyles : function() {
//			var lg_i = $('#lg_i');// 是否显示淘宝LOGO
//			var c_i = $('#c_i');// 是否显示分类搜索
//			var hot_i = $('#hot_i');// 是否显示热词
//			var txt_s = $('#txt_s');// 搜索提示文本
//			var w_i = $('#w_i');// 整体长度
//			var cid_i = $('#cid_i');// 类目选择
//			var hc_c = $('#hc_c div');// 热词颜色
//			this.changeStyles({
//						lg_i : lg_i.is(':checked') ? 1 : 0,
//						c_i : c_i.is(':checked') ? 1 : 0,
//						hot_i : hot_i.is(':checked') ? 1 : 0,
//						txt_s : txt_s.val(),
//						w_i : w_i.val(),
//						cid_i : cid_i.val(),
//						hc_c : hc_c.css('background-color')
//					});
//			this.storeEditor($('.ui-designer-container div[name="searchBox"]'));
		},
		changeStyles : function(o) {
//			var lg_i = o.lg_i;// 是否显示淘宝LOGO
//			var c_i = o.c_i;// 是否显示分类搜索
//			var hot_i = o.hot_i;// 是否显示热词
//			var txt_s = o.txt_s;// 搜索提示文本
//			var w_i = o.w_i;// 整体长度
//			var cid_i = o.cid_i;// 类目选择
//			var hc_c = o.hc_c;// 热词
//			var logo = $('.searchBoxLogo');// 预览LOGO
//			var speSelector = $('.searchBoxSpeSelector');// 预览 类目选择区域
//			var keyul = $('.searchBoxKeyul');// 预览热词区域
//			var searchtext = $('.searchBoxSearchText');// 预览搜索文本
//			var sbtn = $('.searchBoxSbtn');// 预览搜索按钮
//			var container = $('.searchBoxContainer');// 预览容器
//			var containerUl = $('.searchBoxContainerUl');// 预览 容器
//			var hc_c_a = $('.keyLabel1 a');
//			searchtext.val(txt_s);
//			hc_c_a.css('color', hc_c);
//			$('select', speSelector).val(cid_i);
//			if (lg_i == 1) {
//				logo.show();
//				keyul.className = "hot_word2";
//			} else {
//				logo.hide();
//				keyul.className = "hot_word";
//			}
//
//			if (c_i == 1) {
//				speSelector.show();
//			} else
//				speSelector.hide();
//
//			if (hot_i == 1) {
//				keyul.show();
//			} else {
//				keyul.hide();
//			}
//			// var height = ((hot_i == 1) ? 69 : 45);
//			// var msg_flag = false;
//			if (lg_i == 1 && c_i == 1) {
//				searchtext.width(148);// 全显示
//			} else if (lg_i == 1 && c_i != 1) {
//				searchtext.width(380);// 类目不显示
//			} else if (lg_i != 1 && c_i == 1) {
//				searchtext.width(208);// LOGO不显示
//			} else if (lg_i != 1 && c_i != 1) {
//				searchtext.width(440);// 全不显示
//			}
//			// alert(lg_i + '|' + c_i + '|' + searchtext.width());
//			container.width(560);
//			containerUl.width(560);
		}

	});
})(jQuery);
