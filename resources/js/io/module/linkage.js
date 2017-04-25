/*-----------------------------------------------------------------------------
* @Description:     填写学籍页面ajax相关js
* @Version:         1.0.0
* @author:          qiyuan
* @date             2016.7.14
* ==NOTES:=============================================
* v1.0.0(2016.7.14):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/module/linkage' , function(S){
    var urls;
    try{
        urls = PW.Env.url.module.linkage;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.module.linkage');

    S.mix(PW.io.module.linkage, {
        conn: urls,
        majorClassIO:function(data,callback){
            S.IO({
                url:urls.majorClass,
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
        /** 专业联动下拉框**/
        majorMinorClassIO:function(data,callback){
            S.IO({
                url:urls.majorMinorClass,
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
        majorNameIO:function(data,callback){
            S.IO({
                url:urls.majorName,
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
    });
});