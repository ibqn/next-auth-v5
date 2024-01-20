import { UserInfo } from "@/components/user-info"
import { getCurrentUser } from "@/utils/auth"

export default async function ServerPage() {
  const user = await getCurrentUser()

  return <UserInfo label="Server Component" user={user} />
}
