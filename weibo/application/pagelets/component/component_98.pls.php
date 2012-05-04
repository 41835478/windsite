<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 画报搜索
 * @author fxy
 * @version $Id: component_98.pls.php
 *
 */
class component_98_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		$params = $mod['param']; //参数列表
		$params['page_no'] = (int) V('g:page', 1);
		//TODO 执行画报搜索
		echo '此模块暂时没有实现';
		exit;
		$ret = POSTERS('top/TopClient.huabaoSpecialpostersGet', 'g0/' . CACHE_24, $params);
		if ($ret['errno']) {
			$this->_error(L('pls__top__apiError', 'huabaoSpecialpostersGet', $ret['err'], $ret['errno']));
			//$this->_error('components/guessYouLike.get 返回API错误：'. $ret['err']. '('. $ret['errno']. ')');
			return;
		}
		elseif (empty ($ret['rst'])) {
			$this->_error(L('pls__top__rstError'));
			return;
		}
		elseif (!is_array($ret['rst'])) {
			$this->_error(L('pls__top__Error'));
			return;
		}
		$posterList = $this->_generatePosterList($ret['rst']);
		TPL :: module('xintao/top', array (
			'data_type' => 'poster',
			'mod' => $mod,
			'rs' => $ret['rst'],
			'list' => $posterList
		));
	}

	/**
	 *
	 * @param array $rst 本组件内生成的画报rst数组资源
	 * @return array
	 */
	function _generatePosterList($rst) {
		return $rst['posters']['poster'];
	}

}