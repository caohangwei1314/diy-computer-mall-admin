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
  name: 'Power',
  data() {
    return {
      form: {
        name: '', // 名称
        type: '', // 电源类型
        scope: '', // 使用范围
        rate: '', // 额定功率
        description: '', // 风扇描述
        size: '', // 电源尺寸
        motherboardInterface: '', // 主板接口
        cpuInterface: '', // CPU接口
        graphicsInterface: '', // 显卡接口
        hdType: '', // 硬盘接口
        powerInterface: '', // 供电接口
        acInput: '', // 交流接口
        output: '', // 12V输出电源
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'type', name: '电源类型' },
        { key: 'scope', name: '使用范围' },
        { key: 'rate', name: '额定功率' },
        { key: 'description', name: '风扇描述' },
        { key: 'size', name: '电源尺寸' },
        { key: 'motherboardInterface', name: '主板接口' },
        { key: 'cpuInterface', name: 'CPU接口' },
        { key: 'graphicsInterface', name: '显卡接口' },
        { key: 'hdType', name: '硬盘接口' },
        { key: 'powerInterface', name: '供电接口' },
        { key: 'acInput', name: '交流接口' },
        { key: 'output', name: '12V输出电源' }
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
        type: '', // 电源类型
        scope: '', // 使用范围
        rate: '', // 额定功率
        description: '', // 风扇描述
        size: '', // 电源尺寸
        motherboardInterface: '', // 主板接口
        cpuInterface: '', // CPU接口
        graphicsInterface: '', // 显卡接口
        hdType: '', // 硬盘接口
        powerInterface: '', // 供电接口
        acInput: '', // 交流接口
        output: '', // 12V输出电源
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
