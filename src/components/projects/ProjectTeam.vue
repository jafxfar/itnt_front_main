<template>
    <div>
        <div class="d-flex mb-2 align-center justify-space-between">
            <p v-show="props.readOnly" style="color: #263238" class="txt-cap2">Наша команда:</p>
            <p v-show="!props.readOnly" style="color: #263238" class="txt-cap2">Участники проекта:</p>
            <UiButton v-if="checkOrders && checkOrders.id && checkOrders.id == userID" @click="joinTeam.open()" fit
                style="height: 36px; padding: 11px 16px" bgColor="smBlue" isSmall>
                <!-- <UiButton @click="joinTeam.open()" class="relative" fit style="height: 36px; padding: 11px 16px"
                bgColor="smBlue" isSmall> -->
                <p @click="joinTeam.open()" class="txt-cap2">Заявки
                <div v-if="teamMembers.length > 0" class="length">{{ teamMembers.length }}</div>
                </p>
            </UiButton>
            <vue-bottom-sheet max-height="245px" full-screen ref="modalState">
                <div class="modalList">
                    <div class="modalList__item flex flex-row">
                        <img :src="account" alt="" />
                        <p class="txt-body1">Открыть профиль</p>
                    </div>
                </div>
            </vue-bottom-sheet>
        </div>

        <!-- READONLY -->
        <div v-if="props.readOnly" class="projectTeam">
            <div class="projectTeam__list">
                <div v-for="users in props.team">
                    <div v-if="users.relationType === 'PROJECT_USER'"
                        class="projectTeam__item d-flex justify-space-between">
                        <div class="d-flex projectTeam__item__main">
                            <img class="mr-5" src="../../assets/demo/projectsmallphoto.svg" alt="" />
                            <div class="txt-body2">
                                <p style="color: #263238">{{ users.user.firstName }}</p>
                                <p style="color: #9e9e9e"> {{ users.user.id }}</p>
                            </div>
                        </div>
                        <v-icon @click="openModal(users.user.id)" icon="mdi-dots-vertical" />
                    </div>
                </div>
            </div>

            <vue-bottom-sheet max-height="105px" full-screen ref="modalState">
                <div class="modalList">
                    <div @click="$router.push('/user/' + selectedUserId)" class="modalList__item flex flex-row">
                        <img :src="account" alt="" />
                        <p class="txt-body1">Открыть профиль</p>
                    </div>
                </div>
            </vue-bottom-sheet>
        </div>

        <!-- EDITABLE -->
        <div v-else>
            <div class="projectTeam__list">
                <div class="projectTeam__list">
                    <div v-for="users in props.team">
                        <div v-if="users.relationType === 'PROJECT_USER'"
                            class="projectTeam__item--edit d-flex justify-space-between">
                            <vue-bottom-sheet max-height="245px" full-screen ref="editState">
                                <div class="modalList">
                                    <div @click="$router.push('/' + `user/${users.user.id}`)"
                                        class="modalList__item flex flex-row">
                                        <img :src="account" alt="" />
                                        <p class="txt-body1">Открыть профиль</p>

                                    </div>
                                    <div @click="delDialog" class="modalList__item flex flex-row">
                                        <img :src="close" alt="" />
                                        <p class="txt-body1 error-txt">Удалить человека из проекта</p>

                                    </div>
                                    <div @click="authorityModal" class="modalList__item flex flex-row">
                                        <img :src="key" alt="" />
                                        <p class="txt-body1">Передать полномочия владельца проекта</p>

                                    </div>
                                </div>
                            </vue-bottom-sheet>
                            <div class="projectTeam__item__header--edit">
                                <div class="d-flex">
                                    <img class="mr-7" width="37" height="37"
                                        src="../../assets/demo/ava-small-header.svg" alt="" />

                                    <p class="txt-body2"> {{ users.user.login }}</p>
                                </div>
                                <div class="d-flex">
                                    <!-- <div class="isCEO">CEO</div> -->
                                    <div class="isCEO"> {{ users.user.id }}
                                    </div>

                                    <v-icon @click="editState.open()" icon="mdi-dots-vertical" />
                                </div>
                            </div>
                            <div class="projectTeam__item__body--edit">
                                <v-icon icon="mdi-eye-off-outline" />
                                <UiInput style="max-width: 250px" label="Должность*" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="d-flex mt-2 justify-space-between align-center">
                Пригласить участника
                <UiButton @click="searchTeammateModal.open()" plus />
            </div>
        </div>
        <vue-bottom-sheet full-screen ref="joinTeam">
            <div class="searchTeammateModal modal">
                <p class="mb-2 p-4">К команде iTalent хотят присоединиться пользователи:</p>
                <div v-for="(user, index) in teamMembers" :key="user.id" class="user-item"
                    :class="{ 'expanded': expandedIndex === index }">
                    <div class="user-header" @click="toggleExpand(index)">
                        <img :src="ava" class="user-avatar" alt="User avatar">
                        <div class="user-info">
                            <div class="user-name">{{ user.user.firstName }} </div>
                            <div class="user-status">{{ user.user.login }}</div>
                        </div>
                        <!-- Отображаем кнопку Чат, если элемент не раскрыт -->
                        <div v-if="expandedIndex !== index" class="user-actions txt-cap2">
                            <button @click="$router.push('/' + `messenger/chat/${user.user.id}`)"
                                class="btn-chat">Чат</button>
                        </div>
                        <div class="icon-bg">
                            <v-icon color="#1769AA"
                                :icon="expandedIndex === index ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                        </div>
                    </div>
                    <!-- <transition name="expand"> -->
                    <div v-if="expandedIndex === index" class="user-expanded">
                        <div class="user-message">{{ user.message }}</div>
                        <div class="user-actions txt-cap2">
                            <button @click="react(Answer.No)" class="btn-decline">Отклонить</button>
                            <button @click="$router.push('/' + `messenger/chat/39`)" class="btn-chat">Чат</button>
                            <div @click="addUsers(user.user.id)" class="">
                                <button class="btn-approve">Одобрить</button>
                                <!-- <button @click="react(Answer.Yes)" class="btn-approve">Одобрить</button> -->
                            </div>
                        </div>
                    </div>
                    <!-- </transition> -->
                </div>
            </div>


        </vue-bottom-sheet>
        <vue-bottom-sheet ref="searchTeammateModal">
            <div class="searchTeammateModal px-4 modal">
                <p class="mb-2">Поиск человека для добавления в проект</p>
                <UiInput prepend-icon="magnify" label="Введите данные для поиска" v-model="searchQuery" />
                <div class="searchTeammateModal__items">
                    <div v-for="user in users" :key="user?.id" class="d-flex align-center"
                            @click="() => openUser(user?.id)">
                            <img class="mr-3 rounded-[100%] shadow-xl w-[37px] h-[37px]" width="37" height="37" :src="user?.pictureUrl ? `${baseAvaURL}/files/${user.pictureUrl}` : ava" />
                            <div>
                                <div class="d-flex align-center">
                                    <p class="txt-body3">{{ user?.firstName || `#${user?.id}` }}</p>
                                </div>
                                <p class="txt-cap1 text-[#9E9E9E]">{{ user?.login }}</p>
                            </div>
                        </div>
                </div>
            </div>
        </vue-bottom-sheet>
        <v-dialog v-model="authority" width="100%">
            <v-card class="ui-skills__search p-4">
                <p>Передача ключей от проекта!  Вы собираетесь передать полный контроль над проектом другому
                    человеку. Отменить это будет невозможно, вы потеряете роль владельца Danger Flower и не сможете
                    управлять проектом.  Будьте осторожны, опасайтесь мошенников.  

                </p>
                <p class="text-[#FF3D00]"> Передать ключи от проекта Анне Красновой? </p>

                <div class="ui-skills__search__actions">
                    <UiButton bgColor="" isSmall>Нет</UiButton>
                    <UiButton bgColor="smError" isSmall>Передать</UiButton>
                </div>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteMember" width="100%">
            <v-card class="ui-skills__search p-4 text-left">
                <p>Пожалуйста, подойдите к этому ответственно.</p>
                <p class="text-[#FF3D00]"> Вы дейстительно хотите исключить Анну Краснову из проекта? </p>

                <div class="ui-skills__search__actions">
                    <UiButton bgColor="" isSmall>Оставить</UiButton>
                    <UiButton bgColor="smError" isSmall>Исключить</UiButton>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
