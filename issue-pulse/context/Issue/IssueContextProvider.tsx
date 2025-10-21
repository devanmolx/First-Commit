"use client"
import React, { useContext, useEffect, useState } from 'react'
import { IssueContext } from './IssueContext'
import { IssueType } from '@/types/types'
import axios from 'axios'
import { latestIssuesRoute } from '@/lib/routeProvider'
import { UserContext } from '../User/UserContext'

const IssueContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [issues, setIssues] = useState<IssueType[]>([]);
    const { user } = useContext(UserContext);

    async function fetchIssues() {
        const response = await axios.get(latestIssuesRoute);
        if (response.data.status) {
            setIssues(response.data.issues);
        }
    }

    useEffect(() => {
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