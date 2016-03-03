package com.v5ent.rapid4j.core.exception;

import java.text.SimpleDateFormat;

/**
 * GenericException : 异常基类
 *
 * @author Mignet
 * @since 2014-09-27 18:12
 */
public class GenericException extends RuntimeException {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3365925877852274904L;
	/**
	 * 异常发生时间
	 */
	private static long date = System.currentTimeMillis();

	private static String getDateStr() {
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
	}

	public GenericException(String message) {
		super(String.format("[%s]:%s", getDateStr() , message));
	}

	public GenericException(String message, Throwable cause) {
		super(String.format("[%s]:%s", getDateStr() , message), cause);
	}
}
