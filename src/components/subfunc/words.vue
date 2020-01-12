<template>
  <div class="wordsfunc">
    <div class="fontattr">
      <div class="wordscontent">
        <p>内容</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 8}"
          placeholder="请输入内容"
          :show-word-limit="showWordLimit"
          v-model="ele.value">
        </el-input>
      </div>
      <div class="fontfamily pr">
        <p>字体(商用请自行修改源码)</p>
        <el-select v-model="ele.fontFamily" placeholder="请选择" class="item-select">
          <el-option
            v-for="(item, key) in fontfamilyoption"
            :key="key"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            :class="excludeClassName">
            <span class="el-select-selected-value">{{item.label}}</span>
          </el-option>
        </el-select>
      </div>
      <div class="fontsize">
        <p>字号</p>
        <el-select v-model="ele.fontSize" placeholder="请选择" class="item-select">
          <el-option
            v-for="(item,index) in fontoption"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            :class="excludeClassName"
          >
            <span class="el-select-selected-value">{{item.label}}</span>
          </el-option>
        </el-select>
      </div>
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
      <div class="fontstyle">
          <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
            <a class="iconfont icon-jiacu" :class="{'active': ele.fontBold==true}" @click="ele.fontBold=!ele.fontBold"></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="倾斜" placement="bottom">
            <a class="iconfont icon-qingxie" :class="{'active': ele.fontStyle==true}" @click="ele.fontStyle=!ele.fontStyle"></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下划线" placement="bottom">
            <a class="iconfont icon-xiahuaxian" :class="{'active': ele.textDecoration==true}" @click="ele.textDecoration=!ele.textDecoration"></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="清除样式" placement="bottom">
            <a class="iconfont icon-qingchuyangshi" @click="clearFont"></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="左对齐" placement="bottom">
            <a class="iconfont icon-zuoduiqi" :class="{'active': ele.textAlign=='left'}" @click="ele.textAlign=(ele.textAlign=='left'?'':'left')"></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="居中" placement="bottom">
            <a class="iconfont icon-juzhong" :class="{'active': ele.textAlign=='center'}" @click="ele.textAlign=(ele.textAlign=='center'?'':'center')"></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="右对齐" placement="bottom">
            <a class="iconfont icon-youduiqi" :class="{'active': ele.textAlign=='right'}" @click="ele.textAlign=(ele.textAlign=='right'?'':'right')"></a>
          </el-tooltip>
      </div>
      <div class="letterspacing">
        <p>字距</p>
        <div class="editbox">
          <div class="slideboxbar fl">
            <el-slider v-model="ele.letterSpacing" :min="0" :max="100" :step="1"></el-slider>
          </div>
          <div class="inputbox fl">
            <el-input type="number" class="inputitem el-input-number" :value="ele.letterSpacing" @input="(value) => formatStrtoFloat(value, 'letterSpacing')" :min="0" :max="100" placeholder="" autocomplete="off"></el-input>
            <em>px</em>
          </div>
        </div>
      </div>
      <div class="lineheight">
        <p>行距</p>
        <div class="editbox">
          <div class="slideboxbar fl">
            <el-slider v-model="ele.lineHeight" :min="0" :max="20" :step="0.1"></el-slider>
          </div>
          <div class="inputbox fl">
            <el-input type="number" class="inputitem el-input-number" :value="ele.lineHeight" @input="(value) => formatStrtoFloat(value, 'lineHeight')" :min="0" :max="20" :step="0.1" placeholder="" autocomplete="off"></el-input>
            <em>倍</em>
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
  name: "subwords",
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
      showWordLimit: true,
      fontfamilyoption: [
        {
          value: 'SimHei',
          label: '黑体'
        },
        {
          value: 'SimSun',
          label: '宋体'
        },
        {
          value: 'NSimSun',
          label: '新宋体'
        },
        {
          value: 'Microsoft YaHei',
          label: '微软雅黑'
        },
        {
          value: 'KaiTi',
          label: '楷体'
        },
        {
          value: 'YouYuan',
          label: '幼圆'
        },
        {
          value: 'FangSong',
          label: '仿宋'
        },
        {
          value: 'Arial',
          label: 'Arial'
        },
        {
          value: 'sans-serif',
          label: 'Sans-serif'
        },
        {
          value: 'Tahoma',
          label: 'Tahoma'
        },
        {
          value: 'Helvetica',
          label: 'Helvetica'
        },
        {
          value: 'Hiragino Sans GB',
          label: 'Hiragino Sans GB'
        },
      ],
      fontoption: [
        {
          value: 12,
          label: '12px'
        },
        {
          value: 13,
          label: '13px'
        },
        {
          value: 14,
          label: '14px'
        },
        {
          value: 16,
          label: '16px'
        },
        {
          value: 18,
          label: '18px'
        },
        {
          value: 20,
          label: '20px'
        },
        {
          value: 22,
          label: '22px'
        },
        {
          value: 24,
          label: '24px'
        },
        {
          value: 26,
          label: '26px'
        },
        {
          value: 28,
          label: '28px'
        },
        {
          value: 30,
          label: '30px'
        },
        {
          value: 32,
          label: '32px'
        },
        {
          value: 34,
          label: '34px'
        },
        {
          value: 36,
          label: '36px'
        },
        {
          value: 40,
          label: '40px'
        },
        {
          value: 44,
          label: '44px'
        },
        {
          value: 46,
          label: '46px'
        },
        {
          value: 48,
          label: '48px'
        },
        {
          value: 50,
          label: '50px'
        },
        {
          value: 54,
          label: '54px'
        },
        {
          value: 58,
          label: '58px'
        },
        {
          value: 60,
          label: '60px'
        },
        {
          value: 64,
          label: '64px'
        },
        {
          value: 68,
          label: '68px'
        },
        {
          value: 72,
          label: '72px'
        },
        {
          value: 80,
          label: '80px'
        },
        {
          value: 88,
          label: '88px'
        },
        {
          value: 96,
          label: '96px'
        },
        {
          value: 102,
          label: '102px'
        },
        {
          value: 120,
          label: '120px'
        },
      ],
    }
  },
  methods: {
    formatStrtoFloat(value, field) {
      this.ele[field] = parseFloat(value);
    },
    clearFont(){
      this.ele.fontBold = false
      this.ele.fontStyle = false
      this.ele.textDecoration = false
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
  .wordsfunc {
    width: 340px;
    height: 100%;
    background: #404040
  }

  .wordsfunc .fontattr {
    position: absolute;
    top: 44px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden
  }

  .wordsfunc .fontattr .fontfamily, .wordsfunc .fontattr .fontsize, .wordsfunc .fontattr .letterspacing, .wordsfunc .fontattr .lineheight, .wordsfunc .wordscontent {
    width: 276px;
    margin: 10px auto
  }

  .wordsfunc .fontattr /deep/ .el-input--small .el-input__inner{
    background-color: transparent;
    border: 0 none;
    color: rgb(174, 174, 174);
  }
  .wordsfunc .fontattr .fontcolor {
    width: 276px;
    margin: 20px auto;
    overflow: hidden
  }
  .wordsfunc .fontattr .fontcolor span {
    float: left;
    height: 30px;
    line-height: 30px;
    color: #a2a2a2;
    margin-right: 10px;
    font-size: 14px
  }

  .wordsfunc .fontattr .fontcolor em.curColor {
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

  .wordsfunc .fontattr .fontstyle {
    width: 276px;
    margin: 20px auto;
    text-align: center
  }

  .wordsfunc .fontattr .fontstyle a {
    display: inline-block;
    width: 30px;
    height: 27px;
    margin: 0 1px;
    line-height: 27px;
    color: #ccc;
    border: 1px solid #404040
  }

  .wordsfunc .fontattr .fontstyle a.active {
    background: #333;
    border: 1px solid #565758;
    border-radius: 4px
  }

  .wordsfunc .fontattr .editbox {
    overflow: hidden;
    padding-left: 10px
  }

  .wordsfunc .inputbox em {
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
  overflow: hidden;
}
.editwrap {
  width: 276px;
  padding: 0 32px;
  margin: 30px 0;
  border-top: 6px solid #4a4b4c
}

.editwrap .editbox {
  overflow: hidden;
  padding-left: 10px
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
</style>
