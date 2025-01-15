import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DEBRIS",
  description: "日记、ningOEX、JS、前端日记个人博客",

  lastUpdated: true,

  themeConfig: {

    lastUpdatedText: '最后更新',

    logo: "https://avatars.githubusercontent.com/u/52589990?v=4",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "武器库", link: '/navContent/' },
      { text: "开发笔记", link: '/usePage/' },
      {
        text: '前端',
        items: [
          { text: 'javaScript', link: '/homePage/jsFile/' },
          { text: 'HTML', link: '/homePage/htmlFile/' },
          { text: 'CSS', link: '/homePage/cssFile/' },
          { text: 'Vue', link: '/homePage/vueFile/' },

        ]
      },
    ],

    sidebar: {
      '/homePage/linkFile': [
        {
          text: '常用的库',
          items: [
            { text: 'tailwindcss⭐', link: 'https://www.tailwindcss.cn/' },
            { text: 'Echarts⭐', link: 'https://echarts.apache.org/zh/index.html' },
            { text: 'axios⭐', link: 'http://www.axios-js.com/' },
          ],
        },
      ],
      '/usePage/': [
        {
          text: 'vitepress👇',
          items: [
            { text: 'tailwindcss使用', link: '/usePage/useTailwindcss.md' },
            { text: 'Element-plus使用', link: '/usePage/useElement-plus.md' },
          ],
        }
      ],
    },
    search:{
      provider: 'local'
    },

    // algolia传送阵 https://docsearch.algolia.com/apply/
    // algolia: {
    //   apiKey: '849b4e53f137cc98780f4bfe3f81cab8',
    //   indexName: 'bay-theta-14',
    //   appId: '0UZB7965F7'
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ningOEX?tab=repositories' }
    ],



    // 在 sidebar 后添加
    outlineTitle: '指南针',
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    footer: {
      message: '由 vercel 提供快速的部署服务',
      copyright: 'Copyright © 2024-2025 ningOEX'
    }

  },


})
