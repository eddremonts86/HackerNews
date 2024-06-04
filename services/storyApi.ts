const BASE_URL = 'https://hacker-news.firebaseio.com/v0/'
import { useFetchApi } from '@/composables/useApi'
import type { Story } from '@/types/types'

export const getTopStories = async (): Promise<Story[]> => {
  try {
    const response = await useFetchApi(`topstories.json`)
    return response.data.value as Story[]
  } catch (error) {
    throw new Error("Couldn't fetch top stories")
  }
}

export const getStoryById = async (id: number): Promise<Story> => {
  try {
    const response = await useFetchApi(`item/${id}.json`)
    return response.data.value as Story
  } catch (error) {
    throw new Error("Couldn't fetch story by id")
  }
}

export const getStoryCommentsById = async (id: number): Promise<Story> => {
  try {
    const response = await useFetchApi(`item/${id}.json`)
    return response.data.value as Story
  } catch (error) {
    throw new Error("Couldn't fetch comments")
  }
}
