import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


// user
import User from '~/pages/profile/User.vue'
import UserEdit from '~/pages/profile/UserEdit.vue'
import UserRead from '~/pages/profile/UserRead.vue'
import UserFollowed from '~/pages/profile/UserFollowed.vue'
import UserNotification from '~/pages/profile/UserNotification.vue'
import UserSetting from '~/pages/profile/UserSetting.vue'
import UserInvite from '~/pages/profile/UserInvite.vue'
import UserVallet from '~/pages/profile/UserVallet.vue'
import UserLang from '~/pages/profile/UserLang.vue'
import UserTalent from '~/pages/profile/userTalent.vue'

// project
import ProjectInfo from '~/pages/project/ProjectInfo.vue'
import ProjectEdit from '~/pages/project/ProjectEdit.vue'
import ProjectNew from '~/pages/project/ProjectNew.vue'
import ProjectVisited from '~/pages/project/ProjectVisited.vue'
import PostComment from '~/components/feed/PostComment.vue'
// import ProjectComment from '~/components/projects/ProjectComment.vue'
import BlogPage from '~/components/projects/BlogPage.vue'

// enter
import Entry from '~/pages/registration/Entry.vue'
import Agreement from '~/pages/registration/Agreement.vue'
import FirstMeet from '~/pages/registration/FirstMeet.vue'
import PhoneRegPage from '~/pages/registration/PhoneReg.vue'
import PhoneLogIn from '~/pages/registration/PhoneLogIn.vue'
import Screening from '~/pages/registration/Screening.vue'
// etc
import Feed from '~/pages/feed/Feed.vue'
import Projects from '~/pages/Projects.vue'
import Search from '~/pages/Search.vue'
// errors
import error from '~/pages/error.vue'
// messanger
import Messenger from '~/pages/Messenger.vue'
import Chat from '~/components/Chat/Chat.vue'
//post
import PostEdit from "~/pages/post/PostEdit.vue"
interface routes {
    path: string
    component: any
}

const routes: Array<routes> = [
    // Регистрация
    {
        path: '/',
        component: FirstMeet,
    },
    {
        path: '/agreement',
        component: Agreement,
    },
    {
        path: '/entry',
        component: Entry,
    },
    {
        path: '/reg',
        component: PhoneRegPage,
    },
    {
        path: '/log',
        component: PhoneLogIn,
    },
    {
        path: '/screening',
        component: Screening,
    },
    //   Юзер
    {
        path: '/user/:ID',
        component: UserRead,
    },
    {
        path: '/me',
        component: User,
    },
    {
        path: '/me/edit',
        component: UserEdit,
    },
    {
        path: '/me/followed',
        component: UserFollowed,
    },
    {
        path: '/me/notification',
        component: UserNotification,
    },
    {
        path: '/me/settings',
        component: UserSetting,
    },
    {
        path: '/me/invite',
        component:UserTalent
        // component: UserInvite,
    },
    {
        path: '/me/vallet',
        component: UserVallet,
    },
    {
        path: '/me/language',
        component: UserLang,
    },
    // Проекты
    {
        path: '/project/:ID',
        component: ProjectInfo,
    },
    {
        path: '/:ID/blogComment',
        component: BlogPage,
    },
    {
        path: '/:ID/postComment',
        component: PostComment
    },
    {
        path: '/project/new',
        component: ProjectNew,
    },

    {
        path: '/projectVisited/:ID',
        component: ProjectVisited,
    },
    {
        path: '/project/:ID/edit',
        component: ProjectEdit,
    },
    // Топ проектов
    {
        path: '/projects',
        component: Projects,
    },
    // Лента
    {
        path: '/feed',
        component: Feed,
    },
    // Поиск
    {
        path: '/search',
        component: Search,
    },
    // Мессенджер
    {
        path: '/messenger',
        component: Messenger,
    },
    {
        path: '/messenger/chat/:ID',
        component: Chat,
    },
    {
        path: '/post/:ID',
        component: PostEdit
    },
    // Ошибки
    { path: '/:pathMatch(.*)*', component: error },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

