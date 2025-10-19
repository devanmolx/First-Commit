"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

type FilterType = "All" | "Bug" | "Feature" | "UI"

const issues = [
    {
        id: 1,
        title: "Bug in user authentication",
        repo: "Project Alpha",
        tag: "Bug",
        tagColor: "bg-red-500/20 text-red-400",
        author: "Liam Carter",
        authorAvatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
        id: 2,
        title: "Feature request: Dark mode",
        repo: "Project Beta",
        tag: "Feature",
        tagColor: "bg-green-500/20 text-green-400",
        author: "Sophia Bennett",
        authorAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
        id: 3,
        title: "Performance optimization",
        repo: "Project Gamma",
        tag: "Perf",
        tagColor: "bg-yellow-500/20 text-yellow-400",
        author: "Ethan Harper",
        authorAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
]

const LatestIssues = () => {

    const [filter, setFilter] = useState<FilterType>("All")

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
                                <TableCell className="font-medium text-white">{issue.title}</TableCell>
                                <TableCell className="text-slate-400">{issue.repo}</TableCell>
                                <TableCell>
                                    <Badge className={`${issue.tagColor} border-0`}>
                                        {issue.tag}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-400">{issue.author}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </section>
    )
}

export default LatestIssues