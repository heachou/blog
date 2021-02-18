---
title: generator 
date: 2021-02-06
categories:
  - 前端
tags:
  - js
  - 面试
---


## generator

```js
const arr = [1,2,3]

function * generator(arr){
  for(let v of arr){
    yield v
  }
}

const gen = generator(arr)

gen.next()
// {value: 1, done: false}
gen.next()
// {value: 2, done: false}
gen.next()
// {value: 3, done: false}
gen.next()
// {value: undefined, done: true}

```

## 模拟实现

```js
function generator(arr){
  let index = 0;
  return {
    next(){
      return index < arr.length ? {
        value: arr[index++],
        done: false
      }:{
        value: undefined,
        done: true
      }
    }
  }
}
```
