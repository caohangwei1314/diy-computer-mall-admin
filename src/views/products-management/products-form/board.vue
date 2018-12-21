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
  name: 'Board',
  data() {
    return {
      form: {
        name: '', // 名称
        integratedChip: '', // 集成芯片
        series: '', // 主芯片组
        mainChipset: '', // 芯片组描述
        displayChip: '', // 显示芯片
        audioChip: '', // 音频芯片
        nicChip: '', // 网卡芯片
        cpuType: '', // CPU类型
        cpuSocket: '', // CPU插槽
        ramType: '', // 内存类型
        maxRam: '', // 最大内存容量
        ramDescription: '', // 内存描述
        pciE: '', // PCI-E标准
        pciESocket: '', // PCI-E插槽
        storageInterface: '', // 存储接口
        usb: '', // USB接口
        video: '', // 视频接口
        power: '', // 电源插口
        other: '', // 其它接口
        type: '', // 主板板型
        shape: '', // 外形尺寸
        bios: '', // BIOS性能
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'integratedChip', name: '集成芯片' },
        { key: 'series', name: '主芯片组' },
        { key: 'mainChipset', name: '芯片组描述' },
        { key: 'displayChip', name: '显示芯片' },
        { key: 'audioChip', name: '音频芯片' },
        { key: 'nicChip', name: '网卡芯片' },
        { key: 'cpuType', name: 'CPU类型' },
        { key: 'cpuSocket', name: 'CPU插槽' },
        { key: 'ramType', name: '内存类型' },
        { key: 'maxRam', name: '最大内存容量' },
        { key: 'ramDescription', name: '内存描述' },
        { key: 'pciE', name: 'PCI-E标准' },
        { key: 'pciESocket', name: 'PCI-E插槽' },
        { key: 'storageInterface', name: '存储接口' },
        { key: 'usb', name: 'USB接口' },
        { key: 'video', name: '视频接口' },
        { key: 'power', name: '电源插口' },
        { key: 'other', name: '其它接口' },
        { key: 'type', name: '主板板型' },
        { key: 'shape', name: '外形尺寸' },
        { key: 'bios', name: 'BIOS性能' }
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
        .catch(err => {
          console.log(err)
        })
    },
    onCancel() {
      this.form = {
        name: '', // 名称
        integratedChip: '', // 集成芯片
        series: '', // 主芯片组
        mainChipset: '', // 芯片组描述
        displayChip: '', // 显示芯片
        audioChip: '', // 音频芯片
        nicChip: '', // 网卡芯片
        cpuType: '', // CPU类型
        cpuSocket: '', // CPU插槽
        ramType: '', // 内存类型
        maxRam: '', // 最大内存容量
        ramDescription: '', // 内存描述
        pciE: '', // PCI-E标准
        pciESocket: '', // PCI-E插槽
        storageInterface: '', // 存储接口
        usb: '', // USB接口
        video: '', // 视频接口
        power: '', // 电源插口
        other: '', // 其它接口
        type: '', // 主板板型
        shape: '', // 外形尺寸
        bios: '', // BIOS性能
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
