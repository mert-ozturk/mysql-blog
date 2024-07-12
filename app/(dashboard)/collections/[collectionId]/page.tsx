"use client"

 import Loader from "@/components/custom ui/Loader"
import { useEffect, useState } from "react"
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import CollectionSingle from "@/components/CollectionSingle";

const CollectionDetails = ({params}:{params:{collectionId:string}}) => {
    const [loading,setLoading] = useState(true)
    const [collectionDetails,setCollectionDetails] = useState<CollectionType | null>(null)
    
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
    <CollectionSingle initialData={collectionDetails} />
  )
}

export default CollectionDetails