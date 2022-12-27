import { useSelector } from 'react-redux';

import { RootState } from '../store/store';

import Link from 'next/link';

const Gymer = () => {


  interface gymerArray {

    profilePath: string,
    firstName: String,
    lastName: String,
    email: string,
    userName: string,
    systemRole: String,
    payableFees?: number,
    feesPaid?: number,


  }
  

  const users = useSelector((state: RootState) => state?.reducer?.user?.userList)

  
  
  
  const gymers = users.filter((user:gymerArray ) => user.systemRole === "ASSISTANT")

 
if(gymers.feesPaid)
{
  let btn = document.getElementById('tablebtn') as HTMLButtonElement;
  btn.style.backgroundColor = "purple";
  btn.textContent = "Payment Received";

}

else if(users.payableFees) {
  let btn = document.getElementById('tablebtn') as HTMLButtonElement;
  btn.style.backgroundColor = "purple";
  btn.textContent = "Assigned Payment";
}

  return (

    <div className=" shadow-md  sm:rounded-lg">

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>

            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              UserName
            </th>

            <th scope="col" className="py-3 px-6">
              User Role
            </th>
            <th scope="col" className="py-3 px-6">
              Payments
            </th>
          </tr>
        </thead>

        {

          gymers.map((gymer: gymerArray) => {

            return (


              <tbody>
                <tr   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                  <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={gymer.profilePath} alt="trainerimage" />
                    <div className="pl-3">
                      <div className="text-base font-semibold">{gymer.firstName}</div>
                      <div className="font-normal text-gray-500">{gymer.email}</div>
                    </div>
                  </th>
                  <td className="py-4 px-6">
                    {gymer.userName}
                  </td>
                  <td className="py-4 px-6">

                    {(gymer.systemRole ? 'User' : 'is not user')}

                  </td>

                  <td className="py-4 px-6">

                    {(gymer.feesPaid ? <button type='submit' id="tablebtn" className="  bg-purple-700 hover:bg-pink-700 ml-4 text-white font-bold py-2 px-4 rounded-full">
                       Payment Rieceved
                        </button> 
                        :
                    
                    gymer.payableFees ? <button type='submit' id="tablebtn" className="  bg-green-500 hover:bg-pink-700 ml-4 text-white font-bold py-2 px-4 rounded-full">
                       Already Assigned
                        </button> 
                        :

                      <Link href={`/users/${gymer.userName}`}>
                        <button type='submit' id="tablebtn" className=" bg-pink-700 hover:bg-purple-700 ml-4 text-white font-bold py-2 px-4 rounded-full"
                        >  Assign Payment
                        </button>
                      </Link>

                    )}

                  </td>

                </tr>

              </tbody>


            )

          })}


      </table>

    </div>


  )

}


export default Gymer


