<?php


/**************************************************
*  Created:  2010-06-08
*  LastModify: 2010-10-23
*  MysqlDB类
*
*  @Xweibo (C)1996-2099 SINA Inc.
*  @Author xuzhenquan <zhenquan@staff.sina.com.cn>
*
***************************************************/

if (!class_exists('interface_db')) {
	require ('interface_db.php');
}

class mysql_db extends interface_db {
	var $table = ''; // default table name
	var $last_sql = ''; // last query sql
	var $querys = array (); // query history
	var $autoFree = false; // switch of auto free result 
	var $ignore_insert = false; // 设置是否为忽略插入
	//var $last_query_id = false; // query id
	var $prefix = ''; // 表名前缀
	var $params = array (); // db params
	var $debug = false;
	//var $last_query_connect = null;
	var $state = array ();
	//需要过滤user_id的表列表
	var $TABLES = array ();
	//需要分表的表列表
	var $SCALES = array ();
	/**
	 * contructor
	 * @param $table default table name
	 * @return void
	 */
	function mysql_db() {

	}

	function setIgnoreInsert($ignore = true) {
		$this->ignore_insert = (boolean) $ignore;
	}
	/**
	 * 设置调试模式(注意：调试模式将打印出Mysql帐号信息)
	 */
	function setDebug($flag = true) {
		$this->debug = (boolean) $flag;
	}

	/**
	 * 得到表前缀
	 */
	function getPrefix() {
		return $this->prefix;
	}

