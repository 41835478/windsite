<?php


/*****************************************************
 * �Ѻ���Ƶ����ƽ̨PHP5�ͻ���
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************
/*
 * SoClient��
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
	* �� Json ������ΪPHP ����
	* @param json 
	* @return video object
	*/
	public static function getVideoFromObject($tmp) {

		$video = new Video();

		$reflectionclass = new ReflectionClass($video); //����ÿһ����

		if ($reflectionclass->isUserDefined()) { //�з��Ƿ����û��������

			#echo "\r\n"."name = ".$reflectionclass->getName();

			$Properties = $reflectionclass->getProperties(); //��ȡ������������� 	
			foreach ($Properties as $Propertie) { //ѭ�����ԣ���Ϊÿһ�����Ը�ֵ
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
	* �� Json ������ΪPHP ����
	* @param json 
	* @return category object
	*/
	public static function getCategoryFromObject($tmp) {

		$category = new Category();
		$reflectionclass = new ReflectionClass($category); //����ÿһ����

		if ($reflectionclass->isUserDefined()) { //�з��Ƿ����û��������

			#echo "\r\n"."name = ".$reflectionclass->getName();

			$Properties = $reflectionclass->getProperties(); //��ȡ������������� 	
			foreach ($Properties as $Propertie) { //ѭ�����ԣ���Ϊÿһ�����Ը�ֵ
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
	* �����Ƶ��Ϣ
	* @param vid ��Ƶid
	* @return Video ��Ƶ����
	**/
	public function getVideo($vid) {
		global $SOHU_VIDEO_PROPERTIES;
		$uri = $this->api_uri . "video/" . $vid . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	* ���ĳ��ר������Ϣ
	* @param setId ��Ƶר��id
	* @return SetInfo ��Ƶר������
	**/
	public function getSetInfo($setId) {

		$uri = $this->api_uri . "set/info/" . $setId . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	 * ���ͷ�������
	 */
	public function getBokeTop($cat) {
		$uri = $this->api_uri . "boke/top/" . $cat . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	 * ������Ƶ��Ϣ
	 */
	public function getBokeVideoInfoByBid($bid) {
		$uri = $this->api_uri . "boke/video/info/" . $bid . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	* ����vid���ĳ��ר������Ϣ
	* @param vid ��Ƶid
	* @return SetInfo ��Ƶר������
	**/
	public function getSetInfoByVid($vid) {

		$uri = $this->api_uri . "set/info/v/" . $vid . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	* ���ĳ��ר������Ƶ�б���Ϣ
	* @param setId ��Ƶר��id
	* @return Video List ��Ƶ�����б�
	**/
	public function getSetList($setId, $page, $pageSize) {
		$pagination = new Pagination($page, $pageSize);

		$uri = $this->api_uri . "set/list/" . $setId . "." . $this->params["format"];

		$my_params = SoUtil :: clonArray($this->params);
		$my_params["page"] = $page;
		$my_params["pageSize"] = $pageSize;
		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	* teleplay/top/views/daily ���Ӿ����а� �� �����հ�
	* teleplay/top/views/weekly ���Ӿ����а� �� �����ܰ�
	* teleplay/top/views/all ���Ӿ����а� �� ����ȫ����
	* teleplay/top/score/perfect ���Ӿ����ְ�: ��Ƭ��
	* teleplay/top/score/good ���Ӿ����ְ�: ��Ƭ��
	* teleplay/top/score/common ���Ӿ����ְ�: һ���
	* teleplay/top/score/poor ���Ӿ����ְ�: ��Ƭ��
	* @param apiurl
	* @return Video List ��Ƶ�����б�
	*/
	public function getTop($apiurl) {
		$uri = $this->api_uri . $apiurl . "." . $this->params["format"];
		#echo $uri."\r\n";	
		$my_params = SoUtil :: clonArray($this->params);

		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	* teleplay/category ���Ӿ�ķ��ർ��
	* movie/category ��Ӱ�ķ��ർ��
	* zongyi/category ����Ƭ�ķ��ർ��
	* @param apiurl
	* @return category List ��Ƶ�����б�
	**/
	public function getCategory($apiurl) {
		$uri = $this->api_uri . $apiurl . "." . $this->params["format"];
		$my_params = SoUtil :: clonArray($this->params);
		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	* ���ݹؼ�������
	* @param page:��ǰҳ��
	* @param pageSize:ÿҳ��ʾ��¼����Ĭ��20�����50��
	* @param key:ȫ�������ؼ���
	* @param c:Ƶ����ʶ��1-��Ӱ��2-���Ӿ磻16-������8-��¼Ƭ��7-���գ�13-������Ѷ��0-������Ĭ��Ϊȫ����
	* @param tvType:���ͣ����磺����Ƭ��
	* @param cat��ӰƬ���࣬���磺������硱
	* @param area:�������磺���ڵء�
	* @param year:��ݣ����磺��2011��
	* @param cs:
	* @param age:
	* @param language:
	* @param fee:
	* @param o : sort , ����1-����ಥ��;3-���·���;4-�������; 5-�ղ������; 7-�ܲ������ (Ĭ��Ϊ��ض�)
	* @return Pagination ��Ƶ��ҳ����
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
		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;
		#����
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
	* news/focus ��ȡ��������
	* teleplay/focus ��ȡ���յ��Ӿ���Ľ����Ŀ
	* movie/focus ��ȡ���յ�Ӱ��Ľ����Ŀ
	* zongyi/focus ��ȡ����������Ľ����Ŀ
	* @param apiurl
	* @return video List ��Ƶ�б�
	**/
	public function getFocus($apiurl) {
		$uri = $this->api_uri . $apiurl . "." . $this->params["format"];
		$my_params = SoUtil :: clonArray($this->params);
		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	* news/recommend ��ȡ�Ƽ�����
	* teleplay/recommend ��ȡ���յ��Ӿ�����Ƽ���Ŀ
	* movie/recommend ��ȡ���յ�Ӱ����Ƽ���Ŀ
	* zongyi/recommend ��ȡ������������Ƽ���Ŀ
	* @param apiurl
	* @return video List ��Ƶ�б�
	**/
	public function getRecommend($apiurl) {
		$uri = $this->api_uri . $apiurl . "." . $this->params["format"];
		$my_params = SoUtil :: clonArray($this->params);
		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		#����
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
	* ���� sid vid cid ��������һ������
	*/
	public function getPlayLink($sid, $vid, $cid) {

		$uri = "";
		$my_params = SoUtil :: clonArray($this->params);
		#����ǩ���㷨
		//$sig = SoUtil::generateSig($my_params,$this->applicationKeys->secretKey);
		//$my_params["sig"] = $sig;

		$my_params["sid"] = $sid;
		$my_params["vid"] = $vid;
		$my_params["cid"] = $cid;

		$playLink = "";
		switch ($cid) {
			case 2 :
				// "���Ӿ�";
				$uri = "album.php";
				break;
			default :
				// "���š���Ӱ�����ա����� ��
				$uri = $this->open_uri . "play.do";
				break;
		}

		$playLink = $uri . "?";
		#ƴ��URL
		foreach ($my_params as $key => $val) {
			$playLink = $playLink . $key . "=" . urlencode($val) . "&";
		}

		return $playLink;
	}
}