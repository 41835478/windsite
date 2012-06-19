<style>
.get_codeing {display: inline;float: left;margin-left: 40px;padding-top: 10px;}
.tip-ok {background: url(http://static.xintaonet.com/assets/images/icon-tip-ok.png) no-repeat 0% 50%;color: #004425;padding-left: 20px;}
.dialog-bd-tip {background-color: #FFFDC1;border-bottom: 1px solid #E6A200;line-height: 20px;padding: 5px 10px;}
.get_codeing h3 {font-size: 14px;}textarea {font-family: arial;font-size: 10px;padding: 2px;}.get_codeing .get_codeing_but {position:relative;margin-bottom: 2px;text-align:left;height:50px;}
.get_codeing_but button {right:0px;position:absolute;cursor: pointer;line-height: 20px;margin: 10px 0px;padding: 0px;width: 120px;bottom:0px;}
.get_codeing_but span{color:red;positon:absolute;}
</style>
<div class="dialog-bd-tip"><span class="tip-ok" >提示：您可以复制以下代码进行推广</span><div class="clearing"></div></div>
<div class="get_codeing">
<h3>新淘网推广链接代码：</h3>
<textarea style="width:500px;height:100px;" id="xt_code" readonly="readonly" onclick="this.select();">${widget.content}</textarea>
<div class="get_codeing_but"><span>推荐使用新淘网推广链接，可以准确统计推广点击。适用范围:屏蔽了淘客链接的博客，空间，论坛...</span><button id="btn_get_xt_url" onClick="copyToClipBoard($('#xt_code'))">复制代码</button></div>
<h3>淘宝联盟推广链接代码：</h3>
<textarea style="width:500px;height:100px;" id="mama_code" readonly="readonly" onclick="this.select();">${widget.tbContent}</textarea>
<div class="get_codeing_but"><span>适用范围:淘宝旗下网站，如淘宝帮派，社区，淘江湖...(该系列网站不允许外链，只支持淘宝链接)</span><button id="btn_get_mama_url" onClick="copyToClipBoard($('#mama_code'))">复制代码</button></div>
</div>