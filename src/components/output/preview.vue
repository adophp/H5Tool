<template>
  <div class="workwrap">
    <div class="workcont">
      <div class="swiper-container" style="cursor: grab;" ref="mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(page,index) in pageList" :key="index" :style="{background: page.backgroundImage==''?(page.backgroundColor==''?'rgb(255, 255, 255)':page.backgroundColor):'url('+page.backgroundImage+') left top / 100% 100% no-repeat'}">
              <div class="elementCanvas" style="transform-origin: 0 0;" :style="{transform: previewState?'scale(0.5)':''}">
                <div v-for="(element, key) in page['layer']" :key="key" v-if="element.isVisible">
                  <div :index="key" class="item_wrapper" :class="resizeClassName" style="box-shadow: rgba(0, 0, 0, 0.5) 0 0 0; background-repeat: no-repeat;" :style="{borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, borderWidth: element.borderWidth+'px', opacity: (100 - element.opacity)/100, textAlign: element.textAlign, height: element.height+'px', left: element.x+'px', top: element.y+'px', transform: 'rotateZ('+element.rotate+'deg)', zIndex: element.zIndex, width: element.width+'px'}" v-if="element.type=='img'">
                    <div class="content" :class="{'ani':element.ani!=''}" :swiper-animate-effect="element.ani" :swiper-animate-duration="element.duration+'s'" :swiper-animate-delay="element.delay+'s'" >
                      <div :class="element.type+'-element'">
                        <div class="wrapper" :class="resizeClassName" style="overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', backgroundImage: 'url('+element.value+')', backgroundSize: element.width+'px '+element.height+'px', backgroundPosition: '0 0'}">
                          <div class="render" :class="element.type+'-render'" style="border-radius: 0;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div :index="key" class="item_wrapper" :class="resizeClassName" style="position: absolute; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', top: element.y+'px', left: element.x+'px', transform: 'rotateZ('+element.rotate+'deg)', opacity: (100 - element.opacity)/100, background: element.backgroundColor}"  v-if="element.type=='text'">
                    <div class="content" :class="{'ani':element.ani!=''}" :swiper-animate-effect="element.ani" :swiper-animate-duration="element.duration+'s'" :swiper-animate-delay="element.delay+'s'" >
                      <div :class="element.type+'-element'">
                        <div class="wrapper" :class="resizeClassName" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', fontFamily: element.fontFamily, borderRadius: element.borderRadius+'px', fontStyle: element.fontStyle, fontWeight: element.fontBold?'bold':'normal', textAlign: element.textAlign, color: element.color, fontSize: element.fontSize+'px', textDecoration: element.textDecoration?'underline':'none'}">
                          <div class="render" :class="element.type+'-render'">
                              <div :id="'render-'+element.id" class="vue-edit-area" :class="resizeClassName" :style="{width: element.width+'px', borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, color: element.color, fontSize: element.fontSize+'px', lineHeight: element.lineHeight, letterSpacing: element.letterSpacing+'px', textDecoration: element.textDecoration?'underline':'none', fontFamily: element.fontFamily?element.fontFamily:''}">{{element.value}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item_wrapper" :class="resizeClassName" style="position: absolute; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', top: element.y+'px', left: element.x+'px', transform: 'rotateZ('+element.rotate+'deg)', opacity: (100 - element.opacity)/100}" v-if="element.type=='video'">
                    <div class="content" :class="{'ani':element.ani!=''}" :swiper-animate-effect="element.ani" :swiper-animate-duration="element.duration+'s'" :swiper-animate-delay="element.delay+'s'" >
                      <div :class="element.type+'-element'">
                        <div class="wrapper" :class="resizeClassName" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', fontFamily: element.fontFamily, borderRadius: element.borderRadius+'px', fontStyle: element.fontStyle, fontWeight: element.fontBold?'bold':'normal', textAlign: element.textAlign, color: element.color, fontSize: element.fontSize+'px', textDecoration: element.textDecoration?'underline':'none'}">
                          <div class="render" :class="`${element.type+'-render'} ${resizeClassName}`" :style="{width: element.width+'px', height: element.height+'px'}" @click.stop="playVideo(element.id)">
                            <video :ref="'preview_video_'+element.id" :src="element.value" :width="element.width" :height="element.height"></video>
                            <div :id="'preview_render_'+element.id" class="play-icon-bg">
                              <span class="play-icon-wrapper"><i class="iconfont icon-bofang"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item_wrapper" :class="`${element.ani!=''?'ani':''} ${element.ani} ${resizeClassName}`" :swiper-animate-effect="element.ani" :swiper-animate-duration="element.duration+'s'" :swiper-animate-delay="element.delay+'s'" style="position: absolute; overflow-wrap: break-word; overflow: hidden;" :style="{width: element.width+'px', height: element.height+'px', top: element.y+'px', left: element.x+'px', transform: 'rotateZ('+element.rotate+'deg)', opacity: (100 - element.opacity)/100, borderRadius: element.borderRadius+'px', backgroundColor: element.backgroundColor}" v-if="element.type=='tele'">
                    <div class="content">
                      <div :class="element.type+'-element'">
                        <div class="wrapper" :class="resizeClassName" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', fontFamily: element.fontFamily, fontStyle: element.fontStyle, fontWeight: element.fontBold?'bold':'normal', textAlign: element.textAlign, color: element.color, fontSize: element.fontSize+'px', textDecoration: element.textDecoration?'underline':'none'}">
                          <div class="link-button-render render" :class="resizeClassName" :style="{width: element.width+'px', height: element.height+'px'}">
                            <div class="text1 link-button-render-text">
                              <a class="telebtn" :class="resizeClassName" style="overflow-wrap: break-word;" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap, width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', color: element.color}"><i class="iconfont icon-bohao" style="font-size: 36px;"></i>{{element.text}}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item_wrapper" :class="`${element.ani!=''?'ani':''} ${element.ani} ${resizeClassName}`"  :swiper-animate-effect="element.ani" :swiper-animate-duration="element.duration+'s'" :swiper-animate-delay="element.delay+'s'" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', borderRadius: element.borderRadius+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap, width: element.width+'px', height: element.height+'px', top: element.y+'px', left: element.x+'px', lineHeight: element.height+'px', color: element.color, backgroundColor: element.backgroundColor}" v-if="element.type=='link'">
                    <div class="content">
                      <div :class="element.type+'-element'">
                        <div class="wrapper" :class="resizeClassName" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', fontFamily: element.fontFamily, fontStyle: element.fontStyle, fontWeight: element.fontBold?'bold':'normal', textAlign: element.textAlign, color: element.color, fontSize: element.fontSize+'px', textDecoration: element.textDecoration?'underline':'none'}">
                          <div class="link-button-render render" :style="{width: element.width+'px', height: element.height+'px'}">
                            <div class="text1 link-button-render-text">
                              <a class="linkbtn" :class="resizeClassName" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap,width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', color: element.color}">{{element.text}}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <span v-if="pageList.length > 1" class="arrow resize"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOTEyQUZGMzU3NTIxMUU4QjNEOUQ0MzlDMDc3MDgyRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxOTEyQUZGNDU3NTIxMUU4QjNEOUQ0MzlDMDc3MDgyRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE5MTJBRkYxNTc1MjExRThCM0Q5RDQzOUMwNzcwODJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5MTJBRkYyNTc1MjExRThCM0Q5RDQzOUMwNzcwODJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+yXkN0wAAAVlJREFUeNpi+P//PwMFmAOIS4CYjVwzKLGcG4j3/IeATVDH0M0B/EB8+D8q2A3EXPRwgDAQn/6PHRyGOo5mDhAH4ktolv5E44McJ0QLB8gA8Q00y/YDsRwQn0ATvwh1LNUcoAjE99Es2Y4U57xAfABN/gbU0RQ7QAOIn6AZvh5L1gM5ZgeauntQx5PtAH0gfoFm6FIgZsGhHuSoDWjqH0M9QbIDTIH4LZphs4GYmYCjQY5bhqYP5Ak9UhxgA8Qf0QyZBMSMRKYZkCPnoOkHecaEGAe4AvFXNM3tZJQXIMdORjPnI9RzOB3gC8Q/0DTVUFhfdKCZB/KcCzYHhKEVKv+AuIhCy2G4Bs0R36GehTsgHoj/ICn4C8TpVLIchougnkIuQcNAEkxItdp/qENiqWw5DGdAPQcDG5Hr9S1QV4XQyHIYjoV6chWo3EAvRMxpbDkMW8LKE4AAAwB5ZDwmZZQfSgAAAABJRU5ErkJggg==" /></span>

      <div id="audio_btn" :class="{'off': off, 'play_yinfu': !off}" :style="{display: music.url==''?'none':''}" v-if="music.url!=''" @click="playMusic">
        <div id="yinfu" :class="{'rotate': !off}"> </div>
        <audio autoplay preload loop :src="music.url" id="media"></audio>
      </div>

    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import animate from 'animate.css'
