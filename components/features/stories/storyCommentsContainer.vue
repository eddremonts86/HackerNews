<script lang="ts" setup>
  import pagination from '@/components/shared/pagination.vue'
  import commentsCard from './commentsCard.vue'
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
    <div v-if="loading" class="flex justify-center items-center h-96">
      <p>Loading comments...</p>
    </div>
    <div v-if="!loading" class="bg-violet-100 rounded-xl p-4 mb-10">
      <h2 class="text-2xl font-semibold text-violet-950 mb-4">
        Comments({{ kids.length }})
      </h2>
      <div v-for="comment in comments" :key="comment.id">
        <commentsCard :comment="comment" class="mb-4" />
      </div>
      <div class="flex justify-center items-center my-5">
        <pagination
          :total="total"
          @update:page="getStoryComments($event, kids)"
        />
      </div>
    </div>
  </section>
</template>
