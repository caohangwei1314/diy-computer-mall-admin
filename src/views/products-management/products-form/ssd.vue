<template>
  <div style="margin-top:25px;display:flex">
    <el-form ref="form" :model="form" label-width="115px">
      <div style="display:flex">
        <div>
          <el-card :body-style="{ padding: '0px' }" style="width:300px;">
            <img v-if="(form.image==='' || !form.image)" src="../../../assets/otherImages/white.png" width="300px" height="300px">
            <img v-else :src="form.image" width="300px" height="300px">
            <div style="padding: 14px;">
              <el-button type="primary" style="width:265px" class="button" @click="selectImageDialog">选择图片</el-button>
            </div>
          </el-card>
        </div>
        <div>
          <div style="display:flex;margin-bottom:40px;flex-wrap:wrap">
            <el-form-item label="名称">
              <el-input v-model="form.name" style="width:555px"/>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="form.price" style="width:220px"/>
            </el-form-item>
            <el-form-item label="评分">
              <el-input v-model="form.score" style="width:220px"/>
            </el-form-item>
          </div>

          <div style="display:flex;flex-wrap:wrap">
            <el-form-item v-for="input in keyAndName" :label="input.name" :key="input.key">
              <el-input v-model="form[input.key]" style="width:220px"/>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ route==='update'? '修改':'立即创建' }}</el-button>
            <el-button @click="onCancel">重置</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <el-dialog :visible.sync="dialogFormVisible" title="选择图片">
      <croppa
        v-model="croppa"
        :width="300"
        :height="300"
        :placeholder-font-size="16"
        :show-remove-button="true"
        :show-loading="true"
        :loading-size="50"
        placeholder="鼠标拖拽位置，滚轮缩小放大。"
        placeholder-color="#000"
        canvas-color="transparent"
        remove-button-color="black"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormCancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as products from '@/api/products'

export default {
  name: 'SSD',
  data() {
    return {
      form: {
        name: '', // 名称
        positioning: '', // 产品定位
        capacity: '', // 存储容量
        interfaceType: '', // 接口类型
        architecture: '', // 硬盘尺寸
        cache: '', // 缓存
        masterChip: '', // 主控芯片
        rwSpeed: '', // 读取速度
        writeSpeed: '', // 写入速度
        iopsRead: '', // IOPS读取
        iopsWrite: '', // IOPS写入
        consumption: '', // 电源功耗
        troubleFree: '', // 平均无故障时间
        systemRequire: '', // 系统要求
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'positioning', name: '产品定位' },
        { key: 'capacity', name: '存储容量' },
        { key: 'interfaceType', name: '接口类型' },
        { key: 'architecture', name: '硬盘尺寸' },
        { key: 'cache', name: '缓存' },
        { key: 'masterChip', name: '主控芯片' },
        { key: 'rwSpeed', name: '读取速度' },
        { key: 'writeSpeed', name: '写入速度' },
        { key: 'iopsRead', name: 'IOPS读取' },
        { key: 'iopsWrite', name: 'IOPS写入' },
        { key: 'consumption', name: '电源功耗' },
        { key: 'troubleFree', name: '平均无故障时间' },
        { key: 'systemRequire', name: '系统要求' }
      ],
      croppa: {},
      dialogFormVisible: false,
      dataUrl: ''
    }
  },
  computed: {
    route() {
      return this.$route.path.split('/')[2]
    }
  },
  created() {
    if (this.$route.path.split('/')[2] === 'update') {
      products.queryDetail(this.$route.query.id)
        .then(res => {
          console.log(res)
          this.form = res.data
        })
    }
  },
  methods: {
    selectImageDialog() {
      this.dialogFormVisible = true
    },
    dialogFormCancel() {
      this.dialogFormVisible = false
    },
    dialogFormOK() {
      this.dialogFormVisible = false
      this.form.image = this.croppa.generateDataUrl()
    },
    onSubmit() {
      const path = this.$route.path.split('/')[2]
      const className = this.$route.path.split('/')[3]
      products[path](className, this.form)
        .then(res => {
          this.$notify({
            title: '成功',
            message: '修改/创建商品成功！',
            type: 'success'
          })
          setTimeout(this.$router.push({ name: 'ProductsManagement' }), 5000)
        })
    },
    onCancel() {
      this.form = {
        name: '', // 名称
        positioning: '', // 产品定位
        capacity: '', // 存储容量
        interfaceType: '', // 接口类型
        architecture: '', // 硬盘尺寸
        cache: '', // 缓存
        masterChip: '', // 主控芯片
        rwSpeed: '', // 读取速度
        writeSpeed: '', // 写入速度
        iopsRead: '', // IOPS读取
        iopsWrite: '', // IOPS写入
        consumption: '', // 电源功耗
        troubleFree: '', // 平均无故障时间
        systemRequire: '', // 系统要求
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
