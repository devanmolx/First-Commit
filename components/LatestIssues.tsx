"use client"
import React, { useContext } from 'react'
import { IssueContext } from '@/context/Issue/IssueContext'
import LatestIssuesTable from './LatestIssuesTable'

const LatestIssues = () => {

    const { issues } = useContext(IssueContext);

    return (
        <section>
            <div className="flex items-center justify-between mb-6 mt-5">
                <h2 className="text-2xl font-semibold">Recent Issues</h2>
            </div>

            <LatestIssuesTable issues={issues} />
        </section>
    )
}

export default LatestIssues