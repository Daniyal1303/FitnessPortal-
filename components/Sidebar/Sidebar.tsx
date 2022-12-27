import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios"
import Link from "next/link"
import styles from "./Sidebar.module.css"
import { useRouter } from 'next/router'

import {
    
    MdOutlineSelfImprovement,
    MdOutlineSportsKabaddi,
    MdOutlineLogout
}

    from "react-icons/md"



const Sidebar = () => {

    const router = useRouter();

    const access_token = Cookies.get('token')

    const logOut = async () => {
        await axios.get('http://localhost:8999/users/logout', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(function (response) {

            if (response.status === 200) {

                console.log(response)
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

        <div className="flex-none fixed z-auto ">

            <div className="p-3 h-screen bg-gradient-to-r from-purple-500 to-pink-500 z-20 top-0 peer:transition ease-out delay-150 duration-200">
                <div className="flex flex-col justify-start items-center">
                    <h1 className="text-base text-white text-center cursor-pointer font-serif text-black-900 border-b border-gray-100 pb-4 w-full">Fitness Portal</h1>


                    <div className="my-4 border-b border-gray-100 pb-4 flex flex-col gap-4">
                       

                        <Link href="/trainee" className={router.pathname == "/trainee" ? styles.active : ''}>
                            <div className="flex  justify-start items-center  gap-4 px-5 hover:bg-pink-900 p-2 rounded-md group cursor-pointer hover:shadow-lg ">

                                <MdOutlineSelfImprovement className="text-2xl text-gray-200 group-hover:text-purple"></MdOutlineSelfImprovement>
                                <h3 className=" text-gray-200  group-hover:text-purple font-semibold">
                                    Manage Trainee
                                </h3>

                            </div>
                        </Link>

                        <Link href="/trainer" className={router.pathname == "/trainer" ? styles.active : ''}>
                            <div className="flex  justify-start items-center  gap-4 px-5 hover:bg-pink-900 p-2 rounded-md group cursor-pointer hover:shadow-lg "
                            >

                                <MdOutlineSportsKabaddi className="text-2xl text-gray-200 group-hover:text-purple"></MdOutlineSportsKabaddi>
                                <h3 className=" text-gray-200  group-hover:text-purple font-semibold">
                                    Register Trainer
                                </h3>

                            </div>
                        </Link>



                        <div className="flex justify-start items-center gap-4 px-5 hover:bg-pink-900 p-2 rounded-md group cursor-pointer hover:shadow-lg " onClick={logOut}
                        >
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

export default Sidebar


