import AddFavRepo from '@/components/AddFavRepo';
import FavouriteRepos from '@/components/FavouriteRepos';
import Header from '@/components/Header';
import LatestIssues from '@/components/LatestIssues';
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/')
    }

    return (
        <div className='min-h-screen bg-slate-950 text-white'>
            <Header user={session.user} />

            <main className="container mx-auto px-6 py-8">

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <p className="text-sm text-slate-400">Last synced 5 minutes ago</p>
                </div>

                <FavouriteRepos />
                <AddFavRepo />
                <LatestIssues />

            </main>
        </div>
    )
}

export default page