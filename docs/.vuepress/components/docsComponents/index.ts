import _Vue from 'vue';
// 下拉选择demo
import XwSelectBase from './XwSelect/base.vue';
import XwSelectCustom from './XwSelect/custom.vue';
import XwSelectPage from './XwSelect/page.vue';
// 表格demo
import XwTableBase from './XwTable/base.vue';
import XwTablePage from './XwTable/page.vue';
import XwTableAttributes from './XwTable/attributes.vue';
import XwTableSlot from './XwTable/slot.vue';

const docsComponents: any = {
  // 表单组件
  XwSelectBase,
  XwSelectCustom,
  XwSelectPage,
  // 数据展示
  XwTableBase,
  XwTablePage,
  XwTableAttributes,
  XwTableSlot,
};

export default {
  install(app: typeof _Vue) {
    Object.keys(docsComponents).forEach((key: string) => {
      app.component(key, docsComponents[key]);
    });
  },
};
