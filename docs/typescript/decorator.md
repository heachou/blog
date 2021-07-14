---
title: 认识装饰器
date: 2021-07-14
categories:
  - FE
tags:
  - typescript
---

## 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。

typescript 配置

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

### 装饰器

假如，有一个 `@sealed` 装饰器，我们这样定义 `sealed` 函数

```typescript
function sealed(target) {
  // do something with "target"...
}
```

### 装饰器工厂

```typescript
function color(value: string) {
  return function(target) {
    // do something with "target" and "value"
  }
}
```

### 装饰器组合

多个装饰器可以同时应用到一个声明上

例如：

- 书写在一行上

```typescript
@f @g x
```

- 书写在多行上

```typescript
@f
@g
x
```

在 ts 中，多个装饰器应用在同一个声明上会进行如下步骤的操作：

1. 由上至下依次对装饰器表达式求值
2. 求值的结果会被当做函数，由下至上依次调用

```typescript
function f() {
  console.log('f(): evaluated')
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called')
  }
}

function g() {
  console.log('g(): evaluated')
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called')
  }
}

class C {
  @f()
  @g()
  method() {}
}
```

打印结果：

```typescript
f(): evaluated
g(): evaluated
g(): called
f(): called
```

### 重载构造函数

```typescript
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = 'new property'
    hello = 'override'
  }
}

@classDecorator
class Greeter {
  property = 'property'
  hello: string
  constructor(m: string) {
    this.hello = m
  }
}

console.log(new Greeter('world'))
```

### 方法装饰器

方法装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的属性描述符。

```typescript
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting
  }
}

function enumerable(value: boolean) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(propertyKey)
    descriptor.enumerable = value
  }
}
```

### 访问器装饰器

访问器装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的属性描述符。

```typescript
class Point {
  private _x: number
  private _y: number
  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  @configurable(false)
  get x() {
    return this._x
  }

  @configurable(false)
  get y() {
    return this._y
  }
}
function configurable(value: boolean) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value
  }
}
```

### 属性装饰器

属性装饰器表达式会在运行时当作函数被调用，传入下列 2 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。

```typescript
import 'reflect-metadata'

const formatMetadataKey = Symbol('format')

class Greeter {
  @format('Hello, %s')
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    let formatString = getFormat(this, 'greeting')
    return formatString.replace('%s', this.greeting)
  }
}

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString)
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
}
```

### 参数装饰器

参数装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

```typescript
import 'reflect-metadata'

const requiredMetadataKey = Symbol('required')

function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
  existingRequiredParameters.push(parameterIndex)
  Reflect.defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  )
}

function validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let method = descriptor.value
  descriptor.value = function() {
    let requiredParameters: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyName
    )
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error('Missing required argument.')
        }
      }
    }

    return method.apply(this, arguments)
  }
}

class Greeter {
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  @validate
  greet(@required name: string) {
    return 'Hello ' + name + ', ' + this.greeting
  }
}
```

干，这也太难了(完！)