	/**
	 * 框架初始化类时装配置传给该方法
	 */
	function adp_init($params) {
		$this->params = $params;
		$this->prefix = $params['tbpre'];
		$this->SCALES = array (
			T_COMMENT_COPY,
			T_WEIBO_COPY,
			T_USER_FOLLOW_COPY,
			T_PAGE_MANAGER,
			T_SYS_CONFIG,
			T_XT_USER_ITEM,
			T_XT_USER_ITEM_WEIBO,
			T_XT_TAOKE_ITEM,
			T_XT_TAOKE_ITEM_WEIBO,
			T_XT_WOW_TAOKE_ITEM,
			T_XT_WOW_USER_ITEM
		);
		$this->TABLES = array (
			$this->prefix . T_ACCOUNT_PROXY,
			$this->prefix . T_AD,
			$this->prefix . T_ADMIN,
			$this->prefix . T_CELEB,
			$this->prefix . T_CELEB_CATEGORY,
			$this->prefix . T_USER_FOLLOW_COPY,
			$this->prefix . T_USER_FOLLOW_COPY . '_0',
			$this->prefix . T_USER_FOLLOW_COPY . '_1',
			$this->prefix . T_USER_FOLLOW_COPY . '_2',
			$this->prefix . T_USER_FOLLOW_COPY . '_3',
			$this->prefix . T_USER_FOLLOW_COPY . '_4',
			$this->prefix . T_USER_FOLLOW_COPY . '_5',
			$this->prefix . T_USER_FOLLOW_COPY . '_6',
			$this->prefix . T_USER_FOLLOW_COPY . '_7',
			$this->prefix . T_USER_FOLLOW_COPY . '_8',
			$this->prefix . T_USER_FOLLOW_COPY . '_9',
			$this->prefix . T_COMMENT_COPY,
			$this->prefix . T_COMMENT_COPY . '_0',
			$this->prefix . T_COMMENT_COPY . '_1',
			$this->prefix . T_COMMENT_COPY . '_2',
			$this->prefix . T_COMMENT_COPY . '_3',
			$this->prefix . T_COMMENT_COPY . '_4',
			$this->prefix . T_COMMENT_COPY . '_5',
			$this->prefix . T_COMMENT_COPY . '_6',
			$this->prefix . T_COMMENT_COPY . '_7',
			$this->prefix . T_COMMENT_COPY . '_8',
			$this->prefix . T_COMMENT_COPY . '_9',
			$this->prefix . T_COMPONENTS_CFG,
			$this->prefix . T_COMPONENT_TOPIC,
			$this->prefix . T_COMPONENT_TOPICLIST,
			$this->prefix . T_COMPONENT_USERGROUPS,
			$this->prefix . T_COMPONENT_USERS,
			$this->prefix . T_EVENT_JOIN,
			$this->prefix . T_EVENTS,
			$this->prefix . T_FEEDBACK,
			$this->prefix . T_INTERVIEW_WB,
			$this->prefix . T_ITEM_GROUPS,
			$this->prefix . T_NAV,
			$this->prefix . T_NOTICE,
			$this->prefix . T_NOTICE_RECIPIENTS,
			$this->prefix . T_PAGE_MANAGER,
			$this->prefix . T_PAGE_MANAGER . '_0',
			$this->prefix . T_PAGE_MANAGER . '_1',
			$this->prefix . T_PAGE_MANAGER . '_2',
			$this->prefix . T_PAGE_MANAGER . '_3',
			$this->prefix . T_PAGE_MANAGER . '_4',
			$this->prefix . T_PAGE_MANAGER . '_5',
			$this->prefix . T_PAGE_MANAGER . '_6',
			$this->prefix . T_PAGE_MANAGER . '_7',
			$this->prefix . T_PAGE_MANAGER . '_8',
			$this->prefix . T_PAGE_MANAGER . '_9',
			$this->prefix . T_PAGES,
			$this->prefix . T_PROFILE_AD,
			$this->prefix . T_SYS_CONFIG,
			$this->prefix . T_SYS_CONFIG . '_0',
			$this->prefix . T_SYS_CONFIG . '_1',
			$this->prefix . T_SYS_CONFIG . '_2',
			$this->prefix . T_SYS_CONFIG . '_3',
			$this->prefix . T_SYS_CONFIG . '_4',
			$this->prefix . T_SYS_CONFIG . '_5',
			$this->prefix . T_SYS_CONFIG . '_6',
			$this->prefix . T_SYS_CONFIG . '_7',
			$this->prefix . T_SYS_CONFIG . '_8',
			$this->prefix . T_SYS_CONFIG . '_9',
			$this->prefix . T_USER_ACTION,
			$this->prefix . T_USER_BAN,
			$this->prefix . T_USER_VERIFY,
			$this->prefix . T_USERS,
			$this->prefix . T_WEIBO_COPY,
			$this->prefix . T_WEIBO_COPY . '_0',
			$this->prefix . T_WEIBO_COPY . '_1',
			$this->prefix . T_WEIBO_COPY . '_2',
			$this->prefix . T_WEIBO_COPY . '_3',
			$this->prefix . T_WEIBO_COPY . '_4',
			$this->prefix . T_WEIBO_COPY . '_5',
			$this->prefix . T_WEIBO_COPY . '_6',
			$this->prefix . T_WEIBO_COPY . '_7',
			$this->prefix . T_WEIBO_COPY . '_8',
			$this->prefix . T_WEIBO_COPY . '_9',
			$this->prefix . T_XT_SEO,
			$this->prefix . T_XT_CRON,
			$this->prefix . T_XT_SITEMAP,
			$this->prefix . T_XT_USER_ITEM . '_0',
			$this->prefix . T_XT_USER_ITEM . '_1',
			$this->prefix . T_XT_USER_ITEM . '_2',
			$this->prefix . T_XT_USER_ITEM . '_3',
			$this->prefix . T_XT_USER_ITEM . '_4',
			$this->prefix . T_XT_USER_ITEM . '_5',
			$this->prefix . T_XT_USER_ITEM . '_6',
			$this->prefix . T_XT_USER_ITEM . '_7',
			$this->prefix . T_XT_USER_ITEM . '_8',
			$this->prefix . T_XT_USER_ITEM . '_9',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_0',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_1',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_2',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_3',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_4',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_5',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_6',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_7',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_8',
			$this->prefix . T_XT_USER_ITEM_WEIBO . '_9',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_0',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_1',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_2',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_3',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_4',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_5',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_6',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_7',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_8',
			$this->prefix . T_XT_WOW_TAOKE_ITEM . '_9',
			$this->prefix . T_XT_WOW_USER_ITEM . '_0',
			$this->prefix . T_XT_WOW_USER_ITEM . '_1',
			$this->prefix . T_XT_WOW_USER_ITEM . '_2',
			$this->prefix . T_XT_WOW_USER_ITEM . '_3',
			$this->prefix . T_XT_WOW_USER_ITEM . '_4',
			$this->prefix . T_XT_WOW_USER_ITEM . '_5',
			$this->prefix . T_XT_WOW_USER_ITEM . '_6',
			$this->prefix . T_XT_WOW_USER_ITEM . '_7',
			$this->prefix . T_XT_WOW_USER_ITEM . '_8',
			$this->prefix . T_XT_WOW_USER_ITEM . '_9'
		);
	}

