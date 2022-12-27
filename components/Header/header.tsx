import Image from "next/image"
import { useSelector } from "react-redux"
const Headerbar = () => {
    const users = useSelector((state) => state?.reducer?.user?.userList)
    
    const loginuser = useSelector((state)=>state?.reducer?.login?.loginUser)

    const {userName} = loginuser;
    
    const RequireUser =  users.find((a:any)=> a.userName === userName)
    
    return (
        
        <div className="flex items-start ">


            <nav className="bg-gradient-to-r from-purple-500 to-pink-500 border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900 w-full">
                <div className="flex justify-end items-center gap-4">
                {(RequireUser.systemRole === "ASSISTANT" ? <span className="text-white font-semibold cursor-pointer ">User</span> :  <span className="text-white font-semibold cursor-pointer">Admin</span>)}
                    <span className="text-white font-semibold cursor-pointer">{RequireUser.userName}</span>
                    <div className="rounded-3xl">
                    <Image src={RequireUser.profilePath} width={20} height={10} alt="pic" className="rounded-full w-9 h-9 cursor-pointer"/>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Headerbar