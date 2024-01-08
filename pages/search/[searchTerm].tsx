import { useRouter } from 'next/router'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils/utils'
import axios from 'axios'
import React, { useState } from 'react'
import NoResults from '../../components/NoResults'
import VideoCard from '../../components/VideoCard'
import useAuthStore from '../../strore/authStore'
import Link from 'next/link'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false)

  const router = useRouter()
  const { searchTerm }:any = router.query
  const { allUsers } = useAuthStore()

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'

  const searchedAccounts = allUsers.filter((user: IUser)=> user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className=''>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white'>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={()=> setIsAccounts(true)}>Accounts</p>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={()=> setIsAccounts(false)}>Videos</p>
      </div>

      <div>
        {isAccounts ? (
          <div className='md:mt-16'>
            {searchedAccounts.length > 0 ? (
              
              searchedAccounts.map((user: IUser, idx: number)=>(
                <Link href={`/profile/${user._id}`} key={idx}>
                  <div className='flex p-2 items-center rounded border-b-2 border-gray-200 gap-3 cursor-pointer font-semibold'>
                    <div className=''>
                      <Image src={user.image} alt='profile' width={50} height={50} className='rounded-full lg:w-20 lg:h-20' />
                    </div>
                    <div className='hidden xl:block'>
                      <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                        {user.userName.replace(' ', '')} 
                        <GoVerified className='text-green-500' />
                      </p>
                      <p className='text-xs text-gray-400'>{user.userName}</p>
                    </div>
                  </div>
                </Link>
              ))

            ): <NoResults text={`No video results for ${searchTerm}`} />}
          </div>
        ):(
          <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
            {videos.length ? (
              videos.map((video: Video, idx)=>(
                <VideoCard post={video} key={idx} />
              ))
            ): <NoResults text={`No video results for ${searchTerm}`} />}
          </div>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params: {searchTerm}}: {params: {searchTerm: string}})=>{
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props: { videos: res.data }
  }
}

export default Search