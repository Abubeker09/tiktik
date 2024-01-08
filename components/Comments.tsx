import React, { Dispatch, SetStateAction } from 'react'
import NoResults from './NoResults'
import useAuthStore from '../strore/authStore'
import { IUser } from '../types'
import Link from 'next/link'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'

interface IProps {
  isPostingComment: Boolean,
  comment: string
  setComment: Dispatch<SetStateAction<string>>
  addComment: ()=> void
  comments: IComment[]
}

interface IComment {
  comment: string
  length?: number
  _key: string
  postedBy: { _ref: string; _id: string }
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {
  const { userProfile, allUsers } =useAuthStore()
  

  return (
    <div className='border-t-2 border-gray-100 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll h-[230px]'>
        {comments?.length ? (
          comments.map((item, idx)=> (
            <>
              {allUsers?.map((user: IUser)=>(
                user._id === (item.postedBy._id || item.postedBy._ref) && (
                  <div className='p-2 items-center' key={idx}>
                    <Link href={`/profile/${user._id}`}>
                      <div className='flex items-start gap-3 cursor-pointer font-semibold'>
                        <div className='w-8 h-8'>
                          <Image src={user.image} alt='profile' width={34} height={34} className='rounded-full' layout='responsiv' />
                        </div>
                        <div className='hidden xl:block'>
                          <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                            {user.userName.replace(' ', '')} 
                            <GoVerified className='text-green-500' />
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className='my-2 flex px-10 w-fit rounded border-b border-gray-300'>
                      <p className='text-bold'>{item.comment}</p>
                    </div>
                  </div>
                )
              ))}
            </>
          ))
        ) : (
          <NoResults text='No comments yet!' />
        )}
      </div>

      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2'>
          <form onSubmit={addComment} className='flex gap-4'>
            <input type="text" value={comment} onChange={(e)=> setComment(e.target.value)} placeholder='Add comment...' className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg' />
            <button className='text-md text-gray-400 px-4 border-2 border-slate-300 rounded-lg' onClick={()=>{}}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
                  </div>
      )}

    </div>
  )
}

export default Comments