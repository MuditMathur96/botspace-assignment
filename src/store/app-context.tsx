import React, { useContext, useEffect, useState, type ReactNode } from "react";

import posts from '../data/posts.json';
import stages from '../data/stages.json';


export type StageType={
    stageId:number,
    stageName:string,
    isFinal:boolean,
    isFirst:boolean,
    component:string,
    nextStage:number | null,
}

export type Post={
    postId:number,
    imageUrl:string,
    caption:string,
    user:{
        userId:number,
        userName:string,
        avatar:string
    }
}

export type AppStateType={
    stages:StageType[],
    setStages:(newStages:StageType[])=>void,
    posts:Post[],
    setPosts: (posts:Post[])=>void,
    currentStage:string | null,
    isWorkflowComplete:boolean,
    stageData:Record<string,unknown>
    setStageData:(stageId:string,newStageData:unknown)=>void;
}
export type StateType={
    stages:StageType[],
    posts:Post[],
    currentStage:string | null,
    isWorkflowComplete:boolean,
    stageData:Record<string,unknown>
}

const DEFAULT_STATE:AppStateType={
    
    stages:[],
    setStages:()=>{},
    posts:[],
    setPosts: ()=>{},
    currentStage:null,
    isWorkflowComplete:false,
    stageData:{},
    setStageData:()=>{}
}



const appContext = React.createContext<AppStateType>(DEFAULT_STATE);

function ApplicationProvider({children}:{children:ReactNode}){

    const [state,setState] = useState<StateType>({
        stages:[],
        currentStage:null,
        posts:[],
        isWorkflowComplete:false,
        stageData:{
            
        },

    });



    useEffect(()=>{

        console.log("initializing state",stages);
        const firstStage = stages.find(s=>s.isFirst) || null 
        setState(prev=>({
            ...prev,
            stages,
            currentStage:firstStage?firstStage.stageName:null,
            posts:posts,
            stageData:{
                [firstStage!.stageName]:{
                    postId:posts[0].postId
                }
            }

        }))



    },[]);

    function handleSetStageData(stageName:string,data:unknown){

        console.log(state.stages);
        const currentStageDetails = state.stages.find(s=>s.stageName === stageName); 
        if(!currentStageDetails) {
            alert("Invalid stage:"+stageName);
            return;
        };
        
        const nextStage = state.stages.find(s=>s.stageId === currentStageDetails.nextStage);
        let upcomingStage:string | null = state.currentStage;

        let isProcessComplete = false;
        
        if( (data as {status:string}).status === "complete"){
            upcomingStage = nextStage?nextStage.stageName:null;
            isProcessComplete = currentStageDetails.isFinal;
        }
        
        setState(prev=>({
            ...prev,
            stageData:{
                ...prev.stageData,
                [stageName]:data,
            },
            currentStage:upcomingStage,
            isWorkflowComplete:isProcessComplete
        }));
    }



    function handleSetPosts(posts:Post[]){
        setState(prev=>({...prev,posts}))
    };

    function handleSetStages(stages:StageType[]){
        setState(prev=>({...prev,stages}));
    }

    return (<appContext.Provider value={{
        ...state,
        setPosts:handleSetPosts,
        setStageData:handleSetStageData,
        setStages:handleSetStages,
        


    }}>
        {children}
    </appContext.Provider>)





}
export function useAppContext(){

    const state = useContext(appContext);

    if(!state) throw new Error("The app context hook can only be used inside AppContextProvider");

    return state;

}


export default ApplicationProvider;
