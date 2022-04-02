// 工厂模式  
function Factory(type) {
  switch (type) {
    case 'type1':
      return new Type1()
    case 'type2':
      return new Type2()
    case 'type3':
      return new Type3()
  }
}


// 建造者模式  类似搭积木
//  模块1
function Mode1() {}
// 模块2
function Mode2() {}
// 最终使用的类
function Final() {
  this.mode1 = new Model()
  this.mode2 = new Mode2()
}


// 单例模式，单例模式的做法不是很固定，我们更重要的记住是保证全局只有一个对象的思想
// 作为单例实例化的对象
let SingLeton = function(name) {
  this.name = name
}
/*
在SingLeton挂在一个getInstance方法，只能通过getInstance方法来获取
SingLeton的实力化对象
*/
SingLeton.getInstance = function(name) {
  if (this.instance) {
    return this.instance
  }
  return (this.instance = new SingLeton(name))
}

const a  = SingLeton.getInstance("test")

// 上述实现需要通过getInstance来获取对象，与通常的new 关键字来获取对象有出入，应该屏蔽掉这种差异

// 单例构造函数
function CreateSingleton (name) {
  this.name = name;
  this.getName();
};

// 获取实例的名字
CreateSingleton.prototype.getName = function() {
  console.log(this.name)
};
// 单例对象
var Singleton = (function(){
  var instance;
  return function (name) {
      if(!instance) {
          instance = new CreateSingleton(name);
      }
      return instance;
  }
})();

// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

console.log(a===b);


// 单例模式例子
// store 全局数据储存

function Store(){
  this.state = {}
  if(Store.install){
    return Store.install
  }
  Store.install = this
}

Store.install = null

var s1 = new Store()
var s2 = new Store()
s1.state.a = 1
console.log(s1, s2) // store { state: { a: 1 } } store { state: { a: 1 } }


// 工厂模式：如果你写的模块，需要大量创建类似的对象

// 建造者模式：需要创建一个需要大量参数，且内部模块庞大

// 单例模式：防止重复注册，防止有多个对象互相干扰


// 好的复用
// 1. 对象可以再重复使用
// 2. 重复代码少
// 3. 模块功能单一


// 桥接模式
// 有三种形状，每种形状都有3种颜色
function rect(color) {
  //矩形
  showcolor(color)
}
function circle() {
  // 圆形
  showcolor(clor)
}
function delta(color) {
  // 三角形
  showcolor(clor)
}

new circle('red')

//  享元模式
// 有一百种不同文字的弹窗，每种弹窗行为相同，但是文字和样式不同，我们没必要新间一百个弹窗对象
function Pop(){
}
// 保留同样的行为
Pop.prototype.action=function(){}
//显示
Pop.prototype.show=function(){}
// 提取出每个弹窗不同的部分作为一个外部数组
var popArr=[
    {text:"window1",style:[400,400]}
    {text:"window2",style:[400,200]}
]

var poper=new Pop()

for(var i=0;i<100;i++){
    poper.show(popArr[i])
}
// 只需一个类，不需要 new 一百次弹窗
// 这个类只保留所有弹窗共有的，每个弹窗不同的部分留作为一个公共享元


