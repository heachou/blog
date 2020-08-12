---
title: js 中 toFixed 的bug
date: 2020-08-05
categories:
 - 前端
tags:
 - js
---

:::tip
number.toFixed 方法常用于四舍五入计算，但是今天遇到了bug，于是记录下来
:::

<!-- more -->

# js 中 toFixed 的bug

今天遇到了一个莫名奇妙的bug，公司测试大佬告诉我，页面上有个地方四舍五入值不对！

## (0.15).toFixed(1) !== "0.2"
是的， 讲道理  (0.15).toFixed(1) 应该是等于 0.2 的，可是结果就是0.1，感觉到不可思议，控制台运行一遍看下
![toFixed test](./images/tofixed.jpg)

果然如此！！！开了眼界

## 解决方式

- 重写Number原型上的toFixed 方法

```js
Number.prototype.toFixed = function (decimal) {
  let number = this
  decimal = decimal || 0;
  var s = String(number);
  var decimalIndex = s.indexOf('.');
  if (decimalIndex < 0) {
    var fraction = '';
    for (var i = 0; i < decimal; i++) {
      fraction += '0';
    }
    return s + '.' + fraction;
  }
  var numDigits = s.length - 1 - decimalIndex;
  if (numDigits <= decimal) {
    var fraction = '';
    for (var i = 0; i < decimal - numDigits; i++) {
      fraction += '0';
    }
    return s + fraction;
  }
  var digits = s.split('');
  var pos = decimalIndex + decimal;
  var roundDigit = digits[pos + 1];
  if (roundDigit > 4) {
    //跳过小数点
    if (pos == decimalIndex) {
      --pos;
    }
    digits[pos] = Number(digits[pos] || 0) + 1;
    //循环进位
    while (digits[pos] == 10 && pos !== 0) {
      digits[pos] = 0;
      --pos;
      if (pos == decimalIndex) {
        --pos;
      }
      digits[pos] = Number(digits[pos] || 0) + 1;
    }
  }
  //避免包含末尾的.符号
  if (decimal == 0) {
    decimal--;
  }
  return digits.slice(0, decimalIndex + decimal + 1).join('');
}
```

