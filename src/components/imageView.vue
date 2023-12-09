<script setup lang="ts">

const props = defineProps({
    showUrl: {
        type: String,
        required: true,
        default: ''
    }
})

const sytleObj = reactive({

})

const mousewheel = (event: WheelEvent) => {
    if (event.deltaY > 0) {
        // Scroll down
        console.log("123321")
    } else {
        // Scroll up
        console.log("Scrolling up")
    }
}
</script>

<template>
    <div class="image-view" @mousewheel="mousewheel">
        <div class="box" :style="sytleObj">
            <img :src="props.showUrl" />
        </div>
    </div>
</template>

<style scoped>
.image-view {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: #000;
    .box{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        img{
            
        }
    }
}
</style>