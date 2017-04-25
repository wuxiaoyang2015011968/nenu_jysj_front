/*
Copyright 2011, KISSY UI Library v1.20
MIT Licensed
build time: Nov 28 12:39
*/
KISSY.add("json/json2",function(t,n){function j(b){return b<10?"0"+b:b}function q(b){r.lastIndex=0;return r.test(b)?'"'+b.replace(r,function(f){var c=v[f];return typeof c==="string"?c:"\\u"+("0000"+f.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+b+'"'}function o(b,f){var c,d,g,k,i=h,e,a=f[b];if(a&&typeof a==="object"&&typeof a.toJSON==="function")a=a.toJSON(b);if(typeof l==="function")a=l.call(f,b,a);switch(typeof a){case "string":return q(a);case "number":return isFinite(a)?String(a):"null";case "boolean":case "null":return String(a);
case "object":if(!a)return"null";h+=p;e=[];if(Object.prototype.toString.apply(a)==="[object Array]"){k=a.length;for(c=0;c<k;c+=1)e[c]=o(c,a)||"null";g=e.length===0?"[]":h?"[\n"+h+e.join(",\n"+h)+"\n"+i+"]":"["+e.join(",")+"]";h=i;return g}if(l&&typeof l==="object"){k=l.length;for(c=0;c<k;c+=1){d=l[c];if(typeof d==="string")if(g=o(d,a))e.push(q(d)+(h?": ":":")+g)}}else for(d in a)if(Object.hasOwnProperty.call(a,d))if(g=o(d,a))e.push(q(d)+(h?": ":":")+g);g=e.length===0?"{}":h?"{\n"+h+e.join(",\n"+h)+
"\n"+i+"}":"{"+e.join(",")+"}";h=i;return g}}var u=window,m=u.JSON;if(!m||n.ie<9)m=u.JSON={};if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+j(this.getUTCMonth()+1)+"-"+j(this.getUTCDate())+"T"+j(this.getUTCHours())+":"+j(this.getUTCMinutes())+":"+j(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var s=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
r=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,h,p,v={"":"\\b","\t":"\\t","\n":"\\n","":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},l;if(typeof m.stringify!=="function")m.stringify=function(b,f,c){var d;p=h="";if(typeof c==="number")for(d=0;d<c;d+=1)p+=" ";else if(typeof c==="string")p=c;if((l=f)&&typeof f!=="function"&&(typeof f!=="object"||typeof f.length!=="number"))throw Error("JSON.stringify");return o("",{"":b})};if(typeof m.parse!==
"function")m.parse=function(b,f){function c(g,k){var i,e,a=g[k];if(a&&typeof a==="object")for(i in a)if(Object.hasOwnProperty.call(a,i)){e=c(a,i);if(e!==undefined)a[i]=e;else delete a[i]}return f.call(g,k,a)}var d;b=String(b);s.lastIndex=0;if(s.test(b))b=b.replace(s,function(g){return"\\u"+("0000"+g.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,
""))){d=eval("("+b+")");return typeof f==="function"?c({"":d},""):d}throw new SyntaxError("JSON.parse");};return m},{requires:["ua"]});KISSY.add("json",function(t,n){return{parse:function(j){if(t.isNullOrUndefined(j)||j==="")return null;return n.parse(j)},stringify:n.stringify}},{requires:["json/json2"]});
