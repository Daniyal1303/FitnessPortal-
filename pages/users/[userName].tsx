import { useRouter } from 'next/router'

import { useState, useEffect } from "react"

import { useSelector, useDispatch } from 'react-redux'

import { updateuser } from '../../store/userSlice';

import type { RootState } from '../../store/store'


const payment = () => {

    

    const [feeAmount, setFeeAmount] = useState(20);

    const router = useRouter();

    const { userName } = router.query;


    const dispatch = useDispatch();

    const trainees = useSelector((state: RootState) => state.reducer?.user.userList)

    const trainee: any = trainees.find((a: any) => a.userName === userName)
    console.log(trainee);

    useEffect(() => {

        dispatch(updateuser({ ...trainee, payableFees: feeAmount }))

        setFeeAmount(0);

        setTimeout(()=>{

            router.push("/trainee")

        },3000)

    }, [])



    return (

        <div className='flex flex-1'>


            <div className="mx-6 w-[80%] overflow-x-auto relative shadow-md  sm:rounded-lg">
                <div className=' flex min-h-screen pt-[30px] px-[40px]'>
                    <div className="min-w-full">
                        <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
                            Your Subscription
                        </p>

                        <div>
                            <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
                                Aliquam sagittis sapien in nibh tincidunt fermentum. Morbi eleifend faucibus.
                            </p>
                        </div>



                        <div className="mt-[20px] grid grid-cols-2 gap-[20px]">
                            <div key="1" className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                                <div className="pt-[15px] px-[25px] pb-[25px]">

                                    <div className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="photo-wrapper p-2">
                                            <img className="w-32 h-32 rounded-full mx-auto" src={trainee?.profilePath} alt={trainee?.firstName} />
                                        </div>
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{trainee?.userName}</div>
                                            <div className="font-normal text-gray-500">{trainee?.email}</div>
                                        </div>
                                    </div>

                                </div>

                                <div className="pt-[25px] px-[25px] pb-[35px]">
                                    <div>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            <span className='text-base text-black font-semibold'>First Name: </span>  {trainee?.firstName}
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            <span className='text-base text-black font-semibold'>Last Name: </span> {trainee?.lastName}
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            <span className='text-base text-black font-semibold'>Email Address: </span>{trainee?.email}
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            <span className='text-base  text-black font-semibold'>System Role: </span>{(trainee?.systemRole ? 'User' : 'is not user')}
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            <span className='text-base text-black font-semibold'>Password: </span>{trainee?.password}

                                        </p>

                                    </div>

                                    {/* <div className="mt-[25px]">
                                        <button id="assign-btn" className="bg-[#006EF5]  rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold"
                                            onClick={fee} >Assign Fees</button>
                                    </div> */}
                                </div>
                            </div>

                            <div key="2" id="feeModal" className="  w-fit h-fit  bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                                <div className="pt-[15px] px-[25px] pb-[25px]">


                                    <div>
                                        <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                                            Fee Amount
                                        </p>
                                        <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                                            ${trainee?.payableFees}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                            Fees is assigned.
                                        </p>

                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default payment



