/*-----------------------------------------------------------------------------
* @DescriSion: index页面相关ajax
* @Version: 	V1.0.0
* @author: 		chenyz
* @date			2016.05.16
* ==NOTES:=============================================
* v1.0.0(2016.05.16):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('io/student_page/dispatch/writeInfo',function(S){
	var urls;
	try {
		urls = PW.Env.url.student_page.dispatch.writeInfo;
	}catch(e){
		S.log("地址信息错误");
		return;
	}
	PW.namespace('io.student_page.dispatch.writeInfo');
	S.mix(PW.io.student_page.dispatch.writeInfo,{
		conn:urls,
        getCity:function(data,callback){
            S.IO({
                url:urls.getCity,
                type:'get',
                data:data,
                dataType:'json',
                success:function(rs){
                    callback(
                        rs.code == 0,
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
        getTown:function(data,callback){
            S.IO({
                url:urls.getTown,
                type:'get',
                data:data,
                dataType:'json',
                success:function(rs){
                    callback(
                        rs.code == 0,
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