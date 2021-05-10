---
title: 字典
date: 2021-05-07
categories:
  - FE
tags:
  - js
  - data structure
---

:::tip
学习了解字典的相关知识
:::

<!-- more -->

## 什么是字典

字典是一种存储唯一值的数据结构，是以键值对的形式来存储。

## js 中的字典

es6 中的字典 `Map`

字典的常用操作

键值对的增删改查

```js
const map = new Map()

// 增
map.set('a', 'aa')
map.set('b', 'bb')

// 查
map.get('a')

// 删
map.delete('b')

// 删除所有
// map.clear()

// 修改
map.set('a', 'aaa')
```

## 例子

[两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

给定两个数组，编写一个函数来计算它们的交集。

```js
var intersection = function(num1, nums2) {
  const map = new Map()
  nums1.forEach((num) => {
    map.set(num, 1)
  })
  const result = []
  for (let i = 0; i < nums2.length; i++) {
    const num = nums2[i]
    if (map.get(num)) {
      result.push(num)
      map.delete(num)
    }
  }
  return result
}
```

---

例 2：

[有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

给定一个只包括 '('，')'，'{'，'}'，'['，']'  的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

```
输入：s = "()"
输出：true

输入：s = "()[]{}"
输出：true

输入：s = "(]"
输出：false

```

coding

```js
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
```

---

例子 3：

[两数之和](https://leetcode-cn.com/problems/two-sum/)

给定一个整数数组 nums  和一个整数目标值 target，请你在该数组中找出 和为目标值 的那   两个   整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

coding

```js
var twoSum = function(nums, target) {
  const map = new Map()
  nums.forEach((num, index) => {
    map.set(num, index)
  })
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i]
    if (map.has(diff) && map.get(diff) !== i) {
      return [i, map.get(diff)]
    }
  }
}
```

---

例子 4：

[无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

```
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。


输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

```

coding

```js
// 双指针，维护一个滑动窗口
// 遇到重复字符(重复字符位于滑动窗口内)，将左指针移动到滑动窗口的下一位
// 记录字符的长度，返回最大字符
var lengthOfLongestSubstring = function(s) {
  const map = new Map()
  let max = 0
  let l = 0
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r]) && map.get(s[r]) >= l) {
      // 重复字符位于滑动窗口内
      l = map.get(s[r]) + 1
    }
    map.set(s[r], r)
    max = Math.max(max, r + 1 - l)
  }
  return max
}
```

---

例子 5：

[最小覆盖字串](https://leetcode-cn.com/problems/minimum-window-substring/)

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-window-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"

输入：s = "a", t = "a"
输出："a"
```

coding

```js

// 最小字串里面的字符可以重复

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

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
```
时间复杂度 O（m+n）,m为t的长度，n为s的长度
空间复杂度 O (m),开辟的字典空间

害，也忒复杂了，心情复杂
