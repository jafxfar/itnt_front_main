<template>
    <div class="flex h-[180px] max-w-[1024px] mx-4">
        <swiper :breakpoints="swiperBreakpoints" :spaceBetween="0" :modules="modules" class="swiper">
            <swiper-slide class="rounded-[16px]" v-for="file in data" :key="file.id">
                <img class="rounded-[16px]" :src="`${baseURL}/${file.pictureUrl}`" :alt="baseURL" />
            </swiper-slide>
        </swiper>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
// import { useRoute } from 'vue-router';
import { getPostById } from '../API/ways/post';

const props = defineProps({
    id: {
        type: Number
    }
})
// const route = useRoute();
const modules = ref([Pagination]);
const baseURL ='https://itnt.store/files';

const data = ref([]);
onMounted(async () => {
    try {
        const response = await getPostById(props.id);
        data.value = response.data.object.pictureUrls;
    } catch (error) {
        console.error('Error fetching project files:', error);
    }
});
const swiperBreakpoints = {
    0: {
        slidesPerView: 1
    },
    768: {
        slidesPerView: 1
    },
    1024: {
        slidesPerView: 1
    }
}

</script>
<style lang="scss" scoped>
.swiper {
    // width: 50vw;
    // height: 50vw;
}

.swiper-slide {
    // text-align: center;
    // width: 100%;
    // height: 100%;
    font-size: 18px;
    padding-left: 4px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    border-radius: 16px;
}

.swiper-slide img {
    // display: flex;
    background: no-repeat;
    // width: 100%;
    // height: 100%;
    // width: auto;
    // height: auto;
    // aspect-ratio: 177 / 133;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) and (min-width:600px) {
        // width: 100%;
        // height: auto;
        // max-width: 177px;
        // max-height: 133px;
    }
}
</style>
