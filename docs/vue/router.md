---
title: vue-router 简单原理
date: 2020-11-24
categories:
  - 前端
tags:
  - vue
  - vue-router
---

:::tip
vue-router 基本原理
:::

<!-- more -->

vue-router 支持两种模式，hash 模式和 history 模式，其中 history 模式需要简单的配置才可以在生产环境使用，history 模式对用户来说，更加的友好，符合我们的习惯,url 更加的规范

## hash 路由

话不多说，直接上代码

```js
// 监听hash变化
// 浏览器的前进后退也会被监听到
window.onhashchange = (event) => {
  console.log('old url', event.oldURL)
  console.log('new url', event.newURL)
  console.log('hash:', location.hash)
}

// 改变url
location.href = '#/user'
```

当我们修改 url 的时候，会收到 hashchange 的回调，因此我们就能根据此做我们想要的逻辑

## history 模式

话不多说，直接上代码

```js
// 前进后退，可以触发onpopstate
// state 里面可以携带参数
window.onpopstate = (event) => {
  console.log('onpopstate', event.state, location.pathname)
}

const state = { name: 'page_test' }

window.history.pushState(state, null, '/test')
```

vue-router 中，还存在 `redirect` 重定向，其实相当于是根据 `history.replaceState`来实现的，与`pushState`不同的是，`replaceState`并不会往路由栈里面添加一条记录，而是会替换掉当前的路由，
我们上面提到，history模式需要简单的后端配置，具体[点击这里](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

在项目中，我们通常使用nginx,这里附一份简单的nginx配置，可根据需要修改

```yml

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  2048;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    client_max_body_size 200m;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65s;
    keepalive_requests 1000;

    gzip  on;

    server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location ~ .*\.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm)$ {
            expires 7d;
        }

        location / {
            root html;
            try_files $uri /index.html;
            add_header Access-Control-Allow-Origin *; 
            add_header Access-Control-Allow-Credentials true; 
            add_header Access-Control-Allow-Methods 'GET, POST, PUT,DELETE,OPTIONS'; 
            add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
            # html文件禁止缓存，解决发版后缓存问题
            if ($request_filename ~* \.(htm|html)$) {
              add_header  Cache-Control  no-store;
            }
            # 跨域OPTIONS直接返回204
            if ($request_method = 'OPTIONS') { 
                return 204; 
            }
        }
        # nginx 代理，解决跨域问题
        location /web/ { 
        	proxy_pass http://xxx.xxx.xx/web/;
    	  }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```
