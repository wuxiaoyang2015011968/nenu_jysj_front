/*-----------------------------------------------------------------------------
* @Description:     填写学籍信息页面相关js
* @Version:         1.0.0
* @author:          zhangmeiyun
* @date             2016.7.15
* ==NOTES:=============================================
* v1.0.0(2016.7.15):
     初始生成
* ---------------------------------------------------------------------------*/
/*给它制造命名空间，专门存放各个页面js,被主页面调用*/
KISSY.add('page/admin_page/students_management/officeInfo' , function(S, showOfficeInfo){
    PW.namespace('page.admin_page.students_management.officeInfo');
    PW.page.admin_page.students_management.officeInfo = function(param){
        new showOfficeInfo(param);
    }
},{
    requires:['officeInfo/showOfficeInfo']
});
/*---------------------------------------------------------------------------*/

/*开始改页面模块的js内容*/
KISSY.add('officeInfo/showOfficeInfo',function(S){
    var 
        $ = S.all, 
        on = S.Event.on, //绑定静态节点
        DOM = S.DOM, 
        query = DOM.query,
                         
        // officeInfoIO = PW.io.admin_page.students_management.officeInfo, //定义一个IO层入口
        
        Dialog = PW.mod.Dialog,
        Calendar = PW.mod.Calendar,
        Defender = PW.mod.Defender,         //定义要使用的组件
        
        el = {
            J_form: '.J_complete-form',//需要验证的表单
            J_submit: '.submit-complete-form',//提交按钮
        };

        function showOfficeInfo(){
            this.init();
        }
        S.augment(showOfficeInfo, {
            init: function() {
                this._addEventListener();
                this.valid = Defender.client(el.J_form , {  //表单验证必须加
                    showTip:false
                });
            },

            _addEventListener: function(){
                var 
                that = this;
                that._verify(); 
                that._addCalendar();   
               // 这里写接受监听的代码
            },
            /*添加日历*/
            _addCalendar:function(){
                S.each($(".J_date"),function(i){
                    Calendar.client({
                        renderTo: i, //默认只获取第一个
                        select: {
                            rangeSelect: false, //是否允许区间选择
                            popup:true,
                            triggerType:['click'],
                            dateFmt: 'YYYY-MM-DD',
                            showTime: false ,//是否显示时间
                            closable:true
                        }
                    });
                });
            },
            /****************** 表单验证  ******************/
            _verify: function() {
                $(el.J_submit).on("click",function(){
                    var yes = $("input['name=yes_no'][checked]").val();
                    if(yes==0){
                        if(!(/^[0-9]{12}$/.test($(".reportNum").val()))&&($(".reportNum").val().length!=0)){
                            $(".J_reportNum").show();
                            $(".reportNum").val("");
                        }
                    }
                });
            },
        });
    return showOfficeInfo;
    
},{
    requires:['event', 'mod/calendar', 'sizzle' , 'mod/defender' ,'mod/dialog', 'io/admin_page/students_management/officeInfo']
});


  