import Vue from 'vue';
import VueRouter from 'vue-router';
import type { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/demo/index.vue'),
  },
  // 表单组件
  {
    path: '/select',
    name: 'Select',
    component: () => import('@/views/demo/Select/index.vue'),
  },
  // 数据展示
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/views/demo/Table/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.VITE_APP_BASE_URL,
  routes,
});

export default router;
