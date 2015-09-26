$(function() {
    App.init();

    var Index = (function() {
        var me = {};

        // 处理一级菜单点击
        me.handleMenuClick = function() {
            $('#page-sidebar-menu > li').click(function(e) {
                var menu = $('#page-sidebar-menu');
                var li = menu.find('li.active').removeClass('active');

                // 添加选中 打开的样式
                $(this).addClass('active');
                
                //TODO:设置index-page-title显示
            });
        };

        // 处理子菜单点击[点击之后，在中间内容区域加载内容]
        me.handleSubMenuClick = function() {
            $('#page-sidebar-menu li a').click(function(e) {
                e.preventDefault();
                var url = this.href;
                if (url != null && url != 'javascript:;') {
                	//TODO:设置引导显示menu>menu2
                	
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
