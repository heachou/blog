module.exports = {
  title: '我的博客',
  description: '文字记录学习的过程',
  head: [
    ['link', { rel: 'icon', href:'/logo.png'}],
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
    ],
    sidebar: {
      '/react/': ['', '基础', '生命周期', 'hooks']
    }
  }
}