<script lang="tsx">
import '../styles/index.scss';
import { CreateElement } from 'vue';
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component({ name: 'XwSearch' })
export default class XwSearch extends Vue {
  public isFold = false;

  @Emit('toggle')
  public handleToggle() {
    this.isFold = !this.isFold;
    return this.isFold;
  }

  @Emit('refresh')
  public handleRefresh() {}

  render(h: CreateElement) {
    return (
      <div class="xw-search">
        <div v-show={!this.isFold}>
          {this.$scopedSlots.default && this.$scopedSlots.default({})}
        </div>
        <div class="xw-search-btn">
          <div class="xw-search-btn-left">
            {this.$scopedSlots.leftOperate && this.$scopedSlots.leftOperate({})}
          </div>
          <div class="xw-search-btn-right">
            <el-tooltip
              class="item"
              effect="dark"
              content={this.isFold ? '显示搜索' : '隐藏搜索'}
              placement="top"
            >
              <el-button
                size="mini"
                circle
                icon="el-icon-search"
                onClick={this.handleToggle}
              />
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新"
              placement="top"
            >
              <el-button
                size="mini"
                circle
                icon="el-icon-refresh"
                onClick={this.handleRefresh}
              />
            </el-tooltip>
          </div>
        </div>
      </div>
    );
  }
}
</script>
