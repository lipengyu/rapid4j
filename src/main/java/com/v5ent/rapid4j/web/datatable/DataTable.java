package com.v5ent.rapid4j.web.datatable;

import java.util.List;

/**
 * datatables的json对象
 * 
 * @author Mignet
 * @date 2011-7-26 下午3:02:38
 */
public class DataTable {
	
	/**
	 * Draw counter. This is used by DataTables to ensure that the Ajax returns from server-side processing requests are drawn in sequence by DataTables (Ajax requests are asynchronous and thus can return out of sequence). This is used as part of the draw return parameter (see below).
	 */
	private int draw;
	
	/**
	 * Paging first record indicator. This is the start point in the current data set (0 index based - i.e. 0 is the first record).
	 */
	private int start;
	
	/**
	 * 每页多少条记录
	 */
	private int length;
	
	private List<ColumnInfo> columns;
	private List<OrderInfo> order;
	private SearchInfo search;
	
	public List<ColumnInfo> getColumns() {
		return columns;
	}
	public void setColumns(List<ColumnInfo> columns) {
		this.columns = columns;
	}
	public List<OrderInfo> getOrder() {
		return order;
	}
	public void setOrder(List<OrderInfo> order) {
		this.order = order;
	}
	public SearchInfo getSearch() {
		return search;
	}
	public void setSearch(SearchInfo search) {
		this.search = search;
	}
	public int getDraw() {
		return draw;
	}
	public void setDraw(int draw) {
		this.draw = draw;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}


}
