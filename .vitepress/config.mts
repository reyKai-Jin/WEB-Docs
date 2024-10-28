import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "凯子的博客",
  description: "A VitePress Site",
  outDir:'docs',
  base: '/docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
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
      { icon: 'github', link: 'https://github.com/KaiTitan/docs' }
    ]
  }
})
