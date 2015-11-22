package com.v5ent.rapid4j.protocol.redis;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;

public class Client {
	// 服务器端的服务端口。
    public static final int SERVERPORT = 6379;
    public static void main(String[] args) {
        try {
            // 建立连接套接字
            Socket s = new Socket("127.0.0.1",SERVERPORT);
            System.out.println("socket = " + s+" collected");
            //欢迎客户端的接入
            System.out.println("Welcome to Redis! Enter EXIT to exit.");
            // 新建网络连接输入流
            BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
            // 新建网络连接的自动刷新的输出流
            PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(s.getOutputStream())),true);
            // 控制台标准输入设备
            BufferedReader stdin = new BufferedReader( new InputStreamReader(System.in));
            while (true) {
                // 读取从控制台输入的字符串,向服务器端发送数据。
                out.println(sendMessage(stdin.readLine()));
                // 接收服务器端的数据。
                String message = in.readLine();
                // 如果接收到的数据为空（如果直接按Enter，不是空数据），则退出循环，关闭连接。
                if (message == null) {
                    break;
                }
                //打印服务器端的数据
                System.out.println("解码前:"+message);
                System.out.println("解码:"+Translator.parseResponse(message));
            }
            s.close();
        } catch (IOException e) {
            System.err.println("IOException" + e.getMessage());
        }
    }
	
	private static String sendMessage(String message){
		return Translator.complieRequest(message);
	}
}
