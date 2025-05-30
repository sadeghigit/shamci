import { mongoDatabase } from '@/app/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
    params: Promise<{ name: string, id: string }>,
}

async function beforeRequest(req: NextRequest, ctx: Context) {
    const { name } = await ctx.params
    const search = Object.fromEntries(req.nextUrl.searchParams.entries());

    const db = await mongoDatabase();

    const info = await db.collection('collections').findOne({ name })

    if (!info) throw new Error("Collection not found")

    const collection = db.collection(name)

    const document = await collection.findOne(search)

    if (!document) throw new Error("Document not found")

    return { name, search, document, db, info, collection };
}

export async function GET(req: NextRequest, ctx: Context) {
    try {
        const { document } = await beforeRequest(req, ctx)

        return NextResponse.json({ document });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}
