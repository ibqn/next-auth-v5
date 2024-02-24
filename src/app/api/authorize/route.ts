import { signInValidator } from "@/lib/validators"
import { getUserByEmail } from "@/utils/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const body = await request.json()

  const validatedFields = signInValidator.safeParse(body)

  if (!validatedFields.success) {
    return NextResponse.json({}, { status: 403 })
  }

  const { email, password } = validatedFields.data

  const user = await getUserByEmail(email)

  if (!user || !user.password) {
    return NextResponse.json({}, { status: 403 })
  }

  const havePasswordMatch = await bcrypt.compare(password, user.password)

  if (havePasswordMatch) {
    return NextResponse.json({ user })
  }

  return NextResponse.json({}, { status: 403 })
}
