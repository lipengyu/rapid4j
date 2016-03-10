package com.v5ent.distributed.transaction;

/**
 *分布式事务异常类
 */
public class DistributTransactionException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	
	private String massage;

	public String getMassage() {
		return massage;
	}

	public void setMassage(String massage) {
		this.massage = massage;
	}

	public DistributTransactionException(String massage) {
		super(massage);
		this.massage = massage;
	}
	public DistributTransactionException() {
		super();
	}

}
