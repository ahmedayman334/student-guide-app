import { createContext, useState, useEffect } from "react";

export const userContext = createContext();

const defaultUser = {
  id: "ST-9982441",
  name: "Johnathan Doe",
  email: "john.doe@university.edu",
  department: "Computer Science",
  year: "Third Year",
  gpa: 3.62,
  credits: 84,
  targetGpa: 3.85,
  subjects: [
    { id: 1, name: "Advanced Microeconomics", credits: 4, grade: "A-", points: 3.7 },
    { id: 2, name: "Data Structures & Algorithms", credits: 3, grade: "A", points: 4.0 }
  ]
};

export function UserProvider({children}) {
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem('studentGuideUserData');
        return savedData ? JSON.parse(savedData) : null;
    });
    
    const [isloggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem('token');
    });

    const [schedules, setSchedules] = useState(() => {
        const saved = localStorage.getItem('globalSchedules');
        if (saved) return JSON.parse(saved);
        
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localNow = new Date(now.getTime() - (offset * 60 * 1000));
        const today = localNow.toISOString().split('T')[0];
        
        return [
            {
                id: 1,
                title: "Advanced Calculus",
                type: "Lecture",
                date: today,
                time: "10:30",
                room: "Room 402 • Prof. Higgins",
                bgColor: "bg-[#EEF0FF]",
                textColor: "text-[#4E58CA]",
                iconType: "book"
            },
            {
                id: 2,
                title: "Organic Chemistry Lab",
                type: "Lecture",
                date: today,
                time: "13:00",
                room: "Lab B • Dr. Aris",
                bgColor: "bg-[#DFF1EB]",
                textColor: "text-[#2A9D79]",
                iconType: "flask"
            },
            {
                id: 3,
                title: "Modern Literature",
                type: "Lecture",
                date: today,
                time: "15:30",
                room: "Hall C • Prof. Blake",
                bgColor: "bg-[#F3DEC9]",
                textColor: "text-[#D68D4F]",
                iconType: "palette"
            }
        ];
    });

    const [announcements, setAnnouncements] = useState(() => {
        const saved = localStorage.getItem('globalAnnouncements');
        if (saved) return JSON.parse(saved);
        
        const now = new Date();
        const formatDate = (daysAgo, hoursAgo = 0) => {
            const d = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000));
            return d.toISOString();
        };

        return [
            {
                id: 1,
                title: "Spring 2026 Final Exam Schedule Released",
                desc: "The comprehensive final exam schedule for the upcoming spring semester is now officially published. Check the portal for details.",
                date: formatDate(0, 2), // 2 hours ago
                priority: "important",
                status: "Sent"
            },
            {
                id: 2,
                title: "Scholarship Application Deadline Extended",
                desc: "Great news for students: the deadline for the University Merit Scholarship has been extended by one additional week. Submit your forms.",
                date: formatDate(1), // 1 day ago
                priority: "urgent",
                status: "Sent"
            },
            {
                id: 3,
                title: "Campus Infrastructure Maintenance Notice",
                desc: "Scheduled server maintenance will occur this weekend, affecting access to the student library portals between 2 AM and 6 AM.",
                date: formatDate(3), // 3 days ago
                priority: "normal",
                status: "Sent"
            }
        ];
    });

    useEffect(() => {
        if (userData) {
            localStorage.setItem('studentGuideUserData', JSON.stringify(userData));
        }
    }, [userData]);

    useEffect(() => {
        localStorage.setItem('globalSchedules', JSON.stringify(schedules));
    }, [schedules]);

    useEffect(() => {
        localStorage.setItem('globalAnnouncements', JSON.stringify(announcements));
    }, [announcements]);

    // Automatically generate notifications dynamically
    useEffect(() => {
        if (!isloggedIn || !userData) return;

        const checkAndGenerate = () => {
            const now = new Date();
            const existingNotifications = userData.notifications || [];
            const newNotifications = [...existingNotifications];
            let hasChanges = false;

            const exists = (key) => existingNotifications.some(n => n.uniqueKey === key);

            // 1. Lecture & Exam Notifications from schedules (Upcoming alerts)
            schedules.forEach(schedule => {
                const eventTime = new Date(`${schedule.date}T${schedule.time}`);
                const timeDiffMs = eventTime.getTime() - now.getTime();
                const timeDiffHrs = timeDiffMs / (1000 * 60 * 60);

                if (timeDiffHrs > -0.25) { // Active or upcoming (within last 15 mins)
                    if (schedule.type === 'Lecture' || schedule.type === 'Workshop') {
                        if (timeDiffHrs <= 4) { // within 4 hours
                            const uniqueKey = `lecture_${schedule.id}_${schedule.date}`;
                            if (!exists(uniqueKey)) {
                                let priority = 'normal';
                                if (timeDiffHrs <= 0.5) priority = 'urgent';
                                else if (timeDiffHrs <= 2) priority = 'important';

                                newNotifications.push({
                                    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                                    uniqueKey,
                                    title: `Upcoming ${schedule.type}: ${schedule.title}`,
                                    message: `Your class starts in ${Math.round(timeDiffHrs * 60)} mins in ${schedule.room || 'TBD'}.`,
                                    type: 'lecture',
                                    priority,
                                    timestamp: now.toISOString(),
                                    isRead: false,
                                    expiresAt: new Date(eventTime.getTime() + 2 * 60 * 60 * 1000).toISOString() // Expires after 2 hrs
                                });
                                hasChanges = true;
                            }
                        }
                    } else if (schedule.type === 'Exam') {
                        if (timeDiffHrs <= 48) { // within 48 hours
                            const uniqueKey = `exam_${schedule.id}_${schedule.date}`;
                            if (!exists(uniqueKey)) {
                                let priority = 'important';
                                if (timeDiffHrs <= 2) priority = 'urgent';

                                newNotifications.push({
                                    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                                    uniqueKey,
                                    title: `Upcoming Exam: ${schedule.title}`,
                                    message: `Prep time! Your exam is scheduled on ${schedule.date} at ${schedule.time} in ${schedule.room || 'TBD'}.`,
                                    type: 'exam',
                                    priority,
                                    timestamp: now.toISOString(),
                                    isRead: false,
                                    expiresAt: new Date(eventTime.getTime() + 4 * 60 * 60 * 1000).toISOString() // Expires after 4 hrs
                                });
                                hasChanges = true;
                            }
                        }
                    }
                }
            });

            // 2. Assignment Deadlines
            if (userData.subjects && Array.isArray(userData.subjects)) {
                userData.subjects.forEach(subject => {
                    const nextFriday = new Date(now);
                    const day = nextFriday.getDay();
                    const daysUntilFriday = (5 - day + 7) % 7;
                    nextFriday.setDate(nextFriday.getDate() + daysUntilFriday);
                    nextFriday.setHours(23, 59, 0, 0);

                    if (nextFriday.getTime() <= now.getTime()) {
                        nextFriday.setDate(nextFriday.getDate() + 7);
                    }

                    const timeDiffMs = nextFriday.getTime() - now.getTime();
                    const timeDiffHrs = timeDiffMs / (1000 * 60 * 60);

                    if (timeDiffHrs <= 72) { // within 3 days
                        const dateStr = nextFriday.toISOString().split('T')[0];
                        const uniqueKey = `assignment_${subject.id}_${dateStr}`;

                        if (!exists(uniqueKey)) {
                            let priority = 'important';
                            if (timeDiffHrs <= 24) priority = 'urgent';

                            newNotifications.push({
                                id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                                uniqueKey,
                                title: `Assignment Due: ${subject.name}`,
                                message: `The weekly assignment for ${subject.name} is due this Friday at 11:59 PM.`,
                                type: 'assignment',
                                priority,
                                timestamp: now.toISOString(),
                                isRead: false,
                                expiresAt: new Date(nextFriday.getTime() + 1 * 60 * 60 * 1000).toISOString() // Expires 1 hr after deadline
                            });
                            hasChanges = true;
                        }
                    }
                });
            }

            // 3. Announcements (Important notices)
            announcements.forEach(ann => {
                const annDate = new Date(ann.date);
                const ageDays = (now.getTime() - annDate.getTime()) / (1000 * 60 * 60 * 24);

                if (ageDays >= 0 && ageDays <= 7) {
                    const uniqueKey = `announcement_${ann.id}`;
                    if (!exists(uniqueKey)) {
                        newNotifications.push({
                            id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                            uniqueKey,
                            title: `New Announcement: ${ann.title}`,
                            message: ann.desc,
                            type: 'announcement',
                            priority: ann.priority || 'important',
                            timestamp: now.toISOString(),
                            isRead: false,
                            expiresAt: new Date(annDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() // Expires 7 days after
                        });
                        hasChanges = true;
                    }
                }
            });

            // 4. New Schedule Additions (Triggered instantly when admin schedules a new lecture/exam/workshop)
            schedules.forEach(schedule => {
                if (schedule.createdAt) {
                    const createdDate = new Date(schedule.createdAt);
                    const ageHrs = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);

                    // If added in the last 24 hours
                    if (ageHrs >= 0 && ageHrs <= 24) {
                        const uniqueKey = `new_schedule_added_${schedule.id}`;
                        if (!exists(uniqueKey)) {
                            newNotifications.push({
                                id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                                uniqueKey,
                                title: `New Event Scheduled`,
                                message: `Admin has added a new ${schedule.type.toLowerCase()}: "${schedule.title}" on ${schedule.date} at ${schedule.time} in ${schedule.room || 'TBD'}.`,
                                type: schedule.type === 'Exam' ? 'exam' : 'lecture',
                                priority: 'important',
                                timestamp: now.toISOString(),
                                isRead: false,
                                expiresAt: new Date(createdDate.getTime() + 48 * 60 * 60 * 1000).toISOString() // Expires in 48 hours
                            });
                            hasChanges = true;
                        }
                    }
                }
            });

            // 5. Automatic cleanup of expired notifications
            const activeNotifications = newNotifications.filter(n => {
                const isExpired = new Date(n.expiresAt).getTime() < now.getTime();
                if (isExpired) {
                    hasChanges = true;
                }
                return !isExpired;
            });

            if (hasChanges) {
                setUserData(prev => ({
                    ...prev,
                    notifications: activeNotifications
                }));
            }
        };

        // Run immediately on load/change
        checkAndGenerate();

        // Run periodically every 15 seconds to catch upcoming schedules and expiration times
        const intervalId = setInterval(checkAndGenerate, 15000);
        return () => clearInterval(intervalId);
    }, [isloggedIn, userData?.subjects, schedules, announcements]);

    const addSchedule = (schedule) => {
        setSchedules(prev => {
            const colors = [
                { bgColor: "bg-[#EEF0FF]", textColor: "text-[#4E58CA]", iconType: "book" },
                { bgColor: "bg-[#DFF1EB]", textColor: "text-[#2A9D79]", iconType: "flask" },
                { bgColor: "bg-[#F3DEC9]", textColor: "text-[#D68D4F]", iconType: "palette" },
                { bgColor: "bg-[#FFF4E5]", textColor: "text-[#FF9800]", iconType: "book" },
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const updated = [...prev, { ...schedule, id: Date.now(), createdAt: new Date().toISOString(), ...randomColor }];
            return updated.sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateA - dateB;
            });
        });
    };

    const deleteSchedule = (id) => {
        setSchedules(prev => prev.filter(s => s.id !== id));
    };

    const addAnnouncement = (ann) => {
        setAnnouncements(prev => [
            { ...ann, id: Date.now(), date: new Date().toISOString(), status: "Sent" },
            ...prev
        ]);
    };

    const markNotificationAsRead = (id) => {
        setUserData(prev => {
            if (!prev || !prev.notifications) return prev;
            return {
                ...prev,
                notifications: prev.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
            };
        });
    };

    const markAllNotificationsAsRead = () => {
        setUserData(prev => {
            if (!prev || !prev.notifications) return prev;
            return {
                ...prev,
                notifications: prev.notifications.map(n => ({ ...n, isRead: true }))
            };
        });
    };

    const deleteNotification = (id) => {
        setUserData(prev => {
            if (!prev || !prev.notifications) return prev;
            return {
                ...prev,
                notifications: prev.notifications.filter(n => n.id !== id)
            };
        });
    };

    const loginUser = (userApiData) => {
        const savedDataRaw = localStorage.getItem('studentGuideUserData');
        const savedData = savedDataRaw ? JSON.parse(savedDataRaw) : {};

        const newUserData = {
            ...defaultUser,
            ...(savedData.email === userApiData.email ? savedData : {}), // Keep old data if same user
            
            // Override with newly provided data
            name: userApiData.username || userApiData.FullName || savedData.name || defaultUser.name,
            email: userApiData.email || savedData.email || defaultUser.email,
            id: userApiData.id || savedData.id || defaultUser.id,
            year: userApiData.year || savedData.year || defaultUser.year,
            department: userApiData.department || savedData.department || defaultUser.department,
            notifications: savedData.email === userApiData.email ? (savedData.notifications || []) : []
        };

        setUserData(newUserData);
        setIsLoggedIn(true);
        localStorage.setItem('token', 'fake-token');
    };

    const logoutUser = () => {
        setUserData(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('studentGuideUserData');
    };

    const updateProfile = (newData) => {
        setUserData(prev => ({ ...prev, ...newData }));
    };

    const addSubject = (subject) => {
        setUserData(prev => ({
            ...prev,
            subjects: [...(prev?.subjects || []), { ...subject, id: Date.now() }]
        }));
    };

    const updateSubject = (id, updatedSubject) => {
        setUserData(prev => ({
            ...prev,
            subjects: prev.subjects.map(sub => sub.id === id ? updatedSubject : sub)
        }));
    };

    const deleteSubject = (id) => {
        setUserData(prev => ({
            ...prev,
            subjects: prev.subjects.filter(sub => sub.id !== id)
        }));
    };

    const updateTargetGpa = (newTarget) => {
        setUserData(prev => ({ ...prev, targetGpa: newTarget }));
    };

    return (
        <userContext.Provider value={{
            userData, 
            isloggedIn, 
            loginUser, 
            logoutUser, 
            updateProfile,
            addSubject,
            updateSubject,
            deleteSubject,
            updateTargetGpa,
            schedules,
            addSchedule,
            deleteSchedule,
            announcements,
            addAnnouncement,
            markNotificationAsRead,
            markAllNotificationsAsRead,
            deleteNotification
        }}>
            {children}
        </userContext.Provider>
    );
}