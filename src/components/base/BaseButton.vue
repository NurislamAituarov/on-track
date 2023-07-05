<template>
  <button
    :class="`${typeClasses[type]} rounded p-3 disabled:cursor:not-allowed disabled:opacity-50`"
  >
    <slot></slot>
  </button>
</template>



<script lang="ts" setup>
interface Props {
  type: "neutral" | "danger" | "primary";
}
defineProps<Props>();

const typeClasses = {
  neutral: "bg-gray-100 enabled:hover:bg-gray-200",
  danger: "bg-red-500 enabled:hover:bg-red-600 text-white",
  primary: "bg-purple-500 enabled:hover:bg-purple-600 text-white",
};
</script>