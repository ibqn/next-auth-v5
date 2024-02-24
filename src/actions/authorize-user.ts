"use server"

import { headers } from "next/headers"

export const authorizeUser = async (
  credentials: Partial<Record<string, unknown>>
) => {
  try {
    const origin = headers().get("x-origin")
    // console.log("origin url", origin)
    const response = await fetch(`${origin}/api/authorize`, {
      body: JSON.stringify(credentials),
      method: "POST",
    })

    if (!response.ok) {
      return null
    }

    const { user } = await response.json()

    return user
  } catch (error) {
    console.error("Error getting user", error)
    return null
  }
}
