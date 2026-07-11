"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Server, Boxes, Zap, ArrowRight, Activity, Users, Lock, ChevronRight, BarChart, Trophy, Map } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <div className="w-12 h-12 brutal-border rounded-full border-t-[#FFD84D] animate-spin"></div>
      </div>
    );
  }

  return (
    <main
      className="flex flex-col text-[#14110d] font-sans selection:bg-[#FF90E8] overflow-x-hidden relative"
      style={{
        backgroundColor: "#f4f1e8",
        backgroundImage: "radial-gradient(#14110d18 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px"
      }}
    >
      <div className="min-h-screen flex flex-col relative z-10 w-full" style={{ zoom: 1.1 }}>
        <nav className="w-full max-w-[1400px] mx-auto mt-6 flex items-center justify-between px-6 py-4 z-50 brutal-border bg-white brutal-shadow-lg">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 brutal-border bg-black flex items-center justify-center">
              <div className="w-4 h-4 bg-[#FFD84D] rounded-full"></div>
            </div>
            <span className="font-black text-2xl tracking-widest uppercase text-black font-bitcount">Codepanti</span>
          </div>
          <div className="hidden md:flex items-center justify-center gap-8 text-sm font-black text-black uppercase tracking-wide">
            <a href="#features" className="hover:underline decoration-4 underline-offset-4 decoration-black">Platform</a>
            <a href="#roadmaps" className="hover:underline decoration-4 underline-offset-4 decoration-black">Roadmaps</a>
            <a href="#community" className="hover:underline decoration-4 underline-offset-4 decoration-black">Community</a>
          </div>
          <div className="flex items-center justify-end gap-6 flex-1">
            <Link href="/login" className="text-sm font-black text-black uppercase tracking-wide hidden md:block">LOG IN</Link>
            <Link href="/login" className="px-6 py-3 text-sm font-black bg-[#FFD84D] text-black brutal-border brutal-shadow-sm hover:-translate-y-1 hover:brutal-shadow transition-all uppercase tracking-wide flex items-center gap-2">
              START LEARNING <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>

        <section className="flex-1 flex flex-col items-center justify-center w-full text-center relative z-10 py-32 px-6">
          {/* Center Content */}
          <div className="relative z-20 flex flex-col items-center mt-12 md:mt-0">
            {/* Center BETA box */}
            <div className="flex items-center gap-3 px-4 py-3 brutal-border bg-[#5EE6A8] text-black font-black brutal-shadow-sm hover:brutal-shadow transition-all transform -rotate-2 mb-8 animate-[float_4s_ease-in-out_infinite]">
              <span className="bg-black text-white text-xs px-2 py-1 brutal-border">BETA</span>
              <span className="text-sm tracking-widest uppercase">Codepanti IS NOW AVAILABLE</span>
              <ArrowRight className="w-4 h-4" />
            </div>

            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-4 leading-[0.9] text-black uppercase">
              MASTER<br />ANY SKILL<br />
              <span className="bg-[#FF90E8] px-8 py-2 inline-block brutal-border mt-4 brutal-shadow-sm">TOGETHER.</span>
            </h1>

            <p className="text-sm md:text-base text-black font-bold max-w-md my-10 leading-relaxed border-l-4 border-black pl-4 text-left mx-auto">
              Create structured roadmaps, invite your peers, and track your progress in real-time.<br />
              The brutalist platform for developer study groups.
            </p>

            <div className="flex items-center gap-6 justify-center flex-wrap">
              <Link href="/login" className="px-8 py-4 text-sm font-black bg-[#FFD84D] text-black brutal-border brutal-shadow-sm hover:-translate-y-1 hover:brutal-shadow transition-all uppercase tracking-widest">
                GET STARTED FOR FREE
              </Link>
              <a href="#features" className="px-8 py-4 text-sm font-black bg-white text-black brutal-border brutal-shadow-sm hover:-translate-y-1 hover:brutal-shadow transition-all uppercase tracking-widest">
                EXPLORE FEATURES
              </a>
            </div>
          </div>

          {/* Floating elements */}

          <div className="absolute top-40 left-5 lg:left-[2%] xl:left-[8%] transform rotate-1 z-0 hidden lg:block">
            <div className="relative animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#FF90E8] brutal-border -z-10"></div>
              <FloatingCard icon={<Users className="w-6 h-6" />} color="bg-[#FFD84D]" title="STUDY TOGETHER" desc="Create groups, invite peers, and learn together." />
            </div>
          </div>

          <div className="absolute bottom-52 left-10 lg:left-[5%] xl:left-[10%] transform -rotate-2 z-0 hidden lg:block">
            <div className="relative animate-[float_5s_ease-in-out_infinite]">
              <div className="absolute -bottom-8 -right-8 text-5xl font-light text-black">+</div>
              <FloatingCard icon={<Trophy className="w-6 h-6" />} color="bg-[#FF90E8]" title="EARN & SHOWCASE" desc="Earn badges and showcase your achievements." />
            </div>
          </div>

          <div className="absolute top-20 right-10 lg:right-[5%] xl:right-[10%] transform rotate-3 z-0 hidden lg:block">
            <div className="relative animate-[float_4s_ease-in-out_infinite]">
              <div className="absolute -top-6 -right-12 w-20 h-20 bg-[radial-gradient(#14110d_2px,transparent_2px)] bg-[length:8px_8px] opacity-40 -z-10"></div>
              <FloatingCard icon={<Map className="w-6 h-6" />} color="bg-[#FF90E8]" title="STRUCTURED ROADMAPS" desc="Step-by-step paths designed by developers, for developers." />
            </div>
          </div>

          <div className="absolute top-[45%] right-5 lg:right-[2%] xl:right-[8%] transform -rotate-2 z-0 hidden lg:block">
            <div className="animate-[float_5.5s_ease-in-out_infinite]">
              <FloatingCard icon={<BarChart className="w-6 h-6" />} color="bg-[#5EE6A8]" title="TRACK PROGRESS" desc="Real-time progress tracking to keep you motivated." />
            </div>
          </div>

          <div className="absolute bottom-48 right-20 lg:right-[10%] xl:right-[15%] transform -rotate-3 z-0 hidden lg:block">
            <div className="brutal-border bg-[#A3AAFF] px-6 py-3 text-black font-black uppercase text-sm brutal-shadow flex items-center gap-4 animate-[float_6.5s_ease-in-out_infinite]">
              BUILT FOR DEVELOPERS <span className="bg-white px-2 py-1 brutal-border">{"</>"}</span>
            </div>
          </div>

          {/* Decorational squiggles */}
          <svg className="absolute top-[35%] right-[25%] hidden xl:block w-12 h-6" viewBox="0 0 50 20" fill="none" stroke="#14110d" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M 0,10 L 10,0 L 20,10 L 30,0 L 40,10 L 50,0" />
          </svg>
          <div className="absolute top-[55%] left-[20%] hidden xl:block w-20 h-10 bg-[radial-gradient(#14110d_2px,transparent_2px)] bg-[length:10px_10px] opacity-60"></div>
        </section>


      </div>

      <section id="features" className="py-32 border-t-4 border-black bg-[#5EE6A8] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-left max-w-3xl brutal-border bg-white p-8 brutal-shadow-lg transform -rotate-1">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-black tracking-tighter leading-[1] uppercase">The ultimate standard in collaborative learning.</h2>
            <p className="text-black text-xl font-bold">Codepanti combines your roadmaps, progress tracking, and team activity into a single, brutally engineered ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              color="bg-[#FF90E8]"
              icon={<Activity className="w-8 h-8 text-black" />}
              title="Real-time Sync"
              description="Progress updates are broadcasted instantly to all members in your study group via Firestore infrastructure."
            />
            <FeatureCard
              color="bg-white"
              icon={<Boxes className="w-8 h-8 text-black" />}
              title="Structured Roadmaps"
              description="Deploy curated curriculums like DSA or System Design, directly integrated into your room's timeline."
            />
            <FeatureCard
              color="bg-[#FFD84D]"
              icon={<Lock className="w-8 h-8 text-black" />}
              title="Secure Enclaves"
              description="Granular database security rules ensure only invited members can view or mutate room state."
            />
            <FeatureCard
              color="bg-white"
              icon={<BarChart className="w-8 h-8 text-black" />}
              title="Activity Heatmaps"
              description="Visualize your consistency with GitHub-style contribution graphs synced to your actual progress."
            />
            <FeatureCard
              color="bg-[#A3AAFF]"
              icon={<Users className="w-8 h-8 text-black" />}
              title="Multiplayer First"
              description="Built from the ground up for teams. See exactly who completed what, and when."
            />
            <FeatureCard
              color="bg-white"
              icon={<Server className="w-8 h-8 text-black" />}
              title="Serverless Backend"
              description="Powered by blazing fast Firebase architecture for zero-latency updates and massive scale."
            />
          </div>
        </div>
      </section>

      <section id="roadmaps" className="py-32 border-t-4 border-black bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-left max-w-3xl brutal-border bg-[#FFD84D] p-8 brutal-shadow-lg transform rotate-1">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-black tracking-tighter leading-[1] uppercase">Explore Roadmaps.</h2>
            <p className="text-black text-xl font-bold">Curated learning paths designed to take you from beginner to expert in perfect sync with your study group.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 brutal-border bg-white brutal-shadow hover:-translate-y-2 hover:translate-x-2 transition-transform duration-200 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF90E8] rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity"></div>
              <h3 className="text-3xl font-black text-black mb-4 uppercase flex justify-between items-center">
                DSA in C++
                <span className="bg-black text-white text-xs px-3 py-1 brutal-border">30 DAYS</span>
              </h3>
              <p className="text-lg text-black font-bold leading-relaxed mb-8">Master Data Structures and Algorithms with a comprehensive 30-day curriculum in C++. Perfect for interview preparation.</p>
              <Link href="/login" className="inline-flex items-center gap-2 font-black text-black uppercase tracking-widest border-b-4 border-black pb-1 hover:text-[#FF90E8] hover:border-[#FF90E8] transition-colors">
                Start Learning <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="p-8 brutal-border bg-white brutal-shadow hover:-translate-y-2 hover:translate-x-2 transition-transform duration-200 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5EE6A8] rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity"></div>
              <h3 className="text-3xl font-black text-black mb-4 uppercase flex justify-between items-center">
                Flutter
                <span className="bg-black text-white text-xs px-3 py-1 brutal-border">60 DAYS</span>
              </h3>
              <p className="text-lg text-black font-bold leading-relaxed mb-8">Build cross-platform mobile, web, and desktop apps with a complete 60-day Flutter and Dart mastery roadmap.</p>
              <Link href="/login" className="inline-flex items-center gap-2 font-black text-black uppercase tracking-widest border-b-4 border-black pb-1 hover:text-[#5EE6A8] hover:border-[#5EE6A8] transition-colors">
                Start Learning <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="mt-20 p-10 bg-[#14110d] text-white brutal-border brutal-shadow-lg transform -rotate-1 max-w-4xl mx-auto">
            <h3 className="text-3xl font-black mb-4 uppercase">Want more roadmaps?</h3>
            <p className="text-lg font-bold mb-8 text-gray-300">Tell us what you want to learn next. We're constantly adding new paths to the platform.</p>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your suggestion!"); }}>
              <input type="text" placeholder="e.g. System Design, Next.js, Rust..." className="flex-1 px-6 py-4 bg-white text-black font-bold brutal-border focus:outline-none focus:ring-4 focus:ring-[#FFD84D]" required />
              <button type="submit" className="px-8 py-4 font-black bg-[#FF90E8] text-black uppercase tracking-widest brutal-border hover:-translate-y-1 transition-transform">
                Suggest
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-40 border-t-4 border-black bg-[#FF90E8] relative overflow-hidden z-20">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-black text-black mb-8 tracking-tighter leading-[1] uppercase">Begin your<br />journey.</h2>
          <p className="text-black text-2xl font-bold mb-12 max-w-2xl mx-auto bg-white brutal-border p-6 transform rotate-1 brutal-shadow">
            Create your first room today, invite your peers, and start tracking your development progress in perfect sync.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-12 py-6 text-xl font-black bg-[#FFD84D] text-black brutal-border brutal-shadow hover:-translate-y-1 transition-all uppercase tracking-widest"
          >
            Start learning for free
          </Link>
        </div>
      </section>

      <footer className="border-t-4 border-black py-16 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 brutal-border bg-black flex items-center justify-center">
                <div className="w-4 h-4 bg-[#FFD84D] rounded-full"></div>
              </div>
              <span className="font-black text-xl tracking-widest uppercase text-black font-bitcount">Codepanti</span>
            </div>
            <p className="text-lg text-black font-bold max-w-sm mb-8">
              The collaborative learning platform built specifically for ambitious developers and study groups.
            </p>
            <div className="flex gap-6 text-lg font-black uppercase">
              <a href="#" className="text-black hover:underline decoration-4 underline-offset-4">Twitter</a>
              <a href="#" className="text-black hover:underline decoration-4 underline-offset-4">GitHub</a>
            </div>
          </div>

          <div>
            <h4 className="text-black font-black mb-6 text-xl uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4 text-lg font-bold text-black">
              <li><Link href="/dashboard" className="hover:underline decoration-4 underline-offset-4">Dashboard</Link></li>
              <li><Link href="/login" className="hover:underline decoration-4 underline-offset-4">Create Room</Link></li>
              <li><Link href="/login" className="hover:underline decoration-4 underline-offset-4">Join Room</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-black mb-6 text-xl uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4 text-lg font-bold text-black">
              <li><a href="#roadmaps" className="hover:underline decoration-4 underline-offset-4">DSA Roadmap</a></li>
              <li><a href="#roadmaps" className="hover:underline decoration-4 underline-offset-4">Flutter Roadmap</a></li>
              <li><a href="#community" className="hover:underline decoration-4 underline-offset-4">Community</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t-4 border-black flex justify-between items-center text-sm text-black font-bold uppercase tracking-widest flex-col md:flex-row gap-4">
          <p>© {new Date().getFullYear()} Codepanti. All rights reserved.</p>
          <div className="bg-[#5EE6A8] px-4 py-2 brutal-border brutal-shadow-sm font-bitcount">
            SYSTEM ONLINE
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <div className={`p-8 brutal-border ${color} brutal-shadow hover:-translate-y-2 hover:translate-x-2 transition-transform duration-200`}>
      <div className="w-16 h-16 brutal-border bg-white flex items-center justify-center mb-8 brutal-shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-black mb-4 uppercase">{title}</h3>
      <p className="text-lg text-black font-bold leading-relaxed">{description}</p>
    </div>
  );
}

function FloatingCard({ icon, color, title, desc, className = "" }: any) {
  return (
    <div className={`bg-white brutal-border brutal-shadow p-4 flex items-center gap-4 w-[280px] text-left ${className}`}>
      <div className={`w-14 h-14 shrink-0 brutal-border ${color} flex items-center justify-center text-black`}>
        {icon}
      </div>
      <div>
        <h4 className="font-black text-xs uppercase mb-1">{title}</h4>
        <p className="text-[10px] font-bold leading-tight opacity-80">{desc}</p>
      </div>
    </div>
  )
}


