import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { AlertCircle, ExternalLink, Eye, Heart } from 'lucide-react'

const repositories = [
    {
        id: 1,
        name: "Project Alpha",
        description: "A comprehensive project management tool.",
        issues: 12,
        isFavorite: true,
    },
    {
        id: 2,
        name: "Project Beta",
        description: "A collaborative coding platform.",
        issues: 5,
        isFavorite: true,
    },
    {
        id: 3,
        name: "Project Gamma",
        description: "An AI-powered code assistant.",
        issues: 23,
        isFavorite: true,
    },
]


const FavouriteRepos = () => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Favorite Repositories</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                {repositories.map((repo) => (
                    <Card key={repo.id} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-white text-lg">{repo.name}</CardTitle>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2">
                                    <ExternalLink className="w-4 h-4 text-slate-400" />
                                </Button>
                            </div>
                            <CardDescription className="text-slate-400 text-sm">
                                {repo.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <AlertCircle className="w-4 h-4 text-blue-500" />
                                <span className="text-slate-400">{repo.issues} Issues</span>
                            </div>

                            <div className="flex gap-2">
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Issues
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-slate-700 hover:bg-slate-800"
                                >
                                    <Heart className="w-4 h-4 fill-current text-slate-400" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default FavouriteRepos