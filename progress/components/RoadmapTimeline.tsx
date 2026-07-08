"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Loader2, BookOpen, Check, Code2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, collection } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import dsaRoadmap from "@/data/dsa-roadmap.json";
import flutterRoadmap from "@/data/roadmap.json";

const roadmaps: Record<string, any[]> = {
  "dsa-roadmap": dsaRoadmap,
  "roadmap": flutterRoadmap
};

interface RoadmapTimelineProps {
  roomId: string;
  roadmapId: string;
  usersCache: Record<string, any>;
}

export function RoadmapTimeline({ roomId, roadmapId, usersCache }: RoadmapTimelineProps) {
  const { user } = useAuth();
  const [allProgress, setAllProgress] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState(true);
  const [activePrompt, setActivePrompt] = useState<{ day: number; text: string } | null>(null);

  const roadmapData = roadmaps[roadmapId] || [];
  const completedDays = user ? (allProgress[user.uid] || []) : [];

  // Helper to parse practice string into LeetCode links
  const parsePractice = (practiceStr: string) => {
    if (!practiceStr) return [];
    return practiceStr.split(',').map((s, idx) => {
      const item = s.trim();
      const match = item.match(/^LC\s*(\d+)(?:\s*\((.*?)\))?/i);
      if (match) {
        const num = match[1];
        const text = match[2] || '';
        let slug = '';
        if (text) {
          const namePart = text.split(' - ')[0].trim();
          slug = namePart.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
        }
        return { id: idx, type: 'lc', num, text, slug, raw: item };
      }
      return { id: idx, type: 'text', raw: item };
    });
  };

  useEffect(() => {
    if (!roomId) return;

    const progressCollection = collection(db, "rooms", roomId, "progress");
    const unsubscribe = onSnapshot(progressCollection, (snapshot) => {
      const newProgress: Record<string, number[]> = {};
      snapshot.forEach(docSnap => {
        newProgress[docSnap.id] = docSnap.data().completedDays || [];
      });
      setAllProgress(newProgress);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching roadmap progress:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  const toggleDay = async (dayNumber: number) => {
    if (!user) return;
    
    // Optimistic update
    const isCompleted = completedDays.includes(dayNumber);
    const newCompletedDays = isCompleted 
      ? completedDays.filter(d => d !== dayNumber)
      : [...completedDays, dayNumber];
    
    setAllProgress(prev => ({
      ...prev,
      [user.uid]: newCompletedDays
    }));

    // Save to Firestore
    const progressRef = doc(db, "rooms", roomId, "progress", user.uid);
    await setDoc(progressRef, { completedDays: newCompletedDays }, { merge: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-white/2 border border-white/5 rounded-2xl backdrop-blur-xl">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  const progressPercentage = Math.round((completedDays.length / roadmapData.length) * 100) || 0;

  return (
    <div className="flex flex-col h-full bg-white/2 border border-white/5 rounded-2xl backdrop-blur-xl overflow-hidden max-h-200">
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-black/20 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bitcount font-bold uppercase tracking-widest text-white flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-rose-500" />
            Roadmap Progress
          </h2>
          <span className="text-sm font-medium text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            {progressPercentage}% Completed
          </span>
        </div>
        <div className="h-1.5 w-full bg-black/50 border border-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-rose-600 to-rose-400 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(225,29,72,0.4)]" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {roadmapData.map((module: any, idx: number) => {
          const isCompleted = completedDays.includes(module.day);
          
          const completedByUsers = Object.entries(allProgress)
            .filter(([uid, days]) => days.includes(module.day))
            .map(([uid]) => usersCache[uid])
            .filter(Boolean);
          
          return (
            <div key={idx} className="relative flex gap-6 group">
              {/* Vertical line connecting nodes */}
              {idx !== roadmapData.length - 1 && (
                <div className={`absolute left-3 top-8 -bottom-8 w-0.5 ${isCompleted ? "bg-rose-500/50" : "bg-white/5"}`}></div>
              )}
              
              {/* Node */}
              <div 
                className="relative z-10 mt-1 cursor-pointer shrink-0" 
                onClick={() => toggleDay(module.day)}
              >
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_12px_rgba(225,29,72,0.6)]">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#111] border-2 border-white/10 group-hover:border-rose-500/50 transition-colors flex items-center justify-center"></div>
                )}
              </div>

              {/* Content */}
              <div 
                className={`flex-1 p-5 rounded-xl border transition-all cursor-pointer ${
                  isCompleted 
                    ? "bg-rose-500/5 border-rose-500/20" 
                    : "bg-white/1 border-white/5 group-hover:border-white/10 group-hover:bg-white/3"
                }`}
                onClick={() => toggleDay(module.day)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <h3 className={`font-bitcount font-bold uppercase tracking-wide text-lg ${isCompleted ? "text-rose-300" : "text-white"}`}>
                      Day {module.day}: {module.title}
                    </h3>
                    
                    {/* Avatars of people who completed it */}
                    {completedByUsers.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex -space-x-1.5">
                          {completedByUsers.map((u, i) => (
                            u.photoURL ? (
                              <img key={u.id || i} src={u.photoURL} alt={u.displayName} title={`${u.displayName} completed this`} className="w-5 h-5 rounded-full border border-[#050505] object-cover" />
                            ) : (
                              <div key={u.id || i} title={`${u.displayName} completed this`} className="w-5 h-5 rounded-full border border-[#050505] bg-rose-500/20 text-rose-500 flex items-center justify-center text-2 font-bold">
                                {u.displayName?.charAt(0) || '?'}
                              </div>
                            )
                          ))}
                        </div>
                        <span className="text-[10px] text-zinc-500">completed</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bitcount font-bold uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-2 py-1 rounded">
                    Week {module.week}
                  </span>
                </div>
                
                {module.topics?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 mb-4">
                    {module.topics.map((topic: string, i: number) => (
                      <div key={i} className={`text-xs font-medium px-3 py-1.5 rounded-md border ${isCompleted ? "bg-rose-500/10 text-rose-300 border-rose-500/20" : "bg-white/3 text-zinc-300 border-white/10"}`}>
                        {topic.replace(/`/g, '')}
                      </div>
                    ))}
                  </div>
                )}

                {module.practice && (
                  <div className="bg-black/30 p-4 rounded-xl border border-white/2">
                    <span className="text-xs font-bitcount font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                      <Code2 className="w-4 h-4" /> Practice Problems
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {parsePractice(module.practice).map(p => {
                        if (p.type === 'lc') {
                          const searchUrl = p.slug 
                            ? `https://leetcode.com/problems/${p.slug}/description/?search=${p.num}`
                            : `https://leetcode.com/problemset/?search=${p.num}`;
                          return (
                            <a key={p.id} href={searchUrl} target="_blank" rel="noopener noreferrer" 
                               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282828] border border-white/10 hover:border-[#FFA116] hover:bg-[#FFA116]/10 transition-colors text-xs text-zinc-300 group/lc">
                              <span className="font-mono font-bold text-[#FFA116]">LC {p.num}</span>
                              {p.text && <span className="font-mono text-zinc-400 group-hover/lc:text-zinc-300 transition-colors">{p.text}</span>}
                            </a>
                          );
                        }
                        return (
                          <span key={p.id} className="inline-block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400">
                            {p.raw}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {module.prompt && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePrompt({ day: module.day, text: module.prompt });
                    }}
                    className="mt-4 border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-300 rounded transition-colors"
                  >
                    View Prompt
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activePrompt && (
        <PromptModal 
          day={activePrompt.day} 
          text={activePrompt.text} 
          onClose={() => setActivePrompt(null)} 
        />
      )}
    </div>
  );
}

function PromptModal({ day, text, onClose }: { day: number; text: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-medium text-white">AI Prompt — Day {day}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-zinc-300">
          <p className="mb-4 text-sm font-light text-zinc-400">Copy this prompt into ChatGPT or Claude to learn today's concepts.</p>
          <div className="rounded-lg border border-white/10 bg-white/2 p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed">{text}</pre>
          </div>
        </div>
        <div className="border-t border-white/10 p-4">
          <button onClick={copyToClipboard} className="w-full rounded-lg bg-white text-black px-4 py-3 text-sm font-medium hover:bg-zinc-200 transition-colors">
            {copied ? "Copied! 🚀" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
