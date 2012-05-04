<?php


/*****************************************************
 * 搜狐视频开放平台PHP5客户端
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************
/*
 * SoClient类
 */
class SoClient {
	private $api_uri = "http://api.tv.sohu.com/";
	private $open_uri = "http://open.tv.sohu.com/";

	private $applicationKeys;
	private $methodCall;

	private $params;

	function SoClient() {
		$this->applicationKeys = new ApplicationKeys(SOTV_CONSUMER_KEY, SOTV_CONSUMER_SECRET);
		$this->methodCall = new MethodCall();

		$this->params = array (
			"api_key" => $this->applicationKeys->apiKey
			//			,"v"=>"1.0"
	,
			"format" => "json"
		);
	}

	/**
	*
	* 把 Json 对象反射为PHP 对象
	* @param json 
	* @return video object
	*/
	public static function getVideoFromObject($tmp) {

		$video = new Video();

		$reflectionclass = new ReflectionClass($video); //反射每一个类

		if ($reflectionclass->isUserDefined()) { //判罚是否是用户定义的类

			#echo "\r\n"."name = ".$reflectionclass->getName();

			$Properties = $reflectionclass->getProperties(); //获取该类的所有属性 	
			foreach ($Properties as $Propertie) { //循环属性，并为每一个属性赋值
				$n = $Propertie->name;

				#echo "\r\n"."key = ".$n;

				if (isset ($tmp-> {
					$n })) {
					$s = "\$video->" . $n . " = \$tmp->{\"" . $n . "\"};";
					#echo $s."\r\n";
					eval ($s);
				}
			}
		}

		return $video;

	}

	/**
	*
	* 把 Json 对象反射为PHP 对象
	* @param json 
	* @return category object
	*/
	public static function getCategoryFromObject($tmp) {

		$category = new Category();
		$reflectionclass = new ReflectionClass($category); //反射每一个类

		if ($reflectionclass->isUserDefined()) { //判罚是否是用户定义的类

			#echo "\r\n"."name = ".$reflectionclass->getName();

			$Properties = $reflectionclass->getProperties(); //获取该类的所有属性 	
			foreach ($Properties as $Propertie) { //循环属性，并为每一个属性赋值
				$n = $Propertie->name;

				#echo "\r\n"."key = ".$n;

				if (isset ($tmp-> {
					$n })) {
					$s = "\$category->" . $n . " = \$tmp->{\"" . $n . "\"};";
					#echo $s."\r\n";
					eval ($s);
				}
			}
		}

		return $category;
	}

	/**
	* 获得视频信息
	* @param vid 视频id
	* @return Video 视频对象
	**/
	public function getVideo($vid) {
		global $SOHU_VIDEO_PROPERTIES;
		$uri = $this->api_uri . "video/" . $vid . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {

			$tmp = $jsonObj['data'];
			$video = $tmp; //SoClient :: getVideoFromObject($tmp);
			return $video;
		}

		return NULL;
	}

	/**
	* 获得某个专辑的信息
	* @param setId 视频专辑id
	* @return SetInfo 视频专辑对象
	**/
	public function getSetInfo($setId) {

		$uri = $this->api_uri . "set/info/" . $setId . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {

			$tmp = $jsonObj['data'];
			$video = $tmp; //SoClient :: getVideoFromObject($tmp);

			return $video;
		}

		return NULL;
	}
	/**
	 * 播客分类热推
	 */
	public function getBokeTop($cat) {
		$uri = $this->api_uri . "boke/top/" . $cat . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {
			$pagination = array ();
			$tmpVideos = $jsonObj['data']['videos'];
			$pagination['count'] = count($tmpVideos);
			$videos = array ();
			foreach ($tmpVideos as $tmp) {
				$videos[] = $tmp; //SoClient :: getVideoFromObject($tmp);
			}
			$pagination['resultList'] = $videos;
			return $pagination;
		}

		return NULL;
	}
	/**
	 * 播客视频信息
	 */
	public function getBokeVideoInfoByBid($bid) {
		$uri = $this->api_uri . "boke/video/info/" . $bid . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {

			$tmp = $jsonObj['data'];
			$video = $tmp; //SoClient :: getVideoFromObject($tmp);

			return $video;
		}

		return NULL;
	}
	/**
	* 根据vid获得某个专辑的信息
	* @param vid 视频id
	* @return SetInfo 视频专辑对象
	**/
	public function getSetInfoByVid($vid) {

		$uri = $this->api_uri . "set/info/v/" . $vid . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {

			$tmp = $jsonObj['data'];
			$video = $tmp; //SoClient :: getVideoFromObject($tmp);

			return $video;
		}

		return NULL;
	}

