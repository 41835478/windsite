/*key:全文搜索关键字
    api_key：激活使用后分配的AppKey，调用接口时候代表应用的唯一身份
    c:频道标识：1-电影；2-电视剧；16-动漫；8-纪录片；7-综艺；13-新闻资讯；0-其它（默认为全部）
    page:当前页数
    pageSize:每页显示记录数（默认20，最大50）

    tvType:类型，例如：“正片”
    cat：影片分类，例如：“言情剧”
    area:区域，例如：“内地”
    year:年份，例如：“2011”
*/
sohuHD.apiKey = '4a62c00db90213d0f54115e0b3ab5535';
$(function(){
    sohuHD.c = $(document).getUrlParam('c') || '';
    $('#searchTypeName').html($('#c'+sohuHD.c).addClass('now').text());
    sohuHD.tvType = decodeURI($(document).getUrlParam('tvType') || '-2');
    sohuHD.cat = decodeURI($(document).getUrlParam('cat') || '');
    sohuHD.area = decodeURI($(document).getUrlParam('area') || '');
    sohuHD.year = $(document).getUrlParam('year') || '';

    if(sohuHD.c || sohuHD.cat || sohuHD.area || sohuHD.year)
        $('#tagSearchBar').show();
        //$('#tagSearchList,#tagSearchBar').show();
    else
        $('#keySearchBar').show();
        //$('#keySearchList,#keySearchBar').show();

    sohuHD.index = 1;
    sohuHD.pageSize = 20;

    sohuHD.searchUrl = 'http://api.tv.sohu.com/search.json';
    sohuHD.getSearch();

    //init page nav event
    $('#bottomPageBar').eventProxy('click',{
        hasTag : {
            'a' : function(){
                switch(this.rel){
                    case 'prev':
                        --sohuHD.index;
                    break;
                    case 'next':
                        ++sohuHD.index;
                    break;
                    default:
                        sohuHD.index = parseInt(this.innerHTML);
                    break;
                }
                if(sohuHD.index < 0) sohuHD.index = 0;
                if(sohuHD.index > sohuHD.count) sohuHD.index = 0;
                sohuHD.getSearch()
            }
        }
    });

    sohuHD.initTagSearch();
    //展开收起
    $('#shid').click(function(){
        if(this.className == 'shLay'){
            this.className = 'hdLay';
            $('#seaKey').hide();
        }
        else{
            this.className = 'shLay';
            $('#seaKey').show();
        }
    });
});
sohuHD.initTagSearch = function(){
    var filmType = {
        '1' : 'movie'
        ,'2' : 'teleplay'
        ,'7' : 'zongyi'
    };
    var tagCode = sohuHD.c;
    var tagType = filmType[tagCode];
    if(tagType){
        $.getJSON('http://api.tv.sohu.com/'+tagType+'/category.json?api_key='+sohuHD.apiKey+'&callback=?'
            ,function(result){
                var data = result.data.categorys;
                var alias = '';
                var len = data.length,arr=[],i=0,d;
                for(var i=0; i<len; i++){
                    d = data[i];
                    alias = sohuHD[d.cateAlias];
                    arr.push('<ul><li><span>',d.cateName,'</span></li>');
                    for(var j=0; j<d.cateValues.length; j++){
                        arr.push('<li ',(alias == d.searchKeys[j]) ? ' class="now"' : '','>'
                            ,'<a href="javascript:void(0);'
                                //,['search.html?type=1&c=',tagCode
                                //,'&tvType=',d.cateAlias == 'tvType' ? d.searchKeys[j] : ''
                                //,'&cat=',d.cateAlias == 'cat' ? d.searchKeys[j] : ''
                                //,'&area=',d.cateAlias == 'area' ? d.searchKeys[j] : ''
                                //,'&year=',d.cateAlias == 'year' ? d.searchKeys[j] : ''].join('')
                            ,'" rel="',d.cateAlias,'" rev="',d.searchKeys[j],'">',d.cateValues[j],'</a></li>');
                    }
                    arr.push('</ul></div>');
                }
                $('#seaKey').html(arr.join('')).eventProxy('click',{
                    hasTag : {
                        'a' : function(){
                            sohuHD[this.rel] = this.rev;
                            location.href = ['search.html?key=',sohuHD.key,'&c=',sohuHD.c
                                ,'&tvType=',sohuHD.tvType,'&area=',sohuHD.area,'&year=',sohuHD.year,'&cat=',sohuHD.cat].join('');
                        }
                    }
                });
                arr = null;
                var tags = [];
                $('#seaKey>ul>li.now>a').each(function(i,o){
                    if(o.innerHTML != '全部')
                        tags.push('<li><span>',o.innerHTML,'</span><a rel="',o.rel,'" href="javascript:void(0);"></a></li>');
                });

                $('#hasSearch').html(tags.join('')).eventProxy('click',{
                    hasTag : {
                        'a' : function(){
                            sohuHD[this.rel] = '';
                            location.href = ['search.html?key=',sohuHD.key,'&c=',sohuHD.c
                                ,'&tvType=',sohuHD.tvType,'&area=',sohuHD.area,'&year=',sohuHD.year,'&cat=',sohuHD.cat].join('');
                        }
                    }
                });
            });
    }
};
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
    var i = 1;
    if((index - 1) > 4)
        i = index - 4;
    if((index + 5) < len)
        len = index + 5;
    if(i > 5)
        tmp.push(' ... ');

    for(;i<=len;++i){
        //if(i > 5 && len > (i+7)){
        //    tmp.push(' ... ');
        //    i = len - 2;
        //    continue;
        //}
        if(i == index)
            tmp.push('<span>',i,'</span>');
        else
            tmp.push('<a class="num" href="javascript:void(0);">',i,'</a>');

    }
    if(len < pages)
        tmp.push(' ... ');
    tmp = tmp.join('');
    if(len == 1)
        tmp = ['上一页',tmp,'下一页'];
    else if(index == 1)
        tmp = ['上一页',tmp,'<a class="pa" href="javascript:void(0);" rel="next">下一页</a>'];
    else if(index == len)
        tmp = ['<a class="pa" href="javascript:void(0);" rel="last">上一页</a>',tmp,'下一页'];
    else
        tmp = ['<a class="pa" href="javascript:void(0);" rel="last">上一页</a>',tmp,'<a class="pa" href="javascript:void(0);" rel="next">下一页</a>'];
    return tmp.join('');
};
sohuHD.getSearch = function(){
//http://api.tv.sohu.com/search.json?key=sohu&page=1&pageSize=10&api_key=4a62c00db90213d0f54115e0b3ab5535
//http://api.tv.sohu.com/search.json?key=&page=1&pageSize=10&c=2&cat=言情剧&tvType=正片&area=内地&year=2009&api_key=4a62c00db90213d0f54115e0b3ab5535
//api_key：激活使用后分配的AppKey，调用接口时候代表应用的唯一身份
//key:全文搜索关键字
//c:频道标识：1-电影；2-电视剧；16-动漫；8-纪录片；7-综艺；13-新闻资讯；0-其它（默认为全部）
//page:当前页数
//pageSize:每页显示记录数（默认20，最大50）
//tvType:类型，例如：“正片”
//cat：影片分类，例如：“言情剧”
//area:区域，例如：“内地”
//year:年份，例如：“2011”
//search.html?type=1&c=1&tvType=正片&cat=言情剧&area=内地&year=2011
    var key = decodeURI($(document).getUrlParam('key') || '');
    var reqUrl = [this.searchUrl , '?api_key=',this.apiKey,'&key=',escape(key)];
    if(this.c)
        reqUrl.push('&c=' ,this.c);
    if(this.tvType)
        reqUrl.push('&tvType=' ,this.tvType);
    if(this.cat)
        reqUrl.push('&cat=' ,this.cat);
    if(this.area)
        reqUrl.push('&area=' ,this.area);
    if(this.year)
        reqUrl.push('&year=' ,this.year);

    reqUrl.push('&page=',this.index,'&pageSize=',this.pageSize,'&callback=?');
    reqUrl = reqUrl.join('');
    $('#videoData').html('正在加载...');
    $.getJSON(reqUrl,function(data){
        var tmp = [];
        var count = sohuHD.count = data.data.count;
        var url = '';
        var title = '';
        var actors = '';
        var director = '';
        var tvPrefix = 'album.html?vid=';
        var mvPrefix = 'http://open.tv.sohu.com/play.do?api_key='+sohuHD.apiKey+'&vid=';

        $('#keySearchCount,#tagSearchCount').html(['搜索"<span class="color1">',key || '全部视频','</span>"，共找到',count,'条结果'].join(''));
        $('#totalCount').html(['共有 <span>',count,'</span> 个符合条件的视频'].join(''));
        if(data.status == 200){
            videos = data.data.videos || [];
            for(var i=0;i<videos.length;++i){
                if(videos[i].cid == '2')
                    url = tvPrefix + videos[i].vid;
                else
                    url = mvPrefix + videos[i].vid;
                title = videos[i].tv_name;
                if(i%4==0)
                    tmp.push('<div class="vData clear">');
                tmp.push(
                    '<div class="vInfo">'   
                        ,'<div class="vPic">'
                            ,'<a target="_blank" href="',url,'" title="',title,'">'
                                ,'<img width="120" alt="',title,'" src="',videos[i].video_big_pic,'" />'
                            ,'</a>'
                            ,'<div class="label"><i></i><em>',videos[i].tip,'</em></div>'
            //                //独家
            //                ,videos[i].only ? '<div class="only"></div>' : ''
            //                //付费
            //                ,videos[i].fee ? '<div class="payPos"></div>' : ''
                        ,'</div>');
                tmp.push('<div class="vTxt"><h4><a target="_blank" href="',url,'" title="',title,'">',title,'</a></h4>');
                actors = videos[i].main_actor || '';
                actors = actors.replace(/;/g,'</em> <em>');
                if(actors)
                    tmp.push('<p><span>主演：</span><em>',actors,'</em></p>');

                director = videos[i].director || '';
                director = director.replace(/;/g,'</em> <em>');
                if(director)
                    tmp.push('<p><span>导演：</span><em>',director,'</em></p>');
                //,'<p>总播放:<em>14,302,730次</em></p>'
                tmp.push('</div></div>');

                if(i%4==3)
                    tmp.push('</div>');
            }
            $('#videoData').html(tmp.join(''));
            tmp = null;
            $('#bottomPageBar').html(sohuHD.getPageBar(count));
        }
        else{
        }
    });
};