	/**
	 * 设置主控表名
	 * @param $table string 表名
	 *
	 */
	function setTable($table) {
		$this->table = $table;
	}

	/**
	 * 取得主控表名称
	 * @param $table_name string 表名称 
	 * @param $tb_prefix sting 表前缀，如不设置，则使用getPrefix()设置的前缀
	 * @return string
	 */
	function getTable($table_name = '', $tb_prefix = '') {
		if (empty ($tb_prefix)) {
			$tb_prefix = $this->getPrefix();
		}
		$table_name = trim($table_name);
		//分表（T_COMMENT_COPY,T_WEIBO_COPY,T_PAGE_MANAGER,T_SYS_CONFIG）
		//fixed 　by fxy060068 SCALE　OUT
		$table_name = $table_name == '' ? $this->table : $table_name;
		if (in_array($table_name, $this->SCALES)) { //如果需分表
			$table_name = $table_name . '_' . (substr(XT_USER_ID, strlen(XT_USER_ID) - 1)); //取最后一位，共10个分表
		}
		return $tb_prefix . $table_name;
	}

	/**
	 * 记录调用的SQL
	 * @param $sql string SQL语句
	 */
	function pushSql($sql) {
		array_push($this->querys, $sql);
		return $this->last_sql = $sql;
	}

	/**
	 * 设置是否每次查询完成后，是否自动释放内存
	 * @param $v boolean true表示自动释放，false关闭自动释放
	 */
	function setAutoFree($v) {
		$this->autoFree = (bool) $v;
	}

	/**
	 * 过滤字串
	 * @param $str string 要过滤的字串
	 * @return string
	 */
	function escape($str) {
		return mysql_escape_string($str);
		//return mysql_real_escape_string($str);
	}

	/**
	 * 得到最后插入记录的自增ID
	 * @return int
	 */
	function getInsertId() {
		return $this->state['last_insert_id'] ? $this->state['last_insert_id'] : false;
	}

	/**
	 * 由指定的值,取得一条记录
	 * @param $id int|string 要查询的ID或关键词,查询的字段由$id_name指定，默认查询名为id的字段
	 * @param $table string 表名称
	 * @param $id_name string 提供查询的字段名
	 * @return array
	 */
	function get($id, $table = '', $id_name = 'id') {
		if (!($table = $this->getTable($table))) {
			return false;
		}
		$where = '';
		//fixed by fxy060608
		if (in_array($table, $this->TABLES) && !strstr($id_name, 'user_id')) { //如果需要过滤,并且未指定
			$where = ' AND user_id = ' . XT_USER_ID;
		}
		$sql = 'SELECT * FROM ' . $table . ' WHERE `' . $this->escape($id_name) . '` =\'' . $this->escape($id) . '\'' . $where;

		return $this->getRow($sql);

	}

	/**
	 * 根据关键字删除记录,  只用作全等比较
	 * @param $id mixed 要查询的关键字
	 * @param $table string 表名称
	 * @param $id_name string 要查询的字段名，默认为id
	 * @return int|false 如果成功则返回影响行业,失败返回false
	 */
	function delete($id, $table = '', $id_name = 'id') {
		if (!$table = $this->getTable($table)) {
			return false;
		}
		if (!is_array($id)) {
			$id = explode(',', $id);
		}

		$ids_string = '';

		foreach ($id as $k => $v) {
			$ids_string .= ("'" . $this->escape(trim($v)) . "',");
		}
		$ids_string = substr($ids_string, 0, -1);
		if (empty ($ids_string)) {
			return false;
		}
		$where = '';
		//fixed by fxy060608
		if (in_array($table, $this->TABLES) && !strstr($id_name, 'user_id')) { //如果需要过滤,并且未指定
			$where = ' AND user_id = ' . XT_USER_ID;
		}
		$sql = 'DELETE FROM ' . $table . ' WHERE `' . $this->escape($id_name) . '` IN(' . $ids_string . ')' . $where;
		if (!$this->execute($sql)) {
			return false;
		}
		return $this->getAffectedRows();
	}

