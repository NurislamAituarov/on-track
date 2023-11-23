import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { loadState, saveState } from './store/local-storage';
import { findActiveTimelineItem, startTimelineItemTimer } from './module/timeline-items';

loadState();
const activeTimelineItem = findActiveTimelineItem();
if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem);
}

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'hidden' ? saveState() : loadState();
});

createApp(App).use(store).use(router).mount('#app');
