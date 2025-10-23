"use client"
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { IssueType } from '@/types/types';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, AlertCircle, Github, User } from 'lucide-react';

const tagColors = [
    'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'bg-pink-500/10 text-pink-400 border-pink-500/20',
    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'bg-amber-500/10 text-amber-400 border-amber-500/20'
];

const LatestIssuesTable = ({ issues }: { issues: IssueType[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const issuesPerPage = 8;

    const indexOfLastIssue = currentPage * issuesPerPage;
    const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
    const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);
    const totalPages = Math.max(1, Math.ceil(issues.length / issuesPerPage));

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const formatDate = (dateInput: string | Date) => {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    const getTagColor = (tag: string) => {
        const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return tagColors[hash % tagColors.length];
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-blue-400" />
                        {issues.length} total issues
                    </span>
                    <span className="mx-2">•</span>
                    <span>Showing {currentIssues.length} of {issues.length}</span>
                </div>
            </div>

            <Card className="bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <Table className="w-full table-fixed">
                        <TableHeader className="bg-slate-900/50">
                            <TableRow className="border-b border-slate-800 hover:bg-transparent">
                                <TableHead className="w-[55%] text-slate-300 font-medium pl-6">Issue</TableHead>
                                <TableHead className="w-[30%] text-slate-300 font-medium">Repository</TableHead>
                                <TableHead className="w-[15%] text-slate-300 font-medium text-right pr-6">Created</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-slate-800/50">
                            {currentIssues.length > 0 ? (
                                currentIssues.map((issue) => {
                                    return (
                                        <TableRow
                                            key={issue.id}
                                            className="border-0 hover:bg-slate-800/30 transition-colors group"
                                        >
                                            <TableCell className="py-4 pl-6 w-[55%] overflow-hidden">
                                                <div className="flex flex-col">
                                                    <a
                                                        href={issue.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-white font-medium hover:text-blue-400 transition-colors line-clamp-1"
                                                    >
                                                        {issue.title}
                                                    </a>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="flex items-center gap-1 text-xs text-slate-400">
                                                            <User className="w-3 h-3" />
                                                            {issue.createdBy}
                                                        </span>
                                                        {issue.tags?.slice(0, 2).map((tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)} border`}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {issue.tags?.length > 2 && (
                                                            <span className="text-xs text-slate-500">+{issue.tags.length - 2} more</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="w-[30%] overflow-hidden">
                                                <a
                                                    href={`https://github.com/${issue.repoUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors"
                                                >
                                                    <Github className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate block w-full">
                                                        {issue.repoUrl}
                                                    </span>
                                                </a>
                                            </TableCell>
                                            <TableCell className="w-[15%] text-slate-400 text-sm text-right pr-6 overflow-hidden">
                                                {formatDate(issue.createdAt)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-12 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <AlertCircle className="w-10 h-10 text-slate-500" />
                                            <p className="text-slate-400">No issues found</p>
                                            <p className="text-sm text-slate-500">Start by adding some repositories to track</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:border-slate-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Show pages around current page
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? 'default' : 'ghost'}
                                    size="sm"
                                    className={`w-8 h-8 p-0 ${currentPage === pageNum ? 'bg-blue-600' : 'text-slate-400 hover:bg-slate-800/50'}`}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <span className="mx-1 text-slate-500">...</span>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="flex items-center gap-2 border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:border-slate-600 transition-colors"
                    >
                        Next
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LatestIssuesTable;