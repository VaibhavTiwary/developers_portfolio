import { Camera } from 'lucide-react'
import React from 'react'

function BasicDetail() {
    return (
        <div className='p-7 rounded-lg bg-gray-600 my-7'>
            <div className='flex gap-6 items-center'>
                <Camera className='p-3 h-12 w-12 bg-gray-500 rounded-full' />
                <input type="text" placeholder="Username" className="input input-bordered w-full " />
            </div>
            <textarea className="textarea textarea-bordered mt-3 w-full" placeholder="Start Writing about yourself"></textarea>
        </div>
    )
}

export default BasicDetail