package com.v5ent.rapid4j.core.datatable;

/**
 * 排序值
 * 
 * @author Mignet
 * @date 2011-7-26 下午3:07:40
 */
public class SortInfo {

	/**
	 * 排序列名
	 */
	private String columnId;
	/**
	 * desc or asc
	 */
	private String sortOrder;

	/**
	 * @return 排序列名
	 */
	public String getColumnId() {
		return columnId;
	}

	/**
	 * @param columnId
	 *            排序列名
	 */
	public void setColumnId(String columnId) {
		this.columnId = columnId;
	}

	/**
	 * @return desc or asc
	 */
	public String getSortOrder() {
		return sortOrder;
	}

	/**
	 * @param sortOrder
	 *            desc or asc
	 */
	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

}
