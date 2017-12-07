define("appmsg/new_index.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
var n=e("biz_common/dom/event.js"),s=e("biz_wap/jsapi/core.js"),t=document.getElementById("js_new_appmsg_addcontact");
n.tap(t,function(){
return s.invoke("addContact",{
webtype:"1",
username:user_name_new||user_name
},function(e){
(-1!=e.err_msg.indexOf("ok")||-1!=e.err_msg.indexOf("added"))&&(t.style.display="none");
}),!1;
});
});define("appmsg/weapp.js",["biz_common/utils/string/html.js","pages/weapp_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/tmpl.js","biz_wap/jsapi/core.js","biz_common/dom/class.js"],function(e,t,n,a){
"use strict";
function i(e,t,n){
var a=new Image;
a.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=106&content="+n+",biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(t.toString())+"&r="+Math.random()).substr(0,1024),
console&&t&&console.error(t);
}
function p(e,t,n,a,i,p,r){
u({
url:"/mp/appmsgreport?action=appmsg_weapp_report",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e||"",
weapp_pos:t||0,
weapp_title:a||0,
weapp_nickname:n||0,
type:i||0,
scene:window.source||-1,
weapp_type:p,
is_confirm:r||0,
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
function r(){
var e=c("js_content");
if(!e)return!1;
y=e.getElementsByTagName("mp-weapp")||[],v=e.getElementsByTagName("mp-miniprogram")||[],
b=[];
for(var t=e.getElementsByTagName("a"),n=0,a=t.length;a>n;n++){
var i=t[n],p=i.getAttribute("data-miniprogram-appid");
p&&b.push(i);
}
if(y.length<=0&&v.length<=0&&0==b.length)return!1;
try{
k=JSON.parse(weapp_sn_arr_json).weapp_card_list;
}catch(r){
return!1;
}
return!0;
}
function o(e){
return e=e||"",e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function d(e,t,n,a,i){
return p(e,t,n,a,4,i),window.__addIdKeyReport&&window.__addIdKeyReport("28307",103),
location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&appid="+encodeURIComponent(e)+"#wechat_redirect",
!1;
}
function m(e,t,n,i,r){
return p(e,t,n,i,5,r),a("请在微信内打开小程序"),!1;
}
function s(){
var e={
__biz:biz,
mid:mid,
idx:idx,
uin:uin,
key:key,
pass_ticket:pass_ticket,
weapp_num:k.length
};
window.reportWeappid=[];
for(var t=0;t<k.length;t++)e["weapp_appid_"+t]=k[t].appid,e["weapp_sn_"+t]=k[t].sn,
window.reportWeappid.push(k[t].appid);
var n="/mp/appmsg_weapp?action=batch_get_weapp";
for(var a in e)n+="&"+a+"="+encodeURIComponent(e[a]);
var r=function(){};
g.on(document.getElementById("js_minipro_dialog_ok"),"click",function(){
r&&r(),document.getElementById("js_minipro_dialog").style.display="none";
}),g.on(document.getElementById("js_minipro_dialog_cancel"),"click",function(){
var e=document.getElementById("js_minipro_dialog");
e.style.display="none",p(e._appid,e._i,e._nickname,e._title,3,1,1),window.__addIdKeyReport&&window.__addIdKeyReport("28307",116);
}),u({
url:n,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
try{
if(e.base_resp.ret)throw new Error("Fetch weapp info but get ret="+e.base_resp.ret);
var t=!1,n=!1,a=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(a){
var s=Number(a[1]),l=Number(a[2]),c=Number(a[3]);
s>6?t=!0:6===s&&l>5?t=!0:6===s&&5===l&&c>=3&&(t=!0);
}else navigator.userAgent.match(/MicroMessenger\//)||(n=!0);
for(var u=e.weapp_info,y={},v="appid="+encodeURIComponent(e.appid)+(e.appmsg_compact_url?"&appmsg_compact_url="+encodeURIComponent(e.appmsg_compact_url):""),b=0;b<u.length;b++)y[u[b].weapp_appid]=u[b];
for(b=0;b<I.length;b++)(function(e){
var a=I[e].appid,s=I[e].path,l=I[e].imageUrl,c=I[e].title,u=I[e].elem,b=y[a];
if(b){
var j=u.tagName.toLowerCase(),k=u.firstChild&&1==u.firstChild.nodeType&&"IMG"===u.firstChild.tagName;
if(k=k||u.firstElementChild&&"IMG"===u.firstElementChild.tagName,"a"!=j)u.innerHTML=w.tmpl(_,{
imageUrl:o(l),
title:o(c),
nickname:o(b.nickname),
avatar:o(b.logo_url)
});else{
if(k){
var R=u.firstChild;
R&&h.addClass(u,"weapp_image_link");
}else h.addClass(u,"weapp_text_link");
u.href="javascript:void(0);";
}
var C=s.indexOf("?");
C>=0?s=s.slice(0,C)+(C>0?".html":"")+s.slice(C)+"&"+v:s+=(""!==s?".html?":"?")+v,
g.on(u,"a"==j?"click":"tap",function(){
if(r=function(){
var r=k?1:"a"==j?2:0,o={
userName:b.weapp_username,
scene:1058,
sceneNote:encodeURIComponent(location.href),
relativeURL:s
};
return void 0!==b.app_version&&(o.appVersion=b.app_version),t?(f.invoke("openWeApp",o,function(t){
return"openWeApp:ok"===t.err_msg?window.__addIdKeyReport&&window.__addIdKeyReport("28307",102):"system:function_not_exist"===t.err_msg?n?m(a,e,b.nickname,c,r):d(a,e,b.nickname,c,r):void i(107,new Error(t.err_msg),"");
}),window.__addIdKeyReport&&window.__addIdKeyReport("28307",100),p(a,e,b.nickname,c,3,r,k?2:0),
k&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",115),!1):n?m(a,e,b.nickname,c,r):d(a,e,b.nickname,c,r);
},k&&wxa_img_alert){
document.getElementById("js_minipro_dialog_name").innerText=b.nickname;
var o=document.getElementById("js_minipro_dialog");
return o.style.display="block",o._appid=a,o._i=e,o._nickname=b.nickname,o._title=c,
p(a,e,b.nickname,c,3,1,0),t&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",114),
!1;
}
return r();
},"a"==j);
}
})(b);
var j=null,k=function(){
j=null;
for(var e=window.innerHeight||document.documentElement.clientHeight,t=0;t<R.length;t++){
var n=R[t].elem,a=n.tagName.toLowerCase(),i=n.firstChild&&1==n.firstChild.nodeType,r=i?1:"a"==a?2:0,o=R[t].elem.getBoundingClientRect();
o.top<e&&o.bottom>0&&(setTimeout(function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307",101);
},0),p(R[t].appid,t,y[R[t].appid].nickname,R[t].title,2,r),R.splice(t--,1));
}
};
k(),g.on(window,"scroll",function(){
j||(j=setTimeout(k,100));
});
}catch(C){
i(106,C,"parsing weapp info error");
}
},
error:function(){}
});
}
function l(){
for(var e=0;e<v.length+y.length;e++){
var t=e<v.length,n=t?v[e]:y[e-v.length],a=n.getAttribute(t?"data-miniprogram-appid":"data-weapp-appid")||"",i=n.getAttribute(t?"data-miniprogram-path":"data-weapp-path")||"",p=n.getAttribute(t?"data-miniprogram-imageUrl":"data-weapp-imageUrl")||"",r=n.getAttribute(t?"data-miniprogram-title":"data-weapp-title")||"",o=document.createElement("span");
n.setAttribute("class",""),o.setAttribute("class","weapp_display_element js_weapp_display_element"),
I.push({
appid:a,
path:i,
imageUrl:p,
title:r,
elem:o
}),R.push({
appid:a,
elem:o,
title:r
}),n.parentNode.insertBefore(o,n.nextSibling);
}
for(var e=0;e<b.length;e++){
var d=b[e];
I.push({
appid:d.getAttribute("data-miniprogram-appid"),
path:d.getAttribute("data-miniprogram-path")||"",
elem:d
});
}
}
function c(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var _=e("pages/weapp_tpl.html.js"),u=e("biz_wap/utils/ajax.js"),g=e("biz_common/dom/event.js"),w=e("biz_common/tmpl.js"),f=e("biz_wap/jsapi/core.js"),h=e("biz_common/dom/class.js"),y=null,v=null,b=null,j={},I=[],k=[],R=[];
return r()?(l(),s(),j):void 0;
});define("appmsg/autoread.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","pages/voice_tpl.html.js","pages/voice_component.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
var e=d("autoread");
e&&(e.innerHTML='<p><label>朗读类型：</label>                                <select id="autoreadSelect">                                <option selected="true" value="0">女1</option>                                <option value="1">女2</option>                                <option value="2">男1</option>                                <option value="6">男2</option>                                </select></p><p id="autoread_voice"></p>',
r.on(d("autoreadSelect"),"change",function(){
p.player&&(p.player.destory(),p.player=null),p.checkAudioId&&(clearTimeout(p.checkAudioId),
p.checkAudioId=null);
var e=d("autoreadSelect");
d("autoread_voice").innerHTML="",o(e.value);
}),o(0));
}
function o(e){
var i=d("autoread_voice");
p._oMusic={
voiceid:p.voiceid,
duration_str:"",
posIndex:p.posIndex,
title:"文章朗读体验（"+p.voiceType[e||0]+"）",
nickname:window.nickname||"公众号"
},u.renderPlayer(s,p._oMusic,i,!0),d("voice_author_"+p.key).innerHTML="来自"+p._oMusic.nickname+"（创建音频中）",
c(e);
}
function n(e,i){
var o=p._oMusic;
d("voice_author_"+p.key).innerHTML="来自"+o.nickname,d("voice_duration_"+p.key).innerHTML=u.formatTime(1*i),
p.player=u.init({
protocal:"hls",
wxIndex:o.posIndex,
type:2,
songId:e,
src:a("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&media="+e),
allowPause:!0,
duration:i,
title:o.title,
singer:o.nickname?o.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:d("voice_main_"+p.key),
playArea:d("voice_play_"+p.key),
progress:d("voice_progress_"+p.key),
fileSize:o.fileSize,
playtimeDom:d("voice_playtime_"+p.key),
bufferDom:d("voice_buffer_"+p.key),
playdotDom:d("voice_playdot_"+p.key),
seekRange:d("voice_seekRange_"+p.key),
seekContainer:d("voice_main_"+p.key),
loadingDom:d("voice_loading_"+p.key)
});
}
function t(e){
p.curNum+=1;
var i=1e3;
p.curNum>p.maxNum&&(i=2e3);
var o=["/mp/msgvoice?action=get_media&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(o){
o.mediaid&&o.duration?n(o.mediaid,o.duration):p.checkAudioId=setTimeout(function(){
t(e);
},i);
},
error:function(){
p.checkAudioId=setTimeout(function(){
t(e);
},i);
}
});
}
function a(e){
return e+=["&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&uin=",window.uin||"","&key=",window.key||"","&pass_ticket=",window.pass_ticket||"","&clientversion=",window.clientversion||"","&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join("");
}
function c(e){
p.curNum=0;
var i=["/mp/msgvoice?action=tts&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:i,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?t(e):d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
},
error:function(){
d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
}
});
}
function d(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),s=e("pages/voice_tpl.html.js"),u=e("pages/voice_component.js"),m=e("biz_wap/utils/ajax.js"),p={
checkId:"",
voiceid:"autoread",
posIndex:0,
key:"autoread_0",
voiceType:{
0:"女1",
1:"女2",
2:"男1",
6:"男2"
},
maxNum:5,
curNum:0
};
i();
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","appmsg/log.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=a("js_content");
return e?(p._oElements=e.getElementsByTagName("mpvoice")||[],p._oElements.length<=0?!1:!0):!1;
}
function o(){
p.musicLen=p._oElements.length;
}
function n(){
for(var e=0,i=0;i<p.musicLen;i++){
var o=p._oElements[i],n={},c=o.getAttribute("voice_encode_fileid")||"";
try{
c=decodeURIComponent(c);
}catch(a){}
n.voiceid=r.encodeStr(c),n.voiceid=n.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
n.isaac=1*o.getAttribute("isaac2")||0,n.src=p.srcRoot.replace("#meidaid#",n.voiceid),
1===n.isaac&&(n.jsapi2Src=n.src+"&voice_type=1"),n.voiceid&&"undefined"!=n.voiceid&&(t(o,n,e),
e++);
}
}
function t(e,i,o){
i.duration=parseInt((1*e.getAttribute("play_length")||0)/1e3,10),i.duration_str=r.formatTime(i.duration),
i.posIndex=o;
var n=e.getAttribute("name")||"";
try{
n=decodeURIComponent(n);
}catch(t){}
i.title=r.encodeStr(n).replace(/^\s/,"").replace(/\s$/,""),i.fileSize=1*e.getAttribute("high_size")||0,
i.nickname=window.nickname,r.renderPlayer(d,i,e),c(i),p.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.voiceid+"_"+e.posIndex,o="";
if(window.voice_in_appmsg&&window.voice_in_appmsg[e.voiceid]){
var n=window.voice_in_appmsg[e.voiceid],t=window.biz||"",c=window.mid||"",d=window.idx||"";
n.bizuin&&n.appmsgid&&n.idx&&(t=n.bizuin,c=n.appmsgid,d=n.idx);
var p=window.location.protocol||"https:";
o=p+"//mp.weixin.qq.com/mp/audio?_wxindex_=#_wxindex_#&scene=104&__biz=#biz#&mid=#mid#&idx=#idx#&voice_id=#voice_id#&sn=#sn##wechat_redirect".replace("#_wxindex_#",e.posIndex).replace("#biz#",t).replace("#mid#",c).replace("#idx#",d).replace("#voice_id#",e.voiceid).replace("#sn#",n.sn||"");
}
s("[Voice] init"+o);
var m=r.decodeStr(e.title);
e.player=r.init({
wxIndex:e.posIndex,
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
jsapi2Src:e.jsapi2Src,
allowPause:!0,
duration:e.duration,
title:m,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:a("voice_main_"+i),
playArea:a("voice_play_"+i),
progress:a("voice_progress_"+i),
fileSize:e.fileSize,
playtimeDom:a("voice_playtime_"+i),
bufferDom:a("voice_buffer_"+i),
playdotDom:a("voice_playdot_"+i),
seekRange:a("voice_seekRange_"+i),
seekContainer:a("voice_main_"+i),
loadingDom:a("voice_loading_"+i),
detailArea:o?a("voice_detail_"+i):"",
detailUrl:o,
webUrl:o
});
}
function a(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var d=e("pages/voice_tpl.html.js"),s=e("appmsg/log.js"),r=e("pages/voice_component.js"),p={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return i()?(o(),n(),p.musicList):void 0;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(l._oElements=e.getElementsByTagName("qqmusic")||[],l._oElements.length<=0?!1:!0):!1;
}
function i(){
l.musicLen=l._oElements.length;
}
function s(){
for(var e=0,t=0;t<l.musicLen;t++){
var i=l._oElements[t],s={};
s.musicid=m.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
t.media_id=m.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=m.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=m.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=m.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=m.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=m.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=m.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
t.music_name=m.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
l.adapter[t.musictype]&&"function"==typeof l.adapter[t.musictype].initData&&(t=l.adapter[t.musictype].initData(t,{
scene:0
})),m.renderPlayer(n,t,e),a(t),l.musicList[t.musicid+"_"+t.posIndex]=t;
}
function a(e){
var t=e.musicid+"_"+e.posIndex;
c("[Music] init "+e.detailUrl);
var i=m.decodeStr(e.music_name);
e.player=m.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"QQ音乐",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:u("qqmusic_home_"+t)
});
}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var c=e("appmsg/log.js"),n=e("pages/qqmusic_tpl.html.js"),m=e("pages/voice_component.js"),l={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),l.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}catch(n){}
}
function i(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=d.video_top.length,o=e+d.innerHeight,n=0,s=0;t>s;s++){
var m=d.video_top[s];
m.reported?n++:o>=m.start&&o<=m.end&&(m.reported=!0,r.report({
step:1,
vid:m.vid
}));
}
n==t&&(a.off(window,"scroll",i),d.video_top=d.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o,n=e("biz_common/utils/url/parse.js"),r=e("new_video/ctl.js"),d={
videoIframeResizer:[],
txVideoReg:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},s=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),a=(m.setProperty,e("biz_common/dom/event.js")),c=document.getElementsByTagName("iframe"),p=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var l=Math.ceil(1e4*Math.random()),v=0,_=c.length;_>v;++v){
o=c[v];
var u=o.getAttribute("data-src")||"",w=o.className||"",f=o.getAttribute("src")||u;
if(!u||"#"==u){
var g=o.getAttribute("data-display-src");
if(g&&(0==g.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==g.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
g=g.replace(/&amp;/g,"&");
for(var h=g.split("&"),x=["/mp/newappmsgvote?action=show"],v=0;v<h.length;v++)(0==h[v].indexOf("__biz=")||0==h[v].indexOf("supervoteid="))&&x.push(h[v]);
x.length>1&&(u=x.join("&")+"#wechat_redirect");
}
}
if(f&&d.txVideoReg.test(f))if(s.isShowMpVideo()){
var y=n.getQuery("vid",u);
if(!y)continue;
var b=o.getAttribute("data-vw"),k=o.getAttribute("data-vh");
window.reportVid.push(y),d.video_iframe.push({
dom:o,
vid:y
}),f=["/mp/videoplayer?video_h=",k,"&video_w=",b,"&scene=",window.source,"&random_num=",l,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",y,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t,i,o){
return function(){
o.setAttribute("marginWidth",0),o.setAttribute("marginHeight",0),o.style.top="0",
o.setAttribute("src",i);
};
}(b,k,f,o),0);
}else d.videoIframeResizer.push(o);else if(u&&(u.indexOf("newappmsgvote")>-1&&w.indexOf("js_editor_vote_card")>=0||0==u.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&w.indexOf("card_iframe")>=0||u.indexOf("appmsgvote")>-1||u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&u.indexOf(window.biz)<0){
p.push(o);
continue;
}
if(u=u.replace(/^http:/,location.protocol),w.indexOf("card_iframe")>=0){
var j=u.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(j+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
o.setAttribute("src",j);
}else{
var z=u.indexOf("#wechat_redirect")>-1,O=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?O+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):w.indexOf("vote_iframe")>=0&&(O+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var j=z?u.replace("#wechat_redirect",O):u+O;
o.setAttribute("src",j);
}
-1==u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(o),o.appmsg_idx=v;
}
if(u&&u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&b>0){
var I=b,A=3*I/4;
o.width=I,o.height=A,o.style.setProperty&&(o.style.setProperty("width",I+"px","important"),
o.style.setProperty("height",A+"px","important"));
}
}
for(var H=0;H<p.length;H++){
var R=p[H];
R.parentNode.removeChild(R);
}
if(d.videoIframeResizer&&d.videoIframeResizer.length>0&&"function"==typeof window.__getVideoWh&&a.on(window,"resize",function(){
try{
for(var e=0,t=d.videoIframeResizer.length;t>e;e++){
var i=d.videoIframeResizer[e],o=i.contentDocument,n=o.getElementById("mod_player"),r=o.getElementById("mod_tenvideo_video_player_0");
if(n&&r){
var s=window.__getVideoWh(i);
i.style.width=s.w+"px",i.style.height=s.h+"px",n.style.width=s.vw+"px",n.style.height=s.vh+"px",
r.style.width=s.vw+"px",r.style.height=s.vh+"px";
}
}
}catch(m){}
},!1),window.iframe_reload=function(){
for(var e=0,i=c.length;i>e;++e){
o=c[e];
var n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var q,E=document.getElementsByClassName("video_iframe"),v=0;q=E.item(v++);)q.setAttribute("scrolling","no"),
q.style.overflow="hidden";
d.video_iframe.length>0&&setTimeout(function(){
for(var e=d.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var r=e[o];
if(!r||!r.dom)return;
for(var s=r.dom,m=s.offsetHeight,c=0;s&&t!==s;)c+=s.offsetTop,s=s.offsetParent;
d.video_top.push({
start:c+m/2,
end:c+m/2+d.innerHeight,
reported:!1,
vid:r.vid
});
}
i(),a.on(window,"scroll",i);
},0);
});define("appmsg/product.js",["biz_common/dom/event.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=window.innerHeight||document.documentElement.clientHeight,o=0;o<d.length;++o){
var n=d[o];
if(!n.isReport){
var r=n.offsetTop;
r>=e&&e+t>=r&&(n.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+n.product_id+"&order="+n.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),r=document.getElementsByClassName("js_product_a"),d=[],i=0;i<n.length;++i){
var s=n[i];
s.dataset&&s.dataset.product_id&&s.dataset.order&&d.push({
dom:s,
offsetTop:s.offsetTop,
product_id:s.dataset.product_id||"",
order:s.dataset.order||"",
isReport:!1
});
}
d.length>0&&(o.on(window,"scroll",t),t());
for(var i=0;i<r.length;++i)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(r[i]);
}
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/cdn_img_lib.js"],function(t){
"use strict";
function e(t,e){
r.invoke("imagePreview",{
current:t,
urls:e
},function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),o("[Appmsg] click image, src: "+t);
}
function a(t,e){
p({
url:"/mp/rewardappmsgreport",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
oper:e||"",
cdn_url:t||"",
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0
});
}
function i(t){
var i=[],r=t.container,o=t.imgs||[];
if(r)for(var p=r.getElementsByTagName("img")||[],d=0,m=p.length;m>d;d++)o.push(p.item(d));
for(var g=c.isIOS&&1==window._copyright_stat&&1==window.is_need_reward,u=0,d=0,m=o.length;m>d;d++){
var w=o[d],_=w.getAttribute("data-src")||w.getAttribute("src"),l=w.getAttribute("data-type");
if(_&&!_.isGif()&&0!=_.indexOf("data:")){
for(;-1!=_.indexOf("?tp=webp");)_=_.replace("?tp=webp","");
w.dataset&&w.dataset.s&&_.isCDN()&&(_=_.replace(/\/640$/,"/0"),_=_.replace(/\/640\?/,"/0?")),
_.isCDN()&&(_=n.addParam(_,"wxfrom","3",!0)),_=t.is_https_res?_.http2https():_.https2http(),
l&&(_=n.addParam(_,"wxtype",l,!0)),i.push(_),function(t){
s.on(w,"click",function(s){
s&&s.target&&s.target.className&&s.target.className.indexOf("img_loadederror")>-1||(e(t,i),
g&&0==u&&a(s.target.src,2));
});
}(_);
}
}
if(g){
var f=document.getElementById("js_content"),b=0,j=0;
s.on(f,"touchstart",function(t){
return t&&t.target&&t.target.tagName&&"string"==typeof t.target.tagName&&"IMG"==t.target.tagName.toString().toUpperCase()?(u=+new Date,
b=t.touches[0].pageX,void(j=t.touches[0].pageY)):void(u=0);
}),s.on(f,"touchmove",function(t){
var e=t.touches[0].pageX,a=t.touches[0].pageY;
Math.abs(e-b)>10&&Math.abs(a-j)>10&&(u=0);
}),s.on(f,"touchend",function(t){
0!=u&&(+new Date-u>800&&+new Date-u<6e3?a(t.target.src,1):u=0);
});
}
}
var s=t("biz_common/dom/event.js"),r=t("biz_wap/jsapi/core.js"),n=t("biz_common/utils/url/parse.js"),o=t("appmsg/log.js"),p=t("biz_wap/utils/ajax.js"),c=t("biz_wap/utils/mmversion.js");
return t("appmsg/cdn_img_lib.js"),i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var r=n.getElementsByTagName("a")||[],i=0,o=r.length;o>i;++i)!function(n){
var i=r[n],o=i.getAttribute("href");
if(!o)return!1;
var a=0,c=i.innerHTML;
/^[^<>]+$/.test(c)?a=1:/^<img[^>]*>$/.test(c)&&(a=2),!!e.changeHref&&(o=e.changeHref(o,a)),
t.on(i,"click",function(){
return location.href=o,!1;
},!0);
}(i);
}
var t=e("biz_common/dom/event.js");
return n;
});define("appmsg/copyright_report.js",["biz_common/dom/event.js"],function(t){
"use strict";
function o(t){
var o=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",t.scene,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join("");
window.isSg&&(o+="&from=sougou");
var e=new Image;
e.src=o.substr(0,1024);
}
function e(){
var t=__appmsgCgiData;
if("2"==t.copyright_stat){
for(var o=r("copyright_info"),e=r("js_article");o&&e!==o;)c.copyright_top+=o.offsetTop,
o=o.offsetParent;
i.on(window,"scroll",n);
}
}
function n(){
var t=window.pageYOffset||document.documentElement.scrollTop;
t+c.innerHeight>c.copyright_top&&(o({
scene:"1",
card_pos:"0"
}),i.off(window,"scroll",n),n=c.copyright_top=null);
}
function r(t){
return document.getElementById(t);
}
var i=t("biz_common/dom/event.js"),c={
innerHeight:window.innerHeight||document.documentElement.clientHeight,
copyright_top:0
};
return{
card_click_report:o,
card_pv_report:e
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","biz_common/dom/class.js","appmsg/img_copyright_tpl.html.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","biz_wap/utils/mmversion.js","pages/version4video.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js"],function(e,t,r,n){
"use strict";
function i(e,t){
var r=w.getQuery("vid",t);
if(r&&e){
var n=e.parentNode;
if(n){
for(var i=[],a=0,s=n.children.length;s>a;a++){
var d=n.children[a];
d.className.indexOf("img_loading")>=0&&d.getAttribute("data-vid")==r&&i.push(d);
}
for(var a=0,s=i.length;s>a;a++)n.removeChild(i[a]);
e.style.display="block";
}
}
}
function a(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},r=e.img_copy_info.list,n=window.__appmsgCgiData.copyright_stat,i=window.__appmsgCgiData.source_biz,a=0,s=r.length;s>a;a++){
var d=r[a];
if(2==d.type){
if(2==n&&i==d.source_uin)continue;
t[d.img_url]={
source_nickname:d.source_nickname,
source_uin:d.source_uin,
source_encode_biz:d.source_encode_biz||""
};
}
}
for(var o=document.getElementsByTagName("img"),a=0,s=o.length;s>a;a++){
var d=o[a],_=d.getAttribute("data-src")||d.getAttribute("data-backsrc")||"";
if(t[_]){
var m=document.createElement("div");
m.innerHTML=x.tmpl(u,t[_]);
{
var c=m.children[0],p=d.parentNode,l=p.insertBefore(c,d),w=l.children[0];
(function(e,t){
j.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(E.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}),!1);
});
})(t[_],w);
}
l.insertBefore(d,w);
}
}
}
}
function s(e){
if(T&&T.length>0)for(var t,r,n,i=0,a=T.length;a>i;++i)t=T[i],r=t.iframe,n=t.src,
e&&(n=n.replace(/\&encryptVer=[^\&]*/gi,""),n=n.replace(/\&platform=[^\&]*/gi,""),
n=n.replace(/\&cKey=[^\&]*/gi,""),n=n+"&encryptVer=6.0&platform=61001&cKey="+e),
r.setAttribute("src",n);
}
function d(t){
var r=t.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=r),r.show&&(!function(){
var e=document.getElementById("js_read_area3"),t=document.getElementById("like3");
e.style.display="block",t.style.display="inline",r.liked=window.is_temp_url?window.liked:r.liked,
r.liked&&I.addClass(t,"praised"),t.setAttribute("like",r.liked?"1":"0");
var n=document.getElementById("likeNum3"),i=document.getElementById("readNum3"),a=window.is_temp_url?window.read_num:r.read_num,s=window.is_temp_url?window.like_num:r.like_num;
a||(a=1),s||(s="赞"),parseInt(a)>1e5?a="100000+":"",parseInt(s)>1e5?s="100000+":"",
i&&(i.innerHTML=a),n&&(n.innerHTML=s);
}(),e("appmsg/like.js"));
var i=document.getElementById("js_share_appmsg");
if(t.share_redirect_url&&i&&(window._share_redirect_url=t.share_redirect_url,i.innerHTML=x.tmpl(y,{
url:t.share_redirect_url
})),1==t.comment_enabled&&(window.can_fans_comment_only=t.only_fans_can_comment,
e("appmsg/comment.js")),window._has_comment||0!=window.adDatas.num||window._share_redirect_url||g.addClass(document.body,"rich_media_empty_extra"),
-1==h.indexOf("WindowsWechat")&&-1!=h.indexOf("MicroMessenger"))if(q.isIOS){
if(1==t.reward.can_reward&&1==t.reward.user_can_reward)if(1==t.reward.is_ios_reward_open){
document.getElementById("js_reward_qrcode")&&(document.getElementById("js_reward_qrcode").style.display="block");
var a=document.getElementById("js_reward_qrcode_img"),s="/wap/rewardqrcode?sn="+sn+"&t="+t.reward.reward_qrcode_ticket+"&pass_ticket="+pass_ticket;
a&&a.setAttribute("src",s);
}else document.getElementById("js_reward_close")&&(document.getElementById("js_reward_close").style.display="block");
}else c=e("appmsg/reward_entry.js"),c.handle(t.reward,_());
1==t.reward_entrance_enable_for_preview&&(q.isIOS?1==t.is_ios_reward_open?(document.getElementById("js_preview_reward_qrcode")&&(document.getElementById("js_preview_reward_qrcode").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_ios_wording")&&(document.getElementById("js_preview_reward_ios_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_ios_wording").style.display="block")):document.getElementById("js_preview_reward_close")&&(document.getElementById("js_preview_reward_close").style.display="block"):(document.getElementById("js_preview_reward")&&(document.getElementById("js_preview_reward").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_wording")&&(document.getElementById("js_preview_reward_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_wording").style.display="block"),j.on(document.getElementById("js_preview_reward_link"),"tap",function(e){
e.preventDefault(),n("预览状态下无法操作。");
}))),t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
j.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),n("预览状态下无法操作。");
}));
}
function o(){
var t="";
T&&T.length>0&&(t="&is_need_ticket=1");
var r=A.checkNeedAds(),n=r.is_need_ad,i=(r._adInfo,r.both_ad),o=-1!=location.href.indexOf("mock_ad=");
o&&(r.is_need_ad=n=1),z("[Appmsg] start get asycn data, is_need_ad:"+n);
var m=window.new_appmsg&&1==_copyright_stat?1:0;
k({
url:"/mp/getappmsgext?__biz="+biz+"&appmsg_type="+appmsg_type+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&abtest_cookie="+abtest_cookie+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+t+"&is_need_ad="+n+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+i+"&reward_uin_count="+(is_need_reward?3*_():0)+(window.send_time?"&send_time="+send_time:"")+"&msg_daily_idx="+msg_daily_idx+"&is_original="+m,
data:{
is_only_read:is_only_read,
req_id:window.req_id||"",
pass_ticket:pass_ticket,
is_temp_url:window.is_temp_url||0
},
type:"POST",
dataType:"json",
rtId:"27613",
rtKey:"50",
rtDesc:B,
async:!0,
success:function(t){
if(z("[Appmsg] success get async data"),t){
try{
if(o){
var n=e("a/testdata.js");
t.advertisement_info=n.getAd(),t.advertisement_num=t.advertisement_info.length;
}
if(t&&t.base_resp&&t.base_resp.wxtoken&&(window.wxtoken=t.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
s(t.appmsgticket?t.appmsgticket.ticket:""),a(t),t.ret)return;
A.afterGetAdData(r,t),window.wx_user_can_reward=t.user_can_reward,d({
appmsgstat:t.appmsgstat,
comment_enabled:t.comment_enabled,
only_fans_can_comment:t.only_fans_can_comment,
reward:{
reward_total:t.reward_total_count,
reward_head_imgs:t.reward_head_imgs||[],
can_reward:t.can_reward,
user_can_reward:t.user_can_reward,
reward_qrcode_ticket:t.reward_qrcode_ticket,
is_ios_reward_open:t.is_ios_reward_open,
timestamp:t.timestamp
},
reward_entrance_enable_for_preview:t.reward_entrance_enable_for_preview,
reward_wording:t.reward_wording,
is_ios_reward_open:t.is_ios_reward_open,
comment_entrance_enable_for_preview:t.comment_entrance_enable_for_preview,
share_redirect_url:t.share_redirect_url||""
});
}catch(i){
z("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var _=new Image;
return _.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(i.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(i));
}
z("[Appmsg] success get async data, async data is: "+JSON.stringify(t));
}
},
error:function(){
z("[Appmsg] error get async data, biz="+biz+", mid="+mid);
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function _(){
return j.on(window,"resize",function(){
m(),c&&c.render(_());
}),m();
}
function m(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(r){}
var n=30,i=34,a=Math.floor(.9*(e-n)/i);
return window.new_appmsg&&(a=Math.floor(.8*(e-60)/i)),document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=a*i+"px"),
_=function(){
return a;
},a;
}
e("biz_common/utils/string/html.js");
var c,p,l=e("pages/video_ctrl.js"),w=e("biz_common/utils/url/parse.js"),g=e("biz_common/dom/class.js"),u=e("appmsg/img_copyright_tpl.html.js"),y=e("appmsg/share_tpl.html.js"),f=!1,h=navigator.userAgent,v=-1!=h.indexOf("MicroMessenger"),j=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),b=200,k=e("biz_wap/utils/ajax.js"),I=e("biz_common/dom/class.js"),E=e("biz_wap/jsapi/core.js"),x=e("biz_common/tmpl.js"),z=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),B=e("rt/appmsg/getappmsgext.rt.js"),A=e("a/a.js"),q=e("biz_wap/utils/mmversion.js"),O=document.getElementsByTagName("iframe"),M=document.getElementById("js_content"),T=[],W=M.offsetWidth,D=W/l.getRatio();
window.logs.video_cnt=0;
for(var C=0,N=O.length;N>C;++C){
p=O[C];
var R=p.getAttribute("data-src")||"",K=p.getAttribute("src")||R;
if(K){
var S=e("pages/version4video.js");
if(0==K.indexOf("http://z.weishi.com/weixin/player.html"))K=K.replace(/width=\d+/g,"width="+W),
K=K.replace(/height=\d+/g,"height="+D),p.width=W,p.height=D,p.style.setProperty&&(p.style.setProperty("width",W+"px","important"),
p.style.setProperty("height",D+"px","important")),p.setAttribute("src",K),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(K)){
S.isShowMpVideo()||(!function(e,t){
e.onload=function(){
i(this,t);
};
}(p,K),v?T.push({
iframe:p,
src:K
}):p.setAttribute("src",K),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10)),
window.logs.video_cnt++;
continue;
}
}
}
var H=document.getElementById("js_toobar3"),L=window.innerHeight||document.documentElement.clientHeight,P=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=H.offsetTop;
e+L+b>=t&&(o(),j.off(window,"scroll",P));
};
f?(j.on(window,"scroll",P),P()):o();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,a=this.offset||20,s=0;
if("wifi"==window.networkType){
var m={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(m=this.lazyloadHeightWhenWifi()),a=Math.max(m.bottom*e,a),
s=Math.max(m.top*e,s);
}
for(var c=+new Date,d=[],g=this.sw,u=this,p=-1,w=0,A=t.length;A>w;w++)!function(t,e){
var m=n(t.el),c=t.src;
if(c){
(c.match(/\:\/\/[^\/]+\/mmbiz\//)&&c.indexOf("wx_fmt=gif")>-1||c.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&p++;
var u=s,w=a;
(c.match(/\:\/\/[^\/]+\/mmbiz\//)&&c.indexOf("wx_fmt=gif")>-1||c.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&f&&(u=0,
w=20),!t.show&&(i>=m&&i<=m+t.height+u||m>i&&i+o+w>m)&&(e.inImgRead&&(i>=m&&i<=m+t.height||m>i&&i+o>m)&&e.inImgRead(c,networkType),
e.changeSrc&&(c=e.changeSrc(t.el,c,p)),t.el.onerror=function(){
var i=this;
!!e.onerror&&e.onerror(t.el.src,i);
},t.el.onload=function(){
var i=this;
if("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="!=i.src){
var o=i.getAttribute("data-forceheight");
o?(i.removeAttribute("data-forceheight"),l(i,"height",o,"important")):l(i,"height","auto","important"),
i.getAttribute("_width")?l(i,"width",i.getAttribute("_width"),"important"):l(i,"width","auto","important"),
!!e.onload&&e.onload(t.el.src,i);
}
},h(t.el,"src",c),d.push(c),t.show=!0,l(t.el,"visibility","visible","important")),
r.isWp&&1*t.el.width>g&&(t.el.width=g);
}
}(t[w],u);
d.length>0&&this.detect&&this.detect({
time:c,
loadList:d,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,a=this.attrKey||"data-src",n=o.offsetWidth,r=0,s=this.imgOccupied||!1;
o.currentStyle?r=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(r=getComputedStyle(o).width),
this.sw=1*r.replace("px","");
for(var m=0,d=t.length;d>m;m++){
var f=t.item(m),g=h(f,a),u=h(f,"src");
if(g&&!(u&&u.indexOf("data:image/gif;base64")<0)){
var p=100;
if(f.dataset&&f.dataset.ratio){
var w=1*f.dataset.ratio,A=1*f.dataset.w||n;
"number"==typeof w&&w>0?(A=n>=A?A:n,p=A*w,s||(f.style.width&&f.setAttribute("_width",f.style.width),
l(f,"width",A+"px","important"),l(f,"visibility","visible","important"),f.setAttribute("src",c))):l(f,"visibility","hidden","important");
}else l(f,"visibility","hidden","important");
s||l(f,"height",p+"px","important"),e.push({
el:f,
src:g,
height:p,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),this.__called_first_time?(i.call(e,t),this.__called_first_time=!1):e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function a(t){
s.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),s.on(document,"touchmove",function(i){
o.call(t,i);
}),t.__called_first_time=!0,o.call(t,{});
}
function n(t){
for(var i=t.offsetTop;t=t.offsetParent;)i+=t.offsetTop;
return i>=111&&(i-=111),i;
}
var r=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),m=t("biz_common/dom/attr.js"),h=m.attr,l=m.setProperty,c=t("biz_common/ui/imgonepx.js"),d=new Date,f=(d.getHours(),
!0);
return a;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function i(e,i){
var n="",o="";
try{
""!=tid&&(o="tid="+tid+"&aid=54");
var t=e.split("?")[1]||"";
if(t=t.split("#")[0],""==t);else{
var s=[t,"mpshare=1","scene="+i,"srcid="+srcid];
""!=o&&s.push(o),t=s.join("&"),n=e.split("?")[0]+"?"+t+"#"+(e.split("#")[1]||"");
}
}catch(m){
n="";
}
return n||(n=location.href+"#wechat_redirect",(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_47_1&lc=1&log0=[share_link]["+encodeURIComponent(location.href)+"]["+encodeURIComponent(e)+"]["+encodeURIComponent(msg_link)+"]"),
n;
}
function n(e,i,n){
var o=e.split("?").pop();
if(o=o.split("#").shift(),""!=o){
var t=[o,"action=share","action_type="+n,"scene="+window.source,"ascene="+(window.ascene||-1),"req_id="+(window.req_id||""),"vid="+("undefined"!=typeof window.reportVid?window.reportVid.join(";"):""),"musicid="+("undefined"!=typeof window.reportMid?window.reportMid.join(";"):""),"voiceid="+("undefined"!=typeof window.reportVoiceid?window.reportVoiceid.join(";"):""),"weappid="+("undefined"!=typeof window.reportWeappid?window.reportWeappid.join(";"):"")].join("&");
m({
url:"/mp/appmsgreport",
type:"POST",
data:t
});
}
}
function o(e,i){
return e.isCDN()&&(e=t.addParam(e,"wxfrom",i,!0)),e;
}
e("biz_common/utils/string/html.js"),e("appmsg/cdn_img_lib.js");
var t=(e("biz_common/dom/event.js"),e("biz_common/utils/url/parse.js")),s=e("biz_wap/utils/mmversion.js"),m=e("biz_wap/utils/ajax.js"),r={
90041:"此标题包含夸大误导信息",
20012:"此标题包含低俗恶俗性内容"
},a={
90041:"标题使用夸大、煽动、低俗等词语造成误导或引人不适。",
20012:"标题使用低俗或恶俗性词语造成不正当影响或引人不适。"
},c=e("biz_wap/jsapi/core.js");
c.call("hideToolbar"),c.call("showOptionMenu");
var l=msg_title.htmlDecode(),d=(msg_source_url.htmlDecode(),""),u=msg_cdn_url||ori_head_img_url||round_head_img,p=u,_=msg_link.htmlDecode(),l=msg_title.htmlDecode(),h=msg_desc.htmlDecode();
h=h||_,h=h.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(h=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
u.isCDN()&&(u=u.replace(/\/0$/,"/300"),u=u.replace(/\/0\?/,"/300?")),p.isCDN()&&(p=p.replace(/\/0$/,"/640"),
p=p.replace(/\/0\?/,"/640?")),malicious_title_reason_id&&(l=r[malicious_title_reason_id],
h=a[malicious_title_reason_id],u="https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png"),
"1"==is_limit_user&&c.call("hideOptionMenu"),window.is_temp_url&&c.invoke("hideMenuItems",{
menuList:["menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:qzone","menuitem:share:weibo","menuItem:share:WeiboApp","menuItem:share:QZone","menuitem:facebook","menuItem:copyUrl","menuItem:share:email","menuitem:copy_url"]
},function(){}),c.on("menu:share:appmessage",function(e){
var t=1,s=o(u,"1");
e&&"favorite"==e.scene&&(t=24,s=o(u,"4")),c.invoke("sendAppMessage",{
appid:d,
img_url:s,
img_width:"640",
img_height:"640",
link:i(_,t),
desc:h,
title:l
},function(){
n(_,fakeid,t);
});
}),c.on("menu:share:timeline",function(){
var e=u;
s.isIOS||(e=o(u,"2")),n(_,fakeid,2),c.invoke("shareTimeline",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(_,2),
desc:h,
title:l
},function(){});
});
c.on("menu:share:weiboApp",function(){
c.invoke("shareWeiboApp",{
img_url:u,
link:i(_,3),
title:l
},function(){
n(_,fakeid,3);
});
}),c.on("menu:share:facebook",function(){
n(_,fakeid,7),c.invoke("shareFB",{
img_url:p,
img_width:"640",
img_height:"640",
link:i(_,43),
desc:h,
title:l
},function(){});
}),c.on("menu:share:QZone",function(){
var e=o(u,"6");
n(_,fakeid,5),c.invoke("shareQZone",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(_,22),
desc:h,
title:l
},function(){});
}),c.on("menu:share:qq",function(){
var e=o(u,"7");
n(_,fakeid,5),c.invoke("shareQQ",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(_,23),
desc:h,
title:l
},function(){});
}),c.on("menu:share:email",function(){
n(_,fakeid,5),c.invoke("sendEmail",{
content:i(_,5),
title:l
},function(){});
}),c.on("sys:record",function(){
c.invoke("recordHistory",{
link:_,
title:l,
source:nickname,
img_url:u
},function(){});
}),c.invoke("hideMenuItems",{
menuList:["menuItem:readArticle"]
},function(e){
console.log("hideMenuItems call",e);
});
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
function t(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=gif")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_gif\//)&&-1==t.indexOf("/s640");
}
function i(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=png")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_png\//);
}
function n(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=jpg")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_jpg\//);
}
function p(t){
return t.indexOf("tp=webp")>-1;
}
function r(t){
return t.indexOf("tp=wxpic")>-1;
}
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qpic.cn/");
},String.prototype.https2http=function(){
var t=this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
return t=t.replace(/https:\/\/mmbiz\.qpic\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/");
},String.prototype.nogif=function(){
var i=this.toString();
return t(i)?i.replace(/\/\d+\?/g,"/s640?").replace(/\/\d+\//g,"/s640/").replace(/\/\d+\./g,"/s640.").replace("wx_fmt=gif",""):i;
},String.prototype.isGif=function(){
var i=this.toString();
return t(i);
},String.prototype.isWxpic=function(){
var t=this.toString();
return r(t);
},String.prototype.isWebp=function(){
var t=this.toString();
return p(t);
},String.prototype.getImgType=function(){
var e=this.toString();
return t(e)?"gif":p(e)?"webp":r(e)?"wxpic":i(e)?"png":n(e)?"jpg":"unknow";
},String.prototype.imgChange640=function(){
var t=this.toString();
t=t.replace(/(\?tp=webp)|(\?tp=wxpic)|(&tp=webp)|(&tp=wxpic)/g,"");
var i=new Date;
return i.setFullYear(2014,9,1),t.isCDN()&&1e3*ct>=i.getTime()&&!t.isGif()&&(t=t.replace(/\/0$/,"/640"),
t=t.replace(/\/0\?/,"/640?"),t=t.replace(/\/0\./,"/640.")),t;
};
});define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var e=r.length,n=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?e:t,n=-1==n?t:n;
var a=r.substr(0,n),i=r.substr(n+1,t-n-1),s=r.substr(t+1);
return{
host:a,
query_str:i,
hash:s
};
}
function e(e,n){
var t=r(e),a=t.query_str,i=[];
for(var s in n)n.hasOwnProperty(s)&&i.push(s+"="+encodeURIComponent(n[s]));
return i.length>0&&(a+=(""!=a?"&":"")+i.join("&")),t.host+(""!=a?"?"+a:"")+(""!=t.hash?"#"+t.hash:"");
}
function n(r,e,n,t){
r=r||location.href;
var a=r.indexOf("&"),i=r.length,s=r.replace(/^[\w\d]+:[\/\\]+/g,"").split("").reverse();
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,e){
var n;
if(null==this)throw new TypeError('"this" is null or not defined');
var t=Object(this),a=t.length>>>0;
if(0===a)return-1;
var i=+e||0;
if(1/0===Math.abs(i)&&(i=0),i>=a)return-1;
for(n=Math.max(i>=0?i:a-Math.abs(i),0);a>n;){
if(n in t&&t[n]===r)return n;
n++;
}
return-1;
});
var o=i-1-s.indexOf("/");
-1!=a&&-1==r.indexOf("?")&&a>o&&(r=r.replace("&","?"));
var u=new RegExp("([\\?&]"+e+"=)[^&#]*");
if(!r.match(u)){
var h=r.indexOf("?");
return-1==h?r+"?"+e+"="+n:h==r.length-1?r+e+"="+n:r+"&"+e+"="+n;
}
return t===!0?r.replace(u,"$1"+n):r;
}
function t(r){
var e=arguments[1]||window.location.search,n=new RegExp("(^|&)"+r+"=([^&]*)(&|$)"),t=e.substr(e.indexOf("?")+1).match(n);
return null!=t?t[2]:"";
}
return{
parseUrl:r,
join:e,
addParam:n,
getQuery:t
};
});