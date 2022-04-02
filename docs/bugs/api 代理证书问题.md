---
title: vite中代理，https报自签名证书错误
date: 2022-04-02
categories:
  - FE
tags:
  - bugs
---

## 起

使用 vite，为了防止请求接口的时候出现跨域问题，所以使用了 vite 的 proxy 进行配置。

```js
...
server:{
    https: true,
    proxy:{
      '/aliyun': {
        target: 'https://192.168.11.20:8089',
        changeOrigin: true,
      },
    }
  }
```

报错

```
[vite] http proxy error: Error: self signed certificate
```

经过一番谷歌

```js
server:{
    https: true,
    proxy:{
      '/aliyun': {
        target: 'https://192.168.11.20:8089',
        // 仅添加这行
        secure: false,
        // 仅添加这行
        changeOrigin: true,
      },
    }
  }
```

ok，起作用了
