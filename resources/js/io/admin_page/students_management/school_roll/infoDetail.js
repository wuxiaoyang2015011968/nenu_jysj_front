/*-----------------------------------------------------------------------------
* @DescriSion:  派遣信息详情的相关ajax
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('io/admin_page/students_management/school_roll/infoDetail',function(S){
	var urls;
	try {
		urls = PW.Env.url.admin_page.students_management.school_roll.infoDetail;
	}catch(e){
		S.log("地址信息错误");
		return;
	}

	PW.namespace('io.admin_page.students_management.school_roll.infoDetail');

	S.mix(PW.io.admin_page.students_management.school_roll.infoDetail,{
		conn:urls,
		infoDetailCheck:function(data,callback){
			 S.IO({
	                url:urls.infoDetailCheck,
	                type:'get',
	                data:data,
	                dataType:'json',
	                success:function(rs){
	                    callback(
	                        rs.code,
	                        rs.data,
	                        rs.errMsg
	                        );
	                },
	                error:function(rs){
	                    callback(
	                        false,
	                        null,
	                        PW.Eng.msg[0]
	                    );
	                }
            	});
		},
		infoParameterHidden:function(data,callback){
			 S.IO({
	                url:urls.infoParameterHidden,
	                type:'get',
	                data:data,
	                dataType:'json',
	                success:function(rs){
	                    callback(
	                        rs.code,
	                        rs.data,
	                        rs.errMsg
	                        );
	                },
	                error:function(rs){
	                    callback(
	                        false,
	                        null,
	                        PW.Eng.msg[0]
	                    );
	                }
            	});
		}
	})
})