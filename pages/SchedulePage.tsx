import React, { useState } from 'react';
import { SCHEDULE_DATA } from '../constants';
import type { ScheduleDay, ScheduleEvent, SubSession, ParallelSession } from '../types';

// Helper function to get icon and color based on activity
const getEventStyle = (activity: string) => {
    const lowerActivity = activity.toLowerCase();
    if (lowerActivity.includes('khai mạc')) return { icon: 'fa-bullhorn', color: 'bg-green-500' };
    if (lowerActivity.includes('báo cáo') || lowerActivity.includes('phiên toàn thể')) return { icon: 'fa-microphone-alt', color: 'bg-blue-500' };
    if (lowerActivity.includes('nghỉ') || lowerActivity.includes('break') || lowerActivity.includes('tiệc trà')) return { icon: 'fa-coffee', color: 'bg-orange-500' };
    if (lowerActivity.includes('kết thúc')) return { icon: 'fa-flag-checkered', color: 'bg-gray-600' };
    if (lowerActivity.includes('ăn trưa') || lowerActivity.includes('nghỉ trưa')) return { icon: 'fa-utensils', color: 'bg-teal-500' };
    if (lowerActivity.includes('tiểu ban') || lowerActivity.includes('phiên chuyên đề')) return { icon: 'fa-comments', color: 'bg-indigo-500' };
    if (lowerActivity.includes('thảo luận')) return { icon: 'fa-question-circle', color: 'bg-purple-500' };
    if (lowerActivity.includes('bế mạc')) return { icon: 'fa-door-closed', color: 'bg-red-500' };
    if (lowerActivity.includes('gala dinner')) return { icon: 'fa-glass-cheers', color: 'bg-pink-500' };
    if (lowerActivity.includes('du lịch') || lowerActivity.includes('tham quan')) return { icon: 'fa-bus-alt', color: 'bg-cyan-500' };
    if (lowerActivity.includes('đón tiếp')) return { icon: 'fa-handshake', color: 'bg-yellow-500' };
    if (lowerActivity.includes('tuyên bố') || lowerActivity.includes('giới thiệu')) return { icon: 'fa-users', color: 'bg-indigo-400' };
    return { icon: 'fa-calendar-day', color: 'bg-gray-400' };
};

// Helper function to get part of day label style
const getPartStyle = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('sáng')) return 'bg-amber-500/20 border-amber-500 text-amber-300';
    if (lowerTitle.includes('trưa')) return 'bg-orange-500/20 border-orange-500 text-orange-300';
    if (lowerTitle.includes('chiều')) return 'bg-blue-500/20 border-blue-500 text-blue-300';
    if (lowerTitle.includes('tối')) return 'bg-purple-500/20 border-purple-500 text-purple-300';
    return 'bg-slate-500/20 border-slate-500 text-slate-300';
};

// Helper function to get session color for parallel sessions
const getSessionColor = (index: number) => {
    const colors = [
        { bg: 'bg-emerald-900/30', border: 'border-emerald-500', text: 'text-emerald-300', badge: 'bg-emerald-600' },
        { bg: 'bg-violet-900/30', border: 'border-violet-500', text: 'text-violet-300', badge: 'bg-violet-600' },
        { bg: 'bg-rose-900/30', border: 'border-rose-500', text: 'text-rose-300', badge: 'bg-rose-600' }
    ];
    return colors[index % colors.length];
};

