<template>
  <div class="wrap">
    <xw-table
      :data="data"
      :columns="columns"
      :pagination="pagination"
      :key="key"
      @page-change="handlePageChange"
    >
      <template #search="">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input
              v-model="search.name"
              size="small"
              placeholder="名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #leftOperate>
        <el-button type="primary" size="small">新增</el-button>
      </template>
      <template #slot="{ column }">
        这里是自定义插槽：{{ column.prop }}
      </template>
    </xw-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import XwTable from 'component/Table/modules/Table.vue';
import { IData, IColumn, IPagination } from 'component/Table/types';

@Component({ name: 'XwTableView', components: { XwTable } })
export default class XwTableView extends Vue {
  public search = {
    name: '',
  };

  public key = 1;

  public data: IData = [
    {
      title: '数据1',
      date: '20250722',
    },
    {
      title: '数据2',
      date: '20250723',
    },
  ];

  public columns: IColumn[] = [
    { label: '', prop: 'selection', type: 'selection' },
    { label: '序号', prop: 'index', type: 'index' },
    { label: '标题', prop: 'title' },
    {
      label: '日期',
      prop: 'date',
      formatter: (row: IData, col: IColumn, val: string, i: number) => {
        return '2025-07-22';
      },
    },
    { label: '插槽', prop: 'slot', customRender: 'slot' },
  ];

  public pagination: IPagination = {
    currentPage: 1,
    pageSize: 10,
  };

  handlePageChange(page) {
    console.log(page);
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 500px;
}
</style>
