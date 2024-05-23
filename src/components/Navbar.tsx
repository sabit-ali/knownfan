"use client"
import { useSession , signOut} from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { User } from 'next-auth'
import { Button } from './ui/button'



const Navbar = () => {
    const {data : session} = useSession()
    const user : User = session?.user

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <a href="" className="text-xl font-bold mb-4 md:mb-0"> KnownFn Message </a>
            {session ? (
                <>
                   <h2 className="mr-4" >Welcome , {user.username || user.email }  </h2>
                   <Button onClick={()=> signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>Logout</Button>
                </>
            ) : (
                <>
                    <Link href={'/sign-in'} >
                        <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Signup</Button>
                    </Link>
                </>
            )}
        </div>
    </nav>
  )
}

export default Navbar
