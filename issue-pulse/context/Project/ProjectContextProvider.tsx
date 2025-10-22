"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ProjectContext } from './ProjectContext'
import { ProjectType } from '@/types/types';
import { UserContext } from '../User/UserContext';
import axios from 'axios';
import { allFavProjectsRoute } from '@/lib/routeProvider';

const CACHE_KEY = "fav_projects_cache"

const ProjectContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [projects, setProjects] = useState<ProjectType[]>([]);
    const { user } = useContext(UserContext);

    async function fetchProjects() {
        const response = await axios.get(allFavProjectsRoute)
        if (response.data.status) {
            const newProjects = response.data.projects;
            setProjects(newProjects);
            localStorage.setItem(CACHE_KEY, JSON.stringify(newProjects));
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

        if (user) {
            fetchProjects()
        }
    }, [user])

    return (
        <ProjectContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider