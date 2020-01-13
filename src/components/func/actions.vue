<template>
  <div class="addactionfunc">
    <div class="functitle">互动设置</div>
    <div class="formtype">
      <a class="radiobox" @click="addElement('tele')"><em class="iconfont icon-bohao"></em> <p>拨号按钮</p></a>
      <a class="countbox" @click="addElement('link')"><em class="iconfont icon-lianjie"></em> <p>跳转按钮</p></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "actions",
  data() {
    return {
      link: {
        id: 0,
        type: 'link',
        name: '跳转',
        text: '跳转',
        value: 'https://www.dutuwang.net',
        x: 200,
        y: 50,
        width: 240,
        height: 80,
        borderRadius: 20,
        borderWidth: 0,
        borderColor: 'rgb(0, 0, 0)',
        borderStyle: 'none',
        color: 'rgb(255, 255, 255)',
        ani: '',
        duration: 1,
        delay: 1,
        iteration: '1',
        opacity: 0,
        rotate: 0,
        lineHeight: 1,
        letterSpacing: 0,
        fontFamily: 'SimHei',
        fontSize: 36,
        fontBold: false,
        fontStyle: false,
        textDecoration: false,
        textAlign: 'center',
        backgroundColor: 'rgb(26, 189, 155)',
        overflowWrap: 'break-word',
        zIndex: 0,
        active: true,
        isVisible: true,
        isActive: false,
        handles: ['tl','tm','tr','mr','br','bm','bl','ml'],
      },
      tele: {
        id: 0,
        type: 'tele',
        name: '电话',
        text: '拨打电话',
        value: '88888888',
        x: 200,
        y: 50,
        width: 240,
        height: 80,
        borderRadius: 20,
        borderWidth: 0,
        borderColor: 'rgb(0, 0, 0)',
        borderStyle: 'none',
        color: 'rgb(27, 206, 179)',
        ani: '',
        duration: 1,
        delay: 1,
        iteration: '1',
        opacity: 0,
        rotate: 0,
        lineHeight: 1,
        letterSpacing: 0,
        fontFamily: 'SimHei',
        fontSize: 36,
        fontBold: false,
        fontStyle: false,
        textDecoration: false,
        textAlign: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
        overflowWrap: 'break-word',
        zIndex: 0,
        active: true,
        isVisible: true,
        isActive: false,
        handles: ['tl','tm','tr','mr','br','bm','bl','ml'],
      }
    }
  },
  methods: {
    addElement: function (type) {
      var tpl = this[type];
      this.$emit('addMethods', JSON.stringify(tpl))
    }
  }
}
</script>

<style scoped>
  .addactionfunc {
    width: 280px
  }

  .addactionfunc .functitle {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #333;
    font-size: 16px;
    color: #a2a2a2;
    text-align: center
  }

  .addactionfunc .formtype {
    width: 230px;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 30px;
    border-bottom: 1px solid #4a4b4c
  }

  .addactionfunc .formtype a {
    float: left;
    width: 85px;
    height: 85px;
    margin: 20px 15px 0;
    background: #2e2e2f;
    border-radius: 4px;
    color: #a2a2a2
  }

  .addactionfunc .formtype a em {
    display: block;
    margin: 16px 0 8px;
    font-size: 30px;
    text-align: center
  }

  .addactionfunc .formtype a p {
    display: block;
    font-size: 14px;
    text-align: center
  }

  .addactionfunc .formtype a:hover {
    background: #1bceb3;
    color: #fff
  }
</style>
