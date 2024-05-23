import {string, z} from 'zod'

export const VerifySchema = z.object(
    {
        code:string().min(6,{message:'veriy code must be 6 characters'})
    }
)