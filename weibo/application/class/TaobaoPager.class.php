<?php
class TaobaoPager {
	// 起始行数
	public $firstRow;
	// 列表每页显示行数
	public $listRows;
	// 分页总页面数
	public $totalPages;
	// 总行数
	public $totalRows;
	// 当前页数
	public $nowPage;
	// 分页的栏的总页数
	public $coolPages;
	// 分页栏每页显示的页数
	public $rollPage;

	// 分页显示定制
	protected $config = array (
		'top' => '<div class="page-top"><span class="page-info">%nowPage%/%totalPage%</span>%upPage% %downPage%</div>',
		'bottom' => '%upPage% %linkPage% %breakPage% %downPage% <span class="page-skip">共%totalPage%页<!-- 到第<input type="text" value="%nowPage%" size="3" id="J_JumpPage" title="指定页码">页<input type="button" title="指定页码" id="J_JumpTo" value="确定">--></span>'
	);

	/**
	 +----------------------------------------------------------
	 * 架构函数
	 +----------------------------------------------------------
	 * @access public
	 +----------------------------------------------------------
	 * @param array $totalRows  总的记录数
	 * @param array $listRows  每页显示记录数
	 * @param array $parameter  分页跳转的参数
	 +----------------------------------------------------------
	 */
	public function __construct($totalRows, $listRows, $page_no = 1) {
		$this->totalRows = $totalRows;
		$this->rollPage = 6;
		$this->listRows = !empty ($listRows) ? $listRows : 20;
		$this->totalPages = ceil($this->totalRows / $this->listRows); //总页数
		if ($this->totalPages > 100) { //控制仅显示100页
			$this->totalPages = 100;
		}
		$this->coolPages = ceil($this->totalPages / $this->rollPage);
		$this->nowPage = !empty ($page_no) ? $page_no : 1;
		if (!empty ($this->totalPages) && $this->nowPage > $this->totalPages) {
			$this->nowPage = $this->totalPages;
		}
		$this->firstRow = $this->listRows * ($this->nowPage - 1);
	}

	/**
	 +----------------------------------------------------------
	 * 分页显示输出
	 +----------------------------------------------------------
	 * @access public
	 +----------------------------------------------------------
	 */
	public function show($route, $queryStr, $theme, $isAjax = false) {
		if (0 == $this->totalRows)
			return '';
		$p = 'page_no';
		$nowCoolPage = ceil($this->nowPage / $this->rollPage);
		$url = '';
		$queryStr['page_no'] = 'PAGENO';
		$url = URL($route, array_filter($queryStr));
		//上下翻页字符串
		$upRow = $this->nowPage - 1;
		$downRow = $this->nowPage + 1;
		if ($upRow > 0) {
			if ($isAjax) {
				$upPage = '<a href="#" data-page="' . $upRow . '" class="page-prev"><span>上一页</span></a>';
			} else {
				$upPage = '<a href="' . str_replace('PAGENO', $upRow, $url . '') . '" class="page-prev"><span>上一页</span></a>';
			}
		} else {
			$upPage = "";
		}
		if ($downRow <= $this->totalPages) {
			if ($isAjax) {
				$downPage = '<a href="#" data-page="' . $downRow . '" class="page-next"><span>下一页</span></a>';
			} else {
				$downPage = '<a href="' . str_replace('PAGENO', $downRow, $url . '') . '" class="page-next"><span>下一页</span></a>';
			}

		} else {
			$downPage = "";
		}
		$linkPage = "";
		$breakPage = "";
		if ($this->totalPages == 1) {
			$linkPage .= '<span class="page-cur">1</span>';
		}
		for ($i = 1; $i <= $this->rollPage; $i++) {
			$page = ($nowCoolPage -1) * $this->rollPage + $i;
			if ($page != $this->nowPage) {
				if ($page <= $this->totalPages) {
					if ($isAjax) {
						$linkPage .= '<a href="#" data-page="' . $page . '">' . $page . '</a>';
					} else {
						$linkPage .= '<a href="' . str_replace('PAGENO', $page, $url . '') . '">' . $page . '</a>';
					}
				} else {
					break;
				}
			} else {
				if ($this->totalPages != 1) {
					$linkPage .= '<span class="page-cur">' . $page . '</span>';
				}
			}
			if ($i == $this->rollPage && $page < $this->totalPages) {
				$breakPage .= '<span class="page-break">...</span>';
			}
		}
		$pageStr = str_replace(array (
			'%nowPage%',
			'%totalRow%',
			'%totalPage%',
			'%upPage%',
			'%downPage%',
			'%linkPage%',
			'%breakPage%'
		), array (
			$this->nowPage,
			$this->totalRows,
			$this->totalPages,
			$upPage,
			$downPage,
			$linkPage,
			$breakPage
		), $this->config[$theme]);
		return $pageStr;
	}

}
?>