///icon
import close from '~/assets/project_team/close.svg'
import commit from '~/assets/project_team/commit.svg'
import key from '~/assets/project_team/key.svg'

//
import account from "~/assets/icons/account-blue.svg"
import UiButton from '../ui-kit/UiButton.vue'
import UiInput from '../ui-kit/UiInput.vue'
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref, computed, onMounted,watch } from 'vue'
import { reactToProposition } from '~/API/ways/notifications.ts';
import { getUserSearch } from '~/API/ways/user.ts';
import { getProjectPropositions } from "~/API/ways/notifications.ts"
import { useRoute } from 'vue-router'
import { getProjectByID, addUser } from "../../API/ways/project.ts"
import debounce from 'lodash/debounce';
import { createDialog } from '~/API/ways/dialog';
import ava from '../../assets/demo/ava-small-header.svg'
const state = ref(false)
const checkOrders = ref()
const editState = ref(false)
const userID = localStorage.getItem("userId")
const selectedUserId = ref(null)

const openModal = (userId) => {
  selectedUserId.value = userId
  modalState.value.open()
}
onMounted(async () => {
    const response = await getProjectByID(Number(route.params.ID));
    checkOrders.value = response.data.object.owner;
})
function togleState() {
    state.value = !state.value
}
const openUser = async (userId: number) => {
    try {
        const response = await createDialog(userId);

        const chatId = response?.data?.object?.id;
        if (chatId) {
            console.log('Созданный chat.id:', chatId);
            router.push(`/messenger/chat/${chatId}`);
        } else {
            console.error('Не удалось получить chat.id. Проверьте структуру ответа:', response);
        }
    } catch (error) {
        console.error('Ошибка при создании диалога:', error);
    }
};
const expandedIndex = ref(null);

