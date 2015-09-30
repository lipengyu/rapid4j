<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<p>this is a bootstrap dynamic back-end data source demo</p>
<table class="table table-bordered">
  <tr>
    <th>UserName</th>
    <th>state</th>
    <th>firstname</th>
    <th>createTime</th>
    <th>操作</th>
  </tr>
	<c:forEach items="${users}" var="item" varStatus="status">  
	  <tr >  
	    <td class="center"><span class="center">${item.username}</span></td>  
	    <td><dfn>￥</dfn>${item.state}</td>  
	    <td>${item.firstname}</td>  
	    <td>${item.createTime}</td>  
	    <td><button  class="btn" type="button">edit</button></td>  
	  </tr>  
	</c:forEach>  
</table>
