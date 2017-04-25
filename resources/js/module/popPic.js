/*-----------------------------------------------------------------------------
* @DescriSion:  信息详情相关js
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('module/popPic',function(S,popPic){
	PW.namespace('module.popPic');
	PW.module.popPic = function(){
		new popPic();
	}
},{
	requires:['popPic/popPic']
})

/*---------------------------------图片弹出层---------------------------------------*/
KISSY.add('popPic/popPic',function(S){
	var 
		$ = S.all ,
		on = S.Event.on ,
		that = this,
		el = {
			J_material_pic : '.material-pic',
			J_pop_pic : '.pop-pic'
		},
		myvar = {
			
		}; 

	function popPic(){

		this.init();
	}

	S.augment(popPic , {
		init:function(){
			this._addEventListener();
		},

		_addEventListener:function(){
				var that = this;
				//图片弹出层显示
				var picLength = $(".material-pic >li").length;
				if (picLength == 0) {
					var noPic = $("<span class='noPic'>无材料</span>");
					var add = $(".material strong");
						noPic.insertAfter(add);
				}else{
						$('img' , el.J_material_pic).on("click",function(ev){
						var src = this.src;
						$('img' , el.J_pop_pic).attr("src",src);
						$(el.J_pop_pic).show();
						});
						//图片弹出层关闭
						$('a' , el.J_pop_pic).on("click" , function(ev){
							$(el.J_pop_pic).hide();
						});
				};
				
		}	
	});
	return popPic;
},{
	requires:['event']
})

