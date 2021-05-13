---
title: 树，二叉树
date: 2021-05-11
categories:
  - FE
tags:
  - js
  - data structure
---

:::tip
学习了解二叉树的相关知识
:::

<!-- more -->

## 什么是树

在计算机科学中，树是一种**分层的数据结构**

在前端中，常见的树有：

- dom 树
- 级联选择，省市区等
- 树形控件

在 js 中，没有树这种数据结构，但是我们可以用 Object 和 Array 来模拟树结构

```js
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
```

具有分层结构的都可以统称为 树

## 树的常见操作

- 深度/广度优先遍历
- 先中后序遍历

## 深度与广度优先遍历

1. 什么是深度优先遍历 (DFS)

> 从根节点出发，沿着左子树方向进行**纵向**遍历，直到找到叶子节点为止。然后回溯到前一个节点，进行右子树节点的遍历，直到遍历完所有可达节点为止

数据结构：栈

递归可以实现，递归就是一种栈的数据结构。凡是用递归能解决的，都可以用用栈解决

```js
// 递归
const dfs = (root) => {
  console.log(root.val)
  root.children.forEach(dfs)
}

// 栈实现
// 1. 新建栈，队头入栈
// 2. 出栈，访问
// 3. 将出栈的元素的右子树和左子树分别入栈
// 4. 重复2，3，步骤，知道栈为空
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
```

2. 什么是广度优先遍历 （BFS）

> 从根节点出发，在*横向*遍历二叉树层段节点的基础上纵向遍历二叉树的层次。

数据结构：队列

- 新建一个队列，根节点入队
- 队头出队，并且访问，
- 对头的 children 入队
- 重复 2，3 步骤，知道队列为空

```js
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
```

## 二叉树的先中后序遍历

二叉树

> 树的每个节点最多只有两个节点

js 中可以用 Object 来模拟二叉树

```js
const tree = {
  val: 'a',
  left: {
    val: 'b',
    left: null,
    right: {
      val: 'e',
      left: {
        val: 'f',
        left: null,
        right: null,
      },
      right: null,
    },
  },
  right: {
    val: 'c',
    left: {
      val: 'd',
      left: null,
      right: null,
    },
    right: null,
  },
}
```

1. 先序遍历

- 访问根节点
- 对根节点的左子树进行先序遍历
- 对根节点的右子树进行先序遍历

```js
// 递归版本
const preorder = (root) => {
  if (!root) {
    return
  }
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
}

// 栈实现
const preorder = (root) => {
  const stack = [root]
  while (stack.length) {
    const top = stack.pop()
    console.log(top.val)
    top.right && stack.push(top.right)
    top.left && stack.push(top.left)
  }
}
```

2. 中序遍历

- 对根节点的左子树进行中序遍历
- 访问根节点
- 对根节点的右子树进行中序遍历

```js
// 递归版本
const inorder = (root) => {
  if (!root) {
    return
  }
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}
// 非递归版本
const inorder = (root) => {
  if (!root) {
    return
  }
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
```

3. 后序遍历

- 对根节点的左子树进行后序遍历
- 对根节点的右子树进行后序遍历
- 访问根节点

```js
// 递归版本
const postorder = (root) => {
  if (!root) {
    return
  }
  postorder(root.left)
  postorder(root.right)
  console.log(root.val)
}

// 非递归版本
const postorder = (root) => {
  if (!root) {
    return
  }
  const stack = [root]
  const outputStack = []
  while (stack.length) {
    const t = stack.pop()
    outputStack.push(t)
    t.left && stack.push(t.left)
    t.right && stack.push(t.right)
  }
  while (outputStack.length) {
    const t = outputStack.pop()
    console.log(t.val)
  }
}
```

## 例子

定义

```js
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
```

1. 例子 1

[二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明:  叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
// 最大深度，所以用到树的深度优先遍历算法
// 深度优先，取深度的最大值

var maxDepth = function(root) {
  let max = 0
  const dfs = (root, n) => {
    if (!root) {
      return
    }
    if (!root.left && !root.right) {
      max = Math.max(max, n)
    }
    dfs(root.left, n + 1)
    dfs(root.right, n + 1)
  }
  dfs(root, 1)
  return max
}
```

---

2. 例子 2

[二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。

```md
输入：root = [3,9,20,null,null,15,7]
输出：2
```

最小深度，当然事层序遍历，就是广度优先 (bfs)

```js
var minDepth = function(root) {
  if (!root) {
    return 0
  }
  const q = []
  q.push([root, 1])
  while (q.length) {
    const [item, level] = q.shift()
    if (item && !item.left && !item.right) {
      return level
    }
    item.left && q.push([item.left, level + 1])
    item.right && q.push([item.right, level + 1])
  }
}
```

--- 

例子三：


