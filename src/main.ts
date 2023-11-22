import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { getItemFromStorage, setItemFromStorage } from './store/local-storage';
import {
  findActiveTimelineItem,
  startTimelineItemTimer,
  timelineItems,
} from './module/timeline-items';
import { activities } from './module/activities';
import { State } from './types';
import { isToday, today } from './module/time';

loadState();
const activeTimelineItem = findActiveTimelineItem();
if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem);
}

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'hidden' ? saveState() : loadState();
});

function saveState() {
  setItemFromStorage('ontrack', {
    timelineItems: timelineItems.value,
    activities: activities.value,
    date: today().toDateString(),
  });
}

function loadState() {
  const state: State = getItemFromStorage('ontrack');

  timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value;
  activities.value = state.activities || activities.value;
}

createApp(App).use(store).use(router).mount('#app');
