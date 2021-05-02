---
title: 队列
date: 2021-04-23
categories:
  - FE
tags:
  - js
  - data structure
---

:::tip
学习了解队列的相关知识
:::

<!-- more -->

## 什么是队列

队列是一种先进先出的数据结构，区别于栈的后进先出

入队：push

出队：shift

## js 模拟队列

js 中没有队列的数据结构，但是我们可以用数组来进行模拟

```js
const queue = []
// 入队
queue.push(1)
queue.push(2)
// 出队
const itme1 = queue.shift()
const item2 = queue.shift()
```

## 特点

先进先出，凡是满足先进先出特性的，都可以考虑用队列来解决。

食堂打饭排队，js 异步中的任务队列，计算最近请求次数

## 例子

[最近的请求次数](https://leetcode-cn.com/problems/number-of-recent-calls/)

```js
var RecentCounter = function() {
  this.q = []
}

RecentCounter.prototype.ping = function(t) {
  this.q.push(t)
  while (t - this.q[0] > 3000) {
    this.q.shift()
  }
  return this.q.length
}

var obj = new RecentCounter()
console.log(obj.ping(1))
console.log(obj.ping(2))
console.log(obj.ping(3))
console.log(obj.ping(4000))
```

js 中的异步任务

常见面试题

```js
setTimeout(() => console.log(1), 0)
console.log(2)
```
