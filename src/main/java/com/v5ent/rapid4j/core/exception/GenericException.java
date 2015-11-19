package com.v5ent.rapid4j.core.exception;

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
    private long date = System.currentTimeMillis();

    public long getDate() {
        return date;
    }
}
