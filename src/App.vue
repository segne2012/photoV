<script setup lang="ts">
import imageView from "./components/imageView.vue"
import fileList from "./components/fileList.vue";

const imgUrl = ref("");
const changeSelect = (url: string) => {
  imgUrl.value = url;
}
</script>

<template>
  <div class="box" >
    <imageView :showUrl="imgUrl"></imageView>
    <fileList @change="changeSelect"></fileList>
  </div>
</template>

<style scoped lang="less">
.box{
  --topHeight: 1rem;
  --leftWidth: 2rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: .14rem;
  
}
</style>
