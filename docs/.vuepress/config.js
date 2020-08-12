module.exports = {
  title: '沉淀',
  description: '文字记录学习的过程',
  theme: 'reco',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'React', link: '/react/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'Webpack', link: '/webpack/' },
      { text: 'typescript', link: '/typescript/' },
      { text: 'node', link: '/node/' },
      { text: 'python', link: '/python/' },
      { text: 'bugs', link: '/bugs/' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' }
    ],
    sidebar: {
      '/react/': ['', '基础', '生命周期', 'hooks'],
      '/vue/': ['', 'vuepress配置code-copy'],
      '/bugs/': ['', 'toFixed'],
    },
    // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    },
    huawei: true,
    valineConfig: {
      appId: 'AoyjJGDtBqGSXGLVsCNLOS5n-gzGzoHsz',// your appId
      appKey: 'g5GUfJbyxxfSAzrfr2OyB1NC', // your appKey
    },
    // vssueConfig: {
    //   platform: 'github',
    //   owner: 'heachou',
    //   repo: 'blogs',
    //   clientId: 'Iv1.e5bc0a941796bfbc',
    //   clientSecret: 'eb9ce78521ec0f01d8ac054bf18e3a46cc749fd9',
    // },
    logo: '/logo.ico',
    authorAvatar: 'logo.ico',
    author: 'axl_zhou',
    type: 'blog',
    // 备案
    record: 'ICP 备案文案',
    recordLink: 'ICP 备案指向链接',
    // 项目开始时间，只填写年份
    startYear: '2020'
  },
  plugins: [['vuepress-plugin-code-copy', {
    selector: 'div[class*="language-"] pre',
    color: '#3e7f7c'
  }]]
}