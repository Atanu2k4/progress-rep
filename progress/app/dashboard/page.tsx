"use client";

import { useAuth } from "@/context/AuthContext";
import { Users, MoreHorizontal, CheckCircle2, Circle, Clock, Loader2, Calendar, ChevronLeft, ChevronRight, Activity, TrendingUp, FolderOpen, MousePointerClick, Trash2, Copy } from "lucide-react";
import { format, formatDistanceToNow, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import dsaRoadmap from "@/data/dsa-roadmap.json";
import flutterRoadmap from "@/data/roadmap.json";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";

const roadmaps: Record<string, any[]> = {
  "dsa-roadmap": dsaRoadmap,
  "roadmap": flutterRoadmap
};

interface Room {
  id: string;
  name: string;
  roadmap: string;
  roadmapId?: string;
  members: string[];
  progress: number;
  createdAt: any;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // State for the unified single-page experience
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [usersCache, setUsersCache] = useState<Record<string, any>>({});
  const [userProgress, setUserProgress] = useState<Record<string, number[]>>({});

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDeleteRoom = async (roomIdToDelete: string) => {
    if (!confirm("Are you sure you want to delete this room? This action cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "rooms", roomIdToDelete));
      if (selectedRoomId === roomIdToDelete) {
        setSelectedRoomId(null);
      }
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room. Check console and Firebase rules.");
    }
  };

  useEffect(() => {
    if (!user) return;

    // Fetch rooms where the user is a member
    const q = query(
      collection(db, "rooms"),
      where("members", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedRooms: Room[] = [];
      snapshot.forEach((doc) => {
        fetchedRooms.push({ id: doc.id, ...doc.data() } as Room);
      });
      
      // Sort client-side by createdAt descending
      fetchedRooms.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });

      setRooms(fetchedRooms);
      setLoadingRooms(false);
      
      // Auto-select first room if none selected
      if (fetchedRooms.length > 0 && !selectedRoomId) {
        setSelectedRoomId(fetchedRooms[0].id);
      }
    }, (error) => {
      console.error("Error fetching rooms:", error);
      setLoadingRooms(false);
    });

    return () => unsubscribe();
  }, [user, selectedRoomId]);

  useEffect(() => {
    if (rooms.length === 0) return;
    const memberIds = Array.from(new Set(rooms.flatMap(r => r.members || [])));
    
    setUsersCache(prev => {
      const missingIds = memberIds.filter(id => !prev[id]);
      if (missingIds.length > 0) {
        Promise.all(
          missingIds.map(async (id) => {
            try {
              const snap = await getDoc(doc(db, "users", id));
              if (snap.exists()) return { id, ...snap.data() };
            } catch (e) {
              console.error(e);
            }
            return { id, displayName: "Unknown User", photoURL: "" };
          })
        ).then(results => {
          setUsersCache(current => {
            const newCache = { ...current };
            results.forEach(u => { newCache[u.id] = u; });
            return newCache;
          });
        });
      }
      return prev;
    });
  }, [rooms]);

  useEffect(() => {
    if (!user || rooms.length === 0) return;
    
    const unsubscribes = rooms.map(room => {
      const progressRef = doc(db, "rooms", room.id, "progress", user.uid);
      return onSnapshot(progressRef, (docSnap) => {
        setUserProgress(prev => ({
          ...prev,
          [room.id]: docSnap.exists() ? (docSnap.data().completedDays || []) : []
        }));
      });
    });

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [user, rooms]);

  // Generate calendar real data
  const today = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(date => {
    // A day has activity if it corresponds to a completed task in any room
    const hasActivity = rooms.some(room => {
      if (!room.createdAt) return false;
      const roomDate = room.createdAt.toDate();
      const completed = userProgress[room.id] || [];
      return completed.some(dayNum => {
        // Map day 1 to creation date, day 2 to creation date + 1, etc.
        const targetDate = addDays(roomDate, dayNum - 1);
        return isSameDay(targetDate, date);
      });
    });

    return {
      date,
      hasActivity,
      isToday: isSameDay(date, today)
    };
  });

  // Generate real upcoming deadlines
  const upcomingDeadlines = rooms.map(room => {
    if (!room.createdAt || !room.roadmapId) return null;
    const roomDate = room.createdAt.toDate();
    
    const roadmapData = roadmaps[room.roadmapId];
    if (!roadmapData) return null;
    
    const completed = userProgress[room.id] || [];
    
    // Find the first uncompleted module
    const nextModule = roadmapData.find((item: any) => !completed.includes(item.day));
    if (!nextModule) return null;

    // Calculate when this should be done
    const deadlineDate = addDays(roomDate, nextModule.day - 1);
    const isOverdue = deadlineDate < new Date(new Date().setHours(0,0,0,0));
    
    let timeText = isSameDay(deadlineDate, today) ? "Today" : 
                   isSameDay(deadlineDate, addDays(today, 1)) ? "Tomorrow" : 
                   isOverdue ? "Overdue" : format(deadlineDate, "MMM d");

    return {
      roomId: room.id,
      roomName: room.name,
      title: nextModule.title,
      timeText,
      deadlineDate,
      isOverdue
    };
  }).filter(Boolean);

  // Sort deadlines by date
  upcomingDeadlines.sort((a: any, b: any) => a.deadlineDate.getTime() - b.deadlineDate.getTime());

  // Take the first 3 deadlines to show
  const displayDeadlines = upcomingDeadlines.slice(0, 3);
  
  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-50 font-sans selection:bg-rose-500/30 overflow-hidden relative">
      
      {/* Sleek Background Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-200 h-125 bg-rose-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="p-8 max-w-[1600px] mx-auto relative z-10 h-screen flex flex-col">
        <header className="mb-8 shrink-0">
          <h1 className="text-4xl font-bitcount font-bold text-white uppercase tracking-tight">
            Welcome back, {user?.displayName?.split(" ")[0] || "there"}
          </h1>
          <p className="text-zinc-400 mt-2 font-light text-lg">
            Here's what's happening in your study groups.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
          {/* Column 1: Rooms Navigation */}
          <div className="col-span-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar flex flex-col">
            <h2 className="text-xl font-bitcount font-bold uppercase tracking-widest text-white flex items-center gap-2 shrink-0">
              <FolderOpen className="w-5 h-5 text-rose-500" />
              Your Rooms
            </h2>

            {loadingRooms ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/2 border border-white/5 h-32 animate-pulse backdrop-blur-xl"></div>
                ))}
              </div>
            ) : rooms.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-white/2 border border-white/5 border-dashed backdrop-blur-xl">
                <Users className="w-6 h-6 text-zinc-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-1 text-sm">No active rooms</h3>
              </div>
            ) : (
              <div className="space-y-4">
                {rooms.map(room => (
                  <div 
                    key={room.id} 
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden backdrop-blur-xl group
                      ${selectedRoomId === room.id 
                        ? 'bg-rose-500/10 border-rose-500/50 ring-1 ring-rose-500/20' 
                        : 'bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/3'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bitcount font-bold text-lg uppercase tracking-wide transition-colors flex items-center gap-2 ${selectedRoomId === room.id ? 'text-rose-400' : 'text-white group-hover:text-rose-400'}`}>
                          {room.name}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(room.id);
                              toast.success("Room code copied!");
                            }}
                            className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 opacity-70 hover:opacity-100 shrink-0"
                            title="Copy room code"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1 font-light leading-relaxed">{room.roadmap}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteRoom(room.id); }}
                        className="text-zinc-600 hover:text-rose-500 transition-colors p-1 rounded-md hover:bg-rose-500/10 shrink-0"
                        title="Delete Room"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
                      <div className="flex items-center -space-x-2.5 group/members relative cursor-help">
                        {room.members?.slice(0, 4).map((mId, index) => {
                          const u = usersCache[mId];
                          return (
                            <div key={mId} className="w-7 h-7 rounded-full border-2 border-[#121212] bg-zinc-800 flex items-center justify-center overflow-hidden relative hover:z-20 hover:-translate-y-1 transition-transform shadow-md" style={{ zIndex: 10 - index }}>
                              {u?.photoURL ? (
                                <img src={u.photoURL} alt="avatar" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 w-full h-full flex items-center justify-center">
                                  {u?.displayName?.charAt(0).toUpperCase() || '?'}
                                </span>
                              )}
                            </div>
                          )
                        })}
                        {(room.members?.length || 0) > 4 && (
                          <div className="w-7 h-7 rounded-full border-2 border-[#121212] bg-zinc-800 flex items-center justify-center z-[5] text-[10px] font-medium text-zinc-400 shadow-md">
                            +{(room.members?.length || 0) - 4}
                          </div>
                        )}
                        
                        {/* Tooltip on hover */}
                        <div className="absolute left-0 bottom-full mb-3 hidden group-hover/members:flex flex-col bg-zinc-900 border border-white/10 rounded-xl p-2 shadow-2xl z-50 w-56 animate-in fade-in slide-in-from-bottom-2">
                          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2 pt-1">Members ({room.members?.length || 0})</div>
                          <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                            {room.members?.map(mId => {
                              const u = usersCache[mId];
                              return (
                                <div key={mId} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-default">
                                  {u?.photoURL ? (
                                    <img src={u.photoURL} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                                  ) : (
                                    <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center text-[10px] font-bold">
                                      {u?.displayName?.charAt(0).toUpperCase() || '?'}
                                    </div>
                                  )}
                                  <span className="truncate text-zinc-200 text-sm font-medium">{u?.displayName || 'Loading...'}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Columns 2 & 3: Main Stage (Roadmap Timeline) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col h-full min-h-0">
            {selectedRoom ? (
               <RoadmapTimeline 
                 roomId={selectedRoom.id} 
                 roadmapId={selectedRoom.roadmapId || "roadmap"} 
                 usersCache={usersCache}
               />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-white/2 border border-white/5 rounded-2xl backdrop-blur-xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-white/2 border border-white/5 flex items-center justify-center mb-6">
                  <MousePointerClick className="w-8 h-8 text-zinc-500" />
                </div>
                <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">Select a room</h2>
                <p className="text-zinc-400 font-light max-w-sm">Choose a room from the sidebar to view its roadmap timeline and track your progress.</p>
              </div>
            )}
          </div>

          {/* Column 4: Activity & Widgets */}
          <div className="col-span-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            <div>
              <h2 className="text-xl font-bitcount font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                Activity
              </h2>
              <div className="p-6 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-medium text-white tracking-wide">{format(currentMonth, "MMMM yyyy")}</h3>
                  <div className="flex gap-1.5">
                    <button onClick={handlePreviousMonth} className="p-1 hover:bg-white/10 rounded-md text-zinc-400 hover:text-white transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-white/10 rounded-md text-zinc-400 hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-center text-xs font-medium text-zinc-600 pb-2">
                      {d}
                    </div>
                  ))}
                  
                  {Array.from({ length: calendarDays[0].date.getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}
                  
                  {calendarDays.map((day, i) => {
                    const isPast = day.date.getTime() < new Date().setHours(0, 0, 0, 0);
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square rounded flex items-center justify-center text-xs font-medium transition-all duration-300
                          ${day.isToday ? 'border border-rose-500/50 text-rose-300' : 'text-zinc-500'}
                          ${day.hasActivity 
                            ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(225,29,72,0.5)] scale-105 z-10' 
                            : 'bg-white/2 hover:bg-white/8 cursor-pointer'
                          }
                          ${!day.hasActivity && isPast ? 'line-through opacity-50 decoration-rose-500/50' : ''}
                        `}
                        title={format(day.date, "MMM d")}
                      >
                        {format(day.date, "d")}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="p-6 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-bitcount font-bold uppercase text-white mb-6 tracking-widest">Upcoming Deadlines</h3>
                <div className="space-y-5">
                  {displayDeadlines.length > 0 ? (
                     displayDeadlines.map((deadline: any, idx) => (
                       <div key={idx} className="flex items-start gap-4 group">
                         <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 group-hover:bg-rose-500/20 transition-colors">
                           <Clock className="w-4 h-4 text-rose-400" />
                         </div>
                          <div>
                            <p className="text-sm font-medium text-white leading-tight mb-1">{deadline.title}</p>
                            <p className={`text-xs font-light ${deadline.isOverdue ? 'text-rose-400' : 'text-zinc-500'}`}>
                              {deadline.timeText} in <span className="text-zinc-400 font-medium">{deadline.roomName}</span>
                            </p>
                          </div>
                       </div>
                     ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-white/2 border border-white/5 flex items-center justify-center mb-3">
                        <Calendar className="w-5 h-5 text-zinc-600" />
                      </div>
                      <p className="text-sm font-medium text-zinc-400">No immediate deadlines</p>
                      <p className="text-xs text-zinc-600 mt-1 font-light">Check back once you create or join a room.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
