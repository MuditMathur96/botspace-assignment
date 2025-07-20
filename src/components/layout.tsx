import type { ReactNode } from "react"
import Sidebar from "./sidebar/sidebar";
type Props={
    children:ReactNode
}
function AppLayout({children}:Props){

    return <div
    className="app-layout"
    >

    {/* Sidebar */}

    
    <aside
    className="sidebar"
    >
        <Sidebar />
    </aside>
    

    



    {/*  */}

    {/* Main content or mobile view component  */}
    <main
    className="app-main"
    >
        {children}
    </main>



    </div>



}


export default AppLayout;