<%@ page language="java" pageEncoding="utf-8"%>
<ul>
<li>user1</li>
<li>user2</li>
<li>user3</li>
</ul>
<table>
  <tr>
    <th>UserName</th>
    <th>state</th>
    <th>firstname</th>
    <th>createTime</th>
  </tr>
	<c:forEach items="${users}" var="item" varStatus="status">  
	  <tr >  
	    <td class="center"><span class="center">${item.username}</span></td>  
	    <td><dfn>￥</dfn>${item.state}</td>  
	    <td>${item.firstname}</td>  
	    <td>${item.createTime}</td>  
	  </tr>  
	</c:forEach>  
</table>
