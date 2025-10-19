"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const AddFavRepo = () => {

    const [repoUrl, setRepoUrl] = useState("")

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Add New Repository</h2>

            <div className="flex gap-3 max-w-2xl">
                <Input
                    placeholder="Enter GitHub Repository URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Favorites
                </Button>
            </div>
        </section>
    )
}

export default AddFavRepo