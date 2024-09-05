<script setup>
import {ref,onMounted,inject} from "vue";
import {currentDate,transformDate} from "@/util/curDate.js";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {getOneMovieArrangement} from "@/api/movie/index.js";

const route = useRoute()
const date = ref(transformDate(currentDate))
const useDate = [transformDate(currentDate)]
const tableData = ref([])
const isEmpty = inject('isEmpty')

for(let i = 1; i < 3; i++){
  const t1 = new Date(currentDate.getTime() + i * 86400000)
  const final = transformDate(t1)
  useDate.push(final)
}

const isForbidden = value => {
  return !useDate.includes(transformDate(value))
}

const buy = row => {
  const query = {
    theaterNumber:row.theater.match(/\d+/)[0],
    startDate:new Date(date.value + ' ' + row.start),
    movieId: route.params.id
  }
  router.push({
    path:'/detailInfo/booking/' + route.params.id,
    query
  })
}

const getInfo = async (value) => {
  await render(value)
}

const render = async (date) => {
  tableData.value = []
  const Body =  { movieId: route.params.id, day:`${useDate.indexOf(date) + 1}` }
  const data = await getOneMovieArrangement(Body)
  console.log(data)
  data.arrangement.forEach(item => {
    const {theater,start,end,price} = item
    if (new Date(`${date} ${start}`) > currentDate) {
      tableData.value.push({theater,start,end,price})
    }
  })
}

onMounted(async () => {
  await render(transformDate(currentDate))
})
</script>

<template>
  <div class="nav">
    Movie arrangement
  </div>
  <div style="margin: 30px 0" v-if="!isEmpty">
    <el-date-picker
        type="date"
        placeholder="Pick a day"
        v-model="date"
        value-format="YYYY-MM-DD"
        format="YYYY-MM-DD"
        :disabled-date="isForbidden"
        :editable="false"
        @change="getInfo"
    />
  </div  >
  <el-table v-if="!isEmpty" :data="tableData" style="width: 100%" table-layout="fixed" stripe>
    <el-table-column label="Time">
      <template #default="obj">
        <div class="start">{{ obj.row.start }}</div>
        <div class="end">{{ obj.row.end }} END</div>
      </template>
    </el-table-column>
    <el-table-column label="Theater" prop="theater"/>
    <el-table-column label="Price" prop="price"/>
    <el-table-column>
      <template #default="obj">
        <el-button type="danger" @click="buy(obj.row)">Buy</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-empty v-else description="Coming soon..." />
</template>

<style scoped>
.start {
  color: rgb(244, 244, 244);
  font-size: 24px;
  font-weight: 600;
}

.end {
  color: rgb(73, 84, 112);
  font-size: 12px;
}

.nav {
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 600
}
</style>
