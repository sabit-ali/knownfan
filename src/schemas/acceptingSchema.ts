import {boolean, z} from 'zod'

export const AcceptingMessages = z.object(
    {acceptMessage: z.boolean()}
)