<script lang="tsx">
import '../styles/index.scss';
import { get, omit } from 'lodash';
import PagStore from '../store';
import { CreateElement } from 'vue';
import '../directive/height-adaptive';
import { isBoolean, isObject, uuid } from '../../utils';
import type { Table, TableColumn } from 'element-ui';
import type { IColumn, IData, IPagination } from '../types';
import XwSearch from 'component/Search/modules/Search.vue';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({ name: 'XwTable', components: { XwSearch } })
export default class XwTable extends Vue {
  // 数据相关
  @Prop({ type: Array, required: true }) readonly data!: IData[];

  // 表格每列配置项
  @Prop({ type: Array, required: true }) readonly columns!: IColumn[];

  // 分页配置
  @Prop({ type: [Boolean, Object], default: false }) readonly pagination!:
    | boolean
    | IPagination;

  @Prop({ type: Number, default: 0 }) readonly total!: number;

  // 是否在数据重渲染后自动滚动到顶部
  @Prop({ type: Boolean, default: true }) readonly autoToTop?: boolean;

  // 组件高度，默认占满父级容器
  @Prop({ type: [Number, String], default: '' }) readonly height?:
    | number
    | string;

  // 是否在数据更新后重新布局el-table，可能能解决一些异常
  @Prop({ type: Boolean, default: true }) readonly autoDoLayout?: boolean;

  // 是否展示分页
  private isShowPag: boolean = false;

  // 默认分页配置
  private defPagination: IPagination = {
    currentPage: 1,
    pageSizes: [10, 20, 30, 50],
    pageSize: 10,
    layout: 'prev, pager, next, sizes, total',
    background: true,
  };

  @Watch('pagination', { deep: true, immediate: true })
  public onPaginationChanged(pagination: boolean | IPagination) {
    if (isBoolean(pagination)) {
      this.isShowPag = pagination as boolean;
    }
    if (isObject(pagination)) {
      this.isShowPag = true;
      Object.assign(this.defPagination, pagination);
      const { pageSize, currentPage } = this.defPagination;
      PagStore.setPageSize(pageSize);
      PagStore.setCurrentPage(currentPage);
    }
  }

  private pageSizeChange(pageSize: number): void {
    PagStore.setPageSize(pageSize);
    this.emitPageChangeEvent();
  }

  private currentChange(currentPage: number): void {
    PagStore.setCurrentPage(currentPage);
    this.emitPageChangeEvent();
  }

  private handlePrevClick() {
    PagStore.setCurrentPage(PagStore.currentPage - 1);
    this.emitPageChangeEvent();
  }

  private handleNextClick() {
    PagStore.setCurrentPage(PagStore.currentPage + 1);
    this.emitPageChangeEvent();
  }

  private handleRefresh() {
    this.emitPageChangeEvent();
  }

  @Emit('page-change')
  private emitPageChangeEvent() {
    if (this.autoToTop) {
      const tableInstance = this.$refs.ElTableRef as Table | any;
      if (tableInstance) {
        const tableBodyWrapper = tableInstance.bodyWrapper as HTMLElement;
        if (tableBodyWrapper) {
          tableBodyWrapper.scrollTop = 0;
        }
      }
    }
    return {
      pageSize: PagStore.pageSize,
      currentPage: PagStore.currentPage,
    };
  }

  private get searchRef() {
    return this.$refs.search;
  }

  private get searchHeight() {
    let height = 0;
    console.log(this.searchRef, height);
    return height;
  }

  directives() {
    // 动态获取搜索栏高度
    const search = this.$refs.search as XwSearch;
    let searchHeight = 0;
    if (search) {
      searchHeight = (search.$el as HTMLElement).offsetHeight;
    }
    return [
      {
        name: 'height-adaptive',
        value: {
          height: this.height,
          topOffset: searchHeight,
          bottomOffset: this.isShowPag ? 42 : 0,
        },
      },
    ];
  }

  private get hasSearch() {
    return !!this.$slots.search;
  }

  // 延时加载table，避免表格高度计算错误
  private renderTable = false;

  render(h: CreateElement) {
    // 移除表格高度，表格高度使用指令计算，避免高度冲突
    const attrs = omit(this.$attrs, ['height']);
    // 移除分页事件，防止事件冲突
    const $tableListeners = omit(this.$listeners, [
      'page-change',
      'current-change',
      'size-change',
      'prev-click',
      'next-click',
    ]);
    const customScopedSlots = omit(this.$scopedSlots, []);

    const getCellValue = (column: IColumn, row: IData, index: number) => {
      const { prop } = column;
      const value = column.formatter
        ? column.formatter(row, column, row[prop], index)
        : row[prop];
      return value;
    };

    const renderColumns = (columns: IColumn[]) =>
      columns
        .filter((i) => !i.hidden)
        .map((o) => {
          const props = Object.assign(
            {
              align: 'center',
            },
            o
          );
          const scopedSlots = {
            default({
              row,
              column: elColumn,
              $index,
              store,
              _self,
            }: {
              row: any;
              column: TableColumn;
              $index: number;
              store: any;
              _self: any;
            }) {
              const column = Object.assign(
                { scopedSlots: {} },
                props,
                elColumn
              );
              const cellValue = getCellValue(column, row, $index);
              let cellContent = cellValue;
              const customRender =
                customScopedSlots[column.customRender] ||
                customScopedSlots[column.scopedSlots.customRender];
              if (customRender) {
                cellContent = customRender({
                  cellValue,
                  row,
                  column,
                  $index,
                  store,
                  _self,
                  h,
                });
              }

              return cellContent;
            },
          };

          let sampleScopedSlots = {};
          // 移除不支持自定义插槽的列类型 type[index/selection]
          if (!['index', 'selection'].includes(props.type)) {
            sampleScopedSlots = { scopedSlots };
          }

          return (
            <el-table-column
              key={uuid()}
              {...{ props: props }}
              {...sampleScopedSlots}
            ></el-table-column>
          );
        });

    this.$nextTick(() => {
      this.renderTable = true;
    });

    return (
      <div class="xw-table">
        {this.hasSearch && (
          <XwSearch
            ref="search"
            onRefresh={this.handleRefresh}
            scopedSlots={{
              leftOperate: this.$scopedSlots.leftOperate,
              default: this.$scopedSlots.search,
            }}
          ></XwSearch>
        )}
        {this.renderTable ? (
          <el-table
            ref="ElTableRef"
            data={this.data}
            {...{ props: attrs, on: $tableListeners }}
            {...{ directives: this.directives() }}
          >
            {renderColumns(this.columns)}
          </el-table>
        ) : (
          ''
        )}
        {this.isShowPag && (
          <el-pagination
            {...{ props: this.defPagination }}
            total={this.total}
            {...{
              on: {
                'size-change': this.pageSizeChange,
                'current-change': this.currentChange,
                'prev-click': this.handlePrevClick,
                'next-click': this.handleNextClick,
              },
            }}
          ></el-pagination>
        )}
      </div>
    );
  }
}
</script>
