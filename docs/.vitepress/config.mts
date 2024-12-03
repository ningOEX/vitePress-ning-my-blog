import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DEBRIS",
  description: "Leave a lingering fragrance in your hand",

 

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/homePage/home.md' },
      { text: 'About', link: '/aboutPage/about.md' }
    ],

    sidebar: [
      {
        text: 'About',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          
        ]
      }
    ],
    // algolia传送阵 https://docsearch.algolia.com/apply/
     algolia: {
      apiKey: '849b4e53f137cc98780f4bfe3f81cab8',
      indexName: 'bay-theta-14',
      appId: '0UZB7965F7'
    },
    logo:"/imgs/logo.jpg",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ningOEX?tab=repositories' }
    ],
    
    // 在 sidebar 后添加
    outlineTitle: '本页目录',
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }

  },
    vite: {
    // 确保支持 Vue 组件
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            giscus: ['@giscus/react'],
          },
        },
      },
    },
  },
  
})
