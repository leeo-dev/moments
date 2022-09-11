export interface Moment {
  id?: number
  title: string
  description: string
  image: string
  created_at: Date
  update_at: Date
  comments?: [{comment: string, username: string}]
}