export default {
  name: "preview",
  props: {
    previewState: {
      type: Boolean,
      default: true,
    },
    pageList: {
      type: Array,
      default: []
    },
    music: {
      type: Object,
      default: {
        name: '',
        url: ''
      }
    }
  },
  data() {
    return {
      off: false,
      swiperData: {},
      activeIndex: 0,
      resizeClassName: 'resize'
    }
  },
  components: {
    Swiper,
  },
  mounted() {
    var that = this;
    if (this.previewState) {
      var swiper = new Swiper('.swiper-container', {
        initialSlide: 0,
        direction: 'vertical',
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        // noSwiping : true,
        // pagination: '.swiper-pagination',
        //virtualTranslate : true,
        // mousewheelControl : trueonInit:function(swiper){
        on: {
          init() {
            let swiper = that.$refs.mySwiper.swiper;
            that.utils.swiperAnimateCache(swiper);
            that.utils.swiperAnimate(swiper);
          },
          slideChangeEnd() {
            let swiper = that.$refs.mySwiper.swiper;
            that.utils.swiperAnimate(swiper);
          },
          transitionEnd() {
            let swiper = that.$refs.mySwiper.swiper;
            that.utils.swiperAnimate(swiper);
          },
          process() {
            let swiper = that.$refs.mySwiper.swiper;
            for (var i = 0; i < swiper.slides.length; i++) {
              var slide = swiper.slides[i];
              var progress = slide.progress;
              var translate = progress * swiper.height / 4;
              var scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
              var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
              slide.style.opacity = opacity;
              var es = slide.style;
              es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';
            }
          },
          setTransition() {
            let swiper = that.$refs.mySwiper.swiper;
            for (var i = 0; i < swiper.slides.length; i++) {
              var es = swiper.slides[i].style;
              es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = 500 + 'ms';
            }
          }
        },
        watchSlidesProgress: true,
      });
    }
  },
  methods: {
    playMusic() {
      if (this.music.url == '') return;
      var media = document.getElementById('media');
      if (media.paused) {
        media.play();
        this.off = false;
      }else{
        media.pause();
        this.off = true;
      }
    },
    playVideo(id){
      this.$nextTick(function () {
        var e = this.$refs['preview_video_'+id][0], i = document.getElementById('preview_render_'+id);
        e.paused ? (e.play(), i.style.visibility = "hidden") : e.pause && (e.currentTime = 0, e.pause(), i.style.visibility = "visible")
      })
    }
  }
}
</script>

