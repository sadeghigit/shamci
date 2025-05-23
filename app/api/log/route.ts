import { mongoDatabase } from '@/app/mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Context = { params: {} }

export async function POST(req: NextRequest, ctx: Context) {

    const SECRET = req.headers.get('SECRET')
    if (SECRET === process.env.SECRET) {
        const db = await mongoDatabase();
        const collection = db.collection("requests")
        collection.insertOne(await req.json())
    }

    return NextResponse.json({});
}
