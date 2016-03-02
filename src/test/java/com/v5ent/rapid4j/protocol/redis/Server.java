package com.v5ent.rapid4j.protocol.redis;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * http://www.redis.cn/topics/protocol.html
 * @author Mignet
 */
public class Server {
	
	/*public static void main(String[] args) {
		Translator.parse("*3\r\n$3\r\nSET\r\n$5\r\nmykey\r\n$7\r\nmyvalue\r\n");
	}*/
	 // 服务器端的服务端口。
    public static final int SERVERPORT = 6379;
    public static void main(String[] args) {
    	ServerSocket s = null;
        try {
            // 已经连接上的客户端的序号（连接数）
            int number = 1;
            // 建立服务器端监听套接字
            s = new ServerSocket(SERVERPORT);
            System.out.println("ServerSocket Started: " + s);
            while (true) {
                // 建立连接套接字,等待并接收请求。
                Socket link = s.accept();
                System.out.println("Connection " + number + " accepted: ");
                System.out.println(link);
                // 启动一个线程来进行服务器端和客户端的数据传输。
                // 主程序继续监听是否有请求到来。
                Thread t = new RedisThread(link,number);
                t.start();
                number++;
            }
        } catch (IOException e) {
            System.err.println("IOException");
        } finally {
            if (s != null) {
                try {
                    s.close();
                } catch (IOException e) {
                    // log error just in case
                }
            }
        }
    }
}
