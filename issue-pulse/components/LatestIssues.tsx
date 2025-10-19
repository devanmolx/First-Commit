"use client"
import React, { useContext, useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { IssueContext } from '@/context/Issue/IssueContext'

type FilterType = "All" | "Bug" | "Feature" | "UI"

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
                            {/* <TableHead className="text-slate-400">Repo</TableHead>
                            <TableHead className="text-slate-400">Tags</TableHead> */}
                            <TableHead className="text-slate-400">Author</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {issues.map((issue) => (
                            <TableRow key={issue.id} className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="font-medium text-white">{issue.title}</TableCell>
                                {/* <TableCell className="text-slate-400">{issue}</TableCell> */}
                                {/* <TableCell>
                                    <Badge className={`${issue.tagColor} border-0`}>
                                        {issue.tag}
                                    </Badge>
                                </TableCell> */}
                                <TableCell className="text-slate-400">{issue.createdBy}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </section>
    )
}

export default LatestIssues