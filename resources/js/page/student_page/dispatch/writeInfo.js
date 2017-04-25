/*-----------------------------------------------------------------------------
* @DescriSion: 填写派遣信息页面相关js
* @Version:     V1.0.0
* @author:      chenyz(571108675@qq.com)
* @date         2016.7.25
* ==NOTES:=============================================
* v1.0.0(2016.7.25):
*   初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('page/student_page/dispatch/writeInfo' , function(S,alterInfoShow,submit,suggest){
    PW.namespace('page.student_page.dispatch.writeInfo');
    PW.page.student_page.dispatch.writeInfo = function(param){
        new alterInfoShow(param);
        new submit(param);
        new suggest(param);
    }
},{
    requires:['writeInfo/alterInfoShow','alterInfo/submit','alterInfo/suggest']
});
KISSY.add('writeInfo/alterInfoShow',function(S){
     var
        alterInfoShow = PW.module.dispatch.alterInfoShow;
        function alterInfoShow(param){
            new alterInfoShow(param);
        }
    return alterInfoShow;
},{
    requires:['module/dispatch/alterInfoShow']
});
/*------------------------------submit---------------------------------------------*/
KISSY.add('alterInfo/submit',function(S){
    var
        submit = PW.module.dispatch.submit;
        function submit(param){
            new submit(param);
        }

    return submit;
},{
    requires:['module/dispatch/submit']
});
/*---------------------------------suggest------------------------------------*/
KISSY.add('alterInfo/suggest',function(S){
    var
        suggest = PW.module.dispatch.suggest;
        function suggest(param){
            new suggest(param);
        }
        return suggest;
},{
    requires:['module/dispatch/suggest']
});

