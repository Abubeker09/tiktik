import React, { useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 jutify-center xl:jutify-center xl:justify-start cursor-pointer font-semibold text-[#ff206e] rounded-xl'

  return (
    <div>
      <div className='block xl:hidden m-2 ml-4 mt-3 text-xl' onClick={()=> setShowSidebar(priv => !priv)}>
        {showSidebar ? <ImCancelCircle/> : <AiOutlineMenu /> }
      </div>
      {showSidebar && (
        <aside className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-300 xl:border-0 p-3">
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={normalLink}>
                <p className='text-2xl'>
                <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </aside>
      )}
    </div>
  )
}

export default Sidebar