---
title: node 中require简单实现
date: 2021-05-20
categories:
  - FE
tags:
  - node
---

:::tip
node中require的简易实现原理
:::

<!-- more -->

在node中，用了这么久的require，那么就来简单看下require的实现原理吧

## require

`require`用于引入模块，可以是json或者本地文件，也可以是从`node_modules`中引入模块，路劲会根据 `__dirname` 定义的目录名或当前工作目录进行处理，

```js
// 使用相对于 `__dirname` 或当前工作目录的路径引入一个本地模块。
// （在 Windows 上，这会解析为 .\path\myLocalModule。）
const myLocalModule = require('./path/myLocalModule');

// 引入 JSON 文件：
const jsonData = require('./path/filename.json');

// 引入 node_modules 模块或 Node.js 内置模块：
const crypto = require('crypto');
```





