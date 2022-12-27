import Link from "next/link"
import { BiUser } from "react-icons/bi"
import { RiLockPasswordLine } from "react-icons/ri"
import axios from "axios";
import {useRouter} from "next/router";
import { useFormik } from 'formik';
import { useDispatch,useSelector } from 'react-redux';
import * as yup from 'yup';
import Cookies  from 'js-cookie';
import toast, { Toaster } from "react-hot-toast";
import {loginuser} from  "../../store/loginSlice";
// import userSlice from "../../store/userSlice";

interface credentialType {

 
  userName: string,
  password: string,

}

const Login = () => {
         
  const allusers = useSelector((state) => state?.reducer?.user?.userList)

  const dispatch  = useDispatch()

  const router = useRouter()

 
  

  const initialValues: credentialType = {


    userName: '',
    password: '',

}

const validationSchema = yup.object({

  userName: yup.string().max(15,"please enter valid username ").required("username is required"),
  password: yup.string().min(8,"password must be minimum of 8 digits").required(" password is required"),

  })




  const onSubmit = async (values: credentialType) => {

        
  
     await axios.post('http://localhost:8999/users/login', {

       
            userName: values.userName,
            password: values.password,
            // systemRole: values.systemRole

          })
        .then(function (response) {
            if (response.status === 200) {

              console.log(response)
              Cookies.set('token', response.data.token)  
              const RequireUser = allusers.find((a:any)=> a.userName  === values.userName)
              console.log("user",RequireUser);
              const role  = RequireUser.systemRole   
              Cookies.set('Role',role ) 
              Cookies.set('userName',RequireUser.userName) 
           
              
              if( role === "ASSISTANT" )
              {
                dispatch(loginuser(values))
                router.push(`/payfees/${values.userName}`)
                toast.success("User Login Successfully")
               }  
                  
              else if( role === "SYS_ADMIN")
                {
                  dispatch(loginuser(values))
                 
                   router.push('/trainee')
                   toast.success("Admin Login Successfully")
                  
                }
               

         }
        
        }).catch(function (error) {

            if (error.response?.status === 409) {

                toast.error(error.response.data.message)
 
            }

            if (error.response?.status === 401) {

              toast.error(`Please enter valid username & password ${error.response.data.message}` )

          }

        })

      

}



const formik = useFormik({

    initialValues,
    validationSchema,
    onSubmit,
  
})
   


    return (
      <div className="flex justify-center mt-20">

        <div className="loginContainer w-[40%]  flex  items-center">

        <form action="" onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

          <div className="loginheader mb-8 " >


            <h1 className="loginH1 text-white italic">Login</h1>

          </div>
          <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
              <span className="loginicon py-2 text-white"><BiUser className="font-bold" /></span>
              <input 
              type="text"
              id="userName"
              name="userName"
             className="logininput italic border-b-2 border-b-white pl-4 px-4 py-2 bg-transparent text-white"
              placeholder="Type your username" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              autoComplete="off"
              />
            </div>
            
            { formik.touched.userName && formik.errors.userName ? (<div className='text-red-600  font-bold  px-4 italic'>{formik.errors.userName}</div>) : null}
          </div>
        
            <div className="flex flex-col">
            <div className="flex flex-wrap logininputdiv gap-2">
              <span className="loginicon py-2 text-white"><RiLockPasswordLine /></span>
              <input 
              type="password" 
              id="password"
              name="password"
              className="logininput italic  border-b-2 border-b-white pl-4 px-4 py-2 bg-transparent text-white" 
              placeholder="Type your password" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (<div className=' text-red-600 font-bold italic px-4'>{formik.errors.password}</div>) : null}
            </div>
           
            <div className="loginbtndiv text-center">

              <button type="submit" className="login-btn  hover:bg-green-600 hover:text-white text-purple-800 italic mt-5">LOGIN</button>

            </div>

          </form>

          <Link href="/signup" >

            <span className="text-xl cursor-pointer hover:text-green-300 text-white italic font-semibold transition">Sign Up</span>

          </Link>

        </div>
        <Toaster />
      </div>
    )
  }

  export default Login