<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:20px">
      <el-input v-model="listQuery.name" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.classId" placeholder="类别" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in productClasses" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.orderBy" placeholder="排序字段" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in orderByClass" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.desc" placeholder="排序规则" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in descClass" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">增加</el-button>
    </div>

    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.pkId }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="类别" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ productClasses[scope.row.classId-1].display_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.salesNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin-top:10px;">
      <el-pagination
        v-show="total>0"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import * as products from '@/api/products'

export default {
  name: 'ProductsManagement',
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listQuery: {
        classId: null,
        name: null,
        limit: 20,
        page: 1,
        orderBy: 'pk_id',
        desc: 'desc'
      },
      productClasses: [
        { key: '1', routerName: 'chassis', display_name: '机箱' },
        { key: '2', routerName: 'cpu', display_name: 'CPU' },
        { key: '3', routerName: 'sink', display_name: '散热器' },
        { key: '4', routerName: 'graphics', display_name: '显卡' },
        { key: '5', routerName: 'mechanical', display_name: '机械硬盘' },
        { key: '6', routerName: 'monitor', display_name: '显示器' },
        { key: '7', routerName: 'board', display_name: '主板' },
        { key: '8', routerName: 'power', display_name: '电源' },
        { key: '9', routerName: 'ram', display_name: '内存' },
        { key: '10', routerName: 'ssd', display_name: '固态硬盘' }
      ],
      orderByClass: [
        { key: 'pk_id', display_name: '编号' },
        { key: 'price', display_name: '价格' },
        { key: 'sales_number', display_name: '销售量' }
      ],
      descClass: [
        { key: 'asc', display_name: '升序' },
        { key: 'desc', display_name: '降序' }
      ]
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      products.query(this.listQuery)
        .then(res => {
          const data = res.data
          this.list = data.list
          this.total = data.totalCount
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getProducts()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getProducts()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getProducts()
    },
    handleCreate() {
      this.$router.push({ name: 'ProductsUpload' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/products/detail/' + this.productClasses[row.classId - 1].routerName, query: { id: row.pkId }})
    },
    handleDelete(row) {
      products.deleteByPkId(row.pkId)
        .then(res => {
          console.log(res)
          this.$message.error('删除成功!')
          this.getProducts()
        })
    }
  }
}
</script>

