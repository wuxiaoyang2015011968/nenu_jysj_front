/*-----------------------------------------------------------------------------
* @DescriSion: 学生页修改派遣信息页面相关js
* @Version:     V1.0.0
* @author:      chenyz(571108675@qq.com)
* @date         2016.7.13
* ==NOTES:=============================================
* v1.0.0(2016.7.13):
*   初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('page/student_page/dispatch/alterInfo' , function(S,alterInfoShow,suggest,submit,image){
    PW.namespace('page.student_page.dispatch.alterInfo');
    PW.page.student_page.dispatch.alterInfo = function(param){
        new alterInfoShow(param);
        new submit(param);
        new suggest(param);
        new image(param);
    }
},{
    requires:['alterInfo/suggest','alterInfo/alterInfoShow','alterInfo/submit','alterInfo/image']
});
/*---------------------------------------------------------------------------*/
KISSY.add('alterInfo/alterInfoShow',function(S){
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
/*-----------------------------image-------------------------------*/
KISSY.add('alterInfo/image', function(S){
    var
        $ = S.all, on = S.Event.on, DOM = S.DOM,
        el = {
            pop_pic: '.J_pop_pic', 
            thumbnail:'.J_thumbnail',
            shut: '.J_shut',
        };
    function image(){
        this.init();
    }
    S.augment(image, {
        init: function(){
            this._addEventListener();
        },
        _addEventListener: function(){
            var 
                that = this;
            $(el.thumbnail).on('click', function(ev) {
                $(el.pop_pic).show();
                var imgUrl = $(this).attr("src");
                $(el.pop_pic).children("img").attr("src",imgUrl);
            });
            $(el.shut).on('click', function(ev) {
                $(el.pop_pic).hide();
            });

        },
    });
    return image;
},{
    requires: ['core']
})