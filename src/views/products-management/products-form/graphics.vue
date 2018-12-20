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
  name: 'Graphics',
  data() {
    return {
      form: {
        name: '', // 名称
        vendor: '', // 显卡厂商
        chip: '', // 显卡芯片
        series: '', // 显卡芯片系列
        craftsmanship: '', // 制作工艺
        code: '', // 核心代号
        codeFrequency: '', // 核心频率
        cuda: '', // CUDA核心
        memoryFrequency: '', // 显存频率
        memoryType: '', // 显存类型
        memoryCapacity: '', // 显存容量
        memoryBandwidth: '', // 显存位宽
        maximumResolution: '', // 最大分辨率
        interfaceType: '', // 接口类型
        ioInterface: '', // I/O接口
        powerInterface: '', // 电源接口
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'vendor', name: '显卡厂商' },
        { key: 'chip', name: '显卡芯片' },
        { key: 'series', name: '显卡芯片系列' },
        { key: 'craftsmanship', name: '制作工艺' },
        { key: 'code', name: '核心代号' },
        { key: 'codeFrequency', name: '核心频率' },
        { key: 'cuda', name: 'CUDA核心' },
        { key: 'memoryFrequency', name: '显存频率' },
        { key: 'memoryType', name: '显存类型' },
        { key: 'memoryCapacity', name: '显存容量' },
        { key: 'memoryBandwidth', name: '显存位宽' },
        { key: 'maximumResolution', name: '最大分辨率' },
        { key: 'interfaceType', name: '接口类型' },
        { key: 'ioInterface', name: 'I/O接口' },
        { key: 'powerInterface', name: '电源接口' }
      ],
      croppa: {},
      dialogFormVisible: false,
      dataUrl: ''
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
    created() {
      if (this.$route.path.split('/')[2] === 'detail') {
        products.queryDetail(this.$route.query.id)
          .then(res => {
            console.log(res)
            this.form = res.data
          })
      }
    },
    onCancel() {
      this.form = {
        name: '', // 名称
        vendor: '', // 显卡厂商
        chip: '', // 显卡芯片
        series: '', // 显卡芯片系列
        craftsmanship: '', // 制作工艺
        code: '', // 核心代号
        codeFrequency: '', // 核心频率
        cuda: '', // CUDA核心
        memoryFrequency: '', // 显存频率
        memoryType: '', // 显存类型
        memoryCapacity: '', // 显存容量
        memoryBandwidth: '', // 显存位宽
        maximumResolution: '', // 最大分辨率
        interfaceType: '', // 接口类型
        ioInterface: '', // I/O接口
        powerInterface: '', // 电源接口
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
