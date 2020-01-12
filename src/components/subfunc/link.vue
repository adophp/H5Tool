<template>
  <div class="actionfunc">
    <div class="actionattr">
      <div class="phonecallfunc">
        <p>按钮内容</p>
        <input type="text" class="inputbox" v-model="ele.text" />
        <p>链接地址</p>
        <input type="text" class="inputbox" v-model="ele.value" />
        <div class="fontcolor">
          <div class="textcolor fl">
            <span>文字颜色</span>
            <em class="curColor" :style="{background: ele.color==null?'linear-gradient(150deg, transparent 49.5%, red 0px, red 51.5%, transparent 0px) rgb(238, 241, 246)':''}">
              <el-color-picker color-format="hex" v-model="ele.color" :popper-class="excludeClassName"></el-color-picker>
            </em>
          </div>
          <div class="bgcolor fr">
            <span>底色填充</span>
            <em class="curColor" :style="{background: ele.backgroundColor==null?'linear-gradient(150deg, transparent 49.5%, red 0px, red 51.5%, transparent 0px) rgb(238, 241, 246)':''}">
              <el-color-picker color-format="hex" v-model="ele.backgroundColor" :popper-class="excludeClassName"></el-color-picker>
            </em>
          </div>
        </div>
      </div>

      <div class="editwrap">
        <div class="rotatebox">
          <p>旋转</p>
          <div class="editbox">
            <div class="slideboxbar fl">
              <el-slider v-model="ele.rotate" :min="0" :max="360" :step="1"></el-slider>
            </div>
            <div class="inputbox fl">
              <el-input type="number" class="inputitem el-input-number" :value="ele.rotate" @input="(value) => formatStrtoFloat(value, 'rotate')" :min="0" :max="360" :step="1" placeholder="" autocomplete="off"></el-input>
              <em>度</em>
            </div>
          </div>
        </div>
        <div class="opacitybox">
          <p>透明度</p>
          <div class="editbox">
            <div class="slideboxbar fl">
              <el-slider v-model="ele.opacity" :min="0" :max="100" :step="1"></el-slider>
            </div>
            <div class="inputbox fl">
              <el-input type="number" class="inputitem el-input-number" :value="ele.opacity" @input="(value) => formatStrtoFloat(value, 'opacity')" :min="0" :max="100" :step="1" placeholder="" autocomplete="off"></el-input>
              <em>%</em>
            </div>
          </div>
        </div>
        <div class="sizebox">
          <p>大小</p>
          <div class="editbox2 fl">
            <p>宽</p>
            <div class="inputbox fl">
              <el-input type="number" class="inputitem el-input-number" :value="ele.width" @input="(value) => formatStrtoFloat(value, 'width')" :min="0" :step="1" placeholder="" autocomplete="off"></el-input>
              <em>px</em>
            </div>
          </div>
          <div class="editbox2 fr">
            <p>高</p>
            <div class="inputbox fl">
              <el-input type="number" class="inputitem el-input-number" :value="ele.height" @input="(value) => formatStrtoFloat(value, 'height')" :min="0" :step="1" placeholder="" autocomplete="off"></el-input>
              <em>px</em>
            </div>
          </div>
        </div>
        <div class="positionbox">
          <p>位置</p>
          <div class="editbox2 fl">
            <p>X</p>
            <div class="inputbox fl">
              <el-input type="number" class="inputitem el-input-number" :value="ele.x" @input="(value) => formatStrtoFloat(value, 'x')" :step="1" placeholder="" autocomplete="off"></el-input>
              <em>px</em>
            </div>
          </div>
          <div class="editbox2 fr">
            <p>Y</p>
            <div class="inputbox fl">
              <el-input type="number" class="inputitem el-input-number" :value="ele.y" @input="(value) => formatStrtoFloat(value, 'y')" :step="1" placeholder="" autocomplete="off"></el-input>
              <em>px</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sublink",
  props: {
    id: {
      type: String,
      default: ''
    },
    excludeClassName: {
      type: String,
      default: ''
    },
    initEle: {
      type: Object,
      default: {
        type: 'link',
        name: '跳转 ',
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
        lineHeight: 80,
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
      }
    }
  },
  data() {
    return {
      ele: this.initEle
    }
  },
  methods: {
    formatStrtoFloat(value, field) {
      this.ele[field] = parseFloat(value);
    }
  },
  watch: {
    ele: {
      handler(newData, oldData){
        this.$emit('setElementNode', this.id, newData)
      },
      deep: true,
    },
  }
}
</script>

