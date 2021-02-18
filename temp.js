function arrayToTree(arr, key, pKey) {
  // 找到第一层
  const parents = arr.filter(p => p[pKey] === 0)
  // 找到子层
  const children = arr.filter(c => c[pKey] !== 0)

  function _handleData(pArr, cArr) {
    pArr.map(p => {
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