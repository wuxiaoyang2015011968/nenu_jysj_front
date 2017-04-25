/*-----------------------------------------------------------------------------
* @Description:     suggest相关js
* @Version:         1.0.0
* @author:          qiyuan(632546952@qq.com)
* @date             2016.7.22
* ==NOTES:=============================================
* v1.0.0(2016.7.22):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('module/suggest',function(S,core){
	PW.namespace('module.suggest');
	PW.module.suggest = function(param){
		new core(param);
	};
},{
	requires:['suggest/core']
});

/*----------------------------------suggest-----------------------------------*/
KISSY.add('suggest/core',function(S){
	var
		$ = S.all, on = S.Event.on, delegate = S.Event.delegate,
		AreaIO = PW.io.module.getArea,
	el = {
		unitAreaHolder: '#J_unitAreaHolder',//指向委培单位地址
		areaFidle_unit: '#J_areaFidle_unit',//指向sugget的列表
		localAreaHolder: '#J_localAreaHolder',//指向生源地地址
		areaFidle_local: '#J_areaFidle_local',//指向sugget的列表
		J_area_id_unit: '.area-id-unit',
		J_area_id_local: '.area-id-local',
		local_code: '.J_local_code',//生源地地区代码
		unit_code: '.J_unit_code',//委培单位地区代码
		areaHolder: '.J_areaHolder',
	};

	function core(param){
		this.opts = param;
		this.init();
	}
	S.augment(core,{
		init:function(){
			this._addEventListener();
			this._getArea();
		},
		_addEventListener:function(){
			var
				that = this;

			/*当输入委培单位地址时*/
			on(el.unitAreaHolder,'input propertychange',function(evt){
				var
					target = evt.target,
					val = $(target).val(),
					holder = $(target).next(el.areaFidle_unit);
				if(val == ''){
					that._hideAreaFidle(holder);
				}else{
					that._showAreaFidle(holder,val);
				}
			});
			// 必须匹配到
			on(el.areaHolder,'input propertychange',function(evt){
				var
					target = evt.target,
					areaInfo = that.areaInfo,
					val = $(target).val();
				for(var i=0;i<areaInfo.length;i++){

					if(val==areaInfo[i].cnName){
						$(target).next("p").hide().text('');
					}else{
						$(target).next("p").show().text('请从列表选择正确的地址');
					}
				}
			});
			on(el.areaHolder,'blur',function(evt){
				var
					target = evt.target,
					val = $(target).val();
				if($(target).next("p").text()!=''){
					$(target).parent().next().children("input").val('');
				}
			});
			/*点击其他地方*/
			on('body','click',function(){
				that._hideAreaFidle(".areaFidle");
			});
			//当输入生源地地址时
			delegate(document,'input propertychange',el.localAreaHolder,function(evt){
				var
					target = evt.target,
					val = $(target).val(),
					holder = $(target).next(el.areaFidle_local);
				if(val == ''){
					that._hideAreaFidle(holder);
				}else{
					that._showAreaFidle(holder,val);
				}
			});
		},
		/*隐藏suggest的列表*/
		_hideAreaFidle:function(target){
			$(target).hide();
		},
		/*显示suggest的列表*/
		_showAreaFidle:function(target,val){
			var
				that = this;
			that._addArea(target,val);
			$(target).show();
		},
		/*把符合输入的地址显示在suggest的列表中*/
		_addArea:function(holder,val){

			var
				that = this,
				areaInfo = that.areaInfo,
				liHtml = '',
				areas;
			S.each(areaInfo,function(i,o){
				if(that._suggest(val,i)){
					liHtml = liHtml+'<li id="'+i.id+'" areacode="'+i.areacode+'" >'+i.cnName+'</li>';
				}
			});
			$(holder).html(liHtml);
			areas = $('li',holder);
			/*点击地址名称*/
			on(areas,'click',function(evt){
				// 关联地区代码
				var
					areacode = $(this).attr("areacode");
				$(this).parent().parent().next().children("input").val(areacode);
				$(this).parent().next("p").hide().text('');
				that._showSelectArea(evt.target);
			});
		},

		/*正则匹配*/
		_suggest:function(val,data){
			var
				regexp = RegExp(val,"i");
			if(regexp.test(data.cnName) || regexp.test(data.enName)){
				return true;
			}else{
				return false;
			}
		},

		/*把用户选择的地址显示到输入框中*/
		_showSelectArea:function(target){
			var
				that = this,
				area = $(target).html(),
				// areaId = $(target).attr('id'),
				parent = $(target).parent();
			//$(parent).prev(el.companyHolder).val(company);
			if($(parent).prev().prev().hasClass(el.J_area_id_unit)){
				$(parent).prev().val(area);
				// $(parent).prev().prev().val(areaId);
			}
			else if($(parent).prev().prev().hasClass(el.J_area_id_local)){
				$(parent).prev().val(area);
				// $(parent).prev().prev().val(areaId);
			}
			// else{
			// 	$(parent).prev().val(area);
			// }
			that._hideAreaFidle(parent);
		},
		/*获取系统中的地址*/
		_getArea:function(){
			var
				that = this;
			AreaIO.getArea({},function(rs,data,errorMes){
				if(rs){
					that.areaInfo = data;
				}else{
					S.log(errorMes);
				}
			});
		}
	});
	return core;
},{
	requires:['core','io/module/getArea']
});