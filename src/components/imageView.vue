<script setup lang="ts">
import toolsBar from './toolsBar.vue';

const props = defineProps({
    showUrl: {
        type: String,
        required: true,
        default: ''
    }
})

const imageView = ref<null | HTMLDivElement>(null);
const imgDom = ref<null | HTMLImageElement>(null);
const maxCount = ref(100);

const styleObj = reactive({
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
        if(styleObj.scale <= 0.2 ) {
            styleObj.scale = 0.2;
        }else {
            styleObj.scale -= 0.1;
        }
    } else {
        // Scroll up
        if(styleObj.scale >= 5) {
            styleObj.scale = 5;
        }else {
            styleObj.scale += 0.1;
        }
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
    if(hasMouseDwon.value) {
        const move = [(event.x - mousePosition.x) / (styleObj.scale), (event.y - mousePosition.y) / (styleObj.scale)]
        let check = checkBounds(...move)
        check[0] && (styleObj.x +=  move[0]);
        check[1] && (styleObj.y +=  move[1]);
        mousePosition.x = event.x;
        mousePosition.y = event.y;
    }
}

const mouseUp = () => {
    hasMouseDwon.value = false;
}

const checkBounds = (x = 0, y = 0) => {
    const result = [true, true]
    let imgBounding = imgDom.value && imgDom.value.getBoundingClientRect();
    if (x < 0) {
        if(x + (imgBounding?.right || 0) <= maxCount.value) {
            result[0] = false;
        }
    } else if ((imgBounding?.left || 0) + maxCount.value >= (imageView.value?.clientWidth || 0 )) {
        result[0] = false;
    }
    if (y < 0) {
        if(y + (imgBounding?.bottom || 0) <= maxCount.value) {
            result[1] = false;
        }
    } else if ((imgBounding?.top || 0) + maxCount.value >= imageView.value!.clientHeight) {
        result[1] = false;
    }
    return result;
}

onMounted(() => {
    if(imageView.value) {
        imageView.value.addEventListener('wheel', mousewheel);
        imageView.value.addEventListener('mousedown', mouseDown);
        imageView.value.addEventListener('mousemove', mousemove);
        imageView.value.addEventListener('mouseup', mouseUp);
        imageView.value.addEventListener('mouseleave', mouseUp);
    }
})

onUnmounted(() => {
    if(imageView.value) {
        imageView.value.removeEventListener('wheel', mousewheel);
        imageView.value.removeEventListener('mousedown', mouseDown);
        imageView.value.removeEventListener('mousemove', mousemove);
        imageView.value.removeEventListener('mouseup', mouseUp);
        imageView.value.removeEventListener('mouseleave', mouseUp);
    }
})
</script>

<template>
    <div class="image-view" ref="imageView">
        <div class="box" :style="styles">
            <img ref="imgDom" :src="props.showUrl" draggable="false"/>
        </div>
        <toolsBar></toolsBar>
    </div>
</template>

<style scoped>
.image-view {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: #000;
    user-select: none;
    .box{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        img{
            user-select: none;
        }
    }
}
</style>