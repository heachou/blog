---
title: curry 函数柯里化
date: 2021-01-09
categories:
  - FE
tags:
  - js
---

:::tip
柯里化（Currying）,维基百科上的解释是，把接受多个参数的函数转换成接受一个单一参数的函数
:::

函数是“一等公民”，它们本质上是十分简单和过程化的。可以利用函数，进行一些简单的数据处理，return 结果，或者有一些额外的功能，需要通过使用闭包来实现，最后经常会return 匿名函数。

---

## 函数柯里化

规则

- 柯里化函数调用时，满足了原函数的总个数，就返回计算结果，否则，继续返回柯里化函数。

```js
const curry = function(f) {
  let len = f.length // 原函数参数的个数

  return function t() {
    let innerLength = arguments.length,
      args = Array.prototype.slice.call(arguments) // 取出当前参数

    if (innerLength >= len) {
      //当参数的个数大于等于原函数的个数的时候，返回计算结果
      // 递归出口，f.length
      return f.apply(undefined, args)
    } else {
      return function() {
        // 这里继续返回柯里化函数
        // 合并参数，
        let allArgs = args.concat(Array.prototype.slice.call(arguments))

        return t.apply(undefined, allArgs)
      }
    }
  }
}

// 测试一下
function add(num1, num2) {
  return num1 + num2
}

const curriedAdd = curry(add)
curriedAdd(2)(3) // 5
curriedAdd(2,3) // 5
curriedAdd(1,3) //4
```

## 额外说明

函数柯里化可以用来构建复杂的算法 和 功能， 但是滥用也会带来额外的开销。

从上面实现部分的代码中，可以看到，使用柯里化函数，离不开闭包， arguments， 递归。

闭包，函数中的变量都保存在内存中，内存消耗大，有可能导致内存泄漏。（返回的函数依赖了原函数的入参长度，形成闭包）
递归，效率非常差，（当入参没有达到原函数的个数时，需要继续返回柯里化函数）
arguments, 变量存取慢，访问性很差 、（用arguments去取当前函数的入参，并且入参累计个数没有达到原函数的个数时，递归调用原函数）