	/**
	 * 添加或插入数据
	 * @param $data 键/值对应的数组，其中键为字段名，值为要插入的内容
	 * @param $id int 更新时使用的关键字，如果指定该项，则执行更新操作
	 * @param $table string 表单名，如果不指定，则使用setTable()设置的默认表名
	 * @param $id_name string 字段名，更新时用于查询的字段，默认查询名为'id'的字段
	 * @return int|false 返回最后插入的记录ID或更新记录的ID,失败返回false
	 */
	function save($data, $id = '', $table = '', $id_name = 'id') {

		if ($id == '') {
			$type = 'insert';
		} else {
			$type = 'update';
		}
		$table = $this->getTable($table);
		if ($type == 'insert') {
			$keys = array ();
			$values = array ();
			foreach ($data as $key => $value) {
				$keys[] = '`' . $this->escape($key) . '`';
				$values[] = '\'' . $this->escape($value) . '\'';
			}
			if (sizeof($keys) != sizeof($values)) {
				return false;
			}
			$ignore = '';
			if ($this->ignore_insert) {
				$ignore = ' IGNORE ';
			}
			//fixed by fxy060608
			if (in_array($table, $this->TABLES) && !in_array('`user_id`', $keys)) { //如果需要过滤,并且未指定
				$keys[] = '`user_id`';
				$values[] = XT_USER_ID;
			}
			$sql = 'INSERT ' . $ignore . ' INTO ' . $table . '(' . implode(',', $keys) . ') VALUES(' . implode(',', $values) . ')';
			if (!$this->execute($sql)) {
				return false;
			}

			return $this->getInsertId();
		}
		$values = array ();
		foreach ($data as $key => $value) {
			$values[] = '`' . $this->escape(trim($key)) . '`=\'' . $this->escape($value) . '\'';
		}
		if (!sizeof($values)) {
			return false;
		}
		//fixed by fxy060608
		if (in_array($table, $this->TABLES) && !strstr($id_name, 'user_id')) { //如果需要过滤,并且未指定
			$id_name = '`user_id`=' . XT_USER_ID . ' AND `' . $this->escape($id_name) .'`';
		}
		$sql = 'UPDATE ' . $table . ' SET ' . implode(',', $values) . ' WHERE ' . $id_name . ' =\'' . $this->escape($id) . '\'';

		if (!$this->execute($sql)) {
			return false;
		}
		return $this->getAffectedRows();
	}

	/**
	 * 添加或插入数据
	 * @param $data 键/值对应的数组，其中键为字段名，值为要插入的内容
	 * @param $id int 更新时使用的关键字，如果指定该项，则执行更新操作
	 * @param $table string 表单名，如果不指定，则使用setTable()设置的默认表名
	 * @param $id_name string 字段名，更新时用于查询的字段，默认查询名为'id'的字段
	 * @return int|false 返回最后插入的记录ID或更新是否成,失败返回false
	 */
	function boolSave($data, $id = '', $table = '', $id_name = 'id') {
		$type = ($id == '') ? 'insert' : 'update';
		$table = $this->getTable($table);

		// insert
		if ($type == 'insert') {
			$keys = array ();
			$values = array ();
			foreach ($data as $key => $value) {
				$keys[] = '`' . $this->escape($key) . '`';
				$values[] = '\'' . $this->escape($value) . '\'';
			}
			if (sizeof($keys) != sizeof($values)) {
				return false;
			}

			$ignore = '';
			if ($this->ignore_insert) {
				$ignore = ' IGNORE ';
			}
			//fixed by fxy060608
			if (in_array($table, $this->TABLES) && !in_array('`user_id`', $keys)) { //如果需要过滤,并且未指定
				$keys[] = '`user_id`';
				$values[] = XT_USER_ID;
			}
			$sql = 'INSERT ' . $ignore . ' INTO ' . $table . '(' . implode(',', $keys) . ') VALUES(' . implode(',', $values) . ')';
			if ($this->execute($sql)) {
				return $this->getInsertId();
			}
			return false;
		}

		// update
		$values = array ();
		foreach ($data as $key => $value) {
			$values[] = '`' . $this->escape(trim($key)) . '`=\'' . $this->escape($value) . '\'';
		}
		if (!sizeof($values)) {
			return false;
		}
		//fixed by fxy060608
		if (in_array($table, $this->TABLES) && !strstr($id_name, 'user_id')) { //如果需要过滤,并且未指定
			$id_name = '`user_id`=' . XT_USER_ID . ' AND `' . $this->escape($id_name) .'`';
		}
		$sql = 'UPDATE ' . $table . ' SET ' . implode(',', $values) . ' WHERE ' . $id_name . ' =\'' . $this->escape($id) . '\'';
		return $this->execute($sql);
	}

