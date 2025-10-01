import * as z from 'zod'

const Category = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().optional(),
  description: z.string().min(6),
  menu: z.coerce.number().optional(),
  ord: z.coerce.number()
})
export const validateCategory = (data: any) => {
  return Category.parse(data)
}

export const validatePartialCategory = (data: any) => {
  return Category.partial().parse(data)
}
