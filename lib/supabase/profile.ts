import { createClient } from "./client"
import { Profile } from "@/types/profile"

export async function getProfile(): Promise<Profile | null> {
  const supabase = createClient()

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .single()

  return data
}

export async function updateProfile(profile: Profile): Promise<void> {
  const supabase = createClient()

  await supabase
    .from("profiles")
    .update(profile)
    .eq("id", profile.id)
}
