import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { syncState } from './store/local-storage';

syncState();

document.addEventListener('visibilitychange', () => {
  syncState(document.visibilityState === 'visible');
});

createApp(App).use(store).use(router).mount('#app');
