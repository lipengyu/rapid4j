package com.v5ent.rapid4j.core.orm.dialect;

/**
 * @author Mignet
 * @since 2014年5月18日 下午1:33:17
 **/
public class OracleDialect extends Dialect {

    @Override
    public String getLimitString(String sql, int offset, int limit) {

        sql = sql.trim();
        boolean isForUpdate = false;
        if (sql.toLowerCase().endsWith(" for update")) {
            sql = sql.substring(0, sql.length() - 11);
            isForUpdate = true;
        }

        StringBuffer pagingSelect = new StringBuffer(sql.length() + 100);

        pagingSelect.append("select * from ( select row_.*, rownum rownum_ from ( ");

        pagingSelect.append(sql);

        pagingSelect.append(" ) row_ ) where rownum_ > " + offset + " and rownum_ <= " + (offset + limit));

        if (isForUpdate) {
            pagingSelect.append(" for update");
        }

        return pagingSelect.toString();
    }

    @Override
    public String getCountString(String querySelect) {
    	 querySelect = getLineSql(querySelect);
         String sql =new StringBuilder("select count(1) count from (").append(querySelect).append(" ) t").toString();
         return sql;
    }
    
    /**
     * 将SQL语句变成一条语句，并且每个单词的间隔都是1个空格
     * 
     * @param sql
     *            SQL语句
     * @return 如果sql是NULL返回空，否则返回转化后的SQL
     */
    private static String getLineSql(String sql) {
        return sql.replaceAll("[\r\n]", " ").replaceAll("\\s{2,}", " ");
    }
}
