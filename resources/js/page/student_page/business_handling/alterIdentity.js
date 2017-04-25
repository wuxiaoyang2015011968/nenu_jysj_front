/*-----------------------------------------------------------------------------
* @DescriSion: 学生页修改申请协议信息页面相关js
* @Version:     V1.0.0
* @author:      xieyt(1527242531@qq.com)
* @date         2016.9.13
* ==NOTES:=============================================
* v1.0.0(2016.9.13):
*   初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('page/student_page/business_handling/alterIdentity' , function(S,image){
    PW.namespace('page.student_page.business_handling.alterIdentity');
    PW.page.student_page.business_handling.alterIdentity = function(param){
        new image(param);
    }
},{
    requires:['alterIdentity/image']
});
/*-----------------------------image-------------------------------*/
KISSY.add('alterIdentity/image', function(S){
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