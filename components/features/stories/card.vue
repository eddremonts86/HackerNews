<script lang="ts" setup>
  import { Badge } from '@/components/ui/badge'
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
      type: Object as PropType<ImageType>,
      default: () => ({
        width: 56,
        height: 32,
      }),
    },
  })

  const content = computed(() => {
    return props.readMore ? props.story.text : props.story.fullText
  })
</script>

<template>
  <card class="flex flex-col p-10 sm:flex-row">
    <div
      :class="`max-h-${images.height} max-w-${images.width} justify-center items-center mb-10 sm:mb-0 sm:justify-start sm:items-start flex `"
    >
      <img
        :src="story.image"
        :alt="story.title"
        :class="`object-cover rounded-xl w-${images.width} h-${images.height}`"
      />
    </div>
    <div class="w-full sm:px-6">
      <CardHeader class="pt-0 mt-0">
        <div class="flex items-start justify-between">
          <div class="text-xs">
            <Badge variant="outline" class="bg-violet-950 text-white">
              {{ story.type }}
            </Badge>
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
        <a :href="'/story/' + story.id" class="hover:underline">
          {{ story.title }}
        </a>
      </CardTitle>
      <CardContent>
        <div v-dompurify-html="content" class="text-sm text-slate-700" />
        <div class="mt-4 text-xs">
          Written by
          <strong class="text-violet-950">{{ story.by }}</strong>
        </div>
      </CardContent>
      <CardFooter class="flex items-center justify-end" v-if="readMore">
        <NuxtLink
          :to="'/story/' + story.id"
          class="text-violet-900 px-6 py-3 bg-slate-100 rounded-md"
        >
          Read more >>
        </NuxtLink>
      </CardFooter>
    </div>
  </card>
</template>
