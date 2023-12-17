<script setup lang="ts">

const props = defineProps({
    showUrl: {
        type: String,
        required: true,
        default: ''
    }
})

const imageView = ref<null | HTMLDivElement>(null);
const sytleObj = reactive({
    scale: 1,
    x: 0,
    y: 0
})

const styles = computed(() => {
    return {
        transform: `scale(${styleObj.scale}) translateX(${styleObj.x}px) translateY(${styleObj.y}px)`
    }
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

const hasMouseDwon = ref(false)
const mousePosition = reactive({
    x: 0,
    y: 0
})
const mouseDown = (event: MouseEvent) => {
    hasMouseDwon.value = true;
    mousePosition.x = event.x;
    mousePosition.y = event.y;
}
const mousemove = (event: MouseEvent) => {

    if(hasMouseDwon) {

        styleObj.x = mousePosition.x - event.x;
        styleObj.y = mousePosition.y - event.y;
    }
}

const mouseUp = (event: MouseEvent) => {
    hasMouseDwon.value = false;
}

const checkBounds = (event: CheckBoundsEvent) => {
    if (event.x < 0) {
        styleObj.x = 0;
    } else if (event.x > imageView.value!.clientWidth) {
        styleObj.x = imageView.value!.clientWidth;
    }
    if (event.y < 0) {
        styleObj.y = 0;
    } else if (event.y > imageView.value!.clientHeight) {
        styleObj.y = imageView.value!.clientHeight;
    }
}

onMounted(() => {
    if(imageView.value) {
        imageView.value.addEventListener('wheel', mousewheel);
        imageView.value.addEventListener('mousedown', mouseDown);
        imageView.value.addEventListener('mousemove', mousemove);
        imageView.value.addEventListener('mouseup', mouseUp);
    }
})

onUnmounted(() => {
    if(imageView.value) {
        imageView.value.removeEventListener('wheel', mousewheel);
        imageView.value.removeEventListener('mousedown', mouseDown);
        imageView.value.removeEventListener('mousemove', mousemove);
        imageView.value.removeEventListener('mouseup', mouseUp);
    }
})
</script>

<template>
    <div class="image-view" ref="imageView" @mousewheel="mousewheel">
        <div class="box" :style="styles">
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