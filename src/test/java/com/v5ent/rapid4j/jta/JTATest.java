package com.v5ent.rapid4j.jta;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.XAConnection;
import javax.sql.XADataSource;
import javax.transaction.xa.XAException;
import javax.transaction.xa.XAResource;
import javax.transaction.xa.Xid;

import org.postgresql.xa.PGXADataSource;
/**
 * 测试JTA(Java分布式事务)
 * @author Mignet
 *
 */
public class JTATest {
	public static void main(String[] args) {
		XADataSource xaDS;
		XAConnection xaCon = null;
		XAResource xaRes;
		Xid xid;
		Connection con = null;
		Statement stmt = null;
		int ret;
		try {
			xaDS = getDataSource();
			xaCon = xaDS.getXAConnection("postgres", "postgres");
			xaRes = xaCon.getXAResource();
			con = xaCon.getConnection();
			stmt = con.createStatement();
			xid = new MyXid(100, new byte[] { 0x01 }, new byte[] { 0x02 });
			//两步提交协议,提交
			xaRes.start(xid, XAResource.TMNOFLAGS);
			stmt.executeUpdate("insert into test_table values (100)");
			xaRes.end(xid, XAResource.TMSUCCESS);
			ret = xaRes.prepare(xid);
			if (ret == XAResource.XA_OK) {
				xaRes.commit(xid, false);
			}else{
				xaRes.rollback(xid);
			}
			//示例2,回滚
			xaRes.start(xid, XAResource.TMNOFLAGS);
			stmt.executeUpdate("insert into test_table values (100)");
			xaRes.end(xid, XAResource.TMSUCCESS);
			ret = xaRes.prepare(xid);
			if (ret == XAResource.XA_OK) {
				xaRes.rollback(xid);
			}
			//示例3,说明一个分布式事务分支如何暂停，让相同的连接做本地事务处理，以及它们稍后该如何继续这个分支。 分布式事务的两步提交不影响本地事务。
			xid = new MyXid(100, new byte[]{0x01}, new byte[]{0x02});
			xaRes.start(xid, XAResource.TMNOFLAGS);
			stmt.executeUpdate("insert into test_table values (100)");
			xaRes.end(xid, XAResource.TMSUSPEND);
			//------------这个更新在事务范围之外完成，所以它不受XA返回影响------------
			stmt.executeUpdate("insert into test_table2 values (111)");
			xaRes.start(xid, XAResource.TMRESUME);
			stmt.executeUpdate("insert into test_table values (200)");
			xaRes.end(xid, XAResource.TMSUCCESS);
			ret = xaRes.prepare(xid);
			if (ret == XAResource.XA_OK) {
				xaRes.rollback(xid);
			}
		} catch (XAException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				stmt.close();
				con.close();
				xaCon.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	public static XADataSource getDataSource() throws SQLException {
		PGXADataSource xaDS = new PGXADataSource();
		xaDS.setDatabaseName("postgres");
		xaDS.setServerName("localhost");
		xaDS.setPortNumber(5432);
		return xaDS;
	}
}
