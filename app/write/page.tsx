"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from 'react'
import { Separator } from "@/components/ui/separator"  
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button"
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
import ImageUpload from "@/components/custom ui/ImageUpload"  
import {  useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Delete from "@/components/custom ui/Delete"  
import { AlertCircle } from "lucide-react"
import {  useUser } from "@clerk/nextjs"
 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

const formSchema = z.object({
 title: z.string().min(2).max(120),
 description: z.string().min(2).max(2000).trim(),
 image: z.string(),
});

interface CollectionFormProps{
 initialData?: CollectionType | null;
}

const WritePage: React.FC<CollectionFormProps> = ({initialData}) => {
   const router = useRouter()
   const [loading,setLoading] = useState(false)
   const {user} = useUser()

 

   const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: initialData ? initialData : {
         title: "",
         description:"",
         image:"",

       },
     })

     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
       if(e.key === "Enter"){
         e.preventDefault()
       }
     }
     
     const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try{
       setLoading(true)
       const url = initialData ? `/api/collections/${initialData.id}` : "/api/collections" ;
       const res = await fetch(url,{
         method: "POST",
         body:JSON.stringify(values),
       });
       if(res.ok){
         setLoading(false)
         toast.success("Collection created")
         window.location.href = "/collections"
         router.push("/")
       }
      }catch(err){
       console.log("[collections_POST]",err)
       toast.success("Failed to create collection!")
      }
       
     }
 return (
   <>
   {user ? (
     <div className='p-10'>
     {initialData ? (
       <div className="flex items-center justify-between"> 
       <p className='text-gray-700 text-heading2-bold'>Edit Collection</p>
       <Delete id={initialData.id} />
       
       </div>
     ) : (
       <p className='text-gray-700 text-heading2-bold'>Create Collection</p>
     )}
       
       <Separator className="bg-gray-600 mt-4 mb-7"   />

       <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <FormField
         control={form.control}
         name="title"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Title</FormLabel>
             <FormControl>
               <Input placeholder="Title" {...field} onKeyDown={handleKeyPress} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
        <FormField
         control={form.control}
         name="description"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Description</FormLabel>
             <FormControl>
                
               <ReactQuill
         theme="snow"
         {...field}
         placeholder="Text description..."
         onKeyDown={handleKeyPress} 
       />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
          <FormField
         control={form.control}
         name="image"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Image</FormLabel>
             <FormControl>
             <ImageUpload
                   value={field.value ? [field.value] : []}
                   onChange={(url) => field.onChange(url)}
                   onRemove={() => field.onChange("")}
                 />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
      <div className="flex gap-10">
      <Button type="submit" >Submit</Button>
      <Button type="button" onClick={()=>router.push("/")}>Discard</Button>
      </div>
     </form>
   </Form>
   </div>
   ):(
     <Alert variant="destructive">
     <AlertCircle className="h-4 w-4" />
     <AlertTitle>Error</AlertTitle>
     <AlertDescription>
       Your session has expired. Please <Link href="/sign-in" className="text-blue-700">log in</Link>  again.
     </AlertDescription>
   </Alert>
   )}
   </>
 )
}

export default WritePage