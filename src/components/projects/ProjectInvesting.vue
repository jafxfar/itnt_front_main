<template>
    <div class="projectInvesting">
        <!-- header -->
        <div class="projectInvesting__head mb-3 align-center">
            <p style="color: #263238" class="txt-cap2 mb-4">Краудинвестинг:</p>
            <div class="txt-cap1 d-flex align-center" style="color: #9e9e9e">
                <img class="mr-2" src="../../assets/icons/question-blue.svg" />
                <p style="color: #9e9e9e">
                    Что такое Краудинвестинг и почему он может быть вам интересен?
                    <span class="color-blue"> Узнать </span>
                </p>
            </div>
        </div>
        <!-- body -->
        <div class="projectInvesting__body">
            <ProjectInvestSlider
                :minContribution="minContribution"
                :shareForSale="shareForSale"
                :amountAttracted="amountAttracted"
                :alreadyPurchased="alreadyPurchased"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Stat from "./Stat.vue"
import ProjectInvestSlider from './ProjectInvestSlider.vue'
import UiButton from '../ui-kit/UiButton.vue'

defineProps({
    minContribution: {
        type: Number,
        required: true
    },
    shareForSale: {
        type: Number,
        required: true
    },
    amountAttracted: {
        type: Number,
        required: true
    },
    alreadyPurchased: {
        type: Number,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.projectInvesting {
    &__body {
        border-radius: 12px;
        background: #fff;
        padding: 30px 20px 40px 20px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    }
}

.comment {
    border-radius: 2px 12px 12px 12px;
    // background-color: #9A9A9A;
    padding: 20px;
}
</style>
