<script setup>
import {useRoute} from "vue-router";
import {getSeatInformation, bookTicket} from "@/api/order/index.js";
import {ref, toRefs, onMounted} from "vue";
import {normalizeDateTime} from "@/util/curDate.js";
import {ElMessage} from 'element-plus'
import {seatTransform} from "@/util/seat.js";
import router from "@/router/index.js";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
const seatData = ref('')
const route = useRoute()
const theaterNumber = ref('')
const movieName = ref('')
const movieDate = ref('')
const detail = ref({})
const seatInformation = ref([])
const allSeat = ref(null)
const submitSeatData = ref([]) //预定的座位
const mapping = {
  "A": 0,
  "B": 1,
  "C": 2,
  "D": 3,
  "E": 4,
  "F": 5,
  "G": 6
}
const storeSeat = ref([])

const initializeSeats = () => {
  for (let row = 0; row < 7; row++) { // 假设有7行
    for (let group = 0; group < 8; group++) { // 假设每行有8组
      for (let seat = 0; seat < 2; seat++) { // 假设每组有2个座位
        storeSeat.value.push({
          row,
          group,
          seat,
          isChosen: false,
          isBooked:false
        });
      }
    }
  }
};
initializeSeats();

const render = async () => {
  const data = await getSeatInformation(route.query)
  movieName.value = data.movieName
  seatData.value = data.orderData
  theaterNumber.value = `Theater ${route.query.theaterNumber}`
  movieDate.value = route.query.startDate
  const {finalYear, finalMonth, finalDate, finalTime} = toRefs(normalizeDateTime(movieDate.value));
  detail.value = {
    finalYear,
    finalMonth,
    finalDate,
    finalTime
  }
  seatInformation.value = data.seatData ? data.seatData : []

  //将已经预定过的位置标红，不能再订

  seatInformation.value.forEach(item => {
    const rowNumber = mapping[item.row]
    let group = 0
    let seat = 0
    if (item.column % 2 === 0) {
      group = (item.column / 2) - 1
      seat = 1
    } else {
      group = Math.floor(item.column / 2)
      seat = 0
    }
    storeSeat.value.forEach(item => {
      if (item.row === rowNumber && item.group === group && item.seat === seat) {
        item.isChosen = true
      }
    })
  })
}

onMounted(async () => {
  await render()
})


//预定座位逻辑处理
const choseSeat = (row, group, innerSeat) => {
  storeSeat.value.forEach(item => {
    if (item.row === row && item.group === group && item.seat === innerSeat){
      if (item.isChosen){
        ElMessage({
          type:"error",
          duration:2000,
          message:"The seat you selected has been reserved"
        })
      } else {
        item.isBooked = !item.isBooked
        if (item.isBooked){
          submitSeatData.value.push(seatTransform({row,group,innerSeat}))
        } else {
          submitSeatData.value = submitSeatData.value.filter(each => {
            const {row:oneRow,column:oneColumn} = each
            const {row:twoRow,column:twoColumn} = seatTransform({row,group,innerSeat})
            return oneRow !== twoRow || oneColumn !== twoColumn
          })
        }

      }
    }
  })
}

//book
const takeBook = async () => {
  const final = {
    ...route.query,
    seatInfo: submitSeatData.value,
    customerId: userStore.userId
  }
  const result = await bookTicket(final)
  await ElMessage({
    type: 'success',
    message: result.message,
    duration: 2000
  })

  setTimeout(() => router.go(0), 2200)
}
</script>

<template>
  <div class="nav">
    Choose your seat
  </div>
  <div class="info">
    <span class="studio">{{ theaterNumber }}</span>
    <span class="name">{{ movieName }}</span>
    <span class="time">{{ detail.finalDate }} {{ detail.finalMonth }} {{ detail.finalYear }} | {{
        detail.finalTime
      }}</span>
    <div>
      <el-link :underline="false" type="warning" @click="$router.push(`/detailInfo/detail/${route.params.id}`)">Back to
        detail
      </el-link>
    </div>
  </div>
  <div class="theater">
    <div class="seat">
      <div class="seat_number" style="color: rgb(211, 153, 11);">
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
        <span>E</span>
        <span>F</span>
        <span>G</span>
      </div>
      <div style="display: flex;flex-wrap: wrap;justify-content: space-evenly" ref="allSeat">
        <div class="each_row" v-for="(row, rowIndex) in 7" :key="`row-${rowIndex}`">
          <div class="pair" v-for="groupIndex in 8" :key="`group-${groupIndex}`">
              <span class="iconfont icon-loveseat"
                    v-for="seatIndex in 2"
                    :key="`seat-${seatIndex}`"
                    :class="{
                      'chosen': storeSeat.find(seat => seat.row === rowIndex && seat.group === groupIndex-1 && seat.seat === seatIndex-1).isChosen,
                      'reserved':storeSeat.find(seat => seat.row === rowIndex && seat.group === groupIndex-1 && seat.seat === seatIndex-1).isBooked}"
                    @click="choseSeat(rowIndex,groupIndex - 1,seatIndex - 1)"
              >
              </span>
          </div>
        </div>
      </div>
    </div>
    <div style="margin:20px 0;width: 20px">
      <el-button size="small" type="warning" round @click="takeBook">Book</el-button>
    </div>

  </div>
</template>

<style scoped>
.nav {
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 600
}

.theater {
  width: 80%;
  margin: 50px 400px;
}

.info {
  display: flex;
  flex-direction: column;
  font-size: 20px;
}

.seat {
  width: 60%;
  display: flex;
  justify-content: space-between;
  font-size: 22px;
}

.seat .seat_number {
  display: flex;
  flex-direction: column;
  font-size: 22px;
}

.each_row {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.chosen {
  color: red;
}

.reserved {
  color: green;
}
</style>
