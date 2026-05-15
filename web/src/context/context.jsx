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
        
        const today = new Date().toISOString().split('T')[0];
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

    useEffect(() => {
        if (userData) {
            localStorage.setItem('studentGuideUserData', JSON.stringify(userData));
        }
    }, [userData]);

    useEffect(() => {
        localStorage.setItem('globalSchedules', JSON.stringify(schedules));
    }, [schedules]);

    const addSchedule = (schedule) => {
        setSchedules(prev => {
            const colors = [
                { bgColor: "bg-[#EEF0FF]", textColor: "text-[#4E58CA]", iconType: "book" },
                { bgColor: "bg-[#DFF1EB]", textColor: "text-[#2A9D79]", iconType: "flask" },
                { bgColor: "bg-[#F3DEC9]", textColor: "text-[#D68D4F]", iconType: "palette" },
                { bgColor: "bg-[#FFF4E5]", textColor: "text-[#FF9800]", iconType: "book" },
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const updated = [...prev, { ...schedule, id: Date.now(), ...randomColor }];
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
            deleteSchedule
        }}>
            {children}
        </userContext.Provider>
    );
}