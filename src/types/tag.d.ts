export interface Tag {
  id: number
  name: string
  icon: string
  type: 'income' | 'expense'
  createdAt: string
  updatedAt: string
}

export interface TagsObj {
  incomeTags: Tag[]
  expenseTags: Tag[]
}
