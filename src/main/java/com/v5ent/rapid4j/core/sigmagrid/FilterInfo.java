package com.v5ent.rapid4j.core.sigmagrid;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

/**
 * SIGMA的过滤信息
 * 
 * @author Mignet
 * @date 2010-5-31 上午10:46:59
 */
public class FilterInfo implements Constants {

	private String columnId;
	/** 列名 */
	private String fieldName;
	/** 过滤操作符；大于、小于、等于 ...等等 */
	private String logic;
	/** 值 */
	private Object value;

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

	public String getLogic() {
		return logic;
	}

	public void setLogic(String logic) {
		this.logic = logic;
	}

	public Object getValue() {
		return value;
	}

	@JsonDeserialize(using = ObjectDeserializer.class)
	public void setValue(Object value) {
		this.value = value;
	}

}
