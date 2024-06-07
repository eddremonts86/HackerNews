<script setup>
  import navBar from '@/components/shared/navBar/navBar.vue'
</script>

<template>
  <header class="sticky top-0 z-50">
    <navBar />
  </header>
  <main class="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 h-dvh relative mb-10">
    <slot />
  </main>
  <footer
    class="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 h-40 bg-violet-950 sticky bottom-0 mt-auto hidden"
  />
</template>
