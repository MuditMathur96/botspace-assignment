import { MoreHorizontal, Send } from "lucide-react";
import SamsungS24 from "../mobile-container";
import {  Avatar, Typography } from "@mui/material";
import { useAppContext, type Post } from "../../../store/app-context";
import { useMemo } from "react";

const CommentScreen = () => {

   const {stageData,posts} = useAppContext();
    const postId = (stageData["post-selection"] as {postId:number})?.postId || null;
    const tags = (stageData["comment-filter"] as {tags:string})?.tags || "";
  
    const postDetails = useMemo(()=>{
      return posts.find(p=>p.postId === postId);
    },[postId]);
  
    if(!postId) return <div>...Loading</div>
 

  return (
    <div className="main-container"
       style={{
        position:"relative"
    }}
    >
      <SamsungS24>
        {/* Page Header */}
        <div className="page-header"
        >
          <p className="title">BotSpace HQ</p>
          <p className="header" >Posts</p>
        </div>
        
        {/* Instagram Post */}
        <Comment 
          post={postDetails!}
        />

        {/* Comment box */}
      <div style={{
        position:"absolute",
        bottom:"20px",
        zIndex:999,
        height:"70%",
        width:"100%",
        backgroundColor:"#121212",
        borderRadius:"20px",
        overflow:"hidden",
        display:"flex",
        justifyContent:"flex-start",
        flexDirection:"column",
        alignItems:"center",
        padding:"10px",
        gap:"5px"
        
        

      }}>
        {/* Notch */}
       <div
       style={{
        height:"4px",
        width:"40px",
        backgroundColor:'',
        borderRadius:"999px",
       }}
       ></div>

       <div
       style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        width:"100%",
        padding:"5px"


       }}
       >
        <div></div>
       <Typography variant="body2">Comments</Typography>
       <Send color="white" size={18} 
       style={{
        alignSelf:"flex-end"
       }}
       />
       </div>


        {/* Divider */}
       <div 
       style={{
        height:"1px",
        width:"100%",
        backgroundColor:"#383838"
       }}
       >

       </div>

       {/* Comment  */}
       <div
       style={{
        width:"100%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        color:"white",
        gap:"5px"
       }}
       >
            <Avatar src={postDetails?.user.avatar} ></Avatar>
            <div
            style={{
                display:"flex",
                flexDirection:"column"
            }}
            >
                <Typography variant={"caption"}>{postDetails?.user.userName}</Typography>
                <Typography variant={"caption"}>{tags}</Typography>
                <Typography variant={"caption"} sx={{color:'gray',fontSize:"10px"}}>Reply</Typography>
            </div>
       </div>



      </div>
      </SamsungS24>
      
    </div>
  );
};


const Comment = ({ post }:{
  post:Post
}) => {

  return (
    <div className="instagram-post"
 
    >
      {/* Header */}
      <div className="post-header">
        <div className="post-user-info">
          <Avatar src={post.user.avatar} alt={"avatar"} />
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



      

   
 
    </div>
  );
};

export default CommentScreen;