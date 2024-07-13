"use client"
import { AlertCircle } from "lucide-react"
import styles from './collection.module.css'
import React, { useState } from 'react'
import "react-quill/dist/quill.bubble.css"; 
import Image from "next/image"
import Link from "next/link"
import { Edit } from "lucide-react"
import { useSession, useUser } from "@clerk/nextjs"
import Loader from "./custom ui/Loader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Delete from "./custom ui/Delete";

interface CollectionFormProps{
 initialData?: CollectionType | null;
}

const CollectionSingle: React.FC<CollectionFormProps> = ({initialData}) => {
  
   const [loading,setLoading] = useState(false)
   const { user } = useUser();
  const {session} = useSession()
    
 return loading ? <Loader /> : (
  <div className=" grid grid-cols-1 gap-y-16 lg:grid-cols-15 lg:grid-rows-[auto_1fr] lg:gap-y-2  "> 
  <div className="w-full px-12 lg:w-8/12">

  {user && (
        <div className="gap gap-4 flex items-center mt-4"> 
          { session?.user?.id === "user_2imMvQkvxz5cGRPChUFeYnekY3U" &&(
            <> 
        <Link href={`/edit/${initialData?.id}`} className="hover:text-blue-700"><Edit /></Link>
        <Delete id={initialData.id} />
            </>
          )}
        </div>
    )}
    
    <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">{initialData?.title}</h2>
    <div className="mb-10 w-full overflow-hidden rounded">
                   
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={initialData?.image }
                        alt="Blog"
                         
                        fill
                      />
                    </div>
                  </div>
    <div className={styles.post}>
      
    <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: initialData?.description }}
          />
 
 </div>

 </div>
<div className='space-y-10 lg:pl-16 xl:pl-24'>
<h2 className='flex text-sm font-semibold text-zinc-900 dark:text-zinc-100'>asd</h2>
</div>
  </div>
 )
}

export default CollectionSingle