<style>
#addLinkWizard {font-size:12px;width:750px;height:550px;overflow-x:hidden;position:relative;}  
#addLinkWizard .items {width:20000em;clear:both;position:absolute;}
#addLinkWizard .step {padding:20px 30px;width:680px;float:left;}
#addLinkWizard h2,#addLinkWizard h2 strong {color:#5DAE40;font-weight:bold;border-bottom:1px dotted #ccc;font-size:17px;padding-bottom:5px;}
#addLinkWizard h2 em {display:block;font-size:14px;color:#666;font-weight:normal;margin-top:5px;}
#addLinkWizard ul {padding:0px !important;margin:0px !important;}
#addLinkWizard .firstStep li {list-style-type:none;list-style-image:none;margin-bottom:25px;}
#addLinkWizard .firstStep li label{color:#f60;font-weight:bold;}
#addLinkWizard label {font-size:15px;display:block;cursor:pointer;}#addLinkWizard label strong {color:#789;	position:relative;top:-1px;}
#addLinkWizard label em {font-size:11px;color:#666;	font-style:normal;font-weight:normal}#addLinkWizard .text {width:100%;padding:5px;border:1px solid #ccc;color:#456;letter-spacing:1px;}
#addLinkWizard select {border:1px solid #ccc;padding:4px;}
#addLinkWizard label span {color:#b8128f;font-weight:bold;position:relative;top:4px;font-size:20px;}#addLinkWizard .double label {width:50%;float:left;}#addLinkWizard .double .text {width:93%;}
#addLinkWizard .clearfix {clear:both;padding-top:10px;}#addLinkWizard .right {float:right;}
#addLinkWizard #status {border: 1px solid #8AB78A;margin:0px !important;height:35px;background:#F0F5F9;padding-left:25px !important;}#status li {list-style-type:none;list-style-image:none;float:left;color:#414141;padding:10px 30px;}#status li.active {background-color:#5DAE40;color:#fff;font-weight:bold;}
.button{background: url(/assets/images/btn_bg.gif) no-repeat 0px 0px;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 25px;line-height: 25px;text-align: center;width: 80px;background-position: 0px 0px;}
.linkTable ul li {margin-bottom:0px;float: left;border: 1px solid #AAA;float: left;cursor: pointer;margin-right: 15px;margin-top: 5px;overflow: hidden;width: 200px;height: 54px;}input.customechecked {position: absolute;right: 0px;bottom: 0px;cursor: pointer;}.linkTable .item,.linkTable .item {float: right;width: 140px;position: relative;}
.linkTable ul li .title a{line-height:12px;height:12px;overflow: hidden;white-space: nowrap;}
.linkTable .item .k,.linkTable .item .k {color: #274F80;font-weight: bold;}.linkTable .item .v,.linkTable .item .v {color: #F60;font-weight: bold;}.linkTable .item div,.linkTable .item div {height: 18px;overflow: hidden;width: 130px;}.linkTable .pic,.linkTable .pic {width: 52px;height: 52px;float: left;}.linkTable .pic img,.linkTable .pic img {max-width: 50px;max-height: 50px;width: 50px;height: 50px;cursor: pointer;vertical-align: middle;}
.nav_pager {background: #EEE;border-top: 1px solid #999;padding: 5px;}.nav_pager a {padding: 0px 5px;color: #005BD8;}.nav_pager a.highlight {zoom: 1;color: black;font-weight: bold;}
.ui-selecting{background: #FECA40;}.ui-selected{background: #F39814;}
</style>
<script language="javascript" type="text/javascript" src="/assets/min/js/link.min.js?v=${dateVersion()}"></script>
<script>
var PID='${USER.pid}';
$(function(){
	initAddLink();
});
</script>