const toggleExpand = (index) => {
    expandedIndex.value = expandedIndex.value === index ? null : index;
};
const route = useRoute()
let authority = ref(false)
let deleteMember = ref(false)

const delDialog = () => {
    if (editState.value) {
        editState.value.close()
    }
    deleteMember.value = true
}
const authorityModal = () => {
    if (editState.value) {
        editState.value.close()
    }
    authority.value = true
}
interface User {
    id: number;
    roles: Array<any>;
    login: string;
    confirmed: boolean;
    errorConfirm: boolean;
}
const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    team: {
        type: Object,
    },
    userID: {
        type: Number
    }
})

enum Answer {
    Yes = "YES",
    No = "NO"
}
const teamMembers = ref([]);
const getProjectPropositionsApi = async () => {
    try {
        const response = await getProjectPropositions(Number(route.params.ID));
        teamMembers.value = response.data.object;
        console.log('getProjectPropositions', response)
    } catch (error) {

    }

}
onMounted(getProjectPropositionsApi)
const searchQuery = ref('');
const users = ref([]);

const searchUsers = debounce(async (query: string) => {
    if (!query.trim()) {
        users.value = [];
        return;
    }

    try {
        const response = await getUserSearch({
            searchString: query
        });
        users.value = response.data.object;
    } catch (error) {
        console.error('Error searching users:', error);
        users.value = [];
    }
}, 300);
const addUsers = async (user: number) => {
    try {
        const response = await addUser(route.params.ID, user)
        console.log(response);
    } catch (error) {

    }
}
const react = async (propositionAnswer: Answer) => {
    try {
        const propositionId = 1;

        const response = await reactToProposition(propositionAnswer, propositionId);
        console.log(response);

    } catch (error) {
        console.error('Error sending proposition:', error);
    }
};
const baseAvaURL = 'https://itnt.store/';

