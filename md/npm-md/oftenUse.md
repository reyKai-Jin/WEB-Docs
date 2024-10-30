# 常见的npm包

## jsdom

模拟浏览器环境的库

```js
const { JSDOM } = require('jsdom')
const fs = require('node:fs')
const root = new JSDOM(`
<!DOCTYPE html>
<html>
<head></head>
<body>
    <div id="app"></div>
</body>
</html>
`)
// 获取window 和 document
const window = root.window
const document = window.document
const app = document.querySelector('#app')
// fetch node 18 版本才有的
fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
.then((res)=>
    res.json()
).then((data)=>{
    data.forEach((item)=>{
        const img = document.createElement('img')
        img.src = item.url
        img.style = 'width: 200px; height: 200px; margin: 20px;'
        app.appendChild(img)
    })
    // 此时root还是个对象不能直接使用
    // 用 serialize() 转成字符串
    // fs模块写入文件
    fs.writeFileSync('./index.html', root.serialize())
})
```

## commander

用于构建命令行工具的 npm 库

## inquirer

命令行交互工具

## ora

命令行界面显示加载动画的 npm 库

## download-git-repo

用于下载 Git 仓库的 npm 库，可以指定要下载的仓库和目标目录，并可选择指定分支或标签。Download-git-repo 支持从各种 Git 托管平台（如 GitHub、GitLab、Bitbucket 等）下载代码

## ejs

一款强大的JavaScript模板引擎，它可以帮助我们在HTML中嵌入动态内容

[官网](https://ejs.co/#docs)

## marked

将md 转换成html

## browserSync

开启一个服务 ,它允许你在多个设备上同时预览你的网页，并且当你修改代码时，所有设备上的页面都会自动刷新或更新，无需手动操作