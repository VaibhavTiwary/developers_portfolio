import { db } from '@/utils';
import { projects } from '@/utils/schema';
import { TwicPicture } from '@twicpics/components/react'
import { eq } from 'drizzle-orm';
import { Link2, MapPin, SquareStack } from 'lucide-react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from 'react'
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/utils/firebaseConfig';

function ProjectListEdit({ projectList, refreshData }) {

    const [selectedOption, setSelectedOption] = useState();
    let timeoutId;

    const onInputChange = (event, fieldName, projectId) => {

        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
            const result = await db.update(projects)
                .set({
                    [fieldName]: event.target.value
                }).where(eq(projects.id, projectId))

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

    const handleFileUploadForProject = (event, projectId) => {
        const file = event.target.files[0];
        console.log("file")
        const fileName = Date.now().toString() + '.' + file.type.split('/')[1];
        console.log(fileName)
        const storageRef = ref(storage, fileName);

        uploadBytes(storageRef, file).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            const result = await db.update(projects).set({
                logo: fileName + "?alt=media"
            }).where(eq(projects.id, projectId))

            // console.log('Result', result)

            if (result) {
                refreshData()
                toast.success('Saved!', {
                    position: 'top-right'
                })
            }
            else {
                toast.error('Error', {
                    position: 'top-right'
                })
            }
        });
    }



    return (
        <div className='mt-10 '>
            {projectList.map((projects, index) => (
                <div className='my-7 rounded-lg bg-gray-800 p-5 ' key={index}>
                    <div className='flex items-center gap-3  '>
                        <label htmlFor={'project-file-input' + index} className='cursor-pointer'>
                            <TwicPicture src={projects.logo} className='w-[50px] h-[50px] rounded-full'></TwicPicture>
                        </label>
                        <input type='file' id={'project-file-input' + index}
                            onChange={(event) => handleFileUploadForProject(event, projects.id)} accept='image/png, image/gif, image/jpeg'
                            style={{ display: 'none' }} />
                        <input type="text" placeholder="Project Name"
                            defaultValue={projects.name}
                            className="input input-bordered w-full my-2"
                            onChange={(event) => onInputChange(event, 'name', projects.id)}
                        />
                    </div>
                    <input type="text" placeholder="Project Description" className="input input-bourlrdered w-full text-sm"
                        defaultValue={projects.desc}
                        onChange={(event) => onInputChange(event, 'desc', projects.id)}
                    />


                    <div className='flex gap-3 mt-3' key={index}>

                        <Link2 key={index} className={`h-12 w-12 p-3 text-blue-500 rounded-md hover:bg-gray-500
                    ${selectedOption == 'link' + index && 'bg-gray-600'}`}
                            onClick={() => setSelectedOption('link' + index)} />

                        <SquareStack className={`h-12 w-12 p-3 text-yellow-500 rounded-md hover:bg-gray-500
                    ${selectedOption == 'category' + index && 'bg-gray-600'}`}
                            onClick={() => setSelectedOption('category' + index)} />
                    </div>


                    {selectedOption == 'link' + index ?
                        <div className='mt-2'>
                            <label className="input input-bordered flex items-center gap-2">
                                <Link2 />
                                <input type="text" className="grow" placeholder="Url"
                                    key={1}
                                    defaultValue={projects?.url}
                                    onChange={(event) => onInputChange(event, 'url', projects.id)}
                                />
                            </label>
                        </div> :
                        selectedOption == 'category' + index ?
                            <div className='mt-2'>
                                <label className="input input-bordered flex items-center gap-2">
                                    <SquareStack />
                                    <input type="text" className="grow" placeholder="Category"
                                        key={2}
                                        defaultValue={projects?.category}
                                        onChange={(event) => onInputChange(event, 'category', projects.id)}
                                    />
                                </label>
                            </div> : null}
                </div>
            ))}


        </div>
    )
}

export default ProjectListEdit