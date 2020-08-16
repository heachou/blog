---
title: webpack 配置多页面入口
date: 2020-08-16
categories:
 - 工具
tags:
 - webpack
---

:::tip
主要讲解如何在webpack中配置多个页面入口
:::

<!-- more -->

## 在 create-react-app中使用

当我们使用 `npx create-react-app` 来创建项目，因为需要自定义配置，所以在创建好项目初始目录，需要run `npm run eject` 来弹出配置，

## 创建页面入口

在`src`目录下，创建我们的页面入口文件，我做了三个页面入口用作测试
index 目录中 `src/index/index.js` 以及 `src/index/app.js`、
about 目录中 `src/index/index.js` 以及 `src/index/app.js`、
order 目录中 `src/index/index.js` 以及 `src/index/app.js`、
相应的，复制 `public/index.html` 两份改名 `about.html` 和  `order.html`

## 修改webpack配置

在 `config/paths.js` 中, 导出我们创建的文件入口路径，以及模板路径

```js
module.exports = {
  // else code
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index/index'),
  appAboutJs: resolveModule(resolveApp, 'src/about/index'),
  appOrderJs: resolveModule(resolveApp, 'src/order/index'),
  aboutHtml: resolveApp('public/about.html'),
  orderHtml: resolveApp('public/order.html'),
  // else code
};
```

找到 `config/webpack.config.js`，修改入口 `entry`

```js
{
    // else code
    entry: {
      order: [isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'), paths.appOrderJs].filter(Boolean),
      about: [isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'), paths.appAboutJs].filter(Boolean),
      index: [isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs].filter(Boolean),
    }
    // else code
}
```

然后修改htmlwebpackPlugin 相关的配置,`config/webpack.cofig.js`中修改下面几处

- 第一处

```js
const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
}
// 这里我将 minify 配置提出来了
// 将HtmlWebpackPlugin复制两份，做相应的修改
plugins: [
      // else code
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
            chunks: ['index'],
          },
          isEnvProduction
            ? {
              minify: minify,
            }
            : undefined
        )
      ),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.aboutHtml,
            filename: 'about.html',
            chunks: ['about'],
          },
          isEnvProduction
            ? {
              minify: minify,
            }
            : undefined
        )
      ),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.orderHtml,
            filename: 'order.html',
            chunks: ['order'],
          },
          isEnvProduction
            ? {
              minify: minify,
            }
            : undefined
        )
      ),
      // else code
    ].filter(Boolean),
```

- 第二处，需要修改 manifest 相关配置

```js
new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          const entrypointFiles = {};
          Object.keys(entrypoints).forEach(entrypoint => {
            entrypointFiles[entrypoint] = entrypoints[entrypoint].filter(fileName => !fileName.endsWith('.map'));
          });
          // const entrypointFiles = entrypoints.main.filter(
          //   fileName => !fileName.endsWith('.map')
          // );
          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      })
```

now， run `npm run start`试试，webpack配置多页面完成

[github 多页面配置demo](https://github.com/heachou/mpa-demo)

参考：
- [html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)
- [修改create-reacct-app 支持多页面入口](https://www.cnblogs.com/luweib/articles/9112205.html)
