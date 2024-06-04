<script setup>
  useSeoMeta({
    title: 'Hacker News',
    ogTitle: 'Hacker News',
    description:
      'Hacker News is a social news website focusing on computer science and entrepreneurship.',
    ogDescription:
      'Hacker News is a social news website focusing on computer science and entrepreneurship.',
  })
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
