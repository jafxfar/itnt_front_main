<template>
    <Header showUserMinify :routeName="'Топ проектов'" />
    <v-container grid-list-xs>
        <UiPrompt v-show="projectsType === 0">{{ $t('prompts.topProjects.fresh') }} </UiPrompt>
        <UiPrompt v-show="projectsType === 1">
            {{ $t('prompts.topProjects.top') }}
        </UiPrompt>

        <UiSwitch @change-value="projectsType = $event" :items="['Свежее', 'Топ']" />

        <UiSwitch v-if="projectsType === 1" @change-value="topProjectsData = $event" :items="['Неделя', 'Месяц', 'Год']" />
        
        <div v-if="projectsType === 0" v-for="(project, id) in newProjectsInfo" :key="id" class="mt-6">
            <RatingProjectCard :projectInfoSet="project" />
        </div>
        
        <div v-if="projectsType === 1" v-for="(project, id) in projectsInfo" :key="id" class="mt-6">
            <RatingProjectCard :listID="++id" :projectInfoSet="project" />
        </div>

    </v-container>
    <Footer />
</template>

<script setup lang="ts">

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import UiPrompt from '~/components/ui-kit/UiPrompt.vue'
import UiSwitch from '~/components/ui-kit/UiSwitch.vue'
import RatingProjectCard from '~/components/projects/RatingProjectCard.vue'

import { ref, onMounted } from 'vue'
import { getAllProjects, getNewProjects } from '~/API/ways/project'

let projectsInfo = ref({})

onMounted(async () => {
    await getAllProjects().then((response) => {
        try {
            projectsInfo.value = response.data.object.content
        } catch (e) {
            console.error('text error:', e)
        }
    })
})
let newProjectsInfo = ref({})

onMounted(async () => {
    await getNewProjects(true).then((response) => {
        try {
            newProjectsInfo.value = response.data.object.content
            console.log(newProjectsInfo.value);
            
        } catch (e) {
            console.error('text error:', e)
        }
    })
})
const projectsType = ref(0)
const topProjectsData = ref(null)
</script>
