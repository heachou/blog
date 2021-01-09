---
title: js对象模拟DOM对象
date: 2021-01-09
categories:
  - 前端
tags:
  - vdom
---

:::tip
模拟实现 React createElement，或 Vue 中的 h 函数
:::

## 为什么需要 Virtual Dom

首先操作 DOM 是一件很耗费性能的问题，但是操作 JS 对象来模拟 DOM 确是一件容易的事，操作 JS 对象比操作 DOM 对象省时很多。

比如

```js
const li_before = [1, 2, 3, 4, 5]
const li_after = [1, 2, 5, 4]
```

假设上面是 ul 标签里面的 li 标签，从第一步到第二步，我们看到，删除了第三个 li，然后第四和第五个 li 交换了位置。

对应到相应的 DOM 中，应该是有以下的代码

```js
// 删除第三个 li
ul.childNodes[2].remove()
// 将第四个 li 和第五个交换位置
let fromNode = ul.childNodes[4]
let toNode = node.childNodes[3]
let cloneFromNode = fromNode.cloneNode(true)
let cloenToNode = toNode.cloneNode(true)
ul.replaceChild(cloneFromNode, toNode)
ul.replaceChild(cloenToNode, fromNode)
```

当然在实际操作中，我们还需要给每个节点一个标识，作为判断是同一个节点的依据。所以这也是 Vue 和 React 中官方推荐列表里的节点使用唯一的 key 来保证性能。

那么既然 DOM 对象可以通过 JS 对象来模拟，反之也可以通过 JS 对象来渲染出对应的 DOM

以下是一个 JS 对象模拟 DOM 对象的简单实现

```js
class Element {
  /**
   * @param {String} tag 'div'
   * @param {Object} props { class: 'item' }
   * @param {Array} children [ Element1, 'text']
   * @param {String} key option
   */
  constructor(tag, props, children, key) {
    this.tag = tag
    this.props = props
    if (Array.isArray(children)) {
      this.children = children
    } else if (typeof children === 'string') {
      this.key = children
      this.children = [children]
    }
    if (key) {
      this.key = key
    }
  }
  // 渲染
  render() {
    let root = this._createElement(
      this.tag,
      this.props,
      this.children,
      this.key
    )
    document.body.appendChild(root)
    return root
  }
  create() {
    return this._createElement(this.tag, this.props, this.children, this.key)
  }
  // 创建节点
  _createElement(tag, props, children, key) {
    // 创建element
    let el = document.createElement(tag)
    // 添加属性
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        el.setAttribute(key, props[key])
      }
    }
    if (key) {
      el.setAttribute('key', key)
    }
    if (children) {
      // 递归调用
      children.forEach((element) => {
        let child
        if (element instanceof Element) {
          child = this._createElement(
            element.tag,
            element.props,
            element.children,
            element.key
          )
        } else {
          child = document.createTextNode(element)
        }
        el.appendChild(child)
      })
    }
    return el
  }
}
```

测试一下：

```js
let div = new Element(
  'div',
  { style: 'color:red' },
  [new Element('h3', { title: 'h3_title' }, 'h3')],
  'key_test'
)
div.render()
//  <div style="color:red" key="key_test"><h3 title="h3_title" key="h3">h3</h3></div>

// 自闭合标签
let div2 = new Element('div',{style:'color:red'},[new Element('img',{title:'h3_title'},)],'key_test')
div2.render()
// <div style="color:red" key="key_test"><img title="h3_title"></div>
```

以上我们就实现了 js 来模拟生成 dom 对象的过程


## 用对象来描述dom结构
```js

let div = {
  tag: 'div',
  props: {
    style: 'color:red'
  },
  key: 'div',
  children: [
    {
      tag: 'img',
      props: {
        src: 'a.png'
      },
      key: 'img',
      children: null
    }
  ],
}

```
