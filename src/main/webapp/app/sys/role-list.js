$(document).ready(function() {
    $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/rest/role/list",
            "type": "POST",
            "data":function(d){return {'_dt_json':JSON.stringify(d)}}//传递对象太多，所以封装一下
        },
        "columns": [
            { "data": "id" },
            { "data": "roleName"},
            { "data": "roleSign" },
            { "data": "description" }
        ]
    } );
    
  //绑定相关事件
    function BindEvent() {
        //添加、编辑记录的窗体处理
        formValidate("ffAdd", function (form) {
            $("#add").modal("hide");
            //构造参数发送给后台
            var postData = $("#ffAdd").serializeArray();
            $.post(url, postData, function (json) {
                var data = $.parseJSON(json);
                if (data.Success) {
                    //保存成功  1.关闭弹出层，2.刷新表格数据
                    showTips("保存成功");
                    Refresh();
                }
                else {
                    showError("保存失败:" + data.ErrorMessage, 3000);
                }
            }).error(function () {
                showTips("您未被授权使用该功能，请联系管理员进行处理。");
            });
        });
    }
} );