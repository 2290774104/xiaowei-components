<template>
  <div class="svg-icon">
    <component :is="svg"></component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import IconSelect from './modules/Select.vue';
import IconTable from './modules/Table.vue';

// @ts-ignore
@Component({
  name: 'SvgIcon',
  components: {
    IconSelect,
    IconTable,
  },
})
export default class SvgIcon extends Vue {
  // @ts-ignore
  @Prop({ type: String, required: true }) private readonly icon!: string;

  public get svg() {
    return `icon-${this.icon}`;
  }
}
</script>

<style>
.svg-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 280 / 180;

  svg {
    width: 100%;
    height: auto;
  }
}
</style>
