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

console.log(res(10))


