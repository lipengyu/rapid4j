//页面初始化
$(function() {
//	initJsTree(); // 初始化树

	BindEvent(); // 绑定事件处理
	search(1,10);// 初始化第一页数据
//	InitDictItem(); // 初始化字典信息

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
		//判断表单的信息是否通过验证
        $("#ffAdd").validate({
            meta: "validate",
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function (error, element) {
                element.parent('div').append(error);
            },
            submitHandler: function (form) {
                $("#myAddModal").modal("hide");
                //构造参数发送给后台
                var postData = $("#ffAdd").serializeArray();
                $.post("/rest/user/create", postData, function (data) {
                    if (data.success) {
                        //保存成功  1.关闭弹出层，2.刷新表格数据
                        showTips(data.message);
                        refreshGrid();
                    }
                    else {
                        showError("保存失败:" + data.message);
                    }
                }).error(function(XmlHttpRequest,textStatus, errorThrown) {
      			  	console.log(XmlHttpRequest.status);
      			  	console.log(textStatus);
      			  	showError(XmlHttpRequest.responseText);
      		  });
            }
        });
	}
	function refreshGrid(){
		search(1,10);// 初始化第一页数据
	}
	//
	function search(page,rows){
		  var condition = $("#ffSearch").serialize();
		  searchByCondition(page,rows,condition);
	}
	function searchByCondition(page,rows,condition){
	  var gCondition = condition;
	  url = "/rest/user/list?pageNo="+page+"&pageSize="+rows;
	  if(condition){
		  url += "&"+condition;
	  }
	  $.getJSON(url,function(data){
	    $("#totalCount").text(data.totalCount);
	    $("#totalPageCount").text(data.totalPages);

	    $("#grid_body").html("");
	    $.each(data.result,function(i,item){
	      //遍历显示内容
	      var tr = "<tr>";
	      tr += "<td><input class='checkboxes' type=\"checkbox\" name=\"checkbox\" value=\"+item.id+\"></td> ";
	      tr += "<td>"+ item.id + "</td>";
	      tr += "<td>"+ item.username + "</td>";
	      if(item.state=='Y'){
	        tr += "<td><span class='label label-success'>有效</span></td>";
	      }else{
	        tr += "<td><span class='label label-danger'>无效</span></td>";
	      }
	      tr += "<td>"+ item.createTime + "</td>";
	      tr += "<td>"+ item.description + "</td>";

	      tr += getActionHtml(item.id);//通过脚本生成按钮

	      tr += "</tr>";
	      $("#grid_body").append(tr);
	    });

	  });
	}
	function getActionHtml(id){
		var td = "<td>"
		td += "<button  class=\"btn btn-primary\" type=\"button\"  data-toggle=\"modal\"  data-target=\"#myEditModal\" >编辑</button>";
		td += "<button  class=\"btn btn-primary\" type=\"button\" onclick=\"del("+id+")\">删除</button>";
		td += "</td>";
		return td;
	}
	//----------------common-------------------------
	//显示错误或提示信息（需要引用jNotify-toastr相关文件）
	function showError(tips, TimeShown, autoHide) {
	   /* jError(
	      tips,
	      {
	          autoHide: autoHide || true, // added in v2.0
	          TimeShown: TimeShown || 1500,
	          HorizontalPosition: 'center',
	          VerticalPosition: 'top',
	          ShowOverlay: true,
	          ColorOverlay: '#000',
	          onCompleted: function () { // added in v2.0
	              //alert('jNofity is completed !');
	          }
	      }
	    );*/
		toastr.error(tips);
	}

	//显示提示信息
	function showTips(tips, TimeShown, autoHide) {
	   /* jSuccess(
	      tips,
	      {
	          autoHide: autoHide || true, // added in v2.0
	          TimeShown: TimeShown || 1500,
	          HorizontalPosition: 'center',
	          VerticalPosition: 'top',
	          ShowOverlay: true,
	          ColorOverlay: '#000',
	          onCompleted: function () { // added in v2.0
	              //alert('jNofity is completed !');
	          }
	      }
	    );*/
		toastr.success(tips);
	}
});