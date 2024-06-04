import { useUseValidateDate } from '@/composables/useValidateDate'
import type { Story, StoryCard } from '@/types/types'
import { StoryType } from '@/types/types'
import { UppercaseFirstLetter } from '@/utils/StringsTools'

export const storyFormatter = (stories: Story[]): StoryCard[] => {
  const { formateUnixDate } = useUseValidateDate()
  const result = stories
    .filter((ele) => ele)
    .map((ele) => {
      const timeFormatted = formateUnixDate(ele.time)
      const textFormatted = ele.text ? ele.text.slice(0, 250) + '...' : ''
      const typeFormatted = UppercaseFirstLetter(ele.type)
      const byFormatted = UppercaseFirstLetter(ele.by)
      const image =
        ele.type === StoryType.comment
          ? '/placeholder-comment.png'
          : getRandomStoryImages()

      return {
        ...ele,
        image,
        type: typeFormatted,
        by: byFormatted,
        time: timeFormatted,
        text: textFormatted,
        fullText: ele.text,
      }
    })
  return result as StoryCard[]
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
