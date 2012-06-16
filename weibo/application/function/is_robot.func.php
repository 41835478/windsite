<?php


/**
 * 检查是否是引擎爬虫和机器人访问网站
 * @author yaoying
 * @version $Id: is_robot.func.php 11979 2011-03-25 03:27:54Z guanghui1 $ 
 * @return bool
 */
function is_robot() {
	static $is_robot = null;

	if (null == $is_robot) {
		$is_robot = false;
		$whiteRobot = '';
		if (XT_ISCRAWLER) { //如果需要抓取
			$whiteRobot = 'baiduspider|googlebot';
		}
		if (!empty ($whiteRobot)) {
			if (isset ($_SERVER['HTTP_USER_AGENT']) && preg_match("/{$whiteRobot}/i", $_SERVER['HTTP_USER_AGENT'])) { //取消对百度和Goolge的检验
				if ((XT_SITE_DOMAIN == 't' . XT_USER_ID . '.xintaowang.com' || XT_SITE_DOMAIN == '')) {
					$is_robot = true;
					return $is_robot;
				}
				$is_robot = false;
				return $is_robot;
			}
		}
		$robotlist = 'bot|spider|crawl|nutch|lycos|robozilla|slurp|search|seek|archive';
		if (isset ($_SERVER['HTTP_USER_AGENT']) && preg_match("/{$robotlist}/i", $_SERVER['HTTP_USER_AGENT'])) {
			$is_robot = true;
		}
	}

	return $is_robot;

}
?>
