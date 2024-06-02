import { getStoryById, getTopStories } from '@/services/storyApi'
import type { Story } from '@/types/types'

export const useStories = async () => {
  const story = ref({} as Story)
  const stories = ref([] as Story[])
  const storiesByPage = ref([] as number[][])
  const pages = ref(1)
  const total = ref(0)
  const loading = ref(true)
  const error = ref(null)

  const topStories = async () => {
    try {
      const allStories = await getTopStories()
      total.value = allStories.length
      pages.value = Math.ceil(allStories.length / 10)
      for (let i = 0; i < pages.value; i++) {
        const elements = allStories.slice(i * 10, (i + 1) * 10)
        storiesByPage.value = [...storiesByPage.value, elements]
      }
    } catch (error) {
      console.error(error)
    }
  }

  const storySortBy = (stories: Story[]) => {
    return stories.sort((a, b) => b.score - a.score)
  }

  const storyById = async (id: number) => {
    try {
      const response = await getStoryById(id)
      story.value = response
    } catch (error) {
      console.error(error)
    }
  }

  const getStory = async (page: number) => {
    try {
      loading.value = true
      const allStories = storiesByPage.value[page - 1].map((id) =>
        getStoryById(id)
      )
      const storiesFetched = await Promise.all(allStories)
      stories.value = storySortBy(storiesFetched)
      loading.value = false
    } catch (error) {
      console.log(error)
    }
  }

  return {
    story,
    total,
    stories,
    loading,
    error,
    pages,
    getStory,
    topStories,
    storyById,
  }
}