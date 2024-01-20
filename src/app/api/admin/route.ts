import { getCurrentRole } from "@/utils/auth"
import { UserRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
  const role = await getCurrentRole()

  if (role !== UserRole.ADMIN) {
    return NextResponse.json({}, { status: 403 })
  }

  return NextResponse.json({ message: "ok" })
}
