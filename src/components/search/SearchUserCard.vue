<template>
    <div class="searchUserCard mb-2">
        <div class="searchUserCard__head">
            <div class="d-flex align-center">
                <img v-if="props.userInfoSet?.pictureUrl" @click="$router.push('/user/' + props.userInfoSet.id)"
                    class="mr-3 w-[37px] h-[37px] rounded-[50%] cursor-pointer" width="37" height="37"
                    :src="`${baseURL}files/${props.userInfoSet?.pictureUrl}`" />
                <img v-else @click="$router.push('/user/' + props.userInfoSet.id)" class="mr-3  cursor-pointer"
                    width="37" height="37" :src="defAva" />
                <div>
                    <div @click="$router.push('/user/' + props.userInfoSet.id)"
                        class="d-flex cursor-pointer align-center">
                        <p class="txt-body3">
                            <template v-if="props.userInfoSet.firstName || props.userInfoSet.lastName">
                                {{ props.userInfoSet.firstName || '' }} {{ props.userInfoSet.lastName || '' }}
                            </template>
                            <template v-else>
                                #{{ props.userInfoSet.id }}
                            </template>
                        </p>
                    </div>
                    <!-- <p class="searchUserCard__head__subtitle txt-cap1">г. Санкт-Петербург</p> -->
                    <p class="searchUserCard__head__subtitle txt-cap1">{{ props.userInfoSet.login }}</p>
                </div>
            </div>
            <v-icon @click="modalState.open()" icon="mdi-dots-vertical" color="#263238" class="font-weight-bold" />
        </div>

        <div class="searchUserCard__body">
            <div class="searchUserCard__body__skills">
                <div v-for="(skill, id) in props.userInfoSet.interests" :key="id">
                    <div class="searchUserCard__body__skills__item txt-body1">{{ skill.name }}</div>
                </div>
            </div>

            <div class="searchUserCard__body__info">
                <p class="txt-body1">
                    {{ props.userInfoSet.fullDescription }}
                </p>
            </div>
        </div>
        <vue-bottom-sheet max-height="270px" full-screen ref="modalState">
            <div class="modal">
                <div class="modal__list">
                    <div v-for="(item, id) in modalItems" @click="item?.func" :key="id" class="modal__list__item">
                        <img :src="item.icon" alt="" />
                        <p v-on:click.native="item.name === 'Пожаловаться' ? complainState.open() : null"
                            :class="{ 'error-txt': item.name === 'Пожаловаться' }" class="txt-body1">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </div>
        </vue-bottom-sheet>
        <vue-bottom-sheet max-height="480px" full-screen ref="complainState">
            <div class="searchTeammateModal modal">
                <p class="mb-[24px]">Выберите причину жалобы на пользователя:</p>
                <div class="d-flex align-center mb-[48px]">
                    <img @click="$router.push('/user/' + props.userInfoSet.id)" class="mr-3 cursor-pointer" width="37"
                        height="37" src="../../assets/demo/ava-small-header.svg" />
                    <div>
                        <div class="d-flex cursor-pointer align-center">
                            <p class="txt-body3">{{ props.userInfoSet.id }}</p>
                        </div>
                    </div>
                </div>
                <v-radio-group v-model="complaint" color="#29b6f6">
                    <v-radio class="searchTeammateModal__item" base-color="#29b6f6" label="Спам" value="Спам"></v-radio>
                    <v-radio class="searchTeammateModal__item" base-color="#29b6f6" label="Агрессивное поведение"
                        value="Агрессивное поведение"></v-radio>
                    <v-radio class="searchTeammateModal__item" base-color="#29b6f6"
                        label="Взрослый контент (ссылки, картинки, видео и т.п.)" value="Взрослый контент"></v-radio>
                </v-radio-group>
                <UiButton bg-color="blue" @click="sendComplaint">Отправить жалобу</UiButton>
            </div>
        </vue-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import defAva from "~/assets/demo/defAva.svg"

import project from "~/assets/icons/footer/account.svg"
import share from "~/assets/icons/share-blue.svg"
import warning from "~/assets/icons/warning-red.svg"
// import statistic from "~/assets/modal_icon/statistic.svg"
import follow from "~/assets/modal_icon/follow.svg"
import UiTextArea from "~/components/ui-kit/UiTextArea.vue"
import UiButton from "~/components/ui-kit/UiButton.vue"

import { ref, computed } from 'vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { modalActionsList } from '~/helpers/types'
import { useRouter } from 'vue-router'
import { postAddComplaint } from '~/API/ways/user.ts'
import { useI18n } from 'vue-i18n';
const modalState = ref(false)
const complainState = ref(false)
const complaint = ref('')
const router = useRouter()

const props = defineProps({
    userInfoSet: {
        type: Object || Array,
        default: () => { },
    },
    listID: {
        type: Number,
    },
})
const sendComplaint = async () => {
    await postAddComplaint(props.userInfoSet.id, Number(localStorage.getItem('userId')), complaint.value,)
}
const { t } = useI18n();
const modalItems: modalActionsList[] = [
    {
        name: `${t('open-profile')}`,
        icon: project,
        func: () => {
            router.push('/user/' + props.userInfoSet.id)
        },
    },
    {
        name: `${t('user-modal.follow')}`,
        icon: follow,
        // func: async () => {
        //     try {
        //         const response = await addFollow(Number(props.projectInfoSet.id), Number(localStorage.getItem("userId")));
        //         console.log(response);
        //     } catch (error) {
        //         console.error('Ошибка при подписке на проект:', error);
        //     }
        // }
    },
    {
        name: `${t("top-modal.share")}`,
        icon: share,
        func: () => {
            try {
                navigator.share({
                    title: 'ITNT',
                    text: 'Откройте для себя ITNT.',
                    url: 'http://62.113.105.220/user/' + props.userInfoSet.id,
                })
            } catch (error) {
                console.log('error :' + error)
            }
        },
    },
    {
        name: `${t('user-modal.block')}`,
        icon: share,
    },
    {
        name: `${t('user-modal.complaint')}`,
        icon: warning,
    },
]
const baseURL = 'https://itnt.store/';

</script>

<style scoped lang="scss">
.searchUserCard {
    padding: 16px 14px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
            text-wrap: balance;
        }
    }

    &__body {
        padding: 0px 2px;

        &__skills {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;

            &__item {
                padding: 3px 10px;
                color: $def-black;
                max-width: fit-content;
                border: 1.5px solid $primary;
                border-radius: 4px;
            }
        }

        &__info {
            margin-top: 16px;
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__button {
            padding: 17px 20px;
            font-size: 13px;
            font-weight: 400;
            line-height: 14px;
            box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
        }
    }
}

.searchTeammateModal {
    &__items {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        min-height: 350px;
    }

    &__item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

    }
}
</style>