<style scoped>
.workwrap {
  position: relative;
  width: 324px;
  height: 504px;
  margin: 0 auto;
  border: 1px solid #f2f2f2;
  overflow: hidden;
}
.workwrap .workcont {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
  /*padding: 6px;*/
}
.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.elementCanvas {
  position: relative;
}
.elementCanvas > div {
  position: relative;
}
.bgCanvas {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.item_wrapper {
  position: absolute;
  overflow-wrap: break-word;
}
.wrapper .play-icon-bg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.2);
}
.wrapper .play-icon-bg .play-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(0,0,0,.7);
}
.wrapper .play-icon-bg i {
  position: relative;
  left: 6%;
  color: #fff;
  font-size: 40px;
}
.arrow {
  position: absolute;
  width: 32px;
  height: 18px;
  bottom: 5px;
  left: 50%;
  margin-left: -16px;
  z-index: 999;
  -webkit-animation: start 1.5s infinite ease-in-out;
  text-align: center;
}
@-webkit-keyframes start {
  0%,30% {opacity: 0;-webkit-transform: translate(0,10px);}
  60% {opacity: 1;-webkit-transform: translate(0,0);}
  100% {opacity: 0;-webkit-transform: translate(0,-8px);}
}
@-moz-keyframes start {
  0%,30% {opacity: 0;-moz-transform: translate(0,10px);}
  60% {opacity: 1;-moz-transform: translate(0,0);}
  100% {opacity: 0;-moz-transform: translate(0,-8px);}
}
@keyframes start {
  0%,30% {opacity: 0;transform: translate(0,10px);}
  60% {opacity: 1;transform: translate(0,0);}
  100% {opacity: 0;transform: translate(0,-8px);}
}

/*音乐图标*/
#audio_btn {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 200;
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
}

