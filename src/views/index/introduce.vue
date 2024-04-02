<script setup>
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import oneCard from '@/components/oneCard.vue'
import {onMounted} from "vue";

onMounted(() => {
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
});
</script>

<template>
  <!--电影走马灯-->
  <el-carousel height="400px">
    <el-carousel-item>
      <img src="@/assets/pic1.webp" alt="..."/>
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/pic2.webp" alt="..."/>
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/pic3.webp" alt="..."/>
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/pic4.webp" alt="..."/>
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
      <div class="eachOne">
        <div class="showing">
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
        </div>
        <div class="showing">
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
        </div>
      </div>
      <div class="eachOne">
        <div class="showing">
          <one-card>
            <template #picture>
              <img src="@/assets/pic1.webp" alt="..."/>
            </template>
          </one-card>
          <one-card>
            <template #picture>
              <img src="@/assets/pic1.webp" alt="..."/>
            </template>
          </one-card>
          <one-card>
            <template #picture>
              <img src="@/assets/pic1.webp" alt="..."/>
            </template>
          </one-card>
          <one-card>
            <template #picture>
              <img src="@/assets/pic1.webp" alt="..."/>
            </template>
          </one-card>
          <one-card>
            <template #picture>
              <img src="@/assets/pic1.webp" alt="..."/>
            </template>
          </one-card>
        </div>
        <div class="showing">
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
        </div>
      </div>
      <div class="eachOne">
        <div class="showing">
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
        </div>
        <div class="showing">
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
          <one-card></one-card>
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
      <div>
        <div style="margin-bottom: 50px;position: relative">
          <div class="coming_time">
            <div class="circle"></div>
          </div>
          <div class="date">August 1st</div>
        </div>
        <one-card>
          <template #picture>
            <img src="@/assets/pic6jpg.jpg" alt="..."/>
          </template>
        </one-card>
      </div>
      <div>
        <div style="margin-bottom: 50px;position: relative;flex: 0 0 20%">
          <div class="coming_time">
            <div class="circle"></div>
          </div>
          <div class="date">August 1st</div>
        </div>
        <one-card>
          <template #picture>
            <img src="@/assets/pic6jpg.jpg" alt="..."/>
          </template>
        </one-card>
      </div>
      <div>
        <div style="margin-bottom: 50px;position: relative">
          <div class="coming_time">
            <div class="circle"></div>
          </div>
          <div class="date">August 1st</div>
        </div>
        <one-card>
          <template #picture>
            <img src="@/assets/pic6jpg.jpg" alt="..."/>
          </template>
        </one-card>
      </div>
      <div>
        <div style="margin-bottom: 50px;position: relative">
          <div class="coming_time">
            <div class="circle"></div>
          </div>
          <div class="date">August 1st</div>
        </div>
        <one-card>
          <template #picture>
            <img src="@/assets/pic6jpg.jpg" alt="..."/>
          </template>
        </one-card>
      </div>
      <div>
        <div style="margin-bottom: 50px;position: relative">
          <div class="coming_time">
            <div class="circle"></div>
          </div>
          <div class="date">August 1st</div>
        </div>
        <one-card>
          <template #picture>
            <img src="@/assets/pic6jpg.jpg" alt="..."/>
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
    <one-card>
      <template #picture>
        <img src="@/assets/snack.webp">
      </template>
    </one-card>
    <one-card>
      <template #picture>
        <img src="@/assets/snack.webp">
      </template>
    </one-card>
    <one-card>
      <template #picture>
        <img src="@/assets/snack.webp">
      </template>
    </one-card>
    <one-card>
      <template #picture>
        <img src="@/assets/snack.webp">
      </template>
    </one-card>
    <one-card>
      <template #picture>
        <img src="@/assets/snack.webp">
      </template>
    </one-card>
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
.outside{
  display: flex;
  justify-content:space-between;
  transition: all .3s;
}
.carousel .eachOne{
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
  border: 1px rgb(21, 24, 40) solid;
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
</style>
