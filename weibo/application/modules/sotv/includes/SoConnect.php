<?php
/*****************************************************
 * �Ѻ���Ƶ����ƽ̨PHP5�ͻ���
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************

/*
 * HTTP������
 */
class MethodCall{
	/*
	 * HTTP Get����
	 * 
	 * @param String uri �����URI
	 * @param Array params ���ݵĲ���ֵ��
	 * 
	 * @return Stirng ���󷵻ص�����
	 */
	function execGetMethod($uri,$params){
		$uri = $uri."?";
		#ƴ��URL
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
		
		#�ж��Ƿ���Ҫ�׳��쳣
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
	 * HTTP Post����
	 * 
	 * @param String uri �����URI
	 * @param Array params ���ݵĲ���ֵ��
	 * 
	 * @return Stirng ���󷵻ص�����
	 */
	function execPostMethod($uri,$params){
		$uri = $uri;
		#ƴ��URL
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
		
		#�ж��Ƿ���Ҫ�׳��쳣
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

