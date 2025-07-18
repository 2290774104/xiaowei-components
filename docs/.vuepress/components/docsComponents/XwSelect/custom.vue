<template>
  <div>
    <xw-select
      v-model="value"
      data-type="custom"
      :net-work="netWork"
      filterable
    ></xw-select>
    当前选中的值是：{{ value }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      netWork: {
        method: (params) => this.http.$get('/xiaowei-components/mock/select.json', params),
        params: {},
      },
    };
  },
};
</script>
