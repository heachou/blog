function arrayToTree(arr, key, pKey) {
  // 找到第一层
  const parents = arr.filter((p) => p[pKey] === 0)
  // 找到子层
  const children = arr.filter((c) => c[pKey] !== 0)

  function _handleData(pArr, cArr) {
    pArr.map((p) => {
      cArr.map((c, i) => {
        if (c[pKey] === p[key]) {
          let _children = JSON.parse(JSON.stringify(cArr))
          _children.splice(i, 1)
          _handleData([c], _children)
          if (p.children) {
            p.children.push(c)
          } else {
            p.children = [c]
          }
        }
      })
    })
  }
  _handleData(parents, children)

  return parents
}

function reverse(arr) {
  let i = 0
  let j = arr.length - 1
  let len = arr.length
  while (i < j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    i += 1
    j -= 1
  }
  return arr
}

function fib(n) {
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  return fib(n - 1) + fib(n - 2)
}

// console.log(fib(2))
// console.log(fib(3))
// console.log(fib(4))

// console.log(reverse([1, 2, 3, 4, 5]))

function debounce(fn, wait, immediate) {
  var timer
  var result
  return function () {
    var context = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      var callNow = !timer
      setTimeout(function () {
        timer = null
      }, wait)
      if (callNow) {
        result = fn.apply(context, args)
      }
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, wait)
    }
    return result
  }
}

function sqrt(n) {
  let left = 1
  let right = n

  while (left <= right) {
    let mid = left + (right - left) / 2
    let t = mid * mid
    if (t === n) {
      return mid
    }
    if (t < n) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return parseInt(right)
}

// console.log(sqrt(8))
// console.log(sqrt(8))

function flatten(arr) {
  const _arr = []
  for (let item of arr) {
    if (Array.isArray(item)) {
      _arr.push(...flatten(item))
    } else {
      _arr.push(item)
    }
  }
  return _arr
}

function flatten2(arr) {
  return arr.reduce((acc, current) => {
    return Array.isArray(current) ? acc.concat(flatten2(current)) : acc.concat(current)
  }, [])
}

function deepClone(obj, hashMap = new WeakMap()) {
  if (obj == undefined || typeof obj !== 'object') {
    return obj
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  const hashKey = hashMap.get(obj)
  if (hashKey) {
    return hashKey
  }
  const _obj = Array.isArray(obj) ? [] : Object.create(null)
  hashMap.set(obj, _obj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const item = obj[key]
      if (typeof item === 'object') {
        _obj[key] = deepClone(item, hashMap)
      } else {
        _obj[key] = item
      }
    }
  }
  return _obj
}

// parse()

function parse(obj, path) {
  let _pathArr = path
    .replace('[', '.')
    .replace(']', '')
    .split('.')
  let res = undefined
  _pathArr.forEach((key) => {
    res = res ? res[key] : obj[key]
  })
  return res
}

// var parsed1 = parse({ a: { b: [4, 2, 3] } }, 'a.b.0')
// var parsed2 = parse({ a: { b: [4, 2, 3], c: 'test' } }, 'a.c.m')
// console.log(parsed1)
// console.log(parsed2)

// 选择排序

function sorted(arr) {
  let minIndex
  let min
  let temp
  for (let i = 0; i < arr.length; i++) {
    minIndex = i
    temp = arr[i]
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < temp) {
        minIndex = j
      }
    }
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

// console.log(sorted([5, 4, 3, 2, 1]))

/**
 * {
    a:63,  会计师 - 8
    b:89,  六级 - 8
    c:47,  计算机 - 8
    d:24,  参加三种考试
    e:46,  参加两种46
    f: 15   不参加
}
 */

// 63 + 89 + 47 - 24 + 46 + 15 - 48 - 46

function fib2(n) {
  const arr = [0, 1]
  let index = 1
  let sum = 1
  if (n < 2) {
    return arr[index]
  }
  while (index < n) {
    sum = arr[arr.length - 2] + arr[arr.length - 1]
    arr.push(sum)
    index += 1
  }

  return arr[arr.length - 1]
}

// f(0) = 0  f(1)=1 f(2)=1 f(3)=2 f4=(3) f5=(5) f6=(8)
// console.time('fib')
// console.log(fib(37))
// console.timeEnd('fib')

// console.time('fib2')
// console.log(fib2(37))
// console.timeEnd('fib2')
function throttle(fn, delay) {
  let _previous = 0
  return function () {
    var _this = this
    var args = [].slice.call(arguments)
    const now = new Date().getTime()
    if (now - previous > delay) {
      fn.apply(_this, arguments)
      previous = now
    }
  }
}

// 求数组里面最大连续项的和
/**
 * i=0
 * j=1 j=2 j=3
 * -1  2  6 5 10->0,5
 * i = 1
 *
 * **/
function getMaxSum(arr) {
  let maxSum = arr[0]
  for (let i = 0; i < arr.length; i++) {
    let sum = 0
    for (let j = i + 1; j < arr.length; j++) {
      sum = sum + arr[j]
      if (sum > maxSum) {
        maxSum = sum
      }
    }
  }
  return maxSum
}

const a = [1, -2, 3, 4, -1, 5]

/**
 * null
 * undefined
 * boolean
 * number
 * string
 * symbol
 * bigint
 * Object
 * Function
 */

/**
 * 判断是否是NaN
 * isNaN 排除undefined null等
 */

function judgeNaN(num) {
  if (num === undefined || num === null) {
    return false
  }
  return isNaN(num)
}

/**
 * instanceof 判断基础类型
 * typeof 判断null为Object
 * Object.prototype.toString.call 判断类型比较完整
 *  isXXX api   Array.isArray  isNaN等
 */

/**
 * 普通函数this,谁调用，指向谁
 * 箭头函数没有this,所以不能改变箭头函数的this
 * 箭头函数的this只取决玉定义时的环境，无论谁调用都不会改变
 */

/**
 * 闭包
 * 假如一个函数能访问外部的变量，那么这个函数他就是一个闭包，而不是一定要返回一个函数
 *
 */

/**
 * new 操作符
 * 1. 新生成一个对象
 * 2. 将对象连接到构造函数原型上，并绑定this
 * 3. 执行构造函数代码
 * 4. 返回新的对象
 */

function create() {
  // 这个是返回的对象
  const obj = Object.create(null)
  // 得到构造函数
  const Con = [].shift.call(arguments)
  // 将对象的原型指向构造函数的原型上
  obj.__proto__ = Con.prototype
  // 执行构造函数
  let result = Con.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}

/**
 * 作用域可以理解为变量的可访问性，
 * 全局作用域
 * 函数作用域
 * 块级作用域
 * 什么是作用域
 * 什么是作用域链
 */

/**
 * 1. 每个对象都有一个__proto__属性，他指向一个对象，也就是原型
 * 2. 每个对象的原型都可以通过constructor 找到构造函数，构造函数也可以通过prototype找到原型
 * 3. 所有对象都可以通过 __proto__ 找到 Object 对象
 * 4. 所有对象都可以通过 __proto__ 找到 Object 对象
 * 5. 对象之间通过 __proto__ 连接起来，这样称之为原型链。当前对象上不存在的属性可以通过原型链一层层往上查找，直到顶层 Object 对象，再往上就是 null 了
 */

/**
 * 继承
 * es6继承的字类需要通过super才能拿到父类，ES5 的话是通过 apply 这种绑定的方式
 * 类声明不会提升，和 let 这些一致
 */

function Super() { }

Super.prototype.getNumber = function () {
  return 1
}

/**
 * 深浅拷贝
 * 浅拷贝
 * object.asssg  扩展运算符
 * 深拷贝
 * 递归 weakMap 避免循环引用
 */

/**
 * Promise
 * 三个状态 pending fulfilled reject
 */

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

new Promise((resolve, reject) => {
  resolve(1)
})
  .then(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    }
  )
  .then(
    (res) => { },
    (err) => err
  )
