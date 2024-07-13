import React, { useEffect, useState } from 'react'
import Loader from './custom ui/Loader';
import Link from 'next/link';



const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [collections,setCollections] = useState([])
    const [loading,setLoading] = useState(false)


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
    <div  >
    <input
      type="text"
      placeholder="Search collections..."
      value={searchTerm}
      onChange={handleSearch}
    />
    {loading ? (
      <p>Loading...</p>
    ) : (
   
      <ul >
        {filteredCollections.map(item => (
          <Link className='cursor-pointer absolute  flex flex-col bg-white rounded-lg' href={`/collections/${item.id}`} key={item.id}>{item.title}</Link>
        ))}
      </ul>

    )}
  </div>






  )
}

export default SearchPage