"use client"
import { ActivityContext } from '@/context/Activity/ActivityContext';
import Link from 'next/link';
import React, { useContext } from 'react'
import ActivityList from './ActivityList';

const RecentActivities = () => {
    const { activities } = useContext(ActivityContext);
    const recentActivities = activities.slice(0, 5);

    return (
        <div className='grid grid-cols-1 gap-6'>
            <div className='bg-slate-900/50 border border-slate-800 rounded-2xl p-6'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-lg font-semibold'>Recent Activity</h2>
                    <Link href='/activity' className='text-sm text-blue-400 hover:text-blue-300'>View All</Link>
                </div>
                <div className='space-y-4'>
                    <ActivityList activities={recentActivities} />
                </div>
            </div>
        </div>
    )
}

export default RecentActivities