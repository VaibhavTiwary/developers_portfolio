import React from 'react'
import BasicDetail from './BasicDetail'
import AddProject from './AddProject'

function FormContent() {
    return (
        <div className='py-12 px-6'>
            <h2 className='font-bold text-3xl'>Start Designing Your Portfolio</h2>
            <BasicDetail />
            <hr className='my-5'></hr>
            <AddProject />
        </div>
    )
}

export default FormContent