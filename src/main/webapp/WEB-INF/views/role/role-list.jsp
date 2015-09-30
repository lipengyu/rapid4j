<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript" src="assets/plugins/data-tables/jquery.dataTables.min.js"  ></script>
<script type="text/javascript" src="assets/plugins/data-tables/DT_bootstrap.js"  ></script>
 <link href="assets/plugins/data-tables/DT_bootstrap.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$(document).ready( function () {
    $('#table_id').DataTable();
} );
</script>
<table id="table_id" class="display">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1 Data 1</td>
            <td>Row 1 Data 2</td>
        </tr>
        <tr>
            <td>Row 2 Data 1</td>
            <td>Row 2 Data 2</td>
        </tr>
    </tbody>
</table>