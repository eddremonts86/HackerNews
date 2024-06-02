<script setup>
  import card from '@/components/features/stories/card.vue'
  import { storyFormatter } from '@/components/features/stories/utils/storyTools'
  import pagination from '@/components/shared/pagination.vue'
  const INITIAL_PAGE = 1

  const route = useRoute()
  const storyId = route.params.id
  const { story, loading, storyById, getStoryComments, comments } =
    await useStories()
  const storiesList = ref({})

  watchEffect(async () => {
    loading.value = true
    await storyById(storyId)
    await getStoryComments(INITIAL_PAGE, story.value.kids)
    storiesList.value = storyFormatter([story.value])
    console.log('kfn')
    loading.value = false
  }, {})

  const total = computed(() => {
    return storiesList.value?.at(0)?.kids?.length || 0
  })

  const images = computed(() => {
    return {
      width: 96,
      height: 32,
    }
  })
</script>

<template>
  <div class="mt-5">
    <p v-if="loading">Loading...</p>
    <div v-if="!loading">
      <card :story="storiesList[0]" :images="images" />
      <div>
        <card
          v-for="comment in comments"
          :key="comment.id"
          :story="comment"
          :images="images"
        />
      </div>
      <div class="flex justify-center items-center">
        <pagination
          :total="total"
          @update:page="getStoryComments($event, story.value.kids)"
        />
      </div>
    </div>
  </div>
</template>
