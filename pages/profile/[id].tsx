import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar'
import { BASE_URL } from '../../utils/utils'
import { IUser, Video } from '../../types'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'

interface IProps {
  data: {
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}

const profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videosList, setVideosList] = useState<Video[]>([])
  const { user, userVideos, userLikedVideos } = data

  const Videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const Liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

  useEffect(() => {
    if(showUserVideos){
      setVideosList(userVideos)
    }else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])
  

  return (
    <div className='flex gap-6 h-full w-full'>
      <div className='h-full max-w-[40%] overflow-hidden hover:overflow-auto sticky'>
        <Sidebar />
      </div>
      <div className='max-w-[60%] max-h-[90vh] overflow-auto'>
        <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full items-center'>
          <div className='w-16 h-16 md:w-32 md:h-32'>
            <Image src={user.image} alt='profile' width={120} height={120} className='rounded-full' layout='responsiv' />
          </div>
          <div>
            <p className='flex gap-1 md:text-2xl tracking-wider items-center text-md font-bold text-primary lowercase'>
              {user.userName.replace(' ', '')} 
              <GoVerified className='text-green-500' />
            </p>
            <p className='capitalize text-xs md:text-xl text-gray-400'>{user.userName}</p>
          </div>
        </div>
        
        <div className=''>
          <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white'>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${Videos}`} onClick={()=> setShowUserVideos(true)}>Videos {userVideos.length}</p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${Liked}`} onClick={()=> setShowUserVideos(false)}>Liked {userLikedVideos.length}</p>
          </div>

          <div className='flex gap-6 flex-wrap md:justify-start'>
            {videosList.length > 0 ? (
              videosList.map((post: Video, idx: number) => (
                <VideoCard post={post} key={idx}/>
              ))
            ) : <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet!`} />}
          </div>

        </div>

      </div> 
    </div>
    
  )
}

export const getServerSideProps = async ({params: {id}}: {params: {id: string}})=>{
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: { data: res.data }
  }
}

export default profile