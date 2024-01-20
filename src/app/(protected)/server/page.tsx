import { UserInfo } from "@/components/user-info"
import { currentUser } from "@/utils/auth"

export default async function ServerPage() {
  const user = await currentUser()

  return <UserInfo label="Server Component" user={user} />
}
