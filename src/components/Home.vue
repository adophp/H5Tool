<template>
    <div class="page">
      <div class="topnav" :class="excludeClassName">
        <a href="//www.adophper.com" target="_blank" title="PHP+Python--PHP技术,网站开发,PHP,PHP学习,Python学习,PHP开发,人工智能,大数据服务" class="logo">H5</a>
        <div>
          <div class="workstute"></div>
          <div class="worktitle"><input type="text" v-model="projectName" placeholder="请输入项目名称" /></div>
          <a title="读图网" class="usercenter"></a>
          <a class="publish cursor" @click="publish"><i class="iconfont icon-fabu2"></i><span>导出</span></a>
          <div class="editbtn">
            <a class="preview cursor" @click="preview"><i class="iconfont icon-yulan1"></i><span>预览</span></a>
            <!--<a class="save cursor" @click="output"><i class="iconfont icon-msnui-save"></i><span>保存</span></a>-->
          </div>
        </div>
      </div>

      <div class="funcwrap" :class="excludeClassName">
        <words v-if="func=='words'" @addMethods="addElement"></words>
        <materials v-if="func=='materials'" @addMethods="addElement"></materials>
        <pic v-if="func=='pictures'" @addMethods="addElement" :npage.sync="npage" :init-file.sync="fileList" @setFileList="setFileList"></pic>
        <backgrounds v-if="func=='backgrounds'" @addMethods="addElement" :npage.sync="npage" :init-ele.sync="pageList[npage]" :init-bg-list.sync="bgList" @setPageOption="setPageOption(arguments)" @setBgList="setBgList"></backgrounds>
        <musics v-if="func=='musics'" :preview.sync="dialogVisible" @setBgMusic="setBgMusic" :bg-music.sync="bgMusic" @setMusicList="setMusicList" :init-music-list="musicList"></musics>
        <videos v-if="func=='videos'" :npage.sync="npage" @setVideoList="setVideoList" @addMethods="addElement" :init-video-list="videoList"></videos>
        <actions v-if="func=='actions'" @addMethods="addElement"></actions>
      </div>
      <div class="rightnav" :class="excludeClassName">
        <div class="navwrap">
          <a class="words" :class="{'cursor active': func=='words'}" @click="func='words'"><i class="iconfont icon-xingzhuang-wenzilan"></i> <p>文字</p></a>
          <!--<a class="materials" :class="{'cursor active': func=='materials'}" @click="func='materials'"><i class="iconfont icon-xingzhuang"></i> <p>形状</p></a>-->
          <a class="pictures" :class="{'cursor active': func=='pictures'}" @click="func='pictures'"><i class="iconfont icon-tupian"></i> <p>图片</p></a>
          <a class="backgrounds" :class="{'cursor active': func=='backgrounds'}" @click="func='backgrounds'" :exclude-class-name="excludeClassName"><i class="iconfont icon-beijing"></i> <p>背景</p></a>
          <a class="musics" :class="{'cursor active': func=='musics'}" @click="func='musics'"><i class="iconfont icon-music"></i> <p>音乐</p></a>
          <a class="videos" :class="{'cursor active': func=='videos'}" @click="func='videos'"><i class="iconfont icon-shipin1"></i> <p>视频</p></a>
          <!--<a class="forms" :class="{'cursor active': func=='forms'}" @click="func='forms'"><i class="iconfont icon-zidingyibiaodan"></i> <p>表单</p></a>-->
          <a class="actions" :class="{'cursor active': func=='actions'}" @click="func='actions'"><i class="iconfont icon-video"></i> <p>互动</p></a>
        </div>
      </div>
      <pagelist :npage.sync="npage" :page-list.sync="pageList" @addPage="addPage" @setPage="setPage" @copyPage="copyPage" @deletePage="deletePage" @updatePage="updatePage"></pagelist>
      <div class="subfuncwrap" :class="excludeClassName" v-if="draggingId" @click="subfuncwrap()">
        <div class="functitle">
          <a :class="{'active':subfuncname==='elewrap'}" @click="subfuncname='elewrap'">
            <span v-if="draggingElement.type=='text'">文本</span>
            <span v-else-if="draggingElement.type=='img'">图片</span>
            <span v-else-if="draggingElement.type=='video'">视频</span>
            <span v-else-if="draggingElement.type=='tele'">拨号</span>
            <span v-else-if="draggingElement.type=='link'">跳转</span>
          </a>
          <a :class="{'active':subfuncname==='animwrap'}" @click="subfuncname='animwrap'">动画</a>
          <a :class="{'active':subfuncname==='layerwrap'}" @click="subfuncname='layerwrap'">图层</a>
        </div>
        <div v-if="subfuncname==='elewrap'">
          <subwords v-if="draggingElement.type=='text'" :id="draggingId" :init-ele="draggingElement" @setElementNode="setElementNode(arguments)" :exclude-class-name="excludeClassName"></subwords>
          <subpic v-else-if="draggingElement.type=='img'" :id="draggingId" :init-ele="draggingElement" @setElementNode="setElementNode(arguments)" :exclude-class-name="excludeClassName"></subpic>
          <subvideo v-else-if="draggingElement.type=='video'" :id="draggingId" :init-ele="draggingElement" @setElementNode="setElementNode(arguments)" :exclude-class-name="excludeClassName"></subvideo>
          <subtele v-else-if="draggingElement.type=='tele'" :id="draggingId" :init-ele="draggingElement" @setElementNode="setElementNode(arguments)" :exclude-class-name="excludeClassName"></subtele>
          <sublink v-else-if="draggingElement.type=='link'" :id="draggingId" :init-ele="draggingElement" @setElementNode="setElementNode(arguments)" :exclude-class-name="excludeClassName"></sublink>
        </div>
        <div v-else-if="subfuncname==='animwrap'">
          <animwrap :id="draggingId" :init-ele="draggingElement" @setElementNode="setElementNode(arguments)" @previewAnimation="previewAnimation" :exclude-class-name="excludeClassName"></animwrap>
        </div>
        <div v-else-if="subfuncname==='layerwrap'">
          <layerwrap :id="draggingId" :init-list="pageList[npage]['layer']" @deleteElement="deleteElement" @setElementField="setElementField(arguments)" @selectActive="selectActive"></layerwrap>
        </div>
      </div>
      <div class="workarea editor" @contextmenu.prevent="mainContextMenu">
        <div class="e-stage-mask fixed left" style="left: 0px; width: calc(50% - 160px); height: 100%;"></div>
        <div class="e-stage-mask fixed right" style="right: 0px; width: calc(50% - 160px); height: 100%; z-index: 10;"></div>
        <div class="e-stage-mask fixed top" style="top: 0px; margin-left: calc(50% - 160px); width: 320px; height: 20%; border-bottom: 1px dashed rgb(183, 183, 183);"></div>
        <div class="e-stage-mask fixed bottom" style="top: calc(20% + 504px); margin-left: calc(50% - 160px); width: 320px; height: 100%; border-top: 1px dashed rgb(183, 183, 183);"></div>
        <div class="mainarea">
          <div class="canvas-area">
            <div class="grid-container" v-show="grid">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M10,0L10,2692M20,0L20,2692M30,0L30,2692M40,0L40,2692M50,0L50,2692M60,0L60,2692M70,0L70,2692M80,0L80,2692M90,0L90,2692M100,0L100,2692M110,0L110,2692M120,0L120,2692M130,0L130,2692M140,0L140,2692M150,0L150,2692M160,0L160,2692M170,0L170,2692M180,0L180,2692M190,0L190,2692M200,0L200,2692M210,0L210,2692M220,0L220,2692M230,0L230,2692M240,0L240,2692M250,0L250,2692M260,0L260,2692M270,0L270,2692M280,0L280,2692M290,0L290,2692M300,0L300,2692M310,0L310,2692M0,10L320,10M0,20L320,20M0,30L320,30M0,40L320,40M0,50L320,50M0,60L320,60M0,70L320,70M0,80L320,80M0,90L320,90M0,100L320,100M0,110L320,110M0,120L320,120M0,130L320,130M0,140L320,140M0,150L320,150M0,160L320,160M0,170L320,170M0,180L320,180M0,190L320,190M0,200L320,200M0,210L320,210M0,220L320,220M0,230L320,230M0,240L320,240M0,250L320,250M0,260L320,260M0,270L320,270M0,280L320,280M0,290L320,290M0,300L320,300M0,310L320,310M0,320L320,320M0,330L320,330M0,340L320,340M0,350L320,350M0,360L320,360M0,370L320,370M0,380L320,380M0,390L320,390M0,400L320,400M0,410L320,410M0,420L320,420M0,430L320,430M0,440L320,440M0,450L320,450M0,460L320,460M0,470L320,470M0,480L320,480M0,490L320,490M0,500L320,500M0,510L320,510M0,520L320,520M0,530L320,530M0,540L320,540M0,550L320,550M0,560L320,560M0,570L320,570M0,580L320,580M0,590L320,590M0,600L320,600M0,610L320,610M0,620L320,620M0,630L320,630M0,640L320,640M0,650L320,650M0,660L320,660M0,670L320,670M0,680L320,680M0,690L320,690M0,700L320,700M0,710L320,710M0,720L320,720M0,730L320,730M0,740L320,740M0,750L320,750M0,760L320,760M0,770L320,770M0,780L320,780M0,790L320,790M0,800L320,800M0,810L320,810M0,820L320,820M0,830L320,830M0,840L320,840M0,850L320,850M0,860L320,860M0,870L320,870M0,880L320,880M0,890L320,890M0,900L320,900M0,910L320,910M0,920L320,920M0,930L320,930M0,940L320,940M0,950L320,950M0,960L320,960M0,970L320,970M0,980L320,980M0,990L320,990M0,1000L320,1000M0,1010L320,1010M0,1020L320,1020M0,1030L320,1030M0,1040L320,1040M0,1050L320,1050M0,1060L320,1060M0,1070L320,1070M0,1080L320,1080M0,1090L320,1090M0,1100L320,1100M0,1110L320,1110M0,1120L320,1120M0,1130L320,1130M0,1140L320,1140M0,1150L320,1150M0,1160L320,1160M0,1170L320,1170M0,1180L320,1180M0,1190L320,1190M0,1200L320,1200M0,1210L320,1210M0,1220L320,1220M0,1230L320,1230M0,1240L320,1240M0,1250L320,1250M0,1260L320,1260M0,1270L320,1270M0,1280L320,1280M0,1290L320,1290M0,1300L320,1300M0,1310L320,1310M0,1320L320,1320M0,1330L320,1330M0,1340L320,1340M0,1350L320,1350M0,1360L320,1360M0,1370L320,1370M0,1380L320,1380M0,1390L320,1390M0,1400L320,1400M0,1410L320,1410M0,1420L320,1420M0,1430L320,1430M0,1440L320,1440M0,1450L320,1450M0,1460L320,1460M0,1470L320,1470M0,1480L320,1480M0,1490L320,1490M0,1500L320,1500M0,1510L320,1510M0,1520L320,1520M0,1530L320,1530M0,1540L320,1540M0,1550L320,1550M0,1560L320,1560M0,1570L320,1570M0,1580L320,1580M0,1590L320,1590M0,1600L320,1600M0,1610L320,1610M0,1620L320,1620M0,1630L320,1630M0,1640L320,1640M0,1650L320,1650M0,1660L320,1660M0,1670L320,1670M0,1680L320,1680M0,1690L320,1690M0,1700L320,1700M0,1710L320,1710M0,1720L320,1720M0,1730L320,1730M0,1740L320,1740M0,1750L320,1750M0,1760L320,1760M0,1770L320,1770M0,1780L320,1780M0,1790L320,1790M0,1800L320,1800M0,1810L320,1810M0,1820L320,1820M0,1830L320,1830M0,1840L320,1840M0,1850L320,1850M0,1860L320,1860M0,1870L320,1870M0,1880L320,1880M0,1890L320,1890M0,1900L320,1900M0,1910L320,1910M0,1920L320,1920M0,1930L320,1930M0,1940L320,1940M0,1950L320,1950M0,1960L320,1960M0,1970L320,1970M0,1980L320,1980M0,1990L320,1990M0,2000L320,2000M0,2010L320,2010M0,2020L320,2020M0,2030L320,2030M0,2040L320,2040M0,2050L320,2050M0,2060L320,2060M0,2070L320,2070M0,2080L320,2080M0,2090L320,2090M0,2100L320,2100M0,2110L320,2110M0,2120L320,2120M0,2130L320,2130M0,2140L320,2140M0,2150L320,2150M0,2160L320,2160M0,2170L320,2170M0,2180L320,2180M0,2190L320,2190M0,2200L320,2200M0,2210L320,2210M0,2220L320,2220M0,2230L320,2230M0,2240L320,2240M0,2250L320,2250M0,2260L320,2260M0,2270L320,2270M0,2280L320,2280M0,2290L320,2290M0,2300L320,2300M0,2310L320,2310M0,2320L320,2320M0,2330L320,2330M0,2340L320,2340M0,2350L320,2350M0,2360L320,2360M0,2370L320,2370M0,2380L320,2380M0,2390L320,2390M0,2400L320,2400M0,2410L320,2410M0,2420L320,2420M0,2430L320,2430M0,2440L320,2440M0,2450L320,2450M0,2460L320,2460M0,2470L320,2470M0,2480L320,2480M0,2490L320,2490M0,2500L320,2500M0,2510L320,2510M0,2520L320,2520M0,2530L320,2530M0,2540L320,2540M0,2550L320,2550M0,2560L320,2560M0,2570L320,2570M0,2580L320,2580M0,2590L320,2590M0,2600L320,2600M0,2610L320,2610M0,2620L320,2620M0,2630L320,2630M0,2640L320,2640M0,2650L320,2650M0,2660L320,2660M0,2670L320,2670M0,2680L320,2680M0,2690L320,2690" stroke="#ccc" stroke-width="0.5" stroke-dasharray="1"></path></svg>
            </div>
          </div>
          <div class="bgCanvas" :style="{background: pageList[npage]['backgroundImage']==''?(pageList[npage]['backgroundColor']==''?'rgba(255,255,255)':pageList[npage]['backgroundColor']):'url('+pageList[npage]['backgroundImage']+') left top / 100% 100% no-repeat'}">
            <div class="elementCanvas" style="transform-origin: 0px 0px; transform: scale(0.5);">
              <vue-draggable-resizable
              class-name-active="my-active-class"
              class-name-handle="my-handle-class"
              v-for="(element,index) in pageList[npage]['layer']"
              :key="index"
              :x="element.x"
              :y="element.y"
              :w="element.width"
              :h="element.height"
              :resizable="element.active"
              :draggable="element.active"
              :z-index="element.zIndex"
              :handles="element.handles"
              @activated="() => onActivated(element.id)"
              @deactivated="() => onDeactivated(element.id)"
              :onDragStart="onDragStartCallback"
              :id="element.id"
              :ref="element.id"
              :active.sync="element.isActive"
              :preventDeactivation="preventDeactivation"
              @dragging="(left, top) => dragging(element.id, left, top)"
              @dragstop="(left, top) => dragstop(element.id, left, top)"
              @resizing="(x, y, width, height) => onResizing(element.id, x, y, width, height)"
              :common-class-name="commonClassName"
              :exclude-class-name="excludeClassName"
              :class="{'isVisible': !element.isVisible}"
            >
              <div class="item_wrapper" :class="commonClassName" style="background-repeat: no-repeat; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 0px;" :style="{borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, borderWidth: element.borderWidth+'px', color: element.color, opacity: (100 - element.opacity)/100, textAlign: element.textAlign, transform: 'rotateZ('+element.rotate+'deg)', zIndex: element.zIndex, lineHeight: element.height+'px', width: element.width+'px', height: element.height+'px',}" @contextmenu.prevent="contextMenu">
                <div class="content" :ref="'content_'+element.id" :class="`${playState ? 'animated': ''} ${playState ? element.ani : ''} ${commonClassName}`" :style="{animationDuration: element.duration+'s', animationDelay: element.delay+'s', animationIterationCount: +element.iteration, animationPlayState: element.ani==''||!playState?'paused':'running', letterSpacing: element.letterSpacing+'px'}">
                  <div :class="element.type+'-element '+commonClassName" :id="'element-'+element.id">
                    <div class="wrapper" v-if="element.type=='img'" style="background-position: 0px 0px; overflow-wrap: break-word;" :style="{ color: element.color, width: element.width+'px', height: element.height+'px', backgroundImage: 'url('+element.value+')', backgroundSize: element.width+'px '+element.height+'px'}" :class="commonClassName">
                      <div :id="'render-'+element.id" class="render" :class="element.type+'-render '+commonClassName"></div>
                    </div>
                    <div class="wrapper" :class="commonClassName" v-if="element.type=='text'" :style="{borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, color: element.color, width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', backgroundColor: element.backgroundColor!=''?element.backgroundColor:'translate'}">
                      <div class="render" :class="element.type+'-render '+commonClassName">
                        <div class="scaleArea" :class="commonClassName" style="">
                          <div :id="'render-'+element.id" class="vue-edit-area" :class="commonClassName" :style="{width: element.width+'px', borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, color: element.color, fontSize: element.fontSize+'px', lineHeight: element.lineHeight, letterSpacing: element.letterSpacing+'px', textDecoration: element.textDecoration?'underline':'', fontFamily: element.fontFamily?element.fontFamily:'', fontWeight: element.fontBold?'bold':'', fontStyle:element.fontStyle?'italic':''}">{{element.value}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="wrapper" :class="commonClassName" v-if="element.type=='video'" :style="{width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px'}">
                      <div class="render" :class="element.type+'-render '+commonClassName" :style="{width: element.width+'px', height: element.height+'px'}" @click.stop="playVideo(element.id)">
                        <video :ref="'video-'+element.id" :src="element.value" :width="element.width" :height="element.height"></video>
                        <div :id="'render_'+element.id" class="play-icon-bg">
                          <span class="play-icon-wrapper"><i class="iconfont icon-bofang"></i></span>
                        </div>
                      </div>
                    </div>
                    <div class="wrapper" :class="commonClassName" v-if="element.type=='tele'" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', borderRadius: element.borderRadius+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap, width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', color: element.color, backgroundColor: element.backgroundColor}">
                      <div class="link-button-render render" :class="commonClassName" :style="{width: element.width+'px', height: element.height+'px'}">
                        <div class="text1 link-button-render-text">
                          <a class="telebtn" style="overflow-wrap: break-word;" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', borderRadius: element.borderRadius+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap, width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', color: element.color}"><i class="iconfont icon-bohao" style="font-size: 36px;"></i>{{element.text}}</a>
                        </div>
                      </div>
                    </div>
                    <div class="wrapper" :class="commonClassName" v-if="element.type=='link'" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', borderRadius: element.borderRadius+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap, width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', color: element.color, backgroundColor: element.backgroundColor}">
                      <div class="link-button-render render" :class="commonClassName" :style="{width: element.width+'px', height: element.height+'px'}">
                        <div class="text1 link-button-render-text">
                          <a class="linkbtn" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', borderRadius: element.borderRadius+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap,width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', color: element.color}">{{element.text}}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vue-draggable-resizable>
            </div>
          </div>

          <div id="item_context_menu" class="rightclickbox" :class="excludeClassName" v-show="rightClickState">
            <a @click.stop="copyElement">复制</a>
            <a @click="pasteElement">粘贴</a>
            <a @click="delElement">删除</a>
            <a @click.stop="topElement">置顶</a>
            <a @click.stop="bottomElement">置底</a>
            <a @click.stop="upElement">上移</a>
            <a @click.stop="downElement">下移</a>
          </div>
        </div>

        <div class="sidebar" :class="excludeClassName">
          <div class="barwrap">
            <!--<el-tooltip class="item finish" effect="dark" content="撤销" placement="right">
              <a class="iconfont icon-chexiao"></a>
            </el-tooltip>
            <el-tooltip class="item finish" effect="dark" content="恢复" placement="right">
              <a class="iconfont icon-huifu"></a>
            </el-tooltip>-->
            <el-tooltip class="item"  effect="dark" content="播放" placement="right">
              <a class="iconfont icon-bofang" @click="play"></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="网格" placement="right">
              <a class="iconfont icon-grid" @click="grid=!grid"></a>
            </el-tooltip>
