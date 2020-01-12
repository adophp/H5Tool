<template>
  <div class="addwordsfunc">
    <div class="functitle">文本</div>
    <div class="addtextbox">
      <a class="addtitle" @click="addElement('wordstitle')">点击添加正文标题</a>
      <!--<a class="addsubtitle">点击添加副标题</a>-->
      <a class="addtext" @click="addElement('wordstext')">点击添加正文</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "words",
  data(){
    return {
      wordstitle: {
        id: 0,
        type: 'text',
        name: '正文标题',
        value: '正文标题',
        x: 80,
        y: 280,
        width: 300,
        height: 62,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: 'rgb(0, 0, 0)',
        borderStyle: 'none',
        color: 'rgb(103, 103, 103)',
        ani: '',
        duration: 1,
        delay: 1,
        iteration: '1',
        opacity: 0,
        rotate: 0,
        lineHeight: 1,
        letterSpacing: 0,
        fontFamily: 'SimHei',
        fontSize: 48,
        fontBold: false,
        fontStyle: false,
        textDecoration: false,
        textAlign: '',
        backgroundColor: '',
        overflowWrap: 'break-word',
        zIndex: 0,
        active: true,
        isVisible: true,
        isActive: false,
        handles: ['tl','tr','br','bl'],
      },
      wordstext: {
        id: 0,
        type: 'text',
        name: '正文内容',
        value: '正文内容',
        x: 80,
        y: 200,
        width: 300,
        height: 50,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: 'rgb(0, 0, 0)',
        borderStyle: 'none',
        color: 'rgb(103, 103, 103)',
        ani: '',
        duration: 1,
        delay: 1,
        iteration: '1',
        opacity: 0,
        rotate: 0,
        lineHeight: 1,
        letterSpacing: 0,
        fontFamily: 'SimHei',
        fontSize: 32,
        fontBold: false,
        fontStyle: false,
        textDecoration: false,
        textAlign: '',
        backgroundColor: '',
        overflowWrap: 'break-word',
        zIndex: 0,
        active: true,
        isVisible: true,
        isActive: false,
        handles: ['tl','tr','br','bl'],
      },
    }
  },
  methods: {
    addElement(type) {
      var tpl = this[type];
      this.$emit('addMethods', JSON.stringify(tpl))
    }
  }
}
</script>

<style scoped>
.addwordsfunc {
  width: 280px
}

.addwordsfunc .functitle {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: #333;
  font-size: 16px;
  color: #a2a2a2;
  text-align: center
}

.addwordsfunc .addtextbox a {
  display: block;
  height: 60px;
  line-height: 60px;
  color: #a2a2a2;
  text-align: center
}

.addwordsfunc .addtextbox a:hover {
  background: #333;
  color: #1bceb3
}

.addwordsfunc .addtextbox a.addtitle {
  font-size: 20px
}

.addwordsfunc .addtextbox a.addsubtitle {
  font-size: 18px
}

.addwordsfunc .addtextbox a.addtext {
  font-size: 14px
}

.addwordsfunc .texttemplate {
  position: absolute;
  top: 250px;
  bottom: 20px;
  right: 20px;
  width: 240px;
  border-top: 1px solid #4a4b4c;
  overflow-y: auto
}
</style>
