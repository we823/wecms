var root = {};

root.company = function(){
	var company = "上海臺蓬機械電子科技有限公司",
	    $company_container = $("span.company");
	if($company_container){
		$.each($company_container,function(index,element){
			$(element).html(company);	
		});
	}
};
root.validator = {};
root.validator.login = {};
root.validator.login.validate = function(){
	var validator = $("#form-data").validate({
		rules:{
			username:"required",
			password:"required"
		},
		messages:{
			username:"请填写用户名",
			password:"请填写密码"
		}
	});
	
	$("#reset").on("click",function(){
		validator.resetForm();
	});
};
root.news = {};
root.news.manage = {};
root.news.manage.init = function(){
	root.news.manage.validator();
	UE.getEditor("content_container");

	var show_type = arguments[0] || 0;
	root.news.manage.openLinkurl(show_type);
};
root.news.manage.validator = function(){
	var validator = $("#form-data").validate({
		rules:{
			title:"required"
		},
		messages:{
			title:"请填写新闻标题"
		}
	});
	
	$("#reset").on("click",function(){
		validator.resetForm();	
	})
};
root.news.manage.openLinkurl = function(show){
	if(show==1){
		$("#linkurl").css("display","block");
		root.CustomUploader.uploadImage.init("linkurl","upload2","?m=upload&f=files");
	}else{
		$("#linkurl").css("display","none");
		root.CustomUploader.uploadImage.destory("upload2");
	}
};
root.news.manage.initGrid = function(){
	var colNames = ["","序号","标题","点击数","添加时间"],
	    colModel = [
			{name:"myac", fixed:true, width:80,formatter:customActions,formatoptions:{keys:true,
				editformbutton:false,
				editUrl:"?m=manage&c=news&a=preEdit&id=",
				delUrl:"?m=manage&c=news&a=del"
			}},
			{name:"id",index:"id", fixed:true, width:55, align:'center',key:true},
			{name:"title",index:"title",width:55},
			{name:"hits",index:"hits",width:20},
			{name:"addtime",index:"addtime",width:40}
		],
	    options = {
		    caption:"新闻管理",
			colNames:colNames,
			colModel:colModel,
			newUrl:"?m=manage&c=news&a=preAdd",
			delUrl:"?m=manage&c=news&a=del&id=",
			jsonUrl:'?m=manage&c=news&a=getJson'
	};
	
	customGrid.init(options);
};

root.channel={};
root.channel.manage={};
root.channel.manage.initGrid = function(){
		var options={},
		    colNames = ["","序号","名称","点击数","添加时间"],
			colModel = [
				{name:"myac",fixed:true,width:80,formatter:customActions,formatoptions:{keys:true,
					editformbutton:false,
					editUrl:"preEdit.asp?id=",
					delUrl:"operate.asp?action=del"
				}},
				{name:"ID",index:"ID",width:15,key:true},
				{name:"name",index:"name",width:55},
				{name:"hits",index:"hits",width:30},
				{name:"addtime",index:"addtime",width:45}
			];
	options = {
		colNames:colNames,
		colModel:colModel,
		newUrl:"preAdd.asp",
		editUrl:"preEdit.asp?id=",
		delUrl:"operate.asp?action=del",
		caption:"栏目管理"
		};
	customGrid.init(options);	
};
root.channel.manage.openLinkurl = function(show){
	if(show==1){
		$("#linkurl").css("display","block");
	}else{
		$("#linkurl").css("display","none");
	}
};
root.channel.manage.validator = function(){
	var validator = $("#form-data").validate({
		rules:{
			name:"required"
		},
		messages:{
			name:"请填写栏目名称"
		}
	});
	
	$("#reset").on("click",function(){
		validator.resetForm();
	});
};

