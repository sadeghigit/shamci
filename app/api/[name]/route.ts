import { mongoDatabase } from '@/app/mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
    params: Promise<{ name: string }>
}

export async function GET(req: NextRequest, ctx: Context) {
    const { name } = await ctx.params

    const db = await mongoDatabase();
    const collection = db.collection(name)

    const documents = await collection.find().toArray()
    const count = await collection.countDocuments()

    return NextResponse.json({ count, documents });
}



export async function POST(req: NextRequest, ctx: Context) {
    const { name } = await ctx.params

    const db = await mongoDatabase();
    const collection = db.collection(name)

    const data = await collection.insertOne(await req.json())

    return NextResponse.json({ insertedId: data.insertedId });
}