<!--
            <el-tooltip class="item savework" effect="dark" content="保存" placement="right">
              <a class="iconfont icon-msnui-save"></a>
            </el-tooltip>-->
          </div>
        </div>
      </div>

      <div class="preview-dialog" v-if="dialogVisible">
        <el-dialog :visible.sync="dialogVisible" width="30%" custom-class="previewel">
          <p style="text-align: center; margin-bottom: 10px;">如须帮助请联系：{{config.contactEmail}}</p>
          <preview :music="bgMusic" :page-list="pageList" :preview-state="previewState"></preview>
        </el-dialog>
      </div>

      <div class="publish-dialog" v-if="publishState">
        <el-dialog :visible.sync="publishState" width="30%" custom-class="previewel">
          <p style="margin-bottom: 10px; line-height: 1.4;">请自行将HTML内容复制保存并上传至自有服务器，本站不提供免费保存文件服务。如须帮助请联系：{{config.contactEmail}}</p>
          <el-input type="textarea" :rows="15" v-model="publishContent"></el-input>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable/index'
import animate from 'animate.css'
import Words from "@/components/func/words";
import Materials from "@/components/func/materials";
import Pic from "@/components/func/pic";
import Backgrounds from "@/components/func/backgrounds";
import Musics from "@/components/func/musics";
import Videos from "@/components/func/videos";
import Actions from "@/components/func/actions";
import Pagelist from "@/components/pagelist";
import Subwords from "@/components/subfunc/words";
import Subpic from "@/components/subfunc/pic";
import Subvideo from "@/components/subfunc/video";
import Subtele from "@/components/subfunc/tele";
import Sublink from "@/components/subfunc/link";
import Layerwrap from "@/components/subfunc/layerwrap";
import Animwrap from "@/components/subfunc/animwrap";
import Preview from "@/components/output/preview";
export default {
  name: "Home",
  data () {
    return {
      projectName: '项目名称',
      grid: false,
      func: 'words',
      sync: false,
      draggingId: null,
      prevOffsetX: 0,
      prevOffsetY: 0,
      preventDeactivation: false,
      commonClassName: 'target',
      excludeClassName: 'excludeTarget',
      npage: 0,
      pageList: [],
      playState: false,
      subfuncname: 'elewrap',
      defaultPage: {
        backgroundColor: '',
        backgroundImage: '',
        musics: '',
        layer: []
      },
      fileList: [],
      bgList: [],
      bgMusic: {
        name: '',
        url: ''
      },
      musicList: [],
      videoList: [],
      dialogVisible: false,
      previewState: true,
      publishState: false,
      publishContent: '',
      rightClickState: false,
      actionId: null,
      copyId: null
    }
  },
  components: {
    Preview,
    Animwrap,
    Layerwrap,
    Subwords,
    Subpic,
    Subvideo,
    Subtele,
    Sublink,
    Pagelist,
    Actions,
    Videos,
    Musics,
    Backgrounds,
    Pic,
    Materials,
    Words,
    VueDraggableResizable
  },
  created(){
    window.addEventListener('keydown', ev => {
      if (ev.keyCode === 17) {
        this.sync = true;
      }
      if (ev.keyCode === 8) {
        //console.log('keydown-delete');
      }
    });
    window.addEventListener('keyup', ev => {
      var that = this;
      if (ev.keyCode === 17) {
        that.sync = false;
      }
      if (ev.keyCode === 8) {
        //console.log('keyup-delete');
        if (that.draggingId) {
          that.pageList[that.npage]['layer'].forEach(function(item, index){
            if (item.id === that.draggingId) {
              that.draggingId = null;
              that.pageList[that.npage]['layer'].splice(index, 1);
            }
          })
        }
      }
    });
    document.addEventListener('click', ev => {
      if (ev.button == 0 && this.rightClickState) {
        this.rightClickState = false;
      }
    });
    var old = JSON.stringify(this.defaultPage);
    this.pageList = [JSON.parse(old)];
  },
  methods: {
    dragging(id, left, top) {
      this.draggingId = id;

      if (! this.sync) return;

      const offsetX = left - this.draggingElement.x;
      const offsetY = top - this.draggingElement.y;

      const deltaX = this.deltaX(offsetX);
      const deltaY = this.deltaY(offsetY);

      this.pageList[this.npage]['layer'].map(el => {
        if (el.id !== id) {
          el.x += deltaX;
          el.y += deltaY;
        }

        return el;
      });
    },
    dragstop(id, left, top) {
      this.pageList[this.npage]['layer'].map(el => {
        if (el.id === id) {
          el.x = left;
          el.y = top;
        }

        return el;
      });

      //this.draggingId = null;
      this.prevOffsetX = 0;
      this.prevOffsetY = 0;
    },
    onResizing(id, x, y, width, height){
      this.pageList[this.npage]['layer'].map(el => {
        if (el.id === id) {
          el.x = x;
          el.y = y;
          el.width = width;
          el.height = height;
        }

        return el;
      });
    },
    deltaX(offsetX) {
      const ret = offsetX - this.prevOffsetX;

      this.prevOffsetX = offsetX;

      return ret;
    },
    deltaY(offsetY) {
      const ret = offsetY - this.prevOffsetY;

      this.prevOffsetY = offsetY;

      return ret;
    },
    onDragStartCallback(ev){
      // console.log(ev)
    },
    onActivated(id){
      if (this.draggingId) {
        //
      }
      this.draggingId = id
    },
    onDeactivated(id){
      this.draggingId = null
    },
    play(){
      var _that = this;
      _that.playState = true;
      var delay = 0
      if (_that.pageList[this.npage]['layer'].length == 0) return;
      _that.pageList[this.npage]['layer'].forEach(function (e) {
        var total = parseFloat(e.duration) + parseFloat(e.delay);
        delay = delay > total ? delay : total
      })
      setTimeout(() => {
        _that.playState = false
      }, delay*1000)
    },
    preview() {
      this.dialogVisible = true
    },
    publish(){
      if (this.pageList.length == 1 && this.pageList[0]['layer'].length == 0) {
        this.$message.info('无数据可以发布');
        return false;
      }
      if (this.projectName == '') {
        this.$message.error('请输入项目名称');
        return false;
      }
      this.dialogVisible = false;
      this.publishState = true;
      var html = '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '  <meta charset="UTF-8">\n' +
        '  <title>'+this.projectName+'</title>\n' +
        '  <meta name="keywords" content="adophper,adophper.com,免费H5页面制作,微信h5页面,微场景制作,电子邀请函,海报模板,相册设计,H5素材免ps,h5页面制作工具,微信场景制作,移动营销,邀请函模板,贺卡制作" />\n' +
        '  <meta name="description" content="adophper,adophper.com,免费H5页面制作,简单高效强大的H5页面、微信海报制作平台。海量h5模板、海报随心挑选，微信营销推广场景制作平台,企业宣传、音乐相册、电子贺卡、邀请函、微杂志等一键生成H5页面。"/>' +
        '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1.0, maximum-scale=1.0\'/>\n' +
        '  <link href="https://cdn.bootcss.com/Swiper/4.5.1/css/swiper.min.css" rel="stylesheet">\n' +
        '  <link href="//at.alicdn.com/t/font_1588163_zm7dlt6lf5.css" rel="stylesheet">\n' +
        '  <link href="https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css" rel="stylesheet">\n' +
        '  <script src="http://www.cnexpo.com/invite/swiper/swiper.min.js"><\/script>\n'+
' <style>html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:transparent;list-style:none;}html,body{margin:0 auto;position:relative;width:100%;height:100%;background:#0e0e0e;max-width:640px;}.workwrap{position:relative;width:100%;height:100%;margin:0 auto;overflow:hidden;}.workwrap .workcont{position:relative;width:100%;height:100%;overflow:hidden;}.swiper-container{position:relative;width:100%;height:100%;overflow:hidden;}.elementCanvas{position:relative;}.elementCanvas > div{position:relative;}.bgCanvas{position:absolute;left:0;right:0;top:0;bottom:0;}.item_wrapper{position:absolute;overflow-wrap:break-word;}.arrow{position:absolute;width:32px;height:18px;bottom:10px;left:50%;margin-left:-16px;z-index:999;-webkit-animation:start 1.5s infinite ease-in-out;text-align:center;}@-webkit-keyframes start{0%,30%{opacity:0;-webkit-transform:translate(0,10px);}60%{opacity:1;-webkit-transform:translate(0,0);}100%{opacity:0;-webkit-transform:translate(0,-8px);}}@-moz-keyframes start{0%,30%{opacity:0;-moz-transform:translate(0,10px);}60%{opacity:1;-moz-transform:translate(0,0);}100%{opacity:0;-moz-transform:translate(0,-8px);}}@keyframes start{0%,30%{opacity:0;transform:translate(0,10px);}60%{opacity:1;transform:translate(0,0);}100%{opacity:0;transform:translate(0,-8px);}}#audio_btn{position:absolute;right:5px;top:5px;z-index:200;width:50px;height:50px;background-repeat:no-repeat;}#audio_btn.off{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAVbSURBVHjalFZPTBRnFP/NN8yuusNAStmkWlbpKsuys0aaokGhrV40iwdPtY0Xk4JCD/XECUESICYeGkmopFJ66ZptPDRozCY2Nm1RkiqN2WR29g+BLmDcRjYr0B1wZ4eZr5dZMtKC9CWTb5Lvvd9773t/GUoptqBqAM0AGgzD8K+srLhUVeXtdrvicDjmCSESgEkADwGkNgNhNlFSCeBzAGcjkcieaDSaicVic/F4XMvlctRms2kHDx7cJYriPlEUKw8dOvQcwG0A3wLIbEfJhwD6ZVn2joyMyOFwOD49Pf3KwseWlZWxy8vLKsMw2L9//65AIOBta2sTfT5fHEAXgPHXECml1u8MpTQdDAaTHo9nFMBXAIYAfANgBMDQgQMHvr979+50Y2PjjwC+Nu+/8ng8o8FgMEkpTZs467jEoq8JwI3BwcF0e3v7/WQymQfgAGAr2gPAoJSu1dfXOwcGBt6vqKjgABAAjmQymW9vb78/ODiYBnDDxANMhmIMroZCoVxPT8+EoigcgBIL+Prz6rpOFxcX88ePH9/b19d32GazAcAaAE5RFK6np2ciFArlAFw1ccH29vYCwJeyLJ/p6Oj4KZ1O6xYFr8UPwFpVVRUviuJbmqbpp0+fdlNK9fHx8WeUUhYAq6oqlSTprxMnTjQ5nc48gEcEwD5d1z8bHh6Wp6amlgBwW+U0z/NcNpvNt7a2/nznzp3prq6uwy0tLe8BKJhec1NTU0vDw8OyruufAthHADRLkrQ7HA5HAdhNizcjqus6raiosKfTabWtre3XeDz+srOzs768vNxmPhsDwB4Oh2VJkt4F0EwAHJEk6UUqlXplPtOW1WlmJBUEgctkMrnLly//7nK5+Pr6eicA3ZQvSaVSryRJWgBwhBiGISYSiWdmEpA3KWAYxjwYBgA7OTn5QpblbGVl5U4LGwFAEonEHKVUJIqiuGKxWN60gME2iJB1W1hFUfRoNJrVNE23yDMAqCzL+Vwu5yKapvGKoqxf4P8RtdlsRBAEzjAMqywFwKysrEDTNJ5wHKfwPI9teEItRqxbzLJsyZMnT15EIpGXAFirJw6HAxzHKYTn+fm6urodb/DEAKCzLEsopVTXdYMQwgBgM5mMFgwGZ+fm5lYtSigAxufz7SgtLZ0vIYREa2trPwYQM8E2erPmdDp3nT9/3n306NF3SktLbYuLi6tLS0sFADAMgxqGgQ1JYwAwamtrXQzD/FIC4LHf7z9bXV29M5VKrZm9quhRwe12C0NDQ82nTp2qLiLcu3dvWlGUwoZuYP3Xqqurd/r9fieAxwTAQ7/f/zwQCIgAVEtsdEEQSq5du9ZoVQAAqqoamqbRLWKntrS0iH6/Pw3gIQEwy7LsDx0dHb6amppyAJrJrHk8nvLm5uYqK0Iul1NDodDM6upqYZO60mpqasovXrxYx7JsCMBskWnU5/PFent7mwRB0M3KZbPZbH52dnapKL2wsJDr7Ox8NDY29ucmTdQQBEG/cuVKkyiKCQDfbZyMTQBuX79+Pd3d3T2hKAoLgDQ0NLx98uTJPYVCQX/w4EH66dOn2Q3doZiVazzPr/X39x+7dOnSbgBnzdn/r/F7BsCNW7du/d3X1zeRTCaXTTBqpidnnkVgw2yKBY/HU9bd3X3s3LlzAoAvAIy9acYPyLLsvXnzZjQcDsdmZmbylFKyoY4owzDU7XbvCAQCvgsXLvh8Pl/iv2b8VttKK4BPIpHIHkmSFuLx+Hw8HtcURQHP8/B6vZzX63X5/X6nZVsZBbCw3ZXIund9BOADwzBERVH2qqrqsNvtKzzPzxFCogD+APDbVnvXPwMAXMSKb8NEQ6MAAAAASUVORK5CYII=);background-size:30px 30px;background-repeat:no-repeat;background-position:center center;}@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(1turn)}}#audio_btn .rotate{position:absolute;left:10px;top:10px;width:30px;height:30px;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAVbSURBVHjalFZPTBRnFP/NN8yuusNAStmkWlbpKsuys0aaokGhrV40iwdPtY0Xk4JCD/XECUESICYeGkmopFJ66ZptPDRozCY2Nm1RkiqN2WR29g+BLmDcRjYr0B1wZ4eZr5dZMtKC9CWTb5Lvvd9773t/GUoptqBqAM0AGgzD8K+srLhUVeXtdrvicDjmCSESgEkADwGkNgNhNlFSCeBzAGcjkcieaDSaicVic/F4XMvlctRms2kHDx7cJYriPlEUKw8dOvQcwG0A3wLIbEfJhwD6ZVn2joyMyOFwOD49Pf3KwseWlZWxy8vLKsMw2L9//65AIOBta2sTfT5fHEAXgPHXECml1u8MpTQdDAaTHo9nFMBXAIYAfANgBMDQgQMHvr979+50Y2PjjwC+Nu+/8ng8o8FgMEkpTZs467jEoq8JwI3BwcF0e3v7/WQymQfgAGAr2gPAoJSu1dfXOwcGBt6vqKjgABAAjmQymW9vb78/ODiYBnDDxANMhmIMroZCoVxPT8+EoigcgBIL+Prz6rpOFxcX88ePH9/b19d32GazAcAaAE5RFK6np2ciFArlAFw1ccH29vYCwJeyLJ/p6Oj4KZ1O6xYFr8UPwFpVVRUviuJbmqbpp0+fdlNK9fHx8WeUUhYAq6oqlSTprxMnTjQ5nc48gEcEwD5d1z8bHh6Wp6amlgBwW+U0z/NcNpvNt7a2/nznzp3prq6uwy0tLe8BKJhec1NTU0vDw8OyruufAthHADRLkrQ7HA5HAdhNizcjqus6raiosKfTabWtre3XeDz+srOzs768vNxmPhsDwB4Oh2VJkt4F0EwAHJEk6UUqlXplPtOW1WlmJBUEgctkMrnLly//7nK5+Pr6eicA3ZQvSaVSryRJWgBwhBiGISYSiWdmEpA3KWAYxjwYBgA7OTn5QpblbGVl5U4LGwFAEonEHKVUJIqiuGKxWN60gME2iJB1W1hFUfRoNJrVNE23yDMAqCzL+Vwu5yKapvGKoqxf4P8RtdlsRBAEzjAMqywFwKysrEDTNJ5wHKfwPI9teEItRqxbzLJsyZMnT15EIpGXAFirJw6HAxzHKYTn+fm6urodb/DEAKCzLEsopVTXdYMQwgBgM5mMFgwGZ+fm5lYtSigAxufz7SgtLZ0vIYREa2trPwYQM8E2erPmdDp3nT9/3n306NF3SktLbYuLi6tLS0sFADAMgxqGgQ1JYwAwamtrXQzD/FIC4LHf7z9bXV29M5VKrZm9quhRwe12C0NDQ82nTp2qLiLcu3dvWlGUwoZuYP3Xqqurd/r9fieAxwTAQ7/f/zwQCIgAVEtsdEEQSq5du9ZoVQAAqqoamqbRLWKntrS0iH6/Pw3gIQEwy7LsDx0dHb6amppyAJrJrHk8nvLm5uYqK0Iul1NDodDM6upqYZO60mpqasovXrxYx7JsCMBskWnU5/PFent7mwRB0M3KZbPZbH52dnapKL2wsJDr7Ox8NDY29ucmTdQQBEG/cuVKkyiKCQDfbZyMTQBuX79+Pd3d3T2hKAoLgDQ0NLx98uTJPYVCQX/w4EH66dOn2Q3doZiVazzPr/X39x+7dOnSbgBnzdn/r/F7BsCNW7du/d3X1zeRTCaXTTBqpidnnkVgw2yKBY/HU9bd3X3s3LlzAoAvAIy9acYPyLLsvXnzZjQcDsdmZmbylFKyoY4owzDU7XbvCAQCvgsXLvh8Pl/iv2b8VttKK4BPIpHIHkmSFuLx+Hw8HtcURQHP8/B6vZzX63X5/X6nZVsZBbCw3ZXIund9BOADwzBERVH2qqrqsNvtKzzPzxFCogD+APDbVnvXPwMAXMSKb8NEQ6MAAAAASUVORK5CYII=);-webkit-animation:rotating 1.2s linear infinite;-moz-animation:rotating 1.2s linear infinite;-o-animation:rotating 1.2s linear infinite;animation:rotating 1.2s linear infinite;}.wrapper .play-icon-bg{position:absolute;display:flex;justify-content:center;align-items:center;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.2);}.wrapper .play-icon-bg .play-icon-wrapper{display:flex;justify-content:center;align-items:center;width:80px;height:80px;border-radius:50%;background-color:rgba(0,0,0,.7);}.wrapper .play-icon-bg i{position:relative;left:6%;color:#fff;font-size:40px;}a{text-decoration: none;}</style>\n'+'</head>\n'+
' <body>\n';

      html += '<div class="workwrap">\n' +
        '    <div class="workcont">\n' +
        '      <div class="swiper-container" style="cursor: grab;">\n' +
        '        <div class="swiper-wrapper">\n';
      for (var index in this.pageList) {
        var page = this.pageList[index];
        html += '   <div class="swiper-slide" style="background: ' + (page.backgroundImage == '' ? (page.backgroundColor == '' ? 'rgb(255, 255, 255)' : page.backgroundColor) : 'url(' + page.backgroundImage + ') left top / 100% 100% no-repeat') + ';">\n' +
          '              <div class="elementCanvas" style="transform-origin: 0 0;">\n';
        if (page['layer'].length > 0) {
          for (var key in page['layer']) {
            var element = page['layer'][key];
            if (element.type == 'img') {
              html += '<div class="item_wrapper resize fontresize" style="box-shadow: rgba(0, 0, 0, 0.5) 0 0 0; background-repeat: no-repeat; opacity: ' + (100 - element.opacity) / 100 + '; border-radius: ' + element.borderRadius + 'px; border-color: '+element.borderColor+'; border-style: '+element.borderStyle+'; border-width: '+element.borderWidth+'px; text-align: ' + element.textAlign + '; height: ' + element.height + 'px; left: ' + element.x + 'px; top: ' + element.y + 'px; transform: ' + 'rotateZ(' + element.rotate + 'deg); z-index: ' + element.zIndex + '; width: ' + element.width + 'px;">\n' +
                '                    <div class="content '+(element.ani!=''?'ani':'')+'" swiper-animate-effect="'+element.ani+'" swiper-animate-duration="'+element.duration+'s" swiper-animate-delay="'+element.delay+'s" >\n' +
                '                      <div class="img-element">\n' +
                '                        <div class="wrapper resize fontresize" style="overflow-wrap: break-word; width: '+element.width+'px; height: '+element.height+'px; background-image: url('+element.value+'); background-size: 100% 100%; background-position: 0 0">\n' +
                '                          <div class="render img-render" style="border-radius: 0;"></div>\n' +
                '                        </div>\n' +
                '                      </div>\n' +
                '                    </div>\n' +
                '                  </div>\n' ;
            }else if (element.type == 'text') {
              html += '<div class="item_wrapper resize" style="position: absolute; overflow-wrap: break-word; width: '+element.width+'px; height: '+element.height+'px; top: '+element.y+'px; left: '+element.x+'px; transform: rotateZ('+element.rotate+'deg); opacity: '+((100 - element.opacity)/100)+';background:'+(element.backgroundColor!=''?element.backgroundColor:'translate')+';">\n' +
                '                    <div class="content '+(element.ani!=''?'ani':'')+'" swiper-animate-effect="'+element.ani+'" swiper-animate-duration="'+element.duration+'s" swiper-animate-delay="'+element.delay+'s">\n' +
                '                      <div class="'+element.type+'-element">\n' +
                '                        <div class="wrapper resize fontresize" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word; width: '+element.width+'px; height: '+element.height+'px; font-fFamily: '+element.fontFamily+'; border-radius: '+element.borderRadius+'px; font-style: '+element.fontStyle+'; font-weight: '+(element.fontBold?'bold':'normal')+'; text-align: '+element.textAlign+'; color: '+element.color+'; font-size: '+element.fontSize+'px; text-decoration: '+(element.textDecoration?'underline':'none')+'">\n' +
                '                          <div class="render text-render">\n' +
                '                              <div class="vue-edit-area resize fontresize letterspacing" style="width: '+element.width+'px; border-radius: '+element.borderRadius+'px; border-color: '+element.borderColor+'; border-style: '+element.borderStyle+'; color: '+element.color+'; font-size: '+element.fontSize+'px; line-height: '+element.lineHeight+'; letter-spacing: '+element.letterSpacing+'px; text-decoration: '+(element.textDecoration?'underline':'none')+'; font-family: '+(element.fontFamily?element.fontFamily:'')+'">'+element.value+'</div>\n' +
                '                          </div>\n' +
                '                        </div>\n' +
                '                      </div>\n' +
                '                    </div>\n' +
                '                  </div>\n';
            }else if (element.type == 'video') {
              html += '                  <div class="item_wrapper resize" style="position: absolute; overflow-wrap: break-word; width: '+element.width+'px; height: '+element.height+'px; top: '+element.y+'px; left: '+element.x+'px; transform: rotateZ('+element.rotate+'deg); opacity: '+((100 - element.opacity)/100)+'">\n' +
                '                    <div class="content '+(element.ani!=''?'ani':'')+'" swiper-animate-effect="'+element.ani+'" swiper-animate-duration="'+element.duration+'s" swiper-animate-delay="'+element.delay+'s" >\n' +
                '                      <div class="video-element">\n' +
                '                        <div class="wrapper resize" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word; width: '+element.width+'px; height: '+element.height+'px; line-height: '+element.lineHeight+'; font-family: '+element.fontFamily+'; border-radius: '+element.borderRadius+'px; font-style: '+element.fontStyle+'; font-weight: '+(element.fontBold?'bold':'normal')+'; text-align: '+element.textAlign+'; color: '+element.color+'; font-size: '+element.fontSize+'px; text-decoration: '+(element.textDecoration?'underline':'none')+'">\n' +
                '                          <div class="render video-render resize" style="width: '+element.width+'px; height: '+element.height+'px; background: rgba(0, 0, 0);" onclick="playVideo(\''+element.id+'\')">\n' +
                '                            <video class="resize" id="video-'+element.id+'" src="'+element.value+'" width="'+element.width+'" height="'+element.height+'"></video>\n' +
                '                            <div id="render_'+element.id+'" class="play-icon-bg resize" style="width: '+element.width+'px; height: '+element.height+'px;">\n' +
                '                              <span class="play-icon-wrapper"><i class="iconfont icon-bofang"></i></span>\n' +
                '                            </div>\n' +
                '                          </div>\n' +
                '                        </div>\n' +
                '                      </div>\n' +
                '                    </div>\n' +
                '                  </div>\n';
            }else if (element.type == 'tele') {
              html += '                  <div class="item_wrapper resize fontresize '+(element.ani!=''?('ani '+element.ani):'')+'" swiper-animate-effect="'+element.ani+'" swiper-animate-duration="'+element.duration+'s" swiper-animate-delay="'+element.delay+'s" style="position: absolute; overflow-wrap: break-word; width: '+element.width+'px; height: '+element.height+'px; top: '+element.y+'px; left: '+element.x+'px; transform: rotateZ('+element.rotate+'deg); opacity: '+((100 - element.opacity)/100)+';border-radius: '+element.borderRadius+'px; background-color: '+element.backgroundColor+';">\n' +
                '                    <div class="content">\n' +
                '                      <div class="tele-element">\n' +
                '                        <div class="wrapper resize fontresize" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word; width: '+element.width+'px; height: '+element.height+'px; line-height: '+element.lineHeight+'; font-family: '+element.fontFamily+'; font-style: '+element.fontStyle+'; font-weight: '+(element.fontBold?'bold':'normal')+'; text-align: '+element.textAlign+'; color: '+element.color+'; font-size: '+element.fontSize+'px; text-decoration: '+(element.textDecoration?'underline':'none')+'">\n' +
                '                          <div class="link-button-render render resize" style="width: '+element.width+'px; height: '+element.height+'px;">\n' +
                '                            <div class="text1 link-button-render-text">\n' +
                '                              <a href="tel:'+element.value+'" class="telebtn resize fontresize lineheight" style="display: block; overflow-wrap: break-word; font-family: '+element.fontFamily+'; line-height: '+element.height+'px; font-size: '+element.fontSize+'px; text-align: '+element.textAlign+'; width: '+element.width+'px; height: '+element.height+'px; color: '+element.color+';"><i class="iconfont icon-bohao fontresize" style="font-size: 36px;"></i>'+element.text+'</a>\n' +
                '                            </div>\n' +
                '                          </div>\n' +
                '                        </div>\n' +
                '                      </div>\n' +
                '                    </div>\n' +
                '                  </div>\n';
            }else if (element.type == 'link') {
              html += '                  <div class="item_wrapper resize fontresize '+(element.ani!=''?('ani '+element.ani):'')+'" swiper-animate-effect="'+element.ani+'" swiper-animate-duration="'+element.duration+'s" swiper-animate-delay="'+element.delay+'s" style="overflow-wrap: break-word; font-family: '+element.fontFamily+'; border-radius: '+element.borderRadius+'px; text-align: '+element.textAlign+'; width: '+element.width+'px; height: '+element.height+'px; top: '+element.y+'px; left: '+element.x+'px; line-height: '+element.height+'px; color: '+element.color+'; background-color: '+element.backgroundColor+';">\n' +
                '                    <div class="content">\n' +
                '                      <div class="link-element">\n' +
                '                        <div class="wrapper resize fontresize" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word; width: '+element.width+'px; height: '+element.height+'px; line-height: '+element.lineHeight+'; font-family: '+element.fontFamily+'; font-style: '+element.fontStyle+'; font-weight: '+(element.fontBold?'bold':'normal')+'; text-align: '+element.textAlign+'; color: '+element.color+'; font-size: '+element.fontSize+'px; text-decoration: '+(element.textDecoration?'underline':'none')+'">\n' +
                '                          <div class="link-button-render render resize" style="width: '+element.width+'px; height: '+element.height+'px;">\n' +
                '                            <div class="text1 link-button-render-text">\n' +
                '                              <a href="'+element.value+'" target="_blank" class="linkbtn resize fontresize lineheight" style="display: block;overflow-wrap: break-word; font-family: '+element.fontFamily+'; line-height: '+element.height+'px;  font-size: '+element.fontSize+'px; text-align: '+element.textAlign+'; width: '+element.width+'px; height: '+element.height+'px; color: '+element.color+';">'+element.text+'</a>\n' +
                '                            </div>\n' +
                '                          </div>\n' +
                '                        </div>\n' +
                '                      </div>\n' +
                '                    </div>\n' +
                '                  </div>';
            }
          }
        }
        html += '</div></div>\n';
      }
        html +=  '        </div>\n' +
          '      </div>\n';
      if (this.pageList.length > 1) {
        html += '<span class="arrow resize"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOTEyQUZGMzU3NTIxMUU4QjNEOUQ0MzlDMDc3MDgyRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxOTEyQUZGNDU3NTIxMUU4QjNEOUQ0MzlDMDc3MDgyRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE5MTJBRkYxNTc1MjExRThCM0Q5RDQzOUMwNzcwODJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5MTJBRkYyNTc1MjExRThCM0Q5RDQzOUMwNzcwODJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+yXkN0wAAAVlJREFUeNpi+P//PwMFmAOIS4CYjVwzKLGcG4j3/IeATVDH0M0B/EB8+D8q2A3EXPRwgDAQn/6PHRyGOo5mDhAH4ktolv5E44McJ0QLB8gA8Q00y/YDsRwQn0ATvwh1LNUcoAjE99Es2Y4U57xAfABN/gbU0RQ7QAOIn6AZvh5L1gM5ZgeauntQx5PtAH0gfoFm6FIgZsGhHuSoDWjqH0M9QbIDTIH4LZphs4GYmYCjQY5bhqYP5Ak9UhxgA8Qf0QyZBMSMRKYZkCPnoOkHecaEGAe4AvFXNM3tZJQXIMdORjPnI9RzOB3gC8Q/0DTVUFhfdKCZB/KcCzYHhKEVKv+AuIhCy2G4Bs0R36GehTsgHoj/ICn4C8TpVLIchougnkIuQcNAEkxItdp/qENiqWw5DGdAPQcDG5Hr9S1QV4XQyHIYjoV6chWo3EAvRMxpbDkMW8LKE4AAAwB5ZDwmZZQfSgAAAABJRU5ErkJggg==" /></span>\n'
      }
      if (this.bgMusic.url != '') {
        html += '<div id="audio_btn" class="off" onclick="playMusic()"> <div id="yinfu"> </div> <audio autoplay preload loop src="'+this.bgMusic.url+'" id="media"></audio></div>';
      }
      html += '    </div>\n' +
      '  </div>';
      html += '\n'+
' <script>\n'+
'function isMobile(){var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);return flag;}function swiperAnimateCache(){for(allBoxes=window.document.documentElement.querySelectorAll(".ani"),i=0;i<allBoxes.length;i++)allBoxes[i].attributes["style"]?allBoxes[i].setAttribute("swiper-animate-style-cache",allBoxes[i].attributes["style"].value):allBoxes[i].setAttribute("swiper-animate-style-cache"," "),allBoxes[i].style.visibility="hidden"}function swiperAnimate(a){clearSwiperAnimate();var b=a.slides[a.activeIndex].querySelectorAll(".ani");for(i=0;i<b.length;i++)b[i].style.visibility="visible",effect=b[i].attributes["swiper-animate-effect"]?b[i].attributes["swiper-animate-effect"].value:"",b[i].className=b[i].className+"  "+effect+" "+"animated",style=b[i].attributes["style"].value,duration=b[i].attributes["swiper-animate-duration"]?b[i].attributes["swiper-animate-duration"].value:"",duration&&(style=style+"animation-duration:"+duration+";-webkit-animation-duration:"+duration+";"),delay=b[i].attributes["swiper-animate-delay"]?b[i].attributes["swiper-animate-delay"].value:"",delay&&(style=style+"animation-delay:"+delay+";-webkit-animation-delay:"+delay+";"),b[i].setAttribute("style",style)}function clearSwiperAnimate(){for(allBoxes=window.document.documentElement.querySelectorAll(".ani"),i=0;i<allBoxes.length;i++)allBoxes[i].attributes["swiper-animate-style-cache"]&&allBoxes[i].setAttribute("style",allBoxes[i].attributes["swiper-animate-style-cache"].value),allBoxes[i].style.visibility="hidden",allBoxes[i].className=allBoxes[i].className.replace("animated"," "),allBoxes[i].attributes["swiper-animate-effect"]&&(effect=allBoxes[i].attributes["swiper-animate-effect"].value,allBoxes[i].className=allBoxes[i].className.replace(effect," "))};if(isMobile()){var scaleW=window.innerWidth/640;var scaleH=window.innerHeight/1008;}else{var scaleW=1;var scaleH=1;}var resizes = document.querySelectorAll(\'.resize\');for (var j=0; j<resizes.length; j++) {if(resizes[j].tagName==\'VIDEO\'){resizes[j].width=parseInt(resizes[j].width)*scaleW;resizes[j].height=parseInt(resizes[j].height)*scaleH;}else{resizes[j].style.width=parseInt(resizes[j].style.width)*scaleW+\'px\';resizes[j].style.height=parseInt(resizes[j].style.height)*scaleH+\'px\';resizes[j].style.top=parseInt(resizes[j].style.top)*scaleH+\'px\';resizes[j].style.left=parseInt(resizes[j].style.left)*scaleW+\'px\';if(resizes[j].className.indexOf(\'lineheight\')){resizes[j].style.lineHeight=resizes[j].style.height+\'px\';}if(resizes[j].className.indexOf(\'letterspacing\')&&resizes[j].style.letterSpacing!=\'\'){resizes[j].style.letterSpacing=parseInt(resizes[j].style.letterSpacing)*scaleW+\'px\';}}}var fontsizes = document.querySelectorAll(\'.fontresize\');for (var i = 0; i < fontsizes.length; i++) {fontsizes[i].style.borderRadius = parseInt(fontsizes[i].style.borderRadius)*scaleW+\'px\';fontsizes[i].style.fontSize = parseInt(fontsizes[i].style.fontSize)*scaleW+\'px\';fontsizes[i].style.borderWidth = parseInt(fontsizes[i].style.borderWidth)*scaleW+\'px\';};var swiper = new Swiper(\'.swiper-container\', {initialSlide: 0, direction : \'vertical\', observer: true,observeParents: true,onInit: function(swiper){swiperAnimateCache(swiper);swiperAnimate(swiper);}, onSlideChangeEnd: function(swiper){swiperAnimate(swiper);}, onTransitionEnd: function(swiper){swiperAnimate(swiper);}, watchSlidesProgress: true,onProgress: function(swiper){for (var i = 0; i < swiper.slides.length; i++){var slide = swiper.slides[i];var progress = slide.progress;var translate = progress*swiper.height/4;scale = 1 - Math.min(Math.abs(progress * 0.5), 1);var opacity = 1 - Math.min(Math.abs(progress/2),0.5);slide.style.opacity = opacity;es = slide.style;es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = \'translate3d(0,\'+translate+\'px,-\'+translate+\'px) scaleY(\' + scale + \')\';}},onSetTransition: function(swiper, speed) {for (var i = 0; i < swiper.slides.length; i++){es = swiper.slides[i].style;es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + \'ms\';}}});function playVideo(id) {var e = document.getElementById(\'video-\' + id), i = document.getElementById(\'render_\' + id);e.paused ? (e.play(), i.style.visibility = "hidden") : e.pause && (e.currentTime = 0, e.pause(), i.style.visibility = "visible")}function playMusic() {var audio_btn = document.getElementById(\'audio_btn\');if (audio_btn == null) return;var yinfu = document.getElementById(\'yinfu\');var media = document.getElementById(\'media\');if (media.paused) {media.play();audio_btn.className = \'play_yinfu\';yinfu.className = \'rotate\';}else{media.pause();audio_btn.className = \'off\';yinfu.className = \'\';}}playMusic(); <\/script>\n<script>var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?07c1366723449548a1271f777afe1ccd";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);\n})();<\/script>\n'+
' <script>\n//请在此添加分享脚本\n' +
'<\/script>\n'+
' </body>\n'+
'</html>\n';
      this.publishContent = html;
    },
    addElement(data) {
      var element = JSON.parse(data)
      element.id = this.utils.uuid(16, 32);
      var activeElement = this.draggingElement;
      var count = this.utils.getArrayCount(this.pageList[this.npage]['layer'], 'type', element.type);
      if (element.type == 'img') {
        element.name = '图片 '+(count+1);
        if (activeElement) {
          element.x = activeElement.x;
          element.y = activeElement.y;
          element.width = activeElement.width;
          element.height = activeElement.height;
        }
      }else if (element.type == 'video') {
        element.name += (count+1);
      }else if (element.type == 'link') {
        element.name += (count+1);
      }else if (element.type == 'tele') {
        element.name += (count+1);
      }
      this.pageList[this.npage]['layer'].push(element)
      // this.setControlActive(element.id);//选中
    },
    subfuncwrap(){
      return false;
    },
    // 手动设置刚才添加的控件为选中状态
    setControlActive(id) {
      this.$nextTick(() => {
        this.$refs[id][0].elementDown();
        this.draggingId = id
      });
    },
    setPageOption(arg){
      var pageIndex = arg[0];
      var that_page = JSON.stringify(this.pageList);
      var data = JSON.parse(that_page);
      if (typeof data[pageIndex] == null) return;
      var field = arg[1];
      if (typeof data[pageIndex][field] == 'undefined') return;
      var value = arg[2];
      data[pageIndex][field] = value;
      this.pageList = data;
    },
    deletePage(index) {
      this.pageList.splice(index,1);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      if (index == this.npage) {
        this.npage = index - 1
      }
    },
    setElementNode(arg){
      var id = arg[0];
      if (!id) return;
      var ele = this.pageList[this.npage]['layer'].find(el => el.id === id);
      var data = arg[1];
      if (!data) return;
      Object.keys(ele).forEach((item, index) => {
        if (typeof data[item] != 'undefined') {
          ele[item] = data[item]
        }
      })
    },
    previewAnimation(id){
      var ele = this.draggingElement;
      this.$refs['content_'+id][0].className = 'content target';
      if (ele.ani != '') {
        this.$refs['content_' + id][0].style.animationDuration = ele.duration + 's';
        this.$refs['content_' + id][0].style.animationDelay = ele.delay + 's';
        this.$refs['content_' + id][0].style.animationIterationCount = ele.iteration == '' ? 1 : ele.iteration;
        this.$refs['content_' + id][0].style.animationPlayState = 'running';
        this.$refs['content_' + id][0].className = 'content target animated ' + ele.ani;
        setTimeout(() => {
          this.$refs['content_' + id][0].className = 'content target';
          this.$refs['content_' + id][0].style.animationDuration = '';
          this.$refs['content_' + id][0].style.animationDelay = '';
          this.$refs['content_' + id][0].style.animationIterationCount = 1;
          this.$refs['content_' + id][0].style.animationPlayState = 'paused';
        }, parseFloat(ele.duration + ele.delay) * 1000);
      }
    },
    deleteElement(id){
      var _that = this;
      this.pageList[_that.npage]['layer'].forEach(function (item, index) {
        if (item.id === id) _that.pageList[_that.npage]['layer'].splice(index, 1)
      });
      if (this.pageList[_that.npage]['layer'].length == 0) {
        this.draggingId = null;
        return;
      }
    },
    setElementField(arg){
      var id = arg[0];
      if (!id) return;
      var ele = this.pageList[this.npage]['layer'].find(el => el.id === id);
      if (!ele) return;
      var field = arg[1]
      if (!field || typeof ele[field] == 'undefined') return;
      this.$set(ele, field, !ele[field])
      if (field == 'isVisible' && !ele[field]) {
        this.$set(ele, 'isActive', false)
      }
    },
    selectActive(item){
      var _that = this;
      if (item.id === _that.draggingId) return;

      this.pageList[_that.npage]['layer'].forEach(function (ele) {
        if (ele.id != item.id) {
          ele.isActive = false
        }else{
          ele.isActive = true
        }
      })
      this.setControlActive(item.id)
    },
    addPage() {
      var old = JSON.stringify(this.defaultPage);
      this.pageList.splice(this.npage+1, 0, JSON.parse(old));
    },
    copyPage(index) {
      var old = JSON.stringify(this.pageList[index]);
      this.pageList.splice(index+1, 0, JSON.parse(old));
    },
    setPage(n) {
      if (n == this.npage) return;
      this.npage = n
    },
    updatePage(data){
      this.pageList = JSON.parse(data)
    },
    setFileList(fileList) {
      this.fileList = JSON.parse(fileList)
    },
    setBgList(bgList) {
      this.bgList = JSON.parse(bgList)
    },
    setMusicList(musicList) {
      this.musicList = JSON.parse(musicList)
    },
    setBgMusic(item) {
      this.bgMusic = item
    },
    setVideoList(videoList) {
      this.videoList = JSON.parse(videoList)
    },
    playVideo(id){
      this.$nextTick(function () {
        var e = this.$refs['video-'+id][0], i = document.getElementById('render_'+id);
        e.paused ? (e.play(), i.style.visibility = "hidden") : e.pause && (e.currentTime = 0, e.pause(), i.style.visibility = "visible")
      })
    },
    mainContextMenu(){
      return false;
    },
    contextMenu(ev){
      var ref = document.getElementById('item_context_menu');
      ref.style.left = ev.clientX +'px';
      ref.style.top = ev.clientY + 5 +'px';
      this.rightClickState = true;
      this.actionId = this.draggingId;
      return false;
    },
    copyElement(){
      if (!this.actionId) {
        this.$message.info('请选择要复制的元素');
        return false;
      }
      this.copyId = this.actionId;
      this.rightClickState = false;
    },
    pasteElement(){
      if (!this.copyId) {
        this.$message.error('请选择要粘贴的元素');
        return false;
      }
      var pasteItem = '';
      var pasteIndex = 0;
      var that = this;
      this.pageList[this.npage]['layer'].find(function (item, index) {
        if (that.copyId == item.id) {
          pasteItem = JSON.stringify(item)
          pasteIndex = index;
        }
      })
      if (pasteItem != '') {
        pasteItem = JSON.parse(pasteItem);
        pasteItem.id = this.utils.uuid(16, 32);
        pasteItem.x += 10;
        pasteItem.y += 10;
        this.pageList[this.npage]['layer'].splice(pasteIndex+1, 0, pasteItem);
        //这里有点bug没有修复
        // this.setControlActive(pasteItem.id);
      }

      this.copyId = null;
      this.actionId = null;
    },
    delElement(){
      this.deleteElement(this.actionId);
      this.actionId = null;
    },
    topElement(){
      var that = this;
      var eindex = 0;
      var temp = null;
      var layer = this.pageList[this.npage]['layer'];
      if (layer.length > 1) {
        layer.find(function (item, index) {
          if (that.actionId == item.id) {
            temp = item;
            eindex = index
          }
        });
        //不是顶层元素
        if (temp && eindex < (layer.length-1) ) {
          layer.splice(eindex, 1);
          layer.push(temp);
          this.pageList[this.npage]['layer'] = layer;
        }
      }

      this.rightClickState = false;
      this.actionId = null;
      return false;
    },
    bottomElement(){
      var that = this;
      var eindex = 0;
      var temp = null;
      var layer = this.pageList[this.npage]['layer'];
      if (layer.length > 1) {
        layer.find(function (item, index) {
          if (that.actionId == item.id) {
            temp = item;
            eindex = index
          }
        });
        //不是最低层元素
        if (temp && eindex > 0) {
          layer.splice(eindex, 1);
          layer.splice(0, 0, temp);
          this.pageList[this.npage]['layer'] = layer;
        }
      }

      this.rightClickState = false;
      this.actionId = null;
      return false;
    },
    upElement(){
      var that = this;
      var eindex = 0;
      var temp = null;
      var layer = this.pageList[this.npage]['layer'];
      if (layer.length > 1) {
        layer.find(function (item, index) {
          if (that.actionId == item.id) {
            temp = item;
            eindex = index
          }
        });
        //不是最高层元素
        if (temp && eindex < (layer.length-1) ) {
          layer[eindex] = layer[eindex+1];
          layer[eindex+1] = temp;
          this.pageList[this.npage]['layer'] = layer;
        }
      }
      this.rightClickState = false;
      this.actionId = null;
      return false;
    },
    downElement(){
      var that = this;
      var eindex = 0;
      var temp = null;
      var layer = this.pageList[this.npage]['layer'];
      if (layer.length > 1) {
        layer.find(function (item, index) {
          if (that.actionId == item.id) {
            temp = item;
            eindex = index
          }
        });
        //不是最低层元素
        if (temp && eindex > 0 ) {
          layer[eindex] = layer[eindex-1];
          layer[eindex-1] = temp;
          this.pageList[this.npage]['layer'] = layer;
        }
      }
      this.rightClickState = false;
      this.actionId = null;
      return false;
    },
  },
  computed:{
    draggingElement: function () {
      if (! this.draggingId) return;

      return this.pageList[this.npage]['layer'].find(el => el.id === this.draggingId);
    }
  }
}
</script>

