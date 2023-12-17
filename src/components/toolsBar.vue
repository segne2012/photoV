<script setup lang="ts">
import {ZoomInOutlined, ZoomOutOutlined, ColumnWidthOutlined, ColumnHeightOutlined, FullscreenOutlined} from "@ant-design/icons-vue"

</script>

<template>
    <div class="toolsBar">
        <div class="iconList">
            <ZoomInOutlined />
            <ZoomOutOutlined />
            <ColumnWidthOutlined />
            <ColumnHeightOutlined />
            <FullscreenOutlined />
        </div>
    </div>
</template>

<style scoped lang="less">
.toolsBar {
    position: fixed;
    bottom: 10%;
    .iconList {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
        font-size: 20px;
        color: white;
    }
}
</style>