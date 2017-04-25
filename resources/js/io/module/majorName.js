/*-----------------------------------------------------------------------------
* @Description:     专业的ajax相关的js
* @Version:         1.0.0
* @author:          wuxiaoyang(543698149@qq.com)
* @date             2017.4.14
* ==NOTES:=============================================
* v1.0.0(2017.4.14):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/module/majorName',function(S){
    var urls;
    try{
        urls = PW.Env.url.module.majorName;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.module.majorName');
    S.mix(PW.io.module.majorName,{
        conn: urls,
        majorName: function(data, callback){
            S.IO({
                url: urls.majorName,
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