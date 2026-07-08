"use client";

import { useState } from "react";
import { X, Loader2, Info, FolderOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function JoinRoomModal({ isOpen, onClose, onSuccess }: JoinRoomModalProps) {
  const { user } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const isValidFormat = roomCode.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = roomCode.trim();

    if (!trimmedCode) {
      setError("Please enter a room code.");
      return;
    }

    if (!user) {
      setError("You must be logged in to join a room.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const roomRef = doc(db, "rooms", trimmedCode);
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        setError("Invalid room code. Please check and try again.");
        return;
      }

      const roomData = roomSnap.data();

      if (roomData.members && roomData.members.includes(user.uid)) {
        setError("You are already a member of this room.");
        return;
      }

      // Add user to the members array
      await updateDoc(roomRef, {
        members: arrayUnion(user.uid)
      });
      
      toast.success(`Successfully joined '${roomData.name}'!`);
      
      setRoomCode("");
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error joining room:", err);
      if (err.code === 'permission-denied') {
        setError("You don't have permission to join this room.");
      } else {
        setError("Failed to join room. Please try again.");
      }
      toast.error("Failed to join room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-[#0a0a0a] rounded-2xl border border-[#27272a] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[#1f1f1f]">
          <h2 className="text-xl font-semibold text-white">Join a Room</h2>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="flex items-start gap-2 p-3 mb-5 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-2 mb-6">
            <label htmlFor="roomCode" className="block text-sm font-medium text-zinc-300">
              Room Code
            </label>
            <input
              id="roomCode"
              type="text"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value);
                if (error) setError("");
              }}
              placeholder="Paste your room code here"
              className={`w-full bg-[#111] border rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
                error 
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-[#27272a] focus:border-rose-500 focus:ring-rose-500'
              }`}
              autoFocus
            />
            <p className="text-xs text-zinc-500 mt-2">
              * Must be a valid Firestore document ID (provided by the room creator)
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isValidFormat}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#111] hover:bg-[#1a1a1a] border border-[#27272a] disabled:opacity-50 disabled:hover:bg-[#111] text-white rounded-xl font-medium transition-colors"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <FolderOpen className="w-5 h-5" />
                  Join Room
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
