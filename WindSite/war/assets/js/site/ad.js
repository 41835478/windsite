function adUserTemplate() {
	if (isDesigner) {
		return;
	}
	var url = '/router/ad/index';
	var isAd = false;// 暂时不起作用
	try {
		if (typeof(TID) != 'undefined' && TID != '') {// 新版本将提供模板ID标识
			url = url + '?ad=' + TID;
			isAd = true;
		} else {// 老版本根据页面地址获取广告计划
			var href = document.location.href;
			if (href.indexOf('/pages/') != -1) {// 如果是子页面
				var reg = /\/pages\/\d{0,24}\.html/i;
				var result = href.match(reg);
				if (result != null) {
					var page = result[0];
					page = page.replace('/pages/', '').replace('.html', '');
					url = url + '?page=' + page;
				}
				isAd = true;
			} else {
				isAd = true;
			}
		}
	} catch (e) {
		isAd = false;
	}
	if (isAd) {
		// if ($('#main').length == 1) {
		// var jipiao = '<a
		// href="http://taoke.alimama.com/tms/channel/jipiao.htm?pid='
		// + PID
		// + '" target="_blank"><img
		// src="http://www.xintaonet.com/assets/min/images/ads/jipiao_950X90.jpg"
		// style="border:0px;"/></a>';
		// $('#main')
		// .prepend('<div class="ui-designer-content"><div
		// class="ui-designer-container middle-1" style="margin-right: 0px;
		// "><div class="ui-designer-widget" name="richEditor"
		// style="display:block;width:100%;height:90px" align="left"><div
		// class="widget-richeditor" style="display: block; " title=""><p>'
		// + jipiao + '</p></div></div></div></div>');
		//
		// }
		$.ajax({
					url : url,
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
						$('#main').prepend(data);
					}
				});
	}
}
function adBlog(b, a) {
	!b || !a || b == "" || a == "" || $.ajax({
				url : "/router/ad/blog?sid=" + b + "&type=" + a,
				type : "GET",
				data : {},
				dataType : "html",
				beforeSend : function(c) {
					c.setRequestHeader("WindType", "AJAX");
					c.setRequestHeader("WindDataType", "HTML")
				},
				error : function(c, d, e) {
				},
				success : function(c) {
					$("#" + a + "Ads").append(c)
				}
			})
};