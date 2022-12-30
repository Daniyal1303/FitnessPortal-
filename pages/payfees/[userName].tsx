import { useRouter } from 'next/router'

import Image from "next/image"

import { useState} from "react"

import { useSelector, useDispatch } from 'react-redux'

import UserSidebar from '../../components/UserSidebar'

import Headerbar from '../../components/Header/header'

import type { RootState } from '../../store/store'

import Stripe from 'stripe'



const Payment = () => {


    

    const [feeAmount, setFeeAmount] = useState(20);

    const router = useRouter();

    const { userName } = router.query;

    // const dispatch = useDispatch();

    const trainees = useSelector((state: RootState) => state.reducer?.user.userList)

    const trainee: any = trainees.find((a: any) => a.userName === userName)


    const checkout = async () => {


        const response = await fetch("/api/checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                userName: trainee.userName,
                payableFees: trainee.payableFees

            })
        });

        if (response.status === 200) {
            const data = await response.json()
            console.log(data)
         router.push(data.url)
        }
        
        else if (response.status === 500) return;

       
    }
    // Create Stripe checkout




    return (
        <div>
            <div className='flex '>

                <UserSidebar />

                <div className='flex flex-col w-full overflow-x-hidden'>

                    <Headerbar />
                    <div className="overflow-x-hidden shadow-md  sm:rounded-lg w-[85%]">
                        <div className=' flex  pt-[30px] px-[40px] m-auto'>
                            <div className="min-w-full">
                                <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
                                    Your Gym Fee Payment
                                </p>



                                <div className="mt-[20px] grid grid-cols-2 gap-[20px]">

                                    <div key="1" className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                                        <div className="pt-[15px] px-[25px] pb-[25px]">

                                            <div className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="photo-wrapper p-2">
                                                    <Image className="w-32 h-32 rounded-full mx-auto" src={trainee?.profilePath as string} width={20} height={10} alt="traineRimage" />

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


                                        </div>
                                    </div>

                                    {
                                    (trainee?.feesPaid ?
                                        <div key="2" id="feeModal" className="  w-fit h-fit  bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                                            <div className="pt-[15px] px-[25px] pb-[25px]">
                                                <div>
                                                    <p className="text-[#00153B] text-[15px] leading-[63px] font-bold">
                                                        <span className='text-base text-black font-semibold'>Thank You! You have paid the fees.See your Invoice</span>
                                                    </p>
                                                    <p className="text-[#00153B] text-[15px] leading-[63px] ">
                                                        <span className='text-base text-black font-semibold'>Payable Fees: </span>${trainee?.payableFees}
                                                    </p>
                                                    <p className="text-[#00153B] text-[15px] leading-[63px] ">
                                                        <span className='text-base text-black font-semibold'>Paid Fees: </span>${trainee?.feesPaid}
                                                    </p>
                                                    <p className="text-[#00153B] text-[15px] leading-[63px] ">
                                                        <span className='text-base text-black font-semibold'>Total Amount: </span>{trainee?.totalFees}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                        :
                                         trainee?.payableFees ?
                                        <div key="2" id="feeModal" className="  w-[80%] h-fit  bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                                                <div className="pt-[15px] px-[25px] pb-[25px]">


                                                    <div className='text-center'>
                                                        <p className="text-[#00153B] text-[25px] leading-[24px] font-bold">
                                                            Fee Summary
                                                        </p>
                                                        <p className="text-[#00153B] text-[15px] leading-[63px] font-bold">
                                                            <span className='text-base text-black font-semibold'>Payable Fees: </span>${trainee?.payableFees}
                                                        </p>
                                                        <p className=" text-[15px]  font-bold">
                                                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkout}>
                                                                Payable Now
                                                            </button>
                                                        </p>
                                                    </div>



                                                </div>
                                        </div>
                                         :
                                        <div key="2" id="feeModal" className="  w-fit h-fit  bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">                                                  <div className="pt-[15px] px-[25px] pb-[25px]">
                                                      <div>
                                                          <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                                              Sorry, yourssdc gym fees is not assigned by Admin.
                                                          </p>
 
                                                      </div>
                                                  </div>
 
                                         </div>

                                    )}
                                    {/* {
                                        (trainee?.hasOwnProperty('payableFees')) ?
                                        <div key="2" id="feeModal" className="  w-[80%] h-fit  bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                                        <div className="pt-[15px] px-[25px] pb-[25px]">


                                            <div className='text-center'>
                                                <p className="text-[#00153B] text-[25px] leading-[24px] font-bold">
                                                    Fee Summary
                                                </p>
                                                <p className="text-[#00153B] text-[15px] leading-[63px] font-bold">
                                                    <span className='text-base text-black font-semibold'>Payable Fees: </span>${trainee?.payableFees}
                                                </p>
                                                <p className=" text-[15px]  font-bold">
                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkout}>
                                                        Payable Now
                                                    </button>
                                                </p>
                                            </div>



                                        </div>


                                        </div>
                                        :

                                        <div key="2" id="feeModal" className="  w-fit h-fit  bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                                                 <div className="pt-[15px] px-[25px] pb-[25px]">
                                                     <div>
                                                         <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                                             Sorry, yours' gym fees is not assigned by Admin.
                                                         </p>

                                                     </div>
                                                 </div>

                                        </div>
                                    }          */}

                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment
