package com.v5ent.rapid4j.core.orm.dialect;

/**
 * @author Mignet
 * @since 2014年5月18日 下午1:33:17
 **/
public class OracleDialect extends Dialect {

    @Override
    public String getLimitString(String sql, int offset, int limit) {
       return OraclePageHepler.getLimitString(sql, offset, limit);
    }

    @Override
    public String getCountString(String sql) {
    	return OraclePageHepler.getCountString(sql);
    }
    
}
