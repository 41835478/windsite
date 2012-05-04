package com.wind.core.dao;

import java.util.List;

/**
 * 封装分页和排序参数及分页查询结果.
 * 
 * @author fxy
 * 
 */
public class Page<T> {

	public static final int DEFAULT_PAGESIZE = 10;

	public static final int DEFAULT_PAGE = 1;

	private int pageNo = DEFAULT_PAGE;

	private int pageSize = DEFAULT_PAGESIZE;

	private int totalCount = -1;

	@SuppressWarnings("unused")
	private int totalPageCount = 0;

	private List<T> list = null;

	public Page() {
	}

	public Page(int pageNo, int pageSize) {
		this.pageNo = pageNo;
		this.pageSize = pageSize;
	}

	public Page(int pageNo, List<T> list, int pageSize, int totalCount) {
		this.pageNo = pageNo;
		this.list = list;
		this.pageSize = pageSize;
		this.totalCount = totalCount;
	}

	/**
	 * 第一条记录在结果集中的位置,序号从0开始.
	 */
	public int getStart() {
		if (pageNo < 0 || pageSize < 0)
			return -1;
		else
			return ((pageNo - 1) * pageSize);
	}

	/**
	 * 总页数.
	 */
	public int getTotalPageCount() {
		int count = totalCount / pageSize;
		if (totalCount % pageSize > 0) {
			count++;
		}
		totalPageCount = count;
		return count;
	}

	/**
	 * 是否还有下一页.
	 */
	public boolean isHasNextPage() {
		return (pageNo + 1 <= getTotalPageCount());
	}

	/**
	 * 返回下页的页号,序号从1开始.
	 */
	public int getNextPage() {
		if (isHasNextPage())
			return pageNo + 1;
		else
			return pageNo;
	}

	/**
	 * 是否还有上一页.
	 */
	public boolean isHasPrePage() {
		return (pageNo - 1 >= 1);
	}

	/**
	 * 返回上页的页号,序号从1开始.
	 */
	public int getPrePage() {
		if (isHasPrePage())
			return pageNo - 1;
		else
			return pageNo;
	}

	/**
	 * 每页的记录数量.
	 */
	public int getPageSize() {
		return pageSize;
	}

	public Page<T> setPageSize(int pageSize) {
		this.pageSize = pageSize;
		return this;
	}

	/**
	 * 当前页的页号,序号从1开始.
	 */
	public int getPageNo() {
		return pageNo;
	}

	public Page<T> setPageNo(int page) {
		this.pageNo = page;
		return this;
	}

	/**
	 * 页内的数据列表.
	 */
	public List<T> getList() {
		return list;
	}

	public Page<T> setList(List<T> list) {
		this.list = list;
		return this;
	}

	/**
	 * 总记录数量.
	 */
	public int getTotalCount() {
		return totalCount;
	}

	public Page<T> setTotalCount(int totalCount) {
		this.totalCount = totalCount;
		return this;
	}
}
