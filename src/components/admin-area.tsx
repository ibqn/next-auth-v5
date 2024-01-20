"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"
import { toast } from "sonner"

type Props = {}

export const AdminArea = (props: Props) => {
  const handleAdmin = async () => {
    try {
      const response = await fetch("/api/admin")
      if (response.ok) {
        toast("Test call succeeded")
        return
      }
    } catch (error) {
      console.error(error)
    }

    toast("Test call failed")
  }
  const handleServerAction = () => {}

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <div className="flex flex-row items-center gap-x-2">
          <ShieldCheck size={30} />
          <p className="text-center text-2xl font-semibold">Admin</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={handleAdmin}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={handleServerAction}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}
