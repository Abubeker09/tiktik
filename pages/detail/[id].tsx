import Image from 'next/image'
import { Video } from '../../types'
import { BASE_URL } from '../../utils/utils'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../../strore/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)
  
  const { userProfile }: any = useAuthStore()

  const videoRef = useRef(null)
  const router = useRouter()

  if(!post) return null

  const handleLike = async (like: boolean) => {
    if(userProfile){
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        UserId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  const addComment = async (e)=> {
    e.preventDefault()

    if(userProfile && comment){
      setIsPostingComment(true)

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })

      setPost({ ...post, comments: data.comments })
      setComment('')
      setIsPostingComment(false)
    }
  }

  return (
    <div className='flex w-full absolut left-0 top-0 flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[800px] lg:h-9/12 flex justify-center bg-black'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p onClick={()=> router.back()}>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div> 
        <div className='relative'>
          <div className='lg:h-[88vh] h-[60vh]'>
            <video ref={videoRef} src={post.video.asset.url} loop controls className='h-[100%] cursor-pointer'></video>
          </div>
        </div>
      </div>

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='flex w-fit gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href='/'>
              <>
                <Image width={62} height={62} className='rounded-full' src={post.postedBy.image} alt='Profile photo' layout='responsive' />
              </>
            </Link>
          </div>
          <Link href='/'>
            <div className='flex flex-col gap-1 mt-2'>
              <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName} <GoVerified className='text-green-500'/></p>
              <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
            </div>
          </Link>
        </div>

        <div className='w-full h-10 flex justify-center items-center border border-gray-300'>
          <p className='font-bold text-slate-700'>{post.caption}</p>
        </div>

        <div className='mt-10 px-10'>
          {userProfile && (
            <LikeButton likes={post.likes} handleLike={() => handleLike(true)} handleDislike={()=> handleLike(false)}/>
          )}
        </div>
        <Comments comment={comment} setComment={setComment} addComment={addComment} comments={post.comments} isPostingComment={isPostingComment} />

      </div>
    
    </div>
  )
}

export const getServerSideProps = async ({params: { id }}: { params:{id: string} }) => {
  const {data} = await axios.get(`${BASE_URL}/api/post/${id}`)

  return{
    props:{ postDetails: data }
  }
}

export default Detail