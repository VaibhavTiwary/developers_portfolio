import React, { useEffect, useState } from 'react'
import BasicDetail from './BasicDetail'
import AddProject from './AddProject'
import { projects } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils'
import ProjectListEdit from './ProjectListEdit'

function FormContent() {

    const { user } = useUser();
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        user && getProjectList();
    }, [user])


    const getProjectList = async () => {
        const result = await db.select().from(projects)
            .where(eq(projects.emailRef, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(projects.id))

        console.log(result)

        setProjectList(result)


    }



    return (
        <div className='py-12 px-6'>
            <h2 className='font-bold text-3xl'>Start Designing Your Portfolio</h2>
            <BasicDetail />
            <hr className='my-5'></hr>
            <AddProject />
            <ProjectListEdit projectList={projectList} />
        </div>
    )
}

export default FormContent