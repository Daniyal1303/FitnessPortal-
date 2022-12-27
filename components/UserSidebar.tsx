import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios"
import Link from "next/link"
import styles from "./Sidebar/Sidebar.module.css"
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";


import {

    MdOutlinePayment,
    MdOutlineLogout
}

    from "react-icons/md"

const UserSidebar = () => {

    const users = useSelector((state:RootState) => state?.reducer?.user.userList)

    const loginuser:any= useSelector((state:RootState) => state?.reducer?.login.loginUser)

    const UserObject = users.find((user: any) => user.userName === loginuser.userName)
    console.log('UserObject',UserObject);
    
    const router = useRouter();

    const access_token = Cookies.get('token')
     
    const logOut = async () => {
        await axios.get('http://localhost:8999/users/logout', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(function (response) {

            if (response.status === 200) {

                Cookies.remove("token");
                Cookies.remove("Role");
                Cookies.remove('userName');
                toast.success(response.data.message)
                router.push('/login')


                //   if( response.data.token){
                //     

                //   }   
                //   else{
                //     router.push('/login')
                //     alert(response.data.message)
                //   }

            }
        }).catch(function (error) {

            if (error.response?.status === 409) {

                alert(error.response.data.message)

            }

        })
    }
    return (

        <div className="flex-none w-[15%]">

            <div className="p-3 fixed h-screen bg-gradient-to-r from-purple-500 to-pink-500 z-20 top-0 peer:transition ease-out delay-150 duration-200 w-[16%]">
                <div className="flex flex-col justify-start items-center">
                    <h1 className="text-base text-center text-white cursor-pointer font-serif text-black-900 border-b border-gray-100 pb-4 w-full">Fitness Portal</h1>


                    <div className="flex flex-col gap-2 my-4 border-b border-gray-100 pb-4 ">

                       
                        <Link href={`/payfees/${(UserObject as any).userName}`} className={router.pathname == "/payfees/[userName]" ? styles.active : ''}>
                            <div className="flex  justify-start items-center   gap-4 px-5 hover:bg-pink-900 p-2 rounded-md group cursor-pointer hover:shadow-lg ">

                                <MdOutlinePayment className="text-2xl text-gray-200 group-hover:text-purple"></MdOutlinePayment>
                                <h3 className=" text-gray-200  group-hover:text-purple font-semibold">
                                    Pay Fees
                                </h3>

                            </div>
                        </Link>


                        <div className="flex justify-start items-center  gap-4 px-5 hover:bg-pink-900 p-2 rounded-md group cursor-pointer hover:shadow-lg " onClick={logOut}>
                            <MdOutlineLogout className="text-2xl text-gray-200 group-hover:text-purple"></MdOutlineLogout>
                            <h3 className="text-base text-gray-200  group-hover:text-purple font-semibold">
                                Logout
                            </h3>
                        </div>

                    </div>
                </div>
            </div>

            <Toaster />


        </div>
    )
}

export default UserSidebar


