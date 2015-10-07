<%@ page language="java" pageEncoding="utf-8"%>
<!-- <script type="text/javascript" src="app/sys/permission-list.js"></script> -->
<table class="table table-condensed">
  <tr>
    <th>权限ID</th>
    <th>权限名称</th>
    <th>权限标识</th>
    <th>描述</th>
    <th>操作</th>
  </tr>
	<c:forEach items="${permissions}" var="item" varStatus="status">  
	  <tr >  
	  	<td>${item.id}</td>  
	    <td class="center"><span class="center">${item.permissionName}</span></td>  
	    <td class="center"><span class="center">${item.permissionSign}</span></td>  
	    <td class="center"><span class="center">${item.description}</span></td>  
	    <td><button  class="btn btn-primary" type="button">edit</button><button  class="btn btn-primary" type="button">delete</button></td>  
	  </tr>  
	</c:forEach>  
</table>
