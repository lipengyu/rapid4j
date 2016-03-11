## 1.首先，下载ActiveMQ，并将它启动起来（因为它是中间人）
## 2.执行Sender和Receiver
## 3.执行结果如下
Compile and run the Sender.java . The output will be displayed in the console.
`Sent: Hello …This is a sample message..sending from FirstClient.`
Then compile and run the Receiver.java.
`Message is : Hello …This is a sample message..sending from FirstClient`
The status related with each queue and topic can be found from the web console.[http://localhost:8161/admin/]