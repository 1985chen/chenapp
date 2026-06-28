import {
    defineStore
} from 'pinia';
import {
    login as appLogin,
    register as appRegister,
    getMe,
} from '../api/auth.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null,
        isLoading: false,
    }),
    getters: {
        isLoggedIn: state => !!state.token,
        username: state => state.user?.username || '',
        userId: state => state.user?._id || '',
    },
    actions: {
        async login(email, password) {
            this.isLoading = true;
            try {
                const response = await appLogin({email, password});
                this.setAuth(response.token, response.user);
                return response;
            } catch (error) { // eslint-disable-line
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async register(username, email, password) {
            this.isLoading = true;
            try {
                const res = await appRegister({username, email, password});
                this.setAuth(res.token, res.user);
                return res;
            } catch (error) { // eslint-disable-line
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async fetchUser() {
            if (!this.token) {
                return null;
            }

            try {
                const res = await getMe();
                this.user = res.user;
                return res.user;
            } catch (error) {
                this.logOut(); // eslint-disable-line
                throw error;
            }
        },

        setAuth(token, user) {
            this.token = token;
            this.user = user;
            localStorage.setItem('token', token);
        },

        logOut() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
        }
    }
});
