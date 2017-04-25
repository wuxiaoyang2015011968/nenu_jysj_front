/*-----------------------------------------------------------------------------
* @DescriSion: 协议详情相关js
* @Version:     V1.0.0
* @author:      liaoyueyun
* @date         2016.07.10
* ==NOTES:=============================================
* v1.0.0(2016.07.10):
*   初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('page/student_page/school_roll/infoDetail',function(S,popPic){
    PW.namespace('page.student_page.school_roll.infoDetail');
    PW.page.student_page.school_roll.infoDetail = function(){
        
        new popPic();
       
    }
},{
    requires:['infoDetail/popPic']
})

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
