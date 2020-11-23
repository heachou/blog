---
title: axios 下载文件
date: 2020-11-06
categories:
 - 前端
tags:
 - axios
 - 文件下载
---

:::tip
如何使用axios下载文件？在此之前都是用a标签实现的下载？但是由于没有loading效果，体验不好
:::

<!-- more -->

## 使用a标签下载

```html
<a href="downloadUrl" target="_blank">下载</a>
```

## axios 下载
**注意必须使用下面的方式**

**注意必须使用下面的方式**

**注意必须使用下面的方式**
```js
axios ({
  url: '/web/v1/students/template',
  method: 'get',
  headers:{ // 必须指定header
    'Content-Type': 'application/json; application/octet-stream'
  },
  responseType: "blob" // 须指定返回类型
})
```
一定使用上面的调用方式 切不可使用 `axios.get()` 方式,否则获取到的文件打不开，提示损坏，

## example 下载excel

```js

function getExcel(id){
  return axios ({
    method: 'GET',
      url: '/web/v1/soft_versions/download',
      responseType: 'blob',
      headers:{
        'Content-Type': 'application/json; application/octet-stream'
      },
      params: { id },
  })
}

async function convertRes2Blob() {
  // 获取返回的文件数据
  let response = await getExcel()
  // 提取文件名
  let fileName
  try {
    let encodeFileName = response.headers['content-disposition']
      .split(';')[2]
      .split("filename*=utf-8''")[1]
    fileName = decodeURI(encodeFileName)
  } catch (error) {
    console.log(error)
  }
  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: 'application/json; application/octet-stream' })
  // 创建新的URL并指向File对象或者Blob对象的地址
  const blobURL = window.URL.createObjectURL(blob)
  // 创建a标签，用于跳转至下载链接
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', fileName)
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  // 挂载a标签
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  // 释放blob URL地址
  window.URL.revokeObjectURL(blobURL)
}
```