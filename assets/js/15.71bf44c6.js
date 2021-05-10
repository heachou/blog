(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{505:function(a,t,e){a.exports=e.p+"assets/img/cache.0f481e20.png"},537:function(a,t,e){"use strict";e.r(t);var s=e(6),r=Object(s.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"}),s("p",[a._v("缓存，我的绕不过去的痛！我们一般分为协商缓存和强缓存两种。协商缓存，就是需要和服务器进行协商，最终确定是否使用本地缓存！")])]),a._v(" "),s("p",[a._v("下面记录下我的对于缓存的理解")]),a._v(" "),s("h2",{attrs:{id:"两种缓存的问题点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#两种缓存的问题点"}},[a._v("#")]),a._v(" 两种缓存的问题点")]),a._v(" "),s("h3",{attrs:{id:"强缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#强缓存"}},[a._v("#")]),a._v(" 强缓存")]),a._v(" "),s("p",[a._v("强缓存主要通过设置 http 请求头的 Cache-Control 和 Expire 两个字段控制。重点考虑 Cache-Control 这个字段。\n一般我们会设置 Cache-Control 的值为 “public, max-age=xxx”，表示在xxx秒内再次访问该资源，均使用本地的缓存，不再向服务器发起请求。但是如果在这个时间，服务器上面的资源已经更新了，但是客户端得到的内容还是之前的，这怎么办？")]),a._v(" "),s("p",[a._v("expire 的值是设置时间，因此，要求服务端时间和客户端时间完全一致。")]),a._v(" "),s("h3",{attrs:{id:"协商缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#协商缓存"}},[a._v("#")]),a._v(" 协商缓存")]),a._v(" "),s("p",[a._v("协商缓存常用的字段有ETag,Last-Modified\n协商缓存最大的问题就是每次都要向服务器验证以下缓存的有效性，也就是说，任何资源，你都要问一下服务器这个资源还有效不？")]),a._v(" "),s("h2",{attrs:{id:"最佳实践"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#最佳实践"}},[a._v("#")]),a._v(" 最佳实践")]),a._v(" "),s("p",[a._v("缓存的意义在于减少请求，更多的使用本地的资源，减轻服务端的压力，给用户更好的体验。因此，我们尽可能的命中强缓存，同时，能在更新的时候让客户端的缓存失效。\n在前端spa开发盛行的今天，伟大的webpack可以在给项目打包的时候，加上hash值。因此，每次文件有修改都能有不同的hash值。")]),a._v(" "),s("p",[a._v("综上所述：")]),a._v(" "),s("ul",[s("li",[a._v("HTML: 使用协商缓存")]),a._v(" "),s("li",[a._v("CSS&JS&图片： 使用强缓存，文件命名带上hash值。")])]),a._v(" "),s("h2",{attrs:{id:"浏览器缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器缓存"}},[a._v("#")]),a._v(" 浏览器缓存")]),a._v(" "),s("p",[a._v("当我们的服务端没有设置缓存时，浏览器发起第二次请求，可以在控制面板看到一些请求显示 "),s("code",[a._v("200 OK (from disk cache)")]),a._v("或"),s("code",[a._v("200 OK (from memory cache)")]),a._v(",浏览器并没有发出请求，直接\n从磁盘或者内存中取到了资源。")]),a._v(" "),s("h2",{attrs:{id:"etag-计算"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#etag-计算"}},[a._v("#")]),a._v(" ETag 计算")]),a._v(" "),s("p",[a._v('Nginx 官方默认的ETag 计算方式是"文件最后修改时间16进制-文件长度16进制"。')]),a._v(" "),s("blockquote",[s("p",[a._v('例： ETag: W/"606dd746-3a06e"')])]),a._v(" "),s("h2",{attrs:{id:"nginx-如何配置呢"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx-如何配置呢"}},[a._v("#")]),a._v(" Nginx 如何配置呢")]),a._v(" "),s("p",[a._v("符简单例子：")]),a._v(" "),s("div",{staticClass:"language-conf extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("# 设置一些静态资源的图片视频的缓存时间为7天,设置强缓存\nlocation ~ .*\\.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm)$ {\n  expires max;\n  add_header cache-control max-age;\n}\n\n# 在对应的location中增加以下代码，即html后缀的文件名不会进行缓存,当然也可以进行协商缓存，参考各个大厂的做法，不缓存，因为 index.html文件一般来说是相当小的1kb\nif ($request_filename ~* \\.(htm|html)$) {\n  add_header  Cache-Control  no-store;\n}\n\n# 当然也可以是协商缓存\n# 服务端状态码返回304 (304 Not Modified) 见 下图\nif ($request_filename ~* \\.(htm|html)$) {\n  add_header Cache-Control no-cache;\n}\n")])])]),s("p",[s("img",{attrs:{src:e(505),alt:"cache"}})]),a._v(" "),s("p",[a._v("no-cache表示不缓存过期资源，缓存会向服务器进行有效处理确认之后处理资源")]),a._v(" "),s("p",[a._v("而no-store才是真正的不进行缓存。")])])}),[],!1,null,null,null);t.default=r.exports}}]);