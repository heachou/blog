---
title: 栈
date: 2021-04-22
categories:
  - FE
tags:
  - js
  - data structure
---

:::tip
学习栈相关知识
:::

<!-- more -->

## 什么是栈

栈是一个后进先出的数据结构。

进：push
出：pop

在 js 中是没有栈这个数据结构的，但是我们可以用数组来模拟实现

## js 中的栈模拟

```js
const stack = []
// 入栈
stack.push(1)
stack.push(2)
// 栈顶元素
const item = stack[stack.length - 1]
// 出栈
const item1 = stack.pop()
const item2 = stack.pop()
```

## 特点

后进先出,因此有后进先出的应用场景都可以利用栈的特性来解决

例：十进制转二进制，判断字符串的括号是否有效，函数调用堆栈

## 例子

1. 十进制转二进制

```js
// 35 / 2 = 17 余 1
// 17 / 2 = 8 余 1
// 8 / 2 = 4 余 0
// 4 / 2 = 2 余 0
// 2 / 2 = 1 余 0
// 1 / 2 = 0 余 1
// 结果 100011 (余数倒序)
function transform(num) {
  if (num === 0) {
    return 0
  }
  const remains = []
  while (num !== 0) {
    remains.push(num % 2)
    num = Math.floor(num / 2)
  }
  let result = ''
  while (remains.length) {
    result += remains.pop()
  }
  return result
}
```

2. 有效的括号

[leetcode 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

```js
function isValid(s) {
  const stack = []
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i]
    const topChar = stack[stack.length - 1]
    if (
      (c === '}' && topChar === '{') ||
      (c === ']' && topChar === '[') ||
      (c === ')' && topChar === '(')
    ) {
      stack.pop()
    } else {
      stack.push(c)
    }
  }
  return stack.length === 0
}
```

3. 函数调用堆栈
