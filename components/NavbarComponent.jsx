'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {useSession} from 'next-auth/react'
import { Button } from './ui/button'
import styles from '@styles/navbar.module.css'
import { AiOutlineLogin } from "react-icons/ai";

const NavbarComponent = () => {
    const [AvatarMenu, setAvatarMenu] = useState(false);
    const {data: session} = useSession();

    const handleAvatarMenu = () => {
        console.log('AvatarMenu')
        setAvatarMenu(!AvatarMenu)
    }

  return (
    <>
<nav className="bg-white border-gray-200 dark:bg-[--background]">
  <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto px-2">
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/phrasify-logos_transparent.png" className="h-12 w-12" alt="PhrasifyLog" />
      <span className="self-center text-md flex absolute left-10 font-semibold whitespace-nowrap dark:text-[--primary]">Phrasify</span>
  </a>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">

  {session?.user && (
        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"
        onClick={handleAvatarMenu}
        >
          <img className="w-8 h-8 rounded-full" src="https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/image3.webp" alt="user photo" />
        </button>
  )}
     
     {/* DropDownMenu */}
      
    {AvatarMenu && (
        <div className="z-50 absolute top-14 right-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-[--popover-foreground] dark:bg-[--background]" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
    )}

    {!AvatarMenu && (
      <a href='/signin'><Button className={styles.getStartedButton}>Get Started <AiOutlineLogin className='ml-2 w-4 h-4'/></Button></a>
    )}

     
  </div>

        
  </div>
</nav>
    </>
  )
}

export default NavbarComponent