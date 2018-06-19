define("pages/qqmusic_ctrl.js",["biz_common/utils/monitor.js","pages/player_adaptor.js","pages/loadscript.js"],function(e){
"use strict";
function t(e,t){
if(/^http(s)?:\/\//i.test(e.albumurl)){
for(var r,a=[/^http(s)?:\/\/imgcache\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/y\.gtimg\.cn([\/?].*)*$/i],i=!1,o=0;r=a[o++];)if(r.test(e.albumurl)){
i=!0;
break;
}
i||(e.albumurl="");
}else{
var s=e.albumurl.split("/");
try{
s=s[s.length-1],s=s.split(".")[0];
}catch(n){
s="";
}
e.albumurl=s?m.imgroot2.replace("#mid#",s):m.imgroot+e.albumurl;
}
return e.musicIcon=m.musicIcon,e.type=1*t.scene===0?0:1*t.scene===1?1:8,c.inQMClient?(e.allowPause=!0,
e.detailUrl="",e.pauseCss="qqmusic_playing_pause",e.webUrl=e.detailUrl):(e.allowPause=!1,
e.pauseCss="",e.detailUrl=["http://i.y.qq.com/v8/playsong.html?referFrom=music.qq.com&songid=",e.musicid,"&songmid=",e.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join(""),
e.webUrl=e.detailUrl),e;
}
function r(e,t){
var r=e,a=m.cache[r.songId];
return c.inQMClient?void t.callback({
canplay:!0,
play_url:"https://www.qq.com"
}):a&&"function"==typeof t.callback?void t.callback(a):void(m.submiting[r.songId]!==!0&&(m.submiting[r.songId]=!0,
i({
id:r.songId,
mid:r.mid,
onSuc:function(e){
m.submiting[r.songId]=!1,m.cache[r.songId]=e,"function"==typeof t.callback&&t.callback(e);
},
onError:function(){
m.submiting[r.songId]=!1,"function"==typeof t.callback&&t.callback({
canplay:!1,
msg:"系统繁忙，请稍后再试。返回码：-1",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var t=!0,r="";
switch(1*e){
case 0:
t=!0;
break;

case 1:
t=!1,r="该歌曲版权已过期，无法播放。";
break;

case 2:
t=!1,r="抱歉，应版权方要求，当前国家或地区暂不提供此歌曲服务。";
break;

case 3:
t=!1,r="该歌曲版权已过期，无法播放。";
break;

case 4:
t=!1,r="抱歉，歌曲信息不正确。";
break;

case 5:
t=!1,r="系统错误，请稍后再试。";
break;

case 6:
t=!1,r="系统错误，请稍后再试。";
break;

default:
t=!1,r="系统错误，请稍后再试。";
}
return r&&(r+="错误码："+e),{
canplay:t,
msg:r
};
}
function i(e){
s.setSum(m.reportId,18,1),s.send();
var t=+new Date,r="//open.music.qq.com/fcgi-bin/fcg_music_get_song_info_weixin.fcg?song_id=#songid#&mid=#mid#&format=json&app_id=1034002693&app_key=cjjDaueOyPYRJFeTqG&device_id=weixin&file_type=mp3&qqmusic_fromtag=50&callback=get_song_info_back";
r=r.replace("#mid#",e.mid).replace("#songid#",e.id),n({
url:r,
timeout:1e4,
callbackName:"get_song_info_back",
callback:function(r){
var i=+new Date-t;
if(!r||"undefined"==typeof r.ret){
var s=1;
return o({
type:"error",
time:i,
code:s
}),void("function"==typeof e.onError&&e.onError({
errcode:s
}));
}
var c;
c=0==r.ret?r.play_url?0:6:1001==r.ret?1:1002==r.ret?2:1003==r.ret?3:1004==r.ret?4:5,
o({
type:"success",
time:i,
code:c
});
var n=a(1*c);
e.onSuc({
canplay:n.canplay,
msg:n.msg,
status:c,
play_url:r.play_url||"",
duration:r.song_play_time||0
});
},
onerror:function(r){
var a=+new Date-t,i=4;
switch(1*r){
case 400:
i=2;
break;

case 500:
i=3;
break;

default:
i=4;
}
o({
type:"error",
time:a,
code:i
}),"function"==typeof e.onError&&e.onError({
errcode:i
});
}
});
}
function o(e){
var t=Math.max(e.time,0);
if(t=Math.min(t,6e4),e.time>=0&&e.time<200?s.setSum(m.reportId,24,1):e.time>=200&&e.time<500?s.setSum(m.reportId,25,1):e.time>=500&&e.time<1e3?s.setSum(m.reportId,26,1):e.time>=1e3&&e.time<2e3?s.setSum(m.reportId,27,1):e.time>=2e3&&e.time<1e4?s.setSum(m.reportId,28,1):e.time>=1e4&&s.setSum(m.reportId,29,1),
s.setAvg(m.reportId,23,t),"error"==e.type){
switch(1*e.code){
case 1:
s.setSum(m.reportId,9,1);
break;

case 2:
s.setSum(m.reportId,10,1);
break;

case 3:
s.setSum(m.reportId,11,1);
break;

case 4:
s.setSum(m.reportId,12,1);
}
s.setSum(m.reportId,19,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
s.setSum(m.reportId,8,1);
break;

case 0:
s.setSum(m.reportId,17,1);
break;

case 2:
s.setSum(m.reportId,13,1);
break;

case 3:
s.setSum(m.reportId,14,1);
break;

case 4:
s.setSum(m.reportId,15,1);
break;

case 5:
s.setSum(m.reportId,16,1);
break;

case 6:
s.setSum(m.reportId,47,1);
}
s.setSum(m.reportId,20,1);
}
s.send();
}
var s=e("biz_common/utils/monitor.js"),c=e("pages/player_adaptor.js"),n=e("pages/loadscript.js"),m={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_68",
imgroot2:"https://y.gtimg.cn/music/photo_new/T002R68x68M000#mid#.jpg",
reportId:"28306",
musicIcon:window.icon_qqmusic_source||"",
cache:{},
submiting:{}
};
return{
initData:t,
getPlayUrl:r
};
});define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","pages/player_adaptor.js","biz_common/dom/class.js","pages/report.js","biz_common/utils/monitor.js","pages/music_report_conf.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e,t,a,o){
"use strict";
function r(){
C.hasInit||(p(),s(),c(),C.hasInit=!0);
}
function n(e){
r(),this._o={
protocal:"",
wxIndex:0,
type:0,
comment_id:"",
src:"",
jsapi2Src:"",
mid:"",
songId:"",
otherid:"",
albumid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
appPlay:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:[location.protocol,"//mp.weixin.qq.com/s?referFrom=#referFrom#&songid=#songId#&__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
musicbar_url:"",
playingCss:"",
pauseCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:"",
fileSize:0,
playtimeDom:"",
loadingDom:"",
bufferDom:"",
playdotDom:"",
seekRange:"",
seekContainer:""
},this._init(e),C.allComponent.push(this);
}
function i(e,t,a,o){
C.num++,t.musicSupport=C.musicSupport,t.show_not_support=!1,C.musicSupport||1!=C.num||(t.show_not_support=!0);
var r=document.createElement("div"),n="";
if(n=h.tmpl(e,t),r.innerHTML=n,o===!0)a.appendChild(r.children[0]);else{
var i=a.parentNode;
if(!i)return;
i.lastChild===a?i.appendChild(r.children[0]):i.insertBefore(r.children[0],a.nextSibling);
}
}
function s(){
C.hasInit||v.inQMClient&&l("QMClient_pv",1);
}
function p(){
window.reportMid=[],window.reportVoiceid=[];
for(var e in I)if(I.hasOwnProperty(e)){
var t=I[e],a=t.split("_");
C.reportData2[e]={
id:a[0],
key:a[1],
count:0
};
}
}
function l(e,t){
C.reportData2[e]&&(t=t||1,C.reportData2[e].count+=t,C.debug&&console.log("addpv:"+e+" count:"+C.reportData2[e].count));
}
function c(){
f.on(window,"unload",d);
}
function d(){
D.triggerUnloadPlaying(),u();
for(var e=0,t=C.allComponent.length;t>e;e++){
var a=C.allComponent[e];
a.player&&"function"==typeof a.player.getPlayTotalTime&&(C.reportData[a._o.type].play_last_time[a._g.posIndex]=parseInt(1e3*a.player.getPlayTotalTime()));
}
for(var e in C.reportData)x.musicreport({
data:C.reportData[e]
});
p();
for(var e=0,t=C.allComponent.length;t>e;e++){
var a=C.allComponent[e];
a&&"function"==typeof a._initReportData&&a._initReportData(),a.player&&"function"==typeof a.player.resetPlayTotalTime&&a.player.resetPlayTotalTime();
}
}
function u(){
for(var e in C.reportData2)if(C.reportData2.hasOwnProperty(e)){
var t=C.reportData2[e];
t.count>0&&w.setSum(t.id,t.key,t.count);
}
w.send();
}
function g(e){
return new n(e);
}
function _(e){
if(isNaN(e))return"00:00";
e=Math.floor(e);
var t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),o=e-3600*t-60*a;
return 0!=t?(10>t&&(t="0"+t),t+=":"):t="",10>a&&(a="0"+a),10>o&&(o="0"+o),t+a+":"+o;
}
function y(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function m(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
var f=e("biz_common/dom/event.js"),h=e("biz_common/tmpl.js"),D=e("pages/music_player.js"),v=e("pages/player_adaptor.js"),k=e("biz_common/dom/class.js"),x=e("pages/report.js"),w=e("biz_common/utils/monitor.js"),I=e("pages/music_report_conf.js"),C={
allComponent:[],
hasInit:!1,
reportId:"28306",
musicSupport:D.getSurportType(),
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
reportData:{},
posIndex:{},
num:0,
reportData2:{},
adapter:{
m:e("pages/qqmusic_ctrl.js"),
k:e("pages/kugoumusic_ctrl.js")
}
};
return n.prototype._init=function(e){
this._extend(e),this._g={
posIndex:void 0,
tag:"",
canDragBar:!1,
barDraging:!1,
canGoDetail:!0
},5==this._o.type||6==this._o.type||9==this._o.type?this._g.tag="k":this._o.type>=2&&this._o.type<=4?this._g.tag="v":7==this._o.type?this._g.tag="a":(0==this._o.type||1==this._o.type||8==this._o.type)&&(this._g.tag="m"),
this._initData(),this._initQQmusicLyric(),this._initReportData(),this._initPlayer();
},n.prototype._initData=function(){},n.prototype._initQQmusicLyric=function(){
var e=this._o,t=this._g;
e.webUrl="m"==t.tag?e.webUrl.replace("#songId#",e.songId||"").replace("#referFrom#","music.qq.com"):e.webUrl.replace("#songId#","").replace("#referFrom#","");
},n.prototype._initReportData=function(){
var e=this._o,t=this._g;
"v"==t.tag?window.reportVoiceid.push(e.songId):"m"==t.tag&&window.reportMid.push(e.songId),
"undefined"==typeof C.reportData[e.type]&&(C.reportData[e.type]=x.getMusicReportData(e),
C.posIndex[e.type]=0),"undefined"==typeof t.posIndex&&(t.posIndex=C.posIndex[e.type]++);
var a=C.reportData[e.type];
a.musicid[t.posIndex]=e.songId,a.commentid[t.posIndex]=e.comment_id,a.hasended[t.posIndex]=0,
a.mtitle[t.posIndex]=e.title,a.detail_click[t.posIndex]=0,a.duration2[t.posIndex]=parseInt(1e3*e.duration),
a.errorcode[t.posIndex]=0,a.play_duration2[t.posIndex]=0,a.seek[t.posIndex]=0,a.seek_position[t.posIndex]=[],
a.play_last_time[t.posIndex]=0,a.local_time[t.posIndex]=0,a.seek_loaded[t.posIndex]=[];
},n.prototype._initPlayer=function(){
if(C.musicSupport){
var e=this,t=this._o,a=this._g.tag;
t.onStatusChange=this._statusChangeCallBack(),t.onTimeupdate=this._timeupdateCallBack(),
t.onError=this._errorCallBack(),t.onUpdateSeekRange=this._onUpdateSeekRange(),t.onAndroidForceH5=function(){
l("force_h5",1);
},t.onH5Begin2Play=function(){
l(a+"_pv",1),l(a+"_h5_pv",1);
},t.onH5Error=function(t,o){
l(a+"_h5_err_total",1),l(a+"_h5_err_"+o.code,1),e._reportH5Error({
type:1,
code:o.code
});
},t.onJsapi1Begin2Play=function(){
l(a+"_pv",1),l(a+"_wx_pv",1),l(a+"_wx_pv_1",1);
},t.onJsapi2Begin2Play=function(e,o){
l(a+"_pv",1),l(a+"_wx_pv",1),l(a+"_wx_pv_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src&&l("aac_pv",1),
t.musicPlayerOnJsapi2Begin2Play&&t.musicPlayerOnJsapi2Begin2Play(o);
},t.onJsapi2PlaySuccess=function(e,a){
t.musicPlayerOnJsapi2PlaySuccess&&t.musicPlayerOnJsapi2PlaySuccess(a);
},t.onJsapi2Begin2PlayErr=function(){
if(l(a+"_wx_err_1",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_start_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(x.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_1",1)):(x.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_1",1));
}
},t.onJsapi2PlayingErr=function(){
if(l(a+"_wx_err_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_ing_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(x.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_2",1)):(x.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_2",1));
}
},t.onJsapi2PlayingStop=function(){
var e=a+"_stoped_";
e+=D.isAndroid?"android":"ios",l(e,1);
},t.onJsapi2PlayingPause=function(){
var e=a+"_paused_";
e+=D.isAndroid?"android":"ios",l(e,1);
},t.onSeekErr=function(){
if(l(a+"_seek_err",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_seek_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(x.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_3",1)):(x.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_3",1));
}
},t.onUnloadPlaying=function(){
l(a+"_unload_wx_pv",1);
},t.onQMClientPlay=function(){
l("QMClient_play",1);
},t.onSeekNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=C.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=1);
}
},t.onSeekNotNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=C.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=0);
}
},v.create(this._o,{
callback:function(t){
e.player=t,e.afterCreatePlayer();
}
});
}
},n.prototype.afterCreatePlayer=function(){
this._playEvent();
},n.prototype.isInSeekrang=function(e){
var t=this._o.seekRange;
if(!t)return!1;
if(t===e)return!0;
for(var a=t.getElementsByTagName("*"),o=0,r=a.length;r>o;o++)if(a[o]===e)return!0;
return!1;
},n.prototype._playEvent=function(){
var e=this,t=this._o,a=this._g;
if(t.detailUrl&&t.detailArea&&f.on(t.detailArea,"click",function(r){
if(!a.barDraging&&a.canGoDetail){
var n=r.target||r.srcElement;
n&&e.isInSeekrang(n)||("v"==a.tag?(C.reportData[t.type].detail_click[a.posIndex]=1,
window.location.href=t.detailUrl):("m"==a.tag||"k"==a.tag)&&C.adapter[a.tag].getPlayUrl(t,{
callback:function(e){
e.canplay?(C.reportData[t.type].detail_click[a.posIndex]=1,window.location.href=t.detailUrl):e.msg&&setTimeout(function(){
o(e.msg);
},0);
}
}));
}
}),C.musicSupport){
var r=0,n=4,i=5;
switch(1*t.type){
case 0:
r=1;
break;

case 1:
r=13;
break;

case 8:
r=14;
break;

case 2:
r=3;
break;

case 3:
r=6;
break;

case 4:
r=7;
break;

case 5:
r=10;
break;

case 6:
r=15;
break;

case 7:
r=11;
break;

case 9:
r=12;
}
var s="";
s=t.allowPause?t.pauseCss||t.playingCss:t.playingCss,f.tap(t.playArea,function(){
return console.log("click playArea",k.hasClass(t.playCssDom,s)),k.hasClass(t.playCssDom,s)?(t.allowPause?e.player.pause():e.player.stop(),
x.report({
type:r,
comment_id:t.comment_id,
voiceid:t.songId,
action:i
})):"v"==a.tag||"a"==a.tag?e._playMusic(r,n):C.adapter[a.tag].getPlayUrl(t,{
callback:function(i){
i.canplay&&i.play_url?(i.duration&&(t.duration=i.duration,e.player.setDuration(t.duration),
C.reportData[t.type].duration2[a.posIndex]=parseInt(1e3*t.duration)),e.player.setSrc(i.play_url),
e._playMusic(r,n)):i.msg&&setTimeout(function(){
o(i.msg);
},0);
}
}),!1;
}),e._dragEvent();
}
},n.prototype._dragEvent=function(){
var e=this,t=this._o,a=this._g,o=t.seekRange;
if(o){
var r=0,n=o,i=!1,s=window.__zoom||1;
for(1!=s&&(i=!0);n&&n!=document.body;)r+=i?n.offsetLeft*s:n.offsetLeft,"page-content"==n.id&&(i=!1),
n=n.offsetParent;
var p=e.player.getDuration();
a.seekData={
zoom:s,
offsetLeft:r,
duration:p,
rangeWidth:o.offsetWidth,
startTime:0,
dragTime:0,
downX:0,
moveX:0
},f.on(o,"mousedown",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.pageX||t.clientX
}),t.preventDefault());
}),f.on(t.seekContainer,"mousemove",function(t){
a.canDragBar&&a.barDraging&&(e._pointerMoveHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation());
}),f.on(document.body,"mouseup",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation(),!1):void 0;
}),f.on(o,"touchstart",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault());
}),f.on(o,"touchmove",function(t){
return a.canDragBar&&a.barDraging?(e._pointerMoveHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),void t.stopPropagation()):void console.log("no can drag",a.canDragBar,a.barDraging);
}),f.on(o,"touchend",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),t.stopPropagation(),!1):void console.log("no can drag",a.canDragBar,a.barDraging);
});
}
},n.prototype._pointerDownHandler=function(e){
var t=this._g;
t.barDraging=!0,t.canGoDetail=!1,t.seekData.downX=e.x,t.seekData.startTime=this.player.getCurTime();
},n.prototype._pointerMoveHandler=function(e){
var t=this._g,a=t.seekData;
a.moveX=e.x;
var o=(a.moveX-a.offsetLeft)/a.zoom/a.rangeWidth;
o=Math.min(o,1),o=Math.max(o,0),a.dragTime=o*a.duration,a.dragTime!=a.startTime&&this._updateProgressBar(a.dragTime);
},n.prototype._pointerUpHandler=function(e){
var t=this._g,a=t.seekData;
a.dragTime||this._pointerMoveHandler({
x:e.x
}),console.log("up dragging",a.dragTime),t.barDraging=!1,this.player.seek(a.dragTime),
C.reportData[this._o.type].seek[t.posIndex]=1,C.reportData[this._o.type].seek_position[t.posIndex].push(parseInt(1e3*a.startTime)+","+parseInt(1e3*a.dragTime));
var o=C.reportData[this._o.type].seek_position[t.posIndex].length;
C.reportData[this._o.type].seek_loaded[t.posIndex][o-1]=0,t.seekData.startTime=0,
t.seekData.dragTime=0,t.seekData.downX=0,t.seekData.moveX=0,setTimeout(function(){
t.canGoDetail=!0;
},1e3);
},n.prototype._playMusic=function(e,t){
var a=this._o,o=this._g;
this.player.play(),C.reportData[a.type].hasended[o.posIndex]=1,0==C.reportData[a.type].local_time[o.posIndex]&&(C.reportData[a.type].local_time[o.posIndex]=parseInt(+new Date/1e3)),
x.report({
type:e,
comment_id:a.comment_id,
voiceid:a.songId,
action:t
});
},n.prototype._extend=function(e){
for(var t in e)this._o[t]=e[t];
},n.prototype._onUpdateSeekRange=function(){
var e=this,t=e._o,a=e._g;
return function(e){
this.surportSeekRange()&&t.bufferDom&&t.playdotDom?(a.canDragBar=!0,t.playdotDom.style.display="block",
t.bufferDom.style.width=1*e+"%"):(a.canDragBar=!1,t.playdotDom&&(t.playdotDom.style.display="none"));
};
},n.prototype._statusChangeCallBack=function(){
var e=this;
return function(t,a){
e._updatePlayerCss(this,a),e._o.musicPlayerStatusChange&&e._o.musicPlayerStatusChange(a);
};
},n.prototype._timeupdateCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
e._updateProgress(r),0!=r&&(C.reportData[t.type].play_duration2[a.posIndex]=parseInt(1e3*r));
};
},n.prototype._errorCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
C.reportData[t.type].errorcode[a.posIndex]=r.code,e._updatePlayerCss(this,3);
};
},n.prototype._reportH5Error=function(e){
if("mp.weixin.qq.com"==location.host&&1==e.type||C.debug){
var t=["code:",e.code,";type:",this._o.type,";url:",window.location.href];
this.player&&t.push(";src:"+this.player.getSrc());
var a=new Image;
a.src=["https://badjs.weixinbridge.com/badjs?level=4&id=112&msg=",encodeURIComponent(t.join("")),"&uin=",window.uin||"","&from=",this._o.type].join("");
}
},n.prototype._updatePlayerCss=function(e,t){
!!C.debug&&console.log("status:"+t);
{
var a=this._o,o=a.playCssDom;
a.progress;
}
2==t?(k.removeClass(o,a.playingCss),a.pauseCss&&k.removeClass(o,a.pauseCss),a.playdotDom&&(e.surportSeekRange()?(a.playdotDom.style.display="block",
this._g.canDragBar=!0):(a.playdotDom.style.display="none",this._g.canDragBar=!1))):3==t?(k.removeClass(o,a.playingCss),
a.pauseCss&&k.removeClass(o,a.pauseCss),a.playdotDom&&(a.playdotDom.style.display="none",
this._g.canDragBar=!1),this._updateProgress(0)):(1==t||4==t)&&(a.allowPause?k.addClass(o,a.pauseCss||a.playingCss):k.addClass(o,a.playingCss),
a.playdotDom&&(e.surportSeekRange()?(a.playdotDom.style.display="block",this._g.canDragBar=!0):(a.playdotDom.style.display="none",
this._g.canDragBar=!1))),a.loadingDom&&(a.loadingDom.style.display=4==t?"block":"none");
},n.prototype._updateProgress=function(e){
return this._g.barDraging?void console.log("no dragging return",e):void this._updateProgressBar(e);
},n.prototype._updateProgressBar=function(e){
var t=this._o,a=this.player,o=a.getDuration();
if(o){
var r=this._countProgress(o,e);
t.progress&&(t.progress.style.width=r),t.playtimeDom&&e>0&&(t.playtimeDom.innerHTML=_(e)),
t.playdotDom&&(t.playdotDom.style.left=r);
}
},n.prototype._countProgress=function(e,t){
return Math.min(t/e*100,100)+"%";
},n.prototype.destory=function(){
this.player&&this.player.destory();
},n.prototype.setOption=function(e){
e.duration&&(this._g.seekData.duration=e.duration),this._extend(e);
},n.prototype.setMusicPlayerOption=function(e){
e.duration&&this._g&&this._g.seekData&&(this._g.seekData.duration=e.duration),this.player&&this.player.setOption(e);
},n.prototype.getBackgroundAudioState=function(e){
return this.player.getBackgroundAudioState(e);
},{
init:g,
renderPlayer:i,
formatTime:_,
decodeStr:y,
encodeStr:m
};
});define("pages/qqmusic_tpl.html.js",[],function(){
return'<span id="qqmusic_main_<#=musicid#>_<#=posIndex#>" class="db qqmusic_area <#if(!musicSupport){#> unsupport<#}#>">\n    <span class="tc tips_global unsupport_tips" <#if(show_not_support!==true){#>style="display:none;"<#}#>>\n    当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放    </span>\n    <span class="db qqmusic_wrp appmsg_card_context appmsg_card_active">\n        <span class="db qqmusic_bd">\n            <span id="qqmusic_play_<#=musicid#>_<#=posIndex#>" class="play_area">\n                <i class="icon_qqmusic_switch"></i>\n                <img src="<#=window.icon_qqmusic_default#>" alt="" class="pic_qqmusic_default">\n                <img src="<#=albumurl#>" data-autourl="<#=audiourl#>" data-musicid="<#=musicid#>" class="qqmusic_thumb" alt="">\n            </span>\n            <a id="qqmusic_home_<#=musicid#>_<#=posIndex#>" class="access_area">\n                <span class="qqmusic_songname"><#=music_name#></span>\n                <span class="qqmusic_singername"><#=singer#></span>\n                <span class="qqmusic_source"><img src="<#=musicIcon#>" alt=""></span>\n            </a>\n        </span>\n    </span>       \n</span>\n';
});define("new_video/ctl.js",["biz_wap/utils/ajax.js"],function(e){
"use strict";
var i;
if(parent==window)i=window;else try{
{
parent.window.location.href;
}
i=parent.window;
}catch(t){
i=window;
}
var r=i.user_uin,n=Math.floor(i.user_uin/100)%20;
r||(n=-1);
var a=function(){
return n>=0;
};
i.__webviewid||(i.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var d=function(){
var e=i.mid,t=i.idx,n="";
n=e&&t?e+"_"+t:"";
var a=i.__webviewid,d=[r,n,a].join("_");
return d;
},o=function(i){
if(20>n)try{
var t=i.vid||"",r={};
r.__biz=parent.window.biz||"",r.vid=t,r.clienttime=+new Date;
var o=parent.window.mid,w=parent.window.idx,_="";
o&&w?(r.type=1,_=o+"_"+w):(r.type=2,_=t),r.id=_,r.webviewid=d(),r.step=i.step||0,
r.orderid=i.orderid||0,r.ad_source=i.ad_source||0,r.traceid=i.traceid||0,r.ext1=i.ext1||"",
r.ext2=i.ext2||"",r.r=Math.random(),r.devicetype=parent.window.devicetype,r.version=parent.window.clientversion,
r.is_gray=a()?1:0;
var c=e("biz_wap/utils/ajax.js");
c({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:r
});
}catch(v){}
};
return{
report:o,
getWebviewid:d,
showAd:a
};
});define("a/testdata.js",[],function(){
"use strict";
function e(){
var e=[],a=new RegExp("(^|&)mock_ad=([^&]*)(&|$)","i"),i=window.location.search.substr(1).match(a);
if(i&&i[2]){
for(var t=i[2],d=t.split("_"),c=0;c<d.length;c++){
var B=p["pt_"+d[c]];
B&&e.push(B);
}
return e;
}
}
var p={
pt_2:{
ad_desc:"",
aid:"14152818",
app_info:{
apk_name:"com.tuan800.tao800",
apk_url:"http://imtt.dd.qq.com/16891/ECAB9669DE7A77DACA842CF2E4CEA9CE.apk?fsname=com.tuan800.tao800_4.22.0_42207.apk&amp;csr=1bca",
app_id:100734944,
app_md5:"ECAB9669DE7A77DACA842CF2E4CEA9CE",
app_name:"折800-独家折扣优惠买",
app_rating:4.93209,
app_size:29068789,
app_type:1,
appinfo_url:"http://imtt.dd.qq.com/16891/ECAB9669DE7A77DACA842CF2E4CEA9CE.apk?fsname=com.tuan800.tao800_4.22.0_42207.apk&amp;csr=1bca",
category:[],
channel_id:"000116083635363934363334",
desc:"折800，手机必备购物APP，大牌折扣，好货底价购，服饰、家居，母婴、家电、鞋包……全品类覆盖，用心生活，精明消费，省钱又省心【新人好礼】新人专享、爆款秒杀，海量红包等你拿【品牌折扣】达芙妮、美的、COACH等半价购【劲爆促销】每日千余商品限时特卖，就是那么低价【正品保证】品牌授权，商家信誉严格把控【9大工序】商品细节，使用体验等全方位评测【职业选款】优中选优，超高性价比【抄底捡价】心黑手狠帮您砍价低至1折【嗨购活动】拼团、领券、抽奖、拍卖玩儿不停【签到赚钱】签到赚积分，积分当钱花【任性包邮】全场包邮，呼朋唤友来抢购【售后无忧】8天无理由退换，退货就返券，你来任性，小折为你买单！【联系我们】折800数千员工随时为你解决任何问题！客服：电话400-0611-800；QQ群：199512527 意见反馈：app@tuan800.com官方微博微信同步搜索：折800官方网址：m.zhe800.com；www.zhe800.com",
down_count:65980944,
icon_url:"http://pp.myapp.com/ma_icon/0/icon_187076_1502105988/256",
new_feature:"1、99大促即将来袭！前方新一波优惠等你来拿2、收藏夹也能方便找到设置提醒的商品~3、优化用户体验，修复了部分已知功能~",
signature_md5:"CBFAB0D55237931C650DF038C6AE9E93",
snap_shots:"http://pp.myapp.com/ma_pic2/0/shot_187076_1_1503288410/330|http://pp.myapp.com/ma_pic2/0/shot_187076_2_1503288410/330|http://pp.myapp.com/ma_pic2/0/shot_187076_3_1503288410/330|http://pp.myapp.com/ma_pic2/0/shot_187076_4_1503288410/330|http://pp.myapp.com/ma_pic2/0/shot_187076_5_1503288410/330",
url_scheme:"",
version_code:42207
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=GV0J%2BtrsQQNyp%2BMYCgCMCeQ%2BaDcHVWgrdGS7V5G4iSYtFxzSguZ2DNnNq%2BeZnD%2FfRi93PAMqHeVeUvIH5OA%2BIR7ZYjjMe%2F6lSbTRJeAd5DT4puSh4JVGBXQv3aqNQWOztu%2FFDjM6vegBDn5amzfSx2mUl1%2Fk1QVce8W4sFM8GUdGdygypG0IaxWwEMUQYVfiOvQI7yZaDF21S0bk3D7VqjQaGWUT18yOHKNVaLzU0eF5nBV4PgIGsBC1whR%2FsVfYK5KKc2qF3BMn1aBZu6JF23lKsAcHF5uQkTEhRDLPWLjjBMQbO6KvNV%2FzJSFBY5QkuV3A%2FOEOyEkd7ANb4o6rxn3AaxTvoJ7VHcIUq%2BIjBHSsTqNvSUTAkbdjBEPI%2BPCnYPF0im0cABILaTelvbzgg6dZVTdUH65f7BEqwpqxsJYva9XTEWi3lrMLHPwVmsydPbQ1fh9ZlyQG25jBM63BFyADYFq%2Bw3dDDycH1ySKNpIY8I7Uai8hmmcih3Wp9%2BbSXi1q1bPphmjwzY%2BHN1VxUnOnsqFbm%2B3tVuwEzjluodNcOS3c9U88DOnrtcziWksr9HuXR0Tyg2ao%2B44FmRkxxsgXOQRdzLul4Ur8yCE27pApqEAklKB%2BxaVd%2FDGFXqKsoFnFiRTVpm47yF7Ms9ui%2BNZWT91h%2FB1scMsN95qbki%2Bsz04lhaVkCKtIGxkBbeaxGVSGfCWc8l9LNscT8xQeIx7p9TIClLkoATVIFSpCnsrA6SqgZBbtaNlAPbBqgH7Y22AS5U4ajsMyHBIwKqRMtY%2BJEnfMYe5VBdJULSgbocsw%2FeTs4ZB0v0Aap14nEAX6rJD6tZMm1WD5eiNc%2BtURhbV0VU4ITvy5oPBb5O4Fa0GgcyafzYzMbRtApCWN2Xrmm8W774qHvFbITLWUBIsKE5rpKZUQ14BOLTGmt48zXU9HFLl6vA1h7955ip6ZdeYu7BbmHscY68GN%2B%2F7jcKx7tx7HfP2uXr5EulUtVID86vitwn8OIsTGdxgfYkI3CNRHYfBbLru1MV2xjzVT0PY8djLbhscGWZZGF%2BvkYoGEmApWQ78hPRVLRxO1IVBlrZf4Kk1fgEhpNmk%3D",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"包2-0731-优秀女装",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410c82bf63643209dd9cb247c79f446aaa0020300b9770400&amp;hy=SH&amp;storeid=32303137303831343039343633383030303263303631313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:2,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=GV0J%2BtrsQQNyp%2BMYCgCMCeQ%2BaDcHVWgrdGS7V5G4iSYtFxzSguZ2DNnNq%2BeZnD%2FfRi93PAMqHeVeUvIH5OA%2BIR7ZYjjMe%2F6lSbTRJeAd5DT4puSh4JVGBXQv3aqNQWOztu%2FFDjM6vegBDn5amzfSx2mUl1%2Fk1QVce8W4sFM8GUdGdygypG0IaxWwEMUQYVfiOvQI7yZaDF21S0bk3D7VqjQaGWUT18yOHKNVaLzU0eF5nBV4PgIGsBC1whR%2FsVfYK5KKc2qF3BMn1aBZu6JF23lKsAcHF5uQkTEhRDLPWLjjBMQbO6KvNV%2FzJSFBY5QkuV3A%2FOEOyEkd7ANb4o6rxn3AaxTvoJ7VHcIUq%2BIjBHSsTqNvSUTAkbdjBEPI%2BPCnYPF0im0cABILaTelvbzgg6dZVTdUH65f7BEqwpqxsJYva9XTEWi3lrMLHPwVmsydPbQ1fh9ZlyQG25jBM63BFyADYFq%2Bw3dDDycH1ySKNpIY8I7Uai8hmmcih3Wp9%2BbSXi1q1bPphmjwzY%2BHN1VxUnOnsqFbm%2B3tVuwEzjluodNcOS3c9U88DOnrtcziWksr9HuXR0Tyg2ao%2B44FmRkxxsgXOQRdzLul4Ur8yCE27pApqEAklKB%2BxaVd%2FDGFXqKsoFnFiRTVpm47yF7Ms9ui%2BNZWT91h%2FB1scMsN95qbki%2Bsz04lhaVkCKtIGxkBbeaxGVSGfCWc8l9LNscT8xQeIx7p9TIClLkoATVIFSpCnsrA6SqgZBbtaNlAPbBqgH7Y22AS5U4ajsMyHBIwKqRMtY%2BJEnfMYe5VBdJULSgbocsw%2FeTs4ZB0v0Aap14nEAX6rJD6tZMm1WD5eiNc%2BtURhbV0VU4ITvy5oPBb5O4Fa0GgcyafzYzMbRtApCWN2Xrmm8W774qHvFbITLWUBIsKE5rpKZUQ14BOLTGmt48zXU9HFLl6vA1h7955ip6ZdeYu7BbmHscY68GN%2B%2F7jcKx7tx7HfP2uXr5EulUtVID86vitwn8OIsTGdxgfYkI3CNRHYfBbLru1MV2xjzVT0PY8djLbhscGWZZGF%2BvkYoGEmApWQ78hPRVLRxO1IVBlrZf4Kk1fgEhpNmk%3D",
ticket:"2t3fxa7gwijlf",
traceid:"wx0roylv2tqhiegu00",
type:"0",
url:"http://mp.weixin.qq.com/mp/ad_app_info?app_id=100734944&weixinadkey=08492438fabea0fa20ea10ca113c9c77ab393b4afe956b9402cb9c146446a4897b07983cdf4c87e494525135bbbf6c75&ticket=2vzb4elulhdn4&gdt_vid=wx03uxqfwz22ubsa00&channel_id=000116083636303834373639&md5sum=9A454F1F2CC41E3A02295D688871F7E1&weixinadinfo=13262845.wx03uxqfwz22ubsa00.0.1#wechat_redirect",
watermark_type:3
},
pt_2x1:{
ad_desc:"",
aid:"14152818",
app_info:{
apk_name:"com.tuan800.tao800",
apk_url:"http://imtt.dd.qq.com/16891/ECAB9669DE7A77DACA842CF2E4CEA9CE.apk?fsname=com.tuan800.tao800_4.22.0_42207.apk&amp;csr=1bca",
app_id:100734944,
app_md5:"ECAB9669DE7A77DACA842CF2E4CEA9CE",
app_name:"折800-独家折扣优惠买",
app_rating:4.93209,
app_size:29068789,
app_type:1,
appinfo_url:"http://imtt.dd.qq.com/16891/ECAB9669DE7A77DACA842CF2E4CEA9CE.apk?fsname=com.tuan800.tao800_4.22.0_42207.apk&amp;csr=1bca",
category:[],
channel_id:"000116083635363934363334",
desc:"折800，手机必备购物APP，大牌折扣，好货底价购，服饰、家居，母婴、家电、鞋包……全品类覆盖，用心生活，精明消费，省钱又省心【新人好礼】新人专享、爆款秒杀，海量红包等你拿【品牌折扣】达芙妮、美的、COACH等半价购【劲爆促销】每日千余商品限时特卖，就是那么低价【正品保证】品牌授权，商家信誉严格把控【9大工序】商品细节，使用体验等全方位评测【职业选款】优中选优，超高性价比【抄底捡价】心黑手狠帮您砍价低至1折【嗨购活动】拼团、领券、抽奖、拍卖玩儿不停【签到赚钱】签到赚积分，积分当钱花【任性包邮】全场包邮，呼朋唤友来抢购【售后无忧】8天无理由退换，退货就返券，你来任性，小折为你买单！【联系我们】折800数千员工随时为你解决任何问题！客服：电话400-0611-800；QQ群：199512527 意见反馈：app@tuan800.com官方微博微信同步搜索：折800官方网址：m.zhe800.com；www.zhe800.com",
down_count:65980944,
icon_url:"http://pp.myapp.com/ma_icon/0/icon_187076_1502105988/256",
new_feature:"1、99大促即将来袭！前方新一波优惠等你来拿2、收藏夹也能方便找到设置提醒的商品~3、优化用户体验，修复了部分已知功能~",
signature_md5:"CBFAB0D55237931C650DF038C6AE9E93",
snap_shots:"http://pp.myapp.com/ma_pic2/0/shot_187076_1_1503288410/330|http://pp.myapp.com/ma_pic2/0/shot_187076_2_1503288410/330|http://pp.myapp.com/ma_pic2/0/shot_187076_3_1503288410/330|http://pp.myapp.com/ma_pic2/0/shot_187076_4_1503288410/330|http://pp.myapp.com/ma_pic2/0/shot_187076_5_1503288410/330",
url_scheme:"zhe800://goto_home",
version_code:42207
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=GV0J%2BtrsQQNyp%2BMYCgCMCeQ%2BaDcHVWgrdGS7V5G4iSYtFxzSguZ2DNnNq%2BeZnD%2FfRi93PAMqHeVeUvIH5OA%2BIR7ZYjjMe%2F6lSbTRJeAd5DT4puSh4JVGBXQv3aqNQWOztu%2FFDjM6vegBDn5amzfSx2mUl1%2Fk1QVce8W4sFM8GUdGdygypG0IaxWwEMUQYVfiOvQI7yZaDF21S0bk3D7VqjQaGWUT18yOHKNVaLzU0eF5nBV4PgIGsBC1whR%2FsVfYK5KKc2qF3BMn1aBZu6JF23lKsAcHF5uQkTEhRDLPWLjjBMQbO6KvNV%2FzJSFBY5QkuV3A%2FOEOyEkd7ANb4o6rxn3AaxTvoJ7VHcIUq%2BIjBHSsTqNvSUTAkbdjBEPI%2BPCnYPF0im0cABILaTelvbzgg6dZVTdUH65f7BEqwpqxsJYva9XTEWi3lrMLHPwVmsydPbQ1fh9ZlyQG25jBM63BFyADYFq%2Bw3dDDycH1ySKNpIY8I7Uai8hmmcih3Wp9%2BbSXi1q1bPphmjwzY%2BHN1VxUnOnsqFbm%2B3tVuwEzjluodNcOS3c9U88DOnrtcziWksr9HuXR0Tyg2ao%2B44FmRkxxsgXOQRdzLul4Ur8yCE27pApqEAklKB%2BxaVd%2FDGFXqKsoFnFiRTVpm47yF7Ms9ui%2BNZWT91h%2FB1scMsN95qbki%2Bsz04lhaVkCKtIGxkBbeaxGVSGfCWc8l9LNscT8xQeIx7p9TIClLkoATVIFSpCnsrA6SqgZBbtaNlAPbBqgH7Y22AS5U4ajsMyHBIwKqRMtY%2BJEnfMYe5VBdJULSgbocsw%2FeTs4ZB0v0Aap14nEAX6rJD6tZMm1WD5eiNc%2BtURhbV0VU4ITvy5oPBb5O4Fa0GgcyafzYzMbRtApCWN2Xrmm8W774qHvFbITLWUBIsKE5rpKZUQ14BOLTGmt48zXU9HFLl6vA1h7955ip6ZdeYu7BbmHscY68GN%2B%2F7jcKx7tx7HfP2uXr5EulUtVID86vitwn8OIsTGdxgfYkI3CNRHYfBbLru1MV2xjzVT0PY8djLbhscGWZZGF%2BvkYoGEmApWQ78hPRVLRxO1IVBlrZf4Kk1fgEhpNmk%3D",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"包2-0731-优秀女装",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410c82bf63643209dd9cb247c79f446aaa0020300b9770400&amp;hy=SH&amp;storeid=32303137303831343039343633383030303263303631313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:2,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=GV0J%2BtrsQQNyp%2BMYCgCMCeQ%2BaDcHVWgrdGS7V5G4iSYtFxzSguZ2DNnNq%2BeZnD%2FfRi93PAMqHeVeUvIH5OA%2BIR7ZYjjMe%2F6lSbTRJeAd5DT4puSh4JVGBXQv3aqNQWOztu%2FFDjM6vegBDn5amzfSx2mUl1%2Fk1QVce8W4sFM8GUdGdygypG0IaxWwEMUQYVfiOvQI7yZaDF21S0bk3D7VqjQaGWUT18yOHKNVaLzU0eF5nBV4PgIGsBC1whR%2FsVfYK5KKc2qF3BMn1aBZu6JF23lKsAcHF5uQkTEhRDLPWLjjBMQbO6KvNV%2FzJSFBY5QkuV3A%2FOEOyEkd7ANb4o6rxn3AaxTvoJ7VHcIUq%2BIjBHSsTqNvSUTAkbdjBEPI%2BPCnYPF0im0cABILaTelvbzgg6dZVTdUH65f7BEqwpqxsJYva9XTEWi3lrMLHPwVmsydPbQ1fh9ZlyQG25jBM63BFyADYFq%2Bw3dDDycH1ySKNpIY8I7Uai8hmmcih3Wp9%2BbSXi1q1bPphmjwzY%2BHN1VxUnOnsqFbm%2B3tVuwEzjluodNcOS3c9U88DOnrtcziWksr9HuXR0Tyg2ao%2B44FmRkxxsgXOQRdzLul4Ur8yCE27pApqEAklKB%2BxaVd%2FDGFXqKsoFnFiRTVpm47yF7Ms9ui%2BNZWT91h%2FB1scMsN95qbki%2Bsz04lhaVkCKtIGxkBbeaxGVSGfCWc8l9LNscT8xQeIx7p9TIClLkoATVIFSpCnsrA6SqgZBbtaNlAPbBqgH7Y22AS5U4ajsMyHBIwKqRMtY%2BJEnfMYe5VBdJULSgbocsw%2FeTs4ZB0v0Aap14nEAX6rJD6tZMm1WD5eiNc%2BtURhbV0VU4ITvy5oPBb5O4Fa0GgcyafzYzMbRtApCWN2Xrmm8W774qHvFbITLWUBIsKE5rpKZUQ14BOLTGmt48zXU9HFLl6vA1h7955ip6ZdeYu7BbmHscY68GN%2B%2F7jcKx7tx7HfP2uXr5EulUtVID86vitwn8OIsTGdxgfYkI3CNRHYfBbLru1MV2xjzVT0PY8djLbhscGWZZGF%2BvkYoGEmApWQ78hPRVLRxO1IVBlrZf4Kk1fgEhpNmk%3D",
ticket:"2t3fxa7gwijlf",
traceid:"wx0roylv2tqhiegu00",
type:"0",
url:"http://mp.weixin.qq.com/mp/ad_app_info?app_id=100734944&weixinadkey=08492438fabea0fa20ea10ca113c9c77ab393b4afe956b9402cb9c146446a4897b07983cdf4c87e494525135bbbf6c75&ticket=2vzb4elulhdn4&gdt_vid=wx03uxqfwz22ubsa00&channel_id=000116083636303834373639&md5sum=9A454F1F2CC41E3A02295D688871F7E1&weixinadinfo=13262845.wx03uxqfwz22ubsa00.0.1#wechat_redirect",
watermark_type:3
},
pt_2x2:{
hint_txt:"世包国际中心",
url:"https://www.91xiangju.com/commodity-house/369.html?cps_id=3000&weixinadkey=217129ad35c6d7141bc4c9577a505c807cc3c263469de4f24a65ba4b327ed70ee7c4ca4e96aa8b31040617d05f57a817&gdt_vid=wx03amsjux4cp62m00&weixinadinfo=14865209.wx03amsjux4cp62m00.0.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=nMtwP4DM39pQbfG2MjMiPaYrUMO%2FJlRdJcx1gAeqVSArpTWI7%2B7y5Ht0kNp7csV8pOg%2FCfbBLuWaAE%2BQgraIsY3BBYWJHEo6s5pH52kt04VbIcVvsC9EDTMT8VNmjloczICeGrPg%2BZiuEpH5OmN0tcpmyRxQubnkJ%2FJh%2BNJeGVFoWksMMS1RY%2FLqq2gJIunfdfLDhIcXHMCqSyctGcNfuoJ78h2AzHvAmTUpbBtOlYywptyitKcYYeSRbqvkzceFcceJoQW%2BJTwNNnL3hTgy7dNV9DVM%2FC9gCpr%2FNwube1jLBeddaGt%2FIdCGnmAWGyxPVy8t9dMB8ylm53oxtlFbyqclxhsqF9Y9wVqwc2g3PimFbjQ4erW2y8wmSLmlRII533pLZFSJKMynsDoKlzlT7VqGdQluXpAsymEzLomiu%2BSx6gKPd%2FNb641%2BF9gHX3A7Kof7js09WvzhmuTy14FThgXSppOFQGQvNa9UZh9pwIu7uBiCKeEuXT1Xh3xTnN8Uz4lXsu89z68PPzjjktaLu3ES8tBg1oc8DAOW8WAhD17FMHFN3zXD1cdY92cqDsq8pLcEsOoHL9lUnygABEXYcD8CI21X0lGskYmZK6bqwXbjMcuM5DiAn6cBJgb2hDEX0rHhWHuk5c1b4Ty%2BHomACBN9hHlmWLZ8RYtjN%2FbQWnhi7ybJD7PFgZWviYkLAHKGDv%2BlSqpHPehq8OV1a0qvSEnlJVs9oWna%2FqchzosBgDjsykippj7sWCczPWIwFTT5NBdmo%2BNsaxnWbg1Y3iK1jGRVIv0ARLCl9ePlxmNyhqyeQUS7BNyE4%2FODWhmrrLe67UTTMC2eWkI56g6DumY%2FDlffZP4oh9svjtQT3gwuTjbXYR%2B9tdJUEkMAmeAFBh4irS6LZtK6j3feD5l2%2FGCBs6U2y5dwTTXoosD8v8W6LeVbVLAw4di8QaToPwn2wS7lYw%2FTfwvqDuCv5iwecgKyV%2FEDtqoTMWsfZf2Pv1eGySdd0A%2BHYudVDt3H%2BA8BUwP0RU6JstNsP%2FvSHXkjxFoYvsNPdjNaimMfLdoT5r6%2BC5dSFBpuVw1RJSZgS8ZaUs5SPctBzBmNKgTZdnknL6QpdWX9j79Xhskn",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=nMtwP4DM39pQbfG2MjMiPaYrUMO%2FJlRdJcx1gAeqVSArpTWI7%2B7y5Ht0kNp7csV8pOg%2FCfbBLuWaAE%2BQgraIsY3BBYWJHEo6s5pH52kt04VbIcVvsC9EDTMT8VNmjloczICeGrPg%2BZiuEpH5OmN0tcpmyRxQubnkJ%2FJh%2BNJeGVFoWksMMS1RY%2FLqq2gJIunfdfLDhIcXHMCqSyctGcNfuoJ78h2AzHvAmTUpbBtOlYywptyitKcYYeSRbqvkzceFcceJoQW%2BJTwNNnL3hTgy7dNV9DVM%2FC9gCpr%2FNwube1jLBeddaGt%2FIdCGnmAWGyxPVy8t9dMB8ylm53oxtlFbyqclxhsqF9Y9wVqwc2g3PimFbjQ4erW2y8wmSLmlRII533pLZFSJKMynsDoKlzlT7VqGdQluXpAsymEzLomiu%2BSx6gKPd%2FNb641%2BF9gHX3A7Kof7js09WvzhmuTy14FThgXSppOFQGQvNa9UZh9pwIu7uBiCKeEuXT1Xh3xTnN8Uz4lXsu89z68PPzjjktaLu3ES8tBg1oc8DAOW8WAhD17FMHFN3zXD1cdY92cqDsq8pLcEsOoHL9lUnygABEXYcD8CI21X0lGskYmZK6bqwXbjMcuM5DiAn6cBJgb2hDEX0rHhWHuk5c1b4Ty%2BHomACBN9hHlmWLZ8RYtjN%2FbQWnhi7ybJD7PFgZWviYkLAHKGDv%2BlSqpHPehq8OV1a0qvSEnlJVs9oWna%2FqchzosBgDjsykippj7sWCczPWIwFTT5NBdmo%2BNsaxnWbg1Y3iK1jGRVIv0ARLCl9ePlxmNyhqyeQUS7BNyE4%2FODWhmrrLe67UTTMC2eWkI56g6DumY%2FDlffZP4oh9svjtQT3gwuTjbXYR%2B9tdJUEkMAmeAFBh4irS6LZtK6j3feD5l2%2FGCBs6U2y5dwTTXoosD8v8W6LeVbVLAw4di8QaToPwn2wS7lYw%2FTfwvqDuCv5iwecgKyV%2FEDtqoTMWsfZf2Pv1eGySdd0A%2BHYudVDt3H%2BA8BUwP0RU6JstNsP%2FvSHXkjxFoYvsNPdjNaimMfLdoT5r6%2BC5dSFBpuVw1RJSZgS8ZaUs5SPctBzBmNKgTZdnknL6QpdWX9j79Xhskn",
traceid:"wx03amsjux4cp62m00",
group_id:"",
ticket:"",
aid:"14865209",
pt:2,
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410c07d2c3e99938774bdb158ef262589b8020300847c0400&hy=SH&storeid=32303137303832393039343230313030303030353762313336666664393336663561333230613030303030303664&bizid=1023",
ad_desc:"",
biz_appid:"",
pos_type:0,
watermark_type:2,
logo:"",
is_cpm:0,
dest_type:0
},
pt_2x3:{
hint_txt:"10769-宝丽爵-0824",
url:"https://mob.viewlayer.cn/?mtag=59a535c89b167282979719&weixinadkey=86e6eb5c544f70e026d52e419149d2026973d0aa1889900a2eb167ab40fc30662db001d032c56f030897f6cd7a77d20b&gdt_vid=wx0fjcetau7qkfqy00&weixinadinfo=14889680.wx0fjcetau7qkfqy00.0.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=91fgdLRf69awj12CmDMtqxE502q5uM%2BXPE8qWCUo9pxG3r%2FVfjPdr6txG%2FJAFtk6b2PHfACRtmGUkuhwpl8izS%2FRR1NMxl4Gdbz2epUMSkPKvgB6DMAM5dVWeFaB%2Bpf3D1WGaEbphEtyK3JKuMbFVGCiGSKvKH6RZMlM%2B0GKwFr07Z2hXNl41u6hocy2oqNZ6avM1M8HXTKpd4ks4v5%2BwgzpL3u%2BhpHLQvR0cyXPeQ4IPuunzCk6vKax%2FnFkiv9s5rjgsfuttNWN9SGJsofEf9mAbi8nP0CpYsyLxhAuTDmctClLYMKKs2tWW%2Fqcu%2BEjbSWf6jRi4%2Fqc41MSy4FnJOxUwoDqperrCJtKjJyve4XXXdwLl1RfeYNBCRjdrBK83FkSgDdDPpUTvUXGJpbxe0hvniD5gPXFZOePuohpTe3V4t9382QZXkRfhPWfKO1sy9UbS06WAP12EfzA14gjLOAp5ZCKdDZ92xTDej2mVXmUDkHaQ%2BN%2Fpg16xieWs4XRcZL97YmaCkw39nWeadjJQgehzbqLZdLw9jj8cZCU2oa3n28T8AD%2FxxhEKLdKcOxcbSUV2r8V8DntwpPiMDB31CRrvFUrV%2FM%2BgZC%2BMLsxixyDK4VLvXUu7kBaiSyt%2FCfnqqixcXOmbrsp%2ByzUMLUI7iYKGdf30Og9ZUR5XB%2BcpkF7jd642%2BBVRUkcdPppkwgLwBbFockwt6XFPjSyRHgQD%2FeVAgbPDbd%2BVLjbMIy3m4fvuNG0pBiPfUzcExfn5DVdPJIbfYhPgn51WObooV1jVypsUm2uNEhVihhUicCHcGMviDjqinnOharKPwaXW6dQVO%2FZatXhZgUfxIlFIEDeyMWEXDFaA6IE32YJyk7mvzYpzOzjxu8APMZZtY4sm6rol9bcQ0dR7jVE6pTmmTe%2FHbIlIKlfH4R9K1hJ956v%2Fq1zdiQmP1IR8fcdlCe%2B%2Bw5Uv3JdQl97LQSuNsno%2F8X1RXvSbo%2BRtPx6kZkRGC9WMbgZzsPmswrYaKZnFW%2Frjwvnt5gYAfvug7kB8T38Jnwm%2BsIMYIY5E61DulId3FTVZoRpJKQPopd3CRV5wgBUtaNWlf0u1xtT8eMk2M6tJ%2Fi5Dg%3D%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=91fgdLRf69awj12CmDMtqxE502q5uM%2BXPE8qWCUo9pxG3r%2FVfjPdr6txG%2FJAFtk6b2PHfACRtmGUkuhwpl8izS%2FRR1NMxl4Gdbz2epUMSkPKvgB6DMAM5dVWeFaB%2Bpf3D1WGaEbphEtyK3JKuMbFVGCiGSKvKH6RZMlM%2B0GKwFr07Z2hXNl41u6hocy2oqNZ6avM1M8HXTKpd4ks4v5%2BwgzpL3u%2BhpHLQvR0cyXPeQ4IPuunzCk6vKax%2FnFkiv9s5rjgsfuttNWN9SGJsofEf9mAbi8nP0CpYsyLxhAuTDmctClLYMKKs2tWW%2Fqcu%2BEjbSWf6jRi4%2Fqc41MSy4FnJOxUwoDqperrCJtKjJyve4XXXdwLl1RfeYNBCRjdrBK83FkSgDdDPpUTvUXGJpbxe0hvniD5gPXFZOePuohpTe3V4t9382QZXkRfhPWfKO1sy9UbS06WAP12EfzA14gjLOAp5ZCKdDZ92xTDej2mVXmUDkHaQ%2BN%2Fpg16xieWs4XRcZL97YmaCkw39nWeadjJQgehzbqLZdLw9jj8cZCU2oa3n28T8AD%2FxxhEKLdKcOxcbSUV2r8V8DntwpPiMDB31CRrvFUrV%2FM%2BgZC%2BMLsxixyDK4VLvXUu7kBaiSyt%2FCfnqqixcXOmbrsp%2ByzUMLUI7iYKGdf30Og9ZUR5XB%2BcpkF7jd642%2BBVRUkcdPppkwgLwBbFockwt6XFPjSyRHgQD%2FeVAgbPDbd%2BVLjbMIy3m4fvuNG0pBiPfUzcExfn5DVdPJIbfYhPgn51WObooV1jVypsUm2uNEhVihhUicCHcGMviDjqinnOharKPwaXW6dQVO%2FZatXhZgUfxIlFIEDeyMWEXDFaA6IE32YJyk7mvzYpzOzjxu8APMZZtY4sm6rol9bcQ0dR7jVE6pTmmTe%2FHbIlIKlfH4R9K1hJ956v%2Fq1zdiQmP1IR8fcdlCe%2B%2Bw5Uv3JdQl97LQSuNsno%2F8X1RXvSbo%2BRtPx6kZkRGC9WMbgZzsPmswrYaKZnFW%2Frjwvnt5gYAfvug7kB8T38Jnwm%2BsIMYIY5E61DulId3FTVZoRpJKQPopd3CRV5wgBUtaNWlf0u1xtT8eMk2M6tJ%2Fi5Dg%3D%3D",
traceid:"wx0fjcetau7qkfqy00",
group_id:"",
ticket:"",
aid:"14889680",
pt:2,
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d0402534804105b110f03693bbf2947fa00821992985602027b350400&hy=SH&storeid=32303137303832393039333831363030306166613830313336666664393331333630333230613030303030303664&bizid=1023",
ad_desc:"",
biz_appid:"",
pos_type:0,
watermark_type:1,
logo:"",
is_cpm:0,
dest_type:0
},
pt_2x4:{
hint_txt:"创意-20180119",
url:"https://mp.weixin.qq.com/tp/ad_detail_info?page_key=fb453cc093cadbb19e1164df64b76670606affb1f3a67a2b661552266d7c7d9cb69ba15a92e881a924ef1a1b46cda0c2&amp;weixinadkey=302899249b5ab23f9fa115eaf45c9d49dc9027631ee14c13b4cf237b0b7670d73c9d65b748d00d50c13f7f3251e19f69&amp;ticket=293p3wsdhdhnu&amp;gdt_vid=wx0aznegqnwiz46k00&amp;weixinadinfo=17553526.wx0aznegqnwiz46k00.0.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=8FkkjcRvBFG71lrCZWfyCylRv%2FSBLvIp7CvLpurBBYJzXaZ9GpUujQZPD1nZCVGc4iZlv2GPrrRsxW9N%2BLPufS6JZh7EQh86iC%2Bsg1Ci5obss4EYc9%2FbDh4UyfQl4ZFv8T1%2BA2iC6jEZcuzeMhtYWcMGml3aOkvfODTHM5meVvrYEfPTwjiGOthmGWa0CaMzj9z3SN5JKEeTjXLOOZRAy8zFOPKfw%2FbngKPtutPf4Kd1QV1O%2BPSfeCQxNrXBi4cYiQ%2Bi09%2F2nJ%2BzwqbKaepxwJktOpJPJIa90vs2oithFjfxi7T%2Blphnm5PcOstPS0vtkXNq3act%2FPNySAECCnSyUTgPmTbRuAOs7W%2By5fUu5nw6VPK8qlFgvh0GXDZWcLQtAE4QF60bgh%2FjtfrmdBYjuVJPf1Fl5c4HJgiWQBdyEAsMKo%2BCAelrA%2B15Hj456vQfQL0niQEcbthWC0iDeDqxS5dppcFFx6H2aTf6qZmwB80%2FFfdrftVYA2nx4iBUBFdh1nI%2FxlrS6P89z8zG%2Beph%2BuwgZw4%2ByUUJ4lwX9EASusYZGjos4wiALFBcxHEAbSt0wXcuGCJFjtDBaPLOCKqaVWrNldQSPYn2HolWShb20lAbj11gqOLEoSNpYkxlJ2qbdXSVhW55oimIFoNR%2B7t8dsPh4wS%2F74WPAtf53f9ErcOrMqcgpYRzRNJWq4Ar2cXvDyF5nNyoRwNGyRLr0gTSUjodhVwisnoyKOg0chxpwT4QwRjuwLZZbFYu7%2FVk3l%2FFiJXznASwbs879ql%2FHGXbYlNAYDSW1TUNUoaGNB5tYBPfDqueQuo7Q2LNlMbFf3gqZEMnzRgdxuthhuRC0%2B3kpy0alkRpKHSwaT1IHdX8IpUi7yWroMhpfSbj6fn2OQ3JkSC2OBZDEMULYp3ZtH6%2BjouvYEf03Y8S3Ud7lFmBt%2F5O16jRenvDwKIPllESFfvJg2jKt2KMPP%2BKbtxNMRe%2BmCvDzBp1rm7jj8xS5ViCm%2FLCdoB22HcbkN1T4XItV2vNCtGq7GS2t%2Bc%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=8FkkjcRvBFG71lrCZWfyCylRv%2FSBLvIp7CvLpurBBYJzXaZ9GpUujQZPD1nZCVGc4iZlv2GPrrRsxW9N%2BLPufS6JZh7EQh86iC%2Bsg1Ci5obss4EYc9%2FbDh4UyfQl4ZFv8T1%2BA2iC6jEZcuzeMhtYWcMGml3aOkvfODTHM5meVvrYEfPTwjiGOthmGWa0CaMzj9z3SN5JKEeTjXLOOZRAy8zFOPKfw%2FbngKPtutPf4Kd1QV1O%2BPSfeCQxNrXBi4cYiQ%2Bi09%2F2nJ%2BzwqbKaepxwJktOpJPJIa90vs2oithFjfxi7T%2Blphnm5PcOstPS0vtkXNq3act%2FPNySAECCnSyUTgPmTbRuAOs7W%2By5fUu5nw6VPK8qlFgvh0GXDZWcLQtAE4QF60bgh%2FjtfrmdBYjuVJPf1Fl5c4HJgiWQBdyEAsMKo%2BCAelrA%2B15Hj456vQfQL0niQEcbthWC0iDeDqxS5dppcFFx6H2aTf6qZmwB80%2FFfdrftVYA2nx4iBUBFdh1nI%2FxlrS6P89z8zG%2Beph%2BuwgZw4%2ByUUJ4lwX9EASusYZGjos4wiALFBcxHEAbSt0wXcuGCJFjtDBaPLOCKqaVWrNldQSPYn2HolWShb20lAbj11gqOLEoSNpYkxlJ2qbdXSVhW55oimIFoNR%2B7t8dsPh4wS%2F74WPAtf53f9ErcOrMqcgpYRzRNJWq4Ar2cXvDyF5nNyoRwNGyRLr0gTSUjodhVwisnoyKOg0chxpwT4QwRjuwLZZbFYu7%2FVk3l%2FFiJXznASwbs879ql%2FHGXbYlNAYDSW1TUNUoaGNB5tYBPfDqueQuo7Q2LNlMbFf3gqZEMnzRgdxuthhuRC0%2B3kpy0alkRpKHSwaT1IHdX8IpUi7yWroMhpfSbj6fn2OQ3JkSC2OBZDEMULYp3ZtH6%2BjouvYEf03Y8S3Ud7lFmBt%2F5O16jRenvDwKIPllESFfvJg2jKt2KMPP%2BKbtxNMRe%2BmCvDzBp1rm7jj8xS5ViCm%2FLCdoB22HcbkN1T4XItV2vNCtGq7GS2t%2Bc%3D",
traceid:"wx0aznegqnwiz46k00",
group_id:"",
ticket:"293p3wsdhdhnu",
aid:"17553526",
pt:2,
image_url:"http://wxsnsdythumb.wxs.qq.com/109/20204/snsvideodownload?m=79a3ff480997ae77fa4aefe9658d605e&amp;filekey=3033020101041f301d02016d04025348041079a3ff480997ae77fa4aefe9658d605e02020bbf040d00000004627466730000000131&amp;hy=SH&amp;storeid=32303138303131393037333035303030303833383765313336666664393337313561333230613030303030303664&amp;bizid=1023",
app_info:{
category:[],
url_scheme:""
},
ad_desc:"",
biz_appid:"",
pos_type:0,
watermark_type:2,
logo:"",
is_cpm:0,
dest_type:7,
material_width:582,
material_height:166,
canvas_info:{
canvas_id:"114667",
ad_info_xml:"&lt;?xml version=&#39;1.0&#39; encoding=&#39;utf-8&#39; ?&gt;\n&lt;ADInfo&gt;\n	&lt;uxinfo&gt;17553526|wx0aznegqnwiz46k00||0|1516937278|0&lt;/uxinfo&gt;\n	&lt;session_data&gt;\n		&lt;trace_id&gt;wx0aznegqnwiz46k00&lt;/trace_id&gt;\n		&lt;aid&gt;17553526&lt;/aid&gt;\n	&lt;/session_data&gt;\n&lt;/ADInfo&gt;\n\n"
}
},
pt_7:{
hint_txt:"19.9元留住宝宝的纯真影像",
url:"http://mall.qiakr.com/mall/getStockInfoForCustomer.htm?stockId=3265436&salesId=85999&weixinadkey=a2d138b7c0b55dcc82d2b3d1459d7678125a430f23b2b920b5aeeb1b8fdf0cc68fc967edec80016f6c1ee58da63add62&gdt_vid=wx0jbf2bov3yned400&weixinadinfo=14889854.wx0jbf2bov3yned400.0.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=JCeVfPTbl5HMTQp8E%2B5NsR5%2FbQBV3iR0re%2B%2BYqBj2Dj1j34%2BoBeR2xIUu%2BaWmWKK2dpbLlJnViMis4a%2FyWjVvZCdUwktE%2Bvt2tZysGWKaYaBFg4XolshIoMdHTMoDNRq7PJAljdLsDR3QrOm1vDeMGfKeYXVltgXBKNg3H8jZK9%2FBxaM7KjvwJe6vICEehiXEUtyjmLNdRXsaSacASN03w1IpbjEZ6nuBY1T7axAYTv%2FK%2Fle5enFaMHOHfj%2BqtEJ26UNXwnIm9pWIFS7QO9xUnVf9fFXF9zzLoax0zLiuBWJdc8b%2F8PXCWrCHueIr24bPhL54TX6XbedAyuAH2rh5yQb5aP9pv%2FAPvfQWBSsYB4ek0rXvhEa367yo14VD2Wf3LqoZ4er%2Fyz3z0XlFdP9jQjIh9cIbO0xe6Pgreh03IG9rcDEVucRnDLJI1y%2B0LxZ9iFzKQxPJnQYFE6lC09Jrysyrd%2FwK9DSsbUtq1EKWWgTIS4olfnOxzNFL9O8OqWtUEnG%2Fma0ADE7RIRq2NGDBhwxH1ba4u75ukOsFpZDmWCucem3EImIlYT1y%2BOyy3CmMU3Uqmv0iQY3gqFr5ej31mQODcjTyiRDieUHWkBzqAhKLEt%2FQ81uWzkUXgjxwFHSBrCK7C1zVpTWvil70tGQxlatA5j9H9b6AdUxN32As497y1FPDwn59c3RsSv6vDiCewM4RfMt2mw620ToJgkT%2BypsAAxWjna%2BCgDtcolZdapMZ%2FbcBPAqN2DAQTPayJyruRHJHXZGiVPl6eaUQJJvgkQs2Yo1hIq8gaImSgaQCa%2FjXLwtErfUw9svaakxhzu17SkQP3aaKFb7wGBN%2Bs72RGRUy32p14M6mW6OcW%2BCDlAXuwWYq%2FnskvlAZS3F2I16whmDSyGU8FsYExhq481zn4loo%2FBOzuSJ7Nu4ZagmruyOY3UEnq5M8HcH1ylC8g5%2B2%2BINCMCG4X3EUQz2wb8pvEfvEZuPQ6J494BqBXjeDQZ%2F5Kk8h51CBG0DIk81KaGztDYconO%2BZne39H%2BvR5wKQAQ7gbdahGPdi6OIVLbqwM%2BBiLJxQMaWK5BP7T%2BRqh%2BkQADee%2FjY24kKdjxNx%2F%2FhQ5XCZ9hzhw8d",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=JCeVfPTbl5HMTQp8E%2B5NsR5%2FbQBV3iR0re%2B%2BYqBj2Dj1j34%2BoBeR2xIUu%2BaWmWKK2dpbLlJnViMis4a%2FyWjVvZCdUwktE%2Bvt2tZysGWKaYaBFg4XolshIoMdHTMoDNRq7PJAljdLsDR3QrOm1vDeMGfKeYXVltgXBKNg3H8jZK9%2FBxaM7KjvwJe6vICEehiXEUtyjmLNdRXsaSacASN03w1IpbjEZ6nuBY1T7axAYTv%2FK%2Fle5enFaMHOHfj%2BqtEJ26UNXwnIm9pWIFS7QO9xUnVf9fFXF9zzLoax0zLiuBWJdc8b%2F8PXCWrCHueIr24bPhL54TX6XbedAyuAH2rh5yQb5aP9pv%2FAPvfQWBSsYB4ek0rXvhEa367yo14VD2Wf3LqoZ4er%2Fyz3z0XlFdP9jQjIh9cIbO0xe6Pgreh03IG9rcDEVucRnDLJI1y%2B0LxZ9iFzKQxPJnQYFE6lC09Jrysyrd%2FwK9DSsbUtq1EKWWgTIS4olfnOxzNFL9O8OqWtUEnG%2Fma0ADE7RIRq2NGDBhwxH1ba4u75ukOsFpZDmWCucem3EImIlYT1y%2BOyy3CmMU3Uqmv0iQY3gqFr5ej31mQODcjTyiRDieUHWkBzqAhKLEt%2FQ81uWzkUXgjxwFHSBrCK7C1zVpTWvil70tGQxlatA5j9H9b6AdUxN32As497y1FPDwn59c3RsSv6vDiCewM4RfMt2mw620ToJgkT%2BypsAAxWjna%2BCgDtcolZdapMZ%2FbcBPAqN2DAQTPayJyruRHJHXZGiVPl6eaUQJJvgkQs2Yo1hIq8gaImSgaQCa%2FjXLwtErfUw9svaakxhzu17SkQP3aaKFb7wGBN%2Bs72RGRUy32p14M6mW6OcW%2BCDlAXuwWYq%2FnskvlAZS3F2I16whmDSyGU8FsYExhq481zn4loo%2FBOzuSJ7Nu4ZagmruyOY3UEnq5M8HcH1ylC8g5%2B2%2BINCMCG4X3EUQz2wb8pvEfvEZuPQ6J494BqBXjeDQZ%2F5Kk8h51CBG0DIk81KaGztDYconO%2BZne39H%2BvR5wKQAQ7gbdahGPdi6OIVLbqwM%2BBiLJxQMaWK5BP7T%2BRqh%2BkQADee%2FjY24kKdjxNx%2F%2FhQ5XCZ9hzhw8d",
traceid:"wx0jbf2bov3yned400",
group_id:"",
ticket:"",
aid:"14889854",
pt:7,
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d0402534804105dee9141292a1f6ec2fdf5a44794a473020219830400&hy=SH&storeid=32303137303832393039333730303030303730656162313336666664393336663561333230613030303030303664&bizid=1023",
ad_desc:"小糯米为每个孩子打造一个开心、梦想、快乐、童真的童年",
biz_appid:"",
pos_type:0,
watermark_type:0,
logo:"",
is_cpm:0,
dest_type:0
},
pt_100:{
hint_txt:"点击“关注” 观看更多精彩潮剧",
url:"https://mp.weixin.qq.com/mp/ad_biz_info?__biz=MzU1MTE2OTk0NQ==&sn=6518d701813ded1dd09918956297917e&weixinadkey=548ae46bee12701d10d6ab4047c5a0654a5490df1dff40d7e5f67376762916254bd5aa9329fb3a7617e2324cb48a50c5&ticket=2tkzedhfavvnh&gdt_vid=wx0dczgs7job3vjy00&weixinadinfo=14888809.wx0dczgs7job3vjy00.0.1#wechat_redirect",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=fdj3ZZhD2qDmsKZjo9y6dU8Mp35CBHU1XJtkvATh%2B%2BJSG3EDPN%2FDltuZyeSKmsqb0d%2FShkXtSwn3vGdHrkWLZHGSRj67aypageTq%2FZ4M6WG1lwmsOzBRVMYhIqnUfNG695ZVwYJNaWumol%2BAEgddnm9zRmSND2lEDL%2FGNol%2FRIK5SR8IjtFD%2Fvvd3WTmzI%2BRwFnyOxw6yInbeJYSB985tP5joFDobz%2F3Yb3gKVFOhom9eiV%2FW4Den8rQyRAsdrE0486QvPBMujGScpNQBbw%2FCK1%2BQRL%2B0xuUuthvFm%2BcQByq7OdTt5a%2B0X23ce9EHVPyh%2BJafiK0ps7O1G%2FdAcfhbcpk0e1Bmtax%2Bnl%2FEABFFTsjG7CACftv6bXaX1RYPwWLf3%2BdryBoMrFZT0esJWftV8XlkDeINcSpLqmnO0Fc6ZIQEa6l0EBQObc%2FNH19c504%2FZJOuBpG7YzhHvJC9JyF09M2m95y46LqHh0Kv1WqpZlIytHoZJuA5S2Kj6GZA%2FbPLWQiiQHBxgQNyfKf2Gaw8Bfev0bukZ2AoufqyKL4b1t2AgosQgfm4PHNi2HnfMfsBK%2FIvWWB%2B8ygdPkgYIGI2Qa4npNUVK8py56bAfjNr5zjC9nJfZkLTwlY56GtA0NzcKm6t3lhPhvarKFv3grP7CXmTXn2pHNrEjkYMAQ0x0TOzun2ha3g6fKJFiPkUvMP22h1V6WzXYwtKwoLmYVoQcewlUx6u1F4PU3ZSXqkCp8dsAO89lZFc%2BLReloRvW1SZh90LAV0iiPxGOnYgF%2BLLgX32BCUQ9j6kUhhblV346n8zGobixoKGrP7FVaiIAtf0yMkEDtTfGbgjb7K9Nm7ND37c2i4fAHOYaYAYWJU7k3TXvivQmXIyP7M5XgkV9s3yLswrkuHO8hgIdcbdwlQZkk7T97AG%2F2irKAvFHdJ4aArIvxNGEJ%2FBSHm3TGBpuVyiuWsyd1n7l%2B6pDEljosRv2PvDIfsu5oIWaj7EzsBUvxqY5kFCQCcBBDol9VNAJY81%2BSPo%2BxXA0aYJ%2BenGCFgVm9QwSKfjab8WyAgmtkm1V5eZ4jkboOPfwaHYw0IqV9QxQ3Su1DPPIk%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=fdj3ZZhD2qDmsKZjo9y6dU8Mp35CBHU1XJtkvATh%2B%2BJSG3EDPN%2FDltuZyeSKmsqb0d%2FShkXtSwn3vGdHrkWLZHGSRj67aypageTq%2FZ4M6WG1lwmsOzBRVMYhIqnUfNG695ZVwYJNaWumol%2BAEgddnm9zRmSND2lEDL%2FGNol%2FRIK5SR8IjtFD%2Fvvd3WTmzI%2BRwFnyOxw6yInbeJYSB985tP5joFDobz%2F3Yb3gKVFOhom9eiV%2FW4Den8rQyRAsdrE0486QvPBMujGScpNQBbw%2FCK1%2BQRL%2B0xuUuthvFm%2BcQByq7OdTt5a%2B0X23ce9EHVPyh%2BJafiK0ps7O1G%2FdAcfhbcpk0e1Bmtax%2Bnl%2FEABFFTsjG7CACftv6bXaX1RYPwWLf3%2BdryBoMrFZT0esJWftV8XlkDeINcSpLqmnO0Fc6ZIQEa6l0EBQObc%2FNH19c504%2FZJOuBpG7YzhHvJC9JyF09M2m95y46LqHh0Kv1WqpZlIytHoZJuA5S2Kj6GZA%2FbPLWQiiQHBxgQNyfKf2Gaw8Bfev0bukZ2AoufqyKL4b1t2AgosQgfm4PHNi2HnfMfsBK%2FIvWWB%2B8ygdPkgYIGI2Qa4npNUVK8py56bAfjNr5zjC9nJfZkLTwlY56GtA0NzcKm6t3lhPhvarKFv3grP7CXmTXn2pHNrEjkYMAQ0x0TOzun2ha3g6fKJFiPkUvMP22h1V6WzXYwtKwoLmYVoQcewlUx6u1F4PU3ZSXqkCp8dsAO89lZFc%2BLReloRvW1SZh90LAV0iiPxGOnYgF%2BLLgX32BCUQ9j6kUhhblV346n8zGobixoKGrP7FVaiIAtf0yMkEDtTfGbgjb7K9Nm7ND37c2i4fAHOYaYAYWJU7k3TXvivQmXIyP7M5XgkV9s3yLswrkuHO8hgIdcbdwlQZkk7T97AG%2F2irKAvFHdJ4aArIvxNGEJ%2FBSHm3TGBpuVyiuWsyd1n7l%2B6pDEljosRv2PvDIfsu5oIWaj7EzsBUvxqY5kFCQCcBBDol9VNAJY81%2BSPo%2BxXA0aYJ%2BenGCFgVm9QwSKfjab8WyAgmtkm1V5eZ4jkboOPfwaHYw0IqV9QxQ3Su1DPPIk%3D",
traceid:"wx0dczgs7job3vjy00",
group_id:"",
ticket:"2tkzedhfavvnh",
aid:"14888809",
pt:100,
image_url:"",
ad_desc:"",
biz_appid:"wx8c950ba05b9f01a9",
biz_info:{
user_name:"gh_d62037c98f00",
nick_name:"潮剧精选",
is_subscribed:0,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM5PIbkaKgjHgnkhY4O3ZLBiaXbgrk6uquUy9ACLJd664ww/0",
biz_uin:3551169945
},
pos_type:0,
watermark_type:0,
logo:"",
is_cpm:0,
exp_info:{
exp_num:0,
exp_value:[]
},
dest_type:0
},
pt_103:{
ad_desc:"",
aid:"10904444",
app_info:{
apk_name:"com.mlzy.mlzy",
apk_url:"https://itunes.apple.com/cn/app/%E9%AD%94%E9%BE%99%E6%88%98%E5%9F%9F-%E4%BC%A0%E5%A5%87%E8%B7%A8%E6%9C%8D%E7%AB%9E%E6%8A%80-%E5%AE%9E%E6%97%B6%E6%BF%80%E6%83%85pk/id1177821716?mt=8&amp;uo=4",
app_id:1177821716,
app_md5:"",
app_name:"魔龙战域-传奇跨服竞技,实时激情PK",
app_rating:0,
app_size:0,
app_type:0,
appinfo_url:"https://itunes.apple.com/cn/app/%E9%AD%94%E9%BE%99%E6%88%98%E5%9F%9F-%E4%BC%A0%E5%A5%87%E8%B7%A8%E6%9C%8D%E7%AB%9E%E6%8A%80-%E5%AE%9E%E6%97%B6%E6%BF%80%E6%83%85pk/id1177821716?mt=8&amp;uo=4",
category:[],
channel_id:"",
desc:"",
down_count:0,
icon_url:"http://mmbiz.qpic.cn/mmbiz_jpg/86djwtIhOVD5ZwnOicUov9kUJGYxNuzJYDDADtOafuh6y4CKJLZicjR7BUD2tkgOXluqavibm6vNib68NAMx8A4sDA/0",
new_feature:"",
signature_md5:"",
snap_shots:"",
url_scheme:"",
version_code:0
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=BaQ97XL3503Auq%2Fl3Z63G5%2FMMc%2BtVZslK8LZCGSv74ZwnlaGZRMH6kv%2F0nK0GPyASYIyb%2BUQbqisCYeoTicGk8hp2MOqOUQMyv2weAJ6q%2FPGQslfRjAx8ZEakCuxw6nSn4slmx9dsu2Ux5SaSleqJn7BfGnvyvV1SX5JtGh9anjn4ibrl0nktv3hB%2B2%2FZMYQTobLlj5QPCjNDxOllyIegnRZiKM%2FH%2B31Zr2AGeqC0EPBIeK1dvG0GIHwjMYB1odiJNiK8Togz36JenoPEd9oAWOasyGHdVNZGprI1xg0%2FYvnXqKqSkmDRtAip0Ddi6AVkOEnrBJDPhXCWUs%2Bu1%2Bx8ruQQ8Oawsb8aQhGivNmsaDHCUTzFq7%2FdHv7u%2B86Ciz%2FydhvJWKGxhjS2ItjpljV49%2Fc4Q5IrDy0DsFe863NkXe6EjxRwa81VTiY2KmI20o3x%2B8%2BlUR5OqJlGa8KRkDUv0eeG5%2BYiKsMds5VcgVHo6Jmjv3w80zVqg24wAPZPY1W3lhD%2BUXJfSOA7iQ%2FUQPTxA8CrDyAHKe%2FeP%2BMvzz2cAni5wveEheyqlASUoVVdpKej7lLUsF3sBMeIIaP%2BDlTNM6zu0IJEeJHMCdcPyIz%2FLELhSw2lxv4oju2Wu2WEI4RUkj2W%2BWmpBrdR5w8SlpJ8DwcHOuVtk1Qjm12sjZ3OwjYCtP4VXwr7230nUdqpUGUz3MdWAOoLTWbK%2B64vMnmJhIsmEW8bAdJMkBCn20HyJVoi2NCeZFGuWtOcZ%2BsOY6p1%2FNO5J21pq7Yi3i1O0x5V2TSk%2B7p%2BRgRm3%2FQotAuQeBOAfPgm85YjuJzVCuZ6KcTEaGAp1qleCFhng5hOVj0dngoiZ927zYTlzgdFQLqnKVJgjJv5RBuqHDJPF8nbo3%2Bxft400e4h%2FJAxg0Pmuslgb7cSK3jwkcvAARKY2UWJHA7gccW%2F9japd96T8jUMnEpVip5ApANfFSRg1RNylRtNwyKqDwCu2AzWrEZZ2eS5%2Fcz4JaSXT0t22%2BmuBjzKGxVyp336Efkrf3X8liCGi8ZlyJeY5IkDKQm",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"0307-魔龙战域-1",
image_url:"http://vweixinthumb.tc.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d040253480410e13eb7f81e7445ac5427c8c417c68bbc02026c260400&amp;hy=SH&amp;storeid=32303137303432373130343330343030306138333663313336666664393336663561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:103,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=BaQ97XL3503Auq%2Fl3Z63G5%2FMMc%2BtVZslK8LZCGSv74ZwnlaGZRMH6kv%2F0nK0GPyASYIyb%2BUQbqisCYeoTicGk8hp2MOqOUQMyv2weAJ6q%2FPGQslfRjAx8ZEakCuxw6nSn4slmx9dsu2Ux5SaSleqJn7BfGnvyvV1SX5JtGh9anjn4ibrl0nktv3hB%2B2%2FZMYQTobLlj5QPCjNDxOllyIegnRZiKM%2FH%2B31Zr2AGeqC0EPBIeK1dvG0GIHwjMYB1odiJNiK8Togz36JenoPEd9oAWOasyGHdVNZGprI1xg0%2FYvnXqKqSkmDRtAip0Ddi6AVkOEnrBJDPhXCWUs%2Bu1%2Bx8ruQQ8Oawsb8aQhGivNmsaDHCUTzFq7%2FdHv7u%2B86Ciz%2FydhvJWKGxhjS2ItjpljV49%2Fc4Q5IrDy0DsFe863NkXe6EjxRwa81VTiY2KmI20o3x%2B8%2BlUR5OqJlGa8KRkDUv0eeG5%2BYiKsMds5VcgVHo6Jmjv3w80zVqg24wAPZPY1W3lhD%2BUXJfSOA7iQ%2FUQPTxA8CrDyAHKe%2FeP%2BMvzz2cAni5wveEheyqlASUoVVdpKej7lLUsF3sBMeIIaP%2BDlTNM6zu0IJEeJHMCdcPyIz%2FLELhSw2lxv4oju2Wu2WEI4RUkj2W%2BWmpBrdR5w8SlpJ8DwcHOuVtk1Qjm12sjZ3OwjYCtP4VXwr7230nUdqpUGUz3MdWAOoLTWbK%2B64vMnmJhIsmEW8bAdJMkBCn20HyJVoi2NCeZFGuWtOcZ%2BsOY6p1%2FNO5J21pq7Yi3i1O0x5V2TSk%2B7p%2BRgRm3%2FQotAuQeBOAfPgm85YjuJzVCuZ6KcTEaGAp1qleCFhng5hOVj0dngoiZ927zYTlzgdFQLqnKVJgjJv5RBuqHDJPF8nbo3%2Bxft400e4h%2FJAxg0Pmuslgb7cSK3jwkcvAARKY2UWJHA7gccW%2F9japd96T8jUMnEpVip5ApANfFSRg1RNylRtNwyKqDwCu2AzWrEZZ2eS5%2Fcz4JaSXT0t22%2BmuBjzKGxVyp336Efkrf3X8liCGi8ZlyJeY5IkDKQm",
ticket:"2d4hi78djhdmi",
traceid:"wx0rir2hs42k4zvu00",
type:"0",
url:"https://itunes.apple.com/cn/app/%E9%AD%94%E9%BE%99%E6%88%98%E5%9F%9F-%E4%BC%A0%E5%A5%87%E8%B7%A8%E6%9C%8D%E7%AB%9E%E6%8A%80-%E5%AE%9E%E6%97%B6%E6%BF%80%E6%83%85pk/id1177821716?mt=8&amp;uo=4&amp;weixinadkey=f65aa694022d1eb46a0da2b9286cf607f91178d071f0161c50f66291b21f0879436343822ded6c294be38b1ac77e302d&amp;ticket=2d4hi78djhdmi&amp;gdt_vid=wx0rir2hs42k4zvu00&amp;md5sum=&amp;weixinadinfo=10904444.wx0rir2hs42k4zvu00.0.1",
watermark_type:0
},
pt_103x1:{
ad_desc:"",
aid:"14690166",
app_info:{
apk_name:"com.vipshop.iphone",
apk_url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4",
app_id:417200582,
app_md5:"",
app_name:"唯品会 - 全球精选 正品特卖",
app_rating:4.5,
app_size:177868800,
app_type:0,
appinfo_url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4",
category:["购物","生活"],
channel_id:"",
desc:"",
down_count:0,
icon_url:"http://mmbiz.qpic.cn/mmbiz_jpg/QxcpzGS56acDgouyWHPicmB7uddoozlibww6EFq9dxplGGnTm89rxMYxGSvO6MPwABPI6fUxaZKzxcJBqbNqsR8Q/0",
new_feature:"",
signature_md5:"",
snap_shots:"",
url_scheme:"",
version_code:0
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=U1yjZ%2BxwYQbCgbvSiCl7sdIQbkIlw%2BK38Q87PiH%2B2A0U147V7yYHvMdwUgyY3rxyxyCzKNTxp1d7SuvgHltNZfl5KO10DjFvngfguSdBSGEX1mrrezc%2FSM757ZuoeLmOkKbwz1L1IXV54smUztL3iElnrcrFJO5YnsnxJYBEidtS1J%2FKTgkNsgP%2BBFHbXVc4FeAdrzscb5%2F7U0%2B5Q9lz8mipql9wAChjCOJRE5XxDDMys8Ugu9cVFDueqZmsS9bs6B1mdZ4AD6arzM%2FPaZ6%2FxkYDaadvcYhVvEphp6qfCeqx%2FX3y1vvh9asbCy4EkQt7IDsXZmZ4PpK%2BjKUu8yvViytKBuJPf6jGmpbgGYSfl1ppjGIYA0fhZsHSqwU%2BIBeF9netPpt23GXK894wKMbKlIuxy7IV5BnzJ67zrl4iO%2BdDZCh%2BoCsG0MEwApmTPy88ctS%2FjsF1mxNPpkRLxiddExCmEek9Q4HHrCyAUztemEudqlbNabEFZZMRnXnmHc8J3RkYx0M7eu7%2B1RQHbPYJmIQDYut%2B7n1E%2Fak1uzbAg6OoVuI3C4cCdMalbQQMRc%2BJDcQhTfBu%2BFzwUegTMx6PLtgw%2FtCgeC6YVOxxfLf9x8K4M0pkjjYLD5eKYjQEU3AKidPc3nrD64Y7fjtHsDNLuwajxDDgdxusixnJEuaADc8e%2BUcs8pHzr1fA8ndPFjfq1abY2U42C2yJkrcJs1CVUk7YNWcuk77E2hIFQ%2F8%2B%2B6E6BmaLdY1e6ZATjD0W%2BXxKGGtmAG2VhKWNrTMZeaTlLG7ZA04pLREUNjMeZjY20Z3tavH%2FdBvHctYTub1gqF5LOooF8f%2FM5OrjOy8aMheNOhCQCtleUhHM8F2iXcS0gJgJjVRMMGETPLhF%2B5gosi7wOBrYg%2BECoA6n9qqu2NJtSMEIvNWj8LY6rVwW%2Fc09NfYg3Q5IvFRAxpqzNUGRu5Odvmno5yZj%2F2rMoZqoIM1tXYS1SOBw%2FLHCswqOsGq%2B0slUrEtwvitJRy8wLD3Y8lbMT2zHA3SWQu8bFd%2B%2B%2Bjn3c%2BVTSb2FkE6hWbPoXp4VzceD%2Fo3AgkgsmCGFpOlRWt0wnGOcsK6s0oQ%3D",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"IOS-牛仔单品-0408",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d040253480410ff8ee6a9e5086ee741f3fb674cf6f39702026d7f0400&amp;hy=SH&amp;storeid=32303137303832353034333232323030306132666331313336666664393336663561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:103,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=U1yjZ%2BxwYQbCgbvSiCl7sdIQbkIlw%2BK38Q87PiH%2B2A0U147V7yYHvMdwUgyY3rxyxyCzKNTxp1d7SuvgHltNZfl5KO10DjFvngfguSdBSGEX1mrrezc%2FSM757ZuoeLmOkKbwz1L1IXV54smUztL3iElnrcrFJO5YnsnxJYBEidtS1J%2FKTgkNsgP%2BBFHbXVc4FeAdrzscb5%2F7U0%2B5Q9lz8mipql9wAChjCOJRE5XxDDMys8Ugu9cVFDueqZmsS9bs6B1mdZ4AD6arzM%2FPaZ6%2FxkYDaadvcYhVvEphp6qfCeqx%2FX3y1vvh9asbCy4EkQt7IDsXZmZ4PpK%2BjKUu8yvViytKBuJPf6jGmpbgGYSfl1ppjGIYA0fhZsHSqwU%2BIBeF9netPpt23GXK894wKMbKlIuxy7IV5BnzJ67zrl4iO%2BdDZCh%2BoCsG0MEwApmTPy88ctS%2FjsF1mxNPpkRLxiddExCmEek9Q4HHrCyAUztemEudqlbNabEFZZMRnXnmHc8J3RkYx0M7eu7%2B1RQHbPYJmIQDYut%2B7n1E%2Fak1uzbAg6OoVuI3C4cCdMalbQQMRc%2BJDcQhTfBu%2BFzwUegTMx6PLtgw%2FtCgeC6YVOxxfLf9x8K4M0pkjjYLD5eKYjQEU3AKidPc3nrD64Y7fjtHsDNLuwajxDDgdxusixnJEuaADc8e%2BUcs8pHzr1fA8ndPFjfq1abY2U42C2yJkrcJs1CVUk7YNWcuk77E2hIFQ%2F8%2B%2B6E6BmaLdY1e6ZATjD0W%2BXxKGGtmAG2VhKWNrTMZeaTlLG7ZA04pLREUNjMeZjY20Z3tavH%2FdBvHctYTub1gqF5LOooF8f%2FM5OrjOy8aMheNOhCQCtleUhHM8F2iXcS0gJgJjVRMMGETPLhF%2B5gosi7wOBrYg%2BECoA6n9qqu2NJtSMEIvNWj8LY6rVwW%2Fc09NfYg3Q5IvFRAxpqzNUGRu5Odvmno5yZj%2F2rMoZqoIM1tXYS1SOBw%2FLHCswqOsGq%2B0slUrEtwvitJRy8wLD3Y8lbMT2zHA3SWQu8bFd%2B%2B%2Bjn3c%2BVTSb2FkE6hWbPoXp4VzceD%2Fo3AgkgsmCGFpOlRWt0wnGOcsK6s0oQ%3D",
ticket:"2t3fxa7gwijlf",
traceid:"wx0abnpizrj5oq3m00",
type:"0",
url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4&amp;weixinadkey=3cd216b7f0cabb3fd88ead2f48df5b44d3906580063ce9c182d4571e9e24ea657458ed9501be0ffec77716211c50162f&amp;ticket=2t3fxa7gwijlf&amp;gdt_vid=wx0abnpizrj5oq3m00&amp;md5sum=&amp;weixinadinfo=14690166.wx0abnpizrj5oq3m00.0.1",
watermark_type:0
},
pt_103x2:{
ad_desc:"",
aid:"14690166",
app_info:{
apk_name:"com.vipshop.iphone",
apk_url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4",
app_id:417200582,
app_md5:"",
app_name:"唯品会 - 全球精选 正品特卖",
app_rating:4.5,
app_size:177868800,
app_type:0,
appinfo_url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4",
category:["购物","生活"],
channel_id:"",
desc:"",
down_count:0,
icon_url:"http://mmbiz.qpic.cn/mmbiz_jpg/QxcpzGS56acDgouyWHPicmB7uddoozlibww6EFq9dxplGGnTm89rxMYxGSvO6MPwABPI6fUxaZKzxcJBqbNqsR8Q/0",
new_feature:"",
signature_md5:"",
snap_shots:"",
url_scheme:"vipshop://goHome?tra_from=tra%3Atlkelyf1%3A%3A%3A%3A",
version_code:0
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=U1yjZ%2BxwYQbCgbvSiCl7sdIQbkIlw%2BK38Q87PiH%2B2A0U147V7yYHvMdwUgyY3rxyxyCzKNTxp1d7SuvgHltNZfl5KO10DjFvngfguSdBSGEX1mrrezc%2FSM757ZuoeLmOkKbwz1L1IXV54smUztL3iElnrcrFJO5YnsnxJYBEidtS1J%2FKTgkNsgP%2BBFHbXVc4FeAdrzscb5%2F7U0%2B5Q9lz8mipql9wAChjCOJRE5XxDDMys8Ugu9cVFDueqZmsS9bs6B1mdZ4AD6arzM%2FPaZ6%2FxkYDaadvcYhVvEphp6qfCeqx%2FX3y1vvh9asbCy4EkQt7IDsXZmZ4PpK%2BjKUu8yvViytKBuJPf6jGmpbgGYSfl1ppjGIYA0fhZsHSqwU%2BIBeF9netPpt23GXK894wKMbKlIuxy7IV5BnzJ67zrl4iO%2BdDZCh%2BoCsG0MEwApmTPy88ctS%2FjsF1mxNPpkRLxiddExCmEek9Q4HHrCyAUztemEudqlbNabEFZZMRnXnmHc8J3RkYx0M7eu7%2B1RQHbPYJmIQDYut%2B7n1E%2Fak1uzbAg6OoVuI3C4cCdMalbQQMRc%2BJDcQhTfBu%2BFzwUegTMx6PLtgw%2FtCgeC6YVOxxfLf9x8K4M0pkjjYLD5eKYjQEU3AKidPc3nrD64Y7fjtHsDNLuwajxDDgdxusixnJEuaADc8e%2BUcs8pHzr1fA8ndPFjfq1abY2U42C2yJkrcJs1CVUk7YNWcuk77E2hIFQ%2F8%2B%2B6E6BmaLdY1e6ZATjD0W%2BXxKGGtmAG2VhKWNrTMZeaTlLG7ZA04pLREUNjMeZjY20Z3tavH%2FdBvHctYTub1gqF5LOooF8f%2FM5OrjOy8aMheNOhCQCtleUhHM8F2iXcS0gJgJjVRMMGETPLhF%2B5gosi7wOBrYg%2BECoA6n9qqu2NJtSMEIvNWj8LY6rVwW%2Fc09NfYg3Q5IvFRAxpqzNUGRu5Odvmno5yZj%2F2rMoZqoIM1tXYS1SOBw%2FLHCswqOsGq%2B0slUrEtwvitJRy8wLD3Y8lbMT2zHA3SWQu8bFd%2B%2B%2Bjn3c%2BVTSb2FkE6hWbPoXp4VzceD%2Fo3AgkgsmCGFpOlRWt0wnGOcsK6s0oQ%3D",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"IOS-牛仔单品-0408",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d040253480410ff8ee6a9e5086ee741f3fb674cf6f39702026d7f0400&amp;hy=SH&amp;storeid=32303137303832353034333232323030306132666331313336666664393336663561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:103,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=U1yjZ%2BxwYQbCgbvSiCl7sdIQbkIlw%2BK38Q87PiH%2B2A0U147V7yYHvMdwUgyY3rxyxyCzKNTxp1d7SuvgHltNZfl5KO10DjFvngfguSdBSGEX1mrrezc%2FSM757ZuoeLmOkKbwz1L1IXV54smUztL3iElnrcrFJO5YnsnxJYBEidtS1J%2FKTgkNsgP%2BBFHbXVc4FeAdrzscb5%2F7U0%2B5Q9lz8mipql9wAChjCOJRE5XxDDMys8Ugu9cVFDueqZmsS9bs6B1mdZ4AD6arzM%2FPaZ6%2FxkYDaadvcYhVvEphp6qfCeqx%2FX3y1vvh9asbCy4EkQt7IDsXZmZ4PpK%2BjKUu8yvViytKBuJPf6jGmpbgGYSfl1ppjGIYA0fhZsHSqwU%2BIBeF9netPpt23GXK894wKMbKlIuxy7IV5BnzJ67zrl4iO%2BdDZCh%2BoCsG0MEwApmTPy88ctS%2FjsF1mxNPpkRLxiddExCmEek9Q4HHrCyAUztemEudqlbNabEFZZMRnXnmHc8J3RkYx0M7eu7%2B1RQHbPYJmIQDYut%2B7n1E%2Fak1uzbAg6OoVuI3C4cCdMalbQQMRc%2BJDcQhTfBu%2BFzwUegTMx6PLtgw%2FtCgeC6YVOxxfLf9x8K4M0pkjjYLD5eKYjQEU3AKidPc3nrD64Y7fjtHsDNLuwajxDDgdxusixnJEuaADc8e%2BUcs8pHzr1fA8ndPFjfq1abY2U42C2yJkrcJs1CVUk7YNWcuk77E2hIFQ%2F8%2B%2B6E6BmaLdY1e6ZATjD0W%2BXxKGGtmAG2VhKWNrTMZeaTlLG7ZA04pLREUNjMeZjY20Z3tavH%2FdBvHctYTub1gqF5LOooF8f%2FM5OrjOy8aMheNOhCQCtleUhHM8F2iXcS0gJgJjVRMMGETPLhF%2B5gosi7wOBrYg%2BECoA6n9qqu2NJtSMEIvNWj8LY6rVwW%2Fc09NfYg3Q5IvFRAxpqzNUGRu5Odvmno5yZj%2F2rMoZqoIM1tXYS1SOBw%2FLHCswqOsGq%2B0slUrEtwvitJRy8wLD3Y8lbMT2zHA3SWQu8bFd%2B%2B%2Bjn3c%2BVTSb2FkE6hWbPoXp4VzceD%2Fo3AgkgsmCGFpOlRWt0wnGOcsK6s0oQ%3D",
ticket:"2t3fxa7gwijlf",
traceid:"wx0abnpizrj5oq3m00",
type:"0",
url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4&amp;weixinadkey=3cd216b7f0cabb3fd88ead2f48df5b44d3906580063ce9c182d4571e9e24ea657458ed9501be0ffec77716211c50162f&amp;ticket=2t3fxa7gwijlf&amp;gdt_vid=wx0abnpizrj5oq3m00&amp;md5sum=&amp;weixinadinfo=14690166.wx0abnpizrj5oq3m00.0.1",
watermark_type:0
},
pt_104:{
ad_desc:"",
aid:"10824252",
app_info:{
apk_name:"com.dushe.movie",
apk_url:"http://imtt.dd.qq.com/16891/B957D57DF9BA262E7ED8588E746E3B6F.apk?fsname=com.dushe.movie_1.0.10_12.apk&amp;csr=1bca",
app_id:1105719791,
app_md5:"B957D57DF9BA262E7ED8588E746E3B6F",
app_name:"毒舌电影",
app_rating:4.95802,
app_size:14312989,
app_type:1,
appinfo_url:"http://imtt.dd.qq.com/16891/B957D57DF9BA262E7ED8588E746E3B6F.apk?fsname=com.dushe.movie_1.0.10_12.apk&amp;csr=1bca",
category:[],
channel_id:"000116083635343432333337",
desc:"挑选好片拒绝烂片、千万影迷聚集的影视社区！1、评电影：这里提供真实、无水军的电影评分，看片前查一下，从此告别烂片；2、找汁源：海量视频资源，找你想看的片，从此不再苦苦求种；3、喷电影：一群毒舌家族老司机，陪你神侃各类影视话题，由浅入深，渐入佳境；4、毒舌影评：毒舌家族每日推荐有料的影视播报，以毒舌刻薄的作风，保证片片优质；5、我的想看：想看的电影，售票时间、影评资讯等消息让你抢先知道，不再错过。---用户评价摘选---关注毒舌电影以来帮我省了不少钱，好片推荐烂片预警！ -by 生命如墙这样说真话不怕得罪人的app我真是第一次见，选片前刷一下很有必要 -by 鬼叫影评独到，不偏不倚，推荐的影片还提供资源，很棒。 -by Wayne虽然叫“毒舌”两字，却是影评界的一道清流，不做作，必看影评！-by tianxie相信毒舌不会让热爱电影的朋友失望，中国影评的评分标杆！ -by 凡人小康app的开机电影就让我爱上了！评分制度、功能编排、电影预告等都很用心在做，以后电影评分来这里了 -by 桐桐桐铜内容和功能都很不错，很喜欢UI，nice App! -by DryLhcl公众号：毒舌电影微博：@毒舌电影网址：www.dushemovie.com反馈邮箱：support@youhaoxi.cn",
down_count:364220,
icon_url:"http://pp.myapp.com/ma_icon/0/icon_52414231_1493103610/256",
new_feature:"1.1.4版本特性1、全新首页—查找内容更爽了，各种分类一目了然；2、影评、视频增加快捷入口，历史／热门内容清晰呈现；",
signature_md5:"93850477387C9C3E7381EE4A1CB9A702",
snap_shots:"http://pp.myapp.com/ma_pic2/0/shot_52414231_1_1498021362/330|http://pp.myapp.com/ma_pic2/0/shot_52414231_2_1498021362/330|http://pp.myapp.com/ma_pic2/0/shot_52414231_3_1498021362/330|http://pp.myapp.com/ma_pic2/0/shot_52414231_4_1498021362/330|http://pp.myapp.com/ma_pic2/0/shot_52414231_5_1498021362/330",
url_scheme:"",
version_code:12
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=EUK6sIITQ%2BIiZgPsXYcyFSLopRX%2BTrpH2F3CF7L%2BTekYp3IvCiBsRaVsRD9fH5fFjeHDFUV50Bg4pAAo6txt4VZMsQ97th8VwccNUbOKyPgtc0iCJW0zreAllxM5u4s8ajB08xXisvtL1zgv9Bw4%2FwSbjo%2FdjoAJM%2FINrWWbbRlH0GKQejxRh1HnUdZ0KnAdGCn5tGakYtL8anfAjq3uJpHjqtZd4JczeHnnT9lMbTnJskpMqmCjP5xmhV6mDt%2FLY3HkTq9QGPPPLqTJKtSQMpTSmgYqtQmfnjtWEr9L%2FBn4rxR6MFJg3AIxf6fUylI%2B5FSuMZKmTx4moN1YK8FYuyy1dNQRRXU022PGpM7vbIZWrPn0MM5Mbo8QGeWj5CBykWWfacC3lBIjut1HwPSJHeHDjhQOhaNQSBG27FGkad6g3LR6ZPlW6A6adVbtRC4jnojBO53yq5Cq4FnhWQdVPOpprYpwF3gbf%2Fh%2FdNJRD7tivQK1WdApXnC%2BzOXT5BGLONzUBoWzii097jlR0bLddaL8YTribN8eft9f1rmy4uVSbViXQK9o0xmPqqSW5nJ9rMLybyBKTnWnVzcCLk4ou3%2BE7PARc5G%2FSxPyh7894cIqocbF5nzNlqntYKlk%2FzFEgpoRRy0anSIsZZ7NmNDsOeLDi3kVd8yyzLDxLhmMPqpfCnzEg9Elcni6fnhddlRm2XHkVkb8Hde27BZDr1DOk21rrDg5jCkVJ0FvlH30s3MXZBoF03Fbvwl%2B5qvleiqbp86Bcu%2F6mhMjZa%2BbcanMlw22QydRW%2Bvg3hVs%2BfsKMrPlumQ7ZEZwMl5LDsrH7cSKg%2BbX7GQLhWMBmT3U%2FmA3JiVBwMg%2FAlo9XrPi4Lqav9QOHBN%2FxCM%2B7ZBQmUiLeUTU7hvPK11npdV0XeOfz1RUO3SvDvY3BaA9s2uGPPpTZFArzGQlIFLGYEHKXHQgXUVZ3a%2FgWbyTV4lj8cAMOZcdQl6z4uC6mr%2FU",
biz_appid:"",
group_id:"",
hint_txt:"毒舌安卓-0425",
image_url:"http://vweixinthumb.tc.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d04025348041087654e9c4648f82e7956612b4c5ee3c5020271b00400&amp;hy=SH&amp;storeid=32303137303432353038313431343030306262326663313336666664393336663561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:104,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=EUK6sIITQ%2BIiZgPsXYcyFSLopRX%2BTrpH2F3CF7L%2BTekYp3IvCiBsRaVsRD9fH5fFjeHDFUV50Bg4pAAo6txt4VZMsQ97th8VwccNUbOKyPgtc0iCJW0zreAllxM5u4s8ajB08xXisvtL1zgv9Bw4%2FwSbjo%2FdjoAJM%2FINrWWbbRlH0GKQejxRh1HnUdZ0KnAdGCn5tGakYtL8anfAjq3uJpHjqtZd4JczeHnnT9lMbTnJskpMqmCjP5xmhV6mDt%2FLY3HkTq9QGPPPLqTJKtSQMpTSmgYqtQmfnjtWEr9L%2FBn4rxR6MFJg3AIxf6fUylI%2B5FSuMZKmTx4moN1YK8FYuyy1dNQRRXU022PGpM7vbIZWrPn0MM5Mbo8QGeWj5CBykWWfacC3lBIjut1HwPSJHeHDjhQOhaNQSBG27FGkad6g3LR6ZPlW6A6adVbtRC4jnojBO53yq5Cq4FnhWQdVPOpprYpwF3gbf%2Fh%2FdNJRD7tivQK1WdApXnC%2BzOXT5BGLONzUBoWzii097jlR0bLddaL8YTribN8eft9f1rmy4uVSbViXQK9o0xmPqqSW5nJ9rMLybyBKTnWnVzcCLk4ou3%2BE7PARc5G%2FSxPyh7894cIqocbF5nzNlqntYKlk%2FzFEgpoRRy0anSIsZZ7NmNDsOeLDi3kVd8yyzLDxLhmMPqpfCnzEg9Elcni6fnhddlRm2XHkVkb8Hde27BZDr1DOk21rrDg5jCkVJ0FvlH30s3MXZBoF03Fbvwl%2B5qvleiqbp86Bcu%2F6mhMjZa%2BbcanMlw22QydRW%2Bvg3hVs%2BfsKMrPlumQ7ZEZwMl5LDsrH7cSKg%2BbX7GQLhWMBmT3U%2FmA3JiVBwMg%2FAlo9XrPi4Lqav9QOHBN%2FxCM%2B7ZBQmUiLeUTU7hvPK11npdV0XeOfz1RUO3SvDvY3BaA9s2uGPPpTZFArzGQlIFLGYEHKXHQgXUVZ3a%2FgWbyTV4lj8cAMOZcdQl6z4uC6mr%2FU",
ticket:"2mkwms35zbept",
traceid:"wx0xqjkdkhmcohlk00",
type:"0",
url:"http://mp.weixin.qq.com/mp/ad_app_info?app_id=1105719791&amp;weixinadkey=5d88339b5cfb77fadd16963a27c22be50cd646e79a1276b85299ae7c7ea395d9536df4d6b3b0ad4a0c6de9943af1b328&amp;ticket=2mkwms35zbept&amp;gdt_vid=wx0xqjkdkhmcohlk00&amp;channel_id=000116083635343432333337&amp;md5sum=B957D57DF9BA262E7ED8588E746E3B6F&amp;weixinadinfo=10824252.wx0xqjkdkhmcohlk00.0.1#wechat_redirect",
watermark_type:0
},
pt_105:{
hint_txt:"80元优惠券你领了吗-ios",
url:"https://mp.weixin.qq.com/mp/ad_biz_info?__biz=MzAwMzIwNDA5NA==&sn=b649ca44a99325d90147a954abd57c08&weixinadkey=f8597c40a1e1d9b133e3da0a9c4cb10ebb0657fabcb11b4faaee411dd00cdd0061ecacfbb361101c212434c607091057&ticket=2tkzedhfavvnh&gdt_vid=wx0ystdughnrwkeg00&weixinadinfo=14883338.wx0ystdughnrwkeg00.0.1#wechat_redirect",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=3zgXCdMPKdJy%2BCQSBW9ArACqYTwyMmlVq8olKeVviDZKfHlHsAS7tVrHrzSh7nduOcqOhf2%2FzrTaV4e3I2%2F0B5HpazXfnl1q5sI%2Bf27kr5FYovuDu5ZeUCz2k95%2B8gTFSMBCkyV5s790Mbt5pB%2BPKX6asfAkwkNGZ9lzFXhNFQUGoIkL8%2FehLI5UPJfnGNgdUN%2F0rNjjLeIcuXsILLv5%2FzfzgUMcTT9mAdkmyW%2FiSbVxy91lEC3GnMkz1Z126D%2B59mH51Kg%2BcdjeR%2BG2%2FZ87PX9JzoU4iQn%2Bt2OxQzX24HYSlG5R7eiMqlzltHaEw9FuuHD34hluU41PN6xX4nUpetU06Nc0U3cYMSaVIOGFWcSMPhFx4tl8xhnGXYOIf4jh8%2Bhz14wlu%2Fvglcn0YLGZuxOXREweMOACXyu02iP4l8Daud5%2BvJOfFvM930NL9yE%2Fwcw6TRWRPD1uEHP%2F1byGbMjW4GO2K2STTi%2F8B3W3ZDaocDit6G3kP4oiVhge8Ft5xcf%2FmcKebkWqNEZsmJrl68vrY4dXwrl1u6wXKhjOOhwEGHOkSkCFwXHOBICsNLAlODu3oo8R%2BQ1Wj7g715VYIv8ZNW3WoeaHWKvX6Zvpf1EgKLRj1FxIZ5joFi2eOkOU2jYWih9JBKuuT8sPMlmWeRQFMgaZ5Rvdt1wjMwD%2BVZ9XnXvE8ipEP9v2UQfhg4TDBxjkX13nsA7%2B1Tt7%2B%2FAi7wQoattaw5CWx7juwYCKcY%2FJgtFgM4wKhdKZalAyGx3Z%2BIUU%2Bew8o2lZeqnRemvGXT9HrPIP2O0VY5vHBPlQLtZuZeoHYfO5lpjduNlrHu%2Fxdd5SjNp75PWGdBA%2BcyBtKulCYSv5KoMxC6hYWxs8eoeTXEWBQtduZI2nd%2Ftmxgxem4p30GululT7jNTjunuNap%2FUFbKbgN2%2Bh9z9nFArWCH2muXmA17KRWmh88CUH3zRo2xgJF2XgsFwvbByrWINS%2FKT%2BXSCPey77nOkQx2R3O0uFePCLKlbXTf9cqsRiM%2BLdSyBCrN9j8ee1yN0faEW7tkjPeVRDpmkUONNr7dYgFtS%2BaJrjxnRx8wf4cxsJrqFHhqo5ma6o83SqAUEsPpftCh%2Bwn52cLUO7XepeqA7ZtU%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=3zgXCdMPKdJy%2BCQSBW9ArACqYTwyMmlVq8olKeVviDZKfHlHsAS7tVrHrzSh7nduOcqOhf2%2FzrTaV4e3I2%2F0B5HpazXfnl1q5sI%2Bf27kr5FYovuDu5ZeUCz2k95%2B8gTFSMBCkyV5s790Mbt5pB%2BPKX6asfAkwkNGZ9lzFXhNFQUGoIkL8%2FehLI5UPJfnGNgdUN%2F0rNjjLeIcuXsILLv5%2FzfzgUMcTT9mAdkmyW%2FiSbVxy91lEC3GnMkz1Z126D%2B59mH51Kg%2BcdjeR%2BG2%2FZ87PX9JzoU4iQn%2Bt2OxQzX24HYSlG5R7eiMqlzltHaEw9FuuHD34hluU41PN6xX4nUpetU06Nc0U3cYMSaVIOGFWcSMPhFx4tl8xhnGXYOIf4jh8%2Bhz14wlu%2Fvglcn0YLGZuxOXREweMOACXyu02iP4l8Daud5%2BvJOfFvM930NL9yE%2Fwcw6TRWRPD1uEHP%2F1byGbMjW4GO2K2STTi%2F8B3W3ZDaocDit6G3kP4oiVhge8Ft5xcf%2FmcKebkWqNEZsmJrl68vrY4dXwrl1u6wXKhjOOhwEGHOkSkCFwXHOBICsNLAlODu3oo8R%2BQ1Wj7g715VYIv8ZNW3WoeaHWKvX6Zvpf1EgKLRj1FxIZ5joFi2eOkOU2jYWih9JBKuuT8sPMlmWeRQFMgaZ5Rvdt1wjMwD%2BVZ9XnXvE8ipEP9v2UQfhg4TDBxjkX13nsA7%2B1Tt7%2B%2FAi7wQoattaw5CWx7juwYCKcY%2FJgtFgM4wKhdKZalAyGx3Z%2BIUU%2Bew8o2lZeqnRemvGXT9HrPIP2O0VY5vHBPlQLtZuZeoHYfO5lpjduNlrHu%2Fxdd5SjNp75PWGdBA%2BcyBtKulCYSv5KoMxC6hYWxs8eoeTXEWBQtduZI2nd%2Ftmxgxem4p30GululT7jNTjunuNap%2FUFbKbgN2%2Bh9z9nFArWCH2muXmA17KRWmh88CUH3zRo2xgJF2XgsFwvbByrWINS%2FKT%2BXSCPey77nOkQx2R3O0uFePCLKlbXTf9cqsRiM%2BLdSyBCrN9j8ee1yN0faEW7tkjPeVRDpmkUONNr7dYgFtS%2BaJrjxnRx8wf4cxsJrqFHhqo5ma6o83SqAUEsPpftCh%2Bwn52cLUO7XepeqA7ZtU%3D",
traceid:"wx0ystdughnrwkeg00",
group_id:"",
ticket:"2tkzedhfavvnh",
aid:"14883338",
pt:105,
image_url:"",
ad_desc:"",
biz_appid:"wxfe55a3afa49537b6",
biz_info:{
user_name:"gh_974472b359a3",
nick_name:"每日优鲜会员店",
is_subscribed:1,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM5O1JC938qZ9IIBmUnlW6QAvyIEuIkn2YcwAHCKVqibzZQ/0",
biz_uin:3003204094
},
pos_type:0,
watermark_type:0,
logo:"",
card_info:{
card_logo_url:"http://mmbiz.qpic.cn/mmbiz/fVRBnicEsiceRpwp7fIX8NmIBEWKXicAEyT8to01Wd8f49bdFMRB24CsA71Hs7asnfBMqZEOlbsjDpELNBP3XGfIQ/0?wx_fmt=jpeg",
card_title:"来就送，全场不限购",
card_brand_name:"每日优鲜",
card_id:"pLdaCt1yKL9u8auHF9Pl5MX9V3Jc",
card_outer_id:"wx0ystdughnrwkeg00_14883338_14883339",
card_ext:'{"code":"","timestamp":1504008556,"signature":"bc543819d991d6df1b446e1cbd52b43693ae0320","openid":"","source_scene":"SOURCE_SCENE_APPMSG_JSAPI","outer_id":0,"unique_id":"","outer_str":"","user_card":{}}'
},
is_cpm:0,
dest_type:0
},
pt_107:{
hint_txt:"香港",
url:"http://clickc.admaster.com.cn/c/a90369,b1882040,c2132,i0,m101,8a2,8b2,h?weixinadkey=b8edb659e79a4c21932d4d5d919b363863a8b6fc1e403d13274587beab13366c0fc8b26e60a6b4b418a4703d9c7ad495&gdt_vid=wx0rvwt6sm654f6200&weixinadinfo=14884284.wx0rvwt6sm654f6200.0.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=MxsJYgnw6iZWfQYjtG9x4aaLEaVH%2FrkkV%2Bs8ttfNZRnOUrbNLRNSMQNOgrzWshG7E57vLfXXbE6hmpkHgIlBzyAJowHYjDT8NsBWh1WrdXi2Y587%2FaZJPLWRn9wjcYJ0XjlYoB2ey6pHq8HT%2BtVkO%2B7stg9mmEvJ%2BNcK61TluidVdPGMsIMGqhBQRP%2BcRs4IaLWRqbqo18FgKEpDgRrjfz82gTMJ0qKcC1UQjQ28JFmPCKZvEbKVjWWQ5DwGpTmMc8oqi%2BnnB87tb3ZRJYx5advhI7s3%2FKAZVviZdkod6YaJzgJR9mm7cp8l1GR3Gld6ysesphqyNARtt9C4LVN%2FuAHTc3E5kH6lvrlAc9s0AM8%2B%2BLOBLjd0ltYVEzu2mkBblGyBmj%2BqvDqej15qeQZZUxwFGg6WlK5FEOZArSBaJEPgZFunxoYwbcpo%2Fz95cmusktYLSbccA9DNORhz8VvHffii3GSqSywZ4hLyne0YNp8o0jwWARw0DYlmnrd36nOsG6u37jkQrjKXCO1OEfGA00lZpKbLghVR06PUtfgGU%2FsceHwpSVYpRtqkpn4QnIoKngOG1%2FFr6VJdj%2BkauF94pWd7emXic2d7qcCyNh%2B1jcLOCR4SfcV33gXq%2FbGE41cCHjH3POIcS17ZnxMdMyaMw0SQQYsgTfByZPSFMWKy3%2FAT6DQLrHX9RoxGzv%2Bae7Cbo3VOlcvrX5ZU08Js%2FtEqFFTB3DOMV%2Bkz6%2BdFxSY2firnG9AsZuwsosu7toBW4wQQLoxf3pWCHsire4%2F6uO7SojOqzTyReH%2BxmR%2BiZ4bZq1ikH1ie5WKVgTUWC71fRKHDc0N6S5Vox0O%2BrfHU3Ew0%2FHyHaIh4tzRsSHjfedzNAYNh5bMppchpPpxfmOlA12aUN0P2DEW83bpJjHuq6Yb5whpG0RSsHOjYORxh46JvuJ%2F3ttAqijAnDZ5K5TokwYC6UCkcQL6ZlYUezONHfEcYPZCimrSryDHEu5hJqCuz2xa12jG1UWru22WSWUp9Mh20dN2oBgQy1V0Va14s4AvtnSld1bbFx8ywEuk5RKPSZMSHL%2F%2BnGfIsX4S8Qdl9Pg%2BxrR%2BjnMhasek%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=MxsJYgnw6iZWfQYjtG9x4aaLEaVH%2FrkkV%2Bs8ttfNZRnOUrbNLRNSMQNOgrzWshG7E57vLfXXbE6hmpkHgIlBzyAJowHYjDT8NsBWh1WrdXi2Y587%2FaZJPLWRn9wjcYJ0XjlYoB2ey6pHq8HT%2BtVkO%2B7stg9mmEvJ%2BNcK61TluidVdPGMsIMGqhBQRP%2BcRs4IaLWRqbqo18FgKEpDgRrjfz82gTMJ0qKcC1UQjQ28JFmPCKZvEbKVjWWQ5DwGpTmMc8oqi%2BnnB87tb3ZRJYx5advhI7s3%2FKAZVviZdkod6YaJzgJR9mm7cp8l1GR3Gld6ysesphqyNARtt9C4LVN%2FuAHTc3E5kH6lvrlAc9s0AM8%2B%2BLOBLjd0ltYVEzu2mkBblGyBmj%2BqvDqej15qeQZZUxwFGg6WlK5FEOZArSBaJEPgZFunxoYwbcpo%2Fz95cmusktYLSbccA9DNORhz8VvHffii3GSqSywZ4hLyne0YNp8o0jwWARw0DYlmnrd36nOsG6u37jkQrjKXCO1OEfGA00lZpKbLghVR06PUtfgGU%2FsceHwpSVYpRtqkpn4QnIoKngOG1%2FFr6VJdj%2BkauF94pWd7emXic2d7qcCyNh%2B1jcLOCR4SfcV33gXq%2FbGE41cCHjH3POIcS17ZnxMdMyaMw0SQQYsgTfByZPSFMWKy3%2FAT6DQLrHX9RoxGzv%2Bae7Cbo3VOlcvrX5ZU08Js%2FtEqFFTB3DOMV%2Bkz6%2BdFxSY2firnG9AsZuwsosu7toBW4wQQLoxf3pWCHsire4%2F6uO7SojOqzTyReH%2BxmR%2BiZ4bZq1ikH1ie5WKVgTUWC71fRKHDc0N6S5Vox0O%2BrfHU3Ew0%2FHyHaIh4tzRsSHjfedzNAYNh5bMppchpPpxfmOlA12aUN0P2DEW83bpJjHuq6Yb5whpG0RSsHOjYORxh46JvuJ%2F3ttAqijAnDZ5K5TokwYC6UCkcQL6ZlYUezONHfEcYPZCimrSryDHEu5hJqCuz2xa12jG1UWru22WSWUp9Mh20dN2oBgQy1V0Va14s4AvtnSld1bbFx8ywEuk5RKPSZMSHL%2F%2BnGfIsX4S8Qdl9Pg%2BxrR%2BjnMhasek%3D",
traceid:"wx0rvwt6sm654f6200",
group_id:"",
ticket:"",
aid:"14884284",
pt:107,
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d04025348041097f8416e7dba80185eb1ce3584b92b3402030119700400&hy=SH&storeid=32303137303832393038343831383030306162333336313336666664393337313561333230613030303030303664&bizid=1023",
ad_desc:"",
biz_appid:"",
pos_type:0,
watermark_type:2,
logo:"",
is_cpm:0,
dest_type:1
},
pt_108:{
hint_txt:"",
url:"http://www.bmw.com.cn/zh/all-models/5-series/sedan/2017/campaign.html?bmw=dis:G38-launch:G30:m_wechhx_17-g38-pd-g38-soc_hxa_am_kol12&weixinadkey=c3e62068f8f6b72b3dfc3a80ea462979a552431fd42aaae1dfffd5c4184a9fc5a6d6788fb07ea9834ea46f0979708832&gdt_vid=wx0bm4j5xpmdnsnw00&weixinadinfo=10464868.wx0bm4j5xpmdnsnw00.1.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=jAt%2BjtzubuFN%2FlLgCHrg2VDh7mykjsR9eRRCq4rl4diohJDfjJVbYwz6t%2BdFfbCXPPs2X3F%2BDexoo%2FXRTEtXKb5B%2BbuCK2mldAwsBMe7w4TrtbdFJdXPvcyL8kYqHCmjjlVy8SjjSjQBboxdpEY1rSeq8Npv0CHN3I1FyHm0vWSkbTvHQ4LvkBJJrw0UGvnLdAy7g4S1InwJeFrW4Cwv9E7rSmPd%2FU9lQwOIdrshIiYlVpRJuQ0yYcI9dJ%2BvnLfN5RlSzXYYbyxlsbZZDslHoEzWwuKfgg7ytoxYlIdXzguHqfawMW90v7vm5v7GTgjRnwdYBEHyrhKliLIFEzWGL5VFhgVD%2B9jKxi%2FphBFPqv0oS7oJUpLThQ8lYP%2FUzspxRTHvPV0ihF1lemXfZ4q7LY3NSXOYsHY%2BtdbEmbXa7EaCmS63bi6GGQTzduFRB5MgpdhSjTPE%2Fq9HqsNU63tU2z2VOUfpXlf0ZL4x%2BaV0UZFKFVc8gfUJCThLk2g37XOiiK%2Bh07p3%2BEI7%2FBiSEfTwDGTqDo9aAOjSYFIq7nGgPhfANjbLPloSeALLlzeulZY9HiiViaV%2BXAlI2zo5GzLSYJNp6bVtimJufEwro7Q0dP5MWfVbREhJ0fZnR3ZYB42VlYSvSLHzn5SjpNwCGfeMGFeR6s9M1C48goH83kChTbHtgaWGXDEyDw5LbZagYZvBGfze1%2BS1G9TLbavn4YvSOgpN6P55wBzx3jgaba%2BmblOoq9QHTNNGuOv9g4X3x7ikFXXmomdM4FpeZWQV4RPByLH2HXs3ntmqpKxcJfXD1VD5XaTYBOcBHcS%2FRXrECMv%2F3bN8%2BBLko%2B66w9yGQsFoxdsRJCgDhOTxRzodVdFfN%2FAFB%2FiJx89rJhinepZi3X00OLJWQTVs4Ro%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=jAt%2BjtzubuFN%2FlLgCHrg2VDh7mykjsR9eRRCq4rl4diohJDfjJVbYwz6t%2BdFfbCXPPs2X3F%2BDexoo%2FXRTEtXKb5B%2BbuCK2mldAwsBMe7w4TrtbdFJdXPvcyL8kYqHCmjjlVy8SjjSjQBboxdpEY1rSeq8Npv0CHN3I1FyHm0vWSkbTvHQ4LvkBJJrw0UGvnLdAy7g4S1InwJeFrW4Cwv9E7rSmPd%2FU9lQwOIdrshIiYlVpRJuQ0yYcI9dJ%2BvnLfN5RlSzXYYbyxlsbZZDslHoEzWwuKfgg7ytoxYlIdXzguHqfawMW90v7vm5v7GTgjRnwdYBEHyrhKliLIFEzWGL5VFhgVD%2B9jKxi%2FphBFPqv0oS7oJUpLThQ8lYP%2FUzspxRTHvPV0ihF1lemXfZ4q7LY3NSXOYsHY%2BtdbEmbXa7EaCmS63bi6GGQTzduFRB5MgpdhSjTPE%2Fq9HqsNU63tU2z2VOUfpXlf0ZL4x%2BaV0UZFKFVc8gfUJCThLk2g37XOiiK%2Bh07p3%2BEI7%2FBiSEfTwDGTqDo9aAOjSYFIq7nGgPhfANjbLPloSeALLlzeulZY9HiiViaV%2BXAlI2zo5GzLSYJNp6bVtimJufEwro7Q0dP5MWfVbREhJ0fZnR3ZYB42VlYSvSLHzn5SjpNwCGfeMGFeR6s9M1C48goH83kChTbHtgaWGXDEyDw5LbZagYZvBGfze1%2BS1G9TLbavn4YvSOgpN6P55wBzx3jgaba%2BmblOoq9QHTNNGuOv9g4X3x7ikFXXmomdM4FpeZWQV4RPByLH2HXs3ntmqpKxcJfXD1VD5XaTYBOcBHcS%2FRXrECMv%2F3bN8%2BBLko%2B66w9yGQsFoxdsRJCgDhOTxRzodVdFfN%2FAFB%2FiJx89rJhinepZi3X00OLJWQTVs4Ro%3D",
traceid:"wx0bm4j5xpmdnsnw00",
group_id:"",
ticket:"",
aid:"10464868",
pt:108,
image_url:"http://vweixinthumb.tc.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410843862ace59d7f54684e8636e547179d02030107250400&hy=SH&storeid=32303137303431313130333130363030303433643732313336666664393336663561333230613030303030303664&bizid=1023",
ad_desc:"",
biz_appid:"wx32aa823f78e5f6ad",
biz_info:{
user_name:"gh_f917083b43f6",
nick_name:"宝马中国",
is_subscribed:0,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM76uydt9p5uZibiapePLb7Fq9uohicmOyqphtUVfBAapY6Bg/0",
biz_uin:2399998701
},
pos_type:3,
watermark_type:2,
logo:"",
is_cpm:1,
dest_type:0
},
pt_108x1:{
hint_txt:"",
url:"https://mp.weixin.qq.com/tp/ad_detail_info?page_key=fb453cc093cadbb19e1164df64b76670606affb1f3a67a2b661552266d7c7d9c38dc8b93b7234a3c307e9f589c706a38&amp;weixinadkey=9beedd976bec8f5dd185840039eb0a6d167106fa76a3bf90181a1313708f9ae5133a3a1741ce1ed6230bee56c0067eb3&amp;ticket=2iy82ek9vr14r&amp;gdt_vid=wx0mgwlsn7oqz4eo00&amp;weixinadinfo=17563214.wx0mgwlsn7oqz4eo00.0.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=jRJ2yVdzo",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=jRJ2yVdzo",
traceid:"wx0mgwlsn7oqz4eo00",
group_id:"",
ticket:"2iy82ek9vr14r",
aid:"17563214",
pt:108,
image_url:"http://wxsnsdythumb.wxs.qq.com/109/20204/snsvideodownload?m=65ce79901c249141a62daf68f4a585dd&amp;filekey=30340201010420301e02016d04025348041065ce79901c249141a62daf68f4a585dd020300de4c040d00000004627466730000000131&amp;hy=SH&amp;storeid=32303138303230363034333635353030306333666438313336666664393331333630333230613030303030303664&amp;bizid=1023",
app_info:{
category:[],
url_scheme:""
},
ad_desc:"",
biz_appid:"wx1810db69dad380b3",
biz_info:{
user_name:"gh_715d9b59caea",
nick_name:"2394012349",
is_subscribed:0,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM4rBIcmiaQiabtaQ7PcRrX5YDD5IToCZEctSpxfbTAB3K5Q/0",
biz_uin:2394012349
},
pos_type:3,
watermark_type:2,
logo:"",
is_cpm:1,
dest_type:9,
material_width:690,
material_height:388,
canvas_info:{
canvas_id:"115732",
ad_info_xml:"&lt;?xml version=&#39;1.0&#39; encoding=&#39;utf-8&#39; ?&gt;\n&lt;ADInfo&gt;\n	&lt;uxinfo&gt;17563214|wx0mgwlsn7oqz4eo00||0|1517979379|0&lt;/uxinfo&gt;\n	&lt;session_data&gt;\n		&lt;trace_id&gt;wx0mgwlsn7oqz4eo00&lt;/trace_id&gt;\n		&lt;aid&gt;17563214&lt;/aid&gt;\n	&lt;/session_data&gt;\n&lt;/ADInfo&gt;\n\n"
}
},
pt_112:{
ad_desc:"",
aid:"14693949",
app_info:{
apk_name:"com.vipshop.iphone",
apk_url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4",
app_id:417200582,
app_md5:"",
app_name:"唯品会 - 全球精选 正品特卖",
app_rating:4.5,
app_size:177868800,
app_type:0,
appinfo_url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4",
category:["购物","生活"],
channel_id:"",
desc:"",
down_count:0,
icon_url:"http://mmbiz.qpic.cn/mmbiz_jpg/QxcpzGS56acDgouyWHPicmB7uddoozlibww6EFq9dxplGGnTm89rxMYxGSvO6MPwABPI6fUxaZKzxcJBqbNqsR8Q/0",
new_feature:"",
signature_md5:"",
snap_shots:"",
url_scheme:"",
version_code:0
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=dzPi6nSDBnUeIy2F22yf%2BRcXSt9Mowsho0QDRtu7vZ99upmzsmxqZNyoOHuOD9PlyAWcottz9uYBorF30lIRkKpMxis%2BAEYckXqka%2F3BkAvAC5QAOfjWW2BWRrDMLFjYbHNaw3CCKFLAjpcBvPCp1QDTKBwGB6zaPDnDi94Y4K0Cjb3SOYLvW1SZbDbjDeMnPePjvx0QbhEUGNVqjlKKN1es23L4fsxA%2F7iL%2FNAj0YDS4IneMCe2M2T%2Fq49a7lwX8dchCyJ6g6qTE5yLXRPfHK0AklwHe9lam1Bp2ECs6DMBqbSVrs2%2BHP9G0HGevSBpM%2Fzsdzk6cWBaD2ZgL6RumRPxPwUeyJ2AHkY2u105cdsFfbHsUYNASgKvnaO4X38Y1Z2QuPH9amrHlVXyGuiZvO5uR2yT3rKLzjTd%2F6fKWWqT%2Fazr0rxYjo2oSYdzLG01lOh8zuFlYOojcRjeEsgaOTF03wnD6TK%2FhT7bA8dAtUjV7l%2F8asbPKW0RhJFodllHwPsm8%2FHOP3%2FfF29R9AyPcR6GD0vQSfjR5iwjhNa5F07aGlqWUtNAixvC7DY51sJluBMMf1PJ9p2itkjbLHA52vXt0l9WuLraoPM6LbR8zocssCDSlbant2mAKEIAB%2F8N4DLQGTrsPSBIE90VhE%2BRpaZWkBI%2FuhnCzDJoC7x4LtCmj01YRwFFMoCL8VT71z2f4buxqsqLSsE0t3fvQRn8YXuUv1X1vHEIVnD14ixD0gOkWIFJkpBH%2BV91S7ZP%2BbALie4LjkzxumDWj2RDBraUPogOn2yEm8H7zoAMs%2F%2B0WN0R8iMNuM79OcZqGMsDS2n5r4NBztFcuhXdi3Sr8hMhMfqLc2YLbwSbUGzWEbCq1OH01DTPn2uwHy2vBUf5pT4mVvTHjXYNLKmoSfisbnBCiv1pnU2kh09zaJacDRyCmjOkOmDMZgt1HjtCpwcR5tFQ%2FmMhGkHqy%2FFe6lWqggbiaj%2FT04oR7Btlfd51astFioXTHtmtUVyqwlTRftjl%2ByRyKZ9%2F3ZuWxWRgJNQX%2FaSsgAVggxTZp18neL1rVS21a%2F3fIDNk5EUlhBqTsHzjGStOQwG2YvVSQOk%3D",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"IOS-牛仔单品-0408",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d04025348041003cbda0b46790c0aaabd593d59a13048020300c2780400&amp;hy=SH&amp;storeid=32303137303832353035353332333030306433313263313336666664393336663561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:112,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=dzPi6nSDBnUeIy2F22yf%2BRcXSt9Mowsho0QDRtu7vZ99upmzsmxqZNyoOHuOD9PlyAWcottz9uYBorF30lIRkKpMxis%2BAEYckXqka%2F3BkAvAC5QAOfjWW2BWRrDMLFjYbHNaw3CCKFLAjpcBvPCp1QDTKBwGB6zaPDnDi94Y4K0Cjb3SOYLvW1SZbDbjDeMnPePjvx0QbhEUGNVqjlKKN1es23L4fsxA%2F7iL%2FNAj0YDS4IneMCe2M2T%2Fq49a7lwX8dchCyJ6g6qTE5yLXRPfHK0AklwHe9lam1Bp2ECs6DMBqbSVrs2%2BHP9G0HGevSBpM%2Fzsdzk6cWBaD2ZgL6RumRPxPwUeyJ2AHkY2u105cdsFfbHsUYNASgKvnaO4X38Y1Z2QuPH9amrHlVXyGuiZvO5uR2yT3rKLzjTd%2F6fKWWqT%2Fazr0rxYjo2oSYdzLG01lOh8zuFlYOojcRjeEsgaOTF03wnD6TK%2FhT7bA8dAtUjV7l%2F8asbPKW0RhJFodllHwPsm8%2FHOP3%2FfF29R9AyPcR6GD0vQSfjR5iwjhNa5F07aGlqWUtNAixvC7DY51sJluBMMf1PJ9p2itkjbLHA52vXt0l9WuLraoPM6LbR8zocssCDSlbant2mAKEIAB%2F8N4DLQGTrsPSBIE90VhE%2BRpaZWkBI%2FuhnCzDJoC7x4LtCmj01YRwFFMoCL8VT71z2f4buxqsqLSsE0t3fvQRn8YXuUv1X1vHEIVnD14ixD0gOkWIFJkpBH%2BV91S7ZP%2BbALie4LjkzxumDWj2RDBraUPogOn2yEm8H7zoAMs%2F%2B0WN0R8iMNuM79OcZqGMsDS2n5r4NBztFcuhXdi3Sr8hMhMfqLc2YLbwSbUGzWEbCq1OH01DTPn2uwHy2vBUf5pT4mVvTHjXYNLKmoSfisbnBCiv1pnU2kh09zaJacDRyCmjOkOmDMZgt1HjtCpwcR5tFQ%2FmMhGkHqy%2FFe6lWqggbiaj%2FT04oR7Btlfd51astFioXTHtmtUVyqwlTRftjl%2ByRyKZ9%2F3ZuWxWRgJNQX%2FaSsgAVggxTZp18neL1rVS21a%2F3fIDNk5EUlhBqTsHzjGStOQwG2YvVSQOk%3D",
ticket:"2t3fxa7gwijlf",
traceid:"wx0yep5orkdfvofu00",
type:"0",
url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4&amp;weixinadkey=b562294f6542f5f06567317aef77f34650af02b6f13068dd9194cc80ea5d8fd177047dd133d89ad6e4eb8f6aba73ce96&amp;ticket=2t3fxa7gwijlf&amp;gdt_vid=wx0yep5orkdfvofu00&amp;md5sum=&amp;weixinadinfo=14693949.wx0yep5orkdfvofu00.0.1",
watermark_type:0
},
pt_112x1:{
ad_desc:"",
aid:"14693949",
app_info:{
apk_name:"com.vipshop.iphone",
apk_url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4",
app_id:417200582,
app_md5:"",
app_name:"唯品会 - 全球精选 正品特卖",
app_rating:4.5,
app_size:177868800,
app_type:0,
appinfo_url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4",
category:["购物","生活"],
channel_id:"",
desc:"",
down_count:0,
icon_url:"http://mmbiz.qpic.cn/mmbiz_jpg/QxcpzGS56acDgouyWHPicmB7uddoozlibww6EFq9dxplGGnTm89rxMYxGSvO6MPwABPI6fUxaZKzxcJBqbNqsR8Q/0",
new_feature:"",
signature_md5:"",
snap_shots:"",
url_scheme:"vipshop://goHome?tra_from=tra%3Atlkelyf1%3A%3A%3A%3A",
version_code:0
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=dzPi6nSDBnUeIy2F22yf%2BRcXSt9Mowsho0QDRtu7vZ99upmzsmxqZNyoOHuOD9PlyAWcottz9uYBorF30lIRkKpMxis%2BAEYckXqka%2F3BkAvAC5QAOfjWW2BWRrDMLFjYbHNaw3CCKFLAjpcBvPCp1QDTKBwGB6zaPDnDi94Y4K0Cjb3SOYLvW1SZbDbjDeMnPePjvx0QbhEUGNVqjlKKN1es23L4fsxA%2F7iL%2FNAj0YDS4IneMCe2M2T%2Fq49a7lwX8dchCyJ6g6qTE5yLXRPfHK0AklwHe9lam1Bp2ECs6DMBqbSVrs2%2BHP9G0HGevSBpM%2Fzsdzk6cWBaD2ZgL6RumRPxPwUeyJ2AHkY2u105cdsFfbHsUYNASgKvnaO4X38Y1Z2QuPH9amrHlVXyGuiZvO5uR2yT3rKLzjTd%2F6fKWWqT%2Fazr0rxYjo2oSYdzLG01lOh8zuFlYOojcRjeEsgaOTF03wnD6TK%2FhT7bA8dAtUjV7l%2F8asbPKW0RhJFodllHwPsm8%2FHOP3%2FfF29R9AyPcR6GD0vQSfjR5iwjhNa5F07aGlqWUtNAixvC7DY51sJluBMMf1PJ9p2itkjbLHA52vXt0l9WuLraoPM6LbR8zocssCDSlbant2mAKEIAB%2F8N4DLQGTrsPSBIE90VhE%2BRpaZWkBI%2FuhnCzDJoC7x4LtCmj01YRwFFMoCL8VT71z2f4buxqsqLSsE0t3fvQRn8YXuUv1X1vHEIVnD14ixD0gOkWIFJkpBH%2BV91S7ZP%2BbALie4LjkzxumDWj2RDBraUPogOn2yEm8H7zoAMs%2F%2B0WN0R8iMNuM79OcZqGMsDS2n5r4NBztFcuhXdi3Sr8hMhMfqLc2YLbwSbUGzWEbCq1OH01DTPn2uwHy2vBUf5pT4mVvTHjXYNLKmoSfisbnBCiv1pnU2kh09zaJacDRyCmjOkOmDMZgt1HjtCpwcR5tFQ%2FmMhGkHqy%2FFe6lWqggbiaj%2FT04oR7Btlfd51astFioXTHtmtUVyqwlTRftjl%2ByRyKZ9%2F3ZuWxWRgJNQX%2FaSsgAVggxTZp18neL1rVS21a%2F3fIDNk5EUlhBqTsHzjGStOQwG2YvVSQOk%3D",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"IOS-牛仔单品-0408",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d04025348041003cbda0b46790c0aaabd593d59a13048020300c2780400&amp;hy=SH&amp;storeid=32303137303832353035353332333030306433313263313336666664393336663561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:112,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=dzPi6nSDBnUeIy2F22yf%2BRcXSt9Mowsho0QDRtu7vZ99upmzsmxqZNyoOHuOD9PlyAWcottz9uYBorF30lIRkKpMxis%2BAEYckXqka%2F3BkAvAC5QAOfjWW2BWRrDMLFjYbHNaw3CCKFLAjpcBvPCp1QDTKBwGB6zaPDnDi94Y4K0Cjb3SOYLvW1SZbDbjDeMnPePjvx0QbhEUGNVqjlKKN1es23L4fsxA%2F7iL%2FNAj0YDS4IneMCe2M2T%2Fq49a7lwX8dchCyJ6g6qTE5yLXRPfHK0AklwHe9lam1Bp2ECs6DMBqbSVrs2%2BHP9G0HGevSBpM%2Fzsdzk6cWBaD2ZgL6RumRPxPwUeyJ2AHkY2u105cdsFfbHsUYNASgKvnaO4X38Y1Z2QuPH9amrHlVXyGuiZvO5uR2yT3rKLzjTd%2F6fKWWqT%2Fazr0rxYjo2oSYdzLG01lOh8zuFlYOojcRjeEsgaOTF03wnD6TK%2FhT7bA8dAtUjV7l%2F8asbPKW0RhJFodllHwPsm8%2FHOP3%2FfF29R9AyPcR6GD0vQSfjR5iwjhNa5F07aGlqWUtNAixvC7DY51sJluBMMf1PJ9p2itkjbLHA52vXt0l9WuLraoPM6LbR8zocssCDSlbant2mAKEIAB%2F8N4DLQGTrsPSBIE90VhE%2BRpaZWkBI%2FuhnCzDJoC7x4LtCmj01YRwFFMoCL8VT71z2f4buxqsqLSsE0t3fvQRn8YXuUv1X1vHEIVnD14ixD0gOkWIFJkpBH%2BV91S7ZP%2BbALie4LjkzxumDWj2RDBraUPogOn2yEm8H7zoAMs%2F%2B0WN0R8iMNuM79OcZqGMsDS2n5r4NBztFcuhXdi3Sr8hMhMfqLc2YLbwSbUGzWEbCq1OH01DTPn2uwHy2vBUf5pT4mVvTHjXYNLKmoSfisbnBCiv1pnU2kh09zaJacDRyCmjOkOmDMZgt1HjtCpwcR5tFQ%2FmMhGkHqy%2FFe6lWqggbiaj%2FT04oR7Btlfd51astFioXTHtmtUVyqwlTRftjl%2ByRyKZ9%2F3ZuWxWRgJNQX%2FaSsgAVggxTZp18neL1rVS21a%2F3fIDNk5EUlhBqTsHzjGStOQwG2YvVSQOk%3D",
ticket:"2t3fxa7gwijlf",
traceid:"wx0yep5orkdfvofu00",
type:"0",
url:"https://itunes.apple.com/cn/app/%E5%94%AF%E5%93%81%E4%BC%9A-%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89-%E6%AD%A3%E5%93%81%E7%89%B9%E5%8D%96/id417200582?mt=8&amp;uo=4&amp;weixinadkey=b562294f6542f5f06567317aef77f34650af02b6f13068dd9194cc80ea5d8fd177047dd133d89ad6e4eb8f6aba73ce96&amp;ticket=2t3fxa7gwijlf&amp;gdt_vid=wx0yep5orkdfvofu00&amp;md5sum=&amp;weixinadinfo=14693949.wx0yep5orkdfvofu00.0.1",
watermark_type:0
},
pt_113:{
ad_desc:"",
aid:"10708726",
app_info:{
apk_name:"hk.socap.tigercoach",
apk_url:"http://imtt.dd.qq.com/16891/CAB8BFEC6A56A568B019AAAD8359154E.apk?fsname=hk.socap.tigercoach_1.0_1.apk&amp;csr=97c2",
app_id:1105677653,
app_md5:"CAB8BFEC6A56A568B019AAAD8359154E",
app_name:"老虎教练",
app_rating:5,
app_size:15414811,
app_type:1,
appinfo_url:"http://imtt.dd.qq.com/16891/CAB8BFEC6A56A568B019AAAD8359154E.apk?fsname=hk.socap.tigercoach_1.0_1.apk&amp;csr=97c2",
category:[],
channel_id:"",
desc:"#约课记录 按时提醒# 高效管理会员约课情况，60秒帮你轻松搞定所有工作安排#数据报告 一键分享# 各项智能、精准的数据报告，供你多渠道任性分享#排行目标 数据说话# 更直观的对比，更有效的激励，教练有实力、会员进步大，我们在用数据说话",
down_count:10091,
icon_url:"http://pp.myapp.com/ma_icon/0/icon_42368321_1492425259/256",
new_feature:"#约课记录 按时提醒# 高效管理会员约课情况，60秒帮你轻松搞定所有工作安排#数据报告 一键分享# 各项智能、精准的数据报告，供你多渠道任性分享#排行目标 数据说话# 更直观的对比，更有效的激励，教练有实力、会员进步大，我们在用数据说话",
signature_md5:"56561B3882F1704E6C070855DFCA0419",
snap_shots:"http://pp.myapp.com/ma_pic2/0/shot_42368321_1_1493898503/330|http://pp.myapp.com/ma_pic2/0/shot_42368321_2_1493898503/330|http://pp.myapp.com/ma_pic2/0/shot_42368321_3_1493898503/330|http://pp.myapp.com/ma_pic2/0/shot_42368321_4_1493898503/330|http://pp.myapp.com/ma_pic2/0/shot_42368321_5_1493898503/330",
url_scheme:"",
version_code:1
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=dIFwHXIFg1LnLplm4XFpVvOsBLGRuJMlJpKQQevQAxvNSC3qXhDqEExWurQSh7n0coc2om8S3leZNkUSl%2BWyS3IsDIA4V20O9zzXMs%2Bfy5cFQiBqNUyLSJgXnsguJHhymSX%2FVsi3JO42WEZjZPI%2BUC6s8WNf2DqBd6efhGVxgEY3h6Tk%2BbHtCl7PKnYU7GAyfZDzZnXokAesrahNHgLHbDTLdtOjgKEYQBiBoU8GEMWXkBFPR3sZvhSwAPYX9o7qFDsu2JjpyEM0mGjG0BAnfWrBMQYixHUvWi%2B4aJlZlrTa%2B2sUIuV8bBGgk6%2B%2BFhhbtAks%2BmyyxHLJTpt9udAmE%2FDh6N535fNoFLXO1KHmA6i7GoANQ2CrMhLMYUewwPrEJ2WIWjfk7BdHPYwRLlBraqE%2B1jxX64GgtTg7lvuhDfM3aJYZEpFAi3uIMpzQvK%2BLeTzjR9q45WCNVPWDf4KpXLANcyN%2BCIjoUm0H0bpy7FVXs07M98Ezlk6xen%2FRZVGU1KoZ3EnGWh951rt8Mi4hkZFc43E6ePY0RP2dHc5JprBI2JZ0nr9b%2F4NJUw1%2FnPeaQHlZWWDmKmrjQuJN%2BMLnDUX%2Fqr3Gfos%2FlWWYBCf3Zrojn1i0k64b6wU4ivkh1wubQV54dt0fGLZo3gIHd0QGX15a8QkBa8QqWhzfNMiADzGUqQUAXNfQpRdk3t9ijhSJcoRCYgyQmf8zbx%2FwV5L8mdbexOoUUnmFJtDYoRKRRmn%2FD0cNDXMVGSJBfvvpKnZLAOwpyItrZigifitX9NzpdnU9KTh7J4dk%2BS5eB3s61yFzh98RqkevaZ2nqRZSR8bXoFLSGVfsPAOa0kx3BkxmEB4HAdqKszeGrymjrP3VyDi0%2BjY%2B2sA62rXA%2FtPz7xXiwtAYYexWEJZ1gQVIbgaxfNB32kVqtaMG63nfP76O9yu7JEReIc6%2FCiAX7lXbBfqKxSk5VsPKfKEZoX7M9KIUUq8po6z91cg4",
biz_appid:"",
group_id:"",
hint_txt:"健身教练的黑科技|生成精美训练记录",
image_url:"http://vweixinthumb.tc.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d04025348041029a2949fb496566907ee0d9ed2067be2020221350400&amp;hy=SH&amp;storeid=32303137303432303039353134393030303933623462313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:113,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=dIFwHXIFg1LnLplm4XFpVvOsBLGRuJMlJpKQQevQAxvNSC3qXhDqEExWurQSh7n0coc2om8S3leZNkUSl%2BWyS3IsDIA4V20O9zzXMs%2Bfy5cFQiBqNUyLSJgXnsguJHhymSX%2FVsi3JO42WEZjZPI%2BUC6s8WNf2DqBd6efhGVxgEY3h6Tk%2BbHtCl7PKnYU7GAyfZDzZnXokAesrahNHgLHbDTLdtOjgKEYQBiBoU8GEMWXkBFPR3sZvhSwAPYX9o7qFDsu2JjpyEM0mGjG0BAnfWrBMQYixHUvWi%2B4aJlZlrTa%2B2sUIuV8bBGgk6%2B%2BFhhbtAks%2BmyyxHLJTpt9udAmE%2FDh6N535fNoFLXO1KHmA6i7GoANQ2CrMhLMYUewwPrEJ2WIWjfk7BdHPYwRLlBraqE%2B1jxX64GgtTg7lvuhDfM3aJYZEpFAi3uIMpzQvK%2BLeTzjR9q45WCNVPWDf4KpXLANcyN%2BCIjoUm0H0bpy7FVXs07M98Ezlk6xen%2FRZVGU1KoZ3EnGWh951rt8Mi4hkZFc43E6ePY0RP2dHc5JprBI2JZ0nr9b%2F4NJUw1%2FnPeaQHlZWWDmKmrjQuJN%2BMLnDUX%2Fqr3Gfos%2FlWWYBCf3Zrojn1i0k64b6wU4ivkh1wubQV54dt0fGLZo3gIHd0QGX15a8QkBa8QqWhzfNMiADzGUqQUAXNfQpRdk3t9ijhSJcoRCYgyQmf8zbx%2FwV5L8mdbexOoUUnmFJtDYoRKRRmn%2FD0cNDXMVGSJBfvvpKnZLAOwpyItrZigifitX9NzpdnU9KTh7J4dk%2BS5eB3s61yFzh98RqkevaZ2nqRZSR8bXoFLSGVfsPAOa0kx3BkxmEB4HAdqKszeGrymjrP3VyDi0%2BjY%2B2sA62rXA%2FtPz7xXiwtAYYexWEJZ1gQVIbgaxfNB32kVqtaMG63nfP76O9yu7JEReIc6%2FCiAX7lXbBfqKxSk5VsPKfKEZoX7M9KIUUq8po6z91cg4",
ticket:"2mkwms35zbept",
traceid:"wx0v7mxghuorbrlw00",
type:"0",
url:"http://mp.weixin.qq.com/mp/ad_app_info?app_id=1105677653&amp;weixinadkey=1ac83a824aee4692ead6e7d74359bdd06013385b1b5b3a7b3391054132701a381a2bbdfbf07d98e2ba4e6ab0b2c4b280&amp;ticket=2mkwms35zbept&amp;gdt_vid=wx0v7mxghuorbrlw00&amp;md5sum=CAB8BFEC6A56A568B019AAAD8359154E&amp;weixinadinfo=10708726.wx0v7mxghuorbrlw00.0.1#wechat_redirect",
watermark_type:0,
advertisement_num:1
},
pt_114:{
ad_desc:"",
aid:"10905397",
app_info:{
apk_name:"com.tencent.tmgp.dhqy.rww",
apk_url:"http://imtt.dd.qq.com/16891/149A641FAEBE52386459BA5D983BE882.apk?fsname=com.tencent.tmgp.dhqy.rww_3.0.0_20.apk&amp;csr=1bca",
app_id:1105907773,
app_md5:"149A641FAEBE52386459BA5D983BE882",
app_name:"大话奇缘",
app_rating:0,
app_size:184561734,
app_type:1,
appinfo_url:"http://imtt.dd.qq.com/16891/149A641FAEBE52386459BA5D983BE882.apk?fsname=com.tencent.tmgp.dhqy.rww_3.0.0_20.apk&amp;csr=1bca",
category:[],
channel_id:"000116083635353932373736",
desc:"大话奇缘是一款画风Q萌的仙侠玄幻类RPG角色扮演手游，游戏以西游为题材，剧情丰富，画质精美，任务Q萌，技能华丽，感兴趣的小伙伴快来下载吧！特色玩法： 免费福利——飞行坐骑，上古神兵，免费获得，多重福利天天送！ 情怀再现——百位伙伴，自由搭配，打造最强：西游战队！ 激情策略——阵法相生，属性相克，战斗策略，完美呈现！ 剧情跌宕——西游无间道，谁才是终极BOSS？等你揭晓！真人社交——实时语音，轻松撩妹，战斗协同，玩转西游！",
down_count:1020,
icon_url:"http://pp.myapp.com/ma_icon/0/icon_52459198_1493292084/256",
new_feature:"大话奇缘是一款画风Q萌的仙侠玄幻类RPG角色扮演手游，游戏以西游为题材，剧情丰富，画质精美，任务Q萌，技能华丽，感兴趣的小伙伴快来下载吧！特色玩法： 免费福利——飞行坐骑，上古神兵，免费获得，多重福利天天送！ 情怀再现——百位伙伴，自由搭配，打造最强：西游战队！ 激情策略——阵法相生，属性相克，战斗策略，完美呈现！ 剧情跌宕——西游无间道，谁才是终极BOSS？等你揭晓！真人社交——实时语音，轻松撩妹，战斗协同，玩转西游！",
signature_md5:"8C6830E0A094F25D33234BE821177A13",
snap_shots:"http://pp.myapp.com/ma_pic2/0/shot_52459198_1_1493105480/330|http://pp.myapp.com/ma_pic2/0/shot_52459198_2_1493105480/330|http://pp.myapp.com/ma_pic2/0/shot_52459198_3_1493105480/330|http://pp.myapp.com/ma_pic2/0/shot_52459198_4_1493105480/330|http://pp.myapp.com/ma_pic2/0/shot_52459198_5_1493105480/330",
url_scheme:"",
version_code:20
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=SNN8szKTYJrVr0PUTMzYSyxLAUCqEMMoyjDPVclvxwIy1wJBdvESAM5soxT%2F5DZyl90WVyu7Kueft0Y97DeZo9u3w6Y1uUvD4VG8DdQq0mmEu9GHB%2Fn552HMJIlK%2FWSD7c8sHv4tA%2BatzhoV9k4cIs6lwbr1GXn7Jz4ilM7aBBkZfso61d5VnAwbIXKpg77sflvq1s0mAh2%2Bbwuwn1kTKi88KRtOqelM2SglvE2ApYua3vPkVnav1avSGeJm%2BE3%2FpLh9z0sdxKpUK7S57kn4Ts9V1MOvh3LFWy3Y%2FiTVylBKyqsqTVPFo9VoFjm6GkL0FRcnQxqSJfOtZDR64G2LZTmvda%2BCvDGbE57LGgQ74p75W8bsN2YwqSJYGFpMUJqnCzXQWth%2Bgr%2FWBeRAhEiUJ%2B9VFc%2Blj311ajdz%2BoZ9jNDbxKo9mnYgPSVPjqciyjYGH%2F3GN%2F7bs6Bc7b0YjNosS54XVXesnEL3%2BykGnp5%2BFFpzOu8VyOmxoBBKBC%2FKHBIUtdz8jUeP3mHgPOkmhaLyU9yIN%2Bs0ExHTy6VGexzN4kZwgOCO3peL4DqsPW%2Fu02WnMp6FcnZQQ2M%2Fy%2FQ%2BIxLkZXGtmcxZSgwGc0wVSywPlf7ZssvTyvrs1lAb6JNMGgiyH5crCnF9TKGHtjgkvjOC1bOmlyFHKmPN0rAGmbBXr3Qb30pOMDghWnrTwHdN%2FIKo7P4Xa3PoH655PcXl992CmX7a%2Bfb%2FCH%2FfFEm1ENn3JfHUZkd%2BrfVRHgRvneXU4diIYDNH9Q864XNit63YwEx5s%2BRoYQXWurwI7XdF7lIUN2vEIAd6mgIXwUd%2FoGaq7zWabp7vOHoy%2BvsL6jO8IdQaz4GS0ehruct4kzixVeHKIEXDTxTWZz%2Fg%2F64udCyNYFSkf1OOZKQ%2B4ijc4wEQf%2BCp1T1EpkkC%2BpArpTfqv%2FJHgPNkO3DFFD%2BdTER9Z7I%2F757e6o9GN%2BOn3YQn6hTttlpCW3hLzMOlo2J8%2FcIEdAsltJo%3D",
biz_appid:"",
group_id:"",
hint_txt:"修仙江湖安卓再营销1",
image_url:"http://vweixinthumb.tc.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410b7986e563774afe71a689178232845cb020300bcd90400&amp;hy=SH&amp;storeid=32303137303432373131343631303030303161393963313336666664393331333630333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:114,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=SNN8szKTYJrVr0PUTMzYSyxLAUCqEMMoyjDPVclvxwIy1wJBdvESAM5soxT%2F5DZyl90WVyu7Kueft0Y97DeZo9u3w6Y1uUvD4VG8DdQq0mmEu9GHB%2Fn552HMJIlK%2FWSD7c8sHv4tA%2BatzhoV9k4cIs6lwbr1GXn7Jz4ilM7aBBkZfso61d5VnAwbIXKpg77sflvq1s0mAh2%2Bbwuwn1kTKi88KRtOqelM2SglvE2ApYua3vPkVnav1avSGeJm%2BE3%2FpLh9z0sdxKpUK7S57kn4Ts9V1MOvh3LFWy3Y%2FiTVylBKyqsqTVPFo9VoFjm6GkL0FRcnQxqSJfOtZDR64G2LZTmvda%2BCvDGbE57LGgQ74p75W8bsN2YwqSJYGFpMUJqnCzXQWth%2Bgr%2FWBeRAhEiUJ%2B9VFc%2Blj311ajdz%2BoZ9jNDbxKo9mnYgPSVPjqciyjYGH%2F3GN%2F7bs6Bc7b0YjNosS54XVXesnEL3%2BykGnp5%2BFFpzOu8VyOmxoBBKBC%2FKHBIUtdz8jUeP3mHgPOkmhaLyU9yIN%2Bs0ExHTy6VGexzN4kZwgOCO3peL4DqsPW%2Fu02WnMp6FcnZQQ2M%2Fy%2FQ%2BIxLkZXGtmcxZSgwGc0wVSywPlf7ZssvTyvrs1lAb6JNMGgiyH5crCnF9TKGHtjgkvjOC1bOmlyFHKmPN0rAGmbBXr3Qb30pOMDghWnrTwHdN%2FIKo7P4Xa3PoH655PcXl992CmX7a%2Bfb%2FCH%2FfFEm1ENn3JfHUZkd%2BrfVRHgRvneXU4diIYDNH9Q864XNit63YwEx5s%2BRoYQXWurwI7XdF7lIUN2vEIAd6mgIXwUd%2FoGaq7zWabp7vOHoy%2BvsL6jO8IdQaz4GS0ehruct4kzixVeHKIEXDTxTWZz%2Fg%2F64udCyNYFSkf1OOZKQ%2B4ijc4wEQf%2BCp1T1EpkkC%2BpArpTfqv%2FJHgPNkO3DFFD%2BdTER9Z7I%2F757e6o9GN%2BOn3YQn6hTttlpCW3hLzMOlo2J8%2FcIEdAsltJo%3D",
ticket:"2mkwms35zbept",
traceid:"wx0dzohrsr4j7ad200",
type:"0",
url:"http://mp.weixin.qq.com/mp/ad_app_info?app_id=1105907773&amp;weixinadkey=e359b1e7499e785130bda691aece8642ca35a75b0c70edde44eb07d0426f18f591cfbe09b7aa0a0eb33820487b26ae34&amp;ticket=2mkwms35zbept&amp;gdt_vid=wx0dzohrsr4j7ad200&amp;channel_id=000116083635353932373736&amp;md5sum=149A641FAEBE52386459BA5D983BE882&amp;weixinadinfo=10905397.wx0dzohrsr4j7ad200.0.1#wechat_redirect",
watermark_type:0
},
pt_114x1:{
ad_desc:"",
aid:"14725306",
app_info:{
apk_name:"com.achievo.vipshop",
apk_url:"http://imtt.dd.qq.com/16891/23B8B81AD9270BDB3310FACCA8B8B3B3.apk?fsname=com.achievo.vipshop_6.5.3_733.apk&amp;csr=1bca",
app_id:1101072624,
app_md5:"23B8B81AD9270BDB3310FACCA8B8B3B3",
app_name:"唯品会",
app_rating:4.35158,
app_size:42632348,
app_type:1,
appinfo_url:"http://imtt.dd.qq.com/16891/23B8B81AD9270BDB3310FACCA8B8B3B3.apk?fsname=com.achievo.vipshop_6.5.3_733.apk&amp;csr=1bca",
category:[],
channel_id:"000116083636323838363139",
desc:"唯品会，全球精选，正品特卖！唯品会提供1折起的深度折扣，从此再也不用担心买不起正品大牌啦！ 1、深度折扣 限时特卖 品类齐全 每天早10点&amp;晚8点上新品 全场大牌深度折扣，1折起售，全网最实惠 服饰、美妆、亲子、居家多种品类，满足您的一站式购物需求 2、购物体验有保障 支持货到付款，先看实物再给钱 七天无条件退货，退货返还运费 3、全球知名特卖电商，美国上市公司，百分百正品保障 品牌直签授权，从根源杜绝假货 4、七成用户成为回头客 每天帮助两亿会员节省数亿元，享受“尊贵不贵”超过70%的会员买了又买，日日约会 5、直播.发现惊喜无处不在 为你精选最热时尚资讯、好玩活动，更有明星达人直播——穿搭、美妆、生活、母婴各类干货轻松GET！6、开通唯品花，分期付款0压力，3/6/9/12/18期，随心分期！立即下载，开启省钱之旅吧！ 【意见反馈】 官方微博：@唯品会 官方微信：“唯品会特卖“ 时刻倾听你的声音。",
down_count:287579385,
icon_url:"http://pp.myapp.com/ma_icon/0/icon_8588_1503540559/256",
new_feature:"【活动预告】夏末刚走秋燥杀到！别忘了给肌肤添置保湿好物！唯品会905秋季美妆节，面膜精华和面霜超优惠！满199减100！更有0元领商品限量抢购！9月4日晚8点准时开抢，快来把秋冬美妆爆款抢回家！【近期更新】1、丰富首页品牌展示形式，帮你发现更多惊喜品牌；2、全新好物•签到，十万用户帮你选，视频30秒极速种草，深扒唯品会好物；3、详情页推出口红试妆功能，打开摄像头就可以在线试妆哦！颜色合不合适试试就知道啦；4、新增服务进度反馈，以后咨询过的问题进度可以在消息中心查看啦；5、增加了用户自助查询客服工单的功能，可快速查询工单进度。",
signature_md5:"0572A236AE97F777609471D99C118331",
snap_shots:"http://pp.myapp.com/ma_pic2/0/shot_8588_1_1503975667/330|http://pp.myapp.com/ma_pic2/0/shot_8588_2_1503975667/330|http://pp.myapp.com/ma_pic2/0/shot_8588_3_1503975667/330|http://pp.myapp.com/ma_pic2/0/shot_8588_4_1503975667/330|http://pp.myapp.com/ma_pic2/0/shot_8588_5_1503975667/330",
url_scheme:"",
version_code:733
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=AGft%2FmcDKo9BVCqkzg57z2F3StLr6dwCcmiInStspj6ckzUQanM%2BLORkRPhfA5%2FkdbsPrq5xm3oXxPFONqEfImD1bmOOWWx93%2FCvt%2Ff0ikqtrP3q01iRMYoTgG6%2B8wCwXBdT8ctVl9MYWPfhwYK5tUl3Mppn0HfnOCTv3tA6y57r63x3bbuyqcAONLiOK%2Bo2EsEAoRXu2RGT%2BK3YiYqiGXag%2B4J44KLnRhZE0IwHhgbFh1vxXk4CfdlqUAjjF8LiKIw3U5G3MtlaNtpXUPBkuOYkXg2hVIGPg%2BpbCOCWTw6t8GijgfwpU5tXFGO5buAp3AtMX14GkvZ1FT83uJsWWXf3bIjUbJ02FAwFdmGmFGb%2BBGlsN6Onvb5vDjMfIjHWMsHsH%2FgV93kcctYk5fFHzaI1jcmqe%2BJ5lIxhEDT7rhL7fH6aEkFXrSaflT16yTtOjPOWIFnwqD816krNqX4peIEgwR%2FR2f8rLR%2BaUNP0IXCHXHyLNx8jpnyt%2FQSuwh1bcVCR7JXB9KeVEhDBfjs%2B77Dz2eb0PtEl7cJ3rLe8iwdk4HmNTt4GoqU1dIndeapxZhoqPzqxcKWWV901G08XFyn2FUV4z7%2Bisu6l286UzxZg7HBhyGhn663YjPAM29mI7oUD8RfVgR%2FXiqoRYWTMgf58RWoc1eQE5LHJlkXzehLvMKodaAmkSOEnao89d00x21q2i06GoLv4C9HsMQ%2BzwiU5tpZ9s0lvtAncw1bukMXKvIx7LD00uQ%2FWnsVF7BMlz0qHEy45NzfULJwdIe5opwFoqJS%2BxI1qUupdmzkdDQXd%2BfMIzbG%2B3G9AMcusfNXLbQWnCGqXpWF0kvkolC1V6aennoR0zYleSXMLNwspPrLq2yySKT0uAj1K6TjydVIHltFKC5VBjt6J%2BsSwvglTh23L6HH5MqOvKpjPVhYTU4QydmfMFB%2FK0HutVATvlkBJ6ChsQ00kCAPDlyEcOVN6L5gDSdglhzPDqFfG21wXH0rmt02dcdYIQzGOwOrPMnnM%2BJNUwlv0Y2BawwjcrmKoA%2B3kmR5s0SzFkUEpXV6d01hJ5Le7%2BP4LJ9yUBKEDVRvhpoU2bWy0THo%3D",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"02包-单卡-双人长裙-0805",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d04025348041059e5cc48f3c3f284f7ffc2315ef55e78020300c4b40400&amp;hy=SH&amp;storeid=32303137303832353130323333323030303531363235313336666664393336663561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:114,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=AGft%2FmcDKo9BVCqkzg57z2F3StLr6dwCcmiInStspj6ckzUQanM%2BLORkRPhfA5%2FkdbsPrq5xm3oXxPFONqEfImD1bmOOWWx93%2FCvt%2Ff0ikqtrP3q01iRMYoTgG6%2B8wCwXBdT8ctVl9MYWPfhwYK5tUl3Mppn0HfnOCTv3tA6y57r63x3bbuyqcAONLiOK%2Bo2EsEAoRXu2RGT%2BK3YiYqiGXag%2B4J44KLnRhZE0IwHhgbFh1vxXk4CfdlqUAjjF8LiKIw3U5G3MtlaNtpXUPBkuOYkXg2hVIGPg%2BpbCOCWTw6t8GijgfwpU5tXFGO5buAp3AtMX14GkvZ1FT83uJsWWXf3bIjUbJ02FAwFdmGmFGb%2BBGlsN6Onvb5vDjMfIjHWMsHsH%2FgV93kcctYk5fFHzaI1jcmqe%2BJ5lIxhEDT7rhL7fH6aEkFXrSaflT16yTtOjPOWIFnwqD816krNqX4peIEgwR%2FR2f8rLR%2BaUNP0IXCHXHyLNx8jpnyt%2FQSuwh1bcVCR7JXB9KeVEhDBfjs%2B77Dz2eb0PtEl7cJ3rLe8iwdk4HmNTt4GoqU1dIndeapxZhoqPzqxcKWWV901G08XFyn2FUV4z7%2Bisu6l286UzxZg7HBhyGhn663YjPAM29mI7oUD8RfVgR%2FXiqoRYWTMgf58RWoc1eQE5LHJlkXzehLvMKodaAmkSOEnao89d00x21q2i06GoLv4C9HsMQ%2BzwiU5tpZ9s0lvtAncw1bukMXKvIx7LD00uQ%2FWnsVF7BMlz0qHEy45NzfULJwdIe5opwFoqJS%2BxI1qUupdmzkdDQXd%2BfMIzbG%2B3G9AMcusfNXLbQWnCGqXpWF0kvkolC1V6aennoR0zYleSXMLNwspPrLq2yySKT0uAj1K6TjydVIHltFKC5VBjt6J%2BsSwvglTh23L6HH5MqOvKpjPVhYTU4QydmfMFB%2FK0HutVATvlkBJ6ChsQ00kCAPDlyEcOVN6L5gDSdglhzPDqFfG21wXH0rmt02dcdYIQzGOwOrPMnnM%2BJNUwlv0Y2BawwjcrmKoA%2B3kmR5s0SzFkUEpXV6d01hJ5Le7%2BP4LJ9yUBKEDVRvhpoU2bWy0THo%3D",
ticket:"2t3fxa7gwijlf",
traceid:"wx06ounuusvh332400",
type:"0",
url:"https://mp.weixin.qq.com/tp/ad_detail_info?page_key=d1ea7c579aa826b20831deeb2be29c24500b804c66d92198e217944f4ffc04343537d38c9c5edaef83117494d4bd03fa&amp;app_id=1101072624&amp;weixinadkey=c8dea834686b79294dabb8fc0d936f9000b26672b3b6d23cca9d8d2a2e886ec8270990708c5fde3ec574b5a2f3df1358&amp;ticket=2t3fxa7gwijlf&amp;gdt_vid=wx06ounuusvh332400&amp;channel_id=000116083636323838363139&amp;md5sum=23B8B81AD9270BDB3310FACCA8B8B3B3&amp;weixinadinfo=14725306.wx06ounuusvh332400.0.1#wechat_redirect",
watermark_type:0
},
pt_114x2:{
ad_desc:"",
aid:"14725306",
app_info:{
apk_name:"com.achievo.vipshop",
apk_url:"http://imtt.dd.qq.com/16891/23B8B81AD9270BDB3310FACCA8B8B3B3.apk?fsname=com.achievo.vipshop_6.5.3_733.apk&amp;csr=1bca",
app_id:1101072624,
app_md5:"23B8B81AD9270BDB3310FACCA8B8B3B3",
app_name:"唯品会",
app_rating:4.35158,
app_size:42632348,
app_type:1,
appinfo_url:"http://imtt.dd.qq.com/16891/23B8B81AD9270BDB3310FACCA8B8B3B3.apk?fsname=com.achievo.vipshop_6.5.3_733.apk&amp;csr=1bca",
category:[],
channel_id:"000116083636323838363139",
desc:"唯品会，全球精选，正品特卖！唯品会提供1折起的深度折扣，从此再也不用担心买不起正品大牌啦！ 1、深度折扣 限时特卖 品类齐全 每天早10点&amp;晚8点上新品 全场大牌深度折扣，1折起售，全网最实惠 服饰、美妆、亲子、居家多种品类，满足您的一站式购物需求 2、购物体验有保障 支持货到付款，先看实物再给钱 七天无条件退货，退货返还运费 3、全球知名特卖电商，美国上市公司，百分百正品保障 品牌直签授权，从根源杜绝假货 4、七成用户成为回头客 每天帮助两亿会员节省数亿元，享受“尊贵不贵”超过70%的会员买了又买，日日约会 5、直播.发现惊喜无处不在 为你精选最热时尚资讯、好玩活动，更有明星达人直播——穿搭、美妆、生活、母婴各类干货轻松GET！6、开通唯品花，分期付款0压力，3/6/9/12/18期，随心分期！立即下载，开启省钱之旅吧！ 【意见反馈】 官方微博：@唯品会 官方微信：“唯品会特卖“ 时刻倾听你的声音。",
down_count:287579385,
icon_url:"http://pp.myapp.com/ma_icon/0/icon_8588_1503540559/256",
new_feature:"【活动预告】夏末刚走秋燥杀到！别忘了给肌肤添置保湿好物！唯品会905秋季美妆节，面膜精华和面霜超优惠！满199减100！更有0元领商品限量抢购！9月4日晚8点准时开抢，快来把秋冬美妆爆款抢回家！【近期更新】1、丰富首页品牌展示形式，帮你发现更多惊喜品牌；2、全新好物•签到，十万用户帮你选，视频30秒极速种草，深扒唯品会好物；3、详情页推出口红试妆功能，打开摄像头就可以在线试妆哦！颜色合不合适试试就知道啦；4、新增服务进度反馈，以后咨询过的问题进度可以在消息中心查看啦；5、增加了用户自助查询客服工单的功能，可快速查询工单进度。",
signature_md5:"0572A236AE97F777609471D99C118331",
snap_shots:"http://pp.myapp.com/ma_pic2/0/shot_8588_1_1503975667/330|http://pp.myapp.com/ma_pic2/0/shot_8588_2_1503975667/330|http://pp.myapp.com/ma_pic2/0/shot_8588_3_1503975667/330|http://pp.myapp.com/ma_pic2/0/shot_8588_4_1503975667/330|http://pp.myapp.com/ma_pic2/0/shot_8588_5_1503975667/330",
url_scheme:"vipshop://showGoodsDetail?pid=277250153&goodType=1&tra_from=tra%3A0xuoe90q%3A%3A%3A%3A",
version_code:733
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=AGft%2FmcDKo9BVCqkzg57z2F3StLr6dwCcmiInStspj6ckzUQanM%2BLORkRPhfA5%2FkdbsPrq5xm3oXxPFONqEfImD1bmOOWWx93%2FCvt%2Ff0ikqtrP3q01iRMYoTgG6%2B8wCwXBdT8ctVl9MYWPfhwYK5tUl3Mppn0HfnOCTv3tA6y57r63x3bbuyqcAONLiOK%2Bo2EsEAoRXu2RGT%2BK3YiYqiGXag%2B4J44KLnRhZE0IwHhgbFh1vxXk4CfdlqUAjjF8LiKIw3U5G3MtlaNtpXUPBkuOYkXg2hVIGPg%2BpbCOCWTw6t8GijgfwpU5tXFGO5buAp3AtMX14GkvZ1FT83uJsWWXf3bIjUbJ02FAwFdmGmFGb%2BBGlsN6Onvb5vDjMfIjHWMsHsH%2FgV93kcctYk5fFHzaI1jcmqe%2BJ5lIxhEDT7rhL7fH6aEkFXrSaflT16yTtOjPOWIFnwqD816krNqX4peIEgwR%2FR2f8rLR%2BaUNP0IXCHXHyLNx8jpnyt%2FQSuwh1bcVCR7JXB9KeVEhDBfjs%2B77Dz2eb0PtEl7cJ3rLe8iwdk4HmNTt4GoqU1dIndeapxZhoqPzqxcKWWV901G08XFyn2FUV4z7%2Bisu6l286UzxZg7HBhyGhn663YjPAM29mI7oUD8RfVgR%2FXiqoRYWTMgf58RWoc1eQE5LHJlkXzehLvMKodaAmkSOEnao89d00x21q2i06GoLv4C9HsMQ%2BzwiU5tpZ9s0lvtAncw1bukMXKvIx7LD00uQ%2FWnsVF7BMlz0qHEy45NzfULJwdIe5opwFoqJS%2BxI1qUupdmzkdDQXd%2BfMIzbG%2B3G9AMcusfNXLbQWnCGqXpWF0kvkolC1V6aennoR0zYleSXMLNwspPrLq2yySKT0uAj1K6TjydVIHltFKC5VBjt6J%2BsSwvglTh23L6HH5MqOvKpjPVhYTU4QydmfMFB%2FK0HutVATvlkBJ6ChsQ00kCAPDlyEcOVN6L5gDSdglhzPDqFfG21wXH0rmt02dcdYIQzGOwOrPMnnM%2BJNUwlv0Y2BawwjcrmKoA%2B3kmR5s0SzFkUEpXV6d01hJ5Le7%2BP4LJ9yUBKEDVRvhpoU2bWy0THo%3D",
biz_appid:"",
dest_type:0,
group_id:"",
hint_txt:"02包-单卡-双人长裙-0805",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d04025348041059e5cc48f3c3f284f7ffc2315ef55e78020300c4b40400&amp;hy=SH&amp;storeid=32303137303832353130323333323030303531363235313336666664393336663561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:114,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=AGft%2FmcDKo9BVCqkzg57z2F3StLr6dwCcmiInStspj6ckzUQanM%2BLORkRPhfA5%2FkdbsPrq5xm3oXxPFONqEfImD1bmOOWWx93%2FCvt%2Ff0ikqtrP3q01iRMYoTgG6%2B8wCwXBdT8ctVl9MYWPfhwYK5tUl3Mppn0HfnOCTv3tA6y57r63x3bbuyqcAONLiOK%2Bo2EsEAoRXu2RGT%2BK3YiYqiGXag%2B4J44KLnRhZE0IwHhgbFh1vxXk4CfdlqUAjjF8LiKIw3U5G3MtlaNtpXUPBkuOYkXg2hVIGPg%2BpbCOCWTw6t8GijgfwpU5tXFGO5buAp3AtMX14GkvZ1FT83uJsWWXf3bIjUbJ02FAwFdmGmFGb%2BBGlsN6Onvb5vDjMfIjHWMsHsH%2FgV93kcctYk5fFHzaI1jcmqe%2BJ5lIxhEDT7rhL7fH6aEkFXrSaflT16yTtOjPOWIFnwqD816krNqX4peIEgwR%2FR2f8rLR%2BaUNP0IXCHXHyLNx8jpnyt%2FQSuwh1bcVCR7JXB9KeVEhDBfjs%2B77Dz2eb0PtEl7cJ3rLe8iwdk4HmNTt4GoqU1dIndeapxZhoqPzqxcKWWV901G08XFyn2FUV4z7%2Bisu6l286UzxZg7HBhyGhn663YjPAM29mI7oUD8RfVgR%2FXiqoRYWTMgf58RWoc1eQE5LHJlkXzehLvMKodaAmkSOEnao89d00x21q2i06GoLv4C9HsMQ%2BzwiU5tpZ9s0lvtAncw1bukMXKvIx7LD00uQ%2FWnsVF7BMlz0qHEy45NzfULJwdIe5opwFoqJS%2BxI1qUupdmzkdDQXd%2BfMIzbG%2B3G9AMcusfNXLbQWnCGqXpWF0kvkolC1V6aennoR0zYleSXMLNwspPrLq2yySKT0uAj1K6TjydVIHltFKC5VBjt6J%2BsSwvglTh23L6HH5MqOvKpjPVhYTU4QydmfMFB%2FK0HutVATvlkBJ6ChsQ00kCAPDlyEcOVN6L5gDSdglhzPDqFfG21wXH0rmt02dcdYIQzGOwOrPMnnM%2BJNUwlv0Y2BawwjcrmKoA%2B3kmR5s0SzFkUEpXV6d01hJ5Le7%2BP4LJ9yUBKEDVRvhpoU2bWy0THo%3D",
ticket:"2t3fxa7gwijlf",
traceid:"wx06ounuusvh332400",
type:"0",
url:"https://mp.weixin.qq.com/tp/ad_detail_info?page_key=d1ea7c579aa826b20831deeb2be29c24500b804c66d92198e217944f4ffc04343537d38c9c5edaef83117494d4bd03fa&amp;app_id=1101072624&amp;weixinadkey=c8dea834686b79294dabb8fc0d936f9000b26672b3b6d23cca9d8d2a2e886ec8270990708c5fde3ec574b5a2f3df1358&amp;ticket=2t3fxa7gwijlf&amp;gdt_vid=wx06ounuusvh332400&amp;channel_id=000116083636323838363139&amp;md5sum=23B8B81AD9270BDB3310FACCA8B8B3B3&amp;weixinadinfo=14725306.wx06ounuusvh332400.0.1#wechat_redirect",
watermark_type:0
},
pt_115:{
hint_txt:"0818T1-1",
url:"https://mp.weixin.qq.com/mp/ad_biz_info?__biz=MzIyMjk2Njg2MA==&sn=f821cb9abd03c959eff7b3ffba906285&weixinadkey=93cea84ba7269f607ae7ee423d52add76b3f8054e06d8f1fa86b5ce3ac2bad86a93d71e8b1d945abf9c93107aae0a840&ticket=2tkzedhfavvnh&gdt_vid=wx0oos4rrnqayqba00&weixinadinfo=14889617.wx0oos4rrnqayqba00.0.1#wechat_redirect",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=mo%2F5irZnv0N04Au6tjLMXWWtZywtaaXCRFujSawbYqbcfg4%2B3M2Sdj2CvZd%2BtskYD2XUZWVPG2vNi0FI5QSJ5ztmvDiBKrC58q2Kyh8UXpp3xvrE44xt0BylT9NNv%2FWZEd8LLym%2FKC%2FYtAYaOgos37IMV2jucPefIZu1Ft0LF8ZEb523l34gjqd0kCJmlehjS0UuNT%2F8wXjj%2BteGnhLRzjBkiQtMr2L4GjR6Z1lvHg2I0smF5Ab%2FNKsy4BLaeFuEYQvacy0Y11MkTEPaqtpw2l71wcpU%2B1fp3tdJYoz%2B%2FucOCyw%2BmUhC9wWs9QMJWkybXzk8Wc5znweluGHkdQ2ZN%2BeBZZ9xgzcZJp5fXu6bfHzJZUniE0JqNgQqdvmJCLOrONUcVIO1%2BxTJXnISMswyNrgt10hr2M%2FC%2FuJEUeHzrjKac3EoQjVWmau7n2qIFvkVeC9Tor1%2F2Tef2fG26qpkrJ2VLOjB6MlAmEsSXlZkDe8QEltcgoTToeWOLrA%2FDcXKxXc2k6Ny0HHIpoHbpIo1Y9sKRsgmyoTfxDTMdzaWDBaoDTZtg%2BD3PjA1vi0Ox7RsDvaxqnxH3N%2FloseOVxhK6xBozlns0V0QC3pEJJTnwZdVTrLdBJTBWzPzRWbLHx2aMiew%2Bx6CqhkAT9h3Xjv64xKE4nUYEeheXIMFHOCXwMPWqMJ%2FAsIUz77V3X%2FhGDLGFBLBw2fPRVYl2%2BQLFobafcoKo6V1EBj4rFjW4ZSB8Et5qF16FwkLb22sVEh9LFk25YpqdWZzdUWZ25v50KF4Qjk0GgZ6bFYPYdM4C1E7BRqyPBjx8zgaAPYqhylYFkTewfa4Rqir%2BJhmmJtR7dU8cGKWHIaE4pfH2w405kFDDFPS7SflUb%2BM0WYk5YfYfP6Z0BwFN9S9MqCdCH132H4HF3djZOIcrKcObqi33pZOeYhUKoQFQA0HrPFRHpo0zFbN9xPn7eRwRzyYB%2BA5em9cw%2BS3FjCDrCtcHo3B7j01A2t9zxIBNLdVoE3GnEa%2BKePTLiV6FX0ijo4oSf7bbywakIvnu8sit1XqROG6p7nd5VuRrIEEeeJP5INrNor6XYkWzDLyqFGbI0gKoj2AgzzIOZw37zU8ooKz",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=mo%2F5irZnv0N04Au6tjLMXWWtZywtaaXCRFujSawbYqbcfg4%2B3M2Sdj2CvZd%2BtskYD2XUZWVPG2vNi0FI5QSJ5ztmvDiBKrC58q2Kyh8UXpp3xvrE44xt0BylT9NNv%2FWZEd8LLym%2FKC%2FYtAYaOgos37IMV2jucPefIZu1Ft0LF8ZEb523l34gjqd0kCJmlehjS0UuNT%2F8wXjj%2BteGnhLRzjBkiQtMr2L4GjR6Z1lvHg2I0smF5Ab%2FNKsy4BLaeFuEYQvacy0Y11MkTEPaqtpw2l71wcpU%2B1fp3tdJYoz%2B%2FucOCyw%2BmUhC9wWs9QMJWkybXzk8Wc5znweluGHkdQ2ZN%2BeBZZ9xgzcZJp5fXu6bfHzJZUniE0JqNgQqdvmJCLOrONUcVIO1%2BxTJXnISMswyNrgt10hr2M%2FC%2FuJEUeHzrjKac3EoQjVWmau7n2qIFvkVeC9Tor1%2F2Tef2fG26qpkrJ2VLOjB6MlAmEsSXlZkDe8QEltcgoTToeWOLrA%2FDcXKxXc2k6Ny0HHIpoHbpIo1Y9sKRsgmyoTfxDTMdzaWDBaoDTZtg%2BD3PjA1vi0Ox7RsDvaxqnxH3N%2FloseOVxhK6xBozlns0V0QC3pEJJTnwZdVTrLdBJTBWzPzRWbLHx2aMiew%2Bx6CqhkAT9h3Xjv64xKE4nUYEeheXIMFHOCXwMPWqMJ%2FAsIUz77V3X%2FhGDLGFBLBw2fPRVYl2%2BQLFobafcoKo6V1EBj4rFjW4ZSB8Et5qF16FwkLb22sVEh9LFk25YpqdWZzdUWZ25v50KF4Qjk0GgZ6bFYPYdM4C1E7BRqyPBjx8zgaAPYqhylYFkTewfa4Rqir%2BJhmmJtR7dU8cGKWHIaE4pfH2w405kFDDFPS7SflUb%2BM0WYk5YfYfP6Z0BwFN9S9MqCdCH132H4HF3djZOIcrKcObqi33pZOeYhUKoQFQA0HrPFRHpo0zFbN9xPn7eRwRzyYB%2BA5em9cw%2BS3FjCDrCtcHo3B7j01A2t9zxIBNLdVoE3GnEa%2BKePTLiV6FX0ijo4oSf7bbywakIvnu8sit1XqROG6p7nd5VuRrIEEeeJP5INrNor6XYkWzDLyqFGbI0gKoj2AgzzIOZw37zU8ooKz",
traceid:"wx0oos4rrnqayqba00",
group_id:"",
ticket:"2tkzedhfavvnh",
aid:"14889617",
pt:115,
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d04025348041080238f1cbb0dcd94d712c9bb4445b9fc020276060400&hy=SH&storeid=32303137303832393039333732333030303433366364313336666664393337313561333230613030303030303664&bizid=1023",
ad_desc:"",
biz_appid:"wxfab026d124c60311",
biz_info:{
user_name:"gh_471c30ca73ec",
nick_name:"轻松学彩铅画",
is_subscribed:0,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM5GQibEnamPFlfoPCN8KqL04KjNeZ1A4RtpicPp1U8HR6Rw/0",
biz_uin:3222966860
},
pos_type:0,
watermark_type:0,
logo:"",
is_cpm:0,
dest_type:0
},
pt_116:{
ad_desc:"",
aid:"14076581",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=9u9Aw6%2FwMWEVo4a1mdoAYHzEl05e6WG1fx2sR5sbof9XpUdbc0ELf6w2KzosSymK3VzIhNjMSwrGIHlDPPMX9PUFxiXWVS3jBqPkrMXlQApQFO8aNBAJYlQ3RXZsvwpdPQuKUFDOwsTFzswX0x1Xyz0MFJ2FE%2Bjf%2B%2FpxJ3gxTOQ8YHi9RMfmbwFu9nT%2BhbaIJHwEEw6wTgw2zfLzJ3p8DQ%2FQwolEiPBiLS%2FdA7Y8C39TEYdPngh0spATFk3gao6l%2Bin0BFyibGMgBDfS%2BqPR3s7RTfXmCyR7QR3xRZi2wHYltGJmzPY20FIHfZ2ly21nmqGihcw1TAGVOgk1rVzP0Hf%2FwarGe8Y3m5IEcPAWOGHCzs%2FSl1bgFh8VtSjmo%2FBVIAM%2BKxfFXe0NXIottOVHrwBEW1GVVSULP2gZK4Jm%2BBnSql23UHKEdjB7uN3YJRFI%2B3EuPmtCyipsQsyy2tiAtCa%2FRmx1kWhLeZbgY3BNKihiA0R8V%2F9RQTKkF8ICH2CUfKK%2Fg0qRcY2VJBrFU462iPPjSGVWvpSdaPNPks0IVtfSidAc7IqKg9QNV0o%2FgzUMbd7X2TS8fM9IwVcGpc%2Bzdt4BSCSslhST7btQdsQiYlqxPaUFTjXFcso3gN4uPc7jzEM%2BfxPLnHDCshG0IYduAQDQl5FZGoygzEPOHC1ajJrYkqBU9FhPGIuJKuStquBQHWzqNhT9C3KoOV0nDkn661Qs2HzhD6O%2FlV%2BBQNUNXW62T8%2F80wcIVWpxmBrdGMcuv9IlfuhI413oMGuWLiiHVNhv6RgTzxN3WZgSYquVUHKZn0CQjxnbTiXWxcl8gK5Z7FmXhM1pPpWROqK9c9%2BSIb%2Bof6l%2BzeJn",
biz_appid:"wxb43647c46f347835",
biz_info:{
biz_uin:3098260700,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM5SEBQsOxicWxVSl1WRpArKVydT7AWtzsIoL0XBBtZqIKQ/0",
is_subscribed:0,
nick_name:"广汽本田",
user_name:"gh_59ca0f11a65d"
},
dest_type:1,
group_id:"",
hint_txt:"",
image_url:"",
is_cpm:1,
logo:"",
pos_type:3,
pt:116,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=9u9Aw6%2FwMWEVo4a1mdoAYHzEl05e6WG1fx2sR5sbof9XpUdbc0ELf6w2KzosSymK3VzIhNjMSwrGIHlDPPMX9PUFxiXWVS3jBqPkrMXlQApQFO8aNBAJYlQ3RXZsvwpdPQuKUFDOwsTFzswX0x1Xyz0MFJ2FE%2Bjf%2B%2FpxJ3gxTOQ8YHi9RMfmbwFu9nT%2BhbaIJHwEEw6wTgw2zfLzJ3p8DQ%2FQwolEiPBiLS%2FdA7Y8C39TEYdPngh0spATFk3gao6l%2Bin0BFyibGMgBDfS%2BqPR3s7RTfXmCyR7QR3xRZi2wHYltGJmzPY20FIHfZ2ly21nmqGihcw1TAGVOgk1rVzP0Hf%2FwarGe8Y3m5IEcPAWOGHCzs%2FSl1bgFh8VtSjmo%2FBVIAM%2BKxfFXe0NXIottOVHrwBEW1GVVSULP2gZK4Jm%2BBnSql23UHKEdjB7uN3YJRFI%2B3EuPmtCyipsQsyy2tiAtCa%2FRmx1kWhLeZbgY3BNKihiA0R8V%2F9RQTKkF8ICH2CUfKK%2Fg0qRcY2VJBrFU462iPPjSGVWvpSdaPNPks0IVtfSidAc7IqKg9QNV0o%2FgzUMbd7X2TS8fM9IwVcGpc%2Bzdt4BSCSslhST7btQdsQiYlqxPaUFTjXFcso3gN4uPc7jzEM%2BfxPLnHDCshG0IYduAQDQl5FZGoygzEPOHC1ajJrYkqBU9FhPGIuJKuStquBQHWzqNhT9C3KoOV0nDkn661Qs2HzhD6O%2FlV%2BBQNUNXW62T8%2F80wcIVWpxmBrdGMcuv9IlfuhI413oMGuWLiiHVNhv6RgTzxN3WZgSYquVUHKZn0CQjxnbTiXWxcl8gK5Z7FmXhM1pPpWROqK9c9%2BSIb%2Bof6l%2BzeJn",
ticket:"",
traceid:"wx0wufunvuk63xfw00",
type:"0",
url:"http://www.ghac.cn/vehicles/honda/odyssey?weixinadkey=0c52ad5fd45796439b24582df9a6167361d5ab1e4457b2c9e96a29d5a19e3d1bc8bbf0e5df7591508a76757470b14928&amp;gdt_vid=wx0wufunvuk63xfw00&amp;weixinadinfo=14076581.wx0wufunvuk63xfw00.1.1",
video_info:{
displayHeight:540,
displayWidth:960,
thumbUrl:"http://wxsnsdythumb.video.qq.com/109/20250/snsvideodownload?filekey=30270201010420301e02016d040253480410192dd121d864094a06fcbf6ec03970380203017f900400&amp;hy=SH&amp;storeid=32303137303831313130303834353030306438353437313336666664393330323561333230613030303030303664&amp;bizid=1023",
videoUrl:"http://wxsnsdy.video.qq.com/105/20210/snsdyvideodownload?m=ae0e93b5b2522f71f468a5436b069b88&amp;filekey=30270201010420301e020169040253480410ae0e93b5b2522f71f468a5436b069b88020316f0e30400&amp;hy=SH&amp;storeid=32303137303831313130303834353030306463393866313336666664393330323561333230613030303030303639&amp;bizid=1023"
},
watermark_type:0
},
pt_118:{
ad_desc:"",
aid:"14764746",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
biz_appid:"",
dest_type:6,
group_id:"",
hint_txt:"电商推广-20170703-垃圾袋测试1",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410d51122abd9413058beee4748b45cdd640203013ca10400&amp;hy=SH&amp;storeid=32303137303832363135353434383030303231323435313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:4,
pt:118,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
ticket:"",
traceid:"wx0tgj5o4czvigfw00",
type:"0",
url:"/pages/detail/pages/pintuan/index?itemId=1k5o5oe&amp;activityId=1c3wby&amp;ptp=_qd._tengxun__4459884.152.1.0&amp;weixinadkey=bf9951d70e454c6438d959cbbea3735a227eebf2e96952441d1f0e26a0e758d51c82d4e9e270e0de56da8b15765db589&amp;gdt_vid=wx0tgj5o4czvigfw00&amp;weixinadinfo=14764746.wx0tgj5o4czvigfw00.1.1",
watermark_type:0,
weapp_info:{
original_id:"gh_78b4a2eb5f09"
}
},
pt_118x1:{
ad_desc:"",
aid:"14764746",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
biz_appid:"",
cpc_exp_info:{
exp_content:"{&quot;btn_text&quot;: &quot;去购买&quot;,&quot;aid_list&quot;:[{&quot;aid&quot;: 14764746}]}"
},
dest_type:6,
group_id:"",
hint_txt:"电商推广-20170703-垃圾袋测试1",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410d51122abd9413058beee4748b45cdd640203013ca10400&amp;hy=SH&amp;storeid=32303137303832363135353434383030303231323435313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:4,
pt:118,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
ticket:"",
traceid:"wx0tgj5o4czvigfw00",
type:"0",
url:"/pages/detail/pages/pintuan/index?itemId=1k5o5oe&amp;activityId=1c3wby&amp;ptp=_qd._tengxun__4459884.152.1.0&amp;weixinadkey=bf9951d70e454c6438d959cbbea3735a227eebf2e96952441d1f0e26a0e758d51c82d4e9e270e0de56da8b15765db589&amp;gdt_vid=wx0tgj5o4czvigfw00&amp;weixinadinfo=14764746.wx0tgj5o4czvigfw00.1.1",
watermark_type:0,
weapp_info:{
original_id:"gh_78b4a2eb5f09"
}
},
pt_118x2:{
ad_desc:"",
aid:"14764746",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
biz_appid:"",
cpc_exp_info:{
exp_content:"{&quot;btn_text&quot;: &quot;去看看&quot;,&quot;icon_pos&quot;: &quot;left&quot;,&quot;aid_list&quot;:[{&quot;aid&quot;: 14764746,&quot;sale_text&quot;: &quot;全场5折起-vicky&quot;}]}"
},
dest_type:6,
group_id:"",
hint_txt:"电商推广-20170703-垃圾袋测试1",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410d51122abd9413058beee4748b45cdd640203013ca10400&amp;hy=SH&amp;storeid=32303137303832363135353434383030303231323435313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:4,
pt:118,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
ticket:"",
traceid:"wx0tgj5o4czvigfw00",
type:"0",
url:"/pages/detail/pages/pintuan/index?itemId=1k5o5oe&amp;activityId=1c3wby&amp;ptp=_qd._tengxun__4459884.152.1.0&amp;weixinadkey=bf9951d70e454c6438d959cbbea3735a227eebf2e96952441d1f0e26a0e758d51c82d4e9e270e0de56da8b15765db589&amp;gdt_vid=wx0tgj5o4czvigfw00&amp;weixinadinfo=14764746.wx0tgj5o4czvigfw00.1.1",
watermark_type:0,
weapp_info:{
original_id:"gh_78b4a2eb5f09"
}
},
pt_118x3:{
ad_desc:"",
aid:"14764746",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
biz_appid:"",
cpc_exp_info:{
exp_content:"{&quot;btn_text&quot;: &quot;去购买&quot;,&quot;icon_pos&quot;: &quot;left&quot;,&quot;aid_list&quot;:[{&quot;aid&quot;: 14764746,&quot;sale_text&quot;: &quot;全场5折起-vicky&quot;,&quot;price&quot;: &quot;1399&quot;}]}"
},
dest_type:6,
group_id:"",
hint_txt:"电商推广-20170703-垃圾袋测试1",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410d51122abd9413058beee4748b45cdd640203013ca10400&amp;hy=SH&amp;storeid=32303137303832363135353434383030303231323435313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:4,
pt:118,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
ticket:"",
traceid:"wx0tgj5o4czvigfw00",
type:"0",
url:"/pages/detail/pages/pintuan/index?itemId=1k5o5oe&amp;activityId=1c3wby&amp;ptp=_qd._tengxun__4459884.152.1.0&amp;weixinadkey=bf9951d70e454c6438d959cbbea3735a227eebf2e96952441d1f0e26a0e758d51c82d4e9e270e0de56da8b15765db589&amp;gdt_vid=wx0tgj5o4czvigfw00&amp;weixinadinfo=14764746.wx0tgj5o4czvigfw00.1.1",
watermark_type:0,
weapp_info:{
original_id:"gh_78b4a2eb5f09"
}
},
pt_118x4:{
ad_desc:"",
aid:"14764746",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
biz_appid:"",
cpc_exp_info:{
exp_content:"{&quot;btn_text&quot;: &quot;去购买&quot;,&quot;icon_pos&quot;: &quot;right&quot;,&quot;aid_list&quot;:[{&quot;aid&quot;: 14764746,&quot;sale_text&quot;: &quot;全场5折起-vicky&quot;,&quot;price&quot;: &quot;1399&quot;}]}"
},
dest_type:6,
group_id:"",
hint_txt:"电商推广-20170703-垃圾袋测试1",
image_url:"http://wxsnsdythumb.video.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410d51122abd9413058beee4748b45cdd640203013ca10400&amp;hy=SH&amp;storeid=32303137303832363135353434383030303231323435313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:4,
pt:118,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=vhLToc08YoIbLWeWei4Bg7pV%2BwHRfxuAOVNgyFSkMcOWEahu%2BZjQS3OlU0CkEmbCIi3AGYy%2F4XSsY4vpWTITZhVT9yFbmKtfn%2BzsTUZ5R9w8l42vo8SoYn83DVVvkIlEhq0%2F4%2FpMscg9rAwHL1fyBkzASVOIdQ%2BPQFdogjbEYE%2B41dDXFxL%2B6D2UHDaFFS3AjC%2B%2Bpj9WNc8aX9AM%2FvU9qW6rTUNAsMOfUX7aL4rPhQ0tczOaUJLsxMiduhyvjV6aFlKpIXO5IXMkcr1Fu2GuT28DRpREydZKU9AW9c9oSs3R6qJdg1Fqw6DOpzy9pTdyKVsXm0sGOTGhlS6T9xkNiDkPgF%2BlFR%2Bneiwai4rzpJJFn5HPtu1vj120jbWODlJiCCrpkePbGIMXP0VC%2BQnvIzsqUDxm6EPYNJ49GKXUYKMsF8GYIBUfwrrx0W9OaQ%2B5U3tdiA7lxCtDJNLA21afqjm5UB5HjS5AVhPG8Wm2gdRIDjNBxmUeOQukF0djgecmuDKRQ3k8qChVVRIL8XoIlUuDVNs16BriQVuo3vC%2BWT7K5cYDE8QH%2BNqu33Ps2B1SsEtb1d7R0oTGkc7udyjo5Qdp%2BHbLjBqfPau2kXbVEsD%2FTbhb9lw%2F6dGult72nSSKMyqjDHiKqE51z7%2FMcwebV8A0pPdjS8U%2FHO5S6n4L%2B%2F9eZTpQmQR0VTw%2BQpJXg0EgzKGYPuG5BKdIF5YemAiZKpq6l7kooPSZU7XSzJxhGvKEQq5vKiweA7uArQuTvs4IcmPxyyP59pX6VLKLkOeHzJxbJWrkP%2BTT3s%2BGg3wwiAhr61XKCsa2iH2Xzud2%2B3eN5ommp6mJQxG%2FMfUFDIJTSV3%2BZq1Qec0MdxDLc%2BV6Dar%2FddfWZ543fQn6M92c2TQxwHWhAvfLnZDYzO7VbCFHfxCLV%2F6CvVz5MlKLW53y5fzFgx5kFhhAPmPmwv6WY%2Fqc%2FKWqVhcr3N9OUIQbc5KdewwSXGRQ8Xza%2Fm9JAZAXZw4FFdgE7mdjYRQ7wSaukFERlkWtcQcsO9BjioteQqEi6rp8gMqb2keyycsk0OC0LqfRYkG9q5SFOQ%3D%3D",
ticket:"",
traceid:"wx0tgj5o4czvigfw00",
type:"0",
url:"/pages/detail/pages/pintuan/index?itemId=1k5o5oe&amp;activityId=1c3wby&amp;ptp=_qd._tengxun__4459884.152.1.0&amp;weixinadkey=bf9951d70e454c6438d959cbbea3735a227eebf2e96952441d1f0e26a0e758d51c82d4e9e270e0de56da8b15765db589&amp;gdt_vid=wx0tgj5o4czvigfw00&amp;weixinadinfo=14764746.wx0tgj5o4czvigfw00.1.1",
watermark_type:0,
weapp_info:{
original_id:"gh_78b4a2eb5f09"
}
},
pt_119:{
ad_desc:"",
aid:"11514588",
app_info:{
category:[],
url_scheme:""
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=JQl2DdYu2F7fedkmJMakuuz%2BcbjoYoLUkJpH4XNZmVm0HWz2TPzJ%2FUlM8oa9NRFc3LMhVYq7q0yx%2BpPIQHYhATPRmvWjJ%2FhQQ5448hZZ5IJgDUCW9pn9x6Oe6O5i4d94en4UyMt0amQR2vmmlvRpF8UeLC1GuYDNdwDxam5BYXHi6skDlCWX%2FqMBEx8U5oQ3rHOb%2F8C%2Bwi6dFuvehEcmmkgd%2BPXlC04faEgJaBioyZNQHNYbMoCHb9t0RyIyOsgZ0W50x0RCSKC5otfFA2EGByKcI2LsoWf52iA0HNtX7NS5BvJGapKD2hlq8XX8CPcOQuGtbyhZiVHLSRRkerxLLnygcFbxRWWI%2FLd%2FetjUrcER2vmmlvRpF8UeLC1GuYDNg6IebWC%2FQqg68WT3P8Rn3n81qcn%2FW05WniqeNPAjKXrEnXiVI5mJHq8Hq82QGeop5fsVLSzmhl6mj7L2YYJZsA6zOHkDNuAvdoZQCcICQLzLrq9T%2FfwpH5rrbM7MG0HhST%2BaKtynO5Zd3pDcTqoFzTJPd8nH7k1BAjLS75VSeovYjRJp%2BeK%2FGtueC%2BcYZ39GGcV%2F00UbYwWdGWbbwwx11UdxkwG4evYL%2FI85Qn5gKwatZ7zuhar29YXnFOdzMAG2bNNXXrZKs6ZkwY6zBR49ZY%2BRQQO0j6%2B9ZbC0F6yIi%2B93xrRiBWbzBg%3D%3D",
biz_appid:"",
dest_type:6,
group_id:"",
hint_txt:"ddd",
image_url:"http://vweixinthumb.tc.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d040253480410cb06ce928fae4ffe0201207b80095469020300bdce0400&amp;hy=SH&amp;storeid=32303137303830373038313935303030303232316539313336666664393337303561333230613030303030303664&amp;bizid=1023",
is_cpm:0,
logo:"",
pos_type:0,
pt:119,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=JQl2DdYu2F7fedkmJMakuuz%2BcbjoYoLUkJpH4XNZmVm0HWz2TPzJ%2FUlM8oa9NRFc3LMhVYq7q0yx%2BpPIQHYhATPRmvWjJ%2FhQQ5448hZZ5IJgDUCW9pn9x6Oe6O5i4d94en4UyMt0amQR2vmmlvRpF8UeLC1GuYDNdwDxam5BYXHi6skDlCWX%2FqMBEx8U5oQ3rHOb%2F8C%2Bwi6dFuvehEcmmkgd%2BPXlC04faEgJaBioyZNQHNYbMoCHb9t0RyIyOsgZ0W50x0RCSKC5otfFA2EGByKcI2LsoWf52iA0HNtX7NS5BvJGapKD2hlq8XX8CPcOQuGtbyhZiVHLSRRkerxLLnygcFbxRWWI%2FLd%2FetjUrcER2vmmlvRpF8UeLC1GuYDNg6IebWC%2FQqg68WT3P8Rn3n81qcn%2FW05WniqeNPAjKXrEnXiVI5mJHq8Hq82QGeop5fsVLSzmhl6mj7L2YYJZsA6zOHkDNuAvdoZQCcICQLzLrq9T%2FfwpH5rrbM7MG0HhST%2BaKtynO5Zd3pDcTqoFzTJPd8nH7k1BAjLS75VSeovYjRJp%2BeK%2FGtueC%2BcYZ39GGcV%2F00UbYwWdGWbbwwx11UdxkwG4evYL%2FI85Qn5gKwatZ7zuhar29YXnFOdzMAG2bNNXXrZKs6ZkwY6zBR49ZY%2BRQQO0j6%2B9ZbC0F6yIi%2B93xrRiBWbzBg%3D%3D",
ticket:"",
traceid:"wx0rugvht6pygczc00",
type:"0",
url:"/pages/detail/detail?id=1112&amp;share=true&amp;weixinadkey=e6945e4066ec2c5f5a7368948a8716eac2bde11af126a8f051891696e2017fcf12e5f5b0fa6672bc31acc2552727a77d&amp;gdt_vid=wx0rugvht6pygczc00&amp;weixinadinfo=11514588.wx0rugvht6pygczc00.0.1",
watermark_type:2,
weapp_info:{
original_id:"gh_6ee8536f381b"
}
},
pt_122:{
hint_txt:"",
url:"http://mp.weixin.qq.com/mp/ad_app_info?app_id=1101190044&amp;weixinadkey=34b9e3bd38f3859bee1c23202f3b6df6848b100064d7a6a068b349e0933643b05ad366f80123557b8caf631ecbc11ec5&amp;ticket=2uxp24z9r4cs1&amp;gdt_vid=wx0bzrgyopn55la600&amp;md5sum=B75DBA5A7979AC22D5605CED6B98F1AA&amp;weixinadinfo=11528188.wx0bzrgyopn55la600.0.1#wechat_redirect",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=viewid=%7B%22count%22%3A+%221%22%2C+%22wxuin%22%3A+%2268516840%22%2C+%22datafmt%22%3A+%22json%22%2C+%22posid%22%3A+%2272058780271891663%22%2C+%22pass_ticket%22%3A+%22dY16UHPC90lkP9Z48gqtJVz%25252B64a8WScMjJS3B20xBns%25253D%22%2C+%22charset%22%3A+%22utf8%22%2C+%22uin%22%3A+%22569825475%22%2C+%22ext%22%3A+%7B%22req%22%3A+%7B%22c_ua%22%3A+%22Mozilla%2F5.0+%28iPhone%3B+CPU+iPhone+OS+10_2+like+Mac+OS+X%29+AppleWebKit%2F602.3.12+%28KHTML%2C+like+Gecko%29+Mobile%2F14C92+MicroMessenger%2F6.5.18+NetType%2FWIFI+Language%2Fzh_CN%22%2C+%22msg_type%22%3A+9%2C+%22is_preview%22%3A+0%2C+%22c_loc%22%3A+993250%2C+%22wuid%22%3A+%22oDdoCtxtgdRmDwouqnskz5_2u9mM%22%2C+%22hosttype%22%3A+%22wechat%22%2C+%22c_os%22%3A+%22ios%22%2C+%22c_ip%22%3A+%2257.1.0.0%22%2C+%22appid%22%3A+%22wx9259bd068c1cfcc4%22%2C+%22conn%22%3A+1%7D%2C+%22pos%22%3A+%7B%22index_0%22%3A+%7B%22category_list%22%3A+%5B%5D%2C+%22aid_list%22%3A+%5B%5D%2C+%22msgid%22%3A+2652154099%2C+%22itemidx%22%3A+5%2C+%22msg_time%22%3A+1508232790%2C+%22scene_type%22%3A+0%2C+%22msg_daily_idx%22%3A+1%2C+%22wx_share%22%3A+1%7D%7D%7D%2C+%22adposcount%22%3A+%221%22%7D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=%7B%22count%22%3A+%221%22%2C+%22wxuin%22%3A+%2268516840%22%2C+%22datafmt%22%3A+%22json%22%2C+%22posid%22%3A+%2272058780271891663%22%2C+%22pass_ticket%22%3A+%22dY16UHPC90lkP9Z48gqtJVz%25252B64a8WScMjJS3B20xBns%25253D%22%2C+%22charset%22%3A+%22utf8%22%2C+%22uin%22%3A+%22569825475%22%2C+%22ext%22%3A+%7B%22req%22%3A+%7B%22c_ua%22%3A+%22Mozilla%2F5.0+%28iPhone%3B+CPU+iPhone+OS+10_2+like+Mac+OS+X%29+AppleWebKit%2F602.3.12+%28KHTML%2C+like+Gecko%29+Mobile%2F14C92+MicroMessenger%2F6.5.18+NetType%2FWIFI+Language%2Fzh_CN%22%2C+%22msg_type%22%3A+9%2C+%22is_preview%22%3A+0%2C+%22c_loc%22%3A+993250%2C+%22wuid%22%3A+%22oDdoCtxtgdRmDwouqnskz5_2u9mM%22%2C+%22hosttype%22%3A+%22wechat%22%2C+%22c_os%22%3A+%22ios%22%2C+%22c_ip%22%3A+%2257.1.0.0%22%2C+%22appid%22%3A+%22wx9259bd068c1cfcc4%22%2C+%22conn%22%3A+1%7D%2C+%22pos%22%3A+%7B%22index_0%22%3A+%7B%22category_list%22%3A+%5B%5D%2C+%22aid_list%22%3A+%5B%5D%2C+%22msgid%22%3A+2652154099%2C+%22itemidx%22%3A+5%2C+%22msg_time%22%3A+1508232790%2C+%22scene_type%22%3A+0%2C+%22msg_daily_idx%22%3A+1%2C+%22wx_share%22%3A+1%7D%7D%7D%2C+%22adposcount%22%3A+%221%22%7D",
traceid:"wx0bzrgyopn55la600",
group_id:"",
ticket:"2uxp24z9r4cs1",
aid:"11528188",
pt:122,
image_url:"http://wxsnsdythumb.wxs.qq.com/109/20204/snsvideodownload?filekey=3026020101041f301d02016d0402534804107a03b840e114ba5ebed148a104445a4602023cbf0400&amp;hy=SH&amp;storeid=32303137313031303130343832333030306563343130313336666664393337303561333230613030303030303664&amp;bizid=1023",
app_info:{
app_name:"达令全球好货",
app_id:1101190044,
apk_name:"com.ymall.presentshop",
icon_url:"http://pp.myapp.com/ma_icon/0/icon_10441856_1501057920/256",
apk_url:"http://imtt.dd.qq.com/16891/B75DBA5A7979AC22D5605CED6B98F1AA.apk?fsname=com.ymall.presentshop_5.9.8_58.apk&amp;csr=97c2",
app_md5:"B75DBA5A7979AC22D5605CED6B98F1AA",
version_code:58,
appinfo_url:"http://imtt.dd.qq.com/16891/B75DBA5A7979AC22D5605CED6B98F1AA.apk?fsname=com.ymall.presentshop_5.9.8_58.apk&amp;csr=97c2",
app_size:9940095,
down_count:3400591,
category:[],
snap_shots:"http://pp.myapp.com/ma_pic2/0/shot_10441856_1_1501057898/330|http://pp.myapp.com/ma_pic2/0/shot_10441856_2_1501057898/330|http://pp.myapp.com/ma_pic2/0/shot_10441856_3_1501057898/330|http://pp.myapp.com/ma_pic2/0/shot_10441856_4_1501057898/330|http://pp.myapp.com/ma_pic2/0/shot_10441856_5_1501057898/330",
signature_md5:"29FA5788AC46F8319408A83D2755C288",
desc:"【新人有礼】新人专享优惠，购物接近零成本。\n 【任性包邮】 新用户首单就包邮。\n 【达令闪购】每日20点开抢，极致低价，绝对好货，数量有限。\n 【全球时尚杂货铺】遍及32个国家，上百位国际时尚买手，全球好货精挑细选，件件都会让您心动！\n 【品类丰富】极致美护、全球零食、创意生活、配饰等商品种类高达万种，满足一切购物需求。\n 【明星鹿晗投资】hi，达令，我是鹿晗，达令投资人，投资比影响力更重要的是责任.达令，100%正品，绝无假货，让我们一起携手开启美好生活。\n 【自营免税】品牌直签－商品够独特 ; 海关监督-正品有保证 ；免税－价格更便宜；轻松购物－不出国门鲜货入手。\n 【货到付款才安心】看到宝贝再付款，不满意就退货，支持7天无理由退换货，一切只为您安心。\n 【打造极致体验】选货无需凭借经验(跟着买手购全球)，不用在去垂直电商(都说达令啥都有)，服务不仅仅售后(服务体验更一流)，千万用户口碑推荐(口碑有保证)。 【联系我们】\n -官方网站：http://www.daling.com\n -官方服务电话：400-080-1888",
new_feature:"1、为你推荐的商品只为你推荐哦，最懂你的达令\n2、提升了密码设置安全度\n3、提升了身份验证有效性",
channel_id:"",
app_rating:4.68559,
url_scheme:"",
app_type:1
},
ad_desc:"",
biz_appid:"wx1cc240e4c8a57224",
biz_info:{
user_name:"gh_53de48b23bb3",
nick_name:"腾讯MP测试账号1",
is_subscribed:0,
biz_uin:3072042422
},
pos_type:0,
watermark_type:0,
logo:"",
is_cpm:0,
dest_type:2
},
pt_125:{
hint_txt:"创意-20180115",
url:"http://www.ghac.cn/vehicles/honda/odyssey?weixinadkey=0c52ad5fd45796439b24582df9a6167361d5ab1e4457b2c9e96a29d5a19e3d1bc8bbf0e5df7591508a76757470b14928&amp;gdt_vid=wx0wufunvuk63xfw00&amp;weixinadinfo=14076581.wx0wufunvuk63xfw00.1.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=AQrMXyT89gngX7Yqg3VmoZ%2BgZXHcFzAUPN%2BO66slyJzfc1RpFF%2FM6ZHfSV9qy2%2BJXDgneeysXEh561%2Bt%2BlqnFe%2B9CRvOv6P00C89bIEUdzOloWeqoHSpLf2h8PWKCHChBNftN0UtFrwhv7WuSeS7NyybemN9XybnMGpCHzd2xxVe3xMaFDzEDn83mQ7UPKcZse31v82G6sriTTG1imyjPx4gTFFvcAdNe9Ucb1g%2BmkqQMlouoHmYXq%2Fvqs4O3ZW0h6irVoUvR7rPq8kESHHUJze2SO4Dp5T%2FqzYZoaFGO6%2FB1baqlUe5Zk8c5e0ZdcsVoGZr2VpHK4l%2BoFL7iibprBkGy%2Bvj13BoIRz3LL16wAY3cvM0gWi%2BL93XtSHoWhtREhzdxcl%2FE%2FqLvO798Jr8QOovcdfP0Fa2UJP00Ll3nhtbshh6x6tpYubNiFm%2FDEGThFLM2Bm9w%2BMvx3WlrOG1NbGe4%2BdTVOCbe2y24T7IRk%2FIH87jhW5gZPDej%2B%2F8bI%2BrBk1WcqDPNIdDmmG0iQb3RVwIr%2B22j8poNY%2Bm7EI8V7GkGjzGkFn%2FhDouo26BsHlekICoeVurgSlKMGS2Vez%2Bfo7BiKCAD5WK93La3ceJm1D9FiWAyKmm%2FiBqPgV%2BIjhxdkQSfUTTWexV0lFzCivDQ4T9YXc6MGkf%2FSpM%2FdTZBPh7lD%2FTSsD6DZUm1RVwn%2B2EOAsVO1r9XZVL4hLwij9BOx8nQ2nBZGxqHzYAO5EnQBlBXDwq8ZZG19gCMpX9UInNT1jDM6EapF24Cv1pOwALPnyE4gd7kNTcEkKDAnDDuvAl4H3J8MX9xiCwus%2FgSlijiuydzpeSdatop0fyGpDkrERZhK0BY%2FWVsZGyiOMwW1NXeCYuRjt8XI8ETkbpuGp2sL7hXIj71zfBB6u8aWPv1Bn5HOn3b1c%2BYYXviuJ4W0aywemTOZCbZ7gJ0rdjr1jq6O%2F6FbSubjcMyemZWRb9KQlzngXIKn1iUe5huXgmAUKzo4Uv%2B5HptxSbNKewBOIAErfaJ8wEHaVmIUuTm7RcI22lXqRNGvFMpR5fVTTwGdG4oBqKWOcVhR8WlKRYfiCoqMhYmt1rKZgBerU0t%2BnUerkV40kGrjY3O4fe1q%2Bw9e7rRJ4VElq7GmEe9Ug%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=AQrMXyT89gngX7Yqg3VmoZ%2BgZXHcFzAUPN%2BO66slyJzfc1RpFF%2FM6ZHfSV9qy2%2BJXDgneeysXEh561%2Bt%2BlqnFe%2B9CRvOv6P00C89bIEUdzOloWeqoHSpLf2h8PWKCHChBNftN0UtFrwhv7WuSeS7NyybemN9XybnMGpCHzd2xxVe3xMaFDzEDn83mQ7UPKcZse31v82G6sriTTG1imyjPx4gTFFvcAdNe9Ucb1g%2BmkqQMlouoHmYXq%2Fvqs4O3ZW0h6irVoUvR7rPq8kESHHUJze2SO4Dp5T%2FqzYZoaFGO6%2FB1baqlUe5Zk8c5e0ZdcsVoGZr2VpHK4l%2BoFL7iibprBkGy%2Bvj13BoIRz3LL16wAY3cvM0gWi%2BL93XtSHoWhtREhzdxcl%2FE%2FqLvO798Jr8QOovcdfP0Fa2UJP00Ll3nhtbshh6x6tpYubNiFm%2FDEGThFLM2Bm9w%2BMvx3WlrOG1NbGe4%2BdTVOCbe2y24T7IRk%2FIH87jhW5gZPDej%2B%2F8bI%2BrBk1WcqDPNIdDmmG0iQb3RVwIr%2B22j8poNY%2Bm7EI8V7GkGjzGkFn%2FhDouo26BsHlekICoeVurgSlKMGS2Vez%2Bfo7BiKCAD5WK93La3ceJm1D9FiWAyKmm%2FiBqPgV%2BIjhxdkQSfUTTWexV0lFzCivDQ4T9YXc6MGkf%2FSpM%2FdTZBPh7lD%2FTSsD6DZUm1RVwn%2B2EOAsVO1r9XZVL4hLwij9BOx8nQ2nBZGxqHzYAO5EnQBlBXDwq8ZZG19gCMpX9UInNT1jDM6EapF24Cv1pOwALPnyE4gd7kNTcEkKDAnDDuvAl4H3J8MX9xiCwus%2FgSlijiuydzpeSdatop0fyGpDkrERZhK0BY%2FWVsZGyiOMwW1NXeCYuRjt8XI8ETkbpuGp2sL7hXIj71zfBB6u8aWPv1Bn5HOn3b1c%2BYYXviuJ4W0aywemTOZCbZ7gJ0rdjr1jq6O%2F6FbSubjcMyemZWRb9KQlzngXIKn1iUe5huXgmAUKzo4Uv%2B5HptxSbNKewBOIAErfaJ8wEHaVmIUuTm7RcI22lXqRNGvFMpR5fVTTwGdG4oBqKWOcVhR8WlKRYfiCoqMhYmt1rKZgBerU0t%2BnUerkV40kGrjY3O4fe1q%2Bw9e7rRJ4VElq7GmEe9Ug%3D",
traceid:"wx0akxhovy4dzrec00",
group_id:"",
ticket:"",
aid:"17552658",
pt:125,
image_url:"",
app_info:{
category:[],
url_scheme:""
},
ad_desc:"",
biz_appid:"wx13fa0756d9611069",
biz_info:{
user_name:"gh_a1d71beaf42d",
nick_name:"dd_testing18",
is_subscribed:0,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM7T42AtbwoPuOblZmJvhATf9lTyO9yfTtOcuNRLSG9nrg/0",
biz_uin:3098042136
},
pos_type:0,
watermark_type:0,
logo:"",
is_cpm:0,
video_info:{
displayWidth:960,
displayHeight:540,
thumbUrl:"http://wxsnsdythumb.wxs.qq.com/109/20250/snsvideodownload?m=4467ec2512e075be90b3dcffe4433ffa&amp;filekey=30340201010420301e02016d0402534804104467ec2512e075be90b3dcffe4433ffa020301ae46040d00000004627466730000000131&amp;hy=SH&amp;storeid=32303138303131353133353930393030303131323433313336666664393330343561333230613030303030303664&amp;bizid=1023",
videoUrl:"http://wxsnsdy.wxs.qq.com/105/20210/snsdyvideodownload?m=6ecceed8787419a0810593972fde324b&amp;filekey=30340201010420301e0201690402534804106ecceed8787419a0810593972fde324b020316fc73040d00000004627466730000000131&amp;hy=SH&amp;storeid=32303138303131353133353930393030303134646565313336666664393330343561333230613030303030303639&amp;bizid=1023"
},
dest_type:1,
material_width:690,
material_height:388
}
};
return{
getAd:e
};
});define("appmsg/reward_entry.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","rt/appmsg/getappmsgext.rt.js","biz_wap/utils/mmversion.js","appmsg/appmsgext.js"],function(e,t,r,a){
"use strict";
function n(e){
e&&(e.style.display="block");
}
function d(e){
e&&(e.style.display="none");
}
function i(){
f.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:msg_title,
ct:ct,
devicetype:devicetype,
version:version,
is_need_reward:is_need_reward,
reward_uin_count:is_need_reward?3*w:0,
send_time:window.send_time||"",
rtId:"27613",
rtKey:"50",
onSuccess:function(e){
e&&(document.getElementById("js_reward_link")&&u.off(document.getElementById("js_reward_link"),"click",b),
document.getElementById("js_reward_avatar")&&u.off(document.getElementById("js_reward_avatar"),"click",I),
s({
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp,
reward_author_head:e.reward_author_head,
rewardsn:e.rewardsn
}));
},
onError:function(){}
});
}
function o(e){
return function(t){
return"0"==window.wx_user_can_reward?void a("你已成为该公众号的黑名单用户，暂时无法赞赏。"):(t.preventDefault(),
-1==e.indexOf("&__tc=1")&&window.__addIdKeyReport?window.__addIdKeyReport("110809",2):window.__addIdKeyReport&&window.__addIdKeyReport("110809",3),
void g.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t.err_msg.indexOf(":ok")>-1||(location.href=e);
}));
};
}
function s(e){
var t=window.innerWidth||document.documentElement.innerWidth,r=(Math.ceil((v-188)/42)+1)*Math.floor((t-15)/42);
l="http://mp.weixin.qq.com/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&offset=0&count="+r+"&source=1#wechat_redirect";
var a="#wechat_redirect",s="";
s=source_mid&&source_biz&&source_idx?"https://mp.weixin.qq.com/mp/author?action=show&__biz="+source_encode_biz+"&appmsgid="+source_mid+"&idx="+source_idx+"&reprint_biz="+biz+"&reprint_appmsgid="+mid+"&reprint_idx="+idx+"&timestamp="+e.timestamp+"&author_id="+author_id+"&scene=141&rscene=128":"https://mp.weixin.qq.com/mp/author?action=show&__biz="+biz+"&appmsgid="+mid+"&timestamp="+e.timestamp+"&author_id="+author_id+"&idx="+idx+"&scene=142&rscene=128",
e.rewardsn&&(s+="&rewardsn="+e.rewardsn),s+=a,-1==navigator.userAgent.indexOf("Android")||author_id||(s="https://mp.weixin.qq.com/bizmall/reward?act=showpage&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&timestamp="+e.timestamp+"&showwxpaytitle=1&rewardsn="+e.rewardsn+a);
var _=document.getElementById("js_reward_link"),w=document.getElementById("js_reward_avatar");
if(_&&(g.on("activity:state_change",function(e){
if("onResume"==e.state_change||"onResume"==e.state){
var t=(new Date).valueOf();
if(-1!=navigator.userAgent.indexOf("Android")&&localStorage.getItem("lastOnresumeTime")&&t-parseInt(localStorage.getItem("lastOnresumeTime"))<=j)return;
localStorage.setItem("lastOnresumeTime",t),h.isAndroid&&!author_id&&g.invoke("setNavigationBarColor",{
actionCode:"1"
}),i();
}
}),b=o(s.replace(a,"&__tc=1"+a)),I=o(s),u.on(_,"click",b),author_id&&1==e.can_reward&&u.on(w,"click",I),
1==e.can_reward&&author_id)){
n(document.getElementById("js_reward_author")),n(document.getElementById("js_reward_avatar")),
document.getElementById("js_reward_author_head").setAttribute("src",e.reward_author_head),
document.getElementById("js_reward_area").classList.add("reward_area_primary");
var p=document.getElementById("js_reward_link_text");
p.innerText="喜欢作者",Math.random()<.05?p.innerText="稀罕作者":Math.random()>.05&&Math.random()<.1&&(p.innerText="钟意作者"),
document.getElementById("js_reward_total_text").innerText="喜欢";
}
y=e.reward_head_imgs;
var f=m();
x.reward&&(author_id||h.isAndroid)&&1==e.can_reward?(n(x.reward),u.on(window,"load",function(){
c&&(u.off(window,"scroll",c),u.on(window,"scroll",c));
})):d(x.reward);
var z=document.getElementById("js_reward_inner");
z&&f>0&&n(z);
var E=document.getElementById("js_reward_total");
E&&(E.innerText=e.reward_total,E.setAttribute("href",l));
}
function _(e,t){
var r=document.createElement("span");
r.className="reward_user_avatar";
var a=new Image;
return a.onload=function(){
window.logs&&window.logs.reward_heads_total++,a.onload=a.onerror=null;
},a.onerror=function(){
window.logs&&window.logs.reward_heads_total++,window.logs&&window.logs.reward_heads_fail++,
a.onload=a.onerror=null;
},a.src=t,r.appendChild(a),e.appendChild(r),r;
}
function m(){
if(y.length){
var e=document.getElementById("js_reward_list"),t=0,r=document.createDocumentFragment();
if(e){
for(var a=0,n=y.length;n>a&&(t++,_(r,y[a]),t!=3*w);++a);
t>w&&(e.className+=" tl"),e.innerHTML="",e.appendChild(r);
}
return t;
}
}
function c(){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+v>x.reward.offsetTop&&(p({
type:"GET",
url:"/bizmall/reward?act=report&__biz="+biz+"&appmsgid="+mid+"&idx="+idx,
async:!0
}),u.off(window,"scroll",c),c=null);
}
var w,l,u=e("biz_common/dom/event.js"),p=e("biz_wap/utils/ajax.js"),g=e("biz_wap/jsapi/core.js"),h=(e("rt/appmsg/getappmsgext.rt.js"),
e("biz_wap/utils/mmversion.js")),f=e("appmsg/appmsgext.js"),v=window.innerHeight||document.documentElement.clientHeight,x={
reward:document.getElementById("js_reward_area")
},y=[],j=500;
window.logs&&(window.logs.reward_heads_total=0,window.logs.reward_heads_fail=0);
var b=function(){},I=function(){};
return{
handle:function(e,t){
w=t,s(e);
},
render:function(e){
w=e,m();
}
};
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","appmsg/log.js"],function(require,exports,module,alert){
"use strict";
function initLikeEvent(opt){
var el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom;
if(el_like&&el_likeNum){
var like_report=function(e){
log("[Appmsg] click like");
var tmpAttr=el_like.getAttribute("like"),tmpHtml=el_likeNum.innerHTML,isLike=parseInt(tmpAttr)?parseInt(tmpAttr):0,like=isLike?0:1,likeNum=parseInt(tmpHtml)?parseInt(tmpHtml):0,appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0
},
type:"POST",
success:function(res){
var data=eval("("+res+")");
log("[Appmsg] like ajax succ"+data.base_resp.ret),0==data.base_resp.ret&&(isLike?(Class.removeClass(el_like,opt.className),
el_like.setAttribute("like",0),likeNum>0&&"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum-1==0?"赞":likeNum-1)):(el_like.setAttribute("like",1),
Class.addClass(el_like,opt.className),"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum+1)));
},
async:!0
});
};
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
});
}
}
function showLikeNum(e){
var i=e||{};
if(i.show){
var t=i.likeAreaDom,l=i.likeNumDom;
t&&(t.style.display=i.likeAreaDisplayValue,i.liked&&Class.addClass(t,i.className),
t.setAttribute("like",i.liked?"1":"0"));
var s=i.likeNum||"赞";
parseInt(s)>1e5?s="100000+":"",l&&(l.innerHTML=s);
}
}
function showReadNum(e){
var i=e||{};
if(i.show){
var t=i.readAreaDom,l=i.readNumDom;
t&&(t.style.display=i.readAreaDisplayValue);
var s=i.readNum||1;
parseInt(s)>1e5?s="100000+":"",l&&(l.innerHTML=s);
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),log=require("appmsg/log.js");
return{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum,
showReadNum:showReadNum
};
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+r.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function n(){
return-1!=a.indexOf("&_newvideoplayer=0")?!1:-1!=a.indexOf("&_newvideoplayer=1")?!0:1!=r.is_login?!1:r.use_tx_video_player?!1:w.canSupportVideo&&h.inWechat?h.is_ios||h.is_android?!0:!1:(r._hasReportCanSupportVideo||w.canSupportVideo||!h.inWechat||(r._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function o(){
console.log("isUseAd: "+_.isInMiniProgram);
{
var e=a,i=window.location.href;
r.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=r.sn&&"f62e1cb98630008303667f77c17c43d7"!=r.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=r.sn?_.isInMiniProgram?!1:-1!=e.indexOf("&_videoad=1")?!0:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:"54"==r.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:r.__appmsgCgiData&&r.__appmsgCgiData.can_use_page&&(h.is_ios||h.is_android)?!0:c.showAd()?!0:!1:!1;
}
function t(){
var e=a;
if(!r.user_uin)return!1;
if(-1!=e.indexOf("&_proxy=1"))return!0;
if(-1!=e.indexOf("&_proxy=0"))return!1;
if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show"))return!1;
var i=(new Date).getHours();
return i>=9&&14>=i?!1:h.inWechat&&h.is_android&&h.is_x5&&h.wechatVer>="6.2.2"?!0:h.inWechat&&h.is_android&&h.is_xweb&&h.xweb_version>=16?!0:h.inWechat&&h.is_ios&&(-1!=f.indexOf("MicroMessenger/6.2.4")||h.wechatVer>="6.2.4")?!0:!1;
}
function s(){
return u.networkType;
}
var r,a,d=e("biz_common/dom/event.js"),p=e("biz_wap/jsapi/core.js"),w=e("biz_wap/utils/device.js"),c=e("new_video/ctl.js"),_=e("biz_wap/utils/mmversion.js"),f=window.navigator.userAgent,u={
networkType:""
},h={};
if(parent==window)r=window,a=window.location.href;else try{
a=parent.window.location.href,r=parent.window;
}catch(m){
a=window.location.href,r=window;
}
return function(e){
var i=w.os;
h.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),h.is_android=!!i.android,h.is_wp=!!i.phone,
h.is_pc=!(i.phone||!i.Mac&&!i.windows),h.inWechat=/MicroMessenger/.test(e),h.inWindowWechat=/WindowsWechat/i.test(e),
h.inMacWechat=/wechat.*mac os/i.test(e),h.is_android_phone=h.is_android&&/Mobile/i.test(e),
h.is_android_tablet=h.is_android&&!/Mobile/i.test(e),h.ipad=/iPad/i.test(e),h.iphone=!h.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
h.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var n,o=/XWEB\/([\d\.]+)/i,t=e.match(o);
t&&t[1]&&(n=parseInt(t[1])),h.is_xweb=!!t,h.xweb_version=n;
var s=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
h.wechatVer=s&&s[1]||0,d.on(window,"load",function(){
if(""==u.networkType&&h.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
p.invoke("getNetworkType",{},function(i){
u.networkType=e[i.err_msg]||"fail","network_type:edge"==i.err_msg&&i.detailtype&&"4g"==i.detailtype&&(networkType="4g");
});
}
},!1);
}(window.navigator.userAgent),"undefined"==typeof r._hasReportCanSupportVideo&&(r._hasReportCanSupportVideo=!1),
{
device:h,
isShowMpVideo:n,
isUseProxy:t,
isUseAd:o,
getNetworkType:s
};
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_wap/utils/device.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","appmsg/cdn_img_lib.js","a/tpl/cpc_tpl.html.js","a/profile.js","a/android.js","a/ios.js","a/app_card.js","a/sponsor.js","a/video.js"],function(require,exports,module,alert){
"use strict";
function _GetQuery(e){
for(var a=window.location.search,t=a.substring(1,a.length).split("&"),p=0;p<t.length;p++){
var i=t[p].split("=");
if(i[0].toUpperCase()===e.toUpperCase())return i[1];
}
return"";
}
function report(e,a){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+a);
}
function adOptReport(e,a,t,p){
Report("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+a+"&trace_id="+t+"&aid="+p+"&__biz="+window.biz+"&r="+Math.random());
}
function getWindowHeight(){
return"CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0;
if(!globalAdDebug){
var inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx||mmversion.isInMiniProgram)is_need_ad=0,
js_sponsor_ad_area.style.display="none",js_bottom_ad_area.style.display="none",js_cpc_area&&js_cpc_area.style&&(js_cpc_area.style.display="none");else{
var adLS=new LS("ad");
if(window.localStorage&&-1===location.href.indexOf("mock"))try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key),
log("[Ad] is_need_ad: "+is_need_ad+" , adData:"+JSON.stringify(_ad));
}catch(e){
is_need_ad=1,_adInfo=null;
}
}
}
return{
is_need_ad:is_need_ad,
both_ad:0,
_adInfo:_adInfo
};
}
function afterGetAdData(e,a){
function t(e){
var a=e;
if(6==a.dest_type&&(a.is_wx_app=!0),12==e.product_type||19==e.product_type){
var t=a.app_info.app_size||0,p=a.app_info.app_name||a.app_info.appname||"",i=a.app_info.apk_url||a.app_info.pkgurl||"",o=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",n=a.app_info.apk_name||a.app_info.pkg_name||"";
t=formSize(t),p=formName(p),a.app_info.app_size=t,a.app_info.app_name=p,a.app_info.apk_name=n,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=n,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=i,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=o;
var _=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:n,
url_scheme:a.app_info.url_scheme,
androiddownurl:i,
versioncode:a.app_info.version_code,
appinfo_url:a.app_info.appinfo_url,
traceid:a.traceid,
pt:a.pt,
url:a.url,
ticket:a.ticket,
type:a.type,
adid:a.aid,
source:source||"",
is_appmsg:!0,
file_md5:o
},a);
return _;
}
if(23==e.product_type){
for(var r=a.exp_info.exp_value||[],d=!1,s=0,c=0;c<r.length;++c){
var l=r[c]||{};
if(1==l.exp_type&&(s=l.comm_attention_num,d=s>0),2==l.exp_type){
d=!1,s=0;
break;
}
}
a.biz_info.show_comm_attention_num=d,a.biz_info.comm_attention_num=s;
var _=extend({
usename:a.biz_info.user_name,
pt:a.pt,
url:a.url,
traceid:a.traceid,
adid:a.aid,
ticket:a.ticket,
is_appmsg:!0
},a);
return _;
}
return e;
}
function p(e){
if(12==e.product_type||19==e.product_type){
var a=e,t=a.app_info.app_size||0,p=a.app_info.app_name||a.app_info.appname||"",i=a.app_info.apk_url||a.app_info.pkgurl||"",o=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",n=a.app_info.apk_name||a.app_info.pkg_name||"";
t=formSize(t),p=formName(p),a.app_info.app_size=t,a.app_info.app_name=p,a.app_info.apk_name=n,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=n,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=i,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=o;
var _=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:n,
url_scheme:a.app_info.url_scheme,
androiddownurl:i,
versioncode:a.app_info.version_code,
appinfo_url:a.app_info.appinfo_url,
traceid:a.traceid,
pt:a.pt,
url:a.url,
ticket:a.ticket,
type:a.type,
adid:a.aid,
source:source||"",
is_appmsg:!0,
file_md5:o
},a);
return console.log(_),_;
}
return e;
}
function i(e){
return e;
}
var o={},n=e.is_need_ad,_=e._adInfo;
if(0==n)o=_,o||(o={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var r=a.advertisement_info;
o.advertisement_info=saveCopy(r);
}
o.advertisement_num=a.advertisement_num;
}
1==n&&(window._adRenderData=o),o=o||{
advertisement_num:0
};
var d=!1;
if(!o.flag&&o.advertisement_num>0){
var s=o.advertisement_num,c=o.advertisement_info;
window.adDatas.num=s;
for(var l=0;s>l;++l){
var m,f=null,u=c[l];
if(u.exp_info=u.exp_info||{},u.is_cpm=u.is_cpm||0,u.biz_info=u.biz_info||{},u.app_info=u.app_info||{},
u.pos_type=u.pos_type||0,u.logo=u.logo||"",u.use_new_protocol=u.use_new_protocol||0,
m=u.use_new_protocol)4==u.pos_type?(d=!0,u=t(u),f=u):0==u.pos_type?(u=p(u),(12==u.product_type||19==u.product_type)&&(f=u)):3==u.pos_type&&(u=i(u),
f=u);else if(100==u.pt||115==u.pt){
for(var g=u.exp_info.exp_value||[],y=!1,v=0,h=0;h<g.length;++h){
var w=g[h]||{};
if(1==w.exp_type&&(v=w.comm_attention_num,y=v>0),2==w.exp_type){
y=!1,v=0;
break;
}
}
u.biz_info.show_comm_attention_num=y,u.biz_info.comm_attention_num=v,f={
usename:u.biz_info.user_name,
pt:u.pt,
url:u.url,
traceid:u.traceid,
adid:u.aid,
ticket:u.ticket,
is_appmsg:!0
};
}else if(102==u.pt)f={
appname:u.app_info.app_name,
versioncode:u.app_info.version_code,
pkgname:u.app_info.apk_name,
androiddownurl:u.app_info.apk_url,
md5sum:u.app_info.app_md5,
signature:u.app_info.version_code,
rl:u.rl,
traceid:u.traceid,
pt:u.pt,
ticket:u.ticket,
type:u.type,
adid:u.aid,
is_appmsg:!0
};else if(101==u.pt)f={
appname:u.app_info.app_name,
app_id:u.app_info.app_id,
icon_url:u.app_info.icon_url,
appinfo_url:u.app_info.appinfo_url,
rl:u.rl,
traceid:u.traceid,
pt:u.pt,
ticket:u.ticket,
type:u.type,
adid:u.aid,
is_appmsg:!0
};else if(103==u.pt||104==u.pt||2==u.pt&&u.app_info){
var x=u.app_info.down_count||0,j=u.app_info.app_size||0,k=u.app_info.app_name||"",b=u.app_info.category,I=["万","百万","亿"];
if(x>=1e4){
x/=1e4;
for(var q=0;x>=10&&2>q;)x/=100,q++;
x=x.toFixed(1)+I[q]+"次";
}else x=x.toFixed(1)+"次";
j=formSize(j),b=b?b[0]||"其他":"其他",k=formName(k),u.app_info._down_count=x,u.app_info._app_size=j,
u.app_info._category=b,u.app_info.app_name=k,f={
appname:u.app_info.app_name,
app_rating:u.app_info.app_rating||0,
icon_url:u.app_info.icon_url,
app_id:u.app_info.app_id,
channel_id:u.app_info.channel_id,
md5sum:u.app_info.app_md5,
rl:u.rl,
pkgname:u.app_info.apk_name,
url_scheme:u.app_info.url_scheme,
androiddownurl:u.app_info.apk_url,
versioncode:u.app_info.version_code,
appinfo_url:u.app_info.appinfo_url,
traceid:u.traceid,
pt:u.pt,
url:u.url,
ticket:u.ticket,
type:u.type,
adid:u.aid,
is_appmsg:!0,
app_info:u.app_info
};
}else if(105==u.pt){
var E=u.card_info.card_id||"",D=u.card_info.card_ext||"";
D=D.htmlDecode();
try{
D=JSON.parse(D),D.outer_str=u.card_info.card_outer_id||"",D=JSON.stringify(D);
}catch(O){
D="{}";
}
f={
card_id:E,
card_ext:D,
pt:u.pt,
ticket:u.ticket||"",
url:u.url,
rl:u.rl,
tid:u.traceid,
traceid:u.traceid,
type:u.type,
adid:u.aid,
is_appmsg:!0
};
}else if(106==u.pt){
var z=u.mp_shop_info.pid||"",A=u.mp_shop_info.outer_id||"";
f={
pid:z,
outer_id:A,
pt:u.pt,
url:u.url,
rl:u.rl,
tid:u.traceid,
traceid:u.traceid,
type:u.type,
adid:u.aid,
is_appmsg:!0
};
}else if(108==u.pt||109==u.pt||110==u.pt||116==u.pt||117==u.pt)f={
pt:u.pt,
ticket:u.ticket||"",
url:u.url,
traceid:u.traceid,
adid:u.aid,
is_appmsg:!0
},u.video_info&&(f.displayWidth=u.video_info.displayWidth,f.displayHeight=u.video_info.displayHeight,
f.thumbUrl=u.video_info.thumbUrl,f.videoUrl=u.video_info.videoUrl,f.rl=u.rl),6==u.dest_type&&Wxopen_card.startConnect(u);else if(111==u.pt||113==u.pt||114==u.pt||112==u.pt||121==u.pt||122==u.pt){
var j=u.app_info.app_size||0,k=u.app_info.app_name||"";
j=formSize(j),k=formName(k),u.app_info.app_size=j,u.app_info.app_name=k,f={
appname:u.app_info.app_name,
app_rating:u.app_info.app_rating||0,
app_id:u.app_info.app_id,
icon_url:u.app_info.icon_url,
channel_id:u.app_info.channel_id,
md5sum:u.app_info.app_md5,
rl:u.rl,
pkgname:u.app_info.apk_name,
url_scheme:u.app_info.url_scheme,
androiddownurl:u.app_info.apk_url,
versioncode:u.app_info.version_code,
appinfo_url:u.app_info.appinfo_url,
traceid:u.traceid,
pt:u.pt,
url:u.url,
ticket:u.ticket,
type:u.type,
adid:u.aid,
source:source||"",
is_appmsg:!0
};
}else 118==u.pt?(f=u,d=!0,console.log("?#$:"),Wxopen_card.startConnect(u)):119==u.pt||120==u.pt?(f=u,
Wxopen_card.startConnect(u)):125==u.pt&&(f=u,6==u.dest_type&&Wxopen_card.startConnect(u));
var C=u.image_url;
if(require("appmsg/cdn_img_lib.js"),C&&C.isCDN()&&(C=C.replace(/\/0$/,"/640"),C=C.replace(/\/0\?/,"/640?"),
u.image_url=ParseJs.addParam(C,"wxfrom","50",!0)),adDatas.ads["pos_"+u.pos_type]={
a_info:u,
adData:f
},localStorage&&localStorage.setItem&&u.app_info&&u.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+u.traceid,u.app_info.url_scheme),
u.has_installed=!1,m){
if(12==u.product_type||19==u.product_type){
console.log("pkgname:",u.app_info.apk_name),console.log(u);
var B=u.pos_type;
console.log("appPos",B),function(e,a){
console.log("appPos in",e),JSAPI.invoke("getInstallState",{
packageName:a.app_info.apk_name
},function(t){
var p=t.err_msg;
p.indexOf("get_install_state:yes")>-1&&(a.has_installed=!0,console.log("change btn","js_ad_btn_"+e),
document.getElementById("js_ad_btn_"+e)&&(document.getElementById("js_ad_btn_"+e).innerHTML="进入应用"),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
}(B,u);
}
}else u&&(104==u.pt||113==u.pt||114==u.pt||2==u.pt||122==u.pt)&&u.app_info.url_scheme&&JSAPI.invoke("getInstallState",{
packageName:u.app_info.apk_name
},function(e){
var a=e.err_msg;
a.indexOf("get_install_state:yes")>-1&&(u.has_installed=!0,document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
}
var S=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
js_sponsor_ad_area.offsetTop<e+a&&(Class.addClass(document.getElementById("js_ad_area"),"show"),
DomEvent.off(window,"scroll",S));
},T=adDatas.ads;
for(var R in T)if(0==R.indexOf("pos_")){
var f=T[R],u=!!f&&f.a_info;
if(f&&u){
if(0==u.pos_type){
if(u.new_appmsg=window.new_appmsg,js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,u),
111==u.pt||112==u.pt||113==u.pt||114==u.pt){
var N=document.getElementsByClassName("js_download_app_card")[0],P=N.offsetWidth,U=Math.floor(P/2.875);
U>0&&(N.style.height=U+"px");
}
}else if(3==u.pos_type){
var N=document.createElement("div");
N.appendChild(document.createTextNode(u.image_url)),u.image_url=N.innerHTML.replace(/&amp;/g,"&"),
u.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,u),
js_sponsor_ad_area.style.display="block";
var H=js_sponsor_ad_area.clientWidth;
108==u.pt||109==u.pt||110==u.pt?document.getElementById("js_main_img").style.height=H/1.77+"px":116==u.pt||117==u.pt,
DomEvent.on(window,"scroll",S),S(0);
}else if(4==u.pos_type&&_checkShowCpc())if(u=_parseExpCpc(u),console.info("[APPMSG AD DEBUG] cpc render data: ",u),
12==u.product_type||19==u.product_type)js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,u);else{
var M=require("a/tpl/cpc_tpl.html.js");
js_cpc_area.innerHTML=TMPL.tmpl(M,{
tag_pos:u.exp_obj.tag_pos,
type:u.tag_pos,
ticket:u.ticket,
url:u.url,
rl:u.rl,
aid:u.aid,
pt:u.pt,
traceid:u.traceid,
group_id:u.group_id,
apurl:u.apurl,
is_cpm:u.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:u.pos_type,
banner:u.image_url,
price:u.exp_obj.price,
title:u.exp_obj.sale_text,
is_wx_app:u.is_wx_app,
btn_text:u.exp_obj.btn_text
});
}
lazyLoadAdImg({
aid:u.aid,
type:u.pt
}),checkAdImg(u),console.log("check ios",mmversion.isIOS,u.app_info),mmversion.isIOS&&u.app_info&&u.app_info.url_scheme&&(console.log("check ios end",document.getElementById("js_promotion_tag")),
document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+u.pos_type)&&(document.getElementById("js_ad_btn_"+u.pos_type).innerHTML="查看应用"));
}
}
bindAdOperation();
}
is_temp_url&&document.getElementsByTagName("mpcpc").length>0&&_checkShowCpc()&&!d&&(js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,{
type:"",
ticket:"",
url:"",
rl:"",
aid:"",
pt:"",
traceid:"",
group_id:"",
apurl:"",
is_cpm:"",
image_url:"https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiaPhsbHe4ctnlUllMCDCEIJib69wX3BUX42XagNypd2JcgyEiaoFRu4KicKF3avfRgVnWPABVTjtPRwQ/0?wx_fmt=png"
}));
}
function _parseExpCpc(e){
var a={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(a.btn_text="查看详情"),29==e.product_type||31==e.product_type?a.btn_text="查看详情":12==e.product_type||19==e.product_type?a.btn_text="下载应用":30==e.product_type?a.btn_text="去逛逛":23==e.product_type&&(a.btn_text=e.biz_info.is_subscribed?"查看公众号":"关注公众号"),
e.has_installed&&(a.btn_text="进入应用"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var t=e.cpc_exp_info.exp_content;
try{
for(var p=JSON.parse(t.replace(/&quot;/g,'"')),i=-1,o=0;o<p.aid_list.length;o++)p.aid_list[o].aid==e.aid&&(i=o);
i>-1&&(a.icon_pos=p.icon_pos||"",a.btn_text=p.btn_text||a.btn_text,a.price=p.aid_list[i].price,
a.sale_text=p.aid_list[i].sale_text,window.__addIdKeyReport("68064",15));
}catch(n){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=a,e;
}
function _checkShowCpc(){
if(globalAdDebug)return!0;
if(js_cpc_area){
var e=(document.documentElement.clientHeight||window.innerHeight)/2,a=js_cpc_area.offsetTop,t=document.getElementById("js_content").offsetHeight;
return e>a||e>t-a?!1:!0;
}
}
function lazyLoadAdImg(e){
for(var a=document.getElementsByClassName("js_alazy_img"),t=0;t<a.length;t++){
var p=a[t];
a[t].onload=function(){
window.__addIdKeyReport("28307",54),p.src.indexOf("retry")>-1&&window.__addIdKeyReport("28307",69);
},a[t].onerror=function(){
if(-1==p.src.indexOf("retry"))p.src=ParseJs.addParam(p.src,"retry",1);else{
window.__addIdKeyReport("28307",98);
var a="other";
mmversion.isIOS?a="iphone":mmversion.isAndroid&&(a="android"),window.setTimeout(function(){
var t=window.networkType||"unknow";
ajax({
url:"http://mp.weixin.qq.com/tp/datacenter/report?cmd=report&id=900023&os="+a+"&uin=777&aid="+e.aid+"&image_url="+encodeURIComponent(p.src)+"&type="+e.type+"&network="+t,
type:"GET",
async:!0
});
},500);
}
window.__addIdKeyReport("28307",57);
},a[t].src=a[t].dataset.src;
}
}
function getHost(e){
if(!e)return"";
var a=document.createElement("a");
return a.href=e,a.hostname;
}
function checkAdImg(e){
if(e){
var a=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],t=e.image_url||"",p=getHost(t);
return void(p&&-1==a.indexOf(p)&&window.__addIdKeyReport("28307",58));
}
}
function saveCopyArr(e){
for(var a=[],t=0;t<e.length;++t){
var p=e[t],i=typeof p;
p="string"==i?p.htmlDecode():p,"object"==i&&(p="[object Array]"==Object.prototype.toString.call(p)?saveCopyArr(p):saveCopy(p)),
a.push(p);
}
return a;
}
function saveCopy(e){
var a={};
for(var t in e)if(e.hasOwnProperty(t)){
var p=e[t],i=typeof p;
p="string"==i?p.htmlDecode():p,"object"==i&&(p="[object Array]"==Object.prototype.toString.call(p)?saveCopyArr(p):saveCopy(p)),
a[t]=p;
}
return a;
}
function formName(e){
for(var a=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],t=-1,p=0,i=a.length;i>p;++p){
var o=a[p],n=e.indexOf(o);
-1!=n&&(-1==t||t>n)&&(t=n);
}
return-1!=t&&(e=e.substring(0,t)),e;
}
function formSize(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
}
function seeAds(){
function debounce(e,a,t){
var p;
return function(){
var i=this,o=arguments,n=function(){
p=null,t||e.apply(i,o);
},_=t&&!p;
clearTimeout(p),p=setTimeout(n,a),_&&e.apply(i,o);
};
}
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var onScroll=debounce(function(){
for(var scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i,gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,aid=gdt_a.dataset.aid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=adDatas.ads[pos_key].a_info.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop,adHeight=gdt_a.clientHeight,adOffsetTop=offsetTop+gdt_a.offsetTop,gh_id="",pt=adDatas.ads[pos_key].a_info.pt;
adDatas.ads[pos_key]&&adDatas.ads[pos_key].a_info&&adDatas.ads[pos_key].a_info.weapp_info&&adDatas.ads[pos_key].a_info.weapp_info.original_id&&(gh_id=adDatas.ads[pos_key].a_info.weapp_info.original_id),
adDatas.ads[pos_key].ad_engine=0;
try{
exp_value=JSON.stringify(exp_value);
}catch(e){
exp_value="[]";
}
if(-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),!ping_apurl[pos_key]&&scrollTop+innerHeight>offsetTop){
ping_apurl[pos_key]=!0;
var report_arg="trace_id="+tid+"&product_type="+pt+"&logtype=2&url="+encodeURIComponent(location.href)+"&apurl="+encodeURIComponent(apurl);
tid&&mmversion.gtVersion("6.3.22",!0)&&JSAPI.invoke("adDataReport",{
ad_info:report_arg
},function(){}),log("[Ad] seeAd, tid="+tid+", aid="+aid+", pos_type="+pos_type),
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random(),
success:function(res){
log("[Ad] seeAd report success, tid="+tid+", aid="+aid+", pos_type="+pos_type);
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1;
},
error:function(){
log("[Ad] seeAd report error, tid="+tid+", aid="+aid+", pos_type="+pos_type),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_27_1";
},
async:!0
});
}
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollTop+innerHeight>=adOffsetTop+adHeight*rh&&adOffsetTop+adHeight*(1-rh)>=scrollTop?3==pos_type?(ping_cpm_apurl_obj.hasPing=!0,
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
})):ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
});
},1001)):3!=pos_type&&ping_cpm_apurl_obj.clk&&(clearTimeout(ping_cpm_apurl_obj.clk),
ping_cpm_apurl_obj.clk=null);
}
var allReport=!0;
if(107==pt||108==pt||110==pt)for(var i=0;i<see_ad_detail_report.length;i++)if(see_ad_detail_report[i])allReport=!1;else{
var report_url=location.protocol+"//mp.weixin.qq.com/mp/ad_report?action=see_report&aid="+aid+"&tid="+tid;
if((0==i&&scrollTop+innerHeight>offsetTop+1||1==i&&scrollTop+innerHeight>offsetTop+.5*adHeight||2==i&&scrollTop+innerHeight>offsetTop+adHeight)&&((new Image).src=report_url+"&seepos="+(i+1)+"&report_type=0",
see_ad_detail_report[i]=!0),i>=3)if(scrollTop+innerHeight>offsetTop&&offsetTop+adHeight>scrollTop){
if(see_ad_detail_first_see_time>0){
var t=0;
3==i&&(t=500),4==i&&(t=1e3),5==i&&(t=2e3),+new Date-see_ad_detail_first_see_time>t?((new Image).src=report_url+"&seetime="+t+"&report_type=1",
see_ad_detail_report[i]=!0):window.setTimeout(function(){
seeAds();
},t);
}
0==see_ad_detail_first_see_time&&(see_ad_detail_first_see_time=+new Date);
}else see_ad_detail_first_see_time=0;
}
}
}(i);
},250);
DomEvent.on(window,"scroll",onScroll),onScroll();
}
}
function imgReport(e){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_"+e+"_1&r="+Math.random();
}
function imgReportBadJs(e){
var a=Math.random();
.5>a&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=102&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent(e));
}
function ad_click(e,a,t,p,i,o,n,_,r,d,s,c,l,m,f,u,g,y,v){
if(!has_click[i]){
has_click[i]=!0;
var h=document.getElementById("loading_"+i);
h&&(h.style.display="inline");
var w=g.exp_info||{},x=w.exp_id||"",j=w.exp_value||[];
try{
j=JSON.stringify(j);
}catch(k){
j="[]";
}
var b="";
c&&c.weapp_info&&c.weapp_info.original_id&&(b=c.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:x,
exp_value:j,
url:encodeURIComponent(a),
tid:i,
aid:_,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:r,
pos_x:l,
pos_y:m,
ad_w:f,
ad_h:u,
gh_id:b,
press_interval:window.__a_press_interval||-1
},function(){
function t(e,a,t,p,i,n,_,r,d,s,c){
if(console.info("[APPMSG AD DEBUG] handleApp",c),c&&c.has_installed&&-1==e.indexOf("itunes.apple.com")&&c.app_info.url_scheme)return void JSAPI.invoke("launchApplication",{
schemeUrl:c.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=c.app_info.url_scheme);
});
if(0==e.indexOf("https://itunes.apple.com/")||0==e.indexOf("http://itunes.apple.com/"))return c.app_info&&c.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:c.app_info.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):JSAPI.invoke("downloadAppInternal",{
appUrl:e
},function(a){
a.err_msg&&-1!=a.err_msg.indexOf("ok")||(console.log("http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+o+"#wechat_redirect"),
location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+o+"#wechat_redirect");
}),!1;
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var l={
source:4,
tid:a,
idx:t,
mid:p,
appuin:i,
pt:n,
aid:_,
ad_engine:r,
pos_type:d
},m=window.__report;
if(s||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var f="",u="";
s&&(f=s.pkgname&&s.pkgname.replace(/\./g,"_"),u=s.channel_id||""),l={
source:4,
tid:a,
traceid:a,
mid:p,
idx:t,
appuin:i,
pt:n,
channel_id:u,
aid:_,
engine:r,
pos_type:d,
pkgname:f
};
}
e=URL.join(e,l),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:_,
engine:r
})),!_&&m&&m(80,e);
}
location.href=e;
}
function p(e,a,t,p,i,o,n,_,r,d){
if(console.info("[APPMSG AD DEBUG] handle h5",g),-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var s={
source:4,
tid:a,
idx:t,
mid:p,
appuin:i,
pt:o,
aid:n,
ad_engine:_,
pos_type:r
},c=window.__report;
if(("104"==o||"113"==o||"114"==o||"122"==o)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var l="",m="";
d&&(l=d.pkgname&&d.pkgname.replace(/\./g,"_"),m=d.channel_id||""),s={
source:4,
tid:a,
traceid:a,
mid:p,
idx:t,
appuin:i,
pt:o,
channel_id:m,
aid:n,
engine:_,
pos_type:r,
pkgname:l
};
}
e=URL.join(e,s),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:n,
engine:_
})),!n&&c&&c(80,e);
}
console.info("[APPMSG AD DEBUG] handle h5 url",e),location.href=e;
}
if(has_click[i]=!1,h&&(h.style.display="none"),g.canvas_info)return console.log(" jsapi invoke OpenADCanvas"),
console.log(g.canvas_info.canvas_id),console.log(g.canvas_info.ad_info_xml),void JSAPI.invoke("openADCanvas",{
canvasId:g.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:d
}),
adInfoXml:g.canvas_info.ad_info_xml
},function(e){
console.log(JSON.stringify(e)),0!=e.ret?(location.href=a,report(135,y)):report(134,y);
});
if(v)1==g.dest_type?p(a,i,idx,mid,biz,r,_,s,d,c,g):6==g.dest_type?Wxopen_card.openWxopen(c):12==g.product_type||19==g.product_type?t(a,i,idx,mid,biz,r,_,s,d,c,g):0==g.dest_type?location.href=a:(console.info("[APPMSG AD DEBUG] new protocol debug click:",g),
location.href=a);else if("5"==e)location.href="/mp/profile?source=from_ad&tousername="+a+"&ticket="+o+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+i;else{
if("105"==r&&c)return void Card.openCardDetail(c.card_id,c.card_ext,c);
if("106"==r&&c)return void(location.href=ParseJs.join(a,{
outer_id:c.outer_id
}));
if("118"==r||"119"==r||"120"==r)return void Wxopen_card.openWxopen(c);
if("125"==r&&6==g.dest_type)return void Wxopen_card.openWxopen(c);
if(g&&g.has_installed&&("104"==r||"113"==r||"114"==r||"122"==r||"2"==r&&-1==a.indexOf("itunes.apple.com"))&&g.app_info.url_scheme)return void JSAPI.invoke("launchApplication",{
schemeUrl:g.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=g.app_info.url_scheme);
});
if(0==a.indexOf("https://itunes.apple.com/")||0==a.indexOf("http://itunes.apple.com/"))return g.app_info&&g.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:g.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=a);
}):JSAPI.invoke("downloadAppInternal",{
appUrl:a
},function(e){
e.err_msg&&-1!=e.err_msg.indexOf("ok")||(location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(a)+"&ticket="+o+"#wechat_redirect");
}),!1;
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var n={
source:4,
tid:i,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:_,
ad_engine:s,
pos_type:d
},l=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&c||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",f="";
c&&(m=c.pkgname&&c.pkgname.replace(/\./g,"_"),f=c.channel_id||""),n={
source:4,
tid:i,
traceid:i,
mid:mid,
idx:idx,
appuin:biz,
pt:r,
channel_id:f,
aid:_,
engine:s,
pos_type:d,
pkgname:m
};
}
a=URL.join(a,n),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=URL.join(a,{
traceid:i,
aid:_,
engine:s
})),!_&&l&&l(80,a);
}
location.href=a;
}
});
}
}
function bindAdOperation(){
console.log("bindAdOperation"),seeAds();
for(var e=0;total_pos_type>e;++e)!function(e){
var a="pos_"+e,t=el_gdt_areas[a];
if(!t)return!1;
if(!t.getElementsByClassName&&t.style)return t.style.display="none",!1;
var p=t.getElementsByClassName("js_ad_link")||[],i=adDatas.ads[a],o=t.getElementsByClassName("js_ad_opt_list_btn_"+e),n=t.getElementsByClassName("js_complain_btn_"+e);
if(i){
for(var _=i.adData,r=i.a_info,d=r.pos_type,s=i.ad_engine,c=0,l=p.length;l>c;++c)!function(e,a){
var t=p[e],i=t.dataset;
if(i&&3!=r.pos_type){
var _=i.type,c=i.url,l=i.rl,m=i.apurl,f=i.tid,u=i.ticket,g=i.group_id,y=i.aid,v=i.pt,h=r.use_new_protocol,w=!0;
(h&&(12==r.product_type||19==r.product_type)||115==v)&&(w=!1,console.log("js dom event type: ",w)),
4==r.pos_type&&(w=!1,console.log("js dom for pos_type:4 event type: ",w)),DomEvent.on(t,"click",function(e){
var t=!!e&&e.target,p=[12,19,23];
if(!t||!t.className||4==d&&a&&-1==p.toString().indexOf(a.product_type)||-1==t.className.indexOf("js_ad_btn")&&-1==t.className.indexOf("js_btn_process")&&-1==t.className.indexOf("js_muted_btn")&&-1==t.className.indexOf("js_poster_cover")&&-1==t.className.indexOf("js_ad_opt_list_btn")&&-1==t.className.indexOf("js_complain_btn")&&-1==t.className.indexOf("js_view_profile")&&-1==t.className.indexOf("js_add_contact")){
if(a){
a.adid=window.adid||a.adid||a.aid;
var i="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
r&&r.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?report(114,i):"103"==a.pt||"111"==a.pt||"112"==a.pt?report(23,i):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&report(25,i);
}
var o,n,w,x;
return o=position.getX(t,"js_ad_link")+e.offsetX,n=position.getY(t,"js_ad_link")+e.offsetY,
w=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
x=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(_,c,l,m,f,u,g,y,v,d,s,a,o,n,w,x,r,i,h),log("[Ad] ad_click: type="+_+", url="+c+", rl="+l+", apurl="+m+", traceid="+f+", ticket="+u+", group_id="+g+", aid="+y+", pt="+v+", pos_type="+d+", ad_engine="+s),
!1;
}
},w),DomEvent.on(t,"touchstart",function(){
console.log("touchstart",+new Date),window.__a_press_interval=+new Date;
}),DomEvent.on(t,"touchend",function(){
console.log("touchend",+new Date),window.__a_press_interval=+new Date-window.__a_press_interval;
}),o[e]&&(console.log("bind btn:",o[e]," for pos type:",r.pos_type," aid:",y),DomEvent.on(o[e],"click",function(){
if(console.log("optListBtn click on: pos",r.pos_type),parseInt(window.can_see_complaint)){
var e=document.getElementsByClassName("js_ad_opt_list_"+r.pos_type);
adOptReport(0,r.pos_type,f,y),e&&e[0]&&(e[0].style.display="none"==e[0].style.display?"block":"none");
}
return!1;
})),n[e]&&DomEvent.on(n[e],"click",function(){
console.log("complain info:",r),console.log("complainBtn click on: pos",r.pos_type);
var e="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+y+"&traceid="+f+"&source="+r.pos_type+"&biz="+window.biz;
return adOptReport(1,r.pos_type,f,y),mmversion.isWp||mmversion.isIOS||mmversion.isAndroid?JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e,!1;
});
}
}(c,_);
if(_){
_.adid=window.adid||_.adid||_.aid;
var m=r.exp_info||{},f=m.exp_id||"",u=m.exp_value||[];
try{
u=JSON.stringify(u);
}catch(g){
u="[]";
}
var y="&tid="+_.traceid+"&uin="+uin+"&key="+key+"&ticket="+(_.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+_.adid+"&ad_engine="+s+"&pos_type="+d+"&exp_id="+f+"&exp_value="+u+"&r="+Math.random();
if(_.report_param=y,_.use_new_protocol){
if(12==r.product_type||19==r.product_type){
var v=require("a/app_card.js"),h=15,w=_.pkgname&&_.pkgname.replace(/\./g,"_"),x=document.getElementById("js_ad_btn_"+d);
new v({
btn:x,
adData:_,
report_param:y,
pos_type:d,
url_scheme:_.url_scheme,
via:[_.traceid,_.adid,w,source,h,s].join("."),
ticket:_.ticket,
appdetail_params:["&aid="+_.adid,"traceid="+_.traceid,"pkgname="+w,"source="+source,"type="+h,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+_.ticket,"scene="+scene].join("&"),
engine:s
});
}else if(23==r.product_type){
var j=require("a/profile.js");
new j({
btnProfile:document.getElementById("js_ad_btn_"+d),
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:_,
pos_type:d,
report_param:y,
aid:_.adid,
ad_engine:s
});
}
if(9==r.material_type){
r.report_param=y;
var k=require("a/video.js");
new k(r);
}
}else{
if("100"==_.pt||"115"==_.pt){
var j=require("a/profile.js");
return void new j({
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:_,
pos_type:d,
report_param:y,
aid:_.adid,
ad_engine:s
});
}
if("102"==_.pt){
var b=require("a/android.js"),h=15,w=_.pkgname&&_.pkgname.replace(/\./g,"_");
return void new b({
btn:document.getElementById("js_app_action_"+d),
adData:_,
report_param:y,
task_ext_info:[_.adid,_.traceid,w,source,h,s].join("."),
via:[_.traceid,_.adid,w,source,h,s].join(".")
});
}
if("101"==_.pt){
var I=require("a/ios.js");
return void new I({
btn:document.getElementById("js_app_action_"+d),
adData:_,
ticket:_.ticket,
report_param:y
});
}
if("105"==_.pt)return void new Card({
btn:document.getElementById("js_card_action_"+d),
adData:_,
report_param:y,
pos_type:d
});
if("106"==_.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+d),
adData:_,
report_param:y,
pos_type:d
});
if("103"==_.pt||"104"==_.pt||"111"==_.pt||"112"==_.pt||"113"==_.pt||"114"==_.pt||"121"==_.pt||"122"==_.pt){
var v=require("a/app_card.js"),h=15,w=_.pkgname&&_.pkgname.replace(/\./g,"_");
return void new v({
btn:document.getElementById("js_appdetail_action_"+d),
js_app_rating:document.getElementById("js_app_rating_"+d),
adData:_,
report_param:y,
pos_type:d,
url_scheme:_.url_scheme,
via:[_.traceid,_.adid,w,source,h,s].join("."),
ticket:_.ticket,
appdetail_params:["&aid="+_.adid,"traceid="+_.traceid,"pkgname="+w,"source="+source,"type="+h,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+_.ticket,"scene="+scene].join("&"),
engine:s
});
}
if("108"==_.pt||"109"==_.pt||"110"==_.pt||"116"==_.pt||"117"==_.pt){
var q=require("a/sponsor.js");
new q({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:_,
a_info:r,
pos_type:d,
report_param:y
});
}
if("118"==r.pt&&(_.report_param=y),"125"==r.pt){
r.report_param=y,console.log("old video info");
var k=require("a/video.js");
new k(r);
}
}
}
}
}(e);
}
function extend(e,a){
for(var t in a)e[t]=a[t];
return e;
}
var mmversion=require("biz_wap/utils/mmversion.js"),js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),js_cpc_area=document.getElementsByTagName("mpcpc"),gdt_pos_4={},Device=require("biz_wap/utils/device.js");
js_cpc_area.length>0?(js_cpc_area=document.getElementsByTagName("mpcpc")[0],gdt_pos_4=js_cpc_area.getElementsByClassName("js_ad_link")):js_cpc_area=void 0;
var globalAdDebug=!!_GetQuery("mock"),pos_type=window.pos_type||0,__report=window.__report,total_pos_type=5,el_gdt_areas={
pos_4:js_cpc_area,
pos_3:js_sponsor_ad_area,
pos_0:js_bottom_ad_area
},gdt_as={
pos_4:gdt_pos_4,
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
},isScroll=!1,isSee=!1;
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("a/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),Wxopen_card=require("a/wxopen_card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),ParseJs=require("biz_common/utils/url/parse.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),cpc_a_tpl=require("a/cpc_a_tpl.html.js"),Report=require("biz_common/utils/report.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),ParseJs=require("biz_common/utils/url/parse.js"),log=require("appmsg/log.js"),ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1,
pos_4:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{},
pos_4:{}
},ping_test_apurl={
pos_0:[],
pos_1:[],
pos_3:[],
pos_4:[]
},see_ad_detail_report=[!1,!1,!1,!1,!1,!1],see_ad_detail_first_see_time=0,ping_test_apurl_random=Math.random()<.3,innerHeight=window.innerHeight||document.documentElement.clientHeight,innerHeight_new=getWindowHeight(),ad_engine=0;
console.log("Device",Device);
var keyOffset="https:"==location.protocol?5:0;
return{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__",n=window.localStorage||{
getItem:function(){},
setItem:function(){},
removeItem:function(){},
key:function(){},
length:0
};
return t.getItem=function(t){
return t=e+t,n.getItem(t);
},t.setItem=function(i,r){
i=e+i;
for(var a=3;a--;)try{
n.setItem(i,r);
break;
}catch(o){
t.clear();
}
},t.clear=function(){
var t,i;
for(t=n.length-1;t>=0;t--)i=n.key(t),0==i.indexOf(e)&&n.removeItem(i);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
try{
e=JSON.parse(e);
}catch(n){
e={};
}
return e;
},
check:function(){
var e,n,i=this.getData(),r={},a=+new Date;
for(e in i)n=i[e],+n.exp>a&&(r[e]=n);
t.setItem(this.key,JSON.stringify(r));
},
set:function(e,n,i){
var r=this.getData();
r[e]={
val:n,
exp:i||+new Date
},t.setItem(this.key,JSON.stringify(r));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("biz_common/tmpl.js",[],function(){
"use strict";
var e=function(e,r,t){
var n="";
n=e.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r"),
n=t?n.replace(/\t==(.*?)#>/g,"',$1,'").replace(/\t=(.*?)#>/g,"', String($1).replace(/&/g,'&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ,'"):n.replace(/\t=(.*?)#>/g,"',$1,'"),
n=n.split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'");
var p=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n+"');}return p.join('');");
return p(r);
},r=function(r,t,n){
var p=document.getElementById(r);
return p?e(p.innerHTML,t,n):"";
};
return{
render:r,
tmpl:e
};
});define("appmsg/share_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <a href="<#= url #>" class="share_appmsg_container appmsg_card_context flex_context">\n        <div class="flex_hd">\n            <i class="share_appmsg_icon"> </i>\n        </div>\n        <div class="flex_bd">\n            <div class="share_appmsg_title">分享给订阅用户</div>\n            <p class="share_appmsg_desc">可快速分享原创文章给你的公众号订阅用户</p>\n        </div>\n    </a>\n</div>\n';
});function _GetQuery(e){
for(var t=window.location.href,s=t.indexOf("?"),i=t.substr(s+1),n=i.split("&"),a=0;a<n.length;a++){
var r=n[a].split("=");
if(r[0].toUpperCase()==e.toUpperCase())return r[1];
}
return"";
}
define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js"],function(e){
"use strict";
function t(e){
var t={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
idx:"",
scene:"",
title:"",
ct:"",
abtest_cookie:"",
devicetype:"",
version:"",
is_need_ticket:0,
is_need_ad:0,
comment_id:"",
is_need_reward:0,
both_ad:0,
reward_uin_count:0,
send_time:"",
msg_daily_idx:"",
is_original:0,
is_only_read:0,
req_id:"",
pass_ticket:"",
is_temp_url:0,
rtId:"",
rtKey:"",
onSuccess:function(){},
onError:function(){}
};
for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a]);
console.log("getData",t),i({
url:"/mp/getappmsgext?f=json&mock="+_GetQuery("mock"),
data:{
r:Math.random(),
__biz:t.biz,
appmsg_type:t.appmsg_type,
mid:t.mid,
sn:t.sn,
idx:t.idx,
scene:t.scene,
title:encodeURIComponent(t.title.htmlDecode()),
ct:t.ct,
abtest_cookie:t.abtest_cookie,
devicetype:t.devicetype.htmlDecode(),
version:t.version.htmlDecode(),
is_need_ticket:t.is_need_ticket,
is_need_ad:t.is_need_ad,
comment_id:t.comment_id,
is_need_reward:t.is_need_reward,
both_ad:t.both_ad,
reward_uin_count:t.is_need_reward?t.reward_uin_count:0,
send_time:t.send_time,
msg_daily_idx:t.msg_daily_idx,
is_original:t.is_original,
is_only_read:t.is_only_read,
req_id:t.req_id,
pass_ticket:t.pass_ticket,
is_temp_url:t.is_temp_url,
item_show_type:t.item_show_type,
tmp_version:1
},
type:"POST",
dataType:"json",
rtId:t.rtId,
rtKey:t.rtKey,
rtDesc:n,
async:!0,
success:function(e){
if(s("[Appmsg] success get async data"),"function"==typeof t.onSuccess&&t.onSuccess(e),
e)try{
s("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(i){}else s("[Appmsg] success get async data, async data is empty");
},
error:function(){
s("[Appmsg] error get async data, biz="+t.biz+", mid="+t.mid),"function"==typeof t.onError&&t.onError();
}
});
}
var s=e("appmsg/log.js"),i=e("biz_wap/utils/ajax.js"),n=e("rt/appmsg/getappmsgext.rt.js");
return{
getData:t
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("pages/video_ctrl.js",[],function(){
"use strict";
function i(i){
return i=i||window,i.cgiData&&2==i.cgiData.ori_status?!0:!1;
}
function n(i){
return i=i||window,!1;
}
function t(){
return-1!=a.indexOf("&vl=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function e(){
return-1!=a.indexOf("&dd=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function o(){
var i;
if(parent==window)i=window;else try{
{
parent.window.__videoDefaultRatio;
}
i=parent.window;
}catch(n){
i=window;
}
var t=i.__videoDefaultRatio||16/9;
return"54"==i.appmsg_type?t:t;
}
var a=window.location.href;
return{
showPauseTips:e,
showVideoLike:t,
showVideoDetail:n,
showH5Profile:i,
getRatio:o
};
});