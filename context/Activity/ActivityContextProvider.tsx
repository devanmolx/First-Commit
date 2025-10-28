"use client"
import React, { useEffect, useState } from 'react'
import { ActivityContext } from './ActivityContext'
import { Activity } from '@/types/types';
import { latestActivitiesRoute } from '@/lib/routeProvider';
import axios from 'axios';

const CACHE_KEY = "activities_cache"

const ActivityContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [activities, setActivities] = useState<Activity[]>([]);

    async function fetchActivities() {
        try {
            const response = await axios.get(latestActivitiesRoute);
            if (response.data.status) {
                const newActivities = response.data.activities
                setActivities(newActivities);
                localStorage.setItem(CACHE_KEY, JSON.stringify(newActivities));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY)

        if (cached) {
            try {
                setActivities(JSON.parse(cached))
            } catch {
                localStorage.removeItem(CACHE_KEY)
            }
        }

        fetchActivities()
    }, [])

    return (
        <ActivityContext.Provider value={{ activities, setActivities }}>
            {children}
        </ActivityContext.Provider>
    )
}

export default ActivityContextProvider