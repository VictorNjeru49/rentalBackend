import { z } from 'zod'

const Userschema = z.object({
    fullname: z.string(),
    username: z.string(),
    email: z.string().email(),
    contact_phone: z.string(), 
    password: z.string(),
    role: z.enum(['admin','user']).optional().default("user"),   
    address: z.string(),
    created_at: z.date().optional(),
    updated_at: z.date().optional()
})
const loginUserSchema =z.object({
    email: z.string(),
    password: z.string()
})
const registerUserSchema =z.object({
    email: z.string().email(),
    password: z.string()
});

export{
  Userschema,
  loginUserSchema,
  registerUserSchema
}