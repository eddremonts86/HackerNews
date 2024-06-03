<script setup>
  import card from '@/components/features/stories/heroCard.vue'
  import storyCommentsContainer from '@/components/features/stories/storyCommentsContainer.vue'
  import { storyFormatter } from '@/components/features/stories/utils/storyTools'
  import loadingComponents from '~/components/shared/loading.vue'

  const route = useRoute()
  const storiesList = ref({})
  const { story, loading, storyById } = await useStories()
  watchEffect(async () => {
    loading.value = true
    const storyId = route.params.id
    await storyById(storyId)
    storiesList.value = storyFormatter([story.value])
    loading.value = false
  }, {})
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-96">
    <loadingComponents />
  </div>
  <div v-else>
    <card :story="storiesList[0]" />
    <storyCommentsContainer :kids="story.kids" />
  </div>
</template>
