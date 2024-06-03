import { useUseValidateDate } from '@/composables/useValidateDate'
import type { Story, StoryCard } from '@/types/types'
import { StoryType } from '@/types/types'
import { UppercaseFirstLetter } from '@/utils/StringsTools'

export const storyFormatter = (stories: Story[]): StoryCard[] => {
  const { formateUnixDate } = useUseValidateDate()
  const result = stories.map(
    ({ id, title, text, type, by, time, score, descendants }) => {
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
    '/story/1.JPEG',
    '/story/2.JPEG',
    '/story/3.JPEG',
    '/story/4.JPEG',
    '/story/5.JPEG',
    '/story/6.JPEG',
    '/story/7.JPEG',
    '/story/8.JPEG',
    '/story/9.JPEG',
    '/story/10.JPEG',
  ]
  return images[Math.floor(Math.random() * images.length)]
}
