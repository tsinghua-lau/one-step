var h=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},g={exports:{}};(function(w,m){(function(c,M){w.exports=M()})(h,function(){function c(n){var d=[];return n.AMapUI&&d.push(M(n.AMapUI)),n.Loca&&d.push(I(n.Loca)),Promise.all(d)}function M(n){return new Promise(function(d,e){var a=[];if(n.plugins)for(var i=0;i<n.plugins.length;i+=1)u.AMapUI.plugins.indexOf(n.plugins[i])==-1&&a.push(n.plugins[i]);if(t.AMapUI===o.failed)e("\u524D\u6B21\u8BF7\u6C42 AMapUI \u5931\u8D25");else if(t.AMapUI===o.notload){t.AMapUI=o.loading,u.AMapUI.version=n.version||u.AMapUI.version,i=u.AMapUI.version;var l=document.body||document.head,s=document.createElement("script");s.type="text/javascript",s.src="https://webapi.amap.com/ui/"+i+"/main.js",s.onerror=function(p){t.AMapUI=o.failed,e("\u8BF7\u6C42 AMapUI \u5931\u8D25")},s.onload=function(){if(t.AMapUI=o.loaded,a.length)window.AMapUI.loadUI(a,function(){for(var p=0,f=a.length;p<f;p++){var A=a[p].split("/").slice(-1)[0];window.AMapUI[A]=arguments[p]}for(d();r.AMapUI.length;)r.AMapUI.splice(0,1)[0]()});else for(d();r.AMapUI.length;)r.AMapUI.splice(0,1)[0]()},l.appendChild(s)}else t.AMapUI===o.loaded?n.version&&n.version!==u.AMapUI.version?e("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C AMapUI \u6DF7\u7528"):a.length?window.AMapUI.loadUI(a,function(){for(var p=0,f=a.length;p<f;p++){var A=a[p].split("/").slice(-1)[0];window.AMapUI[A]=arguments[p]}d()}):d():n.version&&n.version!==u.AMapUI.version?e("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C AMapUI \u6DF7\u7528"):r.AMapUI.push(function(p){p?e(p):a.length?window.AMapUI.loadUI(a,function(){for(var f=0,A=a.length;f<A;f++){var b=a[f].split("/").slice(-1)[0];window.AMapUI[b]=arguments[f]}d()}):d()})})}function I(n){return new Promise(function(d,e){if(t.Loca===o.failed)e("\u524D\u6B21\u8BF7\u6C42 Loca \u5931\u8D25");else if(t.Loca===o.notload){t.Loca=o.loading,u.Loca.version=n.version||u.Loca.version;var a=u.Loca.version,i=u.AMap.version.startsWith("2"),l=a.startsWith("2");if(i&&!l||!i&&l)e("JSAPI \u4E0E Loca \u7248\u672C\u4E0D\u5BF9\u5E94\uFF01\uFF01");else{i=u.key,l=document.body||document.head;var s=document.createElement("script");s.type="text/javascript",s.src="https://webapi.amap.com/loca?v="+a+"&key="+i,s.onerror=function(p){t.Loca=o.failed,e("\u8BF7\u6C42 AMapUI \u5931\u8D25")},s.onload=function(){for(t.Loca=o.loaded,d();r.Loca.length;)r.Loca.splice(0,1)[0]()},l.appendChild(s)}}else t.Loca===o.loaded?n.version&&n.version!==u.Loca.version?e("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C Loca \u6DF7\u7528"):d():n.version&&n.version!==u.Loca.version?e("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C Loca \u6DF7\u7528"):r.Loca.push(function(p){p?e(p):e()})})}if(!window)throw Error("AMap JSAPI can only be used in Browser.");var o;(function(n){n.notload="notload",n.loading="loading",n.loaded="loaded",n.failed="failed"})(o||(o={}));var u={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},t={AMap:o.notload,AMapUI:o.notload,Loca:o.notload},r={AMap:[],AMapUI:[],Loca:[]},v=[],U=function(n){typeof n=="function"&&(t.AMap===o.loaded?n(window.AMap):v.push(n))};return{load:function(n){return new Promise(function(d,e){if(t.AMap==o.failed)e("");else if(t.AMap==o.notload){var a=n.key,i=n.version,l=n.plugins;a?(window.AMap&&location.host!=="lbs.amap.com"&&e("\u7981\u6B62\u591A\u79CDAPI\u52A0\u8F7D\u65B9\u5F0F\u6DF7\u7528"),u.key=a,u.AMap.version=i||u.AMap.version,u.AMap.plugins=l||u.AMap.plugins,t.AMap=o.loading,i=document.body||document.head,window.___onAPILoaded=function(p){if(delete window.___onAPILoaded,p)t.AMap=o.failed,e(p);else for(t.AMap=o.loaded,c(n).then(function(){d(window.AMap)}).catch(e);v.length;)v.splice(0,1)[0]()},l=document.createElement("script"),l.type="text/javascript",l.src="https://webapi.amap.com/maps?callback=___onAPILoaded&v="+u.AMap.version+"&key="+a+"&plugin="+u.AMap.plugins.join(","),l.onerror=function(p){t.AMap=o.failed,e(p)},i.appendChild(l)):e("\u8BF7\u586B\u5199key")}else if(t.AMap==o.loaded)if(n.key&&n.key!==u.key)e("\u591A\u4E2A\u4E0D\u4E00\u81F4\u7684 key");else if(n.version&&n.version!==u.AMap.version)e("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C JSAPI \u6DF7\u7528");else{if(a=[],n.plugins)for(i=0;i<n.plugins.length;i+=1)u.AMap.plugins.indexOf(n.plugins[i])==-1&&a.push(n.plugins[i]);a.length?window.AMap.plugin(a,function(){c(n).then(function(){d(window.AMap)}).catch(e)}):c(n).then(function(){d(window.AMap)}).catch(e)}else if(n.key&&n.key!==u.key)e("\u591A\u4E2A\u4E0D\u4E00\u81F4\u7684 key");else if(n.version&&n.version!==u.AMap.version)e("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C JSAPI \u6DF7\u7528");else{var s=[];if(n.plugins)for(i=0;i<n.plugins.length;i+=1)u.AMap.plugins.indexOf(n.plugins[i])==-1&&s.push(n.plugins[i]);U(function(){s.length?window.AMap.plugin(s,function(){c(n).then(function(){d(window.AMap)}).catch(e)}):c(n).then(function(){d(window.AMap)}).catch(e)})}})},reset:function(){delete window.AMap,delete window.AMapUI,delete window.Loca,u={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},t={AMap:o.notload,AMapUI:o.notload,Loca:o.notload},r={AMap:[],AMapUI:[],Loca:[]}}}})})(g);const L=g.exports;export{L as A,h as c};
