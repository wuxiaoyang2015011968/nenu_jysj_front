/*-----------------------------------------------------------------------------
* @DescriSion:  信息详情相关js
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('page/admin_page/students_management/school_roll/detail',function(S,detail){
	PW.namespace('page.admin_page.students_management.school_roll.detail');
	PW.page.admin_page.students_management.school_roll.detail = function(){
		new detail();
	}
},{
	requires:['detail/detail']
})

/*---------------------------------审核弹出部分----------------------------------------*/
KISSY.add('detail/detail',function(S){
	var 
		$ = S.all ,
		on = S.Event.on ,
		Dialog = PW.mod.Dialog,
		that = this,
		DetailIO = PW.io.admin_page.students_management.school_roll.detail,
		el = {
			J_show_material : '.show-material',
			J_check_other : '.check-other',
			J_check_reason : '.check-reason',
			J_check_state : '.check-state',
			J_check_other_input : '.check-other-input',
			J_save_submit : '.save-submit',
			J_pop_check : '.pop-check',
			J_pop_close : '.pop-close',
			J_edit_result : '.edit-result',
			J_show : '.show',
			J_check : '.check',
			J_back : '.back',
			J_new_protocol : '.new-protocol',
			J_new_protocol_tip : '.new-protocol-tip',
			J_school_check : '.school_check'

		},
		myvar = {
			protocolFalseTip : '协议编号必须为数字，字数为1到20位之间',
			submitSucTip : '审核提交成功',
			submitFailTip : '审核提交失败',
			agreementNumFalseTip : '协议编号已存在，请输入一个新协议编号'
		}; 

	function detail(){

		this.init();
	}

	S.augment(detail , {
		init:function(){
			this._addEventListener();
		},

		_addEventListener:function(){
				var that = this;
				var		
					isChooseFit = true,//审核理由的下拉列表不是未选择则为true
					isOtherFit = true;//审核理由的下拉列表选“其他”的话，弹出的输入框输入不为空则为true
				//以下几个变量是审核表单共有的，所以要放在全局
				var	state_input = $(".check-state input");//审核状态的通过和不通过选项
				var option = $(".check-reason option"),
					option_innerText_other = '其他',
					option_innerText_choose = '请选择';
				//点击审核状态,如果通过，则下拉框只有通过的项可选
				$(".check-state input[value=2]").on("click",function(ev){
					$(".yes").removeAttr("disabled");
					$(".not").attr("disabled","disabled");
					//默认的当前下拉框选项是“请选择”
    					option[0].selected=true;	
    					$(el.J_check_other_input).attr("disabled","disabled");	
	            		$(el.J_check_other_input).hide();
					
				});
				//点击审核状态，如果不通过，则下拉框只有不通过的项可选
				$(".check-state input[value=3]").on("click",function(ev){
					$(".yes").attr("disabled","disabled");
					$(".not").removeAttr("disabled");
					//默认的当前下拉框选项是“请选择”
    					option[0].selected=true;	
    					$(el.J_check_other_input).attr("disabled","disabled");	
	            		$(el.J_check_other_input).hide();
				});
				//审核表单的下拉框，选择其他的时候再多加一个input输入框
				$(".check-reason").on("click",function(ev){
				    var options=$(".check-reason option:selected");
					if (options.text() == option_innerText_other) {
        				$(el.J_check_other_input).show();

        				$(el.J_check_other_input).val("");
        				$(el.J_check_other_input).removeAttr("disabled");
					}else{
        				$(el.J_check_other_input).hide();
        				$(el.J_check_other_input).attr("disabled","disabled");
        				isOtherFit = true;//当其他的输入框为隐藏的时候
					};
				});
				//点击确认修改后审核表单的各种Dialog提示，包括验证审核理由和新协议编号
				$(el.J_save_submit).on("click",function(ev){
					ev.preventDefault();//阻止表单提交按钮的默认行为，验证成功后ajax序列化表单后提交
					//审核理由的验证
					var
						other_val = $(el.J_check_other_input).val();
						option_innerText = option.text();
					for(var i=0;i<option.length;i++){
    					if(option[i].selected==true){
        					if(option[i].text == option_innerText_choose){
								Dialog.alert("审核理由未选");
								isChooseFit = false;
							}else{
								isChooseFit = true;
							};
							if(option[i].text == option_innerText_other){
								if(other_val.length == 0){
									Dialog.alert("审核理由未填");
									isOtherFit = false;
								}else{
									isOtherFit = true;
								};
							};
    					};
					};
					//如果审核理由验证成功的话，序列化表单提交
					if(isChooseFit&&isOtherFit){
						var marked =  $('input[name=checkLevel]' , el.J_check).val();//取审核表单中隐藏的当前点击行的级别名称，这是判断要把修改后的审核结果写入哪一行的关键
						var	status ;
						for(var i=0;i<state_input.length;i++){
	        				if(state_input[i].checked==true){
	        					if (state_input[i].value == 2){
		            				status = '通过';
	        					}
	        					else if (state_input[i].value == 3) {
	        						status = '不通过';
	        					};
	        				};	
    					};
    					var	reason ;//操作之后的新理由
    					for(var i=0;i<option.length;i++){
	    					if(option[i].selected==true){
	        					reason = option[i].text;
	        					if (reason == option_innerText_other) {
	        						reason = other_val;
	        					};
	    					};
						};
						//获取当前时间，格式“yyyy-MM-dd HH:MM:SS”
						var date = new Date();
					    var seperator1 = "-";
					    var seperator2 = ":";
					    var month = date.getMonth() + 1;
					    var strDate = date.getDate();
					    var strMin = date.getMinutes();
					    var strSec = date.getSeconds();
					    if (month >= 1 && month <= 9) {
					        month = "0" + month;
					    }
					    if (strDate >= 0 && strDate <= 9) {
					        strDate = "0" + strDate;
					    }
					    if (strMin >= 0 && strMin <= 9) {
					        strMin = "0" + strMin;
					    }
					    if (strSec >= 0 && strSec <= 9) {
					        strSec = "0" + strSec;
					    }
					    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
					            + " " + date.getHours() + seperator2 + strMin
					            + seperator2 + strSec;//当前的修改时间
					    var	operator = $(".user-info strong").text();//为当前的登录名，即为操作者
    					$(".show tr[id= "+marked+"] > td:nth-child(2)").text(status);//改结果
    					$(".show tr[id= "+marked+"] > td:nth-child(3)").text(reason);//改原因
    					$(".show tr[id= "+marked+"] > td:nth-child(4)").text(currentdate);//改时间
    					$(".show tr[id= "+marked+"] > td:nth-child(5)").text(operator);//改操作者
						var
							para = S.io.serialize(".check");
						DetailIO.DetailCheck(para,function(code,data,msg){
							if(code == 0){
								Dialog.alert(myvar.submitSucTip);
							}else{
								Dialog.alert(myvar.submitFailTip);
							};
						});
						$(el.J_pop_check).hide();
					};
				});			
				//修改结果弹出层显示
				$('input' , el.J_edit_result).on("click",function(ev){
					$(el.J_pop_check).show();		
					$('input[name=checkLevel]' , el.J_check).val($(this).attr("check-level"));//这是在审核表单中隐藏的区域，用来装当前点击行的级别名称
	    			//设置当点击修改结果按钮的时候，弹出审核状态都默认都通过，下拉框都默认为请选择
	    			
    				state_input[0].checked=true;
					$(".yes").removeAttr("disabled");
					$(".not").attr("disabled","disabled");	
    			
					option[0].selected=true;	
					$(el.J_check_other_input).attr("disabled","disabled");	
            		$(el.J_check_other_input).hide();
					
	    		});
				//修改结果弹出层关闭
				$(el.J_back).on("click" , function(ev){
					$(el.J_pop_check).hide();
				});
		}	
	});
	return detail;
},{
	requires:['event','io/admin_page/students_management/school_roll/detail','mod/dialog']
})
