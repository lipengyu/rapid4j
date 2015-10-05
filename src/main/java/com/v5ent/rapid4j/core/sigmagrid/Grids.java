package com.v5ent.rapid4j.core.sigmagrid;

/**
 * 
 * 
 * @author Mignet
 * @date 2011-8-2 下午3:20:49
 */
public class Grids {

	/**
	 * 把pojo字段反转为数据库字段
	 * 
	 * @param field
	 * @return
	 */
	public static String toClumn(String field) {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < field.length(); i++) {
			char c = field.charAt(i);
			if (Character.isUpperCase(c) && i > 0) {
				sb.append('_').append(Character.toUpperCase(c));
			} else {
				sb.append(Character.toUpperCase(c));
			}
		}
		return sb.toString();
	}
}
