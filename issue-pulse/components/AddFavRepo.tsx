"use client"
import React, { useContext, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import axios from 'axios'
import { addFavRepoRoute } from '@/lib/routeProvider'
import { IssueContext } from '@/context/Issue/IssueContext'
import { ProjectContext } from '@/context/Project/ProjectContext'
import { ProjectType } from '@/types/types'

const AddFavRepo = () => {

    const [projectUrl, setProjectUrl] = useState("")
    const { fetchIssues } = useContext(IssueContext);
    const { setProjects } = useContext(ProjectContext);

    async function handleSubmit() {
        try {
            const response = await axios.post(addFavRepoRoute, { projectUrl })

            if (response.data.status) {
                fetchIssues();
                const newProject: ProjectType = response.data.project;
                setProjects(prev => [...prev, newProject]);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Add New Repository</h2>

            <div className="flex gap-3 max-w-2xl">
                <Input
                    placeholder="Enter GitHub Repository URL"
                    onChange={(e) => setProjectUrl(e.target.value)}
                    className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
                />
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-6">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Favorites
                </Button>
            </div>
        </section>
    )
}

export default AddFavRepo