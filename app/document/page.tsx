"use client"
 
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Loader from '@/components/custom ui/Loader'
import { useSession, useUser } from '@clerk/nextjs'
import { Edit } from 'lucide-react'
import Delete from '@/components/custom ui/Delete'
 


const DocumentPage = ( ) => {
 
  const [loading,setLoading] = useState(false)
  const [collections,setCollections] = useState([])
  const {user} = useUser()
  const {session} = useSession()


  const getCollections = async () => {
    try{
      const res = await fetch("/api/collections",{
        method: "GET",

      })
      const data = await res.json()
      setCollections(data)
      setLoading(false)
    }catch(err){
      console.log("[collections_GET]",err)
    }
  }

  useEffect(()=>{
    getCollections()
  },[])

  
  console.log(collections)
  return loading ? <Loader /> : (
    <div className="-mx-1 grid grid-cols-3 gap-5">
    
      
      {collections.map((item)=>(
    <div className='m-4 cursor-pointer'>
      
  {user && (
        <div className="gap gap-4 flex items-center mt-4"> 
          { session?.user?.id === "user_2imMvQkvxz5cGRPChUFeYnekY3U" &&(
            <> 
        <Link href={`/edit/${item.id}`} className="hover:text-blue-700"><Edit /></Link>
        <Delete id={item.id} />
            </>
          )}
        </div>
    )}
         <Link  href={`/collections/${item.id}`}>
          <h2 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-900">{item.title}</h2>      
    <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl">
    <div className="absolute bottom-6 left-0 right-4 top-0 rounded-4xl border transition duration-300 group-hover:scale-95 xl:right-6 border-blue-300">
    <div className='absolute inset-0 bg-indigo-50'>
    <Image  src={item?.image || ""}  alt="Blog" fill className='absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110' />
    </div>
    </div>
    </div>
        </Link>
      <div className="mt-1 text-base tracking-tight text-slate-500" dangerouslySetInnerHTML={{ __html: item?.description.substring(0,170)   }}/>
         
        <div aria-hidden="true" className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"> 
        <Link href={`/collections/${item.id}`}>Devamı...</Link>  
<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current"></svg>

</div>
        </div>
         
      ))}
 
        
        
      </div>
 
  )
}

export default DocumentPage