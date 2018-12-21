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
  name: 'Mechanical',
  data() {
    return {
      form: {
        name: '', // 名称
        appropriateType: '', // 使用类型
        size: '', // 硬盘尺寸
        capacity: '', // 硬盘尺寸
        number: '', // 盘片数量
        singleCapacity: '', // 单碟容量
        cache: '', // 缓存
        rotatingSpeed: '', // 转速
        interfaceType: '', // 接口类型
        interfaceSpeed: '', // 接口速率
        externalRate: '', // 外部传输速率
        power: '', // 功率
        noisey: '', // 噪音
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'appropriateType', name: '使用类型' },
        { key: 'size', name: '硬盘尺寸' },
        { key: 'capacity', name: '硬盘尺寸' },
        { key: 'number', name: '盘片数量' },
        { key: 'singleCapacity', name: '单碟容量' },
        { key: 'cache', name: '缓存' },
        { key: 'rotatingSpeed', name: '转速' },
        { key: 'interfaceType', name: '接口类型' },
        { key: 'interfaceSpeed', name: '接口速率' },
        { key: 'externalRate', name: '外部传输速率' },
        { key: 'power', name: '功率' },
        { key: 'noisey', name: '噪音' }
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
        appropriateType: '', // 使用类型
        size: '', // 硬盘尺寸
        capacity: '', // 硬盘尺寸
        number: '', // 盘片数量
        singleCapacity: '', // 单碟容量
        cache: '', // 缓存
        rotatingSpeed: '', // 转速
        interfaceType: '', // 接口类型
        interfaceSpeed: '', // 接口速率
        externalRate: '', // 外部传输速率
        power: '', // 功率
        noisey: '', // 噪音
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
