package com.v5ent.rapid4j.jta;

/**
 *分布式事执行体
 */
public abstract class TransactionHandler{
	
	public abstract Object execute(TransactionLock transactionLock);
	
}
