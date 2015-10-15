<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
 <!--表单验证必须库--> 
 <script type="text/javascript" src="assets/plugins/formvalidator/formValidator-4.1.1.min.js"></script>
 <!--表单验证扩展库--> 
 <script type="text/javascript" src="assets/plugins/formvalidator/formValidatorRegex.js"></script>
 <!--表单验证样式表--> 
<!--  <link href="formValidator1/style/validator.css" rel="stylesheet" type="text/css" /> -->
<!--  提示 -->
 <script type="text/javascript" src="assets/plugins/bootstrap-toastr/toastr.min.js"></script>
 <!-- 翻页 -->
 <script type="text/javascript" src="assets/plugins/bootstrap-paginator/build/bootstrap-paginator.min.js"></script>
 <link href="assets/plugins/bootstrap-toastr/toastr.css" rel="stylesheet" type="text/css" />
 <script type="text/javascript" src="app/sys/user-list.js"></script>
<p>Example of CRUD with Twitter Bootstrap</p>
<div class="table-responsive">
<table class="table">
<thead>
  <tr>
  	<th class="table-checkbox" style="width:40px"><input class="group-checkable" type="checkbox" onclick="selectAll(this)"></th>
    <th>用户ID</th>
    <th>用户名</th>
    <th>状态</th>
    <th>创建时间</th>
    <th>描述</th>
    <th>操作</th>
  </tr>
  </thead>
  <tbody id="grid_body"></tbody>
</table>
<div class="paging-toolbar">
     <ul id='grid_paging'></ul>
</div>
</div>
    <!--  -->
<!-- Button trigger modal -->
<button class="btn btn-primary" data-toggle="modal" 
   data-target="#myAddModal" onclick="addInit()">
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
                <i class="icon-pencil"></i><span id="lblAddTitle" style="font-weight:bold">添加/修改信息</span>
            </h4>
         </div>
            <form class="form-horizontal form-bordered form-row-strippe" id="ffAdd" action="" method="post" data-toggle="validator" >
                <div class="modal-body">
                    <div class="row">
                    	 <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">用户名称</label>
                                <div class="col-md-10">
                                    <input id="username" name="username" type="text" for="username" class="form-control" placeholder="名称..." />
                                </div>
                            </div>
                        </div>
                    	 <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">状态</label>
                                <div class="col-md-10">
                                    <select id="state" name="state" class="select2 form-control">
                                		<option value="Y">有效</option>
                                		<option value="N">无效</option>
                                	</select>
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
                    </div>
                </div>
	         <div class="modal-footer">
	                  <input type="hidden" id="id" name="id" />
	                   <input type="hidden" id="password" name="password"  value=""/>
	                    <button type="submit" class="btn blue" >确定</button>
	                    <button type="button" class="btn green" data-dismiss="modal">取消</button>
	         </div>
         </form>
      </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->