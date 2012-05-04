<?php
/*****************************************************
 * 搜狐视频开放平台PHP5客户端
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************
 /**
 * 类定义
 */

/*
 * 工具类
 */
class SoUtil {
	/*
	 * 从JSON对象中获取某个属性的值
	 * 
	 * @param Object jsonObj	JSON对象
	 * @param String propertyName 属性名称
	 * 
	 * @return String 属性值
	 */
	public static function getValueFromJson($jsonObj, $propertyName){
		return $jsonObj->{$propertyName};
	}
	
	/*
	 * 从JSON对象中获取请求时携带的参数
	 * 
	 * @param Object jsonObj JSON对象
	 * 
	 * @return Array 请求时携带的参数值对
	 */
	public static function getRequestParamsFromJson($jsonObj){
		$params = array();
		$args = $jsonObj->{"request_args"};
		foreach($args as $key=>$val){
			$params[$key]=$val;
		}
		return $params;
	}
	
	/*
	 * 数组克隆
	 * 
	 * @param Array array 源数组
	 * 
	 * @return Array 克隆后的新数组
	 */
	public static function clonArray($array){
		$params = array();
	
		foreach ($array as $key => $val) {		
			$params[$key] = $val;
		}
		return $params;
	}
	
	/*
	 * 获得系统当前的时间，毫秒级
	 * 
	 * @return Integer 整形数值
	 */
	public static function getMicroTime(){
		$time = sprintf("%01.0f",time()*1000+microtime()*1000);	
		return $time;
	}
	/**
	*  转换时间格式
	* @param seconds 秒
	* @return 分钟
	*/
	public static function getTimes($seconds){
			$ret = "";
			$mins = floor($seconds / 60);
			if($mins > 0 ){
					$ret = $mins.":".($seconds-($mins*60));
			}else {
					$ret = "0:".$seconds;
			}
			return $ret;
	}	
	/*
	 * 生成签名
	 * 
	 * @param Array params 参数值对
	 * @param String secretKey 密钥
	 * 
	 * @return String 生成的签名字符串 
	 */
	public static function generateSig($params,$secretKey){	
		$keyArray = array();
		# 取出key,并排序
		foreach ($params as $key => $val) {		
			$keyArray[] = $key;
		}
		sort($keyArray);
		$query = "";
		foreach($keyArray as $key) {
			$val = $params[$key];			
			$query=$query.$key."=".iconv("UTF-8","GBK",$val);
		}
		$query=$query.$secretKey;
		
		#echo "query:".$query."<br/>";
		
		$sig = md5($query);
		
		#echo "sig:".$sig."<br/>";
		return $sig;
	}

	 //截取中文字符串
	public static function mysubstr($str, $start, $length) {
		$len = $length;
		if($length < 0){
			$str = strrev($str);
			$len = -$length;
		}
		$tmpstr="";
		$len= ($len < strlen($str)) ? $len : strlen($str);
		for ($i= $start; $i < $len; $i ++)
		{
			   if (ord(substr($str, $i, 1)) > 0xa0)
			   {
				 $tmpstr .= substr($str, $i, 2);
				 $i++;
			   } else {
				 $tmpstr .= substr($str, $i, 1);
			   }
		}
		if($length < 0) $tmpstr = strrev($tmpstr);
		return $tmpstr;
	}
	 //截取utf8字符串
	 public static function utf8Substr($str, $from, $len){
		 return preg_replace('#^(?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$from.'}'.
	 '((?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$len.'}).*#s','$1',$str);
	 } 

	/**
	* 生成分页的效果
	* @param  curPage 当前页码
	* @param  totalCount  总数量
	* @param  url  分页路径
	* @param  itemPerPage 每页显示数量
	* @param  showLastPage 是否显示最后页
	* @param  showPageCount 是否显示总页数
	*/
	 public static function getPageTag($curPage , $totalCount , $url , $itemPerPage , $showLastPage = false , $showPageCount = false){
		$sb = "";

		$PAGE_PARAM = "#pg#";
		$firstPage = 1;


		$prefix = "";
		$suffix = "";
		$index = strpos($url,$PAGE_PARAM);
		if ($index > -1) {
			$prefix = substr($url,0, $index);
			// PAGE_PARAM后的字符串
			$pos = $index + strlen($PAGE_PARAM);
			if ($pos < strlen($url)) {
				$suffix = substr($url,$pos);
			}
		} else {
			return $url;
		}

		if ($itemPerPage <= 0)
			$itemPerPage = 20;

		$totalPage = (int)($totalCount / $itemPerPage) + (int)($totalCount % $itemPerPage == 0 ? 0 : 1);

		if ($totalPage > 1) {
			
			if ($showPageCount) {
				$sb.="共".$totalPage."页 | ";
			}

			if ($curPage > 1) {

				$sb.=("<a class='pa' href=\"");
				$sb.=($prefix);
				$sb.=($curPage - 1);
				$sb.=($suffix);
				$sb.=("\">上一页</a>");

			}

			if ($curPage - 1 > 5) {
				$sb.=("<a href=\"");
				$sb.=($prefix);
				$sb.=($firstPage);
				$sb.=($suffix);
				$sb.=("\">1</a>");
				if ($curPage - 1 > 6) {
					$sb.=("<span>...</span>");
				}
			}

			for ($i = $curPage - 5; $i < $curPage; $i++) {
				if ($i <= 0)
					continue;
				$sb.=("<a href=\"");
				$sb.=($prefix);
				$sb.=($i);
				$sb.=($suffix);
				$sb.=("\">" . $i . "</a>");
			}

			$sb.="<span>" . $curPage . "</span>";

			for ($i = $curPage + 1; $i <= $totalPage; $i++) {
				if ($i >= $curPage + 5)
					break;
				$sb.=("<a class='num' href=\"");
				$sb.=($prefix);
				$sb.=($i);
				$sb.=($suffix);
				$sb.=("\">" . $i . "</a>");
			}

			if ($totalPage - $curPage > 5) {
				$sb.=("<span>...</span>");
			}

			if ($curPage < $totalPage) {
				$sb.=("<a class='pa' href=\"");
				$sb.=($prefix);
				$sb.=($curPage + 1);
				$sb.=($suffix);
				$sb.=("\">下一页</a>");
			}
			if ($showLastPage && $totalPage - $curPage >= 5) {
				$sb.=("<a class='pa' href=\"");
				$sb.=($prefix);
				$sb.=($totalPage);
				$sb.=($suffix);
				$sb.=("\">");

				$sb.=("末页");
				$sb.=("</a>");

			}
		}
		return $sb;


	 }
}
/*
 * 应用的参数类
 */
class ApplicationKeys{
	//ApiKey
	public $apiKey;
	//密钥
	public $secretKey;

	public function __construct($apiKey,$secretKey){
		$this->apiKey = $apiKey;
		$this->secretKey = $secretKey;
	}
}

/*
 * 异常类
 */
class SoException extends Exception{
	
	private $request_params;
    
    public function __construct($code, $message, $request_params) {      
        parent::__construct($message, $code);
        $this->request_params = $request_params;
    }   
    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }    
    
    public function getRequestParams(){
    	return $this->request_params;
    }
}
/**
* 分页对象
*/
class Pagination{
	/**
	* 分页起点
	*/
	public $page;
	/**
	* 每页数量
	*/
	public $pageSize;
	/**
	* 总数量
	*/ 
	public $count;
	/**
	* 分页结果集合
	*/
	public $resultList;

	public function __construct($page,$pageSize){
		$this->page = $page;
		$this->pageSize = $pageSize;
	}
}