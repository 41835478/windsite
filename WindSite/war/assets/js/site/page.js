/**
 * 封装分页和排序参数及分页查询结果.
 * 
 * @author fxy
 * 
 */
function Page(totalCount) {

	this.DEFAULT_PAGESIZE = 10;

	this.DEFAULT_PAGE = 1;

	this.pageNo = this.DEFAULT_PAGE;

	this.pageSize = this.DEFAULT_PAGESIZE;

	this.totalCount = totalCount;

	/**
	 * 第一条记录在结果集中的位置,序号从0开始.
	 */
	this.getStart = function() {
		if (this.pageNo < 0 || this.pageSize < 0)
			return -1;
		else
			return ((this.pageNo - 1) * this.pageSize);
	}

	/**
	 * 总页数.
	 */
	this.getTotalPageCount = function() {
		var count = parseInt(this.totalCount / this.pageSize);
		if (this.totalCount % this.pageSize > 0) {
			count++;
		}
		return count;
	}

	/**
	 * 是否还有下一页.
	 */
	this.isHasNextPage = function() {
		return (this.pageNo + 1 <= this.getTotalPageCount());
	}

	/**
	 * 返回下页的页号,序号从1开始.
	 */
	this.getNextPage = function() {
		if (this.isHasNextPage())
			return this.pageNo + 1;
		else
			return this.pageNo;
	}

	/**
	 * 是否还有上一页.
	 */
	this.isHasPrePage = function() {
		return (this.pageNo - 1 >= 1);
	}

	/**
	 * 返回上页的页号,序号从1开始.
	 */
	this.getPrePage = function() {
		if (this.isHasPrePage())
			return this.pageNo - 1;
		else
			return this.pageNo;
	}

	/**
	 * 每页的记录数量.
	 */
	this.getPageSize = function() {
		return this.pageSize;
	}

	this.setPageSize = function(pageSize) {
		this.pageSize = pageSize;
		return this;
	}

	/**
	 * 当前页的页号,序号从1开始.
	 */
	this.getPageNo = function() {
		return this.pageNo;
	}

	this.setPageNo = function(page) {
		this.pageNo = page;
		return this;
	}

	/**
	 * 总记录数量.
	 */
	this.getTotalCount = function() {
		return this.totalCount;
	}

	this.setTotalCount = function(totalCount) {
		this.totalCount = totalCount;
		return this;
	}
}
