const path = require('path')

Promise.resolve().then(()=>{
  console.log(3)
})

process.nextTick(()=>{
  console.log(1)
})

console.log(2)

// console.log(require)

// console.log(this)

// console.log(global)

console.log(process.cwd()) // 执行目录

console.log(__dirname) // 执行文件所在的文件夹

console.log(__filename) // 执行文件的路劲

console.log(path.resolve()) // 执行目录

setTimeout(()=>{
  console.log('timeout')
},0)

console.log(process.platform) // win32

console.log(process.argv)

