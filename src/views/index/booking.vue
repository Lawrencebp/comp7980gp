<script setup>

</script>

<template>
  <div class="nav">
    Choose your seat
  </div>
  <div class="info">
    <span class="studio">Theater 1</span>
    <span class="name">The weather man</span>
    <span class="time">22 August 2022 | 19:00</span>
    <div>
      <el-link :underline="false" type="warning" @click="$router.push('detail')">Back to arrangement</el-link>
    </div>
  </div>
  <div class="theater">
    <div class="seat">
      <div class="seat_number">
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
      </div>
      <div style="flex: 1">
        <div class="each_row">
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
        </div>
        <div class="each_row">
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
        </div>
        <div class="each_row">
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
        </div>
        <div class="each_row">
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
          <div class="pair">
            <div>
              <span class="iconfont icon-loveseat"></span>
              <span class="iconfont icon-loveseat"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin:20px 0;width: 20px">
      <el-button size="small" type="warning" round>Pay</el-button>
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
  width: 20%;
  margin: 50px auto ;
}

.info {
  display: flex;
  flex-direction: column;
  font-size: 20px;
}

.seat {
  width: 100%;
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

</style>