<style scoped>
.topnav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  height: 50px;
  background: #0f0f0f;
}

.topnav .logo {
  float: left;
  width: 89px;
  height: 24px;
  margin: 0 8%;
  color: #1bceb3;
  font-size: 36px;
  line-height: 50px;
  text-align: center;
}

.topnav .editbtn {
  float: right;
  overflow: hidden
}

.topnav .editbtn a {
  float: left;
  height: 50px;
  line-height: 50px;
  margin-right: 40px;
  color: #aeaeae;
  font-size: 14px
}

.topnav .editbtn a:hover {
  color: #fff
}

.topnav .editbtn a i {
  font-size: 16px;
  margin-right: 5px
}

.topnav .workstute {
  float: left;
  height: 50px;
  margin: 0 15px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #1bceb3
}

.topnav .worktitle {
  position: absolute;
  width: 280px;
  height: 30px;
  top: 10px;
  left: 50%;
  margin-left: -140px;
  border-radius: 4px;
  background: #303132
}

.topnav .worktitle input {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  border: 0;
  background: #303132;
  border-radius: 4px;
  font-size: 12px;
  color: #ccc;
  outline: none;
  text-overflow: ellipsis;
  text-align: center
}

.topnav .worktitle a {
  display: block;
  overflow: hidden;
  color: #aeaeae
}

