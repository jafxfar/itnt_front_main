<template>
  <div class="flex  justify-end p-4">
    <!-- <UiButton onlyIcon @click="$router.push('/reg')">Регистрация</UiButton> -->
  </div>
  <v-row class="pa-0 ma-0" align="center" justify="center">
    <v-col class="container" align="center" justify="center">
      <img src="../../assets/img/logos/itnt.svg" />
      <!-- {{ o?s }} -->
      <div class="mt-12 pl-2 pr-2">
        <!-- <div @click="dialog = !dialog">
          <UiButton :bgColor="'purple'" :imgSrc="vallet">{{ $t('entry.login') }}
          </UiButton>
        </div>
        <p class="button-purse-subtitle ma-0 mt-2 text-center">
          {{ $t('entry.why') }}
          <br />
          <router-link class="button-purse-subtitle-href" to=""> {{ $t('entry.know') }}
          </router-link>
        </p> -->
        <div style="margin-top: 48px" @click="$router.push('/log')">
          <UiButton bgColor="blue">{{ $t('entry.phone') }}</UiButton>
        </div>
        <p class="button-purse-subtitle ma-0 mt-2 text-center">
          {{ $t('entry.never') }}
          <!-- Еще не регистрировались в ITalent? -->
          <br />
          <router-link class="button-purse-subtitle-href" to="/reg"> {{ $t('entry.register') }}
          </router-link>
        </p>
        <v-col class="mt-6">
          <v-row class="social" justify="center">
            <UiButton @click="googleSignIn" onlyIcon :imgSrc="googleIcon" />
            <UiButton @click="signInWithApple" onlyIcon :imgSrc="appleIcon" />
            <UiButton onlyIcon :imgSrc="vkIcon">
              <v-dialog activator="parent" max-width="500">
                <template v-slot:default="{ isActive }">
                  <v-card rounded="xl">
                    <v-card-title class="nohover p-4 d-flex justify-end align-center">
                      <v-icon size="24px" color="#9e9e9e" icon="mdi-close" @click="isActive.value = false"></v-icon>
                    </v-card-title>

                    <v-card-text>
                      <div class="text-h6 mb-4 flex flex-row justify-center items-center">
                        <img class="mr-[16px]" src="../../assets/icons/warn.svg" alt="">
                        Авторизация не удалась
                      </div>
                      <div class="text-[#9e9e9e] mb-4">
                        Авторизация не удалась. Код ошибки: <span class="text-[#29b6f6]">Тыры-пыры.</span> Попробуйте
                        снова или
                        выйдите из матрицы. </div>
                      <UiButton @click="isActive.value = false" class="mb-4">Повторить попытку</UiButton>
                      <UiButton @click="isActive.value = false">Вернуться назад</UiButton>

                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </UiButton>
            <UiButton @click="signInWithGitHub" :img-src="gitIcon" onlyIcon></UiButton>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <!-- <vue-apple-login
                            type="sign in"
                            color="black"
                            :border="true"
                            :radius="15"
                            logoSize="medium"
                            :onSuccess="onSuccess"
                            :onFailure="onFailure"
                        ></vue-apple-login> -->
          </v-row>
        </v-col>
      </div>
      <!-- <teleg /> -->
      <!-- <vk /> -->
    </v-col>
  </v-row>

  <!-- Диалоговое окно при нажатии на выбор входа по кошельку -->
  <v-dialog v-model="dialog">
    <v-card class="dialog pt-2 pb-5">
      <v-col class="pr-4">
        <v-row justify="end mr-2">
          <v-icon @click="dialog = false" icon color="#9E9E9E">mdi-close</v-icon>
        </v-row>
      </v-col>
      <p class="dialog-title ma-0 text-center">{{ $t('wallet') }}</p>
      <div class="card">
        <div class="card__item" :class="item.addClass" v-for="(item, index) in walletItems" :key="index"
          :style="{ borderColor: item.color }">
          <img :src="item.src" :alt="item.alt">
          <p style="font-weight: 500;"> {{ item.alt }}</p>
        </div>
      </div>
      <v-col>
        <v-row justify="center">
          <a class="dialog-href" href="#">{{ $t("need-help") }}</a>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
  <!-- Диалоговое окно загрузки -->
  <v-dialog v-model="loader">
    <v-card class="loader-card mx-auto pl-6 pr-6 pt-3" width="253" height="56">
      <v-col>
        <v-row align="center">
          <v-progress-circular indeterminate color="#29B6F6" width="3" class="mr-12"></v-progress-circular>
          <p class="ma-0">Подождите</p>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import gitIcon from "../../assets/github.svg"
import vkIcon from "../../assets/vk.svg"
import vk from "./vklogin.vue"
import teleg from "./telegramlogin.vue"
import googleIcon from "~/assets/icons/companies/google.svg"
import appleIcon from "~/assets/icons/companies/apple.svg"
import facebookIcon from "~/assets/icons/companies/facebook.svg"
import vallet from '~/assets/setting/vallet_white.svg'
import UiButton from '~/components/ui-kit/UiButton.vue'
import { ref, onMounted, computed } from 'vue'
import tonKeeper from '../../assets/vallet/tonkeeper.svg'
import metamask from '../../assets/vallet/metamask.svg'
import wallet from '../../assets/vallet/wallet-connect.svg'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { VK_CONFIG } from '~/plugins/loginCfgs'
// import { auth, provider } from '../firebaseConfig';

