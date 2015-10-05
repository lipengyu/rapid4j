package com.v5ent.rapid4j.core.sigmagrid;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.regex.Pattern;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

/**
 * 查询字段的转换，当要查询的字段里有date类型的时候，需要转换为date类型，这个时候就要用到这个类
 * <p>
 * 字段转换，比如 date 其他的varchar，和long 等等 例如：<br>
 * JsonDeserialize(using = ObjectDeserializer.class) public void setValue(Object
 * value) { this.value = value; } <br>
 * 详情见 FilterInfo.java和Addparams.java
 * <p>
 * 加入特殊符号@的原因是因为：比如name字段为varchar，birthday字段为date。但是如果客户输入的name是个时间，那么会转换为时间，
 * 在这里报错。所以加入特殊字符以区分。
 * 
 * @author Mignet
 * @date 2010-7-20 下午02:03:55
 */
public class ObjectDeserializer extends JsonDeserializer<Object> {
	/** 日期判断 */
	private static final String DATE_PATTERN = "~(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)~";
	/** 日期时间判断 */
	private static final String DATE_TIME_PATTERN = "~(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31) ([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])~";
	/** 日期时间格式化 */
	private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	/** 日期格式化 */
	private static final String DATE_FORMAT = "yyyy-MM-dd";

	private SimpleDateFormat sdtf = new SimpleDateFormat(DATE_TIME_FORMAT);
	private SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

	@Override
	public Object deserialize(JsonParser jp, DeserializationContext arg1) throws IOException, JsonProcessingException {
		String text = jp.getText();
		if (Pattern.compile(DATE_PATTERN).matcher(text).matches()) {
			try {
				// 替换前台传入的特殊标记符,这样能匹配上，那说明这个字段应该转换为date字段。
				return sdf.parse(text.replaceAll("~", ""));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		if (Pattern.compile(DATE_TIME_PATTERN).matcher(text).matches()) {
			try {
				return sdtf.parse(text.replaceAll("~", ""));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return text;
	}
}
