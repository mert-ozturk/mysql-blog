"use client"
 import Loader from '@/components/custom ui/Loader'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { useSession, useUser } from '@clerk/nextjs'
import { Trash } from 'lucide-react'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from 'next/link'
import WritePage from '@/app/write/page'


const CreateCollection = () => {
 
  const {user} = useUser()
  const {session} = useSession()

 if(session?.user?.id !== "user_2imMvQkvxz5cGRPChUFeYnekY3U"){
    return (
      <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please Admin <Link href="/sign-in" className="text-blue-700">log in</Link> again.
      </AlertDescription>
    </Alert>
    )
  } 

  return  (
    <> 
      {user && ( 
        <WritePage />
      )}
   </>
  )
}

export default CreateCollection