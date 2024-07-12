"use client"
 
import styles from './collection.module.css'
import React, { useState } from 'react'
import "react-quill/dist/quill.bubble.css"; 
import Image from "next/image"
import Link from "next/link"
import { Edit } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import Loader from "./custom ui/Loader"
 

interface CollectionFormProps{
 initialData?: CollectionType | null;
}

const CollectionSingle: React.FC<CollectionFormProps> = ({initialData}) => {
  
   const [loading,setLoading] = useState(false)
   const { user } = useUser();
 
    
 return loading ? <Loader /> : (
  <div className="-mx-4 flex flex-col gap-4 items-center justify-center"> 
  <div className="w-full px-4 lg:w-8/12">
  {user && (
        <div className="gap gap-4 flex items-center mt-4"> 
        <Link href={`/blog/${initialData?.id}`} className="hover:text-blue-700"><Edit /></Link>
       
        </div>
    )}
    <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">{initialData?.title}</h2>
    <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={initialData?.image || ""}
                        alt="Blog"
                        className="object-cover object-center"
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
    
  </div>
 )
}

export default CollectionSingle