import { Target } from 'lucide-react'
import React from 'react'
import SignOutBtn from './SignOutBtn'
import { UserType } from '@/types/types'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const Header = ({ user }: { user: UserType }) => {
    return (
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-semibold">RepoTrack</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">{user.name}</span>
                    {
                        user.image &&
                        <Avatar className="w-9 h-9 rounded-full overflow-hidden">
                            <AvatarImage src={user.image} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    }
                    <SignOutBtn />
                </div>
            </div>
        </header>
    )
}

export default Header