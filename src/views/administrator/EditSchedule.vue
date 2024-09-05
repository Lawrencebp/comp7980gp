<script setup>
import {ref, onMounted, watch} from "vue";
import {currentDate, transformDate, transformSecond} from "@/util/curDate.js";
import {getAllMovie} from "@/api/movie/index.js";
import {updateArr, modifyArr} from "@/api/admin/index.js";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

const date = ref(transformDate(currentDate))
const useDate = [transformDate(currentDate)]
const tableData = ref([])
const selectedMovie = ref('')
const options = ref([])
const theaterOptions = ref([])
const movieDuration = ref('7200')
const isTimeDisabled = ref(true)
const earliest = ref(`${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`)
const oneArrId = ref('')
const updateForm = ref(null)
const updateFormModel = ref({
  start: '',
  end: '',
  price: 1,
  theater: ''
})

for (let i = 1; i < 13; i++) {
  theaterOptions.value.push({
    label: `Theater ${i}`
  })
}
const mappingRules = {'1': transformDate(currentDate)}
const isDialogVisible = ref(false)

for (let i = 1; i < 3; i++) {
  const t1 = new Date(currentDate.getTime() + i * 86400000)
  mappingRules[(i + 1).toString()] = transformDate(t1)
  const final = transformDate(t1)
  useDate.push(final)
}

const isForbidden = value => {
  return !useDate.includes(transformDate(value))
}

const findOneMovie = async () => {
  const data = await updateArr({movieId: selectedMovie.value, date: date.value})
  movieDuration.value = data.movieDuration
  const newestDate = new Date()
  updateFormModel.value.start = `${newestDate.getHours().toString().padStart(2, '0')}:${newestDate.getMinutes().toString().padStart(2, '0')}`
  let {finalHour: endHour, finalMinute: endMinute} = transformSecond(updateFormModel.value.start, movieDuration.value)
  if (endHour > 23) {
    endHour = '00'
  }
  updateFormModel.value.end = `${endHour}:${endMinute}`
  tableData.value = data.result.filter(item => {
    if (item.day === '1') {
      return new Date(`${transformDate(newestDate)} ${item.start}`).getHours() > newestDate.getHours()
    }
    return item
  })
  tableData.value.forEach(item => {
    item.date = mappingRules[item.day]
    options.value.forEach(each => {
      if (each.value === item.movieId) {
        item.movieName = each.label
      }
    })
  })
}

const edit = _id => {
  isDialogVisible.value = true
  oneArrId.value = _id
  if (new Date(date.value).getTime() > currentDate.getTime()){
    earliest.value = '8:00'
  } else {
    earliest.value = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
  }

}

const startTimeChange = () => {
  isTimeDisabled.value = false
}

watch(() => updateFormModel.value.start, newValue => {
  let {finalHour, finalMinute} = transformSecond(newValue, movieDuration.value)
  if (finalHour > 23) {
    finalHour = '00'
  }
  updateFormModel.value.end = `${finalHour.toString().padStart(2, '0')}:${finalMinute.toString().padStart(2, '0')}`
})

const confirm = async () => {
  try {
    const result = await modifyArr({...updateFormModel.value, _id: oneArrId.value})
    updateForm.value.resetFields()
    isDialogVisible.value = false
    ElMessage({
      type: 'success',
      duration: 2000,
      message: result.message
    })
    setTimeout(() => router.go(0), 2100)

  } catch (e) {
    ElMessage({
      type: 'error',
      duration: 2000,
      message: e.message
    })
  }

}

onMounted(async () => {
  const {movieText} = await getAllMovie()
  movieText.forEach(item => {
    options.value.push({
      label: item.movieName,
      value: item._id
    })
  })
})
</script>

<template>
  <div class="boner">
    <div class="title">
      Choose the date
    </div>
    <el-date-picker
        type="date"
        placeholder="Pick a day"
        v-model="date"
        value-format="YYYY-MM-DD"
        format="YYYY-MM-DD"
        :disabled-date="isForbidden"
        :editable="false"
    />
    <div class="title">
      Choose the Movie
    </div>
    <el-select v-model="selectedMovie" placeholder="Select the movie" @blur="findOneMovie" style="width: 240px">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <div class="title">
      Arrangement
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="movieName" label="Movie Name"/>
      <el-table-column prop="date" label="Date"/>
      <el-table-column prop="theater" label="Theater"/>
      <el-table-column prop="price" label="Price"/>
      <el-table-column prop="start" label="Start Time"/>
      <el-table-column prop="end" label="End Time"/>
      <el-table-column label="Edit">
        <template #default="obj">
          <el-button type="danger" @click="edit(obj.row._id)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" style="margin: 30px 0" @click="router.push('/')">Back to Index</el-button>
  </div>

  <el-dialog v-model="isDialogVisible" title="Shipping address" width="500">
    <el-form :model="updateFormModel" ref="updateForm" label-position="top">
      <el-form-item label="Price" prop="price">
        <el-input-number v-model="updateFormModel.price" :min="1"/>
      </el-form-item>
      <el-form-item label="Theater" prop="theater">
        <el-select
            placeholder="Change the theater"
            size="large"
            v-model="updateFormModel.theater"
        >
          <el-option
              v-for="item in theaterOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Time">
        <div style="width:100%;display: flex;justify-content: space-between">
          <div>
            <el-time-select
                v-model="updateFormModel.start"
                style="width: 200px"
                :min-time="earliest"
                class="mr-4"
                placeholder="Start time"
                start="08:30"
                step="0:15"
                end="23:59"
                :clearable="false"
                :editable="false"
                @change="startTimeChange"
            />
          </div>
          <div> -</div>
          <div>
            <el-time-select
                v-model="updateFormModel.end"
                style="width: 200px"
                :min-time="updateFormModel.start"
                placeholder="End time"
                start="00:00"
                step="00:15"
                end="22:00"
                :disabled="isTimeDisabled"
                @blur="isTimeDisabled = true"
            />
          </div>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.boner {
  width: 900px;
  margin: 0 auto;
}

.title {
  width: 100%;
  font-size: 30px;
  margin: 20px auto;
}
</style>
