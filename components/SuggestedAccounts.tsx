import Link from 'next/link'
import useAuthStore from '../strore/authStore'
import React, { useEffect } from 'react'
import { IUser } from '../types'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore()

  useEffect(()=> {
    fetchAllUsers()
  }, [fetchAllUsers])

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggest an Account to Follow
      </p>
      <div>
        {allUsers.slice(0,6).map((user:IUser)=> (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image src={user.image} alt='profile' width={34} height={34} className='rounded-full' layout='responsiv' />
              </div>
              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {user.userName.replace(' ', '')} 
                  <GoVerified className='text-green-500' />
                </p>
                <p className='capitalize text-xs text-gray-400'>{user.userName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts