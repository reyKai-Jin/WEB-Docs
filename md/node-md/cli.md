# 编写自己的脚手架

## 所需依赖

- `commander`:构建命令行工具的 npm 库
- `inquirer`:命令行交互工具，用于与用户进行交互和收集信息
- `ora`:命令行界面显示加载动画的 npm 库
- `download-git-repo`:支持从各种 Git 托管平台（如 GitHub、GitLab、Bitbucket 等）下载代码

一件下载纵享丝滑：

```sh
npm install commander inquirer ora download-git-repo
```

## 主要文件

目录:

```
├── src/
│   ├──index.js  (入口文件)
│   └──utils.js  (工具库)
└── package.json (配置文件)
```

package.json:

主要开启 esm (规范,import)，设置 bin (可执行文件的路径)
```json
{
  "name": "cli",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "bin": {
    "fs-cli": "src/index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "commander": "^12.1.0",
    "download-git-repo": "^3.0.2",
    "inquirer": "^10.1.8",
    "ora": "^8.1.0"
  }
}
```

index.js:

```js
#!/usr/bin/env node
// 告诉操作系统执行时帮我用node执行这个文件

import { program } from "commander";//构建命令行
import fs from "node:fs";// nodefs模块
import inquirer from "inquirer";// 命令行交互
import {checkPath,downloadTemplate} from './utils.js'

// 读取package.json 获取版本号
let json = fs.readFileSync('./package.json', 'utf-8')
json = JSON.parse(json)

// 版本号 -V 查看
program.version(json.version)

// 创建命令
program.command('create <YourProjectName>').alias('c').description('create project').action((YourProjectName) => {
    inquirer.prompt([
        {
            type: 'input',// input 输入框 confirm 确认框 list 选择框 checkbox 多选框
            name: 'projectName',//返回值的key,等会要用这个去读取用户的输入
            message: '输入你的项目名称',// 描述
            default: YourProjectName,// 默认值
            validate: (value) => {
                if(checkPath(value)){
                    return '目录已存在( ´•︵•` )'
                }
                return true
            }
        },
        {
            type: 'confirm',
            name: 'isTypeScript',
            message: '是否使用TypeScript',
            default: true
        }
    ]).then((res)=>{
        if(res.isTypeScript){
            downloadTemplate('ts',res.projectName)
        }else{
            downloadTemplate('js',res.projectName)
        }
        
    }).catch((err)=>{
        console.log('创建失败请重新尝试(TдT)')
       process.exit(1)
    })
})

// 获取用户输入的命令
program.parse(process.argv)
```

utils.js:

```js
import fs from 'node:fs'
import download from 'download-git-repo' //下载模板用
import ora from 'ora' // 命令行进度

const spinner = ora('拼命下载中(╯‵□′)╯︵┴─┴...')
// 检查路径
export const checkPath = (path) => {
    // 查看目录是否存在
    if (fs.existsSync(path)) {
        return true
    }else{
        return false
    }
}

export const downloadTemplate = (branch, path) => {
    return new Promise((resolve, reject) => {
        spinner.start()
        // branch 拉取对应分支下的代码 如 ts 或者 js 不同分支
        // direct 必须要加 （这个仓库是小满zs的模板）
        download(`direct:https://gitee.com/chinafaker/vue-template.git#${branch}`, path, { clone: true }, (err) => {
            if(err) reject (err)
            resolve()
            spinner.succeed('下载完成(〃∀〃)')
        })
    })
}
```