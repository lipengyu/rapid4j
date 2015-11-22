//定义
//--------------------------本页面业务--------------------------
function addInit(){
	$("#id").val(0);
	$("#username").val("");
	$("#username").removeAttr("readonly");
	$("#username").rules('add',{
            	required: true,
            	rangelength:[6,20],
            	remote:{                                          //验证用户名是否存在
                    type:"GET",
                    url:"/rest/user/check",             
                    data:{
                      name:function(){return $("#username").val();}
                    } 
                   }, 
        messages:{required:"用户名不能为空！",rangelength:$.format("用户名位数必须在{0}到{1}字符之间！"),remote:"用户名已经被注册"}                    
	})
	$("#state").val('Y');
	$("#description").val('不同于注册界面,管理界面自动为用户设置初始密码');
}
function updateInit(id){
	$.ajax({
		url : '/rest/user/' + id,
		type : 'GET',
		success : function(result) {
			$("#id").val(result.id);
			$("#username").val(result.username);
			$("#username").attr("readonly","readonly");
			$("#username").rules("remove"); //修改时不需要验证
			$("#state").val(result.state);
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
		url : '/rest/user/' + id,
		type : 'DELETE',
		success : function(result) {
			 if (result.success) {
                 //保存成功  1.关闭弹出层，2.刷新表格数据
                 showTips(result.message);
                 refreshGrid();
             }else {
                 showError(result.message);
             }
		},
	 //async :false,
	  error:function(XmlHttpRequest,textStatus, errorThrown)
	  {
		  showError(XmlHttpRequest.responseText);
	  }
	});
}
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
  url = "/rest/user/list?pageNo="+page+"&pageSize="+rows;
  if(condition){
	  url += "&"+condition;
  }
  $.getJSON(url,function(result){
    $("#totalCount").text(result.totalCount);
    $("#totalPageCount").text(result.totalPages);

    $("#grid_body").html("");
  //判断比较
    Handlebars.registerHelper('compare', function(left, operator, right, options) {
        if (arguments.length < 3) {
          throw new Error('Handlerbars Helper "compare" needs 2 parameters');
        }
        var operators = {
          '==':     function(l, r) {return l == r; },
          '===':    function(l, r) {return l === r; },
          '!=':     function(l, r) {return l != r; },
          '!==':    function(l, r) {return l !== r; },
          '<':      function(l, r) {return l < r; },
          '>':      function(l, r) {return l > r; },
          '<=':     function(l, r) {return l <= r; },
          '>=':     function(l, r) {return l >= r; },
          'typeof': function(l, r) {return typeof l == r; }
        };

        if (!operators[operator]) {
          throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
        }

        var result = operators[operator](left, right);

        if (result) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
    });
    Handlebars.registerHelper('formatDate', function(date) {
    	  return new Date(date).Format('yyyy-MM-dd hh:mm:ss');
    	});
/*    $.each(result.result,function(i,item){
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
      tr += "<td>"+ new Date(item.createTime).Format("yyyy-MM-dd hh:mm:ss") + "</td>";
      tr += "<td>"+ item.description + "</td>";
      tr += getActionHtml(item.id);//通过脚本生成按钮
      tr += "</tr>";
      $("#grid_body").append(tr);
    });*/
  //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
    var myTemplate = Handlebars.compile($("#table-template").html());
    //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
    $('#grid_body').html(myTemplate(result));
    Handlebars.unregisterHelper('compare','formatDate');
    
  //翻页
    var element=$('#grid_paging');
    if(result.totalCount>0){
        var options = {
            bootstrapMajorVersion:3,
            currentPage:result.pageNo,
            numberOfPages:result.totalCount,
            totalPages:result.totalPages,
            onPageChanged:function(event,oldPage,newPage){
            	searchByCondition(newPage,result.pageSize,condition);//paging
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
	td += "<button  class=\"btn btn-primary\" type=\"button\"  data-toggle=\"modal\"  data-target=\"#myAddModal\" onclick=\"updateInit("+id+")\">编辑</button>";
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
            $("#myAddModal").modal("hide");
            $(form).ajaxSubmit({
                type:"post",
                url:"/rest/user/create",
                //beforeSubmit: showRequest,for example:are you sure to submit?
                success: function (result) {
                    if (result.success) {
                        //保存成功  1.关闭弹出层，2.刷新表格数据
                        showTips(result.message);
                        refreshGrid();
                    } else {
                        showError(result.message);
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

//页面初始化时调用
$(function() {
//	initJsTree(); // 初始化树
	BindEvent(); // 绑定事件处理
	search(1,5);// 初始化第一页数据
//	InitDictItem(); // 初始化字典信息
});
