import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/signin')
    }

    return (
        <div>{session?.user?.image}</div>
    )
}

export default page