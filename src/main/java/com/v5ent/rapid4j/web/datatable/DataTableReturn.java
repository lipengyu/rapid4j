package com.v5ent.rapid4j.web.datatable;

import java.util.List;

/**
 * DataTables期望的返回数据格式
 * 
 * @author Mignet
 * @date 2011-7-26 上午11:23:17
 */
public class DataTableReturn {
	/**
	 * 总记录数
	 */
	private Integer recordsTotal;
	/**
	 * 过滤后总记录数
	 */
	private Integer recordsFiltered;
	
	/**
	 * The draw counter that this object is a response to - from the draw parameter sent as part of the data request. <br>
	 * Note that it is <b>strongly recommended for security reasons that you cast this parameter to an integer</b>, <br>
	 * rather than simply echoing back to the client what it sent in the draw parameter, in order to prevent Cross Site Scripting (XSS) attacks.
	 */
	private Integer draw;

	/**
	 * 返回的具体数据
	 */
	private List<?> data;
	
	/**
	 * Optional: If an error occurs 
	 */
	private String error;

	public Integer getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(Integer recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public Integer getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(Integer recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public Integer getDraw() {
		return draw;
	}

	public void setDraw(Integer draw) {
		this.draw = draw;
	}

	public List<?> getData() {
		return data;
	}

	public void setData(List<?> data) {
		this.data = data;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

}
