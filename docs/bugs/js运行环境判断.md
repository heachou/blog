---
title: js运行环境判断
date: 2021-04-01
categories:
  - 前端
tags:
  - bug
---

:::tip
同一份 js 代码，怎么区分是浏览器环境还是 node 环境?
:::

<!-- more -->

### bug 复现

在 react 项目中,我用以下代码判断运行环境是 chrome 还是 electron

```js
const [isElectron] = useState(typeof global !== 'undefined')
```
奇怪的是，我在chrome上打印出来，居然是 true,
有点震惊。

## 通常做法

一般来说，我们判断环境差异就是判断环境提供的不同的能力
比如，我们判断是 node 环境还是浏览器环境，可以检测 global 对象是否存在

```js
// node
typeof gloabal // object
// chrome
typeof global // undefined
```

看起来，ok 了？但是我在项目中遇到

如果到这里，我们觉得 ok 了，就错了，这也是我遇到的一个问题，百思不得其解

通常我们的前端代码都是经过打包工具构建了的

```js
// 源代码
console.log(global)
console.log(typeof global)

// 经过webpack打包构建后
;(() => {
  var o = {}
  ;(o.g = (function() {
    if ('object' == typeof globalThis) return globalThis
    try {
      return this || new Function('return this')()
    } catch (o) {
      if ('object' == typeof window) return window
    }
  })()),
    console.log(o.g),
    console.log(typeof o.g)
})()
```

好家伙，我直接好家伙，
直接判断 typeof globalThis 有木有，一般来讲，都会有的，在浏览器中 globalThis === window,
在 node 中，globalThis === global,因此判断 global 是否 存在就不起作用了，害。
那咋办呢？
多判断一层

```js
// node
typeof global.require // object
// 浏览器
typeof global.require //undefined
```

### webpack下的解决方案

```js
const [isElectron] = useState(() => !!(global && global.require))
```

now it works!!
