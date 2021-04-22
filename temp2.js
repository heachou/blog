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

console.log(isValid(')'))
// 性能优化： 
// 减少渲染，比如useMemo,memo,unstable_batchedUpdates,useCallBack,
// 父组件更新引起的子组件更新
// 接口缓存，适用于restful风格的接口，
// 某些接口延迟请求时机，避免请求堵塞
// 再次发起同一个请求前取消前一个接口 cancelToken
// 骨架屏展示
// cdn，图片lazyload，
//  -->