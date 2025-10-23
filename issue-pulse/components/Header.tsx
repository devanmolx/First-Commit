import { Bell, Clock } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

const Header = async () => {
    const session = await getServerSession(authOptions);
    return (
        <header className='bg-slate-900/50 backdrop-blur border-b border-slate-800'>
            <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-2xl font-bold'>Dashboard</h1>
                    <div className='flex items-center gap-2 text-sm text-slate-400'>
                        <Clock className='w-4 h-4' />
                        <span>Last synced 2 minutes ago</span>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <button className='p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white relative'>
                        <Bell className='w-5 h-5' />
                        <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
                    </button>
                    <div className='w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium'>
                        <Image className=' rounded-full' src={session?.user.image || '/avatar.png'} width={32} height={32} alt='User Avatar' />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header