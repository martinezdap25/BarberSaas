"use client"

import { useEffect, useState } from "react"
import { getProfile, updateProfile } from "@/lib/supabase/profile"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Profile } from "@/types/profile"

export default function ProfileForm() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)

    useEffect(() => {
        loadProfile()
    }, [])

    async function loadProfile() {
        setLoading(true)

        const data = await getProfile()
        setProfile(data)

        setLoading(false)
    }

    async function handleSave() {
        if (!profile) return
        setSaving(true)

        try {
            await updateProfile(profile)
            alert("Datos guardados 🤙")
        } catch (err) {
            console.error(err)
            alert("Hubo un error guardando")
        }

        setSaving(false)
    }

    if (loading || !profile) return <div>Cargando perfil...</div>

    return (
        <div className="flex justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Nombre */}
                    <div className="grid gap-2">
                        <Label>Nombre</Label>
                        <Input
                            value={profile.full_name ?? ""}
                            onChange={(e) =>
                                setProfile({ ...profile, full_name: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <Label>Rol</Label>
                        <Input
                            value={profile.role ?? ""}
                            disabled
                            onChange={(e) =>
                                setProfile({ ...profile, role: e.target.value })
                            }
                        />
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}