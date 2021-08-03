---
title: React Hooks
date: 2021-02-21
categories:
  - FE
tags:
  - react
---

## 初衷与问题

- 类组件之间难以复用状态逻辑
- 类的方式一般可以继承，但类组件之间是不会相会继承的

  > 比如说，我们创建了一个 Button 组件，再创建一个 DropDownButton，我们并不会让 DropDownButton 继承自 Button

- 函数式组件更适合 state=>view 这样的一个逻辑关系。

> 类组件我们复用状态逻辑时，过去常见的解决方案是高阶组件、render props 及状态管理框架，但是 React 并没有提供 API 来解决.

```js
const isLogin = () => {
  return !!localStorage.getItem('token')
}
const checkLogin = (WrappedComponent) => {
  return (props) => {
    return isLogin() ? <WrappedComponent {...props} /> : <LoginPage />;
```

- 复杂的组件变得难以理解

> 比如常见的订阅与取消没有直接关联在一起，而是通过生命周期函数去使用，这就导致组件难以分解，状态逻辑分散。

- 人和机器都容易混淆类

1. 值捕获问题
2. 需要用 bind 函数来绑定事件。虽然现在我们都通过了类属性的方案，也可以使用 Babel 插件提前开发了，但整个提案仍然是草案的阶段，还不稳定；

- 难以做编译优化。

## 使用限制

1. 不能在 React 的循环、条件或嵌套函数中调用 Hook。需要在顶级作用域使用
2. 在 React 的函数组件中调用 Hook。

因为 Hooks 的设计是基于数组实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook。当然，实质上 React 的源码里不是数组，是链表。

## useEffect：

## useCallback: 缓存回调函数

## useMemo：缓存变量

useCallback 的功能其实是可以用 useMemo 来实现的，只需要在 useMemo 的 callback 返回一个函数即可

```js
const myEventHandler = useMemo(() => {
  // 返回一个函数作为缓存结果
  return () => {
    // do something
  }
}, [dep1, dep2])
```

## useRef: 多次渲染之间共享数据

useRef 保存的数据一般是合 UI 的渲染无关的，因此当 ref 的值发生变化时候，是不会触发组件的重新渲染。useRef 还有一个重要的功能就是保存某个 DOM 节点的引用。

## useContext: 定义全局状态

函数签名

```js
const value = useContext(MyContext)
```

例子：

```js
const themes = {
  light: {
    background: '#333',
  },
  dark: {
    background: '#999',
  },
}

const ThemeContext = React.createContext(themes.light)

function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={themes[theme]}>
      <ThemeButton />
    </ThemeContext.Provider>
  )
}

function ThemeButton() {
  const theme = useContext(ThemeContext)
  return <button style={{ background: theme.background }}>按钮</button>
}
```

## 如何创建自定义的 Hooks

规则：

- 声明一个名字以 use 开头的函数

例子-：

```js
function useCount(initial) {
  const [count, setCount] = useState(initial)
  const add = useCallback(() => setCount(count + 1), [count])
  const minus = useCallback(() => setCount(count - 1), [count])
  return { count, add, minus }
}

function App() {
  const { count, add, minus } = useCount(0)
  // ...
}
```

例子二：

```js
const useAsync = (asyncFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const execute = useCallback(() => {
    setLoading(true)
    setData(null)
    setError(null)
    return asyncFunction()
      .then((response) => {
        setData(response)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [asyncFunction])
  return { execute, loading, data, error }
}

function App() {
  const { execute: getUsers, data: users, loading, error } = useAsync(
    async () => {
      const res = await axios.get('https://url')
      return res
    }
  )
  return (
    // ... render ui
  )
}
```
