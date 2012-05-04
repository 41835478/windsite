<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<title>添加推广组商品-新淘网</title>
</@ws.header>
<script>
$(function() {
$('#items-group-items').tabs({select:function(){$('#selected-items-warn').css('left',-150).css('top',50);$('#single-info').hide();}});
});
</script>
<script type="text/javascript" src="/assets/js/site/itemgroupitems.js"></script>
<style>
.selectableImg{
	border: 1px solid #A1D6FF;
	border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	border-top-color: #A1D6FF;
	border-right-color: #A1D6FF;
	border-bottom-color: #A1D6FF;
	border-left-color: #A1D6FF;
}
.selectable .ui-selecting { background: #FECA40; }
.selectable .ui-selected { background: #F39814; color: white; }
.selectable { list-style-type: none; margin: 0; padding: 0; }
.selectable li { margin: 3px; padding: 1px; float: left; width: 60px; height: 60px; font-size: 4em; text-align: center;cursor: pointer; }
</style>
<div class="wind-header">
添加商品到推广组(<a href="/router/member/view/personal?goto=itemGroups&gid=${group.id}" style="color: #0065FF;">${group.name}</a>)
</div>
<div style="height:5px;"></div>
<#include "/site/template/search.ftl">
<#include "/site/template/footer.ftl">