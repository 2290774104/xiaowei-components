---
lang: zh-CN
title: 快速开始
date: 2025-07-18 10:30:34
description: 牛咔组件使用指南
---

# 快速开始

本节将介绍如何在项目中使用牛咔组件

## 完整引入

如果对项目的加载速度和性能要求不高时，那么使用完整导入会更方便。

```js
import 'xw-components/style.css';
import XiaoweiComponents from 'xw-components';

Vue.use(XiaoweiComponents);
```

如果使用浏览器直接引入，会默认全局注册所有组件

## 按需导入

只引入需要的组件，以达到减小项目体积的目的。

```js
import { XiaoweiSteps } from 'xw-components';

export default {
  // ...
  components: { XiaoweiSteps },
};
```

如果使用浏览器直接安装，则会在 `window` 上挂着一个对象 `XiaoweiComponents`，所有的组件会存放在这个对象中，~~手动去注册组件~~umd引入时默认全局注册所有组件

```js
Vue.component('XiaoweiSteps', XiaoweiComponents.XiaoweiSteps);
// 或者
new Vue({
  // ...
  components: {
    XiaoweiSteps: XiaoweiComponents.XiaoweiSteps,
  },
});
```
