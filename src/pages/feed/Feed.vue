<template>
    <Header :routeName="'Центр событий'" showUserMinify />
    <v-col class="pa-0 text-center">
        <v-container class="pa-6">
            <div class="mb-4 date rounded-xl d-inline-block">{{ $t('feed.today') }}</div>

            <div class="feed__column">
                <FeedPanels />
                <FeedCard feedCardType="newProjectStage" />
                <FeedCard feedCardType="newProjectDiscussed" />
            </div>
        </v-container>

        <v-container class="pa-6 pt-0">
            <!-- Дата -->
            <div class="date mb-4 rounded-xl d-inline-block">{{ $t('feed.yesterday') }}</div>

            <div class="feed__column">
                <!-- Карточка с документом на 7.5мб -->
                <FeedCard feedCardType="newFile" />
                <FeedCard feedCardType="newProjectVacancies" />
            </div>
        </v-container>

        <v-container class="pa-6 pt-0">

            <div class="feed__column">
                <!-- Карточка с двумя слайдами в одном carousel-item -->
                <!-- {{ posts }} -->
                <!-- <div v-for="(post, id) in posts" :key="id" class="mt-6">
                    <div class="" v-for="(object, id) in post.object" :key="id">
                    </div>
                    <FeedPost :post="object" />
                </div> -->
            </div>
            <div v-if="posts && posts.object" v-for="(post, index) in posts.object" :key="index">
                <!-- {{ post }} -->
                <ProjectBlog :blog-data="post" user-type="user" withoutBg feedCardType="newProjectStage" />
            </div>
            <ProjectBlog user-type="me" feedCardType="newProjectStage" />
            <ProjectBlog user-type="user" withoutBg feedCardType="newProjectPhotos" />
            <ProjectBlog user-type="user" feedCardType="newProjectPhotos" />
        </v-container>
    </v-col>
    <Footer />
</template>

<script lang="ts" setup>
import ProjectBlog from '~/components/projects/ProjectBlog.vue'
import { onMounted, ref } from 'vue';
import { getPost } from '~/API/ways/post';
import Footer from '~/components/Footer.vue';
import FeedCard from '~/components/feed/FeedCard.vue';
import Header from '~/components/Header.vue';
// import FeedPost from '~/components/feed/FeedPost.vue';
import FeedPanels from '~/components/feed/FeedPanels.vue';
let posts = ref(null);
const getPosts = async () => {
    try {
        const data = await getPost();
        posts.value = data.data;
    } catch (error) {
        console.error(error);
    }
};
console.log(posts, 'postes');
onMounted(getPosts);
</script>

<style lang="scss" scoped>
.feed {
    &__column {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}

.date {
    background: rgba(224, 224, 224, 0.5);
    font-size: 13px !important;
    letter-spacing: 0.01em !important;
    padding: 6px 20px;
    line-height: 14px;
}
</style>
