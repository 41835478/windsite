<div style="width:650px;margin-left:50px;" align=center>
请输入广告联盟代码：
<textarea id="shop-union-textarea" style="width: 98%; height: 200px">
<#if 'google'==union_type>
<#if client??&&slot??&&width??&&height??>
<script type="text/javascript">
google_ad_client = "${client}";
google_ad_slot = "${slot}";
google_ad_width = ${width};
google_ad_height = ${height};
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</#if>
<#elseif 'baidu'==union_type>
<#if cpro_id??&&''!=cpro_id>
<script type="text/javascript">
var cpro_id = '${cpro_id}';
</script>
<script src="http://cpro.baidu.com/cpro/ui/c.js" type="text/javascript"></script>
</#if>
<#elseif 'alimama'==union_type>
<#if pid??>
<script type="text/javascript">
alimama_pid="${pid}";
<#if type??&&type!=''>
alimama_titlecolor="${titlecolor!'0000FF'}"; 
alimama_descolor ="${descolor!'000000'}"; 
alimama_bgcolor="${bgcolor!'FFFFFF'}"; 
alimama_bordercolor="${bordercolor!'E6E6E6'}"; 
alimama_linkcolor="${linkcolor!'008000'}"; 
alimama_bottomcolor="${bottomcolor!'FFFFFF'}"; 
alimama_anglesize="${anglesize!'0'}"; 
alimama_bgpic="${bgpic!'0'}"; 
alimama_icon="${icon!'0'}"; 
alimama_sizecode="${sizecode!'14'}";
alimama_type=${type};
</#if> 
alimama_width=${width}; 
alimama_height=${height}; 
</script>
<script src="http://a.alimama.cn/inf.js" type="text/javascript"> 
</script>
</#if>
</#if>
</textarea>
<@ws.help>
<h3><a href="http://forum.xintaonet.com/viewthread.php?tid=697&extra=page%3D1" target="_blank">如何添加Google Adsense广告？</a></h3>
<h3><a href="http://forum.xintaonet.com/viewthread.php?tid=698&extra=page%3D1" target="_blank">如何添加淘宝联盟广告？</a></h3>
</@ws.help>
</div>