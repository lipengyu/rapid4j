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
                	//TODO:设置引导显示menu>menu2
                	changeMenu(this.text);
                    $.get(url, function(data) {
                        $('#main-content').html(data);
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
