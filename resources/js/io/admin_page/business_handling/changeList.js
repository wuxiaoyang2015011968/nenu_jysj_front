/*-----------------------------------------------------------------------------
* @Description:     业务受理--协议业务ajax相关js
* @Version:         n.n.n
* @author:          lixingyu(starsuniverseLi@gmail.com)
* @date             2016.7.14
* ==NOTES:=============================================
* vn.n.n(2016.7.14):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/admin_page/business_handling/changeList' , function(S) {
    var urls;
    try {
        urls = PW.Env.url.admin_page.business_handling.changeList;
    }catch(e) {
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.admin_page.business_handling.changeList');

    S.mix(PW.io.admin_page.business_handling.changeList, {
        conn: urls,
        /*加载协议信息*/
        showChangeListIO: function(data,callback) {
            S.IO({
                url: urls. showChangeList,
                type: 'get',
                data: data,
                dataType: 'json',
                success: function(rs) {
                    callback(
                        rs.code == 0,
                        rs.data,
                        rs.errMsg
                    );
                },
                error: function(rs) {
                    callback(
                        false,
                        null,
                        PW.Env.msg[0]
                    );
                }
            });
        },
        
        /*传递当前点击学生相关信息（与下一个学生相连）*/
        nowInfo:function(data,callback){
             S.IO({
                    url:urls.nowInfo,
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
        
    });
});