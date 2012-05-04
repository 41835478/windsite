<?php
/*****************************************************
 * 搜狐视频开放平台PHP5客户端
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************/

/**
 * 设置应用的key
 */
define('CONSUMER_KEY', '4a62c00db90213d0f54115e0b3ab5535');
/**
 * 设置应用key对应的密钥
 */
define('CONSUMER_SECRET', 'emKR3y6a6j5GmfT50qA1j5fNQ9MhrGTG');
/**
 * 
 * 桌面应用请设置OAUTH_CALLBACK为小写的oob，Web应用请填写你应用程序的callback url，
 * 以便用户对应用授权之后我们访问并传回确认信息。
 */
define('OAUTH_CALLBACK', 'http://open.tv.sohu.com/SDK/sotv4php/includes/callback.php');
#define('OAUTH_CALLBACK', 'http://tv1.sohu.com/SDK/sotv4php/includes/callback.php');