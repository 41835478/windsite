<div class="form-box">	
    <form name="config" id="form1" action="<?php echo URL('mgr/page_manager.doEditComponent', array('page_id'=>$page_id));?>" method="post">
		<input type="hidden" name="pmId" value="<?php echo $pmId ?>" />
		<?php $source1=$data['param']['source']==1?true:false;?>
		<div class="form-row">
		    <label class="form-field">标题</label>
		    <div class="form-cont">
		        <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:40,min:4,m:范围2-20个汉字,ww" warntip="#titleErr" name="data[title]" value="<?php echo V('r:title', F('escape', $data['title'])); ?>"/>
		        <span class="tips-error hidden" id="titleErr"></span>
		    </div>
		</div>
		 <div class="form-row">
			  <label class="form-field">数据来源</label>
			  <div class="form-cont">
			  	  <p class="input-item">
					  <label for="source_get1">
						  <input class="r" type="radio" value="1" <?php if ($source1){ echo ' checked '; }?>  name="param[source]" onclick="javascript:$('#form1 .source0').addClass('hidden');$('#form1 .source1').removeClass('hidden');" id="source_get1">自动搜索
					  </label>
					  <label for="source_get2">
						  <input class="r" type="radio" disabled value="0" <?php if (!$source1){ echo ' checked '; }?> name="param[source]" onclick="javascript:$('#form1 .source1').addClass('hidden');$('#form1 .source0').removeClass('hidden');" id="source_get2">店铺分组
					  </label>
				  </p>
			  </div>
		</div>
		<div class="form-row source1<?php if (!$source1){ echo ' hidden'; }?>">
			<label class="form-field">关键词</label>
		    <div class="form-cont">
		         <input class="input-txt w130" type="text" warntip="#keywordErr" name="param[keyword]" value="<?php echo $data['param']['keyword'];?>">
		         <span class="tips-error hidden" id="keywordErr"></span>
		         <p class="form-tips">(搜索店铺的关键词，关键词，店铺分类必选一)</p>
		    </div>
		</div>
		<div class="form-row source1<?php if (!$source1){ echo ' hidden'; }?>">
		    <label class="form-field">店铺分类</label>
		    <div class="form-cont">
		        <select name="param[cid]" id="J_ParamCid" data-value="<?php echo $data['param']['cid'];?>">
					<option selected="" value="">请选择分类</option>
					<option value="1020">母婴用品/奶粉/孕妇装</option><option value="1040">ZIPPO/瑞士军刀/饰品/眼镜</option><option value="1041">移动联通充值中心/IP长途</option><option value="1042">网店装修/物流快递/图片存储</option><option value="1043">笔记本电脑</option><option value="1044">品牌手表/流行手表</option><option value="1045">户外/军品/旅游/机票</option><option value="1046">家用电器/hifi音响/耳机</option><option value="1047">鲜花速递/蛋糕配送/园艺花艺</option><option value="1048">3C数码配件市场</option><option value="1049">床上用品/靠垫/窗帘/布艺</option><option value="1050">家具/家具定制/宜家代购</option><option value="1051">保健品/滋补品</option><option value="1052">网络服务/电脑软件</option><option value="1053">演出/旅游/吃喝玩乐折扣券</option><option value="1054">饰品/流行首饰/时尚饰品</option><option value="1055">女士内衣/男士内衣/家居服</option><option value="1056">女鞋</option><option value="1062">童装/婴儿服/鞋帽</option><option value="1082">流行男鞋/皮鞋</option><option value="11">电脑硬件/台式机/网络设备</option><option value="1102">腾讯QQ专区</option><option value="1103">IP卡/网络电话/在线影音充值</option><option value="1104">个人护理/保健/按摩器材</option><option value="1105">闪存卡/U盘/移动存储</option><option value="1106">运动鞋</option><option value="1122">时尚家饰/工艺品/十字绣</option><option value="1153">运动服</option><option value="1154">服饰配件/皮带/帽子/围巾</option><option value="12">MP3/MP4/iPod/录音笔</option><option value="13">手机</option><option value="14">女装/流行女装</option><option value="15">彩妆/香水/护肤/美体</option><option value="16">电玩/配件/游戏/攻略</option><option value="17">数码相机/摄像机/图形冲印</option><option value="18">运动/瑜伽/健身/球迷用品</option><option value="20">古董/邮币/字画/收藏</option><option value="21">办公设备/文具/耗材</option><option value="22">汽车/配件/改装/摩托/自行车</option><option value="23">珠宝/钻石/翡翠/黄金</option><option value="24">居家日用/厨房餐饮/卫浴洗浴</option><option value="26">装潢/灯具/五金/安防/卫浴</option><option value="27">成人用品/避孕用品/情趣内衣</option><option value="29">食品/茶叶/零食/特产</option><option value="30">玩具/动漫/模型/卡通</option><option value="31">箱包皮具/热销女包/男包</option><option value="32">宠物/宠物食品及用品</option><option value="33">音乐/影视/明星/乐器</option><option value="34">书籍/杂志/报纸</option><option value="35">网络游戏点卡</option><option value="36">网络游戏装备/游戏币/帐号/代练</option><option value="37">男装</option>
		         </select>
		         <p class="form-tips">(搜索店铺的类别，关键词，店铺分类必选一)</p>
		    </div>
		</div>
		<div class="form-row source1<?php if (!$source1){ echo ' hidden'; }?>">
		    <label class="form-field">掌柜信用</label>
		    <div class="form-cont">从
		        <select name="param[start_credit]" id="J_ParamStartCredit" data-value="<?php echo $data['param']['start_credit'];?>">
		            <option value="5goldencrown" score="20">五黄冠</option>
					<option value="4goldencrown" score="19">四黄冠</option>
					<option value="3goldencrown" score="18">三黄冠</option>
					<option value="2goldencrown" score="17">二黄冠</option>
					<option value="1goldencrown" score="16">一黄冠</option>
					<option value="5crown" score="15">五冠</option>
					<option value="4crown" score="14">四冠</option>
					<option value="3crown" score="13">三冠</option>
					<option value="2crown" score="12">二冠</option>
					<option value="1crown" score="11" selected>一冠</option>
					<option value="5diamond" score="10">五钻</option>
					<option value="4diamond" score="9">四钻</option>
					<option value="3diamond" score="8">三钻</option>
					<option value="2diamond" score="7">二钻</option>
					<option value="1diamond" score="6">一钻</option>
					<option value="5heart" score="5">五心</option>
					<option value="4heart" score="4">四心</option>
					<option value="3heart" score="3">三心</option>
					<option value="2heart" score="2">两心</option>
					<option value="1heart" score="1">一心</option>
		         </select>到
		         <select name="param[end_credit]" id="J_ParamEndCredit" data-value="<?php echo $data['param']['end_credit'];?>">
		            <option value="5goldencrown" score="20" selected>五黄冠</option>
					<option value="4goldencrown" score="19">四黄冠</option>
					<option value="3goldencrown" score="18">三黄冠</option>
					<option value="2goldencrown" score="17">二黄冠</option>
					<option value="1goldencrown" score="16">一黄冠</option>
					<option value="5crown" score="15">五冠</option>
					<option value="4crown" score="14">四冠</option>
					<option value="3crown" score="13">三冠</option>
					<option value="2crown" score="12">二冠</option>
					<option value="1crown" score="11">一冠</option>
					<option value="5diamond" score="10">五钻</option>
					<option value="4diamond" score="9">四钻</option>
					<option value="3diamond" score="8">三钻</option>
					<option value="2diamond" score="7">二钻</option>
					<option value="1diamond" score="6">一钻</option>
					<option value="5heart" score="5">五心</option>
					<option value="4heart" score="4">四心</option>
					<option value="3heart" score="3">三心</option>
					<option value="2heart" score="2">两心</option>
					<option value="1heart" score="1">一心</option>
		         </select>
		    </div>
		</div>
		<div class="form-row source1<?php if (!$source1){ echo ' hidden'; }?>">
		    <label class="form-field">佣金比例</label>
		    <div class="form-cont">
				<p class="input-item">
					从<input class="input-txt w30" type="text" name="param[start_commissionrate]" vrel="bt=min:0,max:50,m:范围为0-50|int=m:只能输入数字" warntip="#commissionrateErr" value="<?php echo $data['param']['start_commissionrate'];?>">%&nbsp;&nbsp;
					到<input class="input-txt w30" type="text" name="param[end_commissionrate]" vrel="bt=min:0,max:50,m:范围为0-50|int=m:只能输入数字" warntip="#commissionrateErr" value="<?php echo $data['param']['end_commissionrate'];?>">%
					<span id="commissionrateErr" class="tips-error hidden"></span>
				</p>
				<p class="form-tips">(设置范围0至50之间)</p>
			</div>
		</div>
		<div class="form-row source0<?php if ($source1){ echo ' hidden'; }?>">
		    <label class="form-field">店铺分组</label>
		    <div class="form-cont">
		        <select name="param[group]" data-value="<?php echo $data['param']['group'];?>">
					<option selected="" value="">请选择分组</option>
		         </select>
		    </div>
		</div>
		<div class="form-row source0<?php if ($source1){ echo ' hidden'; }?>">
		    <label class="form-field">排序方式</label>
		    <div class="form-cont">
		        <select name="param[sort_order]" data-value="<?php echo $data['param']['sort_order'];?>">
					<option selected="" value="sort_order">默认</option>
					<option value="commission_rate">佣金从高到低</option>
					<option value="seller_credit">信用从高到低</option>
		        </select>
		    </div>
		</div>