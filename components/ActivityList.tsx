import { Activity } from '@/types/types'
import Link from 'next/link';
import React from 'react'
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';
import { format } from 'date-fns';

const ActivityList = ({ activities }: { activities: Activity[] }) => {

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'PushEvent':
                return <GitCommit className="w-4 h-4 text-green-500" />;
            case 'PullRequestEvent':
                return <GitPullRequest className="w-4 h-4 text-blue-500" />;
            case 'IssuesEvent':
                return <GitBranch className="w-4 h-4 text-orange-500" />;
            default:
                return <GitBranch className="w-4 h-4 text-gray-400" />;
        }
    };

    const formatActivityAction = (activity: Activity) => {
        switch (activity.type) {
            case 'PushEvent':
                return `Pushed to ${activity.metadata?.branch || 'a branch'}`;
            case 'PullRequestEvent':
                return `${activity.action} pull request #${activity.metadata?.issueNumber || ''}`;
            case 'IssuesEvent':
                return `${activity.action} issue #${activity.metadata?.issueNumber || ''}`;
            default:
                return activity.action;
        }
    };

    return (
        <>
            {activities.map((activity) => {
                const getActivityUrl = () => {
                    if (activity.metadata?.commit) {
                        return `${activity.repoUrl}/commit/${activity.metadata.commit}`;
                    }
                    if (activity.metadata?.issueNumber) {
                        return `${activity.repoUrl}/issues/${activity.metadata.issueNumber}`;
                    }
                    return activity.repoUrl;
                };

                return (
                    <Link
                        key={activity.id}
                        href={getActivityUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:bg-slate-800/50 rounded-lg transition-colors"
                    >
                        <div className='flex items-start gap-3 p-3 hover:bg-slate-800/50 rounded-lg transition-colors'>
                            <div className='mt-0.5'>{getActivityIcon(activity.type)}</div>
                            <div className='flex-1'>
                                <div className='flex items-center justify-between'>
                                    <span className='font-medium'>{activity.repoName}</span>
                                    <span className='text-xs text-slate-500'>
                                        {format(new Date(activity.createdAt), 'MMM d, yyyy')}
                                    </span>
                                </div>
                                <p className='text-sm text-slate-400'>{formatActivityAction(activity)}</p>
                                {activity.metadata?.commit && (
                                    <span className='text-xs text-slate-500 font-mono'>
                                        {activity.metadata.commit.substring(0, 7)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    )
}

export default ActivityList