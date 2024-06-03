<script lang="ts" setup>
  import { storyFormatter } from '@/components/features/stories/utils/storyTools';
import type { Story } from '@/types/types';

  const readMore = ref(false)
  const props = defineProps<{
    comment: Story
  }>()

  const item = computed(() => {
    const comments = storyFormatter([props.comment])
    return comments[0]
  })

  const toggleReadMore = () => {
    readMore.value = !readMore.value
  }
  const content = computed(() => {
    return readMore.value ? item.value.fullText : item.value.text
  })
</script>

<template>
  <div
    class="bg-white w-full flex flex-col sm:flex-row items-center p-6 rounded-xl"
  >
    <div
      class="flex flex-col items-center justify-center space-x-4 sm:w-2/12 sm:flex-row sm:justify-start"
    >
      <img
        :src="item.image"
        :alt="`${item.id}_comments`"
        class="relative w-32 h-32 rounded-xl object-center"
      />
    </div>
    <div class="p-3 w-full sm:size-10/12">
      <div
        v-dompurify-html="content"
        class="text-sm font-semibold text-slate-700"
      />
      <div
        class="flex justify-between items-start mt-4 flex-col sm:flex-row sm:items-center"
      >
        <div class="text-xs text-left">
          <p>
            Written by
            <strong class="text-violet-950">{{ item.by }}</strong>
          </p>
          <p>{{ item.time }}</p>
        </div>
        <div class="mt-6 sm:mt-0">
          <button
            @click="toggleReadMore"
            class="text-violet-900 px-4 py-2 bg-violet-50 rounded-md text-xs hover:bg-violet-100"
          >
            {{ readMore ? 'Read less' : 'Read more' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