#audio_btn.off {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAVbSURBVHjalFZPTBRnFP/NN8yuusNAStmkWlbpKsuys0aaokGhrV40iwdPtY0Xk4JCD/XECUESICYeGkmopFJ66ZptPDRozCY2Nm1RkiqN2WR29g+BLmDcRjYr0B1wZ4eZr5dZMtKC9CWTb5Lvvd9773t/GUoptqBqAM0AGgzD8K+srLhUVeXtdrvicDjmCSESgEkADwGkNgNhNlFSCeBzAGcjkcieaDSaicVic/F4XMvlctRms2kHDx7cJYriPlEUKw8dOvQcwG0A3wLIbEfJhwD6ZVn2joyMyOFwOD49Pf3KwseWlZWxy8vLKsMw2L9//65AIOBta2sTfT5fHEAXgPHXECml1u8MpTQdDAaTHo9nFMBXAIYAfANgBMDQgQMHvr979+50Y2PjjwC+Nu+/8ng8o8FgMEkpTZs467jEoq8JwI3BwcF0e3v7/WQymQfgAGAr2gPAoJSu1dfXOwcGBt6vqKjgABAAjmQymW9vb78/ODiYBnDDxANMhmIMroZCoVxPT8+EoigcgBIL+Prz6rpOFxcX88ePH9/b19d32GazAcAaAE5RFK6np2ciFArlAFw1ccH29vYCwJeyLJ/p6Oj4KZ1O6xYFr8UPwFpVVRUviuJbmqbpp0+fdlNK9fHx8WeUUhYAq6oqlSTprxMnTjQ5nc48gEcEwD5d1z8bHh6Wp6amlgBwW+U0z/NcNpvNt7a2/nznzp3prq6uwy0tLe8BKJhec1NTU0vDw8OyruufAthHADRLkrQ7HA5HAdhNizcjqus6raiosKfTabWtre3XeDz+srOzs768vNxmPhsDwB4Oh2VJkt4F0EwAHJEk6UUqlXplPtOW1WlmJBUEgctkMrnLly//7nK5+Pr6eicA3ZQvSaVSryRJWgBwhBiGISYSiWdmEpA3KWAYxjwYBgA7OTn5QpblbGVl5U4LGwFAEonEHKVUJIqiuGKxWN60gME2iJB1W1hFUfRoNJrVNE23yDMAqCzL+Vwu5yKapvGKoqxf4P8RtdlsRBAEzjAMqywFwKysrEDTNJ5wHKfwPI9teEItRqxbzLJsyZMnT15EIpGXAFirJw6HAxzHKYTn+fm6urodb/DEAKCzLEsopVTXdYMQwgBgM5mMFgwGZ+fm5lYtSigAxufz7SgtLZ0vIYREa2trPwYQM8E2erPmdDp3nT9/3n306NF3SktLbYuLi6tLS0sFADAMgxqGgQ1JYwAwamtrXQzD/FIC4LHf7z9bXV29M5VKrZm9quhRwe12C0NDQ82nTp2qLiLcu3dvWlGUwoZuYP3Xqqurd/r9fieAxwTAQ7/f/zwQCIgAVEtsdEEQSq5du9ZoVQAAqqoamqbRLWKntrS0iH6/Pw3gIQEwy7LsDx0dHb6amppyAJrJrHk8nvLm5uYqK0Iul1NDodDM6upqYZO60mpqasovXrxYx7JsCMBskWnU5/PFent7mwRB0M3KZbPZbH52dnapKL2wsJDr7Ox8NDY29ucmTdQQBEG/cuVKkyiKCQDfbZyMTQBuX79+Pd3d3T2hKAoLgDQ0NLx98uTJPYVCQX/w4EH66dOn2Q3doZiVazzPr/X39x+7dOnSbgBnzdn/r/F7BsCNW7du/d3X1zeRTCaXTTBqpidnnkVgw2yKBY/HU9bd3X3s3LlzAoAvAIy9acYPyLLsvXnzZjQcDsdmZmbylFKyoY4owzDU7XbvCAQCvgsXLvh8Pl/iv2b8VttKK4BPIpHIHkmSFuLx+Hw8HtcURQHP8/B6vZzX63X5/X6nZVsZBbCw3ZXIund9BOADwzBERVH2qqrqsNvtKzzPzxFCogD+APDbVnvXPwMAXMSKb8NEQ6MAAAAASUVORK5CYII=);
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: center center;
}

