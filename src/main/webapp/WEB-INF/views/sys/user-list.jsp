<%@ page language="java" pageEncoding="utf-8"%>
 <script type="text/javascript" src="app/sys/user-list.js"></script>
<p>Example of CRUD with Twitter Bootstrap</p>
<div class="table-responsive">
<!-- <form class="form-search" id="ffSearch">
  <label>用户名:</label><input name="username" type="text" class="input-medium search-query">
  <button type="submit" class="btn btn-primary" onclick="search(1,5)">查询</button>
</form> -->
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
</div>
<div class="paging-toolbar">
     <ul id='grid_paging'></ul>
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
            <form class="form-horizontal form-bordered form-row-strippe" id="ffAdd" >
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
                <!-- HIDDEN FILEDS -->
	             <input type="hidden" id="id" name="id" />
                <!-- HIDDEN FILEDS END -->
	         <div class="modal-footer">
	                    <button type="submit" class="btn blue" >确定</button>
	                    <button id="reset" type="reset" class="btn green" data-dismiss="modal">取消</button>
	         </div>
         </form>
      </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->