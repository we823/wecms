define(function(require, exports, module){
	
	exports.init = function(resultContainer, uploadContainer, base){
		var time = new Date().getTime();
        $("#"+uploadContainer).html('<div id="thelist-'+time+'" style="display: none"></div><div id="picker-'+time+'">选择文件</div><span id="upload-msg-'+time+'"></span>');
		var serverUrl="../upload.php?fileField=file";
		if(arguments[3]){
			serverUrl=arguments[3];	
		}
        var $uploadMsg = $("#upload-msg-"+time),
            uploader = WebUploader.create({
                swf: base + "/static/asset/webuploader/Uploader.swf",
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
	};
	
	exports.destroy = function(uploadContainer){
		$("#"+uploadContainer).html('');
	};
});
