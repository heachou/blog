---
title: js 中 new Date 在移动端IOS系统解析bug
date: 2020-08-24
categories:
  - FE
tags:
 - js
---

:::tip
new Date(time) 方法常用于解析时间格式,但是今天遇到了 new Date('2020-08-24') 无法在ios系统上解析bug
:::

<!-- more -->

## new Date
今天后端返回的时间格式为  `YYYY-MM-DD HH:mm:ss` 格式，前端需要解析成 `MM-DD HH:mm` 格式，
```js
const time = new Date(time).getTime()
moment(time).format('MM-DD HH:mm')
```
讲道理，应该是ok的，but，ios出问题，一番思索

```js
const time = new Date(time.replace(/-/g, "/").getTime()
moment(time).format('MM-DD HH:mm')
```
ok，起作用了
简单来说，就是ios系统 `new Date` 传入的时间格式中不能带有 `-` ,否则无法解析