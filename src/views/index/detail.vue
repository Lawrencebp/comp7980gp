<script setup>
import {ref} from "vue";
import {currentDate,transformDate} from "@/util/curDate.js";
import router from "@/router/index.js";

const date = ref('')
const useDate = [transformDate(currentDate)]
for(let i= 1;i<7;i++){
  const t1 = new Date(currentDate.getTime() + i * 86400000)
  const final = transformDate(t1)
  useDate.push(final)
}
const isForbidden = value => {
  return !useDate.includes(transformDate(value))
}
const buy = () => {
  router.push('booking')
}
const tableData = [
  {
    theater: 'Theater 1',
    price: '¥50',
    start: '17:00',
    end: '19:00'
  },
  {
    theater: 'Theater 1',
    price: '¥50',
    start: '17:00',
    end: '19:00'
  },
  {
    theater: 'Theater 1',
    price: '¥50',
    start: '17:00',
    end: '19:00'
  },
  {
    theater: 'Theater 1',
    price: '¥50',
    start: '17:00',
    end: '19:00'
  },
  {
    theater: 'Theater 1',
    price: '¥50',
    start: '17:00',
    end: '19:00'
  },
]
</script>

<template>
  <div class="nav">
    Movie arrangement
  </div>
  <div style="margin: 30px 0">
    <el-date-picker
        type="date"
        placeholder="Pick a day"
        v-model="date"
        value-format="YYYY-MM-DD"
        format="YYYY-MM-DD"
        :disabled-date="isForbidden"
    />
  </div>
  <el-table :data="tableData" style="width: 100%" table-layout="fixed" stripe>
    <el-table-column label="Time">
      <template #default="obj">
        <div class="start">{{ obj.row.start }}</div>
        <div class="end">{{ obj.row.end }} END</div>
      </template>
    </el-table-column>
    <el-table-column label="Theater" prop="theater"/>
    <el-table-column label="Price" prop="price"/>
    <el-table-column>
      <template #default>
        <el-button type="danger" @click="buy">Buy</el-button>
      </template>
    </el-table-column>
  </el-table>
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
