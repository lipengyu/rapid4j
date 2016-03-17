# Rapid4J

------

**Rapid4J** is a `Rapid` Seed Project for building a `Java` Modern (Distributed) Application

------

## It Contains
>* PostgreSQL,Redis,ActiveMQ
>* Mybatis for ORMapping and Physical Pagination
>* Spring MVC for Controller and Restful API
>* Apache Shiro for RBAC(Role-Based Access Control)
>* Alibaba Dubbo for RPC Service BUS
>* Alibaba Druid for DataSource
>* Admin template
>* Bootstarp for Responsive view
>* Simple,Rapid,Effective

## Quick Start
> * 1 git clone `https://github.com/Mignet/rapid4j`
> * 2 execute `src/test/resources/rapid4j.sql` in your PostgreSQL database
> * 3 edit `src/main/resources/application.properties` to your database configuration
> * 4 edit `src/main/resources/redis.properties` to your redis server and `cd rapid4j`
> * 5 `mvn jetty:run  -Djetty.port=8080`
> * 6 `mvn jetty:run  -Djetty.port=8082`

## RoadMap
>* Example of CRUD with Twitter Bootstrap => completed,more info to see users
>* Example of Form validation => completed
>* Example of Ajax common handler,Bootbox and Tips => completed
>* Example of Restful API => completed,more info to see permissions
>* Example of Data Table's CRUD,Master-Detail=>Give up,because of Data Table's searching feature
>* Example of Tree,Tabs,Window and more Widgets=>
>* Code Generator[new project] => https://github.com/Mignet/rapid4j-generator
>* Image Cloud[new project]=>image upload,storage,read,rotate,scale=>https://github.com/Mignet/rapid4j-images

## For IDE
> ### 1 IntelliJ IDEA
* File -> Import Project -> select rapid4j folder -> create project form existing sources -> ...

> ### 2 Eclipse
* File -> Import -> Existing Maven Projects  -> select rapid4j folder -> ...

## If you have a better suggestion,Please feel free to contract me Or open a issue.
> Author ：Charley
> Email  ：mignetwee@gmail.com
