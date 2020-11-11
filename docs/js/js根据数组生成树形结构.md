---
title: js 生成树形结构
date: 2020-11-11
categories:
  - 前端
tags:
  - js
---

:::tip
在项目中，后端返回了一串扁平化的数组,前端需要将数组转化为树形结构，然后展示在界面上
:::

<!-- more -->

### 原始数据

```js
let data = [
  { id: 1, name: 'a', parent_id: 0 },
  { id: 2, name: 'b', parent_id: 0 },
  { id: 3, name: 'a-1', parent_id: 1 },
  { id: 4, name: 'a-2', parent_id: 1 },
  { id: 5, name: 'b-1', parent_id: 2 },
  { id: 6, name: 'b-2', parent_id: 2 },
  { id: 7, name: 'a-1-1', parent_id: 3 },
  { id: 8, name: 'a-1-1-1', parent_id: 7 },
]
```

### 实现方法

```js
function arrayToTree(arr, key, pKey) {
  let result = arr.reduce((prev, item) => {
    prev[item[pKey]] ? prev[item[pKey]].push(item) : (prev[item[pKey]] = [item])
    return prev
  }, {})
  for (let prop in result) {
    result[prop].forEach((item) => {
      if (result[item[key]]) {
        item.children = result[item[key]]
      }
    })
  }
  return result[0]
}
```

调用

```js
arrayToTree(data,'id','parent_id')
```
