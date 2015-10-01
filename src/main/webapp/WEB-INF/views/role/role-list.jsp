<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript" src="assets/plugins/data-tables/jquery.dataTables.js"  ></script>
<script type="text/javascript" src="assets/plugins/data-tables/DT_bootstrap.js"  ></script>
 <link href="assets/plugins/data-tables/DT_bootstrap.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$(document).ready(function() {
    $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "sAjaxDataProp": "result",
        "sAjaxSource": "/rest/role/list"
    } );
} );
</script>
<table id="example" class="display" >
        <thead>
            <tr>
                <th>Id</th>
                <th>roleName</th>
                <th>roleSign</th>
                <th>description</th>
            </tr>
        </thead>
 
        <tfoot>
            <tr>
             	 <th>Id</th>
                <th>roleName</th>
                <th>roleSign</th>
                <th>description</th>
            </tr>
        </tfoot>
    </table>