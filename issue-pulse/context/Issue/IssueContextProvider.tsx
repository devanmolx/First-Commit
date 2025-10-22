"use client"
import React, { useEffect, useState } from 'react'
import { IssueContext } from './IssueContext'
import { IssueType } from '@/types/types'
import axios from 'axios'
import { latestIssuesRoute } from '@/lib/routeProvider'

const CACHE_KEY = "latest_issues_cache"

const IssueContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [issues, setIssues] = useState<IssueType[]>([]);

    async function fetchIssues() {
        try {

            const response = await axios.get(latestIssuesRoute);
            if (response.data.status) {
                const newIssues = response.data.issues
                setIssues(newIssues);
                localStorage.setItem(CACHE_KEY, JSON.stringify(newIssues));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY)

        if (cached) {
            try {
                setIssues(JSON.parse(cached))
            } catch {
                localStorage.removeItem(CACHE_KEY)
            }
        }


        fetchIssues()
    }, [])

    return (
        <IssueContext.Provider value={{ issues, setIssues, fetchIssues }}>
            {children}
        </IssueContext.Provider>
    )
}

export default IssueContextProvider