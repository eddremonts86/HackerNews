const BASE_URL = 'https://hacker-news.firebaseio.com/v0/'

export const getTopStories = async () => {
  try {
    const response = await fetch(`${BASE_URL}topstories.json`)
    return await response.json()
  } catch (error) {
    throw new Error("Couldn't fetch top stories")
  }
}

export const getStoryById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}item/${id}.json`)
    return await response.json()
  } catch (error) {
    throw new Error("Couldn't fetch story by id")
  }
}

export const getStoryCommentsById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}item/${id}.json`)
    return await response.json()
  } catch (error) {
    throw new Error("Couldn't fetch comments")
  }
}
