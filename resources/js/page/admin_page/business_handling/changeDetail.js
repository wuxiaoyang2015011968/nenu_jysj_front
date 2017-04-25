/*-----------------------------------------------------------------------------
* @DescriSion:  变更详情页相关的js
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('page/admin_page/business_handling/changeDetail',function(S,detail,popPic,parameterHidden){
	PW.namespace('page.admin_page.business_handling.changeDetail');
	PW.page.admin_page.business_handling.changeDetail = function(){
		new detail();
		new popPic();
		new parameterHidden();
	}
},{
	requires:['changeDetail/detail','changeDetail/popPic','changeDetail/parameterHidden']
})

/*---------------------------------审核，查看证明材料----------------------------------------*/
KISSY.add('changeDetail/detail',function(S){
	var 
		$ = S.all ,
		on = S.Event.on ,
		delegate = S.Event.delegate,
		Dialog = PW.mod.Dialog,
		that = this,
		changeDetailIO = PW.io.admin_page.business_handling.changeDetail,
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
				var that = this;
				var
					isProtocolFit = true,//协议编号满足只能是数字且位数在1到20位之间则为true
					isChooseFit = true,//审核理由的下拉列表不是未选择则为true
					isOtherFit = true;//审核理由的下拉列表选“其他”的话，弹出的输入框输入不为空则为true
				//以下几个变量是审核表单共有的，所以要放在全局
				var	state_input = $(".check-state input"),//审核状态的通过和不通过选项
					new_or_not_input = $(".new-or-not input");//是否发放新协议的是和否选项
				var option = $(".check-reason option"),
					option_innerText_other = '其他',
					option_innerText_choose = '请选择';
				var new_protocol_len = $(el.J_new_protocol).length;
				//点击审核状态，如果通过才给出现新协议编号,如果通过，则下拉框只有通过的项可选
				$(".check-state input[value=2]").on("click",function(ev){
					$(el.J_new_protocol).show();
					$(".yes").removeAttr("disabled");
					$(".not").attr("disabled","disabled");
					//默认的当前下拉框选项是“请选择”
					option[0].selected=true;	
					$(el.J_check_other_input).attr("disabled","disabled");	
            		$(el.J_check_other_input).hide();
					//通过的话，移除发放按钮和协议编号部分的disabled属性
					$(".new-protocol input[name=distributeNew]").removeAttr("disabled");
        			$(".new-protocol input[name=agreementNumber]").removeAttr("disabled").val("");
				});
				//点击审核状态，如果不通过移除新协议编号，如果不通过，则下拉框只有不通过的项可选
				$(".check-state input[value=3]").on("click",function(ev){
					$(el.J_new_protocol).hide();
					$(".yes").attr("disabled","disabled");	
					$(".not").removeAttr("disabled");
					//默认的当前下拉框选项是“请选择”
					option[0].selected=true;	
					$(el.J_check_other_input).attr("disabled","disabled");	
            		$(el.J_check_other_input).hide();
            		//不通过的话，发放按钮和协议编号部分都为disabled
        			$(".new-protocol input[name=distributeNew]").attr("disabled","disabled");
        			$(".new-protocol input[name=agreementNumber]").attr("disabled","disabled");
				});
				//点击是否发放新协议，如果是才给填写新协议编号
				$(".new-or-not input[value=2]").on("click",function(ev){
					$(".new-yes").show();
					$(el.J_new_protocol_tip).text('');

        			$(".new-protocol input[name=agreementNumber]").removeAttr("disabled");
				});
				//点击是否发放新协议，如果否移除新协议编号
				$(".new-or-not input[value=4]").on("click",function(ev){  
					$(".new-yes").hide();
        			$(".new-protocol input[name=agreementNumber]").attr ("disabled","disabled");
				});
				$('input[name=agreementNumber]' , el.J_new_protocol).on('click',function(ev){
					$(el.J_new_protocol_tip).text('');
				});
				//新协议编号的验证部分，只能是数字且位数在1到20位之间,抽取成一个函数，在input填写时调用，在表单提交时也要调用验证一遍
				// function protocolVerify(){
				// 	var new_protocol = $('input[name=agreementNumber]' , el. J_new_protocol).val(),
				// 		new_protocol_val_length = new_protocol.length;
				// 	if(!(/^[0-9]{1,20}$/.test(new_protocol)) || (new_protocol == "") || (new_protocol_val_length > 20) ){
				// 		$(el.J_new_protocol_tip).text(myvar.protocolFalseTip);
				// 		isProtocolFit = false;
				// 	}else{	
				// 		isProtocolFit = true;//如果和后台套页的时候有错，把这个注释掉看看
						
				// 		//这边是验证新协议编号是否已经存在，如果存在就要给用户一个反馈
						
				// 		var
				// 			para = 'agreementNumber='+$('input[name=agreementNumber]' , el.J_new_protocol).val();
				// 		changeDetailIO.changeDetailProtocol(para,function(code,data,msg){
				// 			if(code == 0){
				// 				isProtocolFit = true;
				// 				$(el.J_new_protocol_tip).text('');
				// 			}
				// 			if(code == 1){
				// 				isProtocolFit = false;
				// 				$(el.J_new_protocol_tip).text(myvar.agreementNumFalseTip);
				// 			};
				// 		});//IO
				// 	};//else
				// };//protocolVerify()
				$(".new-yes input[name=agreementNumber]").on("change",function(ev){  
					var new_protocol = $('input[name=agreementNumber]' , el. J_new_protocol).val(),
						new_protocol_val_length = new_protocol.length;
					if(!(/^[0-9]{1,20}$/.test(new_protocol)) || (new_protocol == "") || (new_protocol_val_length > 20) ){
						$(el.J_new_protocol_tip).text(myvar.protocolFalseTip);
						isProtocolFit = false;
					}else{	
						isProtocolFit = true;//如果和后台套页的时候有错，把这个注释掉看看					
						//这边是验证新协议编号是否已经存在，如果存在就要给用户一个反馈					
						var
							para = 'agreementNumber='+$('input[name=agreementNumber]' , el.J_new_protocol).val();
						changeDetailIO.changeDetailProtocol(para,function(code,data,msg){
							if(code == 0){
								isProtocolFit = true;
								$(el.J_new_protocol_tip).text('');
							}
							if(code == 1){
								isProtocolFit = false;
								$(el.J_new_protocol_tip).text(myvar.agreementNumFalseTip);
							};
						});//IO
					};//else
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
        				isOtherFit = true;//当不是其他，输入框为隐藏的时候
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
									changeDetailIO.changeDetailCheck(para,function(code,data,msg){
										// 只有当结果为通过而且要发放新协议编号的时候，协议编号才需要验证
										//如果审核理由和协议编号都验证成功的话，序列化表单提交
									});
									isOtherFit = true;
								};
							};
						};
					};
					if (state_input[0].checked==true&&new_or_not_input[0].checked==true) {
						var new_protocol = $('input[name=agreementNumber]' , el. J_new_protocol).val(),
						new_protocol_val_length = new_protocol.length;
						if(!(/^[0-9]{1,20}$/.test(new_protocol)) || (new_protocol == "") || (new_protocol_val_length > 20) ){
							$(el.J_new_protocol_tip).text(myvar.protocolFalseTip);
							isProtocolFit = false;
						}
					}else{
						isProtocolFit = true;
					};
					if(isProtocolFit&&isChooseFit&&isOtherFit){
						var marked =  $('b' , el.J_check).text();//取审核表单中隐藏的当前点击行的级别名称，这是判断要把修改后的审核结果写入哪一行的关键
						var	status ;
						for(var i=0;i<state_input.length;i++){
							if(state_input[i].checked==true){
								if (state_input[i].value == 2){
									status = '通过';
								}
							else if (state_input[i].value == 3) {
									status = '不通过';
									var	reason ;//操作之后的新理由
									+ seperator2 + strSec;//当前的修改时间
									var	operator = $(".user-info strong").text();//为当前的登录名，即为操作者
									$(".show tr[id= "+marked+"] > td:nth-child(2)").text(status);//改结果
									$(".show tr[id= "+marked+"] > td:nth-child(3)").text(reason);//改原因
									$(".show tr[id= "+marked+"] > td:nth-child(4)").text(currentdate);//改时间
									if(code == 0){
										Dialog.alert(myvar.submitSucTip);
									};
									if(code == 1){
										Dialog.alert(myvar.submitFailTip);
									};
								};
							};
						};
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
						$(".show tr[id= "+marked+"] > td:nth-child(5)").text(operator);//改操作者
						var
							para = S.io.serialize(".check");
						$(el.J_pop_check).hide();
					};
				});				
				//修改结果弹出层显示
				$('input' , el.J_edit_result).on("click",function(ev){
					$(el.J_pop_check).show();		
					$('b' , el.J_check).text($(this).attr("check-level"));//这是在审核表单中隐藏的区域，用来装当前点击行的级别名称
	    			//设置当点击修改结果按钮的时候，弹出审核状态都默认都通过，发放新协议选是，下拉框都默认为请选择

    				state_input[0].checked=true;
    				$(el.J_new_protocol).show();
					$(".new-protocol input[name=distributeNew]").removeAttr("disabled");

					new_or_not_input[0].checked=true;
					$(".new-yes").show();	
					$(".new-yes input[type=text]").val("");	
					$(".new-protocol input[name=agreementNumber]").removeAttr("disabled");
					$(el.J_new_protocol_tip).text('');
				
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
	requires:['event','io/admin_page/business_handling/changeDetail','mod/dialog']
})

/*---------------------------------------------------------------------------*/
/*放大图片部分*/
KISSY.add('changeDetail/popPic' , function(S){
    var
        popPic = PW.module.popPic;
    function popPic(){
        new popPic();
    }
    return popPic;
},{
    requires:['module/popPic']
});
/*---------------------------------------------------------------------------*/
/*传隐藏表单的值*/
KISSY.add('changeDetail/parameterHidden' , function(S){
    var
        parameterHidden = PW.module.parameterHidden;
    function parameterHidden(){
        new parameterHidden();
    }
    return parameterHidden;
},{
    requires:['module/parameterHidden']
});