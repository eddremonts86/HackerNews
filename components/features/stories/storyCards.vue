<script lang="ts" setup>
  import card from '@/components/features/stories/card.vue'
  import { storyFormatter } from '@/components/features/stories/utils/storyTools'
  import type { Story } from '@/types/types'
  const props = defineProps({
    stories: {
      type: Array as PropType<Story[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  })
  const storiesList = computed(() => storyFormatter(props.stories))
</script>

<template>
  <div v-if="loading" class="h-96 flex justify-center items-center">
    <div>loading...</div>
  </div>
  <div v-else class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-bold text-violet-950">Top stories</h2>
      <p class="text-slate-400">The latest stories from Hacker News</p>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <div v-for="story in storiesList" :key="story.id">
        <card :story="story" readMore />
      </div>
    </div>
  </div>
</template>
