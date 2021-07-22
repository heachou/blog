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

### \$eleMatch 匹配数组字段中至少一个值满足筛选条件的文档
