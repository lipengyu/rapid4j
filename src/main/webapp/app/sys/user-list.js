function del(id) {
	$.ajax({
		url : '/rest/user/' + id,
		type : 'DELETE',
		success : function(result) {
			// Do something with the result
			alert("删除成功!");
		},
	 //async :false,
	  error:function(XmlHttpRequest,textStatus, errorThrown)
	  {
		  console.log(XmlHttpRequest.status);
		  console.log(textStatus);
          alert(XmlHttpRequest.responseText);
	  }
	});
}
//绑定相关事件
function BindEvent() {
    //添加、编辑记录的窗体处理
    formValidate("ffAdd", function (form) {
        $("#myAddModal").modal("hide");
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
