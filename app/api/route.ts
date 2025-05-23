import { NextRequest, NextResponse } from 'next/server';

type Context = { params: {} }

export async function GET(req: NextRequest, ctx: Context) {
    return NextResponse.json({ date: new Date() });
}
