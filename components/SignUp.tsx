import React from 'react'

import { useFormik } from 'formik';

import { useState } from 'react';

import { adduser } from '../store/userSlice';

import { useDispatch } from 'react-redux';

import axios from 'axios'

import { useRouter } from 'next/router'

import toast, { Toaster } from "react-hot-toast";

import * as yup from 'yup';



interface inputType {

    profilePath: string | undefined
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userName: string,
    systemRole: string

}




function SignUp() {

    const [image, setImage] = useState();

    const dispatch = useDispatch();

    const router = useRouter()

    const initialValues: inputType = {

        profilePath: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userName: '',
        systemRole: ''

    }

    const validationSchema = yup.object({

       
        profilePath: yup.string().required("upload image is required"),
        firstName: yup.string().max(15,"firstname must be 15 character or less").required("firstname is required"),
        lastName: yup.string().max(15,"lastname must be 15 character or less").required("lastname is required"),
        email: yup.string().email("invalid email address").required("email is required"),
        password: yup.string().min(8,"password must be minimum of 8 digits").required(" password is required"),
        userName: yup.string().max(15,"username must be 15 character or less").required("username is required"),
        systemRole: yup.string().required("select your user role"),
      
      
        })


    const onSubmit = async (values: inputType, onSubmitProps:any) => {



        
            await axios.post('http://localhost:8999/users/signup', {

            profilePath: values.profilePath,
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            email: values.email,
            password: values.password,
            systemRole: values.systemRole
        })
            .then(function (response) {
                if (response.status === 200) {

                    values = { 
                    ...values,
                    profilePath: image
                }

                    dispatch(adduser(values))
                    onSubmitProps.resetForm();
                    router.push('/login')
                }
            }).catch(function (error) {

                if (error.response?.status === 409) {

                    alert(error.response.data.message)

                }

            })



    }

    

    const formik = useFormik({

        initialValues,
        validationSchema,
        onSubmit,
        
        
    })



    return (
        <div className="w-[80%] flex justify-center items-center mt-10">
            <div className=" h-[100%] example w-[60%]  overflow-y-scroll shadow-2xl bg-white">
                <div className="px-6 py-4">
                    <div className="my-6  text-xl font-bold italic"> Sign Up Add Trainee or Admin User</div>

                    <form className="w-full max-w-lg " onSubmit={formik.handleSubmit}>

                        <div className="flex flex-wrap -mx-3 mb-6">

                            <div className="w-full  px-3">


                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Upload Image
                                </label>

                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="profilePath"
                                    id="profilePath"
                                    type="file"
                                    onChange={

                                        e => {
                                            formik.handleChange(e)
                                            let target = e.target as HTMLInputElement;
                                            let file:File = (target.files as FileList)[0] ;
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.addEventListener("load", function (e: any) {
                                                let imageurl = e.target.result;
                                                setImage(imageurl)

                                            })

                                        }
                                    }
                                    onBlur={formik.handleBlur}
                                    value={formik.values.profilePath}

                                />
                                { formik.touched.profilePath && formik.errors.profilePath ? (<div className='text-red-600 italic font-bold'>{formik.errors.profilePath}</div>) : null}
                            </div>

                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">



                            <div className="w-full md:w-1/2 px-3">

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    First Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="Jane"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (<div className='text-red-600 italic font-bold'>{formik.errors.firstName}</div>) : null}

                            </div>

                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Last Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}

                                />
                                {formik.touched.lastName && formik.errors.lastName ? (<div className='text-red-600 italic font-bold'>{formik.errors.lastName}</div>) : null}

                            </div>



                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">

                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                    Email Address
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="email"
                                    name='email'
                                    type="email"
                                    placeholder="abc12@gmail.com"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                { formik.touched.email && formik.errors.email ? (<div className='text-red-600 italic font-bold'>{formik.errors.email}</div>) : null}

                            </div>

                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Password
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="password"
                                    name="password"
                                    placeholder='********'
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}

                                />

                                {formik.touched.password && formik.errors.password ? (<div className='text-red-600 italic font-bold'>{formik.errors.password}</div>) : null}


                            </div>

                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">

                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    User Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="userName"
                                    name='userName'
                                    type="text"
                                    placeholder="User Name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.userName}

                                />
                                {formik.touched.userName && formik.errors.userName ? (<div className="text-red-600 italic font-bold">{formik.errors.userName}</div>) : null}

                            </div>

                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    User Role
                                </label>
                                <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="systemRole" name='systemRole'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.systemRole}>
                                    <option >Select User</option>
                                    <option value="SYS_ADMIN">Admin</option>
                                    <option value="ASSISTANT">User</option>
                                </select>
                                {formik.touched.systemRole && formik.errors.systemRole ? (<div className='text-red-600 italic font-bold'>{formik.errors.systemRole}</div>) : null}

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 mx-auto my-4 w-[32%] font-bold text-white bg-pink-900 rounded-full hover:bg-purple-700"
                        >
                            Submit
                        </button>
                    </form>



                </div>
            </div>
            <Toaster/>
        </div>
    )
}



export default SignUp