// https://juejin.cn/post/6947860760840110088?utm_source=gold_browser_extension#heading-24
class MyPromise {
  constructor(executor) {
    this._status = STATUS.PENDING
    this._value = undefined
    this._resolveQueue = []
    this._rejectQueue = []

    const resolve = (value) => {
      const run = () => {
        if (this._status === STATUS.PENDING) {
          this._status = STATUS.FULFILLED
          this._value = value
          while (this._resolveQueue.length) {
            const callback = this._resolveQueue.shift()
            callback(value)
          }
        }
      }
      setTimeout(run)
    }

    const reject = (value) => {
      const run = () => {
        if (this._status === STATUS.PENDING) {
          this._status = STATUS.REJECTED
          this._value = value

          while (this._rejectQueue.length) {
            const callback = this._rejectQueue.shift()
            callback(value)
          }
        }
      }
      setTimeout(run)
    }

    executor(resolve, reject)
  }

  then(onFullfilled, onRejected) {
    typeof onFullfilled !== 'function'
      ? (onFullfilled = (value) => value)
      : null
    typeof onRejected !== 'function'
      ? (onRejected = (value) => value)
      : null
    return new MyPromise((resolve, reject) => {
      const resolveFn = value => {
        try {
          const x = onFullfilled(value)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }

      const rejectFn = error => {
        try {
          const x = onRejected(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }

      switch (this._status) {
        case STATUS.PENDING:
          this._resolveQueue.push(resolveFn)
          this._rejectQueue.push(rejectFn)
          break
        case STATUS.FULFILLED:
          resolveFn(this._value)
          break;
        case STATUS.REJECTED:
          rejectFn(this._value)
          break
      }
    })
  }

  catch(rejectFn) {
    return this.then(undefined, rejectFn)
  }

  finally(calllback) {
    return this.then(value => MyPromise.resolve(callback()).then(() => value), error => {
      MyPromise.resolve(callback()).then(() => error)
    })
  }

  // 静态resolve方法
  static resolve(value) {
    return value instanceof MyPromise ? value : new MyPromise(resolve => resolve(value))
  }

  // 静态reject方法
  static reject(error) {
    return new MyPromise((resolve, reject) => reject(error))
  }

  // 静态all方法
  static all(promiseArr) {
    let count = 0
    let result = []
    return new MyPromise((resolve, reject) => {
      if (!promiseArr.length) {
        return resolve(result)
      }
      promiseArr.forEach((p, i) => {
        MyPromise.resolve(p).then(value => {
          count++
          result[i] = value
          if (count === promiseArr.length) {
            resolve(result)
          }
        }, error => {
          reject(error)
        })
      })
    })
  }

  // 静态race方法
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(p => {
        MyPromise.resolve(p).then(value => {
          resolve(value)
        }, error => {
          reject(error)
        })
      })
    })
  }

}

