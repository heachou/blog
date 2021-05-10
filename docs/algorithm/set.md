---
title: 集合
date: 2021-05-06
categories:
  - FE
tags:
  - js
  - data structure
---

:::tip
学习了解集合的相关知识
:::

<!-- more -->
## 什么是集合

集合是一种数据结构，无序且唯一的特点。

## js 中的集合

es6 中有集合，`Set`

集合有哪些常用操作呢？

去重，判断某元素是否在集合中，求交集等

```js
// 去重
const arr = [1, 2, 1, 2, 1, 3]
// const arr2 = [...new Set(arr)]
const arr2 = Array.from(new Set(arr))

// 判断元素是否在集合中

const set = new Set(arr)
set.has(1) // true
set.has(-1) // false

// 求交集
// 转换成数组，利用数组的方法求交集
const set2 = new Set([2, 3, 4])
const set3 = new Set([...set].filter((item) => set2.has(item)))
```

## 例子

[两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

给定两个数组，编写一个函数来计算它们的交集。

输入：nums1 = [1,2,2,1], nums2 = [2,2]

输出：[2]

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]

输出：[9,4]
 

说明：

- 输出结果中的每个元素一定是唯一的。
- 我们可以不考虑输出结果的顺序。

```js
var intersection = function(nums1, nums2) {
  const set1 = new Set(nums1)
  return [...new Set(nums2.filter(item=>set1.has(item)))]
};

var intersection = function(nums1, nums2) {
  const set1 = new Set(nums1)

  return [...new Set(nums2.filter(item=>set1.has(item)))]
};

```


## set 操作

- 使用 `Set` 对象： new、add、delete、has、size
- 迭代 `Set`： 多种迭代方法，set与Array互转，求交集，差集等

```js
let mySet = new Set()

mySet.add(1)
mySet.add(5)
mySet.add(5)
mySet.add('text')
mySet.add({a:1})

const has = mySet.has(1)

const myArr = Array.from(myASet)

const mySet2 = new Set([1,2,3,4])

// 交集
const intersection = new Set([...mySet].filter(x=>mySet2.has(x)))

// 差集
const diffrence = new Set([...mySet].filter(x=>!mySet2.has(x)))

```