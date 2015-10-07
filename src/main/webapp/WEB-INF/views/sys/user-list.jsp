<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<p>this is a bootstrap dynamic back-end data source demo</p>
<table class="table table-condensed">
  <tr>
    <th>用户ID</th>
    <th>用户名</th>
    <th>状态</th>
    <th>创建时间</th>
    <th>操作</th>
  </tr>
	<c:forEach items="${users}" var="item" varStatus="status">  
	  <tr >  
	  	<td>${item.id}</td>  
	    <td class="center"><span class="center">${item.username}</span></td>  
	    <td><dfn>￥</dfn>
	    		<c:choose><c:when test="${item.state=='Y'}">有效</c:when><c:otherwise>无效</c:otherwise></c:choose>
	    </td>  
	    <td><fmt:formatDate value="${item.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/> </td>  
	    <td><button  class="btn btn-primary" type="button">edit</button></td>  
	  </tr>  
	</c:forEach>  
</table>
