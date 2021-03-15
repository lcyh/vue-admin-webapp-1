<template>
  <div class="form-test">
    <h1>nav1</h1>
    <el-form
      class="form-content"
      ref="dynamicValidateForm"
      :rules="formRules"
      :inline="true"
      :model="form"
      label-width="80px"
    >
      <div class="game-table-header">
        <el-form-item>游戏类型</el-form-item>
        <el-form-item>
          <div class="header-label">游戏</div>
        </el-form-item>
        <el-form-item>
          <div class="header-label">权限有效期</div>
        </el-form-item>
        <el-form-item>
          <div class="header-label">权限到期时间</div>
        </el-form-item>
        <el-form-item>操作</el-form-item>
      </div>
      <div
        class="form-row"
        v-for="(item, index) in form.dynamicItem"
        :key="index"
      >
        <el-form-item
          label=""
          :prop="'dynamicItem.' + index + '.gameType'"
          :rules="{
            required: true,
            message: '游戏类型不能为空',
            trigger: 'blur',
          }"
        >
          <el-select v-model="item.gameType" placeholde="请选择状态">
            <el-option
              v-for="item in gameTypeOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label=""
          :prop="'dynamicItem.' + index + '.games'"
          :rules="{
            required: true,
            message: '游戏不能为空',
            trigger: 'blur',
          }"
        >
          <el-select
            v-model="item.games"
            filterable
            multiple
            :disabled="form.dynamicItem[index].gameType != 'single'"
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
        <el-form-item
          label=""
          :prop="'dynamicItem.' + index + '.accessTime'"
          :rules="{
            required: true,
            message: '权限有效期不能为空',
            trigger: 'blur',
          }"
        >
          <el-select v-model="item.accessTime" placeholde="请选择状态">
            <el-option
              v-for="item in datesOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=""
          >{{ item.accessTime | statusText }}
        </el-form-item>
        <el-form-item>
          <el-popover placement="top" v-model="item.visible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="item.visible = false"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="deleteItem(item, index)"
                >确定</el-button
              >
            </div>
            <i slot="reference" class="el-icon-delete"></i>
          </el-popover>
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
import { getAfterDayDate } from '@/utils/dateTransform'
export default {
  name: 'Nav1',
  data() {
    return {
      visible: false,
      form: {
        name: 'lc',
        phone: '17623451234',
        dynamicItem: [
          {
            gameType: 'strategy',
            games: ['all'],
            accessTime: '1 month',
          },
          {
            gameType: 'single',
            games: ['all', 'ios'],
            accessTime: '3 month',
          },
        ],
      },
      gameTypeOptions: [
        { value: 'single', label: '单游戏' },
        { value: 'strategy', label: '策略游戏' },
        { value: 'gameType', label: '游戏类型' },
      ],
      gamesOptions: [
        { value: 'all', label: '公主连结-全部SDK' },
        { value: 'ios', label: '公主连结-iOS' },
        { value: 'android', label: '公主连结-Android' },
      ],
      datesOptions: [
        { value: '1 day', label: '1天' },
        { value: '7 day', label: '7天' },
        { value: '15 day', label: '15天' },
        { value: '1 month', label: '1个月' },
        { value: '3 month', label: '3个月' },
        { value: '6 month', label: '6个月' },
        { value: '1 year', label: '1年' },
      ],
      formRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
          },
        ],
      },
    }
  },
  filters: {
    statusText(val) {
      let time = getAfterDayDate(30 * 6)
      switch (val) {
        case '1 day':
          time = getAfterDayDate(1)
          return time
        case '7 day':
          time = getAfterDayDate(7)
          return time
        case '15 day':
          time = getAfterDayDate(15)
          return time
        case '1 month':
          time = getAfterDayDate(30)
          return time
        case '3 month':
          time = getAfterDayDate(30 * 3)
          return time
        case '6 month':
          time = getAfterDayDate(30 * 6)
          return time
        case '1 year':
          time = getAfterDayDate(365)
          return time
        default:
          return time
      }
    },
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
    deleteItem(item, index) {
      this.form.dynamicItem.splice(index, 1)
      item.visible = false
    },
    addItem() {
      this.form.dynamicItem.push({
        gameType: 'single',
        games: [],
        accessTime: '6 month',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.form-test {
  background: #fff !important;
  .game-table-header {
    display: flex;
    width: 100%;
    background-color: #eff3fd;
    .header-label {
      &::before {
        display: inline-block;
        margin-right: 4px;
        color: #ff4d4f;
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
        content: '*';
      }
    }
    .el-form-item {
      flex: 1;
      margin-bottom: 0px;
      line-height: 50px;
      height: 50px;
    }
  }
  .form-content {
    .form-row {
      display: flex;
      .el-form-item {
        display: flex;
        align-items: center;
        flex: 1;
        margin-bottom: 0px;
        line-height: 60px;
        height: 60px;
        border-bottom: 1px solid #eff3fd;
        .el-icon-delete {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
