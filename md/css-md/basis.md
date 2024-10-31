# CSS 基础相关

## CSS3 新特性

1. 新增了选择器

- `:last-child` 匹配父元素的最后一个子元素
- `:nth-child(n)` 匹配父元素的第 n 个子元素

2. 边框特性

- `border-radius` 圆角

3. 颜色与不透明度

- `opacity: 0.5;`
- `color: rgba(0, 0, 0, 0.5)`

4. 阴影

- `text-shadow` 文字阴影
- `box-shadow` 盒子阴影

5. transform 变形

- `transform: rotate(9deg)` 旋转
- `transform: scale(0.5)` 缩放
- `transform: translate(100px, 100px)` 位移

6. 过渡与动画

- `transition` 过渡
- `animation` 动画

7. 媒体查询

- `@media` 用来做响应式布局

## 盒模型

1. 概念

**页面渲染时，DOM 元素所采用的布局模型。** 可通过 box-sizing 进行设置。

#2. 分类

根据计算宽高的区域可分为：

1. content-box (W3C 标准盒模型)

当给元素设置 width 和 height 时，只会改变 width + height。

2. border-box (IE 盒模型)

当给元素设置 width 和 height 时，会改变 width + height + padding。

3. padding-box (浏览器未实现)
4. margin-box (浏览器未实现)

## BFC

1. 概念

BFC，又称为块级格式化上下文，指的是：**一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。**

2. 触发条件（开启 BFC）

- 设置浮动，不包括 none
- 设置定位，absolute 或者 fixed
- 行内块显示模式，inline-block
- 设置 overflow，即 hidden，auto，scroll
- 表格单元格，table-cell

3. 具体规则

- BFC 是一个块级元素，块级元素在垂直方向上依次排列。
- BFC 是一个独立的容器，内部元素不会影响容器外部的元素。
- 属于同一个 BFC 的两个盒子，外边距 margin 会发生重叠，并且取最大外边距。
- 计算 BFC 高度时，浮动子元素也要参与计算。

4. 应用

- 阻止 margin 重叠,给盒子开启 bfc
- 清除浮动，给父元素开启 bfc,防止高度塌陷，因为计算 BFC 高度时，浮动子元素也要参与计算。
- 给标准流元素开启 bfc 阻止标准流元素被浮动元素覆盖

## 选择器权重&优先级

- `!important` > `行内样式` > `#id` > `.class` > `tag` > `*` > `继承` > `默认`

## 元素水平、垂直居中

### 水平居中

行内元素：

- text-align: center;

块级元素：

- 确定宽度的：

  1. margin: 0 auto;
  2. 父元素 position: relative,子元素绝对定位并设置 margin-left: -width/2

- 不确定宽度的：
  1. display:table，margin：0 auto
  2. display：inline-block，text-align:center
  3. display：flex，justify-content:center
  4. display：grid，justify-content:center
  5. 父元素 相对定位，子元素绝对定位，+transform，translateX 可以移动本身元素的 50%。

### 垂直居中

- 纯文本利用 line-height 设置于元素高度一致实现居中
- 通过设置父容器相对定位，子级设置绝对定位，margin 实现自适应居中
- 父级设置 display: flex; 子级设置 margin 为 auto 实现自适应居中
- 父级设置相对定位，子级设置绝对定位，并且通过位移 transform 实现
- table 布局，父级通过转换成表格形式，然后子级设置 vertical-align 实现。（需要注意的是：vertical-align: middle 使用的前提条件是内联元素以及 display 值为 table-cell 的元素）

## flex 布局

1. 概念

Flex 是 Flexible Box 的缩写，意为**"弹性布局"**，用来为盒状模型提供最大的灵活性。采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。容器默认存在两根轴：主轴和交叉轴（也叫做侧轴）。默认水平方向的为主轴，垂直方向为侧轴。

2. 容器的属性

- `flex-direction` 定义主轴的方向
- `flex-wrap` 定义是否换行
- `flex-flow` 是 flex-direction 属性和 flex-wrap 属性的简写形式
- `justify-content` 定义项目在主轴上的对齐方式
- `align-items` 定义项目在侧轴上的对齐方式
- `align-content` 定义换行的项目在侧轴上如何对齐

3. 项目的属性

- `order` 定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
- `flex-grow` 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
- `flex-shrink` 定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
- `flex-basis` 定义了在分配多余空间之前，项目占据的主轴空间。它的默认值为 auto，即项目的本来大小。
- `flex` 是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。
- `align-self` 允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。
  扩展：flex: 1 代表什么含义？
- `flex-grow: 1`  如果存在剩余空间, 该项目会放大。
- `flex-shrink: 1`  如果剩余空间不足，该项目会缩小。
- `flex-basis: 0%`  设置为 0% 之后，即不占据主轴空间，但是因为有 flex-grow 和 flex-shrink 的设置，该项目会自动放大或缩小。

## CSS3 新特性

- 新的选择器：
- 边框属性： 如 border-radius、box-shadow、border-image
- 背景属性： 如 background-clip、background-origin、background-size 和 background-break
- 文字属性：word-wrap、text-shadow、text-overflow
- 颜色：rgba 分为两部分，rgb 为颜色值，a 为透明度、hsla 分为四部分，h 为色相，s 为饱和度，l 为亮度，a 为透明度
- transition，transform，animation，渐变，弹性布局网格布局

## CSS 预处理器(Sass/Less/Stylus)

1. 概念

- CSS 预处理器定义了一种新的语言，主要是通过用一种专门的编程语言，为 CSS 添加一些编程特性，再编译生成 CSS 文件。
- 它可以帮助我们编写可维护的、与时俱进的代码，也可以减少需要编写的 CSS 数量，对于那些需要大量样式表和样式规则的大型用户界面是非常有帮助的。
- CSS 预处理器可以更方便的维护和管理 CSS 代码，让整个网页变得更加灵活可变。
- scss 和 sass 其实一样 写法有些区别 sass 类似 stylus 的简写 scss 不能简写 less 写法
- CSS 选择器浏览器是 **从右往左** 依次解析 ，所以不建议嵌套写，要嵌套的时候层次少一点

2. 功能

- 两种 scss 的用法 scss 和 sass sass 类似 stylus 的简写 scss 和 less 一样

- 可以使用变量、常量。可以定义一些公共的 scss 变量，通过配置（参考 vite 官网）在整个项目当中直接使用

  注意.sass 和.scss 的后缀配置的时候语法上有区别，分号要处理好

```css
$primary-color: pink;

.title {
  color: $primary-color;
}
```

- 允许 css 代码嵌套

```css
.parent {
  color: red;
  .child {
    color: red;
  }
}
```

- 混入 Mixin（复用样式）

```css
/* 定义混合 */
@mixin clearfix() {
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
/* 使用混合 */
.content{
  @include clearfix();
}

定义的混合可以带变量， 类似函数
@mixin addColor($a, $b) {
  border-#{$a}: 1px solid $b;
}

使用的时候可以传递参数
@include addColor(bottom, green);

```

- 继承

```css
.border {
  border: 1px solid pink;
}
.content {
  @extend .border;
  font-size: 20px;
}
```

## px、em、rem 和 vw、vh

px 是固定的像素，一旦设置了就无法因为放大而改变。em 是相对父元素设置的字体大小，rem 是相对根（HTML 根节点）元素设置的字体大小来计算

vw、vh 是视窗宽度和视窗高度，1vw 是视窗宽度的百分之一，1vh 是视窗高度的百分之一

注意：百分比是相对于父元素的，而 vw、vh 是相对于视口的，是不一样的
