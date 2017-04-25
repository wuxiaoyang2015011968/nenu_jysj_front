/*-----------------------------------------------------------------------------
* @Description:     填写和修改派遣信息相关js
* @Version:         1.0.0
* @author:          chenyz(571108675@qq.com)
* @date             2016.7.16
* ==NOTES:=============================================
* v1.0.0(2016.7.16):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('module/dispatch/alterInfoShow' , function(S, core){
    PW.namespace('module.dispatch.alterInfoShow');
    PW.module.dispatch.alterInfoShow = function(param){
        new core(param);
    }
},{
    requires:['alterInfoShow/core',]
});
KISSY.add('alterInfoShow/core' , function(S){
	var
        $ = S.all,
        DOM = S.DOM,
        on = S.Event.on,
        delegate=S.Event.delegate,
        // alterInfoIO = PW.io.student_page.dispatch.alterInfo,
        // urls = PW.Env.url.student_page.dispatch.alterInfo,
        el = {
        // 选择器名称
            J_input : '.input',
            J_close : '.close',
            J_button : '.button',
            J_document : '.document',
            fileItemEl: '.file-item',
            J_hint: '.hint',
            J_graduation_hint: '.graduation-hint',
            J_unit_hint: '.unit-hint',
            J_code_hint: '.code-hint',
            J_type_hint: '.type-hint',
            J_look_hint: '.look-hint',
            J_change: '.change',
            J_close: '.close',
            J_msg: '.msg',
            J_msg_box: '.msg_box',
            J_hint1: '.hint1',
            J_hint2: '.hint2',
            J_hint3: '.hint3',
            J_hint4: '.hint4',
            J_hint5: '.hint5',
            J_certificateKind: '.certificateKind'
        }
    function alterInfoShow(param){
        this.init();
    }
    S.augment(alterInfoShow,{
        init:function(){
            this._addEventListener();
        },
        //添加事件监听器
        _addEventListener: function(){
            var
                that = this;
                that._hint();
                // that._del();
        },
        // 提示内容
        _hint:function(){
            // 提示内容
            $(el.J_hint).on('click', function(ev) {
                    $(el.J_change).show();
                    $(".scene").show();
            });
            $(el.J_close).on('click', function(ev) {
                $(el.J_change).hide();
                $(".scene").hide();
                $(el.J_msg).text('')
                $(el.J_hint1).text('');
                $(el.J_hint2).text('');
                $(el.J_hint3).text('');
                $(el.J_hint4).text('');
                $(el.J_hint5).text('');
            });
            $(el.J_graduation_hint).on('click', function(ev) {
                    $(el.J_msg).text('若为出国升造或升学，只填写单位名称和单位所在地两项，单位名称填学校名称，单位所在地填学校所在地，国外学校则地址填学校所在国国名');
                    $(el.J_msg_box).css("padding","40px 23px");
            });
            $(el.J_unit_hint).on('click', function(ev) {
                    $(el.J_msg).text('签就业协议形式就业、签劳动合同形式就业，其他录用形式就业的需填写单位全称;');
                    $(el.J_hint1).text('科研助理、国家/地方基层项目填写项目所在的单位；');
                    $(el.J_hint2).text('应征义务兵不填；自主创业填写具体创业项目；自由职业填写所从事的自由职业内容，需为具体工作单位名称；');
                    $(el.J_hint3).text('升学需填写升学的学校；出国出境需填写出国出境的国家或地区');

                    $(el.J_msg_box).css("padding","40px 23px");
             });
             $(el.J_code_hint).on('click', function(ev) {
                    $(el.J_msg).text('签就业协议形式就业、签劳动合同形式就业，其他录用形式就业的组织机构代码为必填，可询问单位或上网查找，委培生需填写委培单位的组织机构代码。其他填写无');
                    $(el.J_msg_box).css("padding","63px 23px");
             });
             $(el.J_type_hint).on('click', function(ev) {
                    $(el.J_msg).text('对于签就业协议形式就业、签劳动合同形式就业、其他录用形式就业的若选择回生源地报到，需提供用人单位同意派回原籍的证明。');
                    $(el.J_msg_box).css("padding","73px 23px");
             });
             $(el.J_look_hint).on('click', function(ev) {
                    $(el.J_msg).text('提示1：报到证迁往单位是北京、天津、上海、深圳的，需上传并提交进京、津、沪、深函。');
                    $(el.J_hint1).text('提示2： 已签约用人单位，但需派至生源地，需用人单位的同意函。');
                    $(el.J_hint2).text('提示3：派至人才交流中心，需人才交流中心接收函或协议上有接受章。');
                    $(el.J_hint3).text('提示4：免师跨省，符合国三条，需跨省材料；不符合国三条，需解约材料。');
                    $(el.J_hint4).text('提示5：所有解约情况，需解约材料。');
                    $(el.J_hint5).text('提示6：报到证迁往单位名称与接收章一致');
                    $(el.J_msg_box).css("padding","10px 23px");
             });

            //报到证发放类别
            $(el.J_certificateKind).on('change',function(ev){
                var optVal;
                optVal = $('.certificateKind option:selected').val();
                if(optVal == 6){
                    $(".jobMsg input").attr("disabled", "true");
                    $(".jobMsg .required input[type=text]").removeClass("J_notNull");
                }else if(optVal == 1){
                    $(".jobMsg .required input[type=text]").removeClass("J_notNull");
                    $(".jobMsg .required").removeClass(".required");
                }else{
                    $(".jobMsg input").removeAttr("disabled");
                    $(".jobMsg .required input[type=text]").addClass("J_notNull");
                }
            });
        }
        // // 删除图片
        // _del:function(){
        //      $(".material a").click(function(ev) {
        //             var name = $(this).siblings("img").attr("alt");
        //             alterInfoIO.delImageIO({"picname="+name} , function(rs,data,msg){
        //                 if(rs){
        //                      alert(data.result);
        //                 }
        //             })
        //      })
        // }
    });
    return alterInfoShow;
},{
    requires:['event', 'sizzle' , 'mod/defender' ]
});