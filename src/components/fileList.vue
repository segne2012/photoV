<script setup lang="ts">
import { loadImage } from "./tools.ts";

const emits = defineEmits(["change"])
const selectedFile = ref("");

const fileList = ref([
    {
        name: "1",
        url: loadImage("../assets/img/1.jpeg")
    }, {
        name: "2",
        url: loadImage("../assets/img/2.jpeg")
    }, {
        name: "3",
        url: loadImage("../assets/img/3.jpeg")
    },
])

const onSelected = (url: string) => {
    selectedFile.value = url;
    emits('change', selectedFile.value);
}

onSelected(fileList.value[0].url)
</script>

<template>
    <div class="file-list">
        <template v-for="item in fileList" :key="item.url">
            <div class="fileItem" :class="{'selected': item.url === selectedFile}" @click="onSelected(item.url)">
                <img :src="item.url" alt="" />
                <span>{{item.name}}</span>
            </div>
        </template>
    </div>
</template>

<style scoped lang="less">
.file-list{
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    transition: all 0.4s;
    .fileItem{
        position: relative;
        height: calc(100% - 10px);
        width: max-content;
        max-width: 60px;
        margin: 5px;
        border-radius: 4px;
        box-shadow: 0 0 4px 1px #aaa;
        transition: all 0.3s;
        img{
            height: 100%;
            width: auto;
            min-width: 20px;
            object-fit: contain;
            transition: all 1s;
        }
        span{
            position: absolute;
            bottom: 4px;
            width: 100%;
            color: #fff;
            left: 0;
            text-align: center;
        }
        &.selected{
            border: 2px solid rgb(53, 134, 255)
        }
        &:hover {
            box-shadow: 0 0 5px 1px #fff;
            img{
                object-fit: cover;
                min-width: 50px;
            }
        }
    }
    &:hover{
        height: 150px;
        .fileItem{
            width: max-content;
            max-width: 180px;
        }
    }
}
</style>