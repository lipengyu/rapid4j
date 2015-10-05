package com.v5ent.rapid4j.core.sigmagrid;

import java.util.List;

/**
 * 转换sigma传入的json字符串为Java对象
 * 
 * @author Mignet
 * @date 2010-5-31 上午10:38:25
 */
public class SigmaGrid<T> {
	private String action;
	private String recordType;
	private String exportType;
	private String exportFileName;
	// private String exception;
	/** 额外参数 */
	private Object parameters;
	// private Object queryParameters;
	/** 数据 */
	private List<T> data;
	/** 分页信息 */
	private PageInfo pageInfo;
	/** 过来信息 */
	private List<FilterInfo> filterInfo;
	/** 排序信息 */
	private List<SortInfo> sortInfo;
	/** 列信息 */
	private List<ColumnInfo> columnInfo;
	/** 有哪些字段 */
	private List<String> fieldsName;
	/** 插入的新数据 */
	private List<T> insertedRecords;
	/** 更新的数据 */
	private List<T> updatedRecords;
	/** 更新的字段 */
	private List<T> updatedFields;
	/** 删除的数据 */
	private List<T> deletedRecords;
	// private List success;
	// private List succeedData;
	// private List failedData;
	/** 是否服务端分页 */
	private Boolean remotePaging;
	/** 是否排序 */
	private Boolean remoteSort;
	/** 是否过滤 */
	private Boolean remoteFilter;
	/** 是否分组 */
	private Boolean remoteGroup;

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getRecordType() {
		return recordType;
	}

	public void setRecordType(String recordType) {
		this.recordType = recordType;
	}

	public String getExportType() {
		return exportType;
	}

	public void setExportType(String exportType) {
		this.exportType = exportType;
	}

	public String getExportFileName() {
		return exportFileName;
	}

	public void setExportFileName(String exportFileName) {
		this.exportFileName = exportFileName;
	}

	public Object getParameters() {
		return parameters;
	}

	public void setParameters(Object parameters) {
		this.parameters = parameters;
	}

	public PageInfo getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}

	public List<FilterInfo> getFilterInfo() {
		return filterInfo;
	}

	public void setFilterInfo(List<FilterInfo> filterInfo) {
		this.filterInfo = filterInfo;
	}

	public List<SortInfo> getSortInfo() {
		return sortInfo;
	}

	public void setSortInfo(List<SortInfo> sortInfo) {
		this.sortInfo = sortInfo;
	}

	public List<ColumnInfo> getColumnInfo() {
		return columnInfo;
	}

	public void setColumnInfo(List<ColumnInfo> columnInfo) {
		this.columnInfo = columnInfo;
	}

	public List<String> getFieldsName() {
		return fieldsName;
	}

	public void setFieldsName(List<String> fieldsName) {
		this.fieldsName = fieldsName;
	}

	public List<T> getInsertedRecords() {
		return insertedRecords;
	}

	public void setInsertedRecords(List<T> insertedRecords) {
		this.insertedRecords = insertedRecords;
	}

	public List<T> getUpdatedRecords() {
		return updatedRecords;
	}

	public void setUpdatedRecords(List<T> updatedRecords) {
		this.updatedRecords = updatedRecords;
	}

	/**
	 * 添加新数据的时候，要是修改了其中一个字段，这个时候会在updatedFields里面增加一个，但是在updatedRecords里面不会增加，
	 * 这个时候可以用这个方法来判断，如果两个都相等，则说明在这次更新里面没有添加的新数据的修改。返回更新了的字段，减少更新的字段数
	 */
	public List<T> getUpdatedFields() {
		if (this.updatedRecords.size() == this.updatedFields.size())
			return updatedFields;
		return updatedRecords;
	}

	public void setUpdatedFields(List<T> updatedFields) {
		this.updatedFields = updatedFields;
	}

	public List<T> getDeletedRecords() {
		return deletedRecords;
	}

	public void setDeletedRecords(List<T> deletedRecords) {
		this.deletedRecords = deletedRecords;
	}

	public Boolean getRemotePaging() {
		return remotePaging;
	}

	public void setRemotePaging(Boolean remotePaging) {
		this.remotePaging = remotePaging;
	}

	public Boolean getRemoteSort() {
		return remoteSort;
	}

	public void setRemoteSort(Boolean remoteSort) {
		this.remoteSort = remoteSort;
	}

	public Boolean getRemoteFilter() {
		return remoteFilter;
	}

	public void setRemoteFilter(Boolean remoteFilter) {
		this.remoteFilter = remoteFilter;
	}

	public Boolean getRemoteGroup() {
		return remoteGroup;
	}

	public void setRemoteGroup(Boolean remoteGroup) {
		this.remoteGroup = remoteGroup;
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

}
