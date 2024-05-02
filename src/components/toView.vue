<template>
  <el-main>
    <el-row>
      <el-col>
        <!-- 示例数据    {
        "id": "402881f18f296d60018f296e5bff0000",
        "createdDate": "2024-04-29 10:37:29",
        "lastModifiedDate": null,
        "customName": "consequat",
        "typeName": "ipsum ",
        "ipAddress": "do minim en",
        "status": 1,
        "city": "enim dolore",
        "address": "sit nostrud",
        "buyDate": null,
        "deliveryDate": null,
        "acceptanceDate": null,
        "putIntoUseDate": null,
        "description": "reprehenderit in voluptate id",
        "coordinate": "do amet consectetur Duis",
        "entityId": "402881f18f296d60018f296e5bff0000"
    }, -->
        <el-descriptions class="margin-top" title="设备信息" :column="3" :size="size" border>
          <template #extra>
            <el-button type="primary" @click="isEditing = !isEditing">
              {{ isEditing ? '取消' : '编辑' }}
              <el-icon class="el-icon--right">
                <Edit />
              </el-icon>
            </el-button>
            <el-button type="warning">提交
              <el-icon class="el-icon--right">
                <Upload />
              </el-icon>
            </el-button>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconChip theme="outline" size="16" fill="#333" />
                Custom Name
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.customName }}
            </template>
            <el-input v-else v-model="newDevice.customName"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconTag theme="outline" size="16" fill="#333" />
                Type Name
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.typeName }}
            </template>
            <el-input v-else v-model="newDevice.typeName"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconLocalTwo theme="outline" size="16" fill="#333" />
                IP Address
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.ipAddress }}
            </template>
            <el-input v-else v-model="newDevice.ipAddress"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconTagOne theme="outline" size="16" fill="#333" />
                Status
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.status }}
            </template>
            <el-input v-else v-model="newDevice.status"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconLocal theme="outline" size="16" fill="#333" />
                Address
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.address }}
            </template>
            <!-- TODO: 将这个拼接为字符串给后端或者改后端接口 -->
            <div v-else class="areabox">
              <el-select v-model="newDevice.address.province" placeholder="请选择省"
                :style="{ width: `${prop.width}px`, marginRight: `${prop.gap}px` }" @change="handleProvinceSelect">
                <el-option v-for="item in regionData" :label="item.label" :value="item.value" :key="item.value" />
              </el-select>
              <el-select v-model="newDevice.address.city" placeholder="请选择市" :disabled="!address.province || cityList.length == 0"
                :style="{ width: `${prop.width}px`, marginRight: `${prop.gap}px` }" @change="handleCitySelect">
                <el-option v-for="item in cityList" :label="item.label" :value="item.value" :key="item.value" />
              </el-select>
              <el-select v-model="newDevice.address.area" placeholder="请选择区" :style="{ width: `${prop.width}px` }"
                :disabled="!address.province || !address.city || areaList.length == 0" @change="handleAreaSelect">
                <el-option v-for="item in areaList" :label="item.label" :value="item.value" :key="item.value" />
              </el-select>
            </div>

          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconCoordinateSystem theme="outline" size="16" fill="#333" />
                Coordinate
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.coordinate }}
            </template>
            <el-input v-else v-model="newDevice.coordinate"></el-input>
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconCalendar theme="outline" size="16" fill="#333" />
                Created Date
              </div>
            </template>

            <template v-if="!isEditing">
              {{ newDevice.createdDate }}
            </template>
            <el-date-picker v-else v-model="newDevice.createdDate" type="datetime" placeholder="Select date and time"
              :shortcuts="shortcuts" />
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconNotes theme="outline" size="16" fill="#333" />
                Description
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.description }}
            </template>
            <el-input v-else v-model="newDevice.description"></el-input>
          </el-descriptions-item>

          <!-- Add more el-descriptions-item for other data fields as needed -->
        </el-descriptions>
      </el-col>
    </el-row>

    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="数据可视化" name="first">
        <el-row justify="space-around">
          <el-col :span="8" style="">
            <div class="charts" id="chart1">

            </div>
          </el-col>
          <el-col :span="8">
            <div class="charts" id="chart2">

            </div>
          </el-col>
        </el-row>
        <el-row justify="space-around">
          <el-col :span="8">
            <div class="charts" id="chart3">

            </div>
          </el-col>
          <el-col :span="8">
            <div class="charts" id="chart4">

            </div>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 
      <el-tab-pane label="实时查看" name="second">
        <div class="boxIn" style="flex-direction: column">
          <div style="width: 70%;height: 70%" class="flexCenter">
            <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"></video>
          </div>
          <el-row justify="center">
            <el-col :span="13" style="margin-bottom: 5px">
              <div class="slider-demo-block">
                左右移动（X）:<el-slider v-model="XVar" show-input />
              </div>
            </el-col>

            <el-col :span="13" style="margin-bottom: 5px">
              <div class="slider-demo-block">
                前后移动（Y）:<el-slider v-model="YVar" show-input />
              </div>
            </el-col>
            <el-col :span="13" style="margin-bottom: 5px">
              <div class="slider-demo-block">
                上下移动（Z）:<el-slider v-model="ZVar" show-input />
              </div>
            </el-col>
          </el-row>
          <el-row justify="space-around">
            <el-col :span="12" style="text-align: center">
              <el-button type="primary">提交</el-button>
            </el-col>
            <el-col :span="12" style="text-align: center">
              <el-button type="warning">归零</el-button>
            </el-col>
          </el-row>
        </div>

      </el-tab-pane> -->

      <!-- 多图预览 -->
      <!-- <el-tab-pane label="照片记录" name="third">
        <div class="boxIn" style="justify-content: center;flex-wrap: wrap;">
          <div class="demo-image__preview">
            <el-image :src="urls[0]" :zoom-rate="1.2" :preview-src-list="urls"
              :initial-index="0" fit="cover" />
          </div>
        </div>
      </el-tab-pane> -->

      <!-- 轮播图 -->
      <!-- <el-tab-pane label="照片记录" name="third">
        <div class="boxIn" style="justify-content: center;flex-wrap: wrap;">
          <div class="demo-image__preview">
            <el-carousel arrow="always" indicator-position="outside" :autoplay="false" type="card">
              <el-carousel-item v-for="(url, index) in urls" :key="index">
                <img v-lazy="url" style="width: 100%;height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-tab-pane> -->

      <!-- 增强 awesome-swiper -->
      <el-tab-pane label="照片记录" name="third">
        <div class="toolbar">
          <!-- <button @click="prepend()" class="prepend-2-slides">Prepend 2 Slides</button> 前插入 -->
          <el-button type="info" @click="slideTo(1)">
            <el-icon>
              <DArrowLeft />
            </el-icon>
            Start</el-button>
          <el-button type="info" @click="slideTo(Math.floor(slides.length / 2))">Middle</el-button>
          <div>
            <el-button type="info" @click="slideTo(slideNumber)" class="slide-to">Go to</el-button>
            <el-input-number v-model="goToNumber" type="number" min="1" max="slides.length" step="1"
              @change="slideTo(goToNumber)" style="width: 100px" />
          </div>
          <el-button type="info" @click="slideTo(slides.length)">
            End
            <el-icon>
              <DArrowRight />
            </el-icon>
          </el-button>
          <!-- 跳转任意位置 -->

          <!-- <button @click="append()" class="append-slides">Append Slide</button> 后插入 -->
        </div>
        <swiper class="swiper" :modules="modules" :virtual="true" :slides-per-view="12" :centered-slides="true"
          :space-between="30" :navigation="true" :pagination="{ type: 'fraction' }" @swiper="setSwiperRef"
          @slideChange="onSlideChange" :lazy="true">
          <swiper-slide v-for="(slideContent, index) in slides" :key="index" :virtual-index="index" class="slide"
            :lazy="true">
            <img :src="slideContent" style="width: 100%;height: 100%" loading="lazy" @click="slideTo(index)" />
          </swiper-slide>
        </swiper>
        <el-divider></el-divider>
        <!-- 下方显示filename -->
        <div class="boxIn" style="justify-content: center;flex-wrap: wrap;">
          {{ getFileName(urls[slideNumber]) }}
        </div>
        <!-- 下方预览模式 -->
        <!-- 多图预览 -->
        <div class="boxIn" style="justify-content: center;flex-wrap: wrap;">
          <div class="demo-image__preview">
            <el-image :src="urls[slideNumber]" :zoom-rate="1.2" fit="cover" :max-scale="7"
              :preview-src-list="urls.slice(slideNumber, slideNumber + 1)" :initial-index="slideNumber" />
          </div>
        </div>
      </el-tab-pane>




      <!-- 
      <el-tab-pane label="定时任务" name="fourth">
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="Date" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
</el-table-column>
<el-table-column property="name" label="Name" width="120" />
<el-table-column property="address" label="Address" show-overflow-tooltip />
</el-table>
<div style="margin-top: 20px">
  <el-button @click="toggleSelection([tableData[1], tableData[2]])">Toggle selection status of second and third
    rows</el-button>
  <el-button @click="toggleSelection()">Clear selection</el-button>
