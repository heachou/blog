---
title: mongodb CRUD
date: 2021-08-06
categories:
  - DB
tags:
  - DB
---

## mongodb 常见的 CRUD 操作

## 逻辑操作符

### $in $nin

- \$in 包含

```js
db.users.find({ name: { $in: ['alice', 'bob'] } })
```

- \$nin 不包含

```js
db.users.find({ name: { $nin: ['alice'] } })
```

### $not $and $or $nor

- \$not 条件不成立的文档

```js
// {field:{$not:{<operator-expression>}}}
db.accounts.find({ name: { $not: { $eq: 'alice' } } })
db.accounts.find({ balance: { $not: { $lt: 2000 } } })
```

- \$and 筛选条件全部成立的文档

```js
// {$and: [{<expression>},{<expression>},...{<expression>}]}
db.accounts.find({ $and: [{ name: 'alice' }, { balance: { $gt: 1000 } }] })
// 等价于
db.accounts.find({
  name: 'alice',
  balance: { $gt: 1000 },
})
```

- \$or 至少一个筛选条件成立的文档

```js
// {$or: [{<expression>},{<expression>},...{<expression>}]}
db.accounts.find({ $or: [{ name: 'alice' }, { balance: { $gt: 1000 } }] })
```

- \$nor 多个筛选条件全部不成立的文档

```js
// 读取不属于alice和charlie且余额不小于100的账户
db.accounts.find({
  $nor: [{ name: 'alice' }, { name: 'charlie' }, { balance: { $lt: 100 } }],
})
```

---

\*\* 以上查询会筛选出不包含查询字段的文档

## 字段操作符

### \$exists 匹配包含查询字段的文档

```js
// {field: {$exists: <boolean>}}
db.accounts.find({ age: { $exists: true } })
db.accounts.find({ '_id.type': { $exists: true } })
// 存在并且等于30
db.accounts.find({ age: { $exists: true, $eq: 30 } })
```

### \$type 匹配字段类型符合的文档

```js
// {field: { $type: <BSON type>}}
// {filed: {$type: [<BSON type>,<BSON type>,...]}}
db.accounts.find({ _id: { $type: 'string' } })
db.accounts.find({ _id: { $type: ['objectId', 'object'] } })
```

## 数组操作符

### \$all 匹配数组字段中包含所有查询值的文档

```js
db.accounts.find({age:{$all: [30]}})
```

### \$elemMatch 匹配数组字段中至少一个值满足筛选条件的文档

```js
// {field: {$elemMatch: {<query1>,<query2>,...}}}

// { _id: 1, results: [ 82, 85, 88 ] }
// { _id: 2, results: [ 75, 88, 89 ] }

db.scores.find(
   { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
)
// { "_id" : 1, "results" : [ 82, 85, 88 ] }

```

## 更新文档

### update

- update 即使查询条件出来的结果有多条，也只会更新一条数据
- 更新整个文档
```js
// db.<collection>.update(<query>,<update>,<options>)
db.collection.update({name:"alice"},{name:"alice",balance: 123})
```

- 更新特定字段 $set $unset $rename $inc $ mul $min $max
使用更新操作符，精确更新文档

```js
// {$set: {<field1>:<value1>,...}}
db.accounts.update({name:"jack"},{$set:{balance:2500,info:{dateOpened: new Date(),branch: 'branch1'}}})
```

- $unset 删除字段

```js
db.accounts.update({name:"jack"},{$unset:{balance:"",info:""}})
// 删除balance 和 info 字段
```

- $rename 重命名
如果字段不存在，文档不会改变
```js
db.accounts.update({balance:6000},{$rename:{name:"name_edit"}})
```




### findAndModify

