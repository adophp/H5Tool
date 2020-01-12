<template>
  <div class="picfunc">
    <div class="picattr">
      <!--<div class="piceditbtn">-->
        <!--<a class="changepic">替换图片</a>-->
      <!--</div>-->
      <div class="editwrap">
        <div class="borderstyle">
          <p class="fl">边框颜色</p>
          <div class="bordercolor fl">
            <em class="curColor" :style="{background: ele.borderColor==null?'linear-gradient(150deg, transparent 49.5%, red 0px, red 51.5%, transparent 0px) rgb(238, 241, 246)':''}">
              <el-color-picker color-format="hex" v-model="ele.borderColor" :popper-class="excludeClassName"></el-color-picker>
            </em>
          </div>
          <div class="borderline fl">
            <el-select v-model="ele.borderStyle" placeholder="请选择" class="item-select">
              <el-option
                v-for="(item, key) in borderStyleOption"
                :key="key"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
                :class="excludeClassName">
                <span class="el-select-selected-value">{{item.label}}</span>
              </el-option>
            </el-select>
          </div>
          <div class="borderwidth inputbox fl">
            <el-input type="number" class="inputitem el-input-number" :value="ele.borderWidth" @input="(value) => formatStrtoFloat(value, 'borderWidth')" :min="0" :max="100" :step="1" placeholder="" autocomplete="off"></el-input>
            <em style="width: 16px;">px</em>
          </div>
        </div>

        <div class="borderradius">
          <p>圆角大小</p>
          <div class="editbox">
            <div class="slideboxbar fl">
              <el-slider v-model="ele.borderRadius" :min="0" :max="100" :step="1"></el-slider>
            </div>
            <div class="inputbox fl">
              <el-input type="number" class="inputitem el-input-number" :value="ele.borderRadius" @input="(value) => formatStrtoFloat(value, 'borderRadius')" :min="0" :max="100" :step="1" placeholder="" autocomplete="off"></el-input>
              <em>px</em>
            </div>
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
  name: "subpicture",
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
        x: 80,
        y: 200,
        width: 300,
        height: 50,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: 'rgb(0, 0, 0);',
        borderStyle: 'none',
        color: 'rgb(103, 103, 103);',
        ani: '',
        duration: 1,
        delay: 1,
        iteration: '1',
        opacity: 1,
        rotate: 0,
        lineHeight: 1,
        letterSpacing: 0,
        fontFamily: '',
        fontSize: 32,
        fontBold: false,
        fontStyle: false,
        textDecoration: false,
        textAlign: '',
        backgroundColor: '',
      }
    }
  },
  data() {
    return {
      ele: this.initEle,
      borderStyleOption: [
        {
          value: 'solid',
          label: '实线'
        },
        {
          value: 'dashed',
          label: '虚线'
        },
        {
          value: 'dotted',
          label: '点'
        },
      ]
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
.editwrap .borderstyle {
  overflow: hidden;
}
.editwrap .borderstyle > p {
  margin: 30px 0 0;
}
.editwrap .borderstyle .bordercolor {
  margin: 30px 10px 0;
}
.editwrap .borderstyle .borderline {
  float: left;
  width: 75px;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  background: #353535;
  color: #fff;
  margin: 30px 10px 0 0;
  border-radius: 4px;
}
.editwrap .borderstyle .borderwidth {
  margin: 30px 0 0;
  width: 63px;
}
.wordsfunc /deep/ p,.editwrap /deep/ p {
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
.item-select {
  width: 276px;
  height: 39px;
  line-height: 39px;
  font-size: 14px;
  background: rgb(53, 53, 53);
  color: rgb(174, 174, 174);
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
