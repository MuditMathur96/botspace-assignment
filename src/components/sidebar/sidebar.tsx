import { Button, Paper, Switch, TextField, Typography } from "@mui/material";
import "./sidebar.css";
import { useAppContext, type Post } from "../../store/app-context";
import {  type FormEvent } from "react";

function DummyProStage({content}:{content:string}){ 
    
    return (<div 
    className="sidebar-stage"
    >
        <div style={{
            display:"flex",
            gap:"5px"
        }}>
        <input  type="radio" disabled/>
            <p> {content}</p>
            <span className="pro-tag" > Prod </span>
        </div>

    </div>)


}

function ImageBox({isActive,post,onClick}:{isActive:boolean,post:Post,onClick:(postId:number)=>void}){
    
    const borderStyles = isActive?"3px solid #3c76c1":
    "3px solid transparent";
    
    return (<div
        onClick={()=>onClick(post.postId)} 
        style={{
            border:borderStyles,
            borderRadius:"8%",
            cursor:"pointer",
            width:"30%",
            height:"100%",
            
            overflow:"hidden"

        }}
    
    >
        <div style={{height:"100%",width:"100%"}} className="post-image">
        <img  src={post.imageUrl}  />
        </div>
    </div>)
}

function Tag({text,onClick}:{text:string,onClick:()=>void}){
    return (<span className="tag" onClick={onClick}>
        {text}
    </span>)

}

function CommentStage(){

    const {setStageData,currentStage,stageData} = useAppContext();
    const tags = (stageData["comment-filter"] as {tags:string})?.tags || "";
    
    const isActive = currentStage === "comment-filter";

    const autoFillTags = ["Price","Shop","Link"];

    function handleInputChange(newValue:string){

        if(!isActive) return;
        setStageData("comment-filter",{
            tags:newValue.replaceAll(",,",","),
        });
        
        

    }

    function handleSubmit(e:FormEvent){
        e.preventDefault();

        if(!tags.trim()) alert("Please add some words");

        console.log("Updating stage data");
        
          setStageData("dm-config",{
            showOpeningDM:true,
            link:""

            
        });


        setStageData("comment-filter",{
            tags:tags,
            status:"complete"
        });

      



    }


    return (
    <div>

    <Typography variant="h6">And this comment has</Typography>
    <div className="sidebar-stage"
    style={{
        display:"flex",
        flexDirection:"column",
        gap:"10px"
    }}
    >
        <div className=""
        style={{
            display:"flex",
            gap:"5px"
        }}
        >
            <p>Specific word or words</p>
            <input type="radio" checked={true} ></input>

        </div>

        <div>
            <form onSubmit={handleSubmit}>

                <TextField
                disabled={!isActive}
                error={!tags}
                value={tags}
                onChange={(e)=>handleInputChange(e.target.value)}
                variant="outlined"
                placeholder="Enter a word or words"
                fullWidth
                size="small"
                required
                name="comment-tags"
                />
                <p>Use comman to separate word</p>
                <p>For example:  {autoFillTags.map(a=><Tag
                onClick={()=>{
                      const newTags = tags?tags.concat(",",a):a;
                    handleInputChange(newTags)}}
                key={a} text={a} />)} 
                    </p>
                {isActive && <Button type="submit" sx={{mt:"15px"}} variant="outlined" >Next</Button>}
            </form>
        </div>

    </div>
    </div>
    )
}

