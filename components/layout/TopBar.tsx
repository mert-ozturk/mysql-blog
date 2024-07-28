"use client"
import { navLinks } from '@/lib/constants'
import { UserButton, useUser } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import SearchPage from '../SearchPage'

export const TopBar = () => {
    const pathname = usePathname()
    const [dropdownMenu,setDropdownMenu] = useState(false)
    const [dropdownSearch,setDropdownSearch] = useState(false)
    const [dropBag,setDropBag] = useState(false)
    const [stok,setStok] = useState("0")
    const {user} = useUser() 

 

  return (
    <div
    className='sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 b-blue-2  '
    >

      
       <Link href="/"> <Image src="/logo.png" alt='logo' width={150} height={70} /></Link>
   
   <div className='flex gap-8 max-md:hidden'> 
        {navLinks.map((link)=>(
          <>
            <Link href={link.url} key={link.label}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >{link.icon} <p>{link.label}</p></Link>  
          </>
        ))}
    </div>
    <div className='relative flex gap-4  items-center'>
        <Menu className='cursor-pointer md:hidden' onClick={()=>setDropdownMenu(!dropdownMenu)} />
            {dropdownMenu && (
                <div className='absolute  top-10 right-6  flex flex-col gap-8 b-5 bg-white shadow-xl rounded-lg '> 
                {navLinks.map((link)=>(
                    <Link href={link.url} key={link.label}
                    className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1":"text-gray-1"}`}
                    >{link.icon}<p>{link.label}</p></Link>
                ))}
                <button
                className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                onClick={()=>setDropdownMenu(!dropdownMenu)}>X</button>
            </div>
            )}
          <FaShoppingBag  className='cursor-pointer' onClick={()=>setDropBag(!dropBag)}  />
          {dropBag && (
                 <p className='text to-black'>{stok}</p>
            )}
          
          <FaSearch className='cursor-pointer' onClick={()=>setDropdownSearch(!dropdownSearch)} />
            {dropdownSearch && (
                <div className='absolute top-10 right-6 flex flex-col gap-8 b-5 bg-white shadow-xl rounded-lg '> 
                 <SearchPage />
                
            </div>
            )}

             {user?(
       <>
        
        <UserButton/>
       
       </>
         ):(
      <>
       <Link href="/sign-in"><Button>Sign In</Button></Link>
       <Link href="/sign-up"><Button>Sign Up</Button></Link>
      </>
         )}

          
            
            
    </div>
    </div>
  )
}
