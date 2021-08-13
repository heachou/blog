---
isShowComments: false
---

# 其他一些记录

记录一些暂时难以归类的问题

## http2 特点

- 多向请求与相应，解决了 HTTP 1.x 中的对首阻塞
- 请求优先级
- 请求都建立在一个 tcp 请求上，实现多路复用
- 服务器推送
- 首部压缩

## 判断一个函数是异步函数，但是不执行

```js
const test = async () => {}

console.log(test[Symbol.toStringTag]) // "AsyncFunction"
```

## 洋葱模型

[洋葱模型](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=694#/detail/pc?id=6786)

express 不是严格按照洋葱模型，按照事件循坏来执行的

koa 是严格按照洋葱模型，先进后出

## 观察者模式

观察者模式指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行

```js
const queuedObservers = new Set()

const observe = (fn) => queuedObservers.add(fn)
const observable = (obj) => new Proxy(obj, { set })

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  queuedObservers.forEach((observer) => observer())
  return result
}

const person = observable({
  name: '张三',
  age: 20,
})

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print)
person.name = '李四'
// 输出
// 李四, 20
```

## Object.seal

`Object.seal()`方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变

## windows 下常用的命令

- 查看 8080 端口占用
  > netstat -aon|findstr "8080"

记下 pid，根据 pid 查找哪个进程或者程序占用该端口,比如这里是 2668

> tasklist|findstr "2668"

结束该进程,这里是 tim 应用

> taskkill /f /t /im TIM.exe

## 按领域组织文件夹结构

- 软件复杂度的根源： 复杂的依赖关系

降低复杂度，降低依赖关系

