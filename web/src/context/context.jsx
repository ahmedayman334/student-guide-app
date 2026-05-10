import { createContext, useState, useEffect } from "react";

export const userContext = createContext();

const defaultUser = {
  id: "ST-9982441",
  name: "Johnathan Doe",
  email: "john.doe@university.edu",
  department: "Computer Science",
  year: "3rd Year",
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

    useEffect(() => {
        if (userData) {
            localStorage.setItem('studentGuideUserData', JSON.stringify(userData));
        }
    }, [userData]);

    const loginUser = (userApiData) => {
        const newUserData = {
            ...defaultUser,
            name: userApiData.username || userApiData.FullName || defaultUser.name,
            email: userApiData.email || defaultUser.email,
            id: userApiData.id || defaultUser.id,
            // Try to keep existing saved data if user logging in matches the saved user
            ...(localStorage.getItem('studentGuideUserData') && JSON.parse(localStorage.getItem('studentGuideUserData')).email === userApiData.email 
                ? JSON.parse(localStorage.getItem('studentGuideUserData')) 
                : {})
        };
        
        if (userApiData.username || userApiData.FullName) {
           newUserData.name = userApiData.username || userApiData.FullName;
        }

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
            updateTargetGpa
        }}>
            {children}
        </userContext.Provider>
    );
}