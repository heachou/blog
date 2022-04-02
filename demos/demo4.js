function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

// 中序遍历
var inorderTraversal = function(root) {
  if (!root) {
    return []
  }
  const res = []
  const stack = []
  let p = root
  while (stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    const t = stack.pop()
    console.log(t.val)
    p = t.right
  }
}

var hasPathSum = function(root, targetSum) {
  if (!root) {
    return false
  }
  const stack = []
  stack.push([root, 0])
  while (stack.length) {
    const [t, v] = stack.pop()
    if (!t.left && !t.right) {
      // 叶子节点
      if (t.val + v === targetSum) {
        return true
      }
    }
    t.left && stack.push([t.left, t.val + v])
    t.right && stack.push([t.right, t.val + v])
  }
  return false
}

const json = {
  a: { b: { c: 1 } },
  d: [2, 3],
}

function travel(json) {
  if (typeof json !== 'object') return
  for (let key in json) {
    console.log(json[key])
    travel(json[key])
  }
}

