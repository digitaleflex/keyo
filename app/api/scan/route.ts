import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { score, details, type = "GLOBAL" } = body;

        const scan = await db.scanResult.create({
            data: {
                userId: session.user.id,
                score,
                type,
                details: details || {},
            },
        });

        return NextResponse.json(scan);
    } catch (error) {
        return NextResponse.json({ error: "Failed to save scan" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const latestScan = await db.scanResult.findFirst({
            where: {
                userId: session.user.id,
                type: "GLOBAL"
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(latestScan || { score: null });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch scan" }, { status: 500 });
    }
}
