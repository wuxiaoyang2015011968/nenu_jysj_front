/*-----------------------------------------------------------------------------
* @DescriSion: user相关js
* @Version: 	V1.0.0
* @author: 		zhangmeiyun
* @date			2016.07.14
* ==NOTES:=============================================
* v1.0.0(2016.07.14):
* 	初始生成
---------------------------
* @Version:     V1.0.1
* @author:      shihui
* @date         2017.04.07
==NOTES:=============================================
*添加linkage部分  
* ---------------------------------------------------------------------------*/
KISSY.add('page/admin_page/students_management/newStudent',function(S,addNewStudent,suggest,linkage){
	PW.namespace('page.admin_page.students_management.newStudent');
	PW.page.admin_page.students_management.newStudent = function(){
		new addNewStudent();
        new suggest();
        new linkage();
	}
},{
	requires:['newStudent/suggest','newStudent/addNewStudent','newStudent/linkage']
})

/*-----------------------------------新增学生-----------------------------*/
KISSY.add("newStudent/addNewStudent",function(S){
	var
		$ = S.all,
        on = S.Event.on, //绑定静态节点
        DOM = S.DOM,
        query = DOM.query,

		Dialog = PW.mod.Dialog,
        Defender = PW.mod.Defender,         //定义要使用的组件

		el = {
			J_newStudentForm : '.J_complete-form',//需要验证的表单
			J_newStudentSubmit : '.newStudentSubmit',//submit 提交按钮
            J_notOption : ".J_notOption",//需要验空的下拉框
            J_notNull : ".J_notNull",//验空
            J_trainingMode : ".trainingMode",//培养方式
            J_orientation : ".J_orientation"
		};

    function addNewStudent(){
        this._addEventListener();
		this.init();
	}

	S.augment(addNewStudent , {
		init:function(){
			this.valid = Defender.client(el.J_newStudentForm , {//验证表单必须有的一句话
                    showTip:false
                });
            this._addEventListener();
		},
		_addEventListener:function(){
		var
			that = this;
            that._verify();
            that._selectTrainWay();
		},
        /*************************当培养方式改变时*****************************/
        _selectTrainWay: function(){
                $(".trainingMode").on("change",function(){
                    var selectVal;
                    selectVal = $('.trainingMode option:selected').val();
                    if(selectVal == '2' || selectVal == '4'){
                      $(".J_orientation").show();
                       $("#unit,#J_unitAreaHolder").addClass("J_notNull");
                    }
                    else{
                      $(".J_orientation").hide();
                        $("#unit,#J_unitAreaHolder").removeClass("J_notNull");

                    }
                });
            },
       
          /****************** 表单验证  ******************/
        _verify: function() {

            $(el.J_newStudentSubmit).on("click", function(event){
                // 验空下拉框
                var
                    flag1,flag2;
                $(el.J_notOption).each(function(){
                   selectVal=$(this).children('option:selected').val();
                    if(selectVal==-1){
                        flag1=true;
                        $(this).css("border","1px solid #d15b47");
                    }else{
                        $(this).css("border","1px solid #ccc");
                    }
                });
                $(el.J_notOption).on('change',function(){
                    selectVal=$(this).children('option:selected').val();
                    if(selectVal==-1){
                        $(this).css("border","1px solid #d15b47");
                    }else{
                        $(this).css("border","1px solid #ccc");
                    }
                });
                $(el.J_notNull).each(function(){
                        textVal=$(this).val();
                        if(textVal==""){
                            flag2=true;
                            $(this).css("border","1px solid #d15b47");
                        }else{
                            $(this).css("border","1px solid #ccc");
                        }
                    });
                    $(el.J_notNull).on('change',function(){
                        textVal=$(this).val();
                        if(textVal==""){
                            $(this).css("border","1px solid #d15b47");
                        }else{
                            $(this).css("border","1px solid #ccc");
                        }
                    });
                // 姓名
                if(!(/^[a-zA-Z\u4e00-\u9fa5\.]+$/.test($(".stuentName").val())) && ($(".studentName").val().length!=0)){
                    $(".J_stuName").show();
                    $(".studentName").val("");
                };
                // 身份证号
                if(!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test($(".idNumber").val())) && ($(".idNumber").val().length!=0)){
                    $(".J_idNumber").show();
                    $(".idNumber").val("");
                };
                // 学号
                if(!(/^\d{9,14}$/.test($(".studentNumber").val())) && ($(".studentNumber").val().length!=0)){
                    $(".J_stuNumber").show();
                    $(".studentNumber").val("");
                };
                //考生号
                if(!(/^\d{10,18}$/.test($(".candidateNumber").val())) && ($(".candidateNumber").val().length!=0)){
                    $(".J_candidateNum").show();
                    $(".candidateNumber").val("");
                };
                if(flag1 || flag2 == true){
                    return false;
                };
            });
            $(".studentName,.idNumber,.studentNumber,.candidateNumer").on("click", function(event){
                $(this).parent().children("p").hide();
            });
        },
	});

    return addNewStudent;

},{
	   requires:['event', 'sizzle' , 'mod/defender' ,'mod/dialog','io/admin_page/students_management/newStudent']
});
/*---------------------------------suggest------------------------------------*/
KISSY.add('newStudent/suggest',function(S){
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
KISSY.add('newStudent/linkage',function(S){
    var
        linkage = PW.module.linkage;
    function linkage(param){
        new linkage(param);
    }

    return linkage;
},{
    requires:['module/linkage']
});