import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ReyKai-Jin博客站",
  description: "A VitePress Site",
  outDir:'docs',
  base: '/WEB-Docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'HTML之篇', link: '/HTML' }
    ],

    sidebar: [
      {
        text: '全栈之路',
        items: [
          { text: '环境配置', link: '/setting-config' },
          { text: 'HTML之篇', link: '/HTML' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    docFooter:{
      prev:'上一页',
      next:'下一页'
    },

    // 和git配合使用
    lastUpdated:{
      text:'最近更改时间',
      formatOptions:{
        dateStyle:'full',
        timeStyle:'short'
      }
    },
    search:{
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/reyKai-Jin/WEB-Docs' }
    ]
  }
})
