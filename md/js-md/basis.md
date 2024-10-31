# Javascript 基础

## 数据类型

### 基础类型

- `string` 字符串
- `number` 数字
- `boolean` 布尔值
- `null`
- `undefined`
- `symbol` 唯一值接收字符串为参数
- `bigint` 主要用于管理很大或很小的数据（超过 `Number.MAX_SAFE_INTEGER` 或小于 `Number.MIN_SAFE_INTEGER`）

### 复杂类型

- `Objec` 对象
- `Array` 数组
- `Function` 函数
- `RegExp` 正则表达式
- `Date` 日期
- `Set` 集合 类似数组成员唯一，允许你储存任何类型的唯一值，不会有隐式转换
- `Map` 映射 类似对象，键值可以是任意类型，具有极快的查找速度

## 变量

### 声明

let 与 const 有独立块级作用域

- `var` 变量会提升 值可修改 申明不赋值可访问(undefined)
- `let` 不会提升 值可修改 申明不赋值可访问(undefined)(无提升所以在输出后进行定义也会报错 ReferenceError)
- `const` 不会提升 值不可修改 暂时性死区直接报错 ReferenceError _这个声明为常量_

### 作用域

#### 概念

是什么：作用域是变量起作用的范围或者区域

分类：

- 全局作用域
- 函数作用域
- 块级作用域

块级作用域：非函数的花括号才能形成，遇到 let 和 const

作用域是虚拟的，看不见摸不着也打印不出来，代码写完就有了（定义完成就形成了）

#### 作用

隔离变量，防止变量污染

### 作用域链

是什么：

​ 程序查找变量的一个过程(找不到就报错-引用错误)，它是真实存在的，本质是一个数组，数组里面存储的各个执行上下文的变量对象

变量对象是从内到外的函数执行时所形成的执行上下文当中的变量对象 [最内部的变量对象 local，中间的变量对象，...，最外部的函数,global]

为什么：

​ 查找变量，给变量赋值 读取变量值去使用

注意：

​ 作用域是虚拟的，代码写完或者函数定义完成即行

​ 作用域链是函数调用的时候才形成,真实存在的

## == 和 ===有什么区别

== 只比较值，不比较类型，会有隐式转换发生

- 两边的类型是否相同，相同的话就比较值的大小，例如 1==2，返回 false
- 判断的是否是 null 和 undefined，是的话就返回 true
- 判断的类型是否是 String 和 Number，是的话，把 String 类型转换成 Number，再进行比较
- 判断其中一方是否是 Boolean，是的话就把 Boolean 转换成 Number，再进行比较
- 如果其中一方为 Object，且另一方为 String、Number 或者 Symbol，会将 Object 转换成字符串，再进行比较,例：

```js
console.log({ a: 1 } == true); //false
console.log({ a: 1 } == "[object Object]"); //true
```

=== 叫做严格相等，是指：左右两边不仅值要相等，类型也要相等

## Math.floor 和 parseInt

Math.floor() 向下取整，返回小于或等于一个给定数字的最大整数

parseInt() 负数会向上取整，正数会向下取整，会忽略数字后面的非数字字符串

```js
console.log(Math.floor(4.66)); //4
console.log(parseInt(4.66)); //4

console.log(Math.floor(-4.66)); //-5
console.log(parseInt(-4.66)); //-4
```
