import {
    createRouter,
    createWebHistory,
} from 'vue-router';
import {
    useAuthStore,
} from '@/stores/auth.js';

const login = () => import('@/views/Login.vue');
const register = () => import('@/views/Register.vue');
const Home = () => import('@/views/Home.vue');

const routes = [{
    path: '/',
    redirect: 'login',
}, {
    path: '/login',
    name: 'Login',
    component: login,
    meta: {
        requiresAuth: false,
    }
}, {
    path: '/register',
    name: 'Register',
    component: register,
    meta: {
        requiresAuth: false,
    }
}, {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
        requiresAuth: true,
    }
}];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async(to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.meta.requiresAuth;
    if (!requiresAuth) {
        if (authStore.isLoggedIn && to.name !== 'Register') {
            return next('/home');
        }
        return next();
    }
    if (!authStore.isLoggedIn) {
        return next('/login');
    }
    if (authStore.isLoggedIn && !authStore.user) {
        try {
            await authStore.fetchUser();
            next();
        } catch (error) {
            authStore.logout();
            console.error('Failed to fetch user:', error);
            return next('/login');
        }
    } else {
        next();
    }
});

export default router;
