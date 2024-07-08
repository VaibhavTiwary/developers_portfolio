import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { db } from '@/utils';
import { userInfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { Camera } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function BasicDetail() {

    let timeoutId;
    const { user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    useEffect(() => {
        userDetail && console.log(userDetail);
    })
    /**
     * used to save user info
     * @param {*} event 
     * @param {*} fieldName 
     */
    const onInputChange = (event, fieldName) => {

        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
            const result = await db.update(userInfo)
                .set({
                    [fieldName]: event.target.value
                }).where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress))

            if (result) {
                toast.success('Saved!', {
                    position: 'top-right'
                })
            }
            else {
                toast.error('Error', {
                    position: 'top-right'
                })
            }
        }, 1000)
    }
    return (
        <div className='p-7 rounded-lg bg-gray-600 my-7'>
            <div className='flex gap-6 items-center'>
                <Camera className='p-3 h-12 w-12 bg-gray-500 rounded-full' />
                <input type="text" placeholder="Username"
                    defaultValue={userDetail?.name}
                    onChange={(event) => onInputChange(event, 'name')}
                    className="input input-bordered w-full " />
            </div>
            <textarea className="textarea textarea-bordered mt-3 w-full" placeholder="Start Writing about yourself"
                defaultValue={userDetail?.bio} onChange={(event) => onInputChange(event, 'bio')}
            ></textarea>
        </div>
    )
}

export default BasicDetail