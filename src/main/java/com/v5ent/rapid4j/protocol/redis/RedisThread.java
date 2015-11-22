package com.v5ent.rapid4j.protocol.redis;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;

public class RedisThread extends Thread {
	 private Socket s;
     int n;
     public RedisThread(Socket link,int number) {
         s = link;
         n = number;
     }
     public void run() {
         try {
             // 新建网络连接的输入流。
             BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
             // 新建网络连接的自动刷新的输出流。
             PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(s.getOutputStream())),true);
             //欢迎客户端的接入
             System.out.println("Welcome to Redis! Enter EXIT to exit.");
             // 回显客户端的输入
             while (true) {
                 // 接收客户端的数据
                 String line = in.readLine();
                 // 如果接收到的数据为空（如果直接按Enter，不是空数据），则退出循环，关闭连接。
                 if (line == null) {
                     break;
                 } else {
                	 String cmd =  Translator.parseRequest(line);
                     if (cmd.trim().toUpperCase().equals("EXIT")) {
                         System.out.println("The client " + n + " entered BYE!");
                         System.out.println("Connection " + n + " will be closed!");
                         break;
                     }
                     System.out.println("Client" + n +"的原始请求: "+ ": " + line.replace("<br>", "\r\n"));
                     // 向客户端发送数据
                     out.println(Translator.complieResponse("[" + n + "]:[" + cmd+"]OK"));
                 }
             }
             // 关闭套接字
             s.close();
         } catch (IOException e) {
             System.err.println("IOException");
         }
     }
}
