import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { Video } from '../types'
import Link from 'next/link'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import { BsFillPauseFill, BsFillPlayFill, BsVolumeUp, BsVolumeOff } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import Home from '@/pages'
import { BASE_URL } from '../utils/utils'

interface IProps {
  post: Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if(playing){
      videoRef.current?.pause()
      setPlaying(false)
    }else{
      videoRef.current?.play()
      setPlaying(true)
    }
  }

  useEffect(()=>{
    if(videoRef?.current){
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex w-fit gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image width={62} height={62} className='rounded-full' src={post.postedBy.image} alt='Profile photo' layout='responsive' />
              </>
            </Link>
          </div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className='flex flex-col gap-1 mt-1'>
              <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName} <GoVerified className='text-green-500'/></p>
              <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
            </div>
          </Link>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4'>
        <div className='rounded-3xl relative border' onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
          <Link href={`/detail/${post._id}`}>
            <video loop ref={videoRef} className='lg:w-[600px] lg:h-[400px] h-[[300px] w-[200px] md:h-[355px] rounded-2xl cursor-pointer bg-gray-300' src={post.video.asset.url} />
          </Link>
          {isHover && (
            <div className='absolute shhad bottom-0 flex justify-between px-3 w-full'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>
              ): (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={()=> setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>
              ): (
                <button onClick={()=> setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard