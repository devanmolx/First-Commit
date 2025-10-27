"use client"
import React, { useEffect, useState } from 'react'
import { ProjectContext } from './ProjectContext'
import { ProjectType } from '@/types/types';
import axios from 'axios';
import { allFavProjectsRoute } from '@/lib/routeProvider';

const CACHE_KEY = "fav_projects_cache"

const ProjectContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [projects, setProjects] = useState<ProjectType[]>([]);

    async function fetchProjects() {
        try {
            const response = await axios.get(allFavProjectsRoute)
            if (response.data.status) {
                const newProjects = response.data.projects;
                setProjects(newProjects);
                localStorage.setItem(CACHE_KEY, JSON.stringify(newProjects));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const cached = localStorage.getItem(CACHE_KEY)

        if (cached) {
            try {
                setProjects(JSON.parse(cached))
                console.log(projects)
            } catch {
                localStorage.removeItem(CACHE_KEY)
            }
        }

        fetchProjects()
    }, [])

    return (
        <ProjectContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider