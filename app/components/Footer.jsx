import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
export default function Footer() {
    return (
        <footer className='flex flex-col md:flex-row justify-center items-center w-full mx-auto gap-y-1 md:gap-y-0 md:space-x-4 border-t-[1px] h-16 font-medium md:-mt-2 '>
            <p>
                Built with <FavoriteBorderIcon className='text-red-500' /> by{' '}
                <Link
                    className='hover:text-red-500'
                    href='https://github.com/abdulwaheed-apk'
                    target='_blank'
                >
                    Abdul Waheed
                </Link>{' '}
            </p>
            <span className='h-1/2 w-[1px] bg-black hidden md:flex'></span>
            <p>&copy; {new Date().getFullYear()} Exercise Tracker.</p>
        </footer>
    )
}
