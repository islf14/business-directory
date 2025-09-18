import * as z from 'zod'

const Category = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().optional(),
  description: z.string().min(6),
  menu: z.number().optional(),
  ord: z.number().optional(),
  photo_url: z.url().optional()
})
export const validateCategory = (data: any) => {
  return Category.parse(data)
}

export const validatePartialCategory = (data: any) => {
  return Category.partial().parse(data)
}
