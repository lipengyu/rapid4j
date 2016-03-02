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
 * |单行回复，回复的第一个字节将是“+”<br>
 * |错误消息，回复的第一个字节将是“-”<br>
 * |整型数字，回复的第一个字节将是“:”<br>
 * |批量回复，回复的第一个字节将是“$”<br>
 * |多个批量回复，回复的第一个字节将是“*”<br>
 * |--------------------------------------------------<br>
 * @author Mignet
 */
public class Translator {

	/**
	 * A reader is better than a parser for a byte stream<br>
	 * @see RedisInputStream
	 * @param message
	 * @return
	 */
	public static String parseRequest(String message){
		char[] b = message.toCharArray();
		StringBuffer sb = new StringBuffer();
		if('*'==b[0]){
			String[] list = message.split("<br>");
			//int len = Integer.valueOf(String.valueOf(b[1]));//numbers of arguments
			//String[] args = new String[len];
			for(int i=2;i<list.length;){
				sb.append(list[i]).append(" ");
				i = i+2;
			}
		}else{
			System.out.println("格式错误");
		}
		return sb.toString();
	}
	
	/**
	 * A reader is better than a parser for a byte stream<br>
	 * @see RedisInputStream
	 * @param message
	 * @return
	 */
	public static String parseResponse(String message){
		char[] b = message.toCharArray();
		StringBuffer sb = new StringBuffer();
		//单行回复
		if('+'==b[0]){
			sb.append(message.substring(1));
		}else{
			System.out.println("格式错误");
		}
		return sb.toString();
	}
	
	/**
	 * A  writer is better than a complier for a byte stream<br>
	 * @see RedisOutputStream
	 * @param message
	 * @return
	 */
	public static String complieRequest(String message){
		StringBuffer sb = new StringBuffer();
		String[] args = message.split(" ");
		      sb.append('*');
		     sb.append(args.length);
		     sb.append("<br>");
		      for (String arg : args) {
		       sb.append('$');
		       sb.append(arg.length());
		       sb.append("<br>");
		       sb.append(arg);
		       sb.append("<br>");
		      }
		return sb.toString();
	}
	
	/**
	 * A  writer is better than a complier for a byte stream<br>
	 * @see RedisOutputStream
	 * @param message
	 * @return
	 */
	public static String complieResponse(String message){
		StringBuffer sb = new StringBuffer();
		sb.append('+');
		sb.append(message);
		return sb.toString();
	}
	
	
	public static void main(String[] args) {
		String cmd = "SET mykey myvalue";
		System.out.println(complieRequest(cmd));
		String s = "*3<br>$3<br>SET<br>$5<br>mykey<br>$7<br>myvalue<br>";
		System.out.println(parseRequest(s));
	}
	
}
