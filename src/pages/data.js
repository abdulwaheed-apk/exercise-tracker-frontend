import {
  FaUser,
  FaChartBar,
  FaRunning,
  FaSwimmer,
  FaHiking,
  FaWalking,
} from 'react-icons/fa'
import { HiSquares2X2 } from 'react-icons/hi2'
import { BiStats, BiCycling } from 'react-icons/bi'
const sidebarMenu = [
  {
    title: 'Welcome',
    path: '',
    icon: BiStats,
  },
  {
    title: 'All Activities',
    path: 'activities',
    icon: HiSquares2X2,
  },
  {
    title: 'Running',
    path: 'running',
    icon: FaRunning,
  },
  {
    title: 'Bicycling',
    path: 'bicycling',
    icon: BiCycling,
  },
  {
    title: 'Swimming',
    path: 'swimming',
    icon: FaSwimmer,
  },
  {
    title: 'Hiking',
    path: 'hiking',
    icon: FaHiking,
  },
  {
    title: 'Walking',
    path: 'walking',
    icon: FaWalking,
  },
  {
    title: 'Profile',
    path: 'profile',
    icon: FaUser,
  },
]

export default sidebarMenu

//<AiOutlineBarChart className=' h-8 w-8 text-red-500' />
// BsFillBarChartFill
