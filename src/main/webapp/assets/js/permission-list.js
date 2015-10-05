$(document).ready(function() {
	 var dsOption = {
		        fields: [{
		            name: 'id'
		        }, {
		            name: 'permission_name'
		        }, {
		        	name: 'permission_sign'
		        }, {
		        	name: 'description'
		        }],
		        uniqueField: 'id'
		    };

		    var colsOption = [{
		        id: "chk",
		        isCheckColumn: true,
		        filterable: false
		    }, {
		        id: 'id',
		        header: "ID",
		        hidden: true,
		        headAlign: 'center',
		        align: 'center',
		        sortOrder: 'desc',
		        editable: false,
		        width: 250
		    }, {
		        id: 'permission_name',
		        header: "内核引擎",
		        headAlign: 'center',
		        align: 'center',
		        width: 180,
		        editor: {
		            type: "text",
		            validRule: ["R"]
		        }
		    }, {
		    	id: 'permission_sign',
		    	header: "浏览器",
		    	headAlign: 'center',
		    	align: 'center',
		    	width: 180,
		        editor: {
		            type: "text",
		            validRule: ["R"]
		        }
		    }, {
		    	id: 'description',
		    	header: "平台",
		    	headAlign: 'center',
		    	align: 'center',
		    	width: 180,
		        editor: {
		            type: "text",
		            validRule: ["R"]
		        }
		    }, {
		        id: 'datetime',
		        header: "时间",
		        headAlign: 'center',
		        align: 'center',
		        width: 180,
		        editor: {
		            type: "date",
		            showTime:true,
		            format:"yyyy-MM-dd HH:mm:ss",
		            validRule: ["R"]
		        }
		    }];

		    var gridOption = {
		        id: "grid",
		        dataset: dsOption,
		        columns: colsOption,
		        container: 'grid_container',
		        toolbarContent: 'nav | pagesize | reload | add del save | state',
		        width: "880",
		        // "100%", // 700,
		        height: "500",
		        // "100%", // 330,
		        pageSize: 50,
		        pageSizeList: [5, 1000, 1500, 2000, 5000],
		        loadURL: "/rest/permission/all",
		        saveURL: "/rest/permission/save",
		        replaceContainer: true,
		        // 替换div的设置
		        selectRowByCheck: false,
		        // end user can select row by
		        // checkbox.
		        lightOverRow: true,
		        // 是否开启行的鼠标悬停指示
		        remoteSort: true,
		        // 是否服务端排序
		        multiSort: true,
		        // 是否把所有的排序都提交到服务器，否则只提交最后一个字段的排序信息到服务器
		        remoteFilter: true,
		        // 是否服务端过滤
		        clickStartEdit: false,
		        // 是否为"单击单元格直接进入编辑状态"
		        submitUpdatedFields: true,
		        // 只提交更新了的字段到服务器，
		        showGridMenu: true,
//		        skin:"jqueryui",
		        // 是否显示菜单
		        allowCustomSkin	: true ,
		        // resizable : true,// 是否缩放
		        allowHide: true,
		        // 是否显示隐藏列的菜单
		        saveFailure: function (respD, e) {
		        	console.log(respD.exception);
		        },
		        defaultRecord: {
		        	id: '',
		        	permission_name: "engine",
		        	permission_sign: "browser",
		        	description: "platform"
		        },
		        onComplete: function (grid) {
//		        	console.log("onComplete");
//		        	console.timeStamp();
		        },
		        beforeLoad: function (grid) {
//		        	console.log("beforeLoad");
//		        	console.timeStamp();
		        }
		    };
		    $("#grid").sigmaGrid(gridOption);
});
