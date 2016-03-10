package com.v5ent.rapid4j.mq;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
/**
 * Hello JMS
 * @author Mignet
 *
 */
public class MessageSendAndReceiveByListener {  
    public static void main(String[] args) throws Exception {  
    	//1.首先需要得到ConnectionFactoy和Destination
        ConnectionFactory factory = new ActiveMQConnectionFactory("vm://localhost");  
        //2.然后由ConnectionFactory创建一个Connection, 再启动这个Connection:
        Connection connection = factory.createConnection();  
        connection.start();  
        //3.接下来需要由Connection创建一个Session:
        final Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);  
        //4.这里创建一个一对一的Queue作为Destination
        Queue queue = new ActiveMQQueue("testQueue");  
        //5.下面就可以创建Message了,这里创建一个TextMessage。
        Message message = session.createTextMessage("Hello JMS!");  
        //6.要想把刚创建的消息发送出去，需要由Session和Destination创建一个消息生产者
        MessageProducer producer = session.createProducer(queue);  
        //7.下面就可以发送刚才创建的消息了
        producer.send(message);  
        System.out.println("Send Message Completed!");  
        
        //消息发送完成之后，我们需要创建一个消息消费者来接收这个消息：
        MessageConsumer comsumer = session.createConsumer(queue);  
        //注册一个监听器，当有消息到达的时候，会回调它的onMessage()方法
        comsumer.setMessageListener(new MessageListener(){  
                   @Override  
                   public void onMessage(Message m) {  
                	   //消息消费者接收到这个消息之后，就可以得到它的内容：
                       TextMessage textMsg = (TextMessage) m;  
                       try {  
                           System.out.println(textMsg.getText());  
                       } catch (JMSException e) {  
                           e.printStackTrace();  
                       }  
                   }  
                    
               });  
    }  
}  