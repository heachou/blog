---
title: flutter 中PageView Widget 切换保存状态
date: 2020-10-15
categories:
  - 移动开发
tags:
  - flutter
---

在学习 flutter 中，开发项目[IPet](https://github.com/heachou/flutter-news)中，在首页使用了`bottomNavigationBar`和`PageView`搭配起来做 tab 切换,
见[code](https://github.com/heachou/flutter-news/blob/master/lib/pages/application/application.dart)但是在切换的过程当中，我惊奇的发现，切换后再切换回来，页面重新渲染了，用户体验极其不好...

## AutomaticKeepAliveClientMixin

官方推荐 `AutomaticKeepAliveClientMixin`，当我使用的时候，我本地的环境

```bash
flutter --version
Flutter 1.20.3 • channel stable • https://mirrors.tuna.tsinghua.edu.cn/git/flutter-sdk.git
Framework • revision 216dee60c0 (6 weeks ago) • 2020-09-01 12:24:47 -0700
Engine • revision d1bc06f032
Tools • Dart 2.9.2
```

- 解决代码示例 [示例](https://github.com/heachou/flutter-news/blob/master/lib/pages/main/main.dart)

```dart
// 1. PageView 子View集成AutomaticKeepAliveClientMixin
// 2. build方法添加super.build(context);
// 3. 重写方法wantKeepAlive，返回true

class _MainPageState extends State<MainPage>
    with AutomaticKeepAliveClientMixin {
      // ...
      @override
      Widget build(BuildContext context) {
        super.build(context);
        return Text('test');
      }
      // ...
      @override
      bool get wantKeepAlive => true;
    }
```
