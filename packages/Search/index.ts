import Search from './modules/Search.vue';
import _Vue from 'vue';

type SFCWithInstall<T> = T & { install(Vue: typeof _Vue): void };

(Search as SFCWithInstall<typeof Search>).install = (
  Vue: typeof _Vue
): void => {
  Vue.component('xw-search', Search);
};

export default Search;
