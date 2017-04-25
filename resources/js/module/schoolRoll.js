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
KISSY.add('module/schoolRoll' , function(S, core){
    PW.namespace('module.schoolRoll');
    PW.module.schoolRoll = function(param){
        new core(param);
    }
},{
    requires:['schoolRoll/core']
});
/*---------------------------------------------------------------------------*/
/*开始改页面模块的js内容*/
KISSY.add('schoolRoll/core' , function(S){
    var 
        $ = S.all, 
        on = S.Event.on, //绑定静态节点

        Calendar = PW.mod.Calendar,
        // Defender = PW.mod.Defender,         //定义要使用的组件
        
        el = {
            hint: '.J_hint',// 提示
            change: '.J_change',//提示框
            close: '.J_close',//关闭按钮
            msg: '.J_msg',//提示信息
            common_hint: '.J_common_hint',//学号、身份证号提示
            num_hint: '.J_num_hint',//考生号提示
            kind_hint: '.J_kind_hint',//师范生类别提示
            local_hint: '.J_local_hint',//生源所在地提示
            train_hint: '.J_train_hint',//培养方式提示
            unit_hint: '.J_unit_hint',//委培单位提示
            phone_hint: '.J_phone_hint',//家庭电话提示
            majorName: '.J_majorName',//专业名称
            msg_box: '.J_msg_box',
            doc_hint: '.J_doc_hint',
            hint1: '.J_hint1',
            hint2: '.J_hint2',
            notNull: '.J_notNull',//需要验空的文本框
            notOption: '.J_notOption',//需要验空的下拉框
            // J_form: '.J_complete-form',//需要验证的表单
            J_submit: '.submit-complete-form',//提交按钮
            orientation: ".J_orientation",//只有定向或委培时显示
        };

        function core(param){
            this.opts = S.merge(el,param);
            this.init();
        }
        S.augment(core, {
            init: function() {
                this._addEventListener();
            },
            _addEventListener: function(){
                var 
                    that = this;
                    opts = that.opts;

                that._hintMsg();
                that._trainWay();
                that._showOtherMajor();
                that._verify(); 
                that._addCalendar();

            },
            /*添加日历*/
            _addCalendar:function(){
                S.each($(".J_date"),function(i){
                    Calendar.client({
                        renderTo: i, //默认只获取第一个
                        select: {
                            rangeSelect: false, //是否允许区间选择
                            dateFmt: 'YYYY-MM-DD',
                            showTime: false ,//是否显示时间
                        }
                    });
                });
            },
            /****************** 提示信息  ******************/
            _hintMsg:function(){
                $(el.hint).on('click', function(ev) {
                    $(el.change).show();
                    $(".scene").show();
                });
                $(el.close).on('click', function(ev) {
                    $(el.change).hide();
                    $(".scene").hide();
                    $(el.msg).text('')
                    $(el.doc_hint).text('');
                    $(el.hint1).text('');
                    $(el.hint2).text('');
                });
                $(el.common_hint).on('click', function(ev) {
                    $(el.msg).text('如果有错误，请联系辅导员修改。');
                    $(el.msg_box).css("padding","90px 103px");;
                });
                $(el.num_hint).on('click', function(ev) {
                    $(el.msg).text('学信网可查，即高考报考的考生号。如果系统已经填写并且有错误，请联系辅导员修改。');
                    $(el.msg_box).css("padding","80px 33px");
                });
                $(el.kind_hint).on('click', function(ev) {
                    $(el.msg).text('如此项有错误请联系辅导员，本人需将相关证明材料交给辅导员，由辅导员拍照并将材料照片上传至系统然后修改信息。')
                    $(el.doc_hint).text('材料说明：');
                    $(el.hint1).text('普通师范生或非师范生改成公费师范生，证明材料为免师协议有签约双方名称及签章页。');
                    $(el.hint2).text('公费师范生改成普通师范生或非师范生，证明材料为学院的相关证明（需要学院盖章）。');
                    $(el.msg_box).css("padding","30px 23px");
                });
                $(el.local_hint).on('click', function(ev) {
                    $(el.msg).text('生源地为高考前户口所在地。如此项有错误请联系辅导员，本人需将相关证明材料交给辅导员，由辅导员拍照并将材料照片上传至系统然后修改信息。')
                    $(el.doc_hint).text('材料说明：');
                    $(el.hint1).text('证明材料为户口本本人所在页，免费师范生还需要免师协议签约单位页及签章页。');
                    $(el.hint2).text('');
                    $(el.msg_box).css("padding","40px 23px");
                });
                $(el.train_hint).on('click', function(ev) {
                    $(el.msg).text('如此项有错误请联系辅导员，本人需将相关证明材料交给辅导员，由辅导员拍照并将材料照片上传至系统然后修改信息。')
                    $(el.doc_hint).text('材料说明：');
                    $(el.hint1).text('定向或委培改为非定向或自筹，证明材料为档案馆提供的招生大表；');
                    $(el.hint2).text('非定向或自筹改为定向或委培，证明材料为定向或委培协议照片。');
                    $(el.msg_box).css("padding","40px 23px");
                });
                $(el.unit_hint).on('click', function(ev) {
                    $(el.msg).text('如此项有错误请联系辅导员，本人需将相关证明材料交给辅导员，由辅导员拍照并将材料照片上传至系统然后修改信息。')
                    $(el.doc_hint).text('材料说明：');
                    $(el.hint1).text('非定向或自筹改成定向或委培，证明材料为定向或委培协议有签约双方名称及签章页。');
                    $(el.hint2).text('定向或委培改成或非定向或自筹，证明材料为学院的相关证明。');
                    $(el.msg_box).css("padding","40px 23px");
                });
                $(el.phone_hint).on('click', function(ev) {
                    $(el.msg).text('如果没有，可填父母联系方式')
                    $(el.msg_box).css("padding","94px 103px");
                });
            },
            /*****************************显示其他专业****************************/
           
            _showOtherMajor:function(){
                $(el.majorName).on('change',function(ev){
                    var optVal;
                    optVal = $('.J_majorName option:selected').text();
                    // console.log(optVal);
                    if(optVal == '其他'){
                        $(".other-major").show().children("input").removeAttr("disabled").addClass("J_notNull");
                    }else{
                        $(".other-major").hide().children("input").attr("disabled", "true").removeClass("J_notNull");
                    }
                });
                /***************返回修改时如果选择其他显示填写框******************/
                S.ready(function(){   
                    var optVal;
                    optVal = $('.J_majorName option:selected').val();
                    if(optVal == '000000'){
                        $(".other-major").show().children("input").removeAttr("disabled");
                    }else{
                        $(".other-major").hide().children("input").attr("disabled", "true");
                    }
                });
            },
            /*************************初始判断培养方式*****************************/
            _trainWay:function(){
                S.ready(function(){
                    if($(".train-way").text() == "定向" || $(".train-way").text() == "委培"){
                        $(el.orientation).show();
                        $("#J_unitAreaHolder").removeAttr("disabled").addClass("J_notNull");
                    }else{
                        $(el.orientation).hide();
                        $("#J_unitAreaHolder").attr("disabled", "true").removeClass("J_notNull");
                    }
                });
            },
            /****************** 表单验证  ******************/
            _verify: function() {
                $(el.J_submit).on("click", function(event){
                    var 
                        flag1,flag2;
                    $(el.notOption).each(function(){
                        selectVal=$(this).children('option:selected').val();
                        if(selectVal==-1){
                            flag1=true;
                            $(this).css("border","1px solid #d15b47");
                        }else{
                            $(this).css("border","1px solid #ccc");
                        }
                    });
                    $(el.notOption).on('change',function(){
                        selectVal=$(this).children('option:selected').val();
                        if(selectVal==-1){
                            $(this).css("border","1px solid #d15b47");
                        }else{
                            $(this).css("border","1px solid #ccc");
                        }
                    });
                    $(el.notNull).each(function(){
                        textVal=$(this).val();
                        if(textVal==""){
                            flag2=true;
                            $(this).css("border","1px solid #d15b47");
                        }else{
                            $(this).css("border","1px solid #ccc");
                        }
                    });
                    $(el.notNull).on('change',function(){
                        textVal=$(this).val();
                        if(textVal==""){
                            $(this).css("border","1px solid #d15b47");
                        }else{
                            $(this).css("border","1px solid #ccc");
                        }
                    });

                    //只能从列表选择地址
                    var unitTip = $(".unitTip").text();
                    if(unitTip != "") {
                        flag3 = true;
                    } else {
                        flag3 = false;
                    }
                    // 手机号码
                    if(!(/^1[3|4|5|7|8]\d{9}$/.test($(".J_phone").val())) && ($(".J_phone").val().length!=0)){
                        event.preventDefault();
                        $(".J_phone_error").show();
                        $(".J_phone").val("");
                    };
                    // QQ
                    if(!(/^[0-9]+$/.test($(".j_QQNum").val())) && ($(".j_QQNum").val().length!=0)){
                        event.preventDefault();
                        $(".J_QQNum_error").show();
                        $(".j_QQNum").val("");
                    };
                    // 邮箱
                    if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".J_email").val())) && ($(".J_phone").val().length!=0)){
                        event.preventDefault();
                        $(".J_email_error").show();
                        $(".J_email").val("");
                    };
                    // 家庭电话
                    if(!(/^((1[3|4|5|7|8]\d{9})|((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5})))$/.test($(".J_homePhone").val())) && ($(".J_homePhone").val().length!=0)){
                        event.preventDefault();
                        $(".J_homePhone_error").show();
                        $(".J_homePhone").val("");
                    };
                    // 家庭住址
                    if(!(/^[\u4E00-\u9FA5A-Za-z0-9-]+$/.test($(".J_address").val())) && ($(".J_address").val().length!=0)){
                        event.preventDefault();
                        $(".J_address_error").show();
                        $(".J_address").val("");
                    };
                    if(flag1 || flag2 || flag3 == true){
                        return false;
                    };
                });
                $(".J_name,.J_examNo,.J_id,.J_stuNum,.J_phone,.j_QQNum,.J_email,.J_homePhone,.J_homePhone,.J_address").on("click", function(event){
                    $(this).parent().children("p").hide();
                });
            },
        });
    return core;
    
},{
    requires:['event', 'mod/calendar', 'sizzle' ]
});
