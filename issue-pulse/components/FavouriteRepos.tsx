"use client"
import React, { useContext, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { AlertCircle, ExternalLink, Eye, Heart } from 'lucide-react'
import { ProjectContext } from '@/context/Project/ProjectContext'
import { ProjectType } from '@/types/types'
import IssuesModal from './IssueModel'

const Favouriteprojects = () => {

    const { projects } = useContext(ProjectContext);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    function handleOpenIssue(project: ProjectType) {
        setSelectedProject(project);
        setOpen(true);
    }

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Favorite repositories</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                {projects && projects.map((project) => (
                    <Card key={project.id} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-white text-lg">{project.url}</CardTitle>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 cursor-pointer">
                                    <a href={`https://github.com/${project.url}`} target='_blank'>
                                        <ExternalLink className="w-4 h-4 text-slate-400" />
                                    </a>
                                </Button>
                            </div>
                            <CardDescription className="text-slate-400 text-sm">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <AlertCircle className="w-4 h-4 text-blue-500" />
                                <span className="text-slate-400">{project.issues.length} Issues</span>
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={() => { handleOpenIssue(project) }} className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Issues
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {selectedProject && (
                <IssuesModal
                    open={open}
                    onClose={() => setOpen(false)}
                    projectName={selectedProject.url}
                    issues={selectedProject.issues}
                />
            )}
        </section>
    )
}

export default Favouriteprojects