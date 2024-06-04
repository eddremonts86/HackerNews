<script setup>
  import storyCards from '@/components/features/stories/storyCards.vue'
  import loadingComponents from '~/components/shared/loading.vue'

  useSeoMeta({
    title: 'Hacker News',
    ogTitle: 'Hacker News',
    description:
      'Hacker News is a social news website focusing on computer science and entrepreneurship.',
    ogDescription:
      'Hacker News is a social news website focusing on computer science and entrepreneurship.',
  })

  const { loading, getStory, stories, topStories } = await useStories()
  watchEffect(async () => {
    loading.value = true
    await topStories()
    await getStory(1)
    loading.value = false
  }, {})
</script>

<template>
  <section class="bg-white w-full h-auto md:p-20 mb-3 py-10 px-5 rounded-xl">
    <div>
      <h1 class="text-6xl font-bold">Hacker News</h1>

      <!-- country region island -->
      <div class="flex mt-16 font-light text-gray-500">
        <div class="pr-4">
          <span class="uppercase">Country</span>
          <p class="text-2xl text-gray-900 font-semibold pt-2">Japan</p>
        </div>
        <div class="pr-4">
          <span class="uppercase">Region</span>
          <p class="text-2xl text-gray-900 font-semibold pt-2">Kanto</p>
        </div>
        <div class="pr-4">
          <span class="uppercase">island</span>
          <p class="text-2xl text-gray-900 font-semibold pt-2">Honshu</p>
        </div>
      </div>

      <!-- description -->
      <div class="description w-full sm: mt-16 text-gray-500 text-lg">
        <p class="mb-10">
          <strong class="text-violet-950">Hacker News</strong>
          is a popular online platform where technology enthusiasts, developers,
          entrepreneurs, and other tech-savvy individuals gather to discuss and
          share the latest news, trends, and insights related to technology,
          startups, programming, and more. Here's a description of what you can
          expect on a typical Hacker News site.
        </p>

        <NuxtLink
          to="/story"
          class="my-6 px-6 py-3 bg-violet-950 text-white rounded-md hover:bg-violet-900"
        >
          Read stories
        </NuxtLink>
      </div>
    </div>
  </section>
  <section
    class="bg-violet-50 md:bg-white w-full h-auto md:p-20 mb-3 py-10 px-2 rounded-xl"
  >
    <div v-if="loading">
      <loadingComponents />
    </div>
    <div v-else>
      <storyCards :stories="stories" :loading="loading" />
    </div>
  </section>
</template>
