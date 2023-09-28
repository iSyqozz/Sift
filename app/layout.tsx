import './globals.css'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import { Wallet, ScrollProg, ScrollUp, Navbar, Footer } from '@components'

const ubuntu = Ubuntu({subsets: ['latin'], weight:['300','400','500','700']})
const baseUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.PORT || 3000}` :
  'https://' + process.env.VERCEL_ENV as string;


export const metadata: Metadata = {
  title: 'Sift',
  description: 'Discover the most trending collections across marketplaces and stay ahead of the game.',
  viewport: { width: "device-width", initialScale: 1 },
  metadataBase: new URL(baseUrl),
  authors: [
    {
      name: 'iSy',
      url: 'https://github.com/iSyqozz'
    }
  ],
  keywords: "Neo, NFT, NFT project, NeoWalkers, revshare,",
  openGraph: {
    title: 'Sift',
    description: 'Discover the most trending collections across marketplaces and stay ahead of the game.',
    url: 'www.sift.io',
    siteName: 'Sift',
  },
  twitter: {
    title: 'Sift',
    description: 'Discover the most trending collections across marketplaces and stay ahead of the game.',
    card: 'summary',
    creator: 'iSy',
    site: '@@NioWalkers'
  },
  creator: 'iSy',
  publisher: 'iSy',
  generator: 'Next.js',
  applicationName: 'Sift',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={ubuntu.className + " dark:bg-black bg-slate-100"}>

        <ScrollProg />
        <ScrollUp />
        
        <Wallet>
          <Navbar />
          {children}
          <Footer />
        </Wallet>
      </body>
    </html>
  )
}
