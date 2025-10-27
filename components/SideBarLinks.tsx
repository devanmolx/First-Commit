"use client"
import { Clock, Github, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBarLinks = () => {

    const pathname = usePathname();

    return (
        <nav className='space-y-2'>
            <Link href="/dashboard" className={pathname === "/dashboard" ? 'flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-blue-400 font-medium' : 'flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors'}>
                <LayoutDashboard className='w-5 h-5' />
                Dashboard
            </Link>
            <Link href="/repositories" className={pathname === "/repositories" ? 'flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-blue-400 font-medium' : 'flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors'}>
                <Github className='w-5 h-5' />
                Repositories
            </Link>
            <Link href="/activity" className={pathname === "/activity" ? 'flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-blue-400 font-medium' : 'flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors'}>
                <Clock className='w-5 h-5' />
                Activity
            </Link>
            {/* <Link href="/settings" className={pathname === "/settings" ? 'flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-blue-400 font-medium' : 'flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors'}>
                <Settings className='w-5 h-5' />
                Settings
            </Link> */}
        </nav>
    )
}

export default SideBarLinks