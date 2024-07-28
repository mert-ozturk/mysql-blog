import prismadb  from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
 
import { NextRequest, NextResponse } from 'next/server';
 


export async function POST(req:NextRequest){
    
    const {userId} = auth()
    const body = await req.json()

    const {message} = body;

    

    try{
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401})
        }
        if(!message){
            return new NextResponse("Message is required",{status:400})
        }

        const chat = await prismadb.text.create({
            
            data:{
                message, 
            }
        })

        return NextResponse.json(JSON.stringify(chat,{status:200}))
    }catch(error){
        console.log('[BILLBOARDS_POST]',error)
        return new NextResponse("Interal error",{status:500})
    }
}

export async function GET(req: Request) {
    try {
      const collection = await prismadb.text.findMany();
      return NextResponse.json(collection);
    } catch (error) {
      return NextResponse.json({ message: "Could not fetch posts." });
    }
  }