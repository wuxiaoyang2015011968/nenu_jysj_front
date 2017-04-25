/*-----------------------------------------------------------------------------
* @Description:     学生修改学籍信息页面相关js
* @Version:         1.0.0
* @author:          qiyuan
* @date             2016.7.14
* ==NOTES:=============================================
* v1.0.0(2016.7.14):
     初始生成
* ---------------------------------------------------------------------------*/
/*给它制造命名空间，专门存放各个页面js,被主页面调用*/
KISSY.add('page/student_page/school_roll/alterInfo' , function(S, schoolRoll, suggest, linkage, save){
    PW.namespace('page.student_page.school_roll.alterInfo');
    PW.page.student_page.school_roll.alterInfo = function(param){
        new schoolRoll(param);
        new suggest(param);
        new linkage(param);
        new save(param);
    }
},{
    requires:['alterInfo/suggest', 'alterInfo/schoolRoll', 'alterInfo/linkage', 'alterInfo/save']
});
/*---------------------------------------------------------------------------*/
/*开始改页面模块的js内容*/
KISSY.add('alterInfo/schoolRoll' , function(S){
    var
        schoolRoll = PW.module.schoolRoll;
    function schoolRoll(param){
        new schoolRoll(param);
    }

    return schoolRoll;
},{
    requires:['module/schoolRoll']
});
/*---------------------------------suggest------------------------------------*/
KISSY.add('alterInfo/suggest',function(S){
    var
        suggest = PW.module.suggest;
    function suggest(param){
        new suggest(param);
    }

    return suggest;
},{
    requires:['module/suggest']
});
/*---------------------------------linkage------------------------------------*/
KISSY.add('alterInfo/linkage',function(S){
    var
        linkage = PW.module.linkage;
    function linkage(param){
        new linkage(param);
    }

    return linkage;
},{
    requires:['module/linkage']
});
/*-----------------------------保存及放大图片-------------------------------*/
KISSY.add('alterInfo/save', function(S){
    var
        $ = S.all, on = S.Event.on, DOM = S.DOM,
        el = {
            save: '.J_save',//保存
            pop_pic: '.J_pop_pic', //放大图片背景
            thumbnail:'.J_thumbnail',//缩略图
            shut: '.J_shut',//关闭按钮
        };
    function save(){
        this.init();
    }
    S.augment(save, {
        init: function(){
            this._addEventListener();
        },
        _addEventListener: function(){
            var 
                that = this;
            // 保存
            $(el.save).on('click', function(ev) {
                document.student_alter_form.submit();
            });
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
    return save;
},{
    requires: ['core']
})
