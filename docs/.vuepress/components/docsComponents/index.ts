import _Vue from 'vue';
// 下拉选择demo
import XwSelectBase from './XwSelect/base.vue';
import XwSelectCustom from './XwSelect/custom.vue';
import XwSelectPage from './XwSelect/page.vue';

const docsComponents: any = {
  // 表单组件
  XwSelectBase,
  XwSelectCustom,
  XwSelectPage,
};

export default {
  install(app: typeof _Vue) {
    Object.keys(docsComponents).forEach((key: string) => {
      app.component(key, docsComponents[key]);
    });
  },
};
