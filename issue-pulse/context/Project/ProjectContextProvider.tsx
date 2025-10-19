"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ProjectContext } from './ProjectContext'
import { ProjectType } from '@/types/types';
import { UserContext } from '../User/UserContext';
import axios from 'axios';
import { allFavProjectsRoute } from '@/lib/routeProvider';

const ProjectContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [projects, setProjects] = useState<ProjectType[]>([]);
    const { user } = useContext(UserContext);

    async function fetchProjects() {
        const response = await axios.get(allFavProjectsRoute)
        if (response.data.status) {
            setProjects(response.data.projects);
        }
    }

    useEffect(() => {
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