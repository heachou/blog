---
title: mongodb aggragate
date: 2021-08-06
categories:
  - DB
tags:
  - DB
---

## \$unwind

展开

## \$group

分组

```js
db.transactions.aggregate([
  {
    $group: {
      _id: '$currency',
      totalQty: { $sum: '$qty' },
      totalNotional: { $sum: { $multiply: ['$price', '$qty'] } },
      avgPrice: { $avg: '$price' },
      count: { $sum: 1 },
      maxNotional: { $max: { $multiply: ['$price', '$qty'] } },
      minNotional: { $min: { $multiply: ['$price'] } },
    },
  },
])
```

## \$match

匹配 
## \$lookup

关联查询
## \$sort

排序
## \$limit

限制
## \$skip

跳过

## $eq  $gt $lt $gte \$lte

## \$out 将聚合管道中的文档写入一个新的集合

```js
db.transactions.aggregate([
  {
    $group: {
      _id: '$currency',
      symbols: { $push: '$symbol' },
    },
  },
  {
    $out: 'output', // 如果output集合中，已存在，则会清空之前的文档
  },
])
```

## allowDiskUse 防止数据量过大造成的内存不足，写入临时文件

##
