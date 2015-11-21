package com.v5ent.rapid4j.protocol.redis;
/**
 * <a>http://www.redis.cn/topics/protocol.html</a>
 * 翻译Redis协议<br>
 * Request:<br>
 * | -------------------------------------------------<br>
 * |*&lt;number of arguments&gt; CR LF<br>
 * |$&lt;number of bytes of argument 1&gt; CR LF<br>
 * |&lt;argument data&gt; CR LF<br>
 * |...<br>
 * |$&lt;number of bytes of argument N&gt; CR LF<br>
 * |&lt;argument data&gt; CR LF<br>
 * |--------------------------------------------------<br>
 * Response:<br>
 * Redis用不同的回复类型回复命令。<br>
 * 它可能从服务器发送的第一个字节开始校验回复类型：<br>
 * |--------------------------------------------------<br>
 * |用单行回复，回复的第一个字节将是“+”<br>
 * |错误消息，回复的第一个字节将是“-”<br>
 * |整型数字，回复的第一个字节将是“:”<br>
 * |批量回复，回复的第一个字节将是“$”<br>
 * |多个批量回复，回复的第一个字节将是“*”<br>
 * |--------------------------------------------------<br>
 * @author Mignet
 */
public class Translator {

	public static String parse(String message){
		char[] b = message.toCharArray();
		if('*'==b[0]){
			int len = Integer.valueOf(String.valueOf(b[1]));
			System.out.println(len);
		}else{
			System.out.println("格式错误");
		}
		return "";
	}
	
	public static String complie(String message){
		return message;
	}
}
