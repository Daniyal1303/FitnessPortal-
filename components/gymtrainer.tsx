
import { useState } from 'react'
import Image from "next/image"
import { addtrainer, removetrainer } from '../store/trainerSlice'

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import toast, { Toaster } from "react-hot-toast";


import * as yup from 'yup';
import { RootState } from '../store/store';



const GymTrainer = () => {


  // const [id, setId] = useState(Date.now())

  const [image, setImage] = useState();

  const dispatch = useDispatch();

  interface instructorArray {

    trainerid: number,
    uploadimage: string|undefined,
    firstName: string,
    lastName: string,
    email: string,
    birthdate: string,
    programplan: string,
    sex: string,

  }

  const instructors:Array<instructorArray> = useSelector((state:RootState) => state?.reducer?.trainer?.trainerList);

  const modelform = () => {

    let formid = document.getElementById('editUserModal') as HTMLDivElement;
    formid.classList.remove('hidden');

  }

  window.onclick = function (event) {
    let formid = document.getElementById('editUserModal') as HTMLDivElement;

    if (event.target == formid) {
      formid.classList.add('hidden')
    }

  }

  const initialValues: instructorArray = {

    trainerid: Date.now(),
    uploadimage: '',
    firstName: '',
    lastName: '',
    email: '',
    birthdate:'',
    programplan: '',
    sex: ''

  }

 const validationSchema = yup.object({

  uploadimage: yup.string().required("upload image is required"),
  firstName: yup.string().max(15,"firstName must be 15 character or less").required("firstName is required"),
  lastName: yup.string().max(15,"lastName must be 15 character or less").required("lastName is required"),
  email: yup.string().email("invalid email address").required("email is required"),
  birthdate: yup.date().required("birthdate is required"),
  programplan: yup.string().required("select your Program plan"),
  sex: yup.string().required("select your gender"),


  })

  const onSubmit =  (values: instructorArray , onSubmitProps:any) => {

    let {trainerid} = values;
    trainerid = Date.now()

    values = { 
      ...values,
      trainerid,
      uploadimage: image
  }

  console.log("values",values);

    dispatch(addtrainer(values))

    toast.success("Trainer added Successfully")


    onSubmitProps.resetForm();

    // setId(0);
  }

  
  const formik = useFormik({

    initialValues,
    validationSchema,
    onSubmit,
    
    
  })


  const trainerobject = (id: Number) => {


    dispatch(removetrainer(id))


  }



  return (

    <div className=" overflow-x-auto  shadow-md  sm:rounded-lg">
      <div className="flex justify-between items-center py-4 bg-white dark:bg-gray-800 mb-5">
        <div>
          <button onClick={modelform} className=' show-modal m-4 text-white bg-pink-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> Add Trainer</button>


        </div>

      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>

            <th scope="col" className="py-3 px-6">
              UserName
            </th>
            <th scope="col" className="py-3 px-6">
              Program
            </th>

            <th scope="col" className="py-3 px-6">
              Gender
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        {

          instructors.map((instructor: instructorArray) => {

            return (

              <tbody>
                <tr key={instructor.trainerid.toString()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                  <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    <Image className="w-10 h-10 rounded-full" src={instructor.uploadimage as string} width={20} height={10} alt="trainerimage" />
                    <div className="pl-3">
                      <div className="text-base font-semibold">{instructor.firstName}</div>
                      <div className="font-normal text-gray-500">{instructor.email}</div>
                    </div>
                  </th>
                  <td className="py-4 px-6">
                    {instructor.programplan}
                  </td>
                  <td className="py-4 px-6">
                    {instructor.sex}
                  </td>

                  <td className="py-4 px-6">
                    {/* <!-- Modal toggle --> */}
                    <button type='submit' onClick={() => trainerobject(instructor.trainerid)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                      Delete
                    </button>
                  </td>
                </tr>

              </tbody>
            )


          })}


      </table>
      {/* <!-- Edit user modal --> */}
      <div id="editUserModal" aria-hidden="true" className=" backdrop-blur hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full">
        <div className=" relative w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}

          <form onSubmit={ formik.handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Register Trainer
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="editUserModal">
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">

                <div className="col-span-6 sm:col-span-3">

                  <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
                  
                  <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie"
                    id="uploadimage"
                    name="uploadimage"
                    type="file"
                    onChange={e => {
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
                    value={formik.values.uploadimage}
                  />
                 {formik.touched.uploadimage && formik.errors.uploadimage ? (<div className='text-red-600 italic font-bold'>{formik.errors.uploadimage}</div>) : null}

                </div>

                <div className="col-span-6 sm:col-span-3">

                  <input type="hidden" name="id"  value={formik.values.trainerid}
                  />
                  <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                  <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie"
                    id="firstName"
                    name="firstName"
                    type="text"


                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                 {formik.touched.firstName && formik.errors.firstName ? (<div className='text-red-600 italic font-bold'>{formik.errors.firstName}</div>) : null}

                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                  <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="example@company.com"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                 {formik.touched.email && formik.errors.email ? (<div className='text-red-600 italic font-bold'>{formik.errors.email}</div>) : null}
  
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                  <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="birthdate"
                    name="birthdate"
                    type="Date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthdate}
                  />

                {formik.touched.birthdate && formik.errors.birthdate ? (<div className='text-red-600 italic font-bold'>{formik.errors.birthdate}</div>) : null}

                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructor Plans</label>
                  <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="programplan"
                    name="programplan"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.programplan}
                  >
                    <option disabled>Select Workout Plan</option>
                    <option value="cardio">Cardio Workout</option>
                    <option value="fullbody">Full Body Workout</option>
                    <option value="bodyweight">Body Weight Workout</option>
                    <option value="strength">Strength Workout</option>
                  </select>

                  {formik.touched.programplan && formik.errors.programplan ? (<div className='text-red-600 italic font-bold'>{formik.errors.programplan}</div>) : null}

                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                  <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="sex"
                    name="sex"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sex}>
                    <option disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  {formik.touched.sex && formik.errors.sex ? (<div className='text-red-600 italic font-bold'>{formik.errors.sex}</div>) : null}
    
                </div>

              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button type="submit" className="text-white bg-pink-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Trainer</button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>


  )
}


export default GymTrainer