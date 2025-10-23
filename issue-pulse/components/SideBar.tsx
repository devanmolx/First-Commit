import { BarChart3 } from 'lucide-react'
import React from 'react'
import SideBarLinks from './SideBarLinks'

const SideBar = () => {
    return (
        <aside className='fixed top0 left-0 h-screen z-10 w-64 bg-slate-900/80 border-r border-slate-800 p-6 hidden md:block'>
            <div className='flex items-center gap-3 mb-10'>
                <div className='w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center'>
                    <BarChart3 className='w-5 h-5 text-white' />
                </div>
                <span className='text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>DevTrack</span>
            </div>

            <SideBarLinks />
        </aside>
    )
}

export default SideBar