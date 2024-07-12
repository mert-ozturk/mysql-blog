
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
 

export async function POST(req: Request) {
 

  const { title, description, image } =
    await req.json();


  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 500 }
    );
  }

  try {
    const newPost = await prismadb.collection.createMany({
      data: {
        title,
        description,
        image,
         
      },
    });

    console.log("Post created");
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ message: "Could not create post." });
  }
}

export async function GET(req: Request) {
  try {
    const collection = await prismadb.collection.findMany();
    return NextResponse.json(collection);
  } catch (error) {
    return NextResponse.json({ message: "Could not fetch posts." });
  }
}