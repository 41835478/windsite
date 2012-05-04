<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>广告设置-返利管理-我是淘客-新淘网</title>
<style>
.links-head {cursor:pointer;background: #5DAE40;border:1px solid #8AB78A;height: 20px;padding: 4px 14px 4px 9px;}
.links-head .title {color:white;float: left;height: 20px;margin-right: 5px;overflow: hidden;font-size: 14px;font-weight: bold;}
.links-head .title a{color:red;}.links-head .title a:hover{color:#333;}
.formtable { width: 100%; table-layout: fixed; }
.formtable th { text-align: left; font-weight: bold; color: #333333; }
.formtable th, .formtable td { padding: 0.5em 0; border-bottom: 1px solid #F2F2F2; vertical-align: top; line-height:1.5em; }
.formtable td th, .formtable td td { border: none; }
.t_input{padding: 3px 2px;border: 1px solid #DDD;line-height: 16px;width:200px;}
</style>
</@ws.header>
<script src="/assets/js/page/PageAlimamaConfig.js" type="text/javascript"></script>
<script src="/assets/js/page/PageGoogleConfig.js" type="text/javascript"></script>
<script>
$(function() {
	$('#ad-delete-button').click(function() {
				var checkeds = $('#ad-table input[name:"ad-delete"]:checked');
				if (checkeds.length == 0) {
					alert('您尚未选中要删除的广告');
					return false;
				}
				var ids = [];
				checkeds.each(function() {
							ids.push($(this).attr('aid'));
						});
				var sender = new WindSender("/router/member/fl/ad/delete");
				sender.load("POST", {
							ids : ids.join(',')
						}, function(response) {
							if (response.isSuccess()) {
								alert('删除广告成功');
								document.location.href = "/router/member/fl/ad";
							} else {
								alert(response.msg);
							}
						});
			});
	$('#ad-add').click(function() {
				openAdDetail('/router/member/fl/ad/add/view?v=' + Math.random());
			});
	$('.ad-modify').click(function() {
		openAdDetail('/router/member/fl/ad/detail/' + $(this).attr('aid')
				+ '?v=' + Math.random());
	});
	function openAdDetail(url) {
		$('#ad-dialog').remove();
		$('body')
				.append('<div id="ad-dialog" title="广告位" style="display:none;"></div>');
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
						$('#ad-dialog').empty().append(data);
						$('#ad-type').change(function() {
							$('#ad-dialog .style-adtype').hide();
							$('#ad-dialog .' + $(this).val() + '-adtype').show();
						});
						$('#ad-dialog').dialog({
									bgiframe : true,
									autoOpen : true,
									width : 600,
									height : 500,
									zIndex : 1000,
									modal : true,
									buttons : {
										'取消' : function() {
											$('#ad-dialog').dialog('close');
										},
										'确认' : function() {
											processAd(($('#ad-id').length == 0));
										}
									}
								});
					}
				});
	}
	function validateNumber(num) {
		var numRe = /^-?[0-9]*(\.[0-9]+)?$/;
		return numRe.test(num);
	}
	function validateUrl(url) {
		var urlRe = /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
		return urlRe.test(url);
	}
	function processAd(isAdd) {
		var adType = $('#ad-type').val();
		var pageType = $('#ad-pagetype').val();
		if ($('#ad-table tr[pagetype="' + pageType + '"]').length == 3) {
			alert('同一页面位置最多可添加3个不同广告');
			return false;
		}
		var title = $('#ad-title').val();
		if (!title) {
			alert('广告标题不能为空');
			return false;
		}
		if (title.length > 30) {
			alert('广告标题长度不能超过30');
			return false;
		}
		var adMeta = {};
		if ('adsense' == adType) {// Google
			adMeta = PageGoogleConfig.createCommonGoogleParams();
			if (!adMeta) {
				return false;
			}
		} else if ('alimama' == adType) {// 阿里妈妈
			adMeta = PageAlimamaConfig.createCommonAlimamaParams();
			if (!adMeta) {
				return false;
			}
		} else if ('flash' == adType) {// Flash
			var width = $('#flash-width').val();
			var height = $('#flash-height').val();
			var url = $('#flash-url').val();
			if (!validateNumber(width)) {
				alert('Flash宽度不能为空，且必须为数字');
				return false;
			}
			if (!validateNumber(height)) {
				alert('Flash高度不能为空，且必须为数字');
				return false;
			}
			if (!validateUrl(url)) {
				alert('Flash地址不能为空，且必须带http://或https://');
				return false;
			}
			adMeta['width'] = width;
			adMeta['height'] = height;
			adMeta['url'] = url;
		} else if ('image' == adType) {// 图片
			var width = $('#image-width').val();
			var height = $('#image-height').val();
			var url = $('#image-url').val();
			var src = $('#image-src').val();
			var alt = $('#image-alt').val();
			if (!validateUrl(src)) {
				alert('图片地址不能为空，且必须前缀http://或https://');
				return false;
			}
			if (!validateUrl(url)) {
				alert('图片链接不能为空，且必须前缀http://或https://');
				return false;
			}
			if (width) {
				if (!validateNumber(width)) {
					alert('图片宽度必须为数字');
					return false;
				}
			}
			if (height) {
				if (!validateNumber(height)) {
					alert('图片高度必须为数字');
					return false;
				}
			}
			adMeta['width'] = width;
			adMeta['height'] = height;
			adMeta['url'] = url;
			adMeta['src'] = src;
			adMeta['alt'] = alt;
		} else if ('text' == adType) {// 文本
			var content = $('<a></a>').html($('#text-content').val()).text();
			var url = $('#text-url').val();
			var size = $('#text-size').val();
			if (!content) {
				alert('文字内容不能包含其他代码，且不能为空');
				return false;
			}
			if (!validateUrl(url)) {
				alert('文字链接不能为空，且必须前缀http://或https://');
				return false;
			}
			if (size) {
				if (!validateNumber(size)) {
					alert('文字大小必须为数字');
					return false;
				}
			}
			adMeta['content'] = content;
			adMeta['size'] = size;
			adMeta['url'] = url;
		}
		$('#ad-dialog button:last').button('disabled', true);
		if (isAdd) {// 如果是新增
			var sender = new WindSender("/router/member/fl/ad/add");
			sender.load("POST", {
						title : title,
						pageType : pageType,
						adType : adType,
						adMeta : TaobaoUtils.json2str(adMeta),
						isValid : $('#ad-isvalid').attr('checked') + ''
					}, function(response) {
						if (response.isSuccess()) {
							alert('新增广告成功');
							$('#ad-dialog').dialog('close');
							document.location.href = "/router/member/fl/ad";
						} else {
							alert(response.msg);
						}
					});
		} else {// 如果是修改
			var sender = new WindSender("/router/member/fl/ad/update/"
					+ $('#ad-id').val());
			sender.load("POST", {
						title : title,
						pageType : pageType,
						adType : adType,
						adMeta : TaobaoUtils.json2str(adMeta),
						isValid : $('#ad-isvalid').attr('checked') + ''
					}, function(response) {
						if (response.isSuccess()) {
							alert('修改广告成功');
							$('#ad-dialog').dialog('close');
							document.location.href = "/router/member/fl/ad";
						} else {
							alert(response.msg);
						}
					});
		}
	}
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='fanli-ad' group=2>
<input id="module-ishd" checked="" type="hidden">
<div class="links-head"><h3 class="title">广告位管理[&nbsp;<a id="ad-add">新增广告</a>&nbsp;]</h3></div>
<table id="ad-table" cellspacing="0" cellpadding="0" class="formtable">
<tbody>
<tr><th>标题</th><th width="20%">广告方式</th><th width="20%">页面位置</th><th width="8%">有效</th><th width="8%">编辑</th></tr>
<#if ads??&&ads?size!=0>
<#assign map={'alimama':'阿里妈妈(淘宝联盟)','adsense':'Google Adsense','flash','Flash广告牌','image':'图片','text':'文本'} pMap={'br':'文章内容区域','ht':'画报内容区域'}>
<#list ads as a>
<tr pagetype="${a.pageType}"><td><input type="checkbox" name="ad-delete" aid="${a.id}" value="5">${a.title}</td>
<td>${map[a.adType]}</td>
<td>${pMap[a.pageType]}</td><td><#if a.isValid>有效<#else>-</#if></td><td><a class="ad-modify" aid="${a.id}">编辑</a></td></tr>
</#list>
<tr><td colspan=4><input type="button" id="ad-delete-button" value="批量删除" style="padding:2px;cursor:pointer;"></td></tr>
</#if>
</tbody></table>
<@ws.help>
<h3>什么是广告设置？</h3>
<p>系统为返利版站长站点提供了一些默认的广告位，站长可以通过广告设置来管理这些广告位的广告显示</p>
<h3>注意事项？</h3>
<p>每个页面位置最多可添加3个广告，系统将随机展示其中的有效广告</p>
</@ws.help>
</@xt.taoketemplate>
