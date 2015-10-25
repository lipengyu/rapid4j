<%@ page language="java" pageEncoding="utf-8"%>
<script type="text/javascript" src="assets/plugins/data-tables/js/jquery.dataTables.min.js"  ></script>
<script type="text/javascript" src="assets/plugins/data-tables/js/dataTables.bootstrap.min.js"  ></script>
<!-- <script type="text/javascript" src="assets/plugins/data-tables/extensions/Editor/js/dataTables.editor.min.js"  ></script> -->
 <link rel="stylesheet" type="text/css" href="assets/plugins/data-tables/css/dataTables.bootstrap.min.css"  />
 <link rel="stylesheet" type="text/css" href="assets/plugins/data-tables/extensions/Buttons/css/buttons.dataTables.min.css"  />
<script type="text/javascript" src="app/sys/role-list.js"></script>
<p>this is a data-table demo</p>
<div class="dt-buttons">
<a class="dt-button buttons-create" tabindex="0" aria-controls="dtable"><span>New</span></a>
<a class="dt-button buttons-selected buttons-edit" tabindex="0" aria-controls="dtable"><span>Edit</span></a>
<a class="dt-button buttons-selected buttons-remove" tabindex="0" aria-controls="dtable"><span>Delete</span></a>
</div>
<table id="dtable" class="display" >
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
