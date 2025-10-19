import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { ExternalLink, Target } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const Header = () => {
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
                    <span className="text-sm text-slate-400">johndoe</span>
                    <Avatar className="w-9 h-9">
                        <AvatarImage src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header