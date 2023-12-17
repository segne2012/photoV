<script setup lang="ts">
import {ZoomInOutlined, ZoomOutOutlined, ColumnWidthOutlined, ColumnHeightOutlined, FullscreenOutlined} from "@ant-design/icons-vue"

const props = defineProps({
    scale: {
        type: Number,
        default: 1
    },
    x: {type: Number, default: 0},
    y: {type: Number, default: 0},
})

const emits = defineEmits({
    "update:scale": (val: number) => val,
    "update:x": (val: number) => val,
    "update:y": (val: number) => val,
    "scaleChange": (val: boolean) => val,
    "autoScale": (val: string) => val
})

// 还原缩放
const resizeScale = () => {
    console.log("resizeScale");
    emits('update:scale', 1);
}

const scaleUp = () => {
    emits('scaleChange', false);
}

const scaleDown = () => {
    emits('scaleChange', true);
}

const autoScale = (dir: string) => {
    emits('autoScale', dir);
}
</script>

<template>
    <div class="toolsBar">
        <div class="iconList">
            <ZoomInOutlined @click="scaleUp"/>
            <span class="scale" @click="resizeScale"> {{ Math.floor(props.scale * 100) }} %</span>
            <ZoomOutOutlined @click="scaleDown"/>
            <ColumnWidthOutlined @click="autoScale('w')"/>
            <ColumnHeightOutlined @click="autoScale('h')"/>
            <FullscreenOutlined @click="autoScale(' ')"/>
        </div>
    </div>
</template>

<style scoped lang="less">
.toolsBar {
    position: fixed;
    bottom: 150px;
    left: 50%;
    margin-left: -110px;
    .iconList {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
        font-size: 20px;
        color: white;
        .scale{
            border: 1px solid white;
            padding: 2px 5px;
        }
        * {
            margin: 0 5px;
            text-shadow: 0 0 4px black;
        }
    }
}
</style>