	/**
	 * 得到读数据库连接(使用主从数据库)时，如果不是主从架构，则返回唯一的连接(主从设置可以站点根目录中的config.php中设置)
	 * @param $mode 'read'|'write' 使用读服务器还是写服务器
	 * @param $index int 指定要使用的读服务器配置项,如果不设置则随机选择配置项中指定的服务器，以达到读服务器均衡效果
	 * @param $reconnect boolean 指定是否强制重新连接,true为强制重连
	 * @return resource 返回mysql读数据库连接
	 */
	function getConnect($mode = 'write', $index = null, $reconnect = false) {
		$log_func_start_time = microtime(TRUE);
		static $connect = null;
		static $count_reconnect = 0; // 重连次数
		static $error_connect = 0; // 连接错误的服务器数
		$mode = in_array($mode, array (
			'write',
			'read'
		)) ? strtolower($mode) : 'write';

		// 如果第一次连接
		if (!isset ($connect[$mode]) || $reconnect !== false) {
			$count_reconnect = 0; // 重新计算重连次数
			// 如果设置时使用读服务器，但没有相关配置项，则尝试使用写服务器
			if ($mode == 'read' && isset ($this->params['slaves']) && !empty ($this->params['slaves'])) {
				// 配置的服务器数量
				$count = count($this->params['slaves']);
				if ($index === null || !is_int($index) || $index < 0 || $index >= $count) {
					$index = rand(0, $count -1);
				}
				$p = $this->params['slaves'][$index];
			} else {
				$p = $this->params;
			}

			// 检查配置项完整
			if (!(isset ($p['host']) && isset ($p['user']) && isset ($p['pwd']))) {
				$this->log('[getConnect]Mysql config error', $p);
				$this->debug && print ('Mysql config error');
				exit;
				//return $this->getWriteConnect();
			}
			if (!isset ($p['port'])) {
				$p['port'] = 3306;
			}

			$this->infoLog('[getConnect]Create Mysql (' . $mode . ')connection:Host:' . $p['host'] . ':' . $p['port'] . ' , User:' . $p['user']);
			$this->debug && print ('Create Mysql (' . $mode . ')connection:Host:' . $p['host'] . ':' . $p['port'] . ' , User:' . $p['user'] . ' , ' . $p['pwd'] . "<br />");
			$connect[$mode] = @ mysql_connect($p['host'] . ':' . $p['port'], $p['user'], $p['pwd']);

			// 如果连接失败，则尝试连接下一台读服务器
			if (!$connect[$mode]) {
				$this->log('[getConnect]数据库连接失败.Error:' . mysql_error(), $p);
				F('error', mysql_error());
				if ($mode == 'read') {
					++ $error_connect;
					//如查所有读服务器都连接失败,尝试连接写服务器
					if ($error_connect >= $count) {
						$this->infoLog('[getConnect]Try to connect next (write)server');
						$this->debug && print ('Try to connect next (write)server<br />' . "\n");
						return $this->getConnect();
					}

					if (++ $index > $count) {
						$index = 0;
					}

					$this->infoLog('[getConnect]Try to connect next (read)server');
					$this->debug && print ('Try to connect next (read)server<br />' . "\n");
					return $this->getConnect('read', $index);
				} else {
					$this->log('[getConnect]Connect Mysql server error', $p);
					exit ('Connect Mysql server error.<br />' . "\n");
				}
			}

			// 默认使用UTF8编码
			$p['charset'] = isset ($p['charset']) ? $p['charset'] : 'UTF8';
			$this->_setCharset($p['charset'], $connect[$mode]);
			//mysql_query('SET NAMES ' . $p['charset'], $connect[$mode]);

			// 默认使用和写数据库相同的库名
			if (!isset ($p['db'])) {
				$p['db'] = $this->params['db'];
			}

			$this->infoLog('[getConnect]Using db:' . $p['db']);
			$this->debug && print ('Using db:' . $p['db'] . "<br />\n");
			mysql_select_db($p['db'], $connect[$mode]);
		}

		// 如果出现长时间没mysql动作而引起超时，则尝试重连，重连次数为3
		if (!mysql_ping($connect[$mode])) {
			if ($count_reconnect < 3) {
				$count_reconnect++;
				mysql_close($connect[$mode]);

				$this->infoLog('[getConnect]Try reconnect');
				$this->debug && print ('Try reconnect<br />' . "\n");
				return $this->getConnect('read', $index, true);
			} else {
				$this->log('[getConnect]Reconnect MySQL read server error');
				$this->debug && print ("Reconnect MySQL read server error <br />\n");
				return false;
			}
		}
		//$this->last_query_connect = $connect;
		$this->waringLog($log_func_start_time, '[getConnect]数据库链接');
		return $connect[$mode];
	}