import { useRouter } from 'vue-router'
const router = useRouter()
const dialog = ref(false)
const walletItems = [
  { src: tonKeeper, alt: 'Tonkeeper', color: '#7BB3E3' },
  { src: metamask, alt: 'Metamask', color: '#F89D35' },
  { src: wallet, alt: 'Walletconnect', color: '#3B99FB', addClass: 'addClass' },
];
const os = ref('');

const getOS = () => {
  let userAgent = window.navigator.userAgent;
  let platform = window.navigator.platform;
  let macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  let windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  let iosPlatforms = ['iPhone', 'iPad', 'iPod'];

  let detectedOS = null;

  if (macosPlatforms.includes(platform)) {
    detectedOS = 'Mac OS';
  } else if (iosPlatforms.includes(platform)) {
    detectedOS = 'iOS';
  } else if (windowsPlatforms.includes(platform)) {
    detectedOS = 'Windows';
  } else if (/Android/.test(userAgent)) {
    detectedOS = 'Android';
  } else if (/Linux/.test(platform)) {
    detectedOS = 'Linux';
  }
  console.log(detectedOS);

  os.value = detectedOS;
}
onMounted(getOS);
const showAppleButton = computed(() => {
  return os.value === 'iOS' || os.value === 'Mac OS';
});

const email = ref('')
const password = ref('')
// const register = () => {
//   const auth = getAuth()
//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log("Registred success", data);
//       router.push('/me')
//       console.log("Registred success", auth.currentUser);
//     })
//     .catch((error) => {
//       console.log(error.code);
//       alert(error.message)
//     })
// }

// const signInWithGoogle = () => {
//   const auth = getAuth()
//   signInWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log("sign in success", data);
//       router.push('/me')
//       console.log("Registred success", auth.currentUser);
//     })
//     .catch((error) => {
//       console.log(error.code);
//       alert(error.message)
//     })
// }
const googleSignIn = async () => {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user.displayName);
    console.log('User signed in:', result.user.email);
    console.log('User signed in:', result.user);
    router.push('/screening')
  } catch (error) {
    console.error('Error signing in:', error);
  }
}
const signInWithFacebook = async () => {
  try {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();  // Используйте FacebookAuthProvider
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user.displayName);
    console.log('User signed in:', result.user.email);
    console.log('User signed in:', result.user);
    router.push('/screening');
  } catch (error) {
    console.error('Error signing in:', error);
  }
};
const signInWithApple = async () => {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    router.push('/screening')
    console.log('User signed in:', result.user.displayName);
    console.log('User signed in:', result.user.email);
    console.log('User signed in:', result.user);
  } catch (error) {
    console.error('Error signing in:', error);
  }
}
const loading = ref(false);
const errorMessage = ref('');
const signInWithGitHub = async () => {
  try {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);

    console.log('User signed in:', result.user.displayName);
    console.log('User signed in:', result.user.email);
    console.log('User signed in:', result.user);

    router.push('/screening');
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage.value = 'Popup was closed before authentication could complete. Please try again.';
    } else {
      errorMessage.value = 'Error signing in: ' + error.message;
    }
    console.error('Error signing in:', error);
  } finally {
    loading.value = false;
  }
};
const loginWithVK = () => {
  const authUrl = `https://oauth.vk.com/authorize?client_id=${VK_CONFIG.clientId}&display=page&redirect_uri=${VK_CONFIG.redirectUri}&scope=${VK_CONFIG.scope}&response_type=code&v=5.131`;
  window.location.href = authUrl;
};
</script>

<style lang="scss" scoped>
.card {
  background: #fff;
  border-radius: 20px;
  box-shadow: none;
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

.container {
  height: 100vh;
  padding-top: 10%;
}

.button-purse {
  background: linear-gradient(96.78deg, #ce0efe -0.02%, #9012de 94.31%) !important;
  box-shadow: 0 22px 22px -17px rgba(145, 18, 222, 0.51) !important;
  border-radius: 12px !important;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
}

.button-purse-subtitle {
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.01em;
  color: #9e9e9e;
}

.button-purse-subtitle-href {
  color: #29b6f6;
  text-decoration: none;
}

.button-phone {
  background: linear-gradient(96.78deg, #13d5ff -0.02%, #12a1de 94.31%) !important;
  border: 1px solid #12b7ec !important;
  box-shadow: 0 22px 22px -17px #29b6f6 !important;
  border-radius: 12px !important;
  font-size: 18px !important;
  line-height: 22px;
  color: #ffffff;
}

.social {
  gap: 24px;
}

.social-button {
  background: #ffffff !important;
  border: 1px solid rgba(158, 158, 158, 0.2) !important;
  box-shadow: 0 9px 9px -9px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
  border-radius: 12px !important;
}

.dialog {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05) !important;
  border-radius: 12px !important;
}

.dialog-title {
  font-size: 18px;
  line-height: 22px;
  color: #263238;
}

.button-wallet {
  border: 1px solid !important;
  border-radius: 12px !important;
}

.button-metamask {
  border: 1px solid #f89d35 !important;
  border-radius: 12px;
}

.button-wallet-text {
  font-size: 18px;
  line-height: 22px;
  color: #263238;
}

.dialog-href {
  font-size: 16px;
  line-height: 18px;
  color: #29b6f6;
  text-decoration: none;
}

.loader-card {
  border: 1px solid #e0e0e0 !important;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.19), 0 0 3px rgba(0, 0, 0, 0.039) !important;
  border-radius: 8px !important;
}

button.login-button {
  background-color: white;
  height: 32px;
  width: 200px;
  border-radius: 5px;
  border: 0px;
  font-size: 12px;
  font-weight: 500;
  margin: 5px;
}
</style>
