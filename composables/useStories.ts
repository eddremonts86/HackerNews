import {
  getStoryById,
  getStoryCommentsById,
  getTopStories,
} from '@/services/storyApi'
import type { Story } from '@/types/types'
const ITEMS_PER_PAGE = 10

export const useStories = async () => {
  const pages = ref(1)
  const total = ref(0)
  const loading = ref(true)
  const error = ref(null)
  const story = ref({} as Story)
  const stories = ref([] as Story[])
  const comments = ref([] as Story[])
  const storiesByPage = ref([] as number[][])

  const storySortBy = (stories: Story[]) => {
    return stories.sort((a, b) => b.score - a.score)
  }

  const createPagination = (list: unknown[]) => {
    pages.value = Math.ceil(list.length / ITEMS_PER_PAGE)
    let newList: unknown[] = []
    for (let i = 0; i < pages.value; i++) {
      const elements = list.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
      newList = [...newList, elements]
    }
    return newList
  }

  const topStories = async () => {
    try {
      const allStories = await getTopStories()
      total.value = allStories.length
      storiesByPage.value = createPagination(allStories) as number[][]
    } catch (error) {
      throw new Error("Couldn't fetch top stories")
    }
  }

  const storyById = async (id: number) => {
    try {
      const response = await getStoryById(id)
      story.value = response
    } catch (error) {
      throw new Error("Couldn't fetch story by id")
    }
  }

  const getStory = async (page: number) => {
    try {
      const allStories = storiesByPage.value[page - 1].map((id) =>
        getStoryById(id)
      )
      const storiesFetched = await Promise.all(allStories)
      stories.value = storySortBy(storiesFetched)
    } catch (error) {
      throw new Error("Couldn't fetch stories")
    }
  }

  const getStoryComments = async (page: number, kids: number[]) => {
    try {
      const kidsByPage = createPagination(kids) as number[][]
      if (!kidsByPage[page - 1]) return []

      const allComments = kidsByPage[page - 1].map(
        async (id: number) => await getStoryCommentsById(id)
      )
      comments.value = await Promise.all(allComments)
    } catch (error) {
      throw new Error(" Couldn't fetch comments")
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
    comments,
    getStoryComments,
  }
}
