<template>
  <header class="header bg-white border-b p-4">
    <a href="#" class="header__logo">
      <img src="../assets/logo.png" alt="logo" />
    </a>
    <a href="#" class="text-sm">
      <div v-if="false" class="flex items-center gap-2">
        <p>Day complete!</p>
        <CheckCircleIcon class="h-7 text-green-500" />
      </div>
      <div v-else class="flex items-center gap-2">
        <p>Progress: <span>20%</span></p>
        <div class="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
    </a>
  </header>
</template>

<script lang="ts" setup>
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
</script>

<style lang='scss'>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__logo {
  display: block;
  height: 36px;
}
</style>