	/**
	 * 设置db charset
	 * @param string $charset
	 * @param resource $link_identifier
	 */
	function _setCharset($charset, $link_identifier) {
		$version = mysql_get_server_info($link_identifier);
		$charset = strtolower($charset);
		if ($version > '4.1') {
			$sql = $charset ? "character_set_connection={$charset}, character_set_results={$charset}, character_set_client=binary" : '';
			$sql .= $version > '5.0.1' ? ((empty ($sql) ? '' : ', ') . "sql_mode=''") : '';
			$sql && mysql_query("SET {$sql}", $link_identifier);
			$this->infoLog('[_setCharset]' . $sql);
		}
	}

	/**
	 * 根据SQL语句返回相应的数据库连接
	 * @param $sql string SQL语句
	 * @return resource mysql连接
	 */
	function autoConnect($sql = null) {
		$write_command = array (
			'insert',
			'update',
			'delete',
			'replace',
			'alter',
			'create',
			'drop',
			'rename',
			'truncate'
		);
		if ($sql !== null) {
			$sql = explode(' ', trim((string) $sql));
		}
		if ($sql === null || !in_array(strtolower($sql[0]), $write_command)) {
			return $this->getConnect('read');
		}
		return $this->getConnect();
	}

	/**
	 * 执行一SQL语句
	 * @param $sql string SQL语句
	 * @return int|false 失败则返回false,成功则返回mysql resource
	 */
	function execute($sql) {
		if (!defined('SQL_CHECK_SAFE') || SQL_CHECK_SAFE != false) {
			$_checkIns = & APP :: O('ids_checksql');
			if (!$_checkIns->check($sql)) {
				$_err = $_checkIns->error();
				$remote_addr = isset ($_SERVER['REMOTE_ADDR']) ? $this->escape($_SERVER['REMOTE_ADDR']) : '0.0.0.0';
				$detectip = $this->escape(F('get_client_ip'));
				$request_url = $this->escape(F('get_request_url'));
				$this->log('[execute][query_safe_error|' . $_err . ']|SQL:[' . $sql . ']', array (
					'REMOTE_ADDR' => $remote_addr,
					'ip' => $detectip,
					'url' => $request_url
				));
				if (defined('IS_DEBUG') && (IS_DEBUG == 'true' || true == IS_DEBUG)) {
					trigger_error('QUERY SAFE CHECK FAILURE! PLEASE SEE LOG FOR MORE DETAIL!', E_USER_ERROR);
				}
				exit ();
			}
		}

		$log_func_start_time = microtime(TRUE);
		$sql = $this->pushSql($sql);
		$conn = $this->autoConnect($sql);
		if (!$conn)
			return false;
		$rs = mysql_query($sql, $conn);
		if (!$rs) {
			$this->log('[execute]query error:' . mysql_error($conn) . '. SQL:' . $sql);
		}
		// 查询后的状态
		$this->state = array (
			'sql' => $sql,
			'result' => $rs,
			'last_insert_id' => mysql_insert_id($conn),
			'affected_rows' => mysql_affected_rows($conn),
			'error' => mysql_error($conn),
			'errno' => mysql_errno($conn)
		);

		$this->waringLog($log_func_start_time, '[execute]数据库查询', $this->state);
		$this->infoLog('[execute]查询后的状态', $this->state, $log_func_start_time);
		$this->debug && print_r($this->state);
		return $rs ? $rs : false;
	}

