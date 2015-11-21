package com.v5ent.rapid4j.protocol.redis;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;

public class ListenerThread extends Thread {
	 private Socket s;
     int n;
     public ListenerThread(Socket incoming,int number) {
         s = incoming;
         n = number;
     }
     public void run() {
         try {
             // 新建网络连接的输入流。
             BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
             // 新建网络连接的自动刷新的输出流。
             PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(s.getOutputStream())),true);
             System.out.println("Welcome to Redis! Enter BYE to exit.");
             // 回显客户端的输入。
             while (true) {
                 // 从网络连接读取一行，即接收客户端的数据。
                 String line = in.readLine();
                 // 如果接收到的数据为空（如果直接按Enter，不是空数据），则退出循环，关闭连接。
                 if (line == null) {
                     break;
                 } else {
                     if (line.trim().equals("BYE")) {
                         System.out.println("The client " + n + " entered BYE!");
                         System.out.println("Connection " + n + " will be closed!");
                         break;
                     }
                     System.out.println("Echo " + n + ": " + line);
                     // 向网络连接输出一行，即向客户端发送数据。
                     out.println("Echo " + n + ": " + line);
                 }
             }
             // 关闭套接字。
             s.close();
         } catch (IOException e) {
             System.err.println("IOException");
         }
     }
}
