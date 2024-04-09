<script setup>
import {StarFilled} from '@element-plus/icons-vue'
import oneCard from '@/components/oneCard.vue'
import { ref,onMounted,provide } from "vue";
import { useRoute } from "vue-router";
import { getOneMovie } from "@/api/movie/index.js";
import {currentDate, transformDate, transformTime} from "@/util/curDate.js";

const route = useRoute()
const movieData = ref({})
const actorData = ref([])
const isEmpty = ref(false)

provide('isEmpty',isEmpty)

onMounted(async () => {
  const data = await getOneMovie(route.params.id)
  actorData.value = data.actorData
  movieData.value = data.movieData
  isEmpty.value = new Date(movieData.value.movieDate) > currentDate
  movieData.value.movieDuration = transformTime(movieData.value.movieDuration)
  movieData.value.movieDate = transformDate(new Date(movieData.value.movieDate))
})

</script>

<template>
  <div class="container" style="margin: 0 auto;">
    <div class="detail">
      <img alt="..." :src="movieData.moviePoster">
      <div class="information" >
        <div class="title">{{movieData.movieName}}</div>
        <div class="type_duration">
          {{ movieData.movieDuration }} | {{movieData.movieType}} |
          <span class="time">{{ movieData.movieDate }}</span>
        </div>
        <div class="describe">{{movieData.movieDesc}}</div>
        <div class="score">
          <el-icon style="color: rgb(211,153,11);">
            <StarFilled/>
          </el-icon>
          {{ movieData.movieScore }}
        </div>
      </div>
    </div>

    <!--主要演员-->
    <div class="nav">
      Cast and crew
    </div>
    <div style="width: 100%;">
      <div class="showing">
        <one-card v-for="item in actorData" :key="item._id">
          <template #picture>
            <img :src="item.imgUrl" alt="..."/>
          </template>
          <template #movie>
            {{ item.actorname }}
          </template>
          <template #desc>
            {{ item.rolename }}
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.information .title {
  font-size: 22px;
  font-weight: 600;
}

.information .type_duration {
  font-size: 16px;
}

.information .type_duration .time {
  font-weight: 500;
  color: rgb(211, 153, 11);
}

.information .describe {
  width: 100%;
  font-size: 14px;
  margin: 8px 0 20px;
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
