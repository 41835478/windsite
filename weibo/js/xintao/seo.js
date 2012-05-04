function openBaiduIndex(word) {
	if (word) {
		if ($.browser.msie) {// 如果是IE
			document.charset = 'GB2312';// 设置当前文档编码
		}
		$('#J_BaiduWord').val(word);
		$('#J_BaiduForm').attr('action',
				'http://index.baidu.com/main/word.php?v=' + Math.random())
				.submit();
	}
	return false;
}
var DEFAULT_TAOBAO_SUG = {
	url : 'http://suggest.taobao.com/sug?code=utf-8&extras=1',
	theme : "facebook",
	queryParam : "q",
	hintText : "输入关键词...",
	noResultsText : "没有匹配的关键词...",
	searchingText : "搜索淘宝关键词...",
	propertyToSearch : "0",
	tokenValue : "0",
	jsonp : 'callback',
	jsonContainer : "result",
	prePopulate : [["Slurms MacKenzie"], ["Bob Hoskins"], ["Kriss Akabusi"]],
	onResult : function(results) {
		var text = $('.token-input-list-facebook input[type="text"]');
		if (results && results.result && text.length == 1 && text.val()) {
			if (results.result.length > 0) {
				if (results.result[0][0] == text.val()) {
					return results;
				}
			}
			results.result.unshift([text.val(), '0']);
		}
		return results;
	},
	tokenFormatter : function(item) {
		return '<li class="token-input-token-facebook"><p>'
				+ item[0]
				+ '</p><a class="icon" style="cursor:pointer;display: inline-block;margin: 0 3px;" onclick="javascript:openBaiduIndex(\''
				+ item[0]
				+ '\');" target="_blank" title="查看百度指数"><img src="http://www.xintaowang.com/css/default/xintao/zhi.gif"></a></li>';
	}
};
var DEFAULT_BAIDU_SUG = {
	url : 'http://unionsug.baidu.com/su',
	theme : "facebook",
	queryParam : "wd",
	hintText : "输入关键词...",
	noResultsText : "没有匹配的关键词...",
	searchingText : "搜索百度关键词中...",
	propertyToSearch : "0",
	tokenValue : "0",
	jsonp : 'a=b&cb',
	jsonContainer : "",
	prePopulate : [["Slurms MacKenzie"], ["Bob Hoskins"], ["Kriss Akabusi"]],
	onResult : function(results) {
		var text = $('.token-input-list-facebook input[type="text"]');
		var array = [];
		if (results && results.s) {
			for (var i = 0; i < results.s.length; i++) {
				var w = results.s[i];
				array.push([w]);
			}
		}
		if (text.length == 1 && text.val()) {
			if (array.length > 0 && array[0][0] == text.val()) {
				return results;
			}
			array.unshift([text.val()]);
		}
		return array;
	},
	tokenFormatter : function(item) {
		return '<li class="token-input-token-facebook"><p>'
				+ item[0]
				+ '</p><a class="icon" style="cursor:pointer;display: inline-block;margin: 0 3px;" onclick="javascript:openBaiduIndex(\''
				+ item[0]
				+ '\');" target="_blank" title="查看百度指数"><img src="http://www.xintaowang.com/css/default/xintao/zhi.gif"></a></li>';
	}
};