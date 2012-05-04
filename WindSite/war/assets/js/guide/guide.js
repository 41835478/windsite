
/**
 * 向导组件
 */
(function($) {
	$.widget("ui.guide", {
		/**
		 * 参数
		 */
		options : {
			gt : ''
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
			o = self.options;
			var guide = null;
			if ($('#guideTip').length == 0)
				$('body').append('<div id="guideTip"></div>');
			var gt = $.url.param('gt');
			if (gt && gt != '') {
				o.gt = gt;
			}
			if (o.gt == '') {
				o.gt = $.cookie('gt');
			}
			if (o.gt && o.gt != null && o.gt != '') {
				if (Guides.hasOwnProperty(o.gt)) {
					guide = Guides[o.gt];
				}
			}
			if (guide != null) {
				self.createGuide(guide);
			}
			// setInterval(function() {
			// $('.gt-border').toggleClass('flash');
			// }, 1000);
		},
		/**
		 * 后一个向导
		 */
		nextGuide : function(guide) {
			if (guide.next != '') {
				if (Guides.hasOwnProperty(guide.next)) {
					this.createGuide(Guides[guide.next]);
				}
			} else {
				$('.gt-border').remove();
			}
		},
		/**
		 * 前一个向导
		 */
		prevGuide : function(guide) {
			if (guide.prev != '') {
				if (Guides.hasOwnProperty(guide.prev)) {
					this.createGuide(Guides[guide.prev]);
				}
			} else {
				$('.gt-border').remove();
			}
		},
		createGuide : function(guide) {
			var self = this;
			var attr = $(guide['element']);
			if (attr.length == 0) {
				return;
			}
			var offset = attr.offset();
			var top = attr.offset().top - 6;
			var left = attr.offset().left - 6;
			var height = attr.height() + 12;
			var width = attr.width() + 12;
			$('.gt-border').remove();
			$('body')
					.append('<div class="gt-border" style="left:'
							+ left
							+ 'px;top:'
							+ top
							+ 'px;width:2px;height:'
							+ (height)
							+ 'px;"></div><div class="gt-border" style="width:2px;left:'
							+ (left + width)
							+ 'px;top:'
							+ top
							+ 'px;height:'
							+ (height)
							+ 'px;"></div><div class="gt-border" style="height:2px;left:'
							+ left
							+ 'px;top:'
							+ top
							+ 'px;width:'
							+ (width)
							+ 'px;"></div><div class="gt-border" style="height:2px;left:'
							+ left + 'px;top:' + (top + height) + 'px;width:'
							+ (width + 2) + 'px;"></div>');
			$('#guideTip').empty();
			if (guide.msg && guide.msg != '') {
				$('#guideTip').append(guide.msg);
				attr.tooltip({
							events : {
								def : ""
							},
							offset : [-20, 20],
							tip : '#guideTip',
							api : true
						}).show();
			}
			$.cookie('gt', null);
			if (guide.aop && guide.method) {// 如果需要下一步
				GUIDE = $.aop.after({
							target : window,
							method : guide.method
						}, function(result) {
							if (GUIDE != null) {
								if (GUIDE.length > 0)
									for (var i in GUIDE) {
										GUIDE[i].unweave();
									}
								else {
									GUIDE.unweave();
								}
							}
							self.nextGuide(guide);
						});
			}
		}
	});
})(jQuery);
function openGuide() {
	if ($('#guideDialog').length == 0) {
		$('body').append('<div id="guideDialog" title="新手向导"></div>');
		$('#guideDialog').load(
				'/assets/js/guide/guide.html?v=' + Math.random(), function() {
					$('#guideDialog').dialog({
								bgiframe : true,
								autoOpen : false,
								width : 500,
								height : 300,
								zIndex : 1000,
								modal : true
							});
					$('a.guide-a').click(function() {
								$.cookie('gt', $(this).attr('gt'));
							});
					$('#guideDialog').dialog('open');
				});
	} else {
		$('#guideDialog').dialog('open');
	}
}
var GUIDE = null;
var Guides = {
	's-p-help' : {
		element : '#gt-help',
		type : 'site-profile',
		msg : '',
		prev : '',
		next : 's-p-1',
		method : 'gtGuide',
		aop : true
	},
	's-p-1' : {
		element : '#changeSiteUpdate',
		type : 'site-profile',
		msg : '您可以点击修改基本信息，来修改您的站点名称<br/>店铺类别，描述，关键词',
		prev : '',
		next : 's-p-2',
		method : 'gtChangeSiteUpdate',
		aop : true
	},
	's-p-2' : {
		element : '#updateSite',
		type : 'site-profile',
		msg : '填写完上述信息后，<br/>您可以点击保存修改按钮，来修改站点基本信息，<br/>同时如果您的站点已经发布，那么会同时更新已经发布的站点页面',
		prev : 's-p-1',
		next : '',
		method : 'gtUpdateSite',
		aop : true
	},
	's-g-1' : {
		element : '#createGroup',
		type : 'site-groups',
		msg : '',
		prev : '',
		next : '',
		method : 'gtCreateGroupDialog',
		aop : true
	},
	's-m-1' : {
		element : '#add-page',
		type : 'site-template',
		msg : '',
		prev : '',
		next : 's-m-2',
		method : 'gtOpenAddTemplateDialog',
		aop : true
	},
	's-m-2' : {
		element : '#add-template-confirm',
		type : 'site-template',
		msg : '',
		prev : '',
		next : '',
		method : '',
		aop : false
	}
};
