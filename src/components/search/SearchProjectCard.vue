<template>
    <div class="searchProjectCard mt-4">
        <div class="searchProjectCard__head">
            <div class="d-flex align-center">
                <img class="mr-3" width="37" height="37" src="../../assets/demo/ava-small-header.svg" />
                <div>
                    <div class="d-flex align-center">
                        <p class="txt-body3">{{ props.name }}</p>
                    </div>
                    <p class="searchProjectCard__head__subtitle txt-cap1">
                        {{ props.slogan }}
                    </p>
                </div>
            </div>
            <v-icon icon="mdi-dots-vertical" />
        </div>

        <div class="searchProjectCard__body">
            <div class="searchProjectCard__body__slider">
                <img width="85" height="122" v-for="i in 5" src="../../assets/demo/demo-rec1.png" />
            </div>

            <div class="searchProjectCard__body__info">
                <p class="searchProjectCard__body__info__title txt-body1">{{ props?.descHeader }}</p>
                <p class="searchProjectCard__body_info__sub txt-body2">
                    {{ props?.desc }}
                </p>
            </div>
        </div>
        <h1 class="">{{ props.id }}</h1>

        <div class="searchProjectCard__footer">
            <UiButton bgColor="def" class="searchProjectCard__footer__button" fit @click="openProject">Открыть проект </UiButton>
            <UiButton
                bgColor="def"
                :imgSrc="share"
                style="padding: 10px 13px 9px 14px"
                onlyIcon
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import share from '../../assets/icons/share-black.svg'
import UiButton from '../ui-kit/UiButton.vue'
import { useRouter } from 'vue-router';
const props = defineProps({
  project: Object,
  desc: String,
  descHeader: String,
  name: String,
  slogan: String,
  type: String,
  id: Number
})
const router = useRouter()
const openProject = () => {
    router.push(`/project/${props.id}`)
    console.log(props.id)
}
</script>

<style scoped lang="scss">
.searchProjectCard {
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
        margin-bottom: 16px;
        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
            text-wrap: balance;
        }
    }

    &__body {
        &__slider {
            display: flex;
            gap: 11px;
            -ms-overflow-style: none; /* Internet Explorer 10+ */
            scrollbar-width: none;
            overflow-x: scroll;
            &::-webkit-scrollbar {
                display: none; /* Safari and Chrome */
            }
        }
        &__info {
            &__title {
                margin-top: 24px;
                margin-bottom: 12px;
            }
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
</style>
