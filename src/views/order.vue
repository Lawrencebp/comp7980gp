<script setup>
import {ref,onMounted} from "vue";
import {getCustomerOrder,delOneOrder} from "@/api/order/index.js";
import {useUserStore} from "@/stores/user.js";
import {transformDate,currentDate} from "@/util/curDate.js";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";

const orderData = ref([])
const user = useUserStore()

onMounted(async () => {
  const {data} = await getCustomerOrder({customerId:user.userId})
  orderData.value = data
  orderData.value.forEach(item => {
    const temp = new Date(item.startDate)
    item.Date = transformDate(temp)
    item.startTime = `${temp.getHours()}:${temp.getMinutes().toString().padStart(2,'0')}:${temp.getSeconds().toString().padStart(2,'0')}`
  })
})

const handleClick = async (value) => {
  const result = await delOneOrder(value)
  await ElMessage({
    type:'success',
    message:result.message,
    duration:'2000'
  })

  setTimeout(() => {
    router.go(0)
  },2100)

}
</script>

<template>
  <div class="container">
    <el-table :data="orderData" style="width: 100%" stripe>
      <el-table-column prop="Date" label="Date"/>
      <el-table-column prop="startTime" label="Time"/>
      <el-table-column prop="row" label="Row"/>
      <el-table-column prop="column" label="Column"/>
      <el-table-column prop="movieName" label="movie"/>
      <el-table-column prop="theaterNumber" label="NO.Theater"/>
      <el-table-column fixed="right" label="Operations">
        <template #default="obj">
          <el-button type="danger" @click="handleClick(obj.row._id)"
                     :disabled="new Date(`${obj.row.Date} ${obj.row.startTime}`) < currentDate">
            Refund</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
