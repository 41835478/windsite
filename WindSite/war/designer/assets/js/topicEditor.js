/**
 * 主题广告推广组件
 */
(function($) {
	$.widget("ui.topicEditor", {
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
			var topicEditor = self.element;// 组件
			topicEditor.load('/designer/assets/toolbar/topic/topics.html',
					function() {
						topicEditor.dialog({
									bgiframe : true,
									autoOpen : false,
									resizable : false,
									width : 720,
									height : 500,
									zIndex : 100000,
									modal : true
								});
						// 初始化类别
						for (var cat in topics) {
							var catO = topics[cat];
							var name = catO.name;
							var li = $('<li><a class="topic-category-a" title="'
									+ name
									+ '">'
									+ name
									+ '</a>('
									+ catO.count
									+ ')</li>');
							$('#topicCategory').append(li);
							$('a', li).click(function() {
										self.changeTopic($(this).attr('title'));
									});
						}
						// 初始化默认
						self.changeTopic('时尚女人');
						// 全选
						$('#checkAllTopics').click(function() {
							$('#topicsContent input[name="topics"]').attr(
									"checked", $(this).attr('checked')).each(
									function() {
										self.checkedTopic($(this));
									});
						});
						// 初始化button
						$('#confirmTopicsAdd').button().click(function() {
							if ($('#selectedTopics').children().size() == 0) {
								alert('尚未选择主题！');
								return;
							}
							editingTopicEditor.empty();
							$('#selectedTopics li').each(function() {
								var li = editingTopicEditor.parent().topicView(
										'saveItemLi', $(this));
								editingTopicEditor.append(li);
								self.addLiHover(li);
							});
							WidgetUtils.widgetLiLayout(editingTopicEditor);
							topicEditor.dialog('close');
						});
						$('#deleteTopicsAdd').button().click(function() {
							$('#selectedTopics').empty();
							$('#topicsContent input[name="topics"]').attr(
									'checked', false);
						});
					});
		},
		changeTopic : function(cat) {
			var self = this;
			var catO = topics[cat];
			$('#topicsContent').empty();
			for (var i = 0; i < catO.topics.length; i++) {
				var topic = catO.topics[i];
				// var _href = "http://zhuti.huoban.taobao.com/event.php?pid="
				// + PID + "&eventid=" + topic.id;
				var _href = topic.url.replace('mm_10011550_0_0', PID);
				$('#topicsContent')
						.append('<tr><td align="left"><input type="checkbox" name="topics" tid="'
								+ topic.id
								+ '" image="'
								+ topic.image
								+ '" created="'
								+ topic.created
								+ '" tname="'
								+ topic.name
								+ '" href="'
								+ _href
								+ '"></td><td align="left"><a target="_blank" tid="'
								+ topic.id
								+ '" href="'
								+ _href
								+ '"><strong>'
								+ topic.name
								+ '</strong></a><img id="'
								+ topic.id
								+ '" style="display:none;position:absolute;" src="'
								+ topic.image
								+ '" width="200px" height="200px"/></td><td>'
								+ topic.created + '</td></tr>');
			}

			$('#topicsContent tr').hover(function() {
				var a = $(this).find('a');
				var position = a.position();
				$('#' + a.attr('tid')).css("left",
						(position.left + a.width() + 10)).css('top',
						position.top - 50).show();
			}, function() {
				var a = $(this).find('a');
				$('#' + a.attr('tid')).hide();
			});
			$('#topicsContent input[name="topics"]').click(function() {
						self.checkedTopic($(this));
					});

		},
		checkedTopic : function(check) {
			var checked = check.attr('checked');
			if (checked) {
				if ($('#selectedTopics li[tid="' + check.attr('tid') + '"]').length > 0) {
					return;
				}
				var li = $('<li tid="' + check.attr('tid') + '" image="'
						+ check.attr('image') + '" href="' + check.attr('href')
						+ '" tname="' + check.attr('tname') + '">'
						+ check.attr('tname') + '</li>');
				$('#selectedTopics').append(li);
				this.addLiHover(li);
			} else {
				$('#selectedTopics li[tid="' + check.attr('tid') + '"]')
						.remove();
			}
		},
		addLiHover : function(li) {
			li.hover(function() {
				var X = $(this).position().top;
				var Y = $(this).position().left;
				$(this)
						.append("<div id=\"deleteImg\" style=\"cursor: pointer;position:absolute;top:-5px;left:0px;\"><img src=\"/assets/images/delete.gif\"/></div>");
				$("#deleteImg").click(function() {
					var tid = $(this).parent().attr('tid');
					var checkbox = $('#topicsContent input[name="topics"][tid="'
							+ tid + '"]');
					if (checkbox.length > 0) {
						checkbox.attr('checked', false);
					}
					var ul = li.parent();
					$(this).parent().remove();// 删除当前li
					WidgetUtils.widgetLiLayout(ul);// 重新布局
					$('#checkAllTopics').attr('checked', false);
				});
			}, function() {
				$("#deleteImg").remove();
			});
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
