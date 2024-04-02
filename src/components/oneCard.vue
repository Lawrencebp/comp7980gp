<script setup>

</script>

<template>
  <div class="bone">
    <div class="pic">
      <slot name="picture">
        <img src="@/assets/pic5.png" alt="...">
      </slot>
    </div>
    <div class="name">
      <slot name="movie">
        movie name
      </slot>
    </div>
    <div class="desc">
      <slot name="desc">
        describe
      </slot>
    </div>
    <div class="score">
      <slot name="score"></slot>
    </div>
  </div>
</template>

<style scoped>
.bone{
  flex: 0 0;
  margin-bottom: 20px;
  transition: all .3s;
  position: relative;
}
.bone:hover{
  transform: scale(1.1);
}
.pic {
  width: 220px;
  height: 240px;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.name {
  width: 220px;
  font-size: 14px;
}
.desc {
  width: 220px;
  font-size: 12px;
  color: rgb(73, 84, 112);
}
.score{
  font-size: 14px;
  font-weight: 600;
  color: rgb(222,159,7);
  position: absolute;
  bottom: 17%;
  right: 5%;
}
</style>
