package com.wind.site.util;

import java.util.ArrayList;
import java.util.List;

import com.wind.site.model.TaobaoKeyword;

public class TaobaoKeywordResult {
	private Long lastPage;// : 23,
	private Long items;// : 443,
	private Long page;// : 2,
	private Long beginIndex;// : 21,
	private Long pages;// : 23,
	private Long length;// : 20,

	private Long firstPage;// : 1,
	private Long endIndex;// : 40,
	private Long offset;// : 20,
	private Long itemsPerPage;// : 20
	private List<TaobaoKeyword> words = new ArrayList<TaobaoKeyword>();

	/**
	 * @return the lastPage
	 */
	public Long getLastPage() {
		return lastPage;
	}

	/**
	 * @param lastPage
	 *            the lastPage to set
	 */
	public void setLastPage(Long lastPage) {
		this.lastPage = lastPage;
	}

	/**
	 * @return the items
	 */
	public Long getItems() {
		return items;
	}

	/**
	 * @param items
	 *            the items to set
	 */
	public void setItems(Long items) {
		this.items = items;
	}

	/**
	 * @return the page
	 */
	public Long getPage() {
		return page;
	}

	/**
	 * @param page
	 *            the page to set
	 */
	public void setPage(Long page) {
		this.page = page;
	}

	/**
	 * @return the beginIndex
	 */
	public Long getBeginIndex() {
		return beginIndex;
	}

	/**
	 * @param beginIndex
	 *            the beginIndex to set
	 */
	public void setBeginIndex(Long beginIndex) {
		this.beginIndex = beginIndex;
	}

	/**
	 * @return the pages
	 */
	public Long getPages() {
		return pages;
	}

	/**
	 * @param pages
	 *            the pages to set
	 */
	public void setPages(Long pages) {
		this.pages = pages;
	}

	/**
	 * @return the length
	 */
	public Long getLength() {
		return length;
	}

	/**
	 * @param length
	 *            the length to set
	 */
	public void setLength(Long length) {
		this.length = length;
	}

	/**
	 * @return the firstPage
	 */
	public Long getFirstPage() {
		return firstPage;
	}

	/**
	 * @param firstPage
	 *            the firstPage to set
	 */
	public void setFirstPage(Long firstPage) {
		this.firstPage = firstPage;
	}

	/**
	 * @return the endIndex
	 */
	public Long getEndIndex() {
		return endIndex;
	}

	/**
	 * @param endIndex
	 *            the endIndex to set
	 */
	public void setEndIndex(Long endIndex) {
		this.endIndex = endIndex;
	}

	/**
	 * @return the offset
	 */
	public Long getOffset() {
		return offset;
	}

	/**
	 * @param offset
	 *            the offset to set
	 */
	public void setOffset(Long offset) {
		this.offset = offset;
	}

	/**
	 * @return the itemsPerPage
	 */
	public Long getItemsPerPage() {
		return itemsPerPage;
	}

	/**
	 * @param itemsPerPage
	 *            the itemsPerPage to set
	 */
	public void setItemsPerPage(Long itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
	}

	/**
	 * @return the words
	 */
	public List<TaobaoKeyword> getWords() {
		return words;
	}

	/**
	 * @param words
	 *            the words to set
	 */
	public void setWords(List<TaobaoKeyword> words) {
		this.words = words;
	}

}