	/**
	 * 得到执行一SQL写操作后的影响记录行数
	 * @return int 返回受影响的记录行数
	 */
	function getAffectedRows() {
		return $this->state['affected_rows'];
	}

	/**
	 * 查询并返回查询结果
	 * @param $sql string SQL查询语句
	 * @return array|false 成功则返回二维数组
	 */
	function query($sql, $fetch_mode = MYSQL_ASSOC) {
		$log_func_start_time = microtime(TRUE);
		if (!$rs = $this->execute($sql)) {
			return false;
		}
		$data = array ();
		while ($row = mysql_fetch_array($rs, $fetch_mode)) {
			$data[] = $row;
		}

		if ($this->autoFree) {
			$this->free($rs);
		}
		$this->waringLog($log_func_start_time, "[query]数据库查询:sql=$sql");
		return $data;
	}

	/**
	 * 根据SQL查询，返回第一条记录中的一项
	 * @param $sql string SQL查询语句
	 * @param $index int 指定要返回第$index个字段的内容
	 * @return mixed|false 成功则返回指字段内容,如果找不到记录则返回一空数组
	 */
	function getOne($sql, $index = 0) {
		$rs = $this->getRow($sql);
		if ($rs === false) {
			return false;
		}
		return isset ($rs[$index]) ? $rs[$index] : array_shift($rs);
	}

	/**
	 * 得到一条记录
	 * @param $sql string SQL查询语句
	 * @return array|false 成功则返回第一条记录，找不到记录则返回空数组，失败返回false
	 */
	function getRow($sql) {
		$log_func_start_time = microtime(TRUE);
		if (!$rs = $this->execute($sql)) {
			return false;
		}
		$rst = mysql_fetch_array($rs, MYSQL_ASSOC);
		if (!$rst) {
			return array ();
		}
		if ($this->autoFree) {
			$this->free($rs);
		}

		$this->waringLog($log_func_start_time, "[getRow]数据库查询:sql=$sql");
		return $rst;
	}

	/**
	 * 得到最后一次执行的SQL语句
	 * @return string 最后一次执行的SQL语句
	 */
	function getLastQuery() {
		return $this->last_sql;
	}

	/**
	 * @return 得到mysql错误信息
	 */
	function getError() {
		return $this->state['error'];
	}

	/**
	 * 得到mysql错误号
	 * @return int 得到mysql错误号
	 */
	function getErrorNo() {
		return $this->state['errno'];
	}

	/**
	 * 释放mysql查询结果
	 * @param int query handle
	 */
	function free($query_id = "") {
		if ($query_id == '') {
			return;
		}
		mysql_free_result($query_id);
		$this->last_query_id = '';
	}

	/**
	 * 清空表
	 */
	function truncate($table) {
		$sql = 'TRUNCATE ' . $this->getTable($table);
		return $this->execute($sql);
	}

	/**
	 * 关闭mysql连接
	 */
	function close() {
		$conn = $this->getConnect('read');
		$conn && mysql_close($conn);
		$conn = $this->getConnect('write');
		$conn && mysql_close($conn);
	}

	/**
	 * 以数组的方式返回所有执行过的的mysql语句
	 * @return array
	 */
	function getHistory() {
		return $this->querys;
	}

	/**
	 * 主要组装用于对SQL中的IN查询进行SQL查询语句
	 * @param string|array $data
	 * @param array $param 相关组织参数
	 * bool num 参数内所有必须为数字，不是数组不进入IN。默认为true
	 */
	function SQLIN($data, $param = array ()) {
		$param = array_merge(array (
			'num' => true
		), $param);
		if (is_array($data)) {
			foreach ($data as $k => $v) {
				if ($param['num'] && !is_numeric($v)) {
					unset ($data[$k]);
					continue;
				}
				$data[$k] = '\'' . $this->escape($v) . '\'';
			}
			return implode(',', $data);
		}
		elseif ($param['num'] && !is_numeric($data)) {
			return '';
		} else {
			return '\'' . $this->escape($data) . '\'';
		}
	}

	/**
	 * 设置SQL检查参数，可以用数组设置。
	 * 详细信息请参考ids_checksql类的说明
	 * @param array|string $k
	 * @param mixed $v
	 */
	function checksql_set($k, $v = null) {
		$o = & APP :: O('ids_checksql');
		$o->setting($k, $v);
	}

}