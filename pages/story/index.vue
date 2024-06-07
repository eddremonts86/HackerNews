<script setup lang="ts">
  import pagination from '@/components/shared/pagination.vue'
  import type { StoryType as StoryEnum } from '@/types/types'
  import { StoryType } from '@/types/types'
  import storyContainer from '@/components/features/stories/components/storyContainer.vue'

  useSeoMeta({
    title: 'Hacker News - Stories',
    ogTitle: 'Hacker News - Stories',
    description: 'Stories page it a collection of stories from Hacker News',
    ogDescription: 'Stories page it a collection of stories from Hacker News',
  })

  definePageMeta({
    layout: 'default',
  })
  const INITIAL_PAGE = 1
  const { total, stories, loading, error, getStory, topStories } =
    await useStories()
  const paginationTotal = reactive({
    story: 0,
    comment: 0,
    poll: 0,
    job: 0,
  })
  const type = ref(StoryType.story)
  const pages = computed(() => paginationTotal[type.value])

  watchEffect(async () => {
    loading.value = true
    await topStories()
    await getStory(INITIAL_PAGE)
    paginationTotal.story = total.value
    loading.value = false
  }, {})

  const updateType = (category: StoryEnum) => {
    type.value = category
  }
</script>
<template>
  <div v-if="error">some error...</div>
  <div v-else class="">
    <storyContainer
      :stories="stories"
      :total="total"
      :loading="loading"
      @update:type="updateType"
    />
    <div class="flex items-center justify-center pb-10 my-10">
      <pagination :total="pages" @update:page="getStory($event)" />
    </div>
  </div>
</template>
