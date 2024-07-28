import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET( req:Request,
    {params} : {params:{ textId:string}}
){

    try{
        if(!params.textId){
            return new NextResponse("Billboard id required",{status:400})
        }    
        const billboard = await prismadb.text.findUnique({
            where:{
                id: params.textId,
            },
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_GET]',error)
        return new NextResponse("Interal error",{status:500})
    }
}


export async function POST( req:Request,
    {params} : {params:{textId:string}}
){

    try{    
            const body = await req.json()

        const {message} = body;

         if(!message){
        return new NextResponse("Unauthenticated",{status:401})
            }
            
     
        
        const billboard = await prismadb.text.update({
            where:{
                id:params.textId,
            },
            data:{
               message,
            }
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_PATCH]',error)
        return new NextResponse("Interal error",{status:500})
    }
}


export async function DELETE( req:Request,
    {params} : {params:{  textId:string}}
){

    try{
       
        if(!params.textId){
            return new NextResponse("Billboard id required",{status:400})
        }


        const billboard = await prismadb.text.delete({
            where:{
                id: params.textId,
            },
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_DELETE]',error)
        return new NextResponse("Interal error",{status:500})
    }
}