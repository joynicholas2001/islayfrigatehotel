import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    style: ['normal', 'italic'],
})

export const metadata = {
    title: 'Islay Frigate Hotel | Coastal Heritage & Luxury Repose',
    description: 'Experience the legacy of the West Coast at Islay Frigate Hotel. A long-established pillar of the Tarbert community offering boutique sanctuary and harbour views.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="font-sans">
                <Toaster position="bottom-right" />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}
