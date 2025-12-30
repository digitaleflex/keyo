"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideIcon } from "lucide-react"

interface InputFieldProps {
    id: string
    label: string
    type: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    icon: LucideIcon
}

export function InputField({ id, label, type, placeholder, value, onChange, icon: Icon }: InputFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-xs font-medium text-muted-foreground ml-1">{label}</Label>
            <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 rounded-lg">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Icon className="h-4 w-4" />
                </div>
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className="bg-white/5 border-white/10 pl-9 h-11 focus-visible:ring-0 focus-visible:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                />
            </div>
        </div>
    )
}
