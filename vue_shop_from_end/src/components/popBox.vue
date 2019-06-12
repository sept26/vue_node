<template>
  <main class="pop-box" v-if="popDisplay">
    <div class="modal"></div>
    <div class="pop-content" :style="{width:transWidth+'px',height:transHeight+'px'}" >
      <slot></slot>
      <div class="operate-btn" v-if = "!unnoramBtn">
        <button @click="submit">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  props: ['popVisible', 'height', 'width', 'unnoramOperate'],
  data () {
    return {
      popDisplay: this.popVisible,
      transWidth: this.width,
      transHeight: this.height,
      unnoramBtn: this.unnoramOperate
    }
  },
  methods: {
    // 确定
    submit () {
      this.popDisplay = false
      this.$emit('operatePop', true)
    },
    // 取消
    cancel () {
      this.popDisplay = false
      this.$emit('operatePop', false)
    }
  }
}
</script>
<style scoped lang="less">
.pop-box {
  .modal {
    position: fixed;
    background-color: rgba(0, 0, 0, .3);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .pop-content {
    position: fixed;
    width: 250px;
    height: 150px;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
    z-index: 99;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .operate-btn {
      position: absolute;
      bottom: 10px;
      button:first-child {
        margin-right: 10px;
      }
      button:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
