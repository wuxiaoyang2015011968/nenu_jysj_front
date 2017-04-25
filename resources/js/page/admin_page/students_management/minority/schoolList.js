/*-----------------------------------------------------------------------------
* @Description:     少数民族-学生列表相关js
* @Version:         n.n.n
* @author:          lixingyu(starsuniverseLi@gmail.com)
* @date             2016.11.17
* ==NOTES:=============================================
* vn.n.n(2016.11.17):
     初始生成
* ---------------------------------------------------------------------------*/
/*给它制造命名空间，专门存放各个页面js,被主页面调用*/
KISSY.add('page/admin_page/students_management/minority/schoolList', function(S, List) {
	PW.namespace('page.admin_page.students_management.minority.schoolList');
    PW.page.admin_page.students_management.minority.schoolList = function(param) {
        new List(param);
    };
},{
    requires:[
        'schoolList/List'
    ]
    
});
/*-------------------------------------------------------------------*/
/*开始改页面模块的js内容*/
KISSY.add('schoolList/List', function(S) {
	var $ = S.all, DOM = S.DOM,
        /*on = S.Event.on, //绑定静态节点*/
        /*delegate = S.Event.delegate, //绑定静态节点*/

        minorityIO = PW.io.admin_page.students_management.minority.schoolList, //定义一个IO层入口

        Pagination = PW.mod.Pagination,
        Defender = PW.mod.Defender,
        Dialog = PW.mod.Dialog,        //定义要使用的组件

        urls = PW.Env.url.admin_page.students_management.minority.schoolList, //定义数据入口

        el = {
           nation:"#nation",
           originPlace:"#originPlace",
           college:"#college",
           qualificationNow:"#qualificationNow",
           showUncommitted:"#showUncommitted",
           querybtn:"#querybtn",
           viewbtn:".view",
           searchForm:".query_selects",
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

                /*--点击查询按钮--*/
                
                $(el.querybtn).on('click',function(ev){
                    var nation = $(el.nation).children('option:selected').val(),
                    originPlace = $(el.originPlace).children('option:selected').val(),
                    college = $(el.college).children('option:selected').val(),
                    qualificationNow = $(el.qualificationNow).children('option:selected').val(),
                    showUncommitted = $(el.showUncommitted).children('option:selected').val();                
                    S.mix(opts, {extraParam:{
                                     nation :nation,
                                     college :college,
                                     originPlace:originPlace,
                                     qualificationNow:qualificationNow,
                                     showUncommitted:showUncommitted,
                                    }});//想传给后台的数据
                    that.pagination.reload(opts);
                });

                /*--点击查看按钮--*/
                $('body').delegate('click',el.viewbtn,function(ev){
                    var $target = $(ev.target);
                    var nowpage = $(".check").text();
                    var nowStuOrder = $target.parent().parent().first().text();
                    var lastStuOrder = $target.parent().parent().parent().last().first().text();
                    var nowStuId = $target.parent().parent().first().next().text();
                    var nation = $(el.nation).children('option:selected').val(),
                    originPlace = $(el.originPlace).children('option:selected').val(),
                    college = $(el.college).children('option:selected').val(),
                    qualificationNow = $(el.qualificationNow).children('option:selected').val(),
                    showUncommitted = $(el.showUncommitted).children('option:selected').val();
                        
                        if( nowpage == undefined){
                            nowpage = 1;
                        };

                    var nowStuArray = new Array();
                    var stuIds = $(".stuId");
                    for (var i = 0; i < stuIds.length; i++) {
                        nowStuArray.push(stuIds[i].innerHTML);
                    };
                    var condition = {
                        nation :nation,
                        college :college,
                        originPlace:originPlace,
                        qualificationNow:qualificationNow,
                        showUncommitted:showUncommitted
                    };
                    var conditions = JSON.stringify(condition);
                    var para = {
                                curPage:nowpage, //当前页码
                                curNo:nowStuOrder,//当前点击学生的序号
                                id: nowStuId,//当前点击学生的数据库ID
                                idList:nowStuArray,//当前页的ID顺序列表
                                conditions:conditions                     
                        };
                    minorityIO.nowInfo(para,function(code,data,msg){
                            if(code == 0){
                               var id = $target.parent().parent().first().next().text();
                               window.location.href="/admin/minority/status/info/detail/" + id; 
                            }
                    });
                    //console.log(para);
                });
                
                /*输入框的特效*/
                $(el.keyword) .on('focusin',function(ev){
                    $(el.keyword).val("");
                });
            }
        
        });
                
        return List;

},
{
	requires:['mod/ext','event','sizzle', 'mod/pagination', 'io/admin_page/students_management/minority/schoolList']
});