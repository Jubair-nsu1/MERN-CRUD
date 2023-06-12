/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../firebase.config";
import axios from "axios";



export const AuthContext = createContext(null)
const auth = getAuth(app)


const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    const google = (googelProvider) => {
        setLoading(true)
        return signInWithPopup(auth, googelProvider)

    }

    const github = (githubProvider) => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)

    }


    const createAccount = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const loginAccount = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {

                axios.post('http://localhost:5000/jwt', { email: currentUser.email })

                    .then((data) => {
                        console.log(data)
                        localStorage.setItem("access-token", data.data.token)
                        setLoading(false)
                    })
            }

            else {
                localStorage.removeItem("access-token")
            }


        })
        return () => { unsubscribe() }
    }, [])


    const userName = (name, img) => {

        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: img
        })
            .then(() => setUser((user) => ({ ...user, displayName: name, photoURL: img })))
            .catch((error) => { console.log(error) });
    }



    const authInfo = {
        user,
        loginAccount,
        createAccount,
        logOut,
        userName,
        loading,
        google,
        github


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProviders;