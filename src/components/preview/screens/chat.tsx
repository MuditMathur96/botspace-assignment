
import SamsungS24 from "../mobile-container";

import { useAppContext } from "../../../store/app-context";
import { useMemo, type ReactNode } from "react";
import { ChevronLeft, Phone, VideoIcon } from "lucide-react";
import { Avatar, Button, Divider, Typography } from "@mui/material";

const ChatScreen = () => {

    const {stageData,posts} = useAppContext();
    const postId = (stageData["post-selection"] as {postId:number})?.postId;
    const dmData = (stageData["dm-config"] as {showOpeningDM:boolean,link:string})

    const post = useMemo(()=>{

        return posts.find(p=>p.postId === postId);


    },[postId]);

    if(!postId) return null;
  
 

  return (
    <div className="main-container"
       style={{
        position:"relative"
    }}
    >
      <SamsungS24>
        <div
        style={{
            height:"20px",
            backgroundColor:"#121212"
        }}
        >

        </div>
        {/* Header */}
        <div 
        style={{
            display:"flex",
            justifyContent:'space-between',
            alignItems:"center",
            height:"50px",
            backgroundColor:"#121212",
            padding:'15px'
        }}
        >

            <div style={{
                height:"100%",
                display:"flex",
                alignItems:"center",
                gap:"5px"
            }}>
                <ChevronLeft />
                <Avatar sx={{width:"30px",height:"30px"}} src={post!.user!.avatar!}  />
                <Typography sx={{fontSize:"10px"}}>{post?.user.userName}</Typography>
            </div>
            <div
            style={{
                height:"100%",
                display:"flex",
                alignItems:"center",
                gap:"10px"
            }}
            >
                <Phone size={"15px"} />
                <VideoIcon size={"20px"} />
                
            </div>
        </div>
        <Divider />
        <Chat 
            showOpeningDM={dmData?.showOpeningDM}
          message={dmData?.link || ""}
        />

        
      </SamsungS24>
      
    </div>
  );
};

const Message=({dir,children}:{dir:"right" | "left",children:ReactNode})=>{

    const borderRadius = dir==="left"?"10px 10px 10px 0":"10px 10px 0px 10px"
    

    return (<div
    style={{
        display:"flex",
        alignItems:"center",
        gap:"4px",
        paddingRight:dir === "left" ? "20px":"",
        paddingLeft:dir === "right" ? "":"",
        flexDirection:dir==="left"?"row":"row-reverse",
        
    }}
    >
        <div
        style={{
            alignSelf:"flex-end",
            
        }}
        >
        {dir==="left" &&<Avatar sx={{width:"24px",height:"24px"}}  />}
        </div>
        <div style={{
            backgroundColor:"#3a3a3aff",
            padding:"5px",
            borderRadius:borderRadius
        }}>
            
            <div
            style={{
                padding:"2px",
                fontSize:"12px"
            }}
            >
                {children}
            </div>
                
            
        </div>
    </div>)
}


const Chat = ({ message,showOpeningDM }:{
  showOpeningDM:boolean
  message:string
}) => {

  return (
    <div 
    style={{
        backgroundColor:"#121212",
        height:"100%",
        width:"100%",
        padding:"5px",
        paddingTop:"15px"
        
        }}>

        <div 
        style={{
            gap:"7px",
            display:"flex",
            flexDirection:"column"
        }}
        >
          {showOpeningDM &&   <>
            <Message dir="left" >
                <>
                <p>Hey there! I am so happy you are here, thank you so much for your interest.</p>
                <br />
                <p>click below and I'll send you the link in sec.</p>
                </>
                <Button sx={{fontSize:"10px",border:"0.01rem solid white",marginTop:"5px"}} fullWidth >Click Here</Button>
            </Message>
            <Message dir="right" >
                Hi
            </Message>
            </>}

            <Message
            dir="left"
            >
                <p>{message}</p>

            </Message>
        </div>
    </div>
  );
};

export default ChatScreen;