<script setup lang="ts">
const navLists = [
  {
    name:'逐梦起点',
    nav:[
      {
        icon:'https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png',
        name:'mdn',
        abbreviation:'记录网络技术，包括CSS，HTML和JavaScript，从2005年开始',
        link:'https://developer.mozilla.org/zh-CN/',
      }
    ]
  },
  {
    name:'数据使者',
    nav:[
      {
        icon:'http://www.axios-js.com/icon/favicon-32x32.png',
        name:'Axios',
        abbreviation:'易用、简洁且高效的http库',
        link:'http://www.axios-js.com/',
      },
      {
        icon:'http://mockjs.com/assets/img/logo-2.svg',
        name:'Mock.js',
        abbreviation:'生成随机数据，拦截 Ajax 请求',
        link:'http://mockjs.com/',
      },
      {
        icon:'https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png',
        name:'Fetch',
        abbreviation:'Fetch使得发出网络请求和处理响应比使用旧的XMLHttpRequest更容易',
        link:'https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch',
      }
    ]
  },
    {
    name:'动画库',
    nav:[
    {
      icon:'https://scrollrevealjs.org/img/logomark.svg',
      name:'scrollReveal',
      abbreviation:'将元素滚动到视图中时制作动画',
      link:'https://scrollrevealjs.org/',
    },
    {
      icon:'https://user-images.githubusercontent.com/4596862/58807621-67aeec00-85e6-11e9-8e3a-3fe4123ee76c.png',
      name:'locomotive-scroll',
      abbreviation:'视口中元素的检测&带视差的平滑滚动',
      link:'https://locomotivemtl.github.io/locomotive-scroll/',
    },
    {
      icon:'https://animate.style/img/favicon.ico',
      name:'Animate.css',
      abbreviation:'CSS动画的跨浏览器库',
      link:'https://animate.style/',
    },
    {
      icon:'https://raw.githubusercontent.com/juliangarnier/anime/master/documentation/assets/img/animejs-v3-header-animation.gif',
      name:'Anime.js',
      abbreviation:'JavaScript动画引擎',
      link:'https://animejs.com/documentation/#propertyKeyframes',
    },
    {
      icon:'',
      name:'AOS',
      abbreviation:'卷轴库动画',
      link:'https://michalsnik.github.io/aos/',
    }
  ]
},
  {
    name:'可视化视图',
    nav:[
      {
        icon:'https://echarts.apache.org/zh/images/favicon.png?_v_=20240226',
        name:'Echarts',
        abbreviation:'一个基于 JavaScript 的开源可视化图表库',
        link:'https://echarts.apache.org/zh/index.html',
      },
      {
        icon:'https://www.chartjs.com.cn/img/chartjs-logo.svg',
        name:'Chart.js',
        abbreviation:'为设计和开发人员准备的简单、灵活的 JavaScript 图表工具',
        link:'https://www.chartjs.com.cn/',
      }, {
        icon:'https://ppchart.com/favicon.ico',
        name:'PPChart',
        abbreviation:'丰富多彩，简易 直观',
        link:'https://ppchart.com/#/',
      }, {
        icon:'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
        name:'AntV G2',
        abbreviation:'G2 是一套简洁的渐进式可视化语法，用于报表搭建、数据探索以及可视化叙事',
        link:'https://g2.antv.antgroup.com/',
      }, {
        icon:'https://threejs.org/files/favicon.ico',
        name:'three.js',
        abbreviation:'一个构建3D试图效果的强大库',
        link:'https://threejs.org/',
      },

    ]
  },
  {
    name:'AI 神通',
    nav:[{
      icon:'https://psc2.cf2.poecdn.net/assets/_next/static/media/poeFullWhiteMultibot.e2e2745a.svg',
      name:'Poe',
      abbreviation:'遇事可问 AI',
      link:'https://poe.com/',
    },
      {
        icon:'https://luckycola.com.cn/public/docs/logo.png',
        name:'百度文心',
        abbreviation:'百度文心一言语言大模型的智能文本对话AI机器人API',
        link:'https://luckycola.com.cn/public/docs/shares/api/openWx.html',
      },
      {
        icon:'https://s21.ax1x.com/2024/08/10/pASBnT1.jpg',
        name:'LuckyColaAI',
        abbreviation:'依托AI智能引擎的工具网站',
        link:'https://luckycola.com.cn/public/dist/#/',
      },
      {
        icon:'https://api.aa1.cn/assets/img/favicon.png',
        name:'ChatGPT中国版',
        abbreviation:'国内开源API平台 千人开发者，免费接口',
        link:'https://api.aa1.cn/',
      }
    ]
  },
  {
    name:'Vue3 生态杀器',
    nav:[{
      icon:'https://cn.vuejs.org//logo.svg',
      name:'Vue.js',
      abbreviation:'渐进式JavaScript 框架',
      link:'https://cn.vuejs.org/',
    },
      {
        icon:'https://cn.vuejs.org//logo.svg',
        name:'Vue Router',
        abbreviation:'为 Vue.js 提供富有表现力、可配置的、方便的路由',
        link:'https://router.vuejs.org/zh/',
      },
      {
        icon:'https://pinia.vuejs.org/logo.svg',
        name:'Pinia',
        abbreviation:'符合直觉的 Vue.js 状态管理库',
        link:'https://pinia.vuejs.org/zh/',
      },
      {
        icon:'https://element-plus.org/apple-touch-icon.png',
        name:'Element Plus',
        abbreviation:'基于 Vue 3，面向设计师和开发者的组件库',
        link:'https://element-plus.org/zh-CN/',
      },
      {
        icon:'https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-dark-atom.svg',
        name:'Vuetify',
        abbreviation:'开源UI库，拥有精美的手工制作的Vue组件。',
        link:'https://vuetifyjs.com/en/',
      },
      {
        icon:'https://nuxt.com.cn/icon.png',
        name:'Nuxt',
        abbreviation:'Nuxt是一个 开源框架 ，使得Web开发变得直观且强大',
        link:'https://nuxt.com.cn/',
      },{
        icon:'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg',
        name:'Naive UI',
        abbreviation:'一个 Vue 3 组件库比较完整，主题可调，使用 TypeScript',
        link:'https://www.naiveui.com/zh-CN/os-theme',
      },{
        icon:'https://next.antdv.com/assets/logo.1ef800a8.svg',
        name:'Ant Design Vue',
        abbreviation:'一个基于Ant设计和Vue的企业级UI组件',
        link:'https://antdv.com/components/overview',
      },
      {
        icon:'https://ark-ui.com/favicon.ico',
        name:'ark',
        abbreviation:'使用React、Svelte、Vue和Solid构建您的设计系统',
        link:'https://ark-ui.com/',
      },{
        icon:'https://ui.vuestic.dev/favicon.ico',
        name:'vuestic-ui',
        abbreviation:'旨在实现快速开发、易于维护和高度可访问性',
        link:'https://ui.vuestic.dev/',
      },
      {
        icon:'https://www.layui-vue.com/favicon.ico',
        name:'layui - vue',
        abbreviation:'layui-vue是一套 Vue 3.0 的桌面端组件库.',
        link:'https://www.layui-vue.com/zh-CN/components/fullscreen',
      },{
        icon:'https://www.radix-vue.com/logo.svg',
        name:'Radix Vue',
        abbreviation:'基数UI原语的Vue端口',
        link:'https://www.radix-vue.com/',
      },
    ]
  },
  {
    name:'CSS 妙手回春',
    nav:[{
      icon:'https://less.bootcss.com/public/ico/favicon.ico',
      name:'Less',
      abbreviation:'在浏览器环境中使用 Less',
      link:'https://less.bootcss.com/',
    },
      {
        icon:'https://sass-lang.com/assets/img/logos/logo.svg',
        name:'Scss',
        abbreviation:'世界上最成熟、最稳定、最强大的专业级CSS扩展语言',
        link:'https://sass-lang.com/',
      },
      {
        icon:'https://www.tailwindcss.cn/favicons/apple-touch-icon.png?v=3',
        name:'tailwindcss',
        abbreviation:'可快速构建美观的网站',
        link:'https://www.tailwindcss.cn/',
      },{
        icon:'https://unocss.nodejs.cn/logo.svg',
        name:'UnoCSS',
        abbreviation:'即时按需的原子化 CSS 引擎',
        link:'https://unocss.nodejs.cn/',
      },
      {
        icon:'https://primer.style/css/storybook/favicon.svg',
        name:'primer Css',
        abbreviation:'GitHub 所使用的 CSS 框架',
        link:'https://primer.style/css/storybook/?path=/docs/introduction--docs',
      },

    ]
  },
  {
    name:'前端 大侦探',
    nav:[{
      icon:'https://www.bootcdn.cn/assets/ico/apple-touch-icon-144-precomposed.png?1721497202689',
      name:'Boot CDN',
      abbreviation:'稳定、快速、免费的前端开源项目 CDN 加速服务',
      link:'https://www.bootcdn.cn/',
    },
      {
        icon:'https://static-production.npmjs.com/1996fcfdf7ca81ea795f67f093d7f449.png',
        name:'npm',
        abbreviation:'向社区开发人员免费提供有用的工具。',
        link:'https://www.npmjs.com/',
      },
      {
        icon:'https://github.com/fluidicon.png',
        name:'GitHub',
        abbreviation:'世界上最广泛采用的人工智能开发平台',
        link:'https://github.com/',
      },
      {
        icon:'https://gitee.com/assets/favicon_message.ico?1581387642851',
        name:'gitee',
        abbreviation:'国内领先的企业级研发效能和开源代码托管平台',
        link:'https://gitee.com/',
      },

    ]
  },
  {
    name:'icon 图标',
    nav:[{
      icon:'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
      name:'iconfont',
      abbreviation:'阿里妈妈矢量图标',
      link:'https://www.iconfont.cn/',
    },
      {
        icon:'https://erikflowers.github.io/weather-icons/css/img/sky.jpg',
        name:'Weather Icons',
        abbreviation:'222个天气主题图标和CSS',
        link:'https://erikflowers.github.io/weather-icons/',
      },{
        icon:'https://icones.js.org/favicon.svg',
        name:'icones',
        abbreviation:'由Iconify支持的带有即时搜索的图标浏览器',
        link:'https://icones.js.org/',
      },{
        icon:'https://feathericons.com/favicon-16x16.png',
        name:'Feather',
        abbreviation:'简单漂亮的开源图标',
        link:'https://feathericons.com/',
      },{
        icon:'https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/favicon.svg',
        name:'Google Fonts',
        abbreviation:'提供Google字体调试工具、Google字体在线预览功能',
        link:'https://fonts.google.com/',
      },{
        icon:'https://icons.getbootstrap.com/assets/img/favicons/favicon.ico',
        name:'Bootstrap Icons',
        abbreviation:'免费、高质量、开源的图标库，包含2000多个图标',
        link:'https://icons.getbootstrap.com/',
      },

    ]
  },
  {
    name:'小程序 食物链',
    nav:[{
      icon:'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png',
      name:'微信官方文档',
      abbreviation:'提供简单、高效的应用开发框架和丰富的组件及API',
      link:'https://developers.weixin.qq.com/miniprogram/dev/framework/',
    },
      {
        icon:'https://res.wx.qq.com/wxopenres/htmledition/images/favicon324c17f2.ico',
        name:'微信公众平台',
        abbreviation:'发版部署以及管理平台',
        link:'https://mp.weixin.qq.com/',
      },{
        icon:'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/icon.png?v=1556263038788',
        name:'uniapp',
        abbreviation:'一套代码可发布多个平台，uni-app在手，做啥都不愁',
        link:'https://www.dcloud.io/',
      },
      {
        icon:'https://uviewui.com/common/logo.png',
        name:'uView',
        abbreviation:'uView UI，是全面兼容nvue的uni-app生态框架',
        link:'https://uviewui.com/',
      },



    ]
  },
]

