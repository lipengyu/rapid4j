package com.v5ent.rapid4j.core.sigmagrid;

/**
 * Sigma的page信息类
 * 
 * @author Mignet
 * @date 2010-5-31 上午10:39:05
 */
public class PageInfo {

	/** 每页显示条数. 这个值决定于 你创建grid时的设置 */
	private Integer pageSize;
	/** 当前页数 */
	private Integer pageNum;
	/** 总记录数. 这个值在第一次载入列表时 为 0 ,以后是什么值 取决于服务端返回的值. */
	private Integer totalRowNum;
	/** 总页数 */
	private Integer totalPageNum;
	/** 开始行号. 第一次载入列表或是查看列表的首页时,会传入1,(注意表示"开始行号"的数字是从1开始. */
	private Integer startRowNum;
	/** 结束行号.这个值会在客户端计算好之后发给服务端. */
	private Integer endRowNum;

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getTotalRowNum() {
		return totalRowNum;
	}

	public void setTotalRowNum(Integer totalRowNum) {
		this.totalRowNum = totalRowNum;
	}

	public Integer getTotalPageNum() {
		return totalPageNum;
	}

	public void setTotalPageNum(Integer totalPageNum) {
		this.totalPageNum = totalPageNum;
	}

	public Integer getStartRowNum() {
		return startRowNum;
	}

	public void setStartRowNum(Integer startRowNum) {
		this.startRowNum = startRowNum;
	}

	public Integer getEndRowNum() {
		return endRowNum;
	}

	public void setEndRowNum(Integer endRowNum) {
		this.endRowNum = endRowNum;
	}

}
