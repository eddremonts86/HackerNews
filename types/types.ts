export interface NavBarItem {
  title: string
  link: string
}

export enum StoryType {
  story = 'story',
  comment = 'comment',
  poll = 'poll',
  job = 'job',
}

export interface Story {
  id: number
  deleted: boolean
  type: string
  by: string
  time: number
  text: string
  dead: boolean
  parent: number
  poll: any
  kids: number[]
  url: string
  score: number
  title: string
  parts: number[]
  descendants: number
}

export interface StoryCard {
  title: string
  text: string
  type: string
  by: string
  time: string
  id: number
  image: string
  descendants: number
  score: number
  fullText: string
  url: string
}
