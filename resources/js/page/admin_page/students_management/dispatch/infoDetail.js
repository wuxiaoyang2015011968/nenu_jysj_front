/*-----------------------------------------------------------------------------
* @DescriSion:  派遣信息详情相关js
* @Version: 	V1.0.0
* @author: 		liaoyueyun
* @date			2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('page/admin_page/students_management/dispatch/infoDetail',function(S,detail,popPic,parameterHidden){
	PW.namespace('page.admin_page.students_management.dispatch.infoDetail');
	PW.page.admin_page.students_management.dispatch.infoDetail = function(){
		new detail();
		new popPic();
		new parameterHidden();
	}
},{
	requires:['infoDetail/detail','infoDetail/popPic','infoDetail/parameterHidden']
})
/*---------------------------------------------------------------------------*/
/*详情的弹出审核框、放大图片、传送隐藏参数部分*/
KISSY.add('infoDetail/detail' , function(S){
    var
        detail = PW.page.admin_page.students_management.dispatch.detail;
    function detail(){
        new detail();
    }

    return detail;
},{
    requires:['page/admin_page/students_management/dispatch/detail']
});
/*---------------------------------------------------------------------------*/
/*放大图片部分*/
KISSY.add('infoDetail/popPic' , function(S){
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
/*---------------------------------------------------------------------------*/
/*传隐藏表单的值*/
KISSY.add('infoDetail/parameterHidden' , function(S){
    var
        parameterHidden = PW.module.parameterHidden;
    function parameterHidden(){
        new parameterHidden();
    }
    return parameterHidden;
},{
    requires:['module/parameterHidden']
});