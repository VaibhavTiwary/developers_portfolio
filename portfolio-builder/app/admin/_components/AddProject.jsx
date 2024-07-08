import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { db } from '@/utils';
import { projects } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Link2 } from 'lucide-react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useState } from 'react'

function AddProject() {

    const [openUrlInput, setOpenUrlInput] = useState(false)
    const { user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await db.insert(projects).values({
            url: e.target[0].value,
            emailRef: user?.primaryEmailAddress.emailAddress,
            userRef: userDetail?.id
        })
        if (result) {
            setLoading(false)
            toast.success('New Project Added!', {
                position: 'top-right'
            })
        }
        else {
            setLoading(false)
            toast.error('Error', {
                position: 'top-right'
            })
        }
    }
    return (
        <div>
            {!openUrlInput ?
                <button className=' btn btn-secondary w-full' onClick={() => setOpenUrlInput(true)}>+ Add New Project</button>
                :
                <form onSubmit={handleSubmit} className='p-3 rounded-lg bg-gray-800'>
                    <label className="input input-bordered flex items-center gap-2 my-3">
                        <Link2 />
                        <input type="url" className="grow" defaultValue={'https://'} placeholder="Project URL" />

                    </label>
                    <button type='submit' className=' btn btn-secondary w-full'>+ Add New Project</button>
                </form>
            }

        </div>
    )
}

export default AddProject