<template>
  <div :class="$style.container">
    <div :class="$style.wrapper">
      <div :class="$style.forbid_img">
        <img src="../../assets/403/403.png" alt="" />
      </div>
      <div :class="$style.forbid_box">
        <p :class="$style.forbid_tips">抱歉，你无权访问该页面</p>
        <el-button type="primary" @click="onClick">返回登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Forbiddance',
  methods: {
    onClick() {
      this.$store.dispatch('user/loginOut').then(() => {
        // window.location.href =
        //   'http://data-portal.bilibili.co/logout?caller=game-data-center'
      })
    }
  }
}
</script>
<style lang="scss" module>
.container {
  height: 100%;
  .wrapper {
    text-align: center;
    padding-top: 10%;
    margin: 0 auto;
    .forbid_img {
      display: inline-block;
      vertical-align: middle;
    }
    .forbid_box {
      text-align: left;
      display: inline-block;
      vertical-align: middle;
    }
    .forbid_title {
      margin-bottom: 24px;
      color: #515a6e;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }
    .forbid_tips {
      margin-bottom: 16px;
      color: #808695;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
