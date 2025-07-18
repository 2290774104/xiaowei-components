---
lang: zh-CN
title: 安装
date: 2025-07-18 14:51:43
description: 牛咔组件安装指南
---

# 安装

组件库可拉取项目后使用，也可通过 npm 安装

## 通过 npm 安装

```sh
npm install xiaowei-components
```

## 拉取项目

拉取项目

```sh
git clone https://github.com/2290774104/xiaowei-components.git
```

安装依赖

```sh
pnpm install
```

打包组件

```
pnpm run build
```

将打包后项目根目录的 `dist` 文件夹复制到项目中

可以通过 `pnpm` 软链接安装为本地依赖

```json
{
  // ...
  "devDependencies": {
    // ...
    "xw-components": "file:/资源路径/xw-components"
  }
}
```

也可以通过路径直接引用

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="/资源路径/xw-components/style.css" />
  <!-- 引入vue -->
  <script src="/资源路径/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="/资源路径/xw-components/index.umd.js"></script>
</head>
```
