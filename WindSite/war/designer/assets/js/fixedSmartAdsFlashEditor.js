/**
 * 固定尺寸智能广告编辑器
 */
(function($) {
	$.widget("ui.fixedSmartAdsFlashEditor", {
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
			var fixedSmartAdsFlashViewEditor = self.element;// 组件
			fixedSmartAdsFlashViewEditor
					.load(
							'/designer/assets/toolbar/smartads/fixedSmartAdsFlashViewEditor.html',
							function() {
								fixedSmartAdsFlashViewEditor.dialog({
											bgiframe : true,
											autoOpen : false,
											resizable : false,
											width : 550,
											zIndex : 100000,
											modal : true
										});
								$('#fixedSmartAdsTabs').tabs();
								$('#fixedSmartAdsFirstList').empty().change(
										function() {
											self.change_second_list();
										});
								for (var cat in newcat) {
									var name = newcat[cat].name;
									$('#fixedSmartAdsFirstList')
											.append('<option name="' + name
													+ '" value="' + cat + '">'
													+ name + '</option>');
								}
								$('#fixedSmartAdsFirstList option').first()
										.attr('selected', true);
								self.change_second_list(); // 初始化二级类目
								$('#fixedSmartAdsConfirm1').button().click(
										function() {
											self.storeEditor(
													editingFixedSmartAdsFlash,
													1);
										});
								$('#fixedSmartAdsConfirm2').button().click(
										function() {
											self.storeEditor(
													editingFixedSmartAdsFlash,
													2);
										});
							});
		},
		change_second_list : function() {
			var firstlist = $('#fixedSmartAdsFirstList').val();
			if (firstlist == "")
				return;
			var secondlist = $("#fixedSmartAdsSecondList");
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
		storeEditor : function(widget, type) {
			var parent = widget.parent();
			var sz = null;
			if (type == 1) {// 热卖
				sz = $('input[name="fixedSmartAdsSz1"]:checked');
			} else {// 主题
				sz = $('input[name="fixedSmartAdsSz2"]:checked');
			}
			if (sz.length == 0) {
				alert('尚未选择尺寸!');
				return;
			}
			if (type == 1) {// 热卖
				var firstCat = $('#fixedSmartAdsFirstList');
				var secondCat = $('#fixedSmartAdsSecondList');
				// 设置类目ID
				if (firstCat.val() && firstCat.val().length > 0) {
					parent.itemsFixedSmartAdsFlashView('option', 'catid',
							firstCat.val());
					parent.itemsFixedSmartAdsFlashView('option', 'fcatid',
							firstCat.val());
				}
				if (secondCat.val() && secondCat.val().length > 0) {
					parent.itemsFixedSmartAdsFlashView('option', 'catid',
							firstCat.val());
					parent.itemsFixedSmartAdsFlashView('option', 'scatid',
							secondCat.val());
				}
			} else {// 主题
				parent.itemsFixedSmartAdsFlashView('option', 'catid', '');
				parent.itemsFixedSmartAdsFlashView('option', 'fcatid', '');
				parent.itemsFixedSmartAdsFlashView('option', 'scatid', '');
			}
			parent.itemsFixedSmartAdsFlashView('option', 'type', type + '');// 类型
			parent.itemsFixedSmartAdsFlashView('option', 'sz', sz.val() + '');// 类型
			parent.itemsFixedSmartAdsFlashView('option', 'height', sz
							.attr('sHeight')
							+ '');// 高度
			parent.itemsFixedSmartAdsFlashView('option', 'width', sz
							.attr('sWidth')
							+ '');// 宽度
			WidgetUtils.itemsFixedSmartAdsFlashView_init(widget);

		},
		/**
		 * 回显当前编辑结果
		 */
		restoreEditor : function(o, width) {
			if (o) {
				this._createSz(o, width);
				if (o.type == "1") {// 热卖商品
					$('#fixedSmartAdsTabs').tabs('select', 0);// 选中Tab
					var firstCat = $('#fixedSmartAdsFirstList');
					var secondCat = $('#fixedSmartAdsSecondList');
					// 设置类目ID
					if (o.fcatid && o.fcatid.length > 0)
						firstCat.val(o.fcatid);
					if (o.scatid && o.scatid.length > 0) {
						secondCat.val(o.scatid);
					}
					$('#fixedSmartAdsSz1 input[name=fixedSmartAdsSz1][value='
							+ o.sz + ']').attr('checked', true);
				} else {// 主题推广
					$('#fixedSmartAdsTabs').tabs('select', 1);// 选中Tab
					$('#fixedSmartAdsSz2 input[name=fixedSmartAdsSz2][value='
							+ o.sz + ']').attr('checked', true);
				}
			}
		},
		/**
		 * 创建尺寸
		 */
		_createSz : function(o, width) {
			var szC1 = $('#fixedSmartAdsSz1').empty();
			var szC2 = $('#fixedSmartAdsSz2').empty();
			for (var i = 0; i < fixedSmartAdsSz1.length; i++) {
				var sz = fixedSmartAdsSz1[i];
				var pre = sz.name;
				var arry = sz.value;
				for (var j = 0; j < arry.length; j++) {
					var obj = arry[j];
					if ((obj.width + 10) < width) {// 如果宽度不适合
						var li = '<li><input type="radio" name="fixedSmartAdsSz1" sWidth="'
								+ obj.width
								+ '" sHeight="'
								+ obj.height
								+ '" value="'
								+ obj.sz
								+ '">'
								+ pre
								+ obj.width
								+ 'X' + obj.height + '</li>';
						szC1.append(li);
					}
				}
			}
			for (var i = 0; i < fixedSmartAdsSz2.length; i++) {
				var sz = fixedSmartAdsSz2[i];
				var pre = sz.name;
				var arry = sz.value;
				for (var j = 0; j < arry.length; j++) {
					var obj = arry[j];
					if ((obj.width + 10) < width) {// 如果宽度不适合
						var li = '<li><input type="radio" name="fixedSmartAdsSz2" sWidth="'
								+ obj.width
								+ '" sHeight="'
								+ obj.height
								+ '" value="'
								+ obj.sz
								+ '">'
								+ pre
								+ obj.width
								+ 'X' + obj.height + '</li>';
						szC2.append(li);
					}
				}
			}
		}
	});
})(jQuery);
