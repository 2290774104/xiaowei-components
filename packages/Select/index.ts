import Select from './modules/Select.vue';
import _Vue from 'vue';

type SFCWithInstall<T> = T & { install(Vue: typeof _Vue): void };

(Select as SFCWithInstall<typeof Select>).install = (
  Vue: typeof _Vue
): void => {
  Vue.component('xw-select', Select);
};

export default Select;
