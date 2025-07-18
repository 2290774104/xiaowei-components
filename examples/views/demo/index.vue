<template>
  <div>
    <el-button
      v-for="item in components"
      :key="item.name"
      @click="handleClick(item)"
    >
      {{ item.name }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';

declare interface IComponent {
  name: string;
  path: string;
}

@Component({ name: 'HomePage' })
export default class HomePage extends Vue {
  public components: IComponent[] = [
    // 表单组件
    { name: 'Select', path: '/select' },
  ];

  public handleClick(component: IComponent) {
    router.push({
      path: component.path,
    });
  }
}
</script>

<style lang="scss" scoped>
.el-button {
  margin: 0 10px 10px 0;
}
</style>
