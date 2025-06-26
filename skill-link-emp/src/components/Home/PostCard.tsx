import { Heart, MessageCircle, Share } from 'lucide-react';
import { IPost } from '../../types/IPost';


interface PostCardProps{
  post: IPost
}

export const PostCard = ({post}: PostCardProps)=>{
  return(
    <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
     <div className='flex flex-row gap-2'>
        <img src={post.authorImage} alt={post.title} className="w-10 h-10 rounded-full" />
        <div>
          <p className='text-white'>{post.author}</p>
          <p className='text-white'>{post.authorRole}</p>
          <p className='text-white/70'>{post.date}</p>
        </div>
     </div>
     <div className='flex flex-col gap-2 pt-5'>
      <h3 className='text-white'>{post.title}</h3>
      <p className='text-white/70'>{post.description}</p>
      <img src={post.image} alt={post.author} className="w-full h-48 object-cover rounded-md" />
     </div>
     <div className='flex flex-row gap-5 pt-5'>
      <div>
        <Heart className="w-5 h-5 text-white/70 hover:text-red-400 hover:scale-110 active:scale-95 active:text-red-500 cursor-pointer transition-all duration-200" onClick={()=>{
          console.log("Liked");
        }} />
        <p className='text-white/70'>{post.likes}</p>
      </div>
      <div>
        <MessageCircle className="w-5 h-5 text-white/70 hover:text-purple-500 hover:scale-110 active:scale-95 active:text-blue-500 cursor-pointer transition-all duration-200" onClick={()=>{
          console.log("Commented");
        }} />
        <p className='text-white/70'>{post.comments}</p>
      </div>
     </div>
    </div>
  )
}