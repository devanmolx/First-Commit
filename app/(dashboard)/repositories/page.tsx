import React from 'react';
import { GitBranch, Search, Star } from 'lucide-react';
import AddFavRepo from '@/components/AddFavRepo';
import Favouriteprojects from '@/components/FavouriteRepos';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RepositoriesPage = () => {
    // const [searchQuery, setSearchQuery] = useState('');
    // const [activeTab, setActiveTab] = useState('all');

    // Mock stats for the header
    const stats = [
        { name: 'Total Repositories', value: '24', icon: <GitBranch className="w-5 h-5 text-blue-500" />, change: '+3 from last month' },
        { name: 'Total Stars', value: '1.2k', icon: <Star className="w-5 h-5 text-yellow-500" />, change: '+120 this month' },
    ];

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex'>
            <main className='flex-1 overflow-y-auto w-full'>
                <div className='border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm w-full'>
                    <div className='w-full px-4 sm:px-6 lg:px-8 py-6 mx-auto'>
                        <div className='flex justify-between items-start sm:items-center gap-4'>
                            <div>
                                <h1 className='text-2xl font-bold'>Repositories</h1>
                                <p className='text-slate-400 mt-1'>Manage and track your favorite GitHub repositories</p>
                            </div>
                        </div>
                        {/* Stats */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8'>
                            {stats.map((stat, index) => (
                                <div key={index} className='bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors'>
                                    <div className='flex items-center justify-between'>
                                        <div className='p-2 bg-slate-700/50 rounded-lg'>
                                            {stat.icon}
                                        </div>
                                        <span className='text-xs text-slate-400'>{stat.change}</span>
                                    </div>
                                    <h3 className='text-slate-400 text-sm mt-3'>{stat.name}</h3>
                                    <p className='text-xl font-bold mt-1'>{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >

                <div className=' my-5'>
                    <AddFavRepo />
                </div>

                {/* Page Content */}
                <div className='w-full px-4 sm:px-6 lg:px-8 py-8 mx-auto'>
                    {/* Search and Filter Bar */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
                        <div className='relative flex-1'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500' />
                            <Input
                                type='text'
                                placeholder='Search repositories...'
                                className='pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all duration-200 h-10'
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Tabs
                            defaultValue="all"
                            className="w-full sm:w-auto"
                        // onValueChange={setActiveTab}
                        >
                            <TabsList className="bg-slate-800/50 border border-slate-700/50 h-10">
                                <TabsTrigger value="all" className="px-4">All</TabsTrigger>
                                <TabsTrigger value="favorites" className="px-4">Favorites</TabsTrigger>
                                <TabsTrigger value="recent" className="px-4">Recent</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div >

                    {/* Repositories Grid */}
                    <div className='w-full space-y-6'>
                        <Favouriteprojects />
                    </div>
                </div>
            </main >
        </div >
    );
};

export default RepositoriesPage;