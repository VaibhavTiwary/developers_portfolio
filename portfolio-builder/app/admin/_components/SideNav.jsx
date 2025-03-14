import { UserButton } from '@clerk/nextjs'
import { BarChart, Layers3, Settings, Brush } from 'lucide-react'
import React from 'react'

function SideNav() {

    const menuList = [
        {
            id: 1,
            name: 'pages',
            icon: Layers3
        },
        {
            id: 2,
            name: 'Style',
            icon: Brush
        },
        {
            id: 3,
            name: 'Stats',
            icon: BarChart
        },
        {
            id: 4,
            name: 'Settings',
            icon: Settings
        }
    ]
    return (
        <div className='p-4 bg-[#00000052] h-screen'>
            {
                menuList.map((menu, index) => (
                    <div className='p-2 py-4 rounded-lg 
                    bg-primary flex items-center
                     justify-center mb-5 cursor-pointer
                     tooltip-secondary tooltip tooltip-right'
                        data-tip={menu.name}>
                        <menu.icon className='text-white text-center' />
                    </div>
                ))
            }
            <div className='fixed bottom-5 px-4'>
                <UserButton />
            </div>
        </div>
    )
}

export default SideNav