const SchedulePage: React.FC = () => {
    const [expandedSessions, setExpandedSessions] = useState<{ [key: string]: boolean }>({});

    const toggleSession = (sessionKey: string) => {
        setExpandedSessions(prev => ({
            ...prev,
            [sessionKey]: !prev[sessionKey]
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-slate-100">Chương trình Hội thảo</h1>
            <p className="text-center text-lg text-slate-100 mb-16">Lịch trình chi tiết các phiên thảo luận, diễn giả và sự kiện.</p>
            
            <div className="space-y-20">
                {SCHEDULE_DATA.map((day: ScheduleDay) => (
                    <div key={day.day}>
                        <h2 className="text-2xl md:text-3xl font-bold text-yellow-100 text-center bg-slate-900/60 backdrop-blur-sm py-3 px-6 rounded-lg w-fit mx-auto mb-10 sticky top-36 lg:top-44 z-20 border border-slate-700 shadow-md">
                            {day.day} - {day.date}
                        </h2>
                        
                        {day.parts.map((part, partIndex) => (
                            <div key={partIndex} className="mb-16">
                                {/* Part of Day Label (Sáng, Trưa, Chiều, Tối) */}
                                <div className={`inline-block px-6 py-2 rounded-full font-bold text-lg mb-6 border-2 ${getPartStyle(part.title)}`}>
                                    <i className="fas fa-clock mr-2"></i>
                                    {part.title}
                                </div>
                                
                                <div className="relative pl-8 md:pl-12 border-l-2 border-slate-600">
                                    {part.events.map((event: ScheduleEvent, eventIndex: number) => (
                                        <div key={eventIndex} className="relative mb-12">
                                            {/* Timeline Node/Dot with Icon */}
                                            <div className={`absolute -left-[26px] md:-left-[34px] top-1 h-12 w-12 md:h-16 md:w-16 rounded-full flex items-center justify-center ring-8 ring-slate-800 ${getEventStyle(event.activity).color}`}>
                                                <i className={`fas ${getEventStyle(event.activity).icon} text-white text-xl md:text-2xl`}></i>
                                            </div>

                                            {/* Event Card */}
                                            <div className="ml-8 md:ml-12">
                                                <div className="p-6 rounded-lg shadow-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                                                    {event.time && <p className="text-yellow-100 font-semibold mb-2 text-lg"><i className="far fa-clock mr-2"></i>{event.time}</p>}
                                                    <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3">{event.activity}</h3>
                                                    
                                                    {/* Preside info */}
                                                    {event.preside && (
                                                        <p className="text-sm text-slate-300 italic mb-4 bg-slate-700/30 p-3 rounded-md">
                                                            <i className="fas fa-gavel mr-2 text-amber-400"></i>
                                                            <span className="font-semibold">Chủ trì:</span> {event.preside}
                                                        </p>
                                                    )}
                                                    
                                                    {/* Sub-sessions (presentations) */}
                                                    {event.subSessions && (
                                                        <div className="mt-4 space-y-4 pt-4 border-t border-slate-700">
                                                            {event.subSessions.map((sub: SubSession, sIndex: number) => (
                                                                <div key={sIndex} className="p-4 rounded-md bg-blue-900/30 border-l-4 border-blue-500">
                                                                    {sub.time && (
                                                                        <p className="text-yellow-300 font-semibold text-sm mb-2">
                                                                            <i className="far fa-clock mr-2"></i>{sub.time}
                                                                        </p>
                                                                    )}
                                                                    <h4 className="font-bold text-blue-200 text-base md:text-lg mb-3">{sub.activity}</h4>
                                                                    
                                                                    {/* Presenters */}
                                                                    {sub.presenter && sub.presenter.length > 0 && (
                                                                        <div className="mt-3 space-y-2">
                                                                            {sub.presenter.map((p, pIndex) => (
                                                                                <div key={pIndex} className="text-sm text-slate-300 bg-slate-800/50 p-3 rounded">
                                                                                    <p className="font-semibold text-slate-100">
                                                                                        <i className="fas fa-user mr-2 text-green-400"></i>
                                                                                        {p.name}
                                                                                    </p>
                                                                                    {p.department && (
                                                                                        <p className="text-xs text-slate-400 mt-1 ml-6">{p.department}</p>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Parallel Sessions */}
                                                    {event.parallelSessions && (
                                                        <div className="mt-4 space-y-6 pt-4 border-t border-slate-700">
                                                            {event.parallelSessions.map((session: ParallelSession, sessionIndex: number) => {
                                                                const sessionKey = `${day.day}-${partIndex}-${eventIndex}-${sessionIndex}`;
                                                                const isExpanded = expandedSessions[sessionKey] ?? false;
                                                                const color = getSessionColor(sessionIndex);

                                                                return (
                                                                    <div key={sessionIndex} className={`rounded-xl overflow-hidden border ${color.border} ${color.bg} shadow-md`}>
                                                                        {/* Header for the parallel session */}
                                                                        <div 
                                                                            className={`p-4 cursor-pointer flex justify-between items-center ${color.badge} text-white font-bold`}
                                                                            onClick={() => toggleSession(sessionKey)}
                                                                        >
                                                                            <div>
                                                                                <h4 className="text-lg">{session.title}</h4>
                                                                                <p className="text-sm opacity-90">
                                                                                    <i className="fas fa-map-marker-alt mr-2"></i>
                                                                                    {session.location} | {session.timeRange}
                                                                                </p>
                                                                            </div>
                                                                            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-xl`}></i>
                                                                        </div>

                                                                        {/* Preside info for parallel session */}
                                                                        {session.preside && (
                                                                            <p className={`px-4 py-2 text-sm italic ${color.text} bg-slate-700/30`}>
                                                                                <i className="fas fa-gavel mr-2 text-amber-400"></i>
                                                                                <span className="font-semibold">Chủ trì:</span> {session.preside}
                                                                            </p>
                                                                        )}

                                                                        {/* Expandable content: Presentations */}
                                                                        {isExpanded && (
                                                                            <div className="p-4 space-y-4">
                                                                                {session.presentations.map((pres, presIndex: number) => (
                                                                                    <div key={presIndex} className="p-4 rounded-md bg-blue-900/30 border-l-4 border-blue-500">
                                                                                        {pres.time && (
                                                                                            <p className="text-yellow-300 font-semibold text-sm mb-2">
                                                                                                <i className="far fa-clock mr-2"></i>{pres.time}
                                                                                            </p>
                                                                                        )}
                                                                                        <h4 className="font-bold text-blue-200 text-base md:text-lg mb-3">{pres.activity}</h4>
                                                                                        
                                                                                        {/* Presenters */}
                                                                                        {pres.presenter && pres.presenter.length > 0 && (
                                                                                            <div className="mt-3 space-y-2">
                                                                                                {pres.presenter.map((p, pIndex) => (
                                                                                                    <div key={pIndex} className="text-sm text-slate-300 bg-slate-800/50 p-3 rounded">
                                                                                                        <p className="font-semibold text-slate-100">
                                                                                                            <i className="fas fa-user mr-2 text-green-400"></i>
                                                                                                            {p.name}
                                                                                                        </p>
                                                                                                        {p.department && (
                                                                                                            <p className="text-xs text-slate-400 mt-1 ml-6">{p.department}</p>
                                                                                                        )}
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchedulePage;