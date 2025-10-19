import { BarChart3, Heart, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SignInWithGithubBtn from "@/components/SignInWithGithubBtn";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 bg-slate-900/50 rounded-2xl p-12 border border-slate-800">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-xl mb-6">
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Track your favorite GitHub<br />projects effortlessly.
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Stay updated on the projects you care about with real-time notifications and a streamlined dashboard.
            </p>

            <SignInWithGithubBtn />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-white">Track Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Keep a close eye on your favorite GitHub projects. Get notified about new commits, pull requests, and releases in one centralized dashboard.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4">
                  <Heart className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-white">Manage Favorites</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Easily add or remove repositories from your favorites list. Our intuitive interface makes managing your tracked projects a breeze.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-white">Explore Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Dive into the issues of your tracked repositories. Filter, search, and stay on top of the latest discussions and bug reports.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
