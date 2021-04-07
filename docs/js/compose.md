---
title: compose
date: 2021-04-03
categories:
  - 前端
tags:
  - js
---

## 关于一道题的思考

描述：将DRY(Don't Repeat Yourself)原理和函数式程序范式应用到现代Javascript特性中，分别重写以下函数double、increment和foo(不要将它们合并到一个函数中!)，这样就可以用更地道的Javascript方式来编写了。

```js
function double(arrIn){
  let arrOut = []
  for(let i = 0;i<arrIn.length;i++){
    arrOut[i] = arrIn[i] * 2
  }
  return arrOut
}

function increment(arrIn){
  let arrOut = []
  for(let i = 0;i<arrIn.length;i++){
    arrOut[i] = arrIn[i] +1
  }
  return arrOut
}

function foo(arrIn){
  return increment(double(arrIn))
}
```

看到题的时候，感觉有点懵。更地道的javascript方式？？

## 对函数式编程的理解

函数是一等公民，函数可以当作参数进行传递，纯函数是这样一种函数，相同的输入，一定会得到相同的输出，并且没有任何的副作用。

比如：数组的slice方法和splice方法

```js
var xs = [1,2,3,4,5]

// 纯的
xs.slice(0,3)
// => [1,2,3]
xs.slice(0,3)
// => [1,2,3]
// 满足相同的输入一定有相同的输出，并且没有副作用，
// xs 并没有改变

// 不纯的
xs.splice(0,3)
// =>[1,2,3]
xs.splice(0,3)
// => [4,5]
// 返回结果不一致，并且修改了原数组，有副作用。

```

什么是副作用
作用我们理解为除获得结果之外的发生的事情。
副作用可能包含并不限于：

- 更改文件系统
- 往数据库插入记录
- 发送一个http请求
- 可变数据
- 打印/log
- 获取用户输入
- DOM查询
- 访问系统状态

只要跟函数外部环境发生的交互都是副作用。

追求纯函数的理由

- 可缓存性
- 可移植性
- 可测试
- 合理性

## curry函数

见上一篇 [curry](./curry)

## compose函数

```js
const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );
```

测试一下

```js
const example = compose(
  val => { console.log(1); return `1<${val}>`; },
  val => { console.log(2); return `2<${val}>`; },
  val => { console.log(3); return `3<${val}>`; }
);
example('hello')
// 3
// 2
// 1
// "1<2<3<hello>>>"
```

解题：

```js
compose(increment,double)([1,2,3])
// [3,5,7]
```

符compose的第二种实现：

```js
const compose = (...fns) => {
  let result
  let len = fns.length
  return function (...args) {
    let count = len
    while (count > 0) {
      result = fns[count - 1].apply(null, count === len ? args : [result])
      count--
    }
    return result
  }
}
// test
compose(increment,double)([1,2,3])
// [3,5,7]
```

## redux中compose实现

```js
function compose(...funcs) {
  // funcs是一个保存着所有参数函数的数组
  // 如果没有传递任何参数，就返回一个函数，这个函数是输入什么得到什么。
  if (funcs.length === 0) {
    return arg => arg
  }
  // 只传递一个参数的时候，就直接把这个函数返回
  if (funcs.length === 1) {
    return funcs[0]
  }
  // 返回组合函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
