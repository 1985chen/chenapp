<template>
    <div class="register-page">
        <div class="register-box">
            <h2>注册</h2>
            <form @submit.prevent="handleRegister">
                <div class="form-item">
                    <input
                        v-model="username"
                        type="text"
                        placeholder="用户名"
                        required
                    >
                </div>
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
                        placeholder="密码 (至少6位)"
                        required
                        minlength="6"
                    >
                </div>
                <button
                    type="submit"
                    :disabled="authStore.isLoading"
                >
                    {{ authStore.isLoading ? '注册中...' : '注册' }}
                </button>
            </form>
            <p class="link">
                已有账号？ <router-link to="/login">
                    去登录
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

const username = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async() => {
    try {
        await authStore.register(username.value, email.value, password.value);
        router.push('/home');
    } catch (err) {
        alert(err.message || '注册失败');
    }
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.register-box {
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
  background: #52c41a;
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
  background: #73d13d;
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
