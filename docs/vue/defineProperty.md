---
title: vue 响应式实现原理
date: 2020-11-23
categories:
  - 前端
tags:
  - vue
---

:::tip
用了这么久的 Vue 了，还不知道 Vue 响应式视图实现的原理？
:::

<!-- more -->

我们知道在 Vue2.x 版本中，数据 data 发生改变，会立刻触发视图的更新，那么这一切都是怎么做的呢？

## defineProperty

实现数据驱动视图，利用了`Object.defineProperty`这个 [api](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

语法：

```js
// obj 要定义属性的对象
// prop 要定义或修改的属性的名称或`Symbol`
// descriptor 要定义或修改的属性描述符
Object.defineProperty(obj, prop, descriptor)
```

## 一个例子

```js
let data = {}
let name = 'test'
Object.defineProperty(data, 'name', {
  get: () => {
    console.log('get')
    return name
  },
  set: (newVal) => {
    console.log('set')
    name = newVal
  },
})
// 测试
console.log(data.name) // get test
data.name = 'zhou' // set
```

以上，我们在给对象的属性设置一个值的时候，打印了 set，因此，就可以触发视图的更新，更详细的例子见下。

```js
function updateView() {
  console.log('视图更新')
}

function defineReactive(target, key, value) {
  observer(value) // 当value是复杂对象的是后，深度监听
  Object.defineProperty(target, key, {
    get: () => {
      return value
    },
    set: (newValue) => {
      if (newValue !== value) {
        // 深度监听,当newValue的值为一个新的对象的时候，依旧执行监听
        observer(newValue)
        value = newValue
        // 触发视图更新
        updateView()
      }
    },
  })
}

function observer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

// 准备数据
const data = {
  name: 'zhou',
  age: 27,
  info: {
    // 复杂对象，深度监听
    address: '北京',
  },
  // 数组监听
  nums: [10, 20, 30],
}

// 调用,将data 变成响应式数据
observer(data)

// 测试
data.name = 'test name' // 触发视图更新
data.age = 24 // 触发视图更新
data.info.address = '成都' // 深度监听  触发视图更新

data.nums.push(40) // 数组新增，监听不到
data.x = 'hello' // 新增属性，无法监听，所以有 Vue.set
delete data.name // 删除属性，监听不到 --所以有Vue.delete
```

因此，从上面例子的运行结果来看，有以下的一些特点及问题：

- 监听对象，对象的属性已经确定，适合已知对象属性的更新
- 复杂对象监听，需要递归到底，一次性计算量大 消耗内存
- 对象属性的新增无法检测到，因为对象动态化的时候还不存在该属性
- 数组无法监听到，需要我们重写数组的一些方法（push,pop,shift,unshift ...）

## 监听数组

```js
// 重新定义数组原型
const oldArrayProto = Array.prototype
// 创建新对象，原型指向oldArrayProto，再扩展新的方法，不会影响原型
const arrProto = Object.create(oldArrayProto)

const methods = ['push', 'pop', 'shift', 'unshift', 'splice']

methods.forEach((methodName) => {
  arrProto[methodName] = () => {
    updateView() // 触发视图更新
    oldArrayProto[methodName].call(this, ...arguments) // 执行原有逻辑
  }
})

function observer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if(Array.isArray(target)){
    // 将原型指向数组原型
    return target.__proto__ = arrProto
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}
```
至此，当数据是一个数组时，我们将数据的原型指向我们重写过的数组原型，那么操作数组的元素时，我们就能监听到数据改变，但是还是有一些问题，

- 无法监听到数组中 已有元素的修改 , num[0] = 100, 就无法监听到，因为这种赋值方式不对应我们重写的任何一种数组方法，因此，我们应尽量避免这种方式赋值

