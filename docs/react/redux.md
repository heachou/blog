---
title: redux
date: 2021-08-06
categories:
  - FE
tags:
  - react
  - redux
---
## 基础流程

1. 创建 store

```js
import { createStore } from 'redux'

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'counter/increment':
      return { value: state.value + 1 }
    case 'counter/increment':
      return { value: state.value - 1 }
    default:
      return state
  }
}

const store = createStore(reducer)
```

2. 利用 Action 和 reducer 修改 store

```js
// ...
const incrementAction = { type: 'counter/increment' }
store.dispatch(incrementAction)
```

3. 最后利用 subscribe 监听 store 的变化

```js
// ...
store.subscribe(() => {
  console.log(store.getState())
})
```

_注意_：

在 Reducer 中，我们每次都必须返回一个新的对象，确保不可变数据（immutable）的原则。

## 流程

View->dispatch->action->reducer->state->subscribe->view

![流程图](./flow.png)

## 使用 redux 处理异步逻辑 异步action

Redux 中的 action 不仅仅可以是一个 Object,可以是任何东西，也可以是一个函数，redux 提供了 redux-thunk 这样一个中间件，如果发现接收到的 action 是一个函数，那么就不会传递给 reducer,而是执行这个函数，并把 dispatch 作为参数传递给这个函数。因此在函数中，可以决定何时发送 Action

```js
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

const composeEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, composeEnhancer)
```

`fetchData.js`

```js
function fetchData() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_DATA_BEGIN' })
    fetch('/url')
      .then((res) => {
        dispatch({ type: 'FETCH_DATA_SUCCESS', data: res })
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_DATA_ERROR', data: err })
      })
  }
}
```

`index.jsx`

```js
import fetchData from './fetchData'
function DataList() {
  const dispatch = useDispatch()
  dispatch(fetchData())
  return (
    // .....
  )
}
```
