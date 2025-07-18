import { SidebarConfig4Multiple } from 'vuepress/config';

const sidebar: SidebarConfig4Multiple = {
  '/pages/guide/': [
    {
      title: '安装',
      collapsable: false,
      path: 'installation',
    },
    {
      title: '快速开始',
      collapsable: false,
      path: 'quickstart',
    },
  ],
  '/pages/components/': [
    {
      title: 'Overview 组件总览',
      collapsable: false,
      children: [{ title: 'Overview 组件总览', path: 'overview' }],
    },
    {
      title: 'Form 表单组件',
      collapsable: true,
      children: [{ title: 'Select 下拉选择', path: 'select' }],
    },
    {
      title: 'Data 数据展示',
      collapsable: true,
      children: [{ title: 'Table 表格', path: 'table' }],
    },
  ],
};

export default sidebar;
