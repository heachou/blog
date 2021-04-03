---
isShowComments: false
---

# react l

> hello

## 0  xxx

## 1 XX

```js
function curry(fn){
  const len = fn.length;
  return function t(){
    let _args = [].slice.call(arguments)
    if(len === _args.length){
      return fn.call(null,..._args)
    }else{
      return function(){
        let allArgs = _args.concat([].slice.call(arguments))
        return t.apply(undefined,allArgs)
      }
    }
  }
}

```