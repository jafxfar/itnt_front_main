<template>
    <Header showID showUserMinify />
    <div class="m-4 flex flex-col gap-4">
        <UiPrompt>
            <p class="part1">
                Для того, чтобы создавать свои проекты, или комментировать чужие - вам нужно заручиться поддержкой
                участников сообщества.
            </p>
            <p class="part2">
                Вы можете запросить приглашение напрямую у нас, для этого пришлите описание вашего проекта на нашу
                почту:<span class="text-[#29B6F6]"> invites@itnt-app.com.</span> Или дождитесь, пока кто нибудь из
                участников сообщества iTalent Founders
                пригласит вас.
            </p>
        </UiPrompt>
    </div>
    <v-container style="padding: 0 20px; margin-bottom: 48px">
        <div class="card">
            <h3 style="font-weight: 500;"> Подключить кошелёк</h3>
            <div class="card__item" :class="item.addClass" v-for="(item, index) in walletItems" :key="index"
                :style="{ borderColor: item.color }">
                <img :src="item.src" :alt="item.alt">
                <p style="font-weight: 500;"> {{ item.alt }}</p>
            </div>
            <div class="help">Мне нужна помощь</div>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import tonKeeper from '../../assets/vallet/tonkeeper.svg'
import metamask from '../../assets/vallet/metamask.svg'
import wallet from '../../assets/vallet/wallet-connect.svg'


// ui-kit
import UiPrompt from '~/components/ui-kit/UiPrompt.vue';
import Header from '../../components/Header.vue'

const walletItems = [
    { src: tonKeeper, alt: 'Tonkeeper', color: '#7BB3E3' },
    { src: metamask, alt: 'Metamask', color: '#F89D35' },
    { src: wallet, alt: 'Walletconnect', color: '#3B99FB', addClass: 'addClass' },
];
const cardItems = [
    { title: 'Вы в клубе фаундеров с 12.07.21', text: "За вас поручился:", showIcon: false },
    { title: 'Имя', text: 'Антон Фиолетов', showIcon: true },
    { title: 'Основной проект', text: 'Almaz Corp.', showIcon: true },
];

</script>
<style scoped lang="scss">
.part1 {
    margin-bottom: 8px;
}

.card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &__item {
        margin: 12px;
        gap: 24px;
        padding: 16px 16px 16px 24px;
        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px solid #7BB3E3;
        border-radius: 12px;
    }

}

.help {
    color: #29B6F6;
    font-weight: 400;
    cursor: pointer;
}

.addClass {
    margin-bottom: 20px;
}
</style>