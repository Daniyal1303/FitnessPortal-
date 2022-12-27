import Sidebar from '../components/Sidebar/Sidebar'
import Headerbar from '../components/Header/header'
import GymTrainer from '../components/gymtrainer'
const Trainer = () => {
  return (



    <div className="flex justify-start overflow-hidden">
      <div className='w-[19%]'>
       <Sidebar />
      </div>
      
      <div className='flex flex-col w-full'>
        <Headerbar />
        <GymTrainer />
      </div >
    </div>







  )
}

export default Trainer