import Header from './components/Header'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Footer from './components/Footer'
import ProvidersWrapper from './ProvidersWrapper'

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
})

export const metadata = {
    title: 'Exercise Tracker App',
    description: 'Created with Next.js, Tailwind CSS, Redux, React Query and MUI',
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body
                className={`${montserrat.variable} font-montserrat min-h-screen flex flex-col justify-between`}
            >
                <ProvidersWrapper>
                    <Header />
                    {children}
                    <Footer />
                </ProvidersWrapper>
            </body>
        </html>
    )
}
