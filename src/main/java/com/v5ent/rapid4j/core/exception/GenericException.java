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
	private static final long serialVersionUID = -6338795859789028988L;
	/**
     * 异常发生时间
     */
    private static long date = System.currentTimeMillis();

    private static String getDateStr() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
    }
    
    public GenericException(String message) {
        super("["+getDateStr()+"]"+message);
    }

    public GenericException(String message, Throwable cause) {
        super("["+getDateStr()+"]"+message, cause);
    }
}
