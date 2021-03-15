<template>
  <section class="drag-wrapper">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-rank"></i> 拖拽组件</el-breadcrumb-item
        >
        <el-breadcrumb-item>拖拽排序</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
        <el-tab-pane label="首页公告栏" name="first">
          <el-card class="first-tab-wrapper">
            <div slot="header" class="first-tab-header">
              <span>公告配置</span>
              <el-button
                v-if="!canEditable"
                type="text"
                class="edit"
                @click="handleEdit"
                >编辑</el-button
              >
              <span v-else class="edit">
                <el-button
                  type="text"
                  class="save"
                  @click="handleSave('ruleForm')"
                  >保存</el-button
                >
                <el-button
                  type="text"
                  class="cancle"
                  @click="handleCancle('ruleForm')"
                  >取消</el-button
                >
              </span>
            </div>
            <el-card>
              <div slot="header">
                <span>选择栏目位</span>
              </div>
              <div class="drag-box">
                <div class="box-left">
                  <draggable
                    v-model="todo"
                    @remove="removeHandle"
                    :options="dragOptions"
                  >
                    <transition-group tag="div" id="todo" class="item-ul">
                      <div
                        v-for="(item, index) in todo"
                        class="drag-list"
                        :key="item.id"
                      >
                        <div
                          @click="handleClick(item)"
                          :class="[
                            'list-item',
                            currentActive === `${item.id}` ? 'actived' : '',
                          ]"
                        >
                          {{ item.content
                          }}{{ (index + 1) | formatNumber }} 拖动排序
                        </div>
                      </div>
                    </transition-group>
                  </draggable>
                </div>
                <el-card class="box-right">
                  <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="ruleForm"
                  >
                    <el-form-item label="标题" prop="title">
                      <el-input
                        :disabled="!canEditable"
                        v-model="ruleForm.title"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="desc">
                      <el-input
                        :disabled="!canEditable"
                        type="textarea"
                        placeholder="请输入"
                        v-model="ruleForm.desc"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="跳转菜单" prop="jumpMenu">
                      <el-select
                        :disabled="!canEditable"
                        v-model="ruleForm.jumpMenu"
                        placeholder="请选择"
                      >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="文档链接" prop="links">
                      <el-input
                        :disabled="!canEditable"
                        v-model="ruleForm.links"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </el-card>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="提示栏" name="second">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>提示栏配置</span>
            </div>
            <div>提示栏</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="预留位" name="third">预留位</el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'draglist',
  data() {
    return {
      dragOptions: {
        animation: 120,
        scroll: true,
        group: 'sortlist',
        ghostClass: 'ghost-style',
      },
      tabList: [
        { label: '首页公告栏', id: '1' },
        { label: '提示栏', id: '2' },
        { label: '预留位', id: '3' },
      ],
      currentActive: '',
      activeTabName: 'first',
      canEditable: false,
      todo: [
        {
          id: 1,
          content: '栏目',
        },
        {
          id: 2,
          content: '栏目',
        },
        {
          id: 3,
          content: '栏目',
        },
      ],
      ruleFormInitData: {
        '1': {
          title: '标题1',
          desc: '阿斯顿发送到',
          jumpMenu: '/user/list',
          links: 'http://www.baidu.com',
        },
        '2': {
          title: '标题2',
          desc: '哈哈哈',
          jumpMenu: '/user/list',
          links: 'http://www.baidu.com',
        },
        '3': {
          title: '',
          desc: '',
          jumpMenu: '/user/list',
          links: 'http://www.baidu.com',
        },
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ruleForm() {
      console.log(
        'computed-this.ruleFormInitData[this.currentActive]',
        this.currentActive,
        this.ruleFormInitData[this.currentActive],
      )
      return this.ruleFormInitData[this.currentActive]
    },
  },
  components: {
    draggable,
  },
  filters: {
    formatNumber(val) {
      switch (val) {
        case 1:
          return '一'
        case 2:
          return '二'
        case 3:
          return '三'
        default:
          return '一'
      }
    },
  },
  created() {
    this.currentActive = `${this.todo[0].id}`
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    handleClick(item) {
      if (this.currentActive === `${item.id}`) return false
      // 点击不同的dragItem才调接口
      this.currentActive = `${item.id}`
      console.log('handleClick', item)
    },
    removeHandle(event) {
      console.log(event)
      this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `)
    },
    handleEdit() {
      this.canEditable = true
    },
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        this.canEditable = true
        if (valid) {
          console.log('保存', {
            ruleForm: this.ruleForm,
            currentActive: this.currentActive,
            formData: this.ruleForm,
          })
          // 调后端接口保存成功后
          // this.canEditable = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancle(formName) {
      this.canEditable = false
      console.log('取消', {
        ruleForm: this.ruleForm,
        currentActive: this.currentActive,
        formData: this.ruleForm,
      })
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.drag-wrapper {
  padding: 10px;
  .crumbs {
    padding: 10px;
  }
  .first-tab-wrapper {
    .edit {
      float: right;
      padding: 3px 0;
    }
    .save,
    .cancle {
      margin-left: 5px;
      padding: 0;
    }
    .first-tab-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .drag-box {
      display: flex;
      user-select: none;
      .ghost-style {
        display: block;
        color: transparent;
        border-style: dashed;
      }
      .box-left {
        max-width: 300px;
        min-width: 200px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
        .item-ul {
          padding: 0 8px 8px;
          height: 500px;
          overflow-y: scroll;
          .drag-list {
            margin: 5px 0 10px;
            .list-item {
              border: 1px #e1e4e8 solid;
              list-style: none;
              background-color: #fff;
              border-radius: 6px;
              cursor: pointer;
              -webkit-transition: border 0.3s ease-in;
              transition: border 0.3s ease-in;
              padding: 10px;
            }
            .list-item:hover {
              border: 1px solid #20a0ff;
            }
            .actived {
              background: #20a0ff;
            }
          }
        }
        .item-ul::-webkit-scrollbar {
          width: 0;
        }
      }
      .box-right {
        flex: 1;
      }
    }
  }
}
</style>
