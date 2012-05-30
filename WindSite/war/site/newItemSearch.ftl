<#setting url_escaping_charset='UTF-8'>
<#assign isCat=false>
<#if cat??><#assign isCat=true></#if>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="<#if isCat>${cat.name}<#else>${q}</#if>,${sitetitle}">
<meta name="description" content="${sitetitle}<#if isCat>提供为您带来有关${cat.name}产品批发价格,品牌专卖店新品，厂家专卖产品等信息,是${cat.name}选购的最佳网站<#else>帮你找到${q}的所有关于价格，商家，产品图片和评测信息，你可以通过比较${q}不同商家的报价、服务、用户评论，帮您做出最好的购买选择</#if>">
<title><#if isCat>${cat.name}<#else><#if q??&&q!=''>${q}<#else>类目${cid}搜索</#if></#if>-${sitetitle}</title>
<script src="/assets/min/js/page/page.min.js?v=${dateVersion()}"></script>
</head>
<body>
<iframe frameborder="0" scrolling="no" src="${clickUrl}&taoke_type=1" marginwidth="0" marginheight="0" width="100%" id="J_ItemSearchIframe"></iframe>
</body>
<script>
(function ($) {
    $.fn.iframeAutoHeight = function (options) {
        // set default option values
        var options = $.extend({
            heightOffset: 0
        }, options);

        // iterate over the matched elements passed to the plugin
        $(this).each(function () {
            // Check if browser is Opera or Safari(Webkit so Chrome as well)
            if ($.browser.safari || $.browser.opera) {
                // Start timer when loaded.
                $(this).load(function () {
                    var iframe = this;
                    var delayedResize = function () {
                        resizeHeight(iframe);
                    };
                    setTimeout(delayedResize, 0);
                });

                // Safari and Opera need a kick-start.
                var source = $(this).attr('src');
                $(this).attr('src', '');
                $(this).attr('src', source);
            }
            else {
                // For other browsers.
                $(this).load(function () {
                    resizeHeight(this);
                });
            }

            // resizeHeight
            function resizeHeight(iframe) {
                // Set inline style to equal the body height of the iframed content plus a little
                try{
                var newHeight = iframe.contentWindow.document.body.offsetHeight + options.heightOffset;
                iframe.style.height = newHeight + 'px';
                }catch(e){
                }
            }

        }); // end
    }
})(jQuery);
(function($) {
	setInterval($('#J_ItemSearchIframe').iframeAutoHeight(), 500);
    
})(jQuery);
</script>
</html>
