/*-----------------------------------------------------------------------------
* @Description:     suggest部分的ajax相关的js
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.9.15
* ==NOTES:=============================================
* v1.0.0(2014.9.15):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/module/getArea',function(S){
	var urls;
    try{
        urls = PW.Env.url.module.getArea;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.module.getArea');
    S.mix(PW.io.module.getArea,{
        conn: urls,
        getArea: function(data, callback){
            S.IO({ 
                url: urls.getArea,
                type: 'GET',
                data: {},
                dataType: 'json',
                success: function(rs){
                    callback(
                        rs.code == 0,
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
    });
},{
	requires:['mod/ext']
});