<?php
/*****************************************************
 * 搜狐视频开放平台PHP5客户端
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************/

/*
 * 视频类
 */
class Video{
	/**
	 * 视频ID
	 */
	public $vid;
	public $tv_ver_id;
	/**
	 * 专辑ID
	 */
	public $sid;

	/**
	 * 视频标题
	 */
	public $tv_name;

	/**
	 * 视频描述
	 */
	public $tv_desc;

	/**
	 * 播放地址
	 */
	public $tv_url;


	/**
	 * 视频类型 eg:喜剧片、动作片
	 */
	public $tv_cont_cats;

	/**
	 * 视频导演
	 */
	public $director;

	/**
	 * 视频主演
	 */
	public $main_actor;

	/**
	 * 视频时间
	 */
	public $tv_set_total;

	/**
	 * 视频地区
	 */
	public $area;

	/**
	 * 视频年份
	 */
	public $tv_year;

	/**
	 * 视频来源
	 */
	public $tv_source;

	/**
	 * 视频评分
	 */
	public $tv_score;

	/**
	 * 视频评分人数
	 */
	public $tv_score_count;

	/**
	 * 视频缩略图
	 */
	public $video_big_pic;

	/**
	 * 视频播放次数
	 */
	public $tv_play_count;

	/**
	 * 视频在专辑中的播放顺序
	 */
	public $tv_play_order;

	/**
	 * 视频发布时间
	 */
	public $tv_application_time;

	/**
	 * 是否独家 0 否，1 是
	 */
	public $only;

	/**
	 * 是否付费 0否，1 是
	 */
	public $fee;
	/**
	 * 付费模式下是否支持包月 0否，1是
	 */
	public $fee_month;
	/**
	 * 专辑地址
	 */
	public $s_url;



	/**
	 * 所获奖项
	 */
	public $cup;

	/**
	 * 所获奖项说明
	 */
	public $cup_item;

	public $sub_title;

	/**
	**/
    public $tip;
    /**
	* 更新信息
	**/
	public $tip_num;

	public $fee_rule_id;

	public $ver_small_pic;

	public $ver_big_pic;

	public $hor_big_pic;

	public $hor_small_pic;

	public $pid;

	public $cid;

	public $tv_comment;

	public $top50_day_time;

	public $tv_trend_rank;

	public $voters;

	public $top50_day_rank;

	public $tv_trend_count;

	public $tv_all_count;

	public $tv_set_now;

	public $tv_count;

	public $actor;

	public $video_publish_time;
	/**
	* 时长
	*/
	public $time_length;
};




/*
 * 视频类
 */
class Category{
	public $cateName;
	public $cateValues;
	public $searchKeys;
	public $cateAlias;
	public $cateCode;
};

/**
*　视频专辑
**/
class SetInfo extends Video{
	/**
	* 分集总数
	*/
	public $count;
	/**
	* 当前页的列表
	*/
	public $videos;
};


/**
* 视频分段信息
* http://api.tv.sohu.com/video/310153.json?api_key=4a62c00db90213d0f54115e0b3ab5535
**/
class VideoSplits {
	
	public $vid;//
	// 供调度使用,配置调度返回的方式,2:200返回;1:301返回
	public $prot;
	// 城市编号
	public $ctCode;// ct: 34
	public $holiday;
	public $fee;
	// 类别名称
	public $categoryName;// caname: "电视剧"
	public $previewSecond;// preview: 2
	public $tv_url;
	// 软字幕路径
	public $scap;//
	// 硬字幕版本，如果没有硬字幕则显示0,-1代表未处理
	public $hcap;
	// 预加载秒数
	public $priorLoad;// pL: 30
	public $categoryId; // caid: 2

	public $p2pflag;
	// 网络类型
	public $netTypeCode;// nt;
	// p2p下载线程数量
	public $p2pThreadNum;// tn;
	// 播放方式
	public $playType;// fms;
	// p2p下载每线程限速
	public $p2pSpeed;// sp;
	// 用户类型
	public $user;// uS;
	public $status;
	public $videoType;// vt: 1
	// 播放状态
	public $play;
	public $pid;
	// 调度地址
	public $allot;

}

class VideoSplitsData extends VideoSplits {
	/*************** data start ***************************/
	public $highVid;
	public $ipLimit;
	public $clipsURL;
	public $version;
	public $clipsBytes;
	public $totalDuration;
	public $height;
	public $coverImg;
	// clipsSynUrl
	public $su;
	// 精彩推荐
	public $eP;
	// 超清id
	public $superVid;
	// 片尾开始时间
	public $eT;

	public $clipsDuration;//
	// 视频宽
	public $width;
	// 帧率
	public $fps;
	public $norVid;
	// hashCodes
	public $hc;
	// 相关联ID
	public $relativeId;
	// 分段个数
	public $num;
	public $tvName;
	// url 加密
	public $ck;
	// 片头结束时间
	public $sT;
	public $totalBytes;
	// channel
	public $ch;
	public $totalBlocks;
}


