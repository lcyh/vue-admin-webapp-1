<template>
  <div class="className">
    <h1>nav1</h1>
    <el-form
      ref="dynamicValidateForm"
      :rules="formRules"
      :inline="true"
      :model="form"
      label-width="80px"
    >
      <!-- 固定项目 -->
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" palceholder="请输入姓名"> </el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" palceholder="请输入手机号"> </el-input>
      </el-form-item>
      <!-- 动态增加项目 -->
      <!-- 不止一个项目，用div包裹起来 -->
      <div v-for="(item, index) in form.dynamicItem" :key="index">
        <el-form-item
          label="游戏类型"
          :prop="'dynamicItem.' + index + '.gameType'"
          :rules="{
            required: true,
            message: '游戏类型不能为空',
            trigger: 'blur'
          }"
        >
          <el-select v-model="form.gameType" placeholde="请选择状态">
            <el-option
              v-for="item in gameTypeOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="游戏"
          :prop="'dynamicItem.' + index + '.games'"
          :rules="{
            required: true,
            message: '游戏不能为空',
            trigger: 'blur'
          }"
        >
          <el-select
            v-model="form.games"
            :filterable="form.gameType == 'single' ? true : false"
            :multiple="form.gameType == 'single' ? true : false"
            :disabled="form.gameType == 'single' ? false : true"
            placeholde="请选择状态"
          >
            <el-option
              v-for="item in gamesOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">
        提交
      </el-button>
      <el-button @click="addItem">增加</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav1',
  data() {
    return {
      form: {
        name: 'lc',
        phone: '17623451234',
        gameType: 'single',
        games: 'all',
        dynamicItem: []
      },
      gameTypeOptions: [
        { value: 'single', label: '单游戏' },
        { value: 'strategy', label: '策略游戏' },
        { value: 'gameType', label: '游戏类型' }
      ],
      gamesOptions: [
        { value: 'all', label: '公主连结-全部SDK' },
        { value: 'ios', label: '公主连结-iOS' },
        { value: 'android', label: '公主连结-Android' }
      ],
      formRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid, values) => {
        console.log('valid-values', { valid, values })
        if (valid) {
          alert('submit!')
          console.log('this.form', this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    deleteItem(item) {
      let index = this.form.dynamicItem.indexOf(item)
      if (index !== -1) {
        this.form.dynamicItem.splice(index, 1)
      }
    },
    addItem() {
      this.form.dynamicItem.push({
        name: '',
        phone: ''
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
