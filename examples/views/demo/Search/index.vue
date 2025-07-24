<template>
  <div>
    <xw-search>
      <el-form :inline="true" :model="search">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="search.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
      </el-form>
    </xw-search>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import XwSearch from 'component/Search/modules/Search.vue';

@Component({ name: 'XwSearchView', components: { XwSearch } })
export default class XwSearchView extends Vue {
  public search = {
    name: '',
  };
}
</script>

<style lang="scss" scoped></style>
