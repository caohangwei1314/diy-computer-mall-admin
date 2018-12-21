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
  name: 'RAM',
  data() {
    return {
      form: {
        name: '', // 名称
        appropriateType: '', // 适用类型
        capacity: '', // 内存容量
        type: '', // 内存类型
        ramFrequency: '', // 内存主频
        stitches: '', // 针脚数
        slotType: '', // 插槽类型
        cl: '', // CL延迟
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      },
      keyAndName: [
        { key: 'appropriateType', name: '适用类型' },
        { key: 'capacity', name: '内存容量' },
        { key: 'type', name: '内存类型' },
        { key: 'ramFrequency', name: '内存主频' },
        { key: 'stitches', name: '针脚数' },
        { key: 'slotType', name: '插槽类型' },
        { key: 'cl', name: 'CL延迟' }
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
        appropriateType: '', // 适用类型
        capacity: '', // 内存容量
        type: '', // 内存类型
        ramFrequency: '', // 内存主频
        stitches: '', // 针脚数
        slotType: '', // 插槽类型
        cl: '', // CL延迟
        score: '', // 评分
        image: '', // 图片
        price: ''// 价格
      }
    }
  }
}
</script>
