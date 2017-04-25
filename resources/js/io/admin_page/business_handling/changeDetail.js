/*-----------------------------------------------------------------------------
* @DescriSion:  变更详情的相关ajax
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('io/admin_page/business_handling/changeDetail',function(S){
	var urls;
	try {
		urls = PW.Env.url.admin_page.business_handling.changeDetail;
	}catch(e){
		S.log("地址信息错误");
		return;
	}

	PW.namespace('io.admin_page.business_handling.changeDetail');

	S.mix(PW.io.admin_page.business_handling.changeDetail,{
		conn:urls,
		changeDetailProtocol:function(data,callback){
			 S.IO({
	                url:urls.changeDetailProtocol,
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
		},
		changeDetailCheck:function(data,callback){
			 S.IO({
	                url:urls.changeDetailCheck,
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
		},
		changeParameterHidden:function(data,callback){
			 S.IO({
	                url:urls.changeParameterHidden,
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