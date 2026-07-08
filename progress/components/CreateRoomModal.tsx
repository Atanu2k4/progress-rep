"use client";

import { useState } from "react";
import { X, BookOpen, Users, Loader2, Link as LinkIcon, Copy, CheckCircle2, Info, Binary, Smartphone } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (roomId: string) => void;
}

const AVAILABLE_ROADMAPS = [
  { id: "dsa-roadmap", title: "Data Structures & Algorithms (C++)", icon: <Binary className="w-6 h-6 text-rose-500" /> },
  { id: "roadmap", title: "Flutter App Development", icon: <Smartphone className="w-6 h-6 text-rose-500" /> }
];

export function CreateRoomModal({ isOpen, onClose, onSuccess }: CreateRoomModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [selectedRoadmap, setSelectedRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdRoomId, setCreatedRoomId] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const MAX_CHARS = 30;
  const isOverLimit = name.length > MAX_CHARS;
  const isEmpty = name.trim().length === 0;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmpty) {
      setError("Room name is required");
      return;
    }
    
    if (isOverLimit) {
      setError("Room name must be 30 characters or less");
      return;
    }

    if (!user) {
      setError("You must be logged in to create a room");
      return;
    }

    if (!selectedRoadmap) {
      setError("Please select a roadmap");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const selectedRoadmapData = AVAILABLE_ROADMAPS.find(r => r.id === selectedRoadmap);
      
      const docRef = await addDoc(collection(db, "rooms"), {
        name: name.trim(),
        roadmap: selectedRoadmapData?.title,
        roadmapId: selectedRoadmap,
        createdBy: user.uid,
        members: [user.uid],
        progress: 0,
        createdAt: serverTimestamp(),
      });

      setCreatedRoomId(docRef.id);
      setStep(2);
      toast.success("Room created successfully!");
      onSuccess(docRef.id);
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(createdRoomId);
    setCopied(true);
    toast.success("Room code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setStep(1);
    setName("");
    setSelectedRoadmap("");
    setCreatedRoomId("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === 1 ? onClose : undefined}
      ></div>
      
      <div className="relative w-full max-w-md bg-[#0a0a0a] rounded-2xl border border-[#27272a] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[#1f1f1f]">
          <h2 className="text-xl font-semibold text-white">
            {step === 1 ? "Create a Room" : "Room Created!"}
          </h2>
          <button 
            onClick={resetAndClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleCreate} className="p-6">
            {error && (
              <div className="flex items-start gap-2 p-3 mb-5 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg">
                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="roomName" className="block text-sm font-medium text-zinc-300">
                    Room Name
                  </label>
                  <span className={`text-xs ${isOverLimit ? 'text-red-400 font-medium' : 'text-zinc-500'}`}>
                    {name.length} / {MAX_CHARS}
                  </span>
                </div>
                <input
                  id="roomName"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g. Weekend DSA Warriors"
                  className={`w-full bg-[#111] border rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
                    isOverLimit || (error && isEmpty) 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-[#27272a] focus:border-rose-500 focus:ring-rose-500'
                  }`}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Select Roadmap
                </label>
                <div className="space-y-3">
                  {AVAILABLE_ROADMAPS.map((roadmap) => (
                    <div 
                      key={roadmap.id}
                      onClick={() => setSelectedRoadmap(roadmap.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedRoadmap === roadmap.id 
                          ? "bg-rose-500/10 border-rose-500 ring-1 ring-rose-500/20" 
                          : "bg-[#111] border-[#27272a] hover:border-zinc-600"
                      }`}
                    >
                      <div className="shrink-0">{roadmap.icon}</div>
                      <div>
                        <h3 className={`font-medium ${selectedRoadmap === roadmap.id ? "text-rose-400" : "text-zinc-200"}`}>
                          {roadmap.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                          Structured curriculum loaded from /data
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || isOverLimit || isEmpty || !selectedRoadmap}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:hover:bg-rose-600 text-white rounded-xl font-medium transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    Create
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-rose-500" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">You're all set!</h3>
            <p className="text-zinc-400 text-sm mb-8">
              Share this code with your study group so they can join your room.
            </p>

            <div className="bg-[#111] border border-[#27272a] rounded-xl p-4 flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 overflow-hidden">
                <LinkIcon className="w-5 h-5 text-zinc-500 shrink-0" />
                <code className="text-rose-400 font-mono truncate select-all">{createdRoomId}</code>
              </div>
              <button 
                onClick={copyToClipboard}
                className="ml-3 p-2 bg-[#1a1a1a] hover:bg-[#222] rounded-lg text-zinc-300 transition-colors shrink-0"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-rose-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full px-4 py-3 bg-white hover:bg-zinc-200 text-black rounded-xl font-medium transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
