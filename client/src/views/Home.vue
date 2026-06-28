<template>
    <div class="home-page">
        <div class="header">
            <h1>欢迎回来，{{ authStore.username }}</h1>
            <button @click="handleLogout">
                退出登录
            </button>
        </div>

        <div class="user-info">
            <h3>用户信息</h3>
            <p><strong>ID：</strong>{{ authStore.userId }}</p>
            <p><strong>用户名：</strong>{{ authStore.username }}</p>
        </div>

        <div
            v-if="!authStore.user"
            class="loading"
        >
            加载中...
        </div>
    </div>
</template>

<script setup>
import {
    useAuthStore
} from '@/stores/auth.js';
import {
    useRouter
} from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.logout();
    router.push('/login');
};
</script>

<style scoped>
.home-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

h1 {
  font-size: 24px;
}

button {
  padding: 8px 16px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #ff7875;
}

.user-info {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.user-info h3 {
  margin-bottom: 12px;
}

.user-info p {
  margin-bottom: 8px;
}

.loading {
  text-align: center;
  color: #999;
  margin-top: 20px;
}
</style>
