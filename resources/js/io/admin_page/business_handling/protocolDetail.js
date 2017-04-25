/*-----------------------------------------------------------------------------
* @DescriSion:  协议详情的相关ajax
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('io/admin_page/business_handling/protocolDetail',function(S){
	var urls;
	try {
		urls = PW.Env.url.admin_page.business_handling.protocolDetail;
	}catch(e){
		S.log("地址信息错误");
		return;
	}

	PW.namespace('io.admin_page.business_handling.protocolDetail');

	S.mix(PW.io.admin_page.business_handling.protocolDetail,{
		conn:urls,
		protocolDetailCheck:function(data,callback){
			 S.IO({
	                url:urls.protocolDetailCheck,
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
		protocolDetailProtocol:function(data,callback){
			 S.IO({
	                url:urls.protocolDetailProtocol,
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
		protocolParameterHidden:function(data,callback){
			 S.IO({
	                url:urls.protocolParameterHidden,
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