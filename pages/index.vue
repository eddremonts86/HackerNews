<script setup>
  import storyCards from '@/components/features/stories/components/storyCards.vue'
  import loadingComponents from '@/components/shared/loading.vue'

  const INITIAL_PAGE = 1
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
    await getStory(INITIAL_PAGE)
    loading.value = false
  }, {})
  
</script>

<template>
  <section class="w-full h-auto px-5 py-10 mb-3 bg-white md:p-20 rounded-xl">
    <div>
      <h1 class="text-6xl font-bold">Hacker News</h1>

      <!-- country region island -->
      <div class="flex mt-16 font-light text-gray-500">
        <div class="pr-4">
          <span class="uppercase">Country</span>
          <p class="pt-2 text-2xl font-semibold text-gray-900">Japan</p>
        </div>
        <div class="pr-4">
          <span class="uppercase">Region</span>
          <p class="pt-2 text-2xl font-semibold text-gray-900">Kanto</p>
        </div>
        <div class="pr-4">
          <span class="uppercase">island</span>
          <p class="pt-2 text-2xl font-semibold text-gray-900">Honshu</p>
        </div>
      </div>

      <!-- description -->
      <div class="w-full mt-16 text-lg text-gray-500 description sm:">
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
          class="px-6 py-3 my-6 text-white rounded-md bg-violet-950 hover:bg-violet-900"
        >
          Read stories
        </NuxtLink>
      </div>
    </div>
  </section>
  <section
    class="w-full h-auto px-2 py-10 mb-3 bg-violet-50 md:bg-white md:p-20 rounded-xl"
  >
    <div v-if="loading">
      <loadingComponents />
    </div>
    <div v-else>
      <storyCards :stories="stories" :loading="loading" />
    </div>
  </section>
</template>
