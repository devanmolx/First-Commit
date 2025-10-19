"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { Button } from './ui/button'
import { ExternalLink } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const HeaderComponent = () => {

    const router = useRouter();

    function handleLogout() {
        signOut();
        router.push("/")
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">johndoe</span>
            <Avatar className="w-9 h-9">
                <AvatarImage src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                Sign Out
            </Button>
        </div>
    )
}

export default HeaderComponent