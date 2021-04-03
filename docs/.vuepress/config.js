module.exports = {
  title: '沉淀',
  description: '文字记录学习的过程',
  theme: 'reco',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
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
      { text: 'flutter', link: '/flutter/' },
      { text: 'bugs', link: '/bugs/' },
      { text: 'else', link: '/else/' },
      // { text: 'js', link: '/js/' },
      { text: 'project', link: '/project/' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
    ],
    sidebar: {
      '/react/': ['', 'react中模块懒加载', '生命周期', 'hooks'],
      '/vue/': ['', 'vuepress配置code-copy','defineProperty','vdom','router'],
      '/webpack/': ['', 'webpack配置多入口'],
      '/bugs/': ['', 'toFixed', 'new Date ios'],
      '/flutter/': ['','PageView切换保存状态'],
      '/js/': ['','js根据数组生成树形结构','tools','promise','curry','element','一些思考','generator','this','call、apply、bind、new'],
      '/else/': ['', 'axios 下载','github proxy','Set','Map'],
      '/project/': ['','resume']
    },
    // 博客配置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认为2
        text: 'Category', // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag', // 默认文案 “标签”
      },
    },
    huawei: true,
    valineConfig: {
      appId: 'AoyjJGDtBqGSXGLVsCNLOS5n-gzGzoHsz', // your appId
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
    recordLink: 'https://beian.miit.gov.cn',
    // 项目开始时间，只填写年份
    startYear: '2020',
  },
  plugins: [
    [
      'vuepress-plugin-code-copy',
      {
        selector: 'div[class*="language-"] pre',
        color: '#3e7f7c',
      },
    ],
  ],
}
