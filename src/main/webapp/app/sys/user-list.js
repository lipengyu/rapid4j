//定义
//----------------common-------------------------
//显示错误或提示信息（需要引用toastr相关文件）
function showError(tips, TimeShown, autoHide) {
	  //参数设置，若用默认值可以省略
    toastr.options = {
        "closeButton": false, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "positionClass": "toast-top-full-width",//弹出窗的位置
        "showDuration": "300",//显示的动画时间
        "hideDuration": "1000",//消失的动画时间
        "timeOut": "5000", //展现时间
        "extendedTimeOut": "1000",//加长展示时间
        "showEasing": "swing",//显示时的动画缓冲方式
        "hideEasing": "linear",//消失时的动画缓冲方式
        "showMethod": "fadeIn",//显示时的动画方式
        "hideMethod": "fadeOut" //消失时的动画方式
        };
	toastr.error(tips);
}

//显示提示信息
function showTips(tips, TimeShown, autoHide) {
	  //参数设置，若用默认值可以省略
    toastr.options = {
        "closeButton": false, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "positionClass": "toast-top-full-width",//弹出窗的位置
        "showDuration": "300",//显示的动画时间
        "hideDuration": "1000",//消失的动画时间
        "timeOut": "5000", //展现时间
        "extendedTimeOut": "1000",//加长展示时间
        "showEasing": "swing",//显示时的动画缓冲方式
        "hideEasing": "linear",//消失时的动画缓冲方式
        "showMethod": "fadeIn",//显示时的动画方式
        "hideMethod": "fadeOut" //消失时的动画方式
        };
	toastr.success(tips);
}
//
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//var time1 = new Date().Format("yyyy-MM-dd");
//var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
//删除
function del(id) {
	$.ajax({
		url : '/rest/user/' + id,
		type : 'DELETE',
		success : function(result) {
			// Do something with the result
			showTips("删除成功!");
			refreshGrid();
		},
	 //async :false,
	  error:function(XmlHttpRequest,textStatus, errorThrown)
	  {
		  console.log(XmlHttpRequest.status);
		  console.log(textStatus);
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
      tr += "<td>"+ new Date(item.createTime).Format("yyyy-MM-dd hh:mm:ss") + "</td>";
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
	td += "<button  class=\"btn btn-primary\" type=\"button\"  data-toggle=\"modal\"  data-target=\"#myAddModal\" >编辑</button>";
	td += "&nbsp;"
	td += "<button  class=\"btn btn-primary\" type=\"button\" onclick=\"del("+id+")\">删除</button>";
	td += "</td>";
	return td;
}
//绑定相关事件
function BindEvent() {
	//判断表单的信息是否通过验证
    $("#ffAdd").validate({
        meta: "validate",
        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: false,
        rules:{
        	username:{
            	required: true,
            	minlength: 2,
            	maxlength: 5
        	}
        },
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

//页面初始化时调用
$(function() {
//	initJsTree(); // 初始化树
	BindEvent(); // 绑定事件处理
	search(1,10);// 初始化第一页数据
//	InitDictItem(); // 初始化字典信息
});
