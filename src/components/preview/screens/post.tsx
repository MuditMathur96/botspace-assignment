import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send, type LucideProps} from "lucide-react";
import SamsungS24 from "../mobile-container";
import { useAppContext, type Post } from "../../../store/app-context";
import { useMemo } from "react";
import { Avatar } from "@mui/material";


type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;



const ActionButton = ({ icon: Icon }
  :{icon:LucideIcon,
  }) => (
 
    <Icon size={18} color="white" />
  
);

const PostScreen = () => {

  const {stageData,posts} = useAppContext();
  const postId = (stageData["post-selection"] as {postId:number})?.postId || null;

  const postDetails = useMemo(()=>{
    return posts.find(p=>p.postId === postId);
  },[postId]);

  if(!postId) return <div>...Loading</div>

  return (
    <div className="main-container">
      <SamsungS24>
        {/* Page Header */}
        <div className="page-header"
        >
          <p className="title">BotSpace HQ</p>
          <p className="header" >Posts</p>
        </div>
        
        {/* Instagram Post */}
        <InstagramPost 
          post={postDetails!}
        />
      </SamsungS24>
      
    </div>
  );
};


const InstagramPost = ({ post }:{
  post: Post,
}) => {

  return (
    <div className="instagram-post" >
      {/* Header */}
      <div className="post-header">
        <div className="post-user-info">
          <Avatar  src={post.user.avatar} alt={"avatar"} />
          <div className="user-details">
            <div className="username-container">
              <span className="username">{post.user.userName}</span>
            </div>
          </div>
        </div>
        <button className="more-btn" aria-label="More options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="post-image-container">
        <img
          src={post.imageUrl}
          alt="Instagram post"
          className="post-image"
        
        />
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="action-buttons-left">
          <ActionButton icon={Heart} />
          <ActionButton icon={MessageCircle}  />
          <ActionButton icon={Send} />
        </div>
        <ActionButton 
          icon={Bookmark} 
        />
      </div>

      {/* Likes count */}
      <div className="likes-section">
       
      </div>

      {/* Caption */}
      <div className="caption-section">
        <p className="caption-text">
          <span className="caption-username">{post.user.userName}</span>
            {post.caption}
        </p>
        {/* <span className="caption-username">{post.user.userName}</span>
        <span className="caption-text">{post.caption}</span> */}
        
      </div>
 
    </div>
  );
};

export default PostScreen;