import { createContext, useState } from "react";


export const userContext = createContext(null)

export function UserContextProvider({children}){
    let [user, setUser] = useState(null)
    let [login, setLogin] = useState(null)
    let [isopen, setIsOpen] = useState(false)

    return <userContext.Provider value={{user, setUser, login, setLogin, isopen, setIsOpen}}>
        {children}
    </userContext.Provider>
}