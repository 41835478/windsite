<?php
/*****************************************************
 * �Ѻ���Ƶ����ƽ̨PHP5�ͻ���
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************/

/*
 * ��Ƶ��
 */
class Video{
	/**
	 * ��ƵID
	 */
	public $vid;
	public $tv_ver_id;
	/**
	 * ר��ID
	 */
	public $sid;

	/**
	 * ��Ƶ����
	 */
	public $tv_name;

	/**
	 * ��Ƶ����
	 */
	public $tv_desc;

	/**
	 * ���ŵ�ַ
	 */
	public $tv_url;


	/**
	 * ��Ƶ���� eg:ϲ��Ƭ������Ƭ
	 */
	public $tv_cont_cats;

	/**
	 * ��Ƶ����
	 */
	public $director;

	/**
	 * ��Ƶ����
	 */
	public $main_actor;

	/**
	 * ��Ƶʱ��
	 */
	public $tv_set_total;

	/**
	 * ��Ƶ����
	 */
	public $area;

	/**
	 * ��Ƶ���
	 */
	public $tv_year;

	/**
	 * ��Ƶ��Դ
	 */
	public $tv_source;

	/**
	 * ��Ƶ����
	 */
	public $tv_score;

	/**
	 * ��Ƶ��������
	 */
	public $tv_score_count;

	/**
	 * ��Ƶ����ͼ
	 */
	public $video_big_pic;

	/**
	 * ��Ƶ���Ŵ���
	 */
	public $tv_play_count;

	/**
	 * ��Ƶ��ר���еĲ���˳��
	 */
	public $tv_play_order;

	/**
	 * ��Ƶ����ʱ��
	 */
	public $tv_application_time;

	/**
	 * �Ƿ���� 0 ��1 ��
	 */
	public $only;

	/**
	 * �Ƿ񸶷� 0��1 ��
	 */
	public $fee;
	/**
	 * ����ģʽ���Ƿ�֧�ְ��� 0��1��
	 */
	public $fee_month;
	/**
	 * ר����ַ
	 */
	public $s_url;



	/**
	 * ������
	 */
	public $cup;

	/**
	 * ������˵��
	 */
	public $cup_item;

	public $sub_title;

	/**
	**/
    public $tip;
    /**
	* ������Ϣ
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
	* ʱ��
	*/
	public $time_length;
};




/*
 * ��Ƶ��
 */
class Category{
	public $cateName;
	public $cateValues;
	public $searchKeys;
	public $cateAlias;
	public $cateCode;
};

/**
*����Ƶר��
**/
class SetInfo extends Video{
	/**
	* �ּ�����
	*/
	public $count;
	/**
	* ��ǰҳ���б�
	*/
	public $videos;
};


/**
* ��Ƶ�ֶ���Ϣ
* http://api.tv.sohu.com/video/310153.json?api_key=4a62c00db90213d0f54115e0b3ab5535
**/
class VideoSplits {
	
	public $vid;//
	// ������ʹ��,���õ��ȷ��صķ�ʽ,2:200����;1:301����
	public $prot;
	// ���б��
	public $ctCode;// ct: 34
	public $holiday;
	public $fee;
	// �������
	public $categoryName;// caname: "���Ӿ�"
	public $previewSecond;// preview: 2
	public $tv_url;
	// ����Ļ·��
	public $scap;//
	// Ӳ��Ļ�汾�����û��Ӳ��Ļ����ʾ0,-1����δ����
	public $hcap;
	// Ԥ��������
	public $priorLoad;// pL: 30
	public $categoryId; // caid: 2

	public $p2pflag;
	// ��������
	public $netTypeCode;// nt;
	// p2p�����߳�����
	public $p2pThreadNum;// tn;
	// ���ŷ�ʽ
	public $playType;// fms;
	// p2p����ÿ�߳�����
	public $p2pSpeed;// sp;
	// �û�����
	public $user;// uS;
	public $status;
	public $videoType;// vt: 1
	// ����״̬
	public $play;
	public $pid;
	// ���ȵ�ַ
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
	// �����Ƽ�
	public $eP;
	// ����id
	public $superVid;
	// Ƭβ��ʼʱ��
	public $eT;

	public $clipsDuration;//
	// ��Ƶ��
	public $width;
	// ֡��
	public $fps;
	public $norVid;
	// hashCodes
	public $hc;
	// �����ID
	public $relativeId;
	// �ֶθ���
	public $num;
	public $tvName;
	// url ����
	public $ck;
	// Ƭͷ����ʱ��
	public $sT;
	public $totalBytes;
	// channel
	public $ch;
	public $totalBlocks;
}


