<script setup>
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import oneCard from '@/components/oneCard.vue'
import {onMounted, ref, nextTick} from "vue";
import {getAllMovie} from "@/api/movie/index.js";
import router from "@/router/index.js";
import {transformDate} from "@/util/curDate.js";

const allData = ref([])
const coming = ref([])
const snacks = ref([])
const listLength = ref(0)
const offSizeA = ref(10)
const offSizeB = ref(5)
const numberOfPages = ref(0)
const pastPerPages = ref(0)
const series = ref([])
const xAxis = ref([])
const yAxis = ref([])
const chartOptions = ref({})

const initChart = () => {
  series.value = [{
    name: 'Box Office',
    data: yAxis.value
  }];
  chartOptions.value = {
    chart: {
      height: 600,
      type: 'bar',
      foreColor: "white" // 修正了拼写错误
    },
    tooltip: {
      enabled: true,
      theme:'dark',
      style:{
        fontSize:'20px',
        color:'rgb(255,0,0)'
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
        colors: {
          ranges: [{
            from: 0,
            to: 226.56,
            color: '#A68064'
          }, {
            from: 226.6,
            to: 443.31,
            color: '#9CA8B8'
          },
            {
              from: 443.4,
              to: 660.06,
              color: '#A4A4A7'
            },
            {
              from: 660.07,
              to: 900,
              color: '#8E2323'
            }]
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "$";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
        background: {
          foreColor: 'rgb(255,0,0)' // 修正了位置和拼写
        }
      }
    },
    xaxis: {
      categories: xAxis.value,
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
        style:{
          fontSize:'16px',
          color:'rgb(0,0,0)'
        }
      },
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "million";
        }
      },
      tooltip: {
        enabled: true,
        style:{
          fontSize:'16px',
          color:'rgb(0,0,0)'
        }
      },
    },
    title: {
      text: 'Movie box office rankings',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        fontSize: '22px',
        color: 'rgb(255,255,255)'
      }
    }
  };
}


onMounted(async () => {
  const data = await getAllMovie()
  allData.value = data.movieText
  allData.value.forEach(item => {
    let temp = item.movieBoxOffice
    temp = temp.replace('million', '')
    yAxis.value.push(parseFloat(temp).toFixed(2))
    xAxis.value.push(item.movieName)
  })
  series.value.data = yAxis.value

  initChart()

  coming.value = data.movieComing
  snacks.value = data.snackData
  listLength.value = allData.value.length
  numberOfPages.value = Math.ceil(listLength.value / offSizeA.value)
  pastPerPages.value = Math.ceil(offSizeA.value / offSizeB.value)

  /**
   use: 走马灯
   parameters:
   return:
   **/
  await nextTick(() => {
    const carousel = document.querySelector('.outside');
    let currentIndex = 0; // 追踪当前显示的 .eachOne 索引
    const total = document.querySelectorAll('.carousel .eachOne').length; // 总的 .eachOne 元素数量
    const rightArrow = document.querySelector('.arrowRight')
    const leftArrow = document.querySelector('.arrowLeft')
    rightArrow.addEventListener('click', function () {
      currentIndex++; // 增加当前索引
      if (currentIndex >= total) { // 如果超出总数，重置为0
        currentIndex = total - 1;
      }
      const offset = currentIndex * -100; // 计算偏移量，每次移动100%的宽度
      carousel.style.transform = `translateX(${offset}%)`; // 应用偏移量
    });
    leftArrow.addEventListener('click', function () {
      currentIndex--; // 增加当前索引
      if (currentIndex < 0) { // 如果超出总数，重置为0
        currentIndex = 0;
      }
      const offset = currentIndex * -100; // 计算偏移量，每次移动100%的宽度
      carousel.style.transform = `translateX(${offset}%)`; // 应用偏移量
    });
  })
});
const jumpToDetail = async (value) => {
  await router.push(`/detailInfo/detail/${value}`)
}

</script>

