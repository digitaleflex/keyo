import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
        // Delete all users (cascades to Accounts and Sessions)
        const { count: userCount } = await prisma.user.deleteMany();
        // Delete verifications
        const { count: verificationCount } = await prisma.verification.deleteMany();

        return NextResponse.json({
            success: true,
            message: `Database cleaned: Deleted ${userCount} users and ${verificationCount} verifications.`,
            usersDeleted: userCount
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
