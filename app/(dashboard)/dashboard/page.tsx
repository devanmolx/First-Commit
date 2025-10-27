import LatestIssues from '@/components/LatestIssues';
import { getServerSession } from 'next-auth/next'
import { GitBranch, GitPullRequest, Github, Settings, Star, Users } from 'lucide-react'
import { authOptions } from '@/lib/authOptions';

const page = async () => {

    const session = await getServerSession(authOptions);

    const stats = [
        { name: 'Tracked Repos', value: '12', icon: <Github className="w-6 h-6 text-blue-500" />, change: '+2 from last week' },
        { name: 'Open PRs', value: '8', icon: <GitPullRequest className="w-6 h-6 text-green-500" />, change: '+3 from yesterday' },
        { name: 'Active Issues', value: '24', icon: <GitBranch className="w-6 h-6 text-orange-500" />, change: '5 new today' },
        { name: 'Team Members', value: '5', icon: <Users className="w-6 h-6 text-purple-500" />, change: '1 new member' },
    ]

    const recentActivity = [
        { id: 1, repo: 'issue-pulse', action: 'New commit pushed', time: '2 minutes ago', icon: <GitBranch className="w-5 h-5 text-green-500" /> },
        { id: 2, repo: 'api-service', action: 'PR #42 merged', time: '1 hour ago', icon: <GitPullRequest className="w-5 h-5 text-blue-500" /> },
        { id: 3, repo: 'web-app', action: 'New issue reported', time: '3 hours ago', icon: <GitBranch className="w-5 h-5 text-orange-500" /> },
        { id: 4, repo: 'mobile-app', action: 'New release v1.2.0', time: '1 day ago', icon: <Star className="w-5 h-5 text-yellow-500" /> },
    ]

    return (
        <div>
            {/* <Header /> */}
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
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-lg font-semibold'>Recent Activity</h2>
                            <button className='text-sm text-blue-400 hover:text-blue-300'>View All</button>
                        </div>
                        <div className='space-y-4'>
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className='flex items-start gap-3 p-3 hover:bg-slate-800/50 rounded-lg transition-colors'>
                                    <div className='mt-0.5'>{activity.icon}</div>
                                    <div className='flex-1'>
                                        <div className='flex items-center justify-between'>
                                            <span className='font-medium'>{activity.repo}</span>
                                            <span className='text-xs text-slate-500'>{activity.time}</span>
                                        </div>
                                        <p className='text-sm text-slate-400'>{activity.action}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='bg-slate-900/50 border border-slate-800 rounded-2xl p-6'>
                            <h2 className='text-lg font-semibold mb-4'>Quick Actions</h2>
                            <div className='space-y-3'>
                                <button className='w-full flex items-center gap-3 px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-400 transition-colors'>
                                    <Github className='w-5 h-5' />
                                    Add Repository
                                </button>
                                <button className='w-full flex items-center gap-3 px-4 py-3 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700 rounded-lg text-slate-300 transition-colors'>
                                    <Users className='w-5 h-5' />
                                    Invite Team Member
                                </button>
                                <button className='w-full flex items-center gap-3 px-4 py-3 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700 rounded-lg text-slate-300 transition-colors'>
                                    <Settings className='w-5 h-5' />
                                    Configure Webhooks
                                </button>
                            </div>
                        </div>

                        <div className='bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-slate-800 rounded-2xl p-6'>
                            <h2 className='text-lg font-semibold mb-2'>Need help?</h2>
                            <p className='text-sm text-slate-400 mb-4'>Check out our documentation or contact support for assistance.</p>
                            <button className='w-full py-2 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-colors'>
                                Get Help
                            </button>
                        </div>
                    </div>
                </div>
                <LatestIssues />

            </main>
        </div>
    )
}

export default page