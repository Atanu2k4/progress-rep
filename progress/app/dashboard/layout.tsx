"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Plus, 
  LogOut,
  FolderOpen,
  Settings
} from "lucide-react";
import { CreateRoomModal } from "@/components/CreateRoomModal";
import { JoinRoomModal } from "@/components/JoinRoomModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-50 font-sans selection:bg-rose-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1f1f1f] bg-[#0a0a0a] flex flex-col hidden md:flex">
        <div className="p-6 border-b border-[#1f1f1f] flex items-center gap-2">
          <div className="w-6 h-6 border-[3px] border-rose-500 rounded-sm"></div>
          <span className="font-bold text-xl tracking-tight">Portline</span>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-6 overflow-y-auto">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-3">Actions</div>
            <div className="space-y-2">
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Room
              </button>
              <button 
                onClick={() => setIsJoinModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-[#111] hover:bg-[#1a1a1a] text-zinc-300 font-medium transition-colors border border-[#27272a]"
              >
                <FolderOpen className="w-4 h-4" />
                Join Room
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-3">Menu</div>
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                  pathname === "/dashboard" 
                    ? "bg-[#1f1f1f] text-white" 
                    : "text-zinc-400 hover:bg-[#111] hover:text-zinc-200"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Overview
              </Link>
              <Link
                href="/dashboard/settings"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                  pathname === "/dashboard/settings" 
                    ? "bg-[#1f1f1f] text-white" 
                    : "text-zinc-400 hover:bg-[#111] hover:text-zinc-200"
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-[#1f1f1f]">
          <div className="flex items-center gap-3 mb-4 px-2">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-9 h-9 rounded-full border border-zinc-700" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm border border-zinc-700">
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">{user.displayName || "User"}</p>
              <p className="text-xs text-zinc-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-[#111] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-[#1f1f1f] bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-[3px] border-rose-500 rounded-sm"></div>
            <span className="font-bold text-lg tracking-tight">Portline</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="p-2 bg-rose-600 rounded-lg text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="p-2 bg-[#111] border border-[#27272a] rounded-lg text-white"
            >
              <FolderOpen className="w-4 h-4" />
            </button>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-[#27272a]" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center text-sm border border-[#27272a]">
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>

      <CreateRoomModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={() => {}} 
      />
      <JoinRoomModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
        onSuccess={() => {}} 
      />
    </div>
  );
}
