<template>
    <div class="login-page">
        <div class="login-box">
            <h2>登录</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-item">
                    <input
                        v-model="email"
                        type="email"
                        placeholder="邮箱"
                        required
                    >
                </div>
                <div class="form-item">
                    <input
                        v-model="password"
                        type="password"
                        placeholder="密码"
                        required
                    >
                </div>
                <button
                    type="submit"
                    :disabled="authStore.isLoading"
                >
                    {{ authStore.isLoading ? '登录中...' : '登录' }}
                </button>
            </form>
            <p class="link">
                还没有账号？ <router-link to="/register">
                    去注册
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import {
    ref
} from 'vue';
import {
    useRouter
} from 'vue-router';
import {
    useAuthStore
} from '@/stores/auth.js';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const handleLogin = async() => {
    try {
        await authStore.login(email.value, password.value);
        router.push('/home');
    } catch (err) {
        alert(err.message || '登录失败');
    }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
}

.form-item {
  margin-bottom: 16px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #40a9ff;
}

.link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
}

.link a {
  color: #1890ff;
}
</style>
