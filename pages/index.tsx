import { BASE_URL } from "../utils/utils"
import NoResults from "../components/NoResults"
import VideoCard from "../components/VideoCard"
import { Video } from "../types"
import axios from "axios"
import Sidebar from "../components/Sidebar"

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  
  return (
    <div className="flex h-[92vh] gap-6 md:gap-20 rounded-md border border-purple-200">
      <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
        <Sidebar />
      </div>
      <div className="flex flex-col gap-10 videos h-full overflow-auto">
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ):(
          <NoResults text={'No Videos'} />
        )}
      </div>
    </div>
      
  )
}

export const getServerSideProps =  async ({query: {topic}}: {
  query: { topic: string }
}) => {
  let response = null

  if(topic){
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  }else{
    response = await axios.get(`${BASE_URL}/api/post`)
  }

  return {
    props: {
      videos: response.data,
    }
  }
}

export default Home