#audio_btn .rotate {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  background-size: 100% 100%;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAVbSURBVHjalFZPTBRnFP/NN8yuusNAStmkWlbpKsuys0aaokGhrV40iwdPtY0Xk4JCD/XECUESICYeGkmopFJ66ZptPDRozCY2Nm1RkiqN2WR29g+BLmDcRjYr0B1wZ4eZr5dZMtKC9CWTb5Lvvd9773t/GUoptqBqAM0AGgzD8K+srLhUVeXtdrvicDjmCSESgEkADwGkNgNhNlFSCeBzAGcjkcieaDSaicVic/F4XMvlctRms2kHDx7cJYriPlEUKw8dOvQcwG0A3wLIbEfJhwD6ZVn2joyMyOFwOD49Pf3KwseWlZWxy8vLKsMw2L9//65AIOBta2sTfT5fHEAXgPHXECml1u8MpTQdDAaTHo9nFMBXAIYAfANgBMDQgQMHvr979+50Y2PjjwC+Nu+/8ng8o8FgMEkpTZs467jEoq8JwI3BwcF0e3v7/WQymQfgAGAr2gPAoJSu1dfXOwcGBt6vqKjgABAAjmQymW9vb78/ODiYBnDDxANMhmIMroZCoVxPT8+EoigcgBIL+Prz6rpOFxcX88ePH9/b19d32GazAcAaAE5RFK6np2ciFArlAFw1ccH29vYCwJeyLJ/p6Oj4KZ1O6xYFr8UPwFpVVRUviuJbmqbpp0+fdlNK9fHx8WeUUhYAq6oqlSTprxMnTjQ5nc48gEcEwD5d1z8bHh6Wp6amlgBwW+U0z/NcNpvNt7a2/nznzp3prq6uwy0tLe8BKJhec1NTU0vDw8OyruufAthHADRLkrQ7HA5HAdhNizcjqus6raiosKfTabWtre3XeDz+srOzs768vNxmPhsDwB4Oh2VJkt4F0EwAHJEk6UUqlXplPtOW1WlmJBUEgctkMrnLly//7nK5+Pr6eicA3ZQvSaVSryRJWgBwhBiGISYSiWdmEpA3KWAYxjwYBgA7OTn5QpblbGVl5U4LGwFAEonEHKVUJIqiuGKxWN60gME2iJB1W1hFUfRoNJrVNE23yDMAqCzL+Vwu5yKapvGKoqxf4P8RtdlsRBAEzjAMqywFwKysrEDTNJ5wHKfwPI9teEItRqxbzLJsyZMnT15EIpGXAFirJw6HAxzHKYTn+fm6urodb/DEAKCzLEsopVTXdYMQwgBgM5mMFgwGZ+fm5lYtSigAxufz7SgtLZ0vIYREa2trPwYQM8E2erPmdDp3nT9/3n306NF3SktLbYuLi6tLS0sFADAMgxqGgQ1JYwAwamtrXQzD/FIC4LHf7z9bXV29M5VKrZm9quhRwe12C0NDQ82nTp2qLiLcu3dvWlGUwoZuYP3Xqqurd/r9fieAxwTAQ7/f/zwQCIgAVEtsdEEQSq5du9ZoVQAAqqoamqbRLWKntrS0iH6/Pw3gIQEwy7LsDx0dHb6amppyAJrJrHk8nvLm5uYqK0Iul1NDodDM6upqYZO60mpqasovXrxYx7JsCMBskWnU5/PFent7mwRB0M3KZbPZbH52dnapKL2wsJDr7Ox8NDY29ucmTdQQBEG/cuVKkyiKCQDfbZyMTQBuX79+Pd3d3T2hKAoLgDQ0NLx98uTJPYVCQX/w4EH66dOn2Q3doZiVazzPr/X39x+7dOnSbgBnzdn/r/F7BsCNW7du/d3X1zeRTCaXTTBqpidnnkVgw2yKBY/HU9bd3X3s3LlzAoAvAIy9acYPyLLsvXnzZjQcDsdmZmbylFKyoY4owzDU7XbvCAQCvgsXLvh8Pl/iv2b8VttKK4BPIpHIHkmSFuLx+Hw8HtcURQHP8/B6vZzX63X5/X6nZVsZBbCw3ZXIund9BOADwzBERVH2qqrqsNvtKzzPzxFCogD+APDbVnvXPwMAXMSKb8NEQ6MAAAAASUVORK5CYII=);
  -webkit-animation: rotating 1.2s linear infinite;
  -moz-animation: rotating 1.2s linear infinite;
  -o-animation: rotating 1.2s linear infinite;
  animation: rotating 1.2s linear infinite;
}
</style>
