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
	var background = $("<div id=\"loading_div\" style=\"z-index: 999998; position: fixed; left: 0px; top: 0px; width: 100%; background-color:#ffffff; filter: alpha(opacity=0); -moz-opacity: 0; -khtml-opacity: 0; opacity: 0;\"></div>");
	var div = $("<div id=\"loading_pic\" style=\"z-index: 999999; position: fixed; height: 60px; width: 100%; text-align:center;\"><img src=\"../assets/img/loading.gif\"/></div>");
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

$(function() {
    App.init();

    var Index = (function() {
        var me = {};

        function changeMenu(title){
        	$('#index-page-title').html(title);
        	$('#index-menu2').html(title);
        	
        }
        function changeHeader(header){
        	$('#index-menu').html(header)
        }
        // 处理一级菜单点击
        me.handleMenuClick = function() {
            $('#page-sidebar-menu > li').click(function(e) {
            	//移除其他选择样式
                var menu = $('#page-sidebar-menu');
                var li = menu.find('li.active').removeClass('active');
            });
        };

        // 处理子菜单点击[点击之后，在中间内容区域加载内容]
        me.handleSubMenuClick = function() {
            $('#page-sidebar-menu li a').click(function(e) {
                e.preventDefault();
                var url = this.href;
                if (url != null && url != 'javascript:;') {
                	//设置引导显示menu>menu2
                	console.log('url:'+url);
                	changeMenu(this.text);
                	$.ajax({
                		  type :"GET",
                		  url :url,
                		  success :function(data){
                			  $('#main-content').html(data);
                		  },
                		  //async :false,
                		  error:function(XmlHttpRequest,textStatus, errorThrown)
                		  {
                			  console.log(XmlHttpRequest.status);
                			  console.log(textStatus);
                              $('#main-content').html(XmlHttpRequest.responseText);
                		  }
                		});
                }
            });
        };

        me.init = function() {
            me.handleMenuClick();
            me.handleSubMenuClick();
        };

        return me;
    })();

    Index.init();
    //触发点击事件
    $('#btn-dashboard').trigger("click");
});