function MessageStage(){

    const {setStageData,stageData,currentStage} = useAppContext();
    const {showOpeningDM,link} =  (stageData["dm-config"] as {showOpeningDM:boolean,link:string} || {});
    console.log("Message component: ",stageData);
    const isActive = currentStage === "dm-config";
    function handleSubmit(){

        setStageData("dm-config",{
            link,
            showOpeningDM,
            status:"complete"
        });


    }


    function handleInputChange(newValue:string,newOpeningDM:boolean){

        setStageData("dm-config",{
            link:newValue,
            showOpeningDM:newOpeningDM,
            status:"in-progress"
        });
    }

   return (
   <div style={{
    display:"flex",
    flexDirection:"column",
    gap:"10px"
   }}>
     <Typography variant="h6">They will get</Typography>
    <div className="sidebar-stage"
    style={{
        display:"flex",
        flexDirection:"column",
        gap:"10px"
    }}
    >
       
      
        <div 
        style={{
            display:"flex",
            justifyContent:'space-between',
            alignItems:"center"
        }}
        >
            <p>An opening DM</p>
            <Switch disabled={!isActive} onChange={(e)=>handleInputChange(link,e.target.checked)}   defaultChecked color="success" />
            
        </div>
            <Paper style={{
                padding:"10px"
            }}>

            <p >
                Hey there! I am so happy you are here, thank you so much for your interest.
                <br/><br/>
                click below and I'll send you the link in sec.
            </p>
            </Paper>

             <Paper style={{
                padding:"10px"
            }}>

           <p>Send me the Link</p>
            </Paper>
           
            

    </div>


    <div
    style={{
    display:"flex",
    flexDirection:"column",
    gap:"10px"
   }}
    className="sidebar-stage">
         <Typography variant="body1">a DM with the link</Typography>
        <Paper>
            <TextField disabled={!isActive} required error={!link} value={link || ""} onChange={(e)=>handleInputChange(e.target.value,showOpeningDM)} fullWidth />
        </Paper>
        

        <Button 
        onClick={handleSubmit}
        disabled={!isActive || !link}
          fullWidth 
          style={{textAlign:"center",backgroundColor:"white"}} >Next</Button>
       
    </div>
   </div>
    )
}

function PostSelectionStage(){

    const {stageData,posts,currentStage,setStageData} = useAppContext();
    const currentPost = (stageData[currentStage!] as {postId:number})?.postId || null; 
    const canSelect = currentStage === "post-selection";
    const canSubmit = currentPost && currentStage && currentStage === "post-selection";

    function handlePostChange(postId:number){
        
        if(!canSelect) return;
        setStageData("post-selection",{
            postId:postId
        });
        
        
    }

    function handleSubmit(){
        if(!canSelect) return;
        if(!currentStage || !currentPost) return;
        console.log("==updating stageData===",currentStage,currentPost);
        setStageData("post-selection",{
            postId:currentPost,
            status:"complete"
        });

    }


    return (<>
      <Typography variant="h6">When someone comments on</Typography>
         <div
        className="sidebar-stage"
        >
        {/* Choose a post */}
        <div
        style={{
            display:"flex",
            width:"100%",
            gap:"5px",
            height:"140px"
        }}
        >
            {/* Render posts */}
            {
                posts.map((p)=> <ImageBox 
                post={p} 
                key={p.postId} 
                onClick={(postId:number)=>handlePostChange(postId)}
                isActive={canSelect ?currentPost === p.postId : (stageData["post-selection"] as {postId:number}).postId === p.postId } />)
            }

        </div>

        <div className="link-text">Show All</div>
       
    </div>

    <DummyProStage content={"any post or reel"} />
    <DummyProStage content={"next post or reel"} />

  {canSubmit ?  <div>
        <Button 
        onClick={handleSubmit}    
        variant="outlined">Next</Button>
    </div>:null
    }
    </>)

}

type StageDataType={
    status:string
}


function Sidebar(){

    const {stageData} = useAppContext();

    return (
    <div 
    className="sidebar-container"
    
    >
    <PostSelectionStage />
    
    {
       stageData["post-selection"] && (stageData["post-selection"] as StageDataType).status! === "complete"?<CommentStage />:null
    }
    {
        stageData["comment-filter"] && (stageData["comment-filter"] as StageDataType).status === "complete"?<MessageStage />:null
    }
   
    </div>

    
   )


}

export default Sidebar;