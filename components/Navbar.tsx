import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import Logo from '../utils/utils/tiktik-logo.png'
import { createOrGetUser } from '../utils/utils'
import useAuthStore from '../strore/authStore'
import { IoMdAdd } from 'react-icons/io'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/router'

const Navbar = () => {
  const { userProfile, addUser, removeUser }:any = useAuthStore()
  const [searchValue, setSearchValue] = useState('')

  const router = useRouter()

  const handleSearch = ( e: { preventDefault: ()=> void })=> {
    e.preventDefault()

    if(searchValue){
      router.push(`/search/${searchValue}`)
      setSearchValue('')
    }
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-300 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
          <Image className='cursor-pointer' src={Logo} alt="Logo" layout='responsive' />
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form onSubmit={handleSearch} className='absolute md:static top-0 left-20 bg-white'>
          <input type="text" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} placeholder='Search accounts and videos' className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-gray-300 w-[300px] md:w-[350px] md:top-0 rounded-full' />
          <button onClick={handleSearch} className='absolute right-6 md:right-5 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className='flex items-center gap-5 md:gap-10'>
            <Link href='/Upload'>
              <button className='border-2 px-2 md:px4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl'/>
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href='/' className='flex items-center gap-1'>
                <>
                  <Image width={40} height={40} className='rounded-full' src={userProfile.image} alt='Profile photo' />
                  <span className='font-bold text-lg hidden md:block'>{userProfile.userName}</span>
                </>
              </Link>
            )}

            <button type='button' className='px-2 p-1 rounded-full border-2 border-red-400' onClick={()=> {
              googleLogout() 
              removeUser()
            }}>
              <AiOutlineLogout className='text-red-500 text-3xl'/>
            </button>

          </div>
        ) : (
          <GoogleLogin onSuccess={(response) => createOrGetUser(response, addUser)} onError={()=> console.log('error')}/>
        )}
      </div>

    </div>
  )
}

export default Navbar