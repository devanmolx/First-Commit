"use client"
import React, { useContext, useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { IssueContext } from '@/context/Issue/IssueContext'

type FilterType = "All" | "Bug" | "Feature" | "UI"

const tagColors: Record<string, string> = {
    bug: "bg-red-100 text-red-800",
    enhancement: "bg-green-100 text-green-800",
    documentation: "bg-yellow-100 text-yellow-800",
    default: "bg-gray-100 text-gray-800"
};

const LatestIssues = () => {

    const [filter, setFilter] = useState<FilterType>("All")
    const { issues } = useContext(IssueContext);

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Recent Issues</h2>

                <div className="flex gap-2">
                    {(["All", "Bug", "Feature", "UI"] as FilterType[]).map((filterOption) => (
                        <Button
                            key={filterOption}
                            variant={filter === filterOption ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter(filterOption)}
                            className={
                                filter === filterOption
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "border-slate-700 hover:bg-slate-800 text-slate-300"
                            }
                        >
                            {filterOption}
                        </Button>
                    ))}
                </div>
            </div>

            <Card className="bg-slate-900/50 border-slate-800">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-800 hover:bg-transparent">
                            <TableHead className="text-slate-400">Title</TableHead>
                            <TableHead className="text-slate-400">Repo</TableHead>
                            <TableHead className="text-slate-400">Tags</TableHead>
                            <TableHead className="text-slate-400">Author</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {issues.map((issue) => (
                            <TableRow key={issue.id} className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="font-medium text-white"><a href={issue.url} target='_blank'>{issue.title}</a></TableCell>
                                <TableCell className="text-slate-400"> <a href={`https://github.com/${issue.repoUrl}`} target='_blank'>{issue.repoUrl}</a></TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1 text-sm">
                                        {issue.tags?.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className={`text-xs px-2 py-1 rounded ${tagColors[tag] || tagColors.default}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-400"><a href={`https://github.com/${issue.createdBy}`} target='_blank'>{issue.createdBy}</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </section>
    )
}

export default LatestIssues