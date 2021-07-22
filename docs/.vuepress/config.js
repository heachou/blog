module.exports = {
  title: '沉淀',
  description: '文字记录学习的过程',
  theme: 'reco',
  base: '/blog/',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      description: '学习沉淀之处'
    },
  },
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
    lastUpdated: false,
    nav: [
      { text: '首页', link: '/' },
      { text: 'React', link: '/react/' },
      { text: 'Vue', link: '/vue/' },
      // { text: 'Webpack', link: '/webpack/' },
      { text: 'typescript', link: '/typescript/' },
      { text: 'Node', link: '/node/' },
      // { text: 'python', link: '/python/' },
      // { text: 'flutter', link: '/flutter/' },
      { text: 'JS', link: '/js/' },
      { text: 'Bugs', link: '/bugs/' },
      { text: '算法', link: '/algorithm/' },
      { text: '其他', link: '/else/' },
      { text: '数据库', link: '/db/' },
      // { text: 'project', link: '/project/' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
    ],
    sidebar: {
      '/react/': ['', 'react-lazyload', 'lifecycle', 'api','hooks'],
      '/vue/': ['', 'code-copy','defineProperty','vdom','router'],
      // '/webpack/': ['', 'webpack-multi-enterpoint'],
      '/bugs/': ['', 'toFixed', 'new Date ios','jsRuntimeEnv'],
      '/node/': ['', 'require'],
      // '/flutter/': ['','PageView-keepstate'],
      '/algorithm/': ['','intro','stack','queue','linkedList','set','map','tree','graph'],
      '/js/': ['','array-to-tree','tools','promise','curry','compose','element','think','generator','this','call-apply-bind-new'],
      '/typescript/': ['','decorator'],
      '/db/': ['','mongo.crud'],
      '/else/': ['', 'axios-download','github proxy','enterUrl','cache','Set','Map'],
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
    record: 'ICP 备案',
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
