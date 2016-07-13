var customGrid = {};
customGrid.init = function(options){
	if(options===undefined){
		options={};
	}
	var grid_selector = options.grid===undefined ? "#gridTable" : options.grid,
	 pager_selector = options.pager===undefined ? "#gridPager" : options.pager,
	 jsonUrl = options.jsonUrl===undefined ? "getJson.php" : options.jsonUrl,
	 colNames = options.colNames,
	 colModel = options.colModel,
	 caption = options.caption,
	 height = (options.height===undefined) ? "auto" : options.height,
	 newUrl = (options.newUrl===undefined) ? undefined : options.newUrl,
	 editUrl = (options.editUrl===undefined) ? undefined : options.editUrl,
	 delUrl = (options.delUrl===undefined) ? "del.asp?id=" : options.delUrl,
	 needCustomLink = (options.needCustomLink===undefined) ? false : options.needCustomLink,
	 processUrl = (options.processUrl===undefined) ? "process.php?id=" : options.processUrl,
	 canEdit = (options.canEdit===undefined) ? true : options.canEdit,
	 canDel = (options.canDel===undefined) ? true : options.canDel,
	 canAdd = (options.canAdd===undefined) ? true : options.canAdd;
	
	$(grid_selector).jqGrid({
		url:jsonUrl,
		datatype: "json",
		height: height,
		colNames:colNames,
		colModel:colModel, 
		viewrecords : false,
		rowNum:10,
		rowList:[10,20,30],
		pager : pager_selector,
		altRows: true,
		//toppager: true,
		multiselect: true,
		//multikey: "ctrlKey",
        multiboxonly: true,

		loadComplete : function() {
			var table = this;
			setTimeout(function(){
				styleCheckbox(table);
				updateActionIcons(table);
				updatePagerIcons(table);
				enableTooltips(table);
			}, 0);
			if(needCustomLink){
				setCustomLinks(table);
			}
		},
		editurl: processUrl,
		caption: caption,
		jsonReader:{
			root:"datarows",
			repeatitems:false
		}
		,autowidth: true,
	});
	$(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
	
	//navButtons
	$(grid_selector).jqGrid('navGrid',pager_selector,
		{ 	//navbar options
			edit: canEdit,
			editicon : 'ace-icon fa fa-pencil blue',
			add: canAdd,
			addicon : 'ace-icon fa fa-plus-circle purple',
			del: canDel,
			delicon : 'ace-icon fa fa-trash-o red',
			search: true,
			searchicon : 'ace-icon fa fa-search orange',
			refresh: true,
			refreshicon : 'ace-icon fa fa-refresh green',
			view: true,
			viewicon : 'ace-icon fa fa-search-plus grey',
		},
		{
			//edit record form
			//closeAfterEdit: true,
			//width: 700,
			recreateForm: true,
			beforeShowForm : function(e) {
				var form = $(e[0]);
				var sgr = $(grid_selector).jqGrid("getGridParam","selrow");
				if(editUrl!==undefined){
					location.href = editUrl + sgr;
				}
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
				style_edit_form(form);
			}
		},
		{
			//new record form
			//width: 700,
			closeAfterAdd: true,
			recreateForm: true,
			viewPagerButtons: false,
			beforeShowForm : function(e) {
				if(newUrl!==undefined){
					location.href = newUrl;
					return;
				}
				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
				style_edit_form(form);
			}
		},
		{
			//delete record form
			recreateForm: true,
			beforeShowForm : function(e) {
				var sgr = $(grid_selector).jqGrid("getGridParam","selrow");
				if(delUrl!==undefined){
					location.href = delUrl + sgr;
				}
				var form = $(e[0]);
				if(form.data('styled')) return false;
				
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
				style_delete_form(form);
				
				form.data('styled', true);
			},
			onClick : function(e) {
				alert(1);
			}
		},
		{
			//search form
			recreateForm: true,
			afterShowSearch: function(e){
				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
				style_search_form(form);
			},
			afterRedraw: function(){
				style_search_filters($(this));
			}
			,
			multipleSearch: true,
		},
		{
			//view record form
			recreateForm: true,
			beforeShowForm: function(e){
				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
			}
		}
	);

};

customGrid.reload = function(options){
	if(options.jqgrid===undefined){
		options.jqgrid = "#gridTable";
	}
	$(options.jqgrid).jqGrid('setGridParam',{url:options.url,page:1}).trigger("reloadGrid");
};
	//switch element when editing inline
	function aceSwitch( cellvalue, options, cell ) {
		setTimeout(function(){
			$(cell) .find('input[type=checkbox]')
				.addClass('ace ace-switch ace-switch-5')
				.after('<span class="lbl"></span>');
		}, 0);
	}
	//enable datepicker
	function pickDate( cellvalue, options, cell ) {
		setTimeout(function(){
			$(cell) .find('input[type=text]')
					.datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
		}, 0);
	}

	function style_edit_form(form) {
		//enable datepicker on "sdate" field and switches for "stock" field
		form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
			.end().find('input[name=stock]')
				.addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
				   //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
				  //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

		//update buttons classes
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
		buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
		buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>');
		
		buttons = form.next().find('.navButton a');
		buttons.find('.ui-icon').hide();
		buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
		buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');		
	}

	function style_delete_form(form) {
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
		buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
		buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>');
	}
	
	function style_search_filters(form) {
		form.find('.delete-rule').val('X');
		form.find('.add-rule').addClass('btn btn-xs btn-primary');
		form.find('.add-group').addClass('btn btn-xs btn-success');
		form.find('.delete-group').addClass('btn btn-xs btn-danger');
	}
	function style_search_form(form) {
		var dialog = form.closest('.ui-jqdialog');
		var buttons = dialog.find('.EditTable');
		buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
		buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
		buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
	}
	
	function beforeDeleteCallback(e) {
		var form = $(e[0]);
		if(form.data('styled')) return false;
		
		form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
		style_delete_form(form);
		
		form.data('styled', true);
	}
	
	function beforeEditCallback(e) {
		var form = $(e[0]);
		form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
		style_edit_form(form);
	}



	//it causes some flicker when reloading or navigating grid
	//it may be possible to have some custom formatter to do this as the grid is being created to prevent this
	//or go back to default browser checkbox styles for the grid
	function styleCheckbox(table) {
	/**
		$(table).find('input:checkbox').addClass('ace')
		.wrap('<label />')
		.after('<span class="lbl align-top" />')


		$('.ui-jqgrid-labels th[id*="_cb"]:first-child')
		.find('input.cbox[type=checkbox]').addClass('ace')
		.wrap('<label />').after('<span class="lbl align-top" />');
	*/
	}
	

	//unlike navButtons icons, action icons in rows seem to be hard-coded
	//you can change them like this in here if you want
	function updateActionIcons(table) {
		/**
		var replacement = 
		{
			'ui-ace-icon fa fa-pencil' : 'ace-icon fa fa-pencil blue',
			'ui-ace-icon fa fa-trash-o' : 'ace-icon fa fa-trash-o red',
			'ui-icon-disk' : 'ace-icon fa fa-check green',
			'ui-icon-cancel' : 'ace-icon fa fa-times red'
		};
		$(table).find('.ui-pg-div span.ui-icon').each(function(){
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
			if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
		})
		*/
	}
	
	//replace icons with FontAwesome icons like above
	function updatePagerIcons(table) {
		var replacement = 
		{
			'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
			'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
			'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
			'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
			
			if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
		});
	}

	function enableTooltips(table) {
		$('.navtable .ui-pg-button').tooltip({container:'body'});
		$(table).find('.ui-pg-div').tooltip({container:'body'});
	}

	//var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
	/*
	function setCustomLinks(table){
		var ids = $(table).jqGrid("getDataIDs");
		for(var i = 0;i<ids.length;i++){
			var id = ids[i];
			var edit = "<a href=\"preEdit.jspx?id="+id+"\" title=\"修改\"><span class=\"ace-icon fa fa-pencil blue\"></span></a>";
			var del = "<a href=\"del.jspx?id="+id+"\" title=\"删除\"><span class=\"ace-icon fa fa-trash-o red\"></span></a>";
			$(table).jqGrid("setRowData",id,{
				myac:edit +" " + del
			});
		}
	}
	*/
	
	function customActions(cellValue,options,rowObject){
		var id = options.rowId;
		var table = options.gid;
		var editUrl = "preEdit.jspx?id="+id;
		//var delUrl = "delete.jspx?id="+id;
		var delUrl = "delete.asp";
		var fullDelUrl = "delete.jspx";
		
		if(options.colModel.formatoptions.editUrl !== undefined){
			editUrl = options.colModel.formatoptions.editUrl+id;
		}
		
		if(options.colModel.formatoptions.delUrl !== undefined){
			//delUrl = options.colModel.formatoptions.delUrl+id;
			delUrl = options.colModel.formatoptions.delUrl;
			fullDelUrl = delUrl;
		}
		
		
		var edit = "<div title=\""+$.jgrid.nav.edittitle+"\" style=\"float: left; cursor: pointer; display: block;\" class=\"ui-pg-div ui-inline-edit\" onclick=\"redirect('"+editUrl+"','"+table+"',"+id+",false)\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\">"
		           +"<span class=\"ui-icon ui-icon-pencil\"></span></div>";
		var del = "<div title=\""+$.jgrid.nav.deltitle+"\" style=\"float: left; margin-left: 5px; display: block;\" class=\"ui-pg-div ui-inline-del\" onclick=\"redirect('"+fullDelUrl+"','"+table+"',"+id+",true)\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\">"
		           +"<span class=\"ui-icon ui-icon-trash\"></span></div>";
		if(options.canEdit!==undefined && options.canEdit===false){
			edit = "";
		}
		if(options.canDel!==undefined && options.canDel===false){
			del="";
		}
		return edit + del;
	}
	
	function redirect(url,table,id,isDel){
		if(isDel){
			if(table!==undefined){
				$("#"+table).jqGrid("delGridRow",id,{url:url,mtype:'get'});
				/*location.href = url;*/
			}
		}else{
			location.href = url;
		}
	}

var fillCustomLinks = function(table,link,title){
    var ids = $(table).jqGrid("getDataIDs");
    for(var i = 0;i<ids.length;i++){
        var id = ids[i];
        var customLink = "<a href=\""+link.replace("{#id}",id)+"\" title=\""+title+"\"><span class=\"ace-icon fa fa-pencil blue\"></span>"+title+"</a>";
        $(table).jqGrid("setRowData",id,{
            customLink:customLink
        });
    }
};