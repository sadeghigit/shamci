import { mongoDatabase } from '@/app/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
    params: Promise<{ name: string, id: string }>
}

export async function GET(req: NextRequest, ctx: Context) {
    const { name, id } = await ctx.params

    const db = await mongoDatabase();
    const collection = db.collection(name)

    if (!ObjectId.isValid(id)) return NextResponse
        .json({ error: "invalid object id format" }, { status: 400 })

    const _id = new ObjectId(id)
    const data = await collection.findOne({ _id })

    if (!data) return NextResponse
        .json({ error: "document not found" }, { status: 400 })

    return NextResponse.json({ document });
}

export async function DELETE(req: NextRequest, ctx: Context) {
    const { name, id } = await ctx.params

    const db = await mongoDatabase();
    const collection = db.collection(name)

    if (!ObjectId.isValid(id)) return NextResponse
        .json({ error: "invalid object id format" }, { status: 400 })

    const _id = new ObjectId(id)
    const data = await collection.deleteOne({ _id })

    return NextResponse.json({ deletedCount: data.deletedCount });
}

export async function PUT(req: NextRequest, ctx: Context) {
    const { name, id } = await ctx.params

    const db = await mongoDatabase();
    const collection = db.collection(name)

    if (!ObjectId.isValid(id)) return NextResponse
        .json({ error: "invalid object id format" }, { status: 400 })

    const _id = new ObjectId(id)
    const data = await collection.updateOne({ _id }, { $set: await req.json() })

    return NextResponse.json({ modifiedCount: data.modifiedCount });
}
