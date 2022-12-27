import Sidebar from '../components/Sidebar/Sidebar'
import Headerbar from '../components/Header/header'
import Gymer from "../components/gymer"
const Trainee = () => {
  return (
    <div className="flex justify-start overflow-hidden">
      <div className='w-[19%]'>
      <Sidebar />
      </div>
      
      <div className='flex flex-col w-full '>
        <Headerbar />
      <Gymer />
      </div >
    </div>
  )
}

export default Trainee