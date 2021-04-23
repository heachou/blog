---
title: react code splitting
date: 2020-08-14
categories:
  - FE
tags:
 - react
---

## 为什么使用动态加载

在通常情况下，我们将所有的模块都打包到一个文件中，这就导致网页加载缓慢，交互卡顿，使得用户体验很糟糕，
因为我们在打开网页的过程中，会一次性加载整个网站的所有代码，因此`code-splitting`，即代码分割出现了，
在webpack中提供了代码分割的功能。在此，我们不讨论webpack中怎么实现代码分割。仅关注react如何实现代码分割的。

## 动态加载

React 在16.6版本后带来了许多新的特性，其中最为显著的两个特性是`React.Suspense`和`React.lazy`。这两个特性，将代码分割带到了一个新的高度

```js
import React, { Suspense, lazy } from 'react'
const FirstComponent = lazy(() => import(/* webpackChunkName: 'firstComponent'*/ './FirstComponent')) // 添加注释能更清楚的分辨请求的文件
const SecondComponent = lazy(() => import(/* webpackChunkName: 'secondComponent'*/ './SecondComponent'))
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FirstComponent />
        <SecondComponent />
      </Suspense>
    </div>
  );
}
```
此时，我们查看界面，发现在加载前 显示 loading，查看浏览器`network`面板，发现文件不是一次性加载出来了，有多个请求，此时，我们的目的就达到了



fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。

注意，有时候，模块会加载失败，会触发一个错误，这时候，我们可以通过[异常捕获边界（Error boundaries）](https://zh-hans.reactjs.org/docs/error-boundaries.html)来处理。
见下面的代码

```js
import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = {
    error: null,
  }

  static getDerivedStateFromError(error) {
    return { error: error };
  }

  render() {
    const { error } = this.state
    if (error) {
      // 渲染出错时的 UI
      return <div>
        <div>渲染页面出错</div>
        <div>
          {error.type}
        </div>
        <div>
          {error.name}
        </div>
        <div>
          {error.message}
        </div>
      </div>
    }
    return this.props.children
  }
}

export default ErrorBoundary
```
```js
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## 不适用之处
- React.lazy和Suspense并不支持服务端渲染。因此，使用服务端渲染的同学，请绕行至 `react-loadable` 和 `loadable-components`


参考文档：
- [react code splitting](https://zh-hans.reactjs.org/docs/code-splitting.html)
- [基于React.Suspense和React.lazy的前端性能优化](https://juejin.im/entry/6844903809232158734)