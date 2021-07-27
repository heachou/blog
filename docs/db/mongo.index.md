# 索引 index

对文档部分内容进行排序的数据结构

创建合适的索引，可以极大的提高搜索的性能

## 创建索引

- 语法

`db.<collection>.createIndex(<keys>,<options>)`

- options 参数

unique: boolean 创建一个具有唯一性的索引，要求，字段的值是唯一的

sparse: boolean 只将包含索引键字段的文档加入到索引中

expireAfterSeconds: number 创建具有生存时间的索引

- 创建单键索引

```js
// db.accountsWithIndex.insertMany([{name:"alice",balance:50,currency:["GBP","USD"]},{name:"bob",balance: 20,currency:["AUD","USD"]},{name:"bob",balance:300,currency:["CNY"]}])
// 创建索引
db.accountsWithIndex.createIndex({ name: 1 })
// 获取索引
db.accountsWithIndex.getIndexes()
```

- 创建复合键索引

```js
db.accountsWithIndex.createIndex({ name: 1, balance: -1 })
// 获取索引
db.accountsWithIndex.getIndexes()
```

- 创建多键索引

```js
// currency 是一个数组字段
db.accountsWithIndex.createIndex({ currency: 1 })
//
```

## 单键索引

## 复合键索引

## 多键索引

## 索引特性

- 唯一性

数据库会默认的为我们创建一个索引 `_id` ,具有唯一性，保证了文档是唯一的，`unique`

- 稀疏性

只将包含索引键字段的文档加入到索引中。`sparse` ，如果同一个索引既具有唯一性，又具有稀疏性，就可以保存*多篇*确实索引键值的文档了。

```js
db.accountsWithIndex.createIndex({ balance: 1 }, { unique: true, sparse: true })
```

- 生存时间

```js
// 创建一个生存时间是二十秒的索引
db.accountsWithIndex.createIndex({ lastAccess: 1 }, { expireAfterSeconds: 20 })
// 超过生存时间的文档将会自动的被数据库给删除掉
```

## explain()

```js
db.accountsWithIndex.find({ balance: 300 }).explain()
// COLLSCAN collection scan 遍历 扫描
// "winningPlan" : {
//    "stage" : "COLLSCAN",
//    "filter" : {
//            "balance" : {
//             "$eq" : 300
//            }
//    },
//    "direction" : "forward"
//                 },

db.accountsWithIndex.find({ name: 'alice' }).explain()
// IXSCAN index scan
// "winningPlan" : {
//    "stage" : "FETCH",
//   "inputStage" : {
//           "stage" : "IXSCAN",
//          "keyPattern" : {
//                    "name" : 1
//          },
//          "indexName" : "name_1",
//          "isMultiKey" : false,
//          "multiKeyPaths" : {
//                    "name" : [ ]
//          },
//          "isUnique" : false,
//          "isSparse" : false,
//          "isPartial" : false,
//          "indexVersion" : 2,
//          "direction" : "forward",
//          "indexBounds" : {
//                    "name" : [
//                            "[\"alice\", \"alice\"]"
//                  ]
//          }
//   }
//  },

db.accountsWithIndex.find({ name: 'alice' }, { _id: 0, name: 1 })
// IXSCAN index scan
// PROJECTION_COVERED 投影转换  性能更好

//  "winningPlan" : {
//     "stage" : "PROJECTION_COVERED",
//     "transformBy" : {
//             "_id" : 0,
//             "name" : 1,
//             "balance" : 1
//     },
//     "inputStage" : {
//             "stage" : "IXSCAN",
//             "keyPattern" : {
//               "name" : 1,
//               "balance" : -1
//             },
//             "indexName" : "name_1_balance_-1",
//             "isMultiKey" : false,
//             "multiKeyPaths" : {
//             "name" : [ ],
//             "balance" : [ ]
//             },
//             "isUnique" : false,
//             "isSparse" : false,
//             "isPartial" : false,
//             "indexVersion" : 2,
//             "direction" : "forward",
//             "indexBounds" : {
//             "name" : [
//               "[\"alice\", \"alice\"]"
//             ],
//             "balance" : [
//             "[MaxKey, MinKey]"
//             ]
//           }
//         }
//       },
```

## 如何创建一个合适的索引

## 索引对数据库写入操作的影响

## 删除索引

```js
// 根据索引名称删除
db.accountsWithIndex.dropIndex('name_1')
// 根据索引的定义来删除
db.accountsWithIndex.dropIndex({ name: 1, balance: -1 })
```
