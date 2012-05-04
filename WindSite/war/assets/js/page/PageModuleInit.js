$(function() {
	// TODO 修订AutoComplete
	$.Autocompleter.prototype.fetchData = function(value) {
		var data = this.cacheRead(value);// 缓存
		if (data) {
			this.filterAndShowResults(data);
		} else {
			$.getScript(this.makeUrl(value));
		}
	};
	$.Autocompleter.prototype.activate = function() {
		var self = this;
		var itemSearch = self.dom.$elem.parents('form:first')
				.find('.search-tab li.selected');
		if (itemSearch.length == 1) {
			var rel = itemSearch.attr('rel');
			if ('item' != rel && 'mall' != rel)
				return;
		}
		var activateNow = function() {
			self.activateNow();
		};
		var delay = parseInt(this.options.delay, 10);
		if (isNaN(delay) || delay <= 0) {
			delay = 250;
		}
		if (this.keyTimeout_) {
			clearTimeout(this.keyTimeout_);
		}
		this.keyTimeout_ = setTimeout(activateNow, delay);
	};
	// 回顶部
	if ($('#J_GoTop').length == 0) {
		$('body')
				.append('<p id="J_GoTop" style="display:none;" class="gotop"><a accesskey="t" title="回顶部"><i class="ii"></i></a></p>');
	}
	$('#J_GoTop').crGoTop();
	var content = $('#content');
	// 延迟加载模块内图片
	$(".J_TBox .bd", content).each(function() {
		if ('false' != $(this).attr('data-lazy')) {// 如果未指定不延迟加载
			$(this).find('img').lazyload({
				failurelimit : 1,
				placeholder : "http://img02.taobaocdn.com/imgextra/i2/71614142/T2Hf0lXatMXXXXXXXX_!!71614142.gif",
				effect : "fadeIn"
			});
		}
	})
	$('.J_TBox[name="shopHeader"]', content).each(function() {
				PageModuleUtils.initShopHeader($(this));
			});
	$('.J_TBox[name="itemSearch"]', content).each(function() {
				PageModuleUtils.initItemSearch($(this));
			});
	$('.J_TBox[name="shopLogo"]', content).each(function() {
				PageModuleUtils.initItemSearch($(this));
			});
	$('.J_TBox[name="shopFlashShow"]', content).each(function() {
				PageModuleUtils.initShopFlashShow($(this));
			});
	$('.J_TBox[name="shopChannel"]', content).each(function() {
				PageModuleUtils.initShopChannel($(this));
			});
	$('.J_TBox[name="shopSlider"]', content).each(function() {
				PageModuleUtils.initShopSlider($(this));
			});
	$('.J_TBox[name="shopSliderTemplate"]', content).each(function() {
				PageModuleUtils.initShopSlider($(this));
			});
	$('.J_TBox[name="shopDetailShop"]', content).each(function() {
				PageModuleUtils.initShopDetailShop($(this));
			});
	$('.J_TBox[name="shopDetailHot"]', content).each(function() {
				PageModuleUtils.initShopDetailHot($(this));
			});
	$('.J_TBox[name="shopSearchHot"]', content).each(function() {
				PageModuleUtils.initShopSearchHot($(this));
			});
	$('.J_TBox[name="shopFloat"]', content).each(function() {
				PageModuleUtils.initShopFloat($(this));
			});
	$('.J_TBox[name="shopScrollable"]', content).each(function() {
				PageModuleUtils.initShopScrollable($(this));
			});
	$('.J_TBox[name="shopDianPuList"]', content).each(function() {
				PageModuleUtils.initShopDianPuList($(this));
			});
	$('.J_TBox[name="shopMallFloor"]', content).each(function() {
				if ($(this).find('.J_Slider').length > 0)
					PageModuleUtils.initShopMallFloor($(this));
			});
	$('.J_TBox[name="shopMallNewFloor"]', content).each(function() {
				if ($(this).find('.J_Slider').length > 0)
					PageModuleUtils.initShopMallFloor($(this));
			});
	$('.J_TBox[name="shopMallCategory"]', content).each(function() {
				PageModuleUtils.initShopMallCategory($(this));
			});
	$('.J_TBox[name="shopMallSideNav"]', content).each(function() {
				PageModuleUtils.initShopMallSideNav($(this));
			});
	$('.J_TBox[name="shopMallJingXi"]', content).each(function() {
				PageModuleUtils.initShopMallJingXi($(this));
			});
	$('.J_TBox[name="shopChildCategory"]', content).each(function() {
				PageModuleUtils.initShopChildCategory($(this));
			});
	$('.J_TBox[name="shopTabNav"]', content).each(function() {
				PageModuleUtils.initShopTabNav($(this));
			});
	$('.J_TBox[name="shopMallTabNav"]', content).each(function() {
				PageModuleUtils.initShopMallTabNav($(this));
			});
	$('.J_TBox[name="shopB2CMall"]', content).each(function() {
				PageModuleUtils.initShopB2cMall($(this));
			});
	$('.J_TBox[name="shopChongzhi"]', content).each(function() {
				PageModuleUtils.initShopChongzhi($(this));
			});
	// 处理商品加载失败【重新异步加载】
	$('.J_TBox[data-error="true"]', content).each(function() {
				PageModuleUtils.initModule($(this));
			});
	var nav = $('#site-nav-bd');
	var footer = $('#footer');
	if (nav.length == 1 && nav.children().size() == 0) {
		$.ajax({
					url : '/router/site/pageHeader?v=' + Math.random(),
					type : 'GET',
					data : {},
					dataType : 'html',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
					},
					success : function(data) {
						$('#site-nav-bd').empty().append(data);
					}
				});
	}
	if (footer.length == 1 && footer.children().size() == 0) {
		$.ajax({
					url : '/router/site/pageFooter?v=' + Math.random(),
					type : 'GET',
					data : {},
					dataType : 'html',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
					},
					success : function(data) {
						$('#footer').empty().append(data);
					}
				});
	}
});
function IndexAd() {
	// 如果是自定义页面,获取浮动广告
	if (typeof(PAGEID) != "undefined" && typeof(USERID) != "undefined") {
		if (PAGEID && USERID && $('#J_ADBottomRight').length == 0) {
			$.ajax({
						url : '/router/ad/page/' + USERID + '/' + PAGEID
								+ '?v=' + Math.random(),
						type : 'GET',
						data : {},
						dataType : 'html',
						beforeSend : function(xhr) {
							xhr.setRequestHeader("WindType", "AJAX");// 请求方式
							xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
						},
						error : function(request, textStatus, errorThrown) {
						},
						success : function(data) {
							$('body').append(data);
							PageModuleUtils
									.initShopFloat($('#J_ADBottomRight'));
							if ($('#J_ADBottomRight .items').length > 1) {// 如果多个广告则滚动
								PageModuleUtils
										.initShopScrollable($('#J_ADBottomRight'));
							}
						}
					});
		}
	}
}
function SetHome(a) {
	var b = window.location.href;
	try {
		a.style.behavior = "url(#default#homepage)";
		a.setHomePage(b)
	} catch (c) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager
						.enablePrivilege("UniversalXPConnect")
			} catch (d) {
				alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66\n\u7136\u540e\u5c06 [signed.applets.codebase_principal_support]\u7684\u503c\u8bbe\u7f6e\u4e3a'true',\u53cc\u51fb\u5373\u53ef\u3002")
			}
			Components.classes["@mozilla.org/preferences-service;1"]
					.getService(Components.interfaces.nsIPrefBranch)
					.setCharPref("browser.startup.homepage", b)
		}
	}
	return false;
}
function AddFavorite(a) {
	var b = window.location.href;
	try {
		window.external.addFavorite(b, a)
	} catch (c) {
		try {
			window.sidebar.addPanel(a, b, "")
		} catch (d) {
			alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0")
		}
	}
	return false;
};