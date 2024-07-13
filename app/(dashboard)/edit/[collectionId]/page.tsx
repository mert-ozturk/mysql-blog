"use client"
import { AlertCircle } from "lucide-react"
 import Loader from "@/components/custom ui/Loader"
import { useEffect, useState } from "react"
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { useSession, useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import Link from "next/link"
import CollectionForm from "@/components/CollectionForm";

const BlogDetails = ({params}:{params:{collectionId:string}}) => {
    const [loading,setLoading] = useState(true)
    const [collectionDetails,setCollectionDetails] = useState<CollectionType | null>(null)
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



 
    const getCollectionDetails = async () => {
        try{
            const res = await fetch(`/api/collections/${params.collectionId}`,{
                method:"GET"
            })
            const data = await res.json()
            setCollectionDetails(data)
            setLoading(false)


        }catch(err){
            console.log("[collectionId_GET]",err)
        }
    }

    useEffect(()=> {
        getCollectionDetails()
    },[])

    return loading ? <Loader /> : (
        <>
    {user && (
        <CollectionForm initialData={collectionDetails} />
    )}
    </>
  )
}

export default BlogDetails