export default {
  uuid:function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },
  getArrayCount: function (array, key, value) {
    if (array.length == 0) return 0;
    var count = 0;
    array.forEach(function (el) {
      if (el[key] == value) {
        count ++;
      }
    })
    return count;
  },
  swiperAnimateCache: function () {
    for(var allBoxes=window.document.documentElement.querySelectorAll(".ani"),i=0;i<allBoxes.length;i++)
      allBoxes[i].attributes["style"]?allBoxes[i].setAttribute("swiper-animate-style-cache",allBoxes[i].attributes["style"].value):allBoxes[i].setAttribute("swiper-animate-style-cache"," "),allBoxes[i].style.visibility="hidden"
  },
  swiperAnimate: function(a){
    this.clearSwiperAnimate();
    var b=a.slides[a.activeIndex].querySelectorAll(".ani");
    for(var i=0;i<b.length;i++) {
      b[i].style.visibility = "visible";
      var effect = b[i].attributes["swiper-animate-effect"] ? b[i].attributes["swiper-animate-effect"].value : "";
      b[i].className = b[i].className + "  " + effect + " " + "animated";
      var style = b[i].attributes["style"].value;
      var duration = b[i].attributes["swiper-animate-duration"] ? b[i].attributes["swiper-animate-duration"].value : "";
      duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";");
      var delay = b[i].attributes["swiper-animate-delay"] ? b[i].attributes["swiper-animate-delay"].value : "";
      delay && (style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";"), b[i].setAttribute("style", style)
    }
  },
  clearSwiperAnimate: function(){
    for(var allBoxes=window.document.documentElement.querySelectorAll(".ani"),i=0;i<allBoxes.length;i++) {
      allBoxes[i].attributes["swiper-animate-style-cache"]&&allBoxes[i].setAttribute("style",allBoxes[i].attributes["swiper-animate-style-cache"].value);
      allBoxes[i].style.visibility="hidden";
      allBoxes[i].className=allBoxes[i].className.replace("animated"," ");
      var effect=allBoxes[i].attributes["swiper-animate-effect"].value;
      allBoxes[i].attributes["swiper-animate-effect"]&&(effect,allBoxes[i].className=allBoxes[i].className.replace(effect," "))
    }
  }
}
