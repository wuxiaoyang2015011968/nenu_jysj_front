/*-----------------------------------------------------------------------------
* @Description: 侧边栏js (sidebar.js)
* @Version: 	V1.0.0
* @author: 		shenj(1073805310@qq.com)
* @date			2014.08.11
* ==NOTES:=============================================
* v1.0.0(2014.08.11):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('module/sidebar',function(S,core){
	PW.namespace('module.Sidebar');
	PW.module.Sidebar = function(param){
		new core(param);
	}
},{
	requires:['sidebar/core']
});
/*----------------------------侧边栏js--------------------------------*/
KISSY.add('sidebar/core',function(S){


	

	
	var
		$ = S.all, on = S.Event.on,DOM = S.DOM,
		el = {
			sidebarHolder:'.sidebar',//指向侧边栏导航
			submenuHolder:'.submenu',//指向二级菜单
			submenu:'.submenu',
			active:'.active',
        	tipEl: '.J_tip'//提示元素
		},
		NONE_CLASS = 'none',
		OPEN_CLASS = 'open';

	function core(param){
		this.opts = param;
		this.init();
	}

	S.augment(core,{
		init:function(){
			this._addEventLintener();
			this._hideTip();
			//当前页所在导航栏展开
			var pageUrl;
			pageUrl = window.location.href;
			$('a',el.submenu).each(function(){
				// alert(pageUrl);
				url=$(this).attr('href');
				if(url==pageUrl){
					$(this).parent('ul').removeClass(NONE_CLASS);
					$(this).parent('.list').addClass(el.active);
				}
			});
		},
		_addEventLintener:function(){
			var
				that = this,
				clickHolder = $('a',el.sidebarHolder);
			on(clickHolder,'click',function(evt){
				that._showCurrentMenu(evt.currentTarget);
				that._hideOtherMenu(evt.currentTarget);
			});
		},
		/**
		 * 隐藏提示信息
		 * @return {[type]} [description]
		 */
		_hideTip: function(){
			var
				that = this,
				msg = S.one(el.tipEl);
			
			if( msg ){
				setTimeout(function(){
					DOM.remove(el.tipEl);
				}, 2000);
			}
		},
		_showCurrentMenu:function(holder){
			var
				that = this,
				$submenuHolder = $(holder).next(),
				$parent = $(holder).parent();
			if($submenuHolder && $submenuHolder.hasClass(NONE_CLASS)){
				// alert(window.location.href);
				$submenuHolder.show();
				$submenuHolder.removeClass(NONE_CLASS);
				$parent.addClass(OPEN_CLASS);
				// $parent.addClass(el.active);
			}
		},
		_hideOtherMenu:function(holder){
			var
				that = this,
				$parent = $(holder).parent(),
				$dom = $parent.siblings(),
				$otherSubmenu,
				$i;
			S.each($dom,function(i,o){
				$i = $(i),
				$otherSubmenu = $(el.submenuHolder,$i);
				if(!$otherSubmenu.hasClass(NONE_CLASS)){
					$otherSubmenu.hide();
					$otherSubmenu.addClass(NONE_CLASS);
					$i.removeClass(OPEN_CLASS);
					// $i.removeClass(el.active);
				}
			});
		}
	});

	return core;
},{
	requires:['core']
});