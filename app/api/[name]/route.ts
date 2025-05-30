import { mongoDatabase } from '@/app/mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
    params: Promise<{ name: string }>
}

async function beforeRequest(req: NextRequest, ctx: Context) {
    const { name } = await ctx.params

    const db = await mongoDatabase();

    const info = await db.collection('collections')
        .findOne({ name })

    if (!info) throw new Error("Collection not found")

    const collection = db.collection(name)

    return { name, db, info, collection };
}

export async function GET(req: NextRequest, ctx: Context) {
    try {
        const { collection } = await beforeRequest(req, ctx)

        const count = await collection.countDocuments()

        const documents = await collection.find().toArray()

        return NextResponse.json({ count, documents });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}

export async function POST(req: NextRequest, ctx: Context) {
    try {
        const { name, collection } = await beforeRequest(req, ctx)

        if (name === "requests") {
            const SECRET = req.headers.get('SECRET')

            if (SECRET !== process.env.SECRET)
                throw new Error("Secret is invalid")
        }

        const body = await req.json()

        const { insertedId } = await collection.insertOne(body)

        return NextResponse.json({ insertedId });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}
