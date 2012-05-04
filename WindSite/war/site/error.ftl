<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 抱歉,您的访问出错">
<meta name="robots" content="noindex,nofollow">
<title>错误页面- 新淘网</title>
</@ws.header>
<style>
body{color: #666;font-family: Tahoma, SimSun, Arial;font-size: 12px;font-weight: normal;margin: 0px;padding: 0px;width: 100%;height: 100%;line-height: normal;text-align: center;}
#error-notice{height: 155px;margin-bottom: 50px;margin-left: 120px;margin-right: 0px;margin-top: 60px;width: 830px;}.ant-emotion{float: left;height: 52px;width: 50px;}.error-notice-text{float: left;height: 155px;margin-left: 20px;width: 459px;}
.error-notice-hd{font-size: 16px;font-weight: bold;margin-bottom: 30px;width: 459px;}.error-notice-info{height: 0px;width: 459px;}.error-notice-advice{height: 106px;line-height: 24px;width: 459px;}
.you-can{height: 24px;margin-bottom: 10px;width: 459px;}.error-notice-advice ol{height: 72px;list-style: none;margin: 0px;margin-left: 25px;padding:0px;width: 434px;}
.error-notice-advice ol li{height: 24px;list-style-type: decimal;margin:0px;padding:0px;width: 434px;}
</style>
<div id="error-notice"> 
    <div class="ant-emotion"> 
        <img src="/assets/images/error.gif" alt="Search"> 
    </div> 
    <div class="error-notice-text"> 
        <div class="error-notice-hd">
        	<#if code=="404">
				对不起！您浏览的网页可能已被删除,重命名或暂时不可用！
			<#else>
				<#if msg??&&msg!=''>
					错误信息:${msg}<#if msg?contains('升级版本')>，<a href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade" target="_blank" style="font-size: 16px;font-weight: bold;color:#f60;">立刻升级</a></#if>
				<#elseif code??&&code!=''>
					错误信息:${code}
				<#else>
					系统错误！<br/>
					<#if cause??>
						${cause}
					</#if>
			</#if>	
			</#if>
		</div> 
        <div class="error-notice-info"></div> 
        <div class="error-notice-advice" align="left"> 
            <span class="you-can">您可以：</span> 
            <ol> 
                <li>检查网址是否正确</li> 
                <li>去其它地方逛逛: <a href="/" title="淘宝首页">首页</a></li> 
            </ol> 
        </div> 
    </div> 
</div>
<script type="text/javascript">var GOOG_FIXURL_LANG = 'zh_CN';
  var GOOG_FIXURL_SITE = 'http://*.xintaonet.com'
</script><script type="text/javascript"
  src="http://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script>
<#include "/site/template/footer.ftl">