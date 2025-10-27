"use client"
import React, { useContext, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { AlertCircle, ExternalLink, Eye, GitBranch, Star } from 'lucide-react'
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

    // Extract owner and repo name from the URL
    const getRepoInfo = (url: string) => {
        const [owner, repo] = url.split('/');
        return { owner, repo };
    };

    // Format number with K suffix
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Favorite Repositories</h2>
                <span className="text-sm text-slate-400">{projects?.length || 0} repositories</span>
            </div>

            {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => {
                        const { owner, repo } = getRepoInfo(project.url);
                        const issueCount = project.issues.length;
                        const stars = Math.floor(Math.random() * 1000); // Mock stars count
                        const forks = Math.floor(Math.random() * 500); // Mock forks count
                        
                        return (
                            <Card 
                                key={project.id} 
                                className="group bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                                                    {owner?.[0]?.toUpperCase()}
                                                </div>
                                                <CardTitle className="text-white text-lg font-semibold line-clamp-1">
                                                    {owner}/<span className="text-blue-400">{repo}</span>
                                                </CardTitle>
                                            </div>
                                            <CardDescription className="text-slate-400 text-sm mt-2 line-clamp-2 min-h-[40px]">
                                                {project.description || 'No description provided'}
                                            </CardDescription>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            asChild
                                        >
                                            <a 
                                                href={`https://github.com/${project.url}`} 
                                                target='_blank'
                                                rel="noopener noreferrer"
                                                aria-label="Open repository on GitHub"
                                            >
                                                <ExternalLink className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
                                            </a>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400" />
                                                {formatNumber(stars)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GitBranch className="w-4 h-4 text-blue-400" />
                                                {formatNumber(forks)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4 text-red-400" />
                                                {issueCount} {issueCount === 1 ? 'Issue' : 'Issues'}
                                            </span>
                                        </div>
                                    </div>
                                    <Button 
                                        onClick={() => handleOpenIssue(project)} 
                                        className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 hover:text-white transition-colors"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Issues
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                    <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <Star className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-200 mb-2">No favorite repositories yet</h3>
                    <p className="text-slate-400 max-w-md mx-auto">Add your favorite GitHub repositories to track their issues and pull requests.</p>
                </div>
            )}

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