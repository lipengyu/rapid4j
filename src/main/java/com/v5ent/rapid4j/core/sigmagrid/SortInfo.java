package com.v5ent.rapid4j.core.sigmagrid;

/**
 * sigma的排序信息
 * 
 * @author Mignet
 * @date 2010-5-31 上午10:45:54
 */
public class SortInfo {

	private String columnId;
	private String fieldName;
	/** 排序 desc\asc */
	private String sortOrder;
	/** 排序值 */
	private String getSortValue;
	/** 排序的函数 */
	private String sortFn;

	public String getColumnId() {
		return columnId;
	}

	public void setColumnId(String columnId) {
		this.columnId = columnId;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public String getGetSortValue() {
		return getSortValue;
	}

	public void setGetSortValue(String getSortValue) {
		this.getSortValue = getSortValue;
	}

	public String getSortFn() {
		return sortFn;
	}

	public void setSortFn(String sortFn) {
		this.sortFn = sortFn;
	}

}
