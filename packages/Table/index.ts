import XwTable from './modules/Table.vue';
import _Vue from 'vue';

type SFCWithInstall<T> = T & { install(Vue: typeof _Vue): void };

(XwTable as SFCWithInstall<typeof XwTable>).install = (
  Vue: typeof _Vue
): void => {
  Vue.component('xw-table', XwTable);
};

export default XwTable;
