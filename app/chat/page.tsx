"use client"
import React, {  useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import ChatWrite from '../chat-write/page'
import { useSession } from '@clerk/nextjs';
import Image from 'next/image';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DeleteChat from '@/components/custom ui/DeleteChat';

interface ChatFromProps{
  initialData?: ChatFormPropsType | null;
 }

 
const Chat:React.FC<ChatFromProps> = ({initialData}) => {
    const [textMessage,setTextMessage] = useState([])
     const {session} = useSession()


    const getCollections = async () => {
        try{
          const res = await fetch("/api/text",{
            method: "GET",
    
          })
          const data = await res.json()
          setTextMessage(data)
         
        }catch(err){
          console.log("[collections_GET]",err)
        }
      }
    
      useEffect(()=>{
        getCollections()
      },[]) 


  return (
    <div className="max-w-3xl mx-auto md:py-10 h-screen">
    <div className="h-full border rounded-md">
      <div className="h-20">
          <div className="p-5 border-b flex items-center justify-between">
          <div >
          <h1  className="flex-xl font-bold">Chat App</h1>
            <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" >
          </div>
            <div>
            <h1 className="text-sm text-gray-400">2 onlines</h1>
            </div>
           </div>
        
          </div>
           </div>
           <div className='w-full mb-10 flex flex-col max-h-[75vh] overflow-auto no-scrollbar '>
         {textMessage.map((value)=> {
          return (
            <>
              <div className='flex flex-col gap-2 py-2 mx-2'>
              <p className='text-gray-700 text-heading2-bold'> <DeleteChat id={initialData?.id}  /></p>
       
        
        
          <div className='relative border rounded-md'> 
          <div className='flex gap-2 mt-2 justify-end'>
          <div className='h-10 w-10 bg-green-500 rounded-full'>
          </div>
          <h1 className='font bold'>{session?.user?.firstName}</h1>
          <h1 className='text-sm text-gray-400'>{new Date().toDateString()}</h1>
          </div>
         <p className='relative'>
         <div
            
            dangerouslySetInnerHTML={{ __html: value.message }}
          />
          </p>
           
          </div>
         </div>
          
            </>
          )
         })}
         
        </div>
        <div className='flex gap-2 justify-between'>
    <ChatWrite />
    </div>
      </div>
      
    </div> 

    </div>
  )
}

export default Chat