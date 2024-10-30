# md转html

## 所需依赖

- `ejs`:模板
- `marked`:md转html
- `browserSync`:起服务预览，支持不同设备同时刷新

## 主要文件

目录:

```
├── index.js  (入口文件)
├── index.css   (md转html后通用的css)
├── template.ejs (模板)
├── README.md (测试用的md文件)
└── package.json (配置文件)
```

index.js:
```js
const ejs = require('ejs'); //模板
const fs = require('node:fs');
const marked = require('marked'); //转html
const { title } = require('node:process');
let browser;
const browserSync = require('browser-sync'); //起服务预览

const server = () => {
  browser = browserSync.create();
  browser.init({
    server: {
      baseDir: './', //服务的根目录
      index: 'index.html',
    },
  });
};

// 读取md并转成html
const init = (callback) => {
  // 读取md文件
  const md = fs.readFileSync('./README.md', 'utf-8');
  // 第一个参数是模板文件，第二个参数是要填充的内容,第三个参数是回调函数
  ejs.renderFile(
    'template.ejs',
    {
      content: marked.parse(md),
      title: 'marked demo',
    },
    (err, data) => {
      if (err) throw err;
      fs.writeFileSync('./index.html', data);
      callback && callback();
    }
  );
};
// 利用fs.watch监听README.md文件变化来达到热更新的效果
fs.watch('./README.md', (curr, prev) => {
  // 判断文件的时间戳是否发生变化 curr是当前状态 prev是上一次状态
  if (curr.mtime !== prev.mtime) {
    // 后面就不能去起服务了不然会开新的服务，应该直接刷新
    init(() => {
      browser.reload();
    });
  }
});
// 第一次运行 起一次服务
init(() => {
  server();
});

```

template.ejs:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <%= title %>
    </title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <%- content %>
</body>
</html>
```

README.md:
```md
# 随便写写

# 哈哈哈

- 你说的对
- 但原神是一款
- 后面忘了

## 退后我要开始发癫了

`nb`哈哈哈哈哈



\```js 
let a = 666;
\```

```


index.css:
```css
/* Markdown通用样式 */

/* 设置全局字体样式 */
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

/* 设置标题样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 1.3em;
  margin-bottom: 0.6em;
  font-weight: bold;
}

h1 {
  font-size: 2.2em;
}

h2 {
  font-size: 1.8em;
}

h3 {
  font-size: 1.6em;
}

h4 {
  font-size: 1.4em;
}

h5 {
  font-size: 1.2em;
}

h6 {
  font-size: 1em;
}

/* 设置段落样式 */
p {
  margin-bottom: 1.3em;
}

/* 设置链接样式 */
a {
  color: #337ab7;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 设置列表样式 */
ul,
ol {
  margin-top: 0;
  margin-bottom: 1.3em;
  padding-left: 2em;
}

/* 设置代码块样式 */
pre {
  background-color: #f7f7f7;
  padding: 1em;
  border-radius: 4px;
  overflow: auto;
}

code {
  font-family: Consolas, Monaco, Courier, monospace;
  font-size: 0.9em;
  background-color: #f7f7f7;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

/* 设置引用样式 */
blockquote {
  margin: 0;
  padding-left: 1em;
  border-left: 4px solid #ddd;
  color: #777;
}

/* 设置表格样式 */
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1.3em;
}

table th,
table td {
  padding: 0.5em;
  border: 1px solid #ccc;
}

/* 添加一些额外的样式，如图片居中显示 */
img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}

/* 设置代码行号样式 */
pre code .line-numbers {
  display: inline-block;
  width: 2em;
  padding-right: 1em;
  color: #999;
  text-align: right;
  user-select: none;
  pointer-events: none;
  border-right: 1px solid #ddd;
  margin-right: 0.5em;
}

/* 设置代码行样式 */
pre code .line {
  display: block;
  padding-left: 1.5em;
}

/* 设置代码高亮样式 */
pre code .line.highlighted {
  background-color: #f7f7f7;
}

/* 添加一些响应式样式，适应移动设备 */
@media only screen and (max-width: 768px) {
  body {
    font-size: 14px;
    line-height: 1.5;
  }

  h1 {
    font-size: 1.8em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.3em;
  }

  h4 {
    font-size: 1.1em;
  }

  h5 {
    font-size: 1em;
  }

  h6 {
    font-size: 0.9em;
  }

  table {
    font-size: 14px;
  }
}

```