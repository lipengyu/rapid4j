package com.v5ent.rapid4j.jta;

import java.util.UUID;

/**
 *分布式事务工具類
 */
public class TransactionUtils{
	/**
	 * String uuid
	 */
	public static String generatorStringUuid(){
		return UUID.randomUUID().toString().replace("-", "").toUpperCase();
	}
	/**
	 * 前缀"/"的路径字符串
	 */
	public static String generatorTransactionPath(){
		StringBuilder builder=new StringBuilder();
		builder.append("/").append(generatorStringUuid());
		return builder.toString();
	}
	/**
	 * 前缀"/"的路径字符串
	 * @param namespace 空间路径
	 */
	public static String generatorTransactionPath(String namespace){
		StringBuilder builder=new StringBuilder();
		builder.append("/").append(namespace).append("/").append(generatorStringUuid());
		return builder.toString();
	}
}