root.product={};
root.product.manage={};
root.product.manage.add = {
	init: function(){
		root.CustomUploader.uploadImage.init("linkurl","upload-linkurl","?m=upload&f=files");
	}
};

root.product.manage.initGrid = function(){
	var colNames = ["","序号","标题","简称","添加时间"],
	    colModel = [
			{name:"myac",fixed:true,width:80,formatter:customActions,formatoptions:{keys:true,
				editformbutton:false,
				editUrl:"?m=manage&c=product&a=preEdit&id=",
				delUrl:"?m=manage&c=product&a=del"
			}},
			{name:"id",index:"id",fixed:true,width:55,key:true},
			{name:"title",index:"title",width:55},
			{name:"short_title",index:"short_title",width:55},
			{name:"addtime",index:"addtime",width:55}
		],
	    options = {
		    caption:"产品管理",
			colNames:colNames,
			colModel:colModel,
			newUrl:"?m=manage&c=product&a=preAdd",
			delUrl:"?m=manage&c=product&a=del&id=",
			jsonUrl:'?m=manage&c=product&a=getJson'
	};
	
	customGrid.init(options);
};


function addProduct(){
	var $list = $('.photo-list');
	var tpl = document.getElementById('photolink_template').innerHTML;
	
	var data = {
		time: new Date().getTime()
	}
	laytpl(tpl).render(data, function(html){
		$list.append(html);
		root.CustomUploader.uploadImage.init("photolink-linkurl_"+data.time,"upload-"+data.time,"?m=upload&f=files");
	});
}

function delProduct(b){
	var $button = $(b);
	var $parent = $button.parent().parent();
	$parent.remove();
}
