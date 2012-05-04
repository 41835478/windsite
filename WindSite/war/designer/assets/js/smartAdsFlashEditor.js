/**
 * 智能广告编辑器
 */
(function($) {
	$.widget("ui.smartAdsFlashEditor", {
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
			var smartAdsFlashViewEditor = self.element;// 组件
			smartAdsFlashViewEditor
					.load(
							'/designer/assets/toolbar/smartads/smartAdsFlashViewEditor.html',
							function() {
								smartAdsFlashViewEditor.dialog({
									bgiframe : true,
									autoOpen : false,
									resizable : false,
									width : 550,
									zIndex : 100000,
									modal : true,
									buttons : {
										'取消' : function() {
											smartAdsFlashViewEditor
													.dialog('close');
										},
										'确定' : function() {
											self
													.storeEditor(editingSmartAdsFlash
															.parent());
											WidgetUtils
													.itemsSmartAdsFlashView_init(editingSmartAdsFlash);
											smartAdsFlashViewEditor
													.dialog('close');
										}
									}
								});

								$('#smartAdsFirstList').empty().change(
										function() {
											self.change_second_list();
										});
								for (var cat in newcat) {
									var name = newcat[cat].name;
									$('#smartAdsFirstList')
											.append('<option name="' + name
													+ '" value="' + cat + '">'
													+ name + '</option>');
								}
								$('#smartAdsFirstList option').first().attr(
										'selected', true);
								self.change_second_list(); // 初始化二级类目
								$('#smartAds_st_tc,#smartAds_st_pc,#smartAds_st_bgc,#smartAds_st_bdc')
										.click(function() {
											editingColor = $(this);
											$('#colorPicker').ColorPickerShow()
													.show();
											var left = editingColor.offset().left;
											var top = editingColor.offset().top;
											$('.colorpicker').css('left',
													left - 250).css('top',
													top + 36).css('z-Index',
													300000);
										});
							});
		},
		change_second_list : function() {
			var firstlist = $('#smartAdsFirstList').val();
			if (firstlist == "")
				return;
			if (firstlist == 999900001) {
				$("#smartAdsInfoText").show();
			} else {
				$("#smartAdsInfoText").hide();
			}
			var secondlist = $("#smartAdsSecondList");
			secondlist.empty();
			for (var seccat in newcat[firstlist].sub) {
				var name = newcat[firstlist].sub[seccat];
				secondlist.append('<option name="' + name + '" value="'
						+ seccat + '">' + name + '</option>');
			}
			if (secondlist.children().size() == 0) {
				secondlist.parent().hide();
			} else {
				secondlist.parent().show();

			}
		},
		/**
		 * 存储当前编辑结果
		 */
		storeEditor : function(widget) {
			var firstCat = $('#smartAdsFirstList');
			var secondCat = $('#smartAdsSecondList');
			var st_tc = $('#smartAds_st_tc div');
			var st_bgc = $('#smartAds_st_bgc div');
			var st_pc = $('#smartAds_st_pc div');
			var st_bdc = $('#smartAds_st_bdc div');
			var st_lg = $('input[name=smartAds_st_lg]:checked');
			var st_pb = $('input[name=smartAds_st_pb]:checked');
			// 设置类目ID
			if (firstCat.val() && firstCat.val().length > 0) {
				widget
						.itemsSmartAdsFlashView('option', 'catid', firstCat
										.val());
				widget.itemsSmartAdsFlashView('option', 'fcatid', firstCat
								.val());
			}
			if (secondCat.val() && secondCat.val().length > 0) {
				widget
						.itemsSmartAdsFlashView('option', 'catid', firstCat
										.val());
				widget.itemsSmartAdsFlashView('option', 'scatid', secondCat
								.val());
			}
			// 设置背景色
			widget.itemsSmartAdsFlashView('option', 'st_bgc', $.fmtColor(
							st_bgc.css('background-color'), 'hexadecimal')
							.replace('#', ''));
			// 设置标题色
			widget.itemsSmartAdsFlashView('option', 'st_tc', $.fmtColor(
							st_tc.css('background-color'), 'hexadecimal')
							.replace('#', ''));
			// 设置边框色
			widget.itemsSmartAdsFlashView('option', 'st_bdc', $.fmtColor(
							st_bdc.css('background-color'), 'hexadecimal')
							.replace('#', ''));
			// 设置价格色
			widget.itemsSmartAdsFlashView('option', 'st_pc', $.fmtColor(
							st_pc.css('background-color'), 'hexadecimal')
							.replace('#', ''));
			// 设置LOGO
			widget.itemsSmartAdsFlashView('option', 'st_lg', st_lg.val() + '');
			// 设置排版
			widget.itemsSmartAdsFlashView('option', 'st_pb', st_pb.val() + '');
		},
		/**
		 * 回显当前编辑结果
		 */
		restoreEditor : function(o) {
			if (o) {
				var firstCat = $('#smartAdsFirstList');
				var secondCat = $('#smartAdsSecondList');
				var st_tc = $('#smartAds_st_tc div');
				var st_bgc = $('#smartAds_st_bgc div');
				var st_pc = $('#smartAds_st_pc div');
				var st_bdc = $('#smartAds_st_bdc div');
				// 设置类目ID
				if (o.fcatid && o.fcatid.length > 0)
					firstCat.val(o.fcatid);
				if (o.scatid && o.scatid.length > 0) {
					secondCat.val(o.scatid);
				}
				// 设置背景色
				st_bgc.css('background-color', '#' + o.st_bgc);
				// 设置标题色
				st_tc.css('background-color', '#' + o.st_tc);
				// 设置边框色
				st_bdc.css('background-color', '#' + o.st_bdc);
				// 设置价格色
				st_pc.css('background-color', '#' + o.st_pc);
				// 设置LOGO
				$('#smartAdsFlashEditor .smartAds_st_lg[value=' + o.st_lg + ']')
						.attr('checked', true);
				// 设置排版
				$('#smartAdsFlashEditor  .smartAds_st_pb[value=' + o.st_pb
						+ ']').attr('checked', true);
			}

		}
	});
})(jQuery);
