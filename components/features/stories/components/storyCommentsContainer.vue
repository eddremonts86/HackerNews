<script lang="ts" setup>
  import pagination from '@/components/shared/pagination.vue'
  import commentsCard from '@/components/features/stories/components/commentsCard.vue'
  import loadingComponents from '@/components/shared/loading.vue'

  const INITIAL_PAGE = 1

  const { loading, getStoryComments, comments } = await useStories()
  const props = defineProps<{
    kids: number[]
  }>()

  const total = computed(() => {
    return props.kids?.length || 0
  })

  watchEffect(async () => {
    loading.value = true
    await getStoryComments(INITIAL_PAGE, props.kids)
    loading.value = false
  }, {})
</script>

<template>
  <section class="my-10">
    <div v-if="loading" class="flex items-center justify-center h-96">
      <loadingComponents />
    </div>
    <div v-if="!loading" class="p-4 mb-10 bg-violet-100 rounded-xl">
      <h2 class="mb-4 text-2xl font-semibold text-violet-950">
        Comments({{ kids.length }})
      </h2>
      <div v-for="comment in comments" :key="comment.id">
        <commentsCard :comment="comment" class="mb-4" />
      </div>
      <div class="flex items-center justify-center my-5">
        <pagination
          :total="total"
          @update:page="getStoryComments($event, kids)"
        />
      </div>
    </div>
  </section>
</template>
