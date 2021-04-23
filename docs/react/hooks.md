---
title: React Hooks
date: 2021-02-21
categories:
  - FE
tags:
  - react
---

## 初衷与问题

- 组件之间难以复用状态逻辑



> 类组件我们复用状态逻辑时，过去常见的解决方案是高阶组件、render props 及状态管理框架，但是React并没有提供API来解决.


```js
const isLogin = () => {
  return !!localStorage.getItem('token')
}
const checkLogin = (WrappedComponent) => {
  return (props) => {
    return isLogin() ? <WrappedComponent {...props} /> : <LoginPage />;
```

- 复杂的组件变得难以理解

> 比如常见的订阅与取消没有直接关联在一起，而是通过生命周期函数去使用，这就导致组件难以分解，状态逻辑分散。

- 人和机器都容易混淆类

1. 值捕获问题
2. 需要用bind函数来绑定事件。虽然现在我们都通过了类属性的方案，也可以使用 Babel 插件提前开发了，但整个提案仍然是草案的阶段，还不稳定；

- 难以做编译优化。

## 使用限制

1. 不能在 React 的循环、条件或嵌套函数中调用 Hook。
2. 在 React 的函数组件中调用 Hook。

因为 Hooks 的设计是基于数组实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook。当然，实质上 React 的源码里不是数组，是链表。