.topnav .worktitle a p {
  width: 240px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap
}

.topnav .worktitle a i {
  float: left;
  width: 40px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px
}
.topnav .usercenter {
  float: right;
  width: 34px;
  height: 34px;
  margin: 8px 160px 0 0;
  border-radius: 50%;
  overflow: hidden;
  position: relative
}
.topnav .usercenter img {
  display: block;
  width: 100%;
  height: 100%
}
.topnav .publish {
  float: right;
  width: 90px;
  height: 28px;
  line-height: 28px;
  margin: 11px 3.125% 0 0;
  background: #1bceb3;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: 2px
}

.topnav .publish:hover {
  background: #1ee5c7
}

.topnav .publish i {
  margin-right: 5px
}
.funcwrap {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 60px;
  background: #404040;
  z-index: 11;
}
.rightnav {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  width: 60px;
  background: #333;
  z-index: 11;
}
.cursor {
  cursor: pointer;
}
.rightnav .navwrap a {
  display: block;
  width: 60px;
  height: 60px;
  color: #bdbdbd;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
}
.rightnav .navwrap a.active, .rightnav .navwrap a:hover {
  background: #404040;
}
.rightnav a i {
  display: block;
  font-size: 20px;
  margin: 12px 0 6px;
  text-align: center;
  color: #979eac;
}
.rightnav a p {
  font-size: 12px;
  text-align: center;
  color: #bdbdbd;
}

