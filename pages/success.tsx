import { useRouter } from 'next/router';
import {useSelector,useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { updateuser } from '../store/userSlice';
import type { RootState } from '../store/store'

// import { CheckIcon } from '@heroicons/react/outline';

const Success = () => {
  
  const dispatch = useDispatch();

    const trainees = useSelector((state: RootState) => state.reducer?.user.userList)

    const loginedUser = useSelector((state: RootState) => state.reducer?.login.loginUser)

    const {userName} :any  = loginedUser

    const trainee: any = trainees.find((a: any) => a.userName === userName)

    console.log(trainee);

    const router = useRouter();

    useEffect(() => {


      setTimeout(()=>{

        dispatch(updateuser({ ...trainee, feesPaid: trainee.payableFees, totalFees: 0 }))
        router.push(`/payfees/${userName}`)


      },3000)

  }, [])


  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      {trainee?.hasOwnProperty('feesPaid') ? 
        (
        <div className="py-4 px-8 rounded-md bg-gray-100 max-w-lg mx-auto">
            
          <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
            {/* <CheckIcon className="w-12 h-12 flex-shrink-0 text-green-600" /> */}
            <span>Thanks your  gym fees is paid!</span>
          </h2>
      </div>
        
              
      ) :
      (
        null
      ) }
    </div>
  );
};

export default Success;