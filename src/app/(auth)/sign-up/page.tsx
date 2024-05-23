"use client"

import { useDebounceCallback } from 'usehooks-ts'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { SignUPSchema } from '@/schemas/signUpSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIscheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const debounced = useDebounceCallback(setUsername, 300)

  const form = useForm<z.infer<typeof SignUPSchema>>({
    resolver: zodResolver(SignUPSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIscheckingUsername(true)
        setUsernameMessage('')

        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          console.log("here response ::::: --- : ",response.data)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username')
        } finally {
          setIscheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()

  }, [username])

  const onSubmit = async (data: z.infer<typeof SignUPSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post(`/api/sign-up`, data)
      toast({
        title: response?.data.success,
        description: response?.data.message
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message
      toast({
        title: 'SignUp Failed',
        description: errorMessage,
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-6'>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                 
                    <Input placeholder="username"
                     {...field}
                     onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value)
                     }} />
                 
                  {isCheckingUsername && <Loader2  className='h-4 w-4 mr-2 animate-spin' />}
                  {!isCheckingUsername && usernameMessage && (
                    <p className={` text-sm ${usernameMessage === 'Username is unique' ? ' text-green-500 ' : ' text-red-500s '}`}
                    >{usernameMessage}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                    <Input placeholder="email"
                     {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password"
                     {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className=' mr-2 h-4 w-4 animate-none'/> please wait
                </>
              ) : 'Signup'}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