const change =(link : string)=>{
  window.open(link, '_blank');
}

</script>

<template>
  <div  class="w-full p-4 px-46  md:px-10">
    <div  ref="containerRef" >
      <p class="text-2xl font-bold my-6">指南针</p>
      <div v-for="(item,index) in navLists" :key="index"  class="mb-8">
        <div class="line w-full h-[1px] my-4 bg-black/20 dark:bg-white/10  box-border "></div>
        <p class="text-xl font-bold my-6">{{item.name}}</p>
        <div class="grid
        grid-cols-2
        md:grid-cols-4
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-4
        ">
          <div v-for="(nav,index) in item.nav"
               :key="index"
               @click="change(nav.link)"
               class="bg-gray-300/30 dark:bg-black/20
               py-2 px-4
               min-w-32
               md:min-w-52
               grid gap-2
               cursor-pointer
               border
               rounded-md
               hover:bg-[#a8b1ff]
               dark:border-gray-500/30 dark:hover:border-[#a8b1ff] dark:hover:bg-black/20
          ">
            <div class="flex gap-2 items-center ">
              <div class="p-2 bg-gray-300/50 dark:bg-gray-700/50">
                <img class="h-8  w-8 rounded-sm" :src="nav.icon ? nav.icon : '../../images/logo.png'" alt="">
              </div>
              <span class="font-bold">  {{nav.name}}</span>
            </div>
            <span class="text-sm text-slate-500 line-clamp-2">{{nav.abbreviation}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>