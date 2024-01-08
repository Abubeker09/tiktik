import React from 'react'
import { NextPage } from 'next'
import { BiCommentX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'

interface IProps {
  text: string
}

const NoResults: NextPage<IProps> = ({ text }) => {
  return (
    <div className='flex flex-col jutify-center items-center w-full h-full'>
        <p className='text-8xl'>
          {text === 'No comments yet!' ? <BiCommentX /> : <MdOutlineVideocamOff />}
        </p>
        <p className='text-gray-400 text-2xl text-center'>{text}</p>
    </div>
  )
}

export default NoResults