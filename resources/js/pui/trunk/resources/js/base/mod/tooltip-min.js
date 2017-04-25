KISSY.add("mod/tooltip",function(a,b){PW.namespace("mod.Tooltip");PW.namespace("tooltip");PW.namespace("Tooltip");PW.tooltip=PW.Tooltip=PW.mod.Tooltip=function(c){return new b(c);};},{requires:["tooltip/core"]});KISSY.add("tooltip/core",function(d,g){var l=d.DOM,c=l.get,i=l.query,e=d.all,h=d.Event.on,j=d.Event.delegate,k=d.Event.detach,b=d.IO,a=PW.modSettings.tooltip||{};CONFIG={renderTo:"",styles:{uri:""}},TIP_DATA_KEY="pw_tooltip",DEFAULT_THEME_URI=PW.libUrl+"js/base/assets/tooltip/css/style.css";var f=function(m){this.length;this.options;this.instances;this._init(m);};d.augment(f,{_init:function(o){var n=this,m={};d.mix(m,CONFIG,true,[],true);d.mix(m,a,true,[],true);d.mix(m,o,true,[],true);this.options=m;this.instances=d.xArray([]);this.length=0;n._createTips();n._loadCss();},_createTips:function(){var n=this,m;m=i(n.options.renderTo);if(m.length>0){d.each(m,function(q){var r,p={},o=l.data(q).tooltip;if(n.get(q)){d.log("已经存在tip对象");}r=(!n.get(q))?new g(q,d.clone(n.options)):n.get(q);n.instances.push(r);p[r.tid]=r;d.mix(o,p);n.length++;});}},_loadCss:function(){var n=this,m=n.options,o;if(m.styles&&d.isString(o=m.styles.uri)&&o.length!=""){d.loadCSS(o);}else{d.loadCSS(DEFAULT_THEME_URI);}},get:function(m){var o=this,n,p;n=c(m);p=l.data(n,TIP_DATA_KEY);return p||null;},getById:function(o){var n=this,m=null;n.each(function(p){if(p.tid==o){m=p;}});return m;},each:function(n){var m=this;d.each(m.instances,function(p,o){n.call(p,p,o);});},refresh:function(n){var m=this;m.each(function(o){o.destroy();});if(!n||d.isEmptyObject(n)){n=m.options;}m._init(n);}});return f;},{requires:["tooltip/base","mod/ext"]});KISSY.add("tooltip/base",function(e){var m=e.DOM,n=m.get,f=m.query,d=e.all,p=e.Anim,i=e.Event.on,k=e.Event.delegate,o=e.Event.detach,c=e.IO,h=e.juicer,r=function(){},j='<div class="pw-tooltip theme-&{theme}" style="display: none;"><i class="tip-arrow &{arrowPos}"></i><div class="tip-content"></div></div>',a=8,g=8,b="pw_tooltip",q={content:{text:"暂无内容",uri:""},position:{my:"lc",at:"rc",adjust:{x:0,y:0,resize:false,mouse:false}},styles:{theme:"",width:"",height:""},show:{ready:false,event:"mouseover",effect:null,delay:0.1,duration:0.1,easing:"easeIn"},hide:{event:"mouseout",effect:null,delay:0.1,duration:0.1,easing:"easeOut"}};var l=function(s,t){this.options=e.mix(e.clone(q),t,true,true,true);this.tid=e.now();this.host=s;this.tipDOM;this.visible=false;this.hasDestroyed=false;this.showCoord={};this.showTimer=-1;this.hideTimer=-1;this.isMoveEnable=this.options.position.adjust.mouse||false;this.showAnim;this.hideAnim;this._init();};e.augment(l,e.FSM(),e.EventTarget,{_init:function(){var t=this,s=t.options;this._initTipDOM();this.render();this.showCoord=this._getArrowPointerCoord();this._setATFStates();t._setShowAnim();t._setHideAnim();this._addEvtDispatcher();this._embedTip2Host();},_addEvtDispatcher:function(){var u=this,t=u.host,v=u.tipDOM,s=u.options;i(t,s.show.event,u._showHandler,u);i(t,s.hide.event,u._hideHandler,u);i(v,"mouseover",u._mouseoverHandler,u);i(v,"mouseout",u._mouseoutHandler,u);i(t,"x-resize",u._xResizeHandler,u);if(s.position.adjust.mouse){i(t,"mousemove",u._mousemoveHandler,u);}},_removeEvtDispatcher:function(){var u=this,t=u.host,v=u.tipDOM,s=u.options;o(t,s.show.event,u._showHandler,u);o(t,s.hide.event,u._hideHandler,u);o(v,"mouseover",u._mouseoverHandler,u);o(v,"mouseout",u._mouseoutHandler,u);o(t,"x-resize",u._xResizeHandler,u);if(s.position.adjust.mouse){o(t,"mousemove",u._mousemoveHandler,u);}},_showHandler:function(t){var s=this;s.drive(e.mix(t,{type:"open"}));},_hideHandler:function(t){var s=this;s.drive(e.mix(t,{type:"close"}));},_mouseoverHandler:function(t){var s=this;s.drive(e.mix(t,{type:"over"}));},_mouseoutHandler:function(t){var s=this;s.drive(e.mix(t,{type:"out"}));},_xResizeHandler:function(t){var s=this;s.showCoord=s._getArrowPointerCoord();s._adjustTipPos();},_mousemoveHandler:function(t){var s=this;s.drive(e.mix(t,{type:"move"}));},_setATFStates:function(){var t=this,s=t.options;this.setATF({inactive:{open:function(u){t._addShowTimer();return"spause";},close:function(){t._clearShowTimer();return"inactive";},move:function(u){if(t.isMoveEnable){t._updateInitCoord({x:u.pageX,y:u.pageY});}return"inactive";},out:function(u){return t.currentState;}},spause:{open:function(u){if(t.isMoveEnable){t._updateInitCoord({x:u.pageX,y:u.pageY});}return"spause";},close:function(u){t._clearShowTimer();return"inactive";},move:function(u){if(t.isMoveEnable){t._updateInitCoord({x:u.pageX,y:u.pageY});}return"spause";},timeout:function(u){t.showAnim.run();t._adjustTipPos();t._adjustArrowPos();return"fadein";}},fadein:{open:function(u){t.repositon(u);return t.currentState;},close:function(u){t._addHideTimer();return"hpause";},move:function(u){t.repositon(u);return this.currentState;},timeout:function(u){return"display";},over:function(u){t.hideAnim.stop();t.showAnim.run();return"fadein";},out:function(u){t._addHideTimer();return"hpause";}},display:{open:function(u){t.repositon(u);return t.currentState;},close:function(u){t._addHideTimer();return"hpause";},move:function(u){t.repositon(u);return t.currentState;},timeout:function(u){return t.currentState;},over:function(u){return t.currentState;},out:function(u){t._addHideTimer();return"hpause";}},fadeout:{open:function(u){t.hideAnim.stop();t.showAnim.run();t.repositon(u);return"fadein";},close:function(u){return t.currentState;},move:function(u){t.repositon(u);return t.currentState;},timeout:function(u){return"inactive";},over:function(u){t.hideAnim.stop();t.showAnim.run();return"fadein";},out:function(u){return t.currentState;}},hpause:{open:function(u){t._clearHideTimer();t.repositon(u);return(t.showAnim.isRunning())?"fadein":"display";},close:function(u){t._addHideTimer();return t.currentState;},move:function(u){t._clearHideTimer();t.repositon(u);return t.currentState;},timeout:function(u){t.showAnim.stop();t.hideAnim.run();return"fadeout";},over:function(u){t._clearHideTimer();return(t.showAnim.isRunning())?"fadein":"display";},out:function(){return t.currentState;}}});},_setShowAnim:function(){var t=this,s=t.options,u=t.tipDOM;t.showAnim=p(u,{opacity:"show"},s.show.duration,s.show.easing,function(){t.drive({type:"timeout"});t.visible=true;t.fire("show",{tip:t});t.fire("visibleChange",{tip:t,visible:true});});},_setHideAnim:function(){var t=this,s=t.options,u=t.tipDOM;t.hideAnim=p(u,{opacity:"hide"},s.hide.duration,s.hide.easing,function(){t.drive({type:"timeout"});t.visible=false;t.fire("hide",{tip:t});t.fire("visibleChange",{tip:t,visible:false});});},_addHideTimer:function(){var t=this,s=t.options;if(t.hideTimer<=-1){t.hideTimer=e.timer(function(){t.drive({type:"timeout"});t.hideTimer=-1;},s.hide.delay,1);}},_clearHideTimer:function(){var s=this;e.clearTimer(s.hideTimer);s.hideTimer=-1;},_addShowTimer:function(){var t=this,s=t.options;if(t.showTimer<=-1){t.showTimer=e.timer(function(){t.drive({type:"timeout"});t.showTimer=-1;},s.show.delay,1);}},_clearShowTimer:function(){var s=this;e.clearTimer(s.showTimer);s.showTimer=-1;},_updateInitCoord:function(t){var s=this;t.x=t.x||0;t.y=t.y||0;s.showCoord=t;},show:function(){var t=this,s=t.options;t.drive({type:"open"});},hide:function(){var t=this,s=t.options;t.drive({type:"close"});},destroy:function(){var t=this,s=t.host;t.hide();t._removeEvtDispatcher();this.tid=null;this.host=null;m.remove(this.tipDOM);t._removeTipFromHost();t.hasDestroyed=true;},render:function(){var s=this;s.fire("beforeRender",{tip:s});m.append(s.tipDOM,"body");s._updateContent();s.fire("beforeRender",{tip:s});},refresh:function(){var t=this,s=t.host;t._removeEvtDispatcher();},disable:function(){},enable:function(){},toggle:function(){},repositon:function(v){var u=this,t=u.options,s,z,w;s=v.pageX||0;z=v.pageY||0;if(u.isMoveEnable){u._adjustTipPos({x:s,y:z});u.fire("move",{tip:u,x:s,y:z});}},setContent:function(t){var s=this;s._updateContent(t);s._adjustTipPos();s._adjustArrowPos();},setHtml:function(s){var t=this;t.setContent({text:s});},_initTipDOM:function(){var u=this,s=u.options,t="",w,v;t=h(j,{theme:s.styles.theme,arrowPos:s.position.my});u.tipDOM=m.create(t);m.css(u.tipDOM,{width:s.styles.width,height:s.styles.height});},_updateContent:function(y){var x=this,A=x.options,s=x.tipDOM,v,z,t=[],w;if(!y||!e.isObject(y)){y=A.content;}else{A.content=y;}if(y.uri){v=m.create("<iframe>",{src:y.uri,css:{width:"100%",height:"100%"}});t.push(v);}else{if(y.text){z=y.text;if(e.isString(z)){try{t=f(z);}catch(u){e.log("通过文本方式处理");}finally{if(t.length<=0){t.push(m.create(z));}}}else{if(e.isObject(z)){if(z.jquery){t=z.get();}else{if(z.addStyleSheet){t=z.getDOMNodes();}else{if(f(z)>0){t=f(z);}else{if(m.isHTMLElement(z)){t.push(z);}else{t.push(m.create("<p>"+z.toString()+"</p>"));}}}}}else{if(e.isFunction(z)){w=z.call(x,x,x.host)||"正在加载";if(e.isString(w)){t.push(m.create(w));}else{if(m.isHTMLElement(w)){x._updateContent({text:w});return;}}}else{if(e.isArray(z)){t=z;}}}}}else{t.push(m.create("<p>无效数据</p>"));}}d(s).one(".tip-content").html("");e.each(t,function(B){d(s).one(".tip-content").append(B);});},_adjustTipPos:function(z){var v=this,t=v.options,y=v.tipDOM,s=m.outerWidth(y),u=m.outerHeight(y),w,x={};if(!z||!z.x||!z.y){w=v._getArrowPointerCoord();}else{w=z;v.showCoord=z;}w.x+=t.position.adjust.x;w.y+=t.position.adjust.y;switch(t.position.my){case"tl":x.left=w.x-a/2;x.top=w.y+g;break;case"tc":x.left=w.x-s/2;x.top=w.y+g;break;case"tr":x.left=w.x-s+a/2;x.top=w.y+g;break;case"rt":x.left=w.x-s-a;x.top=w.y;break;case"rc":x.left=w.x-s-a;x.top=w.y-u/2;break;case"rb":x.left=w.x-s-a;x.top=w.y-u;break;case"bl":x.left=w.x-a/2;x.top=w.y-g-u;break;case"bc":x.left=w.x-s/2;x.top=w.y-g-u;break;case"br":x.left=w.x-s+a/2;x.top=w.y-g-u;break;case"lt":x.left=w.x+a;x.top=w.y;break;case"lc":x.left=w.x+a;x.top=w.y-u/2;break;case"lb":x.left=w.x+a;x.top=w.y-u;break;default:e.log("定位错误");}m.css(y,x);},_getArrowPointerCoord:function(){var x=this,A=x.host,u=x.options.position.at,s=m.offset(A),w=s.left,B=s.top,y=m.outerWidth(A),v=m.outerHeight(A),z={};switch(u){case"tc":case"bc":z.x=w+y/2;break;case"tr":case"rt":case"rc":case"rb":case"br":z.x=w+y;break;default:z.x=w;}switch(u){case"lc":case"rc":z.y=B+v/2;break;case"lb":case"bl":case"bc":case"br":case"rb":z.y=B+v;break;default:z.y=B;}return z;},_adjustArrowPos:function(){var w=this,t=w.options,y=w.tipDOM,u=n("i",y),s=m.width(y),v=m.outerHeight(y),x={};switch(t.position.my){case"lt":case"lc":case"lb":x.left=-1*a;break;case"tl":case"bl":x.left=0;break;case"tc":case"bc":x.left=(s-a)/2;break;case"tr":case"br":x.right=0;break;case"rt":case"rc":case"rb":x.right=-1*a;break;default:e.log("arrow x方向定位错误");x.left=0;}switch(t.position.my){case"tl":case"tc":case"tr":x.top=-1*g;break;case"lt":case"rt":x.top=0;break;case"lc":case"rc":x.top=(v-g)/2;break;case"lb":case"rb":x.bottom=0;break;case"bl":case"bc":case"br":x.bottom=-1*g;break;default:e.log("arrow y方向定位错误");x.top=0;}m.css(u,x);},_embedTip2Host:function(){var t=this,s=t.host;m.data(s,b,this);},_removeTipFromHost:function(){var t=this,s=t.host;m.removeData(s,b);}});return l;},{requires:["core","sizzle","mod/ext","mod/juicer","mod/fsm"]});