<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript" src="assets/plugins/data-tables/js/jquery.dataTables.min.js"  ></script>
<script type="text/javascript" src="assets/plugins/data-tables/js/dataTables.bootstrap.min.js"  ></script>
 <link href="assets/plugins/data-tables/css/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="app/sys/role-list.js"></script>
<p>this is a data-table demo</p>
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
