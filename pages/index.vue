<script setup lang="ts">
  import storyContainer from '@/components/features/stories/storyContainer.vue'
  import pagination from '@/components/shared/pagination.vue'
  definePageMeta({
    layout: 'default',
  })
  const INITIAL_PAGE = 1
  const { total, stories, loading, error, getStory, topStories } =
    await useStories()
  watchEffect(async () => {
    loading.value = true
    await topStories()
    await getStory(INITIAL_PAGE)
    loading.value = false
  }, {})
</script>
<template>
  <div v-if="error">some error...</div>
  <div v-if="!error">
    <storyContainer :stories="stories" :total="total" :loading="loading" />
    <div class="flex justify-center items-center">
      <pagination :total="total" @update:page="getStory($event)" />
    </div>
  </div>
</template>
