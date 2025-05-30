import { mongoDatabase } from '@/app/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
    params: Promise<{ name: string, id: string }>
}

async function beforeRequest(req: NextRequest, ctx: Context) {
    const { name, id } = await ctx.params

    const db = await mongoDatabase();

    const info = await db.collection('collections').findOne({ name })

    if (!info) throw new Error("Collection not found")

    const collection = db.collection(name)

    if (!ObjectId.isValid(id)) throw new Error("Invalid id format")

    const document = await collection.findOne({ _id: new ObjectId(id) })

    if (!document) throw new Error("Document not found")

    return { name, id, document, db, info, collection };
}

export async function GET(req: NextRequest, ctx: Context) {
    try {
        const { document } = await beforeRequest(req, ctx)

        return NextResponse.json({ document });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}

export async function DELETE(req: NextRequest, ctx: Context) {
    try {
        const { collection, document } = await beforeRequest(req, ctx)

        const { deletedCount } = await collection.deleteOne({ _id: document._id })

        return NextResponse.json({ deletedCount });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}

export async function PUT(req: NextRequest, ctx: Context) {
    try {
        const { collection, document } = await beforeRequest(req, ctx)

        const body = await req.json()

        const { modifiedCount } = await collection.updateOne({ _id: document._id }, { $set: body })

        return NextResponse.json({ modifiedCount });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}
