import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '@/components/Home';
import Public from '@/components/Public'
import Protected from '@/components/Protected'

// import { mapGetters } from 'vuex';

// const theState = {
//     ...mapGetters('user', {
//         isLoggedIn: 'getLoggedInStatus'
//     })
// }


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/public',
            name: 'Public',
            component: Public
        },
        {
            path: '/protected',
            name: 'Protected',
            component: Protected
        },
        {
            path: '*',
            component: () => import('@/components/NotFound.vue')
        }
    ]
});



export default router;