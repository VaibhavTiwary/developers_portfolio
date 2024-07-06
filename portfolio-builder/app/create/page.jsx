"use client"
import React, { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { db } from '@/utils'
import { eq } from 'drizzle-orm';
import { userInfo } from '@/utils/schema'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CreateUsername() {
    const [username, setUsername] = useState();
    const { user } = useUser();

    const router = useRouter();

    useEffect(() => {
        user && checkUser();
    }, [user])

    const checkUser = async () => {
        const result = await db.select().from(userInfo)
            .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress))
        if (result?.length > 0) {
            router.replace('/admin')
        }

    }

    const onCreateBtnClick = async () => {
        if (username.length > 10) {
            toast.error("No More than 10 Characters!", {
                position: "top-right"
            });
            return;
        }
        const result = await db.insert(userInfo)
            .values({
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                username: username.replace(' ', '')
            })
        if (result) {
            toast.success("Username created successfully!", {
                position: "top-right"
            });
            router.replace('/admin')

        }
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='p-10 border rounded-lg flex flex-col'>
                <h2 className='font-bold text-2xl py-5 text-center'>Create Portfolio Username</h2>
                <label className='py-2'>Add Username for your Portfolio</label>
                <input type="text" placeholder="Type here"
                    onChange={(event) => setUsername(event.target.value)}
                    className="input input-bordered py-2 w-full max-w-xs" />
                <button disabled={!username} onClick={onCreateBtnClick} className='btn btn-primary mt-3 '>Create</button>
            </div>

        </div>
    )
}

export default CreateUsername;