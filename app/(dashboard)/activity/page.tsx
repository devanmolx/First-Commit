"use client"
import { Activity } from '@/types/types';
import { Search, Filter, Clock, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ActivityContext } from '@/context/Activity/ActivityContext';
import { useContext } from 'react';
import ActivityList from '@/components/ActivityList';

const ActivityPage = () => {
    const { activities } = useContext(ActivityContext);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [timeRange, setTimeRange] = useState<string>('all');

    useEffect(() => {
        let result = [...activities];

        if (selectedType !== 'all') {
            result = result.filter(activity => activity.type === selectedType);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(activity =>
                activity.repoName.toLowerCase().includes(query) ||
                (activity.metadata?.title?.toLowerCase()?.includes(query) ?? false)
            );
        }

        if (timeRange !== 'all') {
            const now = new Date();
            const days = parseInt(timeRange);
            result = result.filter(activity => {
                const activityDate = new Date(activity.createdAt);
                const diffTime = Math.abs(now.getTime() - activityDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= days;
            });
        }

        setFilteredActivities(result);
    }, [activities, searchQuery, selectedType, timeRange]);

    return (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Activity Feed</h1>
                <p className="text-slate-400">Track all activities across your repositories</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 w-full text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search activities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5">
                            <Filter className="h-4 w-4 text-slate-400 mr-2" />
                            <select
                                className="bg-slate-800 text-sm focus:outline-none focus:ring-0 border-0 p-0"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="all">All Activity</option>
                                <option value="PushEvent">Commits</option>
                                <option value="PullRequestEvent">Pull Requests</option>
                                <option value="IssuesEvent">Issues</option>
                            </select>
                        </div>

                        <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5">
                            <Clock className="h-4 w-4 text-slate-400 mr-2" />
                            <select
                                className="bg-slate-800 text-sm focus:outline-none focus:ring-0 border-0 p-0"
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                            >
                                <option value="all">All Time</option>
                                <option value="1">Last 24 hours</option>
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                            </select>
                        </div>

                        <button
                            className="flex items-center bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg px-3 py-1.5 text-sm transition-colors"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2`} />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="space-y-4">
                    {filteredActivities.length > 0 && <ActivityList activities={filteredActivities} />}
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;