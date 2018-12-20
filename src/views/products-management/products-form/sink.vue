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
  name: 'Sink',
  data() {
    return {
      form: {
        name: '', // 名称
        type: '', // 散热器类型
        mothed: '', // 散热方式
        scope: '', // 适用范围
        size: '', // 产品尺寸
        weight: '', // 产品重量
        temperature: '', // 智能温控
        powerParameter: '', // 电源参数
        inputPower: '', // 输入功率
        life: '', // 适用寿命
        fanSize: '', // 风扇尺寸
        bearingType: '', // 轴承类型
        maxRevolution: '', // 最高转数
        revolutionDescription: '', // 转数描述
        maxVolume: '', // 最大风量
        windPressure: '', // 风压
        noise: '', // 噪音
        heatPipes: '', // 热管数量
        pipesMaterial: '', // 热管材质
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'type', name: '散热器类型' },
        { key: 'mothed', name: '散热方式' },
        { key: 'scope', name: '适用范围' },
        { key: 'size', name: '产品尺寸' },
        { key: 'weight', name: '产品重量' },
        { key: 'temperature', name: '智能温控' },
        { key: 'powerParameter', name: '电源参数' },
        { key: 'inputPower', name: '输入功率' },
        { key: 'life', name: '适用寿命' },
        { key: 'fanSize', name: '风扇尺寸' },
        { key: 'bearingType', name: '轴承类型' },
        { key: 'maxRevolution', name: '最高转数' },
        { key: 'revolutionDescription', name: '转数描述' },
        { key: 'maxVolume', name: '最大风量' },
        { key: 'windPressure', name: '风压' },
        { key: 'noise', name: '噪音' },
        { key: 'heatPipes', name: '热管数量' },
        { key: 'pipesMaterial', name: '热管材质' }
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
        type: '', // 散热器类型
        mothed: '', // 散热方式
        scope: '', // 适用范围
        size: '', // 产品尺寸
        weight: '', // 产品重量
        temperature: '', // 智能温控
        powerParameter: '', // 电源参数
        inputPower: '', // 输入功率
        life: '', // 适用寿命
        fanSize: '', // 风扇尺寸
        bearingType: '', // 轴承类型
        maxRevolution: '', // 最高转数
        revolutionDescription: '', // 转数描述
        maxVolume: '', // 最大风量
        windPressure: '', // 风压
        noise: '', // 噪音
        heatPipes: '', // 热管数量
        pipesMaterial: '', // 热管材质
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