	/**
	* 获得某个专辑的视频列表信息
	* @param setId 视频专辑id
	* @return Video List 视频对象列表
	**/
	public function getSetList($setId, $page, $pageSize) {
		$pagination = new Pagination($page, $pageSize);

		$uri = $this->api_uri . "set/list/" . $setId . "." . $this->params["format"];

		$my_params = SoUtil :: clonArray($this->params);
		$my_params["page"] = $page;
		$my_params["pageSize"] = $pageSize;
		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {
			$pagination = array ();
			$pagination['count'] = $jsonObj['data']['count'];

			$tmpVideos = $jsonObj['data']['videos'];
			$videos = array ();
			foreach ($tmpVideos as $tmp) {
				$videos[] = $tmp; //SoClient :: getVideoFromObject($tmp);
			}
			$pagination['resultList'] = $videos;
			return $pagination;
		}

		return NULL;
	}

	/**
	* teleplay/top/views/daily 电视剧排行榜 ： 播放日榜
	* teleplay/top/views/weekly 电视剧排行榜 ： 播放周榜
	* teleplay/top/views/all 电视剧排行榜 ： 播放全部榜
	* teleplay/top/score/perfect 电视剧评分榜: 佳片榜
	* teleplay/top/score/good 电视剧评分榜: 好片榜
	* teleplay/top/score/common 电视剧评分榜: 一般榜
	* teleplay/top/score/poor 电视剧评分榜: 烂片榜
	* @param apiurl
	* @return Video List 视频对象列表
	*/
	public function getTop($apiurl) {
		$uri = $this->api_uri . $apiurl . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {

			$tmpVideos = $jsonObj['data']['videos'];

			$videos = array ();
			foreach ($tmpVideos as $tmp) {
				$videos[] = $tmp; //SoClient :: getVideoFromObject($tmp);
			}
			return $videos;
		}
		return NULL;
	}

