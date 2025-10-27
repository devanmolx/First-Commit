"use client"
import React, { useEffect, useState } from 'react'
import { UserContext } from "@/context/User/UserContext"
import { UserType } from '@/types/types';
import { useSession } from 'next-auth/react';

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserType | undefined>(undefined);
    const { data: session } = useSession();

    useEffect(() => {
        if (
            session?.user &&
            session.user.name &&
            session.user.email &&
            session.user.image
        ) {
            setUser({
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
            });
        }
    }, [session]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider