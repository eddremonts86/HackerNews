import { useUseValidateDate } from '@/composables/useValidateDate'
import type { Story, StoryCard } from '@/types/types'
import { StoryType } from '@/types/types'
import { UppercaseFirstLetter } from '@/utils/StringsTools'

export const storyFormatter = (stories: Story[]): StoryCard[] => {
  const { formateUnixDate } = useUseValidateDate()
  const result = stories.map(
    ({ id, title, text, type, by, time, score, descendants,  url }) => {
      const timeFormatted = formateUnixDate(time)
      const image =
        type === StoryType.comment
          ? '/placeholder-comment.png'
          : getRandomStoryImages()
      const textFormatted = text ? text.slice(0, 250) + '...' : ''
      const typeFormatted = UppercaseFirstLetter(type)
      const byFormatted = UppercaseFirstLetter(by)

      return {
        id,
        title,
        type: typeFormatted,
        by: byFormatted,
        image,
        score,
        descendants,
        url,
        time: timeFormatted,
        text: textFormatted,
        fullText: text,
      } as StoryCard
    }
  )
  return result
}

const getRandomStoryImages = () => {
  const images = [
    '/story/1.jpeg',
    '/story/2.jpeg',
    '/story/3.jpeg',
    '/story/4.jpeg',
    '/story/5.jpeg',
    '/story/6.jpeg',
    '/story/7.jpeg',
    '/story/8.jpeg',
    '/story/9.jpeg',
    '/story/10.jpeg',
  ]
  return images[Math.floor(Math.random() * images.length)]
}
