package com.v5ent.rapid4j.jta;

import javax.transaction.xa.Xid;

/**
 * Xid包含三个元素：formatID、gtrid（全局事务标识符）和bqual（分支修饰词标识符）
 * 
 * @author Mignet
 *
 */
public class MyXid implements Xid {
	protected int formatId;
	protected byte gtrid[];
	protected byte bqual[];

	public MyXid() {
	};

	public MyXid(int formatId, byte gtrid[], byte bqual[]) {
		this.formatId = formatId;
		this.gtrid = gtrid;
		this.bqual = bqual;
	}

	public int getFormatId() {
		return formatId;
	}

	public byte[] getBranchQualifier() {
		return bqual;
	}

	public byte[] getGlobalTransactionId() {
		return gtrid;
	}

}