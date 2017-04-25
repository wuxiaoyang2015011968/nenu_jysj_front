/*-----------------------------------------------------------------------------
* @DescriSion:  信息详情的相关ajax
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('io/admin_page/students_management/school_roll/detail',function(S){
	var urls;
	try {
		urls = PW.Env.url.admin_page.students_management.school_roll.detail;
	}catch(e){
		S.log("地址信息错误");
		return;
	}

	PW.namespace('io.admin_page.students_management.school_roll.detail');

	S.mix(PW.io.admin_page.students_management.school_roll.detail,{
		conn:urls,
		DetailCheck:function(data,callback){
			 S.IO({
	                url:urls.DetailCheck,
	                type:'get',
	                data:data,
	                dataType:'json',
	                success: function(rs){
                    callback(
                        rs.code,
                        rs.data,
                        rs.errMsg
	                    );
	                },
	                error: function(err){
	                    callback(
	                        false,
	                        null,
	                        PW.Env.msg[0]
	                    );
	                }
            	});
		}
	})
})