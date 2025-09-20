"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

// This file defines a customizable Avatar component using Radix UI's Avatar primitives, 
// with Tailwind CSS classes for styling. It exports three components:
// - Avatar: the root container,
// - AvatarImage: displays the avatar image,
// - AvatarFallback: a fallback UI (e.g. initials) shown when the image fails to load.
// Utility function `cn` is used to merge class names.

function Avatar({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
    return (
        <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
            "relative flex size-8 shrink-0 overflow-hidden rounded-full",
            className
        )}
        {...props}
        />
    )
}

function AvatarImage({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
    return (
        <AvatarPrimitive.Image
            data-slot="avatar-image"
            className={cn("aspect-square size-full", className)}
            {...props}
        />
    )
}

function AvatarFallback({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
    return (
        <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className={cn(
            "bg-muted flex size-full items-center justify-center rounded-full",
            className
        )}
        {...props}
        />
    )
}

export { Avatar, AvatarImage, AvatarFallback }