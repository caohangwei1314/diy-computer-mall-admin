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
        productType: '', // 产品类型
        positioning: '', // 产品定位
        size: '', // 屏幕尺寸
        optimalResolution: '', // 最佳分辨率
        ratio: '', // 屏幕比例
        hd: '', // 高清标准
        panelType: '', // 面板类型
        backlightType: '', // 背光类型
        dynamicContrast: '', // 动态对比度
        staticContrast: '', // 静态对比度
        responseTime: '', // 响应时间
        pointDistance: '', // 点距
        brightness: '', // 亮度
        visibleArea: '', // 可视面积
        visibleAngle: '', // 可视角度
        displayColor: '', // 显示颜色
        scanning: '', // 扫描频率
        refreshRate: '', // 刷新率
        videoInterface: '', // 视频接口
        otherInterface: '', // 其他接口
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'productType', name: '产品类型' },
        { key: 'positioning', name: '产品定位' },
        { key: 'size', name: '屏幕尺寸' },
        { key: 'optimalResolution', name: '最佳分辨率' },
        { key: 'ratio', name: '屏幕比例' },
        { key: 'hd', name: '高清标准' },
        { key: 'panelType', name: '面板类型' },
        { key: 'backlightType', name: '背光类型' },
        { key: 'dynamicContrast', name: '动态对比度' },
        { key: 'staticContrast', name: '静态对比度' },
        { key: 'responseTime', name: '响应时间' },
        { key: 'pointDistance', name: '点距' },
        { key: 'brightness', name: '亮度' },
        { key: 'visibleArea', name: '可视面积' },
        { key: 'visibleAngle', name: '可视角度' },
        { key: 'displayColor', name: '显示颜色' },
        { key: 'scanning', name: '扫描频率' },
        { key: 'refreshRate', name: '刷新率' },
        { key: 'videoInterface', name: '视频接口' },
        { key: 'otherInterface', name: '其他接口' }
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
        productType: '', // 产品类型
        positioning: '', // 产品定位
        size: '', // 屏幕尺寸
        optimalResolution: '', // 最佳分辨率
        ratio: '', // 屏幕比例
        hd: '', // 高清标准
        panelType: '', // 面板类型
        backlightType: '', // 背光类型
        dynamicContrast: '', // 动态对比度
        staticContrast: '', // 静态对比度
        responseTime: '', // 响应时间
        pointDistance: '', // 点距
        brightness: '', // 亮度
        visibleArea: '', // 可视面积
        visibleAngle: '', // 可视角度
        displayColor: '', // 显示颜色
        scanning: '', // 扫描频率
        refreshRate: '', // 刷新率
        videoInterface: '', // 视频接口
        otherInterface: '', // 其他接口
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
