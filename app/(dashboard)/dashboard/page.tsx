import LatestIssues from '@/components/LatestIssues';
import { getServerSession } from 'next-auth/next'
import { GitBranch, GitPullRequest, Github, Users } from 'lucide-react'
import { authOptions } from '@/lib/authOptions';
import RecentActivities from '@/components/RecentActivities';

const page = async () => {

    const session = await getServerSession(authOptions);

    const stats = [
        { name: 'Tracked Repos', value: '12', icon: <Github className="w-6 h-6 text-blue-500" />, change: '+2 from last week' },
        { name: 'Open PRs', value: '8', icon: <GitPullRequest className="w-6 h-6 text-green-500" />, change: '+3 from yesterday' },
        { name: 'Active Issues', value: '24', icon: <GitBranch className="w-6 h-6 text-orange-500" />, change: '5 new today' },
        { name: 'Team Members', value: '5', icon: <Users className="w-6 h-6 text-purple-500" />, change: '1 new member' },
    ]

    return (
        <div>
            <main className='flex-1 overflow-y-auto p-6'>
                <div className='bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-slate-800 rounded-2xl p-6 mb-8'>
                    <h2 className='text-2xl font-bold mb-2'>Welcome back, {session?.user.name}</h2>
                    <p className='text-slate-300 max-w-2xl'>
                        Here&apos;s what&apos;s happening with your repositories today. You have 3 new pull requests and 8 issues need your attention.
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {stats.map((stat) => (
                        <div key={stat.name} className='bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors'>
                            <div className='flex items-center justify-between'>
                                <div className='p-2 bg-slate-800 rounded-lg w-10 h-10 flex items-center justify-center'>
                                    {stat.icon}
                                </div>
                                <span className='text-sm text-slate-400'>{stat.change}</span>
                            </div>
                            <h3 className='mt-4 text-slate-400 text-sm'>{stat.name}</h3>
                            <p className='text-2xl font-bold mt-1'>{stat.value}</p>
                        </div>
                    ))}
                </div>
                <RecentActivities />
                <LatestIssues />
            </main>
        </div>
    )
}

export default page