</div>
</el-tab-pane>
-->

    </el-tabs>

  </el-main>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, onUnmounted, reactive, ref, toRefs } from "vue";
import api from "@/axios/api";
// import videojs, { url } from 'video.js'
import videojs from 'video.js'
import 'videojs-contrib-hls'
import "@videojs/http-streaming"
import { ElMessage } from "element-plus";

import { Pagination, Navigation, Virtual } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
// TODO: for TypeScript
// TODO: delete the none used import for swiper
// import type SwiperClass from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/virtual'

import {regionData, codeToText} from 'element-china-area-data'


import {
  Chip as IconChip,
  Tag as IconTag,
  Local as IconLocal,
  LocalTwo as IconLocalTwo,
  TagOne as IconTagOne,
  CoordinateSystem as IconCoordinateSystem,
  Notes as IconNotes,
  Calendar as IconCalendar
} from '@icon-park/vue-next'

export default {

  name: "toView",
  components: {
    Swiper,
    SwiperSlide,
    // icon-park
    IconChip,
    IconTag,
    IconLocal,
    IconLocalTwo,
    IconTagOne,
    IconCoordinateSystem,
    IconNotes,
    IconCalendar
  },
  setup() {
    // get state from other component
    let urls = history.state.images;
    let deviceId = history.state.deviceId;
    let device = history.state.device;
    console.log(device);

    // swiper
    let swiperRef = null;
    const setSwiperRef = (swiper) => {
      swiperRef = swiper;
    }

    const onSlideChange = () => {
      obj.slideNumber = swiperRef.activeIndex + 1;
      console.log(obj.slideNumber);
    }

    const slideTo = (index) => {
      if (swiperRef) {
        swiperRef.slideTo(index - 1, 0);
      }
    }

    const slides = urls;
    // console.log(urls);

    // china-address
    // 定义属性
    let prop = {
      gap: '8',
      width: '210'
    };

    // 定义地址对象
    let address = {
      province: '',
      city: '',
      area: ''
    };

    // 定义地区列表接口
    class AreaList {
      constructor(value, label, children) {
        this.value = value;
        this.label = label;
        this.children = children || [];
      }
    }

    // 切换省份函数
    const handleProvinceSelect = () => {
      address.city = '';
      address.area = '';
      // 在这里触发 'getAddress' 事件
    };

    // 切换城市函数
    const handleCitySelect = () => {
      address.area = '';
      // 在这里触发 'getAddress' 事件
    };

    // 切换地区函数
    const handleAreaSelect = () => {
      // 在这里触发 'getAddress' 事件
    };

    // 二级城市列表
    const getCityList = () => {
      if (!address.province) { return []; }
      let temp = regionData.find((item) => {
        return item.value == address.province;
      });
      return temp.children ? temp.children : [];
    };

    // 三级地区列表
    const getAreaList = () => {
      if (!address.province || !address.city) { return []; }
      let cityList = getCityList();
      if (cityList.length == 0) {
        return [];
      } else {
        let temp = cityList.find((item) => {
          return item.value == address.city;
        });
        if (temp) {
          return temp.children ? temp.children : [];
        } else {
          return [];
        }
      }
    };


    // eslint-disable-next-line no-unused-vars
    const videoPlayer = ref(null)
    const myPlayer = ref(null)

    // v-model 直接绑定 obj 内的变量，只有在 javascript 中才通过 obj.XVar 的方式访问
    let obj = reactive({
      activeName: 'first',

      slideNumber: 1,
      isEditing: false,
      goToNumber: 1,

      // 更新的 device 信息
      newDevice: device,

      //后台获取
      // positionVar: api.getPosition(),

      //三个方向的偏移量,由PositionVar设定
      XVar: "",
      YVar: "",
      ZVar: "",

    });


    // 如果 url 的个数 = 0，说明没有图片

    if (urls.length === 0) {
      ElMessage({
        message: "No images",
        type: "warning",
      });
    }

    onMounted(async () => {
      // 基于准备好的dom，初始化echarts实例
      let chart1 = echarts.init(document.getElementById('chart1'))
      let chart2 = echarts.init(document.getElementById('chart2'))
      let chart3 = echarts.init(document.getElementById('chart3'))
      let chart4 = echarts.init(document.getElementById('chart4'))

      let dataSet1 = []
      let dataSet2 = []
      let dataSet3 = []
      let dataSet4 = []
      let dataSet5 = []

      await api.getEnvirData(deviceId).then(res => {
        res.data.forEach(item => {
          dataSet1.push(item.lightIntensity)
          dataSet2.push(item.temperature)
          dataSet3.push(item.airHumidity)
          dataSet4.push(item.soilMoisture)
          dataSet5.push(item.time)
        })
      })

      // 指定图表的配置项和数据
      let option1 = {
        title: {
          text: '叶片面积x时间'
        },
        xAxis: {
          // type: 'category',
          data: dataSet5
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show: true, //是否显示
          realtime: true, //拖动时，是否实时更新系列的视图
          start: 0, //伸缩条开始位置（1-100），可以随时更改
          end: 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        series: [
          {
            data: dataSet1,
            type: 'line'
          }
        ]
      };

      let option2 = {
        title: {
          text: '温度x时间'
        },
        xAxis: {
          type: 'category',
          data: dataSet5
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show: true, //是否显示
          realtime: true, //拖动时，是否实时更新系列的视图
          start: 0, //伸缩条开始位置（1-100），可以随时更改
          end: 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        series: [
          {
            data: dataSet2,
            type: 'line'
          }
        ]
      };

      let option3 = {
        title: {
          text: '空气湿度x时间'
        },
        xAxis: {
          type: 'category',
          data: dataSet5
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show: true, //是否显示
          realtime: true, //拖动时，是否实时更新系列的视图
          start: 0, //伸缩条开始位置（1-100），可以随时更改
          end: 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        series: [
          {
            data: dataSet3,
            type: 'line'
          }
        ]
      };

      let option4 = {
        title: {
          text: '土壤湿度x时间'
        },
        xAxis: {
          type: 'category',
          data: dataSet5
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show: true, //是否显示
          realtime: true, //拖动时，是否实时更新系列的视图
          start: 0, //伸缩条开始位置（1-100），可以随时更改
          end: 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        series: [
          {
            data: dataSet4,
            type: 'line'
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      chart1.setOption(option1)
      chart2.setOption(option2)
      chart3.setOption(option3)
      chart4.setOption(option4)

      myPlayer.value = videojs(videoPlayer.value, {
        poster: "",
        sources: [
          {
            src: "http://81.70.11.150:8080/live/111.flv",
            type: 'flv',
          }
        ],
      }, () => {
        myPlayer.value.log("play.....")
      })

    })

    onUnmounted(() => {
      if (myPlayer.value) {
        myPlayer.value.dispose()
      }
    })

    return {
      ...toRefs(obj), myPlayer, videoPlayer, log: console.log, urls: urls,
      // swiper
      modules: [Pagination, Navigation, Virtual],
      setSwiperRef,
      onSlideChange,
      slides,
      slideTo,
      // china-address
      prop,
      address,
      handleProvinceSelect,
      handleCitySelect,
      handleAreaSelect,
      regionData,
      cityList: getCityList(),
      areaList: getAreaList(),
      // regionDataPlus,
      codeToText,
      cityListPlus: getCityList(),
      areaListPlus: getAreaList(),
      AreaList,
      // mine
      device
    }
  },
  methods: {
    getFileName(url) {
      const pathParts = url.split('/');
      const encodeTime = pathParts[pathParts.length - 1].split('.')[0];
      const time = decodeURIComponent(encodeTime);
      console.log(time);
      return time;
    },

  }
}
</script>

<style lang="scss" scoped>
@import '@/SCSS/variables.scss';
@import '@/SCSS/mixins.scss';
@import './style.scss';

.toolbar {
  @include toolbar();

  // button {
  //   @include toolbar-button();
  // }
}

.swiper {
  height: 30%;
  width: 100%;

  ::v-deep(.swiper-slide) {
    @include swiper-slide();
  }
}



.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-row:last-child {
  margin: 0;
}

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>