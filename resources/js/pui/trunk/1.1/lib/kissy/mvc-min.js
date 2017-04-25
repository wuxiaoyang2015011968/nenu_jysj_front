/*
Copyright 2012, KISSY UI Library v1.20
MIT Licensed
build time: Jan 6 11:37
*/
KISSY.add("mvc/base",function(h,n){return{sync:n}},{requires:["./sync"]});
KISSY.add("mvc/collection",function(h,n,o,l,k){function c(){c.superclass.constructor.apply(this,arguments)}c.ATTRS={model:{value:o},models:{setter:function(a){this.remove(this.get("models"),{silent:1});this.add(a,{silent:1});return this.get("models")},value:[]},url:{value:h.noop},comparator:{},sync:{value:function(){l.sync.apply(this,arguments)}},parse:{value:function(a){return a}}};h.extend(c,k,{sort:function(){var a=this.get("comparator");a&&this.get("models").sort(function(b,d){return a(b)-a(d)})},
toJSON:function(){return h.map(this.get("models"),function(a){return a.toJSON()})},add:function(a,b){var d=this,f=true;if(h.isArray(a)){var i=[].concat(a);h.each(i,function(m){m=d._add(m,b);f=f&&m})}else f=d._add(a,b);return f},remove:function(a,b){var d=this;if(h.isArray(a)){var f=[].concat(a);h.each(f,function(i){d._remove(i,b)})}else a&&d._remove(a,b)},at:function(a){return this.get("models")[a]},_normModel:function(a){var b=true;if(!(a instanceof o)){b=a;a=new (this.get("model"));b=a.set(b,{silent:1})}return b&&
a},load:function(a){var b=this;a=a||{};var d=a.success;a.success=function(f){if(f){var i=b.get("parse").call(b,f);i&&b.set("models",i,a)}d&&d.apply(this,arguments)};b.get("sync").call(b,b,"read",a);return b},create:function(a,b){var d=this;b=b||{};if(a=this._normModel(a)){a.addToCollection(d);var f=b.success;b.success=function(){d.add(a,b);f&&f()};a.save(b)}return a},_add:function(a,b){if(a=this._normModel(a)){b=b||{};var d;d=this.get("models");var f=this.get("comparator"),i=d.length;if(f){var m=
f(a);for(i=0;i<d.length;i++){var y=f(d[i]);if(m<y)break}}d=i;this.get("models").splice(d,0,a);a.addToCollection(this);b.silent||this.fire("add",{model:a})}return a},_remove:function(a,b){b=b||{};var d=h.indexOf(a,this.get("models"));if(d!=-1){this.get("models").splice(d,1);a.removeFromCollection(this)}b.silent||this.fire("remove",{model:a})},getById:function(a){for(var b=this.get("models"),d=0;d<b.length;d++){var f=b[d];if(f.getId()===a)return f}return null},getByCid:function(a){for(var b=this.get("models"),
d=0;d<b.length;d++){var f=b[d];if(f.get("clientId")===a)return f}return null}});return c},{requires:["event","./model","./base","base"]});
KISSY.add("mvc/model",function(h,n,o){function l(){l.superclass.constructor.apply(this,arguments);this.publish("*Change",{bubbles:1});this.collections={}}var k=["idAttribute","clientId","urlRoot","url","parse","sync"];h.extend(l,n,{addToCollection:function(c){this.collections[h.stamp(c)]=c;this.addTarget(c)},removeFromCollection:function(c){delete this.collections[h.stamp(c)];this.removeTarget(c)},getId:function(){return this.get(this.get("idAttribute"))},setId:function(c){return this.set(this.get("idAttribute"),
c)},__set:function(){this.__isModified=1;return l.superclass.__set.apply(this,arguments)},isNew:function(){return!this.getId()},isModified:function(){return!!(this.isNew()||this.__isModified)},destroy:function(c){var a=this;c=c||{};var b=c.success;c.success=function(d){var f=a.collections;if(d){var i=a.get("parse").call(a,d);i&&a.set(i,c)}for(var m in f){f[m].remove(a,c);a.removeFromCollection(f[m])}a.fire("destroy");b&&b.apply(this,arguments)};if(!a.isNew()&&c["delete"])a.get("sync").call(a,a,"delete",
c);else{c.success();c.complete&&c.complete()}return a},load:function(c){var a=this;c=c||{};var b=c.success;c.success=function(d){if(d){var f=a.get("parse").call(a,d);f&&a.set(f,c)}a.__isModified=0;b&&b.apply(this,arguments)};a.get("sync").call(a,a,"read",c);return a},save:function(c){var a=this;c=c||{};var b=c.success;c.success=function(d){if(d){var f=a.get("parse").call(a,d);f&&a.set(f,c)}a.__isModified=0;b&&b.apply(this,arguments)};a.get("sync").call(a,a,a.isNew()?"create":"update",c);return a},
toJSON:function(){var c=this.getAttrVals();h.each(k,function(a){delete c[a]});return c}},{ATTRS:{idAttribute:{value:"id"},clientId:{valueFn:function(){return h.guid("mvc-client")}},url:{value:function(){var c,a,b=this.collections;for(c in b)if(b.hasOwnProperty(c)){a=b[c];break}c=a;var d;c=c&&(d=c.get("url"))?h.isString(d)?d:d.call(c):d;d=c||this.get("urlRoot");if(this.isNew())return d;d+=d.charAt(d.length-1)=="/"?"":"/";return d+encodeURIComponent(this.getId())+"/"}},urlRoot:{value:""},sync:{value:function(){o.sync.apply(this,
arguments)}},parse:{value:function(c){return c}}}});return l},{requires:["base","./base"]});
KISSY.add("mvc/router",function(h,n,o){function l(e){var g,j;for(j=0;j<e.length;j++){g=e.charAt(j);if(g=="\\")j++;else if(g=="(")return j}throw Error("impossible to not to get capture group in kissy mvc route");}function k(){return q.nativeHistory&&z?r.pathname.substr(q.urlRoot.length)+r.search:r.href.replace(/^[^#]*#?!?(.*)$/,"$1")}function c(e){if(h.endsWith(e,"/"))e=e.substring(0,e.length-1);return e}function a(e){if(h.startsWith(e,"/"))e=e.substring(1);return e}function b(e,g){e=c(e);g=c(g);return e==
g}function d(e){if(e=e.match(I))return h.unparam(e[1]);return{}}function f(){var e=k(),g=e,j=0,p=-1,t="",w=-1,F=0,v=0;e=g.replace(I,"");A(J,function(G){var x=0;A(G[H],function(s){var B=s.regStr,K=s.paramNames,C=-1,u,M=s.callback;if(u=e.match(s.reg)){u.shift();var P=function(){if(K){var L={};A(u,function(N,O){L[K[O]]=N});return L}else return[].concat(u)};s=function(){t=B;w=C;F=M;v=P();j=G;p=u.length};if(u.length)if(B){C=l(B);if(C>w)s();else if(C==w&&p>=u.length)if(u.length<p)s();else B.length>t.length&&
s();else j||s()}else s();else{s();x=1;return false}}});if(x)return false});if(v){g=d(g);F.apply(j,[v,g]);g={name:name,paths:v,query:g};j.fire("route:"+name,g);j.fire("route",g)}}function i(e,g,j){var p=g,t=[];if(h.isFunction(j)){g=h.escapeRegExp(g);g=g.replace(Q,function(w,F,v,G,x){t.push(v||x);if(v)return"([^/]+)";else if(x)return"(.*)"});return{name:p,paramNames:t,reg:RegExp("^"+g+"$"),regStr:g,callback:j}}else return{name:p,reg:j.reg,callback:m(e,j.callback)}}function m(e,g){if(h.isFunction(g))return g;
else if(h.isString(g))return e[g];return g}function y(e){this[H]={};this.addRoutes(e.newVal)}function q(){q.superclass.constructor.apply(this,arguments);this.on("afterRoutesChange",y,this);y.call(this,{newVal:this.get("routes")});J.push(this)}var I=/\?(.*)/,A=h.each,Q=/(:([\w\d]+))|(\\\*([\w\d]+))/g,J=[],D=window,r=D.location,E=D.history,z=!!(E&&E.pushState),H="__routerMap";q.ATTRS={routes:{}};h.extend(q,o,{addRoutes:function(e){var g=this;A(e,function(j,p){g[H][p]=i(g,p,m(g,j))})}},{navigate:function(e,
g){if(k()!==e)if(q.nativeHistory&&z){E.pushState({},"",r.protocol+"//"+r.host+c(q.urlRoot)+("/"+a(e)));f()}else r.hash="!"+e;else g&&g.triggerRoute&&f()},start:function(e){e=e||{};e.urlRoot=e.urlRoot||"";var g,j=e.nativeHistory,p=r.pathname,t=k(),w=r.hash.match(/#!.+/);g=q.urlRoot=e.urlRoot;if(q.nativeHistory=j)if(z){if(w)if(b(p,g)){E.replaceState({},"",r.protocol+"//"+r.host+c(q.urlRoot)+("/"+a(t)));e.triggerRoute=1}}else if(!b(p,g)){r.replace(c(g)+"/#!"+t);return}setTimeout(function(){if(j&&z)n.on(D,
"popstate",f);else{n.on(D,"hashchange",f);e.triggerRoute=1}e.triggerRoute&&f();e.success&&e.success()},100)}});return q},{requires:["event","base"]});
KISSY.add("mvc/sync",function(h,n,o){var l={create:"POST",update:"POST","delete":"POST",read:"GET"};return function(k,c,a){a=h.merge({type:l[c],dataType:"json"},a);var b=a.data=a.data||{};b._method=c;if(!a.url)a.url=h.isString(k.get("url"))?k.get("url"):k.get("url").call(k);if(c=="create"||c=="update")b.model=o.stringify(k.toJSON());return n(a)}},{requires:["ajax","json"]});
KISSY.add("mvc/view",function(h,n,o){function l(a,b){if(h.isString(b))return a[b];return b}function k(){k.superclass.constructor.apply(this,arguments);var a;if(a=this.get("events"))this._afterEventsChange({newVal:a})}var c=n.all;k.ATTRS={el:{value:"<div />",getter:function(a){if(h.isString(a)){a=c(a);this.__set("el",a)}return a}},events:{}};h.extend(k,o,{_afterEventsChange:function(a){var b=a.prevVal;b&&this._removeEvents(b);this._addEvents(a.newVal)},_removeEvents:function(a){var b=this.get("el"),
d;for(d in a){var f=a[d],i;for(i in f){var m=l(this,f[i]);b.undelegate(i,d,m,this)}}},_addEvents:function(a){var b=this.get("el"),d;for(d in a){var f=a[d],i;for(i in f){var m=l(this,f[i]);b.delegate(i,d,m,this)}}},render:function(){return this},destroy:function(){this.get("el").remove()}});return k},{requires:["node","base"]});KISSY.add("mvc",function(h,n,o,l,k,c){return h.mix(n,{Model:o,View:k,Collection:l,Router:c})},{requires:["mvc/base","mvc/model","mvc/collection","mvc/view","mvc/router"]});
