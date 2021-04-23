---
title: 一些学习的思考
date: 2021-01-09
categories:
  - FE
tags:
  - js
  - interview
---


## React

## hooks为什么不能在条件或循环中使用，其中的原理是什么？

> 因为初次渲染的时候，按照 useState，useEffect 的顺序，把 state，deps 等按顺序塞到 memoizedState 数组中。
更新的时候，按照顺序，从 memoizedState 中把上次记录的值拿出来。如果写在条件或循环中，那么这个顺序就发生了变化，memoizedState 并不会感知到。

## react15和react16的更新机制差异？为什么react16架构升级后就能中断更新，根据什么决定是否中断？

## 类组件如何实现逻辑复用

> 类组件实现逻辑复用一般是通过高阶组件HOC来实现的，高阶组件就是一个函数，接受一个组件为参数，返回一个新的组件，
还可以通过render props来实现，指的是使用一个值为函数的`prop`元素并调用它而不是实现自己的渲染逻辑。

## react中setState是同步还是异步？

[React 中 setState 什么时候是同步的，什么时候是异步的](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17)

> setState 有时是同步的，有时是异步的，
在React中，如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

原因： 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

注意： setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。、

setState 的行为是“异步”还是“同步”取决于 React 执行 setState 方法时的执行上下文①(ExecutionContext)。

**这里所说的同步异步， 并不是真正的同步异步， 它还是同步执行的。这里的异步指的是多个state会合成到一起进行批量更新。**

## react中如何阻止冒泡

## react diff 算法复杂度是多少？

## diff 造成的非预期更新如何解决？

## react 常用的性能优化手段？

## react-redux 干了什么事情？

## mapStateToProps 的第二个参数作用？

## CSS

## 页面适配方案：百分比，flex,vh,vw

## 浏览器相关

## 说下tls握手
## 浏览器缓存
## 从地址栏输入地址到页面回显，都发生了什么
## 解释重绘会回流

## js相关

## new Promise返回的实例和实例then方法执行后返回的promise是一个吗？

## 手写promise（Promise里都是微任务吗）

## 类数组怎么转换成数组

## 如何改变this指向

## forEach for in for of 的差异

## new 操作符做了什么？（如何区分函数是new调用还是直接调用）

## Object.create(null) 和 Object.create({})有什么区别

## js数据类型和存储方式，如何判断

## 实现一下es中的 extends 

## 说一下es6中的类和java中的类的区别

## js中如何实现函数重载

## webpack 相关

## webpack 常见的配置项

## webpack 动态加载？

## 算法相关

## 实现一个map

## 统计字符串中次数最多的字母

## rgb转16进制函数

## 实现一个带缓存的求阶乘函数

## 两个compose的大概实现，reduce 的妙用

## 实现一个数组的扁平方法flat

## 数组去重怎么实现，如何不用set实现

## 数组中一万个数据访问第一个和访问最后一个效率会有什么差异，为什么