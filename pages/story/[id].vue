<script setup>
  const { story, loading, error, storyById } = await useStories()
  const route = useRoute()
  const storyId = route.params.id

  watchEffect(async () => {
    loading.value = true
    await storyById(storyId)
    loading.value = false
  }, {})
</script>

<template>
  <div class="mt-5">
    <p v-if="error">Error...</p>
    <p v-if="loading">Loading...</p>
    <h1 class="text-2xl">{{ story.title }}</h1>
    <div v-dompurify-html="story.text" class="text-justify pb-5" />
    <nuxt-link to="/">Go to home page</nuxt-link>
  </div>
</template>
