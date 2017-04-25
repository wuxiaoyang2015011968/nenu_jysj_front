/*-----------------------------------------------------------------------------
* @Description:     填写学籍信息页面相关js
* @Version:         1.0.0
* @author:          qiyuan
* @date             2016.7.14
* ==NOTES:=============================================
* v1.0.0(2016.7.14):
     初始生成
* ---------------------------------------------------------------------------*/
/*给它制造命名空间，专门存放各个页面js,被主页面调用*/
KISSY.add('page/student_page/school_roll/writeInfo' , function(S, schoolRoll, suggest, linkage, save){
    PW.namespace('page.student_page.school_roll.writeInfo');
    PW.page.student_page.school_roll.writeInfo = function(param){
        new schoolRoll(param);
        new suggest(param);
        new linkage(param);
        new save(param);
    }
},{
    requires:['writeInfo/suggest', 'writeInfo/schoolRoll', 'writeInfo/linkage', 'writeInfo/save']
});
/*---------------------------------------------------------------------------*/
/*开始改页面模块的js内容*/
KISSY.add('writeInfo/schoolRoll' , function(S){
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
KISSY.add('writeInfo/suggest',function(S){
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
KISSY.add('writeInfo/linkage',function(S){
    var
        linkage = PW.module.linkage;
    function linkage(param){
        new linkage(param);
    }

    return linkage;
},{
    requires:['module/linkage']
});
/*-----------------------------保存-------------------------------*/
KISSY.add('writeInfo/save', function(S){
    var
        $ = S.all, on = S.Event.on, DOM = S.DOM,
        el = {
            save: '.J_save'//保存 
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
                document.write_form.submit();
            });
        },
    });
    return save;
},{
    requires: ['core']
})
