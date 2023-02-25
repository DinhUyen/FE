import Sidebar from "../components/Sidebar";

function Layout({children}){
    return (
        <div style={{display:"flex"}}>
        <Sidebar/>
        <div>
            {children}
        </div>
    </div>
    )

}
export default Layout