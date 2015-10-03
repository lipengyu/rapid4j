package com.v5ent.rapid4j.core.datatable;

import java.util.List;

/**
 * datatables的json对象
 * 
 * @author Mignet
 * @date 2011-7-26 下午3:02:38
 */
public class DataTable {

	/**
	 * 列数
	 */
	private Integer columnNum;
	private Integer echo;
	/**
	 * 开始行号
	 */
	private Integer displayStart;
	/**
	 * 每页多少条记录
	 */
	private Integer displayLength;
	/**
	 * 有多少列排序，基本无用
	 */
	private Integer iSortingCols;
	private String columns;
	/**
	 * 快速查询
	 */
	private String search;
	private Boolean regex;

	private List<FilterInfo> filterInfo;
	private List<SortInfo> sortInfo;
	private List<ColumnInfo> columnInfo;

	/**
	 * @return 列数
	 */
	public Integer getColumnNum() {
		return columnNum;
	}

	/**
	 * @param columnNum
	 *            列数
	 */
	public void setColumnNum(Integer columnNum) {
		this.columnNum = columnNum;
	}

	/**
	 * @return
	 */
	public Integer getEcho() {
		return echo;
	}

	/**
	 * @param echo
	 */
	public void setEcho(Integer echo) {
		this.echo = echo;
	}

	/**
	 * @return 开始行号
	 */
	public Integer getDisplayStart() {
		return displayStart;
	}

	/**
	 * @param displayStart
	 *            开始行号
	 */
	public void setDisplayStart(Integer displayStart) {
		this.displayStart = displayStart;
	}

	/**
	 * @return 每页多少条记录
	 */
	public Integer getDisplayLength() {
		return displayLength;
	}

	/**
	 * @param displayLength
	 *            每页多少条记录
	 */
	public void setDisplayLength(Integer displayLength) {
		this.displayLength = displayLength;
	}

	/**
	 * @return 有多少列排序，基本无用
	 */
	public Integer getiSortingCols() {
		return iSortingCols;
	}

	/**
	 * @param iSortingCols
	 *            有多少列排序，基本无用
	 */
	public void setiSortingCols(Integer iSortingCols) {
		this.iSortingCols = iSortingCols;
	}

	/**
	 * @return
	 */
	public String getColumns() {
		return columns;
	}

	/**
	 * @param columns
	 */
	public void setColumns(String columns) {
		this.columns = columns;
	}

	/**
	 * @return 快速查询
	 */
	public String getSearch() {
		return search;
	}

	/**
	 * @param search
	 *            快速查询
	 */
	public void setSearch(String search) {
		this.search = search;
	}

	/**
	 * @return
	 */
	public Boolean getRegex() {
		return regex;
	}

	/**
	 * @param regex
	 */
	public void setRegex(Boolean regex) {
		this.regex = regex;
	}

	/**
	 * @return
	 */
	public List<FilterInfo> getFilterInfo() {
		return filterInfo;
	}

	/**
	 * @param filterInfo
	 */
	public void setFilterInfo(List<FilterInfo> filterInfo) {
		this.filterInfo = filterInfo;
	}

	/**
	 * @return
	 */
	public List<SortInfo> getSortInfo() {
		return sortInfo;
	}

	/**
	 * @param sortInfo
	 */
	public void setSortInfo(List<SortInfo> sortInfo) {
		this.sortInfo = sortInfo;
	}

	/**
	 * @return
	 */
	public List<ColumnInfo> getColumnInfo() {
		return columnInfo;
	}

	/**
	 * @param columnInfo
	 */
	public void setColumnInfo(List<ColumnInfo> columnInfo) {
		this.columnInfo = columnInfo;
	}

}
