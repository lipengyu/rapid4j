package com.v5ent.rapid4j.core.sigmagrid;

/**
 * sigma的列信息
 * 
 * @author Mignet
 * @date 2010-5-31 上午10:41:44
 */
public class ColumnInfo {

	private String id;
	private String header;
	private String fieldName;
	private String fieldIndex;
	/** 排序信息；desc asc */
	private String sortOrder;
	/** 是否隐藏 */
	private Boolean hidden;
	/** 是否导出 */
	private Boolean exportable;
	/** 是否打印 */
	private Boolean printable;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldIndex() {
		return fieldIndex;
	}

	public void setFieldIndex(String fieldIndex) {
		this.fieldIndex = fieldIndex;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Boolean getHidden() {
		return hidden;
	}

	public void setHidden(Boolean hidden) {
		this.hidden = hidden;
	}

	public Boolean getExportable() {
		return exportable;
	}

	public void setExportable(Boolean exportable) {
		this.exportable = exportable;
	}

	public Boolean getPrintable() {
		return printable;
	}

	public void setPrintable(Boolean printable) {
		this.printable = printable;
	}

}
