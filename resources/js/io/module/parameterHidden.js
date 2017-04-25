/*-----------------------------------------------------------------------------
* @DescriSion:  信息详情的相关ajax，有隐藏域参数有关
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.05.17
* ==NOTES:=============================================
* v1.0.0(2016.05.17):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('io/module/parameterHidden',function(S){
	var urls;
	try {
		urls = PW.Env.url.module.parameterHidden;
	}catch(e){
		S.log("地址信息错误");
		return;
	}

	PW.namespace('io.module.parameterHidden');

	// S.mix(PW.io.module.parameterHidden,{
	// 	conn:urls,
	// 	parameterHidden:function(data,callback){
	// 		 S.IO({
	//                 url:urls.parameterHidden,
	//                 type:'get',
	//                 data:data,
	//                 dataType:'json',
	//                 success: function(rs){
 //                    callback(
 //                        rs.code,
 //                        rs.data,
 //                        rs.errMsg
	//                     );
	//                 },
	//                 error: function(err){
	//                     callback(
	//                         false,
	//                         null,
	//                         PW.Env.msg[0]
	//                     );
	//                 }
 //            	});
	// 	}
	// })
})