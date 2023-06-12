
import { NavLink } from 'react-router-dom'

import { FaHome, FaList } from 'react-icons/fa'


const DashboardLink = () => {



    return (
        <>

            <NavLink
                to='add-products'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <FaHome className='w-5 h-5' />

                <span className='mx-4 font-medium'>Add products</span>
            </NavLink>






            <NavLink
                to='product-list'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <FaList className='w-5 h-5' />

                <span className='mx-4 font-medium'>Product List</span>
            </NavLink>











        </>
    )
}

export default DashboardLink
