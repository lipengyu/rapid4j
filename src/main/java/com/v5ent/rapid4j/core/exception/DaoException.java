package com.v5ent.rapid4j.core.exception;

/**
 * DaoException : 封装Dao(数据库访问)层发生的异常
 *
 * @author Mignet
 * @since 2014-09-27 18:17
 */
public class DaoException extends GenericException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7526904285432753932L;

	public DaoException(String message) {
        super(message);
    }

    public DaoException(String message, Throwable cause) {
        super(message, cause);
    }

}
