sohuHD.apiKey = '4a62c00db90213d0f54115e0b3ab5535';
sohuHD.index = 1;
sohuHD.pageSize = 20;
sohuHD.getPageBar = function(count){
    var index = sohuHD.index;
    var pageSize = sohuHD.pageSize;
    var pages = 0;
    if ((count % pageSize) == 0) {
        pages = count / pageSize;
    }
    else {
        pages = parseInt(count / pageSize + 1);
    } 
    var tmp = [];
    var len = pages;
    for(var i=0;i<len;++i){
        if(i != (len-1))
            tmp.push('<a javascript="void:(0);" rel="',i+1,'">',i*pageSize+1,'-',(i+1)*pageSize,'</a>');
        else
            tmp.push('<a javascript="void:(0);" rel="',i+1,'">',i*pageSize+1,'-',count,'</a>');
    }
    return tmp.join('');
};
sohuHD.showAlbumInfo = function(data){
    _e(data);
    var url = 'http://open.tv.sohu.com/play.do?vid='+data.vid;
    var tmp = [
        '<div class="title"><div class="l"><strong>',data.tv_name,'</strong></div></div>'
        ,'<div class="info clear">'
            ,'<div class="l">'
                ,'<a target="_blank" href="',url,'" ><img src="',data.ver_big_pic,'" width="120" /></a>'
            ,'</div>'
            ,'<div class="r">'
                ,'<dl><dt>年份: <span>',data.tv_year,'</span></dt>'
                    ,'<dt>类型: <span>',data.tv_cont_cats.replace(/;/g,'</span> <span>'),'</span></dt></dl>'
                ,'<dl><dt>导演: <span>',data.director.replace(/;/g,'</span> <span>'),'</span></dt>'
                    ,'<dt>主演: <span>',data.main_actor.replace(/;/g,'</span> <span>'),'</span></dt></dl>'
                ,'<p>'
                    ,'<span style="display:none" id="infoL">',data.tv_desc,'</span>'
                    ,'<span id="infoS">',sohuHD.strSub(data.tv_desc,320,'...'),'</span>'
                    ,'<span class="shTxt"><a id="infoC" href="javascript:void(0)">展开全部</a></span>'
                ,'</p>'
                ,'<h5><a href="',url,'" target="_blank" class="playBtn">全部播放</a></h5>'
            ,'</div>'
        ,'</div>'
    ].join('');
    $('#infoId').html(tmp);
    $('#infoC').click(function(){
        if(this.innerHTML == '收起全部'){
            $('#infoL').hide();
            $('#infoS').show();
            this.innerHTML = '展开全部';
        }
        else{
            $('#infoL').show();
            $('#infoS').hide();
            this.innerHTML = '收起全部';
        }
    });
    tmp = null;
};
sohuHD.getAlbumList = function(){
    $('#similarLists>ul').html('<li>正在加载数据...</li>');
    var sid = sohuHD.sid;
    var count = 0;
    $.getJSON('http://api.tv.sohu.com/set/list/'+sid+'.json?api_key='+sohuHD.apiKey
        +'&pageSize='+sohuHD.pageSize+'&page='+sohuHD.index+'&callback=?',function(data){
        count = data.data.count;
        data = data.data.videos || [];
        var len = data.length;
        var tmp = [];
        var url = '';
        var tv_name = '';
        var transTime = sohuHD.transPlayTime;
        for(var i=0;i<len;++i){
            tv_name = data[i].tv_name;
            url = 'http://open.tv.sohu.com/play.do?vid='+data[i].vid;
            if(i%4==0) tmp.push('<ul style="overflow:hidden;">');
            tmp.push('<li>'
                ,'<a href="',url,'" target="_blank">'
                ,'<img width="120" height="90" src="',data[i].video_big_pic,'" alt="',tv_name,'" />'
                ,'</a>'
                ,'<span>'
                    ,'<a href="',url,'" target="_blank">',tv_name,'</a>'
                    ,'<em>时长：',transTime(data[i].time_length),'</em>'
                ,'</span>'
            ,'</li>');
            if(i%4==3) tmp.push('</ul>');
        }
        $('#similarLists').html(tmp.join(''));
        $('#tagsID').html(sohuHD.getPageBar(count)).find('a:last').css('backgroundImage','none');
    });
};
$(function(){
    sohuHD.sid = $(document).getUrlParam('sid');
    if(!sohuHD.sid){
        sohuHD.vid = $(document).getUrlParam('vid');
        $.getJSON('http://api.tv.sohu.com/set/info/v/'+sohuHD.vid+'.json?api_key='+sohuHD.apiKey+'&callback=?'
            ,function(data){
                sohuHD.sid = data.data.sid;
                sohuHD.getAlbumList();
                data.data.vid = sohuHD.vid;
                sohuHD.showAlbumInfo(data.data);
            });
    }
    else{
        sohuHD.getAlbumList();
        $.getJSON('http://api.tv.sohu.com/set/info/'+sohuHD.sid + '.json?api_key='+sohuHD.apiKey+'&callback=?'
            ,function(data){
                sohuHD.showAlbumInfo(data.data);
            });
    }
    $('#tagsID').eventProxy('click',{
        hasTag : {
            'a' : function(){
                sohuHD.index = this.rel;
                sohuHD.getAlbumList();
            }
        }
    });
});
