<?php
/*****************************************************
 * 搜狐视频开放平台PHP5客户端
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************

/*
 * HTTP请求类
 */
class MethodCall{
	/*
	 * HTTP Get请求
	 * 
	 * @param String uri 请求的URI
	 * @param Array params 传递的参数值对
	 * 
	 * @return Stirng 请求返回的内容
	 */
	function execGetMethod($uri,$params){
		$uri = $uri."?";
		#拼接URL
		foreach($params as $key=>$val){
			$uri = $uri.$key."=".urlencode($val)."&";
		}

	    #    echo "uri=".$uri."\r\n";	

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $uri);
		curl_setopt($ch, CURLOPT_USERAGENT, "so4ph"); 		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);		
		

		#echo "ch = ".$ch."\r\n";

		$content = curl_exec($ch);		

		#echo "content : ".$content."\r\n";

		curl_close($ch);		
		
		#判断是否需要抛出异常
		$pos = strpos($content,"error_code");
		if($pos){
			#throw exception
			$jsonObj = json_decode($content);
			$error_code = SoUtil::getValueFromJson($jsonObj,"error_code");
			$error_msg = SoUtil::getValueFromJson($jsonObj,"error_msg");
			
			$params = SoUtil::getRequestParamsFromJson($jsonObj);
			
			throw new SoException($error_code,$error_msg,$params);
		}
		return $content;
	}	
	/*
	 * HTTP Post请求
	 * 
	 * @param String uri 请求的URI
	 * @param Array params 传递的参数值对
	 * 
	 * @return Stirng 请求返回的内容
	 */
	function execPostMethod($uri,$params){
		$uri = $uri;
		#拼接URL
		$fields_string = "";
		foreach($params as $key=>$val){
			$fields_string = $fields_string.$key."=".urlencode($val)."&";
		}
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $uri);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_POSTFIELDS,$fields_string) ; 
		$content = curl_exec($ch);
		curl_close($ch);
		
		#判断是否需要抛出异常
		$pos = strpos($content,"error_code");
		if($pos){
			#throw exception
			$jsonObj = json_decode($content);
			$error_code = SoUtil::getValueFromJson($jsonObj,"error_code");
			$error_msg = SoUtil::getValueFromJson($jsonObj,"error_msg");
			throw new SoException($error_code,$error_msg);
		}
		return $content;
	}	
}

