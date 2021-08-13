---
title: 实现一个useForm Hook
date: 2021-08-12
categories:
  - FE
tags:
  - react
---

## code

```js
// 提供初始值
// 提供validators 对象，用于验证字段
const useForm = (initialValue = {}, validators) => {
  const [values, setValues] = useState(initialValue)
  const [errors, setErrors] = useState({})

  const setFieldValue = useCallback((key,value) => {
    setValues((values)=>{
      ...values,
      [key]: value
    })
    if(validators){ // 字段验证
      const errMsg = validators[key](value)
      setErrors((err)=>{
        ...err,
        [key]: errMsg || null
      })
    }
  }, [validators])
  return { values, setFieldValue, errors }
}
```

## 使用

```js
function MyForm() {
  const validators = useMemo(() => {
    return {
      name: (value) => {
        if (value.length < 2) return 'Name length should be not less than 2.'
        return null
      },
      email: (value) => {
        if (!value.includes('@')) {
          return '无效的邮箱'
        }
        return null
      },
    }
  }, [])

  const { values, errors, setFieldValue } = useForm()
  return (
    // ...
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setFieldValue('name', e.target.value)} />
      <div> {errors['name']}</div>
    </form>
  )
}
```


当前的校验对象，只支持同步的验证，如果，我们想支持异步校验，