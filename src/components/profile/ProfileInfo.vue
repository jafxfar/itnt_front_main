<template>

    <div class="flex flex-row justify-between" v-if="props.profile">
        <div class="">
            <div class="userInfo">
                <div class="userInfo__head">
                    <h2 class="mb-1">{{ props.userName }} {{ props.userSurname }}</h2>

                    <p class="txt-body1">{{ props.country }} {{ props.city }}</p>

                </div>

                <!-- Статус предложений -->
                <div class="flex flex-row justify-between">
                    <!-- Отображение статуса -->
                    <div class="" v-if="props.readOnly">
                        <div v-if="props.proposition == true" class="userInfo__status">
                            <p class="userInfo__status__title txt-body1">Открыт к предложениям</p>
                            <img src="../../assets/icons/footer/message.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="userInfo__body mb-[24px]">
                <div class="txt-body1">
                    {{ props.userDescription }}
                </div>
            </div>
        </div>
        <div v-if="props.profile" @click="changeImageColor" class="bg-white p-[10px] max-h-[48px] rounded-[12px] shadow-md">
            <img :src="imageUrl" alt="" />
        </div>
        <div class="" v-else></div>
    </div>
    <div class="" v-else-if="readOnly">
        <div class="userInfo">
            <div class="userInfo__head">
                <h2 class="mb-1">{{ props.userName }} {{ props.userSurname }}</h2>

                <p class="txt-body1">{{ props.country }} {{ props.city }}</p>

            </div>

            <!-- Статус предложений -->
            <div class="flex flex-row justify-between">
                <!-- Отображение статуса -->
                <div class="" v-if="props.readOnly">
                    <div v-if="props.proposition == true" class="userInfo__status">
                        <p class="userInfo__status__title txt-body1">Открыт к предложениям</p>
                        <img src="../../assets/icons/footer/message.svg" alt="" />
                    </div>
                </div>
                <button v-if="!props.readOnly" @click="changeImageColor"
                    class="bg-white p-[10px] rounded-[12px] shadow-md">
                    <img :src="imageUrl" alt="" />
                </button>
                <div class="" v-else></div>
            </div>
        </div>

        <div class="userInfo__body mb-[24px]">
            <div class="txt-body1">
                {{ props.userDescription }}
                <!-- Я сюда припёрся, чтобы нормально постартапить! Ждал нормального стартапа с нормальными мужиками. © Легенда -->
                <!-- {{ props.userDescription }} -->
            </div>
        </div>
    </div>
    <div class="" v-else>
        <div class="userEdit mt-4">
            <UiInput v-model="userObj.firstName" class="mb-4" label="Имя" :required="true" />
            <UiInput v-model="userObj.lastName" class="mb-4" label="Фамилия" :required="true" />
            <v-select v-model="userObj.country" variant="outlined" label="Страна" class="mb-2" color="active"
                :items="Object.keys(list)" hide-details></v-select>
            <v-select v-model="userObj.city" :disabled="userObj.country ? false : true" variant="outlined"
                color="active" label="Выберите город" :items="(list as any)[userObj.country]"></v-select>
        </div>
    </div>

</template>

<script lang="ts" setup>
import follow from "~/assets/modal_icon/follow.svg"
import star from "~/assets/modal_icon/star-filled.svg"
import Arr from '~/helpers/set'
import UiInput from "../ui-kit/UiInput.vue";
import { ref } from 'vue';
// import { useRoute } from 'vue-router';
// const route = useRoute()
const list = ref(Arr)

const imageUrl = ref<string>(follow);
const props = defineProps({
    profile: {
        type: Boolean,
        default: false,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    userName: {
        type: String,
    },
    userSurname: {
        type: String,
    },
    userDescription: {
        type: String,
    },
    country: {
        type: String,
        default: 'Страна',
    },
    city: {
        type: String,
        default: 'Город',
    },
    proposition: {
        type: Boolean,
        default: false,
    }
})
function changeImageColor() {
    imageUrl.value = star;
}

</script>

<style lang="scss" scoped>
.userInfo {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;

    &__status {
        padding: 5.5px 14px;
        align-items: center;
        display: flex;
        max-width: fit-content;
        border: 1.5px solid $primary;
        border-radius: 8px;
        gap: 9px;

        &__title {
            color: $primary;
        }
    }
}
</style>
