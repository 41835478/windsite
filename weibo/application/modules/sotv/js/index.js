//$LAB.script('');
(function(){
    var param = {
        'api_key' : '4a62c00db90213d0f54115e0b3ab5535'
    };
    var playUrl = 'http://open.tv.sohu.com/play.do?api_key='+param.api_key+'&vid=';
    var generateHTML = function(data,type,c){
        if(!data) return;
        var len = data.length,arr=[],i=0,d;
        if(type=='a1'){
            for(; i<len; i++){
                d = data[i];
                arr.push('<li><a href="',playUrl,d.vid,'" target="_blank"><img '
                    ,'width="149" height="92" alt="',d.tv_name,'" src="',
                    d.ver_small_pic,'" /></a><span><strong><a href="',
                    playUrl,d.vid,'" target="_blank">',d.tv_name,'</a></strong>'
                    ,d.tv_desc,'</span></li>');
            }
        }else if(type=='a2'){
            for(; i<len; i++){
                d = data[i];
                arr.push('<li><a href="',playUrl,d.vid,'" target="_blank"><img '
                    ,'width="105" height="145" alt="',d.tv_name,'" src="',
                    d.ver_small_pic,'" /></a><span><strong><a href="',
                    playUrl,d.vid,'" target="_blank">',d.tv_name,'</a></strong>'
                    ,d.tv_desc,'</span></li>');
            }
        }else if(type=='a3'){
            for(; i<len; i++){
                d = data[i];
                var a3Url = c ? 'album.html?vid='+d.vid : playUrl+d.vid;
                arr.push('<li><a href="',a3Url,'" target="_blank"><img '
                    ,'width="105" height="78" alt="',d.tv_name,'" src="',
                    d.ver_small_pic,'" /></a><span><strong><a href="',
                    playUrl,d.vid,'" target="_blank">',d.tv_name,'</a></strong>'
                    ,d.tv_desc,'</span></li>');
            }
        }else if(type=='b1'){
            for(; i<len; i++){
                var j=0;
                d = data[i];
                arr.push('<div class="list clear"><h3>',d.cateName,'</h3><ul>');
                for(; j<d.cateValues.length; j++){
                    var searchUrl = ['search.html?type=1&c=',c
                        ,'&tvType=',d.cateAlias == 'tvType' ? (d.searchKeys[j]) : ''
                        ,'&cat=',d.cateAlias == 'cat' ? (d.searchKeys[j]) : ''
                        ,'&area=',d.cateAlias == 'area' ? (d.searchKeys[j]) : ''
                        ,'&year=',d.cateAlias == 'year' ? d.searchKeys[j] : ''].join('');

                    arr.push('<li><a href="',searchUrl,'" target="_blank">',d.cateValues[j],'</a></li>');
                }
                arr.push('</ul></div>');
            }
        }else if(type=='c1'){
            for(; i<len; i++){
                d = data[i];
                var c1Url = c ? 'album.html?sid='+d.sid : playUrl+d.vid;
                arr.push('<li><span class="grade"><strong>',parseFloat(d.tv_score||0.0).toFixed(1)
                    ,'</strong>' ,d.tv_all_count||0,'</span><em class="colorA">'
                    ,i+1,'</em><a href="' ,c1Url,'" title="',d.tv_name
                    ,'" target="_blank">',d.tv_name,'</a></li>');
            }
        }
        return arr;
    }
$(function(){
    //取日期
    var date = new Date();
    var weekIndex = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    $('#dateId').html( date.toLocaleDateString()+' '+ weekIndex[date.getDay()] );
    //焦点新闻
    $.getJSON('http://api.tv.sohu.com/news/focus.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = [];
            for(var i=0; i<data.length; i++){
                if(i===0){
                    html.push('<div class="fi03"><a href="',playUrl,data[i].vid
                        ,'" target="_blank"><img width="359px" height="269" '
                        ,'alt="',data[i].tv_name,'"src="',data[i].ver_small_pic
                        ,'" /></a></div><div class="news clear"><h1 class="'
                        ,'color1"><a href="',playUrl,data[i].vid
                        ,'" target="_blank">',data[i].tv_name,'</a></h1>');
                }else{
                    html.push('<p>[<a href="',playUrl,data[i].vid
                        ,'" target="_blank">',data[i].tv_name,'</a>]</p>');
                }
            }
            html.push('</div>');
            $('#newsHot').html(html.join(''));
        });
    //每日推荐新闻
    $.getJSON('http://api.tv.sohu.com/news/recommend.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'a1');
            $('#newsRecommend').html( html.join('') );
        });
    //电影分类推荐
    $.getJSON('http://api.tv.sohu.com/movie/recommend.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'a2');
            $('#movieRecommend').html( html.join('') );
        });
    //电视剧分类推荐
    $.getJSON('http://api.tv.sohu.com/teleplay/recommend.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'a3',true);
            $('#teleRecommend').html( html.join('') );
        });
    //综艺分类推荐
    $.getJSON('http://api.tv.sohu.com/zongyi/recommend.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'a3');
            $('#zongyiRecommend').html( html.join('') );
        });
    //电影分类导航
    $.getJSON('http://api.tv.sohu.com/movie/category.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.categorys;
            var html = generateHTML(data,'b1','1');
            $('#movieCate').html( html.join('') );
        });
    //电视剧分类导航
    $.getJSON('http://api.tv.sohu.com/teleplay/category.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.categorys;
            var html = generateHTML(data,'b1','2');
            $('#teleCate').html( html.join('') );
        });
    //综艺分类导航
    $.getJSON('http://api.tv.sohu.com/zongyi/category.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.categorys;
            var html = generateHTML(data,'b1','7');
            $('#zongyiCate').html( html.join('') );
        });
    //电影排行榜
    $.getJSON('http://api.tv.sohu.com/movie/top/views/daily.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1');
            $('#movieDaily').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/movie/top/views/weekly.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1');
            $('#movieWeekly').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/movie/top/views/monthly.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1');
            $('#movieMonthly').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/movie/top/views/all.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1');
            $('#movieAll').html( html.join('') );
        });
    sohuHD.switchTab( $('#tab_movieTop>li'), {
        boxs : $('#box_movieTop>ul')
        ,'event' : 'mouseover'
        ,cssName : 'now'
        ,start : 0
    });					
    //电视剧排行榜
    $.getJSON('http://api.tv.sohu.com/teleplay/top/views/daily.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1',true);
            $('#teleDaily').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/teleplay/top/views/weekly.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1',true);
            $('#teleWeekly').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/teleplay/top/views/monthly.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1',true);
            $('#teleMonthly').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/teleplay/top/views/all.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1',true);
            $('#teleAll').html( html.join('') );
        });
    sohuHD.switchTab( $('#tab_teleTop>li'), {
        boxs : $('#box_teleTop>ul')
        ,'event' : 'mouseover'
        ,cssName : 'now'
        ,start : 0
    });					
    //综艺排行榜
    $.getJSON('http://api.tv.sohu.com/zongyi/top/views/daily.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1');
            $('#zongyiDaily').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/zongyi/top/views/weekly.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1');
            $('#zongyiWeekly').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/zongyi/top/views/monthly.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1');
            $('#zongyiMonthly').html( html.join('') );
        });
    $.getJSON('http://api.tv.sohu.com/zongyi/top/views/all.json?callback=?'
        ,param
        ,function(result){
            var data = result.data.videos;
            var html = generateHTML(data,'c1');
            $('#zongyiAll').html( html.join('') );
        });
    sohuHD.switchTab( $('#tab_zongyiTop>li'), {
        boxs : $('#box_zongyiTop>ul')
        ,'event' : 'mouseover'
        ,cssName : 'now'
        ,start : 0
    });					
});
})(jQuery);

