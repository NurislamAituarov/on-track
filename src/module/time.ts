import { MILlISECONDS_IN_SECONDS, SECONDS_IN_DAY, SECONDS_IN_MINUTE } from '@/lib/constants';
import { computed, ref } from 'vue';

export const now = ref(new Date());

export const calculateSecondsSinceMidnightInPercentage = computed(() => {
  return (100 * secondsSinceMidnight.value) / SECONDS_IN_DAY;
});

const midnight = computed(() => {
  return new Date(now.value).setHours(0, 0, 0, 0);
});

const secondsSinceMidnight = computed(() => {
  return (now.value.getTime() - midnight.value) / MILlISECONDS_IN_SECONDS;
});

let timer: number;
export function startTimer() {
  now.value = new Date();

  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + SECONDS_IN_MINUTE * MILlISECONDS_IN_SECONDS);
    console.log('Timer');
  }, MILlISECONDS_IN_SECONDS);
}
export function endTimer() {
  clearInterval(timer);
}