root.user={};
root.user.manage={};
root.user.manage.initGrid = function(){
    var options={},
	    colNames = ["","序号","用户名","登录次数"],
	    colModel = [
			{name:"myac",fixed:true,width:80,formatter:customActions,formatoptions:{keys:true,
				editformbutton:false,
				editUrl:"?m=manage&c=user&a=preEdit&id=",
				delUrl:"?m=manage&c=user&a=del"
			}},
			{name:"id",index:"id",width:55,key:true},
			{name:"username",index:"username",width:55},
			{name:"logins",index:"logins",width:55}
		];	
	options={
		caption:"用户管理",
		colNames:colNames,
		colModel:colModel,
		newUrl:"?m=manage&c=user&a=preAdd",
		editUrl:"?m=manage&c=user&a=preEdit&id=",
		jsonUrl:'?m=manage&c=user&a=getJson'
	};
	customGrid.init(options);
};
root.user.manage.validator = function(){
	var validator = $("#form-data").validate({
		rules:{
			username:"required",
			passwd:"required"
		},
		messages:{
			username:"请填写用户名",
			passwd:"请填写密码"
		}
	});
	
	$("#reset").on("click",function(){
		validator.resetForm();
	});
};
root.user.manage.valiatorEdit = function(){
	var validator = $("#form-data").validate({
		rules:{
			username:"required"
		},
		messages:{
			username:"请填写用户名"
		}
	});
	
	$("#reset").on("click",function(){
		validator.resetForm();
	});
};

root.application = {};
root.application.manage = {};
root.application.manage.init = function(){
	UE.getEditor("content");
	root.application.manage.validator();	
};
root.application.manage.validator = function(){
	var validator = $("#form-data").validate({
		rules:{
			a_name:"required"	
		},
		messages:{
			a_name:"请输入项目案例名称"	
		}
	});
	$("#reset").on("click",function(){
		validator.resetForm();	
	});
};
root.application.manage.initGrid = function(){
		var options={},
	    colNames = ["","序号","名称","类别","首页显示","添加时间"],
	    colModel = [
			{name:"myac",fixed:true,width:80,formatter:customActions,formatoptions:{keys:true,
				editformbutton:false,
				editUrl:"preEdit.asp?id=",
				delUrl:"operate.asp?action=del"
			}},
			{name:"id",index:"id",width:55,key:true,fixed:true},
			{name:"a_name",index:"a_name",width:55},
			{name:"a_type",index:"a_index",width:20,formatter:function(value,rowObject,cellObject){
				if(value===1){
				   return "视频";	
				}else{
				   return "案例";	
				}
			}},
			{name:"iscurrent",index:"iscurrent",width:20,formatter:function(value,rowObject,cellObject){
				if(value===1){
				   return "是";	
				}else{
				   return "否";	
				}
			}},
			{name:"addtime",index:"addtime",width:55}
		];	
	options={
		caption:"项目案例管理",
		colNames:colNames,
		colModel:colModel,
		newUrl:"preAdd.asp",
		editUrl:"preEdit.asp?id="	
	};
	customGrid.init(options);
};

root.team={};
root.team.manage={};
root.team.manage.init = function(){
	UE.getEditor("description");	
};
root.team.manage.initGrid = function(){
    var options={},
	    colNames = ["","序号","名称","添加时间"],
	    colModel = [
			{name:"myac",fixed:true,width:80,formatter:customActions,formatoptions:{keys:true,
				editformbutton:false,
				editUrl:"preEdit.asp?id=",
				delUrl:"operate.asp?action=del"
			}},
			{name:"id",index:"id",width:55,key:true},
			{name:"t_name",index:"t_name",width:55},
			{name:"addtime",index:"addtime",width:55}
		];	
	options={
		caption:"团队信息管理",
		colNames:colNames,
		colModel:colModel,
		newUrl:"preAdd.asp",
		editUrl:"preEdit.asp?id="	
	};
	customGrid.init(options);
};

root.cooperation={};
root.cooperation.manage={};
root.cooperation.manage.init=function(){
	UE.getEditor("description");
	root.cooperation.manage.validator();
};
root.cooperation.manage.validator = function(){
	var validator = $("#form-data").validate({
		rules:{
			c_name:"required"	
		},
		messages:{
			c_name:"必须填写合作伙伴信息名称"	
		}	
	});	
	
	$("#reset").on("click",function(){
		validator.resetForm();	
	});
};
root.cooperation.manage.initGrid = function(){
	var options={},
	    colNames = ["","序号","名称","排序号","添加时间"],
	    colModel = [
			{name:"myac",fixed:true,width:80,formatter:customActions,formatoptions:{keys:true,
				editformbutton:false,
				editUrl:"preEdit.asp?id=",
				delUrl:"operate.asp?action=del"
			}},
			{name:"id",index:"id",width:55,fixed:true,key:true},
			{name:"c_name",index:"c_name",width:55},
			{name:"orderid",index:"orderid",width:35},
			{name:"addtime",index:"addtime",width:55}
		];	
	options={
		caption:"合作伙伴信息管理",
		colNames:colNames,
		colModel:colModel,
		newUrl:"preAdd.asp",
		editUrl:"preEdit.asp?id="	
	};
	customGrid.init(options);
};

