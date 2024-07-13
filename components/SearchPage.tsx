import React, { useEffect, useState } from 'react'
import Loader from './custom ui/Loader';
import Link from 'next/link';
import { Button } from './ui/button';
import { IoMdCloseCircleOutline } from "react-icons/io";


const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [collections,setCollections] = useState([])
    const [loading,setLoading] = useState(false)
    const [dropdownX,setDropdownX] = useState(true)

  const getCollections = async () => {
    try{
      const res = await fetch("/api/collections",{
        method: "GET",

      })
      const data = await res.json()
      setCollections(data)
   
    }catch(err){
      console.log("[collections_GET]",err)
    }
  }

  useEffect(()=>{
    getCollections()
  },[])


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCollections = collections.filter(collection =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
 
  );
  


  return loading ? <Loader /> : (
    <div >
     
    {  dropdownX && (
      <>
      <input
       className='inline-flex justify-center rounded-2xl bg-grey-600 p-4  hover:bg-grey-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70  bg-sky-700 py-2 px-4 text-sm font-semibold text-slate-900  '
      type="text"
      placeholder="Haber Ara"
      value={searchTerm}
      onChange={handleSearch}
    />
    {searchTerm  && (
      <>
      { <ul >
        {filteredCollections.map(item => (
         <>
          <Link className=' absolute bg-white  rounded-lg mt-4 text-lg tracking-tight text-grey-200 ' href={`/collections/${item.id}`} key={item.id}>{item.title}</Link>
         
         </>
       ))}
       <button className='flex items-center'  onClick={()=>setDropdownX(!dropdownX)}><IoMdCloseCircleOutline /></button>
      </ul>}
      </>
    )}
    
      </>
    )}
 
  </div>






  )
}

export default SearchPage