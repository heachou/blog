module.exports = {
  title: '沉淀',
  description: '文字记录学习的过程',
  theme: 'reco',
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
  },
  plugins: [['vuepress-plugin-code-copy', {
    selector: 'div[class*="language-"] pre',
    color: '#3e7f7c'
  }]]
}