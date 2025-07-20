
import type { ReactNode } from "react";
import { useAppContext } from "../../store/app-context";
import ChatScreen from "./screens/chat";
import CommentScreen from "./screens/comment";
import PostScreen from "./screens/post";

import stages from "../../data/stages.json";
import { Button, Typography } from "@mui/material";

const templates:Record<string,ReactNode>={
    "post-selection":<PostScreen />,
    "comment-filter":<CommentScreen />,
    "dm-config":<ChatScreen />
}

function Tabs(){
    const {currentStage} = useAppContext();

    return (<div 
    style={{
        width:"14vw",
        minWidth:"200px",
        marginLeft:"auto",
        marginRight:"auto",
        display:"flex",
        padding:"5px 10px",
        gap:"5px",
        backgroundColor:"#e7e9ecff",
        borderRadius:"999px",
        alignItems:"center",
        justifyContent:'space-between',
        border:"1px solid #a6a1a1ff",
        fontSize:"12px"
    }}
    >
        {
            stages.map((stage)=>{
                return <div
                style={{
                     backgroundColor:currentStage === stage.stageName?"white":"",
                     padding:"5px",
                     borderRadius:"999px",
                     minWidth:'50px',
                     textAlign:"center"
                }}
                >{stage.title}</div>
            })
        }
    </div>)

    
}


function Preview(){

    const {currentStage,isWorkflowComplete} = useAppContext();
    const Component =  isWorkflowComplete ?<ChatScreen />:templates[currentStage || "post-selection"];
    return (<div
    style={{
        padding:"10px 25px",
        width:"100%"
    }}
    >
        <div
        style={{
            display:"flex",
            justifyContent:"space-between",
            
        }}
        >
            <div>
                <Typography sx={{fontSize:"1rem"}}>Preview</Typography>
            </div>
            { isWorkflowComplete && <Button 
            sx={{
                backgroundColor:"#4a50f8ff",
                color:"white"
            }}
            color="primary" >Go Live</Button>}
        </div>
        
        {Component}
        <Tabs />
    </div>)

}

export default Preview