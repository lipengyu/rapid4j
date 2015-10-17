//重写ajax处理方式
jQuery(function($){
    // 备份jquery的ajax方法  
    var _ajax=$.ajax;
    // 重写ajax方法，解决ajax授权丢失的问题 
    $.ajax=function(opt){
    	var _success = opt && opt.success || function(a, b){};
        var _opt = $.extend(opt, {
        	success:function(data, textStatus){
        		// 如果后台将请求重定向到了登录页，则data里面就包含登陆表单的action路径"rest/auth/login"
        		if(typeof data == 'string' && data.indexOf('rest/auth/login') != -1) {
        			bootbox.alert('会话已过期，您需要重新登录！',function(){
            			location.href = '/rest/page/login';
            		});
        			return;
        		}
        		_success(data, textStatus);  
            }  
        });
        _ajax(_opt);
    };
});
//禁止提交按钮多次提交
$(function() {
	$('form').on('submit', function() {
		showLoading();
	});
});

// 禁止ajax执行过程中页面的其他操作
$(document).ajaxStart(function() {
	showLoading();
}).ajaxStop(function() {
	hideLoading();
});

// ajax请求开始显示进度窗体
function showLoading() {
	var background = $('<div id="loading_div" style="z-index: 999998; position: fixed; left: 0px; top: 0px; width: 100%; background-color:#ffffff; filter: alpha(opacity=0); -moz-opacity: 0; -khtml-opacity: 0; opacity: 0;"></div>');
	var div = $('<div id="loading_pic" style="z-index: 999999; position: fixed; height: 60px; width: 100%; text-align:center;"><img src="../assets/img/loading.gif"/></div>');
	$(document.body).append(div);
	$(document.body).append(background);
	background.height($(window).height());
	div.css({
		top : (background.outerHeight() - div.outerHeight()) / 2 + "px"
	});
}
// ajax请求结束移除进度窗体
function hideLoading() {
	$("#loading_div", document.body).remove();
	$("#loading_pic", document.body).remove();
}
/**
 * 通配符格式化函数
 * var pattern = "a{0}b{0}c{1}d\nqq{0}"; 
 * var result = $.format(pattern, 1, 2); 
 * alert(result); 
 */
$.format = function (source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};

//显示错误或提示信息（需要引用toastr相关文件）
function showError(tips, TimeShown, autoHide) {
	  //参数设置，若用默认值可以省略
    toastr.options = {
        "closeButton": false, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "positionClass": "toast-top-full-width",//弹出窗的位置
        "showDuration": "300",//显示的动画时间
        "hideDuration": "300",//消失的动画时间
        "timeOut": "2000", //展现时间
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
//var time1 = new Date().Format("yyyy-MM-dd");
//var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
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