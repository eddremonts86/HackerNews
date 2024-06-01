export interface NavBarItem {
  title: string
  link: string
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

export enum StoryType{
    story = "story",
    comment = "comment",
    poll = "poll",
    job = "job"
}
