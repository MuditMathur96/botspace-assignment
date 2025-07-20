import { Battery, Signal, Wifi } from "lucide-react";
import "./preview.css";
import  {type ReactNode } from 'react';


// Reusable components for better scalability
export const Avatar = ({ src, alt, size }:{src:string,alt:string,size:string}) => (
  <img 
    src={src} 
    alt={alt} 
    className={`avatar ${size || 'avatar-sm'}`}
  />
);

const SamsungS24 = ({ children }:{children:ReactNode}) => (
  <div className="phone-container">
    {/* Samsung Frame */}
    <div className="phone-frame">
      {/* Screen */}
      <div className="phone-screen-bezel">
        {/* Display */}
        <div className="phone-display">
          
          <div
          style={{
            width:"100%",
            height:"20px",
            backgroundColor:"",
            color:"white",
            padding:"15px 20px",
            fontSize:"10px",
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between"
          }}
          >
          <div>
            {(new Date()).getHours()}:{(new Date()).getMinutes()}
          </div>
          <div 
          style={{
            display:"flex",
            gap:"5px"
          }}
          >
            <Wifi size={12} />
            <Signal size={12} />
            <Battery size={12} />
          </div>

          </div>
          {/* Camera Cutout */}
          <div className="camera-cutout"></div>
          
        
          
          {/* App Content */}
          <div className="app-content">
            {children}
        </div>

          {/* Gesture Navigation */}
          <div className="navigation-bar">
            <div className="nav-gestures">
              <div className="nav-home"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

   
  </div>
);



export default SamsungS24;