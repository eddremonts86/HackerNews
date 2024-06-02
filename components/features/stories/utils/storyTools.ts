import { useUseValidateDate } from '@/composables/useValidateDate'
import type { Story, StoryCard } from '@/types/types'
import { UppercaseFirstLetter } from '@/utils/StringsTools'

export const storyFormatter = (stories: Story[]): StoryCard[] => {
  const { formateUnixDate } = useUseValidateDate()
  const result = stories.map(
    ({ id, title, text, type, by, time, score, descendants }) => {
      const timeFormatted = formateUnixDate(time)
      const image = 'https://source.unsplash.com/random/500x600'
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
