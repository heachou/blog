---
title: call、apply、bind、instanceOf、new
date: 2021-02-20
categories:
  - 前端
tags:
  - js
---

## 相同点与不同点

相同点：

- call、apply、bind 这三个函数的第一个参数都是`this`的指向对象，都改变了函数运行时的`this`指向

不同点

- call、apply之间的区别在于参数的区别，call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。

```js
test.call(obj,a,,b,c);
test.apply(obj,[a,b,c]);
```

## call、apply、bind例子

```js

var obj1 = {a:1,b:2}
var obj2 = {
  a: 100,
  b: 200,
  test(m){
    console.log(this.a + this.b + m)
  }
}

obj2.test(300) // 600

obj2.test.call(obj1,3) // 6

obj2.test.apply(obj1,[3]) // 6

var bind = obj2.test.bind(obj1) // 返回一个函数
bind(3) // 6

```

## 应用

- 将伪数组转化为数组（含有length属性的对象，dom节点, 函数的参数arguments）

```js
function fn10() {
    return Array.prototype.slice.call(arguments);
}
console.log(fn10(1,2,3,4,5)); // [1, 2, 3, 4, 5]
```

```js
let obj4 = {
  0: 1,
  1: 'thomas',
  2: 13,
  length: 3 // 一定要有length属性
};

console.log(Array.prototype.slice.call(obj4)); // [1, "thomas", 13]
```

- 数组拼接，添加

```js
let arr1 = [1,2,3];
let arr2 = [4,5,6];

//数组的concat方法：返回一个新的数组
let arr3 = arr1.concat(arr2); 
console.log(arr3); // [1, 2, 3, 4, 5, 6]

console.log(arr1); // [1, 2, 3] 不变
console.log(arr2); // [4, 5, 6] 不变
// 用 apply方法
[].push.apply(arr1,arr2);  // 给arr1添加arr2
console.log(arr1); // [1, 2, 3, 4, 5, 6]
console.log(arr2); // 不变

```

- 判断变量类型

```js
let arr1 = [1,2,3];
let str1 = 'string';
let obj1 = {name: 'thomas'};
//
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
console.log(fn1(arr1)); // true

//  判断类型的方式，这个最常用语判断array和object，null(因为typeof null等于object)  
console.log(Object.prototype.toString.call(arr1)); // [object Array]
console.log(Object.prototype.toString.call(str1)); // [object String]
console.log(Object.prototype.toString.call(obj1)); // [object Object]
console.log(Object.prototype.toString.call(null)); // [object Null]

```

- 利用call和apply做继承

```js
function Animal(name){      
    this.name = name;      
    this.showName = function(){      
        console.log(this.name);      
    }      
}      

function Cat(name){    
    Animal.call(this, name);    
}      

// Animal.call(this) 的意思就是使用this对象代替Animal对象，那么
// Cat中不就有Animal的所有属性和方法了吗，Cat对象就能够直接调用Animal的方法以及属性了
var cat = new Cat("TONY");     
cat.showName();   //TONY

```

- 多继承

```js
  function Class1(a,b) {
    this.showclass1 = function(a,b) {
      console.log(`class1: ${a},${b}`);
    }
  }

  function Class2(a,b) {
    this.showclass2 = function(a,b) {
      console.log(`class2: ${a},${b}`);
    }
  }

  function Class3(a,b,c) {
    Class1.call(this);
    Class2.call(this);
  }

  let arr10 = [2,2];
  let demo = new Class3();
  demo.showclass1.call(this,1); // class1: 1,undefined
  demo.showclass1.call(this,1,2); // class1: 1,2
  demo.showclass2.apply(this,arr10); // class2: 2,2

```

## 模拟实现

call

```js
Function.prototype.myCall = function(ctx){
  var ctx = ctx || window
  // 给ctx添加一个属性
  // getName.call(a,'axl') => a.fn = getName
  // this == getName
  ctx.fn = this
  // 取出其他参数
  var args = [...arguments].slice(1)
  // getName('axl')
  var ret = ctx.fn(...args)
  // 删除fn
  delete ctx.fn
  return ret
}
```

apply 实现类似

```js
Function.prototype.myApply = function(context){
  var context = context || window
  // getValue.bind(a, ['yck', '24']) => a.fn = getValue
  // this == getValue
  context.fn = this
  var result
  // 取出其他参数
  if(arguments[1]){
    result = context.fn(...arguments[1])
  }else{
    result = context.fn()
  }
  delete context.fn
  return result
}
```

bind 基本相同，不同的是返回一个函数

```js
Function.prototype.myBind = function(context){
  if(typeof this !== 'function'){
    throw new TypeError('Error')
  }
  // 缓存this
  var _this = this
  // 取出其他参数
  var args = [...arguments].slice(1)

  return function F(){
    if(this instanceof F){
      return new _this(...args,...arguments)
    }
    // 利用apply执行，并且拼接调用的参数
    return _this.apply(context,args.concat(...arguments))
  }
}

```

instanceof 实现原理

`instanceof` 可以正确的判断对象的类型，内部机制是通过判断对象的原型链中能不能找到类型的`prototype`

```js
class Animal{}

class Cat extends Animal{}

let cat = new Cat()

console.log(cat instanceof Cat ) // true
console.log(cat.__proto__ === Cat.prototype) // true

console.log(cat instanceof Animal ) // true
console.log(Cat.prototype.__proto__ === Animal.prototype) // true
console.log(cat.__proto__.__proto__ === Animal.prototype) // true

console.log(cat instanceof Object ) // true
console.log(Animal.prototype.__proto__ === Object.prototype) // true
console.log(cat.__proto__.__proto__.__proto__ === Object.prototype) // true

console.log(Object.prototype.__proto__) // null


function instanceOf(left,right){
  prototype = right.prototype
  left = left.__proto__
  while(left){
    if(left === prototype){
      return true
    }
    if(left === null){
      return false
    }
    left = left.__proto__
  } 
}
```

## new 操作符

当我们调用 new 的过程中，会发生以下步骤

- 新建一个对象
- 链接到原型
- 绑定this
- 返回新对象

模拟实现

```js
function create(){
  // 新建一个对象
  let obj = new Object()
  // 获得构造函数
  let Con = [].shift.call(arguments)
  // 链接到原型
  obj.__proto__ = Con.prototype
  // 绑定this，执行构造函数
  let result = Con.apply(obj,arguments)
  return typeof result === 'object' ? result : obj
}

let cat = create(Cat)

```
