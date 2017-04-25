/*-----------------------------------------------------------------------------
* @Description:     业务受理-协议业务列表相关js
* @Version:         n.n.n
* @author:          lixingyu(starsuniverseLi@gmail.com)
* @date             2016.7.14
* ==NOTES:=============================================
* vn.n.n(2016.7.14):
     初始生成
* ---------------------------------------------------------------------------*/
/*给它制造命名空间，专门存放各个页面js,被主页面调用*/
KISSY.add('page/admin_page/business_handling/protocolList', function(S, List) {
	PW.namespace('page.admin_page.business_handling.protocolList');
    PW.page.admin_page.business_handling.protocolList = function(param) {
        new List(param);
    };
},{
    requires:[
        'protocolList/List'
    ]
    
});
/*-------------------------------------------------------------------*/
/*开始改页面模块的js内容*/
KISSY.add('protocolList/List', function(S) {
	var $ = S.all,
        on = S.Event.on, //绑定静态节点
        delegate = S.Event.delegate, //绑定静态节点

        protocolIO = PW.io.admin_page.business_handling.protocolList, //定义一个IO层入口

        Pagination = PW.mod.Pagination,
        Calendar = PW.mod.Calendar,
        Defender = PW.mod.Defender,
        Dialog = PW.mod.Dialog,        //定义要使用的组件

        urls = PW.Env.url.admin_page.business_handling.protocolList, //定义数据入口

        el = {
           querybtn: '#querybtn',
           viewbtn:".view",
           beginTime:"#beginTime",
           endTime:"#endTime",
           keyWord:"#keyWord",
           checkProtocolResult:"#checkProtocolResult",
        };

        function List(param) {
            this.opts = param; //分页调用的参数,刷分页，永远都要用到它
            this.pagination;
            this._init();
        }

        S.augment(List, {
            _init: function() {
                this._pagination();
                this._addEventListener();
            },

            _pagination: function(selectParam) {
                var
                    that = this,
                    opts = that.opts;
                    that.pagination = Pagination.client(opts);
            },

            _addEventListener: function() {
                var 
                    that = this,
                    opts = that.opts;
                    that._addCalendar();

               
                /*--点击查询按钮--*/
                 $('body').delegate('click',el.querybtn,function(ev){
                    var beginTime = $(el.beginTime).val() ;
                    var keyWord = $(el.keyWord).val();
                    if (keyWord == '学号或姓名') {
                        keyWord = '';
                    };
                    var endTime = $(el.endTime).val();
                    var checkProtocolResult = $(el.checkProtocolResult).children('option:selected').val();
                    S.mix(opts, {extraParam:
                                    {
                                    beginTime:beginTime,
                                    endTime:endTime,
                                    keyWord:keyWord,
                                    checkProtocolResult :checkProtocolResult,
                                    }
                                });//想传给后台的数据
                    that.pagination.reload(opts);
                });
                
                 /*--点击查看按钮--*/
                $('body').delegate('click',el.viewbtn,function(ev){
                    var $target = $(ev.target);
                    var nowpage = $(".check").text();
                    var nowStuOrder = $target.parent().parent().first().text();
                    var lastStuOrder = $target.parent().parent().parent().last().first().text();
                    var nowStuId = $target.parent().parent().first().next().text();
                    var beginTime = $(el.beginTime).val();
                    var keyWord = $(el.keyWord).val();
                    var endTime = $(el.endTime).val();
                    var checkProtocolResult = $(el.checkProtocolResult).children('option:selected').val();

                        if( keyWord == '学号或姓名'){
                            keyWord = '';
                        };
                        
                        if( nowpage == undefined){
                            nowpage = 1;
                        };
                    var nowStuArray = new Array();
                    var stuIds = $(".stuId");
                    for (var i = 0; i < stuIds.length; i++) {
                        nowStuArray.push(stuIds[i].innerHTML);
                    };
                    var para = {
                                curPage:nowpage, //当前页码
                                curNo:nowStuOrder,//当前点击学生的序号
                                id: nowStuId,//当前点击学生的数据库ID
                                idList:nowStuArray,//当前页的ID顺序列表
                                conditions:{
                                    beginTime:beginTime,
                                    endTime:endTime,
                                    keyWord:keyWord,
                                    checkProtocolResult :checkProtocolResult,
                                }
                        };
                    protocolIO.nowInfo(para,function(code,data,msg){
                        var id = $target.parent().parent().first().next().text();
                            if(code == 0){
                               window.location.href="/admin/protocol/info/" +id; 
                            }
                    });
                    //console.log(para);
                });

                 /*输入框的特效*/
                $(el.keyWord).on('focusin',function(ev){
                    $(el.keyWord).val("");
                });
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

        });

        return List;

},
{
	requires:['event','sizzle', 'mod/calendar','mod/pagination', 'io/admin_page/business_handling/protocolList']
});