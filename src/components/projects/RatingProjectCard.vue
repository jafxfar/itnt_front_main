<script lang="ts">
export default {
    name: 'RatingProjectCard',
}
</script>

<template>
    <!-- v-for="(card, id) in projectInfoSet"  :key="id"-->
    <v-card class="card">
        <div class="card__head">
            <!-- {{ ++id }} -->
            <div class="card__head__main">
                <h2>{{ listID }}</h2>
                <img @click="$router.push('/project/' + props.projectInfoSet.id)" alt="" :src="fullAvatarUrl"
                    :class="{ 'cursor-pointer w-[37px] rounded-[100%]': fullAvatarUrl, 'w-[0px]': !fullAvatarUrl }" />
                <div>
                    <p @click="$router.push('/project/' + props.projectInfoSet.id)" class="txt-body3 cursor-pointer">{{
                    props.projectInfoSet.name }}</p>
                    <p style="color: #9e9e9e" class="txt-cap1">Здоровье, стартапы, приложение</p>
                    <!-- {{ props.projectInfoSet.id }} -->
                </div>
            </div>
            <v-icon @click="modalState.open()" icon="mdi-dots-vertical" color="#263238" class="font-weight-bold" />
        </div>

        <div class="card__stats">
            <div class="card__stats--chip">
                <img width="14" height="14" src="@/assets/icons/account-black.svg" alt="" />
                <p class="txt-cap1"><span>&#183;</span> {{ props.projectInfoSet.usersCount }}
                </p>
            </div>
            <div class="card__stats--chip">
                <img width="14" height="14" src="@/assets/icons/search-black.svg" alt="" />
                <p class="txt-cap1"><span>&#183;</span> {{ props.projectInfoSet.usersCount }}
                </p>
            </div>

            <div class="card__stats--chip">
                <p class="txt-cap1">St: Поик инвестора</p>
            </div>
        </div>

        <div class="card__main">
            <img @click="dialog = true" src="../../assets/demo/projectSmallCard.svg" alt="" />

            <!-- <div>{{ card.info }}</div> -->
            <div>
                <p class="card__main__text txt-cap1">
                    {{ props.projectInfoSet.descriptionHeader }}
                </p>

                <div @click="$router.push('/project/' + props.projectInfoSet.id)" class="card__main__route">
                    <p class="txt-cap1">Подробнее о проекте</p>
                    <img src="../../assets/icons/arrow-left-blue.svg" alt="" />
                </div>
            </div>
        </div>
    </v-card>

    <vue-bottom-sheet max-height="270px" full-screen ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <div v-for="(item, id) in modalItems" @click="item?.func" :key="id" class="modal__list__item">
                    <img :src="item.icon" alt="" />
                    <p :class="item.name === 'Пожаловаться' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                </div>
                <div class="modal__list__item">
                    <img :src="warning" alt="" />
                    <p @click="complainState.open()" class="txt-body1 error-txt">Пожаловаться</p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>
    <vue-bottom-sheet max-height="380px" full-screen ref="complainState">
        <div class="searchTeammateModal modal">
            <p class="mb-2">Выберите причину жалобы на пользователя:</p>
            <div class="searchTeammateModal__item">
                <input type="radio" name="complaint" id=""> Спам
            </div>
            <div class="searchTeammateModal__item">
                <input type="radio" name="complaint" id=""> Агрессивное поведение
            </div>
            <div class="searchTeammateModal__item">
                <input type="radio" name="complaint" id=""> Взрослый контент (ссылки, картинки, видео и
                т.п.)
            </div>
            <UiTextArea v-model="complaint" />
            <UiButton bg-color="blue" @click="sendComplaint">Отправить жалобу</UiButton>
        </div>
    </vue-bottom-sheet>
    <v-dialog class="elevation-0" v-model="dialog" width="90%">
        <v-row class="pa-2 pt-0 pb-2 ma-0" justify="end">
            <v-icon class="close-button" @click="dialog = false" icon="mdi-close" />
        </v-row>
        <v-carousel class="slider elevation-1" :show-arrows="false">
            <v-carousel-item src="./src/assets/demo/projectSmallCard.svg" reverse-transition="fade-transition"
                transition="fade-transition"></v-carousel-item>
            <v-carousel-item src="./src/assets/demo/projectSmallCard.svg" reverse-transition="fade-transition"
                transition="fade-transition"></v-carousel-item>
        </v-carousel>
        <div @click="$router.push('/project/' + props.projectInfoSet.id)" class="slider-card text-center pt-4">
            <p class="slider-button ma-0">Открыть проект<v-icon icon="mdi-arrow-right" size="x-small" /></p>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import project from "~/assets/project_modal/project.svg"
