<script setup>
  import { storyFormatter } from '@/components/features/stories/utils/storyTools'
  import card from '@/components/features/stories/components/heroCard.vue'
  import storyCommentsContainer from '@/components/features/stories/components/storyCommentsContainer.vue'
  import loadingComponents from '@/components/shared/loading.vue'

  const route = useRoute()
  const storyFormatted = ref({})
  const { story, loading, storyById } = await useStories()

  watchEffect(async () => {
    loading.value = true
    await storyById(route.params.id)
    storyFormatted.value = storyFormatter([story.value])?.at(0)
    useSeoMeta({
      title: 'Hacker News' + storyFormatted.value?.title,
      ogTitle: 'Hacker News' + storyFormatted.value?.title,
      description: storyFormatted.value?.text,
      ogDescription: storyFormatted.value?.text,
    })
    loading.value = false
  }, {})
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center h-96">
    <loadingComponents />
  </div>
  <div v-else>
    <card :story="storyFormatted" />
    <storyCommentsContainer :kids="storyFormatted.kids" />
  </div>
</template>
