<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript" src="assets/plugins/data-tables/js/jquery.dataTables.min.js"  ></script>
<script type="text/javascript" src="assets/plugins/data-tables/js/dataTables.bootstrap.min.js"  ></script>
<!-- <script type="text/javascript" src="assets/plugins/jquery.json/jquery.json-2.2-min.js" ></script> -->
 <link href="assets/plugins/data-tables/css/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="app/sys/role-list.js"></script>
<table id="example" class="display" >
        <thead>
            <tr>
                <th>角色编号</th>
                <th>角色名称</th>
                <th>角色标识</th>
                <th>描述</th>
            </tr>
        </thead>
 
        <tfoot>
            <tr>
             	 <th>角色编号</th>
                <th>角色名称</th>
                <th>角色标识</th>
                <th>描述</th>
            </tr>
        </tfoot>
    </table>
    
   <!--------------------------添加/修改信息的弹出层---------------------------->
<div id="add" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">
                    <i class="icon-pencil"></i>
                    <span id="lblAddTitle" style="font-weight:bold">添加信息</span>
                </h4>
            </div>
            <form class="form-horizontal form-bordered form-row-strippe" id="ffAdd" action="" data-toggle="validator" enctype="multipart/form-data">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">父ID</label>
                                <div class="col-md-10">
                                    <select id="PID" name="PID" type="text" class="form-control select2" placeholder="父ID..." ></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">名称</label>
                                <div class="col-md-10">
                                    <input id="Name" name="Name" type="text" class="form-control" placeholder="名称..." />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label col-md-2">备注</label>
                                <div class="col-md-10">
                                    <textarea id="Note" name="Note" class="form-control" placeholder="备注..."></textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer bg-info">
                    <input type="hidden" id="ID" name="ID" />
                    <button type="submit" class="btn blue">确定</button>
                    <button type="button" class="btn green" data-dismiss="modal">取消</button>
                </div>
            </form>
        </div>
    </div>
</div>