<style scoped>
.actionfunc {
  width: 340px;
  height: 100%;
  background: #404040
}
.actionfunc .actionattr {
  position: absolute;
  top: 44px;
  bottom: 0;
  right: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden
}
.actionfunc .actionattr .phonecallfunc p {
  width: 276px;
  margin: 15px auto 5px;
  color: #a2a2a2;
  font-size: 14px;
}
.actionfunc .actionattr .phonecallfunc .inputbox {
  display: block;
  float: unset;
  width: 236px;
  margin: 0 auto;
  height: 34px;
  padding: 0 20px;
  line-height: 34px;
  background: #353535;
  border: 1px solid #353535;
  color: #ccc;
  border-radius: 4px;
  font-size: 14px
}
.actionfunc .actionattr /deep/ .el-input--small .el-input__inner{
  background-color: transparent;
  border: 0 none;
  color: rgb(174, 174, 174);
}
.actionfunc .actionattr .fontcolor {
  width: 276px;
  margin: 20px auto;
  overflow: hidden
}
.actionfunc .actionattr .fontcolor span {
  float: left;
  height: 30px;
  line-height: 30px;
  color: #a2a2a2;
  margin-right: 10px;
  font-size: 14px
}

.actionfunc .actionattr .fontcolor em.curColor {
  float: left;
  height: 28px;
  width: 48px;
  margin-right: 10px;
  border: 1px solid #1bceb3;
  border-radius: 4px;
  overflow: hidden
}
.curColor /deep/ .el-color-picker__icon, .curColor /deep/ .el-color-picker__empty {
  display: none;
}
.curColor /deep/ .el-color-picker--small {
  height: 28px;
}
.curColor /deep/ .el-color-picker__color {
  border: 0 none;
}
.curColor /deep/ .el-color-picker--small .el-color-picker__trigger {
  width: 48px;
  height: 28px;
  padding: 0;
  border: 0 none;
  border-radius: 0;
}

.actionfunc .actionattr .fontstyle {
  width: 276px;
  margin: 20px auto;
  text-align: center
}

.actionfunc .actionattr .fontstyle a {
  display: inline-block;
  width: 30px;
  height: 27px;
  margin: 0 1px;
  line-height: 27px;
  color: #ccc;
  border: 1px solid #404040
}

.actionfunc .actionattr .fontstyle a.active {
  background: #333;
  border: 1px solid #565758;
  border-radius: 4px
}

.actionfunc .actionattr .editbox {
  overflow: hidden;
  padding-left: 10px
}

.actionfunc .inputbox em {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-style: normal;
  text-align: left;
  font-size: 14px
}

.actionfunc .linkbox {
  width: 276px;
  margin: 0 auto
}

.actionfunc .linkbox .selectbox {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background: #353535;
  color: #fff;
  border-radius: 4px
}

.actionfunc .linkbox .topage span {
  float: left;
  width: 84px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #fff
}

.actionfunc .linkbox .toaddress input {
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  margin: 0;
  border: 0;
  line-height: 40px;
  font-size: 14px;
  background: #353535;
  color: #fff;
  border-radius: 4px
}
.positionbox, .sizebox {
  margin: 0 auto;
  overflow: hidden;
}
.editwrap {
  width: 276px;
  padding: 0 32px;
  margin: 30px 0;
  border-top: 6px solid #4a4b4c
}
.picattr .editwrap:first-child {
  border-top: 0 none;
  margin-top: 10px;
}
.editwrap .editbox {
  overflow: hidden;
  padding-left: 10px
}
.actionfunc /deep/ p,.editwrap /deep/ p {
  height: 30px;
  line-height: 30px;
  margin: 15px 0 5px;
  color: #a2a2a2;
  font-size: 14px
}
.slideboxbar .el-slider {
  width: 160px; margin-right: 16px;
}
.inputbox {
  position: relative;
  float: left;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #3a3a3a;
  border-radius: 4px;
  overflow: hidden
}

.inputitem {
  float: left;
  width: 40px;
  height: 30px;
  padding: 0 0 0 15px;
  border: 0;
  font-size: 14px
}
.inputitem /deep/ input.el-input__inner {
  padding: 0;
  border-radius: 0;
  border: 0 none;
  display: block;
  width: 100%;
  height: inherit;
  line-height: inherit;
  text-align: left;
  outline: 0;
  -moz-appearance: textfield;
  color: inherit;
  background: inherit;
  transition: all .2s linear;
  text-indent: inherit;
}
.inputbox em {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-style: normal;
  text-align: left;
  font-size: 14px
}

.positionbox, .sizebox {
  margin: 0 auto;
  overflow: hidden
}

.editbox2 p {
  float: left;
  margin: 0;
  width: 23px;
  height: 30px;
  line-height: 30px
}
.editwrap .borderstyle .borderline .item-select {
  max-width: 100%;
  height: 30px;
  line-height: 30px;
}
.editwrap .borderstyle .borderline .item-select /deep/ .el-input--small .el-input__inner {
  height: 30px;
  border: 0 none;
  background: rgb(53, 53, 53);
  color: #fff;
  line-height: 30px;
}
.borderwidth /deep/ .inputitem {
  width: 27px;
}
</style>