<template>
  <!--电影走马灯-->
  <el-carousel style="width: 500px;margin: 0 auto" indicator-position="outside">
    <el-carousel-item v-for="(item,i) in allData.slice(0,4)" :key="i">
      <img @click="jumpToDetail(item._id)" :src="item.moviePoster" alt="..."/>
    </el-carousel-item>
  </el-carousel>

  <!--热映电影-->
  <div class="title">
    <div>Movie showing now</div>
    <div>
      <el-icon class="arrowLeft">
        <ArrowLeft/>
      </el-icon>
      <el-icon class="arrowRight">
        <ArrowRight/>
      </el-icon>
    </div>
  </div>
  <div class="carousel">
    <div class="outside">
      <div class="eachOne" v-for="(bone,i) in numberOfPages" :key="i">
        <div class="showing" v-for="(inner, j) in pastPerPages" :key="j">
          <one-card
              v-for="each in allData.slice(i * offSizeA,i * offSizeA + offSizeA).slice(j * offSizeB, j * offSizeB + offSizeB)"
              :key="each._id"
              @click="jumpToDetail(each._id)">
            <template #picture>
              <img :src="each.moviePoster" alt="...">
            </template>
            <template #movie>
              {{ each.movieName }}
            </template>
            <template #desc>
              {{ each.movieDesc.match(/[a-zA-Z]+/g).slice(0, 10).join(' ') }}...
            </template>
            <template #score>
              {{ each.movieScore }}
            </template>
          </one-card>
        </div>
      </div>
    </div>
  </div>

  <!--即将上映-->
  <div class="title">
    <div>Coming soon</div>
  </div>
  <div class="coming">
    <div class="line"></div>
    <div class="showing">
      <div v-for="item in coming" :key="item._id">
        <div style="margin-bottom: 50px;position: relative">
          <div class="coming_time">
            <div class="circle"></div>
          </div>
          <div class="date">{{ transformDate(new Date(item.movieDate)) }}</div>
        </div>
        <one-card @click="jumpToDetail(item._id)">
          <template #picture>
            <img :src="item.moviePoster" alt="..."/>
          </template>
          <template #movie>
            {{ item.movieName }}
          </template>
          <template #desc>
            {{ item.movieDesc.match(/[a-zA-Z]+/g).slice(0, 10).join(' ') }}...
          </template>
        </one-card>
      </div>
    </div>
  </div>

  <!--观影小吃-->
  <div class="title">
    <div>Movie watching snacks</div>
  </div>
  <div class="showing">
    <one-card v-for="item in snacks" :key="item._id">
      <template #picture>
        <img :src="item.snackPoster">
      </template>
      <template #movie>
        {{ item.SnackType }}
      </template>
      <template #desc>
        {{ item.Price }}
      </template>
    </one-card>
  </div>

  <!--Apexchart  -->
  <div class="title">
    <div>Movie box office rankings</div>
  </div>
  <div id="chart" style="margin: 100px auto;background-color: rgb(9,12,17)">
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style scoped>
.title {
  width: 100%;
  margin-top: 60px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

img {
  height: 100%;
  width: 100%;
}

.title div:first-child {
  font-size: 25px;
  font-weight: 500;
}

.arrowLeft {
  color: gray;
}

.arrowLeft:hover {
  color: white;
  cursor: pointer;
}

.arrowRight {
  color: gray;
}

.arrowRight:hover {
  color: white;
  cursor: pointer;
}

.carousel {
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.outside {
  display: flex;
  justify-content: space-between;
  transition: all .3s;
}

.carousel .eachOne {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.showing {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.coming {
  flex: 0 0 100%;
  width: 100%;
}

.coming .line {
  flex: 0 0 100%;
  width: 100%;
  height: 1px;
  border: 1.5px rgb(21, 24, 40) solid;
  top: 0;
}

.coming_time {
  flex: 0 0 20%;
  border: 1px rgb(21, 24, 40) solid;
  background-color: rgb(21, 24, 40);
  position: relative;
  margin-bottom: 15px;
}

.coming_time .circle {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: rgb(13, 71, 229);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

.date {
  font-size: 12px;
  color: rgb(73, 84, 112);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

:deep(.el-carousel) {
  height: 400px;
}

.chart {
  margin: 0 auto;
}

</style>
