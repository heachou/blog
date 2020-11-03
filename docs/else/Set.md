---
title: 认识Set
date: 2020-11-03
categories:
  - 随记
tags:
  - js
---

## Set

> 定义：`Set` 对象允许你存储任何类型的唯一值，无论是原始值或者对象引用，`Set`对象是值的几和，你可以按照插入的顺序迭代它的元素。`Set`中的元素只会出现一次，即`set`中的元素是唯一的

`Set`本身是一个构造函数，用来生成`Set`数据结构

## 基本用法

- 语法
  `new Set([iterable])`接受一个数组（或者具有 iterabke 接口的其他数据结构）,返回一个新的`Set`对象

```js
const set = new Set([1, 2, 1, 2])
console.log(set) // {1,2}
```

上面代码可以看出 `Set` 是可以去除数组中的重复元素

## 属性及方法

### 属性

- size: 返回集合中所包含的元素的数量

```js
console.log(new Set([1, 2, 1, 2]).size) // 2
```

### 操作方法

- add(value): 向集合中添加一个新的项
- delete(value): 从集合中删除一个值
- has(value): 如果值在集合中存在，返回 ture, 否则返回 false
- clear(): 移除集合中的所有项

```js
let set = new Set()
set.add(1)
set.add(2)
set.add(2)
set.add(3)
console.log(set) // {1,2,3}
set.has(2) // true
set.delete(2)
set.has(2) // false
set.clear()
```

### 遍历方法

- keys(): 返回键名的遍历器
- values(): 返回键值的遍历器
- entries(): 返回键值对的遍历器
- forEach(): 使用回调函数遍历每个成员

```js
let set = new Set([1, 2, 3, 4])
// 由于set只有键值，没有键名，所以keys() values()行为完全一致
console.log(Array.from(set.keys())) // [1,2,3,4]
console.log(Array.from(set.values())) // [1,2,3,4]
console.log(Array.from(set.entries())) //  [[1,1],[2,2],[3,3],[4,4]]

set.forEach((item) => {
  console.log(item)
}) // 1,2,3,4
```

### 应用场景

因为 `Set` 结构的值是唯一的，我们可以很轻松的实现以下

```js
// 数组去重
let arr = [1, 1, 2, 3]
let unique = [...new Set(arr)]

let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
let union = [...new Set([...a, ...b])] // [1,2,3,4]

// 交集
let intersect = [...new Set([...a].filter((x) => b.has(x)))] //[2,3]

// 差集
let difference = Array.from(new Set([...a].filter((x) => !b.has(x)))) //[1]
```
