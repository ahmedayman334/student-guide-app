import { createContext, useState } from "react";

export const userContext=createContext();
export function UserProvider({children}){
    const [username,setUesrname]=useState("");
    const [isloggedIn,setIsLoggedIn]=useState(false);
    return(
        <userContext.Provider value={{username,setUesrname,isloggedIn,setIsLoggedIn}}>
            {children}
        </userContext.Provider>
    )

}