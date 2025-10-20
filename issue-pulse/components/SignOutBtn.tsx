"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignOutBtn = () => {

    const router = useRouter();

    function handleLogout() {
        signOut();
        router.push("/")
    }

    return (
        <Button onClick={handleLogout} variant="ghost" size="sm" className=" cursor-pointer text-slate-400">
            Sign Out
        </Button>
    )
}

export default SignOutBtn