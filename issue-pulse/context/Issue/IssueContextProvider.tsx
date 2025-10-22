"use client"
import React, { useContext, useEffect, useState } from 'react'
import { IssueContext } from './IssueContext'
import { IssueType } from '@/types/types'
import axios from 'axios'
import { latestIssuesRoute } from '@/lib/routeProvider'
import { UserContext } from '../User/UserContext'

const CACHE_KEY = "latest_issues_cache"

const IssueContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [issues, setIssues] = useState<IssueType[]>([]);
    const { user } = useContext(UserContext);

    async function fetchIssues() {
        const response = await axios.get(latestIssuesRoute);
        if (response.data.status) {
            const newIssues = response.data.issues
            setIssues(newIssues);
            localStorage.setItem(CACHE_KEY, JSON.stringify(newIssues));
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


        if (user) {
            fetchIssues()
        }
    }, [user])

    return (
        <IssueContext.Provider value={{ issues, setIssues, fetchIssues }}>
            {children}
        </IssueContext.Provider>
    )
}

export default IssueContextProvider