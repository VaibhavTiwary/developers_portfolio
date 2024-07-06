"use client"   //we are using useRouter so we need to write this at top
import { db } from '@/utils'
import { userInfo } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { check } from 'drizzle-orm/mysql-core'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Admin() {

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        user && checkUser();    //we will call checkuser only when we have user.
    }, [user])

    // used to check user already exist or not
    const checkUser = async () => {
        const result = await db.select().from(userInfo)
            .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress))
        console.log(result);
        if (result?.length == 0) {
            router.replace('/create')
        }

    }
    return (
        <div>Admin page</div>
    )
}

export default Admin