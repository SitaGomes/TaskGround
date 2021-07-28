import {firebase, auth} from "../Database/Firebase"

import {createContext, useState} from "react"

import {AuthContextType, ChildrenProp, UserType} from "../Types"
import { useEffect } from "react"
import { Message } from "../Hooks/useToast"


export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider ({children}: ChildrenProp) {

    const [user, setUser] = useState({} as UserType)
    const [isAuth, setIsAuth] = useState(!localStorage.getItem(`${user.uid}`))

    function handleIsAuth (state: boolean) {
        setIsAuth(state)
    }
    
    async function handleGoogleSingIn() {
        
        const Provider = new firebase.auth.GoogleAuthProvider()
        
        const userRaw = await auth.signInWithPopup(Provider)

        const newUser = {
            uid: userRaw.user?.uid,
            name: userRaw.user?.displayName,
            photo: userRaw.user?.photoURL
        }
        
        setUser(newUser)
        localStorage.setItem(`${newUser.uid}`, "UserId")
        
        handleIsAuth(true)
    }

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {

            if (user) {

                const {uid, displayName, photoURL} = user

                if (!displayName || !uid || !photoURL) return Message.error("Missing information from Google Account")

                const newUser = {
                    uid: uid,
                    name: displayName,
                    photo: photoURL
                }
                
                setUser(newUser)
                handleIsAuth(true)
            }

        })

        return () => {
            unsubscribe()
        }
        
    }, []) /* Keep the user's data after re-fresh */


    return(
        <AuthContext.Provider value={{user, isAuth, handleIsAuth, handleGoogleSingIn}}>
            {children}
        </AuthContext.Provider>
    )


}

