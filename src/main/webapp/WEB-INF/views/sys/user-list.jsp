<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
 <script type="text/javascript" src="app/sys/user-list.js"></script>
<p>Example of CRUD with Twitter Bootstrap</p>
<div class="table-responsive">
<table class="table">
<thead>
  <tr>
    <th>用户ID</th>
    <th>用户名</th>
    <th>状态</th>
    <th>创建时间</th>
    <th>描述</th>
    <th>操作</th>
  </tr>
  </thead>
  <tbody>
	<c:forEach items="${users}" var="item" varStatus="status">  
	  <tr >  
	  	<td>${item.id}</td>  
	    <td class="center"><span class="center">${item.username}</span></td>  
	    <td><dfn>￥</dfn>
	    		<c:choose><c:when test="${item.state=='Y'}">有效</c:when><c:otherwise>无效</c:otherwise></c:choose>
	    </td>  
	    <td><fmt:formatDate value="${item.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/> </td>  
	    <td class="center"><span class="center">${item.description}</span></td>  
	    <td>
	    		<button  class="btn btn-primary" type="button"  data-toggle="modal"  data-target="#myEditModal" >编辑</button>
	    		<button  class="btn btn-primary" type="button" onclick="del(${item.id})">删除</button>
	    </td>  
	  </tr>  
	</c:forEach>  
	</tbody>
</table>
</div>
    <!--  -->
<!-- Button trigger modal -->
<button class="btn btn-primary" data-toggle="modal" 
   data-target="#myAddModal">
   新增
</button>

<!-- Modal -->
<!--------------------------添加/修改信息的弹出层---------------------------->
<div class="modal fade" id="myAddModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
                <i class="icon-pencil"></i><span id="lblAddTitle" style="font-weight:bold">添加信息</span>
            </h4>
         </div>
            <form class="form-horizontal form-bordered form-row-strippe" id="ffAdd" action="/rest/user/create" method="post" data-toggle="validator" >
                <div class="modal-body">
                    <div class="row">
                    	 <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">用户名称</label>
                                <div class="col-md-10">
                                    <input id="username" name="username" type="text" class="form-control" placeholder="名称..." />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">备注</label>
                                <div class="col-md-10">
                                    <textarea id="description" name="description" class="form-control" placeholder="备注..."></textarea>
                                </div>
                            </div>
                        </div>
						<div class="col-md-12">
						<p>不同于注册界面,管理界面自动为用户设置初始密码,状态初始为有效</p>
						</div>
                    </div>
                </div>
	         <div class="modal-footer">
	                  <input type="hidden" id="id" name="id" />
	                   <input type="hidden" id="password" name="password"  value="8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"/>
	                    <input type="hidden" id="state" name="state"  value="Y"/>
	                    <button type="submit" class="btn blue" >确定</button>
	                    <button type="button" class="btn green" data-dismiss="modal">取消</button>
	         </div>
         </form>
      </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!--------------------------修改信息的弹出层---------------------------->
<div class="modal fade" id="myEditModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
                <i class="icon-pencil"></i><span id="lblTitle" style="font-weight:bold">修改信息</span>
            </h4>
         </div>
            <form class="form-horizontal form-bordered form-row-strippe" id="ffUpdate" action="/rest/user/update" method="post" data-toggle="validator" >
                <div class="modal-body">
                    <div class="row">
                    	 <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">用户名称</label>
                                <div class="col-md-10">
                                    <input id="username" name="username" type="text" class="form-control" placeholder="名称..." />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">备注</label>
                                <div class="col-md-10">
                                    <textarea id="description" name="description" class="form-control" placeholder="备注..."></textarea>
                                </div>
                            </div>
                        </div>
						<div class="col-md-12">
								<div class="form-group">
	                                <label class="control-label col-md-2">是否有效</label>
	                                <div class="col-md-10">
	                                    <select id="state" name="state">
	                                    	<option value="Y">是</option>
	                                    	<option value="N">否</option>
	                                    </select>
	                                </div>
	                            </div>
						</div>
                    </div>
                </div>
	         <div class="modal-footer">
	                  <input type="hidden" id="id" name="id" />
	                    <button type="submit" class="btn blue" >确定</button>
	                    <button type="button" class="btn green" data-dismiss="modal">取消</button>
	         </div>
         </form>
      </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
