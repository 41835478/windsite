<?php


/**
 * 免费数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class xtTvCover {

	/**
	 * 根据专辑ID获得专辑封面
	 */
	function getBySid($sid) {
		$db = APP :: ADP('db');
		$sql = 'SELECT cover FROM ' . $db->getTable(T_XTTV_COVERS) . ' WHERE `sid`=' . $db->escape($sid);
		return RST($db->getOne($sql));
	}
	/**
	 * 根据专辑ID获得专辑封面
	 */
	function getBySidAll($sid) {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XTTV_COVERS) . ' WHERE `sid`=' . $db->escape($sid);
		return RST($db->getRow($sql));
	}
}