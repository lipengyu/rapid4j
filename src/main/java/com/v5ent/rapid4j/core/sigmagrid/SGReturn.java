package com.v5ent.rapid4j.core.sigmagrid;

import java.util.List;

/**
 * sigma Grid的返回值
 * 
 * @author Mignet
 * @date 2011-6-18 下午04:18:35
 */
public class SGReturn {

	/**
	 * 返回数据
	 */
	private List<?> data;

	/**
	 * 分页信息
	 */
	private PageInfo pageInfo;

	public SGReturn() {
	}

	public SGReturn(List<?> data, PageInfo pageInfo) {
		this.data = data;
		this.pageInfo = pageInfo;
	}

	/**
	 * @return 返回数据
	 */
	public List<?> getData() {
		return data;
	}

	/**
	 * @param data
	 *            返回数据
	 */
	public void setData(List<?> data) {
		this.data = data;
	}

	/**
	 * @return 分页信息
	 */
	public PageInfo getPageInfo() {
		return pageInfo;
	}

	/**
	 * @param pageInfo
	 *            分页信息
	 */
	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}

}
