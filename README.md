# Rapid4J

------

**Rapid4J** is a `Rapid` Seed Project for building a `Java` Modern Application

------

## It Contains
>* PostgreSQL,Redis
>* Mybatis for ORMapping and Physical Pagination
>* Spring MVC for Controller and Restful API
>* Apache Shiro for RBAC(Role-Based Access Control)
>* Alibaba Dubbo for RPC Service BUS
>* Alibaba Druid for DataSource
>* Admin template
>* Bootstarp for Responsive view
>* Simple,Rapid,Effective

## Quick Start
> * 1 git clone https://github.com/Mignet/rapid4j
> * 2 execute src/test/resources/rapid4j.sql in your PostgreSQL database
> * 3 change src/main/resources/application.properties to your database configuration
> * 4 cd rapid4j
> * 5 mvn clean package -Dmaven.test.skip=true
> * 6 deploy rapid4j/target/rapid4j.war to your web-server, e.g.Tomcat
> * 7 browse http://localhost:8080/ to login
> * 8 run Provider.java as java application and then run Consumer.java,you can see a red `Hello World` in Console.it means Dubbo is all right.
> * 9 Congratulations

## RoadMap
>* Example of CRUD with Twitter Bootstrap => completed,more info to see users
>* Example of Form validation => completed
>* Example of Ajax common handler,Bootbox and Tips => completed
>* Example of Restful API => completed,more info to see permissions
>* Example of Data Table's CRUD,Master-Detail=>
>* Example of Tree,Tabs,window and more widgets=>
>* Code Generator =>
>* Image Cloud=>image upload,storage,read,rotate,scale

## For IDE
> ### 1 IntelliJ IDEA
* File -> Import Project -> select rapid4j folder -> create project form existing sources -> ...

> ### 2 Eclipse
* File -> Import -> Existing Maven Projects  -> select rapid4j folder -> ...

## If you have a better suggestion,Please feel free to contract me Or open a issue.
> Author ：Charley
> Email  ：mignetwee@gmail.com