root.guestbook={};
root.guestbook.manage={};
root.guestbook.manage.initGrid = function(){
	var options={},
	    colNames = ["序号","名字","联系方式","问题","回答","添加时间","操作"],
	    colModel = [
			{name:"id",index:"id",width:55,fixed:true,key:true},
			{name:"g_name",index:"g_name",width:55},
			{name:"contact",index:"contact",width:35},
			{name:"question",index:"question",width:35},
			{name:"answer",index:"answer",width:35},
			{name:"addtime",index:"addtime",width:55},
			{name:"myac",fixed:true,width:80,formatter:customActions,formatoptions:{keys:true,
				editformbutton:false,
				editUrl:"preEdit.asp?id=",
				delUrl:"operate.asp?action=del"
			}}
		];	
	options={
		caption:"留言板管理",
		colNames:colNames,
		colModel:colModel,
		newUrl:"preAdd.asp",
		editUrl:"preEdit.asp?id="	
	};
	customGrid.init(options);
};
root.guestbook.manage.init=function(){
	UE.getEditor("question");
	UE.getEditor("answer");	
};
root.slider={};
root.slider.manage={};
root.slider.manage.initGrid = function(){
	var options={},
	    colNames = ["","序号","名字","标题","链接方式","排序号","添加时间"],
	    colModel = [
		{name:"myac",fixed:true,width:80,formatter:customActions,formatoptions:{keys:true,
				editformbutton:false,
				editUrl:"preEdit.asp?id=",
				delUrl:"operate.asp?action=del"
			}},
			{name:"id",index:"id",width:55,fixed:true,key:true},
			{name:"s_name",index:"s_name",width:55},
			{name:"title",index:"title",width:35},
			{name:"linkurl",index:"linkurl",width:35},
			{name:"orderid",index:"orderid",width:35},
			{name:"addtime",index:"addtime",width:55},
			
		];	
	options={
		caption:"图片管理",
		colNames:colNames,
		colModel:colModel,
		newUrl:"preAdd.asp",
		editUrl:"preEdit.asp?id="	
	};
	customGrid.init(options);
};
root.slider.manage.validator = function(){
	var validator = $("#form-data").validate({
		rules:{
			s_name:"required",
			title:"required",
			pic:"required"	
		},
		messages:{
			s_name:"请输入名称",
			title:"请输入标题",
			pic:"请输入图片地址"	
		}	
	});
	
	$("#reset").on("click",function(){
		validator.resetForm();	
	});	
};

root.CustomUploader = {};
root.CustomUploader.uploadImage = {
    init: function (resultContainer, uploadContainer) {
    	var time = new Date().getTime();
        $("#"+uploadContainer).html('<div id="thelist-'+time+'" style="display: none"></div><div id="picker-'+time+'">选择文件</div><span id="upload-msg-'+time+'"></span>');
		var serverUrl="../upload.php?fileField=file";
		if(arguments[2]!==undefined){
			serverUrl=arguments[2];	
		}
        var $uploadMsg = $("#upload-msg-"+time),
            uploader = WebUploader.create({
                swf: "/static/asset/webuploader/Uploader.swf",
                server: serverUrl,
                pick: "#picker-"+time,
				name:"upfile",
                resize: true,
                auto: true,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                }
            });
        // 当有文件被添加进队列的时候
        uploader.on('fileQueued', function (file) {
            $uploadMsg.append('<span id="' + file.id + '" class="item">' +
                '<span class="info">' + file.name + '</span>' +
                '<span class="state">等待上传...</span>' +
                '</span>');
        });
        uploader.on('uploadSuccess', function (file, data) {
			if(data.hasError===false){
                $("#" + resultContainer).val(data.filename);
                $('#' + file.id).find('span.state').text(data.message);
			}else{
				$('#' + file.id).find('span.state').text(data.message);	
			}
        });

        uploader.on('uploadError', function (file) {
            $('#' + file.id).find('span.state').text('上传出错');
        });
    }, destory: function (uploadContainer) {
        $("#"+uploadContainer).html('');
    }
};