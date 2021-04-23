---
title: this 指向 
date: 2021-02-07
categories:
  - FE
tags:
  - js
  - interview
---

## this 指向

`this` 是 `javascript` 中的关键字，是当前环境执行期上下文的一个属性，`this` 在不同的环境下，不同的作用下表现不同，这也是导致 `this` 复杂的原因

## 全局作用域下的this --> 全局对象

- window 与 this 的关系

```js

  console.log(this === window) // true
  var a = 1
  var b = function(){return 'function'}

  console.log(window.a === a) // true
  console.log(window.b === b) // true

```
