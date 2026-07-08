"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Server, Boxes, Zap, ArrowRight, Activity, Users, Lock, ChevronRight, BarChart } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();




  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#0a0a0a] text-zinc-50 font-sans selection:bg-rose-500/30 overflow-hidden relative">
      {/* Falling Light Background Effect */}
      <div className="absolute top-0 inset-x-0 h-200 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-rose-500/10 via-rose-500/5 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 bg-rose-500/20 blur-[120px] rounded-full opacity-50"></div>
      </div>

      {/* First Screen Container */}
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="w-full flex items-center justify-between px-6 py-6 max-w-7xl mx-auto z-50 border-b border-white/5">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-6 h-6 border-2 border-white rounded-1 flex items-center justify-center">
               <div className="w-2 h-2 bg-rose-500 rounded-[1px]"></div>
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white">PORTLINE</span>
          </div>
          <div className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Platform</a>
            <a href="#roadmaps" className="hover:text-white transition-colors">Roadmaps</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </div>
          <div className="flex items-center justify-end gap-4 flex-1">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors hidden md:block"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
            >
              Start learning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 flex-1 flex flex-col items-center justify-center max-w-250 mx-auto w-full text-center relative z-10 pb-20">
          
          <div className="group inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-zinc-300 text-sm font-medium mb-8 backdrop-blur-md transition-all cursor-pointer shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
            <span className="flex items-center justify-center bg-rose-500 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.4)]">
              Beta
            </span>
            <span className="text-xs tracking-wide text-zinc-200 group-hover:text-white transition-colors">Portline is now available</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
          </div>
          
          <h1 className="text-6xl md:text-[6rem] font-semibold tracking-tighter mb-8 leading-[1.05] text-white">
            Master any skill.<br />
            <span className="text-zinc-500">Together.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-light">
            Create structured roadmaps, invite your peers, and track your progress in real-time. 
            The beautifully engineered platform for developer study groups.
          </p>

          <div className="flex items-center gap-4 flex-col sm:flex-row w-full sm:w-auto">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 text-sm font-medium bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-all shadow-[0_0_40px_rgba(225,29,72,0.4)]"
            >
              Get started for free
            </Link>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 text-sm font-medium text-white border border-white/10 rounded-full hover:bg-white/5 transition-colors">
              Explore features
            </a>
          </div>
        </section>
      </div>


      {/* Features Section */}
      <section id="features" className="py-32 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white tracking-tighter leading-[1.1]">The ultimate standard in collaborative learning.</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light">Portline combines your roadmaps, progress tracking, and team activity into a single, beautifully engineered ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Activity className="w-5 h-5 text-white" />}
              title="Real-time Sync"
              description="Progress updates are broadcasted instantly to all members in your study group via Firestore infrastructure."
            />
            <FeatureCard 
              icon={<Boxes className="w-5 h-5 text-white" />}
              title="Structured Roadmaps"
              description="Deploy curated curriculums like DSA or System Design, directly integrated into your room's timeline."
            />
            <FeatureCard 
              icon={<Lock className="w-5 h-5 text-white" />}
              title="Secure Enclaves"
              description="Granular database security rules ensure only invited members can view or mutate room state."
            />
            <FeatureCard 
              icon={<BarChart className="w-5 h-5 text-white" />}
              title="Activity Heatmaps"
              description="Visualize your consistency with GitHub-style contribution graphs synced to your actual progress."
            />
            <FeatureCard 
              icon={<Users className="w-5 h-5 text-white" />}
              title="Multiplayer First"
              description="Built from the ground up for teams. See exactly who completed what, and when."
            />
            <FeatureCard 
              icon={<Server className="w-5 h-5 text-white" />}
              title="Serverless Backend"
              description="Powered by blazing fast Firebase architecture for zero-latency updates and massive scale."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 border-t border-white/5 relative overflow-hidden">
        {/* Falling Light Background Effect */}
        <div className="absolute top-0 inset-x-0 h-full pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-b from-rose-500/10 via-rose-500/5 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-rose-500/20 blur-[100px] rounded-full opacity-50"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-8 tracking-tighter leading-[1.1]">Begin your journey.</h2>
          <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto font-light">
            Create your first room today, invite your peers, and start tracking your development progress in perfect sync.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-10 py-5 text-sm font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Start learning for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-5 h-5 border-2 border-white rounded-1 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-[1px]"></div>
               </div>
              <span className="font-bold text-sm tracking-widest uppercase text-white">PORTLINE</span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs mb-8 font-light">
              The collaborative learning platform built specifically for ambitious developers and study groups.
            </p>
            <div className="flex gap-6 text-sm font-medium">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 text-sm">Platform</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Create Room</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Join Room</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 text-sm">Resources</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#roadmaps" className="hover:text-white transition-colors">DSA Roadmap</a></li>
              <li><a href="#roadmaps" className="hover:text-white transition-colors">Flutter Roadmap</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex justify-center items-center text-xs text-zinc-600 font-light">
          <p>© {new Date().getFullYear()} Portline. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/1 border border-white/5 hover:bg-white/2 transition-colors">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-white mb-3">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed font-light">{description}</p>
    </div>
  );
}
