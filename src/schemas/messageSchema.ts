import {z} from 'zod'

export const MessageSchema = z.object({
    content:z.string().min(6,{message:'content atlest 6 characters'}).max(300,{message:'content less then 300 characters'})
})