import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
    IoNotificationsOutline, 
    IoBookOutline, 
    IoCalendarOutline, 
    IoDocumentTextOutline, 
    IoMegaphoneOutline,
    IoCheckmarkOutline,
    IoTrashOutline
} from 'react-icons/io5';
import { userContext } from '../context/context';

export default function NotificationBell({ size = 24 }) {
    const { 
        userData, 
        markNotificationAsRead, 
        markAllNotificationsAsRead, 
        deleteNotification 
    } = useContext(userContext);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const notifications = userData?.notifications || [];
    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'lecture': return <IoBookOutline className="text-[#4E58CA]" size={18} />;
            case 'exam': return <IoCalendarOutline className="text-[#D64F5D]" size={18} />;
            case 'assignment': return <IoDocumentTextOutline className="text-[#D68D4F]" size={18} />;
            case 'announcement': return <IoMegaphoneOutline className="text-[#2A9D79]" size={18} />;
            default: return <IoNotificationsOutline className="text-[#7F8A9E]" size={18} />;
        }
    };

    const getIconBg = (type) => {
        switch (type) {
            case 'lecture': return 'bg-[#EEF0FF]';
            case 'exam': return 'bg-[#FFF5F6]';
            case 'assignment': return 'bg-[#FFF8E7]';
            case 'announcement': return 'bg-[#EAFAF1]';
            default: return 'bg-[#F3F4F6]';
        }
    };

    const formatTime = (isoString) => {
        const diffMs = new Date().getTime() - new Date(isoString).getTime();
        const diffMins = Math.round(diffMs / (1000 * 60));
        const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHrs < 24) return `${diffHrs}h ago`;
        return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Bell Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-1.5 rounded-full hover:bg-[#EBEBF2]/50 transition-colors focus:outline-none flex items-center justify-center"
                style={{ color: 'inherit' }}
            >
                <IoNotificationsOutline size={size} className="cursor-pointer hover:text-[#1D214E] transition-colors" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#D64F5D] text-[9px] font-bold text-white shadow-sm">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Card */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-[360px] bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#EBEBF2] z-50 overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-[#EBEBF2] flex items-center justify-between bg-white">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#1D214E] text-[15px]">Academic Alerts</h3>
                            {unreadCount > 0 && (
                                <span className="bg-[#EEF0FF] text-[#4E58CA] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button 
                                onClick={markAllNotificationsAsRead}
                                className="text-[#4E58CA] hover:text-[#3B44B3] text-[11px] font-bold transition-colors flex items-center gap-1"
                            >
                                <IoCheckmarkOutline size={14} /> Clear all unread
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-[360px] overflow-y-auto divide-y divide-[#F3F4F6]">
                        {notifications.length > 0 ? (
                            notifications.map(n => {
                                const priorityColors = {
                                    normal: 'bg-[#4E58CA]',
                                    important: 'bg-[#D68D4F]',
                                    urgent: 'bg-[#D64F5D]'
                                };
                                return (
                                    <div 
                                        key={n.id} 
                                        className={`p-4 flex gap-3 transition-colors hover:bg-[#F9FAFB] relative ${!n.isRead ? 'bg-[#F5F7FF]' : 'bg-white'}`}
                                    >
                                        {/* Icon */}
                                        <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${getIconBg(n.type)}`}>
                                            {getIcon(n.type)}
                                        </div>

                                        {/* Text Info */}
                                        <div className="flex-1 min-w-0 pr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`h-2 w-2 rounded-full shrink-0 ${priorityColors[n.priority]}`} title={`${n.priority} priority`}></span>
                                                <span className="text-[#1D214E] font-bold text-[13px] block truncate">{n.title}</span>
                                            </div>
                                            <p className="text-[#5C6A7E] text-[12px] leading-relaxed break-words">{n.message}</p>
                                            <span className="text-[#9CA3AF] text-[10px] mt-1.5 block font-medium">{formatTime(n.timestamp)}</span>
                                        </div>

                                        {/* Actions */}
                                        <div className="absolute right-2 top-3 flex flex-col gap-1.5 shrink-0">
                                            {!n.isRead && (
                                                <button 
                                                    onClick={() => markNotificationAsRead(n.id)}
                                                    className="text-[#9CA3AF] hover:text-[#4E58CA] p-1 rounded-full hover:bg-white transition-colors"
                                                    title="Mark as Read"
                                                >
                                                    <IoCheckmarkOutline size={15} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => deleteNotification(n.id)}
                                                className="text-[#9CA3AF] hover:text-[#D64F5D] p-1 rounded-full hover:bg-white transition-colors"
                                                title="Delete Notification"
                                            >
                                                <IoTrashOutline size={13} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-8 flex flex-col items-center justify-center text-center">
                                <div className="h-12 w-12 rounded-full bg-[#EEF0FF] flex items-center justify-center text-[#4E58CA] mb-3">
                                    <IoNotificationsOutline size={22} />
                                </div>
                                <h4 className="font-bold text-[#1D214E] text-[13px] mb-1">No alerts found</h4>
                                <p className="text-[#7F8A9E] text-[11px] max-w-[210px] leading-relaxed">You are all caught up with your lectures, exams and assignments.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
