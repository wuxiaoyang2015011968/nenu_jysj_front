/*-----------------------------------------------------------------------------
* @Description:     系统管理--未导入相关js
* @Version:         n.n.n
* @author:          lixingyu(starsuniverseLi@gmail.com)
* @date             2016.10.28
* ==NOTES:=============================================
* vn.n.n(2016.10.28):
     初始生成
* ---------------------------------------------------------------------------*/
/*给它制造命名空间，专门存放各个页面js,被主页面调用*/
KISSY.add('page/admin_page/system_management/notImport', function(S, List) {
	PW.namespace('page.admin_page.system_management.notImport');
    PW.page.admin_page.system_management.notImport = function(param) {
        new List(param);
    };
},{
    requires:[
        'notImport/List'
    ]
    
});
/*-------------------------------------------------------------------*/
/*开始改页面模块的js内容*/
KISSY.add('notImport/List', function(S) {
	var $ = S.all,
        /*on = S.Event.on, //绑定静态节点*/
        /*delegate = S.Event.delegate, //绑定静态节点*/

        school_rollIO = PW.io.admin_page.system_management.notImport, //定义一个IO层入口

        Pagination = PW.mod.Pagination,
        Defender = PW.mod.Defender,
        Dialog = PW.mod.Dialog,        //定义要使用的组件

        urls = PW.Env.url.admin_page.system_management.notImport;//定义数据入口
        function List(param) {
            this.opts = param; //分页调用的参数,刷分页，永远都要用到它
            this.pagination;
            this._init();
        };

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

                    S.mix(opts, {extraParam:{test:000}});//想传给后台的数据                    
                    that.pagination.reload(opts); 
            }   
        });
                
        return List;

},
{
	requires:['event','sizzle', 'mod/pagination', 'io/admin_page/system_management/notImport']
});