import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET( req:Request,
    {params} : {params:{ collectionId:string}}
){

    try{
        if(!params.collectionId){
            return new NextResponse("Billboard id required",{status:400})
        }    
        const billboard = await prismadb.collection.findUnique({
            where:{
                id: params.collectionId,
            },
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_GET]',error)
        return new NextResponse("Interal error",{status:500})
    }
}


export async function POST( req:Request,
    {params} : {params:{collectionId:string}}
){

    try{    
            const body = await req.json()

        const {title,description,image} = body;

         if(!title){
        return new NextResponse("Unauthenticated",{status:401})
            }
            if(!description){
                return new NextResponse("Unauthenticated",{status:401})
                    }
                    if(!image){
                        return new NextResponse("Unauthenticated",{status:401})
                            }
     
        
        const billboard = await prismadb.collection.update({
            where:{
                id:params.collectionId,
            },
            data:{
                title,
               description,
               image,
            }
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_PATCH]',error)
        return new NextResponse("Interal error",{status:500})
    }
}


export async function DELETE( req:Request,
    {params} : {params:{  collectionId:string}}
){

    try{
       
        if(!params.collectionId){
            return new NextResponse("Billboard id required",{status:400})
        }


        const billboard = await prismadb.collection.delete({
            where:{
                id: params.collectionId,
            },
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_DELETE]',error)
        return new NextResponse("Interal error",{status:500})
    }
}