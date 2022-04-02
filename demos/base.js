// number string boolean undefined null symbol bigInt object

// ReferenceError 
// TypeError

// 数组去重
// 1. 借助Set
[...new Set([1,2,3,4,5,4,3,21])]

// 2. reduce
const unique = (arr)=>{
  let hash = {}
  return arr.reduce((prev,current)=>{
    if(!hash[current]){
      prev.push(current)
      hash[current] = true
    }
    return prev
  },[])
}

// this
// 1. this在函数执行时才能确定指向，在定义时候无法确定，一般来说，谁调用就指向谁
// 2. 