import share from "~/assets/icons/share-blue.svg"
import warning from "~/assets/icons/warning-red.svg"
import defAva from "~/assets/demo/projectsmallphoto.svg"
// import statistic from "~/assets/modal_icon/statistic.svg"
import UiTextArea from "~/components/ui-kit/UiTextArea.vue"
import UiButton from "~/components/ui-kit/UiButton.vue"
import follow from "~/assets/modal_icon/follow.svg"
import { ref, computed } from 'vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { modalActionsList } from '~/helpers/types'
import { addFollow, addComplaint } from "~/API/ways/project"
import { useRouter } from 'vue-router'
const router = useRouter()
const complainState = ref(false)
const modalState = ref(false)
const dialog = ref(false)
const props = defineProps({
    projectInfoSet: {
        type: Object || Array,
        default: () => { },
    },
    listID: {
        type: Number,
    },
})
const complaint = ref('')

const sendComplaint = async () => {
    await addComplaint(props.projectInfoSet.id, Number(localStorage.getItem('userId')), complaint.value,)
}
const modalItems: modalActionsList[] = [
    {
        name: 'Открыть проект',
        icon: project,
        func: () => {
            router.push('/project/' + props.projectInfoSet.id)
        },
    },
    {
        name: 'Отписаться',
        icon: follow,
        func: async () => {
            try {
                const response = await addFollow(Number(props.projectInfoSet.id), Number(localStorage.getItem("userId")));
                console.log(response);
            } catch (error) {
                console.error('Ошибка при подписке на проект:', error);
            }
        }
    },
    {
        name: 'Поделиться',
        icon: share,
        func: () => {
            try {
                navigator.share({
                    title: 'ITNT',
                    text: 'Откройте для себя ITNT.',
                    url: 'http://62.113.105.220/project/' + props.projectInfoSet.id,
                })
            } catch (error) {
                console.log('error :' + error)
            }

        },
    },
    // {
    //     name: 'Статистика проекта',
    //     icon: statistic,
    // },
]
const baseURL = 'http://62.217.181.172/';

const fullAvatarUrl = computed(() => {
    return props.projectInfoSet.avatarUrl ? `${baseURL}files/${props.projectInfoSet.avatarUrl}` : `${defAva}`;
});
// console.log(props.projectInfoSet)
</script>

<style lang="scss" scoped>
.card {
    border-radius: 12px;
    border: 1px solid rgba(223, 223, 223, 0.3);
    padding: 14px 8px 10px 14px;

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;

        &__main {
            display: flex;
            align-items: center;
            gap: 7px;
        }
    }

    &__stats {
        display: flex;
        gap: 7px;

        &--chip {
            padding: 3px 10px;
            align-items: center;
            display: flex;
            border-radius: 16px;
            border: 1px solid $def-black;
        }
    }

    &__main {
        display: flex;
        gap: 8px;
        margin-top: 10px;

        &__text {
            margin-bottom: 6px;
            width: 223px;
            min-height: 111px;
        }

        &__route {
            display: flex;
            color: $primary;
            align-items: center;
            justify-content: center;
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 0 25px;

        &__item {
            display: flex;
            align-items: center;
            gap: 15px;
        }
    }
}

.close-button {
    width: 34px;
    height: 34px;
    background: #ffffff;
    border-radius: 6px;
}

.slider {
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.1));
    border-radius: 12px 12px 0 0;
}

.slider-card {
    height: 52px;
    z-index: 2;
    background: #29b6f6;
    border-radius: 0px 0px 12px 12px;
}

.slider-button {
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
}

.v-carousel__controls {
    background: none !important;
}
</style>
