export const VoteType = {
  up: "up",
  down: "down",
}

export type VoteType = typeof VoteType[keyof typeof VoteType]

export interface IVote {
  id: number
  type: VoteType
  postId?: number
  userId: number
}
