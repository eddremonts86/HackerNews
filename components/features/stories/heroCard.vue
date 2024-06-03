<script lang="ts" setup>
  import Image from '@/components/shared/Image.vue'
  import { Badge } from '@/components/ui/badge'
  import externalLink from '@/components/shared/externalLink.vue'

  import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import type { StoryCard } from '@/types/types'

  interface ImageType {
    width: number | string
    height: number | string
  }
  const props = defineProps({
    story: {
      type: {} as PropType<StoryCard>,
      required: true,
    },
    readMore: {
      type: Boolean,
      default: false,
    },
    images: {
      type: {} as PropType<ImageType>,
      default: {
        width: 96,
        height: 'auto',
      },
    },
  })

  const content = computed(() => {
    return props.readMore ? props.story.text : props.story.fullText
  })
</script>

<template>
  <card class="flex flex-col border-0 shadow-none">
    <div class="flex justify-center items-center p-6 w-full">
      <Image
        :src="story.image"
        :width="images.width"
        :height="images.height"
        :alt="'story_image_' + story.id"
      />
    </div>
    <div class="w-full sm:px-6 p-6">
      <CardHeader class="pt-3 pb-6 sm:py-0 sm:my-0">
        <div class="flex items-start justify-between">
          <div class="text-xs flex justify-start items-center">
            <Badge
              variant="outline"
              class="bg-violet-950 text-white shadow-none"
            >
              {{ story.type }}
            </Badge>
            <externalLink :url="story.url" />
          </div>
          <div class="text-xs flex flex-col items-end">
            <p>{{ story.time }}</p>
            <p>
              <strong class="text-violet-950"># comments:</strong>
              {{ story.descendants }}
            </p>
            <p>
              <strong class="text-violet-950">Score:</strong>
              {{ story.score }}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardTitle class="px-6 mb-4 text-lg">
        <p>{{ story.title }}</p>
      </CardTitle>
      <CardContent class="py-0">
        <div v-dompurify-html="content" class="text-sm text-slate-700" />
        <div class="mt-4 text-xs">
          Written by
          <strong class="text-violet-950">{{ story.by }}</strong>
        </div>
      </CardContent>
      <CardFooter
        class="flex items-center justify-start pt-6 sm:justify-end sm:py-0"
        v-if="readMore"
      >
        <NuxtLink
          :to="'/story/' + story.id"
          class="text-violet-900 px-4 py-2 bg-violet-50 rounded-md text-xs hover:bg-violet-100"
        >
          Read more >>
        </NuxtLink>
      </CardFooter>
    </div>
  </card>
</template>
