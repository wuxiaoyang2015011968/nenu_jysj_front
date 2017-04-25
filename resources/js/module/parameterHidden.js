/*-----------------------------------------------------------------------------
* @DescriSion:  信息详情相关js
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('module/parameterHidden',function(S,parameterHidden){
	PW.namespace('module.parameterHidden');
	PW.module.parameterHidden = function(){
		new parameterHidden();
	}
},{
	requires:['parameterHidden/parameterHidden']
})

/*-------------------传隐藏表单的值------------------------------------------------*/
KISSY.add('parameterHidden/parameterHidden',function(S){
	var 
		$ = S.all ,
		on = S.Event.on ,
		parameterHiddenIO = PW.io.module.parameterHidden,
		that = this,
		el = {
			J_next_student : '.next-student'
		},
		myvar = {
			
		}; 

	function parameterHidden(){
		this.init();
	}
	S.augment(parameterHidden , {
		init:function(){
			this._addEventListener();
		},
		_addEventListener:function(){
				var that = this;
				// $(el.J_next_student).on("click" , function(ev){
				// 	var
				// 		para = S.io.serialize(".parameter-hidden");
				// 		parameterHiddenIO.parameterHidden(para,function(code,data,msg){
				// 			if(code == 0){
                //
				// 			};
				// 			if(code == 1){
				//
				// 			};
				// 		});
				// });
	            var parameter = $(".parameter").attr("value");
	            if (parameter=="0") {
	            	$(".next-student").hide();
	            }else{
	            	$(".next-student").show();
	            };
		}	
	});
	return parameterHidden;
},{
	requires:['event','io/module/parameterHidden']
})

