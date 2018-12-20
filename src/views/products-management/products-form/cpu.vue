<template>
  <div style="margin-top:25px;display:flex">
    <el-form ref="form" :model="form" label-width="105px">
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
              <el-input v-model="form.name" style="width:545px"/>
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
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
  name: 'CPU',
  data() {
    return {
      form: {
        name: '', // 名称
        appropriateType: '', // 使用类型
        series: '', // CPU系列
        craftsmanship: '', // 制作工艺
        code: '', // 核心代号
        slotType: '', // 插槽类型
        packageSize: '', // 分装大小
        cpuFrequency: '', // CPU主频
        accelerationFrequency: '', // 动态加速频率
        coreNumber: '', // 核心数量
        threadNumber: '', // 线程数量
        thirdCache: '', // 三级缓存
        busSpecification: '', // 总线规格
        thermalPower: '', // 热设计功耗
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'appropriateType', name: '使用类型' },
        { key: 'series', name: 'CPU系列' },
        { key: 'craftsmanship', name: '制作工艺' },
        { key: 'code', name: '核心代号' },
        { key: 'slotType', name: '插槽类型' },
        { key: 'packageSize', name: '分装大小' },
        { key: 'cpuFrequency', name: 'CPU主频' },
        { key: 'accelerationFrequency', name: '动态加速频率' },
        { key: 'coreNumber', name: '核心数量' },
        { key: 'threadNumber', name: '线程数量' },
        { key: 'thirdCache', name: '三级缓存' },
        { key: 'busSpecification', name: '总线规格' },
        { key: 'thermalPower', name: '热设计功耗' }
      ],
      croppa: {},
      dialogFormVisible: false,
      dataUrl: ''
    }
  },
  created() {
    if (this.$route.path.split('/')[2] === 'detail') {
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
      console.log(this.form)
      const path = this.$route.path.split('/')[2]
      const className = this.$route.path.split('/')[3]
      products[path](className, this.form)
        .then(res => {
          console.log(res)
        })
    },
    onCancel() {
      this.form = {
        name: '', // 名称
        appropriateType: '', // 使用类型
        series: '', // CPU系列
        craftsmanship: '', // 制作工艺
        code: '', // 核心代号
        slotType: '', // 插槽类型
        packageSize: '', // 分装大小
        cpuFrequency: '', // CPU主频
        accelerationFrequency: '', // 动态加速频率
        coreNumber: '', // 核心数量
        threadNumber: '', // 线程数量
        thirdCache: '', // 三级缓存
        busSpecification: '', // 总线规格
        thermalPower: '', // 热设计功耗
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
