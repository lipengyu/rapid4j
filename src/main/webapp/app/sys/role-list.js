$(document).ready(function() {
    $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/rest/role/list",
            "type": "POST",
            "data":function(d){return {'_dt_json':JSON.stringify(d)}}//传递对象太多，封装一下
        },
        "columns": [
            { "data": "id" },
            { "data": "roleName"},
            { "data": "roleSign" },
            { "data": "description" }
        ]
    } );
    
} );