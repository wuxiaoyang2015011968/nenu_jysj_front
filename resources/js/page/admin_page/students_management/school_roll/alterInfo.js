/*-----------------------------------------------------------------------------
* @Description:     管理员修改学籍信息页面相关js
* @Version:         1.0.0
* @author:          qiyuan
* @date             2016.7.14
* ==NOTES:=============================================
* v1.0.0(2016.7.14):
     初始生成
* ---------------------------------------------------------------------------*/
/*给它制造命名空间，专门存放各个页面js,被主页面调用*/
KISSY.add('page/admin_page/students_management/school_roll/alterInfo' , function(S, suggest, alter, linkage){
    PW.namespace('page.admin_page.students_management.school_roll.alterInfo');
    PW.page.admin_page.students_management.school_roll.alterInfo = function(param){
        new suggest(param);
        new linkage(param);
        new alter(param);
    }
},{
    requires:['alterInfo/suggest', 'alterInfo/alter', 'alterInfo/linkage']
});
/*---------------------------------------------------------------------------*/
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
/*-----------------------------修改-------------------------------*/
KISSY.add('alterInfo/alter', function(S){
    var
        $ = S.all, on = S.Event.on, DOM = S.DOM,
        
        Calendar = PW.mod.Calendar,//定义要使用的组件       
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
            msg_box: '.J_msg_box',
            doc_hint: '.J_doc_hint',
            hint1: '.J_hint1',
            hint2: '.J_hint2',
            majorName: '.J_majorName',//专业名称
            notNull: '.J_notNull',//需要验空的文本框
            notOption: '.J_notOption',//需要验空的下拉框
            J_submit: '.submit-complete-form',//提交按钮

            alterClass: '.J_alterClass',//修改师范生类别
            alterLocal: '.J_alterLocal',//修改生源地
            alterWay: '.J_alterWay',//修改培养方式
            alterUnit: '.J_alterUnit',//修改委培单位
            alter: '.J_alter',//修改
            save: '.J_save',//保存 
            pop_pic: '.J_pop_pic', //放大图片背景
            thumbnail:'.J_thumbnail',//缩略图
            shut: '.J_shut',//关闭按钮
            picName: ".J_pic_name",
            orientation: ".J_orientation",//只有定向或委培时显示
        };
    function alter(param){
            this.init();
        }
        S.augment(alter, {
            init: function() {
                this._alter();
                this._addEventListener();
            },
            _addEventListener: function(){
                var 
                    that = this;

                that._trainWay();
                that._showOtherMajor();
                that._verify(); 
                that._addCalendar();
                that._selectTrainWay();

                $(el.thumbnail).on('click', function(ev) {
                    $(el.pop_pic).show();
                    var imgUrl = $(this).attr("src");
                    $(el.pop_pic).children("img").attr("src",imgUrl);
                });
                $(el.shut).on('click', function(ev) {
                    $(el.pop_pic).hide();
                });
                $(el.picName).on('click', function(ev) {
                    $(this).removeAttr("readonly").css("border","1px solid #ccc");
                });
                $(el.picName).on('blur', function(ev) {
                    $(this).attr("readonly","readonly").css("border","0");
                });
                // 生源地和委培单位赋初值
                S.ready(function(){
                    var localText,
                        unitText;
                    localText = $("#J_localAreaHolder").next("span").text();
                    $("#J_localAreaHolder").val(localText);
                    unitText = $(".unit").next("span").text();
                    $(".unit").val(unitText);    
                });

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
            /*****************************显示其他专业****************************/
            _showOtherMajor:function(){
                $(el.majorName).on('change',function(ev){
                    var optVal;
                    optVal = $('.J_majorName option:selected').text();
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
                        $(".unit,#J_unitAreaHolder").removeAttr("disabled").addClass("J_notNull");
                    }else{
                        $(el.orientation).hide();
                        $(".unit,#J_unitAreaHolder").attr("disabled", "true").removeClass("J_notNull");
                    }
                });
            },
            _alter: function(){
                //修改
                $(el.alter).on('click', function(ev) {
                    $(this).hide().prev().hide();
                    $(this).prev(".clickShow").show().removeAttr("disabled");
                });

                // 修改生源地
                $(el.alterLocal).on('click', function(ev) {
                    var beforeText;
                    beforeText = $(this).prev("span").text();
                    $("#J_localAreaHolder").val(beforeText);
                });

                // 修改委培单位
                $(el.alterUnit).on('click', function(ev) {
                    var beforeText;
                    beforeText = $(this).prev("span").text();
                    $(".unit").val(beforeText);
                });

                // 修改师范生类别
                $(el.alterClass).on('click', function(ev) {
                    $(".selectClass").addClass("J_notOption");
                });

                // 修改培养方式
                $(el.alterWay).on('click', function(ev) {
                    $(".selectWay").addClass("J_notOption");
                });
            },

            /*************************当培养方式改变时*****************************/
            _selectTrainWay: function(){
                $(".selectWay").on('change',function(ev){
                    var selectVal;
                    selectVal = $('.selectWay option:selected').val();
                    if(selectVal == '2' || selectVal == '4'){
                        $(el.orientation).show();
                        $(".unit,#J_unitAreaHolder").removeAttr("disabled").addClass("J_notNull");
                    }else{
                        $(el.orientation).hide();
                        $(".unit,#J_unitAreaHolder").attr("disabled", "true").removeClass("J_notNull");
                    }
                });
            },
            /****************** 表单验证  ******************/
            _verify: function() {
                $(el.J_submit).on("click", function(event){
                    var 
                        flag1,flag2,flag3;
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
                    var localTip = $(".localTip").text(),unitTip = $(".unitTip").text();
                    if(localTip != "" || unitTip != "") {
                        flag3 = true;
                    } else {
                        flag3 = false;
                    }

                    // 姓名
                    if(!(/[\u4E00-\u9FA5]{2,4}/.test($(".J_name").val())) && ($(".J_name").val().length!=0)){
                        event.preventDefault();
                        $(".J_name_error").show();
                        $(".J_name").val("");
                    };
                    // 身份证号
                    if(!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test($(".J_id").val())) && ($(".J_id").val().length!=0)){
                        event.preventDefault();
                        $(".J_id_error").show();
                        $(".J_id").val("");
                    };
                    // 考生号
                    if(!(/^\d{10,18}$/.test($(".J_examNo").val())) && ($(".J_examNo").val().length!=0)){
                        event.preventDefault();
                        $(".J_examNo_error").show();
                        $(".J_examNo").val("");
                    };
                    // 学号
                    if(!(/^\d{9,14}$/.test($(".J_stuNum").val())) && ($(".J_stuNum").val().length!=0)){
                        event.preventDefault();
                        $(".J_stuNum_error").show();
                        $(".J_stuNum").val("");
                    };
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
    return alter;
    
},{
    requires:['event', 'mod/calendar', 'sizzle']
});