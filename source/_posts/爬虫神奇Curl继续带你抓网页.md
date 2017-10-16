---
title: 爬虫神奇Curl继续带你抓网页
date: 2017-10-14 14:17:32
tags:
categories:
- 推文
---


爬虫神奇Curl继续带你抓网页<!--more-->


<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">
</script>

<iframe src="https://mp.weixin.qq.com/s/uWaF-fqK4nuKUfUpyMx2TA" width="1000px" height="3000px" align="middle" scrolling="auto" frameborder=0></iframe>


<script type="text/javascript">
$.ajaxPrefilter( function (options) {
    if (options.crossDomain && jQuery.support.cors) {
       var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
       options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
       //options.url = "http://cors.corsproxy.io/url=" + options.url;
    }
});
                     
 var share_link="https://mp.weixin.qq.com/s/uWaF-fqK4nuKUfUpyMx2TA";//微信文章地址
$.get(
      share_link,
      function (response) {
      console.log("> ", response); 
      var html = response;
      html=html.replace(/data-src/g, "src"); 
      var html_src = 'data:text/html;charset=utf-8,' + html;
      $("iframe").attr("src" , html_src);
});</script>