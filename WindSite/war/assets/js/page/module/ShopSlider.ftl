<div class="shop-slider">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd" data-lazy="false">
		<#if pics??&&pics?size!=0>
		<#if 'taobao'==slider>
		<!--淘宝首页卡盘效果-->
		<div class="slider-promo J_Slider J_TWidget" style="height:${height}px;">
			<ul class="lst-main ks-switchable-content">
				<#list pics as s><li style="height:${height}px;"><a href="${s.href}" target="_blank"><img src="${s.pic}" alt="${s.title}"></a></li></#list>
			</ul>
			<ul class="lst-trigger"><#list pics as s><li class="<#if s_index==0>current</#if>">${s_index+1}</li></#list></ul>
		</div>
		<#elseif 'youa'==slider>
		<!--有啊首页卡盘效果-->
		 <div class="yslider-stage J_Slider J_TWidget"> 
        	<p><a href="http://co.youa.baidu.com/content/promo/zhongjimiaoshazong/index.html" target="_blank"><img width="405" height="220" alt="终极秒杀场" src="http://co.youa.baidu.com/picture/r/image/2009-12-25/236d430f443d05925ad7291d9ad6b560.jpg"/></a></p>  
   		 </div> 
	     <ul class="yslider-stick"> 
	         <li class="selected"><a href="http://co.youa.baidu.com/content/promo/xmas09/index.html?c=740" target="_blank">年终风暴</a></li> 
	     </ul>
	     <#elseif 'carousel'==slider>
	     <!--旋转木马效果-->
	     <div class="scroller"> 
        	 <div class="ks-switchable-content"> 
            	<img alt="" src="http://farm1.static.flickr.com/143/321464099_a7cfcb95cf_t.jpg"/> 
        	</div> 
        	<ul class="ks-switchable-nav"> 
            	<li class="ks-active">&bull;</li> 
        	</ul> 
    	 </div>
    	 <#elseif 'tudou'==slider>
    	 <!--土豆今日焦点效果-->
	      <div class="c"> 
	        <div class="pic loading"> 
	            <ul class="pic-list"> 
	                <li><a href="#"><img alt="" src="http://at-img4.tdimg.com/board/2010/1/2235.jpg"/></a></li> 
	            </ul> 
	        </div> 
	        <div class="txt"> 
	            <ul class="desc-list"> 
	                <li style="display: block"> 
	                    <h4><a title="《神话》热播 第05集21:10分上线" target="_blank" href="http://www.tudou.com/home/_53991369">《神话》热播 第05集21:10分上线</a></h4> 
	                    <p>秦代的刑场上，一个身着奇装异服的年轻人从天而降，众将士议论纷纷，不敢近前，不知是叛贼来劫法场，还是神仙妖孽下凡……</p> 
	                </li> 
	            </ul> 
	            <ul class="thumbs-list"> 
	                <li class="current"><img alt="" width="84" height="62" src="http://at-img4.tdimg.com/board/2010/1/%CA%D7%D2%B3%BD%B9%B5%E3%CD%BCs.jpg"/></li> 
	            </ul> 
	        </div> 
	     </div>
		</#if>
		</#if>
	</div>
</div>