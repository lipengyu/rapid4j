//页面初始化时调用
$(function() {
//	initJsTree(); // 初始化树
	BindEvent(); // 绑定事件处理
	search(1,5);// 初始化第一页数据
//	InitDictItem(); // 初始化字典信息
});

//刷新grid
function refreshGrid(){
	search(1,5);// 初始化第一页数据
}
//搜索
function search(page,rows){
	  var condition = $("#ffSearch").serialize();
	  searchByCondition(page,rows,condition);
}
//条件搜索
function searchByCondition(page,rows,condition){
  var gCondition = condition;
  url = "/rest/permissions?pageNo="+page+"&pageSize="+rows;
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
      tr += "<td>"+ item.permissionName + "</td>";
      tr += "<td>"+ item.permissionSign + "</td>";
      tr += "<td>"+ item.description + "</td>";
      tr += getActionHtml(item.id);//通过脚本生成按钮
      tr += "</tr>";
      $("#grid_body").append(tr);
    });
    
  //翻页
    var element=$('#grid_paging');
    if(data.totalCount>0){
        var options = {
            bootstrapMajorVersion:3,
            currentPage:data.pageNo,
            numberOfPages:data.totalCount,
            totalPages:data.totalPages,
            onPageChanged:function(event,oldPage,newPage){
            	searchByCondition(newPage,data.pageSize,condition);//paging
            }
        }
        element.bootstrapPaginator(options);
    }else{
        element.html("");
    }
  });
}
//操作按钮
function getActionHtml(id){
	var td = "<td>"
	td += "<button  class=\"btn btn-primary\" type=\"button\"  data-toggle=\"modal\"  data-target=\"#myModal\" onclick=\"updateInit("+id+")\">编辑</button>";
	td += "&nbsp;"
	td += "<button  class=\"btn btn-primary\" type=\"button\" onclick=\"del("+id+")\">删除</button>";
	td += "</td>";
	return td;
}
//绑定相关事件
function BindEvent() {
	//重置
	$("#reset").click(function(){
			validator.resetForm();
			//clear error msg
			$('.form-group').removeClass('has-error');
	  });

	//判断表单的信息是否通过验证
	validator = $("#ffAdd").validate({
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
            $("#myModal").modal("hide");
            //id==-1 means new
            if($("#id").val()==-1){
            	method = "post";
            	_url_ = "/rest/permissions";
            }else{
            	method = "put";
            	_url_ = "/rest/permissions/"+$("#id").val();
            }
            $(form).ajaxSubmit({
                type:method,
                url:_url_,
                //beforeSubmit: showRequest,for example:are you sure to submit?
                success: function (data) {
                    if (data.success) {
                        //保存成功  1.关闭弹出层，2.刷新表格数据
                        showTips(data.message);
                        refreshGrid();
                    } else {
                        showError(data.message);
                    }
                },
                error:function(XmlHttpRequest,textStatus, errorThrown) {
      			  	console.log(XmlHttpRequest.status);
      			  	console.log(textStatus);
      			  	showError(XmlHttpRequest.responseText);
      		  	}
              });
        }
    });
}
//--------------------------本页面业务--------------------------
function addInit(){
	$("#myTitle").html("新增信息");
	$("#id").val(-1);
	$("#permissionSign").val("");
	$("#permissionName").val("");
	$("#permissionName").removeAttr("readonly");
	$("#permissionName").rules('add',{
            	required: true,
            	rangelength:[2,20],
            	remote:{                                          //验证用户名是否存在
                    type:"GET",
                    url:"/rest/permissions/check",             
                    data:{
                      name:function(){return $("#permissionName").val();}
                    } 
                   }, 
        messages:{required:"不能为空！",rangelength:$.format("位数必须在{0}到{1}字符之间！"),remote:"已经存在!"}                    
	})
	$("#description").val('权限标识规则=资源:操作');
}
function updateInit(id){
	$.ajax({
		url : '/rest/permissions/' + id,
		type : 'GET',
		success : function(result) {
			$("#myTitle").html("修改信息");
			$("#id").val(result.id);
			$("#permissionName").val(result.permissionName);
			$("#permissionSign").val(result.permissionSign);
			$("#permissionName").attr("readonly","readonly");
			$("#permissionName").rules("remove"); //修改时不需要验证
			$("#description").val(result.description);
		},
	  error:function(XmlHttpRequest,textStatus, errorThrown)
	  {
		  console.log(XmlHttpRequest.status);
		  console.log(textStatus);
		  showError(XmlHttpRequest.responseText);
	  }
	});
}
//删除
function del(id) {
	$.ajax({
		url : '/rest/permissions/' + id,
		type : 'DELETE',
		success : function(data) {
			 if (data.success) {
                 //保存成功  1.关闭弹出层，2.刷新表格数据
                 showTips(data.message);
                 refreshGrid();
             }else {
                 showError(data.message);
             }
		},
	 //async :false,
	  error:function(XmlHttpRequest,textStatus, errorThrown)
	  {
		  showError(XmlHttpRequest.responseText);
	  }
	});
}