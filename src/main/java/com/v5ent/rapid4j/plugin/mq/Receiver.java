package com.v5ent.rapid4j.plugin.mq;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.ActiveMQConnectionFactory;

public class Receiver {
    private ConnectionFactory factory = null;
    private Connection connection = null;
    private Session session = null;
    private Destination destination = null;
    private MessageConsumer consumer = null;

    public Receiver() {}

    public void receiveMessage() {
        try {
            factory = new ActiveMQConnectionFactory(ActiveMQConnection.DEFAULT_BROKER_URL);
            connection = factory.createConnection();
            connection.start();
            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            destination = session.createQueue("SAMPLEQUEUE");
            consumer = session.createConsumer(destination);
            //Message message = consumer.receive();//采用这种方式，消息的接收者会一直等待下去，直到有消息到达，或者超时
            //注册一个监听器，当有消息到达的时候，回调它的onMessage()方法
            consumer.setMessageListener(new MessageListener(){  
                       @Override  
                       public void onMessage(Message message) {  
                    	   //消息消费者接收到这个消息之后，就可以得到它的内容：
                    	   if (message instanceof TextMessage) {
                               TextMessage text = (TextMessage) message;
                               try {
								System.out.println("Message is : " + text.getText());
							} catch (JMSException e) {
								e.printStackTrace();
							}
                           }
                       }  
                   });  
            
        } catch (JMSException e) {
                      e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        Receiver receiver = new Receiver();
        receiver.receiveMessage();
    }
}


