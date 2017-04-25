/*---------------------------------------------------------------------------------------------
@Filename: importData.js
@Description: 系统管理 上传数据 js定义
@Version: 1.0.0(2016-09-08)
@author: lixingyu
2016-07-12:
初始生成。
--------------------------------------------------------------------------------------------*/
$(function  () {
	var upbtn = $(".up");
	var filename = $(".filename");
	var deletebtn = $(".delete");
	var submit = $(".submit");
	
	upbtn.each(function(){
		$(this).change(function(){
		var fakepath = $(this).val();
		var filepath = fakepath.replace(fakepath.substring(0,12),"");
			filename.text(filepath);
	    });
	});

	deletebtn.click(function(){
		filename.text("仅支持上传xls类型文件！");
		upbtn.attr("value","");
	});

	upbtn.click(function(){
		if(filename.text() != "仅支持上传xls类型文件！"){
			alert("只支持上传一个文件！请取消上传后重新选择。");
			return false;
		};
    });
	
	submit.click(function(){
		var upbtn = $(".up");
		//判断是否有上传文件
		var filepath = filename.text();
		if (filepath == "仅支持上传xls类型文件！") {
			alert("请选择要上传的文件！");
			return ;
		};
		
        //判断上传文件是否符合规范
		var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        alert(extStart);
        if(ext != ".XLS" && ext != ".XLSX"){
        	alert("仅支持上传xls类型文件！请重新选择。");
        	filename.text("仅支持上传xls类型文件！");
		    upbtn.attr("value","");
		    return ;
        };
        //上传文件 
       
	    upbtn.each(function(){
	    	var thisbtn = $(this);
	    	if (thisbtn.val() != "") {
	    		thisbtn.parent().submit();
	    	}
	    	else{
	    		return;    	
	    	};
	    })
        
	})
})