function isValid(s) {
  const stack = []
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i]
    const topChar = stack[stack.length - 1]
    if (
      (c === '}' && topChar === '{') ||
      (c === ']' && topChar === '[') ||
      (c === ')' && topChar === '(')
    ) {
      stack.pop()
    } else {
      stack.push(c)
    }
  }
  return stack.length === 0
}

// console.log(isValid(')'))
// 性能优化：
// 减少渲染，比如useMemo,memo,unstable_batchedUpdates,useCallBack,
// 父组件更新引起的子组件更新
// 接口缓存，适用于restful风格的接口，
// 某些接口延迟请求时机，避免请求堵塞
// 再次发起同一个请求前取消前一个接口 cancelToken
// 骨架屏展示
// cdn，图片lazyload，
//  -->

var RecentCounter = function() {
  this.arr = []
}

RecentCounter.prototype.ping = function(t) {
  this.arr.push(t)
  let head = this.arr[0]
  while (t - head > 3000) {
    this.arr.shift()
    head = this.arr[0]
  }
  return this.arr.length
}

var obj = new RecentCounter()
// console.log(obj.ping(1))
// console.log(obj.ping(2))
// console.log(obj.ping(3))
// console.log(obj.ping(4000))

const MyInstanceOf = (A, B) => {
  let p = A
  while (p) {
    if (p === B.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
}

// console.log(MyInstanceOf(1, Number))

var isValid = function(s) {
  const stack = []
  const map = new Map()
  map.set('(', ')')
  map.set('[', ']')
  map.set('{', '}')
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (map.has(c)) {
      stack.push(c)
    } else {
      const t = stack[stack.length - 1]
      if (map.get(t) === c) {
        stack.pop()
      }
    }
  }
  return stack.length === 0
}

var lengthOfLongestSubstring = function(s) {
  const map = new Map()
  let max = 0
  let l = 0
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r])) {
      l = map.get(s[r]) + 1
    }
    map.set(s[r], r)
    max = Math.max(max, r + 1 - l)
  }
  return max
}

lengthOfLongestSubstring('abba')

var minWindow = function(s, t) {
  const map = new Map()
  let str = ''
  let l = 0

  for (let c of t) {
    map.set(c, map.has(c) ? map.get(c) + 1 : 1)
  }

  let needType = map.size

  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r])) {
      map.set(s[r], map.get(s[r]) - 1)
      if (map.get(s[r]) === 0) {
        needType -= 1
      }
    }
    while (needType === 0) {
      if (!str || s.slice(l, r + 1).length < str.length) {
        str = s.slice(l, r + 1)
      }
      if (map.has(s[l])) {
        map.set(s[l], map.get(s[l]) + 1)
        if (map.get(s[l]) === 1) {
          needType += 1
        }
      }
      l += 1
    }
  }
  return str
}

// minWindow('ADOBECODEBANC', 'ABCC')

const tree = {
  val: '1',
  children: [
    {
      val: '2-1',
      children: [
        {
          val: '2-1-1',
          children: [],
        },
      ],
    },
    {
      val: '2-2',
      children: [
        {
          val: '2-2-1',
          children: [],
        },
      ],
    },
  ],
}

// const dfs = (root) => {
//   console.log(root.val)
//   root.children.forEach(dfs)
// }

const dfs = (root) => {
  const stack = []
  stack.push(root)
  while (stack.length) {
    const t = stack.pop()
    console.log(t.val)
    if (t.children.length) {
      t.children[1] && stack.push(t.children[1])
      t.children[0] && stack.push(t.children[0])
    }
  }
}

dfs(tree)

const bfs = (root) => {
  const q = []
  q.push(root)
  while (q.length) {
    console.log(q[0].val)
    if (q[0].children) {
      q.push(...q[0].children)
    }
    q.shift()
  }
}

// bfs(tree)

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  let max = 0
  const dfs = (root, n) => {
    console.log(root.val)
    max = n
    const children = []
    root.left && children.push(root.left)
    root.right && children.push(root.right)
    children.forEach((child) => dfs(child, n + 1))
  }
  dfs(root, 0)
  return max
}

var minDepth = function(root) {
  if (!root) {
    return 0
  }

  const q = []
  q.push([root, 1])
  while (q.length) {
    const [item, level] = q[0]
    if (!item.left && !item.right) {
      
      return level
    }
    item.left && q.push(item.left, level + 1)
    item.right && q.push(item.right, level + 1)
    q.shift()
  }
}

var levelOrder = function(root) {
  if(!root){
    return []
  }
  const res = []
  const q  = [[root,0]]
  while(q.length){
    const [n,l] = q.shift()
    if(n.left){
      res[l] = res[l] ? res[l].push(n.left): [n.left]
    }
    if(n.right){
      res[l] = res[l] ? res[l].push(n.right): [n.right]
    }
    n.left && q.push(n.left)
    n.right && q.push(n.right)
  }
  return res
};
