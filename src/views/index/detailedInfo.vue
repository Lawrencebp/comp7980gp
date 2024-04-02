<script setup>
import {StarFilled} from '@element-plus/icons-vue'
import oneCard from '@/components/oneCard.vue'

</script>

<template>
  <div class="container" style="margin: 0 auto;">
    <div class="detail">
      <img alt="..." src="../../assets/pic6jpg.jpg">
      <div class="information" >
        <div class="title">The Weather Man</div>
        <div class="type_duration">
          2h 1min | Plot, comedy |
          <span class="time">22 August 2020</span>
        </div>
        <div class="describe">
          "The Weather Man" is a 2005 film about David Spritz, a Chicago weatherman struggling with personal issues and
          his quest for self-worth. Despite his professional success, David grapples with a failing marriage, estranged
          children, and seeking his father's approval. The film explores themes of identity and the pursuit of
          validation amidst life's challenges.
        </div>
        <div class="score">
          <el-icon style="color: rgb(211,153,11);">
            <StarFilled/>
          </el-icon>
          8.8
        </div>
      </div>
    </div>

    <!--主要演员-->
    <div class="nav">
      Cast and crew
    </div>
    <div style="width: 100%;">
      <div class="showing">
        <one-card>
          <template #picture>
            <img src="@/assets/human.jpg" alt="..."/>
          </template>
          <template #movie>
            Chris Evans
          </template>
          <template #desc>
            Caption America
          </template>
        </one-card>
        <one-card>
          <template #picture>
            <img src="@/assets/human.jpg" alt="..."/>
          </template>
          <template #movie>
            Chris Evans
          </template>
          <template #desc>
            Caption America
          </template>
        </one-card>
        <one-card>
          <template #picture>
            <img src="@/assets/human.jpg" alt="..."/>
          </template>
          <template #movie>
            Chris Evans
          </template>
          <template #desc>
            Caption America
          </template>
        </one-card>
        <one-card>
          <template #picture>
            <img src="@/assets/human.jpg" alt="..."/>
          </template>
          <template #movie>
            Chris Evans
          </template>
          <template #desc>
            Caption America
          </template>
        </one-card>
        <one-card>
          <template #picture>
            <img src="@/assets/human.jpg" alt="..."/>
          </template>
          <template #movie>
            Chris Evans
          </template>
          <template #desc>
            Caption America
          </template>
        </one-card>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

.detail {
  width: 100%;
  height: 400px;
  padding-right: 200px;
  display: flex;
  background-image: url("@/assets/background.webp");
  background-position: -110% 100%;
}

.detail img {
  width: 320px;
  height: 100%;
  margin-right: 200px;
}

.information {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.information .title {
  font-size: 22px;
  font-weight: 600;
}

.information .type_duration {
  font-size: 13px;
}

.information .type_duration .time {
  font-weight: 500;
  color: rgb(211, 153, 11);
}

.information .describe {
  font-size: 14px;
  margin: 20px 0;
  color: rgb(73, 84, 112);
}
.information .score{
  font-size: 16px;
}

.nav {
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 600
}
.showing {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.showing img{
  width: 100%;
  height: 100%;
}
</style>