const double = (x) => x * 2

const increment = (x) => x + 1

// console.log(a.map(double).map(increment))

const compose = (...fns) => {
  let result
  let len = fns.length
  return function (...args) {
    let count = len
    while (count > 0) {
      result = fns[count - 1].apply(null, count === len ? args : [result])
      count--
    }
    return result
  }
}

const compose = (...fns) => {
  return fns.reduce((acc, current) => value => {
    console.log(current(value))
    return acc(current(value))
  })
}

// const compose = (...fns) =>
//   fns.reduce((prevFn, nextFn) =>
//     (...args) => nextFn(prevFn(...args)),
//     value => value
//   );

// // console.log(compose(double, increment))

// const example = compose(
//   val => { console.log(1); return `1<${val}>`; },
//   val => { console.log(2); return `2<${val}>`; },
//   val => { console.log(3); return `3<${val}>`; }
// );

// var str = example('hello')
// console.log(str)
// console.log('done')

// const a = [1, -2, 3, 4, -1, 5]

// const sum = a.reduce((acc, current) => {
//   console.log('acc', acc)
//   console.log('current', current)
//   return acc + current
// }, 0)
// console.log(sum)

const fns = [double, increment, increment, double, increment]

var res = fns.reduce((acc, fn) => {
  return (...args) => {
    return acc(fn(...args))
  }
})

// console.log(res(10))

// const dfs = (n)

/**
 * 事件循环
 * 宏任务  同步代码、setTimeout 回调、setInteval 回调、IO、UI 交互事件、
 * postMessage、MessageChannel
 * 微任务  Promise 状态改变以后的回调函数（then 函数执行，如果此时状态没变，
 * 回调只会被缓存，只有当状态改变，缓存的回调函数才会被丢到任务队列）
 * 、Mutation observer 回调函数、queueMicrotask 回调函数
 *
 * JS 是个单线程语言，明白哪些是微宏任务、循环的顺序就好了
 */

/**
 * 
隐式转换（赋值迷惑人）
闭包
promise（注意return）
结构复制和默认值（注意undefined 和 null）
函数柯里化实现
 * 
 */

function curry(fn) {
  let len = fn.length

  return function t() {
    let argsLenth = arguments.length
    let args = [].slice.call(arguments)

    if (argsLenth >= len) {
      return fn.apply(undefined, args)
    }
    return function () {
      const totalArgs = args.concat([].slice.call(arguments))
      return t.apply(undefined, totalArgs)
    }
  }
}

function add(x, y, z) {
  return x + y + z
}

let curryAdd = curry(add, 1)

let result = curryAdd(1)(2)


const doSomething = ()=>{
  return Promise.resolve("1")
}

const doSomethingElse = ()=>{
  return Promise.resolve("2")
}


doSomething().then(doSomethingElse).then(res=>{
  console.log(res) // 2
})

doSomething().then(doSomethingElse()).then(res=>{
  console.log(res) // 1
})

doSomething().then(()=>doSomethingElse()).then(res=>{
  console.log(res) // 2
})

/**
 * Map 与Object
 * 1. 相同点
 * 都是以重 键值对 的对象
 * 2. 不同点
 * Object对象一般有原型，除非是使用Object.create(null)创建的
 * 在Object对象中，只能把String或Symbol作为key值，但是在Map中，key可以是任何基本类型，包括Object,undefined,Function，string等
 * 通过Map中的size属性，可以获取到Map长度
 * Map可以迭代，Object不可以，判断是否可迭代 typeof obj[Symbol.iterator] === 'function'
 */
/**
 * mvvm  vue实现
组件化  react
react 反向继承？
数组或对象的原生方法
webpack
vue2和vue3的区别

vue react  diff  区别
缓存   URL输入到渲染
hooks与class区别
继承
grid 布局
大量数据渲染 怎么不卡顿
eventloop
fiber
微任务宏任务
map  和 object  储存有什么区别
0.5像素实现
v8垃圾回收机制
generator
interface 与 class 区别
泛型
合成事件
es6新增特性
webpack plugin loader
webpack 分包

 */
