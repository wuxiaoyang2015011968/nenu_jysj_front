KISSY.add('page/student_page/login/stuLogin',function(S,login){
	PW.namespace('page.student_page.login.stuLogin');
	PW.page.student_page.login.stuLogin = function(){
		new login();
	}
},{
	requires:['stuLogin/login']
})
/*---------------------------------修改密码----------------------------------------*/
KISSY.add('stuLogin/login',function(S){
	var
		$ = S.all,
		on = S.Event.on,
		Dialog = PW.mod.Dialog,
		stuLoginIO = PW.io.student_page.login.stuLogin,
		el = {
			J_usename : '.J_usename',
			J_password : '.J_password',
			J_submit : '.J_submit',
			J_username_tip : '.J_username_tip',
			J_password_tip : '.J_password_tip'
		},
		myvar = {
			checkAccountTip:'输入账号不一致',
			accountLenTip:'学号长度为10位',
			passwordLenTip:'密码长度不能小于8位',
			accountRegisteredTip:'输入账号与原账号一致',
			passwordNullTip:'密码不能为空',
			nullTip:'输入不能为空',
			notSameTip : '输入密码与原密码不一致',
			sameTip : '输入密码与原密码一致'
		};
  	function login(){
		this._init();
	}

	S.augment(login,{
		_init:function(){
			this._addEventListener();
		},

		_addEventListener:function(){
			var 
				that = this,
				isFromat = true,
				isPasswordFit = true,
				isNameFit = true,
				isAccountFit = true,
				isCheckFit = true,
				numReg = /^\d[10]+$/;
				// 验证n位的数字  ：^\d{n}$
				// 验证至少n位的数字：^\d{n,}$
				// 验证密码：^[a-zA-z]\w{5,17}$
			$('input' , el.J_usename).on('change',function(ev){
				var 
					username = $('input' , el.J_usename).val(),
					para = "username="+$('input' , el.J_usename).val();
					stuLoginIO.isModifySuc(para,function(code,data,msg){
						console.log(code);		
					if(code == 0){
						isAccountFit = true;
						$(el.J_username_tip).text(myvar.accountRegisteredTip);
					}
					if(code == 1){
						isAccountFit = false;
						$(el.J_username_tip).text(myvar.accountLenTip);
					}
				})	
			});

			$('input',el.J_usename).on('change',function(ev){
				var        
					usenameVal = $('input',el.J_usename).val();
					// passwordVal = $('input',el.J_password).val(),
					numReg = /^\d[10]+$/;
				if(usenameVal.length < 10){
					isAccountFit = false;
					$(el.J_username_tip).text(myvar.accountLenTip);
				}
				if(usenameVal.length == 10){
					isCheckFit = true;
					$(el.J_username_tip).text('');
				}
			});

			$('input',el.J_password).on('change',function(ev){
				var
					passReg = /^\d[n,]$/,
					passwordVal = $('input',el.J_password).val();
				if(passwordVal.length < 8){
					isCheckFit = false;
					$(el.J_password_tip).text(myvar.passwordLenTip);
				}
				else{
					isNameFit = true;
					isPasswordFit = true;
					$(el.J_password_tip).text('');
				}
			});

			$('input',el.J_usename).on('click',function(ev){
				$(el.J_username_tip).text('');
			});

			$('input',el.J_password).on('click',function(ev){
				$(el.J_password_tip).text('');
			});

			$(el.J_submit).on('click',function(ev){
				ev.preventDefault();
				var
					usenameVal = $('input', el.J_usename).val(),
					passwordVal = $('input',el.J_password).val();
				if(usenameVal.length == 0){
					isPasswordFit = false;
					$(el.J_username_tip).text(myvar.accountLenTip);
				}

				if(passwordVal.length == 0){
					isCheckFit = false;
					$(el.J_password_tip).text(myvar.passwordLenTip);
				}
				console.log(isCheckFit);
				console.log(isNameFit);
				console.log(isPasswordFit);
				console.log(isAccountFit);

				if(isCheckFit && isNameFit && isPasswordFit && isAccountFit){
					console.log(1);
					var	
						para = S.io.serialize(".check_password");
					console.log(para);
					stuLoginIO.isNewPassword(para,function(code,data,msg){
						if(code == 0){
							Dialog.alert(myvar.modifySuc);
						}
						if(code == 1){
							Dialog.alert(myvar.modifyFail);
						}
					})
				}
			});
		},
		_isStuID:function(account){
			var 
				length = account.length;
				if(length == 10)
					return true;
				else 
					return false;
		}
	});
	return login;
},{
	requires:['event','sizzle','mod/dialog','io/student_page/login/stuLogin']
})			
