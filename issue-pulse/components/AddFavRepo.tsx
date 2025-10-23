"use client"
import React, { useContext, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, Github, Loader2, Check } from 'lucide-react';
import axios from 'axios';
import { addFavRepoRoute } from '@/lib/routeProvider';
import { IssueContext } from '@/context/Issue/IssueContext';
import { ProjectContext } from '@/context/Project/ProjectContext';
import { ProjectType } from '@/types/types';
// import { useToast } from '@/components/ui/use-toast';

const AddFavRepo = () => {
    const [projectUrl, setProjectUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { fetchIssues } = useContext(IssueContext);
    const { setProjects } = useContext(ProjectContext);
    // const { toast } = useToast();

    const isValidGitHubUrl = (url: string) => {
        const githubRegex = /^https?:\/\/github\.com\/[^\s/]+\/[^\s/]+\/?$/;
        return githubRegex.test(url);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!projectUrl.trim()) {
            setError('Please enter a GitHub repository URL');
            return;
        }

        if (!isValidGitHubUrl(projectUrl)) {
            setError('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(addFavRepoRoute, { projectUrl });

            if (response.data.status) {
                setIsSuccess(true);
                fetchIssues();
                const newProject: ProjectType = response.data.project;
                setProjects(prev => [...prev, newProject]);
                setProjectUrl("");

                // toast({
                //     title: "Repository added",
                //     description: "The repository has been added to your favorites.",
                // });

                // Reset success state after 3 seconds
                setTimeout(() => setIsSuccess(false), 3000);
            }
        } catch (error) {
            console.error(error);
            setError("'Failed to add repository. Please try again.'");

            // toast({
            //     title: "Error",
            //     description: errorMessage,
            //     variant: "destructive",
            // });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section
            className="mb-12 p-6 bg-gradient-to-br from-slate-900/50 to-slate-900/30 rounded-xl border border-slate-800/50 shadow-lg"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Github className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Add New Repository
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                type="text"
                                value={projectUrl}
                                onChange={(e) => setProjectUrl(e.target.value)}
                                placeholder="https://github.com/username/repository"
                                className="pl-10 bg-slate-800/30 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all duration-200 h-12"
                                disabled={isLoading}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="h-12 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-80 disabled:pointer-events-none"
                            disabled={isLoading || isSuccess}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                </>
                            ) : isSuccess ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Added!
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Repository
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <p className="text-sm text-slate-400 mt-2">
                    Enter the full URL of a GitHub repository to start tracking its issues.
                </p>
            </form>
        </section>
    )
}

export default AddFavRepo