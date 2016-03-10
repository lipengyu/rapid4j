package com.v5ent.rapid4j.mq;

import javax.jms.Connection;  
import javax.jms.JMSException;  
import javax.jms.Message;  
import javax.jms.MessageConsumer;  
import javax.jms.MessageListener;  
import javax.jms.Queue;  
import javax.jms.Session;  
import javax.jms.TextMessage;  
import org.apache.activemq.ActiveMQConnectionFactory;  
import org.apache.activemq.command.ActiveMQQueue;  
/**
 *  运行DeliveryModeSendTest，当输出“Send messages sucessfully!”时，说明两个消息都已经发送成功，然后我们结束它，来停止JMS Provider。
 *  接下来我们重新启动MQ，然后添加一个消费者。执行之后将得到那条持久化的消息，刚才发送的non persistent消息已经丢失了
 * @author Mignet
 *
 */
public class DeliveryModeReceiveTest {  
    public static void main(String[] args) throws Exception {  
        ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory("vm://localhost");  
     
        Connection connection = factory.createConnection();  
        connection.start();  
         
        Queue queue = new ActiveMQQueue("testQueue");  
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);  
         
        MessageConsumer comsumer = session.createConsumer(queue);  
        comsumer.setMessageListener(new MessageListener(){  
            public void onMessage(Message m) {  
                try {  
                    System.out.println("Consumer get " + ((TextMessage)m).getText());  
                } catch (JMSException e) {  
                    e.printStackTrace();  
                }  
            }  
        });  
    }  
}  
