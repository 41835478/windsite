<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>博客软文推广-淘客推广-我是淘客-新淘网</title>
</@ws.header>

<script src="http://www.google.com/jsapi?key=ABQIAAAAvSOzENpRULuFe9e7_S4qtRR1u0DYb-A6v-9Nxx35LT73EOctcxTYaD9BAPhK0T6QA8bHOKg0Q-8wCQ" type="text/javascript"></script>
<script language="Javascript" type="text/javascript">
  var searchControl;
  google.load('search', '1.0');      
  function OnLoad() {
    searchControl = new google.search.SearchControl();
    searchControl.addSearcher(new google.search.BlogSearch());
    searchControl.addSearcher(new google.search.NewsSearch());
    searchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);
    var drawOptions = new google.search.DrawOptions();
    drawOptions.setDrawMode(google.search.SearchControl.DRAW_MODE_TABBED);
    searchControl.draw(document.getElementById("items-result"), drawOptions);
  }
  google.setOnLoadCallback(OnLoad, true);
</script> 
<style>
.gsc-control{width:700px;}input.gsc-input{font-size:14px;line-height:20px;height:25px;}.gsc-search-button,.gsc-tabHeader,.gs-title{font-size:14px;cursor:pointer;}
</style> 
<!--<script src="/assets/js/site/advanceblogs.js?v=${dateVersion()}" type="text/javascript"></script>-->
<@xt.taoketemplate navselected='taoke' bdselected='taoke-blogs' group=3>
<div id="items-result"></div>
</@xt.taoketemplate>
