package com.v5ent.rapid4j.jms;

import javax.jms.Connection;
import javax.jms.DeliveryMode;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.Session;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
/**
 * 消息的发送模式：persistent或nonpersistent。
 * 前者表示消息在被消费之前，如果JMS提供者挂了，重新启动后消息仍然存在。后者在这种情况下表示消息会被丢失。
 * @author Mignet
 *
 */
public class DeliveryModeSendTest {
    public static void main(String[] args) throws Exception {
        ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory("vm://localhost");
   
        Connection connection = factory.createConnection();
        connection.start();
       
        Queue queue = new ActiveMQQueue("testQueue");
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
               
        MessageProducer producer = session.createProducer(queue);
        producer.setDeliveryMode(DeliveryMode.PERSISTENT);
        producer.send(session.createTextMessage("A persistent Message"));
       
        producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
        producer.send(session.createTextMessage("A non persistent Message"));
       
        System.out.println("Send messages sucessfully!");
    }
}

