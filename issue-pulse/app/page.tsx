import { BarChart3, Heart, MessageCircle, Github, Twitter, Linkedin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SignInWithGithubBtn from "@/components/SignInWithGithubBtn";

export default function Home() {
  return (
    <div className=" w-screen">
      <div className="container mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl mb-8 animate-pulse">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-extrabold mb-4 leading-tight max-w-4xl">
          Track your favorite GitHub projects effortlessly
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mb-10">
          Stay updated on the projects you care about with real-time notifications and a streamlined dashboard.
        </p>
        <SignInWithGithubBtn />
      </div>

      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 max-w-6xl">
        {[
          {
            icon: <BarChart3 className="w-8 h-8 text-blue-400 transition-transform duration-300 group-hover:scale-110" />,
            title: "Track Projects",
            description: "Keep a close eye on your favorite GitHub projects. Get notified about new commits, pull requests, and releases in one centralized dashboard.",
          },
          {
            icon: <Heart className="w-8 h-8 text-pink-400 transition-transform duration-300 group-hover:scale-110" />,
            title: "Manage Favorites",
            description: "Easily add or remove repositories from your favorites list. Our intuitive interface makes managing your tracked projects a breeze.",
          },
          {
            icon: <MessageCircle className="w-8 h-8 text-green-400 transition-transform duration-300 group-hover:scale-110" />,
            title: "Explore Issues",
            description: "Dive into the issues of your tracked repositories. Filter, search, and stay on top of the latest discussions and bug reports.",
          },
        ].map(({ icon, title, description }) => (
          <Card key={title} className="bg-slate-900/70 border border-slate-700 group hover:bg-slate-800/90 transition-colors duration-300">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl mb-4">
                {icon}
              </div>
              <CardTitle className="text-white text-xl font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                {description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-slate-900/80 mt-16 py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-4xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="p-6 bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <BarChart3 className="mx-auto mb-4 w-12 h-12 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-2">Connect Your GitHub</h3>
              <p className="text-slate-300">Sign in with your GitHub account to start tracking your favorite repositories.</p>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Heart className="mx-auto mb-4 w-12 h-12 text-pink-500" />
              <h3 className="text-2xl font-semibold mb-2">Manage Favorites</h3>
              <p className="text-slate-300">Add or remove repositories from your favorites list with ease.</p>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <MessageCircle className="mx-auto mb-4 w-12 h-12 text-green-500" />
              <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-slate-300">Receive real-time notifications about commits, pull requests, and issues.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>
        <div className="space-y-8">
          <blockquote className="bg-slate-800 p-8 rounded-lg shadow-lg italic text-slate-300">
            This tool has transformed how I manage my GitHub projects. Real-time updates keep me in the loop without the hassle.
            <footer className="mt-4 font-semibold text-white">- Jane Doe, Developer</footer>
          </blockquote>
          <blockquote className="bg-slate-800 p-8 rounded-lg shadow-lg italic text-slate-300">
            A must-have for any serious GitHub user. The dashboard is intuitive and the notifications are spot on.
            <footer className="mt-4 font-semibold text-white">- John Smith, Open Source Contributor</footer>
          </blockquote>
        </div>
      </section>

      <footer className="bg-slate-900/90 py-8 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center max-w-6xl">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold">IssuePulse</h3>
            <p className="text-slate-400">Stay connected with your favorite projects.</p>
          </div>
          <div className="flex space-x-6 text-slate-400">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition-colors duration-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