const teamRoles = ref(false)
const modalState = ref(null)
const searchTeammateModal = ref(null)
let joinTeam = ref(false)


const editableModalItems: modalActionsList[] = [
    {
        name: 'Открыть профиль',
        icon: account,
    },
]
const joinTeamModalItems: modalActionsList[] = [
    {
        name: 'Открыть профиль',
        icon: account,
    },
    {
        name: 'Настроить полномочия',
        icon: commit,
    },
    {
        name: 'Удалить человека из проекта',
        icon: close,
    },
    {
        name: 'Передать полномочия владельца проекта',
        icon: key,
        func: () => {

        }
    },
]
watch(searchQuery, (newQuery) => {
    searchUsers(newQuery);
});

</script>

<style lang="scss" scoped>
.length {
    position: absolute;
    top: -8px;
    right: -6px;
    border-radius: 50%;
    padding: 4px 6px;
    background: red;
}

.projectTeam {
    &__list {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    &__item {
        align-items: center;
        padding: 16px 9px 15px 16px;
        background: #fff;

        &--first {
            border-radius: 12px 12px 2px 2px;
        }

        &--last {
            border-radius: 2px 2px 12px 12px;
        }

        &--edit {
            display: flex;
            flex-direction: column;
            background: white;
        }

        &__header {
            &--edit {
                display: flex;
                justify-content: space-between;
                padding-top: 16px;
                padding-left: 24px;
                padding-right: 8px;
            }
        }

        &__body {
            &--edit {
                display: flex;
                justify-content: space-between;
                padding-right: 14px;
                padding-bottom: 23px;
                padding-left: 30px;
                align-items: center;
            }
        }
    }
}

.searchTeammateModal {
    padding: 0;
    margin: 0;
    width: 100%;

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
        gap: 16px;
    }
}

.isCEO {
    color: #29b6f6;
    font-weight: 400;
}

.modalList {
    padding: 0 20px;

    &__item {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
        padding: 10px 0 0 0;
    }
}

.feedPanel :deep() {
    .v-expansion-panels {
        border: 1px solid blue !important;
        border-radius: 12px 12px 2px 2px !important;
    }

    .v-expansion-panel__shadow {
        display: none;
    }

    .v-expansion-panel-title__overlay {
        border-radius: 12px 12px 2px 2px;
        opacity: 0;
    }

    .v-expansion-panel-text__wrapper {
        padding: 16px 14px;
        // border-top: 1px solid #e0e0e0;
    }
}

.user-item {
    padding: 0px 10px;
    border-top: 1px solid #e0e0e0;
    overflow: hidden;
    background-color: #fff;

    &:last-child {
        border-bottom: 1px solid #e0e0e0;
    }
}

.user-header {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-info {
    flex-grow: 1;
}

.icon-bg {
    background-color: #E1F5FE;
    padding: 0px 10px;
    border-radius: 8px;
}

.user-name {
    font-weight: 400;
}

.user-status {
    color: #666;
    font-size: 0.9em;
}

.expand-icon {
    transition: transform 0.3s ease;
}

.expand-enter-active,
.expand-leave-active {
    transition: max-height 0.3s ease, opacity 0.3s ease;
    max-height: 300px;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
}

.user-expanded {
    overflow: hidden;
    padding: 12px;
}

.user-message {
    margin-bottom: 10px;
}

.user-actions {
    display: flex;
    justify-content: start;
}

.user-actions button {
    padding: 9px 16px;
    // border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 16px;
}

.btn-decline {
    border: 1px solid #E0E0E0;
    background-color: #fff;
}

.btn-chat {
    border: 1px solid #E0E0E0;
    background-color: #fff;
}

.btn-approve {
    background-color: #3498db;
    color: white;
}

.ui-skills {
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    &__search {
        padding: 40px 30px 30px 30px;
        border-radius: 20px !important;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05) !important;

        p {
            font-weight: 400;
            // margin-bottom: 24px;
            text-align: left;
        }

        &__actions {
            display: flex;
            justify-content: space-between;
        }
    }

}
</style>