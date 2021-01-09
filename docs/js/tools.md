---
title: js 一些工具函数
date: 2021-01-08
categories:
  - 前端
tags:
  - js
---

:::tip
一些工具函数，可直接运用在项目中
:::

<!-- more -->

## 深拷贝

```js
function deepCopy(data, hash = new WeakMap()) {
  if (typeof data !== 'object' || data === null) {
    throw new TypeError('传入参数不是对象')
  }
  // 判断传入的待拷贝对象的引用是否存在于hash中
  if (hash.has(data)) {
    return hash.get(data)
  }
  let newData = Array.isArray(data) ? [] : {}
  const dataKeys = Object.keys(data)
  dataKeys.forEach((key) => {
    const currentDataValue = data[key]
    // 基本数据类型的值和函数直接赋值拷贝
    if (typeof currentDataValue !== 'object' || currentDataValue === null) {
      newData[key] = currentDataValue
    } else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[key] = deepCopy(currentDataValue, hash)
    } else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[key] = new Set([...currentDataValue])
    } else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[key] = new Map([...currentDataValue])
    } else {
      // 将这个待拷贝对象的引用存于hash中
      hash.set(data, data)
      // 普通对象则递归赋值
      newData[key] = deepCopy(currentDataValue, hash)
    }
  })
  return newData
}
```

## 防抖函数

防抖函数只会执行一次，将多次执行变为一次执行

#### 袖珍版 函数只能在最后调用

```js
const debounce = (func, wait = 100) => {
  let timer = 0
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
```

### 可立即调用的防抖函数

```js
const debounce = (func, wait = 100, immediate = true) => {
  let timer, context, args
  const later = () => {
    return setTimeout(() => {
      timer = null
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
  }
  return function(...params) {
    if (!timer) {
      timer = later()
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

## 节流函数

节流函数会执行多次，是将多次执行变成每隔一段时间执行一次

```js
/**
 * 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
const throttle = (func,wait,options)=>{
  let result,context,args
  let timeout = null
  // 之前的时间戳
  let previous = 0

  if(!options){
    options = {}
  }
  const now = ()=>{
    return +new Date()
  }
  const later = ()=>{
    timeout = null
    previous = options.leading === false ? 0 : now()
    result = func.apply(context,args)
    if(!timeout){
      context = args = null
    }
  }
  return function(...params){
    let current = now()
    if(!previous && options.leading === false){
      previous = current
    }
    let remaining = wait - (current - previous)
    context = this
    args = params
    // remaining > wait 存在于用户手动调整了时间
    if(remaining <= 0 || remaining > wait){
      if(timeout){
        clearTimeout(timeout)
        timeout = null
      }
      previous = current
      result = func.apply(context,args)
      if(!timeout){
        context = args = null
      }
    }else if(!timeout && options.trailing !== false){
      timeout = setTimeout(later,remaining)
    }
    return result
  }
}
```

## sleep

```js
const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
```
## 扁平数组

```js
// [1,2,[3,4],[5,6,[7]]] ---> [1,2,3,4,5,6,7]
// Array.flat
function flatDeep(arr, d = 1) {
   return d > 0 
   ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
   : arr.slice();
}
```

## 根据数组生成树形结构

见上一篇 [文档](./js根据数组生成树形结构)

------
## 类型判断

```js
// _typeof([12,3,343]);
// "array"
// _typeof({name: 'zxc', age: 18});
// "object"
// _typeof(1);
// "number"
// _typeof("1");
// "string"
//  _typeof(null);
// "null"
// _typeof(undefined);
// "undefined"
// _typeof(NaN);
// "number"
// _typeof(Date);
// "function"
// _typeof(new Date());
// "date"
// _typeof(new RegExp());
// "regexp"

function _typeof(obj){
  var s = Object.prototype.toString.call(obj);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}
```