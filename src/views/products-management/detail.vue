<template>
  <div class="app-container">
    <el-form ref="form" label-width="80px">
      <el-form-item label="商品类别">
        <el-select v-model="selectName" :disabled="showSelectList" placeholder="请选择" @change="selectRouter">
          <el-option
            v-for="item in productClasses"
            :key="item.key"
            :label="item.display_name"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <hr style="border:none;border-top:1px solid #C0C4CC">
      <router-view/>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ProductsDetail',
  data() {
    return {
      productClasses: [
        { key: 'chassis', display_name: '机箱' },
        { key: 'cpu', display_name: 'CPU' },
        { key: 'sink', display_name: '散热器' },
        { key: 'graphics', display_name: '显卡' },
        { key: 'mechanical', display_name: '机械硬盘' },
        { key: 'monitor', display_name: '显示器' },
        { key: 'board', display_name: '主板' },
        { key: 'power', display_name: '电源' },
        { key: 'ram', display_name: '内存' },
        { key: 'ssd', display_name: '固态硬盘' }
      ],
      selectName: null
    }
  },
  computed: {
    showSelectList() {
      return this.$route.path.split('/')[2] === 'update'
    },
    className() {
      if (this.$route.path.split('/')[2] === 'update' || this.$route.path.split('/')[2] === 'upload') {
        return this.$route.path.split('/')[3]
      }
      return null
    }
  },
  watch: {
    $route() {
      if (this.$route.path.split('/')[2] === 'update' || this.$route.path.split('/')[2] === 'upload') {
        this.selectName = this.$route.path.split('/')[3]
      }
    }
  },
  created() {
    this.selectName = this.$route.path.split('/')[3]
  },
  methods: {
    selectRouter() {
      const path = this.$route.path.split('/')[2]
      console.log(path, this.selectName)
      this.$router.push({ path: '/products/' + path + '/' + this.selectName })
    }
  }
}
</script>
