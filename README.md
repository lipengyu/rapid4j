# Rapid4J

------

**Rapid4J** is a `Rapid ` Seed Project for building a ` Java` Modern Application

------

## It Contains
>* Mybatis for ORMapping
>* Spring MVC for Controller and Restful API
>* Apache Shiro for RABC
>* Alibaba Dubbo for RPC Service BUS
>* Alibaba Druid for DataSource
>* Metronic template for Responsive view
>* Simple,Rapid,Effective

## Quick Start
> * 1 git clone https://github.com/Mignet/rapid4j
> * 2 execute src/test/resources/rapid4j.sql in your postgres database OR src/test/resources/rapid4j-mysql.sql for mysql
> * 3 update src/main/resources/application.properties to your own db link
> * 4 cd rapid4j
> * 5 mvn clean package -Dmaven.test.skip=true
> * 6 deploy rapid4j/target/rapid4j.war to your webserver, e.g.Tomcat7
> * 7 browse http://localhost:8080/ to login
> * 8 run Provider.java as java application and then run Consumer.java,you can see a red `Hello World` in Console.it means Dubbo is all right.
> * 9 Congratulations

## RoadMap
>* data table's CRUD,Master-Detail
>* jsp bootstrap CRUD
>* profile form validation
>* tree,tabs,window and more widgets

## For IDE
> ### 1 IntelliJ IDEA
* File -> Import Project -> select assm folder -> create project form existing sources -> ...

> ### 2 Eclipse
* File -> Import -> Existing Maven Projects -> ...

## If you have a better suggestion,Please feel free to contract me Or open a issue.
> Author ：Charley  
> Email  ：mignetwee@gmail.com  
