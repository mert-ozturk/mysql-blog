import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const collection = await prisma.collection.findUnique({
            where: {
                id: parseInt(params.collectionId),
            },
        });
        if (!collection) {
            return new NextResponse(JSON.stringify({ message: "Collection not found" }), { status: 404 });
        }
        return NextResponse.json(collection, { status: 200 });
    } catch (err) {
        console.log("[collectionId_GET]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const POST = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { title, description, image } = await req.json();
        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 500 });
        }

        const updatedCollection = await prisma.collection.updateMany({
            where: {
                id: parseInt(params.collectionId),
            },
            data: {
                title,
                description,
                image,
            },
        });

        return NextResponse.json(updatedCollection, { status: 200 });
    } catch (err) {
        console.log("[collectionId_POST]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await prisma.collection.delete({
            where: {
                id: parseInt(params.collectionId),
            },
        });

        return new NextResponse("Collection is deleted", { status: 200 });
    } catch (err) {
        console.log("[collectionId_DELETE]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}