.subfuncwrap {
  position: fixed;
  top: 50px;
  right: 0;
  width: 340px;
  bottom: 0;
  z-index: 11;
  background: #404040
}

.subfuncwrap .functitle {
  overflow: hidden
}

.subfuncwrap .functitle a {
  float: left;
  width: 33.3%;
  height: 44px;
  line-height: 44px;
  background: #333;
  font-size: 16px;
  color: #a2a2a2;
  text-align: center
}

.subfuncwrap .functitle a.active {
  color: #fff;
  background: #404040
}
.workarea {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  background: #212226;
}
.mainarea {
  position: absolute;
  width: 320px;
  height: 504px;
  top: 20%;
  left: 50%;
  margin-left: -160px;
}
.grid-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  -webkit-user-drag: none;
  pointer-events: none;
  /*display: none;*/
}
.bgCanvas {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.vdr {
  border-width: 0;
}
.my-active-class.vdr {
  border-width: 1px;
  border-style: dashed;
  border-color: rgba(128, 128, 128, .5);
}
/deep/ .my-handle-class {
  position: absolute;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  box-model: border-box;
  -webkit-transition: all 300ms linear;
  -ms-transition: all 300ms linear;
  transition: all 300ms linear;
}
/deep/ .my-handle-class-tl {
  top: -14px;
  left: -14px;
  cursor: nw-resize;
}

/deep/ .my-handle-class-tm {
  top: -14px;
  left: 50%;
  margin-left: -7px;
  cursor: n-resize;
}

/deep/ .my-handle-class-tr {
  top: -14px;
  right: -14px;
  cursor: ne-resize;
}

/deep/ .my-handle-class-ml {
  top: 50%;
  margin-top: -7px;
  left: -14px;
  cursor: w-resize;
}

/deep/ .my-handle-class-mr {
  top: 50%;
  margin-top: -7px;
  right: -14px;
  cursor: e-resize;
}

/deep/ .my-handle-class-bl {
  bottom: -14px;
  left: -14px;
  cursor: sw-resize;
}

/deep/ .my-handle-class-bm {
  bottom: -14px;
  left: 50%;
  margin-left: -7px;
  cursor: s-resize;
}

/deep/ .my-handle-class-br {
  bottom: -14px;
  right: -14px;
  cursor: se-resize;
}
.isVisible {
  visibility: hidden;
}
.sidebar {
  width: 40px;
  height: 504px;
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: 200px;
  background: #313233;
  z-index: 11;
}
.sidebar .barwrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.sidebar .barwrap a {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #888e9b;
}
.sidebar .barwrap .savework {
  position: absolute;
  bottom: 0;
  left: 0;
}
.sidebar .barwrap a.active, .sidebar .barwrap a:hover {
  color: #23d7bc;
  background: #2e2e2f
}
.sidebar .barwrap a.finish {
  color: #45474b;
  cursor: not-allowed
}

.e-stage-mask {
  -ms-flex: 1;
  flex: 1;
  background-color: rgba(26, 26, 26, .7);
  pointer-events: none;
  z-index: 1
}

.e-stage-mask.fixed {
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(50% - 160px)
}

.e-stage-mask.fixed.right {
  right: 0
}

.e-stage-mask.fixed.left {
  left: 0
}

.e-stage-mask.fixed.left:after {
  content: "";
  height: 504px;
  right: 0;
  top: 20%;
  position: absolute;
  border-right: 1px dashed #b7b7b7;
}

.e-stage-mask.fixed.right:after {
  content: "";
  height: 504px;
  left: 0;
  top: 20%;
  position: absolute;
  border-left: 1px dashed #b7b7b7;
}
.rightclickbox {
  position: fixed;
  z-index: 999;
  border-radius: 4px;
  overflow: hidden;
}
.rightclickbox a {
  display: block;
  width: 90px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #9d9d9d;
  background: #313233;
}
a, a:hover {
  color: #1bceb3;
}
@media screen and (max-width: 1440px) {
  .e-stage-mask.fixed.left:after, .e-stage-mask.fixed.right:after, .mainarea, .sidebar {
    top: 15%
  }

  .e-stage-mask.fixed.top {
    height: 15% !important
  }

  .e-stage-mask.fixed.bottom {
    top: calc(15% + 504px) !important
  }
}

@media screen and (max-width: 1367px) {
  .e-stage-mask.fixed.left:after, .e-stage-mask.fixed.right:after, .mainarea, .sidebar {
    top: 5%
  }

  .e-stage-mask.fixed.top {
    height: 5% !important
  }

  .e-stage-mask.fixed.bottom {
    top: calc(5% + 504px) !important
  }
}
.video-element .video-render {
  position: absolute;
  pointer-events: auto;
  cursor: pointer;
}
.video-element .video-render video {
  -o-object-fit: fill;
  object-fit: fill;
}
.item_wrapper, .wrapper {
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
.link-button-render {
  border-radius: 20px;
  text-align: center;
}
.publish-div {
  margin: 0 auto;
  width: 80%;
  height: 600px;
  border: 1px solid #ccc;
  box-shadow: inset 0 0 4px #ccc;
}
</style>