	/**
	* teleplay/category 电视剧的分类导航
	* movie/category 电影的分类导航
	* zongyi/category 综艺片的分类导航
	* @param apiurl
	* @return category List 视频分类列表
	**/
	public function getCategory($apiurl) {
		$uri = $this->api_uri . $apiurl . "." . $this->params["format"];
		$my_params = SoUtil :: clonArray($this->params);
		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);
		$status = $jsonObj['status'];
		if ($status == 200) {
			$tmpCategorys = $jsonObj['data']['categorys'];
			$categorys = array ();
			foreach ($tmpCategorys as $tmp) {
				$categorys[] = $tmp; //SoClient :: getCategoryFromObject($tmp);
			}
			return $categorys;
		}
		return NULL;
	}

	/**
	* 根据关键词搜索
	* @param page:当前页数
	* @param pageSize:每页显示记录数（默认20，最大50）
	* @param key:全文搜索关键字
	* @param c:频道标识：1-电影；2-电视剧；16-动漫；8-纪录片；7-综艺；13-新闻资讯；0-其它（默认为全部）
	* @param tvType:类型，例如：“正片”
	* @param cat：影片分类，例如：“言情剧”
	* @param area:区域，例如：“内地”
	* @param year:年份，例如：“2011”
	* @param cs:
	* @param age:
	* @param language:
	* @param fee:
	* @param o : sort , 排序，1-总最多播放;3-最新发布;4-最高评分; 5-日播放最多; 7-周播放最多 (默认为相关度)
	* @return Pagination 视频分页对象
	**/
	public function search($page = 1, $pageSize = 20, $key = NULL, $c = NULL, $tvType = NULL, $cat = NULL, $area = NULL, $year = NULL, $cs = NULL, $age = NULL, $language = NULL, $fee = NULL, $o = NULL) {
		$uri = $this->api_uri . "search." . $this->params["format"];
		$my_params = SoUtil :: clonArray($this->params);

		$my_params["page"] = $page;
		$my_params["pageSize"] = $pageSize;

		if (isset ($key))
			$my_params["key"] = $key;

		if (isset ($c))
			$my_params["c"] = $c;

		if (isset ($page))
			$my_params["page"] = $page;

		if (isset ($pageSize))
			$my_params["pageSize"] = $pageSize;

		if (isset ($tvType))
			$my_params["tvType"] = - $tvType;

		if (isset ($cat))
			$my_params["cat"] = $cat;

		if (isset ($area))
			$my_params["area"] = $area;

		if (isset ($year))
			$my_params["year"] = $year;

		if (isset ($cs))
			$my_params["cs"] = $cs;

		if (isset ($age))
			$my_params["age"] = $age;

		if (isset ($language))
			$my_params["language"] = $language;

		if (isset ($fee))
			$my_params["fee"] = $fee;

		if (isset ($o))
			$my_params["o"] = $o;
		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;
		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {

			$pagination = array ();
			$pagination['page'] = $page;
			$pagination['pageSize'] = $pageSize;
			if (isset ($jsonObj['data'])) {
				$pagination['count'] = $jsonObj['data']['count'];
				$tmpVideos = $jsonObj['data']['videos'];
				$videos = array ();
				foreach ($tmpVideos as $tmp) {
					$videos[] = $tmp; // SoClient :: getVideoFromObject($tmp);
				}
				$pagination['resultList'] = $videos;
			} else {
				$pagination['count'] = 0;
				$pagination['resultList'] = array ();
			}

			return $pagination;

		}
		return NULL;
	}

	/**
	* news/focus 获取焦点新闻
	* teleplay/focus 获取今日电视剧类的焦点剧目
	* movie/focus 获取今日电影类的焦点剧目
	* zongyi/focus 获取今日综艺类的焦点剧目
	* @param apiurl
	* @return video List 视频列表
	**/
	public function getFocus($apiurl) {
		$uri = $this->api_uri . $apiurl . "." . $this->params["format"];
		$my_params = SoUtil :: clonArray($this->params);
		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {

			$tmpVideos = $jsonObj['data']['data'];

			$videos = array ();
			foreach ($tmpVideos as $tmp) {
				$videos[] = $tmp; //SoClient :: getVideoFromObject($tmp);
			}
			return $videos;
		}
		return NULL;
	}
	/**
	* news/recommend 获取推荐新闻
	* teleplay/recommend 获取今日电视剧类的推荐剧目
	* movie/recommend 获取今日电影类的推荐剧目
	* zongyi/recommend 获取今日综艺类的推荐剧目
	* @param apiurl
	* @return video List 视频列表
	**/
	public function getRecommend($apiurl) {
		$uri = $this->api_uri . $apiurl . "." . $this->params["format"];
		$my_params = SoUtil :: clonArray($this->params);
		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#请求
		$content = $this->methodCall->execGetMethod($uri, $my_params);

		#echo "content : " .$content."\r\n";    		

		$jsonObj = json_decode($content, true);

		$status = $jsonObj['status'];
		if ($status == 200) {

			$tmpVideos = $jsonObj['data']['videos'];

			$videos = array ();
			foreach ($tmpVideos as $tmp) {
				$videos[] = $tmp; //SoClient :: getVideoFromObject($tmp);
			}
			return $videos;
		}
		return NULL;
	}

	/**
	* 根据 sid vid cid 来计算下一个链接
	*/
	public function getPlayLink($sid, $vid, $cid) {

		$uri = "";
		$my_params = SoUtil :: clonArray($this->params);
		#生成签名算法
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		$my_params["sid"] = $sid;
		$my_params["vid"] = $vid;
		$my_params["cid"] = $cid;

		$playLink = "";
		switch ($cid) {
			case 2 :
				// "电视剧";
				$uri = "album.php";
				break;
			default :
				// "新闻、电影、综艺、播客 等
				$uri = $this->open_uri . "play.do";
				break;
		}

		$playLink = $uri . "?";
		#拼接URL
		foreach ($my_params as $key => $val) {
			$playLink = $playLink . $key . "=" . urlencode($val) . "&";
		}

		return $playLink;
	}
}